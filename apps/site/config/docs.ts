import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Projets",
      href: "/projets",
    },
    {
      title: "Cahier de brouillon",
      href: "/cahier-de-brouillon",
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/yves-lecointre-6444a3187/",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Projets phares",
      items: [
        {
          title: "Introduction",
          href: "/projets",
          items: [],
        },
        {
          title: "Kador",
          href: "/projets/kador",
          items: [],
        },
      ],
    },
    {
      title: "Autres projets",
      items: [
        {
          title: "Accordion",
          href: "/projets/accordion",
          items: [],
        },
      ],
    },
  ],
}
