export default function Video() {
  return (
    <div className="video-container">
      {/* Placeholder Image */}
      {/* <img
        src="/images/video-placeholder.jpg"
        alt="Video placeholder"
        className="w-full h-full object-cover"
      /> */}
      <video
        className="video w-full h-full object-cover"
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/video-placeholder.jpg" // Set a poster for a better UX
      >
        <source src="/video/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
