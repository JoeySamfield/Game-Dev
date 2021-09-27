
demo.state1 = function(){};


demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('run', 'assets/guy.png', 114, 136);
        game.load.spritesheet('alien', 'assets/alien.png', 64, 46);
        game.load.image('ground', 'assets/ground.png');
        game.load.image('ledge', 'assets/ledge.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('cave', 'assets/caveBG.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0, 'cave');
        game.world.setBounds(0,0,2813, 1000)
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        platforms = game.add.group();
        platforms.enableBody = true;
        ground = platforms.create(-125, 950, 'ground')
        ground.scale.setTo(100, 2);
        ground.body.immovable = true;
        ledge1 = platforms.create(centerX, centerY - 100, 'ledge');
        ledge1.body.immovable = true;
        ledge2 = platforms.create(1600, centerY + 200, 'ledge');
        ledge2.body.immovable = true;

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
        
        
        scoreText = game.add.text(16, 16, 'Score: '+ score, {fontSize: '32px', fill:'#FFFFFF'});
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
