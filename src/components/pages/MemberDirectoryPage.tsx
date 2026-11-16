import React, { useState, useMemo } from 'react';
import {
  Search,
  Crown,
  ChevronRight,
  ChevronDown,
  MapPin,
  Filter,
  Users,
  Building2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image, Input } from '../../taro';
import { CommonHeader } from '../CommonHeader';
import { MEMBERS_DATA, MemberItem } from '../../data/chamberData';

interface MemberDirectoryPageProps {
  initialRole?: string;
  onSelectMember: (member: MemberItem) => void;
  onBack?: () => void;
}

export const MemberDirectoryPage: React.FC<MemberDirectoryPageProps> = ({
  initialRole = '全部',
  onSelectMember,
  onBack,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('全部行业');
  const [selectedCity, setSelectedCity] = useState<string>('全部地区');

  const roleTabs = [
    { key: '全部', label: '全部 (268)' },
    { key: '会长', label: '会长 (1)' },
    { key: '副会长', label: '副会长 (12)' },
    { key: '理事', label: '理事 (36)' },
    { key: '会员', label: '会员 (220)' },
  ];

  const industryTabs = [
    '全部行业',
    '制造业',
    '商贸服务',
    '数字科技',
    '建筑地产',
    '智能家电',
  ];

  const cityTabs = [
    '全部地区',
    '宁波市',
    '杭州市',
    '南京市',
    '上海市',
    '北京市',
    '深圳市',
  ];

  const filteredMembers = useMemo(() => {
    return MEMBERS_DATA.filter((m) => {
      const matchRole = selectedRole === '全部' || m.chamberRole === selectedRole;
      const matchInd =
        selectedIndustry === '全部行业' ||
        m.industryFilter === selectedIndustry ||
        m.industry.includes(selectedIndustry.slice(0, 2));
      const matchCity =
        selectedCity === '全部地区' || m.city === selectedCity;
      const kw = searchKeyword.trim().toLowerCase();
      const matchKw =
        !kw ||
        m.name.toLowerCase().includes(kw) ||
        m.company.toLowerCase().includes(kw) ||
        m.position.toLowerCase().includes(kw) ||
        m.industry.toLowerCase().includes(kw);
      return matchRole && matchInd && matchCity && matchKw;
    });
  }, [searchKeyword, selectedRole, selectedIndustry, selectedCity]);

  return (
    <View className="w-full pb-6 bg-[#EEF3FA]">
      <CommonHeader
        titleLines={['会员名录']}
        subtitle="查看会员资料与全部人员"
        verticalPoem={['两汉文化发源地', '千年彭城']}
        showBack={Boolean(onBack)}
        onBack={onBack}
      >
        <View className="w-full bg-white/95 backdrop-blur-md rounded-full p-1 pl-3.5 flex items-center justify-between shadow-[0_4px_16px_rgba(15,41,82,0.08)] border border-white">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <Input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="搜索会员姓名、企业名称、职位或关键词"
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

      <View className="px-3 -mt-2 relative z-20 flex flex-col gap-2.5">
        {/* Row 1: Role Filter (Scrollable pills so counts never truncate on 375px screens) */}
        <View className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {roleTabs.map((tab) => {
            const active = selectedRole === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedRole(tab.key)}
                className={`py-1.5 px-3 rounded-full text-[11.5px] font-medium transition whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#154A96] text-white shadow-xs font-semibold'
                    : 'bg-white/85 text-slate-700 hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </View>

        {/* Row 2: Industry Filter */}
        <View className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar">
          <View className="flex items-center gap-1.5">
            {industryTabs.map((ind) => {
              const active = selectedIndustry === ind;
              return (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3 py-1.5 rounded-full text-[11.5px] font-medium transition whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#D6E6FB] text-[#154A96] font-semibold'
                      : 'bg-white/75 text-slate-600 hover:bg-white'
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </View>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('全部');
              setSelectedIndustry('全部行业');
              setSelectedCity('全部地区');
              setSearchKeyword('');
            }}
            className="flex items-center gap-1 px-2 py-1 text-[11.5px] text-slate-600 hover:text-[#154A96] shrink-0 whitespace-nowrap"
          >
            <Text>筛选</Text>
            <Filter className="w-3.5 h-3.5" />
          </button>
        </View>

        {/* Row 3: City Filter */}
        <View className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar">
          <View className="flex items-center gap-1.5">
            {cityTabs.map((city) => {
              const active = selectedCity === city;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 rounded-full text-[11.5px] font-medium transition whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#D6E6FB] text-[#154A96] font-semibold'
                      : 'bg-white/75 text-slate-600 hover:bg-white'
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </View>
          <button
            type="button"
            onClick={() => setSelectedCity('全部地区')}
            className="flex items-center gap-0.5 px-2 py-1 text-[11.5px] text-slate-600 hover:text-[#154A96] shrink-0 whitespace-nowrap"
          >
            <Text>更多</Text>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </View>

        {/* Count & Sort Header */}
        <View className="flex items-center justify-between px-1 pt-0.5 text-[12px] text-slate-600">
          <Text>
            共{' '}
            <strong className="font-semibold text-slate-800 font-mono-num">
              {filteredMembers.length === MEMBERS_DATA.length ? 268 : filteredMembers.length}
            </strong>{' '}
            位会员
          </Text>
          <button
            type="button"
            className="flex items-center gap-1 text-slate-600 hover:text-[#154A96]"
          >
            <Text>默认排序</Text>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </View>

        {/* Member Cards List - Optimized horizontal allocation */}
        <View className="flex flex-col gap-2.5">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: index * 0.03 }}
              onClick={() => onSelectMember(member)}
              className="bg-white rounded-2xl p-2.5 shadow-[0_2px_12px_rgba(15,41,82,0.04)] border border-white hover:border-blue-200 transition flex items-center gap-2.5 cursor-pointer group"
            >
              {/* Left Portrait */}
              <View className="w-[68px] h-[66px] rounded-xl overflow-hidden shrink-0 bg-slate-200">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </View>

              {/* Middle Name, Role, Company, Tags */}
              <View className="flex-1 min-w-0">
                <View className="flex items-center gap-1.5">
                  <Text className="text-[15px] font-bold text-slate-900 whitespace-nowrap">
                    {member.name}
                  </Text>
                  {member.chamberRole === '会长' ? (
                    <span className="px-1.5 py-0.5 rounded bg-[#FDF1D6] text-[#9A6418] text-[10px] font-semibold flex items-center gap-0.5 whitespace-nowrap shrink-0">
                      <Crown className="w-2.5 h-2.5 text-[#D99B43] fill-[#EAB664]" />
                      会长
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-[#E6F0FD] text-[#1D54A6] text-[10px] font-semibold whitespace-nowrap shrink-0">
                      {member.chamberRole}
                    </span>
                  )}
                </View>

                <Text className="mt-1 block text-[11.5px] text-slate-600 truncate">
                  {member.company} · {member.position}
                </Text>

                <View className="mt-1.5 flex items-center gap-1.5 flex-nowrap">
                  <span className="px-1.5 py-0.5 rounded bg-[#EDF4FE] text-[#23589C] text-[9.5px] font-medium flex items-center gap-0.5 whitespace-nowrap shrink-0">
                    {member.iconType === 'people' ? (
                      <Users className="w-2.5 h-2.5" />
                    ) : (
                      <Building2 className="w-2.5 h-2.5" />
                    )}
                    {member.industry}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#EDF4FE] text-[#23589C] text-[9.5px] font-medium flex items-center gap-0.5 whitespace-nowrap shrink-0">
                    <MapPin className="w-2.5 h-2.5" />
                    {member.city}
                  </span>
                </View>
              </View>

              {/* Right Column: Quote + Action Button */}
              <View className="flex items-center gap-2 pl-2 border-l border-slate-100 shrink-0">
                <View className="hidden sm:flex items-start gap-1 w-[112px]">
                  <Text className="text-base font-serif text-slate-300 leading-none">
                    “
                  </Text>
                  <Text className="text-[10px] text-[#3B557E] leading-[1.35] line-clamp-3">
                    {member.quote.replace(/\n/g, '')}
                  </Text>
                </View>

                <button
                  type="button"
                  className="px-2.5 py-1.5 rounded-full border border-blue-200/80 bg-[#F8FBFF] text-[#154A96] text-[10.5px] font-medium flex items-center gap-0.5 group-hover:bg-[#154A96] group-hover:text-white transition whitespace-nowrap shrink-0"
                >
                  <Text>查看资料</Text>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </View>
            </motion.div>
          ))}
        </View>
      </View>
    </View>
  );
};
