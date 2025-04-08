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


    
    let userpage = document.getElementById("userpage");
    let forms = document.getElementsByClassName("form");
    let user = document.getElementById("user");
    let email = document.getElementById("email");
    let parola = document.getElementById("parola");
    let eroare1 = document.getElementById("eroare1");
    let eroare2 = document.getElementById("eroare2");
    let eroare3 = document.getElementById("eroare3");
    let logout = document.getElementById("logout");
    let user2 = document.getElementById("user2");
    let email2 = document.getElementById("email2");
    let parola2 = document.getElementById("parola2");
    let user3 = document.getElementById("user3");
    let email3 = document.getElementById("email3");
    let parola3 = document.getElementById("parola3");
    let div1 = document.getElementById("login");
    let div2 = document.getElementById("signup");
    let div3 = document.getElementById("userpage");

    function verificareStatus() {
      let userLogat = JSON.parse(localStorage.getItem("username"));
      if (userLogat) {
        eroare1.textContent ="";
        eroare2.textContent ="";
        eroare3.textContent ="";
        userpage.style.display = "block";
        username.textContent = userLogat[0];
        forms[0].style.display = "none";
        forms[1].style.display = "none";
        eroare1.style.display = "none";
        eroare2.style.display = "none";
        eroare3.style.display = "block";
        div1.style.display = "none";
        div2.style.display = "none";
        div3.style.display = "block";
      } else {
        eroare1.textContent ="";
        eroare2.textContent ="";
        eroare3.textContent ="";
        userpage.style.display = "none";
        forms[0].style.display = "block";
        forms[1].style.display = "block";
        eroare1.style.display = "block";
        eroare2.style.display = "block";
        eroare3.style.display = "none";
        div1.style.display = "block";
        div2.style.display = "block";
        div3.style.display = "none";
      }
    }
    verificareStatus();
  
    function validParola(parola)
    {
      let p = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?!$%&#@]).{5,}$/;
      return p.test(parola);
    }
  
    function verificareUser(user,email,parola){
        let useri = JSON.parse(localStorage.getItem('lista'));
      for(let u of useri){
        if ((u[0] == user) && (u[1] == email) && (u[2] == parola)) return true;
      }
      return false;
    }

    function verificareSignup(user,email){
        let useri = JSON.parse(localStorage.getItem('lista'));
        if(useri)
          for(let u of useri){
              if((u[0]==user) || (u[1]==email)) return true;
          }
        return false;
    }

    function verificareLungime(user){
      if(user.length<16) return true;
      return false;
    }
    
    forms[0].onsubmit = function(event){
      event.preventDefault();
      eroare1.textContent ="";
      let username = user.value;
      let e_mail = email.value;
      let password = parola.value;
      if (verificareUser(username,e_mail,password))
      {
        localStorage.setItem("username", JSON.stringify([username, e_mail, password]));
        verificareStatus();
      }
      else{
        eroare1.textContent ="Datele de logare sunt invalide!";
      }
    }
  
    logout.onclick = function(){
      localStorage.removeItem("username"); 
      verificareStatus();
    }

    forms[1].onsubmit = function(event){
        event.preventDefault();
        eroare2.textContent="";
        let username = user2.value;
        let e_mail = email2.value;
        let password = parola2.value;
        if(validParola(password))
        {
            let useri = JSON.parse(localStorage.getItem('lista'));
            if(!verificareSignup(username,e_mail))
            {
              if(verificareLungime(username))
              {
                if(!useri) useri=[];
                useri.push([username, e_mail, password]);
                localStorage.setItem('lista', JSON.stringify(useri));
                localStorage.setItem("username", JSON.stringify([username, e_mail, password]));
                verificareStatus();
              }
              else eroare2.textContent="Numele este prea lung!";
            }
            else eroare2.textContent="Utilizatorul sau email-ul deja există!";
        }
        else
        {
            eroare2.textContent ="Parola este invalidă!";
        }
    }

    forms[2].onsubmit = function(event){
      event.preventDefault();
      eroare3.textContent="";
      let a = JSON.parse(localStorage.getItem("username"));
        let username;
        if(user3.value)
          username = user3.value;
        else
          username = a[0];

        let e_mail;
        if(email3.value)
          e_mail = email3.value;
        else
          e_mail = a[1];
        let password;
        if(parola3.value)
          password = parola3.value;
        else
          password = a[2];
        if(validParola(password))
        {
            let useri = JSON.parse(localStorage.getItem('lista'));
            let index;
            let i=0;
            for(let u of useri)
            {
              if(JSON.stringify(u)==JSON.stringify(a))
                index = i;
              i=i+1;
            }
            useri.splice(index,1);
            localStorage.setItem('lista', JSON.stringify(useri));
            if(!verificareSignup(username,e_mail))
            {
                useri.push([username, e_mail, password]);
                localStorage.setItem('lista', JSON.stringify(useri));
                localStorage.removeItem("username");
                localStorage.setItem("username", JSON.stringify([username, e_mail, password]));
                verificareStatus();
                if(username!=a[0] || e_mail!=a[1] || password!=a[2])
                  eroare3.textContent="Schimbarea a fost făcută cu succes!";
            }
            else
            {
              eroare3.textContent="Utilizatorul sau email-ul deja există!";
              useri.push(a);
              localStorage.setItem('lista', JSON.stringify(useri));
            }
        }
        else
        {
            eroare3.textContent ="Parola este invalidă!";
        }
    }
  }
  