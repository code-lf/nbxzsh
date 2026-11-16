import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  ChevronDown,
  MapPin,
  Filter,
  Crown,
} from 'lucide-react';
import { motion } from 'motion/react';
import { View, Text, Image, Input } from '../../taro';
import { CommonHeader } from '../CommonHeader';
import { ENTERPRISES_DATA, EnterpriseItem } from '../../data/chamberData';

interface EnterprisesPageProps {
  onSelectEnterprise: (item: EnterpriseItem) => void;
  onNavigateFeatured: () => void;
}

export const EnterprisesPage: React.FC<EnterprisesPageProps> = ({
  onSelectEnterprise,
  onNavigateFeatured,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('全部');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('全部行业');
  const [sortBy, setSortBy] = useState<'default' | 'score'>('default');
  const [visibleCount, setVisibleCount] = useState(5);

  const roleTabs = [
    { key: '全部', label: '全部 (268)' },
    { key: '副会长单位', label: '副会长单位 (12)' },
    { key: '理事单位', label: '理事单位 (36)' },
    { key: '会员单位', label: '会员单位 (220)' },
  ];

  const industryTabs = [
    '全部行业',
    '制造业',
    '商贸服务',
    '数字科技',
    '建筑地产',
    '智能家电',
  ];

  const filteredEnterprises = useMemo(() => {
    return ENTERPRISES_DATA.filter((item) => {
      const matchRole =
        selectedRole === '全部' || item.roleBadge === selectedRole;
      const matchIndustry =
        selectedIndustry === '全部行业' ||
        item.industryCategory === selectedIndustry ||
        item.tags.some((t) => t.includes(selectedIndustry.slice(0, 2)));
      const kw = searchKeyword.trim().toLowerCase();
      const matchKw =
        !kw ||
        item.fullName.toLowerCase().includes(kw) ||
        item.shortName.toLowerCase().includes(kw) ||
        item.tags.some((t) => t.toLowerCase().includes(kw)) ||
        item.city.toLowerCase().includes(kw);
      return matchRole && matchIndustry && matchKw;
    }).sort((a, b) => {
      if (sortBy === 'score') {
        return (b.score || 0) - (a.score || 0);
      }
      return 0;
    });
  }, [searchKeyword, selectedRole, selectedIndustry, sortBy]);

  const displayedEnterprises = filteredEnterprises.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEnterprises.length;

  return (
    <View className="w-full pb-6 bg-[#EEF3FA]">
      {/* Hero with Embedded Search Bar */}
      <CommonHeader
        titleLines={['会员企业']}
        subtitle="会员优先 · 企业展示 · 资源共享"
        verticalPoem={['两汉文化发源地', '千年彭城']}
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
            placeholder="搜索企业名称、行业或关键词"
            className="flex-1 bg-transparent text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none min-w-0"
          />
          <button
            type="button"
            onClick={() => {}}
            className="px-5 py-1.5 rounded-full bg-[#154A96] hover:bg-[#103B79] active:scale-95 text-white text-[13px] font-medium transition shrink-0 shadow-xs"
          >
            搜索
          </button>
        </View>
      </CommonHeader>

      <View className="px-3 -mt-2 relative z-20 flex flex-col gap-3">
        {/* Role & Industry Filter Pills */}
        <View className="flex flex-col gap-2">
          <View className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {roleTabs.map((tab) => {
              const active = selectedRole === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setSelectedRole(tab.key);
                    setVisibleCount(8);
                  }}
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

          <View className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <View className="flex items-center gap-1.5">
              {industryTabs.map((ind) => {
                const active = selectedIndustry === ind;
                return (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => {
                      setSelectedIndustry(ind);
                      setVisibleCount(8);
                    }}
                    className={`px-2.5 py-1.5 rounded-full text-[11.5px] font-medium transition whitespace-nowrap shrink-0 ${
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
                setSearchKeyword('');
                setVisibleCount(5);
              }}
              className="flex items-center gap-1 px-2 py-1.5 text-[11.5px] text-slate-600 hover:text-[#154A96] shrink-0 whitespace-nowrap"
            >
              <Text>筛选</Text>
              <Filter className="w-3.5 h-3.5" />
            </button>
          </View>
        </View>

        {/* 全部会员企业 (268) Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl p-3 shadow-[0_4px_20px_rgba(15,41,82,0.04)]"
        >
          <View className="flex items-center justify-between mb-2.5 gap-2">
            <View className="flex items-center gap-1.5">
              <span className="w-1 h-4 rounded-full bg-[#154A96]" />
              <Text className="font-serif-title text-[16px] font-bold text-[#0D2346]">
                全部会员企业
              </Text>
              <Text className="text-[13px] text-slate-500 font-mono-num">
                ({filteredEnterprises.length === ENTERPRISES_DATA.length ? 268 : filteredEnterprises.length})
              </Text>
            </View>

            <View className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onNavigateFeatured}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FDF3E1] text-[#9A6418] text-[11px] font-semibold hover:brightness-95 transition whitespace-nowrap"
              >
                <Crown className="w-3 h-3 text-[#C98932]" />
                <Text>知名风采</Text>
              </button>
              <button
                type="button"
                onClick={() => setSortBy(sortBy === 'default' ? 'score' : 'default')}
                className="flex items-center gap-0.5 text-[12px] text-slate-600 hover:text-[#154A96] transition whitespace-nowrap"
              >
                <Text>{sortBy === 'default' ? '默认排序' : '综合评分'}</Text>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </View>
          </View>

          <View className="flex flex-col gap-2.5">
            {displayedEnterprises.map((ent) => (
              <div
                key={ent.id}
                onClick={() => onSelectEnterprise(ent)}
                className="p-2.5 rounded-xl border border-slate-100 bg-[#FBFDFF] hover:bg-[#F5F9FF] hover:border-blue-200 transition flex items-center gap-2.5 cursor-pointer group"
              >
                <View className="relative w-[96px] h-[64px] shrink-0">
                  <View className="w-[82px] h-[64px] rounded-lg overflow-hidden bg-slate-200">
                    <Image
                      src={ent.buildingImg}
                      alt={ent.fullName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </View>
                  <View className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-100 shadow-xs flex flex-col items-center justify-center z-10">
                    <Text
                      className={`font-extrabold leading-none ${
                        ent.logoColor === 'red'
                          ? 'text-[#D92D20] text-[11.5px] font-serif-title'
                          : 'text-[#0B3B8C] text-[8px]'
                      }`}
                    >
                      {ent.logoText}
                    </Text>
                    {ent.logoSubText && (
                      <Text className="text-[5.5px] text-[#0B3B8C] font-bold mt-0.5">
                        {ent.logoSubText}
                      </Text>
                    )}
                  </View>
                </View>

                <View className="flex-1 min-w-0 flex flex-col justify-between">
                  <View className="flex items-center justify-between gap-1.5">
                    <Text className="text-[13.5px] font-bold text-slate-900 truncate">
                      {ent.fullName}
                    </Text>
                    <span className="px-1.5 py-0.5 rounded text-[9.5px] font-medium bg-[#FDF3E1] text-[#9A6418] whitespace-nowrap shrink-0">
                      {ent.roleBadge}
                    </span>
                  </View>

                  <Text className="mt-1 block text-[11px] text-slate-500 truncate">
                    {ent.homeDesc}
                  </Text>

                  <View className="mt-1.5 flex items-center justify-between gap-1.5">
                    <View className="flex items-center gap-1 overflow-hidden">
                      {ent.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded bg-[#EBF3FE] text-[#25599C] text-[9.5px] font-medium whitespace-nowrap shrink-0"
                        >
                          {tag}
                        </span>
                      ))}
                      <View className="flex items-center gap-0.5 text-[10px] text-slate-400 whitespace-nowrap shrink-0 ml-0.5">
                        <MapPin className="w-2.5 h-2.5" />
                        <Text>{ent.city}</Text>
                      </View>
                    </View>

                    <button
                      type="button"
                      className="px-2 py-0.5 rounded-full border border-blue-200/80 bg-white text-[#154A96] text-[10.5px] font-medium flex items-center gap-0.5 group-hover:bg-[#154A96] group-hover:text-white transition whitespace-nowrap shrink-0"
                    >
                      <Text>详情</Text>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </View>
                </View>
              </div>
            ))}
          </View>

          {/* Pagination Footer */}
          <View className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center">
            {hasMore ? (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="px-5 py-1.5 rounded-full bg-[#F2F6FC] hover:bg-[#E4EEFB] text-[#154A96] text-[12px] font-semibold transition"
              >
                加载更多会员企业 ({displayedEnterprises.length}/{filteredEnterprises.length})
              </button>
            ) : (
              <Text className="text-[11.5px] text-slate-400">
                —— 已展示当前筛选全部 {filteredEnterprises.length} 家代表企业 ——
              </Text>
            )}
          </View>
        </motion.div>
      </View>
    </View>
  );
};
