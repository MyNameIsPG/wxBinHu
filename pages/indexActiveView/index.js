var httpRequest = require('../../utils/request.js');

var app = getApp();
Page({
    data: {
        uuid: '',
        dataListView: [],//查询详情
    },
    //立即报名
    addService() {
        wx.navigateTo({
            url: '../indexActivityRegistration/index?uuid='+this.data.uuid+''
        })
    },
    onLoad: function (options) {
        var that = this;
        //获取高度
        that.setData({
            uuid: options.uuid
        });
        //根据志愿者团队查询详情
        httpRequest.requestHeader("activity/queryActivity.do", { uuid: options.uuid }, function (data) {
            that.setData({
                dataListView: data.data
            });
        });

    }
})