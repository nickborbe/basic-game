class Player{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.char = document.createElement("img");
        this.char.src = "./img/star.png";
        this.char.style.width = "30px"
    }
   
       
    move(direction){
        if(direction === "ArrowRight" && this.x < 9) this.x++;
        if(direction === "ArrowLeft" && this.x > 0) this.x--;
        if(direction === "ArrowUp" && this.y < 9) this.y++;
        if(direction === "ArrowDown" && this.y > 0) this.y--;
    }

     drawSelf(){
        let theRow = document.querySelector(`.row-${this.y+1}`);
        let theBox = theRow.querySelector(`.box-${this.x+1}`);
        theBox.append(this.char);
    }
        
    
}


class Character extends Player {
    constructor(){
        super();
        this.active = true;
        this.y = 9;
        this.x = Math.floor(Math.random() * 9);
        this.char = document.createElement("img");
        this.char.src = "./img/smile.png";
        this.char.style.width = "30px"
    }

    moveDownForever(){
       let id = setInterval(()=>{
            if(this.y === 0){
                clearInterval(id);
                this.active = false;
                this.char.remove();
            } else {
                this.move("ArrowDown");
                this.drawSelf();
            }
        },500)
    }

    drawSelf(){
        if(this.active === false) return;
        super.drawSelf();
    }
}



class Game{
    constructor(){
        this.score = 0;
        this.player = new Player();
        this.characters = [];


        let rando = Math.floor(Math.random()*4000) + 1000;
        console.log(rando)
        setInterval(()=>{
            this.generateCharacter();
            rando = Math.floor(Math.random()*4000) + 1000;
        },rando)

        this.mainLoop();
     
    }

    generateCharacter(){
        let newChar = new Character();
        this.characters.push(newChar);
        newChar.drawSelf();
        newChar.moveDownForever();
    }

    checkForCollisions(){
        for(let i=0; i < this.characters.length; i++){
            if(this.characters[i].x === this.player.x && this.characters[i].y === this.player.y){
                this.score++;
                this.characters[i].active = false;
                this.characters[i].char.remove();
                this.characters.splice(i, 1);
                document.getElementById("score-span").innerText = this.score;
            }
        }
    }

    mainLoop(){
        setInterval(()=>{


            this.checkForCollisions();


        },100)
    }
}

