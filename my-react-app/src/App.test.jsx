import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows a loading state and then a fallback message when news loading fails', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValue(new Error('network error'))

    render(<App />)

    expect(screen.getByText(/뉴스를 불러오는 중/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/실시간 뉴스 연결이 불안정해/i)).toBeInTheDocument()
    })
  })

  it('reloads headlines when the refresh button is clicked', async () => {
    const fetchMock = vi.mocked(globalThis.fetch)
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ items: [] }),
    })

    render(<App />)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    fetchMock.mockClear()
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ items: [] }),
    })

    fireEvent.click(screen.getByRole('button', { name: /새로고침/i }))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })
  })

  it('shows a featured story card for the top article', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        items: [
          {
            title: 'AI가 한국 산업을 바꾸고 있습니다',
            description: '<p>국내 기업들이 AI를 도입하며 생산성과 효율을 높이고 있습니다.</p>',
            pubDate: '2026-07-30 10:00:00',
            link: 'https://example.com/ai',
            thumbnail: 'https://example.com/thumb.png',
            author: 'Glance',
          },
        ],
      }),
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/주요 기사/i)).toBeInTheDocument()
    })

    expect(screen.getAllByText(/AI가 한국 산업을 바꾸고 있습니다/i).length).toBeGreaterThan(0)
  })

  it('renders article cards with thumbnails and summaries when the API succeeds', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        items: [
          {
            title: 'AI가 한국 산업을 바꾸고 있습니다',
            description: '<p>국내 기업들이 AI를 도입하며 생산성과 효율을 높이고 있습니다.</p>',
            pubDate: '2026-07-30 10:00:00',
            link: 'https://example.com/ai',
            thumbnail: 'https://example.com/thumb.png',
            author: 'Glance',
          },
        ],
      }),
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getAllByText(/AI가 한국 산업을 바꾸고 있습니다/i).length).toBeGreaterThan(0)
    })

    expect(screen.getByAltText(/뉴스 미리보기/i)).toBeInTheDocument()
    expect(screen.getAllByText(/국내 기업들이 AI를 도입하며 생산성과 효율을 높이고 있습니다/i).length).toBeGreaterThan(0)
  })
})
