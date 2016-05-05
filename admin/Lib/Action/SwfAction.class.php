<?php
require_once MYROOT . '/my/sta/conf/ImageConf.php';
require_once MYROOT . '/my/sta/conf/FileConf.php';
class SwfAction extends Action{
    function index(){
        set_time_limit(0);
        if (isset($_POST["PHPSESSID"])) {
            session_id($_POST["PHPSESSID"]);
        } else if (isset($_GET["PHPSESSID"])) {
            session_id($_GET["PHPSESSID"]);
        }
        $type = isset($_POST['type']) ? $_POST['type'] : $_GET['type'];//长传文件类型
        if(!isset($_SESSION['admin']) || !$_SESSION['admin']) {
            echo 3;exit(0);
        }
        $time=date("Y-m");
        $conf = ($type == 'image') ? 'ImageConf' : 'FileConf';//配置文件
        $save_path = dirname(__FILENAME__) . "/" .$conf::$SAVE_PATH. "/".$time;
        if(!is_dir($save_path)) { 
            mkdir($save_path);
        }
        // The path were we will save the file (getcwd() may not be reliable and should be tested in your environment)
        $upload_name = "Filedata";
        $max_file_size_in_bytes = $conf::$SWF_MAX_ALLOW_SIZE * 1024 * 1024;// 
        $extension_whitelist = $conf::$ALLOW_TYPE;// Allowed file extensions

    // Other variables	
        $MAX_FILENAME_LENGTH = 260;
        $file_name           = "";
        $file_extension      = "";
    // Validate the upload

        if (!isset($_FILES[$upload_name])) {
            echo 2;//$this->HandleError("No upload found in \$_FILES for " . $upload_name);
            exit(0);
        } else if (isset($_FILES[$upload_name]["error"]) && $_FILES[$upload_name]["error"] != 0) {
            echo 3;
            exit(0);
        } else if (!isset($_FILES[$upload_name]["tmp_name"]) || !@is_uploaded_file($_FILES[$upload_name]["tmp_name"])) {
            echo 4;//$this->HandleError("Upload failed is_uploaded_file test.");
            exit(0);
        } else if (!isset($_FILES[$upload_name]['name'])) {
            echo 5;//$this->HandleError("File has no name.");
            exit(0);
        }

    // Validate the file size (Warning: the largest files supported by this code is 2GB)
        $file_size = @filesize($_FILES[$upload_name]["tmp_name"]);
        if (!$file_size || $file_size > $max_file_size_in_bytes) {
            echo 1;
            exit(0);
        }
        if ($file_size <= 0) {
            echo 0;//$this->HandleError("File size outside allowed lower bound");
            exit(0);
        }
        $path_info          = pathinfo($_FILES[$upload_name]['name']);
        $file_extension     = strtolower($path_info["extension"]);
        $is_valid_extension = false;
       
        foreach ($extension_whitelist as $extension) {
            if (strcasecmp($file_extension, $extension) == 0) {
                $type_ = $extension;
                $is_valid_extension = true;
                break;
            }
        }
        if (!$is_valid_extension) {
            echo 6;//$this->HandleError("Invalid file extension");
            exit(0);
        }

        $file_name=time().mt_rand(100000,999999).".".$type_;
        if (!@move_uploaded_file($_FILES[$upload_name]["tmp_name"], $save_path."/".$file_name)) {
            echo 7;//$this->HandleError("File could not be saved.");
            exit(0);
        } else{
            if ($type == 'image') {//缩微图
                include_once MYROOT . '/my/core/file/ImageThumb.php';
                $t = new ImageThumb($save_path."/".$file_name);
            }
            if ($type == 'image') {
                echo $save_path."/".$file_name;exit;
            } else {
                echo json_encode(array('path' => $save_path."/".$file_name, 'name' => $_FILES[$upload_name]['name']));exit;
            }
        }
        exit(0);
   }
}