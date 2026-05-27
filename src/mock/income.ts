export interface IncomeRecord {
    id: string
    title: string
    amount: number
    date: string
    status: 'settled' | 'pending'
}

export interface IncomeSummary {
    total: number
    month: number
    pending: number
}

export const incomeSummary: IncomeSummary = {
    total: 18680,
    month: 4280,
    pending: 860,
}

export const incomeRecords: IncomeRecord[] = [
    { id: 'i1', title: '小学数学辅导', amount: 480, date: '2026-05-18', status: 'settled' },
    { id: 'i2', title: '初中英语辅导', amount: 400, date: '2026-05-15', status: 'settled' },
    { id: 'i3', title: '高中物理辅导', amount: 560, date: '2026-05-20', status: 'pending' },
    { id: 'i4', title: '小学语文辅导', amount: 440, date: '2026-05-12', status: 'settled' },
    { id: 'i5', title: '高中数学冲刺', amount: 600, date: '2026-05-16', status: 'settled' },
    { id: 'i6', title: '初中化学辅导', amount: 420, date: '2026-05-14', status: 'settled' },
    { id: 'i7', title: '小学英语陪练', amount: 360, date: '2026-05-19', status: 'pending' },
    { id: 'i8', title: '高中英语专项', amount: 520, date: '2026-05-11', status: 'settled' },
]
