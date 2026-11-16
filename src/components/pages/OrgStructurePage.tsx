import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Search,
  Crown,
  User,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image, Input } from '../../taro';
import { CommonHeader } from '../CommonHeader';
import {
  ASSETS,
  MEMBERS_DATA,
  MemberItem,
} from '../../data/chamberData';

interface OrgStructurePageProps {
  onNavigate: (page: string, roleFilter?: string) => void;
  onSelectMember: (member: MemberItem) => void;
  onOpenJoinModal: () => void;
  onBack?: () => void;
}

export const OrgStructurePage: React.FC<OrgStructurePageProps> = ({
  onNavigate,
  onSelectMember,
  onOpenJoinModal,
  onBack,
}) => {
  const [activeCoreTab, setActiveCoreTab] = useState<'会长' | '副会长' | '理事'>('会长');
  const [filterMode, setFilterMode] = useState<'level' | 'industry' | 'region'>('level');
  const [searchKw, setSearchKw] = useState('');

  const president = MEMBERS_DATA[0]; // 张建国
  const vicePresidents = MEMBERS_DATA.filter((m) => m.chamberRole === '副会长'); // 李明远, 王海涛, 陈志强
  const directors = MEMBERS_DATA.filter((m) => m.chamberRole === '理事'); // 刘芳, 赵磊, 孙伟

  const featuredMember =
    activeCoreTab === '会长'
      ? president
      : activeCoreTab === '副会长'
      ? vicePresidents[0]
      : directors[0];

  return (
    <View className="w-full pb-6 bg-[#EEF3FA]">
      <CommonHeader
        titleLines={['会员架构']}
        subtitle="凝聚徐商力量 · 共建甬徐未来"
        verticalPoem={['两汉文化发源地', '千年彭城']}
        showBack={Boolean(onBack)}
        onBack={onBack}
      />

      <View className="px-3 -mt-3 relative z-20 flex flex-col gap-3">
        {/* 1. Top 4 Counters Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-3 shadow-[0_4px_20px_rgba(15,41,82,0.05)] grid grid-cols-4 divide-x divide-slate-100"
        >
          <button
            type="button"
            onClick={() => onNavigate('directory', '会长')}
            className="flex items-center justify-center gap-1 sm:gap-2 py-1 px-0.5 hover:bg-blue-50/40 rounded-lg transition"
          >
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#D99B43] fill-[#EAB664] shrink-0" />
            <View className="flex flex-col items-start">
              <Text className="text-[10.5px] sm:text-[11.5px] font-medium text-slate-600 whitespace-nowrap">会长</Text>
              <View className="flex items-baseline gap-0.5">
                <Text className="font-serif-title text-[17px] sm:text-[21px] font-bold text-[#0A2046] tabular-nums leading-none">
                  1
                </Text>
                <Text className="text-[9.5px] sm:text-[10.5px] text-slate-500">人</Text>
              </View>
            </View>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('directory', '副会长')}
            className="flex items-center justify-center gap-1 sm:gap-2 py-1 px-0.5 hover:bg-blue-50/40 rounded-lg transition"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#698BBF] fill-[#8BA9D6] shrink-0" />
            <View className="flex flex-col items-start">
              <Text className="text-[10.5px] sm:text-[11.5px] font-medium text-slate-600 whitespace-nowrap">副会长</Text>
              <View className="flex items-baseline gap-0.5">
                <Text className="font-serif-title text-[17px] sm:text-[21px] font-bold text-[#0A2046] tabular-nums leading-none">
                  12
                </Text>
                <Text className="text-[9.5px] sm:text-[10.5px] text-slate-500">人</Text>
              </View>
            </View>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('directory', '理事')}
            className="flex items-center justify-center gap-1 sm:gap-2 py-1 px-0.5 hover:bg-blue-50/40 rounded-lg transition"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#698BBF] fill-[#8BA9D6] shrink-0" />
            <View className="flex flex-col items-start">
              <Text className="text-[10.5px] sm:text-[11.5px] font-medium text-slate-600 whitespace-nowrap">理事</Text>
              <View className="flex items-baseline gap-0.5">
                <Text className="font-serif-title text-[17px] sm:text-[21px] font-bold text-[#0A2046] tabular-nums leading-none">
                  36
                </Text>
                <Text className="text-[9.5px] sm:text-[10.5px] text-slate-500">人</Text>
              </View>
            </View>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('directory', '全部')}
            className="flex items-center justify-center gap-1 sm:gap-2 py-1 px-0.5 hover:bg-blue-50/40 rounded-lg transition"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#698BBF] fill-[#8BA9D6] shrink-0" />
            <View className="flex flex-col items-start">
              <Text className="text-[10.5px] sm:text-[11.5px] font-medium text-slate-600 whitespace-nowrap">会员</Text>
              <View className="flex items-baseline gap-0.5">
                <Text className="font-serif-title text-[17px] sm:text-[21px] font-bold text-[#0A2046] tabular-nums leading-none">
                  268
                </Text>
                <Text className="text-[9.5px] sm:text-[10.5px] text-slate-500">人</Text>
              </View>
            </View>
          </button>
        </motion.div>

        {/* 2. Filter & Search Bar (Stacks cleanly on narrow mobile so search input stays full-width) */}
        <View className="flex flex-col sm:flex-row sm:items-center gap-2">
          <View className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <button
              type="button"
              onClick={() => setFilterMode('level')}
              className={`px-3 py-1.5 rounded-full text-[11.5px] sm:text-[12px] font-medium flex items-center gap-1 transition whitespace-nowrap shrink-0 ${
                filterMode === 'level'
                  ? 'bg-[#154A96] text-white shadow-xs'
                  : 'bg-white/85 text-slate-700'
              }`}
            >
              <Text>按层级</Text>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterMode('industry');
                onNavigate('directory');
              }}
              className={`px-3 py-1.5 rounded-full text-[11.5px] sm:text-[12px] font-medium flex items-center gap-1 transition whitespace-nowrap shrink-0 ${
                filterMode === 'industry'
                  ? 'bg-[#154A96] text-white shadow-xs'
                  : 'bg-white/85 text-slate-700'
              }`}
            >
              <Text>按行业</Text>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterMode('region');
                onNavigate('directory');
              }}
              className={`px-3 py-1.5 rounded-full text-[11.5px] sm:text-[12px] font-medium flex items-center gap-1 transition whitespace-nowrap shrink-0 ${
                filterMode === 'region'
                  ? 'bg-[#154A96] text-white shadow-xs'
                  : 'bg-white/85 text-slate-700'
              }`}
            >
              <Text>按地区</Text>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </View>

          <View className="flex-1 bg-white/95 rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-white min-w-0 shadow-2xs">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Input
              type="text"
              value={searchKw}
              onChange={(e) => setSearchKw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchKw.trim()) {
                  onNavigate('directory');
                }
              }}
              placeholder="搜索会员姓名、企业名称"
              className="w-full bg-transparent text-[12px] text-slate-700 placeholder:text-slate-400 focus:outline-none min-w-0"
            />
          </View>
        </View>

        {/* 3. 商会组织架构 Tree Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.04 }}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)] relative overflow-hidden"
        >
          <View className="flex items-center justify-between mb-3 relative z-10">
            <View className="flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[16px] font-bold text-[#0D2346]">
                商会组织架构
              </Text>
            </View>
            <Text className="text-[11px] text-[#4E6E9E]">
              凝聚乡情 · 精诚协作 · 共谋发展
            </Text>
          </View>

          {/* Org Tree Container */}
          <View className="relative z-10 py-2 flex flex-col items-center">
            {/* Level 1: 会长 (1人) */}
            <button
              type="button"
              onClick={() => onSelectMember(president)}
              className="w-52 py-2.5 px-4 rounded-xl bg-gradient-to-b from-white to-[#F4F8FE] border border-blue-200/80 shadow-xs flex items-center justify-center gap-2 hover:border-[#154A96] transition group"
            >
              <Crown className="w-5 h-5 text-[#D99B43] fill-[#EAB664]" />
              <Text className="text-[15px] font-bold text-[#0D2346]">会长</Text>
              <Text className="text-[12.5px] text-slate-600 font-mono-num">(1人)</Text>
              <ChevronRight className="w-4 h-4 text-slate-400 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Tree Connector Lines */}
            <View className="w-full flex flex-col items-center">
              <View className="w-[1.5px] h-4 bg-[#6388C2] relative">
                <span className="w-2 h-2 rounded-full bg-[#3A68B1] absolute -top-1 -left-[3px]" />
              </View>
              <View className="w-2/3 h-[1.5px] bg-[#6388C2] relative">
                <span className="w-2 h-2 rounded-full bg-[#3A68B1] absolute -top-[3px] left-1/2 -translate-x-1/2" />
              </View>
              <View className="w-2/3 flex justify-between">
                <View className="w-[1.5px] h-4 bg-[#6388C2] relative">
                  <span className="w-2 h-2 rounded-full bg-[#3A68B1] absolute -bottom-1 -left-[3px]" />
                </View>
                <View className="w-[1.5px] h-4 bg-[#6388C2] relative">
                  <span className="w-2 h-2 rounded-full bg-[#3A68B1] absolute -bottom-1 -left-[3px]" />
                </View>
                <View className="w-[1.5px] h-4 bg-[#6388C2] relative">
                  <span className="w-2 h-2 rounded-full bg-[#3A68B1] absolute -bottom-1 -left-[3px]" />
                </View>
              </View>
            </View>

            {/* Level 2: 3 Branches (副会长, 理事, 会员) */}
            <View className="w-full grid grid-cols-3 gap-1.5 sm:gap-2.5 mt-0.5">
              <button
                type="button"
                onClick={() => onNavigate('directory', '副会长')}
                className="py-2 px-1.5 sm:py-2.5 sm:px-2 rounded-xl bg-gradient-to-b from-white to-[#F4F8FE] border border-blue-100 shadow-2xs flex items-center justify-center gap-1 hover:border-blue-300 transition"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5A81BC] fill-[#7B9FD3] shrink-0" />
                <Text className="text-[11.5px] sm:text-[13px] font-bold text-[#0D2346] whitespace-nowrap">
                  副会长
                </Text>
                <Text className="text-[10px] sm:text-[11px] text-slate-500 font-mono-num whitespace-nowrap">
                  (12)
                </Text>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('directory', '理事')}
                className="py-2 px-1.5 sm:py-2.5 sm:px-2 rounded-xl bg-gradient-to-b from-white to-[#F4F8FE] border border-blue-100 shadow-2xs flex items-center justify-center gap-1 hover:border-blue-300 transition"
              >
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5A81BC] fill-[#7B9FD3] shrink-0" />
                <Text className="text-[11.5px] sm:text-[13px] font-bold text-[#0D2346] whitespace-nowrap">
                  理事
                </Text>
                <Text className="text-[10px] sm:text-[11px] text-slate-500 font-mono-num whitespace-nowrap">
                  (36)
                </Text>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('directory', '会员')}
                className="py-2 px-1.5 sm:py-2.5 sm:px-2 rounded-xl bg-gradient-to-b from-white to-[#F4F8FE] border border-blue-100 shadow-2xs flex items-center justify-center gap-1 hover:border-blue-300 transition"
              >
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5A81BC] fill-[#7B9FD3] shrink-0" />
                <Text className="text-[11.5px] sm:text-[13px] font-bold text-[#0D2346] whitespace-nowrap">
                  会员
                </Text>
                <Text className="text-[10px] sm:text-[11px] text-slate-500 font-mono-num whitespace-nowrap">
                  (268)
                </Text>
              </button>
            </View>
          </View>
        </motion.div>

        {/* 4. 核心会员展示 + 副会长 + 理事 Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.08 }}
          className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(15,41,82,0.04)] flex flex-col gap-4"
        >
          {/* 核心会员展示 */}
          <View>
            <View className="flex items-center gap-2 mb-3">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[16px] font-bold text-[#0D2346]">
                核心会员展示
              </Text>
            </View>

            {/* Role Tabs */}
            <View className="flex items-center gap-1.5 sm:gap-2 mb-3 overflow-x-auto no-scrollbar">
              {[
                { role: '会长' as const, label: '会长 (1)' },
                { role: '副会长' as const, label: '副会长 (12)' },
                { role: '理事' as const, label: '理事 (36)' },
              ].map((t) => {
                const active = activeCoreTab === t.role;
                return (
                  <button
                    key={t.role}
                    type="button"
                    onClick={() => setActiveCoreTab(t.role)}
                    className={`px-3.5 sm:px-5 py-1.5 rounded-full text-[11.5px] sm:text-[12px] font-medium transition whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#154A96] text-white font-semibold shadow-2xs'
                        : 'bg-[#F2F6FC] text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </View>

            {/* Featured Member Card (Stacks quote cleanly underneath bio on < sm so nothing is squeezed) */}
            <div
              onClick={() => onSelectMember(featuredMember)}
              className="p-2.5 sm:p-3 rounded-xl border border-slate-100 bg-gradient-to-r from-[#FBFDFF] to-[#F3F8FE] flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 cursor-pointer hover:border-blue-200 transition group"
            >
              <View className="flex items-center gap-2.5 flex-1 min-w-0">
                <View className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200 shadow-2xs">
                  <Image
                    src={featuredMember.avatar}
                    alt={featuredMember.name}
                    className="w-full h-full object-cover"
                  />
                </View>

                <View className="flex-1 min-w-0">
                  <View className="flex items-center gap-1.5 sm:gap-2">
                    <Text className="text-[15px] sm:text-[16px] font-bold text-slate-900 whitespace-nowrap">
                      {featuredMember.name}
                    </Text>
                    <span className="px-2 py-0.5 rounded-md bg-[#FDF1D6] text-[#9A6418] text-[10px] sm:text-[10.5px] font-semibold flex items-center gap-1 whitespace-nowrap shrink-0">
                      <Crown className="w-3 h-3 text-[#D99B43] fill-[#EAB664]" />
                      {featuredMember.chamberRole}
                    </span>
                  </View>

                  <Text className="mt-0.5 block text-[11.5px] sm:text-[12px] text-slate-600 truncate">
                    {featuredMember.company} · {featuredMember.position}
                  </Text>

                  <View className="mt-1 flex items-center gap-1.5 flex-nowrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#EBF3FE] text-[#25599C] text-[9.5px] sm:text-[10px] font-medium whitespace-nowrap">
                      {featuredMember.industry}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#EBF3FE] text-[#25599C] text-[9.5px] sm:text-[10px] font-medium whitespace-nowrap">
                      {featuredMember.city}
                    </span>
                  </View>
                </View>
              </View>

              {/* Divider + Quote (Top divider on mobile, Left divider on >= sm) */}
              <View className="flex items-center justify-between sm:justify-start gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 sm:pl-2.5 sm:border-l border-slate-200/70 sm:w-[132px] shrink-0">
                <View className="flex items-start gap-1 min-w-0">
                  <Text className="text-base sm:text-lg font-serif text-slate-300 leading-none shrink-0">
                    “
                  </Text>
                  <Text className="text-[10.5px] text-[#35527E] leading-[1.4] sm:whitespace-pre-line">
                    {featuredMember.quote.replace(/\n/g, ' ')}
                  </Text>
                </View>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </View>
            </div>
          </View>

          {/* 副会长 (部分展示) - Full-width company & tags so nothing is squeezed */}
          <View>
            <View className="flex items-center justify-between mb-2.5">
              <View className="flex items-center gap-1.5">
                <span className="w-1 h-4 rounded-full bg-[#154A96]" />
                <Text className="font-serif-title text-[15.5px] font-bold text-[#0D2346]">
                  副会长
                </Text>
                <Text className="text-[11.5px] text-slate-400">(部分展示)</Text>
              </View>
              <button
                type="button"
                onClick={() => onNavigate('directory', '副会长')}
                className="flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-[#154A96] transition"
              >
                <Text>查看更多</Text>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </View>

            <View className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {vicePresidents.map((vp) => (
                <div
                  key={vp.id}
                  onClick={() => onSelectMember(vp)}
                  className="p-1.5 sm:p-2 rounded-xl border border-slate-100 bg-[#FAFBFD] hover:border-blue-200 transition cursor-pointer flex flex-col justify-between"
                >
                  <View>
                    {/* Top Row: Portrait + Name + Role Badge */}
                    <View className="flex items-center gap-1.5">
                      <View className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                        <Image
                          src={vp.avatar}
                          alt={vp.name}
                          className="w-full h-full object-cover"
                        />
                      </View>
                      <View className="flex flex-col min-w-0">
                        <Text className="text-[12px] sm:text-[13px] font-bold text-slate-900 whitespace-nowrap truncate">
                          {vp.name}
                        </Text>
                        <span className="mt-0.5 self-start px-1 py-0.5 rounded bg-[#FDF1D6] text-[#9A6418] text-[8.5px] sm:text-[9px] font-medium flex items-center gap-0.5 whitespace-nowrap">
                          <Crown className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#D99B43] fill-[#EAB664]" />
                          副会长
                        </span>
                      </View>
                    </View>

                    {/* Full-Width Company & Position */}
                    <Text className="mt-1.5 block text-[10px] sm:text-[10.5px] font-medium text-slate-700 truncate">
                      {vp.company}
                    </Text>
                    <View className="mt-0.5 flex items-center justify-between">
                      <Text className="text-[9.5px] sm:text-[10px] text-slate-500 truncate">
                        {vp.position}
                      </Text>
                      <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400 shrink-0" />
                    </View>
                  </View>

                  <View className="mt-1.5 flex items-center gap-1 flex-nowrap overflow-hidden">
                    <span className="px-1 sm:px-1.5 py-0.5 rounded bg-[#EBF3FE] text-[#25599C] text-[8.5px] sm:text-[9.5px] whitespace-nowrap shrink-0">
                      {vp.industry}
                    </span>
                    <span className="px-1 sm:px-1.5 py-0.5 rounded bg-[#EBF3FE] text-[#25599C] text-[8.5px] sm:text-[9.5px] whitespace-nowrap shrink-0">
                      {vp.city}
                    </span>
                  </View>
                </div>
              ))}
            </View>
          </View>

          {/* 理事 (部分展示) - Full-width company & tags so nothing is squeezed */}
          <View>
            <View className="flex items-center justify-between mb-2.5">
              <View className="flex items-center gap-1.5">
                <span className="w-1 h-4 rounded-full bg-[#154A96]" />
                <Text className="font-serif-title text-[15.5px] font-bold text-[#0D2346]">
                  理事
                </Text>
                <Text className="text-[11.5px] text-slate-400">(部分展示)</Text>
              </View>
              <button
                type="button"
                onClick={() => onNavigate('directory', '理事')}
                className="flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-[#154A96] transition"
              >
                <Text>查看更多</Text>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </View>

            <View className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {directors.map((dir) => (
                <div
                  key={dir.id}
                  onClick={() => onSelectMember(dir)}
                  className="p-1.5 sm:p-2 rounded-xl border border-slate-100 bg-[#FAFBFD] hover:border-blue-200 transition cursor-pointer flex flex-col justify-between"
                >
                  <View>
                    <View className="flex items-center gap-1.5">
                      <View className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                        <Image
                          src={dir.avatar}
                          alt={dir.name}
                          className="w-full h-full object-cover"
                        />
                      </View>
                      <View className="flex flex-col min-w-0">
                        <Text className="text-[12px] sm:text-[13px] font-bold text-slate-900 whitespace-nowrap truncate">
                          {dir.name}
                        </Text>
                        <span className="mt-0.5 self-start px-1.5 py-0.5 rounded bg-[#E6F0FD] text-[#1D54A6] text-[8.5px] sm:text-[9px] font-medium whitespace-nowrap">
                          理事
                        </span>
                      </View>
                    </View>

                    <Text className="mt-1.5 block text-[10px] sm:text-[10.5px] font-medium text-slate-700 truncate">
                      {dir.company}
                    </Text>
                    <View className="mt-0.5 flex items-center justify-between">
                      <Text className="text-[9.5px] sm:text-[10px] text-slate-500 truncate">
                        {dir.position}
                      </Text>
                      <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400 shrink-0" />
                    </View>
                  </View>

                  <View className="mt-1.5 flex items-center gap-1 flex-nowrap overflow-hidden">
                    <span className="px-1 sm:px-1.5 py-0.5 rounded bg-[#EBF3FE] text-[#25599C] text-[8.5px] sm:text-[9.5px] whitespace-nowrap shrink-0">
                      {dir.industry}
                    </span>
                    <span className="px-1 sm:px-1.5 py-0.5 rounded bg-[#EBF3FE] text-[#25599C] text-[8.5px] sm:text-[9.5px] whitespace-nowrap shrink-0">
                      {dir.city}
                    </span>
                  </View>
                </div>
              ))}
            </View>
          </View>
        </motion.div>

        {/* Bottom Banner: 申请加入宁波市徐州商会 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.12 }}
          onClick={onOpenJoinModal}
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
                alt="申请加入宁波市徐州商会"
                mode="aspectFit"
                className="w-full h-full object-contain"
              />
            </View>
            <View className="flex flex-col">
              <Text className="text-[15px] font-bold text-[#0D2346]">
                申请加入宁波市徐州商会
              </Text>
              <Text className="text-[11.5px] text-[#3B5987] mt-0.5">
                传承徐商精神 · 携手同行 · 共创共赢
              </Text>
            </View>
          </View>

          <button
            type="button"
            className="relative z-10 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#1A509B] to-[#123D7D] text-white text-[12px] font-semibold flex items-center gap-1 shadow-sm group-hover:brightness-110 active:scale-95 transition whitespace-nowrap shrink-0"
          >
            <Text>我要申请入会</Text>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </View>
    </View>
  );
};
