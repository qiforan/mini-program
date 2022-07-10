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
        unfinishedMissions: [],
        finishedMissions: [],

        slideButtons: [
            { extClass: 'markBtn', text: '标记', src: "Images/icon_mark.svg" },
            { extClass: 'starBtn', text: '星标', src: "Images/icon_star.svg" },
            { extClass: 'removeBtn', text: '删除', src: 'Images/icon_del.svg' }
        ]

    },
    /**
     * Lifecycle function--Called when page show
     */
    async onShow() {
        await wx.cloud.callFunction({
            name: 'getList', data: {
                list: getApp().globalData.collectionMissionList
            }
        }).then(data => {
            console.log(data.result.data)
            this.setData({ allMissions: data.result.data })
        })
        // this.selectComponent('#calendar').toggleType();
        this.updateList()
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
        this.setData({
            unfinishedMissions: this.data.allMissions.filter(item => item.available === true),
            finishedMissions: this.data.allMissions.filter(item => item.available !== true),
        })
        return
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
        wx.navigateTo({ url: '../MissionDetail/index?id=' + mission.id });
    },
    async toAddPage() {
        wx.navigateTo({ url: '../MissionAdd/index' })
    }
})