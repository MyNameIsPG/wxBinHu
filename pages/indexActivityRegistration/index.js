import WxValidate from '../../utils/WxValidate.js'
var httpRequest = require('../../utils/request.js');
const App = getApp()
Page({
    data: {
        uuid: '',
        form: {
            name: '',
            age: '',
            address: '',
            people_number: ''
        },
    },
    onLoad: function (options) {
        this.initValidate()
        var that = this;
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
            var data = {
                activity_id: this.data.uuid,
                name: params.name,
                age: params.age,
                address: params.address,
                people_number: params.people_number
            }
            httpRequest.requestHeader("activityregistration/addActivityRegistration.do", data, function (data) {
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
    },
    initValidate() {
        // 验证字段的规则
        const rules = {
            name: {
                required: true,
            },
            age: {
                required: true,
                number: true,
            },
            address: {
                required: true,
            },
            people_number: {
                required: true,
                number: true,
            }
        }
        // 验证字段的提示信息，若不传则调用默认的信息
        const messages = {
            name: {
                required: '请输入姓名',
            },
            age: {
                required: '请输入年龄',
                number: '请输入正确的年龄（数字）',
            },
            address: {
                required: '请输入地址',
            },
            people_number: {
                required: '请输入报名人数',
                number: '请输入正确的报名人数（数字）',
            }
        }
        // 创建实例对象
        this.WxValidate = new WxValidate(rules, messages)
    },
})