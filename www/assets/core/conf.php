<?php ini_set('display_errors', 1);
session_start();
header('Content-Type: text/html; charset=utf-8');
setlocale(LC_TIME, 'fr_FR', 'french', 'fre', 'fra');

/* CONSTANTES */
define('WEBROOT', str_replace($page, '', $_SERVER['SCRIPT_NAME']));
define('ROOT', str_replace($page, '', $_SERVER['SCRIPT_FILENAME']));

if($_SERVER['HTTP_HOST']==='localhost') {
    define('UPLOAD_DIR', 'http://localhost');
    define('DSN', 'mysql:dbname=dataviz;host=localhost');
    define('USER', 'root');
    define('PWD', 'root');
} else {
    define('DSN', 'mysql:dbname=dataviz;host=localhost');
    define('USER', 'root');
    define('PWD', 'root');
}


require_once(ROOT.'Database.php');
require_once(ROOT.'Movies.php');