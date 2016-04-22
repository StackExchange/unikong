StackExchange = window.StackExchange || {};
StackExchange.Unikong = StackExchange.Unikong || {};

StackExchange.Unikong.Player = function(game, x, y, key, lossSound) {
    Phaser.Sprite.call(this, game, x, y, key);

    this.isClimbing = false;
    this.isDead = false;
    this.isArmed = key === 'player-armed';
    this.hasKey = false;
    this.lastHorizontalMoveLeft = false;
    this.isFacingLeft = false;
    this.lossSound = lossSound;

    this.enableBody = true;
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.anchor.setTo(0.5, 0.5);
    this.body.collideWorldBounds = true;
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
    this.animations.add('climb', [9, 10, 11], 10, true);
    
    game.add.existing(this);
};
StackExchange.Unikong.Player.prototype = Object.create(Phaser.Sprite.prototype);
StackExchange.Unikong.Player.prototype.constructor = StackExchange.Unikong.Player;

StackExchange.Unikong.Player.prototype.wompwomp = function () {
    this.checkWorldBounds = true;
    this.body.collideWorldBounds = false;
    this.isDead = true;
    this.isArmed = false;

    this.angle = 270;

    this.moves = false;
    this.body.gravity.y = 0;
    this.body.velocity.y = moveSpeed * 2;

    this.events.onOutOfBounds.addOnce(function () {
        if (remainingLives === 0) {
            var scoreText = this.game.add.text(this.game.world.centerX, -10, Math.random() <= 0.5 ? 'oh no' : 'womp womp', fontStyle);
            scoreText.anchor.setTo(0.5, 0.5);
            this.lossSound.play();
            var booTween = this.game.add.tween(scoreText).to({ y: this.game.world.centerY }, 3000, "Quart.easeOut");
            booTween.onComplete.add(function () { this.game.state.start('Loss'); }, this);
            booTween.start();
        } else {
            this.game.state.start('LevelTransition');
        }
    }, this);
};
StackExchange.Unikong.Player.prototype.arm = function() {
    this.loadTexture('player-armed', this.frame);
    this.isArmed = true;
};

StackExchange.Unikong.Boss = function (game, x, y, player) {
    Phaser.Sprite.call(this, game, x, y, 'boss', 3);

    this.enableBody = true;
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.defaultVelocity = 50;
    this.targetingRate = 35;
    this.velocity = this.defaultVelocity;
    this.isThrowingDownvote = false;
    this.stopped = false;
    this.player = player;

    this.body.velocity.x = this.velocity;
    this.body.collideWorldBounds = true;
    
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [4, 5, 6, 7], 10, true);
    this.frame = 4;

    // create downvotes
    this.downvotes = this.game.add.group();

    for (var i = 0; i < 15; i++) {
        var dv = new StackExchange.Unikong.DownvoteTorch(game, this);
        this.downvotes.add(dv);

        if (i == 0) {
            StackExchange.Unikong.DownvoteTorch.Width = dv.width;
        }
    }

    this.game.physics.enable(this.downvotes, Phaser.Physics.ARCADE);

    this.particleEmitter = this.game.add.emitter(0, 0, 100);
    this.particleEmitter.makeParticles('goldParticle');
    this.particleEmitter.x = this.x + this.body.width;
    this.particleEmitter.y = this.y;
    this.particleEmitter.gravity = 0;
    this.particleEmitter.start(false, 150, 150);

    game.add.existing(this);
    this.animations.play('right');

    game.time.events.loop(Phaser.Timer.SECOND * 4 * weaponDropRateFactor, this.throwDownvote, this);
};
StackExchange.Unikong.Boss.prototype = Object.create(Phaser.Sprite.prototype);
StackExchange.Unikong.Boss.prototype.constructor = StackExchange.Unikong.Boss;

