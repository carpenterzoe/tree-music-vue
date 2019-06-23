<template>
  <div class="hot-key">
    <h1 class="title">热门搜索</h1>
    <ul>
      <li @click="clickKeywords" v-for="item in hotkey" class="item" :key="item.n">
        <span>{{item.k}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['hotkey'],
  data() {
    return {
      
    }
  },
  methods: {
    clickKeywords(e){
      this.$emit('clickKeywords', e.target.innerText)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.hot-key
  margin: 0 20px 20px 20px
  .title
    margin-bottom: 20px
    font-size: $font-size-medium
    color: $color-text-l
  .item
    display: inline-block
    padding: 5px 10px
    margin: 0 20px 10px 0
    border-radius: 6px
    background: $color-highlight-background
    font-size: $font-size-medium
    color: $color-text-d
</style>
