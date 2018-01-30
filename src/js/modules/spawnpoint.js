import config from '../utils/config'
import Monster      from '../modules/monster'

export default class Spawnpoint extends Phaser.Group {

    constructor({game}) 
    {
        super(game)
        this.game = game

        //this.createMultiple(40, 'monster')
        for (let index = 0; index < 5; index++){                    
            let monster = new Monster({
                game: this.game,
                asset: 'monster'
            })            
            this.add(monster)
            monster.kill()
        }
        
        this.game.time.events.loop(Phaser.Timer.SECOND, this.spawn, this);
    }

    spawn()
    {        
        let m = this.getFirstDead()
        if(m === null){
            m = this.addMonster()
        }
        m.checkWorldBounds = false
        m.reset( -150, Math.floor((Math.random() * config.game_height) + 1))                
        m.body.velocity.x = 40 + Math.floor((Math.random() * 40))
        m.animations.play('right')    
    }

    addMonster()
    {
        let monster = new Monster({
            game: this.game,
            asset: 'monster'
        })            
        this.add(monster)
        return monster
    }

    update() 
    {
        for (const key in this.children ) {
            let element = this.children[key]
            if(element.x > 0){
                element.checkWorldBounds = true
            }
        }
    }


}