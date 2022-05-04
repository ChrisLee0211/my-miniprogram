const dayjs = require('dayjs');
const { getLuckyNumbers } = require('./lib/index');
Component({
    data: {
        datetimeVisible: false,
        datetime: Number(new Date()),
        datetimeText: '今天',
        expireTime: '0天',
        expireTimePickerVisible:false,
        expireTypeOptions: [
            {label:'年',value:'year'},
            {label:'月',value:'month'},
            {label:'日',value:'day'},
        ],
        expireNumOptions: [],
        expireType: 'day',
        expirceNum: 0,
        deadline: '',
        luckyCount:1,
        isCounting:false,
        luckNumberGroups:[],
    },
    observers:{
        'expirceNum, expireType, datetime':function(expirceNum,expireType, datetime) {
            const targetDate = dayjs(datetime);
            const countResult = targetDate.add(expirceNum, expireType).format('YYYY-MM-DD')
            this.setData({
                deadline:countResult
            })
        }
    },
    methods: {
      onLoad: function(options) {
          const expireNumOptions:{label:string,value:any}[] = [];
          for(let i=0;i<100;i++) {
              expireNumOptions.push({
                  label:`${i}`,
                  value:i
              })
          }
          this.setData({expireNumOptions})
        // 页面创建时执行
      },
      onPullDownRefresh: function() {
        // 下拉刷新时执行
      },
      // 事件响应函数
      viewTap: function() {
        // ...
      },
      openTimePicker(){
        this.setData({datetimeVisible:true})
      },
      closeTimePicker(){
        this.setData({datetimeVisible:false})
      },
      onConfirm(e) {
        const { value, formatValue } = e?.detail;
        this.setData({
          datetime: value.valueOf(),
          datetimeText: formatValue,
          datetimeVisible:false,
        });
      },
      openExpiredPicker(){
        this.setData({expireTimePickerVisible:true})
      },
      onExpireCancel() {
        this.setData({expireTimePickerVisible:false})
      },
      onExpireConfirm(e){
            const result = e.detail.value as Array<{label:string,value:any}>;
            const type = result[0].label;
            const num = result[1].label;
            this.setData({
                expireTime:`${num}${type}`,
                expireType:result[0].value,
                expirceNum:num,
                expireTimePickerVisible:false,
            })
      },
      onLuckyCountChange(e) {
        this.setData({luckyCount: Number(e.detail.value)})
      },
      onStartGetLuckyNumber() {
        const count = this.data.luckyCount;
        this.setData({isCounting:true});
        getLuckyNumbers(count, [12,23,2,11]).then((res) => {
          console.log(res);
          this.setData({isCounting:false,luckNumberGroups:res});
        }).catch((err) => {
          console.error(err);
          this.setData({isCounting:false});
        })
      }
    }
  })