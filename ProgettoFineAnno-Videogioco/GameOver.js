class GameOver extends Phaser.Scene{//la classe eredita da phaser.scene
    constructor(){
        super("GameOver")
    }

    preload(){
        this.i = 0;
        
    }
    
    create(){
        this.input.on('pointerdown', function (pointer) {
            this.scene.start('PreGame');
        }, this);


         //testo multicolore
         this.hsv = Phaser.Display.Color.HSVColorWheel();
         this.text1 = this.add.text(150, 150, 'Game Over', { font: "95px Arial Black", fill: "#fff" });
         this.text1.setStroke('#00f', 16);
         this.text1.setShadow(2, 2, "#333333", 2, true, true);

         this.subtext1 = this.add.text(200, 320, 'Clicca sullo schermo per giocare di nuovo', { font: "20px Arial Black", fill: "#fff" });

    }

    update(time,delta){
         //cambia colore testo multicolore
         const top = this.hsv[this.i].color;
         const bottom = this.hsv[359 - this.i].color;
         this.text1.setTint(top, top, bottom, bottom);
         this.i++;
         if (this.i === 360){
             this.i = 0;
         }
    }
}
export default GameOver