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
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 200, "phaser 2.4 text bounds", style);
        text.setTextBounds(0, 100, 600, 100);
    },
    update: function(){

    }
};
