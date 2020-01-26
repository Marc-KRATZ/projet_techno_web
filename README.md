# Projet Techno Web : Outil de visualisation de données musicales

## Consignes

Résumé : il s’agit de développer un outil exploitant les web services REST de http://wasabi.i3s.unice.fr. L’API est documentée dans le menu sur la gauche. Vous pouvez jouer avec l’interface utilisateur du moteur de recherche pour vous faire une idée des données disponibles. HINT : regardez les requêtes REST dans les devtools, onglet network/XhR.



**Le but du projet est un logiciel qui permettra de faire des visualisations et des recherches custom sur les artistes.** 

- Exemple : artistes ayant eu le plus de No 1,

- Artistes ayant eu la vie la plus courte, la plus longue, etc.

- Statistiques sur un artiste donné 

- Visualisation en tags des genres présents dans la base

- Affichage par artiste de ceux qui ont des chansons en multipiste disponibles dans la base...

  

Par exemple, on pourra demander des informations sur un artiste précis (Michael Jackson, Rolling stones, etc.), un système d’auto complétion sera un plus ici (comme dans la BD wasabi). Une fois l’artiste identifié, les données le concernant sont récupérées via l’API REST de wasabi.i3s.unice.fr, et une série de visualisation seront proposées : nombre de disques sortis, nombre de chansons, tri par périodes (par tranches de 5 ans), visualisation du personnel (timeline), liste des albums (tableau, images, date de sortie, producteur), etc.

Pour le système d'autocomplétion : https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/2725496-tp-un-systeme-dauto-completion



L’idée n’est pas de refaire wasabi mais de proposer des visualisations supplémentaires. On pourra générer des liens vers les pages wasabi pour par ex: “voir discographie détaillée”...



On pourra stocker dans votre propre base de données de quoi regénérer cette visualisation plus tard.



On pourra ajouter à la recherche :

- des contraintes temporelles (périodes), 
- voir les “liaisons” intéressantes (disques produits par le même producteur que celui de la liste des disques trouvés, mais pour un autre artiste, pendant la même période)
- Artistes proches (partageant les mêmes musiciens) : visu sous forme de graphe



Voir par ex: https://www.theguardian.com/news/datablog/2012/oct/05/beatles-charts-infographics ou encore https://time.com/music-ranking/

## Technologies utilisées
- reactjs
- material UI
- react-google-charts
- https://www.heroku.com/ - Pour l'hébergement



https://blog.heroku.com/deploying-react-with-zero-configuration


## Installation

npm install - npm start
