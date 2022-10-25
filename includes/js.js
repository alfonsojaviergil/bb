const endpoints = ['character', 'episodes'];
const retardos = [740, 1500];
let cargados = [false, false];
let selects = {};



window.onload = function () {
   endpoints.forEach(endpoin => {
      selects[endpoin] = [];
   });

   let listado = document.getElementById("listado");

   cargandoDatos().then(function (res) { //esperamos a que todos los json hayan llegado
      console.log("Todo OK");
      document.getElementById("cargando").style.display = 'none';

      ultimoEpisodio();


      let html = "";
      let filtradotemporadas = selects['episodes'].filter(function (episode) { //Filtramos los episodios de las temporadas 3 y 5
         return episode.season == 3 || episode.season == 5;
      });
      let personajes = [];
      filtradotemporadas.forEach(function callback(episodio, key) {
         episodio.characters.forEach(function callback2(character, key2) {
            if (!personajes.includes(character)) {
               personajes.push(character);
            };
            /*
            FILTAMOS PERSONAJES DE APARECEN EN LOS EPISODIOS FILTRADOS
            LA API DEBERÍA GUARDAR EL ID Y NO EL NOMBRE EN LOS EPISODIOS, 
            ESTO ESTA MUY MAL... GUARDAR EL NOMBRE Y RELACIONARLO CON EL PERSONAJE PUEDE GENERAR PROBLEMAS... 
            PUEDEN EXISITE 2 PERSONAJES CON EL MISMO NOMBBRE POR EJEMPLO
            ESTO ROMPE LA SEGURIDAD DE LA RELACIONES...
            */
         })
      });
      personajes = personajes.sort((a, b) => a.localeCompare(b)).reverse(); //Ordenamos de forma inversa
      personajes.map((personaje) => { //Rescatamos todos los datos de cada personaje
         let datosPersonaje = character(personaje);
         if (datosPersonaje != false) {
            html += `<li onclick="verDetalles(${datosPersonaje.char_id});"><strong>${personaje}</strong><ul>`;
            datosPersonaje.occupation.map((ocupacion) => {
               html += `<li>${ocupacion}</li>`;
            })
            html += `</ul></li>`;
         } else {
            html += `<li class="desactivado"><strong>${personaje}</strong>`;
         }
      });
      listado.innerHTML = html; //Pintamos
   })
      .catch(
         function (codigo_error) {
            //no hacemos nada ahora
         })
}


function cargandoDatos() {
   return new Promise(function (resolve, reject) {
      let promesas = [];
      endpoints.forEach(function callback(endpoin, key) {
         promesas.push(recibirDatos(endpoin, retardos[key]));
      });

      Promise.all(promesas).then(respuestas => {
         resolve(true);
      }
      );
   });
}

function recibirDatos(endpoin, retardo) {
   return new Promise(resolve => {
      setTimeout(() => {
         fetch("./includes/" + endpoin + ".json")
            .then(response => {
               return response.json();
            })
            .then((jsondata) => {
               selects[endpoin] = jsondata;
               resolve('ok');
            });
      }, retardo);
   });
}

function character(name) {
   let personaje = selects['character'].filter(function (character) {
      return character.name == name;
   });
   if (personaje[0]) {
      return personaje[0];
   } else {
      return false;
   }
}

function verDetalles(id) {
   let personaje = selects['character'].filter(function (character) {
      return character.char_id == id;
   });
   let texto = `<p><h2>${personaje[0].name} </h2></p>
   <p><img src="${personaje[0].img}"></p>
   <p><strong>Birthday:</strong> ${personaje[0].birthday} <p>
   <p><strong>Status:</strong> ${personaje[0].status}</p>
   <p><strong>Nickname:</strong> ${personaje[0].nickname}</p>
   <p><strong>Portrayed:</strong> ${personaje[0].portrayed}</p>
   <p><strong>Category:</strong> ${personaje[0].category}</p>
   `;
   let episodiosdondeaparece = selects['episodes'].filter(function (episode) {
      return episode.characters.includes(personaje[0].name);
   });

   episodiosdondeaparece = episodiosdondeaparece.sort(function (a, b) {
      return parseInt(a.season) - parseInt(b.season);
   });

   let temporada = 0;
   texto += `<ul>`;
   episodiosdondeaparece.map((episodio) => {
      if (temporada != episodio.season) {
         temporada = episodio.season;
         texto += `</ul><h3>Season: ${temporada}</h3><ul>`;
      }
      texto += `<li>Title: ${episodio.title}</li>`;
   });
   texto += `</ul>`;


   document.getElementById("detallescapa").style.display = 'block';
   document.getElementById("detalles").innerHTML = texto;
}

function cerrarDetalles() {
   document.getElementById("detallescapa").style.display = 'none';
}

function ultimoEpisodio() {

   //"10-08-2018"

   let episodiofinal = selects['episodes'][selects['episodes'].length - 1];
   //const fechaepisodio = new Date(Utilities.formatDate(new Date(episodiofinal['air_date']), "GMT", "MM/dd/yyyy")); // your date from API
   const fechaepisodio = new Date(episodiofinal['air_date']);
   const fechaactual = new Date();

   // Calcular diferencia en milisegundos
   let diff = fechaactual - fechaepisodio;
   // Calcular días
   diferenciaDias = Math.floor(diff / (1000 * 60 * 60 * 24));
   document.getElementById("diasultimoepisodio").innerHTML = `<strong> Último cápitulo se ha emitido hace ${diferenciaDias}  días</strong>`;
}