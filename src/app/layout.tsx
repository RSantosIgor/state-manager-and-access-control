'use client';
import './globals.css'
import type { Metadata } from 'next'
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'State manager and access control',
  description: 'State manager and access control app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
