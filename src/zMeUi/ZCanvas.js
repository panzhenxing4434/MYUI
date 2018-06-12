const ZCanvas = {
  name: 'ZCanvas',
  props: {
    speed: Number,
    cClass: String,
    sedColor: String,
    canStyle: String,
    bool: {
      type: Boolean,
      default: false
    },
    clickOn:Function
  },
  data() {
    return {
      element: null,
      context: null,
      centerX: null,
      centerY: null,
      radius: null,
      color: null,
    }
  },
  computed: {
    classes() {
      return this.cClass != null ? this.cClass : "";
    }
  },
  methods: {
    click(e) {
      this.element = e.toElement;
      this.element.width = this.element.offsetWidth;
      this.element.height = this.element.offsetHeight;
      this.context = this.element.getContext('2d');
      if (this.bool) {
        this.centerX = this.element.offsetWidth / 2;
        this.centerY = this.element.offsetHeight / 2;
      } else {
        this.centerX = e.layerX;
        this.centerY = e.layerY;
      }

      if (this.canStyle != null) {
        this.element.style.borderRadius = this.canStyle;
      }
      if (this.sedColor == null) {
        this.color = window.getComputedStyle(this.element.parentElement, null).color;
      }
      this.radius = 0;
      this.draw();
      if(this.clickOn !=null && this.clickOn !=""){
        this.clickOn(e);
      }
    },
    draw() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
      this.context.beginPath();
      this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
      this.context.fillStyle = this.sedColor != null ? this.sedColor : this.color;
      this.context.fill();
      let self = this;
      new Promise(function (resolve, reject) {
        if (self.radius < self.element.width) {
          setTimeout(() => {
            self.radius += self.speed;
            resolve()
          }, 1000 / 60);

        } else {
          reject();
        }
      }).then(() => {
        this.draw()
      }, () => {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
      })

    }
  },
  render(h) {
    return h("canvas", {
      attrs: {id: "myCanvas"},
      staticClass: 'myCanvas',
      'class': this.classes,
      style: this.style,
      on: {click: this.click},
    })
  }
}


export default ZCanvas
