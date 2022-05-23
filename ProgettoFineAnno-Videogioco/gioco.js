import GameOver from "./GameOver.js";
import Game from "./Game.js";
import PreGame from "./PreGame.js"



    let config = {
       type: Phaser.AUTO,
       backgroundColor: 0x000000,
       width: 900,
       height: 670,
       parent:"container",

       pixelArt:true,
      
       physics: {//caratteristiche FISICHE dello sprite
       default: 'arcade',
       arcade:{gravity:{y:600},debug:false},//gravità veriticale, attivo il debug(hitbox e traiettoria)
       
       },
       
    

       scene: [PreGame,Game,GameOver]//creo una nuova scena
    };
   
    let game = new Phaser.Game(config);//istanzio phaser game e configurazione
    

  


