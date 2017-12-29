// export default class Boot extends Phaser.State {

export default class Boot extends Phaser.State {
    
    preload ()
    {
        // image
        this.load.image('sky', 'assets/sky.png')
        this.load.image('ground', 'assets/platform.png')
        this.load.image('star', 'assets/star.png')
        // spritesheet
        this.load.spritesheet('player', 'assets/dude.png', 32, 48)
        this.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71)
    }
    
    create ()     
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        this.scale.pageAlignHorizontally = true
        this.scale.pageAlignVertically = true

        this.state.start('Menu')
    }

}
