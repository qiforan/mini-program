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
        creditA: 0,
        creditB: 0,

        userA: 'A',
        userB: 'B',

        paired: false,
        localPairCode: '123',
        inputCode: '',
        openid: ''

    },

    /**
     * Lifecycle function--Called when page show
     */
    async onShow() {
        this.getCredit();
        let that = this;
        this.setData({
            userA: getApp().globalData.userA,
            userB: getApp().globalData.userB
        })
        const res = await wx.cloud.callFunction({
            name: 'getUserInfo',
            data: {}
        });
        this.setData({
            localPairCode: res.result.pairCode
        })
        this.data.openid = res.result.openid
        console.log(res.result);
        const db = wx.cloud.database();
        if (!this.data.paired) {
            const watcher = db.collection('UserList').where({
                _openid: this.data.openid
            }).watch({
                onChange: function (snapshot) {
                    const record = snapshot.docs[0];
                    console.log(record);
                    if (record.paired !== false) {
                        that.setData({
                            paired: true
                        })
                        watcher.close()
                    }
                },
                onError: console.error
            })
        }
    },

    getCredit() {
        // TODO: get creditA from cloud database
        this.setData({
            creditA: 1,
            creditB: 2
        })
    },

    async clickButton() {
        if (this.data.inputCode !== '') {
            console.log(this.data.inputCode);
            const res = await wx.cloud.callFunction({
                name: 'updateUser',
                data: {
                    pairCode: this.data.localPairCode
                }
            })
            console.log(res);
        }
    }

})