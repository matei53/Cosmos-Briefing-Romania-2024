window.onload = function(){
    let url = "http://localhost:8000/subtitles.json";
    let subt = document.getElementById('subtitlu');

    function animation1(){
        subt.animate([
            {opacity:'0'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity:'0'}
        ],
        {duration: 10000})
    }

    fetch(url).then(function(response){
        if(response.status==200)
            return response.json();
        else
            throw new Error("status " + response.status);
    }).then(function(date){
            let indiceRandom=Math.floor(Math.random()*date.length);
            subt.innerHTML = date[indiceRandom].subtitlu;
    }).catch(function(err){
            console.log("A aparut eroarea: " + err.message);
    })
    subt.style.textDecoration = "underline";
    animation1();
    
    let t = setInterval(function(){
        animation1();
        fetch(url).then(function(response){
        if(response.status==200)
            return response.json();
        else
            throw new Error("status " + response.status);
        }).then(function(date){
            let indiceRandom=Math.floor(Math.random()*date.length);
            subt.innerHTML = date[indiceRandom].subtitlu;
        }).catch(function(err){
            console.log("A aparut eroarea: " + err.message);
        })
    },10000);
    
    function getColor(){
        return "rgb(" + (127 * Math.random()+127) + ',' +
        (127 * Math.random()+127) + ',' + 
        (127 * Math.random()+127) + ')';
    }

    let canvas1 = document.getElementById("triangle");
    let canvas2 = document.getElementById("square");
    let ctx1 = canvas1.getContext("2d");
    let ctx2 = canvas2.getContext("2d");

    ctx1.lineWidth = 2;
    ctx1.beginPath();
    ctx1.moveTo(150,200);
    ctx1.lineTo(250,400);
    ctx1.lineTo(50,400);
    ctx1.lineTo(150,200);
    ctx1.closePath();
    ctx1.strokeStyle = "rgb(198, 171, 255)";
    ctx1.fillStyle = "rgba(198, 171, 255, 0.25)";
    ctx1.stroke();
    ctx1.fill();
    ctx1.strokeStyle = "white";
    ctx1.fillStyle = "white";
    ctx1.font="60px Arial";
    ctx1.fillText("CBR", 86, 370);

    ctx2.lineWidth = 2;
    ctx2.rect(70,250,180,180);
    ctx2.strokeStyle = "rgb(198, 171, 255)";
    ctx2.fillStyle = "rgba(198, 171, 255, 0.25)";
    ctx2.stroke();
    ctx2.fill();
    ctx2.strokeStyle = "white";
    ctx2.fillStyle = "white";
    ctx2.font="60px Arial";
    ctx2.fillText("ESA", 100, 362);

    document.body.onkeydown = function(){
        ctx1.strokeStyle = `${getColor()}`;
        ctx1.stroke();
        ctx2.strokeStyle = `${getColor()}`;
        ctx2.stroke();
    };
}

