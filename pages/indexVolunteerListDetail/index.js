var httpRequest = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     
     
     
     
     
     
    */
    data: {
        dataListView: [],
    },

    //拨打服务热线电话
    clickTelUser: function (even) {
        if (even.currentTarget.dataset.itemPhone != '') {
            var _this = this;
            var phoneNumber = even.currentTarget.dataset.itemPhone
            wx.makePhoneCall({
                phoneNumber: phoneNumber,
                success: function () {
                    console.log("拨打电话成功！")
                },
                fail: function () {
                    console.log("拨打电话失败！")
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //查询志愿者列表
        var that = this;
        var data = {
            pageSize: 10,
            pageNum: 1,
            stautss: 2,
            volunteer_team_id: options.title
        }
        httpRequest.requestHeader("volunteer/queryVolunteerList.do", data, function (data) {
            that.setData({
                dataListView: data.data
            });
        });
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