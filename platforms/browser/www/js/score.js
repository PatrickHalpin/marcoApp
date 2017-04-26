document.addEventListener("DOMContentLoaded", function(event)
 {
    var timeCompleted = localStorage.getItem("timeC");
    var time=document.getElementById('time');
    time.innerHTML=timeCompleted;

    var points = localStorage.getItem("points");
    var score=document.getElementById('score');
    score.innerHTML=points;
});