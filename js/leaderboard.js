StackExchange = StackExchange || {};
StackExchange.Unikong = StackExchange.Unikong || {};

StackExchange.Unikong.Leaderboard = function () { };

var textGroup;

StackExchange.Unikong.Leaderboard.prototype = {
    create: function () {
        this.game.world.removeAll();
        var bg = this.game.add.sprite(0, 0, 'scores-bg');

        textGroup = this.game.add.group();
        
        textGroup.add(bg);
        
        StackExchange.Unikong.generateLeaderboardScores(textGroup);

        var menuBtn = this.game.add.sprite(this.game.world.centerX, 680, 'btn-return');
        menuBtn.anchor.setTo(0.5, 1);
        menuBtn.frame = 1;
        menuBtn.inputEnabled = true;
        menuBtn.events.onInputDown.add(function () {
            this.menu();
        }, this);
        textGroup.add(menuBtn);

        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.menu, this);
        var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.addOnce(this.menu, this);
    },
    menu: function () {
        var shrinkTween = this.game.add.tween(textGroup).to({ alpha: 0 }, 1500);
        shrinkTween.onComplete.add(function () { this.game.state.start('Menu'); }, this);
        shrinkTween.start();
    }
    
};