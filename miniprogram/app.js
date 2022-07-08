App({
    async onLaunch() {
        this.initCloud();
        this.globalData = {
            userA: '卡比',
            userB: '瓦豆',
            maxCredit: 500,
        }

    },
    flag: false,
    async initCloud() {
        const normalInfo = require('./env-list.js').envList || [];
        if (normalInfo.length !== 0 && normalInfo.envId !== null) {
            wx.cloud.init({
                traceUser: true,
                env:normalInfo[0].envId
            })
            this.cloud = () => {
                return wx.cloud
            }
        } else {
            this.cloud = () => {
                wx.showModal({
                    content: '请先配置环境',
                    showCancel: false,
                })
                throw new Error('请先配置环境')
            }
        }
    },
    async database() {
        return (await this.cloud()).database()
    }
})