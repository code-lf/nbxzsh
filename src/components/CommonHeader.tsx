import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { View, Text, Image } from '../taro';
import { ASSETS } from '../data/chamberData';

interface CommonHeaderProps {
  titleLines: string[];
  subtitle: string;
  verticalPoem?: [string, string];
  showBack?: boolean;
  onBack?: () => void;
  onLogoClick?: () => void;
  children?: React.ReactNode;
  compactHeight?: boolean;
}

export const CommonHeader: React.FC<CommonHeaderProps> = ({
  titleLines,
  subtitle,
  verticalPoem = ['两汉文化发源地', '千年彭城'],
  showBack = false,
  onBack,
  onLogoClick,
  children,
  compactHeight = false,
}) => {
  return (
    <View className="relative w-full overflow-hidden select-none">
      {/* Background Hero Image (Stone Horse + Yunlong Pavilion + Lake) */}
      <View
        className={`relative w-full ${
          compactHeight ? 'min-h-[250px] sm:min-h-[270px]' : 'min-h-[268px] sm:min-h-[290px]'
        } flex flex-col justify-between`}
      >
        <Image
          src={ASSETS.bgMobileHero}
          alt="宁波市徐州商会背景"
          mode="aspectFill"
          lazyLoad={false}
          className="absolute inset-0 w-full h-full object-cover object-[72%_center] pointer-events-none"
        />
        {/* Soft readability gradient at top-left and bottom fade into #EEF3FA */}
        <View
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(226,238,252,0.55) 0%, rgba(235,243,253,0.22) 55%, rgba(238,243,250,0.95) 94%, #EEF3FA 100%)',
          }}
        />
        <View
          className="absolute inset-y-0 left-0 w-3/5 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(235,244,255,0.68) 0%, rgba(235,244,255,0.28) 65%, transparent 100%)',
          }}
        />

        {/* Top Mini-Program Status Bar + Capsule Row */}
        <View className="relative z-10 px-4 pt-2 pb-1">
          {/* Simulated iOS Status Bar (visible on mobile / mini-program frame) */}
          <View className="flex items-center justify-between text-[12px] font-semibold text-slate-900 mb-2 px-1">
            <Text className="tracking-tight font-mono-num">9:41</Text>
            <View className="flex items-center gap-1.5">
              {/* Cellular Bars */}
              <svg className="w-3.5 h-3 text-slate-900" viewBox="0 0 16 12" fill="currentColor">
                <rect x="1" y="8" width="2.2" height="4" rx="0.6" />
                <rect x="4.5" y="6" width="2.2" height="6" rx="0.6" />
                <rect x="8" y="3.5" width="2.2" height="8.5" rx="0.6" />
                <rect x="11.5" y="1" width="2.2" height="11" rx="0.6" />
              </svg>
              {/* WiFi */}
              <svg className="w-3.5 h-3 text-slate-900" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3.6-1.8a5.5 5.5 0 017.2 0l1.1-1.2a7.2 7.2 0 00-9.4 0l1.1 1.2zm-2.6-2.7a9.2 9.2 0 0112.4 0l1.1-1.2a10.9 10.9 0 00-14.6 0l1.1 1.2z" />
              </svg>
              {/* Battery */}
              <svg className="w-5 h-3 text-slate-900" viewBox="0 0 22 12" fill="none">
                <rect x="0.8" y="1" width="18" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
                <rect x="2.5" y="2.7" width="14.5" height="6.6" rx="1.2" fill="currentColor" />
                <path d="M20 4v4a1.5 1.5 0 000-4z" fill="currentColor" />
              </svg>
            </View>
          </View>

          {/* Chamber Brand Header + WeChat Capsule */}
          <View className="flex items-center justify-between">
            <View className="flex items-center gap-2.5">
              {showBack && onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="w-8 h-8 rounded-full bg-white/75 backdrop-blur-sm flex items-center justify-center text-slate-800 hover:bg-white active:scale-95 transition mr-0.5 shadow-xs"
                  aria-label="返回上一页"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <View
                onClick={onLogoClick}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <Image
                  src={ASSETS.logoEmblem}
                  alt="宁波市徐州商会会徽"
                  className="w-10 h-10 rounded-full shadow-xs shrink-0 bg-white/80 p-0.5 group-hover:scale-105 transition-transform"
                />
                <View className="flex flex-col">
                  <Text className="font-serif-title text-[19px] sm:text-[21px] font-bold tracking-wider text-[#0A2351] leading-tight">
                    宁波市徐州商会
                  </Text>
                  <Text className="text-[8.5px] sm:text-[9px] tracking-[0.14em] text-[#1E3A6D] font-semibold uppercase">
                    NINGBO XUZHOU CHAMBER OF COMMERCE
                  </Text>
                </View>
              </View>
            </View>

            {/* WeChat Mini-Program Capsule Button */}
            <View className="flex items-center bg-white/65 backdrop-blur-md border border-slate-300/60 rounded-full h-8 px-3 gap-2.5 shadow-2xs">
              <View className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-slate-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <span className="w-1 h-1 rounded-full bg-slate-800" />
              </View>
              <span className="w-[1px] h-3.5 bg-slate-300/80" />
              <View className="w-4 h-4 rounded-full border-[1.8px] border-slate-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              </View>
            </View>
          </View>
        </View>

        {/* Right Vertical Calligraphy + Red Seal */}
        <View className="absolute right-3.5 top-[58px] z-10 flex items-start gap-1 pointer-events-none opacity-90">
          <Text className="vertical-rl font-serif-title text-[10px] tracking-[0.18em] text-[#1D3B6C] font-semibold leading-tight mt-0.5">
            {verticalPoem[1]}
          </Text>
          <Text className="vertical-rl font-serif-title text-[10px] tracking-[0.18em] text-[#1D3B6C] font-semibold leading-tight">
            {verticalPoem[0]}
          </Text>
          <View className="mt-12 w-3.5 h-6 bg-[#B91C1C] rounded-full flex items-center justify-center shadow-xs border border-red-200/40">
            <Text className="vertical-rl text-[8px] text-white font-serif-title leading-none tracking-tighter">
              徐州
            </Text>
          </View>
        </View>

        {/* Hero Main Headline & Subtitle */}
        <View className="relative z-10 px-5 pt-2 pb-4">
          <View className="flex flex-col gap-0.5">
            {titleLines.map((line, idx) => (
              <Text
                key={idx}
                className={`font-serif-title font-black tracking-wider text-[#081F4D] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] ${
                  titleLines.length > 1
                    ? 'text-[27px] sm:text-[31px] leading-[1.22]'
                    : 'text-[31px] sm:text-[35px] leading-[1.2]'
                }`}
              >
                {line}
              </Text>
            ))}
          </View>
          <Text className="mt-2 block text-[12.5px] sm:text-[13.5px] font-medium tracking-[0.12em] text-[#1E3F73]">
            {subtitle}
          </Text>
          {/* Decorative Blue Accent Dash matching the UI mockup */}
          <View className="mt-2.5 flex items-center gap-1">
            <span className="w-6 h-[2px] bg-[#1E4E8C] rounded-full" />
            <span className="w-2 h-[2px] bg-[#1E4E8C]/60 rounded-full" />
          </View>

          {/* Optional Search Bar or Overlay Slot */}
          {children && <View className="mt-3.5">{children}</View>}
        </View>
      </View>
    </View>
  );
};
