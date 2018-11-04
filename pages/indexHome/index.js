var httpRequest = require('../../utils/request.js');
Page({
    data: {
        phoneNumber: '',
        globalRoleData: '',
        movies: []
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
    //查询轮播图
    queryPictures() {
        var _this = this;
        httpRequest.requestHeader('pictures/query', {
            pageSize: 100,
            pageNum: 1,
            flag: 1
        }, function (data) {
            if (data.status == 200) {
                _this.setData({
                    movies: data.data
                })
            }
        });
    },
    //查询服务热线
    queryHotline(){
        var _this = this;
        httpRequest.requestHeader("hotline/queryHotline.do", { pageSize: 10, pageNum: 1, flag: 1}, function (data) {
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
        this.queryPictures();
    },
    onShareAppMessage: function () {
        
    }
})