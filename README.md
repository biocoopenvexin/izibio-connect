#izibio-connect

# Pour initialiser le projet

Créer un fichier .env à la racine contenant les variables suivantes :
* MSSQLCONNECTION qui est le ConnectionString permettant la connexion à l'instance locale SQL server, **avec authentification Windows**, sur le mode `Driver={SQL Server Native Client 11.0};Server=[Serveur];Database=[Database];Trusted_Connection=yes;`
* MONGOLAB_URI qui est l'URI de connexion à l'instance MONGODB (locale ou distante), sur le mode `mongodb://username:password@host:port/database?options...`

Exécuter `npm install`

L'application est consultable sur (http://localhost:5000)
