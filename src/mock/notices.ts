export interface NoticeItem {
    id: string
    text: string
}

export const studentNotices: NoticeItem[] = [
    { id: 'sn1', text: '本周新增 128 个高薪兼职岗位，暑期家教需求火热进行中' },
    { id: 'sn2', text: '新用户完成首单可获 50 元奖励，名额有限先到先得' },
    { id: 'sn3', text: '平台担保结算，课后 24 小时内到账，安心接单' },
]

export const parentNotices: NoticeItem[] = [
    { id: 'pn1', text: '平台严选认证名师已上线，首单预约享专属优惠' },
    { id: 'pn2', text: '暑期提分季，优质老师档期紧张建议提前预约' },
    { id: 'pn3', text: '支持试听不满意可换老师，全程平台担保交易' },
]

/** @deprecated 兼容旧引用 */
export const studentNotice = studentNotices[0].text
export const parentNotice = parentNotices[0].text
