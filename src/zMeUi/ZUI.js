import ZCanvas from './ZCanvas'
import utils from './utils'

/**
 *
 * 字体图标
 */
const ZIcon = {
  name: 'ZIcon',
  props: {
    name: String,
    color: String,
    size: String,
    title: String
  },
  computed: {
    classes() {
      return this.name != "" && this.name != null ? "fa fa-" + this.name : "z-hide";
    },
    content() {
      return this.title != "" && this.title != null ? this.title : "";
    },
    style() {
      let myStyle = {}
      if (this.size) {
        myStyle.fontSize = this.size
      }
      if (this.color) {
        myStyle.color = this.color;
      }
      return myStyle;
    }
  },
  render(h) {
    return h('i', {
      staticClass: 'z-icon',
      'class': this.classes,
      style: this.style
    }, [
      this.content,
      this.$slots.default
    ])
  }
}


/**
 *
 * 按钮
 */
const ZBtn = {
  name: "ZBtn",
  props: {
    icon: String,
    iconPosition: String,
    title: String,
    color: String
  },
  computed: {
    events() {
      return {click: this.click};
    },
    classes() {
      let cls = ''
      if (this.color != "" && this.color != null) {
        cls = "text-" + this.color + " " + " bg-" + this.color
      }
      return cls
    }
  },
  methods: {
    click(e) {
      this.$emit("click", e);
    }
  },
  render(h) {
    return h('button', {
      staticClass: 'z-btn',
      'class': this.classes,
      style: this.$attrs.flat != null ? {"background": "white"} : "",
      on: this.events,
      ref: 'myRef',
    }, this.iconPosition == "right" ? [this.title, h(ZIcon, {props: {name: this.icon}})] : [h(ZCanvas, {props: {speed: 3.5}}), h(ZIcon, {props: {name: this.icon}}), this.title])
  }

}
/**
 * alert
 *
 */

const ZAlert = {
  name: "ZAlert",
  props: {
    color: String,
    textColor: String,
    icon: String,
    zUrl: String,
    title: String,
    type: String
  },
  data() {
    return {bottom: "-100%"}
  },
  computed: {
    computedIcon() {
      return this.icon ? this.icon : this.type
    },
    computedBg() {
      return this.type != null ? "alert-div " + this.type + "-hbg" : "alert-div";
    },
    computedBgc() {
      return this.type != null ? "alert-content " + this.type + "-cbg" : "alert-content";
    }
  },
  methods: {
    showAlert(time) {

      this.bottom = "5%";
      new Promise(function (resolve) {
        setTimeout(() => {
          resolve()
        }, time)
      }).then(() => {
        this.bottom = "-100%"
      })
    }
  },
  render(h) {
    const eleAry = [];
    if (this.zUrl) {
      eleAry.push(
        h('img', {
          staticClass: 'minMax',
          domProps: {src: this.zUrl}
        })
      )
    } else if (this.icon || this.type) {
      eleAry.push(
        h(ZIcon, {
          props: {name: this.computedIcon}
        })
      )
    }
    //
    return h("div", {
      staticClass: 'z-alert',
      style: this.color != null ? {color: this.color, bottom: this.bottom} : null
    }, [
      eleAry.length ? h("div", {staticClass: this.computedBg}, eleAry) : null,
      h("div", {
        staticClass: this.computedBgc
      }, this.title)
    ])
  }
}


