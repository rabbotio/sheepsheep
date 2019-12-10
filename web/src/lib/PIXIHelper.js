import * as PIXI from 'pixi.js'

const _buildISOSprite = texture => {
  texture.baseTexture.resolution = window.devicePixelRatio
  const sprite = new PIXI.Sprite(texture)
  sprite.anchor.set(0.5, 1)

  return sprite
}

const buildEmptySprite = ({ renderer, x, y, width, height }) => {
  const texture = renderer.generateTexture(new PIXI.Graphics().drawRect(0, 0, width, height))
  const sprite = _buildISOSprite(texture)
  sprite.x = x
  sprite.y = y

  return sprite
}

const buildStaticSprite = ({ texture, tint, width, height }) => {
  const sprite = _buildISOSprite(texture)

  sprite.width = width
  sprite.height = height

  if (tint) {
    sprite.tint = tint
    sprite.name = 'tinted'
  }

  return sprite
}

export default { buildEmptySprite, buildStaticSprite }
