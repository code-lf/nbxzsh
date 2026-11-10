import React, { useState, useEffect } from 'react';
import {
  Crown,
  User,
  Users,
  ChevronRight,
  ChevronDown,
  Building2,
  ClipboardList,
  Calendar,
  Share2,
  Layers,
  FileText,
  Settings,
  Box,
  HeartHandshake,
  CloudSun,
  BarChart3,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image } from '../../taro';
import {
  ASSETS,
  BIG_SCREEN_DATA,
  ENTERPRISES_DATA,
  NEWS_DATA,
  EnterpriseItem,
  NewsArticleItem,
} from '../../data/chamberData';

interface BigScreenDashboardProps {
  onSwitchToMiniProgramPage: (page: string, subParam?: string) => void;
  onSelectEnterprise: (item: EnterpriseItem) => void;
  onSelectArticle: (article: NewsArticleItem) => void;
  onOpenModal: (modalType: 'investment' | 'assistance' | 'activity' | 'join') => void;
}

export const BigScreenDashboard: React.FC<BigScreenDashboardProps> = ({
  onSwitchToMiniProgramPage,
  onSelectEnterprise,
  onSelectArticle,
  onOpenModal,
}) => {
  const [timeStr, setTimeStr] = useState('09:41:26');
  const [activeActivityMonth, setActiveActivityMonth] = useState<number>(10); // 11月 index
  const [activeInvestMonth, setActiveInvestMonth] = useState<number>(11); // 11月 highlight index
  const [timeRangeActivity, setTimeRangeActivity] = useState<'近一年' | '近半年'>('近一年');
  const [timeRangeInvest, setTimeRangeInvest] = useState<'近一年' | '近半年'>('近一年');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hh}:${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute SVG Donut segments for 会员行业分布
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <View className="w-full min-h-screen bg-[#E9F1FC] text-slate-800 pb-6 select-none overflow-x-hidden">
      {/* 1. Top Panoramic Header Banner */}
      <View className="relative w-full h-[145px] lg:h-[162px] overflow-hidden">
        <Image
          src={ASSETS.bgPcHeader}
          alt="宁波市徐州商会数据大屏背景"
          mode="aspectFill"
          lazyLoad={false}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />
        {/* Readability Gradient Overlay */}
        <View
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(226,239,253,0.68) 0%, rgba(233,243,253,0.35) 55%, rgba(233,241,252,0.92) 92%, #E9F1FC 100%)',
          }}
        />

        <View className="relative z-10 max-w-[1680px] mx-auto h-full px-4 lg:px-8 pt-3 flex items-start justify-between">
          {/* Left: Chamber Emblem & Name */}
          <View
            onClick={() => onSwitchToMiniProgramPage('home')}
            className="flex items-center gap-3 cursor-pointer group pt-1"
          >
            <Image
              src={ASSETS.logoEmblem}
              alt="宁波市徐州商会会徽"
              className="w-12 h-12 rounded-full bg-white/85 p-0.5 shadow-sm group-hover:scale-105 transition-transform"
            />
            <View className="flex flex-col">
              <Text className="font-serif-title text-[22px] lg:text-[26px] font-bold tracking-wider text-[#08214D] leading-tight">
                宁波市徐州商会
              </Text>
              <Text className="text-[9.5px] tracking-[0.15em] text-[#1A3B70] font-semibold uppercase">
                NINGBO XUZHOU CHAMBER OF COMMERCE
              </Text>
            </View>
          </View>

          {/* Center: Big Screen Main Title */}
          <View className="flex flex-col items-center text-center pt-1">
            <Text className="font-serif-title text-[28px] sm:text-[34px] lg:text-[42px] font-black tracking-[0.12em] text-[#071F4A] drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)] leading-tight">
              宁波市徐州商会数据大屏
            </Text>
            <View className="mt-1.5 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#274B82]" />
              <Text className="text-[13px] lg:text-[15px] font-medium tracking-[0.22em] text-[#16376B]">
                传承汉风 · 携手同行 · 共创共赢
              </Text>
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#274B82]" />
            </View>
          </View>

          {/* Right: Date, Digital Clock, Weather & Vertical Poem */}
          <View className="flex items-start gap-4 pt-1">
            <View className="flex flex-col items-end">
              <Text className="text-[12px] text-[#1E3F73] font-medium">
                2024年12月18日 星期三
              </Text>
              <Text className="font-mono-num text-[26px] lg:text-[30px] font-bold text-[#0A2558] tracking-wider leading-tight my-0.5">
                {timeStr}
              </Text>
              <View className="flex items-center gap-1.5 text-[11.5px] text-[#23457A] bg-white/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                <CloudSun className="w-3.5 h-3.5 text-amber-500" />
                <Text>宁波 多云 12-20°C</Text>
              </View>
            </View>

            {/* Vertical Calligraphy + Red Seal */}
            <View className="hidden xl:flex items-start gap-1 opacity-90">
              <Text className="vertical-rl font-serif-title text-[10.5px] tracking-[0.18em] text-[#16376B] font-semibold leading-tight mt-0.5">
                千年彭城
              </Text>
              <Text className="vertical-rl font-serif-title text-[10.5px] tracking-[0.18em] text-[#16376B] font-semibold leading-tight">
                两汉文化发源地
              </Text>
              <View className="mt-12 w-4 h-7 bg-[#B91C1C] rounded-full flex items-center justify-center shadow-xs">
                <Text className="vertical-rl text-[8.5px] text-white font-serif-title leading-none">
                  徐州
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Main Content Container */}
      <View className="max-w-[1680px] mx-auto px-4 lg:px-6 -mt-4 relative z-20 flex flex-col gap-3.5">
        {/* 2. 8-Card KPI Strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-2.5 shadow-[0_4px_24px_rgba(15,45,95,0.06)] border border-white grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2"
        >
          {BIG_SCREEN_DATA.kpis.map((kpi, idx) => {
            const handleClick = () => {
              if (kpi.label === '招商申请') onOpenModal('investment');
              else if (kpi.label === '活动报名') onOpenModal('activity');
              else if (kpi.label === '困难帮扶') onOpenModal('assistance');
              else if (kpi.label === '会长' || kpi.label === '副会长' || kpi.label === '理事') {
                onSwitchToMiniProgramPage('directory', kpi.label);
              } else {
                onSwitchToMiniProgramPage('org');
              }
            };

            return (
              <div
                key={idx}
                onClick={handleClick}
                className="rounded-xl bg-gradient-to-b from-[#F7FAFF] to-[#FFFFFF] hover:from-[#EDF4FF] hover:to-[#F7FAFF] border border-blue-100/70 p-2.5 flex items-center gap-2.5 cursor-pointer transition group"
              >
                {/* Left Circular Icon */}
                <View className="w-11 h-11 rounded-full bg-[#EAF2FE] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {kpi.icon.startsWith('/') ? (
                    <Image
                      src={kpi.icon}
                      alt={kpi.label}
                      mode="aspectFit"
                      className="w-7 h-7 object-contain"
                    />
                  ) : kpi.icon === 'crown' ? (
                    <Crown className="w-6 h-6 text-[#1E6AE1] fill-[#3B82F6]" />
                  ) : kpi.icon === 'user' ? (
                    <User className="w-6 h-6 text-[#1E6AE1] fill-[#3B82F6]" />
                  ) : (
                    <Users className="w-6 h-6 text-[#1E6AE1] fill-[#3B82F6]" />
                  )}
                </View>

                {/* Right Metric */}
                <View className="flex-1 min-w-0">
                  <Text className="block text-[12px] font-semibold text-slate-600 truncate">
                    {kpi.label}
                  </Text>
                  <View className="flex items-baseline gap-0.5 mt-0.5">
                    <Text className="font-mono-num text-[22px] font-extrabold text-[#081F49] leading-none">
                      {kpi.value}
                    </Text>
                    <Text className="text-[11px] font-medium text-slate-600">
                      {kpi.unit}
                    </Text>
                  </View>
                  <View className="mt-1 flex items-center gap-1 text-[10.5px]">
                    <Text className="text-slate-400">较上月</Text>
                    {kpi.trend === 'up' ? (
                      <Text className="text-[#E11D48] font-bold font-mono-num">
                        {kpi.diff} ↑
                      </Text>
                    ) : (
                      <Text className="text-slate-500 font-mono-num">0 —</Text>
                    )}
                  </View>
                </View>
              </div>
            );
          })}
        </motion.div>

        {/* 3. Main 3-Column Dashboard Grid */}
        <View className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          {/* LEFT COLUMN (Cols 1-3) */}
          <View className="lg:col-span-3 flex flex-col gap-3.5">
            {/* Card L1: 会员行业分布 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.04 }}
              className="bg-white/95 rounded-2xl p-4 shadow-[0_4px_20px_rgba(15,45,95,0.05)] border border-white flex-1 flex flex-col justify-between"
            >
              <View className="flex items-center justify-between mb-2">
                <View className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0A66E8]" />
                  <Text className="text-[15.5px] font-bold text-[#092147]">
                    会员行业分布
                  </Text>
                </View>
                <Text className="text-[11.5px] text-slate-400">单位: 人</Text>
              </View>

              <View className="flex items-center justify-between gap-2 my-auto py-1">
                {/* Donut Chart SVG */}
                <View className="relative w-[156px] h-[156px] flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 150 150">
                    {BIG_SCREEN_DATA.industryDist.map((slice, i) => {
                      const strokeDasharray = `${
                        (slice.percent / 100) * circumference - 2
                      } ${circumference}`;
                      const strokeDashoffset = -(cumulativePercent / 100) * circumference;
                      cumulativePercent += slice.percent;
                      return (
                        <circle
                          key={i}
                          cx="75"
                          cy="75"
                          r={radius}
                          fill="transparent"
                          stroke={slice.color}
                          strokeWidth="22"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500 hover:opacity-85 cursor-pointer"
                        />
                      );
                    })}
                  </svg>
                  {/* Center Total Label */}
                  <View className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <Text className="font-mono-num text-[22px] font-extrabold text-[#081F49] leading-none">
                      268
                    </Text>
                    <Text className="text-[10.5px] text-slate-500 mt-1">
                      会员总数
                    </Text>
                  </View>
                </View>

                {/* Right Legend List */}
                <View className="flex-1 flex flex-col gap-2">
                  {BIG_SCREEN_DATA.industryDist.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => onSwitchToMiniProgramPage('enterprises')}
                      className="flex items-center justify-between text-[12px] hover:bg-blue-50/50 px-1.5 py-0.5 rounded cursor-pointer transition"
                    >
                      <View className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <Text className="text-slate-700 font-medium whitespace-nowrap">
                          {item.name}
                        </Text>
                      </View>
                      <View className="flex items-center gap-3 font-mono-num">
                        <Text className="font-bold text-slate-800 w-6 text-right">
                          {item.count}
                        </Text>
                        <Text className="text-slate-400 w-8 text-right">
                          {item.percent}%
                        </Text>
                      </View>
                    </div>
                  ))}
                </View>
              </View>
            </motion.div>

            {/* Card L2: 活动参与趋势 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: 0.08 }}
              className="bg-white/95 rounded-2xl p-4 shadow-[0_4px_20px_rgba(15,45,95,0.05)] border border-white flex flex-col justify-between"
            >
              <View className="flex items-center justify-between mb-2">
                <View className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0A66E8]" />
                  <Text className="text-[15.5px] font-bold text-[#092147]">
                    活动参与趋势
                  </Text>
                </View>
                <button
                  type="button"
                  onClick={() =>
                    setTimeRangeActivity(
                      timeRangeActivity === '近一年' ? '近半年' : '近一年'
                    )
                  }
                  className="px-2.5 py-1 rounded-full bg-[#F1F6FE] text-[11px] text-slate-600 flex items-center gap-1 hover:bg-blue-100/60 transition"
                >
                  <Text>{timeRangeActivity}</Text>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </View>

              {/* Legend */}
              <View className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                <View className="flex items-center gap-4">
                  <View className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2478F6]" />
                    <Text>活动场次 (场)</Text>
                  </View>
                  <View className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <Text>参与人数 (人次)</Text>
                  </View>
                </View>
              </View>

              {/* Chart Container */}
              <View className="relative h-[185px] w-full pt-5 pb-5 px-6">
                {/* Y-Axis Labels */}
                <View className="absolute left-0 top-4 bottom-5 flex flex-col justify-between text-[10px] text-slate-400 font-mono-num">
                  <Text className="text-[9.5px] font-sans">场次</Text>
                  <Text>25</Text>
                  <Text>20</Text>
                  <Text>15</Text>
                  <Text>10</Text>
                  <Text>5</Text>
                  <Text>0</Text>
                </View>
                <View className="absolute right-0 top-4 bottom-5 flex flex-col justify-between text-[10px] text-slate-400 font-mono-num text-right">
                  <Text className="text-[9.5px] font-sans">人次</Text>
                  <Text>800</Text>
                  <Text>600</Text>
                  <Text>400</Text>
                  <Text>200</Text>
                  <Text>0</Text>
                </View>

                {/* Tooltip Box for Active Month */}
                {BIG_SCREEN_DATA.activityTrend[activeActivityMonth] && (
                  <View className="absolute top-1 right-12 z-20 bg-white/95 backdrop-blur-xs rounded-lg px-2.5 py-1.5 shadow-md border border-blue-100 text-[10.5px] pointer-events-none">
                    <Text className="font-bold text-slate-700 block">
                      {BIG_SCREEN_DATA.activityTrend[activeActivityMonth].month}
                    </Text>
                    <View className="flex items-center gap-1 text-slate-600 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2478F6]" />
                      <Text>
                        活动场次:{' '}
                        <strong className="font-mono-num text-slate-900">
                          {BIG_SCREEN_DATA.activityTrend[activeActivityMonth].events}场
                        </strong>
                      </Text>
                    </View>
                    <View className="flex items-center gap-1 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                      <Text>
                        参与人数:{' '}
                        <strong className="font-mono-num text-slate-900">
                          {BIG_SCREEN_DATA.activityTrend[activeActivityMonth].people}人次
                        </strong>
                      </Text>
                    </View>
                  </View>
                )}

                {/* Bars + SVG Line */}
                <View className="relative h-full w-full flex items-end justify-between gap-1.5 border-b border-slate-100">
                  {/* Orange Line Overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10"
                    viewBox="0 0 240 120"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      points={BIG_SCREEN_DATA.activityTrend
                        .map((d, i) => {
                          const x = i * (240 / 11);
                          const y = 120 - (d.people / 650) * 105;
                          return `${x},${y}`;
                        })
                        .join(' ')}
                    />
                    {BIG_SCREEN_DATA.activityTrend.map((d, i) => {
                      const x = i * (240 / 11);
                      const y = 120 - (d.people / 650) * 105;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="#F59E0B"
                          stroke="#FFFFFF"
                          strokeWidth="1"
                        />
                      );
                    })}
                  </svg>

                  {BIG_SCREEN_DATA.activityTrend.map((d, i) => {
                    const heightPct = Math.min(100, (d.events / 22) * 100);
                    const isSelected = activeActivityMonth === i;
                    return (
                      <div
                        key={d.month}
                        onMouseEnter={() => setActiveActivityMonth(i)}
                        onClick={() => setActiveActivityMonth(i)}
                        className="flex-1 h-full flex flex-col justify-end items-center cursor-pointer group relative"
                      >
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-2.5 sm:w-3 rounded-t-xs transition-all ${
                            isSelected
                              ? 'bg-gradient-to-t from-[#1D4ED8] to-[#60A5FA] shadow-xs'
                              : 'bg-gradient-to-t from-[#2563EB] to-[#60A5FA]/80 opacity-85 group-hover:opacity-100'
                          }`}
                        />
                        <Text className="absolute -bottom-5 text-[9.5px] text-slate-400 whitespace-nowrap font-mono-num">
                          {d.month}
                        </Text>
                      </div>
                    );
                  })}
                </View>
              </View>
            </motion.div>
          </View>

          {/* CENTER COLUMN (Cols 4-9) */}
          <View className="lg:col-span-6 flex flex-col gap-3.5">
            {/* Card C1: 甬徐两地协同总览 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.06 }}
              className="bg-white/95 rounded-2xl p-4 shadow-[0_4px_20px_rgba(15,45,95,0.05)] border border-white flex-1 flex flex-col justify-between"
            >
              <View className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-[#0A66E8]" />
                <Text className="text-[16px] font-bold text-[#092147]">
                  甬徐两地协同总览
                </Text>
              </View>

              {/* 3-Column Synergy Diagram: 宁波侧 -> 资源互通协同合作 -> 徐州侧 */}
              <View className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center my-auto">
                {/* Left Box: 宁波侧 */}
                <View className="md:col-span-4 rounded-2xl bg-[#F3F8FE] border border-blue-100/80 overflow-hidden shadow-2xs">
                  <View className="bg-gradient-to-r from-[#0F62FE] to-[#2574FA] text-white text-center py-2 text-[14px] font-bold tracking-wider">
                    宁波侧
                  </View>
                  <View className="p-2.5 flex flex-col gap-2">
                    {[
                      { label: '会员企业', val: '168', unit: '家', icon: Building2 },
                      { label: '招商需求', val: '48', unit: '条', icon: ClipboardList },
                      { label: '活动资源', val: '320', unit: '项', icon: Calendar },
                      { label: '产业合作', val: '56', unit: '项', icon: Share2 },
                    ].map((row) => {
                      const IconComp = row.icon;
                      return (
                        <div
                          key={row.label}
                          onClick={() => onSwitchToMiniProgramPage('enterprises')}
                          className="bg-white rounded-xl px-3 py-2 flex items-center justify-between border border-blue-50 hover:border-blue-200 cursor-pointer transition"
                        >
                          <View className="flex items-center gap-2 text-[#1A56DB]">
                            <IconComp className="w-4 h-4" />
                            <Text className="text-[12.5px] font-medium text-slate-700">
                              {row.label}
                            </Text>
                          </View>
                          <View className="flex items-baseline gap-1">
                            <Text className="font-mono-num text-[16px] font-extrabold text-[#0A58CA]">
                              {row.val}
                            </Text>
                            <Text className="text-[11px] text-slate-400">
                              {row.unit}
                            </Text>
                          </View>
                        </div>
                      );
                    })}
                  </View>
                </View>

                {/* Center Emblem: 资源互通 协同合作 */}
                <View className="md:col-span-3 flex items-center justify-center gap-2 py-2">
                  <span className="text-[#60A5FA] font-bold text-lg hidden md:inline">
                    ➔
                  </span>
                  <div
                    onClick={() => onOpenModal('investment')}
                    className="w-36 h-36 rounded-full bg-gradient-to-b from-[#EDF5FF] to-[#DDEBFD] border border-blue-100 flex flex-col items-center justify-center p-3 shadow-inner cursor-pointer group hover:scale-105 transition-transform"
                  >
                    <View className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0F62FE] to-[#1D4ED8] flex items-center justify-center shadow-md mb-1.5">
                      <Image
                        src={ASSETS.iconInvestment}
                        alt="资源互通"
                        mode="aspectFit"
                        className="w-10 h-10 object-contain brightness-200 contrast-200"
                      />
                    </View>
                    <Text className="text-[13px] font-bold text-[#092147] leading-tight">
                      资源互通
                    </Text>
                    <Text className="text-[13px] font-bold text-[#092147] leading-tight">
                      协同合作
                    </Text>
                  </div>
                  <span className="text-[#60A5FA] font-bold text-lg hidden md:inline">
                    ➔
                  </span>
                </View>

                {/* Right Box: 徐州侧 */}
                <View className="md:col-span-4 rounded-2xl bg-[#F3F8FE] border border-blue-100/80 overflow-hidden shadow-2xs">
                  <View className="bg-gradient-to-r from-[#0F62FE] to-[#2574FA] text-white text-center py-2 text-[14px] font-bold tracking-wider">
                    徐州侧
                  </View>
                  <View className="p-2.5 flex flex-col gap-2">
                    {[
                      { label: '会员资源', val: '128', unit: '家', icon: Users },
                      { label: '产业供给', val: '62', unit: '项', icon: Layers },
                      { label: '项目线索', val: '86', unit: '条', icon: FileText },
                      { label: '人才交流', val: '42', unit: '人', icon: User },
                    ].map((row) => {
                      const IconComp = row.icon;
                      return (
                        <div
                          key={row.label}
                          onClick={() => onSwitchToMiniProgramPage('directory')}
                          className="bg-white rounded-xl px-3 py-2 flex items-center justify-between border border-blue-50 hover:border-blue-200 cursor-pointer transition"
                        >
                          <View className="flex items-center gap-2 text-[#1A56DB]">
                            <IconComp className="w-4 h-4" />
                            <Text className="text-[12.5px] font-medium text-slate-700">
                              {row.label}
                            </Text>
                          </View>
                          <View className="flex items-baseline gap-1">
                            <Text className="font-mono-num text-[16px] font-extrabold text-[#0A58CA]">
                              {row.val}
                            </Text>
                            <Text className="text-[11px] text-slate-400">
                              {row.unit}
                            </Text>
                          </View>
                        </div>
                      );
                    })}
                  </View>
                </View>
              </View>

              {/* Bottom 4 Synergy Pillars */}
              <View className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { title: '产业对接', sub: '深化合作', icon: Settings },
                  { title: '项目招商', sub: '共赢发展', icon: Box },
                  { title: '资源共享', sub: '互联互通', icon: HeartHandshake },
                  { title: '人才交流', sub: '智力支持', icon: Users },
                ].map((pillar) => {
                  const IconComp = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      onClick={() => onOpenModal('investment')}
                      className="rounded-xl bg-[#F6FAFF] hover:bg-[#EBF3FE] px-3 py-2 flex items-center gap-2.5 cursor-pointer transition border border-blue-50/80"
                    >
                      <View className="w-9 h-9 rounded-full bg-[#E1EEFE] text-[#0F62FE] flex items-center justify-center shrink-0">
                        <IconComp className="w-4 h-4" />
                      </View>
                      <View className="flex flex-col">
                        <Text className="text-[12.5px] font-bold text-[#092147]">
                          {pillar.title}
                        </Text>
                        <Text className="text-[10.5px] text-slate-500">
                          {pillar.sub}
                        </Text>
                      </View>
                    </div>
                  );
                })}
              </View>
            </motion.div>

            {/* Card C2: 招商线索趋势 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.1 }}
              className="bg-white/95 rounded-2xl p-4 shadow-[0_4px_20px_rgba(15,45,95,0.05)] border border-white flex flex-col justify-between"
            >
              <View className="flex items-center justify-between mb-1.5">
                <View className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0A66E8]" />
                  <Text className="text-[15.5px] font-bold text-[#092147]">
                    招商线索趋势
                  </Text>
                </View>
                <button
                  type="button"
                  onClick={() =>
                    setTimeRangeInvest(
                      timeRangeInvest === '近一年' ? '近半年' : '近一年'
                    )
                  }
                  className="px-2.5 py-1 rounded-full bg-[#F1F6FE] text-[11px] text-slate-600 flex items-center gap-1 hover:bg-blue-100/60 transition"
                >
                  <Text>{timeRangeInvest}</Text>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </View>

              {/* Legend */}
              <View className="flex items-center gap-5 text-[11px] text-slate-500 mb-2">
                <View className="flex items-center gap-1.5">
                  <span className="w-3 h-2 rounded-xs bg-[#1E78F0]" />
                  <Text>招商申请 (条)</Text>
                </View>
                <View className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <Text>意向成交 (条)</Text>
                </View>
              </View>

              {/* Chart Container */}
              <View className="relative h-[165px] w-full pt-3 pb-5 px-7">
                {/* Y-Axis Left & Right */}
                <View className="absolute left-0 top-2 bottom-5 flex flex-col justify-between text-[10px] text-slate-400 font-mono-num">
                  <Text>50</Text>
                  <Text>40</Text>
                  <Text>30</Text>
                  <Text>20</Text>
                  <Text>10</Text>
                  <Text>0</Text>
                </View>
                <View className="absolute right-0 top-2 bottom-5 flex flex-col justify-between text-[10px] text-slate-400 font-mono-num text-right">
                  <Text>50</Text>
                  <Text>30</Text>
                  <Text>20</Text>
                  <Text>10</Text>
                  <Text>0</Text>
                </View>

                {/* Tooltip at 11月 */}
                {BIG_SCREEN_DATA.investmentTrend[activeInvestMonth] && (
                  <View className="absolute top-0 right-24 z-20 bg-white/95 backdrop-blur-xs rounded-lg px-3 py-1.5 shadow-md border border-blue-100 text-[10.5px] pointer-events-none">
                    <Text className="font-bold text-slate-700 block">
                      {BIG_SCREEN_DATA.investmentTrend[activeInvestMonth].month.trim()}
                    </Text>
                    <View className="flex items-center gap-1.5 text-slate-600 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E78F0]" />
                      <Text>
                        招商申请:{' '}
                        <strong className="font-mono-num text-slate-900">
                          {BIG_SCREEN_DATA.investmentTrend[activeInvestMonth].apply}条
                        </strong>
                      </Text>
                    </View>
                    <View className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      <Text>
                        意向成交:{' '}
                        <strong className="font-mono-num text-slate-900">
                          {new Map([[48, 16]]).get(
                            BIG_SCREEN_DATA.investmentTrend[activeInvestMonth].apply
                          ) || BIG_SCREEN_DATA.investmentTrend[activeInvestMonth].deal}
                          条
                        </strong>
                      </Text>
                    </View>
                  </View>
                )}

                <View className="relative h-full w-full flex items-end justify-between gap-2 border-b border-slate-100">
                  {/* Teal Line Overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10"
                    viewBox="0 0 360 110"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      points={BIG_SCREEN_DATA.investmentTrend
                        .map((d, i) => {
                          const x = i * (360 / 12);
                          const y = 110 - (d.deal / 35) * 90;
                          return `${x},${y}`;
                        })
                        .join(' ')}
                    />
                    {BIG_SCREEN_DATA.investmentTrend.map((d, i) => {
                      const x = i * (360 / 12);
                      const y = 110 - (d.deal / 35) * 90;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="3.2"
                          fill="#10B981"
                          stroke="#FFFFFF"
                          strokeWidth="1.2"
                        />
                      );
                    })}
                  </svg>

                  {BIG_SCREEN_DATA.investmentTrend.map((d, i) => {
                    const heightPct = Math.min(100, (d.apply / 50) * 100);
                    const isSelected = activeInvestMonth === i;
                    return (
                      <div
                        key={i}
                        onMouseEnter={() => setActiveInvestMonth(i)}
                        onClick={() => setActiveInvestMonth(i)}
                        className="flex-1 h-full flex flex-col justify-end items-center cursor-pointer group relative"
                      >
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-3.5 sm:w-4 rounded-t-xs transition-all ${
                            isSelected
                              ? 'bg-gradient-to-t from-[#1D4ED8] to-[#38BDF8]'
                              : 'bg-gradient-to-t from-[#1E6AE1] to-[#60A5FA]/85 opacity-85 group-hover:opacity-100'
                          }`}
                        />
                        <Text className="absolute -bottom-5 text-[9.5px] text-slate-400 whitespace-nowrap font-mono-num">
                          {d.month.trim()}
                        </Text>
                      </div>
                    );
                  })}
                </View>
              </View>
            </motion.div>
          </View>

          {/* RIGHT COLUMN (Cols 10-12) */}
          <View className="lg:col-span-3 flex flex-col gap-3.5">
            {/* Card R1: 会员企业排行榜 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.08 }}
              className="bg-white/95 rounded-2xl p-4 shadow-[0_4px_20px_rgba(15,45,95,0.05)] border border-white flex-1 flex flex-col justify-between"
            >
              <View className="flex items-center justify-between mb-2.5">
                <View className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0A66E8]" />
                  <Text className="text-[15.5px] font-bold text-[#092147]">
                    会员企业排行榜
                  </Text>
                </View>
                <button
                  type="button"
                  onClick={() => onSwitchToMiniProgramPage('enterprises')}
                  className="flex items-center gap-0.5 text-[11.5px] text-slate-500 hover:text-[#0A66E8] transition"
                >
                  <Text>查看更多</Text>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </View>

              {/* Table Header */}
              <View className="grid grid-cols-12 px-2 py-1.5 rounded-lg bg-[#F3F8FE] text-[11px] font-medium text-slate-500">
                <Text className="col-span-2">排名</Text>
                <Text className="col-span-6">企业名称</Text>
                <Text className="col-span-2 text-center">所属行业</Text>
                <Text className="col-span-2 text-right">综合评分</Text>
              </View>

              {/* Table Rows */}
              <View className="flex flex-col divide-y divide-slate-100 my-auto">
                {BIG_SCREEN_DATA.rankings.map((row) => {
                  const matchedEnt =
                    ENTERPRISES_DATA.find((e) => e.fullName === row.name) ||
                    ENTERPRISES_DATA[0];
                  return (
                    <div
                      key={row.rank}
                      onClick={() => onSelectEnterprise(matchedEnt)}
                      className="grid grid-cols-12 items-center px-2 py-2 text-[12px] hover:bg-blue-50/50 cursor-pointer transition"
                    >
                      <View className="col-span-2 flex items-center">
                        {row.rank === 1 ? (
                          <span className="w-5 h-5 rounded-full bg-gradient-to-b from-[#FBBF24] to-[#D97706] text-white text-[10px] font-bold flex items-center justify-center shadow-2xs font-mono-num">
                            1
                          </span>
                        ) : row.rank === 2 ? (
                          <span className="w-5 h-5 rounded-full bg-gradient-to-b from-[#94A3B8] to-[#64748B] text-white text-[10px] font-bold flex items-center justify-center shadow-2xs font-mono-num">
                            2
                          </span>
                        ) : row.rank === 3 ? (
                          <span className="w-5 h-5 rounded-full bg-gradient-to-b from-[#F97316] to-[#C2410C] text-white text-[10px] font-bold flex items-center justify-center shadow-2xs font-mono-num">
                            3
                          </span>
                        ) : (
                          <span className="w-5 text-center font-mono-num font-semibold text-slate-500">
                            {row.rank}
                          </span>
                        )}
                      </View>
                      <Text className="col-span-6 font-medium text-slate-800 truncate pr-2">
                        {row.name}
                      </Text>
                      <Text className="col-span-2 text-center text-[11px] text-slate-500 whitespace-nowrap">
                        {row.industry}
                      </Text>
                      <Text className="col-span-2 text-right font-mono-num font-bold text-[#092147]">
                        {row.score}
                      </Text>
                    </div>
                  );
                })}
              </View>
            </motion.div>

            {/* Card R2: 商会最新动态 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.12 }}
              className="bg-white/95 rounded-2xl p-4 shadow-[0_4px_20px_rgba(15,45,95,0.05)] border border-white flex flex-col justify-between"
            >
              <View className="flex items-center justify-between mb-2.5">
                <View className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0A66E8]" />
                  <Text className="text-[15.5px] font-bold text-[#092147]">
                    商会最新动态
                  </Text>
                </View>
                <button
                  type="button"
                  onClick={() => onSwitchToMiniProgramPage('news')}
                  className="flex items-center gap-0.5 text-[11.5px] text-slate-500 hover:text-[#0A66E8] transition"
                >
                  <Text>查看更多</Text>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </View>

              <View className="relative pl-3 flex flex-col gap-3 before:content-[''] before:absolute before:left-[5px] before:top-3 before:bottom-3 before:w-[1.5px] before:bg-blue-200">
                {NEWS_DATA.slice(0, 3).map((news) => (
                  <div
                    key={news.id}
                    onClick={() => {
                      if (news.category === '党建专题') {
                        onSwitchToMiniProgramPage('party', 'detail');
                      } else {
                        onSelectArticle(news);
                      }
                    }}
                    className="relative flex items-center gap-2.5 cursor-pointer group"
                  >
                    {/* Timeline Dot */}
                    <span className="absolute -left-[11px] w-2 h-2 rounded-full bg-[#0F62FE] ring-2 ring-blue-100" />

                    {/* Thumbnail */}
                    <View className="w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src={news.homeThumb || news.thumb}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </View>

                    {/* Content */}
                    <View className="flex-1 min-w-0">
                      <Text className="block text-[10.5px] text-slate-400 font-mono-num">
                        {news.date}
                      </Text>
                      <Text className="block text-[12px] font-bold text-[#092147] truncate group-hover:text-[#0F62FE] transition">
                        {news.title}
                      </Text>
                      <Text className="mt-0.5 block text-[10.5px] text-slate-500 truncate">
                        {news.shortSummary}
                      </Text>
                    </View>
                  </div>
                ))}
              </View>
            </motion.div>
          </View>
        </View>
      </View>
    </View>
  );
};
