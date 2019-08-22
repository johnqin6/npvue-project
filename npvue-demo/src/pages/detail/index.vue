<template>
  <div class="detailContainer">
    <img 
      :src="isMusicPlay ? detailObj.music.coverImgUrl : detailObj.detail_img" 
      alt="" class="detail-img">
    <img
      @tap="handleMusicPlay"
      :src="isMusicPlay? '/static/images/music/music-start.png' : '/static/images/music/music-stop.png'" 
      alt="" class="music-img">
    <div class="avatar-date">
      <img :src="detailObj.avatar" alt="">
      <span>{{ detailObj.author }}</span>
      <span>发布于</span>
      <span>{{ detailObj.date }}</span>
    </div>
    <p class="company">公司</p>
    <div class="collection-share-container">
      <div class="collection-share">
        <img @tap="handleCollection" 
          :src="isCollected ? '/static/images/icon/collection.png' : '/static/images/icon/collection-anti.png'" 
          alt="">
        <img @tap="handleShare" src="/static/images/icon/share-anti.png" alt="">
      </div>
      <div class="line"></div>
    </div>
    <Button open-type="share">转发此文章</Button>
    <p class="content">{{ detailObj.detail_content }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import isPlayObj from '../../datas/isPlay'

export default {
  data () {
    return {
      detailObj: {},
      isCollected: false, // 标识文章是否被收藏
      isMusicPlay: false // 标识音乐是否播放
    }
  },
  computed: {
    ...mapState(['list'])
  },
  beforeMount () {
    console.log(this)
    this.index = this.$mp.query.index

    // 预处理工作：本地是否收藏的缓存
    let oldStorage = wx.getStorageSync('isCollected')
    if (!oldStorage) {
      wx.setStorage({
        key: 'isCollected',
        data: {}
      })
    } else { // 已缓存
      this.isCollected = (oldStorage[this.index])
    }

    // 判断当前页面加载的时候音乐是否在播放
    isPlayObj.pageIndex === this.index && isPlayObj.isPlay ? this.isMusicPlay = true : this.isMusicPlay = false

    // 监听音乐的播放和暂停
    wx.onBackgroundAudioPlay(() => {
      console.log('音乐播放')
      // 修改状态
      this.isMusicPlay = true
      isPlayObj.pageIndex = this.index
      isPlayObj.isPlay = true
    })
    wx.onBackgroundAudioPause(() => {
      console.log('音乐暂停')
      this.isMusicPlay = false
      isPlayObj.isPlay = false
    })
  },
  mounted () {
    // 获取详情数据
    this.detailObj = this.list[this.index]
  },
  methods: {
    // 收藏
    handleCollection () {
      // 修改状态
      let isCollected = !this.isCollected
      this.isCollected = isCollected
      let title = isCollected ? '收藏成功' : '取消收藏'
      wx.showToast({
        title,
        icon: 'success'
      })

      // 读取之前本地缓存的状态查看是否收藏
      let oldStorage = wx.getStorageSync('isCollected')
      oldStorage[this.index] = isCollected
      // 将本次设置的结果再缓存到本地
      wx.setStorage({
        key: 'isCollected',
        data: oldStorage
      })
    },
    // 音乐播放事件
    handleMusicPlay () {
      let isMusicPlay = !this.isMusicPlay
      this.isMusicPlay = isMusicPlay
      let { dataUrl, title } = this.detailObj.music
      if (isMusicPlay) {
        wx.playBackgroundAudio({
          dataUrl,
          title
        })
      } else {
        wx.pauseBackgroundAudio()
      }
    },
    // 分享
    handleShare () {
      wx.showActionSheet({
        itemList: [
          '分享到朋友圈', '分享到微博', '分享给微信好友'
        ]
      })
    }
  }
}
</script>

<style scoped>
.detailContainer {
  display: flex;
  flex-direction: column;
}

.detail-img {
  width: 100%;
  height: 460rpx;
}

.avatar-date {
  padding: 10rpx;
}

.avatar-date img {
  width: 64rpx;
  height: 64rpx;
  vertical-align: middle;
}

.avatar-date span {
  font-weight: 28rpx;
  margin-left: 6rpx;
}

.company {
  padding: 10rpx;
  font-size: 32rpx;
  font-weight: bold;
}

.collection-share-container {
  position: relative;
}

.collection-share {
  float: right;
  margin-right: 30rpx;
}

.collection-share img {
  width: 90rpx;
  height: 90rpx;
  margin-right: 20rpx;
}

.line {
  position: absolute;
  top: 45rpx;
  left: 5%;
  width: 90%;
  height: 1rpx;
  background: #eee;
  z-index: -1;
}

.content {
  font-size: 32rpx;
  text-indent: 32rpx;
  letter-spacing: 3rpx;
  line-height: 50rpx;
}

.music-img {
  width: 60rpx;
  height: 60rpx;
  position: absolute;
  top: 200rpx;
  left: 50%;
  margin-left: -30rpx;
}
</style>
