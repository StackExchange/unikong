StackExchange = window.StackExchange || {};
StackExchange.Unikong = StackExchange.Unikong || {};

StackExchange.Unikong.Game = function() {};

var pauseMenu;
var btnArray;
var btnArrayIndex;
var isPauseMenuButtonActivated;

StackExchange.Unikong.Game.prototype = {
    createStairsL1: function() {
        this.stairs = this.game.add.group();
        this.stairs.add(this.game.add.tileSprite(90, this.game.world.height - 182 - 1, 56, 152 + 1, 'ladder'));
        this.stairs.add(this.game.add.tileSprite(654, this.game.world.height - 182 - 1, 56, 152 + 1, 'ladder'));
        this.stairs.add(this.game.add.tileSprite(150, this.game.world.height - 570 - 1, 56, 142 + 1, 'ladder'));
        this.stairs.add(this.game.add.tileSprite(600, this.game.world.height - 570 - 1, 56, 142 + 1, 'ladder'));

        this.game.physics.enable(this.stairs, Phaser.Physics.ARCADE);
    },
    createPlatformsL1: function() {
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        var ground = this.game.add.tileSprite(0, this.game.world.height - 30, gameWidth, platformSpriteHeight, 'ground');

        var secondLevel = this.game.add.tileSprite(0, this.game.world.height - platformSpriteHeight * 2 - stairHeight - 18, 810, platformSpriteHeight, 'platform');
        
        var thirdLevelY = this.game.world.height - platformSpriteHeight * 3 - stairHeight * 2;
        var thirdLevelLeft = this.game.add.tileSprite(0, thirdLevelY, platformSpriteWidth * 3, platformSpriteHeight, 'platform');
        var thirdLevelCenter = this.game.add.tileSprite(thirdLevelLeft.width + gapWidth, thirdLevelY, platformSpriteWidth * 7, platformSpriteHeight, 'platform');
        var thirdLevelRight = this.game.add.tileSprite(this.game.world.width - platformSpriteWidth * 3, thirdLevelY, platformSpriteWidth * 3, platformSpriteHeight, 'platform');

        var fourthLevelY = this.game.world.height - platformSpriteHeight * 4 - stairHeight * 3;
        var fourthLevelLeft = this.game.add.tileSprite(0, fourthLevelY, platformSpriteWidth * 6, platformSpriteHeight, 'platform');
        var fourthLevelRight = this.game.add.tileSprite(this.game.world.width - platformSpriteWidth * 6, fourthLevelY, platformSpriteWidth * 6, platformSpriteHeight, 'platform');
        
        var topLevel = this.game.add.tileSprite(0, this.game.world.height - platformSpriteHeight * 5 - stairHeight * 4 - 10, 810, platformSpriteHeight, 'platform');

        this.platforms.add(ground);
        this.platforms.add(secondLevel);
        this.platforms.add(thirdLevelLeft);
        this.platforms.add(thirdLevelCenter);
        this.platforms.add(thirdLevelRight);
        this.platforms.add(fourthLevelLeft);
        this.platforms.add(fourthLevelRight);
        this.platforms.add(topLevel);

        this.platforms.forEach(function(platform) {
            platform.body.immovable = true;
        }, this);
    },
    createWinConditionL1: function () {
        this.diamonds = this.game.add.group();

        var diamondParticleEmitter = this.game.add.emitter(0, 0, 100);
        diamondParticleEmitter.makeParticles('diamondParticle');

        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 395, 48, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 737, 355, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 47, 355, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 395, 270, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 395, 555, 100, diamondParticleEmitter, 750, 25));
    },
    createTreasureL1: function() {
        this.treasures = this.game.add.group();

        var bronzeParticleEmitter = this.game.add.emitter(0, 0, 100);
        bronzeParticleEmitter.makeParticles('bronzeParticle');

        for (var x = 200; x < 650; x += 50) {
            this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'bronze', x, 630, 10, bronzeParticleEmitter, 400, 10));
            this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'bronze', x, 480, 10, bronzeParticleEmitter, 400, 10));
        }

        for (var x = 250; x < 600; x += 50) {
            this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'bronze', x, 365, 10, bronzeParticleEmitter, 400, 10));
        }

        var silverParticleEmitter = this.game.add.emitter(0, 0, 100);
        silverParticleEmitter.makeParticles('silverParticle');

        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', 18, 365, 25, silverParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', 85, 365, 25, silverParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', 708, 365, 25, silverParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', 775, 365, 25, silverParticleEmitter, 400, 10));

        var goldParticleEmitter = this.game.add.emitter(0, 0, 100);
        goldParticleEmitter.makeParticles('goldParticle');

        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 18, 235, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 85, 235, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 708, 235, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 775, 235, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 345, 280, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 455, 280, 50, goldParticleEmitter, 400, 10));
    },
    createStairsL2: function () {
        this.stairs = this.game.add.group();
        this.stairs.add(this.game.add.tileSprite(650, this.game.world.height - 150 - 1, 56, 122 + 1, 'ladder'));
        this.stairs.add(this.game.add.tileSprite(100, this.game.world.height - 270 - 1, 56, 120 + 1, 'ladder'));
        this.stairs.add(this.game.add.tileSprite(425, this.game.world.height - 570 - 1, 56, 150 + 1, 'ladder'));
        this.stairs.add(this.game.add.tileSprite(750, this.game.world.height - 570 - 1, 56, 150 + 1, 'ladder'));

        this.game.physics.enable(this.stairs, Phaser.Physics.ARCADE);
    },
    createPlatformsL2: function () {
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        var ground = this.game.add.tileSprite(0, this.game.world.height - 30, gameWidth, platformSpriteHeight, 'ground');

        var secondLevel = this.game.add.tileSprite(0, this.game.world.height - 150, this.game.world.width, platformSpriteHeight, 'platform');

        var thirdLevel = this.game.add.tileSprite(0, this.game.world.height - 270, this.game.world.width, platformSpriteHeight, 'platform');

        var fourthLevelY = this.game.world.height - 420;
        var fourthLevelLeft = this.game.add.tileSprite(0, fourthLevelY, 220, platformSpriteHeight, 'platform');
        var fourthLevelCenter = this.game.add.tileSprite(fourthLevelLeft.width + 65, fourthLevelY, 220, platformSpriteHeight, 'platform');
        var fourthLevelRight = this.game.add.tileSprite(this.game.world.width - 220, fourthLevelY, 220, platformSpriteHeight, 'platform');

        var topLevel = this.game.add.tileSprite(0, this.game.world.height - platformSpriteHeight * 5 - stairHeight * 4 - 10, 810, platformSpriteHeight, 'platform');

        this.platforms.add(ground);
        this.platforms.add(secondLevel);
        this.platforms.add(thirdLevel);
        this.platforms.add(fourthLevelLeft);
        this.platforms.add(fourthLevelCenter);
        this.platforms.add(fourthLevelRight);
        this.platforms.add(topLevel);

        this.platforms.forEach(function (platform) {
            platform.body.immovable = true;
        }, this);
    },
    createWinConditionL2: function () {
        this.diamonds = this.game.add.group();

        var diamondParticleEmitter = this.game.add.emitter(0, 0, 100);
        diamondParticleEmitter.makeParticles('diamondParticle');

        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 35, 495, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 395, 335, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 145, 200, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 395, 75, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 675, 200, 100, diamondParticleEmitter, 750, 25));
    },
    createTreasureL2: function () {
        this.treasures = this.game.add.group();

        var bronzeParticleEmitter = this.game.add.emitter(0, 0, 100);
        bronzeParticleEmitter.makeParticles('bronzeParticle');

        for (var x = 200; x < 650; x += 150) {
            this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'bronze', x, 630, 10, bronzeParticleEmitter, 400, 10));
        }
        var silverParticleEmitter = this.game.add.emitter(0, 0, 100);
        silverParticleEmitter.makeParticles('silverParticle');

        for (var x = 175; x < 625; x += 150) {
            this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', x, 510, 25, silverParticleEmitter, 400, 10));
        }

        var i = 0;
        for (var x = 150; x <= 650; x += 30) {
            if (i % 2 == 0) {
                this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'bronze', x, 400, 10, bronzeParticleEmitter, 400, 10));
            } else {
                this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', x, 400, 25, silverParticleEmitter, 400, 10));
            }
            i++;
        }

        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', 30, 215, 25, silverParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', 70 , 215, 25, silverParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', 110, 215, 25, silverParticleEmitter, 400, 10));

        var goldParticleEmitter = this.game.add.emitter(0, 0, 100);
        goldParticleEmitter.makeParticles('goldParticle');

        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 775, 630, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 247, 290, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 540, 290, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 679, 255, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 395, 225, 50, goldParticleEmitter, 400, 10));
    },
    createLaserL2: function() {
        this.laser = this.game.add.sprite(750, 510, 'laser');
        this.laser.enableBody = true;
        this.game.physics.enable(this.laser, Phaser.Physics.ARCADE);
        this.laser.body.allowGravity = false;

        this.ammo = this.game.add.group();

        var goldParticleEmitter = this.game.add.emitter(0, 0, 100);
        goldParticleEmitter.makeParticles('goldParticle');

        for (var i = 0; i < 50; i++) {
            var r = new StackExchange.Unikong.Rainbow(this.game, this.shootSound, goldParticleEmitter, 200, 25);
            this.ammo.add(r);
        }
        this.game.physics.enable(this.ammo, Phaser.Physics.ARCADE);
    },
    createEnemiesL2: function() {
        this.trolls = this.game.add.group();
        this.trolls.add(new StackExchange.Unikong.Troll(this.game, 10, 495, this.player));
        this.trolls.add(new StackExchange.Unikong.Troll(this.game, 10, 375, this.player));
        this.trolls.add(new StackExchange.Unikong.Troll(this.game, 700, 375, this.player));
    },
    createStairsL3: function () {
        this.stairs = this.game.add.group();
        this.stairs.add(this.game.add.tileSprite(385, this.game.world.height - 200 - 1, 56, 170 + 1, 'ladder'));
        this.stairs.add(this.game.add.tileSprite(100, this.game.world.height - 570 - 1, 56, 245 + 1, 'ladder'));
        this.stairs.add(this.game.add.tileSprite(654, this.game.world.height - 570 - 1, 56, 245 + 1, 'ladder'));

        this.game.physics.enable(this.stairs, Phaser.Physics.ARCADE);
    },
    createPlatformsL3: function () {
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        var ground = this.game.add.tileSprite(0, this.game.world.height - 30, gameWidth, platformSpriteHeight, 'ground');

        var secondLevel = this.game.add.tileSprite(320, this.game.world.height - 200, 190, platformSpriteHeight, 'platform');

        var thirdLevelLeft = this.game.add.tileSprite(0, this.game.world.height - 325, 275, platformSpriteHeight, 'platform');
        var thirdLevelRight = this.game.add.tileSprite(this.game.world.width - 275, this.game.world.height - 325, 275, platformSpriteHeight, 'platform');

        var fourthLevel = this.game.add.tileSprite(320, this.game.world.height - 450, 190, platformSpriteHeight, 'platform');
        
        var topLevel = this.game.add.tileSprite(0, this.game.world.height - platformSpriteHeight * 5 - stairHeight * 4 - 10, 810, platformSpriteHeight, 'platform');

        this.platforms.add(ground);
        this.platforms.add(secondLevel);
        this.platforms.add(thirdLevelLeft);
        this.platforms.add(thirdLevelRight);
        this.platforms.add(fourthLevel);
        this.platforms.add(topLevel);

        this.platforms.forEach(function (platform) {
            platform.body.immovable = true;
        }, this);
    },
    createWinConditionL3: function () {
        this.diamonds = this.game.add.group();

        var diamondParticleEmitter = this.game.add.emitter(0, 0, 100);
        diamondParticleEmitter.makeParticles('diamondParticle');

        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 35, 335, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 345, 215, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 465, 215, 100, diamondParticleEmitter, 750, 25));
        this.diamonds.add(new StackExchange.Unikong.TreasureItem(this.game, 'diamond', 755, 335, 100, diamondParticleEmitter, 750, 25));

        this.chest = this.game.add.sprite(395, 75, 'chest-closed');
        this.game.physics.enable(this.chest, Phaser.Physics.ARCADE);
        this.chest.enableBody = true;
        this.chest.body.immovable = true;
    },
    createTreasureL3: function () {
        this.treasures = this.game.add.group();

        var bronzeParticleEmitter = this.game.add.emitter(0, 0, 100);
        bronzeParticleEmitter.makeParticles('bronzeParticle');

        for (var x = 100; x < 350; x += 50) {
            this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'bronze', x, 630, 10, bronzeParticleEmitter, 400, 10));
            this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'bronze', x + 415, 630, 10, bronzeParticleEmitter, 400, 10));
        }
        var silverParticleEmitter = this.game.add.emitter(0, 0, 100);
        silverParticleEmitter.makeParticles('silverParticle');

        for (var x = 50; x < 350; x += 50) {
            this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', x, 510, 25, silverParticleEmitter, 400, 10));
            this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'silver', x + 465, 510, 25, silverParticleEmitter, 400, 10));
        }

        var goldParticleEmitter = this.game.add.emitter(0, 0, 100);
        goldParticleEmitter.makeParticles('goldParticle');

        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 350, 630, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 465, 630, 50, goldParticleEmitter, 400, 10));
        this.treasures.add(new StackExchange.Unikong.TreasureItem(this.game, 'gold', 405, 225, 50, goldParticleEmitter, 400, 10));

    },
    createLaserL3: function () {
        this.laser = this.game.add.sprite(397, 440, 'laser');
        this.laser.enableBody = true;
        this.game.physics.enable(this.laser, Phaser.Physics.ARCADE);
        this.laser.body.allowGravity = false;

        this.ammo = this.game.add.group();

        var goldParticleEmitter = this.game.add.emitter(0, 0, 100);
        goldParticleEmitter.makeParticles('goldParticle');

        for (var i = 0; i < 50; i++) {
            var r = new StackExchange.Unikong.Rainbow(this.game, this.shootSound, goldParticleEmitter, 200, 25);
            this.ammo.add(r);
        }
        this.game.physics.enable(this.ammo, Phaser.Physics.ARCADE);
    },
    createEnemiesL3: function () {
        this.trolls = this.game.add.group();
        this.trolls.add(new StackExchange.Unikong.Troll(this.game, 55, 320, this.player, 45, 275));
        this.trolls.add(new StackExchange.Unikong.Troll(this.game, 655, 320, this.player, this.game.world.width - 275, 755));
        this.trolls.add(new StackExchange.Unikong.Troll(this.game, 320, 195, this.player, 320, 510));
        this.trolls.add(new StackExchange.Unikong.Troll(this.game, 480, 195, this.player, 320, 510));
    },
    createSounds: function() {
        this.jumpSound = this.game.add.audio('jump', 0.15, false);
        this.deathSound = this.game.add.audio('death', 0.3, false);
        this.pickupSound = this.game.add.audio('pickup', 0.3, false);
        this.pickupBadgeSound = this.game.add.audio('pickup-badge', 0.3, false);
        this.shootSound = this.game.add.audio('shoot', 0.3, false);

        this.winSound = this.game.add.audio('winTheme', 0.3, false);
        this.lossSound = this.game.add.audio('lossTheme', 0.3, false);
    },
    attack: function() {
        if (!this.player.isArmed) return;

        this.ammo.getFirstExists(false).fire(this.player);
    },
    wireUpControls: function() {
        this.cursors = this.game.input.keyboard.createCursorKeys();

        var p = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        p.onDown.add(this.showPauseMenu, this);
        var esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        esc.onDown.add(this.showPauseMenu, this);

        var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.attack, this);
    },
    showPauseMenu: function () {
        if (this.game.paused) {
            return;
        }

        isPauseMenuButtonActivated = false;

        this.game.paused = true;

        if (this.pauseOverlay) {
            this.pauseOverlay.alpha = 1;
            this.pauseOverlay.visible = true;
            return;
        }

        btnArray = [];
        btnArrayIndex = 0;

        this.pauseOverlay = this.game.add.group();

        var overlay = this.game.add.sprite(0, 0, 'menu-bg');
        overlay.alpha = 0.95;

        var resumeBtn = this.game.add.sprite(65, 215, 'btn-resume');
        resumeBtn.frame = 1;
        this.game.physics.enable(resumeBtn, Phaser.Physics.ARCADE);
        resumeBtn.body.allowGravity = false;

        var restartBtn = this.game.add.sprite(65, 285, 'btn-restart');
        restartBtn.frame = 0;
        this.game.physics.enable(restartBtn, Phaser.Physics.ARCADE);
        restartBtn.body.allowGravity = false;

        var returnBtn = this.game.add.sprite(65, 355, 'btn-return');
        returnBtn.frame = 0;
        this.game.physics.enable(returnBtn, Phaser.Physics.ARCADE);
        returnBtn.body.allowGravity = false;

        var exitBtn = this.game.add.sprite(65, 425, 'btn-exit');
        exitBtn.frame = 0;
        this.game.physics.enable(exitBtn, Phaser.Physics.ARCADE);
        exitBtn.body.allowGravity = false;

        this.pauseOverlay.add(overlay);
        this.pauseOverlay.add(resumeBtn);
        this.pauseOverlay.add(restartBtn);
        this.pauseOverlay.add(returnBtn);
        this.pauseOverlay.add(exitBtn);

        btnArray.push(resumeBtn);
        btnArray.push(restartBtn);
        btnArray.push(returnBtn);
        btnArray.push(exitBtn);

        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        up.onDown.add(this.toggleMenu, this);
        down.onDown.add(this.toggleMenu, this);

        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.letsGo, this);
        var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.letsGo, this);

        this.game.input.onDown.add(function (event) {
            if (!this.game.paused) {
                return;
            }

            // when game is paused you can't click on sprites, so we get to do this the stupid and old fashioned way
            if (clicked(event, resumeBtn)) {
                this.toggleMenu(null, 0);
                this.letsGo();
            }
            else if (clicked(event, restartBtn)) {
                this.toggleMenu(null, 1);
                this.letsGo();
            }
            else if (clicked(event, returnBtn)) {
                this.toggleMenu(null, 2);
                this.letsGo();
            }
            else if (clicked(event, exitBtn)) {
                this.toggleMenu(null, 3);
                this.letsGo();
            }

            function clicked(event, button) {
                return event.x >= button.x && event.x <= button.x + button.body.width
                    && event.y >= button.y && event.y <= button.y + button.body.height;
            }
        }, this);
    },
    toggleMenu: function(key, index) {
        if (isPauseMenuButtonActivated || !this.game.paused) {
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
        if (!this.game.paused) {
            return;
        }

        isPauseMenuButtonActivated = true;
        this.game.paused = false;

        var shrinkTween = this.game.add.tween(this.pauseOverlay).to({ alpha: 0 }, 200);
        shrinkTween.onComplete.add(function () {
            this.pauseOverlay.visible = false;
            if (btnArray[0].frame === 1) {
                // no-op
            } else if (btnArray[1].frame === 1) {
                this.destroyPauseOverlay();
                this.game.state.start('Restart');
            } else if (btnArray[2].frame === 1) {
                this.destroyPauseOverlay();
                this.game.state.start('Menu');
            } else {
                StackExchange.Unikong.quit();
            }
        }, this);
        shrinkTween.start();
    },
    createTopbar: function () {
        this.scoreText = this.game.add.text(450, 20, 'rep ' + score, fontStyle);
        
        this.goldText = this.game.add.text(605, 20, goldCount, fontStyle);
        this.silverText = this.game.add.text(680, 20, silverCount, fontStyle);
        this.bronzeText = this.game.add.text(755, 20, bronzeCount, fontStyle);
        
        this.game.add.sprite(575, 15, 'bigGold');
        this.game.add.sprite(650, 15, 'bigSilver');
        this.game.add.sprite(725, 15, 'bigBronze');
        this.game.add.sprite(45, 15, 'heart');
        this.livesText = this.game.add.text(80, 20, remainingLives, fontStyle);
    },
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.sprite(0, 0, 'bg');

        this.createSounds();
        StackExchange.Unikong.startMusic();
        StackExchange.Unikong.bindSoundToggle();

        this.createTopbar();

        var effectiveLevel = StackExchange.Unikong.effectiveLevel();
        if (effectiveLevel === 1) {
            this.createPlatformsL1();
            this.createStairsL1();
            this.createWinConditionL1();
            this.createTreasureL1();
        } else if (effectiveLevel === 2) {
            this.createPlatformsL2();
            this.createStairsL2();
            this.createTreasureL2();
            this.createLaserL2();
            this.createWinConditionL2();
        } else {
            this.createPlatformsL3();
            this.createStairsL3();
            this.createTreasureL3();
            this.createLaserL3();
            this.createWinConditionL3();
        }

        this.wireUpControls();

        this.player = new StackExchange.Unikong.Player(this.game, 32, this.game.world.height - 100, 'player', this.lossSound);
        this.boss = new StackExchange.Unikong.Boss(this.game, 32, 45, this.player);

        if (effectiveLevel === 2) {
            this.createEnemiesL2();
        } else if (effectiveLevel === 3) {
            this.createEnemiesL3();
        }

        // prevent all keys from affecting the page behind the game
        this.game.input.keyboard.addKeyCapture([Phaser.KeyCode.UP, Phaser.KeyCode.DOWN, Phaser.KeyCode.LEFT, Phaser.KeyCode.RIGHT, Phaser.Keyboard.B, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.P, Phaser.KeyCode.ENTER, Phaser.KeyCode.ESC, Phaser.KeyCode.SPACEBAR]);
    },
    climbStairs: function (player, stair) {
        var playerFeet = player.body.y + player.body.height;
        var stairFeet = stair.body.y + stair.body.height;
        if (playerFeet == stairFeet && this.cursors.down.isDown) {
            player.body.velocity.y = 0;
            return;
        }

        if (this.cursors.up.isDown || this.cursors.down.isDown) {
            player.body.allowGravity = false;
            player.body.velocity.y = this.cursors.up.isDown ? -climbSpeed : climbSpeed;
            player.isClimbing = true;
            if (player.animations.paused)
                player.animations.paused = false;
            else
                player.animations.play('climb');
        }
        else {
            player.body.velocity.y = 0;
            if (player.isClimbing)
                player.animations.paused = true;
        }
    },
    climbStairsResetCheck: function () {
        var player = this.player;
        if (!player.isClimbing) {
            return;
        }
         
        var isOnStair = false;
        this.stairs.forEach(function (stair) {
            var playerFeet = player.body.y + player.body.height;
            var playerHead = player.body.y;
            var stairFeet = stair.body.y + stair.body.height;
            var stairHead = stair.body.y;
            if (player.overlap(stair) && playerFeet <= stairFeet && playerFeet >= stairHead + 1) {
                isOnStair = true;
            }
        });

        if (!isOnStair) {
            player.isClimbing = false;
            player.body.velocity.y = 0;
            player.body.allowGravity = true;
            player.animations.paused = false;
        }
    },
    updateScore: function(val) {
        score += val;
        this.scoreText.text = 'rep ' + score;
    },
    destroyPauseOverlay: function() {
        if (this.pauseOverlay) {
            this.pauseOverlay.destroy();
            this.pauseOverlay = null;
        }
    },
    winGame: function (player, diamond) {
        diamond.kill();

        this.pickupSound.play();

        this.updateScore(100);
        
        if (this.diamonds.countLiving() === 0) {
            var effectiveLevel = StackExchange.Unikong.effectiveLevel();
            if (effectiveLevel === 1 || effectiveLevel === 2) {
                StackExchange.Unikong.level += 1;
                this.destroyPauseOverlay();
                this.game.world.removeAll();
                this.game.state.start('LevelTransition');
            } else {
                this.key = this.game.add.sprite(395, 215, 'key');
                this.game.physics.enable(this.key, Phaser.Physics.ARCADE);

                this.keyParticleEmitter = this.game.add.emitter(0, 0, 100);
                this.keyParticleEmitter.makeParticles('goldParticle');
                this.keyParticleEmitter.x = this.key.x + (this.key.body.width / 2);
                this.keyParticleEmitter.y = this.key.y + (this.key.body.height / 2);
                this.keyParticleEmitter.gravity = 0;
                this.keyParticleEmitter.start(false, 200, 75);
            }
        }
    },
    winWholeGame: function () {
        this.boss.stopDownvotes();
        this.boss.stopped = true;
        var factor = StackExchange.Unikong.level / 3; // how many times have we won?
        this.updateScore(500 * factor);

        var scoreText = this.game.add.text(this.game.world.centerX, -10, Math.random() <= 0.5 ? 'good job' : 'nicely done', fontStyle);
        scoreText.anchor.setTo(0.5, 0.5);

        this.destroyPauseOverlay();

        this.winSound.play();
        var yayTween = this.game.add.tween(scoreText).to({ y: this.game.world.centerY }, 3000, "Quart.easeOut");
        yayTween.onComplete.add(function() { this.game.state.start('Win'); }, this);
        
        // MAKE IT RAIN, BABY
        var particleEmitter = this.game.add.emitter(this.game.world.centerX, 0, 200);
        particleEmitter.makeParticles('diamond');
        particleEmitter.width = this.game.world.width;
        particleEmitter.setXSpeed(-5, 5);
        particleEmitter.setYSpeed(50, 500);
        particleEmitter.minParticleScale = 0.1;
        particleEmitter.maxParticleScale = 1.0;
        particleEmitter.minRotation = 0;
        particleEmitter.maxRotation = 360;
        particleEmitter.start(false, 1600, 5, 0);

        yayTween.start();
    },
    loseGame: function (player, enemy) {
        if (player.isDead) return;

        this.deathSound.play();

        if(enemy !== this.boss)
            enemy.kill();

        this.boss.stopDownvotes();

        remainingLives--;

        this.game.add.tween(this.livesText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.Out, true).onComplete.add(function () {
            this.livesText.text = remainingLives.toString();
            this.game.add.tween(this.livesText).to({ alpha: 1 }, 500, Phaser.Easing.Linear.In, true);
        }, this);

        player.animations.play('dead');
        
        player.wompwomp();
    },
    yiss: function (player, item) {
        this.pickupBadgeSound.play();
        this.updateScore(item.pointValue);

        if(item.itemType === 'bronze') {
            bronzeCount++;
            this.bronzeText.text = bronzeCount;
        }
        if(item.itemType === 'silver') {
            silverCount++;
            this.silverText.text = silverCount;
        }
        if(item.itemType === 'gold') {
            goldCount++;
            this.goldText.text = goldCount;
        }

        item.kill();
    },
    clean: function() {
        console.log('woof');
    },
    update: function () {
        this.player.body.velocity.x = 0;
        this.boss.move();

        var effectiveLevel = StackExchange.Unikong.effectiveLevel();
        if (effectiveLevel > 1) {
            this.trolls.forEach(function(t) { t.move(); });
        }
        if (this.player.isDead) {
            this.player.animations.stop();
            this.player.frame = 4;
            return;
        };

        this.game.physics.arcade.collide(this.player, this.platforms, null, function (player, platform) { return !player.isClimbing && !player.isDead; }, this);
        this.game.physics.arcade.overlap(this.player, this.stairs, this.climbStairs, null, this);

        this.climbStairsResetCheck();

        if (effectiveLevel > 1) {
            this.game.physics.arcade.collide(this.player, this.laser, function(player, laser) {
                player.arm();
                laser.destroy();
            }, null, this);
            this.game.physics.arcade.collide(this.player, this.trolls, this.loseGame, null, this);
            this.game.physics.arcade.collide(this.trolls, this.ammo, function (t, a) {
                this.deathSound.play();
                t.wompwomp();
                a.kill();
                this.updateScore(150);
            }, null, this);
            this.game.physics.arcade.collide(this.platforms, this.ammo, function (t, a) {
                a.kill();
            }, null, this);

            this.game.physics.arcade.collide(this.boss, this.ammo, function(b, a) {
                a.kill();
            }, null, this);
        }

        this.game.physics.arcade.overlap(this.player, this.treasures, this.yiss, null, this);
        if (StackExchange.Unikong.effectiveLevel() === 3) {
            if (this.key) {
                this.game.physics.arcade.collide(this.player, this.key, function(p, k) {
                    p.hasKey = true;
                    this.updateScore(100);
                    this.keyParticleEmitter.destroy();
                    k.kill();
                    this.pickupSound.play();
                }, null, this);
            }
            this.game.physics.arcade.collide(this.player, this.chest, function (p, c) {
                if (!this.boss.stopped) { // only once!
                    c.loadTexture('chest-open');
                    this.winWholeGame();
                }
            }, function(p, c) { return p.hasKey; }, this);
        }

        this.game.physics.arcade.collide(this.player, this.diamonds, this.winGame, null, this);
        this.game.physics.arcade.collide(this.player, this.boss.downvotes, this.loseGame, null, this);
        this.game.physics.arcade.collide(this.player, this.boss, this.loseGame, null, this);
        this.game.physics.arcade.collide(this.player, this.troll, this.loseGame, null, this);

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -moveSpeed;
            this.player.lastHorizontalMoveLeft = true;
            if (!this.player.isFacingLeft) {
                this.player.scale.x *= -1;
                this.player.isFacingLeft = true;
            }

            this.player.animations.play('right');

            if (!this.player.isClimbing) {
                this.player.body.allowGravity = true;
            }
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = moveSpeed;
            this.player.lastHorizontalMoveLeft = false;
            if (this.player.isFacingLeft) {
                this.player.scale.x *= -1;
                this.player.isFacingLeft = false;
            }

            this.player.animations.play('right');

            if (!this.player.isClimbing) {
                this.player.body.allowGravity = true;
            }
        }
        else {
            if (!this.player.isClimbing) {
                this.player.animations.stop();
                this.player.frame = 4;
            }
        }

        if (this.cursors.up.isDown && this.player.body.touching.down && !this.player.isClimbing) {
            this.jumpSound.play();
            this.player.body.allowGravity = true;
            this.player.body.velocity.y = -jumpSpeed;
        }
    }
};


StackExchange.Unikong.RestartGame = function () { };
StackExchange.Unikong.RestartGame.prototype = {
    create: function () {
        score = 0;
        StackExchange.Unikong.level = 1;
        gameSpeedFactor = 1;
        weaponDropRateFactor = 1;
        remainingLives = 3;
        bronzeCount = 0;
        silverCount = 0;
        goldCount = 0;
        this.game.state.start('LevelTransition');
    }
};

StackExchange.Unikong.LevelTransition = function () { };
StackExchange.Unikong.LevelTransition.prototype = {
    create: function () {
        var grp = this.game.add.group();
        var bg = this.game.add.sprite(0, 0, 'bg');
        
        var txt = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'level ' + StackExchange.Unikong.level, fontStyle);
        txt.anchor.setTo(0.5);
        
        grp.add(bg);
        grp.add(txt);

        var shrinkTween = this.game.add.tween(grp).to({ alpha: 0 }, 2500);
        shrinkTween.onComplete.add(function() {
            this.game.state.start('Game');
        }, this);
        shrinkTween.start();
    }
};