var httpRequest = require('../../utils/request.js');

var app = getApp();
Page({
    data: {
        winHeight: "",//窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        dataList: []
    },
    // 滚动切换标签样式
    switchTab: function (e) {
        this.setData({
            currentTab: e.detail.current
        });
        //this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        var cur = e.target.dataset.current;
        if (cur == 0) {
            this.dataShow(1);
        } else {
            this.dataShow(2);
        }
        if (this.data.currentTaB == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    dataShow(obj) {
        var that = this;
        httpRequest.requestHeader('activity/queryActivityForMyself.do', {
            pageSize: 100,
            pageNum: 1,
            status: obj
        }, function (data) {
            that.setData({
                dataList: data.data
            })
        })
    },
    onLoad: function (options) {
        //获取高度
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winHeight: res.windowHeight - 40,
                });
            }
        })
        that.dataShow(1);
    }
})