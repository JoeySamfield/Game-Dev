// First state 
// Game state is like a scene. (Menu, Game over, score, etc)
var player;
var platforms;
var cursors;

var flame_v; // flame velocity
var flame; // so that 'flame' (of 'flames' group) can pass from create to update
//              There is another way, right?

var stars;
var baddies;
var flames;
var score = 0;
var scoreText;

var demo = {}; // object
demo.state0 = function(){}; // property to demo obj
demo.state0.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/sky.png'); //
        game.load.image('ground', 'assets/platform.png'); //
        game.load.image('star', 'assets/star.png'); //
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48); //
        game.load.image('flame', 'assets/flame.png', 10, 10); //
    },
    
    create: function(){
        //var platforms; --- here?
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'sky');

        platforms = game.add.group();

        platforms.enableBody = true;

        var ground = platforms.create(0, game.world.height - 64, 'ground');
        
        ground.scale.setTo(2, 2);

        ground.body.immovable = true;

        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 300, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(400, 200, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 100, 'ground');
        ledge.body.immovable = true;

        player = game.add.sprite(32, game.world.height - 150, 'dude');

        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.1;
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        stars = game.add.group();

        stars.enableBody = true;

        var star = stars.create(10, 0, 'star');
        star.body.gravity.y = 300;

        // VVV score!
        scoreText = game.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: '#000' });

        // VVV enemies!
        /*
        baddies = game.add.group();
        baddies.enableBody = true;
        var baddie = baddies.create(15, 0, 'baddie');
        baddie.body.gravity.y = 300;
        baddie.body.bounce.y = 0.5;
        */

        // VVV flames!
        flames = game.add.group();
        flames.enableBody = true;
        flame_v = 300

        flame = flames.create(15, 0, 'flame');
        flame.body.gravity.y = 200;
        flame.body.bounce.y = 0.5;
        flame.body.collideWorldBounds = true;
        flame.scale.setTo(0.1, 0.1);
        // listener for contact with bounds
        flame.body.onWorldBounds = new Phaser.Signal();
        // reaction to bounds contact -- why 'this'?
        flame.body.onWorldBounds.add(flameBounds, this);


        cursors = game.input.keyboard.createCursorKeys();
        //game.stage.backgroundColor = "#FF0000";
        // BELOW: these event listeners are ONLY local to the state ...
        // ... BUT functions are global!
        // --- Below: Second and third parameters in add() are listenerContext & priority ... online
        //          "Cannot read properties of undefined (reading 'addKey')"
        //              Phaser.Keyboard .... HAD TO BE CAPITALIZED AT BEGINNING
        //              So if something can't be read, check what it's stemming from.
        game.input.keyboard.addKey(Phaser.Keyboard.ZERO).onDown.add(changeState, null, null, 0);
        game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState, null, null, 1);
    },
    update: function(){
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);

        game.physics.arcade.collide(flames, platforms);

        game.physics.arcade.overlap(player, stars, collectStar, null, this);

        game.physics.arcade.overlap(player, flames, flameOverlap, null, this);

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

        flame.body.velocity.x = flame_v
    }
};

// Below: change game states function
// Phaser requires that callback functions are called with two arguments...
// ... the first being the event object, which carries all the info of...
// ... what just happened. We just put it in console for study.

// FUNCTIONS ARE GLOBAL!!! This only needs to be in state0
function changeState(i, stateNum){ 
    console.log(i)
    game.state.start('state' + stateNum);
}

function flameOverlap (player, flame){
    // kill player
    player.kill();
    score = 0
    scoreText.text = 'score: ' + score;
}

function collectStar (player, star) {
    score += 20
    scoreText.text = 'score: ' + score;
    game.state.start('state1')
}

function flameBounds (flame) {
    flame_v = flame_v * -1
}