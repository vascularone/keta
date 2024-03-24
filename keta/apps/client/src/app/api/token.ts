import { create } from 'zustand'

interface TokenContextProps {
  token?: string
  setToken(token: string): void
  clear(): void
}

export const tokenStore = create<TokenContextProps>((set) => ({
  token: undefined,
  setToken: (token: string) => set({ token }),
  clear: () => set({ token: undefined }),
}))
