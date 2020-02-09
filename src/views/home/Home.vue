<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="TabControl1"
      class="tab-control"
      v-show="isTabFixed"
      ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"
      @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="TabControl2"
      ></tab-control>
      <good-list :goods="showGoods" ></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";


import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "common/utils";
import {itemListenerMixin}  from "common/mixin"
 
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isshow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed(){
   // console.log('home destroyed');
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated(){
    // 1 保存Y值
    this.saveY = this.$refs.scroll.getCurrentY()
    
    //2 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  created() {
    console.log('home created');
    //请求多个数据

    this.getHomeMultidata();
    //请求多个商品数据

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    //监听item中图片加载完成
    /*但是在created函数中会经常出现一些问题，原本this.$refs.scroll在在created中是空值，
    因为有on回调函数，才会出现值，但有时候也会出现bug所以我们把这个函数放在mounted中
    */
  },
  mounted() {
    // 1 图片加载完成的事件监听
   // const refresh = debounce(this.$refs.scroll.refresh, 50);
    
    // 对监听事件进行保存
  //  this.itemImgListener =  () => {     
    //   refresh()
  //  }
   // this.$bus.$on("itemImageLoad",this.itemImgListener)
      //console.log('111');
      // 因为执行的太频繁所以进行防抖debounce封装，让他执行的不频繁
  },
  methods: {
    
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.TabControl1.currentIndex = index;
      this.$refs.TabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1 判断是否显示
      this.isshow = -position.y > 1000;
      //  2 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el: 用于获取组件中的元素
      this.isTabFixed = (-position.y) > this.tabOffsetTop

    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop;
    },

    /**
     *  网络请求
     */

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //上拉加载更多
        this.$refs.scroll.finishPullUp();
        //this.$refs.scroll.scroll.finisPullUp()   可以进行在scroll.vue中一个简单的封装在methods中
      });
    }
  }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
  background-color: #fff;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}


</style>
