// pages/user/user.js
const app = getApp()

Page({
    data: {
        userInfo: [],
        globalRole: '',
        newsNum: '2',
    },
    //点击跳转事件
    clickIndexView: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.itemPath + '?title=' + event.currentTarget.dataset.itemTitle
        })
    },
    //个人设置
    clickIndexView1(){
        wx.navigateTo({
            url: '../indexUserSetting/index'
        })
    },
    //发布活动
    clickIndexView2() {
        wx.navigateTo({
            url: '../indexMyActiveAdd/index'
        })
    },
    onLoad: function (options) {
        var app = getApp();
        this.setData({
            userInfo: app.globalData.userInfo,
            globalRole: app.globalData.globalRole
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})