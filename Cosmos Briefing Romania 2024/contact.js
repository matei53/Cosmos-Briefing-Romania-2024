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
    


    let userLogat = JSON.parse(localStorage.getItem("username"));
    let form = document.getElementById("form");
    let subject = document.getElementById("subject");
    let question = document.getElementById("question");
    let buton = document.getElementById("submit");
    let subject_popups=0;
    let question_popups=0;

    if (userLogat)
    {
        subject.readOnly = false;
        question.readOnly = false;
        buton.disabled = false;
        let intrebari = JSON.parse(localStorage.getItem('intrebari'));
        form.onsubmit=function(event){
            event.preventDefault();
            if(!intrebari) intrebari=[];
            intrebari.push([userLogat[0], subject.value, question.value]);
            localStorage.setItem('intrebari', JSON.stringify(intrebari));
            subject.value="";
            question.value="";
        }
    }
    else
    {
        function notificare(){
            let elem = event.currentTarget;
            if((elem == subject && subject_popups<1) || (elem==question && question_popups<3))
            {
                let pressed = false;
                if(elem==subject) subject_popups+=1;
                else question_popups+=1;
                let x = event.clientX;
                let y = event.clientY + window.scrollY;
                let notif = document.createElement("div");
                notif.innerHTML = `<p>Este necesară <a href="login.html">autentificarea</a>!</p>`;
                document.body.appendChild(notif);
                notif.classList.add("popup");
                notif.style.position = "absolute";
                notif.style.top = `${y}px`;
                if(x<1200) notif.style.left = `${x}px`;
                else notif.style.left = `${x-301}px`;

                let b = document.createElement("button");
                b.innerHTML = `OK`;
                notif.appendChild(b);
                b.classList.add("buton");
                b.addEventListener("click", function(event){
                    event.stopPropagation();
                    notif.remove();
                    pressed=true;
                    if(elem==subject) subject_popups-=1;
                    else question_popups-=1;
                });
                setTimeout(function(){
                    notif.style.animation = "disparitie 1s";
                    setTimeout(function(){
                        if(pressed==false)
                        {
                            if(elem==subject) subject_popups-=1;
                            else question_popups-=1;
                        }
                        notif.remove();
                    },1000);
                },4000);
            }
        }
        subject.readOnly = true;
        question.readOnly = true;
        buton.disabled = true;
        subject.addEventListener("click",function(){notificare();});
        question.addEventListener("click",function(){notificare();});
    }
} 
