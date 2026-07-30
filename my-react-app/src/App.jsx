import React, { useEffect, useState } from 'react'
import './App.css'
import CategoryNav from './components/CategoryNav'
import NewsCardList from './components/NewsCardList'
import SchedulePanel from './components/SchedulePanel'
import VideoPanel from './components/VideoPanel'
import { categories, categoryHighlights, rssFeeds, youtubeLinks, fallbackArticles } from './content'

const rssApiBase = 'https://api.rss2json.com/v1/api.json'

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

  const loadNews = async (category = activeCategory) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch(`${rssApiBase}?rss_url=${encodeURIComponent(rssFeeds[category])}`)

      if (!response.ok) {
        throw new Error('뉴스 API 응답이 올바르지 않습니다.')
      }

      const data = await response.json()
      const nextArticles = (data.items || [])
        .slice(0, 9)
        .map((item) => ({
          title: item.title || '제목이 없는 기사입니다.',
          summary: item.description ? item.description.replace(/<[^>]+>/g, '').trim() : '요약 정보가 제공되지 않았습니다.',
          source: item.author || 'Google News',
          time: item.pubDate ? new Date(item.pubDate).toLocaleString('ko-KR') : '방금',
          link: item.link || 'https://news.google.com/',
          thumbnail: item.thumbnail || item.enclosure?.link || '',
        }))

      setArticles(nextArticles.length > 0 ? nextArticles : fallbackArticles[category])
    } catch (error) {
      console.error(error)
      setErrorMessage('실시간 뉴스 연결이 불안정해 기본 브리핑으로 전환했습니다.')
      setArticles(fallbackArticles[category])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadNews(activeCategory)
  }, [activeCategory])

  const items = articles.length > 0 ? articles : fallbackArticles[activeCategory]
  const featuredStory = items[0]
  const highlight = categoryHighlights[activeCategory]

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
        <div className="header-actions">
          <button
            className="refresh-button"
            onClick={() => loadNews(activeCategory)}
            type="button"
            disabled={isLoading}
          >
            {isLoading ? '불러오는 중…' : '새로고침'}
          </button>
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode((value) => !value)}
            type="button"
          >
            {isDarkMode ? '☀️ 라이트 모드' : '🌙 다크 모드'}
          </button>
        </div>
      </header>

      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <main className="dashboard-main">
        <section className={`hero-card ${['한국 연예', 'OTT/드라마/예능', '최신 개봉 영화', '개봉 예정작'].includes(activeCategory) ? 'hero-card-entertainment' : ''}`}>
          <p className="eyebrow">오늘의 요약</p>
          <h2>{activeCategory} 핵심 브리핑</h2>
          <p>
            {highlight ? highlight.summary : '최신 이슈를 짧은 요약과 함께 정리해 빠르게 파악할 수 있도록 구성했습니다.'}
          </p>
          <div className="hero-meta">
            <span className="live-pill">● 실시간 뉴스 브리핑</span>
            <span>• 최신 이슈를 빠르게 확인</span>
            <span>• 실패 시 대체 콘텐츠 제공</span>
            {highlight ? <span>• {highlight.badge}</span> : null}
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

        {['미국 가십', '한국 연예', 'OTT/드라마/예능'].includes(activeCategory) ? (
          <VideoPanel links={youtubeLinks} />
        ) : null}

        {['한국 연예', 'OTT/드라마/예능', '최신 개봉 영화', '개봉 예정작'].includes(activeCategory) ? (
          <SchedulePanel />
        ) : null}

        {featuredStory ? (
          <section className="featured-story" aria-label="주요 기사">
            <div className="featured-story-copy">
              <p className="eyebrow">주요 기사</p>
              <h3>{featuredStory.title}</h3>
              <p>{featuredStory.summary}</p>
            </div>
            <a href={featuredStory.link} target="_blank" rel="noreferrer">
              바로 읽기
            </a>
          </section>
        ) : null}

        <NewsCardList items={items} />
      </main>

      <footer className="dashboard-footer">
        <p>데이터 출처: Hacker News Search API</p>
        <p>Glance는 매일 핵심 정보를 한눈에 보이도록 설계된 경량 대시보드입니다.</p>
      </footer>
    </div>
  )
}

export default App
