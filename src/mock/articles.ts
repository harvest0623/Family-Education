export interface ArticleItem {
  id: string
  title: string
  summary: string
  date: string
  coverColor: string
  readCount: number
}

export const parentArticles: ArticleItem[] = [
  {
    id: 'a1',
    title: '如何为孩子选择合适的家教老师',
    summary: '从资质认证、教学经验、试课反馈三个维度帮你快速筛选',
    date: '2026-05-15',
    coverColor: 'linear-gradient(135deg, #3678FF, #5B9DFF)',
    readCount: 3280,
  },
  {
    id: 'a2',
    title: '上门家教安全须知',
    summary: '预约前核实身份、首次见面选择公共场所等安全建议',
    date: '2026-05-10',
    coverColor: 'linear-gradient(135deg, #FF8A3D, #FFB347)',
    readCount: 2156,
  },
  {
    id: 'a3',
    title: '课程费用与支付说明',
    summary: '了解平台担保支付流程，保障双方权益',
    date: '2026-05-08',
    coverColor: 'linear-gradient(135deg, #52C41A, #73D13D)',
    readCount: 1890,
  },
  {
    id: 'a4',
    title: '暑期学习计划如何制定',
    summary: '合理分配学科时间，避免偏科，保持学习节奏',
    date: '2026-05-05',
    coverColor: 'linear-gradient(135deg, #9254DE, #B37FEB)',
    readCount: 1642,
  },
  {
    id: 'a5',
    title: '试听课注意事项',
    summary: '课前沟通目标、课中观察互动、课后及时反馈',
    date: '2026-05-01',
    coverColor: 'linear-gradient(135deg, #13C2C2, #36CFC9)',
    readCount: 1420,
  },
]
