<template>
  <div class="singer" >
    <singer-list :data="singers" :letter="letter"/>
    <alphabet @getCapital="getCapital" :shortcutList="shortcutList"/>
  </div>
</template>

<script>
import { getSingerList } from "src/api/singer"
import {ERR_OK} from 'src/api/config'
import Singer from 'common/js/singer'
import singerList from './components/singer-list'
import alphabet from './components/alphabet'

const HOT_NAME = "热门"
const HOT_SINGER_LEN = 10

export default{
  data(){
    return {
      singers: [],
      letter: ''
    }
  },
  components: {
    singerList,
    alphabet
  },
  created() {
    this._getSingerList()
  },

  // 之所以用 computed 而不在其他钩子执行，可以限制等确认有数据返回了才执行
  computed: {
    shortcutList(){
       if(this.singers && this.singers.length>0){
        let list = this.singers.map( item => {
          return item.title.substr(0, 1)
        })
        return list
      }
    }
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },

    //TODO: 字母序列化
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      
      list.forEach((item, index) => {
        if(index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if(!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
        }))
      })
      // map对象是无序的 处理map得到有序
      let hot = []
      let ret = []
      for(let key in map) {
        let val = map[key]
        if(val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        }else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    getCapital(letter){
      this.letter = letter 
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer{
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  overflow hidden
}
</style>
