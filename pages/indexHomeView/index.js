var httpRequest = require('../../utils/request.js');

var app = getApp();
Page({
    data: {
        winHeight: "",//窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        uuid: '',
        dataListView: [],//查询详情
        dataListActive: [],//查询活动列表
        dataListEvaluateList: [],//查询评论列表
        markForTeam: '',//团队评价分数
    },
    // 滚动切换标签样式
    switchTab: function (e) {
        this.setData({
            currentTab: e.detail.current
        });
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    //申请志愿者
    addVolunteer() {
        wx.navigateTo({
            url: '../indexAddVolunteer/index?uuid=' + this.data.dataListView.uuid+''
        })
    },
    //预约服务
    addService() {
        wx.navigateTo({
            url: '../indexService/index'
        })
    },
    //跳转活动
    clickActiveView(event){
        wx.navigateTo({
            url: '../indexActiveView/index?uuid='+event.currentTarget.dataset.itemUuid+''
        })
    },
    //评价
    addEvaluate(){
        wx.navigateTo({
            url: '../indexMyEvaluate/index?uuid=' + this.data.uuid + ''
        })
    },
    onLoad: function (options) {
        var that = this;
        //设置标题
        wx.setNavigationBarTitle({
            title: options.title + '详情'
        });
        //获取高度
        that.setData({
            uuid: options.uuid
        });
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winHeight: res.windowHeight - 45 - 210 - 50,
                });
            }
        });

        this.pageInit(options.uuid)
        
    },
    onShow: function(){
        this.pageInit(this.data.uuid)
    },
    pageInit(uuid){
        var that = this;
        //根据志愿者团队查询详情
        httpRequest.requestHeader("volunteerTeam/queryVolunteerTeamByType.do", { type: uuid }, function (data) {
            that.setData({
                dataListView: data.data
            });
        });

        //根据志愿者团队查询活动列表
        httpRequest.requestHeader("activity/queryActivityListByVolunteerTeam.do", { volunteer_team_id: uuid, pageSize: 10, pageNum: 1 }, function (data) {
            that.setData({
                dataListActive: data.data
            });
        });

        //根据志愿者团队查询评论
        httpRequest.requestHeader("evaluate/queryEvaluateList.do", { volunteer_team_id: uuid, pageSize: 100, pageNum: 1 }, function (data) {
            that.setData({
                dataListEvaluateList: data.data
            });
        });

        //查询志愿者团队评价分数
        httpRequest.requestHeader("evaluate/queryMarkForTeam.do", { volunteer_team_id: uuid }, function (data) {
            that.setData({
                markForTeam: data.data
            });
        });
    }
})