<template>
	<tab-bar>
		<tab-bar-item path="/home" >
			<img slot="item-icon" src="~assets/img/tabber/home.svg"/>
			<img slot="item-icon-active" src="~assets/img/tabber/active-home.svg"/>
			<div slot="item-text">首页</div>
		</tab-bar-item>
		<tab-bar-item path="/category" >
			<img slot="item-icon" src="~assets/img/tabber/classify.svg"/>
			<img slot="item-icon-active" src="~assets/img/tabber/active-classify.svg"/>
			<div slot="item-text">分类</div>
		</tab-bar-item>
		<tab-bar-item path="/cart" >
			<img slot="item-icon" src="~assets/img/tabber/shop.svg"/>
			<img slot="item-icon-active" src="~assets/img/tabber/active-shop.svg"/>
			<div slot="item-text">购物车</div>
		</tab-bar-item>
		<tab-bar-item path="/profile" >
			<img slot="item-icon" src="~assets/img/tabber/me.svg"/>
			<img slot="item-icon-active" src="~assets/img/tabber/active-me.svg"/>
			<div slot="item-text">我的</div>
		</tab-bar-item>
	</tab-bar>
</template>

<script>
	import TabBar from 'components/common/tabber/TabBar'
	import TabBarItem from 'components/common/tabber/TabBarItem'
	export default{
		name:"MainTabBar",
		components:{
			TabBar,
			TabBarItem
		}
	}
</script>

<style>
</style>
