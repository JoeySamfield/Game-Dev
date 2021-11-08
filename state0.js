
var demo = {},centerX = 600/2, centerY = 300/2, turn = true, nextFire = 0, arrowRate = 1000, revolverRate = 500, charWeapon = "Bow", char1, bullet, arrow, land, platform, stone, tall, chest, charHP = 100, rockRate = 2000, rollerRate = 3000, nextOrb2 = 0, nextRock1 = 0, nextRock2 = 0, nextRock3 = 0, nextRock4 = 0, last_dir;


demo.state0 = function(){};
demo.state0.prototype = {



    preload: function(){
        game.load.image("background", "pix/sunrise.jpg");
        game.load.image("back_wall", "pix/back-walls.png");
        game.load.tilemap("cave_map", "pix/larger_map_json.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("larger_tiles", "pix/cave_tiles_png.png"); // Base Cave Tiles
        game.load.image("rad_sign", "pix/rad_sign.png"); // radiation sign tile
        game.load.image("rope", "pix/rope.png"); // rope tile
        game.load.image("vines_w_light_green", "pix/vines_w_light_green.png"); // vines tile
        game.load.image("x_sign", "pix/x_sign.png"); // X sign tile
        //game.load.image("purple", "pix/purple3.jpg");
        game.load.image("chipped_blade", "pix/chipped_blade.png");
        game.load.spritesheet('walk_rev', "pix/walkRevolver.png", 128, 128);
        game.load.image("ground", "pix/ground.png");
        game.load.image('tall', 'pix/tall.png');
        //game.load.spritesheet('walk', "pix/walkBowArrow.png", 128, 128);
        game.load.spritesheet('walk', "pix/RevolverPlusClumb.png", 128, 128);
        game.load.image("stone", "pix/stone.png");
        game.load.spritesheet('rocker', "pix/rocker.png", 128, 128);
        game.load.spritesheet('rocker_backwards', "pix/rocker.png", 128, 128);
        game.load.spritesheet('water_drip', 'pix/water_drip.png', 32, 96);
        game.load.spritesheet('wizard', "pix/redWizard.png", 128, 128);
        game.load.image('anArrow', 'pix/arrow.png');
        game.load.image("grass", "pix/grass.png"); // grass tile
        game.load.image('bullet', 'pix/bullet.png');
        game.load.image('rock', 'pix/thrown_rock.png');
        game.load.image('rolledStone', 'pix/blueFire.png');
        game.load.image('blackSquare', 'pix/blackBack.jpg');
        game.load.image('redSquare', 'pix/redBack.jfif');
        game.load.image('chestClosed', 'pix/chest_closed.png');

        game.load.image('chestOpen', 'pix/chest_open.png');
        //game.load.image('empty_sprite', 'pix/empty_sprite.png');
        game.load.spritesheet('slash_L_2', 'pix/slash_L_2.png', 32, 32);
        game.load.spritesheet('slash_R_2', 'pix/slash_R_2.png', 32, 32);

        game.load.image("p3", "pix/p3.png");
        game.load.image("AD", "pix/ad.png");
        game.load.image("W", "pix/w.png");
        game.load.image("climbinstruct", "pix/climbinstruct.png");
        game.load.image('spacebar', "pix/spacebar.png");
        game.load.image("f", "pix/f.png");
        game.load.image("e", "pix/e.png");
        game.load.image('try', 'pix/try.png')
        game.load.image('cave', 'pix/cave.png');
        game.load.image('begin', 'pix/begin.png');
    


    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        sunrise = game.add.sprite(0,0,"background");
        sunrise.height = 400;
        sunrise.width = 2304;

        back_wall = game.add.sprite(0, 0, "back_wall"); // NEW CAVE BACKGROUND
        back_wall.height = 400;
        back_wall.width = 2304;

        game.add.sprite(10, 10, "p3");
        AD = game.add.sprite(25, 120, "AD");
        AD.scale.setTo(.5, .5);
        W = game.add.sprite(370, 120, "W");
        W.scale.setTo(.5, .5);
        ct = game.add.sprite(600, 75, "climbinstruct");
        ct.scale.setTo(.4, .4);
        space = game.add.sprite(1000, 130, "spacebar");
        space.scale.setTo(.5, .5);
        f = game.add.sprite(1315, 130, "f");
        f.scale.setTo(.5, .5);
        e = game.add.sprite(1550, 150, "e");
        e.scale.setTo(.4, .4);
        t = game.add.sprite(1580, 170, "try");
        t.scale.setTo(.4, .4);
        begin = game.add.sprite(2050, 150, 'begin');
        begin.scale.setTo(.5, .5);
        
        
        //old text
        /*var style = { font: "32px Jazz LET, fantasy", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        var style1 = { font: "20px Jazz LET, fantasy", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0,0, "Pratorium 3000", style);
        //text.style.fontFamily = 'Arial, Helvetica, sans-serif';
        text.setTextBounds(0, 100, 600, -150);
        wasd = game.add.text(0,0,"Use W, A, and D to run and jump. Hold W and either A or D to climb walls", style1);
        wasd.setTextBounds(0, 100, 600, -50);
        space = game.add.text(0,0, "Press Spacebar to shoot", style)
        space.setTextBounds(0, 100, 600, 50);
        f = game.add.text(0,0, "Press F to melee", style)
        f.setTextBounds(0,100,600, 150);
        e = game.add.text(0, 0, "Press E to open Chests", style)
        e.setTextBounds(0, 100, 600, 250);
        click = game.add.text(0, 0, "Click anywhere to begin!", style);
        click.setTextBounds(0, 100, 600, 350);
        */

        land = game.add.group()
        game.physics.enable(land);
        land.enableBody = true;
        

        //create ground
        
        list = [];
        for (i = 0; 64*i < 2496; i++){
            list[i] = 64*i;
        }
        for (i= 0; i < list.length; i++){
            bottom = land.create(list[i], 270, 'ground');
            bottom.body.immovable = true;
            
        }
        


        // create slash/hurtbox
        slash_L_2 = game.add.sprite(50, 50, 'slash_L_2');
        slash_L_2.animations.add('slash_L_2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        slash_L_2.frame = 0;
        game.physics.arcade.enable(slash_L_2);
        

        slash_R_2 = game.add.sprite(50, 50, 'slash_R_2');
        slash_R_2.animations.add('slash_R_2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        slash_R_2.frame = 0;
        game.physics.arcade.enable(slash_R_2);

        //create sword (placeholder, kind of)
        chipped_blade = game.add.sprite(10,235, 'chipped_blade');
        
        char1 = game.add.sprite(2100, 235, 'walk'); 
        char1.scale.setTo(.25,.25);
        char1.frame = 0;
        char1.anchor.x = .5
        char1.animations.add('walk', [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15]);

        char1.animations.add('climb', [17, 18, 19, 20, 21])

        stone = game.add.sprite(450, 257, 'stone');
        stone.scale.setTo(.1, .1);
        stone.anchor.x = .5;
        stone.anchor.y = .5;
        game.physics.arcade.enable(stone)
        stone.enableBody = true;
        stone.body.immovable = true;

        tall = game.add.sprite(750, 216, 'tall');
        tall.scale.setTo(1, 1);
        tall.anchor.x = .5;
        tall.anchor.y = .5;
        game.physics.arcade.enable(tall)
        tall.enableBody = true;
        tall.body.immovable = true;

        chest = game.add.sprite(1730, 259, 'chestClosed');
        chest.scale.setTo(.1, .1);
        chest.anchor.x = .5;
        chest.anchor.y = .4;
        game.physics.arcade.enable(chest);
        chest.enableBody = true;
        chest.body.immovable = true;


        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        game.physics.arcade.enable(enemies);

        rocker = enemies.create(1110, 245, 'rocker');
        rocker.scale.setTo(.4, .4);
        rocker.anchor.x = .5;
        rocker.anchor.y = .5;
        rocker.body.gravity.y = 400;
        rocker.body.collideWorldBounds = true;
        rocker.life = 2;

        rocker2 = enemies.create(2000, 245, 'rocker');
        rocker2.scale.setTo(.4, .4);
        rocker2.anchor.x = .5;
        rocker2.anchor.y = .5;
        rocker2.body.gravity.y = 400;
        rocker2.body.collideWorldBounds = true;
        rocker2.life = 2;

        rWizard1 = enemies.create(1400, 245, 'wizard');
        rWizard1.scale.setTo(-.30, .30)
        rWizard1.anchor.x = .5
        rWizard1.anchor.y = .5
        rWizard1.body.gravity.y = 400;
        rWizard1.body.collideWorldBounds = true;
        rWizard1.life = 2;

        cave = game.add.sprite(2255, 232, 'cave');
        cave.scale.setTo(.15, .15);
        game.physics.arcade.enable(cave);
        cave.enableBody = true;
        cave.body.immovable = true;
        cave.anchor.x = .5;
        cave.anchor.y = .5;


        
        //add gravity and physics
        game.physics.arcade.enable(char1);
        char1.body.gravity.y = 400;
        char1.body.collideWorldBounds = true;
        
        //add controls
        cursors = game.input.keyboard.createCursorKeys()
        
        //create game camera

        game.world.setBounds(0, 0, 2304, 300);
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

        
        


    
    },
    update: function(){
        var obstacle = game.physics.arcade.collide(char1, stone);
        var stand = game.physics.arcade.collide(char1, land); 
        var climber = game.physics.arcade.collide(char1, tall);
        var enemystand = game.physics.arcade.collide(enemies, land);

        game.physics.arcade.overlap(bullets, enemies, this.killEnemy);
        game.physics.arcade.overlap(arrows, enemies, this.killEnemy);
        game.physics.arcade.overlap(slash_L_2, enemies, this.meleeEnemyL); // MELEE
        game.physics.arcade.overlap(slash_R_2, enemies, this.meleeEnemyR);
        game.physics.arcade.collide(char1, cave, this.enter);

        // ALIGN slash/hurtboxes to player sides
        slash_L_2.alignTo(char1, Phaser.TOP_CENTER, -15, -35);
        slash_R_2.alignTo(char1, Phaser.TOP_CENTER, 15, -35);
        
        //if (game.input.activePointer.isDown){
         //   game.state.start('state1');
        //}
        
        char1.body.velocity.x = 0;
        
        //game.physics.arcade.overlap(bullets, enemies, this.killEnemy);
        //game.physics.arcade.overlap(arrows, enemies, this.killEnemy);
        //game.physics.arcade.overlap(slash_L_2, enemies, this.meleeEnemyL); // MELEE
        //game.physics.arcade.overlap(slash_R_2, enemies, this.meleeEnemyR);
        game.physics.arcade.collide(chest, land);
        var chestPlayer = game.physics.arcade.collide(char1, chest);

        // ALIGN slash/hurtboxes to player sides
        slash_L_2.alignTo(char1, Phaser.TOP_CENTER, -15, -35);
        slash_R_2.alignTo(char1, Phaser.TOP_CENTER, 15, -35);

        // ALIGN sword to player back
        chipped_blade.alignTo(char1, Phaser.TOP_CENTER, 0, -30);
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.W) && (stand || obstacle))
        {  
            if(char1.body.blocked.down) {   // touching -> blocked
                char1.body.velocity.y = -200;
            } else if(char1.body.blocked.up) { // if you hit your head, start falling down.
                                               // (touching -> blocked  --- FIXED head climbing)
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
                last_dir = 'left'
    
                }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
                char1.body.velocity.x = 200;
                char1.animations.play('walk', 5, true);
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
                shootBow()
            } else {
                fire();
            }
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.W) && (stand || obstacle || climber))
    {  
        if(char1.body.blocked.down) {   // touching -> blocked
            char1.body.velocity.y = -200;
        } else if(char1.body.blocked.up) { // if you hit your head, start falling down.w
                                           // (touching -> blocked  --- FIXED head climbing)w
            char1.body.velocity.y = 10
        } else {
            char1.body.velocity.y = -200;
            char1.animations.play('climb', 20, true);
        }
    
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.F)){
        animateMelee();
    }
    if(chestPlayer){
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)){
            chest.loadTexture('chestOpen');
            chest.reset(chest.x, chest.y);
            charWeapon = "revolver"
        }
    }

    
    },
    hitWall: function(b){
        //console.log('Hit wall');
        b.kill();
    
},
    killEnemy: function(b, e){
        b.kill();
        e.life = e.life - 1;
        if (e.life < 1) {
            e.kill();
        }
},
meleeEnemyL: function(s, e){
    if (game.input.keyboard.isDown(Phaser.Keyboard.F)){
        console.log('left')
        if (s.frame == 1 || 2) {
            console.log('hit')
            e.life = e.life - 1;
            if (e.life < 1) {
                console.log('die')
                e.kill();
            }
        }
    }
},
meleeEnemyR: function(s, e){
    if (game.input.keyboard.isDown(Phaser.Keyboard.F)){
        console.log('right')
        if (s.frame == 1 || 2) {
            console.log('hit')
            e.life = e.life - 1;
            if (e.life < 1) {
                console.log('die')
                e.kill();
            }
        }
    }
}, 
enter: function(s, c){
    game.state.start('state1');
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



