<template>
  <div class="container">
    <div v-if="recommends.length" class="swiper-wrap">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in recommends" :key="item.id">
          <img class="item-img" :src="item.picUrl">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  props: ['recommends'],
  data(){
    return{
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
        },
        loop: true,
      },
    }
  },
  components: {
    swiper,
    swiperSlide
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.container >>> .swiper-pagination-bullet-active{
  background-color #fff
  width 20px
  border-radius 5px
  background $color-theme
}
.item-img{
  width 100%
}
</style>
