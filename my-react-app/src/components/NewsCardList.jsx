import React from 'react'

function NewsCardList({ items }) {
  if (!items || items.length === 0) {
    return (
      <section className="status-card" aria-live="polite">
        <p>실시간 뉴스 데이터를 아직 받지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
      </section>
    )
  }

  return (
    <section className="news-grid" aria-label="뉴스 카드 목록">
      {items.map((item) => (
        <article key={item.title} className="news-card">
          {item.thumbnail ? (
            <img className="news-thumbnail" src={item.thumbnail} alt="뉴스 미리보기" />
          ) : null}
          <div className="news-card-top">
            <div className="news-source-block">
              <span className="news-source-label">출처</span>
              <p className="news-source">{item.source}</p>
            </div>
            <div className="news-meta-right">
              <span className="source-badge">{item.source}</span>
              <p className="news-time">{item.time}</p>
            </div>
          </div>
          <h3>{item.title}</h3>
          <p className="news-summary">{item.summary}</p>
          <a href={item.link} target="_blank" rel="noreferrer">
            자세히 보기
          </a>
        </article>
      ))}
    </section>
  )
}

export default NewsCardList
