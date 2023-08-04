'use client'

import { MenuProvider } from "@/contexts/MenuContext";
import { ReactNode } from "react";

type RootLayoutProps = {
    children: ReactNode
}

export function Providers({ children }: RootLayoutProps) {
    return (
        <MenuProvider>{children}</MenuProvider>
    )
}