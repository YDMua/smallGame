import * as THREE from "./libs/three.min.js"
/**
 * 游戏主函数
 */
GameGlobal.ImageBitmap = function() {}
export default class Main {
  camera = null
  scene = null
  renderer = null
  startBtnInfo = {}
  screenWidth = null
  screenHeight = null
  constructor() {
    console.log("渲染开始界面")
    let info = wx.getSystemInfoSync()
    // 获取设备的宽高
    this.screenWidth = info.screenWidth
    this.screenHeight = info.screenHeight
    this.init()
    this.drawCanvas()
  }
  drawCanvas() {
    let canvas2d = wx.createCanvas()
    canvas2d.width = this.screenWidth
    canvas2d.height = this.screenHeight
    let ctx = canvas2d.getContext("2d")
    ctx.fillStyle = "white"
    ctx.fillRect(10, 10, this.screenWidth / 2 - 20, this.screenHeight / 2 - 20)
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.font = "16pt Arial"
    ctx.textBaseline = "middle"
    ctx.fillText("蚂蚁", this.screenWidth / 4, this.screenHeight / 4)

    let texture = new THREE.Texture(canvas2d)
    texture.needsUpdate = true

    var spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      color: 0xffffff
    })
    var sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(200, 400, 1)
    sprite.position.set(10, 0, 10)
    this.scene.add(sprite)
    this.renderer.render(this.scene, this.camera)
  }
  init() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas
    })
    this.renderer.setSize(this.screenWidth, this.screenHeight)
    this.renderer.setClearColor("#cecece", 1)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.screenWidth / this.screenHeight,
      10,
      1000
    )
    this.camera.position.z = 500
    this.scene.add(this.camera)
  }
}
