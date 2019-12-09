import * as PIXI from 'pixi.js'
import ShadowFactory from './ShadowFactory'

class CharacterFactory {
  static build = ({ renderer, loader, src, x = 0, y = 0, width = 80, height = 80, tint, tintSrc, fgSrc, onClick }) =>
    new Promise((resolve, reject) => {
      // Required
      if (!src) reject(new Error("Required src e.g. { src: './duck.svg'"))

      const onLoad = () => {
        // Init
        const _texture = loader.resources[src].texture
        _texture.baseTexture.resolution = window.devicePixelRatio

        const sprite = new PIXI.Sprite(_texture)

        // Set the initial position
        sprite.anchor.set(0.5, 1)
        sprite.x = x
        sprite.y = y
        sprite.width = width
        sprite.height = height

        // Tint
        if (tintSrc) {
          loader.add(tintSrc, tintSrc).load((loader, resources) => {
            const texture = resources[tintSrc].texture
            texture.baseTexture.resolution = window.devicePixelRatio

            const tintSprite = new PIXI.Sprite(texture)
            tintSprite.anchor.set(0.5, 1)
            tintSprite.tint = tint
            tintSprite.name = 'tinted'

            sprite.addChild(tintSprite)

            // fg
            if (fgSrc) {
              if (!resources[fgSrc].texture) {
                loader.add(fgSrc, fgSrc).load((loader, resources) => {
                  const texture = resources[fgSrc].texture
                  texture.baseTexture.resolution = window.devicePixelRatio

                  const fgSprite = new PIXI.Sprite(texture)
                  fgSprite.anchor.set(0.5, 1)
                  fgSprite.name = 'fg'

                  sprite.addChild(fgSprite)
                })
              } else {
                const texture = resources[fgSrc].texture
                const fgSprite = new PIXI.Sprite(texture)
                fgSprite.anchor.set(0.5, 1)
                fgSprite.name = 'fg'

                sprite.addChild(fgSprite)
              }
            }
          })
        }

        // Shadow
        sprite.addChild(ShadowFactory.castOvalShadow({ renderer }))

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

      loader.add(src, src).load(onLoad)
    })
}

export default CharacterFactory
