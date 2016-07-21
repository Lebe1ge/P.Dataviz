<?php 
$page = 'getData.php';
require_once('conf.php');

$movies = new Movies\Movies();
$result["graph1"] = $movies->countTagsByYears('2007');
$result["graph2"] = $movies->countFamilyByTitle('2007');
$result["graph3"] = $movies->countViewByDate();
$result["graph4"] = $movies->getWords();
$result["graph5"] = $movies->countVoteByDate();
echo json_encode($result);