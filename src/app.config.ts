/**
 * Taro 微信小程序全局配置文件 (src/app.config.ts)
 * 编译命令: npm run build:weapp
 */
export default {
  pages: [
    'pages/index/index',
    'pages/enterprises/index',
    'pages/featured-enterprises/index',
    'pages/org-structure/index',
    'pages/member-directory/index',
    'pages/news/index',
    'pages/activities/index',
    'pages/activity-detail/index',
    'pages/party-building/index',
    'pages/profile/index',
    'pages/membership-tiers/index',
    'pages/notifications/index',
    'pages/big-screen/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#154A96',
    navigationBarTitleText: '宁波市徐州商会',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom',
  },
  tabBar: {
    custom: true,
    color: '#64748B',
    selectedColor: '#154A96',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/enterprises/index',
        text: '会员企业',
      },
      {
        pagePath: 'pages/news/index',
        text: '商会资讯',
      },
      {
        pagePath: 'pages/profile/index',
        text: '个人中心',
      },
    ],
  },
};
