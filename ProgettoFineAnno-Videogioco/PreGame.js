class PreGame extends Phaser.Scene{//la classe eredita da phaser.scene
    constructor(){
        super("PreGame")
    }

    preload(){

        this.load.image("Sfondo","./assets/SfondoCittà.png")
        this.i = 0;

    }

    create(){

        console.clear()
        this.input.on('pointerdown', function (pointer) {
            this.scene.start('Game');
        }, this);
        this.add.image(450,180,"Sfondo").setScale(2)


         //testo multicolore
         this.hsv = Phaser.Display.Color.HSVColorWheel();
         this.text1 = this.add.text(20, 150, 'Elefante palloncino', { font: "80px Arial Black", fill: "#fff" });
         this.text1.setStroke('#00f', 16);
         this.text1.setShadow(2, 2, "#333333", 2, true, true);

         this.subtext1 = this.add.text(200, 320, 'Clicca sullo schermo per iniziare a Giocare', { font: "20px Arial Black", fill: "#fff" });
         this.subtext1.setShadow(2,2,"#000",2,true,true)
         this.subtext1.setBackgroundColor("pink")
    }

    update(time, delta){
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
export default PreGame