let code = [];
let cheatCode1 = "UnlockAllLevels_DEV";
let cheatCode2 = "676767"
let playerMessages = [];
let codeOffTimer = 0;

function keyPressed(){
  if(
    keyCode !== SHIFT && keyCode !== BACKSPACE && keyCode !== ENTER &&
    menu && !levelSelect
  ){
    code.push(key);
  }
  
  if(keyCode === BACKSPACE){
    code.pop();
  }
  
  if(keyCode === ENTER){
    
    let targetCode = code.join("");
    
    if(targetCode === cheatCode1){
      code = [];
      codeOffTimer = 200;
      
      for(let i = 0; i < levelsUnlocked.length; i++){
        levelsUnlocked[i] = true;
      }
      storeItem("levelsUnlocked", levelsUnlocked);
      
    }else if(targetCode === cheatCode2){
      code = [];
      codeOffTimer = 200;
      
      for(let i = 1; i < levelsUnlocked.length; i++){
        levelsUnlocked[i] = false;
      }
      storeItem("levelsUnlocked", levelsUnlocked);
      
    }else{
      codeOffTimer = 100;
      playerMessages.push("No code found; ");
      code = [];
    }
    
  }
  
  if(key === 'p' && !menu){
    if(pause){
      pause = false;
      loop();
    }else{
      pause = true;
      lastFramePaused = true;
    }
    
    
  }
  return false;
}
