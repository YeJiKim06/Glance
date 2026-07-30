import React from 'react'

const scheduleItems = [
  { date: 3, title: '새 시즌 공개', tag: 'OTT' },
  { date: 7, title: '개봉 예정작 발표', tag: '영화' },
  { date: 12, title: '유튜브 업로드', tag: '리뷰' },
  { date: 18, title: '예능 신작 런칭', tag: '예능' },
  { date: 24, title: '드라마 첫화 공개', tag: '드라마' },
  { date: 29, title: '영화 예고편 공개', tag: '예고편' },
]

function SchedulePanel() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const monthLabel = `${year}년 ${month + 1}월`
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const weekdayLabels = ['일', '월', '화', '수', '목', '금', '토']
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
  const calendarCells = Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - firstDay + 1

    if (dayNumber < 1 || dayNumber > daysInMonth) {
      return null
    }

    const events = scheduleItems.filter((item) => item.date === dayNumber)

    return {
      dayNumber,
      isToday: dayNumber === today.getDate(),
      events,
    }
  })

  const upcomingEvents = scheduleItems.filter((item) => item.date >= today.getDate()).slice(0, 3)

  return (
    <section className="schedule-panel" aria-label="이번 달 일정">
      <div className="schedule-panel-header">
        <div>
          <p className="eyebrow">Schedule</p>
          <h3>이번 달 일정 캘린더</h3>
        </div>
        <span className="schedule-pill">예정 / 업로드</span>
      </div>

      <div className="schedule-calendar-shell">
        <div className="schedule-calendar-heading">
          <h4>{monthLabel}</h4>
          <p>이달의 주요 공개 일정과 업로드를 한눈에 확인하세요.</p>
        </div>

        <div className="schedule-calendar-grid" role="grid" aria-label="월간 캘린더">
          {weekdayLabels.map((label) => (
            <div key={label} className="calendar-weekday">
              {label}
            </div>
          ))}

          {calendarCells.map((cell, index) => {
            if (!cell) {
              return <div key={`empty-${index}`} className="calendar-cell calendar-cell--empty" />
            }

            return (
              <div
                key={cell.dayNumber}
                role="gridcell"
                className={`calendar-cell ${cell.isToday ? 'calendar-cell--today' : ''} ${cell.events.length > 0 ? 'calendar-cell--event' : ''}`}
              >
                <div className="calendar-day-number">{cell.dayNumber}</div>
                <div className="calendar-event-list">
                  {cell.events.slice(0, 2).map((event) => (
                    <span key={`${cell.dayNumber}-${event.title}`} className="calendar-event">
                      {event.title}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="schedule-upcoming">
          <h5>다가오는 일정</h5>
          <ul>
            {upcomingEvents.map((item) => (
              <li key={`${item.date}-${item.title}`}>
                <strong>{item.date}일</strong>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SchedulePanel
