import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  Clock,
  Newspaper,
  Flag,
  Flame,
  Search,
  Layers,
  Eye,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image, Input } from '../../taro';
import { CommonHeader } from '../CommonHeader';
import {
  ASSETS,
  NEWS_DATA,
  NewsArticleItem,
} from '../../data/chamberData';

interface NewsPageProps {
  onSelectArticle: (article: NewsArticleItem) => void;
  onNavigateParty: (subView?: 'home' | 'topic' | 'detail') => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  onSelectArticle,
  onNavigateParty,
}) => {
  const [activeTab, setActiveTab] = useState<'全部资讯' | '最新资讯' | '商会活动' | '党建专题'>('全部资讯');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredNews = useMemo(() => {
    const kw = searchKeyword.trim().toLowerCase();
    return NEWS_DATA.filter((item) => {
      const matchTab = activeTab === '全部资讯' || item.category === activeTab;
      const matchKw =
        !kw ||
        item.title.toLowerCase().includes(kw) ||
        item.fullSummary.toLowerCase().includes(kw) ||
        item.category.includes(kw);
      return matchTab && matchKw;
    });
  }, [activeTab, searchKeyword]);

  const displayedNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  // Horizontal quick highlight cards for "最新资讯 / 商会活动" pagination swipe strip
  const swipeHighlights = NEWS_DATA.filter((n) => n.category !== '党建专题');

  return (
    <View className="w-full pb-6 bg-[#EEF3FA]">
      {/* Hero with Embedded Search Bar so first screen is full and balanced */}
      <CommonHeader
        titleLines={['商会资讯']}
        subtitle="商会动态 · 活动发布 · 党建专题"
        verticalPoem={['两汉文化故里', '千年彭城']}
      >
        <View className="w-full bg-white/95 backdrop-blur-md rounded-full p-1 pl-3.5 flex items-center justify-between shadow-[0_4px_16px_rgba(15,41,82,0.08)] border border-white">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <Input
            type="text"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setVisibleCount(8);
            }}
            placeholder="搜索商会动态、活动报道或党建文章"
            className="flex-1 bg-transparent text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none min-w-0"
          />
          <button
            type="button"
            className="px-5 py-1.5 rounded-full bg-[#154A96] hover:bg-[#103B79] active:scale-95 text-white text-[13px] font-medium transition shrink-0 shadow-xs"
          >
            搜索
          </button>
        </View>
      </CommonHeader>

      <View className="px-3 -mt-2 relative z-20 flex flex-col gap-3">
        {/* 1. 4-Tab Switcher Bar: 全部资讯 | 最新资讯 | 商会活动 | 党建专题 */}
        <View className="bg-white rounded-2xl px-1 pt-2.5 pb-0 shadow-[0_2px_12px_rgba(15,41,82,0.04)] grid grid-cols-4 divide-x divide-slate-100">
          <button
            type="button"
            onClick={() => {
              setActiveTab('全部资讯');
              setVisibleCount(4);
            }}
            className="flex items-center justify-center gap-1 pb-2.5 relative transition px-0.5"
          >
            <Layers
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
                activeTab === '全部资讯' ? 'text-[#154A96]' : 'text-slate-400'
              }`}
            />
            <Text
              className={`font-serif-title text-[12px] sm:text-[13.5px] font-bold whitespace-nowrap ${
                activeTab === '全部资讯' ? 'text-[#0B234A]' : 'text-slate-500'
              }`}
            >
              全部资讯
            </Text>
            {activeTab === '全部资讯' && (
              <span className="absolute bottom-0 left-2.5 sm:left-4 right-2.5 sm:right-4 h-[3px] bg-[#154A96] rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('最新资讯');
              setVisibleCount(4);
            }}
            className="flex items-center justify-center gap-1 pb-2.5 relative transition px-0.5"
          >
            <Newspaper
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
                activeTab === '最新资讯' ? 'text-[#154A96]' : 'text-slate-400'
              }`}
            />
            <Text
              className={`font-serif-title text-[12px] sm:text-[13.5px] font-bold whitespace-nowrap ${
                activeTab === '最新资讯' ? 'text-[#0B234A]' : 'text-slate-500'
              }`}
            >
              最新资讯
            </Text>
            {activeTab === '最新资讯' && (
              <span className="absolute bottom-0 left-2.5 sm:left-4 right-2.5 sm:right-4 h-[3px] bg-[#154A96] rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('商会活动');
              setVisibleCount(4);
            }}
            className="flex items-center justify-center gap-1 pb-2.5 relative transition px-0.5"
          >
            <Flag
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
                activeTab === '商会活动' ? 'text-[#154A96] fill-[#154A96]' : 'text-slate-400'
              }`}
            />
            <Text
              className={`font-serif-title text-[12px] sm:text-[13.5px] font-bold whitespace-nowrap ${
                activeTab === '商会活动' ? 'text-[#0B234A]' : 'text-slate-500'
              }`}
            >
              商会活动
            </Text>
            {activeTab === '商会活动' && (
              <span className="absolute bottom-0 left-2.5 sm:left-4 right-2.5 sm:right-4 h-[3px] bg-[#154A96] rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigateParty('topic')}
            className="flex items-center justify-center gap-1 pb-2.5 relative transition group px-0.5"
          >
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C81E1E] group-hover:scale-110 transition-transform shrink-0" />
            <Text className="font-serif-title text-[12px] sm:text-[13.5px] font-bold text-slate-600 group-hover:text-[#C81E1E] whitespace-nowrap">
              党建专题
            </Text>
          </button>
        </View>

        {/* 2. Horizontal Swipeable Card Strip (解决横向内容滑动浏览) */}
        <View className="bg-white rounded-2xl p-3 shadow-[0_4px_20px_rgba(15,41,82,0.04)]">
          <View className="flex items-center justify-between mb-2">
            <View className="flex items-center gap-1.5">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[15px] font-bold text-[#0D2346]">
                热点图文速览
              </Text>
            </View>
            <Text className="text-[11px] text-slate-400">左右滑动查看更多 →</Text>
          </View>

          <div className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar pb-0.5 snap-x">
            {swipeHighlights.map((item) => (
              <div
                key={`slide-${item.id}`}
                onClick={() => onSelectArticle(item)}
                className="w-[216px] shrink-0 snap-start rounded-xl border border-slate-100 bg-[#FAFBFD] overflow-hidden cursor-pointer hover:border-blue-200 transition group"
              >
                <View className="relative h-[94px] w-full bg-slate-200">
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-[#154A96]/90 text-white text-[9.5px] font-medium">
                    {item.category}
                  </span>
                </View>
                <View className="p-2.5">
                  <Text className="block text-[12.5px] font-bold text-[#0D2346] line-clamp-2 leading-snug">
                    {item.title}
                  </Text>
                  <View className="mt-1.5 flex items-center justify-between text-[10.5px] text-slate-400 font-mono-num">
                    <Text>{item.date}</Text>
                    <View className="flex items-center gap-0.5">
                      <Eye className="w-3 h-3" />
                      <Text>{item.views}</Text>
                    </View>
                  </View>
                </View>
              </div>
            ))}
          </div>
        </View>

        {/* 3. Full Paginated News Articles List Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)]"
        >
          <View className="flex items-center justify-between mb-2">
            <View className="flex items-center gap-1.5">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[15.5px] font-bold text-[#0D2346]">
                {activeTab}列表
              </Text>
              <Text className="text-[12px] text-slate-400 font-mono-num">
                ({filteredNews.length})
              </Text>
            </View>
            <Text className="text-[11px] text-slate-400">
              已显示 {displayedNews.length} / {filteredNews.length}
            </Text>
          </View>

          <View className="flex flex-col divide-y divide-slate-100">
            {displayedNews.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.category === '党建专题') {
                    onNavigateParty('detail');
                  } else {
                    onSelectArticle(item);
                  }
                }}
                className="py-3 first:pt-1 last:pb-1 flex items-center gap-3 cursor-pointer group"
              >
                <View className="relative w-28 h-[74px] sm:w-32 sm:h-[82px] rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9.5px] font-medium text-white ${
                      item.category === '党建专题'
                        ? 'bg-[#C81E1E]/90'
                        : item.category === '商会活动'
                        ? 'bg-[#1D54A6]/90'
                        : 'bg-slate-900/75'
                    }`}
                  >
                    {item.category}
                  </span>
                </View>

                <View className="flex-1 min-w-0">
                  <Text className="block text-[14px] sm:text-[15px] font-bold text-[#0D2346] truncate group-hover:text-[#154A96] transition">
                    {item.title}
                  </Text>
                  <Text className="mt-1 block text-[11.5px] text-slate-500 line-clamp-2 leading-[1.4]">
                    {item.fullSummary}
                  </Text>
                  <View className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400 font-mono-num">
                    <View className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <Text>{item.date}</Text>
                    </View>
                    <View className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <Text>{item.views}</Text>
                    </View>
                  </View>
                </View>

                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>
            ))}
          </View>

          {/* Load More / Reached Bottom */}
          <View className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center">
            {hasMore ? (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="px-5 py-1.5 rounded-full bg-[#F2F6FC] hover:bg-[#E4EEFB] text-[#154A96] text-[12px] font-semibold transition"
              >
                加载更多资讯 ({displayedNews.length}/{filteredNews.length})
              </button>
            ) : (
              <Text className="text-[11.5px] text-slate-400">
                —— 已加载到底，共 {filteredNews.length} 条商会资讯 ——
              </Text>
            )}
          </View>
        </motion.div>

        {/* 4. 党建红船专栏快捷入口卡片 (保证第3页内容充实无留白) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.05 }}
          onClick={() => onNavigateParty('home')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FDF2F2] via-[#FCE8E8] to-[#FAE2E2] p-3.5 border border-red-100 shadow-xs flex items-center justify-between cursor-pointer group"
        >
          <View className="flex items-center gap-3 min-w-0">
            <View className="w-14 h-12 rounded-xl overflow-hidden shrink-0 shadow-2xs">
              <Image
                src={ASSETS.partyBannerHome}
                alt="党建引领"
                className="w-full h-full object-cover"
              />
            </View>
            <View className="min-w-0">
              <View className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#C81E1E]" />
                <Text className="font-serif-title text-[15px] font-bold text-[#991B1B] truncate">
                  宁波市徐州商会党建引领专栏
                </Text>
              </View>
              <Text className="mt-0.5 block text-[11px] text-slate-600 truncate">
                党建动态 · 政策学习 · 主题党日活动专题
              </Text>
            </View>
          </View>

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full bg-[#C81E1E] text-white text-[11.5px] font-semibold flex items-center gap-0.5 shadow-2xs group-hover:brightness-110 transition shrink-0 whitespace-nowrap"
          >
            <Text>进入专栏</Text>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </View>
    </View>
  );
};
