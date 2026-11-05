import { useEffect, useState } from 'react';
import { BrandWordmark } from '@/components/Logo';
import { site } from '@/data/site';

const sections = [
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'approach', label: 'Our Approach' },
  { id: 'process', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

/** On the home page links are in-page anchors; elsewhere they point back to it. */
export function sectionLinks(onHome: boolean) {
  return sections.map((s) => ({ href: `${onHome ? '' : '/'}#${s.id}`, label: s.label }));
}

export default function SiteHeader({ onHome = false }: { onHome?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 24);
      setProgress(height > 0 ? Math.min(scrollTop / height, 1) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav" data-scrolled={scrolled}>
      <div className="nav-inner">
        <a
          href={onHome ? '#home' : '/'}
          className="logo"
          aria-label={onHome ? `${site.brandName} - back to top` : `${site.brandName} - home`}
        >
          <BrandWordmark />
        </a>

        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
        </button>

        <nav id="nav-links" className="nav-links" data-open={menuOpen}>
          {sectionLinks(onHome).map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})`, width: '100%' }} />
    </header>
  );
}
