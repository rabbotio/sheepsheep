import * as PIXI from 'pixi.js'

class ButtonFactory {
  static build = ({
    label = 'OK',
    labelFont = 'Tahoma',
    fontSize = 24,
    labelColor = 0x000000,
    x = 0,
    y = 0,
    width = 128,
    height = 32,
    round = 8,
    color = 0xffffff
  }) => {
    const graphics = new PIXI.Graphics()

    // 3D Glass effect
    const effectSpan = 1.5
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
    const roundedSprite = new PIXI.Sprite(texture)
    roundedSprite.position.set(x - width * 0.5, y)

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
    roundedSprite.addChild(labelText)

    return roundedSprite
  }
}

export default ButtonFactory
