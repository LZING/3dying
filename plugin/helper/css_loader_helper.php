<?php
function css_loader($params = null) {
    
    $css = '';
    if (!empty($params)) {
        $params = (array)$params;
        foreach ($params as $value) {
            $css .= '<link rel="stylesheet" type="text/css" href="../Public/css/' . $value . '?v=' . VISION . '">';
        }
    }
    return $css;
}