import React, { useState } from 'react';
import {
  ChevronLeft,
  Crown,
  CheckCircle2,
  Bell,
  Calendar,
  Megaphone,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text } from '../../taro';
import {
  MEMBERSHIP_TIERS_DATA,
  NOTIFICATIONS_DATA,
  NotificationItem,
} from '../../data/chamberData';

interface MembershipTiersPageProps {
  onBack: () => void;
  onApplyJoin: () => void;
}

export const MembershipTiersPage: React.FC<MembershipTiersPageProps> = ({
  onBack,
  onApplyJoin,
}) => {
  return (
    <View className="w-full pb-8 bg-[#EEF3FA] min-h-screen">
      {/* Top Sticky Subpage Header */}
      <View className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-3 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-medium text-slate-700 hover:text-[#154A96] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <Text>返回</Text>
        </button>
        <Text className="font-serif-title text-[15px] font-bold text-[#0A2046]">
          会员等级与会费标准
        </Text>
        <View className="flex items-center bg-slate-100 rounded-full h-7 px-2.5 gap-2">
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <span className="w-[1px] h-3 bg-slate-300" />
          <span className="w-3 h-3 rounded-full border border-slate-800" />
        </View>
      </View>

      <View className="p-3 flex flex-col gap-3">
        {/* Top Summary Card */}
        <View className="rounded-2xl bg-gradient-to-br from-[#154A96] to-[#0B2B5C] p-4 text-white shadow-sm">
          <View className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#FBBF24] fill-[#FBBF24]" />
            <Text className="font-serif-title text-[16px] font-bold">
              宁波市徐州商会会员权益及年度会费体系
            </Text>
          </View>
          <Text className="mt-1.5 block text-[12px] text-blue-100/90 leading-relaxed">
            会费取之于会员、用之于会员，全面保障商会产业对接、政企协同、法律维权及公益帮扶服务高效运行。
          </Text>
        </View>

        {/* Tiers List */}
        {MEMBERSHIP_TIERS_DATA.map((tier, idx) => {
          const isGold = tier.badgeColor === 'gold';
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: idx * 0.04 }}
              className={`rounded-2xl p-4 bg-white shadow-[0_4px_20px_rgba(15,41,82,0.04)] border ${
                isGold ? 'border-[#F3D8A4]' : 'border-white'
              }`}
            >
              <View className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <View>
                  <View className="flex items-center gap-2">
                    <Text className="font-serif-title text-[16.5px] font-bold text-[#0A2046]">
                      {tier.roleTitle}
                    </Text>
                    <span
                      className={`px-2 py-0.5 rounded text-[10.5px] font-semibold ${
                        isGold
                          ? 'bg-[#FDF1D6] text-[#9A6418]'
                          : 'bg-[#EBF3FE] text-[#1D54A6]'
                      }`}
                    >
                      {tier.quotaText}
                    </span>
                  </View>
                  <Text className="mt-1 block text-[11.5px] text-slate-500">
                    {tier.targetAudience}
                  </Text>
                </View>

                <View className="text-right shrink-0">
                  <Text className="font-mono-num text-[18px] font-extrabold text-[#154A96] block leading-none">
                    {tier.annualFee}
                  </Text>
                  <Text className="text-[10.5px] text-slate-400 mt-1 block">/ 每年</Text>
                </View>
              </View>

              <View className="mt-3 flex flex-col gap-2">
                {tier.benefits.map((b, i) => (
                  <View key={i} className="flex items-start gap-2 text-[12px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#154A96] mt-0.5 shrink-0" />
                    <Text className="leading-snug">{b}</Text>
                  </View>
                ))}
              </View>

              <button
                type="button"
                onClick={onApplyJoin}
                className="mt-3.5 w-full py-2 rounded-xl bg-[#F4F8FF] hover:bg-[#154A96] text-[#154A96] hover:text-white border border-blue-200/80 text-[12.5px] font-semibold transition flex items-center justify-center gap-1"
              >
                <Text>申请成为{tier.roleTitle}</Text>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </View>
    </View>
  );
};

interface NotificationsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  onBack,
  onNavigate,
}) => {
  const [items, setItems] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((it) => ({ ...it, unread: false })));
  };

  return (
    <View className="w-full pb-8 bg-[#EEF3FA] min-h-screen">
      {/* Top Sticky Header */}
      <View className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-3 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-medium text-slate-700 hover:text-[#154A96] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <Text>返回</Text>
        </button>
        <Text className="font-serif-title text-[15px] font-bold text-[#0A2046]">
          消息通知
        </Text>
        <button
          type="button"
          onClick={handleMarkAllRead}
          className="text-[12px] font-medium text-[#154A96] hover:underline"
        >
          全部已读
        </button>
      </View>

      <View className="p-3 flex flex-col gap-2.5">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.16, delay: idx * 0.04 }}
            onClick={() => {
              setItems((prev) =>
                prev.map((x) => (x.id === item.id ? { ...x, unread: false } : x))
              );
              if (item.type === '活动通知') {
                onNavigate('activities');
              } else if (item.id === 'notif-2') {
                onNavigate('membership-tiers');
              } else {
                onNavigate('news');
              }
            }}
            className="bg-white rounded-2xl p-3.5 shadow-[0_2px_12px_rgba(15,41,82,0.04)] border border-white hover:border-blue-200 transition cursor-pointer flex items-start gap-3"
          >
            <View
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative ${
                item.type === '活动通知'
                  ? 'bg-[#EBF3FE] text-[#154A96]'
                  : item.type === '商会公告'
                  ? 'bg-[#FDF3E1] text-[#C98932]'
                  : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              {item.type === '活动通知' ? (
                <Calendar className="w-5 h-5" />
              ) : item.type === '商会公告' ? (
                <Megaphone className="w-5 h-5" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {item.unread && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#EF4444] ring-2 ring-white" />
              )}
            </View>

            <View className="flex-1 min-w-0">
              <View className="flex items-center justify-between gap-2">
                <Text className="text-[13.5px] font-bold text-[#0D2346] truncate">
                  {item.title}
                </Text>
                <Text className="text-[10.5px] text-slate-400 whitespace-nowrap shrink-0">
                  {item.time}
                </Text>
              </View>
              <Text className="mt-1 block text-[12px] text-slate-500 leading-relaxed">
                {item.content}
              </Text>
              <View className="mt-2 flex items-center justify-between text-[11px] text-[#154A96] font-medium">
                <span className="px-2 py-0.5 rounded bg-[#F2F6FC] text-slate-600 text-[10px]">
                  {item.type}
                </span>
                <View className="flex items-center gap-0.5">
                  <Bell className="w-3 h-3" />
                  <Text>点击查看详情</Text>
                  <ChevronRight className="w-3 h-3" />
                </View>
              </View>
            </View>
          </motion.div>
        ))}
      </View>
    </View>
  );
};
