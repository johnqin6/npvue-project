<template>
  <div>
    <div class="moviesContainer"
      @tap="toMoviesDeatil(index)"
      v-for="(item, index) in moviesList" :key="index">
      <img :src="item.images.large" alt="" class="movies-img">
      <div class="movies-info">
        <p class="movies-name">{{ item.original_title }}</p>
        <p class="movies-year">年份：{{ item.year }}</p>
        <p class="movies-dir">导演：{{ item.directors[0].name }}</p>
      </div>
      <p class="movies-rating">{{ item.rating.average }}</p>
    </div>
  </div>
</template>

<script>
const MOVIE_URL = 'http://t.yushu.im/v2/movie/top250'

export default {
  data () {
    return {
      moviesList: []
    }
  },
  beforeMount () {
    this.$fly.get(MOVIE_URL)
      .then(res => {
        console.log(res)
        let moviesData = res.data.subjects
        this.$store.dispatch('getMoviesList', moviesData)
        this.moviesList = moviesData
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    toMoviesDeatil (index) {
      wx.navigateTo({
        url: '/pages/movieDetail/main?index=' + index
      })
    }
  }
}
</script>

<style scoped>
.moviesContainer {
  display: flex;
  padding: 10rpx;
  border-bottom: 1rpx solid #eee;
}

.movies-img {
  width: 128rpx;
  height: 128rpx;
  margin-right: 20rpx;
}

.movies-info {
  width: 70%;
}

.movies-name {
  font-size: 32rpx;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movies-year {
  margin: 5rpx 0;
  font-size: 28rpx;
  color: #999;
}

.movies-dir {
  font-size: 30rpx;
  color: #666;
}

.movies-rating {
  font-size: 36rpx;
  font-weight: bold;
  color: red;
}
</style>
