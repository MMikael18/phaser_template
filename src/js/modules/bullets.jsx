
import config from '../utils/config'

export default class bullets extends Phaser.Group {

    constructor({game}) 
    {
        super(game)
        this.game = game

        this.enableBody = true
        this.physicsBodyType = Phaser.Physics.ARCADE
    
        this.createMultiple(50, 'bullet')
        this.children.map((a)=>{a.scale.setTo(config.scale)})
        
        this.setAll('checkWorldBounds', true)
        this.setAll('outOfBoundsKill', true)

        this.fireRate = 200;
        this.nextFire = 0;
    }

    addToWold(x,y,dx,dy){
        
        if (this.game.time.now > this.nextFire && this.countDead() > 0)
        {
            console.log(`add bullet ${x + " " + y}`)
            this.nextFire = this.game.time.now + this.fireRate
    
            let bullet = this.getFirstDead()    
                bullet.reset(x, y)
    
            //this.game.physics.arcade.moveToPointer(bullet, 600)
            bullet.body.velocity.x = dx
            bullet.body.velocity.y = dy

        }
    }

    render() {
        this.debug.text('Active Bullets: ' + this.countLiving() + ' / ' + this.total, 32, 32);
        //this.debug.spriteInfo(sprite, 32, 450);    
    }
}