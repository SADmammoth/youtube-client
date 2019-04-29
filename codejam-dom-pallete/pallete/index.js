let current_tool="none";
let current_color="#c4c4c4c";
let move = null;

function onload_func(){
  document.addEventListener('keydown', shortcuts, false);
}

function shortcuts(){
  switch(event.key){
    case 'b': change_tool('bucket', document.getElementById('bucket-tool'));break;
    case 'p': change_tool('pipette', document.getElementById('pipette-tool'));break;
    case 't': change_tool('transform', document.getElementById('transform-tool')); break;
    case 'm': change_tool('move', document.getElementById('move-tool')); break;
  }
}

function change_tool(name, btn){
  event.stopPropagation();
  
  switch(name){
    case("transform"): foreach_class((i)=>i.style.cursor = "url('./assets/cursors/exchange-alt.svg'), pointer", '.figure');break; 
    case("bucket"): foreach_class((i)=>i.style.cursor = "url('./assets/cursors/fill-drip.svg'), pointer", '.figure');break; 
    case("pipette"): foreach_class((i)=>i.style.cursor = "url('./assets/cursors/eye-dropper.svg') -10 -10, pointer", '.figure', '.color');break; 
    case("move"): document.addEventListener('click', func, false);foreach_class((i)=>i.style.cursor = "url('./assets/cursors/arrows-alt.svg'), pointer", ".figure");break;
    case("swap"): document.addEventListener('click', func, false);foreach_class((i)=>i.style.cursor = "url('./assets/cursors/arrows-alt.svg'), pointer", ".figure");break;
  }
  
  if(name === current_tool){
    foreach_class((i)=>i.style.cursor = 'default', '.figure', ".color");
    btn.classList.remove("active-btn")
    current_tool = 'none';
    return;
  }

  current_tool = name;
  if(document.getElementsByClassName('active-btn').length != 0)
    document.getElementsByClassName('active-btn')[0].classList.remove("active-btn");
    if(name !== 'none')
      btn.classList.add("active-btn");
  let pick = function(fig){
    change_current_color(fig.target.style.backgroundColor);
   document.removeEventListener('click', pick, false);
    change_tool('none');
  }
  if(name === 'pipette'){
        document.addEventListener('click', pick, false);
  }
  else{
    document.removeEventListener('click', pick, false);
  }
}

  function foreach_class(callback, ...args){
    args.forEach((i)=>Array.from(document.querySelectorAll(i)).forEach(callback));
  
  }

  function func(){
    if(move){
      stop_tracking(move);
    }
  }

function on_click_fig(figure){
  event.stopPropagation();
  event.preventDefault();
  switch(current_tool){
    case "transform": figure.classList.toggle('circle');break;
    case "bucket": figure.style.backgroundColor= current_color;break;
    case "move": move_fig(figure); break;
    case "swap": move_fig(figure); break;
  }
}

function change_current_color(color){
  if(color){
    let curr_color_btn = document.getElementById("color_picker");
    let prev_color_btn = document.getElementById("previous-color").querySelector('.color');
    prev_color_btn.style.backgroundColor= current_color;
    curr_color_btn.value = RGBtoHEX(color);
    current_color= color;
  }
}

function move_fig(figure){
  if(move === null){
    move = figure;
    figure.style.zIndex="3";
  }
  else{
    figure.style.zIndex="2";
    if(current_tool === "swap" && figure !== move){
      swap(figure, move); 
      move= null;
      return;
    }
    move= null;
    stop_tracking(figure);
  }
}

function swap(fig1, fig2){
  let buf = {};
  buf.left = fig1.getBoundingClientRect().left;
  buf.top = fig1.getBoundingClientRect().top;
 
  fig1.style.left = parseInt(fig1.style.left)+fig2.getBoundingClientRect().left-fig1.getBoundingClientRect().left+'px';
 
  fig1.style.top = parseInt(fig1.style.top)+fig2.getBoundingClientRect().top-fig1.getBoundingClientRect().top+'px';
  fig2.style.left = parseInt(fig2.style.left)+buf.left- fig2.getBoundingClientRect().left+'px';
  fig2.style.top = parseInt(fig2.style.top)+buf.top- fig2.getBoundingClientRect().top+'px';
}

function track_mouse(fig){ 
  if(current_tool === "move" && move){
  event.stopPropagation();
  event.preventDefault();
  if(Number.isNaN(fig.style.left) || !fig.style.left){
    fig.style.left = 0; fig.style.top = 0;
  }
  fig.style.left= parseInt(fig.style.left) + event.clientX - parseInt(fig.getBoundingClientRect().width)/2 -
  fig.getBoundingClientRect().left + 'px';
  fig.style.top=  parseInt(fig.style.top) + event.clientY - parseInt(fig.getBoundingClientRect().height)/2 - 
  fig.getBoundingClientRect().top + 'px' ;
  }
}

function stop_tracking(fig){
  document.removeEventListener('click', func, false);
  fig.style.left = parseInt(fig.style.left) + event.clientX - parseInt(fig.getBoundingClientRect().width)/2 -
  fig.getBoundingClientRect().left + 'px';
  fig.style.top =  parseInt(fig.style.top) + event.clientY - parseInt(fig.getBoundingClientRect().height)/2 - 
  fig.getBoundingClientRect().top + 'px';
  
}

function RGBtoHEX(str){
  if(str.match(/#[0-9a-fA-F]{6}/)){
    return str;
  }
  let sf = new String(str);
  let rgb = sf.replace(/rgb\(([0-9]*), ([0-9]*), ([0-9]*)\)/, '$1 $2 $3');
  rgb = rgb.split(' ');
  function toHex(x){
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`;
}

