
export default class arrows extends Phaser.Sprite {

    constructor({ game, x, y, asset, pid }) 
    {
        super(game, x, y, asset)
        this.game = game

        arrows = game.add.group();
        arrows.enableBody = true;
        arrows.physicsBodyType = Phaser.Physics.ARCADE;
    
        arrows.createMultiple(50, 'arrow');
        arrows.setAll('checkWorldBounds', true);
        arrows.setAll('outOfBoundsKill', true);

    }

    update() 
    {}

}