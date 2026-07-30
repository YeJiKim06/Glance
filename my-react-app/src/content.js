export const categories = ['IT/기술', '경제', '사회', '세계', '미국 가십', '한국 연예', 'OTT/드라마/예능', '최신 개봉 영화', '개봉 예정작']

export const categoryHighlights = {
  '한국 연예': {
    eyebrow: 'Entertainment',
    summary: '배우, 드라마, 예능, 스캔들까지 한 번에 확인하는 한국 연예 섹션입니다.',
    badge: '연예 소식',
  },
  'OTT/드라마/예능': {
    eyebrow: 'OTT & Series',
    summary: '신작, 시즌, 플랫폼 업데이트를 한눈에 모아보는 OTT·드라마·예능 브리핑입니다.',
    badge: 'OTT/드라마/예능',
  },
  '최신 개봉 영화': {
    eyebrow: 'Cinema',
    summary: '최근 개봉한 영화와 박스오피스 흐름을 빠르게 파악하는 영화 섹션입니다.',
    badge: '개봉 영화',
  },
  '개봉 예정작': {
    eyebrow: 'Coming Soon',
    summary: '기대작과 공개 일정, 배우 라인업을 미리 확인할 수 있는 섹션입니다.',
    badge: '기대작',
  },
}

export const rssFeeds = {
  'IT/기술': 'https://news.google.com/rss/search?q=%ED%95%9C%EA%B5%AD%20IT%20%EA%B8%B0%EC%88%A0&hl=ko&gl=KR&ceid=KR:ko',
  경제: 'https://news.google.com/rss/search?q=%ED%95%9C%EA%B5%AD%20%EA%B2%BD%EC%A0%9C&hl=ko&gl=KR&ceid=KR:ko',
  사회: 'https://news.google.com/rss/search?q=%ED%95%9C%EA%B5%AD%20%EC%82%AC%ED%9A%8C&hl=ko&gl=KR&ceid=KR:ko',
  세계: 'https://news.google.com/rss/search?q=%EA%B5%AD%EC%A0%9C%20%EC%9D%B4%EC%8A%88&hl=ko&gl=KR&ceid=KR:ko',
  '미국 가십': 'https://news.google.com/rss/search?q=%EB%AF%B8%EA%B5%AD%20%EC%97%94%ED%84%B0%ED%85%8C%EC%9D%B8%EB%A8%BC%ED%8A%B7%20%EA%B0%80%EC%8B%AD&hl=ko&gl=KR&ceid=KR:ko',
  '한국 연예': 'https://news.google.com/rss/search?q=%ED%95%9C%EA%B5%AD%20%EC%97%B0%EC%98%88%20%EB%89%84%EB%A6%AC&hl=ko&gl=KR&ceid=KR:ko',
  'OTT/드라마/예능': 'https://news.google.com/rss/search?q=%ED%95%9C%EA%B5%AD%20OTT%20%EB%93%80%EB%9D%BC%20%EC%98%88%EB%8A%A5&hl=ko&gl=KR&ceid=KR:ko',
  '최신 개봉 영화': 'https://news.google.com/rss/search?q=%ED%95%9C%EA%B5%AD%20%EA%B0%9C%EB%B4%89%20%EC%98%81%ED%99%94%20%EC%98%81%EA%B3%B5&hl=ko&gl=KR&ceid=KR:ko',
  '개봉 예정작': 'https://news.google.com/rss/search?q=%ED%95%9C%EA%B5%AD%20%EA%B0%9C%EB%B4%89%20%EC%98%88%EC%A0%95%EC%9E%91%20%EC%98%81%EA%B3%B5&hl=ko&gl=KR&ceid=KR:ko',
}

export const youtubeLinks = [
  {
    title: 'Celebrity News Breakdown',
    description: '해외 연예계 이슈를 빠르게 훑어보는 영상',
    link: 'https://www.youtube.com/results?search_query=celebrity+news+today',
  },
  {
    title: 'Entertainment Gossip Recap',
    description: '미국 가십과 연예계 소식을 정리한 영상',
    link: 'https://www.youtube.com/results?search_query=entertainment+gossip+today',
  },
  {
    title: 'Pop Culture Headlines',
    description: '팝 컬처와 스타 이슈를 바로 확인하는 영상',
    link: 'https://www.youtube.com/results?search_query=pop+culture+headlines',
  },
]

export const fallbackArticles = {
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
  세계: [
    {
      title: '국제 이슈를 한눈에 보는 세계 뉴스 브리핑',
      summary: '다양한 국가의 주요 이슈와 글로벌 흐름을 짧게 정리해 제공합니다.',
      source: 'Glance',
      time: '지금',
      link: 'https://example.com',
    },
  ],
  '미국 가십': [
    {
      title: '미국 엔터테인먼트와 연예계 이슈를 간단히 살펴보는 카드',
      summary: '가십성 뉴스와 미국 연예계 이슈를 가볍게 훑어볼 수 있는 섹션입니다.',
      source: 'Glance',
      time: '지금',
      link: 'https://example.com',
    },
  ],
  '한국 연예': [
    {
      title: '한국 연예계 이슈를 빠르게 훑는 브리핑',
      summary: '드라마, 배우, 예능, 스캔들까지 한눈에 확인할 수 있는 섹션입니다.',
      source: 'Glance',
      time: '지금',
      link: 'https://example.com',
    },
  ],
  'OTT/드라마/예능': [
    {
      title: 'OTT와 드라마, 예능 소식 모음',
      summary: '새 시즌, 화제작, 플랫폼 업데이트까지 함께 정리해드립니다.',
      source: 'Glance',
      time: '지금',
      link: 'https://example.com',
    },
  ],
  '최신 개봉 영화': [
    {
      title: '최근 개봉한 영화와 관객 반응 정리',
      summary: '흥행작과 화제작의 최신 개봉 정보를 한눈에 확인할 수 있습니다.',
      source: 'Glance',
      time: '지금',
      link: 'https://example.com',
    },
  ],
  '개봉 예정작': [
    {
      title: '개봉 예정작과 기대감을 미리 살펴보는 카드',
      summary: '기대작, 배우 라인업, 장르별 공개 일정까지 미리 확인합니다.',
      source: 'Glance',
      time: '지금',
      link: 'https://example.com',
    },
  ],
}
