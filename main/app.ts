App({
    onLaunch (options) {
        console.log(options)
      // Do something initial when launch.
    },
    onShow (options) {
      // Do something when show.
    },
    onHide () {
      // Do something when hide.
    },
    onError (msg) {
      console.log(msg)
    },
    globalData: 'I am global data'
  })