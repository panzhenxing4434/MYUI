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
      return this.name != "" && this.name != null ? this.name : "";
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
      this.$emit("click",e);
    }
  },
  render(h) {
    return h('button', {
      staticClass: 'z-btn',
      'class': this.classes,
      style: this.$attrs.flat != null ? {"background": "white"} : "",
      on: this.events,
      ref: 'myRef',
    }, this.iconPosition == "right" ? [this.title, h(ZIcon, {props: {name: this.icon}})] : [h(ZCanvas, {props: {}}), h(ZIcon, {props: {name: this.icon}}), this.title])
  }

}





export {ZIcon, ZBtn}