const ZCheckbox = {
  name: "ZCheckbox",
  props: {
    toggleCheck: Boolean,
    disable: Boolean,
    value: Array,
    val: String,
    color: String,
    title: String
  },
  data() {
    return {
      checkToggle: this.value.includes(this.val) ? true : false
    }
  },
  computed: {
    isCheck() {
      return this.value.includes(this.val) ? {opacity: 1, color: this.color} : {opacity: 0, color: this.color}
    }
  },
  methods: {
    toggle(evt) {
      if (this.disable) {
        return
      }
      this.checkToggle = !this.checkToggle
      let myVal = this.value;
      if (this.checkToggle) {
        if (!myVal.includes(this.val)) {
          myVal.push(this.val);
        }
      } else {
        if (this.value.includes(this.val)) {
          myVal = myVal.filter(v => {
            return v != this.val;
          })
        }
      }
      this.$emit('input', myVal)
      this.$emit("change", evt);
    }
  },
  render(h) {
    return h("div", {
      staticClass: "z-Checkbox",

    }, [h("div", {
      staticClass: "input-Checkbox",
      attrs: {},
      on: {click: this.toggle}
    }, [
      h(ZIcon, {
        props: {name: "square-o position-absolute no-padding"}
      }),
      h(ZIcon, {
        style: this.isCheck,
        props: {name: "check-square position-absolute no-padding"}
      }),
      h("input", {
        staticClass: "Checkbox",
        attrs: {type: "checkbox", value: this.val, checked: this.checkToggle},
      }),
      h(ZCanvas, {props: {speed: 1, sedColor: this.color}})
    ]), h("span", {on: {click: this.toggle}}, this.title)])
  }

}


/**
 * radio
 * @type {{}}
 */
const ZRadio = {
  name: "ZRadio",
  props: {
    value: String,
    val: String,
    title: String,
    color: String
  },
  methods: {
    radioChange(event) {
      if (event.target !== event.currentTarget) return
      console.log(777777)
      this.$emit("input", this.val)
    },
    clickCanvas() {
      document.getElementById("z" + this.val).click();
    }
  },
  computed: {
    isChecked() {
      return this.value != null && this.value == this.val ? "select" : false;
    },
    changeStyle() {
      return this.value == this.val ? {"border-color": this.color, "background-color": this.color} : {}
    }
  },
  render(h) {
    return h("label", {
      staticClass: "z-Radio",
    }, [
      h("input", {
        attrs: {id: this.val, hidden: "hidden", type: "radio", checked: this.isChecked, value: this.val}
      }),
      h("div", {on: {click: this.radioChange}}, [h("label", {
        on: {click: this.radioChange},
        attrs: {for: this.val},
        style: this.changeStyle
      }),
        h(ZCanvas,
          {
            attrs: {
              id: "z" + this.val
            },
            props: {
              clickOn: this.radioChange,
              speed: 1,
              sedColor: this.color,
              bool: true,
              canStyle: "50%"
            }
          })]),
      h("span", {on: {click: this.clickCanvas}}, this.title)
    ])
  }

}

/**
 * 轮播图
 */
