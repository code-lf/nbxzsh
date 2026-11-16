/**
 * 宁波市徐州商会 - 核心业务数据与静态资源映射
 * 所有图片、图标、背景均采用本地上传的高清素材与精确切片
 */

export const ASSETS = {
  // 顶部背景图
  bgMobileHero: '/assets/aistudio/ChatGPT____2026_10_14__23_54_06-1_b3699de0.png',
  bgPcHeader: '/assets/aistudio/ChatGPT____2026_10_14__23_54_07-2_14067763.png',

  // 6个3D蓝色定制功能图标（用户上传原图）
  iconOrgStructure: '/assets/aistudio/ChatGPT____2026_10_14__23_54_09-3_b845b508.png', // 会员架构
  iconEnterprise: '/assets/aistudio/ChatGPT____2026_10_14__23_54_11-4_efec8744.png',   // 知名企业
  iconInvestment: '/assets/aistudio/ChatGPT____2026_10_14__23_54_12-5_738ca4a1.png',   // 招商服务
  iconNews: '/assets/aistudio/ChatGPT____2026_10_14__23_54_14-6_bab9b34e.png',         // 商会资讯
  iconAssistance: '/assets/aistudio/ChatGPT____2026_10_14__23_54_16-7_48f0655c.png',   // 困难帮扶
  iconActivity: '/assets/aistudio/ChatGPT____2026_10_14__23_54_17-8_7d136ce3.png',     // 活动报名

  // 商会徽标
  logoEmblem: '/assets/extracted/logo_emblem.png',

  // 企业大楼实景图
  bannerGeely: '/assets/extracted/banner_geely.jpg',
  bannerHongyang: '/assets/extracted/banner_hongyang.jpg',
  bannerAux: '/assets/extracted/banner_aux.jpg',
  buildingGeely: '/assets/extracted/building_geely.jpg',
  buildingAux: '/assets/extracted/building_aux.jpg',
  buildingHongyang: '/assets/extracted/building_hongyang.jpg',
  buildingSuning: '/assets/extracted/building_suning.jpg',
  buildingFesc: '/assets/extracted/building_fesc.jpg',
  buildingVv: '/assets/extracted/building_vv.jpg',

  // 会员头像
  avatarZhang: '/assets/extracted/avatar_1_zhang.jpg',
  avatarLi: '/assets/extracted/avatar_2_li.jpg',
  avatarWang: '/assets/extracted/avatar_3_wang.jpg',
  avatarChen: '/assets/extracted/avatar_4_chen.jpg',
  avatarLiu: '/assets/extracted/avatar_5_liu.jpg',
  avatarZhao: '/assets/extracted/avatar_6_zhao.jpg',
  avatarSun: '/assets/extracted/avatar_7_sun.jpg',
  avatarZhou: '/assets/extracted/avatar_8_zhou.jpg',
  avatarProfileYoung: '/assets/extracted/avatar_profile_young.jpg',

  // 商会资讯与活动配图
  newsFocusRight: '/assets/extracted/news_focus_right.jpg',
  news1Conf: '/assets/extracted/news_1_conf.jpg',
  news2Visit: '/assets/extracted/news_2_visit.jpg',
  news3Party: '/assets/extracted/news_3_party.jpg',
  news4Geely: '/assets/extracted/news_4_geely.jpg',
  homeNews2: '/assets/extracted/home_news_2.jpg',
  homeNews3: '/assets/extracted/home_news_3.jpg',
  event2025Gala: '/assets/extracted/event_2025_gala.jpg',

  // 党建专题与详情配图
  partyBannerHome: '/assets/extracted/party_banner_home.jpg',
  partyBannerTopic: '/assets/extracted/party_banner_topic.jpg',
  partyDetailHero: '/assets/extracted/party_detail_hero.jpg',
  partyGallery1: '/assets/extracted/party_gallery_1.jpg',
  partyGallery2: '/assets/extracted/party_gallery_2.jpg',
  partyGallery3: '/assets/extracted/party_gallery_3.jpg',
  partyList1: '/assets/extracted/party_list_1.jpg',
  partyList2: '/assets/extracted/party_list_2.jpg',
  partyList3: '/assets/extracted/party_list_3.jpg',
  partyList4: '/assets/extracted/party_list_4.jpg',
  partyList5: '/assets/extracted/party_list_5.jpg',
};

export interface EnterpriseItem {
  id: string;
  shortName: string;
  fullName: string;
  roleBadge: '副会长单位' | '理事单位' | '会员单位';
  city: string;
  industryCategory: string;
  tags: string[];
  shortDesc: string;
  homeDesc: string;
  fullDesc: string;
  buildingImg: string;
  bannerImg: string;
  logoText: string;
  logoColor: 'blue' | 'red';
  logoSubText?: string;
  score?: number;
  founded?: string;
  employees?: string;
  address?: string;
  contactPhone?: string;
}

