import * as THREE from "./libs/three.min.js"
/**
 * 游戏主函数
 */
GameGlobal.ImageBitmap = function () {}
export default class Main {
  camera = null
  scene = null
  renderer = null
  light = null

  constructor() {
    this.initRender()
    this.initScene()
    this.initCamera()
    this.initLight()
    this.initBlock()
    this.drawPlane()
    // this.drawGeometry()
    this.render()
  }
  initRender() {
    const ctx = canvas.getContext("webgl")
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    })
    this.renderer.setSize(GameGlobal.innerWidth, GameGlobal.innerHeight)
    this.renderer.setClearColor("#eee", 1)
  }
  initScene() {
    // 实例化场景
    this.scene = new THREE.Scene()

    var gridHelper = new THREE.GridHelper(50, 50, 0x808080, 0x808080)
    this.scene.add(gridHelper)
    this.scene.add(new THREE.AxesHelper(10))
  }
  initCamera() {
    // 实例化相机
    let aspect = GameGlobal.innerWidth / GameGlobal.innerHeight
    let d = 20
    this.camera = new THREE.OrthographicCamera(-d * aspect,
      d * aspect,
      d, -d, -100,
      1000
    )
    this.camera.position.x = 2
    this.camera.position.y = 2
    this.camera.position.z = 2
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  }
  initLight() {
    this.light = new THREE.DirectionalLight(0xffffff)
    this.light.position.set(20, 10, 5)
    this.scene.add(this.light)
  }
  render() {
    // 渲染整个场景
    this.renderer.render(this.scene, this.camera)
  }
  initBlock() {
    let geometry = new THREE.BoxGeometry(10, 10, 10)
    var material = new THREE.MeshLambertMaterial({
      color: "#cecece"
    })
    this.startCube = new THREE.Mesh(geometry, material)
    this.startCube.position.set(0, 0, 0)
    this.scene.add(this.startCube)
  }
  drawPlane() {
    // 创建canvas2d画布
    let offCanvas = wx.createCanvas()
    offCanvas.width = GameGlobal.innerWidth
    offCanvas.height = GameGlobal.innerHeight
    let ctx = offCanvas.getContext("2d")

    // 阴影背景
    ctx.fillStyle = "rgba(0,0,0, 0.5)"
    ctx.fillRect(0, 0, GameGlobal.innerWidth, GameGlobal.innerHeight)

    ctx.fillStyle = "#fff"
    ctx.font = "bold 40px Arial"
    ctx.textAlign = "center"
    ctx.fillText("我是蚂蚁", GameGlobal.innerWidth / 2, 200)

    ctx.fillStyle = "#fff"
    ctx.font = "bold 20px Arial"
    ctx.textAlign = "center"
    ctx.fillText("开始游戏", GameGlobal.innerWidth / 2, 500)

    let texture = new THREE.Texture(offCanvas)
    texture.needsUpdate = true

    var spriteMaterial = new THREE.SpriteMaterial({
      map: texture
    })
    let sprite = new THREE.Sprite(spriteMaterial)
    sprite.position.set(12, 12, 12)
    sprite.scale.set(23, 40, 1)
    this.scene.add(sprite)
  }
  drawGeometry() {
    var geometry = new THREE.PlaneGeometry(10, 10)
    var material = new THREE.MeshBasicMaterial({
      color: 'red'
    })
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.y = 45 * Math.PI / 180;
    plane.position.set(10, 2, 10)
    this.scene.add(plane);
  }
}