const ZShuffling = {
  name: "ZShuffling",
  props: {
    ary: Array,
    action: String,
  },
  data() {
    return {
      imgTransition: [],
      bool: false,
      time: null,
      id: null
    }
  },
  created() {
    if (this.ary.length > 0) {
      for (let item in this.ary) {
        this.imgTransition.push(item * -100);
      }
    }

    this.id = utils.guid()
    if (this.$attrs.autoplay != null) {
      this.startTask()
    }

  },
  beforeDestroy() {
    this.clearTime()
  },
  computed: {
    computedImg() {
      const imgAry = [];
      if (this.ary.length > 0) {
        let firstItem = this.ary[this.ary.length - 1];
        if (typeof(firstItem) == "object") {
          imgAry.push(item.src)
        } else {
          imgAry.push(firstItem)
        }

        for (let item of  this.ary) {
          if (typeof(item) == "object") {
            imgAry.push(item.src)
          } else {
            imgAry.push(item)
          }
        }
        if (typeof(firstItem) == "object") {
          imgAry.push(this.ary[0].src)
        } else {
          imgAry.push(this.ary[0])
        }

      }
      this.imgTransition = imgAry;
      return imgAry;
    }
  },
  methods: {
    clearTime() {
      clearInterval(this.time);
    },
    startTask() {
      let vSpeed = 5000;
      if (this.$attrs.speed != null && this.$attrs.speed != "") {
        vSpeed = this.$attrs.speed;
      }
      this.time = setInterval(() => {
        document.getElementById(this.id).click()
      }, vSpeed)
    },
    changes2(evt) {
      if (this.bool) return;
      let vNode = null;
      if (event.target !== event.currentTarget) {
        vNode = evt.srcElement.parentElement.parentElement.firstChild
      }
      if (this.ary.length <= 1) return;
      if (vNode == null) {
        vNode = evt.srcElement.parentElement.firstChild
      }
      let zNum = parseInt(this.getNum(vNode.style.transform)) + 100
      vNode.style.transitionDuration = "0.65s"
      vNode.style.transform = "translateX(" + zNum + "%)"
      let self = this;
      new Promise(function (resolve) {
        self.bool = true;
        setTimeout(() => {
          resolve()
        }, 650)
      }).then(() => {
        if (zNum == 0) {
          vNode.style.transitionDuration = "0s"
          vNode.style.transform = "translateX(-" + (this.ary.length) * 100 + "%)"
        }
        this.bool = false
      })
      this.$emit("change", this.imgTransition[zNum / -100])
      this.clearTime()
      this.startTask()
    },
    changes(evt) {
      if (this.bool) return;
      let vNode = null;
      if (event.target !== event.currentTarget) {
        vNode = evt.srcElement.parentElement.parentElement.firstChild
      }
      if (this.ary.length <= 1) return;
      if (vNode == null) {
        vNode = evt.srcElement.parentElement.firstChild
      }
      let zNum = this.getNum(vNode.style.transform) - 100
      vNode.style.transitionDuration = "0.65s"
      vNode.style.transform = "translateX(" + zNum + "%)"
      let self = this;
      new Promise(function (resolve) {
        self.bool = true;
        setTimeout(() => {
          resolve()
        }, 650)
      }).then(() => {
        if (zNum < this.ary.length * -100) {
          vNode.style.transitionDuration = "0s"
          vNode.style.transform = "translateX(-100%)"
        }
        this.bool = false
      })
      this.$emit("change", this.imgTransition[zNum / -100])
      this.clearTime()
      this.startTask()
    },
    getNum(str) {
      let num = str.replace("translateX(", "").replace("%)", "")
      return num == "" ? -100 : num
    }
  },
  render(h) {
    return h("div", {
      staticClass: 'Z-Shuffling'
    }, [
      h("div", {
        staticClass: "Shuffling-content"
      }, this.computedImg.map(function (item) {
        return h("div", {
          staticClass: "Shuffling-imgContent",
        }, [h("img", {
          staticClass: "Shuffling-img",
          domProps: {src: item}
        })])
      })),
      h("div", {
        staticClass: 'left-action',
        on: {click: this.changes2}
      }, [h(ZIcon, {props: {name: "angle-left", color: "white", size: "1.5em"}})]),
      h("div", {
        staticClass: "right-action",
        attrs: {id: this.id},
        on: {click: this.changes}
      }, [h(ZIcon, {props: {name: "angle-right", color: "white", size: "1.5em"}})])
    ])
  }
}
//angle-right  domProps:{src:item }

