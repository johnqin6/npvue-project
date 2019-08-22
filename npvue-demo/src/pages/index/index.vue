<template>
  <div class="indexContainer">
    <img v-if="isShow" :src="userInfo.avatarUrl" class="index_img">
    <Button class="btn" v-else open-type="getUserInfo" @getuserinfo="getUserInfo">点击获取用户信息</Button>
    <p class="userName">hello {{ userInfo.nickName}}</p>
    <div class="goStudy" @tap="toList">
      <p>开启小程序之旅</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {},
      // 用户没有授权
      isShow: false
    }
  },
  beforeMount () {
    // 获取用户登录信息
    this.handleGetUserInfo()
  },
  methods: {
    // 获取用户登录信息
    handleGetUserInfo () {
      wx.getUserInfo({
        success: data => {
          console.log(data)
          this.userInfo = data.userInfo
          this.isShow = true
        },
        fail: () => {
          console.log('获取失败')
        }
      })
    },
    getUserInfo (data) {
      // 判断用户是否授权
      if (data.mp.detail.rawData) {
        // 用户授权
        this.handleGetUserInfo()
      }
    },
    toList () {
      // wx.navigateTo({
      //   url: '/pages/list/main'
      // })
      wx.switchTab({
        url: '/pages/list/main'
      })
    }
  }
}
</script>

<style scoped>
page {
  background: #8ed145;
}

.indexContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.index_img {
  width: 200rpx;
  height: 200rpx;
  border-radius: 100rpx;
  margin: 100rpx 0;
}

.userName {
  font-size: 40rpx;
  font-weight: bold;
  margin: 100rpx 0;
}

.goStudy {
  width: 220rpx;
  height: 80rpx;
  border: 1rpx solid #eee;
  border-radius: 10rpx;
  font-size: 24rpx;
  line-height: 80rpx;
  text-align: center;
}

.btn {
  width: 300rpx;
  height: 300rpx;
  border-radius: 150rpx;
  margin: 50rpx 0;
  line-height: 300rpx;
  text-align: center;
  font-size: 26rpx;
}
</style>