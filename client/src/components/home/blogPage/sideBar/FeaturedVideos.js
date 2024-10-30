import React from 'react';
import '../../../../styles/components/home/blogPage/sideBar/FeaturedVideos.css'

const FeaturedVideos = ({ videos }) => (
  <div className="blog-widget">
    <h3 className="blog-widget-title">Featured Videos</h3>
    <div className="blog-featured-videos">
      {videos.map(video => (
        <div key={video.id} className="blog-video-item">
          <div className="blog-video-thumbnail-container">
            <img 
              src={video.thumbnail}
              alt={video.title}
              className="blog-video-thumbnail"
            />
            <span className="blog-video-duration">{video.duration}</span>
          </div>
          <h4 className="blog-video-title">{video.title}</h4>
          <p className="blog-video-views">{video.views} views</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturedVideos;