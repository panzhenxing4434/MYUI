import ZCanvas from './ZCanvas'

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
      if (this.size) {
        return {fontSize: this.size}
      }
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
    color:String,
    title:String
  },
  data() {
    return {
      checkToggle: this.value.includes(this.val)? true:false
    }
  },
  computed: {
    isCheck() {
      return this.value.includes(this.val) ? {opacity: 1,color:this.color} : {opacity: 0,color:this.color}
    }
  },
  methods: {
    toggle(evt) {
      if (this.disable) {
        return
      }
      this.checkToggle = !this.checkToggle
      let myVal=this.value;
      if (this.checkToggle) {
        if (!myVal.includes(this.val)) {
          myVal.push(this.val);
        }
      } else {
        if (this.value.includes(this.val)) {
          myVal= myVal.filter(v => {
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
      h(ZCanvas, {props: {speed: 1,sedColor:this.color}})
    ]),h("span",{on:{click:this.toggle}},this.title)])
  }

}


export {ZIcon, ZBtn, ZAlert, ZCheckbox,ZCanvas}
