<template>
  <div class="toast-bar" v-show="isshow">
    <div > {{meassage}} </div>
  </div>
</template>

<script>
export default {
  name:"Toast",
  props:{
      //meassage:{
         // type:String,
        //  default:''
    //  },
   //   show:{
      //    type:Boolean,
     //     default:false
    //  }
  },
  data(){
    return {
        meassage:'',
        isshow: false
    }
  },
  methods: {
      show(meassage="默认文字", duration="2000") {
          this.isshow = true;
          this.meassage = meassage;
          
          setTimeout(() =>{
              this.isshow = false;
              this.meassage = ''
          },duration)
      }
  }
}
</script>

<style scoped>
.toast-bar{
    position: fixed;
    top: 50%;
    left: 50%;
    padding:  8px 10px;
    z-index: 999;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,.75);
}
</style>