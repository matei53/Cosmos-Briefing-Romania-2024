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
        return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (85 + 10 * Math.random()) + '%)'
    }

    let title = document.querySelector("article");
    let compstyles = window.getComputedStyle(title);

    let welcome = document.createElement("h2");
    let main = document.getElementById("main");
    main.insertBefore(welcome,main.firstChild);
    let userLogat = JSON.parse(localStorage.getItem("username"));
    welcome.style.border=compstyles.getPropertyValue("border");
    welcome.style.padding=compstyles.getPropertyValue("padding");
    welcome.style.margin=compstyles.getPropertyValue("margin-left");
    welcome.style.backgroundColor=compstyles.getPropertyValue("background-color");

    welcome.style.fontSize="250%";
    welcome.style.textAlign="center";
    welcome.style.marginBottom="0";

    welcome.style.borderWidth="3px";

    let c = setInterval(function(){
        welcome.style.borderColor=`${getColor()}`;
    }, 1000);

    let loginlink = document.createElement("a");
    welcome.appendChild(loginlink);
    loginlink.href="login.html";
    loginlink.style.textDecoration="none";
    loginlink.style.color="lightblue";

    if (userLogat)
    {
        loginlink.innerHTML="Bine ai venit, " + userLogat[0] + "!";
    }
    else
    {
        loginlink.innerHTML="Autentificare / Înregistrare";
    }
} 

