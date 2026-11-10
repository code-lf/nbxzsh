import React, { forwardRef, useEffect } from 'react';

/**
 * Taro Cross-Platform Primitives & Runtime Adapter (Weapp + H5 + PC Responsive)
 * Provides Taro-standard components (View, Text, Image, ScrollView, Input, Button)
 * and Taro lifecycle/navigation APIs with high-performance React rendering.
 */

export interface TaroBaseProps extends React.HTMLAttributes<HTMLElement> {
  hoverClass?: string;
  hoverStayTime?: number;
  onTap?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const View = forwardRef<HTMLDivElement, TaroBaseProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ children, onClick, onTap, className = '', ...rest }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onTap) onTap(e);
      if (onClick) onClick(e);
    };
    return (
      <div ref={ref} onClick={handleClick} className={className} {...rest}>
        {children}
      </div>
    );
  }
);
View.displayName = 'TaroView';

export const Text = forwardRef<HTMLSpanElement, TaroBaseProps & React.HTMLAttributes<HTMLSpanElement>>(
  ({ children, onClick, onTap, className = '', ...rest }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (onTap) onTap(e);
      if (onClick) onClick(e);
    };
    return (
      <span ref={ref} onClick={handleClick} className={className} {...rest}>
        {children}
      </span>
    );
  }
);
Text.displayName = 'TaroText';

export interface TaroImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'center';
  lazyLoad?: boolean;
}

export const Image = forwardRef<HTMLImageElement, TaroImageProps>(
  ({ src, alt = '宁波市徐州商会', mode = 'aspectFill', className = '', lazyLoad = true, ...rest }, ref) => {
    const modeClass =
      mode === 'aspectFit'
        ? 'object-contain'
        : mode === 'scaleToFill'
        ? 'object-fill'
        : 'object-cover';

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={lazyLoad ? 'lazy' : 'eager'}
        referrerPolicy="no-referrer"
        className={`${modeClass} ${className}`}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.backgroundColor = '#E2E8F0';
        }}
        {...rest}
      />
    );
  }
);
Image.displayName = 'TaroImage';

export interface TaroScrollViewProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollX?: boolean;
  scrollY?: boolean;
  showScrollbar?: boolean;
}

export const ScrollView = forwardRef<HTMLDivElement, TaroScrollViewProps>(
  ({ children, scrollX, scrollY, showScrollbar = false, className = '', ...rest }, ref) => {
    const scrollClasses = [
      scrollX ? 'overflow-x-auto' : '',
      scrollY ? 'overflow-y-auto' : '',
      !showScrollbar ? 'no-scrollbar' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={scrollClasses} {...rest}>
        {children}
      </div>
    );
  }
);
ScrollView.displayName = 'TaroScrollView';

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...rest }, ref) => {
    return <input ref={ref} className={className} {...rest} />;
  }
);
Input.displayName = 'TaroInput';

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className = '', type = 'button', ...rest }, ref) => {
    return (
      <button ref={ref} type={type} className={className} {...rest}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'TaroButton';

// Taro Runtime Utilities & Lifecycle Hooks
export function useDidShow(callback: () => void) {
  useEffect(() => {
    callback();
  }, []);
}

export function pxTransform(size: number, designWidth = 750): string {
  return `${(size / designWidth) * 100}vw`;
}

export const TARO_APP_CONFIG = {
  pages: [
    'pages/index/index',
    'pages/enterprises/index',
    'pages/org-structure/index',
    'pages/member-directory/index',
    'pages/news/index',
    'pages/party-building/index',
    'pages/profile/index',
    'pages/big-screen/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1E4E8C',
    navigationBarTitleText: '宁波市徐州商会',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom',
  },
  tabBar: {
    color: '#64748B',
    selectedColor: '#1D4ED8',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      { pagePath: 'pages/index/index', text: '首页' },
      { pagePath: 'pages/enterprises/index', text: '会员企业' },
      { pagePath: 'pages/news/index', text: '商会资讯' },
      { pagePath: 'pages/profile/index', text: '个人中心' },
    ],
  },
};
