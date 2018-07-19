<template>
  <div id="app">
    <!--HelloWorld/>-->
    <!--<z-icon name="check-square-o" title="" /><br><br>
    <z-btn icon="address-book" color="me" title="按钮" flat  @click="myClick" /><br><br>
    <z-btn icon="address-book" color="me" title="按钮2" flat  @click="myClick2" /><br><br>
    <z-alert ref="myalert"  type="warning" color="white" title="您的操作失误！" />
    <z-alert ref="myalert2"  type="info" color="white" title="您的操作正确！" />
    <z-checkbox v-model="message" val="选择框1" @change="myClick2" color="#42b983" title="选择框1"></z-checkbox>
    <z-checkbox v-model="message" val="选择框2" @change="myClick2" color="#83c14b" title="选择框2"></z-checkbox>
    <z-checkbox v-model="message" val="选择框3" @change="myClick2" color="#83c14b" title="选择框3"></z-checkbox><br><br>
    <z-radio v-model="pick" val="radio1" color="#42b983" title="单选框"></z-radio>
    <z-radio v-model="pick" val="radio2" color="#83c14b" title="单选框2"></z-radio><br><br>-->
    <!--<z-canvas :speed="mySpeed" sedColor="#83c14b"></z-canvas>-->
    <!--<div style="height: 300px">
      <z-shuffling :ary="ary" @change="myChange" autoplay speed="3000"></z-shuffling>
    </div>
    <div style="height: 300px">
      <z-shuffling :ary="ary" @change="myChange"  autoplay speed="6000"></z-shuffling>
    </div>-->
    <!--<z-tabs  :tabs="tabs"  @change="change"></z-tabs>-->
    <z-layout ref="myLayout">
      <div slot="menu" style="color: gray">
        <div class="menu-header bg-color">
          VUEALT
        </div>
        <z-collapsible-ground :minWidth="minWidth">
          <z-collapsible ref="xxx"  :actionColor="{'border-left': '1px solid #7e57a2'}" leftIcon="area-chart" title="这是标题一">
            <z-list :vList="list" >
            </z-list>
          </z-collapsible>
          <z-collapsible :actionColor="{'border-left': '1px solid #7e57a2'}" leftIcon="cart-arrow-down" title="这是标题二">
            <z-list :vList="list">
            </z-list>
          </z-collapsible>
        </z-collapsible-ground>
      </div>

      <div slot="content">

      </div>
      <div slot="header" class="myHeader" style="color:white;padding-right: 1rem;">
        <div @click="closed()"  class="myHeader-left"><z-icon name="bars" title="" /></div>
        <div class="flexRow">
          <div  class="iconItem relativeClass" @click="$refs.myp.showOrClose()">
            <z-icon name="envelope-o" title="" class="relativeClass" ><z-dot color="#00a65a">5</z-dot></z-icon>
            <z-props ref="myp" title="your have 4 message" ftitle="see All message">
              <z-list :vList="list" style="color: #444444;">
              </z-list>
            </z-props>
          </div>
          <div  class="iconItem relativeClass" @click="$refs.myp2.showOrClose()">
            <z-icon name="bell-o" title="" class="relativeClass"> <z-dot color="#f39c12">10</z-dot></z-icon>
            <z-props ref="myp2" title="your have 4 message" ftitle="see All message">
              <z-list :vList="list" style="color: #444444;">
              </z-list>
            </z-props>
          </div>
          <div class="iconItem relativeClass"  @click="$refs.myp3.showOrClose()">
            <z-icon name="flag-checkered" title="" class="relativeClass" > <z-dot color="#dd4b39 ">4</z-dot></z-icon>
            <z-props ref="myp3" title="your have 4 message" ftitle="see All message">
              <z-list :vList="list" style="color: #444444;">
              </z-list>
            </z-props>
          </div>
          <div class="iconItem relativeClass" style="font-size: 12px" @click="$refs.myp4.showOrClose()">
            <z-icon name="user-circle-o" title="" size="20px" class="relativeClass" style="margin-right: 0.5rem;"></z-icon> your img here
            <z-props ref="myp4" >
                <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 100%;">
                  <img src="./assets/logo.png" height="50" width="50" style="border-radius: 50%;margin: 0.5rem;">
                  <span style="font-size: 12px; margin: 0.5rem;color:gray;">这是你的信息</span>
                  <div  style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 100%;">
                    <z-btn  style="height: 25px;min-height:0px;" icon="" color="#ededed" title="设置"  @click.stop="myClick2"></z-btn>
                    <z-btn style="height: 25px;min-height:0px" icon="" color="#ededed" title="登入"  @click="myClick2"></z-btn>
                  </div>
                </div>
            </z-props>
          </div>
          <div class="iconItem relativeClass" @click="$refs.myLayout.isShowRightMenu()" >
            <z-icon name="cog" title="" class="relativeClass" ></z-icon>
          </div>
        </div>
      </div>
      <div slot="rightMenu"  width="350px" menuStyle='{"background-color":"white"}' >
        <z-tabs  :tabs="tabs" @change="change" color="gray" action="#000000" :speed="3"></z-tabs>
        <div v-if="obj.label == '音乐课程'">
          <z-list :vList="list1" style="color: #444444;">
          </z-list>
        </div>
        <div v-else-if="obj.label == '舞蹈课程'">
          <z-list :vList="list2" style="color: #444444;">
          </z-list>
        </div>
        <div v-else-if="obj.label == '美术课程'">
          <z-list :vList="list3" style="color: #444444;">
          </z-list>
        </div>
        <div v-else-if="obj.label == '体育课程'">
          <z-list :vList="list4" style="color: #444444;">
          </z-list>
        </div>
      </div>
    </z-layout>
    <!--<br>
    <br>
    <z-list :vList="list">
    </z-list>-->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import {ZIcon,ZBtn,ZAlert,ZCheckbox,ZCanvas,ZRadio,ZShuffling,ZTabs,ZLayout,ZList,listItem,ZCollapsible,ZDot,ZProps,ZCollapsibleGround} from "./zMeUi/ZUI";

