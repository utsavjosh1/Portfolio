export default function Video() {
  return (
    <div className="video-container">
      <video className="video" preload="none" autoPlay loop muted playsInline>
        <source src="/video/bg.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
