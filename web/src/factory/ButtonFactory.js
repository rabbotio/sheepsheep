import * as PIXI from 'pixi.js'

class ButtonFactory {
  static build = ({
    label = 'OK',
    labelFont = 'Tahoma',
    fontSize = 18,
    labelColor = 0x000000,
    x = 0,
    y = 0,
    width = 128,
    height = 32,
    round = 8,
    color = 0xffffff,
    onClick
  }) => {
    const graphics = new PIXI.Graphics()

    // Shadow
    const shadowSpan = 4
    graphics.beginFill(0x000000, 0.25)
    graphics.drawRoundedRect(shadowSpan, shadowSpan, width, height, round)
    graphics.endFill()

    // 3D Glass effect
    const effectSpan = 1.2
    graphics.beginFill(0x18ffff)
    graphics.drawRoundedRect(-effectSpan, -effectSpan, width, height, round)
    graphics.endFill()

    graphics.beginFill(0xff4081)
    graphics.drawRoundedRect(effectSpan, effectSpan, width, height, round)
    graphics.endFill()

    graphics.beginFill(color)
    graphics.drawRoundedRect(0, 0, width, height, round)
    graphics.endFill()
    const texture = graphics.generateCanvasTexture()

    // Sprite
    const sprite = new PIXI.Sprite(texture)
    sprite.position.set(x - width * 0.5, y)

    // Label
    const labelText = new PIXI.Text(label, {
      font: `${fontSize}px ${labelFont}`,
      fill: labelColor,
      align: 'center'
    })
    labelText.position.set(
      (width - labelText.width) * 0.5,
      (height - labelText.height) * 0.5
    )
    sprite.addChild(labelText)

    // Interactive
    if (onClick && typeof onClick === 'function') {
      sprite.interactive = true
      sprite.buttonMode = true
      sprite.on('pointerdown', onClick)
    }

    return sprite
  }
}

export default ButtonFactory
