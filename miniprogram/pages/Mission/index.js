// pages/MainPage/index.js
Page({

    /**
     * Page initial data
     */
    data: {
        screenWidth: 1000,
        screenHeight: 1000,

        search: "",

        date: "",
        allMissions: [],
        missions: [],
        unfinishedMission: [],
        finishedMission: [],

        slideButtons: [
            { extClass: 'markBtn', text: '标记', src: "Images/icon_mark.svg" },
            { extClass: 'starBtn', text: '星标', src: "Images/icon_star.svg" },
            { extClass: 'removeBtn', text: '删除', src: 'Images/icon_del.svg' }
        ]

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
        await wx.cloud.callFunction({name: 'getList', data: {
            list: getApp().globalData.collectionMissionList
        }}).then(data => {
            this.setData({allMissions: data.result.data})
        })
        this.selectComponent('#calendar').toggleType();
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
    onSearch(e) {
        this.setData({
            search: e.detail.value
        })
    },
    tapCalendar(e) {
        console.log('tap Calendar');
        console.log(e)
    },
    updateList() {
        mission = []
        allMissions.forEach(mission => {
            if (mission.date == this.data.date) {
                mission.push(mission)
            }
        })
    },
    async toDetailPage(element, isUpper) {
        const missionIndex = element.currentTarget.dataset.index;
        const mission = isUpper ? this.data.unfinishedMission[missionIndex] : this.data.finishedMission[missionIndex];
        wx.navigateTo({url: '../MissionDetail/index?id=' + mission.id});
    }
})