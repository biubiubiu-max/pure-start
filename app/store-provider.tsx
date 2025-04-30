'use client'
import {useRef} from 'react'
import {Provider} from 'react-redux'
import {makeStore, AppStore} from '@/lib/store'

type IBChildren = {
  children: React.ReactNode
}

export default function StoreProvider({children}: IBChildren) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
