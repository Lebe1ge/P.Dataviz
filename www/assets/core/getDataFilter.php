<?php 
$page = 'getDataFilter.php';
require_once('conf.php');

$year = $_POST['year'];
$method = $_POST['method'];

$movies = new Movies\Movies();

$result["graph"] = $movies->$method($year);

echo json_encode($result);