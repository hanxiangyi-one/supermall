<template>
  <div class="weapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:"Scroll",
  props: {
     probeType:{
         type: Number,
         default: 0
     },
     pullUpLoad:{
         type: Boolean,
         default: false
     },
     data:{
         type:Array,
         default:() => {
             return []
         }
     }
  },
  data(){
      return {
          scroll: null,
          message: 'hhh'
      }
  },
  mounted() {
      this.scroll = new BScroll(document.querySelector('.weapper'),{
          probeType: this.probeType,
          click:true,
          pullUpLoad: this.pullUpLoad
      })
      //监听滚动位置
      this.scroll.on('scroll',(position) => {
          //console.log(position)
          this.$emit('scroll', position)
      })
      this.scroll.on('pullingUp',() =>{
          
          this.$emit('pullingUp')
      })
    
  },
  methods: {
     scrollTo(x, y, time=300){
      this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {

      this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      finishPullUp(){
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      getCurrentY() {
          return this.scroll.y ? this.scroll.y : 0
      }
  },
  watch:{
      data(){
          setTimeout(this.refresh,20)
      }
  }
}
</script>

<style scoped>

</style>>