//tab 标签
const ZTabs = {
  name: "ZTabs",
  props: {
    tabs: Array,
    color: String,
    action: String,
    speed: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      averageWidth: 100 / this.tabs.length,
      slidingWidth: "",
      trueWidth: "",
      actionTab: null,
      canvasColor: String,
      name: utils.guid()
    }
  },
  created() {
    this.actionTab = this.tabs.length > 0 ? this.tabs[0] : ''
    this.$nextTick().then(() => {
      let tabAry = document.getElementsByName(this.name);
      if (tabAry[0].firstChild) {
        tabAry[0].firstChild.click()
      }
    })
  },
  computed: {
    changeStyle() {
      return this.color != null && this.color != '' ? {"color": this.color + '!important'} : {}
    },
    slidingStyle() {
      if (this.tabs.length == 0) return {};
      let wd = this.slidingWidth.substring(0, 2) / 2 + "px";
      let clr = this.action != null && this.action != '' ? this.action : this.color;
      if (!clr) {
        clr = "#000000"
      }
      return {
        "width": this.slidingWidth,
        'left': 'calc(' + this.trueWidth + ' - ' + wd + ')',
        'background-color': clr
      }
    }
  },
  methods: {
    zTabStyle(item) {
      let width = this.tabs.length > 0 ? 100 / this.tabs.length + "%" : ''
      return item.label == this.actionTab.label && item.value == this.actionTab.value ? {
        "width": width,
        color: this.action
      } : {"width": width}
    },
    zTabClick(event) {
      let ele = event.srcElement.nextSibling;
      let eleStyle = window.getComputedStyle(ele);
      this.slidingWidth = eleStyle.width;
      let label = ele.innerText;
      let num = 0;
      for (let item of this.tabs) {
        if (item.label == label) {
          this.actionTab = item;
          break;
        }
        num += 1;
      }
      this.$emit("change", this.actionTab);
      this.trueWidth = num * this.averageWidth + 100 / (this.tabs.length * 2) + "%";
    }
  },
  render(h) {
    let self = this;
    return h("div", {
      staticClass: 'z-tabs',
      style: this.changeStyle
    }, [this.tabs.map(function (item) {
      return h('div', {
        staticClass: 'z-tab',
        attrs: {name: self.name},
        style: self.zTabStyle(item),
        on: {click: self.zTabClick},
      }, [h(ZCanvas, {props: {speed: self.speed, sedColor: self.canvasColor()}}), h('span', item.label)])
    }), h('span', {
      staticClass: 'z-tabs-sliding',
      style: this.slidingStyle
    })]);

  }
}

const ZLayout = {
  name: "ZLayout",
  props: {},
  data() {
    return {
      showRightMenu: false,
      isBigMneu:true
    }
  },
  computed: {
    rightSide() {
      let menuStyle = JSON.parse(this.$slots.rightMenu[0].data.attrs.menuStyle)
      let w = this.$slots.rightMenu[0].data.attrs.width
      w = w ? {'width': w, 'right': '-' + w} : {'width': '200px', 'right': '-200px'}
      if (this.showRightMenu) {
        w.right = '0'
        return menuStyle ? Object.assign(w, menuStyle) : w
      } else {
        return menuStyle ? Object.assign(w, menuStyle) : w
      }
    },
    menuStyle(){
      return this.isBigMneu ? {'width':'254px'}:{ 'width':'60px'}
    }
  },
  methods: {
    isShowRightMenu() {
      this.showRightMenu = !this.showRightMenu
    },
    leftBig() {
      this.isBigMneu =!this.isBigMneu
      if(!this.$slots.menu[0]) return;
      this.$slots.menu[0].children.forEach( key =>{
        if(key.tag && key.componentOptions){
          if(key.componentOptions.tag == 'z-collapsible-ground'){
            key.child.setWidth(this.$slots.menu[0].elm)
          }
        }

      })
    }
  },
  render(h) {
    let _c = this;
    return h('div', {
      staticClass: "z-layout"
    }, [
      h('div', {
        staticClass: 'z-layout-let',
        style:_c.menuStyle
      }, _c.$slots.menu),
      h('div', {
        staticClass: 'z-layout-rig'
      }, [
        h('div', {staticClass: 'rig-top'}, _c.$slots.header),
        h('div', {staticClass: 'rig-center'}, _c.$slots.content),
        _c.$slots.rightMenu ? h('div', {
          staticClass: 'rig-Menu',
          style: _c.rightSide
        }, _c.$slots.rightMenu) : ''
      ]),

    ])
  }
}


