StackExchange = StackExchange || {};
StackExchange.Unikong = StackExchange.Unikong || {};

var imgGroup;
var btnArray;
var btnArrayIndex;
var isActivated;

StackExchange.Unikong.Menu = function () { };
StackExchange.Unikong.Menu.prototype = {
    create: function () {
        btnArray = [];
        btnArrayIndex = 0;
        isActivated = false;

        imgGroup = this.game.add.group();

        var bg = this.game.add.sprite(0, 0, 'menu-bg');

        var particleEmitter = this.game.add.emitter(0, 0, 100);
        particleEmitter.makeParticles('goldParticle');
        particleEmitter.x = this.game.world.width / 2 + 179;
        particleEmitter.y = this.game.world.height / 2 - 157;
        particleEmitter.gravity = 0;
        particleEmitter.start(false, 500, 3);

        newBtn = this.game.add.sprite(65, 215, 'btn-new');
        newBtn.frame = 1;
        newBtn.inputEnabled = true;
        newBtn.events.onInputDown.add(function () {
            this.toggleMenu(null, 0);
            this.letsGo();
        }, this);

        scoresBtn = this.game.add.sprite(65, 285, 'btn-leaderboard');
        scoresBtn.frame = 0;
        scoresBtn.inputEnabled = true;
        scoresBtn.events.onInputDown.add(function () {
            this.toggleMenu(null, 1);
            this.letsGo();
        }, this);

        creditsBtn = this.game.add.sprite(65, 355, 'btn-credits');
        creditsBtn.frame = 0;
        creditsBtn.inputEnabled = true;
        creditsBtn.events.onInputDown.add(function () {
            this.toggleMenu(null, 2);
            this.letsGo();
        }, this);
        
        exitBtn = this.game.add.sprite(65, 425, 'btn-exit');
        exitBtn.frame = 0;
        exitBtn.inputEnabled = true;
        exitBtn.events.onInputDown.add(function () {
            this.toggleMenu(null, 3);
            this.letsGo();
        }, this);

        imgGroup.add(bg);
        imgGroup.add(newBtn);
        imgGroup.add(scoresBtn);
        imgGroup.add(creditsBtn);
        imgGroup.add(exitBtn);
        imgGroup.add(particleEmitter);

        btnArray.push(newBtn);
        btnArray.push(scoresBtn);
        btnArray.push(creditsBtn);
        btnArray.push(exitBtn);
        
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        up.onDown.add(this.toggleMenu, this, 0);
        down.onDown.add(this.toggleMenu, this, 0);

        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.letsGo, this);
        var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.addOnce(this.letsGo, this);

        StackExchange.Unikong.startMusic();

        StackExchange.Unikong.bindSoundToggle();
    },
    toggleMenu: function (key, index) {
        if (isActivated) {
            return;
        }

        if (index !== undefined) {
            btnArray.forEach(function (button) {
                button.frame = 0;
            });
            btnArray[index].frame = 1;
            btnArrayIndex = index;
            return;
        }

        var goingUp = key.keyCode === Phaser.KeyCode.UP;

        btnArray[btnArrayIndex].frame = 0;
        btnArrayIndex = (((goingUp ? --btnArrayIndex : ++btnArrayIndex) % btnArray.length) + btnArray.length) % btnArray.length;
        btnArray[btnArrayIndex].frame = 1;
    },
    letsGo: function () {
        isActivated = true;
        var shrinkTween = this.game.add.tween(imgGroup).to({ alpha: 0 }, 1500);
        shrinkTween.onComplete.add(function () {
            if (btnArray[0].frame === 1) {
                this.game.state.start('Restart');
            } else if (btnArray[1].frame === 1) {
                this.game.state.start('Leaderboard');
            } else if (btnArray[2].frame === 1) {
                this.game.state.start('Credits');
            } else {
                StackExchange.Unikong.quit();
            }
        }, this);
        shrinkTween.start();
    }
};