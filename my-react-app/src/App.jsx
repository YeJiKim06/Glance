import React, { useEffect, useState } from 'react'
import './App.css'

const categories = ['IT/기술', '경제', '사회']
const rssApiBase = 'https://api.rss2json.com/v1/api.json'
const rssFeeds = {
  'IT/기술': 'https://news.google.com/rss/search?q=%ED%95%9C%EA%B5%AD%20IT%20%EA%B8%B0%EC%88%A0&hl=ko&gl=KR&ceid=KR:ko',
  경제: 'https://news.google.com/rss/search?q=%ED%95%9C%EA%B5%AD%20%EA%B2%BD%EC%A0%9C&hl=ko&gl=KR&ceid=KR:ko',
  사회: 'https://news.google.com/rss/search?q=%ED%95%9C%EA%B5%AD%20%EC%82%AC%ED%9A%8C&hl=ko&gl=KR&ceid=KR:ko',
}

const fallbackArticles = {
  'IT/기술': [
    {
      title: '로컬 샘플 데이터로 구성한 기술 브리핑',
      summary: '실제 API가 응답하지 않을 때도 앱이 멈추지 않도록 기본 요약 카드가 계속 보입니다.',
      source: 'Glance',
      time: '지금',
      link: 'https://example.com',
    },
  ],
  경제: [
    {
      title: '로컬 샘플 데이터로 구성한 경제 브리핑',
      summary: '경제 섹션도 동일하게 기본 상태를 유지하며 사용자 경험을 이어갑니다.',
      source: 'Glance',
      time: '지금',
      link: 'https://example.com',
    },
  ],
  사회: [
    {
      title: '로컬 샘플 데이터로 구성한 사회 브리핑',
      summary: '사회 이슈는 기본 안내 카드로 빠르게 확인할 수 있습니다.',
      source: 'Glance',
      time: '지금',
      link: 'https://example.com',
    },
  ],
}

function App() {
  const [activeCategory, setActiveCategory] = useState('IT/기술')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('glance-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    window.localStorage.setItem('glance-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await fetch(`${rssApiBase}?rss_url=${encodeURIComponent(rssFeeds[activeCategory])}`)

        if (!response.ok) {
          throw new Error('뉴스 API 응답이 올바르지 않습니다.')
        }

        const data = await response.json()
        const nextArticles = (data.items || [])
          .slice(0, 6)
          .map((item) => ({
            title: item.title || '제목이 없는 기사입니다.',
            summary: item.description ? item.description.replace(/<[^>]+>/g, '').trim() : '요약 정보가 제공되지 않았습니다.',
            source: item.author || 'Google News',
            time: item.pubDate ? new Date(item.pubDate).toLocaleString('ko-KR') : '방금',
            link: item.link || 'https://news.google.com/',
            thumbnail: item.thumbnail || item.enclosure?.link || '',
          }))

        setArticles(nextArticles.length > 0 ? nextArticles : fallbackArticles[activeCategory])
      } catch (error) {
        console.error(error)
        setErrorMessage('실시간 뉴스 연결이 불안정해 기본 브리핑으로 전환했습니다.')
        setArticles(fallbackArticles[activeCategory])
      } finally {
        setIsLoading(false)
      }
    }

    loadNews()
  }, [activeCategory])

  const items = articles.length > 0 ? articles : fallbackArticles[activeCategory]

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Daily briefing</p>
          <h1>Glance</h1>
          <p className="header-copy">
            오늘의 핵심 뉴스를 빠르게 훑어보는 경량 대시보드입니다.
          </p>
        </div>
        <button
          className="theme-toggle"
          onClick={() => setIsDarkMode((value) => !value)}
          type="button"
        >
          {isDarkMode ? '☀️ 라이트 모드' : '🌙 다크 모드'}
        </button>
      </header>

      <nav className="category-nav" aria-label="뉴스 카테고리">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </nav>

      <main className="dashboard-main">
        <section className="hero-card">
          <p className="eyebrow">오늘의 요약</p>
          <h2>{activeCategory} 핵심 브리핑</h2>
          <p>
            최신 이슈를 짧은 요약과 함께 정리해 빠르게 파악할 수 있도록 구성했습니다.
            로딩 상태와 에러 대응, 반응형 레이아웃까지 한 번에 확인할 수 있습니다.
          </p>
          <div className="hero-meta">
            <span>• 실시간 데이터 연결</span>
            <span>• 실패 시 대체 콘텐츠 제공</span>
          </div>
        </section>

        {isLoading ? (
          <section className="status-card" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <p>뉴스를 불러오는 중입니다. 잠시만 기다려 주세요.</p>
          </section>
        ) : null}

        {errorMessage ? (
          <section className="status-card error" aria-live="polite">
            <p>{errorMessage}</p>
          </section>
        ) : null}

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
                <p className="news-time">{item.time}</p>
              </div>
              <h3>{item.title}</h3>
              <p className="news-summary">{item.summary}</p>
              <a href={item.link} target="_blank" rel="noreferrer">
                자세히 보기
              </a>
            </article>
          ))}
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>데이터 출처: Hacker News Search API</p>
        <p>Glance는 매일 핵심 정보를 한눈에 보이도록 설계된 경량 대시보드입니다.</p>
      </footer>
    </div>
  )
}

export default App
