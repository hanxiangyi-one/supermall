<template>
  <div class="goods-item">
     <!--通过@load监听图片加载完成-->
    <img v-lazy="showImage" alt="" @load="imageLoad" @click="itemClick"/>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  computed:{
     showImage(){
       return this.goodsItem.image || this.goodsItem.show.img || this.goodsItem.img
     }
  },
  methods:{
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
     // console.log(this.$bus);  $bus原本是没有意思的但我们在main.vue中通过Vue.prototype.$bus = new Vue()将它赋值成一个函数，通过$emit将它发射出去，
     //home在通过on来监听
     //if (this.$route.path.indexOf('/home')) {
         //  this.$bus.$emit('homeitemImageLoad')
   //  } else if (this.$route.path.indexOf('/detail')){
    //   this.$bus.$emit('detailInemageLoad')
    // }
      
    },
    itemClick(){
     this.$router.push('/deTail/' + this.goodsItem.iid)
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>