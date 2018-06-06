<template>
  <div id="app">
    <!--HelloWorld/>-->
    <z-icon name="check-square-o" title="" /><br><br>
    <z-btn icon="address-book" color="me" title="按钮" flat  @click="myClick" /><br><br>
    <z-btn icon="address-book" color="me" title="按钮2" flat  @click="myClick2" /><br><br>
    <z-alert ref="myalert"  type="warning" color="white" title="您的操作失误！" />
    <z-alert ref="myalert2"  type="info" color="white" title="您的操作正确！" />
    <z-checkbox v-model="message" val="选择框1" @change="myClick2" color="#42b983" title="选择框1"></z-checkbox>
    <z-checkbox v-model="message" val="选择框2" @change="myClick2" color="#83c14b" title="选择框2"></z-checkbox>
    <z-checkbox v-model="message" val="选择框3" @change="myClick2" color="#83c14b" title="选择框3"></z-checkbox><br><br>
    <z-canvas speed="3.2" sedColor="#83c14b"></z-canvas>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import {ZIcon,ZBtn,ZAlert,ZCheckbox,ZCanvas} from "./zMeUi/ZUI";

export default {
  name: 'App',
  components: {
    HelloWorld,
    ZIcon,
    ZBtn,
    ZAlert,
    ZCheckbox,
    ZCanvas
  },
  data(){
    return{
      message:["选择框1","选择框2","选择框3"]
    }
  },
  methods:{
    myClick(){
     this.$refs.myalert.showAlert(3000);
    },
    myClick2(){
      this.$refs.myalert2.showAlert(3000);
    }
  },

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
    background: #42b983;
  }
</style>
