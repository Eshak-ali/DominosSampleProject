import React from "react";
const Ads = () => {
  const videos = [
    "https://res.cloudinary.com/dcogmavcg/video/upload/v1737108267/Duminos/tueqzwjsbuqxv0vrh6fy.mp4",
    "https://res.cloudinary.com/dcogmavcg/video/upload/v1737108250/Duminos/vee04dwt2jebfxgchuwh.mp4",
    "https://res.cloudinary.com/dcogmavcg/video/upload/v1737108167/Duminos/b6glspjpnmxwv26qnpdc.mp4",
  ];
  return (
    <div className="container">
      <div
        id="videoCarousel"
        className="carousel slide mt-3"
        data-bs-ride="carousel"
        data-bs-interval="10000" // Automatically moves to the next slide after 25 seconds
      >
        <div className="carousel-inner video">
          {videos.map((video, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div>
                <video
                  className="d-block w-100"
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
              </div>
            </div>
          ))}
        </div>
        <button
          class="carousel-control-prev "
          type="button"
          data-bs-target="#videoCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next "
          type="button"
          data-bs-target="#videoCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Ads;
