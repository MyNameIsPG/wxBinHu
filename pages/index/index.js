var httpRequest = require('../../utils/request.js');
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    login() {
        var that = this;
        wx.login({
            success: function (res) {
                var data = {
                    code: res.code,
                    nickName: that.data.userInfo.nickName,
                    gender: that.data.userInfo.gender,
                    avatarUrl: that.data.userInfo.avatarUrl,
                };
                httpRequest.request("xcxlogin/login.do", data, function(data){
                    var app = getApp();
                    if (data.status==200){
                        app.globalData.globalUserId = data.data.user_id
                        app.globalData.globalRole = data.data.role
                        app.globalData.globalIsAuthentication = data.data.is_authentication
                        if (data.data.is_authentication == "2") {
                            wx.showModal({
                                title: '温馨提示',
                                content: '您还未实名认证！请先实名认证。',
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.navigateTo({
                                            url: '../indexUserName/index'
                                        })
                                    } else if (res.cancel) {
                                        wx.navigateTo({
                                            url: '../indexHome/index'
                                        })
                                    }
                                },
                                fail: function (res) {
                                    console.log("")
                                }
                            })
                        }else{
                            wx.navigateTo({
                                url: '../indexHome/index'
                            })
                        }
                    }
                })
            }
        })
    },
    onShow: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
            console.log("11111111")
            this.login();
            
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                console.log("222222")
                this.login();
                // wx.navigateTo({
                //     url: '../indexHome/index'
                // })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                    console.log("3333")
                    this.login();
                    // wx.navigateTo({
                    //     url: '../indexHome/index'
                    // })
                }
            })
        }
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
