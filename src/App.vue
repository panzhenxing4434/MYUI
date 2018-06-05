<template>
  <div id="app">
    <!--HelloWorld/>-->
    <z-icon name="fa fa-address-book" title="" /><br><br>
    <z-btn icon="fa fa-address-book" color="me" title="按钮" flat class="ripple" @click="myClick" /><br><br>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import {ZIcon,ZBtn} from "./zMeUi/ZUI";
export default {
  name: 'App',
  components: {
    HelloWorld,
    ZIcon,
    ZBtn,
  },
  methods:{
    myClick(){
      console.log(77777777);
    }
  }
}
</script>

<style>
  #app{
    font-size: 16px;
  }
  .text-me{
    color: #83c14b;
  }
  .bg-me{
    background: wheat;
  }
</style>
