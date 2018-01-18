
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
        //if (aspect_ratio > 1) 
        //    this.scale = canvas_height / canvas_height_max;
         
        return instance;
    }

    getScale(){
        return this.scale
    }


}

export default new Config()