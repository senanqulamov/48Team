import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "../globals.css"
import CustomCursor from "@/components/CustomCursor"
import PerformanceGuard from "@/components/PerformanceGuard"
import { siteConfig, absoluteUrl } from "@/lib/seo"

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.baseUrl),
    title: {
        default: siteConfig.defaultTitle,
        template: siteConfig.titleTemplate,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    generator: "Next.js",
    openGraph: {
        type: "website",
        url: siteConfig.baseUrl,
        title: siteConfig.defaultTitle,
        description: siteConfig.description,
        siteName: siteConfig.siteName,
        locale: siteConfig.locale,
        images: [
            {
                url: absoluteUrl(siteConfig.socialBanner),
                width: 1200,
                height: 630,
                alt: siteConfig.defaultTitle,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: `@${siteConfig.author.twitter}`,
        creator: `@${siteConfig.author.twitter}`,
        title: siteConfig.defaultTitle,
        description: siteConfig.description,
        images: [absoluteUrl(siteConfig.socialBanner)],
    },
    alternates: {
        canonical: siteConfig.baseUrl,
    },
    icons: {
        icon: "/logo_ico.png",
        shortcut: "/logo_ico.png",
        apple: "/logo_ico.png",
    },
    category: "portfolio",
}

function StructuredData() {
    const data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": absoluteUrl("/#person"),
                name: siteConfig.author.name,
                url: siteConfig.baseUrl,
                image: absoluteUrl(siteConfig.author.avatar || "/logo_ico.png"),
                sameAs: [
                    `https://twitter.com/${siteConfig.author.twitter}`,
                    `https://github.com/${siteConfig.author.github}`,
                ],
                jobTitle: "Programmer / Therapist / Founder",
                description: siteConfig.description,
            },
            {
                "@type": "WebSite",
                "@id": absoluteUrl("/#website"),
                url: siteConfig.baseUrl,
                name: siteConfig.siteName,
                description: siteConfig.description,
                publisher: { "@id": absoluteUrl("/#person") },
                inLanguage: "en-US",
            },
            {
                "@type": "Organization",
                "@id": absoluteUrl("/#org"),
                name: siteConfig.siteName,
                url: siteConfig.baseUrl,
                logo: {
                    "@type": "ImageObject",
                    url: absoluteUrl("/logo_ico.png"),
                },
                founder: { "@id": absoluteUrl("/#person") },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: siteConfig.baseUrl,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Insights",
                        item: absoluteUrl("/blogs"),
                    },
                ],
            },
            {
                "@type": "ItemList",
                name: "Featured Articles",
                itemListOrder: "http://schema.org/ItemListOrderAscending",
                numberOfItems: 3,
                itemListElement: [
                    // This will be enhanced per-page where needed
                ],
            },
        ],
    }
    return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

function KnowledgeGraph() {
    const personLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Senan Qulamov",
        "alternateName": "Sanan Gulamov",
        "url": "https://48team.space",
        "image": "https://48team.space/images/mine/me4.png",
        "jobTitle": "Programmer, Therapist & Founder",
        "worksFor": {
            "@type": "Organization",
            "name": "48Team",
            "url": "https://48team.space"
        },
        "sameAs": [
            "https://www.instagram.com/senanqulamov",
            "https://www.linkedin.com/in/senan-qulamov",
            "https://github.com/senanqulamov"
        ]
    }
    return (
        <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
    )
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
        <head>
            <title>{siteConfig.defaultTitle}</title>
            <link rel="alternate" type="application/rss+xml" title={`${siteConfig.siteName} RSS Feed`} href="/rss.xml" />
            <StructuredData />
            <KnowledgeGraph />
        </head>
        <body className="font-sans antialiased">
        <PerformanceGuard />
        <CustomCursor />
        {children}
        </body>
        </html>
    )
}
