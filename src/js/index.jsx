import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi'
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2'
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split'

import * as states from './states'

let canvas_width = 800  // window.innerWidth * window.devicePixelRatio
let canvas_height = 800 // window.innerHeight * window.devicePixelRatio

const config = {
    width: canvas_width,
    height: canvas_height,
    renderer: Phaser.CANVAS, // AUTO
    antialias: true,
    multiTexture: true,
    state: null             // { preload: preload, create: create, update: update }
}
let game = new Phaser.Game(config)

Object.keys(states).forEach(state => game.state.add(state, states[state]))
game.state.start('Boot')