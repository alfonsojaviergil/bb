# Code Challenge

Crear una aplicación web desarollada en javascript que consuma una serie de recursos *.json y que muestre como resultado final un listado de actores. Cada una de las partes del listado tiene que ser interactuable por parte del usuario mostrando información adiccional del personaje seleccionado.

A continuación explicaremos de forma más extendida cada uno de los apartados a realizar para la finalización de este ejercicio de una manera satisfactoria.


### Puntos a seguir:

* Los datos de los recursos necesarios para la elaboración del ejercicio son: **character.json** y **episodes.json** (te los proporcionamos nosotros). Dados estos recursos tienes que simular la llamada a unos servicios y que estos fueran los que te devolvieran los datos que componen los recursos. Para **character.json** el "servicio" tiene que tardar en contestarte 740ms y para **episodes.json** un segundo y medio.

* Una vez obtenidos los datos, ordenar alfabeticamente de la Z -> A (por el campo 'name') un único listado de los personajes que aparezcan en las temporadas 5 y 3. Se tiene que mostrar tanto el nombre del personaje (campo 'name') como la ocupación (campo 'ocupation').

* Una vez tengas la lista de personajes, implementar que cuando se haga click sobre uno de ellos, se muestre una notificación (alert) con la información completa del personaje indicando las temporadas en las que aparece y los episodios de cada temporada (unicamente indicar título del episodio y temporada del episodio )

* Indicar cuánto hace que se emitio el último episodio al final del listado de personajes. Por ejemplo: 'El último cápitulo se ha emitido hace 234543234 días). Contanto desde la fecha actual (IMPORTANTE).


### Requisitos
* Lenguaje: Javascript
* Tener instalado: Git
