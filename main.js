var game = new Phaser.Game(800, 600, Phaser.AUTO);
// Below: first is name of state, second is name of property in our demo object

game.state.add('state0', demo.state0);
game.state.add('state1', demo.state1);

game.state.start('state0'); // can be done in web console too!
// The two lines above this comment: Not in full internal/inline
// version of tutorial from part9. That tut only had one main state.
// Question: can I still write multiple states internally like in part9?