<template>
   <div class="bottom-bar">
      <div class="check-content">
         <chenk-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
         <span>全选</span>
      </div>

      <div class="price">
          合计: {{totalParce}}
      </div>

      <div class="calculate" @click="calcClick">去计算 ({{checkLength}})</div>
   </div>
</template>

<script>
import ChenkButton from "components/content/chenkButton/chenkButton";

export default {
  name: "CartBoottomBar",
  components: {
    ChenkButton
  },
  computed:{
      totalParce(){
          return '￥' + this.$store.state.cartList.filter(item =>{
              return item.checked
          }).reduce((preValue, item) =>{
              return preValue + item.price * item.count
          }, 0)
      },
      checkLength(){
          return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
          if (this.$store.state.cartList.length === 0) return false
          return !(this.$store.state.cartList.filter(item => !item.checked).length)
      }
  },
  methods:{
      checkClick(){
          if(this.isSelectAll) {
              this.$store.state.cartList.forEach(item => item.checked = false)
          } else {
              this.$store.state.cartList.forEach(item => item.checked = true)
          }
      },
      calcClick(){
          if(!this.isSelectAll){
              this.$toast.show('请选择购买的商品')
          }
      }
  }
};
</script>

<style scoped>
.bottom-bar{
    height: 40px;
    background-color:#eee;
    position: relative;
    display: flex;
    font-size: 14px;
    
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
}
.check-button{
    height: 20px;
    widows: 20px;
    line-height: 20px;
    margin-right: 7px;
}
.price{
    margin-left: 20px;
    margin-top: 13px;
    
    flex: 1;
}
.calculate{
   width: 90px;
   background-color: red;
   color: #fff;
   text-align: center;
   line-height: 34px;  
}
</style>