SELECT name, year FROM movies WHERE year=1998; /* Mostrame una tabla con NAME y YEAR de la TABLA MOVIES la cual contenga SOLAMENTE peliculas con year=1998.*/

SELECT COUNT(DISTINCT name) FROM (SELECT name, year FROM movies WHERE year=1982); /*Contame cuantas filas hay en la tabla que me traigo. Uso DISTINCT name para ser estricto y contabilizar SOLAMENTE las filas con values QUE NO SEAN NULL y ademas para NO CONTABILIZAR FILAS REPETIDAS.*/

SELECT last_name FROM actors WHERE last_name LIKE '%stack%'; /* Traeme todos los actores de la tabla ACTORS que en su columna LAST_NAME su value contengan el substring stack (en cualquier lugar)*/

SELECT first_name, last_name, COUNT(first_name and last_name) as cantidad FROM actors GROUP BY first_name, last_name ORDER BY cantidad DESC LIMIT 10; /*Traeme los 10 (LIMIT 10) nombres completos (first_name, last_name) con su cantidad (count ... as cantidad) de la tabla ACTORS, ordenados por cantidad en orden DESC, y agrupados por nombre completo (de esta manera si hay 3 Ricardo Darin, me los pone los tres en una sola fila y en cantidad figuraria 3 en esa fila) */

SELECT actors.first_name, actors.last_name, COUNT(actor_id) as cantidad FROM roles JOIN actors ON actors.id=actor_id GROUP BY actor_id ORDER BY cantidad DESC LIMIT 100; /*Traeme de la TABLA ACTORS el firstname y lastname, junto con un COUNT de actorID de la tabla ROLES (cantidad), pongo FROM porque es la tabla BASE de la cual traigo los datos. Luego llamo a la tabla ACTORS con JOIN para sincronizar el actors.id con roles.actor_id. Agrupo por id para no repetir filas, y ordeno cantidad en desc y limito a 100.*/

SELECT genre, COUNT(genre) as cantidad FROM movies_genres GROUP BY genre ORDER BY cantidad ASC; /*Traeme genero y un count de genre (cantidad) de la tabla movies_genres. Agrupalos por genero (para no repetir filas) y ordenamelos ascendente.*/

select last_name,first_name
from actors join roles join movies on actors.id=actor_id and movies.id=movie_id
where name="Braveheart"
order by last_name; 


select directors.last_name, movies.name, movies.year from movies join directors join movies_genres join movies_directors ON movies.id = movies_directors.movie_id and directors.id = movies_directors.director_id and movies.id = movies_genres.movie_id where movies_genres.genre='Film-Noir' and movies.year%4 = 0 order by movies.year ASC;

/*
SUBQUERY:
select DISTINCT movies.id from actors join movies join roles join movies_genres on actors.id = roles.actor_id and movies.id = roles.movie_id and movies.id = movies_genres.movie_id where movies_genres.genre='Drama' and actors.first_name='Kevin' and actors.last_name='Bacon';*/

select actors.first_name, actors.last_name, movies.name from actors join movies join roles join (select DISTINCT movies.id from actors join movies join roles join movies_genres on actors.id = roles.actor_id and movies.id = roles.movie_id and movies.id = movies_genres.movie_id where movies_genres.genre='Drama' and actors.first_name='Kevin' and actors.last_name='Bacon') as subquery on movies.id=subquery.id and actors.id = roles.actor_id and movies.id = roles.movie_id where actors.first_name<>'Kevin' and actors.last_name<>'Bacon';.

select DISTINCT actors.first_name, actors.last_name from actors join movies join roles on actors.id=roles.actor_id and movies.id=roles.movie_id where movies.year < 1900 and movies.year > 2000;.