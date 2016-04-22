StackExchange = window.StackExchange || {};
StackExchange.Unikong = StackExchange.Unikong || {};

StackExchange.Unikong.DownvoteTorch = function (game, boss) {
    Phaser.Sprite.call(this, game, 0, 0, 'downvote');

    this.boss = boss;

    this.enableBody = true;
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.exists = false;

    this.body.gravity.y = 50 * gameSpeedFactor;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    var initAnimation = this.animations.add('init', [0, 1, 2, 3, 4, 5], 10, false);
    initAnimation.onComplete.add(function () { boss.isThrowingDownvote = false; boss.possiblyAlterMovement(); });

    this.animations.add('burn', [6, 7, 8], 10, true);

    initAnimation.onComplete.add(function() { this.animations.play('burn'); }, this);

    game.add.existing(this);
};

StackExchange.Unikong.DownvoteTorch.prototype = Object.create(Phaser.Sprite.prototype);
StackExchange.Unikong.DownvoteTorch.prototype.constructor = StackExchange.Unikong.DownvoteTorch;

StackExchange.Unikong.DownvoteTorch.prototype.doThrow = function () {
    var bossCenter = this.boss.x + (this.boss.width / 2);
    this.reset(bossCenter + (this.boss.isMovingLeft ? (-1 * this.boss.width) : this.boss.width - this.width), this.boss.y);
    this.boss.isThrowingDownvote = true;
    this.animations.play('init'); // completed event will set isThrowingDownvote back to false
};

StackExchange.Unikong.TreasureItem = function(game, key, x, y, value, particleEmitter, particleTime, particleCount) {
    Phaser.Sprite.call(this, game, x, y, key);

    this.enableBody = true;
    this.pointValue = value;
    this.itemType = key;
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.allowGravity = false;
    this.alive = true;

    game.add.existing(this);

    var item = this;

    this.events.onKilled.add(function () {
        particleEmitter.x = item.x + (item.width / 2);
        particleEmitter.y = item.y + (item.height / 2);
        particleEmitter.gravity = 0;
        particleEmitter.start(true, particleTime, null, particleCount);
    });
};
StackExchange.Unikong.TreasureItem.prototype = Object.create(Phaser.Sprite.prototype);
StackExchange.Unikong.TreasureItem.prototype.constructor = StackExchange.Unikong.TreasureItem;

StackExchange.Unikong.Rainbow = function (game, sound, particleEmitter, particleTime, particleCount) {
    Phaser.Sprite.call(this, game, 0, 0, 'rainbow');

    this.frame = 1;
    this.enableBody = true;
    this.speed = 400;
    this.sound = sound;

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
    this.body.allowGravity = false;

    var item = this;

    this.events.onKilled.add(function () {
        particleEmitter.x = item.x + (item.width / 2);
        particleEmitter.y = item.y + (item.height / 2);
        particleEmitter.gravity = 0;
        particleEmitter.start(true, particleTime, null, particleCount);
    });
};
StackExchange.Unikong.Rainbow.prototype = Object.create(Phaser.Sprite.prototype);
StackExchange.Unikong.Rainbow.prototype.constructor = StackExchange.Unikong.Rainbow;
StackExchange.Unikong.Rainbow.prototype.fire = function (player) {
    if (!player.isArmed) return;

    this.frame = player.isFacingLeft ? 0 : 1;
    var x = player.isFacingLeft ? player.x + player.width : player.x + (player.width / 2) - 5;
    var y = player.y;

    this.reset(x, y);
    this.body.velocity.x = player.isFacingLeft ? -this.speed : this.speed;
    this.sound.play();
}
