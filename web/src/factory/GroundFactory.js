import * as PIXI from 'pixi.js'
import BlockFactory from './BlockFactory'

class GroundFactory {
  // Can we do better here?
  static asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  static build = async ({ group, x = 0, y = 0, colSize = 2, maps = [] }) => {
    const srcs = ['./soil.svg', './grass.svg']
    const grounds = []
    await GroundFactory.asyncForEach(maps, async (map, index) => {
      const i = index % colSize
      const j = Math.floor(index / colSize)

      const sprite = await BlockFactory.build({
        src: srcs[map],
        x: x + i * (64 - 8) - j * (64 - 8),
        y: y + j * 64 + i * 32 - j * 32
      })
      grounds.push(sprite)
    })

    // Shadow
    const index = maps.length
    const i = index % colSize
    const j = Math.floor(index / colSize)
    const r = (64 + 8) / Math.sin(15)

    const shadow = GroundFactory.castShadow({
      x: x + i * 0.5 - r * 0.5,
      y: y + j * 0.5 + r * 0.5,
      width: r,
      height: r
    })
    grounds.unshift(shadow)

    return grounds
  }

  static castShadow = ({ x = 0, y = 0, width = 128, height = 128 }) => {
    const graphics = new PIXI.Graphics()

    // set a fill and line style
    graphics.beginFill(0x000000, 0.25)

    // draw a shape
    const w2 = width * 0.5
    const h2 = height * 0.5
    graphics.moveTo(0, 0)
    graphics.lineTo(w2, -h2 * Math.sin(15))
    graphics.lineTo(width, 0)
    graphics.lineTo(w2, h2 * Math.sin(15))
    graphics.lineTo(0, 0)
    graphics.endFill()

    const texture = graphics.generateCanvasTexture()
    const sprite = new PIXI.Sprite(texture)
    sprite.position.set(x, y)

    return sprite
  }
}

export default GroundFactory