export const ENTERPRISES_DATA: EnterpriseItem[] = [
  {
    id: 'geely',
    shortName: '吉利汽车集团',
    fullName: '吉利汽车集团有限公司',
    roleBadge: '副会长单位',
    city: '宁波市',
    industryCategory: '制造业',
    tags: ['汽车制造', '高端装备', '新能源'],
    shortDesc: '全球领先的智能出行科技公司',
    homeDesc: '立足全球的智能出行科技公司，持续推动绿色智能交通发展。',
    fullDesc: '全球领先的智能出行科技公司，持续推动绿色智能交通发展。集团在宁波杭州湾新区、北仑等地设有核心现代化整车及动力总成研发制造基地，深度赋能甬徐两地高端装备与新能源汽车产业链协同。',
    buildingImg: ASSETS.buildingGeely,
    bannerImg: ASSETS.bannerGeely,
    logoText: 'GEELY',
    logoColor: 'blue',
    score: 98.5,
    founded: '1997年',
    employees: '50,000+人',
    address: '浙江省宁波市杭州湾新区滨海二路818号',
    contactPhone: '0574-8688 9000',
  },
  {
    id: 'aux',
    shortName: '奥克斯集团',
    fullName: '奥克斯集团有限公司',
    roleBadge: '会员单位',
    city: '宁波市',
    industryCategory: '智能家电',
    tags: ['智能家电', '数字科技', '智慧能源'],
    shortDesc: '智能家电与智慧能源解决方案',
    homeDesc: '全球领先的智能家电与智慧能源解决方案提供商。',
    fullDesc: '全球领先的智能家电与智慧能源解决方案提供商。业务涵盖智能家电、电力设备、医疗健康、新能源等产业领域，连续多年位列中国企业500强。',
    buildingImg: ASSETS.buildingAux,
    bannerImg: ASSETS.bannerAux,
    logoText: 'AUX',
    logoColor: 'blue',
    score: 96.2,
    founded: '1986年',
    employees: '30,000+人',
    address: '浙江省宁波市鄞州区日丽中路757号奥克斯中央大厦',
    contactPhone: '0574-8822 3333',
  },
  {
    id: 'hongyang',
    shortName: '弘阳集团',
    fullName: '弘阳集团有限公司',
    roleBadge: '理事单位',
    city: '南京市',
    industryCategory: '建筑地产',
    tags: ['城市建设', '商业运营', '物业服务'],
    shortDesc: '以城市运营为核心的综合集团',
    homeDesc: '以城市运营为核心，深耕长三角，打造高品质城市生活服务商。',
    fullDesc: '以城市运营为核心，深耕长三角，打造高品质城市生活服务商。致力于商业运营、地产开发、物业服务全产业链协同发展，积极参与甬徐两地城市更新与商业综合体建设。',
    buildingImg: ASSETS.buildingHongyang,
    bannerImg: ASSETS.bannerHongyang,
    logoText: 'h',
    logoColor: 'red',
    score: 94.8,
    founded: '1996年',
    employees: '12,000+人',
    address: '江苏省南京市浦口区大桥北路69号弘阳大厦',
    contactPhone: '025-5885 8888',
  },
  {
    id: 'suning',
    shortName: '苏宁易购',
    fullName: '苏宁易购集团股份有限公司',
    roleBadge: '会员单位',
    city: '南京市',
    industryCategory: '商贸服务',
    tags: ['商贸流通', '智慧零售', '供应链'],
    shortDesc: '以智慧零售为核心的综合性商业集团',
    homeDesc: '以智慧零售为核心的综合性商业集团。',
    fullDesc: '以智慧零售为核心的综合性商业集团。依托线上线下全场景零售渠道与全国智慧物流网络，为宁波及淮海经济区企业提供高效供应链与数字化商贸赋能。',
    buildingImg: ASSETS.buildingSuning,
    bannerImg: ASSETS.buildingSuning,
    logoText: 'Suning',
    logoColor: 'blue',
    score: 93.6,
    founded: '1990年',
    employees: '45,000+人',
    address: '江苏省南京市玄武区苏宁大道1号',
    contactPhone: '025-6699 6699',
  },
  {
    id: 'fesc',
    shortName: '远东控股',
    fullName: '远东控股集团有限公司',
    roleBadge: '会员单位',
    city: '宜兴市',
    industryCategory: '制造业',
    tags: ['电气设备', '智能制造', '新能源'],
    shortDesc: '致力于智能电缆、智能制造和绿色能源的全球化企业',
    homeDesc: '致力于智能电缆、智能制造和绿色能源的全球化企业。',
    fullDesc: '致力于智能电缆、智能制造和绿色能源的全球化企业。深耕智能缆网、智能电池、智慧机场三大核心业务，为长三角重大工程提供坚实装备保障。',
    buildingImg: ASSETS.buildingFesc,
    bannerImg: ASSETS.buildingFesc,
    logoText: 'FESC',
    logoSubText: '远东控股',
    logoColor: 'red',
    score: 92.1,
    founded: '1985年',
    employees: '10,000+人',
    address: '江苏省宜兴市高塍镇远东大道8号',
    contactPhone: '0510-8724 2500',
  },
  {
    id: 'vvgroup',
    shortName: '维维集团',
    fullName: '维维集团股份有限公司',
    roleBadge: '会员单位',
    city: '徐州市',
    industryCategory: '商贸服务',
    tags: ['食品饮料', '现代农业', '消费品'],
    shortDesc: '以食品饮料为主业的大型农业产业化企业',
    homeDesc: '以食品饮料为主业的大型农业产业化企业。',
    fullDesc: '以食品饮料为主业的大型农业产业化企业。发源于徐州彭城，旗下“维维豆奶”享誉全国，形成从生态粮食收储、现代食品加工到全国商贸流通的完整产业链。',
    buildingImg: ASSETS.buildingVv,
    bannerImg: ASSETS.buildingVv,
    logoText: '维维',
    logoColor: 'red',
    score: 91.8,
    founded: '1992年',
    employees: '8,500+人',
    address: '江苏省徐州市云龙区维维大道300号',
    contactPhone: '0516-8339 8888',
  },
  {
    id: 'xcmg-nb',
    shortName: '徐工宁波',
    fullName: '徐工集团工程机械宁波有限公司',
    roleBadge: '副会长单位',
    city: '宁波市',
    industryCategory: '制造业',
    tags: ['工程机械', '港口装备', '智能制造'],
    shortDesc: '高端港口与工程机械华东智造中心',
    homeDesc: '高端港口与工程机械华东智造与服务基地，服务宁波舟山港建设。',
    fullDesc: '徐工集团工程机械宁波有限公司深度依托宁波舟山港全球第一大港区位优势与徐州工程机械之都产业底座，提供智能港口起重机、新能源矿用机械及全生命周期维保服务。',
    buildingImg: ASSETS.buildingGeely,
    bannerImg: ASSETS.bannerGeely,
    logoText: 'XCMG',
    logoColor: 'blue',
    score: 97.1,
    founded: '2016年',
    employees: '1,200+人',
    address: '浙江省宁波市北仑区梅山保税港区港城路18号',
    contactPhone: '0574-8600 6688',
  },
  {
    id: 'yongxu-tech',
    shortName: '甬徐数科',
    fullName: '宁波甬徐数字科技有限公司',
    roleBadge: '理事单位',
    city: '宁波市',
    industryCategory: '数字科技',
    tags: ['数字科技', '工业互联', '智慧园区'],
    shortDesc: '工业互联网与智慧园区数字化服务商',
    homeDesc: '专注长三角制造业数字化转型与工业互联网平台研发。',
    fullDesc: '宁波甬徐数字科技有限公司由徐州籍留甬科技人才创办，聚焦汽车零部件、精密模具及化工园区物联网监测与数字孪生系统建设，已服务120余家甬徐两地制造企业。',
    buildingImg: ASSETS.buildingAux,
    bannerImg: ASSETS.bannerAux,
    logoText: 'YXTECH',
    logoColor: 'blue',
    score: 90.4,
    founded: '2020年',
    employees: '320+人',
    address: '浙江省宁波市高新区研发园B区5号楼',
    contactPhone: '0574-8791 2200',
  },
];

