const dayjs = require('dayjs');

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
        deadline: ''
    },
    observers:{
        'expirceNum, expireType, datetime':function(expirceNum,expireType, datetime) {
            console.log('expirceNum',expirceNum)
            console.log('expireType',expireType)
            console.log('datetime',datetime);
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
        console.log('formatValue ===>', formatValue);
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
      }
    }
  })