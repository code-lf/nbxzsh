/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Home,
  Building2,
  Newspaper,
  User,
  Monitor,
  Smartphone,
  Wifi,
  Columns,
  Code2,
  CheckCircle2,
  Network,
  Users,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { View, Text, Image } from './taro';
import {
  ASSETS,
  EnterpriseItem,
  MemberItem,
  NewsArticleItem,
} from './data/chamberData';
import { SkeletonScreen } from './components/SkeletonViews';
import { HomePage } from './components/pages/HomePage';
import { EnterprisesPage } from './components/pages/EnterprisesPage';
import { OrgStructurePage } from './components/pages/OrgStructurePage';
import { MemberDirectoryPage } from './components/pages/MemberDirectoryPage';
import { NewsPage } from './components/pages/NewsPage';
import { PartyBuildingPage } from './components/pages/PartyBuildingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { BigScreenDashboard } from './components/pages/BigScreenDashboard';
import {
  EnterpriseDetailModal,
  MemberDetailModal,
  ArticleDetailModal,
  ActionFormModal,
} from './components/InteractiveModals';

export type MiniProgramPageKey =
  | 'home'
  | 'enterprises'
  | 'org'
  | 'directory'
  | 'news'
  | 'party'
  | 'profile';

export type ViewportDisplayMode = 'responsive-mp' | 'bigscreen' | 'dual';