export interface MemberItem {
  id: string;
  name: string;
  chamberRole: '会长' | '副会长' | '理事' | '会员';
  company: string;
  position: string;
  industry: string;
  industryFilter: string;
  city: string;
  quote: string;
  avatar: string;
  iconType: 'people' | 'building';
  phone?: string;
  hometown?: string;
  joinYear?: string;
}

export const MEMBERS_DATA: MemberItem[] = [
  {
    id: 'zhang-jianguo',
    name: '张建国',
    chamberRole: '会长',
    company: '宁波XXX实业有限公司',
    position: '董事长',
    industry: '装备制造',
    industryFilter: '制造业',
    city: '宁波市',
    quote: '凝聚徐商力量，\n传承汉风精神，\n共建甬徐未来。',
    avatar: ASSETS.avatarZhang,
    iconType: 'people',
    phone: '0574-8888 0001',
    hometown: '江苏徐州·云龙区',
    joinYear: '2018年创会会长',
  },
  {
    id: 'li-mingyuan',
    name: '李明远',
    chamberRole: '副会长',
    company: '宁波明远科技有限公司',
    position: '总经理',
    industry: '智能制造',
    industryFilter: '制造业',
    city: '宁波市',
    quote: '以科技创新\n推动产业升级，\n助力两地高质量发展。',
    avatar: ASSETS.avatarLi,
    iconType: 'building',
    phone: '0574-8888 0002',
    hometown: '江苏徐州·鼓楼区',
    joinYear: '2019年入会',
  },
  {
    id: 'wang-haitao',
    name: '王海涛',
    chamberRole: '副会长',
    company: '奥克斯集团有限公司',
    position: '副总裁',
    industry: '家电电器',
    industryFilter: '智能家电',
    city: '宁波市',
    quote: '智能家电让生活更美好，\n持续创造社会价值。',
    avatar: ASSETS.avatarWang,
    iconType: 'building',
    phone: '0574-8888 0003',
    hometown: '江苏徐州·泉山区',
    joinYear: '2019年入会',
  },
  {
    id: 'chen-zhiqiang',
    name: '陈志强',
    chamberRole: '副会长',
    company: '吉利汽车集团',
    position: '产业发展总监',
    industry: '汽车制造',
    industryFilter: '制造业',
    city: '宁波市',
    quote: '以创新驱动\n建设更绿色的出行未来。',
    avatar: ASSETS.avatarChen,
    iconType: 'people',
    phone: '0574-8888 0004',
    hometown: '江苏徐州·铜山区',
    joinYear: '2020年入会',
  },
  {
    id: 'liu-fang',
    name: '刘芳',
    chamberRole: '理事',
    company: '宁波甬徐供应链有限公司',
    position: '总经理',
    industry: '现代物流',
    industryFilter: '商贸服务',
    city: '宁波市',
    quote: '构建高效供应链，\n连接更多合作机会。',
    avatar: ASSETS.avatarLiu,
    iconType: 'people',
    phone: '0574-8888 0005',
    hometown: '江苏徐州·新沂市',
    joinYear: '2020年入会',
  },
  {
    id: 'zhao-lei',
    name: '赵磊',
    chamberRole: '理事',
    company: '徐工集团宁波办事处',
    position: '总经理',
    industry: '工程机械',
    industryFilter: '制造业',
    city: '宁波市',
    quote: '传承徐工精神，\n服务基础建设发展。',
    avatar: ASSETS.avatarZhao,
    iconType: 'building',
    phone: '0574-8888 0006',
    hometown: '江苏徐州·沛县',
    joinYear: '2021年入会',
  },
  {
    id: 'sun-wei',
    name: '孙伟',
    chamberRole: '理事',
    company: '宁波汉风文化传播有限公司',
    position: '总经理',
    industry: '文化传媒',
    industryFilter: '商贸服务',
    city: '宁波市',
    quote: '弘扬两汉文化，\n讲好徐商故事。',
    avatar: ASSETS.avatarSun,
    iconType: 'people',
    phone: '0574-8888 0007',
    hometown: '江苏徐州·邳州市',
    joinYear: '2021年入会',
  },
  {
    id: 'zhou-jianhua',
    name: '周建华',
    chamberRole: '会员',
    company: '宁波华信建设工程有限公司',
    position: '总经理',
    industry: '建筑地产',
    industryFilter: '建筑地产',
    city: '杭州市',
    quote: '以诚信筑造品质，\n用匠心创造价值。',
    avatar: ASSETS.avatarZhou,
    iconType: 'building',
    phone: '0574-8888 0008',
    hometown: '江苏徐州·睢宁县',
    joinYear: '2022年入会',
  },
];

