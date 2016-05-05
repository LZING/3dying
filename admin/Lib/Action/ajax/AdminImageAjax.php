<?php
/**
 * @author zzq
 */
require_once MYROOT . '/Lib/Action/ajax/AdminAjaxBase.php';

class AdminImageAjax extends AdminAjaxBase {

    public function init() {
        parent::init();
    }
    /**
     * @brief 图片删除
     */
    public function delete() {
        $id     = intval($_POST['id']);
        parent::delete('ImagesModel', $id);
    }
    /**
     * @brief 添加类别
     */
    public function addType() {
        
        $name  = htmlspecialchars($_POST['name']);
        
        if (trim($name) == "") {
            echo json_encode(array('error' => 1, 'message' => '填写类别名字'));
        } else {
            if (ImagesModel::addImageType($name)) {
                echo json_encode(array('error' => 0, 'message' => ''));
            } else {
                echo json_encode(array('error' => 1, 'message' => '添加失败'));
            }
        }
        exit();
    }
    /**
     * @brief 删除类别
     */
    public function delType() {
        
        $id = intval($_POST['typeID']);
        if (ImagesModel::delImageType($id)) {
            echo json_encode(array('error' => 0, 'message' => ''));
        } else {
            echo json_encode(array('error' => 1, 'message' => '删除失败'));
        }
        exit();
    }
    /**
     * @brief 修改分类
     */
    public function editType() {
        $id   = intval($_POST['typeId']);
        $name = htmlspecialchars($_POST['name']);
        if (ImagesModel::editImageType($id, $name)) {
            echo json_encode(array('error' => 0, 'message' => ''));
        } else {
            echo json_encode(array('error' => 1, 'message' => '删除失败'));
        }
        exit();
    }
    /**
     * @brief 封面设置
     */
    public function coverImage() {
        $id = intval($_POST['id']);
        if (ImagesModel::coverImageType($id)) {
            echo json_encode(array('error' => 0, 'message' => ''));exit();
        }
        echo json_encode(array('error' => 1, 'message' => '删设置失败'));exit();
    }
    /**
     * @brief 置顶
     */
    public function setUpImage() {
        $id = intval($_POST['id']);
        if (ImagesModel::setUpImage($id)) {
            echo json_encode(array('error' => 0, 'message' => ''));exit();
        }
        echo json_encode(array('error' => 1, 'message' => '操作失败'));exit();
    }
}