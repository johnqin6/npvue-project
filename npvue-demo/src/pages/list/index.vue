<template>
  <div class="listContainer">
    <swiper indicator-dots indicator-color="pink" indicator-active-color="green" autoplay>
      <swiper-item>
        <img src="/static/images/detail/carousel/01.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/images/detail/carousel/02.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/images/detail/carousel/03.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/images/detail/carousel/04.jpg" alt="">
      </swiper-item>
    </swiper>
    <div>
      <list-template
        v-for="(item, index) in list" 
        :key="index" 
        :item="item"
        :index="index">
      </list-template>
    </div>
  </div>
</template>
<script>
import listTemplate from '../../components/listTemplate'
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  components: {
    listTemplate
  },
  beforeMount () {
    this.$store.dispatch('getList')
  },
  computed: {
    // 映射状态到本组件
    ...mapState(['list'])
  }
}
</script>

<style scoped>
.listContainer swiper {
  width: 100%;
  height: 400rpx;
}

.listContainer swiper img {
  width: 100%;
  height: 100%;
}
</style>