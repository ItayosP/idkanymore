'use client';

import { SessionProvider } from 'next-auth/react';
import { CacheProvider } from '@emotion/react'
import { createRtlCache } from './utils/rtl'

const rtlCache = createRtlCache();

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <CacheProvider value={rtlCache}>
        {children}
      </CacheProvider>
    </SessionProvider>
  )
} 