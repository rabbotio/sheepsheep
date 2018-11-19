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

    return grounds
  }
}

export default GroundFactory
