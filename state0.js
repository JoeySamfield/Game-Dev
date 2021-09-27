var demo = {}, centerX = 1000/2, centerY = 400/2;;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image("background", "pix/sunrise.jpg");
        game.load.image("purple", "pix/darkPurple.png");
        game.load.spritesheet('walk', "pix/walk.png", 44, 61);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0,0,"background")
    

        // create land group
        land = game.add.group()

        land.enableBody = true

        //create ground
        var bottom = land.create(0, 350, 'purple')
        bottom.width = 1000
        bottom.body.immovable = true

        //create ledges
        let platformList = [[0,260,30,500],[600,260,30,500], [800,150,50,500], [300,150,50,400], [500,70,30,500], [300,0,150,30],[0,80,30,150],[150,170,30,150]]
        
        for (i = 0; i < platformList.length; i++) {
            var platform = land.create(platformList[i][0],platformList[i][1],"purple")
            platform.height = platformList[i][2]
            platform.width = platformList[i][3]
            platform.body.immovable = true
        }
        //create character 
        char1 = game.add.sprite(900,10, 'walk');
        char1.frame = 0;
        char1.anchor.x = .5
        char1.animations.add('walk', [0, 1, 2, 3, 4, 5]);

        //add gravity and physics
        game.physics.arcade.enable(char1)
        char1.body.gravity.y = 400;
        char1.body.collideWorldBounds = true;

        //add controls
        cursors = game.input.keyboard.createCursorKeys()


    },
    update: function(){

        var stand = game.physics.arcade.collide(char1, land);
        char1.body.velocity.x = 0;
        
    

    if (cursors.up.isDown && stand)
    {  
        if(char1.body.touching.down) {
            char1.body.velocity.y = -200;
        } else if(char1.body.touching.up) {
            char1.body.velocity.y = 10
        } else {
            char1.body.velocity.y = -75
        }
    
    }
    if (cursors.left.isDown){
            char1.body.velocity.x = -200;
            char1.animations.play('walk', 20, true);
            char1.scale.setTo(-1,1)
            }
    else if (cursors.right.isDown){
            char1.body.velocity.x = 200;
            char1.animations.play('walk', 20, true);
            char1.scale.setTo(1,1)
            }
    else{
        char1.animations.stop('walk');
        char1.frame = 0;
    }      
    
        
        }
    }



