// pages/MyEvaluate/MyEvaluate.js
var wxStar = require('../wxStar/wxStar.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: 0
    },
    resetStar: function () {
        this.wxStarInit(0);
    },
    starChangeCb: function () {
        this.wxStarInit
    },
    /*
    * 发布
    */
    add(){
        if(this.data.flag==0){
            var length = this.wxStarCont();

            debugger
            wx.showModal({
                content: '请打一个评分',
                showCancel: false,
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wxStar.wxStar(this, 0, true);
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

