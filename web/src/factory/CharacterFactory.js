import * as PIXI from 'pixi.js'
import ShadowFactory from './ShadowFactory'

class CharacterFactory {
  static build = ({ renderer, loader, src, x = 0, y = 0, width = 32, height = 32, tint, onClick }) =>
    new Promise((resolve, reject) => {
      // Required
      if (!src) reject(new Error("Required src e.g. { src: ['./duck.svg']"))

      const graphics = new PIXI.Graphics()
      graphics.drawRect(0, 0, width, height)
      graphics.endFill()
      const texture = renderer.generateTexture(graphics)
      texture.baseTexture.resolution = window.devicePixelRatio
      const sprite = new PIXI.Sprite(texture)

      // Shadow
      sprite.anchor.set(0.5, 1)
      sprite.x = x
      sprite.y = y

      sprite.addChild(ShadowFactory.castOvalShadow({ renderer, width, height }))

      src.map(e => loader.add(e, e))

      loader.load((loader, resources) => {
        src.map(e => {
          const _texture = resources[e.url].texture
          _texture.baseTexture.resolution = window.devicePixelRatio
          const _sprite = new PIXI.Sprite(_texture)
          _sprite.anchor.set(0.5, 1)

          if (e.tint) {
            _sprite.tint = e.tint
            _sprite.name = 'tinted'
          }

          return sprite.addChild(_sprite)
        })
      })

      // Event
      if (onClick && typeof onClick === 'function') {
        // Opt-in to interactivity
        sprite.interactive = true

        // Shows hand cursor
        sprite.buttonMode = true

        // Pointers normalize touch and mouse
        sprite.on('pointerdown', onClick)
      }

      resolve(sprite)
    })
}

export default CharacterFactory
