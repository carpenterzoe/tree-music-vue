<template>
  <div class="singer-list" ref="wrapper">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup" :key="group.title">
        <h2 :ref="group.title" class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li :ref="item.name"  @click="selectItem(item)" v-for="item in group.items" 
          :key="item.id" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- TODO: 不同字母随着屏幕滑动固定在顶部，功能还没实现 -->
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>

    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import loading from 'src/base/loading/loading'
const TITLE_HEIGHT = 30

export default {
  props: ['data', 'letter'],
  data() {
    return {
      // fixedTitle: false,
      listHeight: [], // 每个区块的高度， 热门 A B C D
      scrollY: -1,
      diff: -1,
      listIndex: 0
    }
  },
  components: {
    loading
  },
  mounted () {
    
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: 3
    })

    this.scroll.on('scroll', (pos)=>{
      this.scrollY = pos.y
    })
    
  },
  methods: {
    _calculateHeight() {    // 分别算出每个区块的高度
      this.listHeight = []
      const list = this.$refs.listGroup // 每个区块dom元素 热门 A B C 等等
      let height = 0
      this.listHeight.push(height)

      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight // 元素的高度，每个区块
        this.listHeight.push(height)    // 把每个区块高度存到数组
      }
    },
  },
  watch: {
    letter(){
      if(this.letter === '热'){
        this.scroll.scrollToElement(this.$refs['热门'][0])
      }else{
        this.scroll.scrollToElement(this.$refs[this.letter][0])
      }
    },
    data() {    // 数据和dom是异步更新
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    listIndex(newIndex){
      this.$emit('getListIndex', newIndex)
    },


    // TODO: 这里的 scroll diff 的方法，还需要重点理解。

    scrollY(newY){    // newY 即pos.y 整个scroll滚动的位置，往中间滚动是负数
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0，往中间滚动时 是负值
      if (newY > 0) {
        this.listIndex = 0
        return
      }
      // 在中间部分滚动
      // 遍历每个区间的高度，用 i  i+1 高度的差值判断，滚动高度是否落在这个区间
      for (let i = 0; i < listHeight.length - 1; i++) {
        // console.log(listHeight[0])  //  i=0   热门
        // console.log(listHeight[1])  //  i=0
        
        // console.log(listHeight[1])  // i=1   A
        // console.log(listHeight[2])  // i=1
        
        let height1 = listHeight[i] 
        let height2 = listHeight[i + 1] 

        // 判断scroll 滚动位置的区间
        if (-newY >= height1 && -newY < height2) {
          this.listIndex = i

          // 每次 scrollY 变动，会计算 diff
          this.diff = height2 + newY  // newY 是负数，所以这里是 某区间的y值 - scroll y值

          // 区间底部y值是固定值，scroll y值随着滚动而变化。
          // diff值 = 区间底部y值 - scroll y值
          // 当区间底部y值 - scroll y值 < 顶部固定的宽度30，表示滚上来的部分 顶到了顶部区块
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.listIndex = listHeight.length - 2
    },

    // diff值 = 区间底部y值 - scroll y值，newVal 取值范围 0 ~ 30
    diff(newVal) {

      // 区间底部y值是固定值，scroll y值随着滚动而变化。
      // diff值 = 区间底部y值 - scroll y值
      // 当区间底部y值 - scroll y值 < 顶部固定的宽度30，表示滚上来的部分 顶到了顶部区块

      // fixedTop 取值   -30 ~ 0
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      
      // console.log(fixedTop + '@@1')
      // 当滚动到 比如 A B 区间的部分，不需要 挤动顶部栏（修改dom translateY），
      // 所以在这种情况 避免修改dom，直接return，提高性能。
      
      if (fixedTop === 0) return

      // console.log(fixedTop + '@@2')
      
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      // 在移动端开发中，直接使用transition动画会让页面变慢甚至卡顿，
      // 所以我们通常添加transform:translate3D(0,0,0)或transform:translateZ(0)
      // tasnslate3d 在移动端会开启手机本身GPU硬件加速，让动画过程更加流畅。
    }
  },
  computed:{
    fixedTitle(){
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.listIndex] ? this.data[this.listIndex].title : ''
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.singer-list
  position relative
  height 650px
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
</style>
