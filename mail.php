<?php
//echo "tes";
/*$r = new HttpRequest('https://docs.google.com/forms/d/1khYAoUtq2AT4RiI4HDsNC6sAwknfp6QxwmG-v2xlIhs/formResponse', HttpRequest::METH_POST);
$r->setOptions(array('cookies' => array('lang' => 'de')));
$r->addPostFields(array('entry.432711719' => 'danny', 'entry.275249920' => 'value2');
//$r->addPostFile('image', 'profile.jpg', 'image/jpeg');
try {
    echo $r->send()->getBody();
    echo 'success';
} catch (HttpException $ex) {
    echo $ex;
}
*/

$sName = trim(strip_tags($_GET['input-name']));
$sEmail = trim(strip_tags($_GET['input-email']));
$sSubject = htmlentities(strip_tags($_GET['input-subject']));
$sText = htmlentities($_GET['input-text']);

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

		/*$url = 'https://docs.google.com/forms/d/1khYAoUtq2AT4RiI4HDsNC6sAwknfp6QxwmG-v2xlIhs/formResponse';
		$data = array('entry.432711719' => $sName, 'entry.275249920' => $sEmail,'entry.331510409'=>$sSubject,'entry.1264875755'=>$sText);

		// use key 'http' even if you send the request to https://...
		$options = array(
		    'http' => array(
		        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
		        'method'  => 'POST',
		        'content' => http_build_query($data),
		    ),
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);

		var_dump($result);
        $aReturn = array('success' => true);
   */

        $r = new HttpRequest('https://docs.google.com/forms/d/1khYAoUtq2AT4RiI4HDsNC6sAwknfp6QxwmG-v2xlIhs/formResponse', HttpRequest::METH_POST);
		//$r->setOptions(array('cookies' => array('lang' => 'de')));
		$r->addPostFields(array('entry.432711719' => $sName, 'entry.275249920' => $sEmail,'entry.331510409'=>$sSubject,'entry.1264875755'=>$sText));
		//$r->addPostFile('image', 'profile.jpg', 'image/jpeg');
		try {
		    echo $r->send()->getBody();
		    echo 'success';
		} catch (HttpException $ex) {
		    echo $ex;
		}


} else {
    $aReturn = array('success' => false, 'reason' => $aErrors);
}

header('Content-Type: application/json');
echo json_encode($aReturn);
/*
$url = 'https://docs.google.com/forms/d/1khYAoUtq2AT4RiI4HDsNC6sAwknfp6QxwmG-v2xlIhs/formResponse';
$data = array('entry.432711719' => 'value1', 'entry.275249920' => 'value2');

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

var_dump($result);
*/
?>