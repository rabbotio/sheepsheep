import ShadowFactory from './ShadowFactory'
import PIXIHelper from '../lib/PIXIHelper'

class CharacterFactory {
  static build = ({ renderer, loader, src, x = 0, y = 0, width = 32, height = 32, tint, onClick }) =>
    new Promise((resolve, reject) => {
      // Required
      if (!src) reject(new Error("Required src e.g. { src: ['./duck.svg']"))

      // Array
      if (typeof src === 'string') src = [src]

      // Base sprite
      const sprite = PIXIHelper.buildEmptySprite({ renderer, x, y, width, height })

      // Shadow
      sprite.addChild(ShadowFactory.castOvalShadow({ renderer, width, height }))

      // Elements
      src.map(e => loader.add(e, e))
      loader.load((loader, resources) =>
        src.map(e => {
          return sprite.addChild(
            PIXIHelper.buildStaticSprite({
              tint: e.tint,
              texture: resources[e.url].texture,
              width,
              height
            })
          )
        })
      )

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
