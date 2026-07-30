import React from 'react'

function VideoPanel({ links }) {
  return (
    <section className="video-panel" aria-label="유튜브 영상 추천">
      <div className="video-panel-header">
        <p className="eyebrow">Watch more</p>
        <h3>해외 가십 영상 바로 보기</h3>
      </div>
      <div className="video-list">
        {links.map((video) => (
          <a key={video.title} className="video-card" href={video.link} target="_blank" rel="noreferrer">
            <strong>{video.title}</strong>
            <span>{video.description}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default VideoPanel
