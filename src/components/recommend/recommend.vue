<template>
  <div class="recommend" ref="wrapper">
    <div>
      <sub-swiper :recommends="recommends"/>
      <hot-list :discList="discList"/>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { getRecommend, getDiscList } from 'src/api/recommend'
  import { ERR_OK } from 'src/api/config'
  import subSwiper from './components/sub-swiper'
  import hotList from './components/hot-list'
  
  export default {
    data(){
      return{
        recommends: [],
        discList: []
      }
    },
    components: {
      subSwiper,
      hotList
    },
    created(){
      this._getRecommend(),
      this._getDiscList()
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true
      })
      // console.log(this.scroll)
      // scroll实现效果，父级也必须要有高度，且比子元素高度小。
    },
    methods: {
      _getRecommend() {
        getRecommend().then(res => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then(res => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.recommend{
  height: 648px;
  overflow: hidden;
}
</style>