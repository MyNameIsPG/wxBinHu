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
    clickForOut: function (event) {
        var data = {
            uuid: event.currentTarget.dataset.itemUuid,
            team_name: event.currentTarget.dataset.itemName,
            old_stauts: event.currentTarget.dataset.itemStauts,
        }
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '是否申请退出该服务？',
            success: function (res) {
                if (res.confirm) {
                    httpRequest.requestHeader("volunteer/updateVolunteerStatusForBack.do", data, function (data) {
                        if (data.status == 200) {
                            wx.showToast({
                                title: '操作成功！',
                                icon: 'succes',
                                duration: 1000,
                                mask: true
                            });
                            setTimeout(function () {
                                //要延时执行的代码
                                that.onLoad()
                            }, 1000) //延迟时间 
                        }
                    });
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