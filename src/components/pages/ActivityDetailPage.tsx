import React from 'react';
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Users,
  Building2,
  CheckCircle2,
  Clock,
  Ticket,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image } from '../../taro';
import { ActivityItem } from '../../data/chamberData';

interface ActivityDetailPageProps {
  activity: ActivityItem;
  onBack: () => void;
  onSignup: (activity: ActivityItem) => void;
}

export const ActivityDetailPage: React.FC<ActivityDetailPageProps> = ({
  activity,
  onBack,
  onSignup,
}) => {
  const percent = Math.min(100, Math.round((activity.registeredCount / activity.capacity) * 100));

  return (
    <View className="w-full pb-20 bg-[#EEF3FA] min-h-screen relative">
      {/* Top Sticky Mini-Program Subpage Header */}
      <View className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-3 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-medium text-slate-700 hover:text-[#154A96] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <Text>返回</Text>
        </button>
        <Text className="font-serif-title text-[15px] font-bold text-[#0A2046] truncate max-w-[60%]">
          活动详情
        </Text>
        <View className="flex items-center bg-slate-100 rounded-full h-7 px-2.5 gap-2">
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <span className="w-[1px] h-3 bg-slate-300" />
          <span className="w-3 h-3 rounded-full border border-slate-800" />
        </View>
      </View>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-3"
      >
        {/* Hero Poster */}
        <View className="relative h-[200px] sm:h-[225px] w-full bg-slate-200 overflow-hidden">
          <Image
            src={activity.poster}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent" />
          <View className="absolute bottom-3 left-3.5 right-3.5 text-white">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold mb-1.5 ${
                activity.status === '报名中'
                  ? 'bg-[#154A96] text-white'
                  : activity.status === '即将开始'
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-600 text-white'
              }`}
            >
              {activity.status}
            </span>
            <Text className="block font-serif-title text-[18px] font-bold leading-snug">
              {activity.title}
            </Text>
            <Text className="mt-1 block text-[12px] text-blue-100/90">
              {activity.subtitle}
            </Text>
          </View>
        </View>

        <View className="px-3 flex flex-col gap-3">
          {/* Core Meta Card */}
          <View className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)] flex flex-col gap-2.5 text-[12.5px]">
            <View className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#154A96] mt-0.5 shrink-0" />
              <View>
                <Text className="text-slate-400 text-[11px] block">活动时间</Text>
                <Text className="font-semibold text-slate-800 font-mono-num">
                  {activity.date} {activity.timeRange}
                </Text>
              </View>
            </View>

            <View className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
              <MapPin className="w-4 h-4 text-[#154A96] mt-0.5 shrink-0" />
              <View className="min-w-0">
                <Text className="text-slate-400 text-[11px] block">举办地点</Text>
                <Text className="font-semibold text-slate-800 block">
                  {activity.location}
                </Text>
                <Text className="text-[11px] text-slate-500 block mt-0.5">
                  {activity.address}
                </Text>
              </View>
            </View>

            <View className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
              <Building2 className="w-4 h-4 text-[#154A96] mt-0.5 shrink-0" />
              <View>
                <Text className="text-slate-400 text-[11px] block">主办单位</Text>
                <Text className="font-semibold text-slate-800">
                  {activity.organizer}
                </Text>
              </View>
            </View>

            <View className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
              <Ticket className="w-4 h-4 text-[#C98932] mt-0.5 shrink-0" />
              <View>
                <Text className="text-slate-400 text-[11px] block">参会费用与名额</Text>
                <Text className="font-semibold text-slate-800">
                  {activity.feeText}
                </Text>
              </View>
            </View>

            {/* Registration Progress */}
            <View className="mt-1 p-3 rounded-xl bg-[#F6F9FE] border border-blue-50">
              <View className="flex items-center justify-between text-[12px] mb-1.5">
                <View className="flex items-center gap-1.5 text-[#0D2346] font-semibold">
                  <Users className="w-4 h-4 text-[#D08C2E]" />
                  <Text>当前报名进度</Text>
                </View>
                <Text className="font-mono-num font-bold text-[#154A96]">
                  {activity.registeredCount} / {activity.capacity} 人
                </Text>
              </View>
              <View className="w-full h-2 rounded-full bg-blue-100 overflow-hidden">
                <View
                  className="h-full rounded-full bg-gradient-to-r from-[#1A509B] to-[#3B82F6]"
                  style={{ width: `${percent}%` }}
                />
              </View>
            </View>
          </View>

          {/* Activity Highlights */}
          <View className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)]">
            <View className="flex items-center gap-2 mb-2.5">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[15.5px] font-bold text-[#0D2346]">
                活动亮点
              </Text>
            </View>
            <View className="flex flex-col gap-2">
              {activity.highlights.map((hl, i) => (
                <View key={i} className="flex items-start gap-2 text-[12.5px] text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#154A96] mt-0.5 shrink-0" />
                  <Text className="leading-relaxed">{hl}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Activity Agenda Timeline */}
          <View className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)]">
            <View className="flex items-center gap-2 mb-3">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[15.5px] font-bold text-[#0D2346]">
                活动议程安排
              </Text>
            </View>
            <View className="flex flex-col gap-3 pl-2 border-l border-blue-200 ml-1.5">
              {activity.agenda.map((item, idx) => (
                <View key={idx} className="relative pl-3">
                  <span className="w-2 h-2 rounded-full bg-[#154A96] absolute -left-[13px] top-1.5 ring-4 ring-white" />
                  <View className="flex items-center gap-1.5 text-[11.5px] font-mono-num font-semibold text-[#154A96]">
                    <Clock className="w-3 h-3" />
                    <Text>{item.time}</Text>
                  </View>
                  <Text className="mt-0.5 block text-[12.5px] text-slate-700 leading-snug">
                    {item.topic}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </motion.div>

      {/* Bottom Sticky Mini-Program Action Bar */}
      <View className="sticky bottom-0 left-0 right-0 z-30 mt-4 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2.5 flex items-center justify-between gap-3">
        <View>
          <Text className="text-[11px] text-slate-400 block">剩余席位</Text>
          <Text className="text-[15px] font-bold text-[#0D2346] font-mono-num">
            {Math.max(0, activity.capacity - activity.registeredCount)} 席
          </Text>
        </View>
        <button
          type="button"
          disabled={activity.status === '已结束'}
          onClick={() => onSignup(activity)}
          className={`flex-1 py-2.5 rounded-full text-[13.5px] font-semibold flex items-center justify-center gap-1 shadow-sm transition ${
            activity.status === '已结束'
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#1A509B] to-[#123D7D] text-white hover:brightness-110 active:scale-98'
          }`}
        >
          <Text>{activity.status === '已结束' ? '活动已结束' : '立即报名参会'}</Text>
          {activity.status !== '已结束' && <ChevronRight className="w-4 h-4" />}
        </button>
      </View>
    </View>
  );
};
