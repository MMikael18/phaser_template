import config from '../utils/config'
import Monster      from '../modules/monster'

export default class Spawnpoint extends Phaser.Group {

    constructor({game}) 
    {
        super(game)
        this.game = game

        this.monster = new Monster({
            game: this.game,
            x: config.game_width / 2, 
            y: config.game_height / 2,
            asset: 'monster'
        })
        this.game.add.existing(this.monster) 
    }

    update() 
    {   

    }

}