export interface CourseItem {
    id: string
    title: string
    student: string
    schedule: string
    status: 'ongoing' | 'upcoming' | 'done'
    progress: number
    role: 'student' | 'parent'
}

export const studentCourses: CourseItem[] = [
    { id: 'c1', title: '小学数学一对一', student: '小明同学', schedule: '每周六 14:00-16:00', status: 'ongoing', progress: 60, role: 'student' },
    { id: 'c2', title: '初中英语作业辅导', student: '小红同学', schedule: '每周三 19:00-21:00', status: 'upcoming', progress: 0, role: 'student' },
    { id: 'c3', title: '高中物理冲刺', student: '小刚同学', schedule: '每周日 09:00-11:00', status: 'done', progress: 100, role: 'student' },
    { id: 'c4', title: '小学语文阅读', student: '小芳同学', schedule: '每周五 16:00-17:30', status: 'ongoing', progress: 35, role: 'student' },
    { id: 'c5', title: '初中化学实验', student: '小华同学', schedule: '每周六 15:00-17:00', status: 'upcoming', progress: 0, role: 'student' },
]

export const parentCourses: CourseItem[] = [
    { id: 'pc1', title: '小学数学 · 张老师', student: '我家孩子', schedule: '每周六 14:00-16:00', status: 'ongoing', progress: 45, role: 'parent' },
    { id: 'pc2', title: '初中英语 · 李老师', student: '我家孩子', schedule: '每周五 19:00-21:00', status: 'upcoming', progress: 0, role: 'parent' },
    { id: 'pc3', title: '高中物理 · 王老师', student: '我家孩子', schedule: '每周日 09:00-11:00', status: 'ongoing', progress: 72, role: 'parent' },
    { id: 'pc4', title: '小学英语 · 孙老师', student: '我家孩子', schedule: '每周二 17:00-18:00', status: 'done', progress: 100, role: 'parent' },
]
