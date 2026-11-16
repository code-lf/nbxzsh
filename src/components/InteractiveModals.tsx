import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  Calendar,
  Eye,
  Crown,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { View, Text, Image, Input, TARO_APP_CONFIG } from '../taro';
import {
  EnterpriseItem,
  MemberItem,
  NewsArticleItem,
  ActivityItem,
  ASSETS,
} from '../data/chamberData';

export type ModalScope = 'mini-program' | 'fullscreen';

const getBackdropClass = (scope: ModalScope) =>
  scope === 'mini-program'
    ? 'absolute inset-0 z-50 bg-slate-900/55 backdrop-blur-[2px]'
    : 'fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4';

const getViewportSlotClass = (scope: ModalScope) =>
  scope === 'mini-program'
    ? 'sticky top-0 left-0 right-0 h-[100dvh] md:h-full max-h-full flex items-end sm:items-center justify-center p-2.5 sm:p-3'
    : 'w-full flex items-center justify-center';

interface EnterpriseModalProps {
  enterprise: EnterpriseItem | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  scope?: ModalScope;
}

export const EnterpriseDetailModal: React.FC<EnterpriseModalProps> = ({
  enterprise,
  onClose,
  onShowToast,
  scope = 'mini-program',
}) => {
  if (!enterprise) return null;

  return (
    <AnimatePresence>
      <View onClick={onClose} className={getBackdropClass(scope)}>
        <View className={getViewportSlotClass(scope)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-3xl w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto ${
              scope === 'mini-program' ? 'max-w-[420px]' : 'max-w-lg'
            }`}
          >
            <View className="relative h-44 w-full bg-slate-200">
              <Image
                src={enterprise.buildingImg}
                alt={enterprise.fullName}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/45 text-white flex items-center justify-center hover:bg-black/65 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </View>

            <View className="p-4 sm:p-5">
              <View className="flex items-start justify-between gap-3">
                <View className="min-w-0">
                  <View className="flex items-center gap-2 flex-wrap">
                    <Text className="font-serif-title text-[18px] sm:text-[20px] font-bold text-[#0A2046]">
                      {enterprise.fullName}
                    </Text>
                    <span className="px-2 py-0.5 rounded bg-[#FDF3E1] text-[#9A6418] text-[11px] font-semibold">
                      {enterprise.roleBadge}
                    </span>
                  </View>
                  <View className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                    {enterprise.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-[#EBF3FE] text-[#1D54A6] text-[11px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </View>
                </View>

                <View className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Text
                    className={`font-extrabold ${
                      enterprise.logoColor === 'red'
                        ? 'text-[#D92D20] text-[15px] font-serif-title'
                        : 'text-[#0B3B8C] text-[11px]'
                    }`}
                  >
                    {enterprise.logoText}
                  </Text>
                </View>
              </View>

              <Text className="mt-3.5 block text-[13px] text-slate-600 leading-relaxed">
                {enterprise.fullDesc}
              </Text>

              <View className="mt-3.5 p-3 rounded-2xl bg-[#F6F9FE] border border-blue-50 grid grid-cols-2 gap-2.5 text-[12px]">
                <View>
                  <Text className="text-slate-400 block">创立时间</Text>
                  <Text className="font-semibold text-slate-800 mt-0.5 block">
                    {enterprise.founded || '1996年'}
                  </Text>
                </View>
                <View>
                  <Text className="text-slate-400 block">员工规模</Text>
                  <Text className="font-semibold text-slate-800 mt-0.5 block font-mono-num">
                    {enterprise.employees || '10,000+人'}
                  </Text>
                </View>
                <View className="col-span-2">
                  <Text className="text-slate-400 block">总部地址</Text>
                  <View className="flex items-center gap-1 text-slate-800 font-medium mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#154A96] shrink-0" />
                    <Text>{enterprise.address || enterprise.city}</Text>
                  </View>
                </View>
              </View>

              <View className="mt-4 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onShowToast(`已收藏「${enterprise.fullName}」至个人中心`);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-blue-200 text-[#154A96] text-[13px] font-semibold hover:bg-blue-50 transition"
                >
                  收藏会员企业
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onShowToast(
                      `已向「${enterprise.shortName}」发起宁波市徐州商会商务合作对接请求`
                    );
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#154A96] text-white text-[13px] font-semibold hover:bg-[#103B79] transition shadow-sm"
                >
                  申请商务对接
                </button>
              </View>
            </View>
          </motion.div>
        </View>
      </View>
    </AnimatePresence>
  );
};

interface MemberModalProps {
  member: MemberItem | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  scope?: ModalScope;
}

export const MemberDetailModal: React.FC<MemberModalProps> = ({
  member,
  onClose,
  onShowToast,
  scope = 'mini-program',
}) => {
  if (!member) return null;

  return (
    <AnimatePresence>
      <View onClick={onClose} className={getBackdropClass(scope)}>
        <View className={getViewportSlotClass(scope)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-3xl w-full overflow-hidden shadow-2xl border border-slate-100 p-4 sm:p-5 max-h-[85vh] overflow-y-auto ${
              scope === 'mini-program' ? 'max-w-[420px]' : 'max-w-md'
            }`}
          >
            <View className="flex items-start justify-between">
              <View className="flex items-center gap-3">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-xs bg-slate-100 shrink-0"
                />
                <View className="min-w-0">
                  <View className="flex items-center gap-2 flex-wrap">
                    <Text className="font-serif-title text-[18px] sm:text-[20px] font-bold text-[#0A2046]">
                      {member.name}
                    </Text>
                    <span className="px-2 py-0.5 rounded-md bg-[#FDF1D6] text-[#9A6418] text-[11px] font-semibold flex items-center gap-1">
                      <Crown className="w-3 h-3 text-[#D99B43] fill-[#EAB664]" />
                      {member.chamberRole}
                    </span>
                  </View>
                  <Text className="mt-1 block text-[13px] font-medium text-slate-700 truncate">
                    {member.company}
                  </Text>
                  <Text className="text-[11.5px] text-slate-500">
                    {member.position} · {member.industry}
                  </Text>
                </View>
              </View>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </View>

            <View className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-[#F3F8FE] to-[#FBFDFF] border border-blue-100/70">
              <Text className="text-[11px] text-[#3B5987] font-semibold block mb-1">
                徐商寄语
              </Text>
              <Text className="font-serif-title text-[13px] text-[#0D2346] leading-relaxed">
                “{member.quote.replace(/\n/g, '')}”
              </Text>
            </View>

            <View className="mt-3.5 flex flex-col gap-2 text-[12px] text-slate-600">
              <View className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <Text className="text-slate-400">籍贯乡情</Text>
                <Text className="font-medium text-slate-800">
                  {member.hometown || '江苏徐州'}
                </Text>
              </View>
              <View className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <Text className="text-slate-400">常驻城市</Text>
                <Text className="font-medium text-slate-800">{member.city}</Text>
              </View>
              <View className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <Text className="text-slate-400">商会职务批次</Text>
                <Text className="font-medium text-slate-800">
                  宁波市徐州商会 · {member.joinYear || '第三届理事会'}
                </Text>
              </View>
            </View>

            <View className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onShowToast(
                    `已通过宁波市徐州商会通讯录向 ${member.name}${member.chamberRole} 发起名片交换`
                  );
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#154A96] text-white text-[13px] font-semibold hover:bg-[#103B79] transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <Text>申请交换名片</Text>
              </button>
            </View>
          </motion.div>
        </View>
      </View>
    </AnimatePresence>
  );
};

interface ArticleModalProps {
  article: NewsArticleItem | null;
  onClose: () => void;
  scope?: ModalScope;
}

export const ArticleDetailModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  scope = 'mini-program',
}) => {
  if (!article) return null;

  return (
    <AnimatePresence>
      <View onClick={onClose} className={getBackdropClass(scope)}>
        <View className={getViewportSlotClass(scope)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-3xl w-full max-h-[82vh] overflow-y-auto shadow-2xl border border-slate-100 p-4 sm:p-5 ${
              scope === 'mini-program' ? 'max-w-[420px]' : 'max-w-lg'
            }`}
          >
            <View className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3FE] text-[#154A96] text-[11px] font-semibold">
                宁波市徐州商会 · {article.category}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </View>

            <Text className="mt-3 block font-serif-title text-[17.5px] sm:text-[19px] font-bold text-slate-900 leading-snug">
              {article.title}
            </Text>

            <View className="mt-2 flex items-center gap-3 flex-wrap text-[11.5px] text-slate-400 font-mono-num">
              <View className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <Text>{article.date}</Text>
              </View>
              <View className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <Text>{article.views}</Text>
              </View>
              {article.location && (
                <View className="flex items-center gap-1 font-sans min-w-0">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <Text className="truncate">{article.location}</Text>
                </View>
              )}
            </View>

            <View className="mt-3 rounded-2xl overflow-hidden h-40 sm:h-48 bg-slate-100">
              <Image
                src={article.thumb}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </View>

            <View className="mt-3.5 flex flex-col gap-2.5 text-[13.5px] text-slate-700 leading-relaxed text-justify">
              {article.contentParagraphs.map((p, idx) => (
                <p key={idx} className="m-0">
                  {p}
                </p>
              ))}
            </View>
          </motion.div>
        </View>
      </View>
    </AnimatePresence>
  );
};

interface ActionFormModalProps {
  modalType: 'investment' | 'assistance' | 'activity' | 'join' | 'taro-code' | null;
  activityContext?: ActivityItem | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  scope?: ModalScope;
}

export const ActionFormModal: React.FC<ActionFormModalProps> = ({
  modalType,
  activityContext,
  onClose,
  onShowToast,
  scope = 'mini-program',
}) => {
  const [name, setName] = useState('张建国');
  const [company, setCompany] = useState('宁波XX实业有限公司');
  const [phone, setPhone] = useState('13805748888');
  const [note, setNote] = useState('');
  const [exportTab, setExportTab] = useState<'guide' | 'project-config' | 'app-config'>('guide');

  if (!modalType) return null;

  if (modalType === 'taro-code') {
    const projectConfigJson = {
      miniprogramRoot: 'dist/',
      projectname: 'ningbo-xuzhou-chamber-mp',
      description: '宁波市徐州商会微信小程序与响应式跨端系统 (Taro + React)',
      appid: 'wx8888888888888888',
      setting: {
        urlCheck: true,
        es6: false,
        enhance: false,
        compileHotReLoad: false,
        postcss: false,
        minified: false,
      },
      compileType: 'miniprogram',
    };

    const handleDownloadJson = (filename: string, contentObj: object) => {
      const blob = new Blob([JSON.stringify(contentObj, null, 2)], {
        type: 'application/json;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      onShowToast(`已下载微信小程序配置文件：${filename}`);
    };

    return (
      <AnimatePresence>
        <View
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full p-5 shadow-2xl border border-slate-100 max-h-[88vh] overflow-y-auto"
          >
            <View className="flex items-center justify-between pb-3 border-b border-slate-100">
              <View className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#154A96]" />
                <Text className="font-serif-title text-[17px] font-bold text-[#0A2046]">
                  宁波市徐州商会 · 微信小程序导出与部署中心
                </Text>
              </View>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </View>

            <View className="mt-3 flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              {[
                { key: 'guide', label: '1. 微信开发者工具导入指南' },
                { key: 'project-config', label: '2. project.config.json' },
                { key: 'app-config', label: '3. Taro app.config.ts' },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setExportTab(t.key as 'guide' | 'project-config' | 'app-config')}
                  className={`flex-1 py-1.5 px-2.5 rounded-lg text-[12px] font-semibold transition ${
                    exportTab === t.key
                      ? 'bg-white text-[#154A96] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </View>

            {exportTab === 'guide' && (
              <View className="mt-3.5 flex flex-col gap-3 text-[12.5px] text-slate-700 leading-relaxed">
                <View className="p-3.5 rounded-2xl bg-[#F4F8FF] border border-blue-100">
                  <Text className="font-bold text-[#0A2046] block text-[13px] mb-1">
                    方式一：Taro 原生编译为微信小程序包（推荐）
                  </Text>
                  <Text className="block text-slate-600">
                    本项目已内置完整的微信小程序工程配置（根目录 <code className="text-[#154A96] font-mono">/project.config.json</code>、Taro 路由入口 <code className="text-[#154A96] font-mono">/src/app.config.ts</code> 与跨端组件适配层 <code className="text-[#154A96] font-mono">/src/taro/index.tsx</code>）：
                  </Text>
                  <pre className="mt-2 p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11.5px] overflow-x-auto">
{`# 1. 下载/导出当前工程代码至本地后安装 Taro CLI
npm i -g @tarojs/cli

# 2. 编译生成微信小程序产物 (输出至 dist/ 目录)
taro build --type weapp --watch

# 3. 打开【微信开发者工具】-> 导入项目 -> 选择本项目根目录
# (会自动识别根目录下的 project.config.json 并加载 dist/ 小程序包)`}
                  </pre>
                </View>

                <View className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <Text className="font-bold text-[#0A2046] block text-[13px] mb-1">
                    方式二：微信小程序 WebView 秒级直连（免二次编译）
                  </Text>
                  <Text className="block text-slate-600">
                    如果您希望最快上线并同时保留 PC 数据大屏与手机端全部动画，可直接将当前构建好的响应式前端部署至您的备案域名，并在微信小程序管理后台配置「业务域名」，在小程序页面中使用：
                  </Text>
                  <pre className="mt-2 p-2.5 rounded-xl bg-slate-900 text-blue-200 font-mono text-[11.5px] overflow-x-auto">
{`<web-view src="https://您的商会域名/"></web-view>`}
                  </pre>
                </View>

                <View className="flex items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleDownloadJson('project.config.json', projectConfigJson)}
                    className="flex-1 py-2.5 rounded-xl bg-[#154A96] text-white text-[12.5px] font-semibold hover:bg-[#103B79] transition shadow-xs"
                  >
                    下载 project.config.json
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadJson('app.config.json', TARO_APP_CONFIG)}
                    className="flex-1 py-2.5 rounded-xl border border-blue-200 bg-blue-50/60 text-[#154A96] text-[12.5px] font-semibold hover:bg-blue-100/70 transition"
                  >
                    下载 Taro 页面路由配置
                  </button>
                </View>
              </View>
            )}

            {exportTab === 'project-config' && (
              <View className="mt-3">
                <View className="flex items-center justify-between mb-2">
                  <Text className="text-[12px] text-slate-500">
                    已生成在项目根目录 <code className="font-mono text-slate-700">/project.config.json</code>（将 appid 替换为您的微信小程序 AppID 即可真机预览）：
                  </Text>
                  <button
                    type="button"
                    onClick={() => handleDownloadJson('project.config.json', projectConfigJson)}
                    className="px-3 py-1 rounded-lg bg-[#154A96] text-white text-[11.5px] font-semibold shrink-0"
                  >
                    下载文件
                  </button>
                </View>
                <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-[11.5px] font-mono overflow-x-auto max-h-72">
                  {JSON.stringify(projectConfigJson, null, 2)}
                </pre>
              </View>
            )}

            {exportTab === 'app-config' && (
              <View className="mt-3">
                <View className="flex items-center justify-between mb-2">
                  <Text className="text-[12px] text-slate-500">
                    已生成在 <code className="font-mono text-slate-700">/src/app.config.ts</code>（包含全部小程序页面路由与底部 TabBar 配置）：
                  </Text>
                  <button
                    type="button"
                    onClick={() => handleDownloadJson('app.config.json', TARO_APP_CONFIG)}
                    className="px-3 py-1 rounded-lg bg-[#154A96] text-white text-[11.5px] font-semibold shrink-0"
                  >
                    下载配置
                  </button>
                </View>
                <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-[11.5px] font-mono overflow-x-auto max-h-72">
                  {JSON.stringify(TARO_APP_CONFIG, null, 2)}
                </pre>
              </View>
            )}
          </motion.div>
        </View>
      </AnimatePresence>
    );
  }

  const activityTitle = activityContext?.title || '宁波市徐州商会2025年新春联谊会报名';
  const activitySubtitle = activityContext
    ? `${activityContext.date} ${activityContext.timeRange} · ${activityContext.location}`
    : '2025-01-10 (周五) 18:00 · 宁波香格里拉大酒店四楼宴会厅';

  const configMap = {
    investment: {
      title: '甬徐双城招商引资对接申请',
      subtitle: '宁波市徐州商会 · 政企互通 · 产业赋能',
      icon: ASSETS.iconInvestment,
      placeholder: '请简述您的项目投资意向、所属行业（如智能制造/现代物流）或园区落地需求...',
      btnText: '提交招商对接申请',
      successMsg: '招商对接申请已提交至宁波市徐州商会投资促进专委会！',
    },
    assistance: {
      title: '会员困难帮扶在线申请',
      subtitle: '传递商会温暖 · 共克时难 · 携手同行',
      icon: ASSETS.iconAssistance,
      placeholder: '请简述您需要商会协调解决的困难或法律/融资/供应链帮扶诉求...',
      btnText: '提交困难帮扶申请',
      successMsg: '困难帮扶申请已提交，宁波市徐州商会权益保障部将在24小时内联系您！',
    },
    activity: {
      title: activityTitle,
      subtitle: activitySubtitle,
      icon: ASSETS.iconActivity,
      placeholder: '请填写参会人数及随行嘉宾职务信息...',
      btnText: '确认报名参会',
      successMsg: `您已成功报名「${activityContext?.title || '宁波市徐州商会2025年新春联谊会'}」，电子邀请函已生成！`,
    },
    join: {
      title: '申请加入宁波市徐州商会',
      subtitle: '凝聚徐商力量 · 传承汉风精神 · 共建甬徐未来',
      icon: ASSETS.iconOrgStructure,
      placeholder: '请填写您的徐州籍贯区县、企业主营业务及拟申请职务（会员/理事/副会长）...',
      btnText: '提交入会申请',
      successMsg: '入会申请已提交至宁波市徐州商会秘书处审核！',
    },
  }[modalType];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast(configMap.successMsg);
    onClose();
  };

  return (
    <AnimatePresence>
      <View onClick={onClose} className={getBackdropClass(scope)}>
        <View className={getViewportSlotClass(scope)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-3xl w-full overflow-hidden shadow-2xl border border-slate-100 p-4 sm:p-5 max-h-[85vh] overflow-y-auto ${
              scope === 'mini-program' ? 'max-w-[420px]' : 'max-w-md'
            }`}
          >
            <View className="flex items-start justify-between gap-3">
              <View className="flex items-center gap-3 min-w-0">
                <View className="w-10 h-10 rounded-2xl bg-[#EBF3FE] p-2 flex items-center justify-center shrink-0">
                  <Image
                    src={configMap.icon}
                    alt={configMap.title}
                    mode="aspectFit"
                    className="w-full h-full object-contain"
                  />
                </View>
                <View className="min-w-0">
                  <Text className="font-serif-title text-[16px] sm:text-[17px] font-bold text-[#0A2046] block truncate">
                    {configMap.title}
                  </Text>
                  <Text className="text-[11px] text-slate-500 block mt-0.5 truncate">
                    {configMap.subtitle}
                  </Text>
                </View>
              </View>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </View>

            <form onSubmit={handleSubmit} className="mt-3.5 flex flex-col gap-2.5">
              <View>
                <Text className="text-[12px] font-medium text-slate-700 block mb-1">
                  申请人姓名
                </Text>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[13px] focus:outline-none focus:border-[#154A96]"
                />
              </View>

              <View>
                <Text className="text-[12px] font-medium text-slate-700 block mb-1">
                  所属企业及职务
                </Text>
                <Input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[13px] focus:outline-none focus:border-[#154A96]"
                />
              </View>

              <View>
                <Text className="text-[12px] font-medium text-slate-700 block mb-1">
                  联系电话
                </Text>
                <Input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[13px] font-mono-num focus:outline-none focus:border-[#154A96]"
                />
              </View>

              <View>
                <Text className="text-[12px] font-medium text-slate-700 block mb-1">
                  详细说明
                </Text>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={configMap.placeholder}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[13px] focus:outline-none focus:border-[#154A96] resize-none"
                />
              </View>

              <button
                type="submit"
                className="mt-1 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1A509B] to-[#123D7D] text-white text-[13.5px] font-semibold hover:brightness-110 active:scale-98 transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <Text>{configMap.btnText}</Text>
              </button>
            </form>
          </motion.div>
        </View>
      </View>
    </AnimatePresence>
  );
};
