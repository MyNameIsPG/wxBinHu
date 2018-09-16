var httpRequest = require('../../utils/request.js');
var app = getApp();
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onAuth() {
        var that = this;
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var code = res.code;
                // 获取用户信息
                wx.getUserInfo({
                    success: res => {
                        var that = this;
                        var data = {
                            code: code,
                            nickName: res.userInfo.nickName,
                            gender: res.userInfo.gender,
                            avatarUrl: res.userInfo.avatarUrl,
                        };
                        httpRequest.request("xcxlogin/login.do", data, function (data) {
                            var app = getApp();
                            if (data.status == 200) {
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
                                } else {
                                    wx.navigateTo({
                                        url: '../indexHome/index'
                                    })
                                }
                            }
                        })



                    }
                })
            }
        })
    },
    onLoad: function (options) {
        this.onAuth();
    }
})