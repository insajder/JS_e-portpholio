function prekiniSlanjeForme(event) {
    event.preventDefault();
}

function provera(){
    document.MojaForma.addEventListener("submit", prekiniSlanjeForme);

    var ime = document.MojaForma.ime.value;
    var prezime = document.MojaForma.prezime.value;
    var email = document.MojaForma.email.value;
    var lozinka = document.MojaForma.pass.value;
    var lozinka2 = document.MojaForma.pass2.value;
    var email_validacija=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var datum = new Date;

    if(ime==="" || ime===null){
        document.getElementById("poruka-Ime").innerHTML = "Niste uneli ime!";
        return false;
    }
    else if(prezime==="" || prezime===null){
        document.getElementById("poruka-Prezime").innerHTML = "Niste uneli prezime!";
        return false;
    }
    else if(email==="" || email===null){
        document.getElementById("poruka-Email").innerHTML = "Niste uneli email!";
        return false;
    }
    else if(!email.match(email_validacija)){
        document.getElementById("poruka-Email").innerHTML = "E-mail nije validan!";
        return false;
    }
    else if(lozinka==="" || lozinka===null){
        document.getElementById("poruka-Lozinka").innerHTML = "Niste uneli lozinku!";
        return false;
    } 
    else if(lozinka2==="" || lozinka2===null){
        document.getElementById("poruka-Lozinka2").innerHTML = "Niste potvrdili lozinku!";
        return false;
    }
    else if(lozinka !== lozinka2){
        document.getElementById("poruka-Lozinka2").innerHTML = "Lozinke se ne poklapaju!";
        return false;
    }
    else{
        document.MojaForma.removeEventListener("submit", prekiniSlanjeForme);
        alert("Uspesno ste poslali formu");

        var kontakt = { 
            email: email, 
            datum: datum
        };
        sacuvaj(kontakt); 

        return true;
    }
}

function sacuvaj(noviKontakt){
    var kontakti;
   
    if (localStorage.getItem("kontakti")) { 
        kontakti = JSON.parse(localStorage.getItem("kontakti")); 
        kontakti.push(noviKontakt); 
        localStorage.setItem("kontakti", JSON.stringify(kontakti)); 
    } else { 
        kontakti = []; 
        kontakti.push(noviKontakt); 
        localStorage.setItem("kontakti", JSON.stringify(kontakti)) 
    }
}



function prikazi(){
    var kontakti = JSON.parse(localStorage.getItem("kontakti")); 

    if (kontakti) { 
        var tabela = document.getElementById("mojaTabela"); 
        tabela.innerHTML = "";
        for(var i=0; i<kontakti.length; i++){
            var red = tabela.insertRow(i); 
            var polje1 = red.insertCell(0); 
            var polje2 = red.insertCell(1); 

            var datum = new Date(kontakti[i].datum);
            var datumString = datum.getDate() + 
                "." + (datum.getMonth()+1) +
                "." + datum.getFullYear() + 
                " " + datum.getHours() +  
                ":" + datum.getMinutes(); 
            
            polje1.innerHTML = kontakti[i].email; 
            polje2.innerHTML = datumString; 
        }
    }
}

function navigacija(){
    var x = document.getElementById("idNav");
    if (x.className === "nav") {
        x.className += " mob";
    } else {
        x.className = "nav";
    }
}

function ocistiGresku(id){
    document.getElementById(id).innerHTML = "";
}
