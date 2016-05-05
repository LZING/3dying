<?php
/**
* �ļ����䣬֧�ֶϵ���
* 2g���ϳ����ļ�Ҳ��Ч
* ���������⣺
*1��û�йر����ѹ����������壨�Զ����壩��magic_quotes�����ֲ����ۣ���
**3��ob_flushʹ����ȱ�ݣ�������δ�򿪣�δ������ʹ��ob_flush�����档
4��RANGE��ȡ�ĸ�ʽ��ȫ���ο�rtf�ĵ�:http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35��
5�����ǰ�������л�������Ҳ���б�Ҫ�ġ�
6��flush ��  ob_flush�Ƿ��ģ���������������Ч��������֤����
* @author MoXie
*/
class Transfer {
    /**
     * ���嵥Ԫ
     */
    const BUFF_SIZE = 5120; // 1024 * 5
    /**
     * �ļ���ַ
     * @var <String>
     */
    private $filePath;
    /**
     * �ļ���С
     * @var <String> Php�������� �ַ���ʽ����
     */
    private $fileName;
    
    private $fileSize;
    /**
     * �ļ�����
     * @var <String>
     */
    private $mimeType;
    /**
     * �������򣨷�Χ��
     * @var <String>
     */
    private $range;
    /**
     * �Ƿ�д����־
     * @var <Boolean>
     */
    private $isLog = false;
    /**
     *
     * @param <String> $filePath �ļ�·��
     * @param <String> $mimeType  �ļ�����
     * @param <String> $range �������򣨷�Χ��
     */
    function __construct($filePath, $fileName , $mimeType = null , $range = null) {
        $this->filePath = $filePath;
        $this->fileName = $fileName;
        $this->fileSize = sprintf('%u',filesize($filePath));
        $this->mimeType = ($mimeType != null)?$mimeType:"application/octet-stream"; //  bin
        $this->range = trim($range);
    }
    /**
     *  ��ȡ�ļ�����
     * @return <Map> {'start':long,'end':long} or null
     */
    private function getRange() {
        /**
         *  Range: bytes=-128
         *  Range: bytes=-128
         *  Range: bytes=28-175,382-399,510-541,644-744,977-980
         *  Range: bytes=28-175\n380
         *  type 1
         *  RANGE: bytes=1000-9999
         *  RANGE: bytes=2000-9999
         *  type 2
         *  RANGE: bytes=1000-1999
         *  RANGE: bytes=2000-2999
         *  RANGE: bytes=3000-3999
         */
        if (!empty($this->range)) {
            $range = preg_replace('/[\s|,].*/','',$this->range);
            $range = explode('-',substr($range,6));
            if (count($range) < 2 ) {
                $range[1] = $this->fileSize; // Range: bytes=-100
            }
            $range = array_combine(array('start','end'),$range);
            if (empty($range['start'])) {
                $range['start'] = 0;
            }
            if (!isset ($range['end']) || empty($range['end'])) {
                $range['end'] = $this->fileSize;
            }
            return $range;
        }
        return null;
    }
    /**
     * ��ͻ��˷����ļ�
     */
    
    public function send() {
        $fileHande = fopen($this->filePath, 'rb');
        if ($fileHande) {
            // setting
            ob_end_clean();// clean cache
            ob_start();
            ini_set('output_buffering', 'Off');
            ini_set('zlib.output_compression', 'Off');
            $magicQuotes = get_magic_quotes_gpc();

            // init
            $lastModified = gmdate('D, d M Y H:i:s', filemtime($this->filePath)).' GMT';
            $etag = sprintf('w/"%s:%s"',md5($lastModified),$this->fileSize);
            $ranges = $this->getRange();
            // headers
            header(sprintf('Last-Modified: %s',$lastModified));
            header(sprintf('ETag: %s',$etag));
            header(sprintf('Content-Type: %s',$this->mimeType));
            
            $disposition = 'attachment';
            if (strpos($this->mimeType,'image/') !== FALSE) {
                $disposition = 'inline';
            }
            header(sprintf('Content-Disposition: %s; filename="%s"',$disposition,$this->fileName));

            if ($ranges != null) {
                if ($this->isLog) {
                    $this->log(json_encode($ranges).' '.$_SERVER['HTTP_RANGE']);
                }
                header('HTTP/1.1 206 Partial Content');
                header('Accept-Ranges: bytes');
                header(sprintf('Content-Length: %u',$ranges['end'] - $ranges['start']));
                header(sprintf('Content-Range: bytes %s-%s/%s', $ranges['start'], $ranges['end'],$this->fileSize));
                //
                fseek($fileHande, sprintf('%u',$ranges['start']));
            }else {
                header("HTTP/1.1 200 OK");
                header(sprintf('Content-Length: %s',$this->fileSize));
            }
            // read file
            //$lastSize = 0;
            while(!feof($fileHande) && !connection_aborted()) {
               // $lastSize = sprintf("%u", bcsub($this->fileSize,sprintf("%u",ftell($fileHande))));
                //if (bccomp($lastSize,self::BUFF_SIZE) > 0) {
                  //  $lastSize = self::BUFF_SIZE;
                //}
                echo fread($fileHande, 1024);
                ob_flush();
                flush();
                usleep(400);
            }
            
            ob_end_flush();
        }
        if ($fileHande != null) {
            fclose($fileHande);
        }
        
    }
    /**
     * ���ü�¼
     * @param <Boolean> $isLog  �Ƿ��¼
     */
    public function setIsLog($isLog = true) {
        $this->isLog = $isLog;
    }
    /**
     * ��¼
     * @param <String> $msg  ��¼��Ϣ
     */
    private function log($msg) {
        try {
            $handle = fopen('transfer_log.txt', 'a');
            fwrite($handle, sprintf('%s : %s'.PHP_EOL,date('Y-m-d H:i:s'),$msg));
            fclose($handle);
        }catch(Exception $e) {
            // null;
        }
    }
}
    
?>