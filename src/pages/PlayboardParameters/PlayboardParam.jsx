import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Play, Pause, Plus, Music2, ArrowLeft, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import '../../../style/pages/PlayboardParam.scss';

const API_KEY = 'LvuTO0bluMYDQpYKGRPbqZidQKQUyaaFG0JTc5U1';
const API_URL = 'https://freesound.org/apiv2/search/text/';

const CATEGORIES = [
  'Tous', 'Drums', 'Synth', 'Bass', 'Vocals', 'FX', 'Percussion', 'Ambient', 'Loop'
];

const DURATION_FILTERS = [
  { label: 'Toutes durées', value: '' },
  { label: 'One-shots (< 2s)', value: 'duration:[0.0 TO 2.0]' },
  { label: 'Courtes (2s - 5s)', value: 'duration:[2.0 TO 5.0]' },
  { label: 'Longues (> 5s)', value: 'duration:[5.0 TO *]' }
];

const Waveform = ({ sound, isPlaying, audioRef }) => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef(null);

  const updateProgress = useCallback(() => {
    if (audioRef.current && isPlaying) {
      const current = audioRef.current.currentTime || 0;
      let total = audioRef.current.duration;

      if (isNaN(total) || total <= 0) {
        total = sound.duration;
      }
      if (!total || total <= 0) total = 1; // Sécurité anti division par 0

      const newProgress = Math.min((current / total) * 100, 100);
      setProgress(newProgress || 0);

      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, [isPlaying, audioRef, sound.duration]);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      setProgress(0);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, updateProgress]);

  const waveformUrl = sound.images?.waveform_m;

  if (!waveformUrl) {
    return (
      <div className="waveform-container" style={{ background: '#5A6A7C' }}>
        <div className="waveform-progress" style={{ width: `${progress}%` }} />
      </div>
    );
  }

  return (
    <div
      className="waveform-container"
      style={{
        WebkitMaskImage: `url(${waveformUrl})`,
        maskImage: `url(${waveformUrl})`
      }}
    >
      <div className="waveform-progress" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default function PlayboardParam({ onAddSound, onClose }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [durationFilter, setDurationFilter] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playingId, setPlayingId] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const audioRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const lastFetchedQueryRef = useRef('');

  const fetchSounds = useCallback(async (searchQuery, targetPage = 1, filterStr = durationFilter) => {
    setIsLoading(true);
    lastFetchedQueryRef.current = searchQuery;
    setPage(targetPage);

    try {
      const actualQuery = searchQuery === 'Tous' ? '' : searchQuery;
      let url = `${API_URL}?query=${encodeURIComponent(actualQuery)}&token=${API_KEY}&fields=id,name,previews,duration,username,images&page_size=12&page=${targetPage}`;
      if (filterStr) {
        url += `&filter=${encodeURIComponent(filterStr)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setResults(data.results || []);
      setHasNextPage(!!data.next);
    } catch (error) {
      console.error('Error fetching sounds:', error);
    } finally {
      setIsLoading(false);
    }
  }, [durationFilter]);

  // Handle Search input with 3 seconds debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query !== lastFetchedQueryRef.current && !activeCategory) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchSounds(query, 1);
      }, 3000);
    }

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [query, activeCategory, fetchSounds]);

  // Handle category selection
  useEffect(() => {
    if (activeCategory) {
      fetchSounds(activeCategory, 1);
      setQuery('');
    }
  }, [activeCategory, durationFilter, fetchSounds]);

  // Initial fetch on mount if 'Tous' is the active category
  useEffect(() => {
    if (activeCategory === 'Tous') {
      fetchSounds('Tous', 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual search via Form submission (Enter key or click)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (query.trim()) {
      setActiveCategory('');
      fetchSounds(query, 1);
    }
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setDurationFilter(newFilter);
    const currentSearch = activeCategory || query;
    if (currentSearch) {
      fetchSounds(currentSearch, 1, newFilter);
    }
  };

  const goToPrevPage = () => {
    if (page > 1) {
      const currentSearch = activeCategory || query;
      fetchSounds(currentSearch, page - 1);
    }
  };

  const goToNextPage = () => {
    if (hasNextPage) {
      const currentSearch = activeCategory || query;
      fetchSounds(currentSearch, page + 1);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const togglePlay = (sound) => {
    const previewUrl = sound.previews['preview-hq-mp3'] || sound.previews['preview-lq-ogg'];

    if (!previewUrl) return;

    if (playingId === sound.id) {
      if (audioRef.current) audioRef.current.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) audioRef.current.pause();

      const audio = new Audio(previewUrl);
      audioRef.current = audio;

      audio.onended = () => setPlayingId(null);
      audio.play();
      setPlayingId(sound.id);
    }
  };

  // Stopper l'audio si on ferme le composant
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="playboard-param-container">
      <div className="playboard-param-content">

        <button className="back-btn" onClick={onClose}>
          <ArrowLeft size={20} /> Retour au Launchpad
        </button>

        <header className="playboard-header">
          <h1>Bibliothèque de Sons</h1>
          <p>Trouvez le son parfait pour votre prochain beat</p>
        </header>

        <div className="search-filter-wrapper">
          <form className="search-section" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher des sons (Appuyez sur Entrée ou attendez 3s)..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveCategory('');
                }}
              />
            </div>
            <button type="submit" className="search-button">Rechercher</button>
          </form>

          <div className="filter-wrapper">
            <Filter size={18} className="filter-icon" />
            <select
              className="duration-filter"
              value={durationFilter}
              onChange={handleFilterChange}
            >
              {DURATION_FILTERS.map(f => (
                <option key={f.label} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="categories-container">
          {CATEGORIES.map(category => (
            <button
              key={category}
              className={`category-chip ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Recherche de sons...</p>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <>
                <div className="results-grid">
                  {results.map(sound => (
                    <div key={sound.id} className="sound-card">
                      <div className="sound-card-header">
                        <div>
                          <h3 className="sound-title" title={sound.name}>{sound.name}</h3>
                          <p className="sound-author">par {sound.username}</p>
                        </div>
                        <span className="sound-duration">{formatDuration(sound.duration)}</span>
                      </div>

                      <Waveform
                        sound={sound}
                        isPlaying={playingId === sound.id}
                        audioRef={audioRef}
                      />

                      <div className="sound-controls">
                        <button
                          className={`play-button ${playingId === sound.id ? 'playing' : ''}`}
                          onClick={() => togglePlay(sound)}
                        >
                          {playingId === sound.id ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '4px' }} />}
                        </button>

                        <button
                          className="save-button"
                          onClick={() => onAddSound && onAddSound(sound)}
                          title="Assigner ce son au Launchpad"
                        >
                          <Plus size={20} />
                          <span className="add-text">Ajouter</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={goToPrevPage}
                    disabled={page === 1}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="page-number">Page {page}</span>
                  <button
                    className="page-btn"
                    onClick={goToNextPage}
                    disabled={!hasNextPage}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </>
            ) : (
              !isLoading && (query || activeCategory) && (
                <div className="no-results">
                  <p>Aucun son trouvé. Essayez une autre recherche.</p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
