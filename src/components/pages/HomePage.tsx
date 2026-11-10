import React, { useState } from 'react';
import { ChevronRight, Crown, User, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image } from '../../taro';
import { CommonHeader } from '../CommonHeader';
import {
  ASSETS,
  ENTERPRISES_DATA,
  NEWS_DATA,
  EnterpriseItem,
  NewsArticleItem,
} from '../../data/chamberData';

interface HomePageProps {
  onNavigate: (page: string, subTab?: string) => void;
  onSelectEnterprise: (item: EnterpriseItem) => void;
  onSelectArticle: (article: NewsArticleItem) => void;
  onOpenModal: (modalType: 'investment' | 'assistance' | 'activity' | 'join') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectEnterprise,
  onSelectArticle,
  onOpenModal,
}) => {
  const [activeNewsTab, setActiveNewsTab] = useState<'最新动态' | '商会活动' | '党建专题'>('最新动态');

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
      action: () => onNavigate('enterprises'),
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
      sub: '最新动态',
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
      action: () => onOpenModal('activity'),
    },
  ];

  // Top 3 enterprises on Home screen in exact order: 吉利汽车集团, 弘阳集团, 奥克斯集团
  const homeEnterprises = [
    ENTERPRISES_DATA[0], // 吉利汽车集团
    ENTERPRISES_DATA[2], // 弘阳集团
    ENTERPRISES_DATA[1], // 奥克斯集团
  ];

  const filteredNews =
    activeNewsTab === '最新动态'
      ? NEWS_DATA.slice(0, 3)
      : activeNewsTab === '商会活动'
      ? [NEWS_DATA[1], NEWS_DATA[0], NEWS_DATA[3]]
      : [NEWS_DATA[2], NEWS_DATA[0], NEWS_DATA[1]];

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
          className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-[0_4px_20px_rgba(15,41,82,0.05)] border border-white"
        >
          <View className="grid grid-cols-6 gap-1.5">
            {quickEntries.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-gradient-to-b from-[#F5F9FF] to-[#FBFCFF] hover:from-[#EBF3FF] hover:to-[#F5F9FF] active:scale-95 transition border border-blue-50/80 group"
              >
                <View className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center mb-1.5 group-hover:-translate-y-0.5 transition-transform">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    mode="aspectFit"
                    lazyLoad={false}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(29,78,216,0.15)]"
                  />
                </View>
                <Text className="text-[12px] sm:text-[13px] font-bold text-[#0F2547] whitespace-nowrap leading-tight">
                  {item.title}
                </Text>
                <Text className="text-[10px] text-slate-400 mt-0.5 whitespace-nowrap">
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
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)]"
        >
          <View className="flex items-center justify-between mb-3">
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

          <View className="grid grid-cols-4 gap-2">
            {/* 会长 */}
            <button
              type="button"
              onClick={() => onNavigate('directory', '会长')}
              className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#F8FAFE] to-[#F1F6FD] p-2.5 flex flex-col items-center border border-blue-50/80 hover:border-blue-200 transition text-left"
            >
              <View className="flex items-center gap-1.5 w-full justify-center">
                <Crown className="w-5 h-5 text-[#D99B43] fill-[#EAB664]" />
                <View className="flex flex-col items-start">
                  <Text className="text-[11px] font-medium text-slate-600">会长</Text>
                  <View className="flex items-baseline gap-0.5">
                    <Text className="font-serif-title text-[20px] font-bold text-[#0A2046] tabular-nums leading-none">
                      1
                    </Text>
                    <Text className="text-[10px] text-slate-500">人</Text>
                  </View>
                </View>
              </View>
              <View className="w-4/5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
            </button>

            {/* 副会长 */}
            <button
              type="button"
              onClick={() => onNavigate('directory', '副会长')}
              className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#F8FAFE] to-[#F1F6FD] p-2.5 flex flex-col items-center border border-blue-50/80 hover:border-blue-200 transition text-left"
            >
              <View className="flex items-center gap-1.5 w-full justify-center">
                <User className="w-5 h-5 text-[#698BBF] fill-[#8BA9D6]" />
                <View className="flex flex-col items-start">
                  <Text className="text-[11px] font-medium text-slate-600">副会长</Text>
                  <View className="flex items-baseline gap-0.5">
                    <Text className="font-serif-title text-[20px] font-bold text-[#0A2046] tabular-nums leading-none">
                      12
                    </Text>
                    <Text className="text-[10px] text-slate-500">人</Text>
                  </View>
                </View>
              </View>
              <View className="w-4/5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
            </button>

            {/* 理事 */}
            <button
              type="button"
              onClick={() => onNavigate('directory', '理事')}
              className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#F8FAFE] to-[#F1F6FD] p-2.5 flex flex-col items-center border border-blue-50/80 hover:border-blue-200 transition text-left"
            >
              <View className="flex items-center gap-1.5 w-full justify-center">
                <Users className="w-5 h-5 text-[#698BBF] fill-[#8BA9D6]" />
                <View className="flex flex-col items-start">
                  <Text className="text-[11px] font-medium text-slate-600">理事</Text>
                  <View className="flex items-baseline gap-0.5">
                    <Text className="font-serif-title text-[20px] font-bold text-[#0A2046] tabular-nums leading-none">
                      36
                    </Text>
                    <Text className="text-[10px] text-slate-500">人</Text>
                  </View>
                </View>
              </View>
              <View className="w-4/5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
            </button>

            {/* 会员 */}
            <button
              type="button"
              onClick={() => onNavigate('directory', '全部')}
              className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#F8FAFE] to-[#F1F6FD] p-2.5 flex flex-col items-center border border-blue-50/80 hover:border-blue-200 transition text-left"
            >
              <View className="flex items-center gap-1.5 w-full justify-center">
                <Users className="w-5 h-5 text-[#698BBF] fill-[#8BA9D6]" />
                <View className="flex flex-col items-start">
                  <Text className="text-[11px] font-medium text-slate-600">会员</Text>
                  <View className="flex items-baseline gap-0.5">
                    <Text className="font-serif-title text-[20px] font-bold text-[#0A2046] tabular-nums leading-none">
                      268
                    </Text>
                    <Text className="text-[10px] text-slate-500">人</Text>
                  </View>
                </View>
              </View>
              <View className="w-4/5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
            </button>
          </View>
        </motion.div>

        {/* 3. 知名会员企业 Card */}
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
              onClick={() => onNavigate('enterprises')}
              className="flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-[#154A96] transition"
            >
              <Text>查看更多</Text>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </View>

          <View className="grid grid-cols-3 gap-2.5">
            {homeEnterprises.map((ent) => (
              <div
                key={ent.id}
                onClick={() => onSelectEnterprise(ent)}
                className="group cursor-pointer rounded-xl border border-slate-100 bg-[#FAFBFD] overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-200 transition flex flex-col"
              >
                {/* Top Building Photo */}
                <View className="relative h-20 sm:h-24 w-full overflow-hidden bg-slate-200">
                  <Image
                    src={ent.bannerImg}
                    alt={ent.shortName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </View>

                {/* Overlapping Logo + Title + Role Badge */}
                <View className="px-2.5 pb-2.5 pt-1 flex-1 flex flex-col justify-between relative">
                  <View>
                    <View className="flex items-start gap-1.5">
                      {/* Circular overlapping brand logo */}
                      <View className="-mt-6 w-11 h-11 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0 z-10">
                        <Text
                          className={`font-extrabold tracking-tighter ${
                            ent.logoColor === 'red'
                              ? 'text-[#D92D20] text-[15px] font-serif-title'
                              : 'text-[#0B3B8C] text-[10px]'
                          }`}
                        >
                          {ent.logoText}
                        </Text>
                      </View>
                      <View className="flex flex-col min-w-0 pt-0.5">
                        <Text className="text-[12.5px] sm:text-[13.5px] font-bold text-slate-900 truncate">
                          {ent.shortName}
                        </Text>
                        <span className="mt-0.5 inline-block self-start px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#FDF3E1] text-[#9A6418]">
                          {ent.roleBadge}
                        </span>
                      </View>
                    </View>

                    {/* Tags line */}
                    <Text className="mt-2 block text-[11px] font-medium text-[#2A5C9A] truncate">
                      {ent.tags.slice(0, 2).join(' · ')}
                    </Text>

                    {/* Description + Right Arrow */}
                    <View className="mt-1 flex items-center justify-between gap-1">
                      <Text className="text-[10.5px] text-slate-500 line-clamp-2 leading-[1.35]">
                        {ent.homeDesc}
                      </Text>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </View>
                  </View>
                </View>
              </div>
            ))}
          </View>
        </motion.div>

        {/* 4. 商会资讯 Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, delay: 0.12 }}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)]"
        >
          <View className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <View className="flex items-center gap-4">
              <View className="flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#154A96]" />
                <Text className="font-serif-title text-[16px] sm:text-[17px] font-bold text-[#0D2346]">
                  商会资讯
                </Text>
              </View>

              {/* Inline Tabs: 最新动态 | 商会活动 | 党建专题 */}
              <View className="flex items-center gap-3.5">
                {(['最新动态', '商会活动', '党建专题'] as const).map((tab) => {
                  const isActive = activeNewsTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        if (tab === '党建专题') {
                          onNavigate('party');
                        } else {
                          setActiveNewsTab(tab);
                        }
                      }}
                      className={`relative py-1 text-[12.5px] font-medium transition whitespace-nowrap ${
                        isActive ? 'text-[#154A96] font-bold' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab}
                      {isActive && (
                        <span className="absolute bottom-0 left-1 right-1 h-[2.5px] bg-[#154A96] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </View>
            </View>

            <button
              type="button"
              onClick={() => onNavigate('news')}
              className="flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-[#154A96] transition shrink-0"
            >
              <Text>查看更多</Text>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </View>

          <View className="flex flex-col divide-y divide-slate-100">
            {filteredNews.map((news) => (
              <div
                key={news.id}
                onClick={() => {
                  if (news.category === '党建专题') {
                    onNavigate('party', 'detail');
                  } else {
                    onSelectArticle(news);
                  }
                }}
                className="py-2.5 first:pt-1 last:pb-0.5 flex items-center gap-3 cursor-pointer group"
              >
                <View className="w-24 h-14 sm:w-28 sm:h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <Image
                    src={news.homeThumb || news.thumb}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </View>
                <View className="flex-1 min-w-0">
                  <Text className="block text-[13.5px] font-bold text-slate-900 truncate group-hover:text-[#154A96] transition">
                    {news.title}
                  </Text>
                  <Text className="mt-1 block text-[11.5px] text-slate-500 truncate">
                    {news.shortSummary}
                  </Text>
                  <Text className="mt-1 block text-[11px] text-slate-400 font-mono-num">
                    {news.date}
                  </Text>
                </View>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>
            ))}
          </View>
        </motion.div>

        {/* 5. Bottom Banner: 会员困难帮扶 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.16 }}
          onClick={() => onOpenModal('assistance')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#DCE9FA] via-[#E5EFFC] to-[#D4E4FA] p-3.5 flex items-center justify-between cursor-pointer border border-white/80 shadow-xs group"
        >
          {/* Subtle Right Background Landscape Relief */}
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
