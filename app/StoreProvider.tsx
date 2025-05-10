'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PropsWithChildren } from 'react';
import { makeStore } from '@/features/store';

export default function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef(makeStore())

  return <Provider store={storeRef.current}>{children}</Provider>
}