const ZList = {
  name: 'ZList',
  props: {
    vList: Array
  },
  data() {
    return {}
  },
  created() {
  },
  computed: {
    itemCre() {
      return this.vList.length > 0 ? this.vList : []
    }

  },
  render(h) {
    return h('div', {
      staticClass: 'z-list'
    }, this.itemCre.map(item => {

      return h(listItem, {props: {obj: item}})
    }))
  }
}


const listItem = {
  name: 'listItem',
  props: {
    obj: Object
  },
  data() {
    return {}
  },
  methods: {
    itemClick(val) {
      return () => {
        console.log(val)
      }
    }
  },
  render(h) {
    let _c = this.obj;
    let _o = this;
    return h('div', {
      staticClass: 'list-Item',
      on: {click: _o.itemClick(_c.value)}
    }, [h(ZIcon, {
      staticClass: 'list-Item-icon',
      style: {'min-width': '45px'},
      props: {name: _c.icon, size: "24px"}
    }), h('div', {staticClass: 'list-Item-content'}, [h('span', _c.label)])]);
  }
}


const  ZCollapsibleGround ={
  name:'ZCollapsibleGround',
  props:{
    minWidth:{
      type:String,
      default:'60px'
    }
  },
  data(){
    return{}
  },
  methods:{
    setWidth(){
      this.$slots.default.forEach( key =>{
        if(key.tag && key.componentOptions.tag =='z-collapsible'){
         key.child.setWidth(this.minWidth)

        }
      })
    },
    _allClose(){
      this.$slots.default.forEach( key =>{
        if(key.tag && key.componentOptions.tag =='z-collapsible'){
           key.child.bool =false
        }
      })
    }
  },
  render(h){
    let _c =this
    return h('div',_c.$slots.default)
  }
}

const ZCollapsible = {
  name: "ZCollapsible",
  props: {
    title: String,
    leftIcon:String,
    actionColor:Object,
    minWidth:{
      type:Number,
      default:60
    }
  },
  data() {
    return {
      big:true,
      bool:false,
      id: null,
      height: '',
      width:'',
      sy:'',
      icon: 'caret-left'
    }
  },
  created(){
    this.id = utils.guid();
  },
  mounted(){
    this.$nextTick().then(() => {
      let sty = window.getComputedStyle(document.getElementById(this.id))
      this.height = sty.height;
      this.width = sty.width;
      if(this.width.replace('px','') > this.minWidth){
        this.bool =true
      }
    })
  },
  computed: {
    cStyle() {
      if (this.icon == 'caret-down') {
        this.icon = 'caret-left'
      } else {
        this.icon = 'caret-down'
      }
      return this.bool ? {height: 0}:{height: this.height}
    },
    getEle(){
      let obj=null;
      let h = this.$createElement
      let _c = this;
      let wd = _c.width.replace('px','')
      if(_c.width =='' ){
        obj = h('div', {
          staticClass: 'merger-Closed',
          style:_c.mcStyle
        }, [h('div', {
            staticClass: 'merger-Closed-Title',
            on: {click: this.isClose}
          }, [ h('div',[_c.leftIcon ? h(ZIcon, {props: {name: _c.leftIcon, color: "gray"}}) : null,h('span',{
            staticClass:'closed-Title'
          },_c.title)]), h(ZIcon, {props: {name: _c.icon, color: "gray"}})]
        ), h('div', {
          staticClass: 'merger-Closed-Content',
          style: _c.cStyle,
          attrs:{id:this.id}
        }, _c.$slots.default)])
      }else if(_c.width !='' && wd >_c.minWidth){
        obj = h('div', {
          staticClass: 'merger-Closed',
          style:_c.mcStyle
        }, [h('div', {
            staticClass: 'merger-Closed-Title',
            on: {click: this.isClose}
          }, [ h('div',[_c.leftIcon ? h(ZIcon, {props: {name: _c.leftIcon, color: "gray"}}) : null,h('span',{
            staticClass:'closed-Title'
          },_c.title)]), h(ZIcon, {props: {name: _c.icon, color: "gray"}})]
        ), h('div', {
          staticClass: 'merger-Closed-Content',
          style: _c.cStyle,
          attrs:{id:this.id}
        }, _c.$slots.default)])
      }else{
        obj = h('div', {
            staticClass: 'mcmin merger-Closed flexRCC  relative',
            style: Object.assign(_c.mcStyle(),{height:_c.width}),
            on: {click: this.isClose}
          },[h('i', {staticClass: 'z-icon ' +  'fa fa-'+ _c.leftIcon,
          style:_c.geCstyle()}),
          this.bool ? h('div',{staticClass:'small-merger-Closed boder-solid',style:{top:0,left:_c.width}},_c.$slots.default):null])
      }
      return obj;
    }
  },
  methods: {
    geCstyle(){
      return { 'display': 'flex', 'flex-direction': 'row', 'justify-content': 'center','align-items': 'center'}
    },
    mcStyle(){
      return this.bool ?  this.actionColor:{}
    },
    setWidth(val){
      if(this.width.replace('px','') <= val){
        this.bool = false
      }else {
        this.bool = true
      }
      this.width = val;
    },
    isClose() {
      let sd = this.bool;
      if(this.width.replace('px','') <= this.minWidth){
        this.$parent._allClose()
      }
      if(sd){
        this.bool =false
      }else {
        this.bool = true
      }
    }
  },
  render(h) {
    let _c = this;
    return _c.getEle;
  }
}

