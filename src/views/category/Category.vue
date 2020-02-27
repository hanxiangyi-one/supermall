<template>
<div id="category">
	<nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
	<!--分类侧边栏-->
	<div class="content1">
		<tab-menu :categories="categories" @selectItem="selectItem"/>
	
	
	
		<scroll id="tab-content" :data="[categoryData]">
		
				<tab-content-category :subcategories="showSubcategory"></tab-content-category>
				<tab-control :titles="['综合','新品','销量']"
				@tabClick="tabClick"
				></tab-control>
				<tab-content-detail></tab-content-detail>
				
		</scroll>	
	</div>	
</div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'

import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'
import TabContentDetail from './childComps/TabContentDetail'

import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
import {POP, SELL, NEW} from "common/const";
import {tabControlMixin} from "common/mixin";

export default {
  name:"Category",
  components:{
	  NavBar,
	  TabMenu,
	  Scroll,
	  TabControl,
	  TabContentCategory,
	  TabContentDetail
  },
  mixins:[tabControlMixin],
  data(){
	  return{
		  categories: [],
		  categoryData:{},
		  currentIndex: -1
	  }
  },
  created(){
    this._getCategory()
  },
  computed:{
	  showSubcategory(){
		  if(this.currentIndex === -1) return{}
		  return this.categoryData[this.currentIndex].subcategories
	  },
	  showCategoryDetail(){
		  if(this.currentIndex === -1) return []
		  return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
	  }
  },
  methods:{
	  _getCategory(){
		  getCategory().then(res =>{
			  //获取分类的数据
		  this.categories = res.data.category.list
		  console.log(this.categories)
		  // 2 初始化每个类别的子数据
		  for (let i = 0; i<this.categories.length; i++){
			  this.categoryData[i] = {
				  subcategories:{},
				  categoryDetail:{
					  'pop': [],
					  'new': [],
					  'sell': []
				  }
			  }
		  }
		  this._getSubcategories(0)
	     })
	  },
	  _getSubcategories(index){
		  this.currentIndex = index;
		  const mailKey = this.categories[index].maitKey;
		  getSubcategory(mailKey).then(res =>{
			this.categoryData[index].subcategories = res.data
			this.categoryData = {...this.categoryData}
			this._getCategoryDetail(POP)
			this._getCategoryDetail(SELL)
			this._getCategoryDetail(NEW)
		  })
	  },
	  _getCategoryDetail(type){
		  //1获取请求的miniwallkey
		  const miniWallKey = this.categories[this.currentIndex].miniWallkey;
		  //2发送请求，传入miniwallkey
		  getCategoryDetail(miniWallKey,type).then(res =>{
			  //console.log(res);
			  this.categoryData[this.currentIndex].categoryDetail[type] = res
			  this.categoryData = {...this.categoryData}
		  })
		  
	  },
	  selectItem(index){
		this._getSubcategories(index)
	  }
  }
}
</script>

<style scoped>
#category{
	height: 100vh;
	position: relative;
}

.nav-bar{
	background-color: var(--color-tint);
	font-weight: var(--font-size);
	color: #fff;
}

.content1{
	position: absolute;
	overflow: hidden;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
}

#tab-content{
	height: 100%;
	flex: 1;
  
}

</style>