<template>
  <div class="search">
    <search-box :hotwords="hotwords" @searchKeyword="searchKeyword"/>
    <hot-words v-show="showHotwords" :hotkey="hotkey" @clickKeywords="clickKeywords"/>
    <search-result :result="result" :hasMore="showHotwords"/>
  </div>
</template>

<script>
import {getHotKey, search} from 'src/api/search'
import {ERR_OK} from 'src/api/config'
import searchBox from './components/search-box'
import hotWords from './components/hot-words'
import searchResult from './components/search-result'
import { processSongsUrl } from 'src/api/handleurl'
import { createSong } from 'src/common/js/song'
const TYPE_SINGER = 'singer'

export default{
  data(){
    return{
      hotkey: [],
      hotwords: '',
      keyword: '',
      result: [],
      showHotwords: true,
      //hasMore: false
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    _getHotKey(){
      getHotKey().then(res => {
        if(res.code === ERR_OK) {
         this.hotkey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    // 点击热门搜索词，从子组件 保存关键字到该组件
    clickKeywords(hotwords){
      this.hotwords = hotwords
    },
    // 保存搜索框的关键字到data
    searchKeyword(keyword){
      this.keyword = keyword
    },
    // 搜索结果
    searchResult() {
      this.hasMore = true
      this.page = 1
      search(this.keyword, 1, true, 20).then(res =>{
        if (res.code === ERR_OK) {
          this._getResult(res.data).then(result => {
            this.result = result
          })
        }
      })
    },
    
    _getResult(data) {
      return new Promise((resolve) => {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
        }
        if (data.song) {
          let songList = this._normalizeSongs(data.song.list)
          processSongsUrl(songList).then(res => {
            songList = res
            resolve(ret.concat(songList))
          })
        }
      })
    },
     _normalizeSongs(list) {
      let ret = []
      list.forEach(v => {
        if (v.songid && v.albumid) {
          ret.push(createSong(v))
        }
      })
      return ret
    },
  },  
  watch:{
    keyword(){
      this.searchResult()
      if(this.keyword === ''){
        this.showHotwords = true
      }else{
        this.showHotwords = false
      }
    }
  },
  components:{
    searchBox,
    hotWords,
    searchResult
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>

