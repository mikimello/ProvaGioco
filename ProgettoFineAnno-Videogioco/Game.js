class Game extends Phaser.Scene{//la classe eredita da phaser.scene
    constructor(){
        super("Game")
    }



    preload(){
        this.TimerGioco=0
        this.IndexGeneraSpine=0
        this.xSpinaRandom=0
        this.ySpinaRandom=0
        this.IndexDifficolta=0
        this.Punteggio=0
        this.IndexRandomX=880
        this.Livello=1
        
        
        this.load.image("Sfondo","./assets/SfondoCittà.png")
        this.load.image("Spikes","./assets/Spikes.png")
        this.load.image("SpikeSingola","./assets/SpikeSingola.png")
        this.load.image("omino","./assets/ElefantePalloncino.png")

    }

    create(){
        this.add.image(450,180,"Sfondo").setScale(2)

        this.text1 = this.add.text(10, 8, 'Punteggio: ');
        this.text1.setFontSize(30)
        this.text1.setShadow(2,2,"#000",2,true,true)
        this.text1.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        this.text2 = this.add.text(210, 8,this.Livello);

        this.lvl = this.add.text(800, 8, 'LVL: ');
        this.lvl.setFontSize(30)
        this.lvl.setShadow(2,2,"#000",2,true,true)
        this.lvl.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        this.lvl = this.add.text(170, 8,this.TimerGioco);


        
        setInterval(() => {
              
            this.text2.destroy()
            this.text2 = this.add.text(210, 8,this.Punteggio);
            this.text2.setFontSize(30)
            this.text2.setShadow(2,2,"#000",2,true,true)
            this.text2.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        }, 1000);

        setInterval(() => {
              
            this.lvl.destroy()
            this.lvl = this.add.text(870, 8,this.Livello);
            this.lvl.setFontSize(30)
            this.lvl.setShadow(2,2,"#000",2,true,true)
            this.lvl.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        }, 1000);
        
        

        this.mioOmino=this.physics.add.sprite(450,100,"omino"); //salvo lo sprite in una variabile
        this.mioOmino.setScale(0.15)
        this.mioOmino.setSize(200,430)
        this.mioOmino.setCollideWorldBounds(true)//collisione con i bordi estremi
        this.mioOmino.setBounce(0)//rimbalza quando cade
        this.mioOmino.setDragX(1000)//attrito asse x
        

        this.Terreno=this.physics.add.staticGroup({//creo gruppo statico
            
            key: "Spikes",
            repeat: 7,              //prende l'immagine e la copia 7 volte
            setXY:{                 //dove posizionare le immagini
                x:50,
                y:635,
                stepX:122,          //distanza tra le immagini   
            }
            
        })
        
        this.physics.add.collider(this.mioOmino, this.Terreno, (primo, secondo)=>{
            this.GameOver()
        })
        
        this.physics.add.collider(this.mioOmino, this.SpinaCadente, (primo, secondo)=>{
            this.GameOver()
        })
        

        this.ScrittaLVL2 = this.add.text(-600, 180, 'LIVELLO 2', { font: "95px Arial Black", fill: "#fff" });
        this.ScrittaLVL2.setStroke('#00f', 16);
        this.ScrittaLVL2.setShadow(2, 2, "#333333", 2, true, true);

        this.ScrittaLVL3 = this.add.text(-600, 180, 'LIVELLO 3', { font: "95px Arial Black", fill: "#fff" });
        this.ScrittaLVL3.setStroke('#00f', 16);
        this.ScrittaLVL3.setShadow(2, 2, "#333333", 2, true, true);

        this.mioTasto=this.input.keyboard.createCursorKeys()//recupera il tasto premuto(frecce, spazio, shift)
    }

    update(time,delta){
        this.TimerGioco++

        if(this.mioTasto.shift.isDown){// attivare i cheat
            this.IndexRandomX=780
        }else{
            this.IndexRandomX=880
        }
        
        

        
        
        
        if(this.TimerGioco%100==0){
            this.Punteggio++
        }
        
        
        if(this.TimerGioco%50==0){
            this.GeneraSpina()
        }
        
        if(this.Punteggio==15){
            this.MuoviScritta2()
            this.Livello=2
            console.log("---------------LVL 2-----------")
            this.IndexDifficolta=1
        }

        if(this.Punteggio==30){
            this.MuoviScritta3()
            this.Livello=3
            console.log("---------------LVL 3-----------")
            this.IndexDifficolta=2
        }

        if(this.mioTasto.right.isDown){//controllo cichiclamente se freccia destra è premuto
            this.mioOmino.setVelocityX(400)
            this.mioOmino.setFlipX(true)
            this.mioOmino.setAngle(30)
            
        }else{
            this.mioOmino.setAngle(0)
        }
        
        if(this.mioTasto.left.isDown){
            this.mioOmino.setVelocityX(-400)
            this.mioOmino.setFlipX(false)
            this.mioOmino.setAngle(-30)

        }
        
        if(Phaser.Input.Keyboard.JustDown(this.mioTasto.up)){
            this.mioOmino.setVelocityY(-300)
        }



        this.xSpinaRandom=Math.floor(Math.random() * this.IndexRandomX)
        this.xSpinaRandom2=Math.floor(Math.random() * this.IndexRandomX)
        this.xSpinaRandom3=Math.floor(Math.random() * this.IndexRandomX)
        this.xSpinaRandom4=Math.floor(Math.random() * this.IndexRandomX)
        this.xSpinaRandom5=Math.floor(Math.random() * this.IndexRandomX)
        this.xSpinaRandom6=Math.floor(Math.random() * this.IndexRandomX)

        this.ySpinaRandom=Math.floor(Math.random() * -270)
        this.ySpinaRandom2=Math.floor(Math.random() * -270)
        this.ySpinaRandom3=Math.floor(Math.random() * -270)
        this.ySpinaRandom4=Math.floor(Math.random() * -270)
        this.ySpinaRandom5=Math.floor(Math.random() * -270)
        this.ySpinaRandom6=Math.floor(Math.random() * -270)
        
        
    }

    MuoviScritta2(){
        setInterval(() => { 
                if(this.ScrittaLVL2.x<1000)
                this.ScrittaLVL2.x+=5
        }, 250);
    }

    MuoviScritta3(){
        setInterval(() => { 
                if(this.ScrittaLVL3.x<1000)
                this.ScrittaLVL3.x+=5
        }, 250);
    }
    
    GameOver(){
        this.Genera=false
        this.mioOmino.setBounce(1)
        console.log("================!!!Game Over!!!===============")
        this.scene.start('GameOver');
        this.mioOmino.setBounce(0)
    }

    GeneraSpina(){
        this.IndexGeneraSpine++
        console.log("spina "+this.IndexGeneraSpine)
        if(this.IndexDifficolta==0){
            this.SpinaCadente=this.physics.add.sprite(this.xSpinaRandom, this.ySpinaRandom,"SpikeSingola")
            this.SpinaCadente2=this.physics.add.sprite(this.xSpinaRandom2, this.ySpinaRandom2,"SpikeSingola")
            this.physics.add.collider(this.mioOmino, [this.SpinaCadente, this.SpinaCadente2], (primo, secondo)=>{
                this.GameOver()
            })
            

        }else if(this.IndexDifficolta==1){
            this.SpinaCadente=this.physics.add.sprite(this.xSpinaRandom, this.ySpinaRandom,"SpikeSingola")
            this.SpinaCadente2=this.physics.add.sprite(this.xSpinaRandom2, this.ySpinaRandom2,"SpikeSingola")
            this.SpinaCadente3=this.physics.add.sprite(this.xSpinaRandom3, this.ySpinaRandom3,"SpikeSingola")
            this.SpinaCadente4=this.physics.add.sprite(this.xSpinaRandom4, this.ySpinaRandom4,"SpikeSingola")
            this.physics.add.collider(this.mioOmino, [this.SpinaCadente,this.SpinaCadente2,this.SpinaCadente3,this.SpinaCadente4], (primo, secondo)=>{
                this.GameOver()
            })


        }else{
            this.SpinaCadente=this.physics.add.sprite(this.xSpinaRandom, this.ySpinaRandom,"SpikeSingola")
            this.SpinaCadente2=this.physics.add.sprite(this.xSpinaRandom2, this.ySpinaRandom2,"SpikeSingola")
            this.SpinaCadente3=this.physics.add.sprite(this.xSpinaRandom3, this.ySpinaRandom3,"SpikeSingola")
            this.SpinaCadente4=this.physics.add.sprite(this.xSpinaRandom4, this.ySpinaRandom4,"SpikeSingola")
            this.SpinaCadente5=this.physics.add.sprite(this.xSpinaRandom5, this.ySpinaRandom5,"SpikeSingola")
            this.SpinaCadente6=this.physics.add.sprite(this.xSpinaRandom6, this.ySpinaRandom6,"SpikeSingola")
            this.physics.add.collider(this.mioOmino, [this.SpinaCadente,this.SpinaCadente2,this.SpinaCadente3,this.SpinaCadente4,this.SpinaCadente5,this.SpinaCadente6], (primo, secondo)=>{
                this.GameOver()
            })
        }
        

    }
}
export default Game