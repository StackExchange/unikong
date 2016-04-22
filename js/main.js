StackExchange = window.StackExchange || {};
StackExchange.Unikong = StackExchange.Unikong || {};

StackExchange.Unikong.game = new Phaser.Game(810, 700, Phaser.CANVAS, 'target');
StackExchange.Unikong.bgMusic = {};
StackExchange.Unikong.level = 1;
StackExchange.Unikong.effectiveLevel = function () { var tmp = StackExchange.Unikong.level % 3; return tmp == 0 ? 3 : tmp;};

var isLocalStorageSupported = typeof (Storage) !== "undefined";

StackExchange.Unikong.quit = function () {
    StackExchange.Unikong.game.destroy();
};
StackExchange.Unikong.startMusic = function () {
    if (!StackExchange.Unikong.bgMusic || !StackExchange.Unikong.bgMusic.isPlaying) {
        if (!isKonamiActive) {
            StackExchange.Unikong.bgMusic = this.game.add.audio('theme', 0.5, true);
        }
        StackExchange.Unikong.bgMusic.play();
    }
};
StackExchange.Unikong.stopMusic = function () {
    var music = StackExchange.Unikong.bgMusic;
    if (music && music.isPlaying) {
        music.stop();
    }
};
StackExchange.Unikong.bindSoundToggle = function() {
    var s = StackExchange.Unikong.game.input.keyboard.addKey(Phaser.Keyboard.S);
    s.onDown.add(function () {
        StackExchange.Unikong.toggleSound();
    });

    if (isLocalStorageSupported) {
        var soundStatus = localStorage.getItem("stackoverflow-unikong-mute");
        if (soundStatus !== null) {
            StackExchange.Unikong.game.sound.mute = JSON.parse(soundStatus) === true;
        }
    } else {
        StackExchange.Unikong.game.sound.mute = false;
    }

    soundImg = StackExchange.Unikong.game.add.image(10, 15, StackExchange.Unikong.game.sound.mute ? 'sound-off' : 'sound-on');
    soundImg.inputEnabled = true;
    soundImg.events.onInputDown.add(function () {
        this.toggleSound();
    }, this);
}
StackExchange.Unikong.toggleSound = function() {
    StackExchange.Unikong.game.sound.mute = !StackExchange.Unikong.game.sound.mute;
    soundImg.loadTexture(StackExchange.Unikong.game.sound.mute ? 'sound-off' : 'sound-on');
    if (isLocalStorageSupported) {
        localStorage.setItem("stackoverflow-unikong-mute", JSON.stringify(StackExchange.Unikong.game.sound.mute));
    }
}

StackExchange.Unikong.generateLeaderboardScores = function(group, addNew) {
    var maximumScore = 40000;
    var scoreIncrement = 4000;
    var scoreCount = 10;

    var possibleInitials = [
        "RAR", "GBE", "KBR", "GBR", "JBU", "MCE", "JCH", "BCO", "OCO", "NCR", "GDA", "JDI",
        "BDU", "YEL", "AGA", "AGO", "MGR", "DHA", "JHA", "MHE", "BHO", "MHO", "NLA", "ALE", "TLI", "ALI", "SMA",
        "AMA", "MMC", "KMO", "BNI", "XNI", "CPE", "SPR", "JPU", "KRA", "DRO", "BRO", "JSH", "MSH", "KTH", "STR",
        "DWA", "AWA", "REX"
    ]

    var results = [];

    if (isLocalStorageSupported) {
        var leaderboard = localStorage.getItem("stackoverflow-unikong-leader-board");
        if (leaderboard !== null) {
            results = JSON.parse(leaderboard);
        }
    }

    var maxScoreLength = 0;

    if (results.length === 0) {
        maxScoreLength = score.toString().length;

        for (var i = 0; i < scoreCount; i++) {
            var randomInitials = possibleInitials[Math.floor(Math.random() * possibleInitials.length)];
            if (i == 0) {
                randomInitials = "JON";
            }
            else {
                possibleInitials.splice(possibleInitials.indexOf(randomInitials), 1);
            }
            var randomScore = maximumScore - (i * scoreIncrement);

            results.push({ initials: randomInitials, score: randomScore });
            maxScoreLength = Math.max(maxScoreLength, randomScore.toString().length);
        }
    }
    else {
        for (var i = 0; i < results.length; i++) {
            maxScoreLength = Math.max(maxScoreLength, results[i].score.toString().length);
        }
    }
    if (addNew)
    {
        results.push({ initials: "YOU", score: score });
    }

    results.sort(function(x, y) {
        if (x.score < y.score) return 1;
        else if (x.score > y.score) return -1;
        return 0;
    });

    if (group) {
        for (var i = 0; i < scoreCount; i++) {
            var result = results[i];
            var fillColor = result.initials === "YOU" ? "#F48024" : "#FFFFFF";
            
            var scoreString = result.score.toString();
            while (scoreString.length < maxScoreLength) scoreString = " " + scoreString;

            var scoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 115 + (25 * i), result.initials + '    ' + scoreString, $.extend(fontStyle, { fill: fillColor }));
            scoreText.anchor.setTo(0.5);

            group.add(scoreText);
        }
    }

    if (isLocalStorageSupported) {
        var leaderboard = localStorage.setItem("stackoverflow-unikong-leader-board", JSON.stringify(results));
    }
};

