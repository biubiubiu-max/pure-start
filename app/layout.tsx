import "@/styles/globals.css"
import {Inter} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider"
import React from "react";
import StoreProvider from "@/app/store-provider";
import {Toaster} from "sonner";

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <title>极简起始页 - 摒弃繁杂，唯有纯粹</title>
                <meta name="description" content="极简起始页，一个简洁、高效的起始页，采用现代化设计，帮助你专注于工作和学习。"/>

                <meta name="keywords" content="极简, 起始页, 简洁, 高效, 主页, 生产力, 专注, 任务管理"/>
                <meta name="author" content="grtsinry43"/>
                <meta name="robots" content="index, follow"/>

                <meta property="og:type" content="website"/>
                <meta property="og:title" content="极简起始页 - 摒弃繁杂，唯有纯粹"/>
                <meta property="og:description" content="极简起始页，一个简洁、高效的起始页，采用现代化设计，帮助你专注于工作和学习。"/>
                <meta property="og:url" content="https://whatmin.com"/>
                <meta property="og:site_name" content="whatmin"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="极简起始页 - 摒弃繁杂，唯有纯粹"/>
                <meta name="twitter:description" content="极简起始页，一个简洁、高效的起始页，采用现代化设计，帮助你专注于工作和学习。"/>

                <link rel="icon" href="/favicon.ico"/>
            </head>

            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <StoreProvider>
                        {children}
                        <Toaster/>
                    </StoreProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}

