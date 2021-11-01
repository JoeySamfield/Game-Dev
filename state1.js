var demo = {}, centerX = 600/2, centerY = 300/2;

demo.state1 = function(){};
demo.state1.prototype = {



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
        text.setTextBounds(0, 100, 600, -100);
        wasd = game.add.text(0,0,"Use W, A, and D to run and jump. Hold W and either A or D to climb walls", style1);
        wasd.setTextBounds(0, 100, 600, 0);
        space = game.add.text(0,0, "Press space bar to shoot", style)
        space.setTextBounds(0, 100, 600, 100,);

    
    },
    update: function(){
        if (game.input.activePointer.isDown){
            console.log("click")
            //game.state.start('state0');
        }
    }
};