var stairHeight = 100;
var platformSpriteWidth = 48;
var platformSpriteHeight = 32;
var stairWidth = 56;
var gameWidth = 810;
var gapWidth = 90;

var climbSpeed = 150;
var moveSpeed = 150;
var jumpSpeed = 300;

var score = 0;
var goldCount = 0;
var silverCount = 0;
var bronzeCount = 0;
var gameSpeedFactor = 1;
var weaponDropRateFactor = 1;
var trollSpeed = 25;
var unicornTargetingRate = 35
var remainingLives = 3;

var fontStyle = { font: 'Courier', fontSize: '20px', fill: '#fff' };

StackExchange.Unikong.game.state.add('Boot', StackExchange.Unikong.Boot);
StackExchange.Unikong.game.state.add('Preload', StackExchange.Unikong.Preload);
StackExchange.Unikong.game.state.add('Menu', StackExchange.Unikong.Menu);
StackExchange.Unikong.game.state.add('Game', StackExchange.Unikong.Game);
StackExchange.Unikong.game.state.add('Win', StackExchange.Unikong.Win);
StackExchange.Unikong.game.state.add('Loss', StackExchange.Unikong.Loss);
StackExchange.Unikong.game.state.add('Restart', StackExchange.Unikong.RestartGame);
StackExchange.Unikong.game.state.add('Leaderboard', StackExchange.Unikong.Leaderboard);
StackExchange.Unikong.game.state.add('Credits', StackExchange.Unikong.Credits);
StackExchange.Unikong.game.state.add('LevelTransition', StackExchange.Unikong.LevelTransition);

StackExchange.Unikong.game.state.start('Boot');

var konamiArray = [
    Phaser.Keyboard.UP,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
    Phaser.Keyboard.DOWN,
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.B,
    Phaser.Keyboard.A,
    Phaser.Keyboard.ENTER
];
var konamiArrayPointer = 0;
var isKonamiActive = false;

StackExchange.Unikong.checkKonamiKey = function (key) {
    if (konamiArrayPointer < konamiArray.length && konamiArray[konamiArrayPointer] === key.keyCode) {
        konamiArrayPointer++;
    } else {
        konamiArrayPointer = 0;
    }

    if (konamiArrayPointer === konamiArray.length) {
        konamiArrayPointer = 0;
        StackExchange.Unikong.stopMusic();

        if (!isKonamiActive) {
            isKonamiActive = true;

            var particleEmitter = this.game.add.emitter(this.game.world.centerX, 0, 400);
            particleEmitter.makeParticles('goldParticle');
            particleEmitter.width = this.game.world.width;
            particleEmitter.setXSpeed(-5, 5);
            particleEmitter.setYSpeed(300, 500);
            particleEmitter.minParticleScale = 0.5;
            particleEmitter.maxParticleScale = 1.0;
            particleEmitter.minRotation = 0;
            particleEmitter.maxRotation = 0;
            particleEmitter.start(false, 1600, 5, 0);

            var shrinkTween = this.game.add.tween(particleEmitter).to({ alpha: 0 }, 6000);
            shrinkTween.onComplete.add(function () {
                particleEmitter.destroy();
            }, this);
            shrinkTween.start();

            var intro = StackExchange.Unikong.game.add.audio('gameOverIntro', 0.3, false);
            intro.onStop.add(function () {
                StackExchange.Unikong.bgMusic = StackExchange.Unikong.game.add.audio('gameOverTheme', 0.3, true);
                StackExchange.Unikong.bgMusic.play();
            })
            intro.play();
        }
        else {
            isKonamiActive = false;
            StackExchange.Unikong.startMusic();
        }
    }
}
