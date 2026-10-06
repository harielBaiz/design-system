import './MediaBlock.css';

export interface MediaBlockProps {
  src?: string;
  /** Required for images (empty string only if purely decorative). */
  alt?: string;
  video?: boolean;
  caption?: string;
}

/** 16:9 framed image or video with optional caption. Without `src` it renders a placeholder frame. */
export function MediaBlock({ src, alt = '', video, caption }: MediaBlockProps) {
  return (
    <figure className="ds-media">
      <div className="ds-media__frame">
        {!src ? <span className="ds-media__placeholder">Media placeholder</span>
          : video ? <video src={src} autoPlay muted loop playsInline aria-label={alt || undefined} />
          : <img src={src} alt={alt} />}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
