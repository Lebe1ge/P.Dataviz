# P.Dataviz

IMPORT DATASET TO BDD

Télécharge de dataset avec le lien suivant : <a href="http://pornstudies.sexualitics.org/data/xhamster.csv.tar.gz">DATASET FORMAT CSV</a>

Lancer les serveurs de MAMP

Créer la database : 'dataviz'
Créer la table xhamster avec les champs suivants : INT id, VARCHAR upload_date, VARCHAR title, VARCHAR channels, VARCHAR description, INT nb_views, INT nb_votes,INT nb_comments, INT runtime, VARCHAR uploader

Se connecter au Mysql de MAMP avec le terminal : 
/Applications/MAMP/Library/bin/mysql --host=localhost -uroot -proot

IMPORTER LE FICHIER CSV (En changeant le chemin du fichier dataset) :
load data local infile '/Applications/MAMP/htdocs/P.Dataviz/www/assets/dataset/xhamster/xhamster.csv' into table xhamster fields terminated by ',' enclosed by '"' lines terminated by '\n' IGNORE 1 LINES (id,upload_date,title,channels,description,nb_views,nb_votes,nb_comments,runtime,uploader);