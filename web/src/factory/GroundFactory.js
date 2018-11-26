import * as PIXI from 'pixi.js'
import BlockFactory from './BlockFactory'
import ShadowFactory from './ShadowFactory'

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

    const shadow = ShadowFactory.castRectShadow({
      x: x + i * 0.5 - r * 0.5,
      y: y + j * 0.5 + r * 0.5,
      width: r,
      height: r
    })
    grounds.unshift(shadow)

    return grounds
  }
}

export default GroundFactory
