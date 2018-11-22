import * as PIXI from 'pixi.js'

class CharacterFactory {
  static build = ({
    src,
    x = 0,
    y = 0,
    width = 64,
    height = 64,
    tint,
    fg,
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
        if (fg) {
          PIXI.loader.add(fg, fg).load(() => {
            const fgSprite = new PIXI.Sprite(PIXI.loader.resources[fg].texture)
            fgSprite.anchor.set(0.5, 1)
            sprite.addChild(fgSprite)
          })
          sprite.tint = tint
        }

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
