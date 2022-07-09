App({
    async onLaunch() {
        this.initCloud();
        this.globalData = {
            userA: '卡比',
            userB: '瓦豆',
            maxCredit: 500,
            _openidA: 'onsgK5XqCMLbYXudVgh3xjV4kgWw',
            _openidB: 'onsgK5Zc7t-bFdnFk3_krqdIRZYY',
            collectionMissionList: 'MissionList',
            collectionMarketList: 'MarketList',
            collectionStorageList: 'StorageList',
            collectionUserList: 'UserList',
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