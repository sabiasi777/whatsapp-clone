"use client"

import { ReactNode } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import React from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({ children }: { children: ReactNode}) {
    return <ConvexProvider client={convex}>{children}</ConvexProvider>
}