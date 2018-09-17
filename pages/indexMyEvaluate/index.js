// pages/MyEvaluate/MyEvaluate.js
var wxStar = require('../wxStar/wxStar.js');
var httpRequest = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: 0,
        uuid: '',
        valueContern: ''
    },
    resetStar: function () {
        this.wxStarInit(0);
    },
    


    valueConternBox(e){
        this.setData({
            valueContern: e.detail.value
        })
    },
    /*
    * 发布
    */
    add(e){
        var length = this.wxStarCont();
        if (length<=0){
            wx.showModal({
                content: '请打一个评分',
                showCancel: false,
            })
        }else {
            var star_level = '';
            if (length==1||length==2){
                star_level = 1;
            } else if (length==3||length==4){
                star_level = 2;
            } else if (length == 5||length==6) {
                star_level = 3;
            } else if (length == 7||length==8) {
                star_level = 4;
            } else if (length == 9||length==10) {
                star_level = 5;
            }
            var data = {
                star_level: star_level,
                content: this.data.valueContern,
                volunteer_team_id: this.data.uuid
            }
            httpRequest.requestHeader("evaluate/addEvaluate.do", data, function (data) {
                if (data.status == 200) {
                    wx.showToast({
                        title: '提交成功！',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                    });
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1000) //延迟时间 
                }
            });
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wxStar.wxStar(this, 0, true);
        this.setData({
            uuid: options.uuid
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

