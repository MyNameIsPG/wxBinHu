import WxValidate from '../../utils/WxValidate.js'
var dateTimePicker = require('../../utils/dateTimePicker.js');
var httpRequest = require('../../utils/request.js');
const App = getApp()
Page({
    data: {
        dateTime: '',
        form: {
            type: '0',
            date: '2018-05-04',
            educational_level: '0',
            identity: '0',
            school_name1: '',
            book_type: '0',
            phone: '',
            remark: ''
        },
        type: [
            '环境保护',
            '老人关爱',
            '手工课堂',
            '科创园地',
            '亲子活动',
            '家电维修'
        ],
        book_type: [
            '家电维修',
            '水管维修',
            '下水道维修',
            '水龙头维修'
        ]
    },
    changeDateTime(e) {
        this.setData({ dateTime: e.detail.value });
    },
    //服务类型
    bindEducationChange: function (e) {
        var up = "form.type";
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
    bindEducationChange1: function (e) {
        var up = "form.book_type";
        this.setData({
            [up]: e.detail.value,
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
    },


    showModal(error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
    },
    submitForm(e) {
        const params = e.detail.value
        console.log(params)
        // 传入表单数据，调用验证方法
        if (!this.WxValidate.checkForm(params)) {
            const error = this.WxValidate.errorList[0]
            this.showModal(error)
            return false
        } else {
            var arr = [
                "153049720572388",
                "153049724075277",
                "153049725197393",
                "153049726659970",
                "153049728164352",
                "153049730503275"
            ]
            var dateTimeArray = this.data.dateTimeArray;
            var dateTime = this.data.dateTime;
            var booking_time = dateTimeArray[0][dateTime[0]] + '-' + dateTimeArray[1][dateTime[1]] + '-' + dateTimeArray[2][dateTime[2]] + ' ' + dateTimeArray[3][dateTime[3]] + ':' + dateTimeArray[4][dateTime[4]] + ':' + dateTimeArray[5][dateTime[5]]
            var data = {
                type: arr[params.type],
                address: params.domicile,
                booking_time: booking_time,
                phone: params.phone,
                remark: params.remark,
                book_type: this.data.form.book_type
            }
            httpRequest.requestHeader("bookService/addBookingService.do", data, function (data) {
                if (data.status == 200) {
                    wx.showToast({
                        title: '提交成功！',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                    });
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
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
            domicile: {
                required: '请输入居住地址',
            }
        }
        // 创建实例对象
        this.WxValidate = new WxValidate(rules, messages)
    },
})