export default function App() {
  // Active Mini-Program page
  const [activePage, setActivePage] = useState<MiniProgramPageKey>('home');
  const [directoryRoleFilter, setDirectoryRoleFilter] = useState<string>('全部');
  const [partySubView, setPartySubView] = useState<'home' | 'topic' | 'detail'>('topic');

  // Viewport mode: Mini-Program Responsive | PC Big Screen | Dual-Screen Sync
  const [displayMode, setDisplayMode] = useState<ViewportDisplayMode>('responsive-mp');
  // Mobile container width option on desktop ('mobile-frame' 430px vs 'fluid-responsive' full responsive container)
  const [mpFrameStyle, setMpFrameStyle] = useState<'mobile-frame' | 'fluid-responsive'>('mobile-frame');

  // Skeleton loading state for weak network simulation & page transitions
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState<boolean>(false);
  const [weakNetMode, setWeakNetMode] = useState<boolean>(false);

  // Interactive Modals State
  const [selectedEnterprise, setSelectedEnterprise] = useState<EnterpriseItem | null>(null);
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticleItem | null>(null);
  const [activeFormModal, setActiveFormModal] = useState<
    'investment' | 'assistance' | 'activity' | 'join' | 'taro-code' | null
  >(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // Navigate between Mini-Program pages with optional skeleton feedback when Weak Network is active
  const handleNavigatePage = useCallback(
    (targetPage: string, subParam?: string) => {
      const pageKey = targetPage as MiniProgramPageKey;
      if (pageKey === 'directory' && subParam) {
        setDirectoryRoleFilter(subParam);
      } else if (pageKey === 'directory') {
        setDirectoryRoleFilter('全部');
      }

      if (pageKey === 'party' && subParam) {
        setPartySubView(subParam as 'home' | 'topic' | 'detail');
      }

      if (weakNetMode) {
        setIsLoadingSkeleton(true);
        setTimeout(() => {
          setActivePage(pageKey);
          setIsLoadingSkeleton(false);
        }, 650);
      } else {
        setActivePage(pageKey);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [weakNetMode]
  );

  // Trigger weak network skeleton demonstration
  const handleToggleSkeletonDemo = () => {
    if (!isLoadingSkeleton) {
      setWeakNetMode(true);
      setIsLoadingSkeleton(true);
    } else {
      setIsLoadingSkeleton(false);
      setWeakNetMode(false);
    }
  };

  // Bottom 4 Tab Bar Items matching the WeChat Mini-Program UI mockups
  const bottomTabs: {
    key: MiniProgramPageKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { key: 'home', label: '首页', icon: Home },
    { key: 'enterprises', label: '会员企业', icon: Building2 },
    { key: 'news', label: '商会资讯', icon: Newspaper },
    { key: 'profile', label: '个人中心', icon: User },
  ];

  // All 7 Mini-Program Pages for quick jump bar
  const allPagesNav: {
    key: MiniProgramPageKey;
    label: string;
    badge?: string;
  }[] = [
    { key: 'home', label: '1. 商会首页' },
    { key: 'enterprises', label: '2. 会员企业' },
    { key: 'org', label: '3. 会员架构' },
    { key: 'directory', label: '4. 会员名录' },
    { key: 'news', label: '5. 商会资讯' },
    { key: 'party', label: '6. 党建专题(含3子页)' },
    { key: 'profile', label: '7. 个人中心' },
  ];

  // Render active Mini-Program Page content
  const renderMiniProgramContent = () => {
    if (isLoadingSkeleton) {
      return (
        <SkeletonScreen
          pageType={activePage}
          weakNetworkSimulated={weakNetMode}
        />
      );
    }

    switch (activePage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigatePage}
            onSelectEnterprise={setSelectedEnterprise}
            onSelectArticle={setSelectedArticle}
            onOpenModal={setActiveFormModal}
          />
        );
      case 'enterprises':
        return <EnterprisesPage onSelectEnterprise={setSelectedEnterprise} />;
      case 'org':
        return (
          <OrgStructurePage
            onNavigate={handleNavigatePage}
            onSelectMember={setSelectedMember}
            onOpenJoinModal={() => setActiveFormModal('join')}
            onBack={() => handleNavigatePage('home')}
          />
        );
      case 'directory':
        return (
          <MemberDirectoryPage
            initialRole={directoryRoleFilter}
            onSelectMember={setSelectedMember}
            onBack={() => handleNavigatePage('org')}
          />
        );
      case 'news':
        return (
          <NewsPage
            onSelectArticle={setSelectedArticle}
            onNavigateParty={(sub) => {
              handleNavigatePage('party', sub || 'topic');
            }}
            onOpenActivityModal={() => setActiveFormModal('activity')}
          />
        );
      case 'party':
        return (
          <PartyBuildingPage
            initialSubView={partySubView}
            onBackToMain={() => handleNavigatePage('news')}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            onNavigate={handleNavigatePage}
            onSelectMember={setSelectedMember}
            onOpenModal={setActiveFormModal}
            onShowToast={showToast}
          />
        );
      default:
        return null;
    }
  };

  // Determine which bottom tab is highlighted
  const activeBottomTabKey: MiniProgramPageKey =
    activePage === 'org' || activePage === 'directory'
      ? 'enterprises'
      : activePage === 'party'
      ? 'news'
      : activePage;

  return (
    <View className="min-h-screen bg-[#E4ECF7] text-slate-800 flex flex-col">
      {/* Top Cross-Platform & Responsive Switcher Bar */}
      <header className="sticky top-0 z-40 bg-[#0A224E]/95 backdrop-blur-md text-white border-b border-white/10 px-3 lg:px-6 py-2 shadow-sm">
        <View className="max-w-[1680px] mx-auto flex items-center justify-between gap-3 flex-wrap">
          {/* Brand Lockup */}
          <View className="flex items-center gap-2.5 shrink-0">
            <Image
              src={ASSETS.logoEmblem}
              alt="宁波市徐州商会"
              className="w-7 h-7 rounded-full bg-white p-0.5"
            />
            <Text className="font-serif-title text-[15px] sm:text-[16px] font-bold tracking-wider text-white whitespace-nowrap">
              宁波市徐州商会
            </Text>
            <span className="hidden md:inline-block px-2 py-0.5 rounded bg-blue-500/20 border border-blue-400/30 text-[10.5px] text-blue-200">
              React + Taro 跨端响应式架构
            </span>
          </View>

          {/* Center: Mode Switcher (微信小程序端 | PC数据大屏 | 双端同屏预览) */}
          <View className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setDisplayMode('responsive-mp')}
              className={`px-3 py-1 rounded-lg text-[12px] font-medium flex items-center gap-1.5 transition whitespace-nowrap ${
                displayMode === 'responsive-mp'
                  ? 'bg-white text-[#0A224E] font-bold shadow-2xs'
                  : 'text-blue-100 hover:bg-white/10'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <Text>微信小程序端 (7页)</Text>
            </button>

            <button
              type="button"
              onClick={() => setDisplayMode('bigscreen')}
              className={`px-3 py-1 rounded-lg text-[12px] font-medium flex items-center gap-1.5 transition whitespace-nowrap ${
                displayMode === 'bigscreen'
                  ? 'bg-white text-[#0A224E] font-bold shadow-2xs'
                  : 'text-blue-100 hover:bg-white/10'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <Text>PC端数据大屏</Text>
            </button>

            <button
              type="button"
              onClick={() => setDisplayMode('dual')}
              className={`hidden xl:flex px-3 py-1 rounded-lg text-[12px] font-medium items-center gap-1.5 transition whitespace-nowrap ${
                displayMode === 'dual'
                  ? 'bg-white text-[#0A224E] font-bold shadow-2xs'
                  : 'text-blue-100 hover:bg-white/10'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <Text>双端同屏联动</Text>
            </button>
          </View>

          {/* Right Controls: Weak Network Skeleton Toggle + Viewport Width Toggle + Taro Config */}
          <View className="flex items-center gap-2 shrink-0">
            {displayMode === 'responsive-mp' && (
              <button
                type="button"
                onClick={() =>
                  setMpFrameStyle(
                    mpFrameStyle === 'mobile-frame'
                      ? 'fluid-responsive'
                      : 'mobile-frame'
                  )
                }
                className="hidden md:flex px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11.5px] text-blue-100 items-center gap-1 transition whitespace-nowrap"
              >
                <Text>
                  {mpFrameStyle === 'mobile-frame'
                    ? '视口: 手机标准版 (430px)'
                    : '视口: 宽屏自适应展开'}
                </Text>
              </button>
            )}

            <button
              type="button"
              onClick={handleToggleSkeletonDemo}
              className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium flex items-center gap-1.5 transition whitespace-nowrap ${
                isLoadingSkeleton
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-white/10 text-blue-100 hover:bg-white/20'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              <Text>{isLoadingSkeleton ? '关闭骨架屏演示' : '弱网骨架屏状态'}</Text>
            </button>

            <button
              type="button"
              onClick={() => setActiveFormModal('taro-code')}
              className="hidden sm:flex px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11.5px] text-blue-100 items-center gap-1 transition whitespace-nowrap"
            >
              <Code2 className="w-3.5 h-3.5" />
              <Text>Taro配置</Text>
            </button>
          </View>
        </View>

        {/* Sub-Bar: Direct 1-Click Page Switcher for all 8 Uploaded UI Mockup Pages */}
        {displayMode !== 'bigscreen' && (
          <View className="max-w-[1680px] mx-auto pt-2 mt-2 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <Text className="text-[11px] text-blue-200/80 mr-1 shrink-0">
              小程序设计图页面直达:
            </Text>
            {allPagesNav.map((p) => {
              const active = activePage === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => handleNavigatePage(p.key)}
                  className={`px-2.5 py-1 rounded-md text-[11.5px] font-medium transition whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#2563EB] text-white font-semibold shadow-2xs'
                      : 'bg-white/5 text-blue-100 hover:bg-white/15'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </View>
        )}
      </header>

      {/* Main Viewport Area */}
      <main className="flex-1 w-full">
        {/* MODE A: PC Big Screen Dashboard */}
        {displayMode === 'bigscreen' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="bigscreen-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isLoadingSkeleton ? (
                <SkeletonScreen
                  pageType="bigscreen"
                  weakNetworkSimulated={weakNetMode}
                />
              ) : (
                <BigScreenDashboard
                  onSwitchToMiniProgramPage={(page, subParam) => {
                    setDisplayMode('responsive-mp');
                    handleNavigatePage(page, subParam);
                  }}
                  onSelectEnterprise={setSelectedEnterprise}
                  onSelectArticle={setSelectedArticle}
                  onOpenModal={setActiveFormModal}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* MODE B: Responsive Mini-Program View */}
        {displayMode === 'responsive-mp' && (
          <View className="max-w-[1440px] mx-auto py-0 md:py-5 px-0 md:px-4 flex items-start justify-center gap-6">
            {/* Mini-Program Viewport Container */}
            <View
              className={`w-full ${
                mpFrameStyle === 'mobile-frame'
                  ? 'md:max-w-[440px]'
                  : 'md:max-w-[860px]'
              } bg-[#EEF3FA] md:rounded-[34px] md:shadow-[0_16px_48px_rgba(10,34,78,0.16)] md:border-[6px] md:border-white overflow-hidden relative transition-all duration-300`}
            >
              {/* Page Body */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activePage}-${isLoadingSkeleton}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="min-h-[780px]"
                >
                  {renderMiniProgramContent()}
                </motion.div>
              </AnimatePresence>

              {/* Sticky Bottom WeChat Mini-Program TabBar */}
              <nav className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 pt-1.5 pb-2">
                <View className="grid grid-cols-4 items-center">
                  {bottomTabs.map((tab) => {
                    const IconComp = tab.icon;
                    const isSelected = activeBottomTabKey === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => handleNavigatePage(tab.key)}
                        className="flex flex-col items-center justify-center py-1 transition active:scale-95"
                      >
                        <View
                          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#154A96] text-white shadow-2xs'
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <IconComp className="w-4 h-4" />
                        </View>
                        <Text
                          className={`text-[11px] mt-0.5 tracking-tight ${
                            isSelected
                              ? 'text-[#154A96] font-bold'
                              : 'text-slate-500 font-medium'
                          }`}
                        >
                          {tab.label}
                        </Text>
                      </button>
                    );
                  })}
                </View>
                {/* Home Indicator Bar */}
                <View className="w-28 h-1 bg-slate-300/90 rounded-full mx-auto mt-1.5" />
              </nav>
            </View>

            {/* Right Desktop Companion Panel (Visible on Large Screens when in 430px Mobile Frame Mode) */}
            {mpFrameStyle === 'mobile-frame' && (
              <aside className="hidden lg:flex flex-col gap-4 w-[360px] shrink-0 sticky top-24">
                {/* Chamber Overview & Quick Screen Switcher Card */}
                <View className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgba(15,41,82,0.06)] border border-white">
                  <View className="flex items-center gap-3 pb-3.5 border-b border-slate-100">
                    <Image
                      src={ASSETS.logoEmblem}
                      alt="宁波市徐州商会"
                      className="w-11 h-11 rounded-full bg-slate-50 p-0.5"
                    />
                    <View>
                      <Text className="font-serif-title text-[17px] font-bold text-[#0A2046] block">
                        宁波市徐州商会
                      </Text>
                      <Text className="text-[11px] text-slate-400 block">
                        Taro 微信小程序 + PC 数据大屏
                      </Text>
                    </View>
                  </View>

                  <Text className="mt-3.5 mb-2 block text-[12px] font-bold text-slate-700">
                    全部设计图页面导航 (点击切换)
                  </Text>

                  <View className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'home', title: '商会首页', sub: '6大金刚区+架构', icon: Home },
                      { key: 'enterprises', title: '会员企业', sub: '268家企业名录', icon: Building2 },
                      { key: 'org', title: '会员架构', sub: '组织架构树状图', icon: Network },
                      { key: 'directory', title: '会员名录', sub: '全体人员与寄语', icon: Users },
                      { key: 'news', title: '商会资讯', sub: '焦点+活动预告', icon: Newspaper },
                      { key: 'party', title: '党建专题', sub: '含3张红色子页面', icon: Flame },
                      { key: 'profile', title: '个人中心', sub: '会员服务与设置', icon: User },
                    ].map((item) => {
                      const IconComp = item.icon;
                      const isCurr = activePage === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => handleNavigatePage(item.key)}
                          className={`p-2.5 rounded-xl border text-left transition flex items-start gap-2 ${
                            isCurr
                              ? 'bg-[#EEF5FF] border-[#154A96] text-[#0A2046] shadow-2xs'
                              : 'bg-slate-50/70 border-slate-100 text-slate-600 hover:bg-white hover:border-blue-200'
                          }`}
                        >
                          <IconComp
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              item.key === 'party'
                                ? 'text-[#C81E1E]'
                                : isCurr
                                ? 'text-[#154A96]'
                                : 'text-slate-400'
                            }`}
                          />
                          <View className="min-w-0">
                            <Text className="text-[12.5px] font-bold block truncate">
                              {item.title}
                            </Text>
                            <Text className="text-[10px] text-slate-400 block truncate">
                              {item.sub}
                            </Text>
                          </View>
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setDisplayMode('bigscreen')}
                      className="p-2.5 rounded-xl border border-blue-200 bg-gradient-to-br from-[#154A96] to-[#0D2E63] text-white text-left transition flex items-start gap-2 hover:brightness-110 shadow-xs"
                    >
                      <Monitor className="w-4 h-4 mt-0.5 shrink-0 text-blue-200" />
                      <View className="min-w-0">
                        <Text className="text-[12.5px] font-bold block truncate">
                          PC数据大屏
                        </Text>
                        <Text className="text-[10px] text-blue-200 block truncate">
                          全屏可视化看板
                        </Text>
                      </View>
                    </button>
                  </View>

                  {/* Weak Network Skeleton Card */}
                  <View className="mt-4 p-3 rounded-2xl bg-[#F8FAFE] border border-blue-100/80">
                    <View className="flex items-center justify-between">
                      <View className="flex items-center gap-1.5">
                        <Wifi className="w-4 h-4 text-[#154A96]" />
                        <Text className="text-[12px] font-bold text-[#0D2346]">
                          弱网环境骨架屏测试
                        </Text>
                      </View>
                      <button
                        type="button"
                        onClick={handleToggleSkeletonDemo}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition ${
                          isLoadingSkeleton
                            ? 'bg-amber-500 text-white'
                            : 'bg-[#154A96] text-white hover:bg-[#103B79]'
                        }`}
                      >
                        {isLoadingSkeleton ? '恢复正常网络' : '触发弱网骨架屏'}
                      </button>
                    </View>
                    <Text className="mt-1.5 block text-[11px] text-slate-500 leading-relaxed">
                      开启后切换任意页面或大屏均可预览 Taro 骨架屏 Shimmer 占位动画，保障弱网流畅反馈。
                    </Text>
                  </View>
                </View>
              </aside>
            )}
          </View>
        )}

        {/* MODE C: Dual-Screen Synchronized View (Mini-Program + PC Big Screen Side by Side) */}
        {displayMode === 'dual' && (
          <View className="max-w-[1760px] mx-auto p-4 grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            {/* Left: WeChat Mini-Program (4 cols) */}
            <View className="xl:col-span-4 flex flex-col items-center">
              <View className="w-full max-w-[430px] bg-[#EEF3FA] rounded-[32px] shadow-xl border-[5px] border-white overflow-hidden">
                {renderMiniProgramContent()}
                <nav className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 pt-1.5 pb-2">
                  <View className="grid grid-cols-4 items-center">
                    {bottomTabs.map((tab) => {
                      const IconComp = tab.icon;
                      const isSelected = activeBottomTabKey === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => handleNavigatePage(tab.key)}
                          className="flex flex-col items-center justify-center py-1"
                        >
                          <View
                            className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#154A96] text-white'
                                : 'text-slate-400'
                            }`}
                          >
                            <IconComp className="w-4 h-4" />
                          </View>
                          <Text
                            className={`text-[11px] mt-0.5 ${
                              isSelected
                                ? 'text-[#154A96] font-bold'
                                : 'text-slate-500'
                            }`}
                          >
                            {tab.label}
                          </Text>
                        </button>
                      );
                    })}
                  </View>
                </nav>
              </View>
            </View>

            {/* Right: PC Big Screen Dashboard (8 cols) */}
            <View className="xl:col-span-8 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <BigScreenDashboard
                onSwitchToMiniProgramPage={(page, subParam) => {
                  handleNavigatePage(page, subParam);
                }}
                onSelectEnterprise={setSelectedEnterprise}
                onSelectArticle={setSelectedArticle}
                onOpenModal={setActiveFormModal}
              />
            </View>
          </View>
        )}
      </main>

      {/* Modals & Drawers */}
      <EnterpriseDetailModal
        enterprise={selectedEnterprise}
        onClose={() => setSelectedEnterprise(null)}
        onShowToast={showToast}
      />

      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onShowToast={showToast}
      />

      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ActionFormModal
        modalType={activeFormModal}
        onClose={() => setActiveFormModal(null)}
        onShowToast={showToast}
      />

      {/* Global Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md text-white text-[13px] font-medium shadow-xl flex items-center gap-2 border border-white/15 max-w-md w-[90%] sm:w-auto"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <Text>{toastMessage}</Text>
          </motion.div>
        )}
      </AnimatePresence>
    </View>
  );
}
