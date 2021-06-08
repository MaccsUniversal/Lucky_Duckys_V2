var undoBet = document.getElementById("undoBet");
var withdrawAll = document.getElementById("withdrawAll");
var withdrawBalance = document.getElementById("withdrawBalance");

undoBet.onmouseover = function(){undoBetMouseOver()};
undoBet.onmouseout = function(){undoBetMouseOut()};
withdrawAll.onmouseover = function(){withdrawAllMouseOver()};
withdrawAll.onmouseout = function(){withdrawAllMouseOut()};
withdrawBalance.onmouseover = function(){withdrawBalanceMouseOver()};
withdrawBalance.onmouseout = function(){withdrawBalanceMouseOut()};

function undoBetMouseOver(){
    if(isLight == false){
        undoBet.style.color = 'black';
        undoBet.style.borderColor = '#D44CF0';
        undoBet.style.backgroundColor = 'white';
    } else {
        undoBet.style.color = 'white';
        undoBet.style.borderColor = '#D44CF0';
        undoBet.style.backgroundColor = 'black';
    }
}

function undoBetMouseOut(){
    if(isLight == false){
        undoBet.style.color = 'white';
        undoBet.style.borderColor = 'white';
        undoBet.style.backgroundColor = 'black';
    } else {
        undoBet.style.color = 'black';
        undoBet.style.borderColor = 'black';
        undoBet.style.backgroundColor = 'white';
    }
}

function withdrawAllMouseOver(){
    if(isLight == false){
        withdrawAll.style.color = 'black';
        withdrawAll.style.borderColor = '#D44CF0';
        withdrawAll.style.backgroundColor = 'white';
    } else {
        withdrawAll.style.color = 'white';
        withdrawAll.style.borderColor = '#D44CF0';
        withdrawAll.style.backgroundColor = 'black';
    }
}

function withdrawAllMouseOut(){
    if(isLight == false){
        withdrawAll.style.color = 'white';
        withdrawAll.style.borderColor = 'white';
        withdrawAll.style.backgroundColor = 'black';
    } else {
        withdrawAll.style.color = 'black';
        withdrawAll.style.borderColor = 'black';
        withdrawAll.style.backgroundColor = 'white';
    }
}

function withdrawBalanceMouseOver(){
    if(isLight == false){
        withdrawBalance.style.color = 'black';
        withdrawBalance.style.borderColor = '#D44CF0';
        withdrawBalance.style.backgroundColor = 'white';
    } else {
        withdrawBalance.style.color = 'white';
        withdrawBalance.style.borderColor = '#D44CF0';
        withdrawBalance.style.backgroundColor = 'black';
    }
}

function withdrawBalanceMouseOut(){
    if(isLight == false){
        withdrawBalance.style.color = 'white';
        withdrawBalance.style.borderColor = 'white';
        withdrawBalance.style.backgroundColor = 'black';
    } else {
        withdrawBalance.style.color = 'black';
        withdrawBalance.style.borderColor = 'black';
        withdrawBalance.style.backgroundColor = 'white';
    }
}

var open = false;
document.getElementById("slidingMenuCaret").onclick = function menuSlide(){
    if(open){
        document.getElementById("slidingMenuCaret").innerText = "▼"
        document.getElementById("undoBet").style.marginTop = -57;
        document.getElementById("undoBet").style.opacity = 0;
        document.getElementById("withdrawBalance").style.marginTop = -57;
        document.getElementById("withdrawBalance").style.opacity = 0;
        document.getElementById("withdrawAll").style.marginTop = -57;
        document.getElementById("withdrawAll").style.opacity = 0;
        document.getElementById("slidingMenu").style.visibility = 'hidden';
        open = false;
    } else if(!open){
        document.getElementById("slidingMenuCaret").innerText = "▲"
        document.getElementById("slidingMenu").style.visibility = 'visible';
        document.getElementById("undoBet").style.marginTop = 0;
        document.getElementById("undoBet").style.opacity = 1;
        document.getElementById("withdrawBalance").style.marginTop = 0;
        document.getElementById("withdrawBalance").style.opacity = 1;
        document.getElementById("withdrawAll").style.marginTop = 0;
        document.getElementById("withdrawAll").style.opacity = 1;
        open = true;
    }
}