StackExchange.Unikong.Boss.prototype.move = function () {
    if (this.player.isDead || this.isThrowingDownvote || this.stopped) {
        this.body.velocity.x = 0;
        return;
    }

    this.body.velocity.x = this.isMovingLeft ? -this.defaultVelocity : this.defaultVelocity;

    this.particleEmitter.x = this.isMovingLeft ? this.x : this.x + this.body.width;

    var torchWidth = StackExchange.Unikong.DownvoteTorch.Width;
    if (this.x + this.width + torchWidth >= this.game.world.width - 5) {
        this.body.velocity.x = -this.velocity;
        this.frame = 3;
        this.animations.play('left');
        this.isMovingLeft = true;
    }
    else if (this.x - torchWidth <= 5) {
        this.body.velocity.x = this.velocity;
        this.frame = 4;
        this.animations.play('right');
        this.isMovingLeft = false;
    }
};

StackExchange.Unikong.Boss.prototype.possiblyAlterMovement = function () {
    if (this.player.isDead || this.isThrowingDownvote || this.stopped) {
        this.body.velocity.x = 0;
        return;
    }

    var isPlayerOnLeft = this.player.body.x + (this.player.body.width / 2) <= this.body.x + (this.body.width / 2);
    var randomFactor = (Math.random() * (100 - 0) + 0) < unicornTargetingRate;

    if (this.isMovingLeft && !isPlayerOnLeft && randomFactor) {
        this.body.velocity.x = this.defaultVelocity;
        this.frame = 4;
        this.animations.play('right');
        this.isMovingLeft = false;
    }
    else if (!this.isMovingLeft && isPlayerOnLeft && randomFactor) {
        this.body.velocity.x = -this.defaultVelocity;
        this.frame = 3;
        this.animations.play('left');
        this.isMovingLeft = true;
    }
    else {
        this.body.velocity.x = this.isMovingLeft ? -this.defaultVelocity : this.defaultVelocity;
    }
};

StackExchange.Unikong.Boss.prototype.throwDownvote = function () {
    if (this.player.isDead || this.stopped) return;

    var dv = this.downvotes.getFirstExists(false);
    if(dv) dv.doThrow();
};

StackExchange.Unikong.Boss.prototype.stopDownvotes = function () {
    this.downvotes.forEachAlive(function (e) {
        e.body.allowGravity = false;
        e.body.gravity = 0;
        e.body.velocity.y = 0;
    });
};

StackExchange.Unikong.Troll = function (game, x, y, player, minX, maxX) {
    Phaser.Sprite.call(this, game, x, y, 'troll');

    this.enableBody = true;
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.defaultVelocity = trollSpeed;
    this.velocity = this.defaultVelocity;
    this.player = player;
    this.minX = minX || 5;
    this.maxX = maxX || game.world.width - 5;

    this.body.velocity.x = this.velocity;
    this.body.collideWorldBounds = true;

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [4, 5, 6, 7], 10, true);
    this.frame = 4;

    game.add.existing(this);

    this.animations.play('right');
};
StackExchange.Unikong.Troll.prototype = Object.create(Phaser.Sprite.prototype);
StackExchange.Unikong.Troll.prototype.constructor = StackExchange.Unikong.Troll;

StackExchange.Unikong.Troll.prototype.move = function () {
    if (this.player.isDead) {
        this.body.velocity.x = 0;
        return;
    }

    this.body.velocity.x = this.isMovingLeft ? -this.defaultVelocity : this.defaultVelocity;

    if (this.x + this.width >= this.maxX) {
        this.body.velocity.x = -this.velocity;
        this.frame = 3;
        this.animations.play('left');
        this.isMovingLeft = true;
    }
    else if (this.x <= this.minX) {
        this.body.velocity.x = this.velocity;
        this.frame = 4;
        this.animations.play('right');
        this.isMovingLeft = false;
    }
};
StackExchange.Unikong.Troll.prototype.wompwomp = function () {
    this.checkWorldBounds = true;
    this.body.collideWorldBounds = false;
    this.isDead = true;

    this.angle = 270;

    this.moves = false;
    this.body.gravity.y = 0;
    this.body.velocity.y = moveSpeed * 2;
};