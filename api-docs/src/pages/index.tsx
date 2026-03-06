import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    icon: 'bx-rocket',
    description: (
      <>
        Botliy API was designed from the ground up to be easily installed and
        used to get your bot running quickly with detailed documentation.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    icon: 'bx-layer',
    description: (
      <>
        Botliy lets you focus on your core bot features, and we&apos;ll do the heavy lifting
        on analytics, fast upvotes, webhooks, and listing integration.
      </>
    ),
  },
  {
    title: 'Modern and Fast Webhooks',
    icon: 'bx-broadcast',
    description: (
      <>
        Built around real-time events, Botliy allows you to hook directly into
        your upvote actions almost instantaneously with HTTP POST webhooks.
      </>
    ),
  },
];

function Feature({ title, icon, description }: { title: string, icon: string, description: ReactNode }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{ marginBottom: '1rem' }}>
        <i className={`bx ${icon}`} style={{ fontSize: '4rem', color: 'var(--ifm-color-primary)' }}></i>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</Heading>
        <p style={{ opacity: 0.8 }}>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section style={{ padding: '4rem 0', width: '100%' }}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{
      background: 'transparent',
      padding: '8rem 0',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1.5rem', background: 'rgba(88,101,242,0.1)', padding: '6px 16px', borderRadius: '50px', border: '1px solid rgba(88,101,242,0.2)' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ifm-color-primary)' }}>v1 API NOW AVAILABLE</span>
        </div>

        <Heading as="h1" className="hero__title" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '4rem', lineHeight: '1.1', maxWidth: '800px', margin: '0 auto' }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '600px', margin: '1.5rem auto 2.5rem auto', lineHeight: '1.6' }}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons} style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro"
            style={{ fontWeight: 600, borderRadius: '8px', padding: '0.8rem 2rem' }}>
            Get Started <i className='bx bx-right-arrow-alt'></i>
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://Botliy.online"
            style={{ fontWeight: 600, borderRadius: '8px', padding: '0.8rem 2rem' }}>
            Main Website <i className='bx bx-link-external'></i>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`API Reference`}
      description="Official Botliy API documentation. Integrate your bot — post server counts, retrieve votes, and handle real-time voting webhooks.">
      <main style={{ display: 'flex', flexDirection: 'column' }}>
        <HomepageHeader />
        <div style={{ background: 'var(--ifm-background-surface-color)', borderTop: '1px solid var(--ifm-toc-border-color)' }}>
          <HomepageFeatures />
        </div>
      </main>
    </Layout>
  );
}
