<template>
  <div id="detail">
    <child-comps class="detail-nav" @titleClick="titleClick" ref="nav"></child-comps>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isshow"></back-top>
    <detail-botton-bar @addToCart="addToCart" />

  </div>
</template>

<script>
import childComps from "./childComps/childComps";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import detailShopInfo from "./childComps/detailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import detailCommentInfo from "./childComps/detailCommentInfo"
import DetailBottonBar from "./childComps/DerailBottonBar"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from 'components/content/goods/GoodsList';


import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
import {debounce} from "common/utils";
import {itemListenerMixin, backTopMixin} from "common/mixin"
import { mapActions } from 'vuex'

export default {
  name: "deTail",
  components: {
    childComps,
    DetailSwiper,
    DetailBaseInfo,
    detailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    detailCommentInfo,
    GoodsList,
    DetailBottonBar

  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{},
      commentInfo: {},
      recommends:[],
      themeTopYs: [],
      getThemeTopY: null
    };
  },
  created() {
    //1 保存传入的iid
    this.iid = this.$route.params.iid;
    //2 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播图
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      console.log(res);

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3. 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      // 4. 保存商品详情
      this.detailInfo = data.detailInfo;

      //5. 商品参数详情
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      //6. 取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0] || {};
      }
    });
    //3 请求推荐数据
    getRecommend().then(res =>{
     this.recommends = res.data.list
    })

    //4 给getThemTopY赋值（对给this.themeTopys的赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
  
    },100)
  },
  methods:{
    ...mapActions(['addCart']),
    detailImageLoad(){
      this.newRefresh(),
      this.getThemeTopY()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positoinY = -position.y

      let length = this.themeTopYs.length
      for(let i=0; i<length-1; i++){
         if(this.currentIndex !== i && (positoinY >= this.themeTopYs[i] && positoinY < this.themeTopYs[i+1])){
           this.currentIndex = i;
           this.$refs.nav.currentIndex = this.currentIndex
         }
      }
      //公共mixin.js
     this.listenShoBackTop(position)
    },
    addToCart(){
      //1 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.lowNowPrice;
      product.iid = this.iid;
      //2 将商品添加到购物车里
      this. addCart(product).then(res => {
        this.$toast.show(res)
 
      })

      //this.$store.dispatch('addCart', product).then(res => {
      //  console.log(res);
     // })
    }
  },
  destroyed(){
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  background-color: #fff;
  height: calc(100% - 44px - 49px);
}
</style>