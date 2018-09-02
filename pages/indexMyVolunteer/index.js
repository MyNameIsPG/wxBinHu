// pages/MyVolunteer/MyVolunteer.js
var httpRequest = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: []
    },

    /**
     * 申请退出
     */
    clickForOut: function () {
        wx.showModal({
            title: '温馨提示',
            content: '是否申请退出该服务？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else {
                    console.log('用户点击取消')
                }
            }
        })
    },

    /**
     * 评价
     */
    clickEvaluate: function () {
        wx.navigateTo({
            url: '../indexMyEvaluate/index'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        httpRequest.requestHeader(
            'volunteerTeam/queryVolunteerTeamListForMy.do',
            {pageSize: 100, pageNum: 1},
            function (data) {
                that.setData({
                    dataList: data.data
                })
            }
        )
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