export default class Menu extends Phaser.State {

    create() 
    {
        let button = this.add.button(
            this.world.centerX - 95, 
            this.world.centerY - 35, 
            'button', 
            this.actionOnClick, this, 2, 1, 0
        )
        // button.onInputOver.add(over, this)
        // button.onInputOut.add(out, this)
        // button.onInputUp.add(up, this)

        this.state.start('Level', true, false, "level 1")
    }

    actionOnClick () 
    {
        this.state.start('Level', true, false, "level 1")
    }

}