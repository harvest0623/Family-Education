import { ROUTES } from '@/utils/router'

export interface NavItem {
    id: string
    name: string
    icon: string
    color: string
    bgColor: string
    badge?: string
    path: string
}

export const studentNavItems: NavItem[] = [
    {
        id: 'sn1',
        name: '找兼职',
        icon: '兼',
        color: '#3678FF',
        bgColor: 'rgba(54,120,255,0.12)',
        badge: '热',
        path: ROUTES.STUDENT_JOBS,
    },
    {
        id: 'sn2',
        name: '我的课程',
        icon: '课',
        color: '#FF8A3D',
        bgColor: 'rgba(255,138,61,0.12)',
        path: ROUTES.STUDENT_COURSES,
    },
    {
        id: 'sn3',
        name: '我的收入',
        icon: '收',
        color: '#52C41A',
        bgColor: 'rgba(82,196,26,0.12)',
        path: ROUTES.STUDENT_INCOME,
    },
    {
        id: 'sn4',
        name: '教学资源',
        icon: '资',
        color: '#9254DE',
        bgColor: 'rgba(146,84,222,0.12)',
        path: ROUTES.STUDENT_RESOURCES,
    },
]

export const parentNavItems: NavItem[] = [
    {
        id: 'pn1',
        name: '找老师',
        icon: '师',
        color: '#3678FF',
        bgColor: 'rgba(54,120,255,0.12)',
        badge: '新',
        path: ROUTES.PARENT_TEACHERS,
    },
    {
        id: 'pn2',
        name: '我的需求',
        icon: '需',
        color: '#FF8A3D',
        bgColor: 'rgba(255,138,61,0.12)',
        path: ROUTES.PARENT_REQUIREMENTS,
    },
    {
        id: 'pn3',
        name: '课程管理',
        icon: '管',
        color: '#52C41A',
        bgColor: 'rgba(82,196,26,0.12)',
        path: ROUTES.PARENT_COURSES,
    },
    {
        id: 'pn4',
        name: '我的订单',
        icon: '单',
        color: '#9254DE',
        bgColor: 'rgba(146,84,222,0.12)',
        path: ROUTES.PARENT_ORDERS,
    },
]
