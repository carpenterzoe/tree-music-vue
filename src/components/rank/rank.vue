<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="toplist">
      <ul>
        <li class="item" v-for="item in topList" @click="seletItem(item)" :key="item.id">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList" :key="song.songname">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {ERR_OK} from 'src/api/config'
import {getTopList} from 'src/api/rank'
import Scroll from 'src/base/scroll/scroll'
import Loading from 'src/base/loading/loading'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'


export default {
  data() {
    return {
      topList: []
    }
  },
  // 当前页面的methods会覆盖mixin里的methods同名方法
  mixins: [playListMixin],
  components: {
    Scroll,
    Loading
  },
  created() {
    this._getTopList()
  },
  methods: {
    // 跳转详情列表页
    seletItem(item) {
      this.$router.push({path: `/rank/${item.id}`})
      this.setTopList(item)
    },
    // 有小播放器时 改变列表的bottom
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.toplist.refresh()
    },
    _getTopList() {
      getTopList().then(res => {
        if(res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      })
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style> 

