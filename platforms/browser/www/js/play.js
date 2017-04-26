
document.addEventListener("deviceready", onDeviceReady, false);
var mySound;
var timeCom;
var score;
var watchID = null;
var watchID2= null;
var myHeading;
var called=false;
var goalLat;
var goalLon;
var amps=1;
var speed=1;
var fin=false;
var started=false;
var begin=false;
var go=false;
var distance;
var angle = Math.floor(Math.random() * (359 - 1) + 1);
var altAngle=angle+180;
var dist;
var secs=1000;

if(altAngle>360)
{
    altAngle=altAngle-360;
}
document.addEventListener("DOMContentLoaded", function(event)
 {
    distance = localStorage.getItem("distance");
    distance=distance/1000;
    go=true;
    mySound =new Audio('beats/beat10.wav');
    timed();
    function timed()
    {
        setTimeout(function()
        {
            if(begin==true)
            {
                playSound(amps,speed); 
            }
            timed();

        }, secs);
    }

});
 
function onDeviceReady() 
{
if(go==true)
    {   
        startWatch();
        startLoc();
    }
}

function playSound(amps,speed)
{
    // mySound.playbackRate=speed;
    mySound.play(); 
}

function startLoc()
{
        var options = { frequency: 1000, timeout:16000, enableHighAccuracy: true};
        watchID2=navigator.geolocation.watchPosition(onSuccess, onError2,options);
}

function onSuccess(position) 
{
        var acc = position.coords.accuracy;
        var myLat =position.coords.latitude;
        var myLon =position.coords.longitude;
        if(called==false)
        {
            goalLat=calculateLat(myLat,myLon,angle,distance);
            goalLon=calculateLon(myLat,myLon,goalLat,angle,distance);
            called=true;
        }

        //distance left to target goal
        dist=distanceBetweenCoordinates(myLat,myLon,goalLat,goalLon);

        // if(dist>100)
        // {
        //     amps=0.1;
        // }
        // else if(dist<100)
        // {
        //     var df=100-dist;
        //     amps = df/100;
        //     amps=amps.toFixed(2);
        // }

        var goal=distance*1000;
        var distanceCompleted=goal-distance;
        var dc=distance*1000;

        // if(dist>dc)
        // {
        //     dist=dc-1;
        // }

        var perecentComplete=dist/dc;
        var perecentCompleteWhole=perecentComplete*100;
        var perecentCompleteReal=100-perecentCompleteWhole;
        var perecentShown=perecentCompleteReal;

        if(perecentCompleteReal<=10)
        {
            secs=1000;
        }
        if(perecentCompleteReal>10&&perecentCompleteReal<=20)
        {
            secs=900;
        }
        if(perecentCompleteReal>20&&perecentCompleteReal<=30)
        {
            secs=800;
        }
        if(perecentCompleteReal>30&&perecentCompleteReal<=40)
        {
            secs=700;
        }
        if(perecentCompleteReal>40&&perecentCompleteReal<=50)
        {
            secs=600;
        }
        if(perecentCompleteReal>50&&perecentCompleteReal<=60)
        {
            secs=500;
        }
        if(perecentCompleteReal>60&&perecentCompleteReal<=70)
        {
            secs=400;
        }
        if(perecentCompleteReal>70&&perecentCompleteReal<=80)
        {
            secs=300;
        }
        if(perecentCompleteReal>80&&perecentCompleteReal<=90)
        {
            secs=200;
        }
        if(perecentCompleteReal>90&&perecentCompleteReal<=100)
        {
            secs=100;
        }

        //End game scenario
        if(perecentCompleteReal>=95)
        {
            fin=true;
            begin=false;
        }

        // var d=document.getElementById("dist");
        // d.innerHTML = perecentCompleteReal+" "+dist;

}

//Start watching the compass and gets the angle
function startWatch() 
{
    var options = { frequency: 100 };
    watchIDC = navigator.compass.watchHeading(compassSuccess, onError, options);
}

//stops watching the compnas
function stopWatch() 
{
    if (watchIDC) 
    {
        navigator.compass.clearWatch(watchID);
        watchIDC = null;
    }
}

//Obtains the angle the user is looking 
function compassSuccess(heading)
{
    if(begin==true)
    {
        
        myHeading=parseInt(heading.magneticHeading);

        var dAngle=360-angle;

        var headDiff;
        headDiff=myHeading+dAngle;

        if(headDiff>359)
        {
            headDiff=360-headDiff;
            if(headDiff<0)
            {
                headDiff=headDiff*-1;
            }
        }

        if(headDiff<=3)
        {
            mySound = new Audio('beats/beat10.wav');
            // secs=200;
        }

        if(headDiff>=357)
        {
            mySound = new Audio('beats/beat10.wav');
            // secs=200;
        }
        if(headDiff<18&&headDiff>3)
        {
            mySound = new Audio('beats/beat9.wav');
            // secs=300;
        }
        if(headDiff>341&&headDiff<357)
        {
            mySound = new Audio('beats/beat9.wav');
            // secs=300;
        }
        if(headDiff>306&&headDiff<=341)
        {
            mySound = new Audio('beats/beat8.wav');
            // secs=400;
        }
        if(headDiff>270&&headDiff<=306)
        {
            // secs=500;
            mySound = new Audio('beats/beat7.wav');
        }
        if(headDiff>234&&headDiff<=270)
        {
            // secs=600;
            mySound = new Audio('beats/beat6.wav');
        }
        if(headDiff>198&&headDiff<=234)
        {
            // secs=700;
            mySound = new Audio('beats/beat5.wav');
        }
         if(headDiff>162&&headDiff<=198)
        {
            // secs=800;
            mySound = new Audio('beats/beat4.wav');
        }
        if(headDiff>126&&headDiff<=162)
        {
            // secs=700;
            mySound = new Audio('beats/beat5.wav');
        }
         if(headDiff>90&&headDiff<=126)
        {
            // secs=600;
            mySound = new Audio('beats/beat6.wav');
        }
        if(headDiff>54&&headDiff<=90)
        {
            // secs=500;
            mySound = new Audio('beats/beat7.wav');
        }
        if(headDiff>18&&headDiff<=54)
        {
            // secs=400;
            mySound = new Audio('beats/beat8.wav');
        }

        // if(myHeading==angle)
        // {
        //     fin=true;
        //     begin=false;
        // }
    }
    if(fin==true)
    {
        window.location.href = 'score.html';  
    }
}

