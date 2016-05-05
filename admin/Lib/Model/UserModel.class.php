<?php
class UserModel extends BaseModel{
    
    private static $instance = null;
    public static function init() {
        if (!self::$instance) {
            self::$instance = M('User');
        }
    }
    public static function getInstance() {
        self::init();
        return self::$instance;
    }
    
    public static function verify($data = null){
        self::init();
        $error = null;
        if(empty($data["username"])) {
            $error.= "用户名不能为空,";
        }
        if(strlen($data["username"]) < 5) {
            $error.= "用户名至少为5位,";
        }
        if(preg_match('[\s]',$data["username"])){
            $error.= "用户名间不允许空白符号,";
        }
        if(self::$instance->where("username='$data[username]'")->find()){
            $error.= "此用户名已经存在,";
        }
        if(strlen($data['password'])<6){
            $error.= "密码至少为6位,";
        }
        if($data['password']!=$data['repassword']){
            $error.= "两次输入的密码不同,";
        }
        if(!ereg("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9\-\.])+", $data['email'])){
            $error.= "请输入正确的email";
        }
        if(empty($data["english_name"])){
            $error.= "英文名不能为空.";
        }
        if($error == null){
            return -1;
        }
        if($error != null){
            return $error;
        }
    }
    /**
     * @brief 保存
     */
    public static function saveData($data = null, $id = null) {
        self::init();
        return parent::saveData(self::$instance, $data, $id);
    }
    /**
     * @brief 得到id 文章
     * @param int $id
     */
    public static function getUserById($id = null) {
        self::init();
        if (!$id) return null;
        return self::$instance->where("`id` = " .$id. " AND `privite` != 0")->find();
    }
    /**
     * @brief 得到id 文章
     * @param int $id
     */
    public static function getUserByUsername($username = null) {
        self::init();
        if (!$username) return null;
        return self::$instance->where("`username` = '" . $username . "'")->find();
    }
    /**
     * @brief 得到leadership 用户分页
     * @param array $type
     * @param string $order
     * @param int $limit
     */
    public static function getUserByTypeShowPage($map = null, $order = 'id desc', $limit = 10) {
        self::init();
        if (!$map) return null;
        return parent::getArticleByTypeShowPage(self::$instance, $map, $order, $limit); 
    }
}
?>