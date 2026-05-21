export interface BannerItem {
  id: string
  title: string
  subtitle?: string
  bgColor: string
  tag?: string
  btnText?: string
}

export const studentBanners: BannerItem[] = [
  {
    id: 'sb1',
    title: '暑期家教火热招募',
    subtitle: '高薪兼职 · 灵活时间 · 平台担保',
    bgColor: 'linear-gradient(135deg, #2456D4 0%, #3678FF 50%, #5B9DFF 100%)',
    tag: '热门',
    btnText: '立即查看',
  },
  {
    id: 'sb2',
    title: '新用户专享奖励',
    subtitle: '完成首单额外补贴 50 元',
    bgColor: 'linear-gradient(135deg, #1E4FC4 0%, #4A7CFF 60%, #7BA3FF 100%)',
    tag: '限时',
    btnText: '领取福利',
  },
  {
    id: 'sb3',
    title: '名校家教专场',
    subtitle: '覆盖小学至高中全学科',
    bgColor: 'linear-gradient(135deg, #2B5FD8 0%, #3678FF 40%, #69B1FF 100%)',
    tag: '推荐',
    btnText: '去看看',
  },
]

export const parentBanners: BannerItem[] = [
  {
    id: 'pb1',
    title: '优质名师一对一',
    subtitle: '严选认证 · 上门辅导 · 满意再付',
    bgColor: 'linear-gradient(135deg, #2456D4 0%, #3678FF 50%, #6B8EFF 100%)',
    tag: '推荐',
    btnText: '找老师',
  },
  {
    id: 'pb2',
    title: '开学季限时优惠',
    subtitle: '预约立减 · 平台担保交易',
    bgColor: 'linear-gradient(135deg, #2B5FD8 0%, #3D6FE8 50%, #5B8FFF 100%)',
    tag: '特惠',
    btnText: '了解详情',
  },
  {
    id: 'pb3',
    title: '免费试听一节',
    subtitle: '满意再付款 · 不满意可换老师',
    bgColor: 'linear-gradient(135deg, #1A4FBE 0%, #3678FF 55%, #85A8FF 100%)',
    tag: '福利',
    btnText: '立即预约',
  },
]
