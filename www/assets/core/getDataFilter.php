<?php 
$page = 'getDataFilter.php';
require_once('conf.php');

$year = $_POST['year'];

$movies = new Movies\Movies();

$result["graph3"] = $movies->countViewByDate($year);

echo json_encode($result);