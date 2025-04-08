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
    
} 

