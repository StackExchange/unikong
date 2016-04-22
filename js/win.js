StackExchange = window.StackExchange || {};
StackExchange.Unikong = StackExchange.Unikong || {};

StackExchange.Unikong.Win = function () { };

var imgGroup;
var btnArray;
var btnArrayIndex;
var isActivated;

StackExchange.Unikong.Win.prototype = {
    create: function () {
        btnArray = [];
        btnArrayIndex = 0;
        isActivated = false;

        this.game.world.removeAll();

        StackExchange.Unikong.stopMusic();
        
        imgGroup = this.game.add.group();

        var bg = this.game.add.sprite(0, 0, 'win-bg');

        var scoreText = this.game.add.text(this.game.world.centerX, 175, 'your current rep is ' + score, fontStyle);
        scoreText.anchor.setTo(0.5, 1);

        continueBtn = this.game.add.sprite(215, 285, 'btn-continue');
        continueBtn.frame = 1;
        continueBtn.inputEnabled = true;
        continueBtn.events.onInputDown.add(function () {
            this.toggleMenu(null, 0);
            this.letsGo();
        }, this);

        restartBtn = this.game.add.sprite(215, 355, 'btn-restart');
        restartBtn.frame = 0;
        restartBtn.inputEnabled = true;
        restartBtn.events.onInputDown.add(function () {
            this.toggleMenu(null, 1);
            this.letsGo();
        }, this);

        menuBtn = this.game.add.sprite(215, 425, 'btn-return');
        menuBtn.frame = 0;
        menuBtn.inputEnabled = true;
        menuBtn.events.onInputDown.add(function () {
            this.toggleMenu(null, 3);
            this.letsGo();
        }, this);
        
        exitBtn = this.game.add.sprite(215, 495, 'btn-exit');
        exitBtn.frame = 0;
        exitBtn.inputEnabled = true;
        exitBtn.events.onInputDown.add(function () {
            this.toggleMenu(null, 4);
            this.letsGo();
        }, this);

        imgGroup.add(bg);
        imgGroup.add(scoreText);
        imgGroup.add(continueBtn);
        imgGroup.add(restartBtn);
        imgGroup.add(menuBtn);
        imgGroup.add(exitBtn);

        btnArray.push(continueBtn);
        btnArray.push(restartBtn);
        btnArray.push(menuBtn);
        btnArray.push(exitBtn);

        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        up.onDown.add(this.toggleMenu, this, 0);
        down.onDown.add(this.toggleMenu, this, 0);

        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.letsGo, this);
        var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.addOnce(this.letsGo, this);

        StackExchange.Unikong.generateLeaderboardScores(null, true);
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
                if (StackExchange.Unikong.level <= 12) {
                    gameSpeedFactor += .5;
                    weaponDropRateFactor *= 0.75;
                    trollSpeed += 10;
                    unicornTargetingRate += 10;
                }
                StackExchange.Unikong.level += 1;
                this.game.state.start('LevelTransition');
            } else if (btnArray[1].frame === 1) {
                this.game.state.start('Restart');
            } else if (btnArray[2].frame === 1) {
                this.game.state.start('Menu');
            } else {
                StackExchange.Unikong.quit();
            }
        }, this);
        shrinkTween.start();
    }
};