export default {
  name: 'App',
  components: {
    HelloWorld,
    ZIcon,
    ZBtn,
    ZAlert,
    ZCheckbox,
    ZCanvas,
    ZRadio,
    ZShuffling,
    ZTabs,
    ZLayout,
    ZList,
    listItem,
    ZCollapsible,
    ZDot,
    ZProps,
    ZCollapsibleGround
  },
  data(){
    return{
      obj:{},
      minWidth:'60px',
      mySpeed:3.2,
      pick:"",
      bool:true,
      message:["选择框1","选择框2","选择框3"],
      ary:["http://img2.imgtn.bdimg.com/it/u=3588772980,2454248748&fm=27&gp=0.jpg","https://www.baidu.com/img/bd_logo1.png","http://img4.imgtn.bdimg.com/it/u=1972873509,2904368741&fm=27&gp=0.jpg"],
      tabs:[{label:"音乐课程",value:"音乐课程"},{label:"舞蹈课程",value:"舞蹈课程"},{label:"美术课程",value:"美术课程"},{label:"体育课程",value:"体育课程"}],
      list:[{icon:"commenting",label:"音乐课程",value:"音乐课程"},
           {icon:"user-circle-o",label:"舞蹈课程",value:"舞蹈课程"},
           {icon:"commenting",label:"音乐课程",value:"音乐课程"},
           {icon:"user-circle-o",label:"舞蹈课程",value:"舞蹈课程"},
           {icon:"window-restore",label:"美术课程",value:"美术课程"},
           {icon:"address-book",label:"体育课程",value:"体育课程"}],
      list1:[{icon:"",label:"DJ",value:"1"},{icon:"",label:"摇滚",value:"2"},{icon:"",label:"古风",value:"3"},{icon:"",label:"经典",value:"4"}],
      list2:[{icon:"",label:"JAZZ爵士舞",value:"1"},{icon:"",label:"Hip-Hop嘻哈",value:"2"},{icon:"",label:"BALLROOM国际标准舞",value:"3"},{icon:"",label:"TAP踢踏舞",value:"4"}],
      list3:[{icon:"",label:"雕塑",value:"1"},{icon:"",label:"绘画",value:"2"},{icon:"",label:"设计",value:"3"},{icon:"",label:"建筑",value:"4"}],
      list4:[{icon:"",label:"篮球",value:"1"},{icon:"",label:"足球",value:"2"},{icon:"",label:"射击",value:"3"},{icon:"",label:"体操",value:"4"}]
    }
  },
  created(){

  },
  methods:{
    closed(){
      this.$refs.myLayout.leftBig();
       if(this.minWidth == '60px'){
         this.minWidth = '254px'
       }else{
         this.minWidth ='60px'
       }
    },
    mycls(){
      console.log(this.$refs.myp)
    },
    myChange(src){
      this.bool =false;
    },
    myClick(){
     this.$refs.myalert.showAlert(3000);
    },
    myClick2(){
      console.log(777777777)
      //this.$refs.myalert2.showAlert(3000);
    },
    change(item){
       this.obj = item;
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

  .bg-color{
    background-color: #7e57a2;
    color: white;
  }

  .myHeader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    font-size: 20px;
  }

  .myHeader-left{
    height: 100%;
    padding: 0 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .myHeader-left:hover{
    background-color: #7e57a2;
  }

  .iconItem{
    height: 100%;
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;
  }
  .iconItem:hover{
    background-color:#7e57a2;
  }
</style>
