import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, ChevronRight, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image, Input } from '../../taro';
import { CommonHeader } from '../CommonHeader';
import { ACTIVITIES_DATA, ActivityItem } from '../../data/chamberData';

interface ActivitiesPageProps {
  onSelectActivity: (activity: ActivityItem) => void;
  onQuickSignup: (activity: ActivityItem) => void;
  onBack: () => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({
  onSelectActivity,
  onQuickSignup,
  onBack,
}) => {
  const [statusFilter, setStatusFilter] = useState<'全部活动' | '报名中' | '即将开始' | '已结束'>('全部活动');
  const [keyword, setKeyword] = useState('');

  const filteredActivities = useMemo(() => {
    return ACTIVITIES_DATA.filter((act) => {
      const matchStatus = statusFilter === '全部活动' || act.status === statusFilter;
      const kw = keyword.trim().toLowerCase();
      const matchKw =
        !kw ||
        act.title.toLowerCase().includes(kw) ||
        act.location.toLowerCase().includes(kw) ||
        act.subtitle.toLowerCase().includes(kw);
      return matchStatus && matchKw;
    });
  }, [statusFilter, keyword]);

  return (
    <View className="w-full pb-8 bg-[#EEF3FA] min-h-screen">
      <CommonHeader
        titleLines={['近期活动预告']}
        subtitle="相聚甬城 · 资源对接 · 共话发展"
        verticalPoem={['两汉文化故里', '千年彭城']}
        showBack
        onBack={onBack}
      >
        <View className="w-full bg-white/95 backdrop-blur-md rounded-full p-1 pl-3.5 flex items-center justify-between shadow-[0_4px_16px_rgba(15,41,82,0.08)] border border-white">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索商会活动名称或举办地点"
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
        {/* Status Filter Tabs */}
        <View className="grid grid-cols-4 gap-1.5">
          {(['全部活动', '报名中', '即将开始', '已结束'] as const).map((st) => {
            const active = statusFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`py-2 px-1 rounded-full text-[12px] font-medium transition whitespace-nowrap ${
                  active
                    ? 'bg-[#154A96] text-white font-semibold shadow-xs'
                    : 'bg-white/85 text-slate-700 hover:bg-white'
                }`}
              >
                {st}
              </button>
            );
          })}
        </View>

        {/* Activities List */}
        <View className="flex flex-col gap-3">
          {filteredActivities.map((act, index) => {
            const percent = Math.min(100, Math.round((act.registeredCount / act.capacity) * 100));
            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: index * 0.04 }}
                onClick={() => onSelectActivity(act)}
                className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.05)] border border-white hover:border-blue-200 transition cursor-pointer group"
              >
                {/* Top Poster + Details */}
                <View className="flex items-start gap-3">
                  <View className="relative w-[124px] h-[82px] rounded-xl overflow-hidden shrink-0 bg-[#EBF3FC]">
                    <Image
                      src={act.poster}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                      className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold shadow-2xs ${
                        act.status === '报名中'
                          ? 'bg-[#154A96] text-white'
                          : act.status === '即将开始'
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-600/85 text-white'
                      }`}
                    >
                      {act.status}
                    </span>
                  </View>

                  <View className="flex-1 min-w-0">
                    <Text className="block text-[14.5px] font-bold text-[#0D2346] leading-snug line-clamp-2 group-hover:text-[#154A96] transition">
                      {act.title}
                    </Text>
                    <Text className="mt-1 block text-[11px] text-slate-500 truncate">
                      {act.subtitle}
                    </Text>
                    <View className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-600 font-mono-num">
                      <Calendar className="w-3.5 h-3.5 text-[#154A96] shrink-0" />
                      <Text className="truncate">
                        {act.date} {act.timeRange}
                      </Text>
                    </View>
                    <View className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-[#154A96] shrink-0" />
                      <Text className="truncate">{act.location}</Text>
                    </View>
                  </View>
                </View>

                {/* Bottom Capacity Progress + Action Buttons */}
                <View className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <View className="flex-1 min-w-0">
                    <View className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <View className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#D08C2E]" />
                        <Text>已报名 {act.registeredCount}/{act.capacity} 人</Text>
                      </View>
                      <Text className="font-mono-num text-[#154A96] font-semibold">
                        {percent}%
                      </Text>
                    </View>
                    <View className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <View
                        className="h-full rounded-full bg-gradient-to-r from-[#1A509B] to-[#3B82F6]"
                        style={{ width: `${percent}%` }}
                      />
                    </View>
                  </View>

                  <View className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectActivity(act);
                      }}
                      className="px-3 py-1.5 rounded-full border border-blue-200 text-[#154A96] text-[11.5px] font-semibold hover:bg-blue-50 transition whitespace-nowrap"
                    >
                      查看活动
                    </button>
                    {act.status !== '已结束' && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickSignup(act);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#1953A0] to-[#113C7A] text-white text-[11.5px] font-semibold flex items-center gap-0.5 shadow-xs hover:brightness-110 transition whitespace-nowrap"
                      >
                        <Text>报名</Text>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </View>
                </View>
              </motion.div>
            );
          })}
        </View>
      </View>
    </View>
  );
};
