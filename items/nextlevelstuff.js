function prepareForNextLevel(){
  
  if(level === 8){
  
    for(let i = 540; i < 2000; i += 10){
        levels[8].push(new Breakaway(i, 420, 10, 10, 0.1));
    }

    for(let o = 570; o < 2000; o += 40){
      levels[8].push(new MovingSpike(o, 600, 30, 400, 600, 1, 1.5));
      levels[8].push(new MovingSpike(o-20, 400, 30, 400, 600, 1, 1.5));
    }


  }
  
}