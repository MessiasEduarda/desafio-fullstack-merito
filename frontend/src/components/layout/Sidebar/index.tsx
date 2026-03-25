import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, ArrowLeftRight, Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';
import {
  mobileMenuButton,
  overlay,
  sidebarContainer,
  sidebarContainerOpen,
  sidebarContainerClose,
  collapseButton,
  topSectionMobileOverride,
  titleText,
  subtitleText,
  logoCollapsed,
  logoLetter,
  dividerLine,
  nav,
  sectionDividerWrap,
  sectionDividerLine,
  sectionDividerLabel,
  navItemBase,
  navItemActive,
  navItemInactive,
  navItemBar,
  navItemBarActive,
  navItemBarInactive,
  navItemIconWrap,
  navItemIconActive,
  navItemIconInactive,
  navItemTextBase,
  navItemTextActive,
  navItemTextInactive,
  tooltip,
} from './styles';

interface NavItem {
  to: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  end?: boolean;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const sections: NavSection[] = [
  {
    label: 'Visão Geral',
    items: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: 'Operações',
    items: [
      { to: '/funds',        label: 'Fundos',        icon: TrendingUp },
      { to: '/transactions', label: 'Movimentações', icon: ArrowLeftRight },
    ],
  },
];

function lineTransition(collapsed: boolean): React.CSSProperties {
  return {
    transform: `scaleX(${collapsed ? 0 : 1})`,
    opacity: collapsed ? 0 : 1,
    transition: [
      `transform ${collapsed ? '0.2s' : '0.65s'} cubic-bezier(0.25,0.46,0.45,0.94) ${collapsed ? '0s' : '0.15s'}`,
      `opacity   ${collapsed ? '0.15s' : '0.4s'} ease ${collapsed ? '0s' : '0.15s'}`,
    ].join(', '),
  };
}

function labelTransition(collapsed: boolean): React.CSSProperties {
  return {
    opacity: collapsed ? 0 : 1,
    transform: `translateY(${collapsed ? '-5px' : '0'})`,
    transition: [
      `opacity   ${collapsed ? '0.12s' : '0.35s'} ease ${collapsed ? '0s' : '0.3s'}`,
      `transform ${collapsed ? '0.12s' : '0.4s'} cubic-bezier(0.34,1.4,0.64,1) ${collapsed ? '0s' : '0.28s'}`,
    ].join(', '),
  };
}

function textTransition(collapsed: boolean, isMobile: boolean): React.CSSProperties {
  return {
    maxWidth: !isMobile && collapsed ? 0 : 170,
    opacity: !isMobile && collapsed ? 0 : 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    transition: [
      `opacity   ${collapsed ? '0.1s' : '0.2s'} ease ${collapsed ? '0s' : '0.2s'}`,
      'max-width 0.4s cubic-bezier(0.4,0,0.2,1)',
    ].join(', '),
  };
}

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (collapsed) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setCollapsed(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [collapsed]);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={mobileMenuButton}>
        <Menu size={24} />
      </button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className={overlay} />
      )}

      <div
        ref={navbarRef}
        style={{ width: collapsed ? 64 : 240, minWidth: collapsed ? 64 : 240 }}
        className={`${sidebarContainer} ${isOpen ? sidebarContainerOpen : sidebarContainerClose}`}
      >
        <div className="w-full">

          <button
            onClick={() => setCollapsed((prev) => !prev)}
            title={collapsed ? 'Expandir menu' : 'Recolher menu'}
            className={collapseButton}
          >
            {collapsed ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <line x1="3"  y1="6"  x2="14" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3"  y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3"  y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="16,8 19,11 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <line x1="8"  y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8"  y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8"  y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="6,8 3,11 6,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            )}
          </button>

          <div
            style={{
              maxWidth:    collapsed ? 0 : 240,
              opacity:     collapsed ? 0 : 1,
              paddingLeft: collapsed ? 0 : 20,
              marginTop:   52,
              overflow:    'hidden',
              whiteSpace:  'nowrap',
              transition: [
                'max-width 0.4s cubic-bezier(0.4,0,0.2,1)',
                `opacity ${collapsed ? '0.15s' : '0.25s'} ease ${collapsed ? '0s' : '0.15s'}`,
                'padding-left 0.4s cubic-bezier(0.4,0,0.2,1)',
              ].join(', '),
            }}
            className={topSectionMobileOverride}
          >
            <h1 style={{ fontFamily: 'Georgia, serif' }} className={titleText}>
              Mérito
            </h1>
            <p className={subtitleText}>Dashboard de Investimentos</p>
          </div>

          {/* Logo colapsado */}
          <div
            style={{
              opacity:    collapsed ? 1 : 0,
              maxHeight:  collapsed ? 80 : 0,
              marginTop:  collapsed ? -80 : 0,
              transform:  collapsed ? 'scale(1)' : 'scale(0.85)',
              visibility: collapsed ? 'visible' : 'hidden',
              overflow:   'hidden',
              transition: [
                `opacity   ${collapsed ? '0.25s' : '0.15s'} ease ${collapsed ? '0.2s' : '0s'}`,
                'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                'margin-top 0.4s cubic-bezier(0.4,0,0.2,1)',
                'visibility 0.4s ease',
                `transform  ${collapsed ? '0.35s' : '0.15s'} cubic-bezier(0.34,1.56,0.64,1) ${collapsed ? '0.15s' : '0s'}`,
              ].join(', '),
            }}
            className={logoCollapsed}
          >
            <span style={{ fontFamily: 'Georgia, serif' }} className={logoLetter}>M</span>
          </div>

          <div
            style={{
              marginTop:       collapsed ? 45 : 0,
              marginBottom:    collapsed ? 8  : 0,
              transform:       `scaleX(${collapsed ? 1 : 0})`,
              opacity:         collapsed ? 1  : 0,
              transformOrigin: 'left center',
              transition: [
                `transform ${collapsed ? '0.65s' : '0.2s'} cubic-bezier(0.25,0.46,0.45,0.94) ${collapsed ? '0.15s' : '0s'}`,
                `opacity   ${collapsed ? '0.4s'  : '0.15s'} ease ${collapsed ? '0.15s' : '0s'}`,
                'margin-top 0.4s cubic-bezier(0.4,0,0.2,1)',
                'margin-bottom 0.4s cubic-bezier(0.4,0,0.2,1)',
              ].join(', '),
            }}
            className={dividerLine}
          />

          {/* Nav */}
          <nav className={nav}>
            {sections.map((section, sectionIndex) => (
              <div key={section.label} className="w-full">

                {/* Section divider */}
                <div
                  style={{ marginTop: sectionIndex === 0 ? 2 : 8, marginBottom: 2 }}
                  className={sectionDividerWrap}
                >
                  <div
                    style={{ ...lineTransition(collapsed), transformOrigin: 'left center', marginLeft: 16 }}
                    className={sectionDividerLine}
                  />
                  <span style={labelTransition(collapsed)} className={sectionDividerLabel}>
                    {section.label}
                  </span>
                  <div
                    style={{ ...lineTransition(collapsed), transformOrigin: 'right center', marginRight: 16 }}
                    className={sectionDividerLine}
                  />
                </div>

                {/* Items */}
                {section.items.map(({ to, label, icon: Icon, end }) => {
                  const selected = end
                    ? location.pathname === to
                    : location.pathname.startsWith(to);

                  return (
                    <NavLink
                      key={to}
                      to={to}
                      end={end}
                      onClick={() => setIsOpen(false)}
                      className={`${navItemBase} ${selected ? navItemActive : navItemInactive}`}
                    >
                      <span className={`${navItemBar} ${selected ? navItemBarActive : navItemBarInactive}`} />

                      <span className={navItemIconWrap}>
                        <Icon size={18} className={selected ? navItemIconActive : navItemIconInactive} />
                      </span>

                      <span
                        style={textTransition(collapsed, isMobile)}
                        className={`${navItemTextBase} ${selected ? navItemTextActive : navItemTextInactive}`}
                      >
                        {label}
                      </span>

                      <span className={tooltip}>{label}</span>
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}