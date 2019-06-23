<template>
  <div class="search">
    <search-box :hotwords="hotwords" @searchKeyword="searchKeyword"/>
    <hot-words :hotkey="hotkey" @clickKeywords="clickKeywords"/>
    <!-- <search-result /> -->
  </div>
</template>

<script>
import {getHotKey} from 'src/api/search'
import {ERR_OK} from 'src/api/config'
import searchBox from './components/search-box'
import hotWords from './components/hot-words'
import searchResult from './components/search-result'

export default{
  data(){
    return{
      hotkey: [],
      hotwords: '',
      keyword: ''
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
    clickKeywords(hotwords){
      this.hotwords = hotwords
    },
    searchKeyword(keyword){
      this.keyword = keyword
      console.log(keyword)
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

