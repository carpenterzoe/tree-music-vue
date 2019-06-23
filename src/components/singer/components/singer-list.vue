<template>
  <div class="singer-list" ref="wrapper">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup" :key="group.title">
        <h2 :ref="group.title" class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="item in group.items" 
          :key="item.id" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div> -->
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import loading from 'src/base/loading/loading'

export default {
  props: ['data', 'letter'],
  data() {
    return {

    }
  },
  components: {
    loading
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true
    })
  },
  watch: {
    letter(){
      if(this.letter === '热'){
        this.scroll.scrollToElement(this.$refs['热门'][0])
      }else{
        this.scroll.scrollToElement(this.$refs[this.letter][0])
      }
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
</style>
