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
    alert('s');
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
    case "transform": figure.classList.add("circle");break;
    case "bucket": figure.style = `background-color: ${current_color}`;break;
  }
}

function change_current_color(color){
  if(color){
  let curr_color_btn = document.getElementById("current-color");
  let prev_color_btn = document.getElementById("previous-color");
  prev_color_btn.style.backgroundColor= current_color;
  curr_color_btn.style.backgroundColor= color;
  current_color= color;
  }
}