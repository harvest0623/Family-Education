export interface MessageItem {
  id: string
  title: string
  content: string
  time: string
  type: 'system' | 'order' | 'job'
}

export const messageList: MessageItem[] = [
  { id: 'm1', title: '报名成功通知', content: '您报名的「小学数学一对一辅导」已提交，请等待家长确认。', time: '10:30', type: 'job' },
  { id: 'm2', title: '课程提醒', content: '您有一节课程将于明天 14:00 开始，请提前做好准备。', time: '昨天', type: 'order' },
  { id: 'm3', title: '系统公告', content: '暑期家教活动火热进行中，完成首单可获额外奖励。', time: '05-18', type: 'system' },
  { id: 'm4', title: '收入到账', content: '您有一笔 480 元收入已结算至账户，请查收。', time: '05-15', type: 'order' },
  { id: 'm5', title: '新兼职推荐', content: '根据您的偏好，为您推荐了 3 个附近高薪兼职岗位。', time: '05-12', type: 'job' },
  { id: 'm6', title: '评价邀请', content: '课程已结束，邀请您对家长进行评价。', time: '05-10', type: 'order' },
  { id: 'm7', title: '认证通过', content: '您的学生认证已通过，可接单更多优质岗位。', time: '05-08', type: 'system' },
  { id: 'm8', title: '急聘提醒', content: '附近有新发布的急聘岗位，薪资高于平均水平。', time: '05-06', type: 'job' },
]
