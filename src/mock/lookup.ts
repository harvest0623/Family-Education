import { jobList, type JobItem } from './jobs'
import { teacherList, type TeacherItem } from './teachers'
import { parentArticles, type ArticleItem } from './articles'
import { studentBanners, parentBanners, type BannerItem } from './banners'

export function getJobById(id: string): JobItem | undefined {
    return jobList.find((j) => j.id === id)
}

export function getTeacherById(id: string): TeacherItem | undefined {
    return teacherList.find((t) => t.id === id)
}

export function getArticleById(id: string): ArticleItem | undefined {
    return parentArticles.find((a) => a.id === id)
}

export function getBannerById(id: string, role: 'student' | 'parent'): BannerItem | undefined {
    const list = role === 'student' ? studentBanners : parentBanners
    return list.find((b) => b.id === id)
}
