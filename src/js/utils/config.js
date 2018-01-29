
let instance = null;

class Config {

    constructor() {
        if(!instance){
              instance = this;
        }

        // to test whether we have singleton or not
        this.time = new Date()

        //let canvas_width = window.innerWidth * window.devicePixelRatio;
        //let canvas_height = window.innerHeight * window.devicePixelRatio;
        //let aspect_ratio = canvas_width / canvas_height;
        
        this.scale = 4;
        
        // canvas
        this.canvas_width = 1200 //window.innerWidth * window.devicePixelRatio
        this.canvas_height = 800 //window.innerHeight * window.devicePixelRatio

        // wold
        this.game_width = 800
        this.game_height = 600 //1080

        //if (aspect_ratio > 1) 
        //    this.scale = canvas_height / canvas_height_max;
         
        return instance;
    }

    getScale(){
        return this.scale
    }


}

export default new Config()