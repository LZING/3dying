<?php
function getMicrosecond() {
    list($usec, $sec) = explode(" ", microtime());
    return $sec*1000000 + (int)($usec * 1000000);
}

function urlFormat($url = null){
    if($url != null){
        if(!preg_match("/^(http|https)/i", $url)){
            $url = "http://" .$url;
        }
        return $url;
    }
    else{
        return "";
    }
}