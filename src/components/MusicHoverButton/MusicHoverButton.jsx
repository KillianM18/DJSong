import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "./MusicHoverButton.scss";

const GLYPHS = ["\u266A", "\u266B", "\u266C", "\u2669"];
const COLORS = ["#a2ebf0", "#db3069", "#fffffb", "#5a6a7c"];

export default function MusicHoverButton({
  label = "Télécharger",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  to, // si fourni, le composant se rend en <Link to="..."> (navigation)
  href, // si fourni (et pas de `to`), se rend en <a href="...">
}) {
  const fieldRef = useRef(null);
  const timerRef = useRef(null);

  const spawnNote = useCallback(() => {
    if (!fieldRef.current) return;

    const note = document.createElement("span");
    note.className = "note";
    note.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

    const angle = Math.random() * Math.PI * 2;
    const dist = 70 + Math.random() * 60;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - (10 + Math.random() * 30);
    const duration = 1.2 + Math.random() * 0.5;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    note.style.setProperty("--dx", `${dx}px`);
    note.style.setProperty("--dy", `${dy}px`);
    note.style.animationDuration = `${duration}s`;
    note.style.fontSize = `${20 + Math.random() * 10}px`;
    note.style.color = color;

    fieldRef.current.appendChild(note);
    setTimeout(() => note.remove(), duration * 1000);
  }, []);

  const startSpawning = useCallback(() => {
    if (timerRef.current || disabled) return;
    spawnNote();
    timerRef.current = setInterval(spawnNote, 160);
  }, [spawnNote, disabled]);

  const stopSpawning = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const hoverHandlers = {
    onMouseEnter: startSpawning,
    onMouseLeave: stopSpawning,
    onFocus: startSpawning,
    onBlur: stopSpawning,
  };

  const combinedClassName = `music-hover-btn ${className} button`.trim();

  let content;
  if (to) {
    // Bouton de navigation interne (react-router)
    content = (
      <Link to={to} className={combinedClassName} {...hoverHandlers} onClick={onClick}>
        <span>{label}</span>
      </Link>
    );
  } else if (href) {
    // Lien externe classique
    content = (
      <a href={href} className={combinedClassName} {...hoverHandlers} onClick={onClick}>
        <span>{label}</span>
      </a>
    );
  } else {
    // Bouton natif (submit / button)
    content = (
      <button
        type={type}
        disabled={disabled}
        className={combinedClassName}
        {...hoverHandlers}
        onClick={onClick}
      >
        <span>{label}</span>
      </button>
    );
  }

  return (
    <div className="music-btn-stage">
      <div className="note-field" ref={fieldRef} />
      {content}
    </div>
  );
}