# ApiAtlas #

Version : 0.1

NodeAtlas Version minimale : 1.4.x

**For an international version of this README.md, [see below](#international-version).**



## Avant-propos ##

ApiAtlas est un exemple d'API distante REST faite en Node.js et développé avec [NodeAtlas](http://haeresis.github.io/NodeAtlas/).

Il peut vous servir d'inspiration pour créer vos propres API distantes !



## Lancer le site en local ##

Pour faire tourner les APIs en local, il vous faudra installer [NodeAtlas](http://haeresis.github.io/NodeAtlas/) sur votre poste de développement.

Vous devrez également installer :
- une base de donnée MongoDB sur le serveur de l'application.
- une base de donnée Redis sur le serveur de l'application.

Ensuite remplissez la base de donnée MongoDB local avec les commandes suivantes :

```
\> mongoimport -d blog -c article --file </path/to/api/>/databases/article.json
```

```
\> mongoimport -d blog -c category --file </path/to/api/>/databases/category.json
```

Déplacez vous ensuite dans le dossier :


```
\> cd </path/to/api/>
```

et utilisez la commande :

```
\> node </path/to/node-atlas/> --browse
```

ou lancez `server.na` en double cliquant dessus :
- en expliquant à votre OS que les fichiers `.na` sont lancé par défaut par `node`,
- en ayant installé `node-atlas` via `npm install -g node-atlas`
- en étant sur que votre variable d'environnement `NODE_PATH` pointe bien sur le dossier des `node_modules` globaux.

Le site sera accessible ici :

- *http://localhost:7765/*



## Exemple en ligne ##

Vous pouvez voir fonctionner ce repository à l'adresse : [http://www.lesieur.name/api/](http://www.lesieur.name/api/).



-----



## International Version ##

### Overview ###

ApiAtlas is an example of Distant REST API in Node.js running with [NodeAtlas](http://haeresis.github.io/NodeAtlas/).

It used as inspiration to create your own distant API!



### Run the website in local server ###

To run the APIs in local, you must install [NodeAtlas](http://haeresis.github.io/NodeAtlas/) on your development machine.

You will also need to install:
- a MongoDB database on the application server.
- a Redis database on the application server.

Then fill the local MongoDB database with the following commands:

```
\> mongoimport -d blog -c article --file </path/to/api/>/databases/article.json
```

```
\> mongoimport -d blog -c category --file </path/to/api/>/databases/category.json
```

Then you move into the folder:


```
\> cd </path/to/api/>
```

and use the command:

```
\> node </path/to/node-atlas/> --browse
```

or run `app.na` by double clicking and:
- explaining your OS that `.na` files are run by default with `node`,
- Having installed `node-atlas` via `npm install -g node-atlas`
- Being on your environment variable `NODE_PATH` is pointing to the global `node_modules` folder.

The website will be to:

- *http://localhost:7765/*



### Online Example ###

You can see this repository running at: [http://www.lesieur.name/api/](http://www.lesieur.name/api/).