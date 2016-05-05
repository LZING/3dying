<?php
/**
 * @brief 文件上传
 * Enter description here ...
 * @author zzq
 *
 */
class FileConf {
    public static $MAX_ALLOW_SIZE     = 5;//文件最大 M
    public static $SWF_MAX_ALLOW_SIZE = 150;
    public static $ALLOW_TYPE         = array('zip', 'rar', '7z', 'flv', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt', 'xls', 'xlsx');
    public static $SAVE_PATH          = 'upload/files';
}