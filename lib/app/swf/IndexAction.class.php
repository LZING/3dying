<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/atta/AttaNamespace.class.php';

class IndexAction extends BaseAction{

    public function init() {
//     	if (isset($_REQUEST["uid"])) {
//     		$uid  = $_REQUEST['uid'];
//     		$user = UserNamespace::getUserById($uid);
// //     		if ($uid == $_SESSION['user']['id']) {
// //     			session_id($uid);
// //     			session_start();
// //     		}
//     	}
    	
//         print_r($_SESSION['user']);
//         if (!$this->checkLogin()) {
//         	echo "no";
//             echo 3;exit;
//         }
    }
    
    public function defaultAction() {

        set_time_limit(0);
       
        $type =  $_REQUEST['type'];//长传文件类型
        $uid  = $_REQUEST['uid'];
        $user = UserNamespace::getUserById($uid);
        $time = date("Ymd");
        $dir  = $_REQUEST['dir'];
        $save_path = "./Public/file/" . $user['id'] . '/' . $time . '/' . $dir;
		if(!file_exists("./Public/file/" . $user['id'])) {
            if (!mkdir( "./Public/file/" . $user['id'] , 0777 , true ) ) {
                echo 20;exit;
            }
        }

		if(!file_exists("./Public/file/" . $user['id'] . '/' . $time )) {
            if (!mkdir( "./Public/file/" . $user['id'] . '/' . $time  , 0777 , true ) ) {
                echo 20;exit;
            }
        }
        if(!file_exists($save_path)) {
            if (!mkdir( $save_path , 0777 , true ) ) {
                echo 20;exit;
            }
        }
        // The path were we will save the file (getcwd() may not be reliable and should be tested in your environment)
        $upload_name = 'image';//"Filedata";
        $max_file_size_in_bytes = 10 * 1000 * 1024 * 1024;// 
        $extension_whitelist = array('stl', 'obj', 'mtl', 'jpg', 'jpeg', 'png','tga','npg','tif','bmp','zip','7Z','rar','tar','jar');// Allowed file extensions

    // Other variables
        $MAX_FILENAME_LENGTH = 260;
        $file_name           = "";
        $file_extension      = "";
    // Validate the upload

        if (!isset($_FILES[$upload_name])) {
            echo 2;
            exit(0);
        } else if (isset($_FILES[$upload_name]["error"]) && $_FILES[$upload_name]["error"] != 0) {
            echo 3;
            exit(0);
        } else if (!isset($_FILES[$upload_name]["tmp_name"]) || !@is_uploaded_file($_FILES[$upload_name]["tmp_name"])) {
            echo 4;
            exit(0);
        } else if (!isset($_FILES[$upload_name]['name'])) {
            echo 5;
            exit(0);
        }

    // Validate the file size (Warning: the largest files supported by this code is 2GB)
        $file_size = @filesize($_FILES[$upload_name]["tmp_name"]);
        if (!$file_size || $file_size > $max_file_size_in_bytes) {
            echo 1;
            exit(0);
        }
        if ($file_size <= 0) {
            echo 0;
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
            echo 6;
            exit(0);
        }
         
        //obj mtl .pic/或者多个stl
        if (in_array($file_extension, array('obj', 'mtl', 'jpg', 'jpeg', 'png'))) {
            $file_name = $_FILES[$upload_name]['name'];
            if (file_exists($save_path."/".$file_name)) {
                echo 8;exit;
            }
        } else {
        	$randnum = time().mt_rand(100000,999999);
            $file_name = $randnum.".".$type_;
        }
        
        if (!@move_uploaded_file($_FILES[$upload_name]["tmp_name"], $save_path . "/" . $file_name)) {
            echo 7;
        } else{
        	//解压zip
        	if ($type_ === "zip"){
        		$this->unzip_file($save_path . "/" . $file_name, $save_path."/".$randnum);
        		if (file_exists($save_path."/".$randnum)){
        			unlink($save_path . "/" . $file_name);
        		}
        		$filesnames = $this->list_files($save_path."/".$randnum);
        		$firstfile = array_shift($filesnames);
        		$id = AttaNamespace::insert($save_path."/".$randnum."/".$firstfile, $user['id'],$user['username'],$firstfile);
//         		foreach ($filesnames as $k=>$v){
//         			$id = AttaNamespace::insert($save_path."/".$randnum."/".$v, $user['id'],$user['username'],$v);
//         		}
        		if($id) {
        			echo json_encode(array('path' => $id, 'name' => $firstfile));
        		} else {
        			echo 8;
        		}
        	}else{				$id = AttaNamespace::insert($save_path."/".$file_name, $user['id'],$user['username'],$_FILES[$upload_name]['name']);
        		if($id) {
        			echo json_encode(array('path' => $id, 'name' => $_FILES[$upload_name]['name']));
        		} else {
        			echo 8;
        		}
        	}	
   
        }
        exit(0);
    }
    function list_files($dir)
    {
    	$arr = array();
    	if(is_dir($dir))
    	{
    		if($handle = opendir($dir))
    		{
    			while(($file = readdir($handle)) !== false)
    			{
    				if($file != "." && $file != ".." && $file != "Thumbs.db")
    				{
    					$houz = array_pop(explode(".", $file));
    					if ($houz == "mtl" || $houz == "obj" || $houz == "stl"){
    						$arr[] = $file;
    					}
    				}
    			}
    			closedir($handle);
    		}
    	}
    	return $arr;
    }
    function unzip_file($file, $destination){
    	set_time_limit(0);
    	// 实例化对象
    	$zip = new ZipArchive() ;
    	//打开zip文档，如果打开失败返回提示信息
    	if ($zip->open($file) !== TRUE) {
    		echo 7;
    	}
    	//将压缩文件解压到指定的目录下
    	$zip->extractTo($destination);
    	//关闭zip文档
    	$zip->close();
    }
    
    public function imageAction() {
        $time=date("Y-m");
        
        $save_path = "./Public/image/" . $time;
        if(!is_dir($save_path)) { 
            mkdir($save_path);
        }
        // The path were we will save the file (getcwd() may not be reliable and should be tested in your environment)
        $upload_name = "Filedata";
        $max_file_size_in_bytes = 1000 * 1024 * 1024;// 
        $extension_whitelist = array('jpg', 'jpeg', 'png');// Allowed file extensions

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
            echo 7;
           
        } else{
                echo ltrim($save_path."/".$file_name,'.');
        }
        exit(0);
    }
}
