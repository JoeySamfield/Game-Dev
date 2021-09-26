
//var player;
//var platforms;
//var cursors;

var diamonds;



//var demo = {}; // object -- don't need here. Only in FIRST state (state zero)
demo.state1 = function(){}; // property to demo obj
demo.state1.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/sky.png'); //
        game.load.image('ground', 'assets/platform.png'); //
        game.load.image('star', 'assets/star.png'); //
        game.load.image('diamond', 'assets/diamond.png'); //
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48); //
        //game.load.image('flame', 'assets/flame.png', 10, 10); //
    },
    create: function(){
        //Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Sky
        game.add.sprite(0, 0, 'sky');
        // Score
        scoreText = game.add.text(16, 16, 'score: ' + score, {fontSize: '32px', fill: '#000'});
        // ... no need for platforms group again, right?
        platforms = game.add.group();
        // ... no need to enable physics for platforms again, right?
        platforms.enableBody = true;
        // Created ground ... or is ground already specifiable?
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        ground.scale.setTo(2, 2);

        ground.body.immovable = true;

        var ceiling = platforms.create(0, game.world.height - 264, 'ground');

        ceiling.scale.setTo(2, 2);

        ceiling.body.immovable = true;

        game.stage.backgroundColor = "80ff80";
        console.log('state1');

        //player vvv
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        // physics
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.1;
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        // diamond collectibles
        diamonds = game.add.group();
        diamonds.enableBody = true;

        for (var i = 0; i < 11; i ++) {
            var diamond = diamonds.create(32 * 2 * i + 40, game.world.height - 150, 'diamond');
            diamond.body.gravity.y = 300;
        }
        // star item (for transitioning levels)
        stars = game.add.group();
        stars.enableBody = true;
        var star = stars.create(32 * 2 * 11 + 40, game.world.height - 150, 'star');
        star.body.gravity.y = 300;

        game.input.keyboard.addKey(Phaser.Keyboard.ZERO).onDown.add(changeState, null, null, 0);
        game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState, null, null, 1);
    },
    update: function(){
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        // diamond collisions
        game.physics.arcade.collide(diamonds, platforms);
        // diamond player overlap
        game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
        // star collisions
        game.physics.arcade.collide(stars, platforms);
        // star player overlap
        game.physics.arcade.overlap(player, stars, collectStar2, null, this);

        // VVVVV Player Movement
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            player.animations.stop();
            player.frame = 4;
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }
    },
};

function collectDiamond (player, diamond){
    score += 5;
    scoreText.text = 'score: ' + score;
    diamond.kill()
}
function collectStar2 (player, star) {
    score += 20
    scoreText.text = 'score: ' + score;
    game.state.start('state0')
}