/*const ZHeader ={
  name:"ZHeader",
  props:{
  },
  data(){
    return{}
  },
  render(h){
    let _c =this;
    return h('div',{
      staticClass:'z-header'
    },_c.$slots.default)
  }
}*/

const ZDot = {
  name: "ZDot",
  props: {
    color: String
  },
  data() {
    return {}
  },
  computed: {
    dotColor() {
      return this.color != null && this.color != '' ? {'background-color': this.color} : {}
    }
  },
  render(h) {
    let _c = this;
    return h('span', {
      staticClass: 'z-dot',
      style: _c.dotColor
    }, _c.$slots.default)
  }
}

const ZProps = {
  name: 'ZProps',
  props: {
    title: String,
    ftitle: String
  },
  data() {
    return {
      bool: false,
      eleHeight: null
    }
  },
  computed: {
    isShow() {
      return this.bool ? {'max-height': 'none', opacity: "1"} : {'max-height': '0px', opacity: "0"}
    },
    _getEle() {
      let ary = []
      if (this.title != null && this.title != '') {
        ary.push(this.$createElement('span', {
          staticClass: 'z-props-title props-border-bottom'
        }, this.title))
      }
      ary.push(this.$createElement('div', {staticClass: 'z-props-title z-props-center'}, this.$slots.default))
      if (this.ftitle != null && this.ftitle != '') {
        ary.push(this.$createElement('span', {
          staticClass: 'z-props-title props-border-top',
        }, this.ftitle))
      }
      return ary;
    }
  },
  created() {
    let _c = this;
    this.$nextTick().then(() => {
      let ele = this.$el.parentElement;
      ele.setAttribute('tabindex', _c._uid)
      ele.onblur = (eve) => {
        setTimeout(() => {
          this.bool = false
          ele.style.backgroundColor = ''
        }, 150)
      }
    })
  },
  methods: {
    showOrClose() {
      this.bool = !this.bool
      let ele = this.$el.parentElement
      if (this.bool) {
        ele.style.backgroundColor = '#7e57a2'
      } else {
        ele.style.backgroundColor = ''
      }
    }
  },
  render(h) {
    let _c = this;
    return h('div', {
      staticClass: 'z-props',
      style: _c.isShow,
      attrs: {id: 'myprop'}
    }, _c._getEle)
  }
}


export {
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
}
