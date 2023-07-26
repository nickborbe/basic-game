let theGame;


document.getElementById("start").onclick = function(){
    theGame = new Game();
    theGame.player.drawSelf();
}




document.onkeydown = function(e){
    let commands = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if(commands.includes(e.key)){
        e.preventDefault();
        theGame.player.move(e.key);
        theGame.player.drawSelf();
    }
    
}



