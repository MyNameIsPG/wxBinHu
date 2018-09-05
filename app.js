//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                            // wx.navigateTo({
                            //     url: '../indexHome/index'
                            // })
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        path: 'http://120.77.223.58:8080/wxbacksys/',
        globalUserId: '',//用户id
        globalRole: '',//用户身份1：普通用户  2：志愿者团队管理员  3:社区管理员
        globalIsAuthentication: '',//实名情况1：是 2：否
    }
})