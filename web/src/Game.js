import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import CharacterFactory from './factory/CharacterFactory'
import GroundFactory from './factory/GroundFactory'

class Game extends Component {
  constructor (props) {
    super(props)
    this.duck = null
    this.pixi_cnt = null
    this.app = new PIXI.Application({
      width: 600,
      height: 600,
      transparent: false
    })

    this.STAGE = {
      mx: this.app.screen.width / 2,
      my: this.app.screen.height / 2
    }

    // Layers
    const groundContainer = new PIXI.Container()
    const characterContainer = new PIXI.Container()

    this.containers = { groundContainer, characterContainer }

    this.app.stage.addChild(groundContainer)
    this.app.stage.addChild(characterContainer)
  }

  setup = () => {
    this.init()
  }

  onClick = e => {
    console.log('onClick:', e.target)
    e.target.scale.x *= 1.25
    e.target.scale.y *= 1.25
  }

  init = async () => {
    // Ground
    this.grounds = await GroundFactory.build({
      x: this.STAGE.mx,
      y: this.STAGE.my,
      colSize: 8,
      maps: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0
      ]
    })
    this.deploy(this.grounds, this.containers.groundContainer)

    // Characters
    this.duck = await CharacterFactory.build({
      src: './duck.svg',
      x: this.STAGE.mx,
      y: this.STAGE.my,
      onClick: this.onClick
    })
    this.deploy([this.duck])
  }

  deploy = (targets, container) => {
    targets &&
      targets.forEach(target => {
        if (!container) this.app.stage.addChild(target)
        else container.addChild(target)
      })
  }

  updatePixiCnt = element => {
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    this.pixi_cnt = element
    // now we are adding the application to the DOM element which we got from the Ref.
    if (this.pixi_cnt && this.pixi_cnt.children.length <= 0) {
      this.pixi_cnt.appendChild(this.app.view)
      // The setup function is a custom function that we created to add the sprites. We will this below
      this.setup()
    }
  }

  render () {
    return <div ref={this.updatePixiCnt} />
  }
}

export default Game
