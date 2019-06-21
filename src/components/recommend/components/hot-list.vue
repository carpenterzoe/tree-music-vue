<template>
  <div class="container">
    <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul>
        <li v-for="item in discList" class="item" :key="item.dissid">
          <div class="icon">
            <img v-lazy="item.imgurl" alt="" style="width:60px;height:60px;">
          </div>
          <div class="text">
            <h2 class="name" v-html="item.creator.name"></h2>
            <p class="desc" v-html="item.dissname"></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="loading-container" v-show="!discList.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Loading from 'src/base/loading/loading'
export default {
  props: ['discList'],
  data() {
    return {

    }
  },
  components: {
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.recommend-list {
  .list-title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-theme;
  }
  .item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
    .icon {
      flex: 0 0 60px;
      width: 60px;
      padding-right: 20px;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      font-size: $font-size-medium;
      .name {
        margin-bottom: 10px;
        color: $color-text;
      }
      .desc {
        color: $color-text-d;
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
