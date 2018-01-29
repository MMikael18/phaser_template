import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi'
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2'
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split'

import * as states from './states'
import config from './utils/config'

// let canvas_width = window.innerWidth * window.devicePixelRatio
// let canvas_height = window.innerHeight * window.devicePixelRatio

const gameConfig = {
    width: config.canvas_width,
    height: config.canvas_height,
    renderer: Phaser.CANVAS, // AUTO
    antialias: true,
    multiTexture: true,
    state: null,
    antialias: false             // { preload: preload, create: create, update: update }
}
let game = new Phaser.Game(gameConfig)

Object.keys(states).forEach(state => game.state.add(state, states[state]))
game.state.start('Boot')

//new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', this, transparent, antialias);