export interface NewsArticleItem {
  id: string;
  title: string;
  shortSummary: string;
  fullSummary: string;
  date: string;
  category: '最新资讯' | '商会活动' | '党建专题';
  partySubCategory?: '党史学习' | '党建动态' | '政策学习' | '主题活动' | '商会党建';
  tagBadge?: string;
  thumb: string;
  homeThumb?: string;
  views: number;
  location?: string;
  isFocus?: boolean;
  contentParagraphs: string[];
}

export const NEWS_DATA: NewsArticleItem[] = [
  {
    id: 'annual-conf-2024',
    title: '宁波市徐州商会2024年会员大会暨迎新交流会圆满举行',
    shortSummary: '凝聚徐商力量，共话高质量发展新机遇。',
    fullSummary: '凝聚徐商力量，共话高质量发展新机遇。来自甬徐两地的政府领导、商会会员及各界嘉宾齐聚一堂，共叙乡情，共谋发展。',
    date: '2024-12-18',
    category: '最新资讯',
    thumb: ASSETS.news1Conf,
    homeThumb: ASSETS.news1Conf,
    views: 2680,
    location: '宁波泛太平洋大酒店 · 三楼大宴会厅',
    isFocus: true,
    contentParagraphs: [
      '2024年12月18日，宁波市徐州商会2024年会员大会暨迎新交流会在宁波泛太平洋大酒店三楼大宴会厅隆重举行。来自宁波、徐州两地的相关部门领导、兄弟商会代表及本会全体会员共260余人欢聚一堂，共叙彭城乡情，共谋甬徐高质量发展新篇章。',
      '会上，会长张建国作宁波市徐州商会2024年度工作报告，全面回顾了商会在党建引领、政企对接、甬徐双城招商引资、会员企业走访服务及社会公益帮扶等方面取得的丰硕成果。2024年商会累计促成甬徐两地产业项目对接48项，组织各类专题活动18场。',
      '展望2025年，宁波市徐州商会将继续秉持“传承汉风·携手同行·共创共赢”的办会宗旨，深化两地产业链、创新链、人才链融合，打造更具凝聚力与影响力的标杆异地商会。',
    ],
  },
  {
    id: 'xuzhou-visit-2024',
    title: '商会赴徐州考察交流 推动甬徐两地产业合作',
    shortSummary: '深化区域合作，助力会员企业拓展发展空间。',
    fullSummary: '深入徐州经开区、淮海国际陆港等地，围绕智能制造、现代物流、新能源等产业开展考察交流，助力会员企业拓展发展空间。',
    date: '2024-11-26',
    category: '商会活动',
    partySubCategory: '党史学习',
    tagBadge: '产业对接',
    thumb: ASSETS.news2Visit,
    homeThumb: ASSETS.homeNews2,
    views: 1845,
    location: '徐州经济技术开发区 · 淮海国际陆港',
    isFocus: true,
    contentParagraphs: [
      '为积极响应长三角一体化发展战略，推动宁波与徐州两地产业优势互补，11月26日，宁波市徐州商会考察团一行28位企业家赴徐州经济技术开发区、淮海国际陆港开展为期三天的投资考察与产业对接活动。',
      '考察团先后走访了徐工集团高端工程机械智能制造基地、徐州综保区及现代物流枢纽，并与徐州市工商联、投资促进局举行专题座谈会，现场达成多项智能装备与跨境供应链合作意向。',
    ],
  },
  {
    id: 'party-theme-day-2024',
    title: '宁波市徐州商会党支部开展主题党日活动',
    shortSummary: '传承红色基因，弘扬新时代企业家精神。',
    fullSummary: '传承红色基因，弘扬新时代企业家精神，进一步增强党组织凝聚力和战斗力。',
    date: '2024-11-12',
    category: '党建专题',
    partySubCategory: '党建动态',
    tagBadge: '党建动态',
    thumb: ASSETS.news3Party,
    homeThumb: ASSETS.homeNews3,
    views: 1286,
    location: '宁波市徐州商会党员活动室',
    contentParagraphs: [
      '为深入学习贯彻党的二十大精神，进一步增强党组织凝聚力和战斗力，11月12日，宁波市徐州商会党支部在商会会议室召开了主题党日活动。商会党支部书记、部分党员及会员代表参加了本次活动。',
      '会议首先传达学习了党的二十大精神，重点围绕“两个确立”“两个维护”进行了深入学习和讨论。与会党员纷纷表示，要把学习贯彻党的二十大精神作为当前和今后一个时期的重要政治任务，切实把思想和行动统一到党中央决策部署上来。',
      '随后，商会党支部还组织开展了党史学习教育和交流研讨活动。大家结合自身工作实际，畅谈了学习体会和下一步工作打算。大家一致认为，要在商会发展中充分发挥党员的先锋模范作用，为促进商会高质量发展贡献力量。',
    ],
  },
  {
    id: 'new-member-geely',
    title: '新会员风采 | 吉利汽车集团加入宁波市徐州商会',
    shortSummary: '热烈欢迎吉利汽车集团成为商会新会员，期待未来加强交流合作，共促发展。',
    fullSummary: '热烈欢迎吉利汽车集团成为商会新会员，期待未来加强交流合作，共促发展。',
    date: '2024-10-28',
    category: '最新资讯',
    thumb: ASSETS.news4Geely,
    homeThumb: ASSETS.buildingGeely,
    views: 2150,
    location: '宁波杭州湾新区',
    contentParagraphs: [
      '金秋十月，宁波市徐州商会迎来重磅新成员——吉利汽车集团有限公司正式加入宁波市徐州商会并担任副会长单位。',
      '吉利汽车集团作为全球领先的智能出行科技企业，在汽车整车制造、新能源三电系统及智能网联领域拥有深厚技术积淀。此次加入商会将有力带动商会高端制造专委会与上下游零部件会员企业的协同创新。',
    ],
  },
  {
    id: 'yongxu-supply-chain-salon',
    title: '“智造出海·链动双城”甬徐高端装备供应链对接会成功举办',
    shortSummary: '促进会员企业上下游订单直采与出海物流协同降本。',
    fullSummary: '40余家宁波与徐州籍智能制造、汽配及物流企业在北仑自贸区开展面对面供需洽谈，现场签署采购合作备忘录12项。',
    date: '2024-10-15',
    category: '商会活动',
    tagBadge: '商会活动',
    thumb: ASSETS.buildingFesc,
    homeThumb: ASSETS.buildingFesc,
    views: 1530,
    location: '宁波北仑自贸试验区展示中心',
    contentParagraphs: [
      '10月15日下午，由宁波市徐州商会智能制造专业委员会主办的“智造出海·链动双城”高端装备供应链对接会在北仑区成功举行。',
      '来自徐工机械配套企业、吉利供应链及宁波港口物流会员企业负责人围绕高精度液压件加工、新能源电驱壳体、宁波舟山港绿色航运专线展开深度洽谈，切实帮助会员企业拓展市场、降本增效。',
    ],
  },
  {
    id: 'chamber-law-clinic-2024',
    title: '商会权益保障专委会开展民营企业合规与知识产权专题讲座',
    shortSummary: '护航会员企业稳健经营，筑牢涉外贸易合规防线。',
    fullSummary: '特邀资深涉外商事律师为会员企业解读《公司法》新规、劳动用工风控与跨境贸易知识产权保护实务。',
    date: '2024-09-28',
    category: '最新资讯',
    tagBadge: '企业服务',
    thumb: ASSETS.buildingAux,
    homeThumb: ASSETS.buildingAux,
    views: 1192,
    location: '宁波市鄞州区商会会议中心',
    contentParagraphs: [
      '为持续优化会员企业法治化营商能力，宁波市徐州商会权益保障部举办民营企业合规经营与知识产权保护公益专题讲座，吸引60余位企业负责人及法务主管现场聆听。',
      '商会常年法律顾问团队现场为会员企业提供“一对一”合同体检与股权架构咨询服务，并开通会员企业法律援助绿色通道。',
    ],
  },
  {
    id: 'youth-xushang-forum',
    title: '新生代徐商传承创新沙龙在鄞州南部商务区举行',
    shortSummary: '青年徐商接力传承，探讨AI赋能与数字化工厂升级路径。',
    fullSummary: '20余位在甬青年徐商创业者围绕AI大模型应用、工业数字化转型与品牌出海分享一线实践经验。',
    date: '2024-09-10',
    category: '商会活动',
    tagBadge: '青年沙龙',
    thumb: ASSETS.buildingSuning,
    homeThumb: ASSETS.buildingSuning,
    views: 1410,
    location: '宁波鄞州南部商务区水街',
    contentParagraphs: [
      '青年兴则商会兴。9月10日，宁波市徐州商会青年委员会组织新生代企业家走进奥克斯及甬徐数科园区，实地观摩黑灯工厂与MES数字化产线。',
      '与会青年企业家表示，将在前辈扎实创业的基础上，以数字化与国际化视野推动传统制造企业焕新升级。',
    ],
  },
];

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  timeRange: string;
  location: string;
  address: string;
  status: '报名中' | '即将开始' | '已结束';
  capacity: number;
  registeredCount: number;
  organizer: string;
  feeText: string;
  poster: string;
  highlights: string[];
  agenda: { time: string; topic: string }[];
}

