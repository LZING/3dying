<?php
/**
 * @brief 表单验证
 * @author zzq
 *
 */
require_once MYROOT . '/my/sta/Form/validator/Regexp.php';
class FormCheck {

    public static function checkFixedphone($str) {
        $pattern = Regexp::PHONE;
        return preg_match($pattern, $str);
    }
    public static function checkMobile($str) {
        $pattern = Regexp::MOBILE;
        return preg_match($pattern, $str);
    }
    public static function checkEmail($str) {
        $pattern = Regexp::EMAIL;
        return preg_match($pattern, $str);
    }
    
}