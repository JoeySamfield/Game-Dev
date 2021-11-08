
var demo = {}, centerX = 600/2, centerY = 300/2, turn = true, nextFire = 0, arrowRate = 1000, revolverRate = 500, charWeapon = "Bow", char1, bullet, arrow, land, platform, chest, charHP = 100, rockRate = 2000, rollerRate = 3000, nextOrb2 = 0, nextRock1 = 0, nextRock2 = 0, nextRock3 = 0, nextRock4 = 0, last_dir;


demo.state0 = function(){};
demo.state0.prototype = {



    preload: function(){
        game.load.image("background", "pix/sunrise.jpg");
        game.load.image("back_wall", "pix/back-walls.png");
     
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        sunrise = game.add.sprite(0,0,"background");
        sunrise.height = 400;
        sunrise.width = 600;

        back_wall = game.add.sprite(0, 0, "back_wall"); // NEW CAVE BACKGROUND
        back_wall.height = 400;
        back_wall.width = 600;
        var style = { font: "32px Jazz LET, fantasy", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
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


    
    },
    update: function(){
        if (game.input.activePointer.isDown){
            game.state.start('state1');
        }

    }

};


