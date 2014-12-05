// TODO
//extend gives us access to every single piece of Entity class.
//Init function sets up our player
game.PlayerEntity = me.Entity.extend ({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "mario",
                spritewidth: "128",
                spriteheight: "128",
                width: 128,
                height: 128,
                getShape: function(){
                    return (new me.Rect(0, 0, 30, 128)).toPolygon();
                }
        }]);
     
     this.renderable.addAnimation("idle", [3]);
     //adds an aray which values 8-13
     this.renderable.addAnimation("smallWalk", [8,9, 10, 11, 12, 13], 80);
     
     this.renderable.setCurrentAnimation("idle");
     
     this.body.setVelocity(5, 20);
     //makes the screen follow mario's position
     me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
     
    },
     
    update: function(delta){
        //makes mario move right when the right key is press
        if (me.input.isKeyPressed("right")) {
            //flips the mario back to the right
            this.flipX(false);
            //adds value to marios x position
            //me.timer.tick moves the animation when update
            this.body.vel.x += this.body.accel.x * me.timer.tick;
           
        } else if (me.input.isKeyPressed("left")) {
            this.flipX(true);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;

        } else {
            this.body.vel.x = 0;
        }

 





        if (me.input.isKeyPressed("up")) {
            if (!this.body.jumping && !this.body.falling) {
                this.body.vel.y -= this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }

        }


       

        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function (response){
        
    }
    
});

game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
    },
    
    onCollision: function(){
       this.body.setCollisionMask(me.collision.types.NO_OBJECT);
       me.levelDirector.loadLevel(this.level);
       me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }
});

game.BadGuy = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "slime",
                spritewidth: "60",
                spriteheight: "28",
                width: 60,
                height: 28,
                getShape: function(){
                    return (new me.Rect(0, 0, 60, 28)).toPolygon();
                }
        }]);
    
    this.spritewidth = 60;
    var width = settings.width;
    x = this.pos.x;
    this.startX = x;
    this.endX = x + width - this.spritewidth;
    this.pos.x = x + width - this.spritewidth;
    this.updateBounds();
    
    this.alwaysUpdate = true;
    
    this.walkLeft = false;
    this.Alive = true;
    this.type = "BadGuy";
    
   // this.renderable.addAnimation("run", [0, 1, 2], 80);
   // this.renderable.addCurrentAnimation("run");
   
   this.body.setVelocity(4, 6);
   
   
   
    },
    update: function(delta){
      this.body.update(delta);
      me.collision.check(this, true, this.collideHandler.bind(this), true); 
      
      if(this.alive){
          if(this.walkLeft && this.pos.x <= this.startx){
              this.walkLeft = false;
          }else if(!this.walkLeft && this.pos.x >= this.endX){
              this.walkLeft = true;
          }
          this.flipX(!this.walkLeft);
          this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
      }else{
          me.game.world.removeChild(this);
      }
      
      
      this._super(me.Entity, "update", [delta]);
      return true;
    },
    
    collideHandler: function(){
        
    }
    
});


 
        
        //if(me.input.isKeyPressed("left")) {
            //this.body.vel.x -= this.body.accel.x * me.timer.tick;
        //}else{
        //this.body.vel.x = 0;
       // }
         //if(this.body.vel.x !== 0){
            //if (!this.renderable.isCurrentAnimation("smallWalk")){
               // this.renderable.setCurrentAnimation("smallWalk");
                //this.renderable.setAnimationFrame();
            //}
        //}else{
              // this.renderable.setCurrentAnimation("idle");
       // }
        // if(me.input.isKeyPressed("jump")) {
          //this.body.vel.y -= this.body.accel.y * me.timer.tick; 
         
        //}else{
           // this.body.vel.y = 0;
       // } 
       
       //
        
         // if (me.input.isKeyPressed("left")) {
          //  this.flipX(true);
           // this.body.vel.x -= this.body.accel.x * me.timer.tick;
            //if (!this.renderable.isCurrentAnimation("walk")) {
             //   this.renderable.setCurrentAnimation("walk");
            //}
            
       // } else if (me.input.isKeyPressed("right")) {
           // this.flipX(false);
           // this.body.vel.x += this.body.accel.x * me.timer.tick;
           // if (!this.renderable.isCurrentAnimation("walk")) {
            //    this.renderable.setCurrentAnimation("walk");
           // }
            
       // } else {
            //this.body.vel.x = 0;
            //this.renderable.setCurrentAnimation("stand");
        //}    
        
        //if (me.input.isKeyPressed('jump')) {

           // if (!this.body.jumping && !this.body.falling) {

               // this.body.vel.y -= this.body.maxVel.y * me.timer.tick;
               
               // this.body.jumping = true;
           // }
 
       // }
 
        
      
       //this.body.update(delta);
        //me.collision.check(this, true, this.collideHandler.bind(this), true);  
       
        