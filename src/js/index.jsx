import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi'
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2'
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split'

import * as states from './states'

const config = {
    width: 800,
    height: 600,
    renderer: Phaser.AUTO,
    antialias: true,
    multiTexture: true,
    state: null             // { preload: preload, create: create, update: update }
}
const game = new Phaser.Game(config)

Object.keys(states).forEach(state => game.state.add(state, states[state]))
game.state.start('Boot')
//Object.keys(states).forEach(state => console.log(state))