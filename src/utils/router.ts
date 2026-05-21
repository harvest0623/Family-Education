/** 页面路由常量 */
export const ROUTES = {
  INDEX: '/pages/index/index',
  STUDENT_HOME: '/pages/student/home',
  PARENT_HOME: '/pages/parent/home',
  MESSAGES: '/pages/common/messages',
  NOTICE: '/pages/common/notice',
  ARTICLE_DETAIL: '/pages/common/article-detail',
  BANNER_DETAIL: '/pages/common/banner-detail',
  STUDENT_JOBS: '/pages/student/jobs',
  STUDENT_COURSES: '/pages/student/courses',
  STUDENT_INCOME: '/pages/student/income',
  STUDENT_RESOURCES: '/pages/student/resources',
  STUDENT_JOB_DETAIL: '/pages/student/job-detail',
  STUDENT_SEARCH: '/pages/student/search',
  PARENT_TEACHERS: '/pages/parent/teachers',
  PARENT_REQUIREMENTS: '/pages/parent/requirements',
  PARENT_COURSES: '/pages/parent/courses',
  PARENT_ORDERS: '/pages/parent/orders',
  PARENT_TEACHER_DETAIL: '/pages/parent/teacher-detail',
  PARENT_SEARCH: '/pages/parent/search',
} as const

export function go(url: string) {
  uni.navigateTo({ url })
}

export function goWithQuery(base: string, query: Record<string, string | number>) {
  const qs = Object.entries(query)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join('&')
  uni.navigateTo({ url: qs ? `${base}?${qs}` : base })
}

export function back(delta = 1) {
  uni.navigateBack({ delta })
}
