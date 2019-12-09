import * as PIXI from 'pixi.js'

class BlockFactory {
  static resources = {}
  static build = ({ loader, src, x = 0, y = 0, width = 128, height = 128 }) => {
    const create = (resources_src) => {
      // Init
      const texture = resources_src.texture
      texture.baseTexture.resolution = window.devicePixelRatio
      const sprite = new PIXI.Sprite(texture)

      // Set the initial position
      sprite.anchor.set(0.5, 0.25)
      sprite.x = x
      sprite.y = y
      sprite.width = width
      sprite.height = height

      return sprite
    }

    return new Promise((resolve, reject) => {
      // Required
      if (!src) reject(new Error("Required src e.g. { src: './grass.svg'"))

      // Load and create
      if (!BlockFactory.resources[src]) {
        loader.add(src, src).load((loader, resources) => resolve(create(BlockFactory.resources[src] = resources[src])))
      } else {
        resolve(create(BlockFactory.resources[src]))
      }
    })
  }
}

export default BlockFactory
