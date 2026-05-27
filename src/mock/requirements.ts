export interface RequirementItem {
    id: string
    subject: string
    grade: string
    budget: string
    schedule: string
    status: 'matching' | 'matched' | 'closed'
    applicants: number
}

export const requirementList: RequirementItem[] = [
    { id: 'req1', subject: '小学数学', grade: '三年级', budget: '120-150元/小时', schedule: '周末下午', status: 'matching', applicants: 5 },
    { id: 'req2', subject: '初中英语', grade: '初二', budget: '100-130元/小时', schedule: '工作日晚上', status: 'matched', applicants: 3 },
    { id: 'req3', subject: '高中物理', grade: '高一', budget: '180-220元/小时', schedule: '周六上午', status: 'closed', applicants: 8 },
    { id: 'req4', subject: '小学语文', grade: '五年级', budget: '100-120元/小时', schedule: '周日全天', status: 'matching', applicants: 6 },
    { id: 'req5', subject: '高中数学', grade: '高三', budget: '200-250元/小时', schedule: '工作日晚上', status: 'matching', applicants: 4 },
]
