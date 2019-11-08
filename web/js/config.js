const globalVar = {
    chunkSize: 100 * 1048576, //100 mb
    chs: /zh-cn|zh-hans|zh-hans-cn/i.test(navigator.language),//has zn
    title: document.title,
    zh: navigator.language.indexOf("zh") !== -1,//has tw

};
const Utils = {
    toastBottom: function (content, duration, color) {
        const that = this;
        var newDiv = document.createElement("div");
        newDiv.classList.add("notificationBar");
        if (!duration && duration !== false) {
            duration = 3000;
        }
        newDiv.innerText = content;
        newDiv.onclick = function () {
            that.clearClass("notificationBar");
        };
        switch (color) {
            case "error":
                newDiv.style.backgroundColor = "red";
                break;
            default:
                break;
        }
        document.body.appendChild(newDiv);
        setTimeout(function () {
            newDiv.style.bottom = "0px";
            if (duration) {
                setTimeout(function () {
                    newDiv.style.bottom = "-50px";
                    setTimeout(function () {
                        that.clearClass("notificationBar");
                    }, 250);
                }, duration);
            }
        }, 25);
    },
    id: function (elementId) {
        return document.getElementById(elementId);
    },
    multilang: function (json) {
        if (globalVar.chs) {
            return json["zh-CN"];
        } else if (globalVar.zh) {
            return json["zh-TW"];
        } else {
            return json["en-US"];
        }
    },
    clearClass: function (className) {
        var elements = document.getElementsByClassName(className);
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentElement.removeChild(elements[i]);
        }
    },
    showPopup: function (html, elementId, parentId, animation) {
        const that = this;
        console.log(elementId,!that.id(elementId),parentId,!that.id(parentId),animation);
        if (!that.id(parentId)) {
            that.clearClass("popup-menu");
            var newParent = document.createElement("div");
            newParent.classList.add("popUp");
            newParent.id = parentId;
            if (!elementId) {
                newParent.innerHTML = html.join("");
            }
            mainBox.style.opacity = "0";
            document.body.appendChild(newParent);
            setTimeout(function () {
                newParent.style.opacity = "1";
                if (animation == "rebound") {
                    newParent.style.transform = "scale(1.05)";
                }
            }, 250);
            if (animation == "rebound") {
                setTimeout(function () {
                    newParent.style.transform = "scale(1)";
                }, 500);
            }
        }
        if (elementId && !that.id(elementId)) {
            var newDiv = document.createElement("div");
            newDiv.id = elementId;
            newDiv.innerHTML = html.join("");
            switch (animation) {
                case "slideInFromLeft":
                    newDiv.classList.add("slideInFromLeft");
                    that.id(parentId).appendChild(newDiv);
                    setTimeout(function () {
                        that.id(parentId).childNodes[that.id(parentId).childElementCount - 2].style.left = "500px";
                        newDiv.style.left = "0px";
                    }, 25);
                    break;
                case "slideInFromRight":
                    newDiv.classList.add("slideInFromRight");
                    that.id(parentId).appendChild(newDiv);
                    setTimeout(function () {
                        that.id(parentId).childNodes[that.id(parentId).childElementCount - 2].style.left = "-500px";
                        newDiv.style.left = "0px";
                    }, 25);
                    break;
                default:
                    newDiv.classList.add("popUpBox");
                    that.id(parentId).appendChild(newDiv);
                    break;
            }
        }
    },
    getPostData: function (data) {
        var formData = new FormData();
        for (var key in data) {
            if (data[key]) {
                formData.append(key, data[key]);
            }
        }
        return {
            "body": formData,
            "method": "POST",
            "headers": {
                "Authorization": "Bearer " + window.appToken
            },
            // 'mode': 'no-cors'
            credentials: 'same-origin',
        };
    },
    loadServerList: function (auto) {
        window.fileBackend = window.servers[auto].host + window.apiVersion + "/upload";
        Object.keys(window.servers).forEach(function (key) {
            var newA = document.createElement("a");
            var newTick = document.createElement("span");
            var newName = document.createElement("span");
            newA.classList.add("menuItem");
            newA.id = key;
            newA.onclick = function () {
                if (!window.currentExpTime && window.servers[this.id].premium) {
                    notify(Utils.multilang({
                        "en-US": "This server is for premium account users only.",
                        "zh-CN": "此服务器仅限高级账号用户使用。",
                        "zh-TW": "此伺服器僅限高級賬號用戶使用。"
                    }));
                    if (!login.username) {
                        menuItemLogin.click();
                    }
                } else {
                    window.fileBackend = window.servers[this.id].host + window.apiVersion + "/upload";
                    // console.log(window.fileBackend, "sdsd")
                    var tick = document.getElementsByClassName("tick");
                    for (var i = 0; i < tick.length; i++) {
                        if (tick[i].parentElement == this) {
                            tick[i].style.opacity = "1";
                        } else {
                            tick[i].style.opacity = "0";
                        }
                    }
                }
                closeMenu();
            };
            newTick.classList.add("tick");
            if (key == auto) {
                newTick.style.opacity = "1";
            }
            newName.innerText = window.servers[key].name;
            newA.appendChild(newTick);
            newA.appendChild(newName);
            menuServers.appendChild(newA);
        });
    },
    notify: function (content, duration) {
        this.toastBottom(content, duration, "")
    },
    notifyError: function (content, duration) {
        this.toastBottom(content, duration, "red")
    }
};