export const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: 'gala-2025',
    title: '宁波市徐州商会2025年新春联谊会',
    subtitle: '传承汉风 · 同心同行 · 共迎未来',
    date: '2025-01-10 (周五)',
    timeRange: '18:00-21:00',
    location: '宁波香格里拉大酒店 · 四楼宴会厅',
    address: '浙江省宁波市鄞州区豫源街88号',
    status: '报名中',
    capacity: 200,
    registeredCount: 156,
    organizer: '宁波市徐州商会秘书处',
    feeText: '会员企业免费参会（每企限2席）',
    poster: ASSETS.event2025Gala,
    highlights: [
      '两汉文化汉服鼓乐迎宾与“千年彭城”非遗微展',
      '2024年度优秀徐商企业、突出贡献副会长颁奖盛典',
      '甬徐两地2025重点招商引资及金融授信签约仪式',
      '乡音联欢晚宴与徐州特色名品伴手礼互动抽奖',
    ],
    agenda: [
      { time: '17:30 - 18:10', topic: '嘉宾签到、合影留念及商会年度成果展巡礼' },
      { time: '18:10 - 18:45', topic: '张建国会长新年致辞暨年度优秀会员单位表彰' },
      { time: '18:45 - 19:15', topic: '甬徐双城产业投资签约与银行百亿授信启动' },
      { time: '19:15 - 21:00', topic: '新春团圆晚宴、文艺汇演与自由商务交流' },
    ],
  },
  {
    id: 'xuzhou-invest-summit',
    title: '2025甬徐双城智能制造招商推介峰会',
    subtitle: '精准招商 · 链主赋能 · 项目落地',
    date: '2025-02-18 (周二)',
    timeRange: '14:00-17:30',
    location: '宁波泛太平洋大酒店 · 二楼牡丹厅',
    address: '浙江省宁波市鄞州区民安东路99号',
    status: '报名中',
    capacity: 120,
    registeredCount: 84,
    organizer: '宁波市徐州商会投资促进专委会',
    feeText: '会员单位免费 · 特邀嘉宾定向席位',
    poster: ASSETS.news2Visit,
    highlights: [
      '徐州经开区、高新区最新制造业返乡投资政策权威解读',
      '宁波汽车零部件与新能源储能产业联合采购清单发布',
      '政企闭门圆桌面对面选址与税收奖补答疑',
    ],
    agenda: [
      { time: '13:30 - 14:00', topic: '参会企业签到与投资需求手册领取' },
      { time: '14:00 - 15:10', topic: '徐州市及各县区重点产业园区招商政策推介' },
      { time: '15:10 - 16:30', topic: '链主企业需求路演与拟落地项目分组洽谈' },
      { time: '16:30 - 17:30', topic: '意向项目签约仪式与自由交流' },
    ],
  },
  {
    id: 'geely-study-tour',
    title: '名企研学行 | 走进吉利汽车杭州湾智造基地',
    subtitle: '探访标杆工厂 · 对话精益智造',
    date: '2025-03-06 (周四)',
    timeRange: '09:30-16:00',
    location: '吉利汽车杭州湾新区研究院及总装工厂',
    address: '浙江省宁波市杭州湾新区滨海二路818号',
    status: '即将开始',
    capacity: 50,
    registeredCount: 42,
    organizer: '宁波市徐州商会智能制造专委会',
    feeText: '会员企业高管免费（限50名）',
    poster: ASSETS.buildingGeely,
    highlights: [
      '零距离观摩高度自动化焊装及新能源整车智造产线',
      '吉利产业供应链准入标准与国产替代合作深度研讨',
      '陈志强副会长带队分享汽车产业链协同经验',
    ],
    agenda: [
      { time: '09:30 - 11:00', topic: '走进吉利智能制造产线与研发实验室参观' },
      { time: '11:00 - 12:00', topic: '精益生产管理与供应链协同专题交流' },
      { time: '13:30 - 16:00', topic: '会员企业配套产品自荐与技术对接座谈' },
    ],
  },
  {
    id: 'annual-2024-review',
    title: '宁波市徐州商会2024年会员大会暨迎新交流会',
    subtitle: '凝聚徐商力量 · 共话高质量发展新机遇',
    date: '2024-12-18 (周三)',
    timeRange: '15:00-20:30',
    location: '宁波泛太平洋大酒店 · 三楼大宴会厅',
    address: '浙江省宁波市鄞州区民安东路99号',
    status: '已结束',
    capacity: 260,
    registeredCount: 260,
    organizer: '宁波市徐州商会秘书处',
    feeText: '已圆满落幕',
    poster: ASSETS.news1Conf,
    highlights: [
      '260余位两地政企领导与会员代表齐聚一堂',
      '全年累计促成甬徐双城产业对接项目48项',
      '发布2025年商会五大数字化服务升级计划',
    ],
    agenda: [
      { time: '15:00 - 17:30', topic: '会员代表大会审议年度工作与财务报告' },
      { time: '18:00 - 20:30', topic: '迎新联谊晚宴暨优秀会员授牌典礼' },
    ],
  },
];

