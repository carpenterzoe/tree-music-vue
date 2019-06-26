<template>
  <div class="alphabet">
    <div class="list-shortcut">
      <ul>
        <li v-for="(item, index) in shortcutList" class="item" :key="item" 
        :ref="item" @click="clickCapital(index, $event)"
        @touchstart="touchStart" 
        @touchmove.stop.prevent="touchMove"
        @touchend.stop="touchEnd"
        :class="{'current': currentIndex == index}">
        <!-- TODO: 动态绑定属性，花括号 -->
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:['shortcutList', 'listIndex'],
  data() {
    return {
      startY: 0,
      currentIndex: 0
    }
  },
  updated(){
    this.startY = this.$refs['热'][0].offsetTop
  },
  methods: {
    // 点击字母，传对应字母给父组件，控制左边名字列表移动
    // e.target   当前触发事件的对象
    clickCapital(index, e){
      this.$emit('getCapital', e.target.innerText)
      this.currentIndex = index
    },
    touchStart(){
      this.touchStatus = true
    },
    touchMove(e){
      if(this.touchStatus){
        if(this.timer){
          clearTimeout(this.timer)
        }
        // 节流
        this.timer = setTimeout( () => {
          const touchY = e.touches[0].clientY -160
          const index = Math.floor((touchY - this.startY) / 20)

          if(index >= 0 && index < this.shortcutList.length){
            this.$emit('getCapital', this.shortcutList[index])
            this.currentIndex = index
          }
        }, 20)
      }
    },
    touchEnd(){
      this.touchStatus = false
    }
  },
  watch:{
    listIndex(newIndex){
      this.currentIndex = newIndex
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      // line-height: 1   根据字体大小设置行高
      color: $color-text-l
      font-size: $font-size-small
      width 20px
      height 20px
      box-sizing border-box
      &.current
        color: $color-theme
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
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
