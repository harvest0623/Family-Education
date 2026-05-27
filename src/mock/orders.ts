export interface OrderItem {
    id: string
    teacher: string
    subject: string
    amount: number
    date: string
    status: 'paid' | 'pending' | 'refund'
}

export const orderList: OrderItem[] = [
    { id: 'o1', teacher: '张老师', subject: '小学数学', amount: 600, date: '2026-05-18', status: 'paid' },
    { id: 'o2', teacher: '李老师', subject: '初中英语', amount: 520, date: '2026-05-20', status: 'pending' },
    { id: 'o3', teacher: '王老师', subject: '高中物理', amount: 800, date: '2026-05-10', status: 'paid' },
    { id: 'o4', teacher: '陈老师', subject: '小学语文', amount: 480, date: '2026-05-15', status: 'paid' },
    { id: 'o5', teacher: '刘老师', subject: '高中化学', amount: 720, date: '2026-05-12', status: 'refund' },
    { id: 'o6', teacher: '赵老师', subject: '高中数学', amount: 880, date: '2026-05-08', status: 'paid' },
]
