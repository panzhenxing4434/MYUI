/**
 *
 * 字体图标
 */
let ZIcon ={
  name: 'ZIcon',
  props: {
    name: String,
    color: String,
    size: String,
    title: String
  },
  computed: {
    classes () {
      return  this.name !="" && this.name !=null ? this.name : "";
    },
    content () {
      return this.title !="" && this.title !=null ? this.title : "";
    },
    style () {
      if (this.size) {
        return { fontSize: this.size }
      }
    }
  },
  render (h) {
    return h('i', {
      staticClass: '',
      'class': this.classes,
      style: this.style
    }, [
      this.content,
      this.$slots.default
    ])
  }
}

export  { ZIcon }