const WeDrop = {
    init: function () {
        let that = this;
        window.login = {
            'email': '',
            'token': '',
            'username': ''
        };
        if (login.username && typeof loggedIn == 'function')
            loggedIn();
        window.info = {
            "currency": "¥",
            "price": {
                "one": {
                    "price": 10,
                    "specialPrice": 10,
                    "cny": 10
                },
                "three": {
                    "price": 30,
                    "specialPrice": 30,
                    "cny": 30
                },
                "twelve": {
                    "price": 120,
                    "specialPrice": 72,
                    "cny": 72
                }
            },
            "promotion": "一年的高级账号现在六折优惠",
            "privileges": "批量上传文件\n上传文件夹\n上传大于 1 GB 的文件\n发送文本\n更多的可下载次数\n切换到其它服务器"
        };
        window.servers = {
            "Local": {
                "host": window.serverApi,
                "name": "本地服务器",
                "premium": false

            },

        };
        Utils.loadServerList('Local');


        function logOut() {
            fetch('https://api.rthsoftware.cn/backend/logout?token=' + login.token).then(function (response) {
                if (response.ok || response.status == 200) {
                    localStorage.removeItem('Email');
                    localStorage.removeItem('Token');
                    localStorage.removeItem('Username');
                    if (typeof loggedOut == 'function')
                        loggedOut();
                    location.reload();
                }
            });
        }

        addEventListener('message', function (e) {
            try {
                login = JSON.parse(atob(e.data));
                if (typeof loggedIn == 'function')
                    loggedIn(true);
            } catch (e) {
            }
        });


    },
    //load serverconfig


};
const UploadFunc={
    initUploader:function(){
        let uploader = new plupload.Uploader({
            "runtimes": "html5",
            "browse_button": "send",
            "drop_element": "send",
            "url": window.fileBackend,
            "chunk_size": globalVar.chunkSize,
            headers: {
                "Authorization": "Bearer " + window.appToken
            },
            init: {
                "FilesAdded": function (up, files) {
                    // console.log("up in filesadd", up,this,uploader);
                    const that = this;
                    var btnCloseId = "btnClose" + new Date().getTime();
                    Utils.showPopup([
                        '<span class="btnClose" id="' + btnCloseId + '"></span>',
                        '<p id="filesSelected" class="p1" style="margin-top: -10px;"></p>',
                        '<p id="filesTip" style="margin-top: -10px;"></p>',
                        '<div id="selectedFileList" class="fileList"></div>',
                        '<table class="tableUploadSettings">',
                        '<tbody>',
                        '<tr>',
                        '<td>',
                        '<label id="lblFilePsw" for="inputFilePsw"></label>',
                        '</td>',
                        '<td>',
                        '<input id="inputFilePsw" autocomplete="off">',
                        '</td>',
                        '</tr>',
                        '<tr>',
                        '<td>',
                        '<label id="lblMaxDl" for="inputMaxDl"></label>',
                        '</td>',
                        '<td>',
                        '<input id="inputMaxDl" type="number" autocomplete="off">',
                        '</td>',
                        '</tr>',
                        '</tbody>',
                        '</table>',
                        '<button class="btn1" id="btnUpload"></button>'
                    ], "uploadList", "popSend", "rebound");
                    Utils.id(btnCloseId).onclick = function () {
                        uploader.splice();
                        closePopup("popSend");
                    };
                    Utils.id("filesSelected").innerText = Utils.multilang({
                        "en-US": "You selected these files",
                        "zh-CN": "您选择了这些文件",
                        "zh-TW": "您選擇了這些檔案"
                    });
                    Utils.id("filesTip").innerText = login.email || Utils.multilang({
                        "en-US": "Not Logged In",
                        "zh-CN": "未登录",
                        "zh-TW": "未登入"
                    });
                    plupload.each(files, function (file) {
                        var newA = document.createElement("a");
                        newA.classList.add("menu");
                        newA.innerText = file.name;
                        Utils.id("selectedFileList").appendChild(newA);
                    });
                    Utils.id("lblFilePsw").innerText = Utils.multilang({
                        "en-US": "Password",
                        "zh-CN": "密码",
                        "zh-TW": "密碼"
                    });
                    Utils.id("inputFilePsw").placeholder = Utils.multilang({
                        "en-US": "Password for files (Optional)",
                        "zh-CN": "为文件设置下载密码，可留空",
                        "zh-TW": "為檔案設定下載密碼，可留空"
                    });
                    Utils.id("lblMaxDl").innerText = Utils.multilang({
                        "en-US": "Maximum Downloads",
                        "zh-CN": "可下载次数",
                        "zh-TW": "可下載次數"
                    });
                    Utils.id("inputMaxDl").value = files.length + 1;
                    Utils.id("btnUpload").innerText = Utils.multilang({
                        "en-US": "Upload",
                        "zh-CN": "上传",
                        "zh-TW": "上載"
                    });
                    Utils.id("btnUpload").onclick = function () {
                        window.chunk = 1;
                        window.fileCount = files.length;
                        window.fileDone = 0;
                        var downloads = Utils.id("inputMaxDl").value;
                        if (!downloads || parseInt(downloads) < 1) {
                            downloads = window.fileCount + 1;
                        }
                        // console.log("before");
                        UploadFunc.upload(up, files, {
                            "downloads": downloads,
                            "password": Utils.id("inputFilePsw").value
                        });
                        // console.log("end");
                    };
                },
                "BeforeUpload": function (up, file) {
                    window.option["multipart_params"]["key"] = window.uploadCode + "/" + window.key + "/1/" + file.name;
                    up.setOption(window.option);
                },
                "UploadProgress": function (up, file) {
                    var percent = file.percent;
                    if (percent > 99) {
                        percent = 99;
                    }
                    Utils.id("progressBarBg0").style.background = "rgba(0,0,0,0.1)";
                    document.title = "[" + percent + "%] " + globalVar.title;
                    if (percent == 99) {
                        Utils.id("lblUploadP").innerText = Utils.multilang({
                            "en-US": "Almost there",
                            "zh-CN": "马上就好",
                            "zh-TW": "馬上就好"
                        }) + " (" + (window.fileDone + 1) + "/" + window.fileCount + ")";
                    } else {
                        Utils.id("lblUploadP").innerText = Utils.multilang({
                            "en-US": "Uploading",
                            "zh-CN": "正在上传",
                            "zh-TW": "正在上載"
                        }) + " " + file.name + " " + percent + "%";
                    }
                    Utils.id("progressBar0").style.width = percent + "px";
                },
                "ChunkUploaded": function (up, file) {
                    window.chunk++;
                    window.option["multipart_params"]["key"] = window.uploadCode + "/" + window.key + "/" + window.chunk + "/" + file.name;
                    up.setOption(window.option);
                },
                "FileUploaded": function () {
                    window.fileDone++;
                    if (window.fileDone >= window.fileCount) {
                        UploadFunc.uploadSuccess(window.uploadCode);
                    }
                },
                "Error": function (up, err) {
                    console.log("Error", up, err);
                    console.error(err.response);
                }
            },

        });
        return uploader
    },
    upload: function (up, files, config) {
        let upload = up;
        if (config.password) {
            config.password = MD5(config.password);
        }
        fetch(window.serverApi + window.apiVersion + "/getCode", Utils.getPostData({
            "chunksize": globalVar.chunkSize,
            "downloads": config.downloads,
            "host": window.fileBackend,
            "info": JSON.stringify(files),
            "password": config.password,
            "token": login.token,
            "username": login.username
        })).then(function (response) {
            if (response.ok || response.status === 200) {
                return response.json();
            } else {
                error(response);
            }
        }).then(function (data) {
            if (data.status === 0) {
                data = data.data;
            }

            if (data) {
                if (data.alert) {
                    alert(data.alert);
                    Utils.id("inputMaxDl").value = window.fileCount + 1;
                    if (!login.username) {
                        menuItemLogin.click();
                    }
                } else {
                    window.key = data.key;
                    window.uploadCode = data.code;
                    document.title = "[" + Utils.multilang({
                        "en-US": "Uploading",
                        "zh-CN": "正在上传",
                        "zh-TW": "正在上載"
                    }) + "] " + globalVar.title;
                    Utils.showPopup([
                        '<p class="p1" id="lblUploadP"></p>',
                        '<span class="progressBar" id="progressBarBg0"></span>',
                        '<span class="progressBar" id="progressBar0"></span>'
                    ], "sendBox0", "popSend", "slideInFromRight");
                    Utils.id("lblUploadP").innerText = Utils.multilang({
                        "en-US": "Uploading...",
                        "zh-CN": "正在上传……",
                        "zh-TW": "正在上載……"
                    });
                    window.option = {
                        "multipart_params": {
                            "policy": data.policy,
                            "OSSAccessKeyId": data.accessid,
                            "success_action_status": "200",
                            "signature": data.signature
                        }
                    };
                    // console.log("before");
                    upload.start();
                    // console.log("end");
                }
            }
        });
    },
    uploadSuccess: function (code) {
        var url = "https://" + code + ".airportal.cn/";
        document.title = "[取件码 " + code + "] " + globalVar.title;
        Utils.showPopup([
            '<p id="sentSuccessfully" class="p1"></p>',
            '<p id="yourCode"></p>',
            '<p id="recvCode"></p>',
            '<p id="whenReceving"></p>',
            '<p id="otherWays">' + Utils.multilang({
                "en-US": 'You can also<a class="link1" id="copyLink">copy the download link</a>or<a class="link1" id="viewQRC">scan the QR code to download</a>.',
                "zh-CN": '您也可以<a class="link1" id="copyLink">复制下载链接</a>或<a class="link1" id="viewQRC">直接扫描二维码下载</a>。',
                "zh-TW": '您也可以<a class="link1" id="copyLink">複製下載連結</a>或<a class="link1" id="viewQRC">直接掃描 QR 碼下載</a>。'
            }) + '</p>',
            '<button class="btn1" id="btnDone0"></button>'
        ], "sendBox1", "popSend", "slideInFromRight");
        Utils.id("sentSuccessfully").innerText = Utils.multilang({
            "en-US": "File is sent successfully.",
            "zh-CN": "文件已成功传送。",
            "zh-TW": "檔案已成功傳送。"
        });
        Utils.id("yourCode").innerText = Utils.multilang({
            "en-US": "Your Code (Expires in 1 Day):",
            "zh-CN": "您的取件码（1天内有效）：",
            "zh-TW": "您的取件碼（1天內有效）："
        });
        Utils.id("recvCode").innerText = code;
        Utils.id("whenReceving").innerText = Utils.multilang({
            "en-US": "When receving files, please enter this code.",
            "zh-CN": "接收文件时，请输入该" + code.toString().length + "位数取件码。",
            "zh-TW": "接收檔案時，請輸入該" + code.toString().length + "位數取件碼。"
        });
        Utils.id("viewQRC").style.marginRight = "0px";
        Utils.id("btnDone0").innerText = Utils.multilang({
            "en-US": "Done",
            "zh-CN": "完成",
            "zh-TW": "完成"
        });
        copyLink.onclick = function () {
            if ("clipboard" in navigator) {
                navigator.clipboard.writeText(url).then(function () {
                    Utils.notify(Utils.multilang({
                        "en-US": "The download link is copied to the clipboard.",
                        "zh-CN": "下载链接已复制到剪贴板。",
                        "zh-TW": "下載連結已複製到剪貼簿。"
                    }));
                });
            } else {
                prompt(Utils.multilang({
                    "en-US": "Your browser does not support the clipboard API. Please copy it manually.",
                    "zh-CN": "您的浏览器不支持剪贴板功能。请手动复制。",
                    "zh-TW": "您的瀏覽器不支援剪貼簿功能。請手動複製。"
                }), url);
            }
        };
        viewQRC.onclick = function () {
            Utils.showPopup([
                '<div id="QRBox"></div>',
                '<span class="btnBack" id="btnBackQRC"></span>'
            ], "sendBox2", "popSend", "slideInFromRight");
            var qrcode = new Image(200, 200);
            qrcode.src = getQRCode(url);
            Utils.id("QRBox").appendChild(qrcode);
            Utils.id("btnBackQRC").onclick = function () {
                closePopup("sendBox2", "slideOut");
            };
        };
        btnDone0.onclick = function () {
            document.title = window.title;
            closePopup("popSend");
            var popRecvCode = document.createElement("div");
            popRecvCode.classList.add("popRecvCode");
            popRecvCode.innerText = code;
            document.body.appendChild(popRecvCode);
            popRecvCode.style.right = "calc(50% - " + (popRecvCode.offsetWidth / 2) + "px)";
            setTimeout(function () {
                popRecvCode.style.transform = "scale(0.5,0.5)";
            }, 500);
            setTimeout(function () {
                popRecvCode.style.right = "-" + (popRecvCode.offsetWidth * 0.3 - 30) + "px";
                popRecvCode.style.top = "0px";
            }, 750);
            setTimeout(function () {
                popRecvCode.style.transformOrigin = "65% 50%";
                popRecvCode.style.transform = "scale(0,0)";
            }, 1750);
            setTimeout(function () {
                popRecvCode.style.opacity = "0";
                setTimeout(function () {
                    popRecvCode.style.display = "none";
                    popRecvCode.parentElement.removeChild(popRecvCode);
                }, 250);
            }, 2250);
        };
    }
};



(function () {
    window.serverApi = "http://127.0.0.1:8080/api";
    uploader={};
    fetch(window.serverApi + "/common/loadconfig", {method: "POST"}).then(function (res) {
        if (res.ok || res.status === 200) {
            return res.json()
        }
    }).then(function (data) {
        if (data.status > -1) {
            data = data.data;
            window.appName = data.AppName;
            window.apiVersion = "/" + data.apiVersion;
            window.appToken = data.token;
            WeDrop.init();
            uploader = UploadFunc.initUploader();
            uploader.init();
            // console.log(window.fileBackend);
            // console.log(uploader)

        } else {
            Utils.notifyError("网络错误，连接不上服务器！");
        }
    });

})();

inputFile.onchange=function(){
    uploader.addFile(this);
};