import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Calendar,
  BookOpen,
  Award,
  Users,
  Star,
  Search,
  Flame,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image } from '../../taro';
import {
  ASSETS,
  PARTY_ARTICLES_DATA,
  PartyArticleItem,
} from '../../data/chamberData';

interface PartyBuildingPageProps {
  initialSubView?: 'home' | 'topic' | 'detail';
  onBackToMain: () => void;
}

export const PartyBuildingPage: React.FC<PartyBuildingPageProps> = ({
  initialSubView = 'topic',
  onBackToMain,
}) => {
  const [subView, setSubView] = useState<'home' | 'topic' | 'detail'>(initialSubView);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [activeArticle, setActiveArticle] = useState<PartyArticleItem>(PARTY_ARTICLES_DATA[0]);

  const categories = ['全部', '党史学习', '党建动态', '政策学习', '主题活动'];

  const filteredArticles =
    selectedCategory === '全部'
      ? PARTY_ARTICLES_DATA
      : PARTY_ARTICLES_DATA.filter((a) => a.badge === selectedCategory);

  const handleOpenDetail = (article: PartyArticleItem) => {
    setActiveArticle(article);
    setSubView('detail');
  };

  return (
    <View className="w-full pb-8 bg-[#F6F8FC] min-h-screen">
      {/* Top Sub-View Switcher Strip so user can inspect all 3 Party Building mockups */}
      <View className="bg-white/90 backdrop-blur-md border-b border-slate-100 px-3 py-2 flex items-center justify-between sticky top-0 z-30">
        <button
          type="button"
          onClick={() => {
            if (subView === 'detail') {
              setSubView('topic');
            } else {
              onBackToMain();
            }
          }}
          className="flex items-center gap-1 text-[13px] font-medium text-slate-700 hover:text-[#C81E1E] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <Text>{subView === 'detail' ? '返回列表' : '返回商会'}</Text>
        </button>

        {/* Segmented Switch for the 3 Party Building Screens in UI Mockups */}
        <View className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-full">
          <button
            type="button"
            onClick={() => setSubView('home')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition ${
              subView === 'home'
                ? 'bg-[#C81E1E] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            党建引领首页
          </button>
          <button
            type="button"
            onClick={() => setSubView('topic')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition ${
              subView === 'topic'
                ? 'bg-[#C81E1E] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            党建专题列表
          </button>
          <button
            type="button"
            onClick={() => setSubView('detail')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition ${
              subView === 'detail'
                ? 'bg-[#C81E1E] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            党建文章详情
          </button>
        </View>

        {/* WeChat Capsule */}
        <View className="hidden sm:flex items-center bg-slate-100 rounded-full h-7 px-2.5 gap-2">
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <span className="w-[1px] h-3 bg-slate-300" />
          <span className="w-3 h-3 rounded-full border border-slate-800" />
        </View>
      </View>

      {/* VIEW 1: 党建引领 携手前行 (Left Screen of Image 8) */}
      {subView === 'home' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col"
        >
          {/* Top Brand Row */}
          <View className="px-4 py-3 bg-gradient-to-b from-[#EBF2FC] to-[#F7EFEF] flex items-center justify-between">
            <View className="flex items-center gap-2.5">
              <Image
                src={ASSETS.logoEmblem}
                alt="宁波市徐州商会"
                className="w-9 h-9 rounded-full bg-white p-0.5 shadow-2xs"
              />
              <View className="flex flex-col">
                <Text className="font-serif-title text-[18px] font-bold text-[#0A2351] leading-tight">
                  宁波市徐州商会
                </Text>
                <Text className="text-[8px] tracking-[0.14em] text-[#1E3A6D] uppercase">
                  NINGBO XUZHOU CHAMBER OF COMMERCE
                </Text>
              </View>
            </View>
            <button
              type="button"
              onClick={() => setSubView('topic')}
              className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-slate-700 shadow-2xs"
              aria-label="搜索党建动态"
            >
              <Search className="w-4 h-4" />
            </button>
          </View>

          {/* Red Hero Banner */}
          <View className="w-full relative overflow-hidden">
            <Image
              src={ASSETS.partyBannerHome}
              alt="党建引领 携手前行"
              className="w-full h-[210px] sm:h-[240px] object-cover"
            />
          </View>

          {/* 4 Red Circular Entry Icons */}
          <View className="px-3 -mt-4 relative z-10">
            <View className="bg-white rounded-2xl p-3.5 shadow-sm grid grid-cols-4 gap-2.5">
              {[
                { label: '党建动态', cat: '党建动态', icon: BookOpen },
                { label: '政策学习', cat: '政策学习', icon: Flame },
                { label: '组织建设', cat: '党史学习', icon: Users },
                { label: '主题活动', cat: '主题活动', icon: Star },
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(item.cat);
                      setSubView('topic');
                    }}
                    className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#FFFBFB] hover:bg-[#FFF2F2] border border-red-50 transition group"
                  >
                    <View className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E02424] to-[#B91C1C] text-white flex items-center justify-center shadow-xs mb-2 group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </View>
                    <Text className="text-[12.5px] font-bold text-slate-800">
                      {item.label}
                    </Text>
                  </button>
                );
              })}
            </View>
          </View>

          {/* 党建要闻 List */}
          <View className="px-3 mt-3">
            <View className="bg-white rounded-2xl p-3.5 shadow-xs">
              <View className="flex items-center justify-between mb-3">
                <Text className="font-serif-title text-[16px] font-bold text-slate-900">
                  党建要闻
                </Text>
                <button
                  type="button"
                  onClick={() => setSubView('topic')}
                  className="flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-[#C81E1E]"
                >
                  <Text>查看更多</Text>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </View>

              <View className="flex flex-col divide-y divide-slate-100">
                {PARTY_ARTICLES_DATA.slice(0, 4).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => handleOpenDetail(art)}
                    className="py-3 first:pt-1 last:pb-1 flex items-center gap-3 cursor-pointer group"
                  >
                    <View className="w-28 h-[72px] rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src={art.thumb}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </View>
                    <View className="flex-1 min-w-0">
                      <Text className="block text-[14px] font-bold text-slate-900 truncate group-hover:text-[#C81E1E] transition">
                        {art.title}
                      </Text>
                      <Text className="mt-1 block text-[11.5px] text-slate-500 truncate">
                        {art.summary}
                      </Text>
                      <Text className="mt-1.5 block text-[11px] text-slate-400 font-mono-num">
                        {art.date}
                      </Text>
                    </View>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </View>
            </View>
          </View>
        </motion.div>
      )}

      {/* VIEW 2: 党建专题 / 党建动态列表 (Left Screen of Image 9) */}
      {subView === 'topic' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="px-3 pt-3 flex flex-col gap-3"
        >
          {/* Top Red Topic Banner: 学思想 强党性 重实践 建新功 */}
          <View className="rounded-2xl overflow-hidden shadow-xs bg-white">
            <Image
              src={ASSETS.partyBannerTopic}
              alt="学思想 强党性 重实践 建新功"
              className="w-full h-[165px] sm:h-[195px] object-cover"
            />

            {/* Category Filter Pills Row */}
            <View className="p-2.5 flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar bg-white">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#C81E1E] text-white font-semibold shadow-2xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-[#C81E1E]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </View>
          </View>

          {/* Tagged Party Building Articles List */}
          <View className="flex flex-col gap-2.5">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => handleOpenDetail(art)}
                className="bg-white rounded-2xl p-3 shadow-[0_2px_12px_rgba(15,41,82,0.04)] flex items-center gap-3 cursor-pointer hover:border-red-200 border border-white transition group"
              >
                {/* Thumbnail with Bottom-Left Corner Badge */}
                <View className="relative w-28 h-[78px] sm:w-32 sm:h-[84px] rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <Image
                    src={art.thumb}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-white text-[10px] font-medium">
                    {art.badge}
                  </span>
                </View>

                <View className="flex-1 min-w-0">
                  <Text className="block text-[14px] sm:text-[15px] font-bold text-slate-900 truncate group-hover:text-[#C81E1E] transition">
                    {art.title}
                  </Text>
                  <Text className="mt-1 block text-[11.5px] text-slate-500 line-clamp-2 leading-[1.4]">
                    {art.summary}
                  </Text>
                  <View className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                    <View className="flex items-center gap-1 font-mono-num">
                      <Clock className="w-3 h-3" />
                      <Text>{art.date}</Text>
                    </View>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </View>
                </View>
              </div>
            ))}
          </View>
        </motion.div>
      )}

      {/* VIEW 3: 党建文章详情页 (Right Screen of Image 9) */}
      {subView === 'detail' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="px-3 pt-3"
        >
          <View className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(15,41,82,0.05)] flex flex-col gap-4">
            {/* Top Hero Conference Image with Badge */}
            <View className="relative rounded-xl overflow-hidden h-[200px] sm:h-[235px] bg-slate-100">
              <Image
                src={ASSETS.partyDetailHero}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </View>

            {/* Title & Meta Info */}
            <View>
              <Text className="block font-serif-title text-[19px] sm:text-[21px] font-bold text-slate-900 leading-snug">
                {activeArticle.title}
              </Text>
              <View className="mt-2 flex items-center gap-4 text-[12px] text-slate-400 font-mono-num">
                <View className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <Text>{activeArticle.date}</Text>
                </View>
                <View className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <Text>{activeArticle.views}</Text>
                </View>
              </View>
            </View>

            {/* 3 Full Article Paragraphs */}
            <View className="flex flex-col gap-3.5 text-[14px] sm:text-[15px] text-slate-700 leading-[1.8] text-justify">
              <p className="m-0">
                为深入学习贯彻党的二十大精神，进一步增强党组织凝聚力和战斗力，11月12日，宁波市徐州商会党支部在商会会议室召开了主题党日活动。商会党支部书记、部分党员及会员代表参加了本次活动。
              </p>
              <p className="m-0">
                会议首先传达学习了党的二十大精神，重点围绕“两个确立”“两个维护”进行了深入学习和讨论。与会党员纷纷表示，要把学习贯彻党的二十大精神作为当前和今后一个时期的重要政治任务，切实把思想和行动统一到党中央决策部署上来。
              </p>
              <p className="m-0">
                随后，商会党支部还组织开展了党史学习教育和交流研讨活动。大家结合自身工作实际，畅谈了学习体会和下一步工作打算。大家一致认为，要在商会发展中充分发挥党员的先锋模范作用，为促进商会高质量发展贡献力量。
              </p>
            </View>

            {/* 3-Photo Gallery Row */}
            <View className="grid grid-cols-3 gap-2.5 pt-1">
              <View className="h-20 sm:h-24 rounded-lg overflow-hidden bg-slate-100">
                <Image
                  src={ASSETS.partyGallery1}
                  alt="活动照片1"
                  className="w-full h-full object-cover"
                />
              </View>
              <View className="h-20 sm:h-24 rounded-lg overflow-hidden bg-slate-100">
                <Image
                  src={ASSETS.partyGallery2}
                  alt="活动照片2"
                  className="w-full h-full object-cover"
                />
              </View>
              <View className="h-20 sm:h-24 rounded-lg overflow-hidden bg-slate-100">
                <Image
                  src={ASSETS.partyGallery3}
                  alt="活动照片3"
                  className="w-full h-full object-cover"
                />
              </View>
            </View>

            {/* Bottom Red Banner: 不忘初心 牢记使命 */}
            <View className="mt-1 rounded-xl bg-gradient-to-r from-[#FDF2F2] via-[#FCE8E8] to-[#FDF2F2] border border-red-100 p-4 flex items-center justify-center gap-4">
              <View className="w-11 h-11 rounded-full bg-[#C81E1E] text-[#FDE047] flex items-center justify-center shadow-xs shrink-0">
                <Award className="w-6 h-6" />
              </View>
              <View className="flex flex-col">
                <Text className="font-serif-title text-[18px] font-bold text-[#991B1B] tracking-wider">
                  不忘初心 牢记使命
                </Text>
                <Text className="text-[11.5px] text-slate-500 tracking-widest mt-0.5">
                  永远跟党走 · 共筑中国梦 ——
                </Text>
              </View>
            </View>
          </View>
        </motion.div>
      )}
    </View>
  );
};
