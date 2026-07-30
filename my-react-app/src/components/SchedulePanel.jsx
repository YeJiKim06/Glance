import React from 'react'

const scheduleItems = [
  { day: '03', title: '새 시즌 공개', tag: 'OTT' },
  { day: '07', title: '개봉 예정작 발표', tag: '영화' },
  { day: '12', title: '유튜브 업로드', tag: '리뷰' },
  { day: '18', title: '예능 신작 런칭', tag: '예능' },
  { day: '24', title: '드라마 첫화 공개', tag: '드라마' },
  { day: '29', title: '영화 예고편 공개', tag: '예고편' },
]

function SchedulePanel() {
  return (
    <section className="schedule-panel" aria-label="이번 달 일정">
      <div className="schedule-panel-header">
        <div>
          <p className="eyebrow">Schedule</p>
          <h3>이번 달 일정 캘린더</h3>
        </div>
        <span className="schedule-pill">예정 / 업로드</span>
      </div>
      <div className="schedule-grid">
        {scheduleItems.map((item) => (
          <div key={`${item.day}-${item.title}`} className="schedule-item">
            <div className="schedule-day">{item.day}</div>
            <div className="schedule-copy">
              <strong>{item.title}</strong>
              <span>{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SchedulePanel
