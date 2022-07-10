// pages/MainPage/index.js
Page({

    /**
     * Page initial data
     */
    data: {
        imgUrls: [
            "Images/HomeCover01.jpg",
            "Images/HomeCover02.jpg",
            "Images/HomeCover03.jpg",
        ],

        paired: false,
        peerCode: '',

        selfInfo: {
            name: '',
            credit: 0,
            openid: '',
            pairCode: '',
        },
        peerInfo:{
            name: '',
            credit: 0,
            openid: '',
            pairCode: '',
        }
    },

    /**
     * Lifecycle function--Called when page show
     */
    async onShow() {
        let that = this;

        this.getCredit();
        this.setData({
            userA: getApp().globalData.userA,
            userB: getApp().globalData.userB
        })
        let {result} = await wx.cloud.callFunction({
            name: 'getUserInfo',
            data: {}
        });
        console.log(result);
        this.setData({
            'selfInfo.pairCode': result.pairCode,
            'selfInfo.openid': result.openid
        })
        const db = wx.cloud.database();
        if (!this.data.paired) {
            this.userWatcher = db.collection('UserList').where({
                _openid: this.data.selfInfo.openid
            }).watch({
                onChange: function (snapshot) {
                    const record = snapshot.docs[0];
                    if (record.paired !== false) {
                        that.setData({
                            paired: true
                        })
                        // const {result:selfInfo} = await db.collection('UserList').where({
                        //     _openid: this.data.openid
                        // })
                    }
                },
                onError: console.error
            })
        }
    },
    onUnload: function() {
        console.log('MainPage hide')
        this.userWatcher.close();
    },

    getCredit() {
        // TODO: get creditA from cloud database
        this.setData({
            'selfInfo.credit': 1,
            'peerInfo.credit': 2,
        })
    },

    async clickButton() {
        if (this.data.peerCode !== '') {
            const {result} = await wx.cloud.callFunction({
                name: 'updateUser',
                data: {
                    pairCode: this.data.peerCode
                }
            })
            console.log(result);
        }
    }
})