var centerX = 600/2, centerY = 300/2, turn = true, nextFire = 0, arrowRate = 1000, revolverRate = 500, charWeapon = "Bow", midClimb = false, char1, bullet, arrow, land, platform, chest, charHP = 100, rockRate = 2000, rollerRate = 3000, nextOrb2 = 0, nextRock1 = 0, nextRock2 = 0, nextRock3 = 0, nextRock4 = 0, last_dir, peasant1Player, peasant1Text, p1_text_val, peasant1, end;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.image("background", "pix/sunrise.jpg");
        //game.load.image("back_wall", "pix/back-walls.png");
        game.load.tilemap("mountain_map", "pix/tut_map_2_json.json", null, Phaser.Tilemap.TILED_JSON); // TILES <----------
        game.load.image("mountain-tileset", "pix/mountain-tileset.png"); // Base Cave Tiles // This was 'larger_tiles'    // TILES <----------
        game.load.image("tileset-mountain-2", "pix/tileset-mountain-2.png"); // Mountain tiles 2
        game.load.image("rad_sign", "pix/rad_sign.png"); // radiation sign tile
        game.load.image("rope", "pix/rope.png"); // rope tile
        game.load.image("vines_w_light_green", "pix/vines_w_light_green.png"); // vines tile
        game.load.image("x_sign", "pix/x_sign.png"); // X sign tile
        //game.load.image("purple", "pix/purple3.jpg");
        game.load.image("peasant", "pix/peasant.png");
        game.load.image("E_icon", "pix/E_icon.png")
        game.load.image("chipped_blade", "pix/chipped_blade.png");
        game.load.spritesheet('walk_rev', "pix/walkRevolver.png", 128, 128);

        //game.load.spritesheet('walk', "pix/walkBowArrow.png", 128, 128);
        game.load.spritesheet('walk', "pix/RevolverPlusClumb.png", 128, 128);
        game.load.spritesheet('rocker', "pix/rocker.png", 128, 128);
        game.load.spritesheet('rocker_backwards', "pix/rocker.png", 128, 128);
        game.load.spritesheet('water_drip', 'pix/water_drip.png', 32, 96);
        game.load.spritesheet('wizard', "pix/redWizard.png", 128, 128);
        game.load.spritesheet('boss', "pix/boss.png", 1024, 1024);
        game.load.image('anArrow', 'pix/arrow.png');
        game.load.image("grass", "pix/grass.png"); // grass tile
        game.load.image('bullet', 'pix/bullet.png');
        game.load.image('rock', 'pix/thrown_rock.png');
        game.load.image('redFire', 'pix/redFire.png');
        game.load.image('blackSquare', 'pix/blackBack.jpg');
        game.load.image('redSquare', 'pix/redBack.jfif');
        game.load.image('chestClosed', 'pix/chest_closed.png');
        game.load.image('chestOpen', 'pix/chest_open.png');
        //game.load.image('empty_sprite', 'pix/empty_sprite.png');
        game.load.spritesheet('slash_L_2', 'pix/slash_L_2.png', 32, 32);
        game.load.spritesheet('slash_R_2', 'pix/slash_R_2.png', 32, 32);

        game.load.audio('cave_sounds', 'pix/cave_sounds.wav');
        game.load.audio('slash', 'pix/slash.wav');
        game.load.audio('arrow_sound', 'pix/arrow_sound.wav');
        game.load.audio('gunshot', 'pix/gunshot.wav');
        game.load.audio('boss_music', 'pix/boss_music.mp3');

    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        sunrise = game.add.sprite(0,0,"background");
        sunrise.height = 416;
        sunrise.width = 1024;        

        var map = game.add.tilemap('mountain_map'); // TILES < -----------------------------------
        map.addTilesetImage('mountain-tileset'); // This was 'larger_tiles'
        map.addTilesetImage('tileset-mountain-2');
        mountain_layer = map.createLayer('Tile Layer 1');
        mountain_layer2 = map.createLayer('Tile Layer 2');

        map.setCollisionBetween(2, 188, true, 'Tile Layer 1');

        slash = game.add.audio('slash');

        arrow_sound = game.add.audio('arrow_sound');

        gunshot = game.add.audio('gunshot');

        boss_music = game.add.audio('boss_music');
        boss_music.loop = true
        boss_music.play();
    
        // create land group
        land = game.add.group()
        game.physics.enable(land);
        land.enableBody = true;        

        //create health bar
        blackHP = land.create(25,275, "blackSquare")
        blackHP.height = 15
        blackHP.width = 205
        redHP = land.create(27,278, "redSquare")
        redHP.height = 9
        redHP.width = charHP*2
        blackHP.fixedToCamera = true;
        redHP.fixedToCamera = true;

        //create boss health bar
        bblackHP = land.create(100, 20, "blackSquare")
        bblackHP.height = 30;
        bblackHP.width = 400;
        //bblackHP.anchor.x = .5;
        bblackHP.anchor.y = .5;
        bredHP = land.create(105, 20, "redSquare");
        bredHP.height = 25;
        bredHP.width = 390;
        //bredHP.anchor.x = .5;
        bredHP.anchor.y = .5;
        bblackHP.fixedToCamera = true;
        bredHP.fixedToCamera = true;

        // create slash/hurtbox
        slash_L_2 = game.add.sprite(50, 50, 'slash_L_2');
        slash_L_2.animations.add('slash_L_2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        slash_L_2.frame = 0;
        game.physics.arcade.enable(slash_L_2);
        

        slash_R_2 = game.add.sprite(50, 50, 'slash_R_2');
        slash_R_2.animations.add('slash_R_2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        slash_R_2.frame = 0;
        game.physics.arcade.enable(slash_R_2);

        // create sword (placeholder, kind of)
        chipped_blade = game.add.sprite(50, 50, 'chipped_blade');

        //create character 
        char1 = game.add.sprite(50,350, 'walk'); 
        char1.scale.setTo(.25,.25);
        char1.frame = 0;
        char1.anchor.x = .5
        char1.animations.add('walk', [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15]);
        char1.animations.add('climb', [16,17,18,19,20,19,18,17]);

        //add gravity and physics
        game.physics.arcade.enable(char1);
        char1.body.gravity.y = 700;
        char1.body.collideWorldBounds = true;

        //add controls
        cursors = game.input.keyboard.createCursorKeys()

        //create game camera
        game.world.setBounds(0, 0, 1024, 416);
        game.camera.follow(char1);        

        //add bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(200, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        //add arrows
        arrows = game.add.group();
        arrows.enableBody = true;
        arrows.physicsBodyType = Phaser.Physics.ARCADE;
        arrows.createMultiple(200, 'anArrow');
        arrows.setAll('checkWorldBounds', true);
        arrows.setAll('outOfBoundsKill', true);

        // add Peasant speaker
        
        speakers = game.add.group();
        speakers.enableBody = true;
        speakers.physicsBodyType = Phaser.Physics.ARCADE;
        game.physics.arcade.enable(speakers);

        //add rockers
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        game.physics.arcade.enable(enemies);


        
        boss = enemies.create(850, 100, 'boss');
        boss.scale.setTo(-.20, .20)
        boss.anchor.x = .5
        boss.anchor.y = .5
        boss.body.gravity.y = 400;
        boss.body.collideWorldBounds = true;

        boss.life = 5;
        boss.animations.add("rocker",[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6,5, 4, 3, 2, 1, 0]); // added zeros for better pace

        boss.animations.add("rocker_backwards", [5, 4, 3, 2, 1, 0]);

        //add blue fire
        fireball = game.add.group()
        fireball.enableBody = true;
        fireball.physicsBodyType = Phaser.Physics.ARCADE;
        fireball.createMultiple(200, 'redFire');
        fireball.setAll('checkWorldBounds', true);
        fireball.setAll('outOfBoundsKill', true);        

        use_key = game.input.keyboard.addKey(Phaser.Keyboard.E);
        use_key.onDown.add(peasant1_dialogue, globalThis);

    },
    update: function(){

        var stand = game.physics.arcade.collide(char1, mountain_layer); // land -> cave_layer
        var enemystand = game.physics.arcade.collide(enemies, mountain_layer); // land -> cave_layer
        var fireballStand = game.physics.arcade.collide(fireball, mountain_layer); // land -> cave_layer
        var speakersStand = game.physics.arcade.collide(speakers, mountain_layer); // speakers collide with ground
        char1.body.velocity.x = 0;
        //check for overlap between bullets and walls, call function to kill bullet sprite
        game.physics.arcade.collide(bullets, mountain_layer, this.hitWall); // land -> cave_layer // overlap -> collide
        game.physics.arcade.collide(arrows, mountain_layer, this.hitWall);
        //game.physics.arcade.overlap(rocks, char1, this.hitPlayer);
        game.physics.arcade.overlap(fireball, char1, this.hitPlayer);
        //game.physics.arcade.collide(rocks, mountain_layer, this.rockLand); // land -> cave_layer // overlap -> collide
        game.physics.arcade.overlap(bullets, enemies, this.killEnemy);
        game.physics.arcade.overlap(arrows, enemies, this.killEnemy);
        game.physics.arcade.overlap(slash_L_2, enemies, this.meleeEnemyL); // MELEE
        game.physics.arcade.overlap(slash_R_2, enemies, this.meleeEnemyR);

        // ALIGN slash/hurtboxes to player sides
        slash_L_2.alignTo(char1, Phaser.TOP_CENTER, -15, -35);
        slash_R_2.alignTo(char1, Phaser.TOP_CENTER, 15, -35);

        // ALIGN sword to player back
        chipped_blade.alignTo(char1, Phaser.TOP_CENTER, 0, -30);
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            char1.body.velocity.x = -200;
            if (midClimb == false) {
                char1.animations.play('walk', 20, true);
            }
            char1.scale.setTo(-.25,.25)
            turn = false;
            last_dir = 'left'
            }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
            char1.body.velocity.x = 200;
            if (midClimb == false) {
                char1.animations.play('walk', 20, true);
            }
            char1.scale.setTo(.25,.25)
            turn = true;
            last_dir = 'right'
            }
    else{
        char1.animations.stop('walk');
        char1.frame = 0;
    }      
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        if (charWeapon == "Bow") {
            shootBow();
            if (nextBow == 0){
                arrow_sound.play();
                nextBow = game.time.now + 1000;
            }
            else if (game.time.now >= nextBow){
                arrow_sound.play();
                nextBow = game.time.now + 1000;
            }
        } else {
            fire();
            if (nextShot == 0){
                gunshot.play();
                nextShot = game.time.now + 500;
            }
            else if (game.time.now >= nextShot){
                gunshot.play();
                nextShot = game.time.now + 500;
            }
        }
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.F)){
        animateMelee();
        if (nextSlash == 0){
            slash.play();
            nextSlash = game.time.now + 500;
        }
        //if game.time.now >= game.time.now + 800
        else if (game.time.now >= nextSlash){
            slash.play();
            nextSlash = game.time.now + 500;
        }
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.W) && stand)
    {  
        if(char1.body.blocked.down) {   // touching -> blocked
            char1.body.velocity.y = -250;
        } else if(char1.body.blocked.up) { // if you hit your head, start falling down.
            midClimb = false               // (touching -> blocked  --- FIXED head climbing)
            char1.body.velocity.y = 10
        } else {
            char1.body.velocity.y = -75
            midClimb = true
            char1.animations.play('climb', 20, true);
        } 
    } else {
        midClimb = false
    }
    
    if (game.time.now > (end + 2000)){
        game.state.start('state4');
    }
    
    // rocker throw rocks
    if(boss.life > 0){
        if (game.time.now > nextRock1){
            nextRock1 = game.time.now + rollerRate;
            boss.animations.play("rocker",10,false);
            this.bossRoll(boss,1);
            this.bossRoll(boss,2);
            this.bossRoll(boss,3);
            this.bossRoll(boss,4);
            //bredHP.width = (boss.life/5) * 390;
        }
    

    }
    
   
     },

    
    bossRoll: function(m,id){
        console.log('rocker');
        fball = fireball.getFirstDead();
        fball.body.gravity.y = 900;
        fball.body.bounce.set(.90)
        fball.lifespan = (4000)

        if(id == 1) {
            fball.reset(m.x + 45, m.y - 70)
            fball.scale.setTo(.17,.17)
            fball.body.velocity.x = Math.random() * (400 - 200) + 100
            fball.body.velocity.y = -Math.random() * -(200 - 50) + 400
        } 
        if(id == 2) {
            fball.reset(m.x - 45, m.y - 70)
            fball.scale.setTo(.17,.17)
            fball.body.velocity.x = -(Math.random() * (400 - 200) + 100)
            fball.body.velocity.y = -Math.random() * -(200 - 50) + 300
        } 
        if(id == 3) {
            fball.reset(m.x + 45, m.y - 50)
            fball.scale.setTo(.17,.17)
            fball.body.velocity.x = Math.random() * (400 - 200) + 200
            fball.body.velocity.y = -Math.random() * -(200 - 50) + 600
        } 
        if(id == 4) {
            fball.reset(m.x - 45, m.y - 50)
            fball.scale.setTo(.17,.17)
            fball.body.velocity.x = -(Math.random() * (400 - 200) + 200)
            fball.body.velocity.y = -Math.random() * -(200 - 50) + 500
        } 
    },
    
    hitWall: function(b){
        b.kill();
    },
    hitPlayer: function(c, r){
        r.kill();
        charHP = charHP - 20
        redHP.width = charHP*2
        if (charHP == 0 && boss.life > 0) {
            char1.kill()
            charHP = 100
            game.state.start('state3');
        }
    },
    rockLand: function(r, l){
        r.kill();
    },
    killEnemy: function(b, e){
        b.kill();
        e.life = e.life - 1;
        if (e == boss){
            bredHP.width = (e.life/5) * 390;
        }
        if (e.life < 1) {
            e.kill();
            charHP = 100
            if (e == boss){
                bblackHP.width = 0;
                end = game.time.now;
            }
        }
    },
    meleeEnemyL: function(s, e){
        if (game.input.keyboard.isDown(Phaser.Keyboard.F)){
            if (s.frame == 2) {
                e.life = e.life - 1;
                if (e.life < 1) {
                    e.kill();
                }
            }
        }
    },
    meleeEnemyR: function(s, e){
        if (game.input.keyboard.isDown(Phaser.Keyboard.F)){
            if (s.frame == 2) {
                e.life = e.life - 1;
                if (e.life < 1) {
                    e.kill();
                }
            }
        }
    }



}
    function fire(){
        if(game.time.now > nextFire) {
            nextFire = game.time.now + revolverRate;
            //console.log('firing');
            bullet = bullets.getFirstDead();
            bullet.reset(char1.x, char1.y);
            if (turn == true){
                //console.log(game.time.now)
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

    function shootBow(){
        if(game.time.now > nextFire) {
            nextFire = game.time.now + arrowRate;
            console.log('firing');
            arrow = arrows.getFirstDead();
            arrow.reset(char1.x, char1.y);
            arrow.body.gravity.y = 200;
            if (turn == true){
                console.log(game.time.now)
                arrow.reset(char1.x, char1.y+10);
                arrow.scale.setTo(.2,.2);
                arrow.body.velocity.x = 400;
                arrow.body.velocity.y = -60;

            }
            else{
                console.log(game.time.now)
                arrow.reset(char1.x, char1.y+10);
                arrow.scale.setTo(-.2,.2);
                arrow.body.velocity.x = -400;
                arrow.body.velocity.y = -60;
            }
    

        }
    }
    function animateMelee(){
        if (last_dir == 'left') {
            slash_L_2.animations.play('slash_L_2', 30, false);
        }
        else if (last_dir == 'right') {
            slash_R_2.animations.play('slash_R_2', 30, false);
        }
    }

    
    function peasant1_dialogue(){
        //peasant1Player = peasant1Player
        if (peasant1Player) { // collision detected globally?
            peasant1Text.text = 'Child: Hey!'
            
        }
    }
    

