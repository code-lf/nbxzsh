import React, { useState } from 'react';
import {
  Star,
  Calendar,
  MapPin,
  ChevronRight,
  Clock,
  Newspaper,
  Flag,
  Flame,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image } from '../../taro';
import { CommonHeader } from '../CommonHeader';
import {
  ASSETS,
  NEWS_DATA,
  NewsArticleItem,
} from '../../data/chamberData';

interface NewsPageProps {
  onSelectArticle: (article: NewsArticleItem) => void;
  onNavigateParty: (subView?: 'home' | 'topic' | 'detail') => void;
  onOpenActivityModal: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  onSelectArticle,
  onNavigateParty,
  onOpenActivityModal,
}) => {
  const [activeTab, setActiveTab] = useState<'最新资讯' | '商会活动' | '党建专题'>('最新资讯');

  const focusArticle = NEWS_DATA[0];

  const displayedNews =
    activeTab === '最新资讯'
      ? NEWS_DATA
      : activeTab === '商会活动'
      ? [NEWS_DATA[1], NEWS_DATA[0], NEWS_DATA[3]]
      : [NEWS_DATA[2], NEWS_DATA[1]];

  return (
    <View className="w-full pb-6 bg-[#EEF3FA]">
      <CommonHeader
        titleLines={['商会资讯']}
        subtitle="商会动态 · 活动发布 · 党建专题"
        verticalPoem={['两汉文化故里', '千年彭城']}
      />

      <View className="px-3 -mt-4 relative z-20 flex flex-col gap-3">
        {/* 1. 本周焦点 Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => onSelectArticle(focusArticle)}
          className="bg-white rounded-2xl p-2.5 shadow-[0_4px_20px_rgba(15,41,82,0.06)] cursor-pointer group"
        >
          <View className="relative rounded-xl overflow-hidden min-h-[168px] sm:min-h-[184px] flex items-stretch bg-gradient-to-r from-[#EAF2FC] via-[#EEF5FD] to-[#DCE9FA]">
            {/* Right Half Photo with Left Gradient Blend */}
            <View className="absolute right-0 top-0 bottom-0 w-[56%] overflow-hidden">
              <Image
                src={ASSETS.newsFocusRight}
                alt="宁波市徐州商会2024年会员大会"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <View
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, #ECF3FC 0%, rgba(236,243,252,0.75) 24%, rgba(236,243,252,0.05) 65%, transparent 100%)',
                }}
              />
            </View>

            {/* Left Half Content */}
            <View className="relative z-10 p-3 flex flex-col justify-between w-full">
              <View>
                {/* 本周焦点 Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1B56A8] text-white text-[11px] font-semibold shadow-2xs">
                  <Star className="w-3 h-3 fill-white text-white" />
                  本周焦点
                </span>

                <Text className="mt-2 block font-serif-title text-[16.5px] sm:text-[18px] font-bold text-[#092147] leading-[1.32] max-w-[72%]">
                  宁波市徐州商会2024年会员大会
                  <br />
                  暨迎新交流会圆满举行
                </Text>

                <Text className="mt-1.5 block text-[11.5px] text-[#284878] font-medium">
                  凝聚徐商力量，共话高质量发展新机遇
                </Text>
              </View>

              <View className="mt-3 flex items-end justify-between gap-2">
                <View className="flex flex-col gap-1 text-[11px] text-[#2B4C7E]">
                  <View className="flex items-center gap-1.5 font-mono-num">
                    <Calendar className="w-3.5 h-3.5 text-[#154A96]" />
                    <Text>2024-12-18</Text>
                  </View>
                  <View className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#154A96]" />
                    <Text>宁波泛太平洋大酒店 · 三楼大宴会厅</Text>
                  </View>
                </View>

                <button
                  type="button"
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1953A0] to-[#113C7A] text-white text-[12px] font-semibold flex items-center gap-1 shadow-md border border-white/50 group-hover:brightness-110 transition whitespace-nowrap shrink-0"
                >
                  <Text>查看详情</Text>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </View>
            </View>
          </View>
        </motion.div>

        {/* 2. 3-Tab Switcher Bar: 最新资讯 | 商会活动 | 党建专题 */}
        <View className="bg-white rounded-2xl px-2 pt-2.5 pb-0 shadow-[0_2px_12px_rgba(15,41,82,0.04)] grid grid-cols-3 divide-x divide-slate-100">
          <button
            type="button"
            onClick={() => setActiveTab('最新资讯')}
            className="flex items-center justify-center gap-2 pb-2.5 relative transition"
          >
            <View
              className={`w-6 h-6 rounded-md flex items-center justify-center ${
                activeTab === '最新资讯'
                  ? 'bg-[#154A96] text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
            </View>
            <Text
              className={`font-serif-title text-[15px] font-bold ${
                activeTab === '最新资讯' ? 'text-[#0B234A]' : 'text-slate-500'
              }`}
            >
              最新资讯
            </Text>
            {activeTab === '最新资讯' && (
              <span className="absolute bottom-0 left-6 right-6 h-[3px] bg-[#154A96] rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('商会活动')}
            className="flex items-center justify-center gap-2 pb-2.5 relative transition"
          >
            <Flag
              className={`w-4 h-4 ${
                activeTab === '商会活动' ? 'text-[#154A96] fill-[#154A96]' : 'text-slate-400'
              }`}
            />
            <Text
              className={`font-serif-title text-[15px] font-bold ${
                activeTab === '商会活动' ? 'text-[#0B234A]' : 'text-slate-500'
              }`}
            >
              商会活动
            </Text>
            {activeTab === '商会活动' && (
              <span className="absolute bottom-0 left-6 right-6 h-[3px] bg-[#154A96] rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigateParty('topic')}
            className="flex items-center justify-center gap-2 pb-2.5 relative transition group"
          >
            <Flame className="w-4 h-4 text-[#C81E1E] group-hover:scale-110 transition-transform" />
            <Text className="font-serif-title text-[15px] font-bold text-slate-600 group-hover:text-[#C81E1E]">
              党建专题
            </Text>
          </button>
        </View>

        {/* 3. News Articles List Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.05 }}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)] flex flex-col divide-y divide-slate-100"
        >
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
              className="py-3 first:pt-0.5 last:pb-0.5 flex items-center gap-3 cursor-pointer group"
            >
              <View className="w-28 h-[74px] sm:w-32 sm:h-[82px] rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src={item.thumb}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </View>

              <View className="flex-1 min-w-0">
                <Text className="block text-[14px] sm:text-[15px] font-bold text-[#0D2346] truncate group-hover:text-[#154A96] transition">
                  {item.title}
                </Text>
                <Text className="mt-1 block text-[11.5px] text-slate-500 line-clamp-2 leading-[1.4]">
                  {item.fullSummary}
                </Text>
                <View className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-400 font-mono-num">
                  <Clock className="w-3 h-3" />
                  <Text>{item.date}</Text>
                </View>
              </View>

              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          ))}
        </motion.div>

        {/* 4. 近期活动预告 Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)]"
        >
          <View className="flex items-center justify-between mb-3">
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
              onClick={onOpenActivityModal}
              className="flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-[#154A96] transition"
            >
              <Text>查看更多</Text>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </View>

          <View className="flex items-stretch gap-3 flex-col sm:flex-row">
            {/* Left Event Poster */}
            <View
              onClick={onOpenActivityModal}
              className="w-full sm:w-40 h-28 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-slate-100 cursor-pointer"
            >
              <Image
                src={ASSETS.event2025Gala}
                alt="宁波市徐州商会2025年新春联谊会"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </View>

            {/* Middle Event Details */}
            <View className="flex-1 min-w-0 flex flex-col justify-between">
              <View>
                <Text className="block text-[14.5px] font-bold text-[#0D2346] truncate">
                  宁波市徐州商会2025年新春联谊会
                </Text>
                <Text className="mt-0.5 block text-[11.5px] text-slate-500">
                  传承汉风 · 同心同行 · 共迎未来
                </Text>
              </View>

              <View className="mt-2 flex flex-col gap-1 text-[11px] text-slate-600">
                <View className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#154A96] shrink-0" />
                  <Text className="font-mono-num">2025-01-10 (周五) 18:00-21:00</Text>
                </View>
                <View className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#154A96] shrink-0 mt-0.5" />
                  <View className="flex flex-col">
                    <Text className="font-medium text-slate-700">
                      宁波香格里拉大酒店 · 四楼宴会厅
                    </Text>
                    <Text className="text-[10.5px] text-slate-400">
                      浙江省宁波市鄞州区豫源街88号
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Right Scale & CTA */}
            <View className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
              <View className="px-3 py-1.5 rounded-xl bg-[#FDF6E9] border border-[#F5E3C3] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#D08C2E]" />
                <View className="flex flex-col">
                  <Text className="text-[9.5px] text-slate-500">预计规模</Text>
                  <Text className="text-[13px] font-bold text-[#0D2346] font-mono-num">
                    200 <span className="text-[10px] font-normal">人</span>
                  </Text>
                </View>
              </View>

              <button
                type="button"
                onClick={onOpenActivityModal}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1953A0] to-[#113C7A] text-white text-[12px] font-semibold flex items-center gap-1 shadow-xs hover:brightness-110 active:scale-95 transition whitespace-nowrap"
              >
                <Text>查看活动</Text>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </View>
          </View>
        </motion.div>
      </View>
    </View>
  );
};
