import * as PIXI from 'pixi.js'
import ShadowFactory from './ShadowFactory'

class CharacterFactory {
  static build = ({
    src,
    x = 0,
    y = 0,
    width = 80,
    height = 80,
    tint,
    tintSrc,
    onClick
  }) =>
    new Promise((resolve, reject) => {
      // Required
      if (!src) reject(new Error("Required src e.g. { src: './duck.svg'"))

      const onLoad = () => {
        // Init
        const sprite = new PIXI.Sprite(PIXI.loader.resources[src].texture)

        // Set the initial position
        sprite.anchor.set(0.5, 1)
        sprite.x = x
        sprite.y = y
        sprite.width = width
        sprite.height = height

        // Tint
        if (tintSrc) {
          PIXI.loader.add(tintSrc, tintSrc).load(() => {
            const tintSprite = new PIXI.Sprite(
              PIXI.loader.resources[tintSrc].texture
            )
            tintSprite.anchor.set(0.5, 1)
            sprite.addChild(tintSprite)
            tintSprite.tint = tint
            tintSprite.name = 'tinted'
          })
        }

        // Shadow
        sprite.addChild(ShadowFactory.castOvalShadow(x, y))

        if (onClick && typeof onClick === 'function') {
          // Opt-in to interactivity
          sprite.interactive = true

          // Shows hand cursor
          sprite.buttonMode = true

          // Pointers normalize touch and mouse
          sprite.on('pointerdown', onClick)
        }

        resolve(sprite)
      }

      PIXI.loader.add(src, src).load(onLoad)
    })
}

export default CharacterFactory