export interface MembershipTierItem {
  id: string;
  roleTitle: string;
  annualFee: string;
  quotaText: string;
  badgeColor: 'gold' | 'blue' | 'indigo' | 'slate';
  targetAudience: string;
  benefits: string[];
}

export const MEMBERSHIP_TIERS_DATA: MembershipTierItem[] = [
  {
    id: 'tier-president',
    roleTitle: '会长单位',
    annualFee: '¥ 50,000',
    quotaText: '每届 1 席',
    badgeColor: 'gold',
    targetAudience: '在甬徐商领军企业或行业龙头企业董事长',
    benefits: [
      '统筹主持宁波市徐州商会理事会与重大决策表决权',
      '优先出席甬徐两地政府高层政企座谈会与招商引资峰会',
      '小程序首页与PC数据大屏核心风采置顶展示',
      '专享商会百亿银行联合授信绿色审批及法务首席顾问团服务',
    ],
  },
  {
    id: 'tier-vice-president',
    roleTitle: '副会长单位',
    annualFee: '¥ 20,000',
    quotaText: '限额 12 席',
    badgeColor: 'blue',
    targetAudience: '规模以上制造业、智能科技、商贸服务骨干企业',
    benefits: [
      '担任专委会主任或副主任，牵头组织行业供需对接会',
      '微信小程序“知名会员企业”首页及风采页优先推荐曝光',
      '免费参加商会全年高端研学、年会VIP席位及双城考察团',
      '享有会员企业招商落地、融资担保及应急困难帮扶优先协调权',
    ],
  },
  {
    id: 'tier-director',
    roleTitle: '理事单位',
    annualFee: '¥ 8,000',
    quotaText: '限额 36 席',
    badgeColor: 'indigo',
    targetAudience: '成长型专精特新企业、优质供应链及专业服务机构',
    benefits: [
      '享有商会理事会选举权、被选举权与重大事项审议权',
      '免费在商会通讯录、会员企业列表展示品牌LOGO及主营产品',
      '免费参与商会法律合规讲座、银企对接及青年沙龙活动',
      '每年享受2次免费商业咨询与企业用工政策申报辅导',
    ],
  },
  {
    id: 'tier-member',
    roleTitle: '普通会员单位',
    annualFee: '¥ 2,000',
    quotaText: '开放申请中',
    badgeColor: 'slate',
    targetAudience: '在甬创业或发展的徐州籍企业家、高管及商贸实体',
    benefits: [
      '颁发宁波市徐州商会正式电子及实体会员铭牌认证',
      '开放全量268家会员通讯录、企业名录与商机对接通道',
      '免费参加年度会员大会、新春联谊会及节日乡情联欢活动',
      '纳入商会困难帮扶与子女教育、医疗协调保障体系',
    ],
  },
];

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  time: string;
  type: '活动通知' | '商会公告' | '服务提醒';
  unread: boolean;
}

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '2025年新春联谊会席位确认提醒',
    content: '宁波市徐州商会2025年新春联谊会将于1月10日在香格里拉大酒店举行，请尽快确认参会人数。',
    time: '10分钟前',
    type: '活动通知',
    unread: true,
  },
  {
    id: 'notif-2',
    title: '关于开展2025年度会费缴纳及会员年审的通知',
    content: '各副会长、理事及会员单位可前往“个人中心 - 会员会费与权益”核对最新年度会费标准。',
    time: '2小时前',
    type: '商会公告',
    unread: true,
  },
  {
    id: 'notif-3',
    title: '吉利汽车集团加入宁波市徐州商会并任副会长单位',
    content: '欢迎新成员加入商会智造专委会，会员企业可通过“招商服务”提交上下游配套需求。',
    time: '昨天 16:40',
    type: '商会公告',
    unread: true,
  },
  {
    id: 'notif-4',
    title: '甬徐双城招商引资项目库第4批清单已更新',
    content: '新增徐州经开区与北仑保税区12项装备制造协同招商需求，欢迎查阅对接。',
    time: '3天前',
    type: '服务提醒',
    unread: false,
  },
];

