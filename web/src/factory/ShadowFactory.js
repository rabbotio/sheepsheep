import * as PIXI from 'pixi.js'

class ShadowFactory {
  static castRectShadow = ({ x = 0, y = 0, width = 128, height = 128 }) => {
    const graphics = new PIXI.Graphics()
    const w2 = width * 0.5
    const h2 = height * 0.5

    graphics.beginFill(0x000000, 0.25)
    graphics.moveTo(-w2, 0)
    graphics.lineTo(0, -h2 * Math.sin(15))
    graphics.lineTo(w2, 0)
    graphics.lineTo(0, h2 * Math.sin(15))
    graphics.lineTo(-w2, 0)
    graphics.endFill()

    const texture = graphics.generateCanvasTexture()
    const sprite = new PIXI.Sprite(texture)
    sprite.position.set(x, y)
    sprite.filters = [new PIXI.filters.BlurFilter(2)]

    return sprite
  }

  static castOvalShadow = ({ x = 0, y = 0, width = 32, height = 32 }) => {
    const graphics = new PIXI.Graphics()
    const h1 = height * Math.sin(15)

    graphics.beginFill(0x000000, 0.25)
    graphics.drawEllipse(0, 0, width, h1)
    graphics.endFill()

    const texture = graphics.generateCanvasTexture()
    const sprite = new PIXI.Sprite(texture)
    sprite.position.set(x - width, y - h1)
    sprite.filters = [new PIXI.filters.BlurFilter(2)]

    return sprite
  }
}

export default ShadowFactory
