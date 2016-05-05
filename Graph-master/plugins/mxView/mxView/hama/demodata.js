/**
 * Created by leiting on 14/9/2.
 */
(function (arg){
    var self = arg;
    var msg = {};
    msg.TotalExecRate = "0.71";
    msg.severExecRate = [{"83.25.78.88":"0.98"},{"83.25.78.89":"0.24"},{"83.25.62.10":"0.35"},{"83.25.62.14":"0.99"}];
    msg.serviceFlag = [{"83.25.78.88":"1"},{"83.25.78.89":"-1"},{"83.25.62.10":"0"},{"83.25.62.14":"1"}];
    msg.ServersScriptsInfo = {
            "83.25.78.88": [
                {
                    "operStep": "1",
                    "parallelStep": "6",
                    "scripts": [
                        {
                            "scriptStep": "2",
                            "scriptID": "325",
                            "nickName": "[同城]检查备异步应用服务器IHS(A)",
                            "fileName": "check_ihs_on_standby.sh",
                            "isBatch": "0",
                            "status": "2",
                            "flag": "2",
                            "startTime": "2014-08-27 08:54:33.0",
                            "endTime": "2014-08-27 08:54:36.0",
                            "execTime": "3"
                        },
                        {
                            "scriptStep": "4",
                            "scriptID": "324",
                            "nickName": "[同城]检查备异步应用服务器WAS(A)",
                            "fileName": "check_was_on_standby.sh",
                            "isBatch": "0",
                            "status": "3",
                            "flag": "2",
                            "startTime": "2014-08-27 08:54:38.0",
                            "endTime": "2014-08-27 08:54:41.0",
                            "execTime": "3"
                        }
                    ]
                },
                {
                    "operStep": "2",
                    "parallelStep": "9",
                    "scripts": [
                        {
                            "scriptStep": "4",
                            "scriptID": "1110",
                            "nickName": "[所有]查看SUSE多路径软件状态(A)",
                            "fileName": "check_dlm_suse.sh",
                            "isBatch": "0",
                            "status": "1",
                            "flag": "2",
                            "startTime": null,
                            "endTime": null,
                            "execTime": "0"
                        }
                    ]
                },
                {
                    "operStep": "3",
                    "parallelStep": "10",
                    "scripts": [
                        {
                            "scriptStep": "2",
                            "scriptID": "129",
                            "nickName": "[所有]NFS Client端信息收集(A)",
                            "fileName": "nfs_info_client_suse.sh",
                            "isBatch": "0",
                            "status": "0",
                            "flag": "2",
                            "startTime": null,
                            "endTime": null,
                            "execTime": "0"
                        }
                    ]
                }
        ],
        "83.25.78.89": [
            {
                "operStep": "1",
                "parallelStep": "6",
                "scripts": [
                    {
                        "scriptStep": "2",
                        "scriptID": "325",
                        "nickName": "[同城]检查备异步应用服务器IHS(B)",
                        "fileName": "check_ihs_on_standby.sh",
                        "isBatch": "0",
                        "status": "3",
                        "flag": "2",
                        "startTime": "2014-08-27 08:54:33.0",
                        "endTime": "2014-08-27 08:54:36.0",
                        "execTime": "3"
                    },
                    {
                        "scriptStep": "4",
                        "scriptID": "324",
                        "nickName": "[同城]检查备异步应用服务器WAS(B)",
                        "fileName": "check_was_on_standby.sh",
                        "isBatch": "0",
                        "status": "3",
                        "flag": "2",
                        "startTime": "2014-08-27 08:54:38.0",
                        "endTime": "2014-08-27 08:54:41.0",
                        "execTime": "3"
                    }
                ]
            },
            {
                "operStep": "2",
                "parallelStep": "9",
                "scripts": [
                    {
                        "scriptStep": "4",
                        "scriptID": "1110",
                        "nickName": "[所有]查看SUSE多路径软件状态(B)",
                        "fileName": "check_dlm_suse.sh",
                        "isBatch": "0",
                        "status": "0",
                        "flag": "2",
                        "startTime": null,
                        "endTime": null,
                        "execTime": "0"
                    }
                ]
            },
            {
                "operStep": "3",
                "parallelStep": "10",
                "scripts": [
                    {
                        "scriptStep": "2",
                        "scriptID": "129",
                        "nickName": "[所有]NFS Client端信息收集(B)",
                        "fileName": "nfs_info_client_suse.sh",
                        "isBatch": "0",
                        "status": "0",
                        "flag": "2",
                        "startTime": null,
                        "endTime": null,
                        "execTime": "0"
                    }
                ]
            }
        ]
    };

    setInterval(function () {
        msg.TotalExecRate = Math.floor((Math.random() * 1)*100) + "";
        for(var i = 0 ; i < msg.severExecRate.length ; i++){
            for(var key in msg.severExecRate[i]){
                msg.severExecRate[i][key] = Math.floor((Math.random() * 1)*100) + "";
                msg.serviceFlag[i][key] = Math.floor(Math.random() * 3);
            }
        }
    },1000);

    self.gethamaData= function (fun) {
        if(typeof fun === "function"){
            setTimeout(function () {
                fun(msg);
            });
        }
    };

})(nameSpace.reg("mmdb.hamadata"));