export interface PartyArticleItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  badge: '党建动态' | '党史学习' | '政策学习' | '主题活动';
  thumb: string;
  views: number;
}

export const PARTY_ARTICLES_DATA: PartyArticleItem[] = [
  {
    id: 'party-1',
    title: '宁波市徐州商会党支部召开主题党日活动',
    summary: '传承红色基因，弘扬新时代企业家精神，商会党支部组织全体党员及会员代表...',
    date: '2024-11-12',
    badge: '党建动态',
    thumb: ASSETS.partyList1,
    views: 1286,
  },
  {
    id: 'party-2',
    title: '商会赴徐州考察交流 推动甬徐两地产业合作',
    summary: '深入徐州经济开发区，考察产业发展情况，加强两地商会交流合作，共谋发展。',
    date: '2024-11-26',
    badge: '党史学习',
    thumb: ASSETS.partyList2,
    views: 1120,
  },
  {
    id: 'party-3',
    title: '宁波市徐州商会党支部开展主题党日活动',
    summary: '组织党员学习党的二十大精神，进一步增强党性修养，凝聚商会发展力量。',
    date: '2024-11-12',
    badge: '党建动态',
    thumb: ASSETS.partyList4,
    views: 980,
  },
  {
    id: 'party-4',
    title: '学习贯彻党的二十届三中全会精神',
    summary: '深刻领会全会精神，切实把思想和行动统一到党中央决策部署上来。',
    date: '2024-10-28',
    badge: '政策学习',
    thumb: ASSETS.partyList2,
    views: 1450,
  },
  {
    id: 'party-5',
    title: '商会党支部“学习强国”知识竞赛活动',
    summary: '以赛促学、以学促行，进一步提升党员政治理论水平。',
    date: '2024-09-20',
    badge: '主题活动',
    thumb: ASSETS.partyList3,
    views: 890,
  },
  {
    id: 'party-6',
    title: '中国共产党百年奋斗的伟大成就',
    summary: '回顾党的百年光辉历程，汲取奋进力量，在新征程上再立新功。',
    date: '2024-09-05',
    badge: '党史学习',
    thumb: ASSETS.partyList5,
    views: 1340,
  },
];

