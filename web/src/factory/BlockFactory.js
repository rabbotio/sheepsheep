import * as PIXI from 'pixi.js'

class BlockFactory {
  static build = ({ src, x = 0, y = 0, width = 128, height = 128 }) => {
    const create = src => {
      // Init
      const texture = PIXI.loader.resources[src].texture
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
      if (!PIXI.loader.resources[src]) {
        PIXI.loader.add(src, src).load(() => resolve(create(src)))
      } else {
        resolve(create(src))
      }
    })
  }
}

export default BlockFactory
