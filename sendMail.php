<?php
/**
 * Created by PhpStorm.
 * User: Abhishek
 * Date: 02/10/2014
 * Time: 20:00
 */

require 'includes/PHPMailer-master/PHPMailerAutoload.php';

//form data
$sName = trim(strip_tags($_POST['input-name']));
$sEmail = trim(strip_tags($_POST['input-email']));
$sSubject = htmlentities(strip_tags($_POST['input-subject']));
$sText = htmlentities($_POST['input-text']);

$aErrors = array();

if ($sName == "") {
    $aErrors['input-name'] = 'input-name';
}

if ($sEmail == "" || !filter_var($sEmail, FILTER_VALIDATE_EMAIL)) {
    $aErrors['input-email'] = 'input-email';
}

if ($sSubject == "") {
    $aErrors['input-subject'] = 'input-subject';
}

if ($sText == "") {
    $aErrors['input-text'] = 'input-text';
}

if (empty($aErrors)) {
    // the email address where the script will email the form results to
    // from the form


    $mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

    $mail->From = $sEmail;
    $mail->FromName = $sEmail;
    $mail->addAddress('abhishekmaharjan1993@gmail.com', 'Abhishek Maharjan');     // Add a recipient
    $mail->addReplyTo($sEmail, $sEmail);

    $mail->WordWrap = 50;                                 // Set word wrap to 50 characters
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Form Contact - ' . $sSubject;
    $mail->Body    = $sText;
    $mail->AltBody = strip_tags($sText);

    if ($mail->send()) {
        $aReturn = array('success' => true);
    } else {
        $aReturn = array('success' => false, 'reason' => 0);
    }

} else {
    $aReturn = array('success' => false, 'reason' => $aErrors);
}

header('Content-Type: application/json');
echo json_encode($aReturn);