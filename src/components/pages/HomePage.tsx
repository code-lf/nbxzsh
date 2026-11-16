import React, { useState, useRef } from 'react';
import {
  ChevronRight,
  Crown,
  User,
  Users,
  Star,
  Calendar,
  MapPin,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image } from '../../taro';
import { CommonHeader } from '../CommonHeader';
import {
  ASSETS,
  ENTERPRISES_DATA,
  NEWS_DATA,
  ACTIVITIES_DATA,
  EnterpriseItem,
  NewsArticleItem,
  ActivityItem,
} from '../../data/chamberData';

interface HomePageProps {
  onNavigate: (page: string, subTab?: string) => void;
  onSelectEnterprise: (item: EnterpriseItem) => void;
  onSelectArticle: (article: NewsArticleItem) => void;
  onSelectActivity: (activity: ActivityItem) => void;
  onOpenModal: (modalType: 'investment' | 'assistance' | 'activity' | 'join') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectEnterprise,
  onSelectArticle,
  onSelectActivity,
  onOpenModal,
}) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const focusScrollRef = useRef<HTMLDivElement | null>(null);
  const activityScrollRef = useRef<HTMLDivElement | null>(null);

  const quickEntries = [
    {
      id: 'org',
      title: '会员架构',
      sub: '组织架构',
      icon: ASSETS.iconOrgStructure,
      action: () => onNavigate('org'),
    },
    {
      id: 'enterprises',
      title: '知名企业',
      sub: '会员风采',
      icon: ASSETS.iconEnterprise,
      action: () => onNavigate('featured-enterprises'),
    },
    {
      id: 'investment',
      title: '招商服务',
      sub: '甬徐共赢',
      icon: ASSETS.iconInvestment,
      action: () => onOpenModal('investment'),
    },
    {
      id: 'news',
      title: '商会资讯',
      sub: '全部资讯',
      icon: ASSETS.iconNews,
      action: () => onNavigate('news'),
    },
    {
      id: 'assistance',
      title: '困难帮扶',
      sub: '凝聚温暖',
      icon: ASSETS.iconAssistance,
      action: () => onOpenModal('assistance'),
    },
    {
      id: 'activity',
      title: '活动报名',
      sub: '精彩活动',
      icon: ASSETS.iconActivity,
      action: () => onNavigate('activities'),
    },
  ];

  // Top 3 enterprises on Home screen: 吉利汽车集团, 弘阳集团, 奥克斯集团
  const homeEnterprises = [
    ENTERPRISES_DATA[0],
    ENTERPRISES_DATA[2],
    ENTERPRISES_DATA[1],
  ];

  // Focus articles moved from Tab 3 onto Home
  const focusArticles = NEWS_DATA.filter((n) => n.isFocus || n.category === '最新资讯').slice(0, 3);
  const upcomingActivities = ACTIVITIES_DATA.filter((a) => a.status !== '已结束');

  const handleHorizontalScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    setter: React.Dispatch<React.SetStateAction<number>>,
    count: number
  ) => {
    const el = ref.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setter(Math.max(0, Math.min(count - 1, idx)));
  };

  const scrollToSlide = (
    ref: React.RefObject<HTMLDivElement | null>,
    idx: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const el = ref.current;
    setter(idx);
    if (el) {
      el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <View className="w-full pb-6 bg-[#EEF3FA]">
      {/* Hero Section */}
      <CommonHeader
        titleLines={['凝聚徐商力量', '共建甬徐未来']}
        subtitle="传承汉风 · 携手同行 · 共创共赢"
        verticalPoem={['两汉文化名城', '千年彭城']}
      />

      <View className="px-3 -mt-3 relative z-20 flex flex-col gap-3">
        {/* 1. 6-Icon Quick Entry Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-[0_4px_20px_rgba(15,41,82,0.05)] border border-white"
        >
          <View className="grid grid-cols-6 gap-1">
            {quickEntries.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="flex flex-col items-center justify-center py-2 px-0.5 rounded-xl bg-gradient-to-b from-[#F5F9FF] to-[#FBFCFF] hover:from-[#EBF3FF] hover:to-[#F5F9FF] active:scale-95 transition border border-blue-50/80 group"
              >
                <View className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center mb-1 group-hover:-translate-y-0.5 transition-transform">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    mode="aspectFit"
                    lazyLoad={false}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(29,78,216,0.15)]"
                  />
                </View>
                <Text className="text-[11px] min-[400px]:text-[12px] sm:text-[13px] font-bold text-[#0F2547] whitespace-nowrap leading-tight">
                  {item.title}
                </Text>
                <Text className="text-[9px] min-[400px]:text-[10px] text-slate-400 mt-0.5 whitespace-nowrap">
                  {item.sub}
                </Text>
              </button>
            ))}
          </View>
        </motion.div>

        {/* 2. 商会会员架构 Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.04 }}
          className="bg-white rounded-2xl p-3 shadow-[0_4px_20px_rgba(15,41,82,0.04)]"
        >
          <View className="flex items-center justify-between mb-2.5">
            <View className="flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[16px] sm:text-[17px] font-bold text-[#0D2346]">
                商会会员架构
              </Text>
            </View>
            <button
              type="button"
              onClick={() => onNavigate('org')}
              className="flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-[#154A96] transition"
            >
              <Text>查看完整架构</Text>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </View>

          <View className="grid grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={() => onNavigate('directory', '会长')}
              className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#F8FAFE] to-[#F1F6FD] py-2 px-1 sm:p-2.5 flex flex-col items-center border border-blue-50/80 hover:border-blue-200 transition text-left"
            >
              <View className="flex items-center gap-1 w-full justify-center">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#D99B43] fill-[#EAB664] shrink-0" />
                <View className="flex flex-col items-start">
                  <Text className="text-[10.5px] sm:text-[11px] font-medium text-slate-600 whitespace-nowrap">会长</Text>
                  <View className="flex items-baseline gap-0.5">
                    <Text className="font-serif-title text-[18px] sm:text-[20px] font-bold text-[#0A2046] tabular-nums leading-none">
                      1
                    </Text>
                    <Text className="text-[9.5px] text-slate-500">人</Text>
                  </View>
                </View>
              </View>
              <View className="w-4/5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('directory', '副会长')}
              className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#F8FAFE] to-[#F1F6FD] py-2 px-1 sm:p-2.5 flex flex-col items-center border border-blue-50/80 hover:border-blue-200 transition text-left"
            >
              <View className="flex items-center gap-1 w-full justify-center">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#698BBF] fill-[#8BA9D6] shrink-0" />
                <View className="flex flex-col items-start">
                  <Text className="text-[10.5px] sm:text-[11px] font-medium text-slate-600 whitespace-nowrap">副会长</Text>
                  <View className="flex items-baseline gap-0.5">
                    <Text className="font-serif-title text-[18px] sm:text-[20px] font-bold text-[#0A2046] tabular-nums leading-none">
                      12
                    </Text>
                    <Text className="text-[9.5px] text-slate-500">人</Text>
                  </View>
                </View>
              </View>
              <View className="w-4/5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('directory', '理事')}
              className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#F8FAFE] to-[#F1F6FD] py-2 px-1 sm:p-2.5 flex flex-col items-center border border-blue-50/80 hover:border-blue-200 transition text-left"
            >
              <View className="flex items-center gap-1 w-full justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#698BBF] fill-[#8BA9D6] shrink-0" />
                <View className="flex flex-col items-start">
                  <Text className="text-[10.5px] sm:text-[11px] font-medium text-slate-600 whitespace-nowrap">理事</Text>
                  <View className="flex items-baseline gap-0.5">
                    <Text className="font-serif-title text-[18px] sm:text-[20px] font-bold text-[#0A2046] tabular-nums leading-none">
                      36
                    </Text>
                    <Text className="text-[9.5px] text-slate-500">人</Text>
                  </View>
                </View>
              </View>
              <View className="w-4/5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('directory', '全部')}
              className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#F8FAFE] to-[#F1F6FD] py-2 px-1 sm:p-2.5 flex flex-col items-center border border-blue-50/80 hover:border-blue-200 transition text-left"
            >
              <View className="flex items-center gap-1 w-full justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#698BBF] fill-[#8BA9D6] shrink-0" />
                <View className="flex flex-col items-start">
                  <Text className="text-[10.5px] sm:text-[11px] font-medium text-slate-600 whitespace-nowrap">会员</Text>
                  <View className="flex items-baseline gap-0.5">
                    <Text className="font-serif-title text-[18px] sm:text-[20px] font-bold text-[#0A2046] tabular-nums leading-none">
                      268
                    </Text>
                    <Text className="text-[9.5px] text-slate-500">人</Text>
                  </View>
                </View>
              </View>
              <View className="w-4/5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
            </button>
          </View>
        </motion.div>

        {/* 3. 知名会员企业 Card (查看更多 -> 知名会员风采独立页) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.08 }}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)]"
        >
          <View className="flex items-center justify-between mb-3">
            <View className="flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[16px] sm:text-[17px] font-bold text-[#0D2346]">
                知名会员企业
              </Text>
            </View>
            <button
              type="button"
              onClick={() => onNavigate('featured-enterprises')}
              className="flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-[#154A96] transition"
            >
              <Text>查看更多</Text>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </View>

          <View className="grid grid-cols-3 gap-2">
            {homeEnterprises.map((ent) => (
              <div
                key={ent.id}
                onClick={() => onSelectEnterprise(ent)}
                className="group cursor-pointer rounded-xl border border-slate-100 bg-[#FAFBFD] overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-200 transition flex flex-col"
              >
                <View className="relative h-[74px] w-full bg-slate-200">
                  <Image
                    src={ent.bannerImg}
                    alt={ent.shortName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <View className="absolute -bottom-3.5 left-2 w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center z-10">
                    <Text
                      className={`font-extrabold tracking-tighter leading-none ${
                        ent.logoColor === 'red'
                          ? 'text-[#D92D20] text-[13px] font-serif-title'
                          : 'text-[#0B3B8C] text-[8.5px]'
                      }`}
                    >
                      {ent.logoText}
                    </Text>
                  </View>
                </View>

                <View className="px-2 pb-2.5 pt-4 flex-1 flex flex-col justify-between">
                  <View>
                    <Text className="block text-[13px] font-bold text-slate-900 whitespace-nowrap truncate">
                      {ent.shortName}
                    </Text>
                    <span className="mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#FDF3E1] text-[#9A6418] whitespace-nowrap">
                      {ent.roleBadge}
                    </span>
                    <Text className="mt-1.5 block text-[10.5px] font-medium text-[#2A5C9A] whitespace-nowrap truncate">
                      {ent.tags.slice(0, 2).join(' · ')}
                    </Text>
                    <View className="mt-1 flex items-center justify-between gap-0.5">
                      <Text className="text-[10px] text-slate-500 line-clamp-2 leading-[1.35]">
                        {ent.homeDesc}
                      </Text>
                      <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                    </View>
                  </View>
                </View>
              </div>
            ))}
          </View>
        </motion.div>

        {/* 4. 本周焦点 Card (从第3页移至首页，支持左右滑动切换 + 查看更多进入所有资讯列表) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, delay: 0.12 }}
          className="bg-white rounded-2xl p-3 shadow-[0_4px_20px_rgba(15,41,82,0.05)]"
        >
          <View className="flex items-center justify-between mb-2 px-0.5">
            <View className="flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[16px] sm:text-[17px] font-bold text-[#0D2346]">
                本周焦点
              </Text>
              <Text className="text-[11px] text-slate-400 font-mono-num">
                ({focusIndex + 1}/{focusArticles.length})
              </Text>
            </View>
            <button
              type="button"
              onClick={() => onNavigate('news')}
              className="flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-[#154A96] transition"
            >
              <Text>全部资讯</Text>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </View>

          <div
            ref={focusScrollRef}
            onScroll={() => handleHorizontalScroll(focusScrollRef, setFocusIndex, focusArticles.length)}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3"
          >
            {focusArticles.map((focusArticle, idx) => (
              <div
                key={focusArticle.id}
                onClick={() => onSelectArticle(focusArticle)}
                className="w-full shrink-0 snap-center relative rounded-xl overflow-hidden min-h-[164px] flex items-stretch bg-gradient-to-r from-[#EAF2FC] via-[#EEF5FD] to-[#DCE9FA] cursor-pointer group"
              >
                <View className="absolute right-0 top-0 bottom-0 w-[56%] overflow-hidden">
                  <Image
                    src={idx === 0 ? ASSETS.newsFocusRight : focusArticle.thumb}
                    alt={focusArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <View
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, #ECF3FC 0%, rgba(236,243,252,0.75) 26%, rgba(236,243,252,0.08) 65%, transparent 100%)',
                    }}
                  />
                </View>

                <View className="relative z-10 p-3 flex flex-col justify-between w-full">
                  <View>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#1B56A8] text-white text-[10.5px] font-semibold shadow-2xs">
                      <Star className="w-3 h-3 fill-white text-white" />
                      本周焦点
                    </span>

                    <Text className="mt-2 block font-serif-title text-[15.5px] sm:text-[17px] font-bold text-[#092147] leading-[1.35] max-w-[74%] line-clamp-2">
                      {focusArticle.title}
                    </Text>

                    <Text className="mt-1 block text-[11px] text-[#284878] font-medium max-w-[72%] truncate">
                      {focusArticle.shortSummary}
                    </Text>
                  </View>

                  <View className="mt-3 flex items-end justify-between gap-2">
                    <View className="flex flex-col gap-0.5 text-[10.5px] text-[#2B4C7E] min-w-0">
                      <View className="flex items-center gap-1.5 font-mono-num">
                        <Calendar className="w-3 h-3 text-[#154A96] shrink-0" />
                        <Text>{focusArticle.date}</Text>
                      </View>
                      <View className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3 h-3 text-[#154A96] shrink-0" />
                        <Text className="truncate">{focusArticle.location || '宁波市徐州商会'}</Text>
                      </View>
                    </View>

                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#1953A0] to-[#113C7A] text-white text-[11.5px] font-semibold flex items-center gap-0.5 shadow-sm group-hover:brightness-110 transition whitespace-nowrap shrink-0"
                    >
                      <Text>查看详情</Text>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </View>
                </View>
              </div>
            ))}
          </div>

          {/* Slide Dots */}
          <View className="mt-2 flex items-center justify-center gap-1.5">
            {focusArticles.map((art, i) => (
              <button
                key={art.id}
                type="button"
                aria-label={`切换到第${i + 1}条焦点`}
                onClick={() => scrollToSlide(focusScrollRef, i, setFocusIndex)}
                className={`h-1.5 rounded-full transition-all ${
                  focusIndex === i ? 'w-5 bg-[#154A96]' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </View>
        </motion.div>

        {/* 5. 近期活动预告 Card (从第3页移至首页，支持左右滑动 + 查看更多进入活动列表页 + 查看活动进入活动详情页) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.14 }}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)]"
        >
          <View className="flex items-center justify-between mb-2.5">
            <View className="flex items-center gap-2">
              <View className="w-6 h-6 rounded-md bg-[#154A96] text-white flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5" />
              </View>
              <Text className="font-serif-title text-[16px] font-bold text-[#0D2346]">
                近期活动预告
              </Text>
            </View>
            <button
              type="button"
              onClick={() => onNavigate('activities')}
              className="flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-[#154A96] transition"
            >
              <Text>查看更多</Text>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </View>

          <div
            ref={activityScrollRef}
            onScroll={() =>
              handleHorizontalScroll(activityScrollRef, setActivityIndex, upcomingActivities.length)
            }
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3"
          >
            {upcomingActivities.map((act) => (
              <div key={act.id} className="w-full shrink-0 snap-center">
                <View
                  onClick={() => onSelectActivity(act)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <View className="w-[126px] h-[82px] rounded-xl overflow-hidden shrink-0 bg-[#EBF3FC] shadow-2xs relative">
                    <Image
                      src={act.poster}
                      alt={act.title}
                      mode="scaleToFill"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#154A96]/90 text-white text-[9.5px] font-semibold">
                      {act.status}
                    </span>
                  </View>

                  <View className="flex-1 min-w-0">
                    <Text className="block text-[14px] font-bold text-[#0D2346] truncate group-hover:text-[#154A96] transition">
                      {act.title}
                    </Text>
                    <Text className="mt-0.5 block text-[11px] text-slate-500 truncate">
                      {act.subtitle}
                    </Text>

                    <View className="mt-1.5 flex flex-col gap-1 text-[11px] text-slate-600">
                      <View className="flex items-center gap-1.5 whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5 text-[#154A96] shrink-0" />
                        <Text className="font-mono-num truncate">
                          {act.date} {act.timeRange}
                        </Text>
                      </View>
                      <View className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-[#154A96] shrink-0" />
                        <Text className="font-medium text-slate-700 truncate">
                          {act.location}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <View className="px-3 py-1 rounded-lg bg-[#FDF6E9] border border-[#F5E3C3] flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#D08C2E]" />
                    <Text className="text-[11px] text-slate-600">预计规模</Text>
                    <Text className="text-[13px] font-bold text-[#0D2346] font-mono-num">
                      {act.capacity} <span className="text-[10.5px] font-normal">人</span>
                    </Text>
                  </View>

                  <button
                    type="button"
                    onClick={() => onSelectActivity(act)}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1953A0] to-[#113C7A] text-white text-[12px] font-semibold flex items-center gap-1 shadow-xs hover:brightness-110 active:scale-95 transition whitespace-nowrap"
                  >
                    <Text>查看活动</Text>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </View>
              </div>
            ))}
          </div>

          <View className="mt-2 flex items-center justify-center gap-1.5">
            {upcomingActivities.map((act, i) => (
              <button
                key={act.id}
                type="button"
                aria-label={`切换到第${i + 1}场活动`}
                onClick={() => scrollToSlide(activityScrollRef, i, setActivityIndex)}
                className={`h-1.5 rounded-full transition-all ${
                  activityIndex === i ? 'w-5 bg-[#154A96]' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </View>
        </motion.div>

        {/* 6. Bottom Banner: 会员困难帮扶 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16 }}
          onClick={() => onOpenModal('assistance')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#DCE9FA] via-[#E5EFFC] to-[#D4E4FA] p-3.5 flex items-center justify-between cursor-pointer border border-white/80 shadow-xs group"
        >
          <Image
            src={ASSETS.bgMobileHero}
            alt="背景浮雕"
            className="absolute right-0 top-0 h-full w-3/5 object-cover object-right opacity-20 pointer-events-none mix-blend-multiply"
          />

          <View className="relative z-10 flex items-center gap-3">
            <View className="w-11 h-11 rounded-xl bg-white/80 backdrop-blur-xs p-1.5 flex items-center justify-center shadow-2xs shrink-0">
              <Image
                src={ASSETS.iconAssistance}
                alt="会员困难帮扶"
                mode="aspectFit"
                className="w-full h-full object-contain"
              />
            </View>
            <View className="flex flex-col">
              <Text className="text-[15px] font-bold text-[#0D2346]">
                会员困难帮扶
              </Text>
              <Text className="text-[11.5px] text-[#3B5987] mt-0.5">
                传递商会温暖 · 共克时难 · 携手同行
              </Text>
            </View>
          </View>

          <button
            type="button"
            className="relative z-10 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#1A509B] to-[#123D7D] text-white text-[12px] font-semibold flex items-center gap-1 shadow-sm group-hover:brightness-110 active:scale-95 transition whitespace-nowrap shrink-0"
          >
            <Text>我要申请</Text>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </View>
    </View>
  );
};
