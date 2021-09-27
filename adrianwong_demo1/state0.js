var demo = {}, centerX = 1500/2, centerY = 1000/2, guy, ground, ledge, bullets, speed = 40, bulletspeed = 2000, turn, score, scoreText, bullet, alien;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.spritesheet('run', 'assets/guy.png', 114, 136);
        game.load.spritesheet('alien', 'assets/alien.png', 64, 46);
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('cave', 'assets/cave.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0, 'sky');
        game.world.setBounds(0,0,2813, 1000)
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        platforms = game.add.group();
        platforms.enableBody = true;
        ground = platforms.create(-125, 950, 'ground')
        ground.scale.setTo(100, 2);
        ground.body.immovable = true;
        ledge1 = platforms.create(centerX, centerY - 100, 'ground');
        ledge1.scale.setTo(15, 3);
        ledge1.body.immovable = true;
        ledge2 = platforms.create(1700, centerY + 200, 'ground');
        ledge2.scale.setTo(15, 3);
        ledge2.body.immovable = true;

        cave = game.add.sprite(2400, 600, 'cave');
        game.physics.arcade.enable(cave);
        cave.enableBody = true;
        cave.body.gravity.y = 50000;
        cave.scale.setTo(0.5,0.5);



        guy = game.add.sprite(100, 700, 'run');
        game.physics.arcade.enable(guy);
        guy.body.gravity.y = 50000;
        guy.body.gravity.collideWorldBounds = true;
        game.physics.enable(guy);
        guy.body.collideWorldBounds = true;
        guy.animations.add('run', [0, 1, 2, 3, 4, 5, 6]);


        game.camera.follow(guy);
        game.camera.deadzone = new Phaser.Rectangle(centerX-300, 0, 600, 1000);

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullet = bullets.createMultiple(5000, 'bullet');

        score = 0;
        scoreText = game.add.text(16, 16, 'Score:0', {fontSize: '32px', fill:'#000'});
        scoreText.fixedToCamera = true;
        

        enemy = game.add.group();
        enemy.enableBody = true;
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 1; i < 5; i++){
            alien = enemy.create(i* 550, 0, 'alien')
            alien.frame = 0;
            alien.body.gravity.y = 50000;
            alien.scale.setTo(3,3);
            alien.animations.add('alien', [0, 1, 2])
            

        }



    },
    update: function(){
        //console.log(guy.x);
        //console.log(guy.y);
        var hitPlatform = game.physics.arcade.collide(guy, platforms);
        game.physics.arcade.collide(enemy, platforms);
        var hitEnemy = game.physics.arcade.collide(enemy, guy);
        game.physics.arcade.collide(cave, platforms);
        var hitCave = game.physics.arcade.collide(guy, cave);
        game.physics.arcade.overlap(bullet, enemy, enemyDeath, null, this);

        if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            guy.x += speed;
            guy.scale.setTo(1,1);
            guy.animations.play('run', 14, true);
            turn = false;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
            guy.x -= speed;
            guy.scale.setTo(-1,1);
            guy.animations.play('run', 14, true);
            turn = true;
        }
        else{     
            guy.animations.stop('run');
            guy.frame = 6;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && hitPlatform){
            guy.body.velocity.y = -8000;
        }
        if (game.input.activePointer.isDown){
            fire();
        }
        if (guy.x > 2500 && hitCave){
            game.state.start('state1')
        }
        


    }
};

function fire(){
    console.log('firing');
    var bullet = bullets.getFirstDead();
    bullet.reset(guy.x+ 110, guy.y + 55);
    if (turn == true){
        bullet.reset(guy.x-110, guy.y + 55);
        bullet.scale.setTo(-1,1);
        bullet.body.velocity.x = -5000;
    }
    else{
        bullet.reset(guy.x+ 110, guy.y + 55);
        bullet.scale.setTo(1,1);
        bullet.body.velocity.x = 5000;
    }
}

function enemyDeath(bullet, enemy){
    death = enemy.animations.play('alien', 4, false);
    death.killOnComplete = true;
    bullet.kill();
    score += 100;
    scoreText.text = 'Score: ' + score;
}
