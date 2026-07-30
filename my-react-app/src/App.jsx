import { useEffect, useState } from 'react'
import './App.css'

const categories = ['IT/기술', '경제', '사회']

const newsByCategory = {
  'IT/기술': [
    {
      title: 'AI 기반 개인 비서 서비스가 새 주간 기능을 확대합니다',
      summary: '사용자 맞춤형 요약과 일정 관리 기능이 추가되어 일상 업무 흐름을 더 빠르게 정리할 수 있습니다.',
      source: 'Tech Pulse',
      time: '12분 전',
      link: 'https://example.com',
    },
    {
      title: '반도체 업계가 차세대 생산라인 투자에 속도를 냅니다',
      summary: '국내 기업들의 시설 확장 계획이 이어지며 산업 전반의 관심도가 높아지고 있습니다.',
      source: 'Korea Industry',
      time: '38분 전',
      link: 'https://example.com',
    },
    {
      title: '클라우드 보안 플랫폼의 자동 대응 기능이 강화됐습니다',
      summary: '위협 탐지와 대응 속도를 높이기 위해 실시간 경보 연계 기능이 추가되었습니다.',
      source: 'Security Weekly',
      time: '1시간 전',
      link: 'https://example.com',
    },
  ],
  경제: [
    {
      title: '금리 안정 기대감에 증시 변동성이 완화되고 있습니다',
      summary: '최근 지표가 안정적으로 나오면서 투자자 심리가 조금씩 회복세를 보이고 있습니다.',
      source: 'Market Brief',
      time: '20분 전',
      link: 'https://example.com',
    },
    {
      title: '중소기업 채용 지원 정책이 확대될 전망입니다',
      summary: '정부 지원책이 이어지며 지역 기반 일자리 창출에 대한 기대가 커지고 있습니다.',
      source: 'Economic Note',
      time: '49분 전',
      link: 'https://example.com',
    },
    {
      title: '부동산 시장의 실수요 관점 분석이 주목받고 있습니다',
      summary: '실거주 중심의 거래 패턴이 이어지며 중장기 시각에서의 관찰이 증가하고 있습니다.',
      source: 'Housing Desk',
      time: '2시간 전',
      link: 'https://example.com',
    },
  ],
  사회: [
    {
      title: '지역 커뮤니티 기반 봉사 활동이 활발하게 이어지고 있습니다',
      summary: '주민 참여형 프로그램이 늘어나며 생활 밀착형 사회 이슈에 대한 관심이 높아지고 있습니다.',
      source: 'Local Life',
      time: '10분 전',
      link: 'https://example.com',
    },
    {
      title: '교통 혼잡 완화를 위한 시범 정책이 확대되고 있습니다',
      summary: '출퇴근 시간대 운영 개선과 대중교통 연계 서비스가 함께 검토되고 있습니다.',
      source: 'City Report',
      time: '34분 전',
      link: 'https://example.com',
    },
    {
      title: '환경 캠페인 참여율이 높아지며 관심도가 증가했습니다',
      summary: '플라스틱 감소와 재활용 실천 캠페인이 지역사회에서 꾸준히 확산되고 있습니다.',
      source: 'Green Today',
      time: '3시간 전',
      link: 'https://example.com',
    },
  ],
}

function App() {
  const [activeCategory, setActiveCategory] = useState('IT/기술')
  const [isDarkMode, setIsDarkMode] = useState(false)

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

  const items = newsByCategory[activeCategory] ?? newsByCategory['IT/기술']

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
            로딩과 에러 상태, 반응형 레이아웃까지 첫 단계에서 바로 확인할 수 있게 준비했습니다.
          </p>
          <div className="hero-meta">
            <span>• 업데이트 반영 중</span>
            <span>• 외부 API 연동 준비 완료</span>
          </div>
        </section>

        <section className="news-grid" aria-label="뉴스 카드 목록">
          {items.map((item) => (
            <article key={item.title} className="news-card">
              <div className="news-card-top">
                <p className="news-source">{item.source}</p>
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
        <p>데이터 출처: 공공/오픈 뉴스 API 연동 예정</p>
        <p>Glance는 매일 핵심 정보를 한눈에 보이도록 설계된 경량 대시보드입니다.</p>
      </footer>
    </div>
  )
}

export default App
