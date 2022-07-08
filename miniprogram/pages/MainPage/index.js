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

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {

    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow() {
        this.getCredit();
        this.setData({
            userA: getApp().globalData.userA,
            userB: getApp().globalData.userB
        })
    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {

    },
    getCredit() {
        // TODO: get creditA from cloud database
        this.setData({
            creditA: 1,
            creditB: 2
        })
    }

})