import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Botliy Developer',
  tagline: 'Integrate your Discord bot with real-time voting, analytics, and webhooks — all in one REST API.',
  favicon: 'img/botliy-logo.png',

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap',
      type: 'text/css',
    },
    {
      href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
      type: 'text/css',
    },
  ],

  future: {
    v4: true,
  },

  url: 'https://botliy.online',
  baseUrl: '/',

  organizationName: 'Botliy',
  projectName: 'botliy-docs',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Botliy/botliy-docs/tree/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-card.png',

    metadata: [
      { name: 'theme-color', content: '#5865f2' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    announcementBar: {
      id: 'v1-launch',
      content: '🚀 &nbsp; Botliy API v1 is now generally available. <a href="/docs/intro" style="color:inherit;font-weight:600">Read the docs →</a>',
      backgroundColor: 'rgba(88,101,242,0.1)',
      textColor: 'var(--ifm-color-primary)',
      isCloseable: true,
    },

    navbar: {
      title: 'Botliy Developer',
      logo: {
        alt: 'Botliy Logo',
        src: 'img/botliy-logo.png',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'API Reference',
        },
        {
          href: 'https://botliy.online/',
          label: 'Dashboard',
          position: 'right',
        },
        {
          href: 'https://discord.gg/NB4TgjvyTk',
          label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://botliy.online',
          label: 'botliy.online',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'authorization', to: '/docs/authorization' },
            { label: 'Webhooks', to: '/docs/webhooks' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord Server', href: 'https://discord.gg/NB4TgjvyTk' },
            { label: 'GitHub', href: 'https://github.com/Botliy' },
          ],
        },
        {
          title: 'Product',
          items: [
            { label: 'Dashboard', href: 'https://botliy.online/' },
            { label: 'Status', href: 'https://status.botliy.online' },
            { label: 'Website', href: 'https://botliy.online' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Botliy.online. All rights reserved.`,
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'json', 'typescript', 'javascript', 'python', 'http'],
    },

    algolia: undefined, // Add your Algolia config here when ready
  } satisfies Preset.ThemeConfig,
};

export default config;