function onError(compassError) 
{
    console.log(compassError.code);
}

//error handlers for distance
//switches accuracy mode to low if device is unable to obtain high accuracy position
function onError2(error) 
{
    console.log( error.code + error.message );
    if (error.code == error.TIMEOUT)
    {  
        // alert(error.message);
         // navigator.geolocation.watchPosition(
         //       onSuccess, 
         //       onErrorLowAccuracy,
         //       {maximumAge:600000, timeout:10000, enableHighAccuracy: false});
         //       return;
    }
}
    function onErrorLowAccuracy(error)
    {
        console.log( error.code + error.message );
    }


//Obtains the distance between the the users current location and the goal location    
function distanceBetweenCoordinates(lat1,lon1,lat2,lon2)
{
 
    var R=6378;
 
    var dLat= (lat2-lat1) * Math.PI/180;
    var dLon = (lon2-lon1) * Math.PI/180;
 
    var lat1inRadians= lat1 * Math.PI/180;
    var lat2inRadians= lat2 * Math.PI/180;
 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1inRadians) * Math.cos(lat2inRadians);
    var c= 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d= R * c;
    
    d=d*1000;
    // d=Math.round(d);
    return d;
}

//calulates goal latitude
function calculateLat(lat1,lon1,head,dis)
{
    var d=dis;
    var R=6378;
    var brng=head*Math.PI/180;
    
    var lat1=lat1*Math.PI/180;
    var lon1=lon1*Math.PI/180;
    
    var lat2=Math.asin( Math.sin(lat1)*Math.cos(d/R) + Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng) );
    lat2=lat2*180/Math.PI;
    
    return lat2;    

}

//calculates goal longitude
function calculateLon(lat1,lon1,lat2,head,dis)
{
    var d=dis;
    var R=6378;
    var brng=head*Math.PI/180;
    var lat2=lat2;
    var lat1=lat1*Math.PI/180;
    var lon1=lon1*Math.PI/180;
    
    var lon2= lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1),Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));
    lon2=lon2*180/Math.PI;
    
    return lon2;

}    
//draws and animates sine wav on screen
function animate()
{
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var cw = c.width = 400;
var ch = c.height = 250;
var cx = cw / 2,
    cy = ch / 2;
var rad = Math.PI / 180;
var w = 400;
var h = 200;
var amplitude = h;
var frequency = .01;
var phi = 0;
var frames = 0;
var stopped = true;
ctx.lineWidth = 5;

    function Draw() 
    {
        var dc=distance*1000;
            if(dist>dc)
            {
                dist=dc-1;
            }
            var per=dist/dc;
            pc=per*50;
            pc+=10;
      frames++
      phi = frames / pc;

      ctx.clearRect(0, 0, cw, ch);
      ctx.beginPath();
      ctx.strokeStyle = "#50c7a0";
      for (var x = 0; x < w; x++)
       {
        y = Math.sin(x * frequency + phi) * amplitude / 2 + amplitude / 2;
        ctx.lineTo(x, y + 40);
       }
      ctx.stroke();
      requestId = window.requestAnimationFrame(Draw);
    }
requestId = window.requestAnimationFrame(Draw);   

}

window.onload = function()
{ 
    var h1 = document.getElementById('timer'),
    start = document.getElementById('start'),
    mili=0,seconds = 0, minutes = 0, hours = 0,
    t;
    var secsE=0;
    var total=localStorage.getItem("distance")*2;

    //updates timer every second
    function add() 
    {
        secsE++;
        seconds++;
        if (seconds >= 60)
         {
            seconds = 0;
            minutes++;
            if (minutes >= 60) 
            {
                minutes = 0;
                hours++;
            }
        }

        h1.innerHTML =(minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        var timeCom=(minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        //calculates the users score for this run
        var points = total * 100/secsE;
        points=points.toFixed(0);
        //saves the calculated score and the time completed for the user
        localStorage.setItem("points", points);
        localStorage.setItem("timeC", timeCom);

        if(begin==true)
        {
            timer();
        }
    }
    function timer() 
    {
        t = setTimeout(add, 1000);
    }

    function stopTime() 
    {
        begin=false;
    }

    start.onclick = function()
    {
        mySound =new Audio('beats/beat5.wav');
        mySound.play();
        begin=true;
        timer();
        animate();
        var element=document.getElementById("btnCon");
        var child=document.getElementById("start");
        element.removeChild(start);
    }



}



