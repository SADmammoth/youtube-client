let current_tool="none";
let current_color="#c4c4c4c";


function change_tool(name, btn){
  event.stopPropagation();
  if(name === current_tool){
    btn.classList.remove("active-btn")
    current_tool = 'none';
    return;
  }
  current_tool = name;
  if(document.getElementsByClassName('active-btn').length != 0)
    document.getElementsByClassName('active-btn')[0].classList.remove("active-btn");
    if(name !== 'name')
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

function on_click_fig(figure){
  switch(current_tool){
    case "transform": figure.classList.toggle('circle');break;
    case "bucket": figure.style = `background-color: ${current_color}`;break;
  }
}

function on_drag(figure){
  switch(current_tool){
    case "move": track_mouse(figure); break;
  }
}

function on_dragend(figure){
  switch(current_tool){
    case "move":stop_tracking(figure); break;
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

function track_mouse(fig){ 
  if(Number.isNaN(fig.style.left) || !fig.style.left){
    fig.style.left = 0; fig.style.top = 0;
  }
  fig.style.left= parseInt(fig.style.left) + event.clientX - parseInt(fig.getBoundingClientRect().width)/2 -
  fig.getBoundingClientRect().left + 'px';
  fig.style.top=  parseInt(fig.style.top) + event.clientY - parseInt(fig.getBoundingClientRect().height)/2 - 
  fig.getBoundingClientRect().top + 'px' ;
}

function stop_tracking(fig){
  fig.style.left = parseInt(fig.style.left) + event.clientX - parseInt(fig.getBoundingClientRect().width)/2 -
  fig.getBoundingClientRect().left + 'px';
  fig.style.top =  parseInt(fig.style.top) + event.clientY - parseInt(fig.getBoundingClientRect().height)/2 - 
  fig.getBoundingClientRect().top + 'px';
}

function RGBtoHEX(str){
  if(str.match(/#[0-9a-fA-F]{6}/)[0] === str){
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

