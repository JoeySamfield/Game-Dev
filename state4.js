var centerX = 600/2, centerY = 300/2;
demo.state4 = function(){};
demo.state4.prototype = {
    //congratulations you won screen
    preload: function(){
        game.load.image('con', 'pix/congratulations.png');
        game.load.image('thanks', 'pix/thanks.png');
        game.load.image('credit', 'pix/credit.png');
    },
    create: function(){
        game.stage.backgroundColor ='#4C4C4C';
        con = game.add.sprite(centerX, centerY - 60, 'con');
        con.anchor.x = .5;
        con.anchor.y = .5;
        con.scale.setTo(.7, 1);

        thanks = game.add.sprite(centerX, centerY + 30, 'thanks');
        thanks.anchor.x = .5;
        thanks.anchor.y = .5;
        thanks.scale.setTo(.3, .4);

        credit = game.add.sprite(centerX, centerY + 60, 'credit');
        credit.anchor.x = .5;
        credit.anchor.y = .5;
        credit.scale.setTo(.3, .4);
    },
    update: function(){
        if (game.input.keyboard.isDown(Phaser.Keyboard.R))
        {
            game.state.start('state1');
        }
    }
}