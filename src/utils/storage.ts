const KEYS = {
  CITY: 'fe_selected_city',
  APPLIED_JOBS: 'fe_applied_jobs',
  BOOKED_TEACHERS: 'fe_booked_teachers',
  READ_MESSAGES: 'fe_read_messages',
} as const

function getJson<T>(key: string, fallback: T): T {
  try {
    const raw = uni.getStorageSync(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function setJson(key: string, value: unknown) {
  uni.setStorageSync(key, JSON.stringify(value))
}

export function getCity(): string {
  return uni.getStorageSync(KEYS.CITY) || '北京'
}

export function setCity(city: string) {
  uni.setStorageSync(KEYS.CITY, city)
}

export function getAppliedJobIds(): string[] {
  return getJson<string[]>(KEYS.APPLIED_JOBS, [])
}

export function addAppliedJob(id: string) {
  const ids = getAppliedJobIds()
  if (!ids.includes(id)) {
    ids.push(id)
    setJson(KEYS.APPLIED_JOBS, ids)
  }
}

export function isJobApplied(id: string) {
  return getAppliedJobIds().includes(id)
}

export function getBookedTeacherIds(): string[] {
  return getJson<string[]>(KEYS.BOOKED_TEACHERS, [])
}

export function addBookedTeacher(id: string) {
  const ids = getBookedTeacherIds()
  if (!ids.includes(id)) {
    ids.push(id)
    setJson(KEYS.BOOKED_TEACHERS, ids)
  }
}

export function isTeacherBooked(id: string) {
  return getBookedTeacherIds().includes(id)
}

export function getReadMessageIds(): string[] {
  return getJson<string[]>(KEYS.READ_MESSAGES, [])
}

export function markMessageRead(id: string) {
  const ids = getReadMessageIds()
  if (!ids.includes(id)) {
    ids.push(id)
    setJson(KEYS.READ_MESSAGES, ids)
  }
}
