var centerX = 600/2, centerY = 300/2;
demo.state3 = function(){};
demo.state3.prototype = {
    //game over screen
    preload: function(){
        game.load.image('GO', 'pix/gameover.png');
        game.load.image('restart', 'pix/restart.png');
    },
    create: function(){
        game.stage.backgroundColor ='#000000';
        go = game.add.sprite(centerX, centerY - 50, 'GO');
        go.anchor.x = .5;
        go.anchor.y = .5;
        go.scale.setTo(.4, .3);

        re = game.add.sprite(centerX, centerY + 100, 'restart');
        re.anchor.x = .5;
        re.anchor.y = .5;
        re.scale.setTo(.4, .4);
    },
    update: function(){
        if (game.input.keyboard.isDown(Phaser.Keyboard.R))
        {
            game.state.start('state1');
        }
    }
}