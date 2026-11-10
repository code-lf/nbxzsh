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
          className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_4px_20px_rgba(15,41,82,0.05)] grid grid-cols-4 divide-x divide-slate-100"
        >
          <button
            type="button"
            onClick={() => onNavigate('directory', '会长')}
            className="flex items-center justify-center gap-2 py-1 px-1 hover:bg-blue-50/40 rounded-lg transition"
          >
            <Crown className="w-5 h-5 text-[#D99B43] fill-[#EAB664] shrink-0" />
            <View className="flex flex-col items-start">
              <Text className="text-[11.5px] font-medium text-slate-600">会长</Text>
              <View className="flex items-baseline gap-0.5">
                <Text className="font-serif-title text-[21px] font-bold text-[#0A2046] tabular-nums leading-none">
                  1
                </Text>
                <Text className="text-[10.5px] text-slate-500">人</Text>
              </View>
            </View>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('directory', '副会长')}
            className="flex items-center justify-center gap-2 py-1 px-1 hover:bg-blue-50/40 rounded-lg transition"
          >
            <User className="w-5 h-5 text-[#698BBF] fill-[#8BA9D6] shrink-0" />
            <View className="flex flex-col items-start">
              <Text className="text-[11.5px] font-medium text-slate-600">副会长</Text>
              <View className="flex items-baseline gap-0.5">
                <Text className="font-serif-title text-[21px] font-bold text-[#0A2046] tabular-nums leading-none">
                  12
                </Text>
                <Text className="text-[10.5px] text-slate-500">人</Text>
              </View>
            </View>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('directory', '理事')}
            className="flex items-center justify-center gap-2 py-1 px-1 hover:bg-blue-50/40 rounded-lg transition"
          >
            <Users className="w-5 h-5 text-[#698BBF] fill-[#8BA9D6] shrink-0" />
            <View className="flex flex-col items-start">
              <Text className="text-[11.5px] font-medium text-slate-600">理事</Text>
              <View className="flex items-baseline gap-0.5">
                <Text className="font-serif-title text-[21px] font-bold text-[#0A2046] tabular-nums leading-none">
                  36
                </Text>
                <Text className="text-[10.5px] text-slate-500">人</Text>
              </View>
            </View>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('directory', '全部')}
            className="flex items-center justify-center gap-2 py-1 px-1 hover:bg-blue-50/40 rounded-lg transition"
          >
            <Users className="w-5 h-5 text-[#698BBF] fill-[#8BA9D6] shrink-0" />
            <View className="flex flex-col items-start">
              <Text className="text-[11.5px] font-medium text-slate-600">会员</Text>
              <View className="flex items-baseline gap-0.5">
                <Text className="font-serif-title text-[21px] font-bold text-[#0A2046] tabular-nums leading-none">
                  268
                </Text>
                <Text className="text-[10.5px] text-slate-500">人</Text>
              </View>
            </View>
          </button>
        </motion.div>

        {/* 2. Filter & Search Bar */}
        <View className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterMode('level')}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center gap-1 transition whitespace-nowrap ${
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
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center gap-1 transition whitespace-nowrap ${
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
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center gap-1 transition whitespace-nowrap ${
              filterMode === 'region'
                ? 'bg-[#154A96] text-white shadow-xs'
                : 'bg-white/85 text-slate-700'
            }`}
          >
            <Text>按地区</Text>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <View className="flex-1 bg-white/90 rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-white min-w-0">
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
              className="w-full bg-transparent text-[11.5px] text-slate-700 placeholder:text-slate-400 focus:outline-none min-w-0"
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
            <View className="w-full grid grid-cols-3 gap-2.5 mt-0.5">
              <button
                type="button"
                onClick={() => onNavigate('directory', '副会长')}
                className="py-2.5 px-2 rounded-xl bg-gradient-to-b from-white to-[#F4F8FE] border border-blue-100 shadow-2xs flex items-center justify-center gap-1.5 hover:border-blue-300 transition"
              >
                <User className="w-4 h-4 text-[#5A81BC] fill-[#7B9FD3] shrink-0" />
                <Text className="text-[13px] font-bold text-[#0D2346] whitespace-nowrap">
                  副会长
                </Text>
                <Text className="text-[11px] text-slate-500 font-mono-num whitespace-nowrap">
                  (12人)
                </Text>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('directory', '理事')}
                className="py-2.5 px-2 rounded-xl bg-gradient-to-b from-white to-[#F4F8FE] border border-blue-100 shadow-2xs flex items-center justify-center gap-1.5 hover:border-blue-300 transition"
              >
                <Users className="w-4 h-4 text-[#5A81BC] fill-[#7B9FD3] shrink-0" />
                <Text className="text-[13px] font-bold text-[#0D2346] whitespace-nowrap">
                  理事
                </Text>
                <Text className="text-[11px] text-slate-500 font-mono-num whitespace-nowrap">
                  (36人)
                </Text>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('directory', '会员')}
                className="py-2.5 px-2 rounded-xl bg-gradient-to-b from-white to-[#F4F8FE] border border-blue-100 shadow-2xs flex items-center justify-center gap-1.5 hover:border-blue-300 transition"
              >
                <Users className="w-4 h-4 text-[#5A81BC] fill-[#7B9FD3] shrink-0" />
                <Text className="text-[13px] font-bold text-[#0D2346] whitespace-nowrap">
                  会员
                </Text>
                <Text className="text-[11px] text-slate-500 font-mono-num whitespace-nowrap">
                  (268人)
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
            <View className="flex items-center gap-2 mb-3">
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
                    className={`px-5 py-1.5 rounded-full text-[12px] font-medium transition ${
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

            {/* Featured Member Card (张建国 会长) */}
            <div
              onClick={() => onSelectMember(featuredMember)}
              className="p-3 rounded-xl border border-slate-100 bg-gradient-to-r from-[#FBFDFF] to-[#F3F8FE] flex items-center gap-3 cursor-pointer hover:border-blue-200 transition group"
            >
              <View className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-200 shadow-2xs">
                <Image
                  src={featuredMember.avatar}
                  alt={featuredMember.name}
                  className="w-full h-full object-cover"
                />
              </View>

              <View className="flex-1 min-w-0">
                <View className="flex items-center gap-2">
                  <Text className="text-[17px] font-bold text-slate-900">
                    {featuredMember.name}
                  </Text>
                  <span className="px-2 py-0.5 rounded-md bg-[#FDF1D6] text-[#9A6418] text-[11px] font-semibold flex items-center gap-1">
                    <Crown className="w-3 h-3 text-[#D99B43] fill-[#EAB664]" />
                    {featuredMember.chamberRole}
                  </span>
                </View>

                <Text className="mt-1.5 block text-[12.5px] text-slate-600 truncate">
                  {featuredMember.company} &nbsp; {featuredMember.position}
                </Text>

                <View className="mt-2 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3FE] text-[#25599C] text-[10.5px] font-medium">
                    {featuredMember.industry}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3FE] text-[#25599C] text-[10.5px] font-medium">
                    {featuredMember.city}
                  </span>
                </View>
              </View>

              {/* Vertical Divider + Quote */}
              <View className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200/70 max-w-[180px]">
                <Text className="text-2xl font-serif text-slate-300 leading-none self-start">
                  “
                </Text>
                <Text className="text-[11.5px] text-[#35527E] leading-[1.45] whitespace-pre-line">
                  {featuredMember.quote}
                </Text>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </View>
            </div>
          </View>

          {/* 副会长 (部分展示) */}
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

            <View className="grid grid-cols-3 gap-2">
              {vicePresidents.map((vp) => (
                <div
                  key={vp.id}
                  onClick={() => onSelectMember(vp)}
                  className="p-2 rounded-xl border border-slate-100 bg-[#FAFBFD] hover:border-blue-200 transition cursor-pointer flex flex-col justify-between"
                >
                  <View className="flex items-start gap-2">
                    <View className="w-11 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                      <Image
                        src={vp.avatar}
                        alt={vp.name}
                        className="w-full h-full object-cover"
                      />
                    </View>
                    <View className="flex-1 min-w-0">
                      <View className="flex items-center gap-1 flex-wrap">
                        <Text className="text-[13px] font-bold text-slate-900">
                          {vp.name}
                        </Text>
                        <span className="px-1 py-0.5 rounded bg-[#FDF1D6] text-[#9A6418] text-[9px] font-medium flex items-center gap-0.5">
                          <Crown className="w-2.5 h-2.5 text-[#D99B43] fill-[#EAB664]" />
                          副会长
                        </span>
                      </View>
                      <Text className="mt-1 block text-[10px] text-slate-500 truncate">
                        {vp.company}
                      </Text>
                      <View className="flex items-center justify-between">
                        <Text className="text-[10px] text-slate-500 truncate">
                          {vp.position}
                        </Text>
                        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                      </View>
                    </View>
                  </View>

                  <View className="mt-2 flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-[#EBF3FE] text-[#25599C] text-[9.5px]">
                      {vp.industry}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#EBF3FE] text-[#25599C] text-[9.5px]">
                      {vp.city}
                    </span>
                  </View>
                </div>
              ))}
            </View>
          </View>

          {/* 理事 (部分展示) */}
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

            <View className="grid grid-cols-3 gap-2">
              {directors.map((dir) => (
                <div
                  key={dir.id}
                  onClick={() => onSelectMember(dir)}
                  className="p-2 rounded-xl border border-slate-100 bg-[#FAFBFD] hover:border-blue-200 transition cursor-pointer flex flex-col justify-between"
                >
                  <View className="flex items-start gap-2">
                    <View className="w-11 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                      <Image
                        src={dir.avatar}
                        alt={dir.name}
                        className="w-full h-full object-cover"
                      />
                    </View>
                    <View className="flex-1 min-w-0">
                      <View className="flex items-center gap-1 flex-wrap">
                        <Text className="text-[13px] font-bold text-slate-900">
                          {dir.name}
                        </Text>
                        <span className="px-1.5 py-0.5 rounded bg-[#E6F0FD] text-[#1D54A6] text-[9px] font-medium">
                          理事
                        </span>
                      </View>
                      <Text className="mt-1 block text-[10px] text-slate-500 truncate">
                        {dir.company}
                      </Text>
                      <View className="flex items-center justify-between">
                        <Text className="text-[10px] text-slate-500 truncate">
                          {dir.position}
                        </Text>
                        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                      </View>
                    </View>
                  </View>

                  <View className="mt-2 flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-[#EBF3FE] text-[#25599C] text-[9.5px]">
                      {dir.industry}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#EBF3FE] text-[#25599C] text-[9.5px]">
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
