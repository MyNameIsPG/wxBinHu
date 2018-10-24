var httpRequest = require('../../utils/request.js');
Page({
    data: {
        phoneNumber: '',
        globalRoleData: '',
        movies: [
            { url: '../image/bg/1.jpg' },
            { url: '../image/bg/2.jpg' },
            { url: '../image/bg/3.jpg' },
            { url: '../image/bg/4.jpg' },
            { url: '../image/bg/5.jpg' },
            { url: '../image/bg/6.jpg' }
        ]
    },
    //页面跳转事件
    clickIndexView(event){
        if (event.currentTarget.dataset.itemUuid != '') {
            wx.navigateTo({
                url: event.currentTarget.dataset.itemPath + '?title=' + event.currentTarget.dataset.itemTitle + '&uuid=' + event.currentTarget.dataset.itemUuid
            })
        } else {
            wx.navigateTo({
                url: event.currentTarget.dataset.itemPath
            })
        }
    },
    //查询服务热线
    queryHotline(){
        var _this = this;
        httpRequest.requestHeader("hotline/queryHotline.do", '', function (data) {
            if(data.status==200){
                _this.setData({
                    phoneNumber: data.data.phone
                })
            }
        });
    },
    //拨打服务热线电话
    clickTelUser: function () {
        var _this = this;
        var phoneNumber = _this.data.phoneNumber
        wx.makePhoneCall({
            phoneNumber: phoneNumber,
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    },
    onLoad: function (options) {
        var app = getApp();
        
    },
    onShow: function (options) {
        this.queryHotline();
    }
})