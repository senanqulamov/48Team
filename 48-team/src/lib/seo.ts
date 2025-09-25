// Centralized SEO & site configuration
// Adjust baseUrl to your production domain.
export const siteConfig = {
  baseUrl: "https://48team.space",
  siteName: "The 48 Team | Senan Qulamov",
  titleTemplate: "%s | The 48 Team",
  defaultTitle: "Senan Qulamov - Programmer, Therapist & Founder",
  description: "Portfolio & insights by Senan Qulamov – Programmer, Therapist & Founder of NeoSphere startup. Build. Connect. Create.",
  keywords: [
    "senan qulamov",
    "senan gulamov",
    "48team",
    "48 team",
    "programmer",
    "therapist",
    "founder",
    "neosphere",
    "bidbary",
    "portfolio",
    "web development",
    "startup",
    "remote work"
  ],
  author: {
    name: "Senan Qulamov",
    url: "https://48team.space",
    avatar: "/images/mine/me4.png",
    twitter: "senanqulamov", // without @
    github: "senanqulamov"
  },
  socialBanner: "/images/mine/me4.png",
  locale: "en_US"
}

export const absoluteUrl = (path: string = "") => {
  const base = siteConfig.baseUrl.replace(/\/$/, "")
  if (!path) return base
  return base + (path.startsWith("/") ? path : `/${path}`)
}

