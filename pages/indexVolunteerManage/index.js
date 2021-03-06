var httpRequest = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: []
    },

    //拒绝
    refuse(event){
        var data = {
            uuid: event.currentTarget.dataset.itemUuid,
            user_id: event.currentTarget.dataset.itemUser,
            team_name: event.currentTarget.dataset.itemName,
            old_stauts: event.currentTarget.dataset.itemStauts,
        }
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '是否拒绝该成员？',
            success: function (res) {
                if (res.confirm) {
                    httpRequest.requestHeader("volunteer/updateVolunteerStatusForRefuse.do", data, function (data) {
                        if (data.status == 200) {
                            wx.showToast({
                                title: '操作成功！',
                                icon: 'succes',
                                duration: 1000,
                                mask: true
                            });
                            setTimeout(function () {
                                //要延时执行的代码
                                that.onLoad()
                            }, 1000) //延迟时间 
                        }
                    });
                } else {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //通过
    adopt(event) {
        var data = {
            uuid: event.currentTarget.dataset.itemUuid,
            user_id: event.currentTarget.dataset.itemUser,
            team_name: event.currentTarget.dataset.itemName,
            old_stauts: event.currentTarget.dataset.itemStauts
        }
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '是否通过该成员？',
            success: function (res) {
                if (res.confirm) {
                    httpRequest.requestHeader("volunteer/updateVolunteerStatusForPass.do", data, function (data) {
                        if (data.status == 200) {
                            wx.showToast({
                                title: '操作成功！',
                                icon: 'succes',
                                duration: 1000,
                                mask: true
                            });
                            setTimeout(function () {
                                //要延时执行的代码
                                that.onLoad()
                            }, 1000) //延迟时间 
                        }
                    });
                } else {
                    console.log('用户点击取消')
                }
            }
        })
    },

    //拒绝退出
    ForBackPass(event) {
        var data = {
            uuid: event.currentTarget.dataset.itemUuid,
            user_id: event.currentTarget.dataset.itemUser,
            team_name: event.currentTarget.dataset.itemName,
            old_stauts: event.currentTarget.dataset.itemStauts
        }
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '是否拒绝该成员退出？',
            success: function (res) {
                if (res.confirm) {
                    httpRequest.requestHeader("volunteer/updateVolunteerStatusForBackPass.do", data, function (data) {
                        if (data.status == 200) {
                            wx.showToast({
                                title: '操作成功！',
                                icon: 'succes',
                                duration: 1000,
                                mask: true
                            });
                            setTimeout(function () {
                                //要延时执行的代码
                                that.onLoad()
                            }, 1000) //延迟时间 
                        }
                    });
                } else {
                    console.log('用户点击取消')
                }
            }
        })
    },
    

    //拒绝退出
    ForBackPass1(event) {
        var data = {
            uuid: event.currentTarget.dataset.itemUuid,
            user_id: event.currentTarget.dataset.itemUser,
            team_name: event.currentTarget.dataset.itemName,
            old_stauts: event.currentTarget.dataset.itemStauts
        }
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '是否同意该成员退出？',
            success: function (res) {
                if (res.confirm) {
                    httpRequest.requestHeader("volunteer/updateVolunteerStatusForBackPass.do", data, function (data) {
                        if (data.status == 200) {
                            wx.showToast({
                                title: '操作成功！',
                                icon: 'succes',
                                duration: 1000,
                                mask: true
                            });
                            setTimeout(function () {
                                //要延时执行的代码
                                that.onLoad()
                            }, 1000) //延迟时间 
                        }
                    });
                } else {
                    console.log('用户点击取消')
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that = this;
        var data = {
            // volunteer_team_id：
            pageSize: 10,
            pageNum: 1,
            stautss: '1,4,3,5'
        }
        httpRequest.requestHeader("volunteer/queryVolunteerList.do", data, function (data) {
            if (data.status == 200) {
                that.setData({
                    dataList: data.data
                })
            }
        });
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