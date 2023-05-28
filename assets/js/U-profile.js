

function showSection(sectionId, botonId) {
    var botons=document.getElementsByClassName('boton');
  var sections = document.getElementsByClassName('section');
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.remove('active');
    botons[i].classList.remove('active');
  }
  var sectionToShow = document.getElementById(sectionId);
  var botonToShow= document.getElementById(botonId);
  sectionToShow.classList.add('active');
  botonToShow.classList.add('active');
  
}

function toggleVisibility() {  
    var getPasword = document.getElementById("pswrd");  
    if (getPasword.type === "password") {  
      getPasword.type = "text";  
    } else {  
      getPasword.type = "password";  
    }  
  }  

  



