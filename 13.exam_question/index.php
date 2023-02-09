<?php
require_once './includes/helpers.inc.php';

$temps = getApi('https://ap-examen.surge.sh/temperaturen.json');

foreach ($temps as $temp) {
    echo '</br>' . strtoupper($temp->stad) . " (" . getAverage($temp->temperaturen) . '°C)</br>';
    foreach ($temp->temperaturen as $tempdate) {
        echo $tempdate->datum . str_repeat("&nbsp", 6 - strlen($tempdate->temperatuur)) . $tempdate->temperatuur . '°C</br>';
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
    </style>

</head>

<body>

</body>

</html>

<style>
    body {
        font-family: 'Roboto', sans-serif;
    }
</style>