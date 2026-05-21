export interface ResourceItem {
  id: string
  title: string
  type: string
  size: string
  downloads: number
  coverColor: string
}

export const resourceList: ResourceItem[] = [
  { id: 'r1', title: '小学数学知识点总结', type: 'PDF', size: '2.4MB', downloads: 3280, coverColor: 'linear-gradient(135deg, #3678FF, #5B9DFF)' },
  { id: 'r2', title: '中考英语高频词汇表', type: 'PDF', size: '1.8MB', downloads: 2956, coverColor: 'linear-gradient(135deg, #FF8A3D, #FFB347)' },
  { id: 'r3', title: '高中物理实验视频合集', type: '视频', size: '128MB', downloads: 1642, coverColor: 'linear-gradient(135deg, #9254DE, #B37FEB)' },
  { id: 'r4', title: '作文素材积累手册', type: 'DOC', size: '3.1MB', downloads: 2103, coverColor: 'linear-gradient(135deg, #52C41A, #73D13D)' },
  { id: 'r5', title: '初中化学方程式大全', type: 'PDF', size: '1.2MB', downloads: 1876, coverColor: 'linear-gradient(135deg, #13C2C2, #36CFC9)' },
  { id: 'r6', title: '高考数学压轴题精讲', type: '视频', size: '256MB', downloads: 1420, coverColor: 'linear-gradient(135deg, #2456D4, #5B9DFF)' },
  { id: 'r7', title: '小学奥数思维训练题', type: 'PDF', size: '4.5MB', downloads: 2560, coverColor: 'linear-gradient(135deg, #FAAD14, #FFC53D)' },
  { id: 'r8', title: '课堂管理技巧指南', type: 'DOC', size: '0.9MB', downloads: 980, coverColor: 'linear-gradient(135deg, #EB2F96, #F759AB)' },
]
