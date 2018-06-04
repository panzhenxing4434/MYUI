<template>
  <div id="app">
    <!--HelloWorld/>-->
    <z-icon name="fa fa-address-book" size="24px" ></z-icon>


  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import {ZIcon} from "./zMeUi/ZUI";

export default {
  name: 'App',
  components: {
    HelloWorld,
    ZIcon
  }
}
</script>

<style>
</style>
