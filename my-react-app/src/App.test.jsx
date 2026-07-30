import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
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
})
