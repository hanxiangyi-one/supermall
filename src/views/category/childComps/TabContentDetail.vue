<template>
    <grid-view class="tab-content">
        <div class="tab-content-detail" v-for="(item,index) in categoryDetail" :key="index">
            <a :href="item.link"><img :src="item.img" alt=""/></a>
            <p>{{item.title}}</p>
        </div>
  </grid-view>
</template>

<script>
import GridView from 'components/common/gridView/GridView'


export default {
    name:"TabContentDetail",
    components:{
        GridView
    },
    props:{
        categoryDetail:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.tab-content{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}
.tab-content-detail{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  height: 100px;
  margin-bottom: 10px;
}
.tab-content-detail img{
      width: 65px;
  margin-bottom: 7px;
  margin-top: 100px;
}
.tab-content-detail p{
     font-size: 14px;
}
</style>