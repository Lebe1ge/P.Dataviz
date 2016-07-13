<?php 
$page = 'getData.php';
require_once('conf.php');

$movies = new Movies\Movies();
$result = $movies->countTagsByYears('2007');
echo json_encode($result);