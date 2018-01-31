'use strict';

var per1;
var per2;
var finText;
var finText2;
var Texto = function(game, texto, tipo){
    Phaser.Sprite.call(this, game, 0,0,'');

}
Texto.prototype = Object.create(Phaser.Sprite.prototype);
Texto.constructor = Texto;
Texto.prototype.update = function()
{

}

var Personaje = function(game, posX, posY, tipo){
        Phaser.Sprite.call(this,game,posX,posY,'dude');
        //this.game = game;
        this.facing = 'left';
        this.jumpTimer = 0;
        this.choque = false;
        this.tiempoChoque = 10;
        this.auxTiempo = 0;
        this.vidas = tipo*5;

        game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.bounce.y = 0.2;
        this.body.bounce.x = 1;
        this.body.collideWorldBounds = true;
        this.body.setSize(20,32,5,16);
        this.tipo = tipo;
        if(tipo == 1)
            this.fin = game.add.text(100, 50, texto);
        else
            this.fin = game.add.text(game.width-100, 50, texto);
        this.fin.font = 'Arial Black';
        this.fin.fontSize = 30;
        this.fin.strokeThickness = 7;
        this.fin.stroke = '#ffffff';
        this.fin.anchor.set(.5);

        if(tipo===1)
        this.movement = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.I),
            left: game.input.keyboard.addKey(Phaser.Keyboard.J),
            right: game.input.keyboard.addKey(Phaser.Keyboard.L),
        }
        else this.movement = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        }
        //this.cursors = 
    }
    Personaje.prototype = Object.create(Phaser.Sprite.prototype);
    Personaje.constructor = Personaje;
    Personaje.prototype.update = function(){
        if(this.tipo === 1)
        this.fin.text = "Player1:" +per1.vidas;
    else this.fin.text = "Player2: "+per2.vidas;
        if(this.auxTiempo < this.tiempoChoque) this.auxTiempo++;
        else this.choque = false;
        if(this.auxTiempo >= this.tiempoChoque)
        {
            this.body.velocity.x = 0;
        if(this.tipo===1){
            var choque = this.game.physics.arcade.collide(this, per2);
            if(choque)
            {
                this.body.velocity.x = -250;
                per2.body.velocity.x = 250;
            }

        }
        else {
            var coll1 =this.game.physics.arcade.collide(this,per1);
            if(coll1)
            {
                this.vidas--;
                per1.vidas--;
                this.choque = true;
                this.auxTiempo = 0;
                per2.auxTiempo = 0;
                per2.choque = true;
                this.body.velocity.x = -250;
                per2.body.velocity.x = 250;
            }
        }

        if(!this.choque)
        {
        //this.body.velocity.x = 0;
        if(this.movement.left.isDown){
            this.body.velocity.x = -150;
        }
        else if(this.movement.right.isDown){
            this.body.velocity.x = 150;
        }
        if(this.movement.up.isDown && this.body.onFloor()){
            this.body.velocity.y = -250;
        }
    }
    }
    }


var PlayScene = {

    preload: function () {
        this.game.load.spritesheet('dude', 'images/dude.png', 32, 48);
    },

    create: function () {


        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.time.desiredFps = 30;

        this.game.physics.arcade.gravity.y = 250;

        /*this.player = this.game.add.sprite(32, 32, 'dude');
        this.player2 = this.game.add.sprite(32,32,'dude');*/

        //this.per1 = new Personaje(this.game, 50,0,1);

        per1= this.game.world.addChild(new Personaje(this.game, 502, 0, 1));
        per2 = this.game.world.addChild(new Personaje(this.game, 0, 0, 2));
        //finText = this.game.world.addChild(new Texto(this.game, "Player1:"+per1.vidas, 1));
        //finText2 = this.game.world.addChild(new Texto(this.game, "pogdj", 2));
        console.log("player1:"+this.per1);
        

        /*this.player.facing = 'left';
        this.player.jumpTimer = 0;
        this.player2.jumpTimer = 0;*/

        /*this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.player2,Phaser.Physics.ARCADE);*/

        /*this.player.body.bounce.y = 0.2;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(20, 32, 5, 16);
        this.player2.body.collideWorldBounds = true;
        this.player2.body.bounce.y = 0.2;
        this.player2.body.setSize(20,32,5,16);*/
        //this.player.body.bounce.x = 1;

        /*this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('turn', [4], 20, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);*/

        /*this.player.cursors = this.game.input.keyboard.createCursorKeys();
        this.player.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.player2.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.player.cursors = this.game.input.keyboard.createCursorKeys(A,S);*/

        

    },

    update: function () {
        //finText.text = "P1: "+per1.vidas;
        /*if(this.player.body.onFloor())
            this.player.body.velocity.x = 0;

        if (this.player.cursors.left.isDown && this.player.body.onFloor())
        {
            this.player.body.velocity.x = -150;

            if (this.player.facing != 'left')
            {
                this.player.animations.play('left');
                this.player.facing = 'left';
            }
        }
        else if (this.player.cursors.right.isDown && this.player.body.onFloor())
        {
            this.player.body.velocity.x = 150;

            if (this.player.facing != 'right')
            {
                this.player.animations.play('right');
                this.player.facing = 'right';
            }
        }
        else
        {
            if (this.player.facing != 'idle')
            {
                this.player.animations.stop();

                if (this.player.facing == 'left')
                {
                    this.player.frame = 0;
                }
                else
                {
                    this.player.frame = 5;
                }

                this.player.facing = 'idle';
            }
        }

        if (this.player.jumpButton.isDown && this.player.body.onFloor() && this.game.time.now > this.player.jumpTimer)
        {
            this.player.body.velocity.y = -250;
            this.player.jump = this.game.time.now + 750;
        }
        if(this.player2.jumpButton.isDown && this.player2.body.onFloor() && this.game.time.now > this.player2.jumpTimer){
            this.player2.body.velocity.y = -250;
            this.player2.jump = this.game.time.now +750;
        }*/

    },

};

module.exports = PlayScene;
