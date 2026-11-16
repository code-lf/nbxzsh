import React from 'react';
import { Wifi } from 'lucide-react';
import { View, Text } from '../taro';

interface SkeletonWrapperProps {
  pageType:
    | 'home'
    | 'enterprises'
    | 'featured-enterprises'
    | 'news'
    | 'activities'
    | 'activity-detail'
    | 'profile'
    | 'membership-tiers'
    | 'notifications'
    | 'directory'
    | 'org'
    | 'party'
    | 'bigscreen';
  weakNetworkSimulated?: boolean;
}

export const SkeletonScreen: React.FC<SkeletonWrapperProps> = ({
  pageType,
  weakNetworkSimulated = false,
}) => {
  if (pageType === 'bigscreen') {
    return (
      <View className="w-full min-h-screen bg-[#EEF4FC] p-4 lg:p-6 flex flex-col gap-4">
        {/* Top Banner Skeleton */}
        <View className="w-full h-28 rounded-2xl skeleton-box flex items-center justify-between px-8">
          <View className="flex items-center gap-4">
            <View className="w-12 h-12 rounded-full bg-white/60" />
            <View className="flex flex-col gap-2">
              <View className="w-40 h-5 rounded-md bg-white/60" />
              <View className="w-28 h-3 rounded-md bg-white/50" />
            </View>
          </View>
          <View className="w-80 h-10 rounded-lg bg-white/60" />
          <View className="w-36 h-12 rounded-lg bg-white/60" />
        </View>

        {weakNetworkSimulated && (
          <View className="flex items-center justify-center gap-2 py-1.5 px-4 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-medium mx-auto">
            <Wifi className="w-3.5 h-3.5 animate-pulse text-amber-600" />
            <Text>弱网环境模拟中（2G/3G Slow）· 宁波市徐州商会Taro骨架屏预渲染引擎已启用...</Text>
          </View>
        )}

        {/* 8 KPI Cards Row */}
        <View className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <View key={i} className="bg-white/85 rounded-xl p-3.5 h-24 flex flex-col justify-between border border-blue-100/60">
              <View className="w-16 h-3.5 rounded-sm skeleton-box" />
              <View className="w-20 h-7 rounded-md skeleton-box" />
              <View className="w-14 h-3 rounded-sm skeleton-box" />
            </View>
          ))}
        </View>

        {/* 3 Columns Main Content */}
        <View className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
          <View className="lg:col-span-3 flex flex-col gap-4">
            <View className="bg-white/85 rounded-2xl p-4 h-72 border border-blue-100/60 flex flex-col gap-4">
              <View className="w-32 h-5 rounded-md skeleton-box" />
              <View className="flex items-center gap-4 flex-1">
                <View className="w-32 h-32 rounded-full skeleton-box shrink-0" />
                <View className="flex-1 flex flex-col gap-2.5">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <View key={idx} className="w-full h-3.5 rounded-sm skeleton-box" />
                  ))}
                </View>
              </View>
            </View>
            <View className="bg-white/85 rounded-2xl p-4 h-72 border border-blue-100/60 flex flex-col gap-4">
              <View className="w-32 h-5 rounded-md skeleton-box" />
              <View className="w-full flex-1 rounded-xl skeleton-box" />
            </View>
          </View>

          <View className="lg:col-span-6 flex flex-col gap-4">
            <View className="bg-white/85 rounded-2xl p-4 h-80 border border-blue-100/60 flex flex-col gap-4">
              <View className="w-40 h-5 rounded-md skeleton-box" />
              <View className="grid grid-cols-3 gap-4 flex-1 items-center">
                <View className="h-full rounded-xl skeleton-box" />
                <View className="w-28 h-28 rounded-full skeleton-box mx-auto" />
                <View className="h-full rounded-xl skeleton-box" />
              </View>
            </View>
            <View className="bg-white/85 rounded-2xl p-4 h-64 border border-blue-100/60 flex flex-col gap-4">
              <View className="w-36 h-5 rounded-md skeleton-box" />
              <View className="w-full flex-1 rounded-xl skeleton-box" />
            </View>
          </View>

          <View className="lg:col-span-3 flex flex-col gap-4">
            <View className="bg-white/85 rounded-2xl p-4 h-80 border border-blue-100/60 flex flex-col gap-3">
              <View className="w-36 h-5 rounded-md skeleton-box" />
              {Array.from({ length: 7 }).map((_, idx) => (
                <View key={idx} className="w-full h-6 rounded-md skeleton-box" />
              ))}
            </View>
            <View className="bg-white/85 rounded-2xl p-4 h-64 border border-blue-100/60 flex flex-col gap-3">
              <View className="w-32 h-5 rounded-md skeleton-box" />
              {Array.from({ length: 3 }).map((_, idx) => (
                <View key={idx} className="w-full h-14 rounded-lg skeleton-box" />
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="w-full pb-24 bg-[#EEF3FA] min-h-screen">
      {/* Hero Header Skeleton */}
      <View className="w-full h-[250px] skeleton-box p-4 flex flex-col justify-between">
        <View className="flex items-center justify-between pt-4">
          <View className="flex items-center gap-2.5">
            <View className="w-10 h-10 rounded-full bg-white/70" />
            <View className="flex flex-col gap-1.5">
              <View className="w-32 h-4 rounded-sm bg-white/70" />
              <View className="w-40 h-2.5 rounded-sm bg-white/50" />
            </View>
          </View>
          <View className="w-20 h-7 rounded-full bg-white/70" />
        </View>
        <View className="flex flex-col gap-2 pb-4">
          <View className="w-44 h-8 rounded-md bg-white/75" />
          <View className="w-56 h-4 rounded-sm bg-white/60" />
        </View>
      </View>

      {weakNetworkSimulated && (
        <View className="mx-3.5 mt-3 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-amber-800 text-xs font-medium shadow-2xs">
          <Wifi className="w-4 h-4 text-amber-600 animate-pulse shrink-0" />
          <Text>当前处于弱网模拟模式，正在通过 Taro 预渲染骨架屏加载「宁波市徐州商会」数据...</Text>
        </View>
      )}

      {/* Content Area Skeletons by Page Type */}
      <View className="px-3.5 mt-3 flex flex-col gap-3.5">
        {pageType === 'home' && (
          <>
            {/* 6 Quick Entry Icons */}
            <View className="bg-white rounded-2xl p-3.5 grid grid-cols-6 gap-2 shadow-2xs">
              {Array.from({ length: 6 }).map((_, i) => (
                <View key={i} className="flex flex-col items-center gap-2 py-2">
                  <View className="w-10 h-10 rounded-xl skeleton-box" />
                  <View className="w-12 h-3 rounded-sm skeleton-box" />
                  <View className="w-10 h-2.5 rounded-sm skeleton-box" />
                </View>
              ))}
            </View>
            {/* 4 Counters */}
            <View className="bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-2xs">
              <View className="w-28 h-5 rounded-sm skeleton-box" />
              <View className="grid grid-cols-4 gap-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <View key={i} className="h-16 rounded-xl skeleton-box" />
                ))}
              </View>
            </View>
            {/* 3 Enterprise Cards */}
            <View className="bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-2xs">
              <View className="w-32 h-5 rounded-sm skeleton-box" />
              <View className="grid grid-cols-3 gap-2.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <View key={i} className="h-44 rounded-xl skeleton-box" />
                ))}
              </View>
            </View>
          </>
        )}

        {pageType === 'profile' ? (
          <>
            <View className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-2xs">
              <View className="w-20 h-20 rounded-full skeleton-box shrink-0" />
              <View className="flex-1 flex flex-col gap-2">
                <View className="w-36 h-6 rounded-md skeleton-box" />
                <View className="w-48 h-4 rounded-sm skeleton-box" />
                <View className="w-40 h-3.5 rounded-sm skeleton-box" />
              </View>
            </View>
            <View className="bg-white rounded-2xl p-3.5 grid grid-cols-3 gap-2.5 shadow-2xs">
              {Array.from({ length: 6 }).map((_, i) => (
                <View key={i} className="h-16 rounded-xl skeleton-box" />
              ))}
            </View>
          </>
        ) : null}

        {/* List Rows Skeleton */}
        <View className="bg-white rounded-2xl p-4 flex flex-col gap-3.5 shadow-2xs">
          <View className="flex items-center justify-between">
            <View className="w-32 h-5 rounded-sm skeleton-box" />
            <View className="w-16 h-4 rounded-sm skeleton-box" />
          </View>
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-none">
              <View className="w-24 h-16 rounded-xl skeleton-box shrink-0" />
              <View className="flex-1 flex flex-col gap-2">
                <View className="w-3/4 h-4 rounded-sm skeleton-box" />
                <View className="w-full h-3 rounded-sm skeleton-box" />
                <View className="w-1/2 h-3 rounded-sm skeleton-box" />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
