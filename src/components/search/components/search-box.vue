<template>
  <div class="search-box-wrapper" >
    <div class="search-box">
      <i class="icon-search"></i>
      <input class="box" v-model="keyword" placeholder="搜索歌曲、歌手">
      <i @click="removeKeyword" class="icon-dismiss" v-show="keyword"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['hotwords'],
    data() {
      return{
        keyword: ''
      }
    },
    watch:{
      keyword (){
        this.$emit('searchKeyword', this.keyword)
      },
      hotwords(){
        this.keyword = this.hotwords
      }
    },
    methods: {
      removeKeyword (){
        this.keyword = ''
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.search-box-wrapper
  margin 20px
  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      outline: 0;
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>