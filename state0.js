var demo = {}, centerX = 1024/2, centerY = 416/2, turn = true, nextFire = 0, fireRate = 500, bullet, land, platform, charHP = 100, rockRate = 2000, nextRock1 = 0, nextRock2 = 0, nextRock3 = 0, nextRock4 = 0;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image("background", "pix/sunrise.jpg");
        game.load.image("back_wall", "pix/back-walls.png");
        game.load.tilemap("cave_map", "pix/cave_map_test4.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("Cave", "pix/cave_tiles_png.png");
        game.load.image("purple", "pix/purple3.jpg");
        game.load.spritesheet('walk', "pix/walkRevolver.png", 128, 128);
        game.load.image('bullet', 'pix/bullet.png');
        game.load.image('rocker', 'pix/enemy.png');
        game.load.image('rock', 'pix/rock.png');
        game.load.image('blackSquare', 'pix/blackBack.jpg');
        game.load.image('redSquare', 'pix/redBack.jfif');

    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0,0,"background")

        back_wall = game.add.sprite(0, 0, "back_wall"); // NEW CAVE BACKGROUND
        back_wall.height = 416;
        back_wall.width = 1024;

        var map = game.add.tilemap('cave_map');
        map.addTilesetImage('Cave');
        cave_layer = map.createLayer('cave_layer');
        cave_layer2 = map.createLayer('cave_layer2');

        map.setCollisionBetween(2, 128, true, 'cave_layer');
    

        
        // create land group
        land = game.add.group()
        game.physics.enable(land);
        land.enableBody = true;

        //create ground
        /*
        var bottom = land.create(0, 350, 'purple')
        bottom.width = 1000
        bottom.body.immovable = true

        //create ledges
        //let platformList = [[0,260,30,500],[600,260,30,500], [800,150,50,500], [300,150,50,400], [500,70,30,500], [300,0,150,30],[0,80,30,150],[150,170,30,150]]
        /*
        for (i = 0; i < platformList.length; i++) {
            platform = land.create(platformList[i][0],platformList[i][1],"purple")
            platform.height = platformList[i][2]
            platform.width = platformList[i][3]
            platform.body.immovable = true
        }
        */
        

        //create health bar
        blackHP = land.create(25,390, "blackSquare")
        blackHP.height = 20
        blackHP.width = 210
        redHP = land.create(30,395, "redSquare")
        redHP.height = 10
        redHP.width = 200

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

        //add rockers
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        game.physics.arcade.enable(enemies);

        rocker1 = enemies.create(130, 150, 'rocker');
        rocker1.anchor.x = .5
        rocker1.anchor.y = .5
        rocker1.body.gravity.y = 400;
        rocker1.body.collideWorldBounds = true;
        rocker1.life = 2;

        rocker2 = enemies.create(300, 225, 'rocker');
        rocker2.anchor.x = .5
        rocker2.anchor.y = .5
        rocker2.body.gravity.y = 400;
        rocker2.body.collideWorldBounds = true;
        rocker2.life = 2;

        rocker3 = enemies.create(50, 50, 'rocker');
        rocker3.anchor.x = .5
        rocker3.anchor.y = .5
        rocker3.body.gravity.y = 400;
        rocker3.body.collideWorldBounds = true;
        rocker3.life = 2;

        rocker4 = enemies.create(650, 225, 'rocker');
        rocker4.anchor.x = .5
        rocker4.anchor.y = .5
        rocker4.body.gravity.y = 400;
        rocker4.body.collideWorldBounds = true;
        rocker4.life = 2;
        
        //add rocks
        rocks = game.add.group()
        rocks.enableBody = true;
        rocks.physicsBodyType = Phaser.Physics.ARCADE;
        rocks.createMultiple(200, 'rock');
        rocks.setAll('checkWorldBounds', true);
        rocks.setAll('outOfBoundsKill', true);
    
        

    },
    update: function(){

        var stand = game.physics.arcade.collide(char1, cave_layer); // land -> cave_layer
        var enemystand = game.physics.arcade.collide(enemies, cave_layer); // land -> cave_layer
        char1.body.velocity.x = 0;
        //check for overlap between bullets and walls, call function to kill bullet sprite
        game.physics.arcade.collide(bullets, cave_layer, this.hitWall); // land -> cave_layer // overlap -> collide
        game.physics.arcade.overlap(rocks, char1, this.hitPlayer);
        game.physics.arcade.collide(rocks, cave_layer, this.rockLand); // land -> cave_layer // overlap -> collide
        game.physics.arcade.overlap(bullets, enemies, this.killEnemy);
    

    if (game.input.keyboard.isDown(Phaser.Keyboard.W) && stand)
    {  
        if(char1.body.blocked.down) {   // touching -> blocked
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
    
    // rocker throw rocks
    if(rocker1.life > 0){
        if (game.time.now > nextRock1){
            nextRock1 = game.time.now + rockRate;
            this.throw(rocker1);
        }

    }
    if(rocker2.life > 0){
        if (game.time.now > nextRock2){
            nextRock2 = game.time.now + rockRate;
            this.throw(rocker2);
    }
    }
    if(rocker3.life > 0){
        if (game.time.now > nextRock3){
            nextRock3 = game.time.now + rockRate;
            this.throw(rocker3);
    }
    }
    if(rocker4.life > 0){
        if (game.time.now > nextRock4){
            nextRock4 = game.time.now + rockRate;
            this.throw(rocker4);
    }
    }
    },
    throw: function(m){
        console.log('rocker');
        rock = rocks.getFirstDead();
        rock.reset(m.x, m.y - 20);
        rock.body.gravity.y = 400;
        rock.body.velocity.x = Math.random() * (400 - 200) + 200;
        rock.body.velocity.y = Math.random() * -(200 - 50) - 50;
    },
    hitWall: function(b){
        console.log('Hit wall');
        b.kill();
    },
    hitPlayer: function(c, r){
        r.kill();
        charHP = charHP - 20
        redHP.width = charHP*2
    },
    rockLand: function(r, l){
        r.kill();
    },
    killEnemy: function(b, e){
        b.kill();
        e.life = e.life - 1;
        if (e.life < 1) {
            e.kill();
        }
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
                bullet.reset(char1.x, char1.y+10);
                bullet.scale.setTo(.5,.5);
                bullet.body.velocity.x = 1000;
            }
            else{
                console.log(game.time.now)
                bullet.reset(char1.x, char1.y+10);
                bullet.scale.setTo(-.5,.5);
                bullet.body.velocity.x = -1000;
            }
    

        }
    }   