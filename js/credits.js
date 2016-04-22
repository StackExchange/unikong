StackExchange = StackExchange || {};
StackExchange.Unikong = StackExchange.Unikong || {};

StackExchange.Unikong.Credits = function () { };

var textGroup;

StackExchange.Unikong.Credits.prototype = {
    create: function() {
        this.game.world.removeAll();

        textGroup = this.game.add.group();

        var bg = this.game.add.sprite(0, 0, 'credits');

        textGroup.add(bg);

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