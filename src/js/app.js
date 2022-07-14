document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    smoothScroll();
}

function smoothScroll(){

    console.log('Test');
    
   const enlaces = document.querySelectorAll('.separador a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){

            e.preventDefault();
            
            const seccionScroll = e.target.attributes.href.value
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"})
            
        });
    });
    }

 

