// export default class Boot extends Phaser.State {

export default class Boot extends Phaser.State {
    
    preload ()
    {
        // image
        this.load.image('ground', 'assets/ground.png')
        //this.load.image('ground', 'assets/platform.png')
        this.load.image('star', 'assets/star.png')
        // spritesheet
        this.load.spritesheet('player', 'assets/dude.png', 32, 48)
        this.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71)
    }
    
    create ()     
    {
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        //this.scale.pageAlignHorizontally = true
        //this.scale.pageAlignVertically = true
        //this.scale.setScreenSize( true )
        //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        //this.game.scale.refresh()

        //let canvas_width = window.innerWidth * window.devicePixelRatio;
        //let canvas_height = window.innerHeight * window.devicePixelRatio;
        //let aspect_ratio = canvas_width / canvas_height;
        //if (aspect_ratio > 1) scale_ratio = canvas_height / canvas_height_max;
        //else scale_ratio = canvas_width / canvas_width_max;

        //this.ball = game.add.sprite((game.world.centerX), game.world.centerY, 'ball');
        //this.ball.scale.set(scale_ratio);

        this.state.start('Menu')
    }

}
