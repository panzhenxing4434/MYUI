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
      return this.name != "" && this.name != null ? "fa fa-" + this.name : "";
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
      id:null
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
    clearTime(){
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
        attrs:{id:this.id},
        on: {click: this.changes}
      }, [h(ZIcon, {props: {name: "angle-right", color: "white", size: "1.5em"}})])
    ])
  }
}
//angle-right  domProps:{src:item }
export {ZIcon, ZBtn, ZAlert, ZCheckbox, ZCanvas, ZRadio, ZShuffling}
