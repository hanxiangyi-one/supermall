<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
	<cart-boottom-bar></cart-boottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBoottomBar from "./childComps/CartBoottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBoottomBar
  },
  computed: {
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: "cartLength",
      list: "cartList"
    })
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
