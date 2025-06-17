import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    collectStar(player, star) {
        this.playerSpeed = 680;
        star.disableBody(true, true);
    }

    create() {
        this.add.image(512, 384, 'sky');

        const platforms = this.physics.add.staticGroup();

        platforms.create(400, 788, 'ground').setScale(7).refreshBody();
        platforms.create(790, 500, 'ground');
        platforms.create(950, 500, 'ground');
        platforms.create(50, 350, 'ground');
        platforms.create(850, 240, 'ground');

        this.playerSpeed = 160;
        this.star = this.physics.add.sprite(512, 584, 'star');
        this.star.setBounce(0);
        this.star.setCollideWorldBounds(true);
        this.physics.add.collider(this.star, platforms);
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, platforms);
        this.physics.add.overlap(this.player, this.star, this.collectStar, null, this);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
    update() {
        if (!this.player || !this.cursors) return;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
