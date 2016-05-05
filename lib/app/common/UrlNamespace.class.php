<?php
class UrlNamespace{
    
    public static function searchUrl($type, $q, $time, $read) {
        $url = '/list/?';
        if ($type) {
            $url .='type='.$type;
        }
        if ($q) {
            $url .= '&q='.$q;
        }
        if($time) {
            $url .='&time='.$time;
        }
        if ($read) {
            $url .='&read='.$read;
        }
        return $url;
    }
    
   
}