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
        path: 'https://www.xxsghp.cn/wxbacksys/',
        //path: 'http://localhost:8080/wxbacksys/',
        globalUserId: '',//        globalIsAuthentication: '',//实名情况1：是 2：否
    },
    onShareAppMessage: function () {
        return {
            title: '自定义分享标题22222222',
            desc: '自定义分享描述2',
            path: '/pages/index/index',
            imageUrl: '/pages/images/banner.png',
            success: function (e) {
                conlose.log(e)
            }
        }
    }
})