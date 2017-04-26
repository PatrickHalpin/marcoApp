window.onload = function() 
{
// document.getElementById("sub").onclick = function go()
//     {
//     // localStorage.setItem("distance", document.getElementById("sub").value);
//     // var distance = localStorage.getItem("distance");
//     alert(document.getElementById("sub").innerHTML);
//     }    
// }

document.getElementById("level1").onclick = function go()
    {
    localStorage.setItem("distance", 10);
    var distance = localStorage.getItem("distance");
    } 
document.getElementById("level2").onclick = function go()
    {
    localStorage.setItem("distance", 50);
    var distance = localStorage.getItem("distance");
    }     
document.getElementById("level3").onclick = function go()
    {
    localStorage.setItem("distance", 100);
    var distance = localStorage.getItem("distance");
    }    

document.getElementById("level4").onclick = function go()
    {
    localStorage.setItem("distance", 200);
    var distance = localStorage.getItem("distance");
    }   

document.getElementById("level5").onclick = function go()
    {
    localStorage.setItem("distance", 400);
    var distance = localStorage.getItem("distance");
    }   

document.getElementById("level6").onclick = function go()
    {
    localStorage.setItem("distance", 500);
    var distance = localStorage.getItem("distance");
    }      

}