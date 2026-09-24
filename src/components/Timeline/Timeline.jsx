import React, { useRef, useState, useEffect } from 'react';
import { usePlayboard } from '../../context/PlayboardContext';
import { Play, Pause, Square, Trash2, Mic } from 'lucide-react';
import './Timeline.scss';

export default function Timeline() {
  const {
    events,
    pads,
    isRecording,
    isPlaying,
    currentTime,
    timelineDuration,
    toggleRecording,
    togglePlayback,
    stopPlayback,
    updateEventPosition,
    deleteEvent,
    clearTimeline,
    seekToTime
  } = usePlayboard();

  const timelineRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);

  // Déterminer le nombre de pistes
  const maxTrackIndex = events.length > 0 ? Math.max(...events.map(ev => ev.trackIndex)) : -1;
  const tracksCount = Math.max(3, maxTrackIndex + 1);
  const tracks = Array.from({ length: tracksCount }).map((_, i) => i);

  const pixelsPerSecond = 100; // 1 seconde = 100px

  // Auto-scroll de la timeline pendant la lecture
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    
    // Au Stop, currentTime retombe à 0. On force le scroll tout à gauche.
    if (currentTime === 0) {
      container.scrollLeft = 0;
      return;
    }

    const playheadPosition = currentTime * pixelsPerSecond;
    const containerWidth = container.clientWidth;
    const currentScroll = container.scrollLeft;
    const threshold = containerWidth / 2;
    
    // Si on n'est pas en lecture, on ne scrolle que si le trait sort de l'écran (ex: clic au loin)
    if (!isPlaying && !isRecording) {
      if (playheadPosition < currentScroll || playheadPosition > currentScroll + containerWidth) {
        container.scrollLeft = Math.max(0, playheadPosition - threshold);
      }
      return;
    }

    // Comportement standard de suivi pendant la lecture
    if (playheadPosition < currentScroll || playheadPosition > currentScroll + containerWidth) {
      container.scrollLeft = Math.max(0, playheadPosition - threshold);
    } else if (playheadPosition > currentScroll + threshold) {
      container.scrollLeft = playheadPosition - threshold;
    }
  }, [currentTime, isPlaying, isRecording, pixelsPerSecond]);

  const handlePointerDown = (e, id) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    setDraggingId(id);
  };

  const handlePointerMove = (e) => {
    if (!draggingId || !timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    // Position x relative au conteneur de la timeline
    const x = e.clientX - rect.left + timelineRef.current.scrollLeft;
    let newTime = x / pixelsPerSecond;
    if (newTime < 0) newTime = 0;
    
    // Position y pour changer de piste (hauteur piste = 60px)
    const y = e.clientY - rect.top + timelineRef.current.scrollTop;
    let newTrackIndex = Math.floor(y / 60);
    if (newTrackIndex < 0) newTrackIndex = 0;
    // Permet de glisser vers le bas pour créer une nouvelle piste
    if (newTrackIndex > tracksCount) newTrackIndex = tracksCount;
    
    updateEventPosition(draggingId, newTime, newTrackIndex);
  };

  const handlePointerUp = (e) => {
    if (draggingId) {
      e.target.releasePointerCapture(e.pointerId);
      setDraggingId(null);
    }
  };

  const handleTimelineClick = (e) => {
    if (draggingId || !timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + timelineRef.current.scrollLeft;
    const newTime = Math.max(0, x / pixelsPerSecond);
    seekToTime(newTime);
  };

  const displayTotalTime = events.length === 0 
    ? (isRecording ? currentTime : 0)
    : Math.max(...events.map(ev => ev.startTime + (ev.sound?.duration || 1)), isRecording ? currentTime : 0);

  return (
    <div className="timeline-container">
      <div className="timeline-controls">
        <button 
          className={`control-btn ${isRecording ? 'recording' : ''}`} 
          onClick={toggleRecording}
          title="Enregistrer"
        >
          <Mic size={20} />
        </button>
        <button 
          className={`control-btn ${isPlaying ? 'playing' : ''}`} 
          onClick={togglePlayback}
          title={isPlaying ? "Pause" : "Lecture"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button className="control-btn" onClick={stopPlayback} title="Stop">
          <Square size={20} />
        </button>
        <button className="control-btn delete" onClick={clearTimeline} title="Tout effacer">
          <Trash2 size={20} />
        </button>
        
        <div className="time-display">
          {currentTime.toFixed(2)}s / {displayTotalTime.toFixed(2)}s
        </div>
      </div>

      <div className="timeline-tracks-container" ref={scrollContainerRef}>
        <div className="tracks-headers">
          {tracks.map((trackIndex) => (
            <div key={trackIndex} className="track-header">
              {`Piste ${trackIndex + 1}`}
            </div>
          ))}
        </div>
        
        <div 
          className="tracks-body" 
          ref={timelineRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={handleTimelineClick}
        >
          <div 
            className="playhead" 
            style={{ transform: `translateX(${currentTime * pixelsPerSecond}px)` }}
          />

          {tracks.map((trackIndex) => {
            const trackWidth = Math.max(timelineDuration, displayTotalTime + 5) * pixelsPerSecond;
            const markersCount = Math.ceil(Math.max(timelineDuration, displayTotalTime + 5));

            return (
            <div key={trackIndex} className="track-row" style={{ width: `${trackWidth}px` }}>
              {/* Lignes de repère toutes les secondes */}
              {Array.from({ length: markersCount }).map((_, sec) => (
                <div key={sec} className="time-marker" style={{ left: `${sec * pixelsPerSecond}px` }} />
              ))}
              
              {/* Événements de cette piste */}
              {events.filter(ev => ev.trackIndex === trackIndex).map(ev => {
                const isDragging = draggingId === ev.id;
                // Durée affichée du bloc : on prend max(1s, duree_reelle) pour qu'il soit visible
                const duration = (ev.sound.duration && ev.sound.duration > 0) ? ev.sound.duration : 1;
                const width = duration * pixelsPerSecond;
                
                return (
                  <div
                    key={ev.id}
                    className={`timeline-event ${isDragging ? 'dragging' : ''}`}
                    style={{ 
                      left: `${ev.startTime * pixelsPerSecond}px`,
                      width: `${width}px` // La vraie durée du son
                    }}
                    onPointerDown={(e) => handlePointerDown(e, ev.id)}
                  >
                    <span className="event-label">{ev.sound.name}</span>
                    <button 
                      className="delete-event-btn" 
                      onClick={(e) => { e.stopPropagation(); deleteEvent(ev.id); }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
