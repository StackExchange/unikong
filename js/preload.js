﻿StackExchange = window.StackExchange || {};
StackExchange.Unikong = StackExchange.Unikong || {};

StackExchange.Unikong.Boot = function () { };
StackExchange.Unikong.Preload = function () { };

StackExchange.Unikong.Preload.prototype = {
    preload: function () {
        var progressBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'progress');
        progressBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(progressBar);

        this.load.image('menu-bg', 'assets/welcome-bg.png');
        this.load.spritesheet('btn-new', 'assets/btn-new.png', 380, 60);
        this.load.spritesheet('btn-exit', 'assets/btn-exit.png', 380, 60);
        this.load.spritesheet('btn-credits', 'assets/btn-credits.png', 380, 60);
        this.load.spritesheet('btn-leaderboard', 'assets/btn-leaderboard.png', 380, 60);
        this.load.spritesheet('btn-resume', 'assets/btn-resume.png', 380, 60);
        this.load.spritesheet('btn-restart', 'assets/btn-restart.png', 380, 60);
        this.load.spritesheet('btn-return', 'assets/btn-return.png', 380, 60);
        this.load.spritesheet('btn-continue', 'assets/btn-continue.png', 380, 60);

        this.load.spritesheet('player', 'assets/player.png', 40, 68);
        this.load.spritesheet('player-armed', 'assets/player-armed.png', 42, 68);
        this.load.spritesheet('boss', 'assets/unicorn.png', 86, 84);
        
        this.load.image('bg', 'assets/bg.png');
        this.load.image('win-bg', 'assets/win-bg.png');
        this.load.image('game-over-bg', 'assets/game-over-bg.png');
        this.load.image('scores-bg', 'assets/scores-bg.png');
        this.load.image('credits', 'assets/credits.png?v=1337');

        this.load.image('platform', 'assets/steel.png'); // 60 x 41
        this.load.image('ground', 'assets/brick.png');
        this.load.image('diamond', 'assets/gem.png');
        this.load.image('diamondParticle', 'assets/gem-particle.png');

        this.load.image('ladder', 'assets/ladder.png');

        this.load.image('sound-on', 'assets/sound-on.png');
        this.load.image('sound-off', 'assets/sound-off.png');

        this.load.spritesheet('downvote', 'assets/downvote-torch.png', 34, 77);


        this.load.image('bigGold', 'assets/gold-big.png');
        this.load.image('bigSilver', 'assets/silver-big.png');
        this.load.image('bigBronze', 'assets/bronze-big.png');

        this.load.image('gold', 'assets/gold.png');
        this.load.image('silver', 'assets/silver.png');
        this.load.image('bronze', 'assets/bronze.png');
        
        this.load.image('goldParticle', 'assets/gold-particle.png');
        this.load.image('silverParticle', 'assets/silver-particle.png');
        this.load.image('bronzeParticle', 'assets/bronze-particle.png');

        this.load.image('heart', 'assets/heart.png');

        this.load.spritesheet('rainbow', 'assets/rainbow.png', 49, 20);
        this.load.image('laser', 'assets/laser.png');
        this.load.spritesheet('troll', 'assets/troll.png', 48, 54);
        this.load.image('chest-open', 'assets/chest-open.png');
        this.load.image('chest-closed', 'assets/chest-closed.png');
        this.load.image('key', 'assets/key.png');

        // generated by http://www.bfxr.net/
        this.load.audio('jump', 'assets/jump.mp3');
        this.load.audio('death', 'assets/death.mp3');
        this.load.audio('pickup', 'assets/pickup.mp3');
        this.load.audio('pickup-badge', 'assets/pickup-badge.mp3');
        this.load.audio('shoot', 'assets/shoot.mp3');

        this.load.audio('theme', 'assets/music.mp3');
        this.load.audio('gameOverIntro', 'assets/game-over-intro.mp3');
        this.load.audio('gameOverTheme', 'assets/game-over-music.mp3');
        this.load.audio('winTheme', 'assets/win.mp3');
        this.load.audio('lossTheme', 'assets/lose.mp3');
    },
    create: function() {
        this.state.start('Menu');
    }
};


StackExchange.Unikong.Boot.prototype = {
    preload: function () {
        this.load.image('progress', 'assets/load-progress.png');
    },
    create: function () {
        this.state.start('Preload');

        StackExchange.Unikong.game.input.keyboard.onDownCallback = function (key) {
            StackExchange.Unikong.checkKonamiKey(key);
        }
    }
};