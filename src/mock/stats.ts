export interface StatItem {
  label: string
  value: string
  unit?: string
  highlight?: boolean
}

export const studentStats: StatItem[] = [
  { label: '今日新增', value: '48', unit: '单', highlight: true },
  { label: '平均薪资', value: '138', unit: '元/h' },
  { label: '已报名', value: '1.8', unit: '万+' },
]

export const parentStats: StatItem[] = [
  { label: '认证老师', value: '9600', unit: '+' },
  { label: '好评率', value: '98', unit: '%', highlight: true },
  { label: '本月成交', value: '3.2', unit: '万单' },
]
