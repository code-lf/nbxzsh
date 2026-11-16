import React, { useState, useMemo } from 'react';
import { Crown, MapPin, ChevronRight, Search, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image, Input } from '../../taro';
import { CommonHeader } from '../CommonHeader';
import { ENTERPRISES_DATA, EnterpriseItem } from '../../data/chamberData';

interface FeaturedEnterprisesPageProps {
  onSelectEnterprise: (item: EnterpriseItem) => void;
  onBack: () => void;
}

export const FeaturedEnterprisesPage: React.FC<FeaturedEnterprisesPageProps> = ({
  onSelectEnterprise,
  onBack,
}) => {
  const [keyword, setKeyword] = useState('');
  const [activeTag, setActiveTag] = useState<string>('全部推荐');

  const filterTags = ['全部推荐', '副会长单位', '理事单位', '智能制造', '智能家电'];

  // Sort by recommendation score descending
  const featuredList = useMemo(() => {
    return [...ENTERPRISES_DATA]
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .filter((ent) => {
        const matchTag =
          activeTag === '全部推荐' ||
          ent.roleBadge === activeTag ||
          ent.tags.some((t) => t.includes(activeTag.slice(0, 2))) ||
          ent.industryCategory.includes(activeTag.slice(0, 2));
        const kw = keyword.trim().toLowerCase();
        const matchKw =
          !kw ||
          ent.fullName.toLowerCase().includes(kw) ||
          ent.shortName.toLowerCase().includes(kw) ||
          ent.tags.some((t) => t.toLowerCase().includes(kw));
        return matchTag && matchKw;
      });
  }, [activeTag, keyword]);

  return (
    <View className="w-full pb-8 bg-[#EEF3FA] min-h-screen">
      <CommonHeader
        titleLines={['知名会员风采']}
        subtitle="标杆徐商 · 产业链主 · 领军风采"
        verticalPoem={['两汉文化发源地', '千年彭城']}
        showBack
        onBack={onBack}
      >
        <View className="w-full bg-white/95 backdrop-blur-md rounded-full p-1 pl-3.5 flex items-center justify-between shadow-[0_4px_16px_rgba(15,41,82,0.08)] border border-white">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索知名会员企业或产业领域"
            className="flex-1 bg-transparent text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none min-w-0"
          />
          <button
            type="button"
            className="px-4 py-1.5 rounded-full bg-[#154A96] text-white text-[12.5px] font-medium shrink-0"
          >
            搜索
          </button>
        </View>
      </CommonHeader>

      <View className="px-3 -mt-2 relative z-20 flex flex-col gap-3">
        {/* Filter Bar */}
        <View className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {filterTags.map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#154A96] text-white font-semibold shadow-xs'
                    : 'bg-white/85 text-slate-600 hover:bg-white'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </View>

        {/* Highlight Banner Note */}
        <View className="bg-gradient-to-r from-[#FFF8EB] via-[#FFFDF8] to-[#F3F8FF] rounded-2xl p-3 border border-[#F5E1BE]/70 flex items-center justify-between gap-2">
          <View className="flex items-center gap-2.5 min-w-0">
            <View className="w-9 h-9 rounded-xl bg-[#FDF1D6] text-[#C98932] flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 fill-[#EAB664]" />
            </View>
            <View className="min-w-0">
              <Text className="text-[13.5px] font-bold text-[#0D2346] block truncate">
                宁波市徐州商会重点推荐标杆会员企业
              </Text>
              <Text className="text-[11px] text-slate-500 block truncate">
                展示行业影响力突出、积极推动甬徐双城协同发展的会员单位
              </Text>
            </View>
          </View>
        </View>

        {/* Featured Cards List */}
        <View className="flex flex-col gap-3">
          {featuredList.map((ent, index) => (
            <motion.div
              key={ent.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: index * 0.04 }}
              onClick={() => onSelectEnterprise(ent)}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,41,82,0.05)] border border-white hover:border-blue-200 transition cursor-pointer group"
            >
              {/* Top Wide Banner */}
              <View className="relative h-[126px] w-full bg-slate-200">
                <Image
                  src={ent.buildingImg}
                  alt={ent.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <View className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/15 to-transparent" />
                <View className="absolute top-2.5 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-[#FDF3E1]/95 text-[#9A6418] text-[10.5px] font-semibold flex items-center gap-1 shadow-2xs">
                    <Award className="w-3 h-3 text-[#C98932]" />
                    {ent.roleBadge}
                  </span>
                </View>
                <View className="absolute top-2.5 right-3 px-2 py-0.5 rounded-md bg-black/45 backdrop-blur-xs text-white text-[10.5px] font-mono-num">
                  综合指数 {ent.score}
                </View>
                <View className="absolute -bottom-4 left-3.5 w-11 h-11 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center z-10">
                  <Text
                    className={`font-extrabold leading-none ${
                      ent.logoColor === 'red'
                        ? 'text-[#D92D20] text-[15px] font-serif-title'
                        : 'text-[#0B3B8C] text-[9.5px]'
                    }`}
                  >
                    {ent.logoText}
                  </Text>
                </View>
              </View>

              {/* Card Body */}
              <View className="px-3.5 pb-3.5 pt-5">
                <View className="flex items-center justify-between gap-2">
                  <Text className="text-[15.5px] font-bold text-[#0A2046] truncate">
                    {ent.fullName}
                  </Text>
                  <View className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
                    <MapPin className="w-3 h-3" />
                    <Text>{ent.city}</Text>
                  </View>
                </View>

                <Text className="mt-1.5 block text-[12px] text-slate-600 line-clamp-2 leading-relaxed">
                  {ent.fullDesc}
                </Text>

                <View className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <View className="flex items-center gap-1.5 flex-wrap">
                    {ent.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#EBF3FE] text-[#25599C] text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </View>
                  <button
                    type="button"
                    className="px-3 py-1 rounded-full bg-[#154A96] text-white text-[11.5px] font-semibold flex items-center gap-0.5 group-hover:bg-[#103B79] transition shrink-0"
                  >
                    <Text>企业详情</Text>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </View>
              </View>
            </motion.div>
          ))}
        </View>
      </View>
    </View>
  );
};
