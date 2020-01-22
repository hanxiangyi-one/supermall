<template>
<div class="weapper">
	<ul class="content">
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
		<li>列表</li>
	</ul>
</div>
</template>

<script>
import BScroll from 'better-scroll'
	export default{
		name:"Category",
		created() {

		},
		data() {
			return {
				scroll: null
			}
		},
        mounted() {
           this.scroll = new BScroll(document.querySelector('.weapper'),{

		   })
		}
	}
</script>

<style scoped>
.weapper{
	height: 150px;
	background-color: red;

	overflow: hidden;
}
</style>
