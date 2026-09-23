import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const PlayboardContext = createContext();

export const usePlayboard = () => useContext(PlayboardContext);

export const PlayboardProvider = ({ children }) => {
  // ÉTAT DES PADS
  const [pads, setPads] = useState(Array(36).fill(null));

  // ÉTAT DE LA GRILLE
  const [nbr_line, setLine] = useState(3);
  const [nbr_col, setCol] = useState(3);

  // ÉTAT DE LA TIMELINE
  const [events, setEvents] = useState([]);

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // en secondes

  // Durée totale de la timeline
  const [timelineDuration, setTimelineDuration] = useState(10);

  const timerRef = useRef(null);
  const lastTimeRef = useRef(0);
  const playingAudiosRef = useRef([]); // Garde une trace des audios en cours de lecture
  const lastPlayedEventIndicesRef = useRef(new Set()); // Pour ne pas rejouer le même événement

  // ACTIONS DES PADS
  const assignSoundToPad = (sound, padIndex) => {
    if (padIndex >= 0 && padIndex < pads.length) {
      const newPads = [...pads];
      newPads[padIndex] = sound;
      setPads(newPads);
      return true;
    }
    return false;
  };

  const deleteSoundFromPad = (padIndex) => {
    if (padIndex >= 0 && padIndex < pads.length) {
      const newPads = [...pads];
      newPads[padIndex] = null;
      setPads(newPads);
    }
  };

  const swapSounds = (index1, index2) => {
    if (index1 >= 0 && index2 >= 0 && index1 < pads.length && index2 < pads.length) {
      const newPads = [...pads];
      const temp = newPads[index1];
      newPads[index1] = newPads[index2];
      newPads[index2] = temp;
      setPads(newPads);
    }
  };

  const playSound = (previewUrl) => {
    if (!previewUrl) return null;
    const audio = new Audio(previewUrl);
    audio.play();
    return audio;
  };

  const handlePadClick = (padIndex) => {
    const sound = pads[padIndex];

    // Joue le son si existant
    if (sound) {
      const previewUrl = sound.previews?.['preview-hq-mp3'] || sound.previews?.['preview-lq-ogg'];
      playSound(previewUrl);
    }

    // Si on enregistre, on ajoute à la timeline
    if (isRecording) {
      const duration = sound?.duration > 0 ? sound.duration : 1;

      setEvents(prev => {
        // Trouve la piste disponible
        let trackIndex = 0;
        let trackFound = false;

        while (!trackFound) {
          // Vérifie si cette piste est libre à currentTime
          const isOccupied = prev.some(ev =>
            ev.trackIndex === trackIndex &&
            currentTime >= ev.startTime &&
            currentTime < ev.startTime + ((ev.sound?.duration > 0 ? ev.sound.duration : 1))
          );

          if (!isOccupied) {
            trackFound = true;
          } else {
            trackIndex++;
          }
        }

        const newEvent = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
          padIndex,
          trackIndex,
          sound: sound || { name: `Bouton ${padIndex + 1}`, duration: 1, isDummy: true },
          startTime: currentTime
        };

        const next = [...prev, newEvent];
        return next.sort((a, b) => a.startTime - b.startTime);
      });

      checkAndExtendTimeline(currentTime);
    }
  };

  // ACTIONS DE LA TIMELINE
  const toggleRecording = () => {
    if (isPlaying) pausePlayback();
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Démarre l'horloge pour l'enregistrement
      lastTimeRef.current = performance.now();
      timerRef.current = requestAnimationFrame(updateTime);
    } else {
      cancelAnimationFrame(timerRef.current);
    }
  };

  const pausePlayback = () => {
    setIsPlaying(false);
    cancelAnimationFrame(timerRef.current);
    playingAudiosRef.current.forEach(audio => {
      audio.pause();
    });
    playingAudiosRef.current = [];
  };

  const togglePlayback = () => {
    if (isRecording) setIsRecording(false);

    if (isPlaying) {
      pausePlayback();
    } else {
      setIsPlaying(true);
      if (currentTime >= timelineDuration) {
        setCurrentTime(0);
        lastPlayedEventIndicesRef.current.clear();
      } else {
        // Nettoyer les audios passés pour pouvoir redéclencher
        events.forEach((ev) => {
          if (ev.startTime < currentTime) {
            lastPlayedEventIndicesRef.current.add(ev.id);
          } else {
            lastPlayedEventIndicesRef.current.delete(ev.id);
          }
        });
      }
      lastTimeRef.current = performance.now();
      timerRef.current = requestAnimationFrame(updatePlaybackTime);
    }
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    setIsRecording(false);
    cancelAnimationFrame(timerRef.current);
    // Arrêter tous les sons en cours
    playingAudiosRef.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    playingAudiosRef.current = [];
    setCurrentTime(0);
    lastPlayedEventIndicesRef.current.clear();
  };

  const checkAndExtendTimeline = (time) => {
    if (time > timelineDuration - 5) {
      setTimelineDuration(prev => prev + 10);
    }
  };

  const updateTime = useCallback((timestamp) => {
    const delta = (timestamp - lastTimeRef.current) / 1000; // en secondes
    lastTimeRef.current = timestamp;

    setCurrentTime(prev => {
      const nextTime = prev + delta;
      checkAndExtendTimeline(nextTime);
      return nextTime;
    });

    timerRef.current = requestAnimationFrame(updateTime);
  }, [timelineDuration]);

  const updatePlaybackTime = useCallback((timestamp) => {
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    setCurrentTime(prev => {
      const nextTime = prev + delta;
      checkAndExtendTimeline(nextTime);

      // Vérifier si des événements doivent être joués entre prev et nextTime
      events.forEach((ev) => {
        if (ev.startTime >= prev && ev.startTime < nextTime && !lastPlayedEventIndicesRef.current.has(ev.id)) {
          lastPlayedEventIndicesRef.current.add(ev.id);
          const url = ev.sound.previews['preview-hq-mp3'] || ev.sound.previews['preview-lq-ogg'];
          const audio = playSound(url);
          if (audio) {
            playingAudiosRef.current.push(audio);
            audio.onended = () => {
              playingAudiosRef.current = playingAudiosRef.current.filter(a => a !== audio);
            };
          }
        }
      });

      return nextTime;
    });

    if (isPlaying) {
      timerRef.current = requestAnimationFrame(updatePlaybackTime);
    }
  }, [events, isPlaying, timelineDuration]);

  // Si on est en train de jouer, relancer la boucle
  useEffect(() => {
    if (isPlaying) {
      cancelAnimationFrame(timerRef.current);
      lastTimeRef.current = performance.now();
      timerRef.current = requestAnimationFrame(updatePlaybackTime);
    }
  }, [events, updatePlaybackTime, isPlaying]);


  const updateEventPosition = (id, newStartTime, newTrackIndex) => {
    setEvents(prev => {
      const next = prev.map(ev =>
        ev.id === id ? { ...ev, startTime: Math.max(0, newStartTime), trackIndex: newTrackIndex } : ev
      );
      return next.sort((a, b) => a.startTime - b.startTime);
    });
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(ev => ev.id !== id));
  };

  const clearTimeline = () => {
    setEvents([]);
    setCurrentTime(0);
  };

  const value = {
    pads,
    assignSoundToPad,
    deleteSoundFromPad,
    swapSounds,
    handlePadClick,
    events,
    isRecording,
    isPlaying,
    currentTime,
    timelineDuration,
    setTimelineDuration,
    toggleRecording,
    togglePlayback,
    stopPlayback,
    setCurrentTime,
    updateEventPosition,
    deleteEvent,
    clearTimeline,
    nbr_line,
    setLine,
    nbr_col,
    setCol
  };

  return (
    <PlayboardContext.Provider value={value}>
      {children}
    </PlayboardContext.Provider>
  );
};
