import * as PIXI from 'pixi.js'

import CharacterFactory from '../factory/CharacterFactory'
import GroundFactory from '../factory/GroundFactory'
import ButtonFactory from '../factory/ButtonFactory'

class CharacterScene {
  constructor(app) {
    this.STAGE = {
      mx: app.screen.width / 2,
      my: app.screen.height / 2
    }

    // Layers
    const groundContainer = new PIXI.Container()
    const characterContainer = new PIXI.Container()
    const interactiveContainer = new PIXI.Container()

    this.containers = {
      groundContainer,
      characterContainer,
      interactiveContainer
    }

    app.stage.addChild(groundContainer)
    app.stage.addChild(characterContainer)
    app.stage.addChild(interactiveContainer)

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
      renderer: app.renderer,
      loader: app.loader,
      x: this.STAGE.mx,
      y: this.STAGE.my,
      colSize: 8,
      maps: [1]
    })

    // Tint
    const tint = Math.random() * 0xffffff

    // Characters
    this.cat = await CharacterFactory.build({
      renderer: app.renderer,
      loader: app.loader,
      src: [{ url: './duck.svg' }, { url: './duck-tint.svg', tint }, { url: './duck-fg.svg' }],
      x: this.STAGE.mx,
      y: this.STAGE.my
    })

    // Button
    this.okButton = await ButtonFactory.build({
      renderer: app.renderer,
      label: 'OK!',
      x: this.STAGE.mx,
      y: this.STAGE.my + 200,
      onClick: e => {
        console.log('onClick:', e.target)
        const tinted = this.cat.getChildByName('tinted')
        tinted.tint = Math.random() * 0xffffff
      }
    })

    // Deploy
    this.deploy(app, [this.cat], this.containers.characterContainer)
    this.deploy(app, this.grounds, this.containers.groundContainer)
    this.deploy(app, [this.okButton], this.containers.interactiveContainer)
  }
}

export default CharacterScene
