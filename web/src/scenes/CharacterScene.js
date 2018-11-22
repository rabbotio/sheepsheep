import * as PIXI from 'pixi.js'

import CharacterFactory from '../factory/CharacterFactory'
import GroundFactory from '../factory/GroundFactory'

class CharacterScene {
  constructor (app) {
    this.STAGE = {
      mx: app.screen.width / 2,
      my: app.screen.height / 2
    }

    // Layers
    const groundContainer = new PIXI.Container()
    const characterContainer = new PIXI.Container()

    this.containers = { groundContainer, characterContainer }

    app.stage.addChild(groundContainer)
    app.stage.addChild(characterContainer)

    this.init(app)
  }

  deploy = (app, targets, container) => {
    targets &&
      targets.forEach(target => {
        if (!container) app.stage.addChild(target)
        else container.addChild(target)
      })
  }

  init = async app => {
    // Ground
    this.grounds = await GroundFactory.build({
      x: this.STAGE.mx,
      y: this.STAGE.my,
      colSize: 8,
      maps: [1]
    })

    // Tint
    const tint = Math.random() * 0xffffff

    // Characters
    this.duck = await CharacterFactory.build({
      src: './duck.svg',
      fg: './duck-fg.svg',
      x: this.STAGE.mx,
      y: this.STAGE.my,
      tint
    })

    // Deploy
    this.deploy(app, [this.duck], this.containers.characterContainer)
    this.deploy(app, this.grounds, this.containers.groundContainer)
  }
}

export default CharacterScene
