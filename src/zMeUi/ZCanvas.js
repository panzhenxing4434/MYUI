const ZCanvas = {
  name: 'ZCanvas',
  props: {},
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
  methods: {
    click(e) {
      this.element = e.toElement;
      this.element.width = this.element.offsetWidth;
      this.element.height = this.element.offsetHeight;
      this.context = this.element.getContext('2d');
      this.centerX = e.layerX ;
      this.centerY = e.layerY;
      this.color = window.getComputedStyle(this.element.parentElement,null).color;
      this.radius = 0;
      this.draw();
    },
    draw() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
      this.context.beginPath();
      this.context.arc(this.centerX,this.centerY, this.radius, 0, 2 * Math.PI);
      this.context.fillStyle = this.color;
      this.context.fill();
      let self =this;
      new Promise(function (resolve, reject) {
        if (self.radius < self.element.width) {
           setTimeout(() => {
              self.radius += 3.5;
              resolve()
            }, 1000 / 60);

        } else {
            reject();
        }
      }).then(() => {
        this.draw()
      }, () => {
        this.context.clearRect(0,0,this.element.width,this.element.height)
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
