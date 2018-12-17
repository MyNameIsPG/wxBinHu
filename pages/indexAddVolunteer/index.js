import WxValidate from '../../utils/WxValidate.js'
var dateTimePicker = require('../../utils/dateTimePicker.js');
var httpRequest = require('../../utils/request.js');
const App = getApp()
Page({
    data: {
        currentTab: 0, //预设当前项的值
        uuid: '',
        form: {
            name: '',//姓名
            sex: '1',//性别
            date: '',//出生年月
            educational_level: '',//教育程度
            identity: '0',//身份
            school_name1: '',//学校名称
            major_class1: '',//专业/班级
            industry1: '',//所在行业
            school_name2: '',//学校名称
            major_class2: '',//专业/班级
            industry2: '',//所在行业
            is_duty: '1',
            service_time: '1',
            phone: '',
            domicile: '',
            checkbox: '2'
        },
        sex: [
            { name: '男', value: '1', checked: 'true' },
            { name: '女', value: '2' },
        ],
        educational_level: [
            '中专及以下',
            '大专',
            '本科',
            '本科以上'
        ],
        is_duty: [
            { name: '有', value: '1', checked: 'true' },
            { name: '否', value: '2' },
        ],
        service_time: [
            { name: '工作日', value: '1', checked: 'true' },
            { name: '周末', value: '2' },
        ],
    },
    // 身份切换
    swichNav: function (e) {
        var up = "form.identity";
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur,
                [up]: cur
            })
        }
    },
    //性别
    bindSexChange(e) {
        var up = "form.sex";
        this.setData({
            [up]: e.detail.value,
        })
    },
    //时间控件
    bindDateChange: function (e) {
        var up = "form.date";
        this.setData({
            [up]: e.detail.value
        })
    },
    //教育程度
    bindEducationChange: function (e) {
        var up = "form.educational_level";
        this.setData({
            [up]: e.detail.value,
        })
    },
    //是否曾参与义务服务
    bindIsdutyChange: function (e) {
        var up = "form.is_duty";
        this.setData({
            [up]: e.detail.value,
        })
    },
    //点击志愿者须知
    checkboxChange: function (event) {
        if (this.data.form.checkbox == 1) {
            var up = "form.checkbox";
            this.setData({
                [up]: 2
            })
        } else {
            var up = "form.checkbox";
            this.setData({
                [up]: 1
            })
        }
    },
    //志愿者须知
    addVolunteerNotes: function () {
        wx.navigateTo({
            url: '../indexAddNotes/index'
        })
    },
    onLoad: function (options) {
        this.initValidate()
        console.log(this.WxValidate)

        var that = this;
        //获取高度
        that.setData({
            uuid: options.uuid
        });
    },
    showModal(error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
    },
    submitForm(e) {
        const params = e.detail.value
        // 传入表单数据，调用验证方法
        if (!this.WxValidate.checkForm(params)) {
            const error = this.WxValidate.errorList[0]
            this.showModal(error)
            return false
        } else {
            if (this.data.form.checkbox == '2') {
                this.showModal({
                    msg: '请先阅读并同意《志愿者须知》',
                })
            } else {
                var school_name = '';
                var major_class = '';
                var industry = '';
                if (this.data.form.identity == 0) {
                    school_name = params.school_name1
                    major_class = params.major_class1
                } else if (this.data.form.identity == 1) {
                    industry = params.industry1
                } else if (this.data.form.identity == 3) {
                    school_name = params.school_name2
                    major_class = params.major_class2
                    industry = params.industry2
                }
                var data = {
                    name: params.name,
                    sex: this.data.form.sex,
                    birthday: params.date,
                    educational_level: this.data.form.educational_level,
                    identity: this.data.form.identity,
                    school_name: school_name,
                    major_class: major_class,
                    industry: industry,
                    is_duty: this.data.form.is_duty,
                    service_time: this.data.form.service_time,
                    phone: params.phone,
                    domicile: params.domicile,
                    volunteer_team_id: this.data.uuid
                }
                httpRequest.requestHeader("volunteer/addVolunteer.do", data, function (data) {
                    if (data.status == 200) {
                        wx.showToast({
                            title: '提交成功！',
                            icon: 'succes',
                            duration: 1000,
                            mask: true
                        });
                        setTimeout(function () {
                            wx.navigateTo({
                                url: '../indexAddTip/index'
                            })
                        }, 1000) //延迟时间 
                    }
                });
            }
        }
    },
    initValidate() {
        // 验证字段的规则
        const rules = {
            name: {
                required: true,
            },
            date: {
                required: true,
            },
            phone: {
                required: true,
                tel: true
            },
            domicile: {
                required: true
            }
        }
        // 验证字段的提示信息，若不传则调用默认的信息
        const messages = {
            name: {
                required: '请输入姓名',
            },
            date: {
                required: '请选择时间',
            },
            phone: {
                required: '请输入联系方式',
                tel: '请输入正确的联系方式'
            },
            domicile: {
                required: '请输入居住地址',
            }
        }
        // 创建实例对象
        this.WxValidate = new WxValidate(rules, messages)
    },
})