var demo = {}, centerX = 1000/2, centerY = 400/2, turn = true, nextFire = 0, fireRate = 200, bullet, land, platform, rockRate = 3000, nextRock = 0;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image("background", "pix/sunrise.jpg");
        game.load.image("back_wall", "pix/back-walls.png");
        game.load.image("purple", "pix/purple3.jpg");
        game.load.spritesheet('walk', "pix/walk2.png", 128, 128);
        game.load.image('bullet', 'pix/bullet.png');
        game.load.image('monster', 'pix/enemy.png');
        game.load.image('rock', 'pix/rock.png');

    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0,0,"background")

        back_wall = game.add.sprite(0, 0, "back_wall"); // NEW CAVE BACKGROUND
        back_wall.height = 400;
        back_wall.width = 1000;
    

        // create land group
        land = game.add.group()
        game.physics.enable(land);
        land.enableBody = true;

        //create ground
        var bottom = land.create(0, 350, 'purple')
        bottom.width = 1000
        bottom.body.immovable = true

        //create ledges
        let platformList = [[0,260,30,500],[600,260,30,500], [800,150,50,500], [300,150,50,400], [500,70,30,500], [300,0,150,30],[0,80,30,150],[150,170,30,150]]
        
        for (i = 0; i < platformList.length; i++) {
            platform = land.create(platformList[i][0],platformList[i][1],"purple")
            platform.height = platformList[i][2]
            platform.width = platformList[i][3]
            platform.body.immovable = true
        }
        //create character 
        char1 = game.add.sprite(900,10, 'walk');
        char1.scale.setTo(.25,.25);
        char1.frame = 0;
        char1.anchor.x = .5
        char1.animations.add('walk', [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15]);

        //add gravity and physics
        game.physics.arcade.enable(char1);
        char1.body.gravity.y = 400;
        char1.body.collideWorldBounds = true;

        //add controls
        cursors = game.input.keyboard.createCursorKeys()

        //create game camera
        //game.world.setBounds(0, 0, 1000, 400);
        //game.camera.follow(char1);
        //game.camera.deadzone = new Phaser.Rectangle(centerX - 150, 75, 300, 50);
        

        //add bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(200, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        //add monsters
        enemys = game.add.group();
        enemys.enableBody = true;
        enemys.physicsBodyType = Phaser.Physics.ARCADE;
        game.physics.arcade.enable(enemys);

        monster = enemys.create(600, 10, 'monster');
        monster.anchor.x = .5
        monster.anchor.y = .5
        monster.body.gravity.y = 400;
        monster.body.collideWorldBounds = true;
        monster.life = true;
        
        //add rocks
        rocks = game.add.group()
        rocks.enableBody = true;
        rocks.physicsBodyType = Phaser.Physics.ARCADE;
        rocks.createMultiple(200, 'rock');
        rocks.setAll('checkWorldBounds', true);
        rocks.setAll('outOfBoundsKill', true);
    
        

    },
    update: function(){

        var stand = game.physics.arcade.collide(char1, land);
        var enemystand = game.physics.arcade.collide(enemys, land);
        char1.body.velocity.x = 0;
        //check for overlap between bullets and walls, call function to kill bullet sprite
        game.physics.arcade.overlap(bullets, land, this.hitWall);
        game.physics.arcade.overlap(rocks, char1, this.hitPlayer);
        game.physics.arcade.overlap(rocks, land, this.rockLand);
    

    if (game.input.keyboard.isDown(Phaser.Keyboard.W) && stand)
    {  
        if(char1.body.touching.down) {
            char1.body.velocity.y = -200;
        } else if(char1.body.touching.up) {
            char1.body.velocity.y = 10
        } else {
            char1.body.velocity.y = -75
        }
    
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            char1.body.velocity.x = -200;
            char1.animations.play('walk', 20, true);
            char1.scale.setTo(-.25,.25)
            turn = false;
            }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
            char1.body.velocity.x = 200;
            char1.animations.play('walk', 20, true);
            char1.scale.setTo(.25,.25)
            turn = true;
            }
    else{
        char1.animations.stop('walk');
        char1.frame = 0;
    }      
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        fire();
    }
    
    // monster throw rocks
    if(monster.life == true){
        if (game.time.now > nextRock){
            nextRock = game.time.now + rockRate;
            console.log('rocker');
            rock = rocks.getFirstDead();
            rock.reset(monster.x, monster.y - 20);
            rock.body.gravity.y = 400;
            rock.body.velocity.x = Math.random() * (400 - 200) + 200;
            rock.body.velocity.y = Math.random() * -(200 - 50) - 50;

        }

    }
    
    },
    hitWall: function(b){
        b.kill();
    },
    hitPlayer: function(c, r){
        r.kill();
    },
    rockLand: function(r, l){
        r.kill();
    }

}
    function fire(){
        if(game.time.now > nextFire) {
            nextFire = game.time.now + fireRate;
            console.log('firing');
            bullet = bullets.getFirstDead();
            bullet.reset(char1.x, char1.y);
            if (turn == true){
                console.log(game.time.now)
                bullet.reset(char1.x, char1.y);
                bullet.scale.setTo(1,1);
                bullet.body.velocity.x = 500;
            }
            else{
                console.log(game.time.now)
                bullet.reset(char1.x, char1.y);
                bullet.scale.setTo(-1,1);
                bullet.body.velocity.x = -500;
            }
    

        }
    }   