// PC 数据大屏统计数据
export const BIG_SCREEN_DATA = {
  kpis: [
    { label: '会员总数', value: 268, unit: '人', diff: '+12', trend: 'up', icon: ASSETS.iconOrgStructure },
    { label: '会长', value: 1, unit: '人', diff: '0', trend: 'flat', icon: 'crown' },
    { label: '副会长', value: 12, unit: '人', diff: '0', trend: 'flat', icon: 'users' },
    { label: '理事', value: 36, unit: '人', diff: '+2', trend: 'up', icon: 'user' },
    { label: '会员', value: 268, unit: '人', diff: '+12', trend: 'up', icon: 'users' },
    { label: '招商申请', value: 48, unit: '条', diff: '+20', trend: 'up', icon: ASSETS.iconInvestment },
    { label: '活动报名', value: 320, unit: '人次', diff: '+28', trend: 'up', icon: ASSETS.iconActivity },
    { label: '困难帮扶', value: 16, unit: '次', diff: '+6', trend: 'up', icon: ASSETS.iconAssistance },
  ],
  industryDist: [
    { name: '智能制造', count: 59, percent: 22, color: '#0A66E8' },
    { name: '商贸流通', count: 48, percent: 18, color: '#2482F6' },
    { name: '建筑地产', count: 40, percent: 15, color: '#4799FA' },
    { name: '电子信息', count: 32, percent: 12, color: '#63AEFC' },
    { name: '现代服务', count: 27, percent: 10, color: '#7FC2FD' },
    { name: '生物医药', count: 21, percent: 8, color: '#9DD4FE' },
    { name: '其他', count: 41, percent: 15, color: '#4B8BF4' },
  ],
  activityTrend: [
    { month: '1月', events: 4, people: 210 },
    { month: '2月', events: 3, people: 220 },
    { month: '3月', events: 6, people: 290 },
    { month: '4月', events: 7, people: 330 },
    { month: '5月', events: 5, people: 310 },
    { month: '6月', events: 7, people: 315 },
    { month: '7月', events: 8, people: 375 },
    { month: '8月', events: 9, people: 480 },
    { month: '9月', events: 11, people: 455 },
    { month: '10月', events: 13, people: 495 },
    { month: '11月', events: 18, people: 520, highlight: true },
    { month: '12月', events: 14, people: 550 },
  ],
  investmentTrend: [
    { month: '1月', apply: 12, deal: 5 },
    { month: '2月', apply: 14, deal: 6 },
    { month: '3月', apply: 21, deal: 8 },
    { month: '4月', apply: 17, deal: 7 },
    { month: '5月', apply: 19, deal: 8 },
    { month: '6月', apply: 21, deal: 10 },
    { month: '7月', apply: 27, deal: 12 },
    { month: '8月', apply: 31, deal: 14 },
    { month: '9月', apply: 32, deal: 13 },
    { month: '10月', apply: 33, deal: 15 },
    { month: '11月', apply: 40, deal: 20 },
    { month: '11月 ', apply: 48, deal: 26, highlight: true },
    { month: '12月', apply: 38, deal: 19 },
  ],
  rankings: [
    { rank: 1, name: '吉利汽车集团有限公司', industry: '智能制造', score: '98.5' },
    { rank: 2, name: '奥克斯集团有限公司', industry: '家电制造', score: '96.2' },
    { rank: 3, name: '弘阳集团有限公司', industry: '城市建设', score: '94.8' },
    { rank: 4, name: '方太集团股份有限公司', industry: '智能家电', score: '93.6' },
    { rank: 5, name: '舜宇光学科技（集团）', industry: '光电信息', score: '92.1' },
    { rank: 6, name: '宁波建工股份有限公司', industry: '建筑地产', score: '91.8' },
    { rank: 7, name: '雅戈尔集团股份有限公司', industry: '纺织服装', score: '91.5' },
    { rank: 8, name: '中基宁波集团有限公司', industry: '商贸流通', score: '90.7' },
  ],
};
