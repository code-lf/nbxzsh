import React from 'react';
import {
  Crown,
  ChevronRight,
  Calendar,
  Building2,
  HeartHandshake,
  UserPlus,
  Bell,
  Contact,
  FileText,
  TrendingUp,
  BookUser,
  Clock,
  Headphones,
  MessageSquareText,
  Settings,
  Network,
  BadgeDollarSign,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image } from '../../taro';
import { CommonHeader } from '../CommonHeader';
import { ASSETS, MEMBERS_DATA, MemberItem } from '../../data/chamberData';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  onSelectMember: (member: MemberItem) => void;
  onOpenModal: (modalType: 'investment' | 'assistance' | 'activity' | 'join') => void;
  onShowToast: (msg: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  onSelectMember,
  onOpenModal,
  onShowToast,
}) => {
  const quickGridItems = [
    {
      title: '我的活动',
      sub: '查看参与活动',
      icon: Calendar,
      action: () => onNavigate('activities'),
    },
    {
      title: '我的收藏企业',
      sub: '已收藏8家企业',
      icon: Building2,
      action: () => onNavigate('enterprises'),
    },
    {
      title: '我的求助',
      sub: '查看求助进度',
      icon: HeartHandshake,
      action: () => onOpenModal('assistance'),
    },
    {
      title: '入会申请',
      sub: '加入商会大家庭',
      icon: UserPlus,
      action: () => onOpenModal('join'),
    },
    {
      title: '消息通知',
      sub: '查看最新消息',
      icon: Bell,
      badge: 3,
      action: () => onNavigate('notifications'),
    },
    {
      title: '我的资料',
      sub: '编辑个人信息',
      icon: Contact,
      action: () => onSelectMember(MEMBERS_DATA[0]),
    },
  ];

  const myServices = [
    {
      title: '会员架构',
      rightText: '组织架构与班子',
      icon: Network,
      iconBg: 'bg-gradient-to-br from-[#0EA5E9] to-[#0284C7]',
      action: () => onNavigate('org'),
    },
    {
      title: '会员会费与价格',
      rightText: '会费及权益标准',
      icon: BadgeDollarSign,
      iconBg: 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]',
      action: () => onNavigate('membership-tiers'),
    },
    {
      title: '招商申请记录',
      rightText: '招商对接申请',
      icon: FileText,
      iconBg: 'bg-gradient-to-br from-[#F97316] to-[#EA580C]',
      action: () => onOpenModal('investment'),
    },
    {
      title: '帮扶进度',
      rightText: '帮扶处理进度',
      icon: TrendingUp,
      iconBg: 'bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]',
      action: () => onOpenModal('assistance'),
    },
    {
      title: '商会通讯录',
      rightText: '会员及组织名录',
      icon: BookUser,
      iconBg: 'bg-gradient-to-br from-[#2563EB] to-[#1E40AF]',
      action: () => onNavigate('directory'),
    },
    {
      title: '浏览历史',
      rightText: '近期浏览记录',
      icon: Clock,
      iconBg: 'bg-gradient-to-br from-[#22C55E] to-[#16A34A]',
      action: () => onNavigate('news'),
    },
  ];

  const systemSettings = [
    {
      title: '联系客服',
      rightText: '0574-8888 8888',
      icon: Headphones,
      action: () => onShowToast('正在为您接通宁波市徐州商会秘书处专线：0574-8888 8888'),
    },
    {
      title: '意见反馈',
      rightText: '提出您的建议',
      icon: MessageSquareText,
      action: () => onShowToast('感谢您对宁波市徐州商会的支持，意见反馈通道已打开'),
    },
    {
      title: '设置',
      rightText: '账号与隐私设置',
      icon: Settings,
      action: () => onShowToast('已进入宁波市徐州商会小程序账号安全与隐私设置'),
    },
  ];

  return (
    <View className="w-full pb-6 bg-[#EEF3FA]">
      <CommonHeader
        titleLines={['个人中心']}
        subtitle="凝聚徐商力量 · 共建甬徐未来"
        verticalPoem={['两汉文化故地', '千年彭城']}
      />

      <View className="px-3 -mt-4 relative z-20 flex flex-col gap-3">
        {/* 1. User Profile Card - Optimized spacing so tags fit on a single row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => onSelectMember(MEMBERS_DATA[0])}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.05)] flex items-center gap-3 cursor-pointer group"
        >
          <View className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border-2 border-blue-50 shadow-sm bg-slate-100">
            <Image
              src={ASSETS.avatarProfileYoung}
              alt="张建国"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </View>

          <View className="flex-1 min-w-0">
            <View className="flex items-center gap-2">
              <Text className="font-serif-title text-[18px] sm:text-[20px] font-bold text-[#0A2046]">
                张建国
              </Text>
              <span className="px-2 py-0.5 rounded-md bg-[#FDF1D6] text-[#9A6418] text-[10.5px] font-semibold flex items-center gap-1 whitespace-nowrap">
                <Crown className="w-3 h-3 text-[#D99B43] fill-[#EAB664]" />
                会员
              </span>
            </View>

            <Text className="mt-0.5 block text-[13.5px] font-medium text-[#163567] truncate">
              宁波XX实业有限公司
            </Text>

            <Text className="mt-0.5 block text-[11.5px] text-slate-500">
              董事长 &nbsp;|&nbsp; 装备制造行业
            </Text>

            <View className="mt-1.5 flex items-center gap-1.5 flex-nowrap overflow-hidden">
              {['宁波市', '制造业', '会员企业'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-[#EBF3FE] text-[#1D54A6] text-[10px] font-medium whitespace-nowrap shrink-0"
                >
                  {tag}
                </span>
              ))}
            </View>
          </View>

          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

        {/* 2. 6-Item Quick Grid Card - Vertical stack on mobile so zero titles truncate with "..." */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.04 }}
          className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-[0_4px_20px_rgba(15,41,82,0.04)] grid grid-cols-3 gap-2"
        >
          {quickGridItems.map((item) => {
            const IconComp = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                onClick={item.action}
                className="py-2.5 px-1.5 sm:p-2.5 rounded-xl bg-[#F8FBFF] hover:bg-[#EDF4FF] border border-blue-50/70 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-center sm:text-left transition active:scale-98 group"
              >
                <View className="relative w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-[#EBF3FE] text-[#154A96] flex items-center justify-center shrink-0">
                  <IconComp className="w-4 h-4" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9.5px] font-bold flex items-center justify-center shadow-2xs font-mono-num">
                      {item.badge}
                    </span>
                  )}
                </View>

                <View className="w-full min-w-0">
                  <Text className="block text-[12px] font-bold text-[#0D2346] whitespace-nowrap">
                    {item.title}
                  </Text>
                  <Text className="mt-0.5 block text-[10px] text-slate-400 whitespace-nowrap">
                    {item.sub}
                  </Text>
                </View>
              </button>
            );
          })}
        </motion.div>

        {/* 3. 我的服务 Card - Concise right hints so nothing truncates on 375px iPhone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.08 }}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)] overflow-hidden relative"
        >
          <View className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <View className="flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[16px] font-bold text-[#0D2346]">
                我的服务
              </Text>
            </View>
            <Text className="text-[11px] font-medium text-[#3B5987] tracking-wider">
              会员同行 · 资源共享
            </Text>
          </View>

          <View className="flex flex-col divide-y divide-slate-100">
            {myServices.map((srv) => {
              const IconComp = srv.icon;
              return (
                <button
                  key={srv.title}
                  type="button"
                  onClick={srv.action}
                  className="py-3 first:pt-2.5 last:pb-1 flex items-center justify-between gap-2 hover:bg-slate-50/70 rounded-lg px-1 transition text-left group"
                >
                  <View className="flex items-center gap-2.5 shrink-0">
                    <View
                      className={`w-7 h-7 rounded-lg ${srv.iconBg} text-white flex items-center justify-center shadow-2xs shrink-0`}
                    >
                      <IconComp className="w-4 h-4" />
                    </View>
                    <Text className="text-[13.5px] sm:text-[14px] font-medium text-slate-800 whitespace-nowrap">
                      {srv.title}
                    </Text>
                  </View>

                  <View className="flex items-center gap-1 text-[11.5px] text-slate-400 group-hover:text-[#154A96] transition shrink-0 whitespace-nowrap">
                    <Text>{srv.rightText}</Text>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </View>
                </button>
              );
            })}
          </View>
        </motion.div>

        {/* 4. 系统设置 Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, delay: 0.12 }}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)] overflow-hidden relative"
        >
          <View className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <View className="flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[16px] font-bold text-[#0D2346]">
                系统设置
              </Text>
            </View>
            <Text className="text-[11px] font-medium text-[#3B5987] tracking-wider">
              传承汉风 · 携手同行
            </Text>
          </View>

          <View className="flex flex-col divide-y divide-slate-100">
            {systemSettings.map((setting) => {
              const IconComp = setting.icon;
              return (
                <button
                  key={setting.title}
                  type="button"
                  onClick={setting.action}
                  className="py-3 first:pt-2.5 last:pb-1 flex items-center justify-between gap-2 hover:bg-slate-50/70 rounded-lg px-1 transition text-left group"
                >
                  <View className="flex items-center gap-2.5 shrink-0">
                    <View className="w-7 h-7 rounded-lg bg-[#EBF3FE] text-[#1D54A6] flex items-center justify-center shrink-0">
                      <IconComp className="w-4 h-4" />
                    </View>
                    <Text className="text-[13.5px] sm:text-[14px] font-medium text-slate-800 whitespace-nowrap">
                      {setting.title}
                    </Text>
                  </View>

                  <View className="flex items-center gap-1 text-[11.5px] text-slate-400 group-hover:text-[#154A96] transition font-mono-num shrink-0 whitespace-nowrap">
                    <Text>{setting.rightText}</Text>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </View>
                </button>
              );
            })}
          </View>
        </motion.div>
      </View>
    </View>
  );
};
