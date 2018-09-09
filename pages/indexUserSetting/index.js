import WxValidate from '../../utils/WxValidate.js'
var dateTimePicker = require('../../utils/dateTimePicker.js');
var httpRequest = require('../../utils/request.js');
const App = getApp()
Page({
    data: {
        dateTime: '',
        form: {
            uuid: '',
            head_url: '',
            nick_name: '',
            real_name: '',
            phone: '',
            card_number: '',
            birthday: '',
            domicile: '',
            industry: '',
            vocation: '',
        },
    },
    changeDateTime(e) {
        this.setData({ dateTime: e.detail.value });
    },
    //时间控件
    bindDateChange: function (e) {
        var up = "form.birthday";
        this.setData({
            [up]: e.detail.value
        })
    },
    onLoad() {
        this.initValidate()

        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj1.dateTimeArray.pop();
        var lastTime = obj1.dateTime.pop();

        this.setData({
            dateTime: obj.dateTime,
            dateTimeArray: obj.dateTimeArray,
            dateTimeArray1: obj1.dateTimeArray,
            dateTime1: obj1.dateTime
        });
        var that = this;
        var app = getApp();
        httpRequest.requestHeader("user/queryUser.do", { uuid: app.globalData.globalUserId}, function (data) {
            if (data.status == 200) {
                var uuid = "form.uuid";
                var head_url = "form.head_url";
                var nick_name = "form.nick_name";
                var real_name = "form.real_name";
                var phone = "form.phone";
                var card_number = "form.card_number";
                var birthday = "form.birthday";
                var domicile = "form.domicile";
                var industry = "form.industry";
                var vocation = "form.vocation";
                that.setData({
                    [uuid]: data.data.uuid,
                    [head_url]: data.data.head_url,
                    [nick_name]: data.data.nick_name,
                    [real_name]: data.data.real_name,
                    [phone]: data.data.phone,
                    [card_number]: data.data.card_number,
                    [birthday]: data.data.birthday,
                    [domicile]: data.data.domicile,
                    [industry]: data.data.industry,
                    [vocation]: data.data.vocation,
                })
            }
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
            //var booking_time = dateTimeArray[0][dateTime[0]] + '-' + dateTimeArray[1][dateTime[1]] + '-' + dateTimeArray[2][dateTime[2]] + ' ' + dateTimeArray[3][dateTime[3]] + ':' + dateTimeArray[4][dateTime[4]] + ':' + dateTimeArray[5][dateTime[5]]
            console.log(params)
            var data = {
                uuid: this.data.form.uuid,
                nick_name: params.nick_name,
                real_name: params.real_name,
                phone: params.phone,
                card_number: params.card_number     ,
                birthday: params.birthday,
                domicile: params.domicile,
                industry: params.industry,
                vocation: params.vocation,
            }
            httpRequest.requestHeader("user/updateUser.do", data, function (data) {
                if (data.status == 200) {
                    wx.showToast({
                        title: '提交成功！',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                    });
                    setTimeout(function () {
                        if (getCurrentPages().length != 0) {
                            getCurrentPages()[getCurrentPages().length - 1].onLoad()
                        }
                    }, 1000) //延迟时间 
                }
            });
        }
    },
    initValidate() {
        // 验证字段的规则
        const rules = {
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
            phone: {
                required: '请输入联系电话',
                tel: '请输入正确的联系电话'
            },
        }
        // 创建实例对象
        this.WxValidate = new WxValidate(rules, messages)
    },
})