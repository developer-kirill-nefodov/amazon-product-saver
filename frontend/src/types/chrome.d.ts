/// <reference types="chrome" />

declare namespace chrome {
  interface RuntimeMessage {
    action: string
    data?: any
  }

  interface RuntimeSender {
    tab?: chrome.tabs.Tab
    frameId?: number
    id?: string
    url?: string
    tlsChannelId?: string
  }

  interface RuntimeSendResponse {
    (response?: any): void
  }
} 