//Script para usar funciones de la libreria Muuri

const grid = new Muuri('.grid', {
    layout: {
        rounding: false,      //Falso: Dimensiones exactas
      },
});


/*
Es necesario para usar un metodo de la libreria de Muuri el cual 
nos ayuda con las transiciones y que se note al ser responsive.
*/
window.addEventListener('load', () => {
    grid.refreshItems().layout();

    /*Script que funciona para que al cargar la pagina, se ejecute la clase 
      "imagenes cargadas" y asi se logre el efecto que queremos.*/
    document.getElementById('grid').classList.add('imagenes-cargadas');
   
    //FILTRADO POR CATEGORIA

    //Se guardan los enlaces en la variable 'enlaces'
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach( (elemento) => {
        //console.log(elemento);
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();

            /*Al seleccionar una categoria, se le asigna el valor de 
              activo a esta y se le elimina a los demas*/
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            //console.log(evento.target)
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            //console.log(categoria);

            /*
              Si categoria es 'todos' muestra todas las imagenes, 
              caso contrario, muestra solo las imagenes relacionadas al valor 
              'categoria'.
            */
            categoria === 'todos' ? grid.filter('[data-categoria]') :
            grid.filter(`[data-categoria="${categoria}"]`);
        })
    });

    //FILTRADO POR BARRA DE BUSQUEDA

    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        //console.log(busqueda);
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    });

    //LISTENER PARA LAS IMAGENES
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( (elemento) => {
        
        
        //console.log(descripcion);
        elemento.addEventListener('click', ()  => {
            const ruta = elemento.getAttribute('src');
            const descripcion =  elemento.parentNode.parentNode.dataset.descripcion;
            
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });

    //EVENTO DEL BOTON CERRAR
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    //EVENTO DEL OVERLAY (CERRAR)
    overlay.addEventListener('click', (evento) => {
        //overlay.classList.remove('activo');
        //console.log(evento.target.id === 'overlay');

        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
})




