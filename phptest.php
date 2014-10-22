<?php

$sName = trim(strip_tags($_GET['input-name']));
$sEmail = trim(strip_tags($_POST['input-email']));
$sSubject = htmlentities(strip_tags($_POST['input-subject']));
$sText = htmlentities($_POST['input-text']);


header('Content-Type: application/json');
echo json_encode($sName);

?>