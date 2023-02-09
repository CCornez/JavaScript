<?php function getApi($url)
{

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
    ));

    $response = json_decode(curl_exec($curl));
    if (!$response) {
        return array();
    }

    curl_close($curl);
    return $response;
}

function getAverage($arr = [1])
{
    $sum = array_reduce($arr, fn ($acc, $el) => ($acc += $el->temperatuur));
    return round($sum / count($arr));
}
