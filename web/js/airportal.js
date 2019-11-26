var version = "19w44a";
var $_GET = (function () {
    var json = {};
    if (location.search) {
        var parameters = location.search.replace("?", "").split("&");
        for (var i = 0; i < parameters.length; i++) {
            var split = parameters[i].split("=");
            json[split[0]] = decodeURIComponent(split[1]);
        }
    }
    return json;
})();
var chs = /zh-cn|zh-hans|zh-hans-cn/i.test(navigator.language);
var chunkSize = 100 * 1048576; //100 mb
var firstRun = JSON.parse(localStorage.getItem("firstRun"));
var invalidAttempt = 0;
var isAndroid = /Android/i.test(navigator.userAgent);
var isiOS = /iPhone|iPad/i.test(navigator.userAgent);
var isMobile = isAndroid || isiOS;
var orderSubmitted = localStorage.getItem("orderSubmitted");
var settings = {};
var title = document.title;
var zh = navigator.language.indexOf("zh") != -1;
try { //set language
    if (!chs) {
        var mrxLink = document.createElement("a");
        mrxLink.classList.add("link1");
        mrxLink.href = "https://www.maorx.cn/";
        var yszLink = document.createElement("a");
        yszLink.classList.add("link1");
        yszLink.href = "https://www.yangshangzhen.com/";
        mrxLink.target = yszLink.target = "_blank";
        if (!zh) {
            document.getElementsByTagName("html")[0].lang = "en-US";
            send.innerText = "Send";
            receive.innerText = "Receive";
            privacyPolicy.innerText = "Privacy Policy";
            footerR.innerHTML = "Developed by ";
            mrxLink.innerText = "Ruoxin Mao";
            footerR.appendChild(mrxLink);
            footerR.innerHTML += " and ";
            yszLink.innerText = "Shangzhen Yang";
            footerR.appendChild(yszLink);
            footerR.innerHTML += ".<br>All rights reserved.";
            menuItemLogin.innerText = "Login";
            menuItemHistory.innerText = "History";
            menuItemSettings.innerText = "Settings";
            menuItemFeedback.innerText = "Contact Us";
            nameSelectServer.innerText = "Select Server";
        } else {
            document.getElementsByTagName("html")[0].lang = "zh-TW";
            send.innerText = "傳送";
            receive.innerText = "接收";
            privacyPolicy.innerText = "隱私政策";
            footerR.innerHTML = "由 ";
            mrxLink.innerText = "毛若昕";
            footerR.appendChild(mrxLink);
            footerR.innerHTML += " 和 ";
            yszLink.innerText = "楊尚臻";
            footerR.appendChild(yszLink);
            footerR.innerHTML += " 聯合開發。保留所有權利。";
            menuItemLogin.innerText = "登入";
            menuItemHistory.innerText = "歷史記錄";
            menuItemSettings.innerText = "設定";
            menuItemFeedback.innerText = "聯繫我們";
            nameSelectServer.innerText = "選擇伺服器";
        }
    }
} catch (e) {
    console.error(e);
}
if (!firstRun || firstRun[version] === undefined) {
    firstRun = {};
}
if (firstRun[version] !== false) {
    firstRun[version] = false;
    localStorage.setItem("firstRun", JSON.stringify(firstRun));
    firstRun = true;
}

function btnPay0State() {
    if (document.getElementsByClassName("selected").length == 2) {
        btnPay0.style.pointerEvents = "auto";
        btnPay0.style.opacity = "1";
    } else {
        btnPay0.style.pointerEvents = "none";
        btnPay0.style.opacity = "0.5";
    }
}

function clearClass(className) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].parentElement.removeChild(elements[i]);
    }
}

function closeMenu() {
    mask.style.display = "none";
    if (document.getElementsByClassName("popup-menu")[0]) {
        document.getElementsByClassName("popup-menu")[0].style.opacity = "0";
        setTimeout(function () {
            clearClass("popup-menu");
        }, 250);
    } else {
        menu.style.opacity = "0";
        setTimeout(function () {
            menu.style.display = "none";
        }, 250);
    }
}

function closePopup(elementId, animation) {
    if (id(elementId)) {
        switch (animation) {
            case "slideOut":
                id(elementId).parentElement.childNodes[id(elementId).parentElement.childElementCount - 2].style.left = "0px";
                id(elementId).style.left = "";
                break;
            default:
                id(elementId).style.opacity = "";
                if (document.getElementsByClassName("popUp").length <= 1) {
                    mainBox.style.opacity = "";
                }
                break;
        }
        setTimeout(function () {
            id(elementId).style.display = "none";
            id(elementId).parentElement.removeChild(id(elementId));
        }, 250);
    }
}

function downloadFile(fileInfo) {
    if (fileInfo.download.length > 1) {
        showPopup([
            '<p id="prefetching" class="p1" style="padding-top: 20px;"></p>',
            '<p class="p3" id="lblDownloadP1" style="padding-top: 30px;"></p>',
            '<span class="progressBar" id="progressBarBg1"></span>',
            '<span class="progressBar" id="progressBar1"></span>',
            '<p class="p3" id="lblDownloadP2" style="padding-top: 30px;"></p>',
            '<span class="progressBar" id="progressBarBg2"></span>',
            '<span class="progressBar" id="progressBar2"></span>',
            '<div class="dlTipBox">',
            '<p id="dlTip0"></p>',
            '<p id="dlTip1"></p>',
            '</div>'
        ], "recvBox2", "popRecv", "slideInFromRight");
        id("prefetching").innerText = multilang({
            "en-US": "Prefetching files from the server",
            "zh-CN": "正在从服务器预读取文件",
            "zh-TW": "正在從伺服器預讀取檔案"
        });
        id("lblDownloadP1").innerText = multilang({
            "en-US": "Downloading File Slices",
            "zh-CN": "下载文件碎片中",
            "zh-TW": "下載檔案碎片中"
        });
        id("lblDownloadP2").innerText = multilang({
            "en-US": "Total Progress",
            "zh-CN": "总下载进度",
            "zh-TW": "總下載進度"
        });
        id("dlTip0").innerText = multilang({
            "en-US": "If the download fails, please try again with Chrome or Firefox",
            "zh-CN": "如无法下载，请使用Chrome或Firefox浏览器重试",
            "zh-TW": "如無法下載，請使用Chrome或Firefox瀏覽器重試"
        });
        id("dlTip1").innerText = multilang({
            "en-US": "Once the fetching is complete, the file will be saved to your device immediately",
            "zh-CN": "读取完成后，文件会立即被保存到您的设备上",
            "zh-TW": "讀取完成后，檔案會立即被保存到您的裝置上"
        });
        var intervalId = setInterval(function () {
            if (id("dlTip0").style.marginTop == "0px") {
                id("dlTip0").style.marginTop = "-20px";
                id("dlTip1").style.marginTop = "-10px";
            } else {
                id("dlTip0").style.marginTop = "0px";
                id("dlTip1").style.marginTop = "0px";
            }
        }, 5000);
        var slice = [];
        var downloadSlice = function (progress) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "arraybuffer";
            xhr.onload = function () {
                if (xhr.status == 200) {
                    slice.push(xhr.response);
                    if (progress >= fileInfo.download.length) {
                        var newA = document.createElement("a");
                        var url = URL.createObjectURL(new Blob(slice, {
                            "type": fileInfo.type
                        }));
                        newA.href = url;
                        newA.download = decodeURIComponent(fileInfo.name);
                        newA.style.display = "none";
                        document.body.appendChild(newA);
                        newA.click();
                        document.title = title;
                        clearInterval(intervalId);
                        closePopup("popRecv");
                    } else {
                        progress++;
                        downloadSlice(progress);
                    }
                } else if (xhr.status == 404) {
                    notify(multilang({
                        "en-US": "The file is incomplete. Please upload it again.",
                        "zh-CN": "文件损坏。请重新上传。",
                        "zh-TW": "檔案損壞。請重新上載。"
                    }));
                    document.title = title;
                    clearInterval(intervalId);
                    closePopup("popRecv");
                } else {
                    error(xhr);
                    document.title = title;
                    clearInterval(intervalId);
                    closePopup("popRecv");
                }
            }
            xhr.onprogress = function (e) {
                if (e.lengthComputable) {
                    var percentage = Math.round(e.loaded / e.total * 100);
                    document.title = "[" + progress + "/" + fileInfo.download.length + ": " + percentage + "%] " + title;
                    progressBar1.style.width = percentage + "px";
                    id("lblDownloadP1").innerText = multilang({
                        "en-US": "Downloading File Slices ",
                        "zh-CN": "下载文件碎片中 ",
                        "zh-TW": "下載檔案碎片中 "
                    }) + percentage + "%";
                    progressBar2.style.width = Math.round(progress / fileInfo.download.length * 100) + "px";
                    id("lblDownloadP2").innerText = multilang({
                        "en-US": "Total Progress ",
                        "zh-CN": "总下载进度 ",
                        "zh-TW": "總下載進度 "
                    }) + progress + "/" + fileInfo.download.length;
                }
            }
            xhr.open("GET", fileInfo.download[progress - 1], true);
            xhr.send();
        }
        downloadSlice(1);
    } else {
        location.href = fileInfo.download[0];
    }
}

function encodeData(data) {
    var array = [];
    for (var key in data) {
        data[key] && array.push(key + "=" + encodeURIComponent(data[key]));
    }
    return array.join("&");
}

function error(response, element) {
    var text = multilang({
        "en-US": "Unable to connect to the server: ",
        "zh-CN": "无法连接至服务器：",
        "zh-TW": "無法連接至伺服器："
    }) + (response && response.status || 0);
    if (element) {
        element.innerText = text;
    } else {
        notify(text);
    }
}

function getInfo(code, password) {
    if (code) {
        id("btnSub").disabled = true;
        invalidAttempt++;
        fetch("https://api.rthsoftware.cn/backend/airportal/getinfo?" + encodeData({
            "code": code,
            "password": password,
            "token": login.token,
            "username": login.username
        })).then(function (response) {
            id("btnSub").disabled = false;
            if (response.ok || response.status == 200) {
                return response.text();
            } else {
                invalidAttempt--;
                error(response);
            }
        }).then(function (data) {
            if (data === "") {
                id("inputCode").value = "";
                alert(multilang({
                    "en-US": "The file does not exist.",
                    "zh-CN": "文件不存在。",
                    "zh-TW": "檔案不存在。"
                }));
            } else if (data) {
                invalidAttempt--;
                data = JSON.parse(data);
                if (data.error) {
                    switch (data.error) {
                        case "loginRequired":
                            if (login.username) {
                                notify(multilang({
                                    "en-US": "You do not have permission to download this file.",
                                    "zh-CN": "您没有下载此文件的权限。",
                                    "zh-TW": "您沒有下載此檔案的權限。"
                                }));
                            } else {
                                notify(multilang({
                                    "en-US": "Login is required for downloading this file.",
                                    "zh-CN": "需要登录才能下载此文件。",
                                    "zh-TW": "需要登入才能下載此檔案。"
                                }));
                                menuItemLogin.click();
                            }
                            break;
                        case "passwordIncorrect":
                            id("inputRecvPsw").value = "";
                            notify(multilang({
                                "en-US": "Incorrect password.",
                                "zh-CN": "密码错误。",
                                "zh-TW": "密碼錯誤。"
                            }));
                            break;
                        case "passwordRequired":
                            showPopup([
                                '<p id="enterPsw" class="p1" style="padding-top: 40px;"></p>',
                                '<input id="inputRecvPsw" class="inputCode" autocomplete="off"><br>',
                                '<button class="btn1" id="btnSubPsw"></button>',
                                '<span class="btnBack" id="btnBackRecvPsw"></span>'
                            ], "recvPswBox", "popRecv", "slideInFromRight");
                            id("enterPsw").innerText = multilang({
                                "en-US": "Please enter the password",
                                "zh-CN": "请输入密码",
                                "zh-TW": "請輸入密碼"
                            });
                            id("inputRecvPsw").onkeydown = function (event) {
                                if (event.keyCode == 13) {
                                    id("btnSubPsw").click();
                                }
                            };
                            id("btnSubPsw").innerText = multilang({
                                "en-US": "OK",
                                "zh-CN": "确定",
                                "zh-TW": "確定"
                            });
                            id("btnSubPsw").onclick = function () {
                                password = id("inputRecvPsw").value;
                                if (password) {
                                    getInfo(code, MD5(password));
                                }
                            };
                            id("btnBackRecvPsw").onclick = function () {
                                closePopup("recvPswBox", "slideOut");
                            };
                            setTimeout(function () {
                                id("inputRecvPsw").focus();
                            }, 250);
                            break;
                        default:
                            notify(multilang({
                                "en-US": "Error: ",
                                "zh-CN": "错误：",
                                "zh-TW": "錯誤："
                            }) + data.error);
                            break;
                    }
                } else if (data.text) {
                    showPopup([
                        '<p id="txtReceived" class="p1"></p>',
                        '<div id="txtView" class="contentBox"></div>',
                        '<button class="btn1" id="btnDone4"></button>'
                    ], "recvBox1", "popRecv", "slideInFromRight");
                    id("txtReceived").innerText = multilang({
                        "en-US": "Text Received",
                        "zh-CN": "接收到文本",
                        "zh-TW": "接收到文字"
                    });
                    var text = decodeURIComponent(data.text);
                    if (/^[a-z]+:\/\/[a-z0-9_\-\/.#?=%]+$/i.test(text)) {
                        var newA = document.createElement("a");
                        newA.href = newA.innerText = text;
                        newA.rel = "nofollow";
                        newA.target = "_blank";
                        id("txtView").appendChild(newA);
                    } else {
                        id("txtView").innerText = text;
                    }
                    id("btnDone4").innerText = multilang({
                        "en-US": "Close",
                        "zh-CN": "关闭",
                        "zh-TW": "關閉"
                    });
                    id("btnDone4").onclick = function () {
                        closePopup("popRecv");
                    };
                } else if (data.length === 1) {
                    downloadFile(data[0]);
                } else {
                    showPopup([
                        '<p id="multiFilesReceived" class="p1" style="margin-top: -10px;"></p>',
                        '<p id="multiFilesTip" style="margin-top: -10px;"></p>',
                        '<div id="fileList" class="fileList"></div>',
                        '<button class="btn1" id="btnDone1"></button>'
                    ], "recvBox1", "popRecv", "slideInFromRight");
                    id("multiFilesReceived").innerText = multilang({
                        "en-US": "Multiple files received",
                        "zh-CN": "接收到多个文件",
                        "zh-TW": "接收到多個檔案"
                    });
                    id("multiFilesTip").innerText = multilang({
                        "en-US": "Click on the items in the list to download them separately",
                        "zh-CN": "单击列表中的项目来分别下载它们",
                        "zh-TW": "單擊列表中的項目來分別下載它們"
                    });
                    for (var file = 0; file < data.length; file++) {
                        var newA = document.createElement("a");
                        newA.classList.add("menu");
                        newA.innerText = decodeURIComponent(data[file].name);
                        if (data[file].download.length === 1) {
                            newA.href = data[file].download[0];
                            newA.target = "_blank";
                        } else {
                            newA.dataset.index = file + 1;
                            newA.onclick = function () {
                                var index = this.dataset.index * 1 - 1;
                                downloadFile(data[index]);
                            };
                        }
                        id("fileList").appendChild(newA);
                    }
                    id("btnDone1").innerText = multilang({
                        "en-US": "Close",
                        "zh-CN": "关闭",
                        "zh-TW": "關閉"
                    });
                    id("btnDone1").onclick = function () {
                        closePopup("popRecv");
                    };
                }
            }
        }).catch(function () {
            id("btnSub").disabled = false;
            invalidAttempt--;
            error();
        });
    }
}

function getPostData(data) {
    var formData = new FormData();
    for (var key in data) {
        if (data[key]) {
            formData.append(key, data[key]);
        }
    }
    return {
        body: formData,
        method: "POST",
        credentials: 'same-origin'
        // "headers":{'Access-Control-Allow-Origin':'*'},
        // 'mode': 'no-cors',
        // credentials: 'same-origin'
    };
}

function getQRCode(content) {
    return "https://api.rthsoftware.cn/backend/qrcode?" + encodeData({
        "text": content
    });
}

function getRandCharacter(len) {
    var str = "";
    for (var i = 0; i < len; i++) {
        str += unescape("%u" + (Math.round(Math.random() * 20901) + 19968).toString(16));
    }
    return str;
}

function id(elementId) {
    return document.getElementById(elementId);
}

function loadExpTime() {
    if (orderSubmitted && new Date().getTime() - orderSubmitted > 86400000) {
        orderSubmitted = null;
        localStorage.removeItem("orderSubmitted");
    }
    if (document.getElementById("privilegeStatus")) {
        fetch("https://api.rthsoftware.cn/backend/get?" + encodeData({
            "name": appName,
            "token": login.token,
            "url": "privilege",
            "username": login.username
        })).then(function (response) {
            if (response.ok || response.status == 200) {
                return response.text();
            }
        }).then(function (data) {
            var expTime = Math.round((data - new Date().getTime() / 1000) / 86400);
            if (data && expTime > 0) {
                if (orderSubmitted) {
                    orderSubmitted = null;
                    localStorage.removeItem("orderSubmitted");
                }
                window.currentExpTime = data * 1;
                privilegeStatus.innerText = multilang({
                    "en-US": "Premium Plan " + expTime + " Days Remaining",
                    "zh-CN": "高级账号 剩余" + expTime + "天",
                    "zh-TW": "高級賬號 剩餘" + expTime + "天"
                });
            } else {
                if (orderSubmitted) {
                    privilegeStatus.innerText = multilang({
                        "en-US": "Waiting for order confirmation",
                        "zh-CN": "等待订单确认 最长需要24个小时",
                        "zh-TW": "等待訂單確認 最長需要24個小時"
                    });
                } else {
                    privilegeStatus.innerText = multilang({
                        "en-US": "Premium Plan Not Activated",
                        "zh-CN": "高级账号 未激活",
                        "zh-TW": "高級賬號 未激活"
                    });
                }
            }
        });
    }
}

function loadServerList(auto) {
    window.fileBackend = window.servers[auto].host;
    Object.keys(window.servers).forEach(function (key) {
        var newA = document.createElement("a");
        var newTick = document.createElement("span");
        var newName = document.createElement("span");
        newA.classList.add("menuItem");
        newA.id = key;
        newA.onclick = function () {
            if (!window.currentExpTime && window.servers[this.id].premium) {
                notify(multilang({
                    "en-US": "This server is for premium account users only.",
                    "zh-CN": "此服务器仅限高级账号用户使用。",
                    "zh-TW": "此伺服器僅限高級賬號用戶使用。"
                }));
                if (!login.username) {
                    menuItemLogin.click();
                }
            } else {
                window.fileBackend = window.servers[this.id].host;
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
}

function loggedIn(newLogin) {
    if (newLogin) {
        closePopup("popLogin");
        if (id("filesTip")) {
            id("filesTip").innerText = login.email;
        }
    }
    menuItemLogin.innerText = multilang({
        "en-US": "Log Out",
        "zh-CN": "退出登录",
        "zh-TW": "登出"
    });
    var newItem = document.createElement("a");
    newItem.classList.add("menuItem");
    newItem.onclick = function () {
        if (window.info) {
            var btnCloseId = "btnClose" + new Date().getTime();
            showPopup([
                '<span class="btnClose" id="' + btnCloseId + '"></span>',
                '<p class="p1" id="lblUsername"></p>',
                '<span class="line"></span>',
                '<p class="p3" id="lblExpTime"></p>',
                '<div class="payPlans">',
                '<p class="p2">',
                '<span id="activatePremium"></span>',
                '<a class="link1" id="showPrivilege"></a>',
                '</p>',
                '<p class="p4">',
                '<span id="plans"></span>',
                '<span id="promotionText"></span>',
                '</p>',
                '<span class="payItem plan" id="payItem1M">',
                '<span id="price-one"></span>',
                '<p id="month1" class="p4"></p>',
                '</span>',
                '<span class="payItem plan" id="payItem3M">',
                '<span id="price-three"></span>',
                '<p id="month3" class="p4"></p>',
                '</span>',
                '<span class="payItem plan" id="payItem1Y">',
                '<span id="price-twelve"></span>',
                '<p id="month12" class="p4"></p>',
                '</span>',
                '<p id="paymentMethod" class="p4" style="margin-top: 0px;"></p>',
                '<span class="payItem method selected" id="payItemWechat">',
                '<p id="wechatPay" class="p5"></p>',
                '</span>',
                '<span class="payItem method" id="payItemAli">',
                '<p id="alipay" class="p5"></p>',
                '</span>',
                '<span class="payItem method" id="payItemPaypal">',
                '<p id="paypal" class="p5">PayPal</p>',
                '</span>',
                '</div>',
                '<button class="btn1" id="btnPay0"></button>'
            ], "accBox0", "popAccount");
            id(btnCloseId).onclick = function () {
                closePopup("popAccount");
            };
            id("lblUsername").innerText = login.email;
            id("lblExpTime").innerText = privilegeStatus.innerText;
            id("activatePremium").innerText = multilang({
                "en-US": "Activate/Renew Premium Plan",
                "zh-CN": "激活 / 续期高级账号",
                "zh-TW": "啟用 / 續期高級賬號"
            });
            id("showPrivilege").innerText = multilang({
                "en-US": "Why?",
                "zh-CN": "高级账号有哪些特权？",
                "zh-TW": "高級賬號有哪些特權？"
            });
            id("showPrivilege").onclick = function () {
                showPopup([
                    '<span class="btnBack" id="btnBackPrivileges"></span>',
                    '<p id="titlePrivileges" class="p1"></p>',
                    '<span class="line"></span>',
                    '<p id="txtPrivileges" class="p3 contentLeftAligned"></p>'
                ], "accBox_1", "popAccount", "slideInFromLeft");
                id("btnBackPrivileges").onclick = function () {
                    closePopup("accBox_1", "slideOut");
                }
                id("titlePrivileges").innerText = multilang({
                    "en-US": "Privileges of Premium Plan",
                    "zh-CN": "高级账号特权",
                    "zh-TW": "高級賬號特權"
                });
                id("txtPrivileges").innerText = window.info.privileges;
            };
            id("promotionText").innerText = window.info.promotion;
            id("plans").innerHTML = multilang({
                "en-US": "Plans",
                "zh-CN": "支付方案",
                "zh-TW": "支付方案"
            });
            id("month1").innerText = multilang({
                "en-US": "1 Month",
                "zh-CN": "一个月",
                "zh-TW": "一個月"
            });
            id("month3").innerText = multilang({
                "en-US": "3 Months",
                "zh-CN": "三个月",
                "zh-TW": "三個月"
            });
            id("month12").innerText = multilang({
                "en-US": "1 Year",
                "zh-CN": "一年",
                "zh-TW": "一年"
            });
            id("payItem1M").onclick = id("payItem3M").onclick = id("payItem1Y").onclick = function () {
                payItemClick(this, "plan");
            };
            id("paymentMethod").innerText = multilang({
                "en-US": "Payment Method",
                "zh-CN": "支付方式",
                "zh-TW": "支付方式"
            });
            id("wechatPay").innerText = multilang({
                "en-US": "WeChat",
                "zh-CN": "微信支付",
                "zh-TW": "微信支付"
            });
            id("alipay").innerText = multilang({
                "en-US": "AliPay",
                "zh-CN": "支付宝",
                "zh-TW": "支付寶"
            });
            id("btnPay0").innerText = multilang({
                "en-US": "Pay",
                "zh-CN": "确认支付",
                "zh-TW": "確認支付"
            });
            id("payItemWechat").onclick = id("payItemAli").onclick = id("payItemPaypal").onclick = function () {
                if (this.id == "payItemWechat" || confirm(multilang({
                    "en-US": "Only orders paid via WeChat do not need to wait for manual confirmation. Are you sure that you want to change the payment method?",
                    "zh-CN": "只有微信支付不需要等待人工确认。确定要更改支付方式吗？",
                    "zh-TW": "只有微信支付不需要等待人工確認。確定要更改支付方式嗎？"
                }))) {
                    payItemClick(this, "method");
                }
            };
            Object.keys(window.info.price).forEach(function (key) {
                id("price-" + key).innerHTML = "";
                var newP = document.createElement("p");
                newP.classList.add("p2");
                if (window.info.price[key]["specialPrice"] != window.info.price[key]["price"]) {
                    var newSpan = document.createElement("span");
                    newSpan.classList.add("pDel");
                    newP.innerText = window.info.currency + window.info.price[key]["specialPrice"];
                    newSpan.innerText = window.info.currency + window.info.price[key]["price"];
                    newP.appendChild(newSpan);
                } else {
                    newP.innerText = window.info.currency + window.info.price[key]["price"];
                }
                id("price-" + key).appendChild(newP);
            });
            var pubPayPlan = "N/A";
            var pubPayMethod = "N/A";
            id("btnPay0").onclick = function () {
                showPopup([
                    '<p class="p3" id="lblPayTip">您正在为此用户激活 / 续期高级账号</p>',
                    '<div id="payQRC"></div>',
                    '<span class="btnBack" id="btnBackPay"></span>',
                    '<button class="btn1" id="btnPay1"></button>'
                ], "accBox1", "popAccount", "slideInFromRight");
                id("btnBackPay").onclick = function () {
                    closePopup("accBox1", "slideOut");
                }
                id("btnPay1").innerText = multilang({
                    "en-US": "I Have Paid",
                    "zh-CN": "我已支付",
                    "zh-TW": "我已支付"
                });
                var payPlan = document.getElementsByClassName("payItem plan selected").item(0).lastElementChild;
                var payMethod = document.getElementsByClassName("payItem method selected").item(0).lastElementChild;
                var selectedPlan;
                var idPayPlan = payPlan.id;
                var idPayMethod = payMethod.id;
                pubPayPlan = payPlan.innerText;
                pubPayMethod = payMethod.innerText;
                switch (idPayPlan) {
                    case "month1":
                        selectedPlan = window.info.price.one;
                        break;
                    case "month3":
                        selectedPlan = window.info.price.three;
                        break;
                    case "month12":
                        selectedPlan = window.info.price.twelve;
                        break;
                }
                id("payQRC").innerHTML = "";
                var qrcode = new Image(200, 200);
                qrcode.src = "https://api.rthsoftware.cn/backend/pay?" + encodeData({
                    "appname": appName,
                    "fee": selectedPlan.cny * 100,
                    "method": idPayMethod.toLowerCase(),
                    "username": login.username
                });
                id("payQRC").appendChild(qrcode);
                if (idPayMethod == "paypal") {
                    open("https://www.paypal.me/ShangzhenY/");
                }
                lblPayTip.innerText = multilang({
                    "en-US": "Activate/Renew " + pubPayPlan + " of Premium Plan (" + window.info.currency + selectedPlan.specialPrice + ")\nfor " + login.email + " with " + pubPayMethod,
                    "zh-CN": "使用 " + pubPayMethod + " 为 " + login.email + "\n激活 / 续期" + pubPayPlan + "的高级账号（" + window.info.currency + selectedPlan.specialPrice + "）",
                    "zh-TW": "使用 " + pubPayMethod + " 為 " + login.email + "\n啟用 / 續期" + pubPayPlan + "的高級賬號（" + window.info.currency + selectedPlan.specialPrice + "）"
                });
                accBox0.style.left = "-500px";
                accBox1.style.left = "0px";
                var payState = "success";
                id("btnPay1").onclick = function () {
                    showPopup([
                        '<p class="p1" id="lblPayState0" style="margin-top: 50px;"></p>',
                        '<p class="p3" id="lblPayState1" style="margin-top: 50px;"></p>',
                        '<button class="btn1" id="btnDone3"></button>'
                    ], "accBox2", "popAccount", "slideInFromRight");
                    id("lblPayState0").innerText = multilang({
                        "en-US": "Submitting",
                        "zh-CN": "提交中",
                        "zh-TW": "提交中"
                    });
                    id("lblPayState1").innerText = multilang({
                        "en-US": "We are processing your payment order\nPlease wait\nIf you need help, please contact us.",
                        "zh-CN": "我们正在处理您的支付订单\n请稍候\n如需帮助，请与我们联系。",
                        "zh-TW": "我們正在處理您的支付訂單\n請稍候\n如需幫助，請與我們聯繫。"
                    });
                    id("btnDone3").innerText = multilang({
                        "en-US": "Close",
                        "zh-CN": "关闭",
                        "zh-TW": "關閉"
                    });
                    id("btnDone3").onclick = function () {
                        if (payState == "success") {
                            closePopup("popAccount");
                        } else {
                            id("btnPay1").onclick();
                        }
                    }
                    if (idPayMethod == "wechatPay") {
                        loadExpTime();
                        notify(multilang({
                            "en-US": "Submitted Successfully",
                            "zh-CN": "提交成功",
                            "zh-TW": "提交成功"
                        }));
                        closePopup("popAccount");
                        menuIcon.click();
                    } else {
                        var action = "续期";
                        if (!window.currentExpTime) {
                            action = "激活";
                        }
                        fetch("https://api.rthsoftware.cn/backend/feedback", getPostData({
                            "appname": appName,
                            "text": "通过 " + pubPayMethod + " " + action + " " + pubPayPlan + " 的高级账号",
                            "token": login.token,
                            "username": login.username,
                            "ver": version
                        })).then(function (response) {
                            if (response.ok || response.status == 200) {
                                payState = "success";
                                id("btnDone3").innerText = multilang({
                                    "en-US": "Close",
                                    "zh-CN": "关闭",
                                    "zh-TW": "關閉"
                                });
                                id("lblPayState0").innerText = multilang({
                                    "en-US": "Submitted Successfully",
                                    "zh-CN": "提交成功",
                                    "zh-TW": "提交成功"
                                });
                                id("lblPayState1").innerText = multilang({
                                    "en-US": "We are processing your order.\nThe number of days remaining will be automatically updated within 24 hours;\nif not, please contact us after making sure you have paid.",
                                    "zh-CN": "我们正在处理您的支付订单。\n您的高级账号剩余天数会在24小时内自动更新；\n如果24小时后仍没有更新，请在确保您已支付后与我们联系。",
                                    "zh-TW": "我們正在處理您的支付訂單。\n您的高級賬號剩餘天數會在24小時內自動更新；\n如果24小時后仍沒有更新，請在確保您已支付后與我們聯繫。"
                                });
                                id("btnDone3").style.pointerEvents = "auto";
                                id("btnDone3").style.opacity = "1";
                                orderSubmitted = new Date().getTime();
                                localStorage.setItem("orderSubmitted", orderSubmitted);
                                loadExpTime();
                            } else {
                                payState = "error";
                                id("btnDone3").innerText = multilang({
                                    "en-US": "Try Again",
                                    "zh-CN": "重试",
                                    "zh-TW": "重試"
                                });
                                id("lblPayState0").innerText = multilang({
                                    "en-US": "Oops... something went wrong",
                                    "zh-CN": "Oops... 出错了",
                                    "zh-TW": "Oops... 出錯了"
                                });
                                id("lblPayState1").innerText = multilang({
                                    "en-US": "Unable to connect to the server.",
                                    "zh-CN": "无法连接至服务器。",
                                    "zh-TW": "無法連接至伺服器。"
                                });
                                id("lblPayState1").innerText += multilang({
                                    "en-US": "\nPlease try again (no need to pay again)\nIf you need more help, please contact us.",
                                    "zh-CN": "\n请重试（无需再次扫码付款）\n如需更多帮助，请与我们联系。",
                                    "zh-TW": "\n請重試（無需再次掃碼付款）\n如需更多幫助，請與我們聯繫。"
                                });
                                id("btnDone3").style.pointerEvents = "auto";
                                id("btnDone3").style.opacity = "1";
                            }
                        });
                    }
                };
            };
            closeMenu();
        }
    };
    newItem.style.fontSize = "small";
    newItem.innerText = login.email;
    menu.insertBefore(newItem, menu.firstChild);
    var newP = document.createElement("p");
    newP.id = "privilegeStatus";
    newItem.appendChild(newP);
    loadExpTime();
    fetch("https://api.rthsoftware.cn/backend/userdata/set?" + encodeData({
        "appname": appName,
        "token": login.token,
        "username": login.username
    })).then(function (response) {
        if (response.ok || response.status == 200) {
            return response.json();
        }
    }).then(function (data) {
        if (data) {
            settings = data;
        }
    });
}

function loggedOut() {
    localStorage.clear();
}

function multilang(json) {
    if (chs) {
        return json["zh-CN"];
    } else if (zh) {
        return json["zh-TW"];
    } else {
        return json["en-US"];
    }
}

function notify(content, duration) {
    var newDiv = document.createElement("div");
    newDiv.classList.add("notificationBar");
    if (!duration && duration !== false) {
        duration = 3000;
    }
    newDiv.innerText = content;
    newDiv.onclick = function () {
        clearClass("notificationBar");
    };
    document.body.appendChild(newDiv);
    setTimeout(function () {
        newDiv.style.bottom = "0px";
        if (duration) {
            setTimeout(function () {
                newDiv.style.bottom = "-50px";
                setTimeout(function () {
                    clearClass("notificationBar");
                }, 250);
            }, duration);
        }
    }, 25);
}

function payItemClick(element, className) {
    if (element.classList.contains("selected")) {
        element.classList.remove("selected");
    } else {
        var elements = document.getElementsByClassName(className);
        for (var i = 0; i < elements.length; i++) {
            if (elements[i] == element) {
                element.classList.add("selected");
            } else {
                elements[i].classList.remove("selected");
            }
        }
    }
    btnPay0State();
}

function showChangelog(text, firstRunOnly) {
    if (firstRun === true || !firstRunOnly) {
        showPopup([
            '<p id="titleUpdate" class="p1"></p>',
            '<div id="txtUpdate" class="contentBox"></div>',
            '<button class="btn1" id="btnDone4"></button>'
        ], null, "popUpdate", "rebound");
        id("titleUpdate").innerText = multilang({
            "en-US": "What's New",
            "zh-CN": "最近更新",
            "zh-TW": "最近更新"
        });
        txtUpdate.innerHTML = text;
        id("btnDone4").innerText = multilang({
            "en-US": "Close",
            "zh-CN": "关闭",
            "zh-TW": "關閉"
        });
        id("btnDone4").onclick = function () {
            closePopup("popUpdate");
        };
    }
}

function showMenu(e, menu) {
    clearClass("popup-menu");
    var newDiv = document.createElement("div");
    newDiv.classList.add("popup-menu");
    mask.style.display = "block";
    newDiv.oncontextmenu = function () {
        return false;
    };
    for (var i = 0; i < menu.length; i++) {
        if (menu[i].if === undefined || menu[i].if) {
            var newSpan = document.createElement("span");
            newSpan.innerText = menu[i].text;
            newSpan.onclick = menu[i].onclick;
            newDiv.appendChild(newSpan);
        }
    }
    document.body.appendChild(newDiv);
    newDiv.style.left = (e.pageX - newDiv.offsetWidth / 2) + "px";
    newDiv.style.top = (e.pageY - newDiv.offsetHeight) + "px";
    setTimeout(function () {
        newDiv.style.opacity = "1";
    }, 25);
}

function showPopup(html, elementId, parentId, animation) {
    if (!id(parentId)) {
        clearClass("popup-menu");
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
    if (elementId && !id(elementId)) {
        var newDiv = document.createElement("div");
        newDiv.id = elementId;
        newDiv.innerHTML = html.join("");
        switch (animation) {
            case "slideInFromLeft":
                newDiv.classList.add("slideInFromLeft");
                id(parentId).appendChild(newDiv);
                setTimeout(function () {
                    id(parentId).childNodes[id(parentId).childElementCount - 2].style.left = "500px";
                    newDiv.style.left = "0px";
                }, 25);
                break;
            case "slideInFromRight":
                newDiv.classList.add("slideInFromRight");
                id(parentId).appendChild(newDiv);
                setTimeout(function () {
                    id(parentId).childNodes[id(parentId).childElementCount - 2].style.left = "-500px";
                    newDiv.style.left = "0px";
                }, 25);
                break;
            default:
                newDiv.classList.add("popUpBox");
                id(parentId).appendChild(newDiv);
                break;
        }
    }
}

function upload(up, files, config) {
    let upload = up;
    console.log(upload);
    if (config.password) {
        config.password = MD5(config.password);
    }
    fetch("http://127.0.0.1:8080/api/v1/getCode", getPostData({
        "chunksize": chunkSize,
        "downloads": config.downloads,
        "host": "http://127.0.0.1:8080/api/v1/upload",
        "info": JSON.stringify(files),
        "password": config.password,
        "token": login.token,
        "username": login.username
    })).then(function (response) {
        console.log("res", response);
        if (response.ok || response.status == 200) {
            return response.json();
        } else {
            error(response);
        }
    }).then(function (data) {
        console.log("data", data);
        if (data) {
            if (data.alert) {
                alert(data.alert);
                id("inputMaxDl").value = window.fileCount + 1;
                if (!login.username) {
                    menuItemLogin.click();
                }
            } else {
                window.key = data.key;
                window.uploadCode = data.code;
                document.title = "[" + multilang({
                    "en-US": "Uploading",
                    "zh-CN": "正在上传",
                    "zh-TW": "正在上載"
                }) + "] " + title;
                showPopup([
                    '<p class="p1" id="lblUploadP"></p>',
                    '<span class="progressBar" id="progressBarBg0"></span>',
                    '<span class="progressBar" id="progressBar0"></span>'
                ], "sendBox0", "popSend", "slideInFromRight");
                id("lblUploadP").innerText = multilang({
                    "en-US": "Uploading...",
                    "zh-CN": "正在上传……",
                    "zh-TW": "正在上載……"
                });
                window.option = {
                    "url": data.host,
                    "multipart_params": {
                        "policy": data.policy,
                        "OSSAccessKeyId": data.accessid,
                        "success_action_status": "200",
                        "signature": data.signature
                    }
                };
                console.log("upload before");
                upload.start();
                console.log("upload end");
            }
        }
    });
}

function uploadSuccess(code) {
    var url = "https://" + code + ".airportal.cn/";
    document.title = "[取件码 " + code + "] " + title;
    showPopup([
        '<p id="sentSuccessfully" class="p1"></p>',
        '<p id="yourCode"></p>',
        '<p id="recvCode"></p>',
        '<p id="whenReceving"></p>',
        '<p id="otherWays">' + multilang({
            "en-US": 'You can also<a class="link1" id="copyLink">copy the download link</a>or<a class="link1" id="viewQRC">scan the QR code to download</a>.',
            "zh-CN": '您也可以<a class="link1" id="copyLink">复制下载链接</a>或<a class="link1" id="viewQRC">直接扫描二维码下载</a>。',
            "zh-TW": '您也可以<a class="link1" id="copyLink">複製下載連結</a>或<a class="link1" id="viewQRC">直接掃描 QR 碼下載</a>。'
        }) + '</p>',
        '<button class="btn1" id="btnDone0"></button>'
    ], "sendBox1", "popSend", "slideInFromRight");
    id("sentSuccessfully").innerText = multilang({
        "en-US": "File is sent successfully.",
        "zh-CN": "文件已成功传送。",
        "zh-TW": "檔案已成功傳送。"
    });
    id("yourCode").innerText = multilang({
        "en-US": "Your Code (Expires in 1 Day):",
        "zh-CN": "您的取件码（1天内有效）：",
        "zh-TW": "您的取件碼（1天內有效）："
    });
    id("recvCode").innerText = code;
    id("whenReceving").innerText = multilang({
        "en-US": "When receving files, please enter this code.",
        "zh-CN": "接收文件时，请输入该" + code.toString().length + "位数取件码。",
        "zh-TW": "接收檔案時，請輸入該" + code.toString().length + "位數取件碼。"
    });
    id("viewQRC").style.marginRight = "0px";
    id("btnDone0").innerText = multilang({
        "en-US": "Done",
        "zh-CN": "完成",
        "zh-TW": "完成"
    });
    copyLink.onclick = function () {
        if ("clipboard" in navigator) {
            navigator.clipboard.writeText(url).then(function () {
                notify(multilang({
                    "en-US": "The download link is copied to the clipboard.",
                    "zh-CN": "下载链接已复制到剪贴板。",
                    "zh-TW": "下載連結已複製到剪貼簿。"
                }));
            });
        } else {
            prompt(multilang({
                "en-US": "Your browser does not support the clipboard API. Please copy it manually.",
                "zh-CN": "您的浏览器不支持剪贴板功能。请手动复制。",
                "zh-TW": "您的瀏覽器不支援剪貼簿功能。請手動複製。"
            }), url);
        }
    };
    viewQRC.onclick = function () {
        showPopup([
            '<div id="QRBox"></div>',
            '<span class="btnBack" id="btnBackQRC"></span>'
        ], "sendBox2", "popSend", "slideInFromRight");
        var qrcode = new Image(200, 200);
        qrcode.src = getQRCode(url);
        id("QRBox").appendChild(qrcode);
        id("btnBackQRC").onclick = function () {
            closePopup("sendBox2", "slideOut");
        };
    };
    btnDone0.onclick = function () {
        document.title = title;
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

send.oncontextmenu = function (e) {
    showMenu(e, [{
        "onclick": function () {
            var btnCloseId = "btnClose" + new Date().getTime();
            showPopup([
                '<span class="btnClose" id="' + btnCloseId + '"></span>',
                '<p id="titleSendText" class="p1"></p>',
                '<textarea id="txtSend" placeholder=""></textarea>',
                '<button class="btn1" id="btnSendText"></button>'
            ], "sendBox0", "popSend", "rebound");
            id("titleSendText").innerText = multilang({
                "en-US": "Send Text",
                "zh-CN": "发送文本",
                "zh-TW": "傳送文字"
            });
            id("txtSend").placeholder = multilang({
                "en-US": "Enter the plain text here",
                "zh-CN": "在这里输入纯文本",
                "zh-TW": "在這裡輸入純文字"
            });
            id("btnSendText").innerText = multilang({
                "en-US": "Send",
                "zh-CN": "发送",
                "zh-TW": "傳送"
            });
            id(btnCloseId).onclick = function () {
                closePopup("popSend");
            };
            id("btnSendText").onclick = function () {
                var value = id("txtSend").value;
                if (value) {
                    id("btnSendText").disabled = true;
                    fetch("http://127.0.0.1:8080/api/v1/getCode", getPostData({
                        "text": value,
                        "token": login.token,
                        "username": login.username
                    })).then(function (response) {
                        id("btnSendText").disabled = false;
                        if (response.ok || response.status == 200) {
                            return response.json();
                        } else {
                            error(response);
                        }
                    }).then(function (data) {
                        if (data) {
                            if (data.alert) {
                                alert(data.alert);
                            } else {
                                uploadSuccess(data.code);
                            }
                        }
                    });
                }
            };
            id("txtSend").focus();
        },
        "text": multilang({
            "en-US": "Text",
            "zh-CN": "文本",
            "zh-TW": "文字"
        })
    }, {
        "if": !isMobile,
        "onclick": function () {
            inputFile.value = "";
            inputFile.click();
            closeMenu();
        },
        "text": multilang({
            "en-US": "Folder",
            "zh-CN": "文件夹",
            "zh-TW": "資料夾"
        })
    }]);
    return false;
};
receive.onclick = function () {
    showPopup([
        '<p class="p1" style="padding-top: 30px;">',
        '<span id="enterCode"></span>',
        '<p id="howToGetCode" class="tip"></p>',
        '</p>',
        '<input type="tel" id="inputCode" class="inputCode" maxlength="6" autocomplete="off"><br>',
        '<button class="btn1" id="btnSub"></button>',
        '<span class="btnBack" id="btnBackRecv"></span>'
    ], "recvBox0", "popRecv");
    id("enterCode").innerText = multilang({
        "en-US": "Please enter the code",
        "zh-CN": "请输入取件码",
        "zh-TW": "請輸入取件碼"
    });
    id("howToGetCode").innerText = multilang({
        "en-US": "You will get the code after sending a file",
        "zh-CN": "发送文件后就会获得取件码",
        "zh-TW": "傳送檔案后就會獲得取件碼"
    });
    id("inputCode").onkeydown = function (event) {
        if (event.keyCode == 13) {
            id("btnSub").click();
        }
    }
    id("btnSub").innerText = multilang({
        "en-US": "OK",
        "zh-CN": "确定",
        "zh-TW": "確定"
    });
    id("btnSub").onclick = function () {
        if (/(MicroMessenger|QQ)\//i.test(navigator.userAgent)) {
            alert("请在浏览器中打开此页面。");
        } else if (invalidAttempt > 2) {
            var code = getRandCharacter(3);
            var enteredCode = prompt(multilang({
                "en-US": "You have entered invalid codes many times. Please enter the verification code to continue: ",
                "zh-CN": "您已经多次输入了无效取件码。请输入验证码以继续：",
                "zh-TW": "您已經多次輸入了無效取件碼。請輸入驗證碼以繼續："
            }) + code, "");
            if (enteredCode == code) {
                getInfo(id("inputCode").value);
            } else if (enteredCode !== null) {
                alert(multilang({
                    "en-US": "Incorrect verification code.",
                    "zh-CN": "验证码错误。",
                    "zh-TW": "驗證碼錯誤。"
                }));
            }
        } else {
            getInfo(id("inputCode").value);
        }
    };
    id("btnBackRecv").onclick = function () {
        closePopup("popRecv");
    };
    id("inputCode").focus();
};
receive.oncontextmenu = function () {
    return false;
};
menuIcon.onclick = function () {
    menu.style.display = "block";
    setTimeout(function () {
        menu.style.opacity = "1";
    }, 10);
    mask.style.display = "block";
    menuItemSelectServer.style.position = "";
    menuItemSelectServer.style.marginLeft = "0px";
    menuServers.style.display = "none";
    menuServers.style.marginLeft = "200%";
};
mask.onclick = closeMenu;
menuItemLogin.onclick = function () {
    if (login.username) {
        notify(multilang({
            "en-US": "Logging out...",
            "zh-CN": "正在退出登录……",
            "zh-TW": "正在登出……"
        }), false);
        logOut();
    } else {
        var btnCloseId = "btnClose" + new Date().getTime();
        showPopup([
            '<span class="btnClose" id="' + btnCloseId + '"></span>',
            '<iframe src="https://account.rthsoftware.cn/login-airportal.html"></iframe>'
        ], null, "popLogin");
        id(btnCloseId).onclick = function () {
            closePopup("popLogin");
        };
    }
    closeMenu();
};
menuItemHistory.onclick = function () {
    showPopup([
        '<p id="titleHistory" class="p1"></p>',
        '<span class="line"></span>',
        '<div id="historyList"></div>',
        '<button class="btn1" id="btnDoneHistory"></button>'
    ], null, "popHistory");
    id("titleHistory").innerText = multilang({
        "en-US": "History",
        "zh-CN": "历史记录",
        "zh-TW": "歷史記錄"
    });
    id("btnDoneHistory").innerText = multilang({
        "en-US": "Close",
        "zh-CN": "关闭",
        "zh-TW": "關閉"
    });
    id("btnDoneHistory").onclick = function () {
        closePopup("popHistory");
    };
    var loadHistory = function (data) {
        if (data) {
            window.lblPlaceholder.innerText = multilang({
                "en-US": "You have not uploaded any files yet",
                "zh-CN": "您尚未上传任何文件",
                "zh-TW": "您尚未上載任何檔案"
            });
            if (data.length > 0) {
                window.lblPlaceholder.style.display = "none";
                for (var i = data.length - 1; i >= 0; i--) {
                    var newHistory = document.createElement("span");
                    var newA = document.createElement("a");
                    var newP = document.createElement("p");
                    var newDelBtn = document.createElement("span");
                    newHistory.classList.add("historyItem");
                    newHistory.dataset.code = data[i].code;
                    newA.href = "https://" + data[i].code + ".airportal.cn/";
                    newA.target = "_blank";
                    newA.title = multilang({
                        "en-US": "Download",
                        "zh-CN": "下载",
                        "zh-TW": "下載"
                    });
                    newA.innerText = data[i].code;
                    newP.innerText = decodeURIComponent(data[i].name);
                    newDelBtn.classList.add("btnDel");
                    newDelBtn.title = multilang({
                        "en-US": "Delete",
                        "zh-CN": "删除",
                        "zh-TW": "刪除"
                    });
                    newDelBtn.onclick = function () {
                        var thisItem = this.parentElement;
                        var code = thisItem.dataset.code;
                        var filename = thisItem.getElementsByTagName("p")[0].innerText;
                        if (confirm(multilang({
                            "en-US": "Are you sure that you want to delete " + filename + " from the server?",
                            "zh-CN": "确定要删除存储在服务器上的 " + filename + " 吗？",
                            "zh-TW": "確定要刪除存儲在伺服器上的 " + filename + " 嗎？"
                        }))) {
                            loadPlaceholder();
                            fetch("https://api.rthsoftware.cn/backend/airportal/del", getPostData({
                                "code": code,
                                "token": login.token,
                                "username": login.username
                            })).then(loadHistory).catch(loadHistory);
                        }
                    };
                    newHistory.appendChild(newA);
                    newHistory.appendChild(newP);
                    newHistory.appendChild(newDelBtn);
                    id("historyList").appendChild(newHistory);
                }
            } else {
                window.lblPlaceholder.style.display = id("historyList").style.marginTop = "";
            }
        }
    };
    var loadPlaceholder = function () {
        id("historyList").innerHTML = "";
        window.lblPlaceholder = document.createElement("p");
        window.lblPlaceholder.classList.add("placeholder");
        id("historyList").appendChild(window.lblPlaceholder);
        window.lblPlaceholder.innerText = multilang({
            "en-US": "Loading",
            "zh-CN": "正在加载",
            "zh-TW": "正在加載"
        });
    };
    loadPlaceholder();
    fetch("https://api.rthsoftware.cn/backend/airportal/get?" + encodeData({
        "token": login.token,
        "username": login.username
    })).then(function (response) {
        if (response.ok || response.status == 200) {
            return response.json();
        } else {
            error(response, window.lblPlaceholder);
        }
    }).then(loadHistory).catch(function () {
        error(null, window.lblPlaceholder);
    });
    closeMenu();
};
menuItemSettings.onclick = function () {
    showPopup([
        '<p id="titleSettings" class="p1"></p>',
        '<span class="line"></span>',
        '<div class="contentLeftAligned">',
        '<div>',
        '<input type="checkbox" class="cbox" id="inputLoginRequired"></input>',
        '<label id="lblLoginRequired" class="lblCbox" for="inputLoginRequired"></label>',
        '</div>',
        '</div>',
        '<button class="btn1" id="btnDone5"></button>'
    ], null, "popSettings");
    if (settings["loginRequired"]) {
        id("inputLoginRequired").checked = true;
    }
    id("titleSettings").innerText = multilang({
        "en-US": "Settings",
        "zh-CN": "设置",
        "zh-TW": "設定"
    });
    id("lblLoginRequired").innerText = multilang({
        "en-US": "Require my password when receiving my files",
        "zh-CN": "接收我的文件时需要登录我的账号",
        "zh-TW": "接收我的檔案時需要登入我的賬號"
    });
    id("inputLoginRequired").onchange = function () {
        if (login.username) {
            settings["loginRequired"] = this.checked;
            fetch("https://api.rthsoftware.cn/backend/userdata/set", getPostData({
                "appname": appName,
                "key": "loginRequired",
                "token": login.token,
                "username": login.username,
                "value": this.checked.toString()
            })).then(function (response) {
                if (response.ok || response.status == 200) {
                    notify(multilang({
                        "en-US": "Settings are saved.",
                        "zh-CN": "设置已保存。",
                        "zh-TW": "設定已保存。"
                    }), 1500);
                } else {
                    error(response);
                }
            })
        } else {
            this.checked = false;
            menuItemLogin.click();
        }
    };
    id("btnDone5").innerText = multilang({
        "en-US": "Done",
        "zh-CN": "完成",
        "zh-TW": "完成"
    });
    id("btnDone5").onclick = function () {
        closePopup("popSettings");
    };
    closeMenu();
};
menuItemFeedback.onclick = function () {
    var btnCloseId = "btnClose" + new Date().getTime();
    showPopup([
        '<span class="btnClose" id="' + btnCloseId + '"></span>',
        '<p id="titleFeedback" class="p1"></p>',
        '<span class="line"></span>',
        '<a id="faq" class="link1" href="https://rthsoftware.cn/faq-ap" target="_blank"></a>&amp;<a id="qqGroup" class="link1" href="https://shang.qq.com/wpa/qunwpa?idkey=846414dde5b85a4ac77be8d6e63029d9abea174e571b52d45e4840257f5cb850" target="_blank"></a>',
        '<textarea id="txtFeedback"></textarea>',
        '<button class="btn1" id="btnSendFeed"></button>'
    ], null, "popFeedback");
    id("titleFeedback").innerText = multilang({
        "en-US": "Send Us a Message",
        "zh-CN": "向我们发送消息",
        "zh-TW": "向我們傳送訊息"
    });
    id("faq").innerText = multilang({
        "en-US": "FAQ",
        "zh-CN": "常见问题",
        "zh-TW": "常見問題集"
    });
    id("qqGroup").innerText = multilang({
        "en-US": "Our QQ Group #",
        "zh-CN": "我们的QQ群",
        "zh-TW": "我們的QQ群"
    }) + " 319496964";
    id("txtFeedback").placeholder = multilang({
        "en-US": "Enter the message here",
        "zh-CN": "在这里输入消息内容",
        "zh-TW": "在這裡輸入訊息內容"
    });
    id("btnSendFeed").innerText = multilang({
        "en-US": "Send",
        "zh-CN": "发送",
        "zh-TW": "傳送"
    });
    id("btnSendFeed").onclick = function () {
        if (login.username) {
            if (txtFeedback.value) {
                fetch("https://api.rthsoftware.cn/backend/feedback", getPostData({
                    "appname": appName,
                    "text": txtFeedback.value,
                    "token": login.token,
                    "username": login.username,
                    "ver": version
                })).then(function (response) {
                    if (response.ok || response.status == 200) {
                        alert(multilang({
                            "en-US": "Send successfully! We will process your feedback as soon as possible. Have a nice day :D",
                            "zh-CN": "发送成功！我们会尽快处理您的反馈。祝您有开心的一天 :D",
                            "zh-TW": "傳送成功！我們會盡快處理您的回饋。祝您有開心的一天 :D"
                        }));
                        closePopup("popFeedback");
                    } else {
                        error(response);
                    }
                });
            }
        } else {
            menuItemLogin.click();
        }
    };
    id(btnCloseId).onclick = function () {
        closePopup("popFeedback");
    };
    closeMenu();
};
menuItemSelectServer.onclick = function () {
    this.style.position = "absolute";
    this.style.marginLeft = "-100%";
    menuServers.style.display = "";
    menuServers.style.marginLeft = "0px";
};
inputFile.onchange = function () {
    uploader.addFile(this);
};
var uploader = new plupload.Uploader({
    "runtimes": "html5",
    "browse_button": "send",
    "drop_element": "send",
    "url": "http://127.0.0.1:8080/api/v1/upload",
    "chunk_size": chunkSize,
    init: {
        "FilesAdded": function (up, files) {
            console.log("up in filesadd", up);
            var btnCloseId = "btnClose" + new Date().getTime();
            showPopup([
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
            id(btnCloseId).onclick = function () {
                uploader.splice();
                closePopup("popSend");
            };
            id("filesSelected").innerText = multilang({
                "en-US": "You selected these files",
                "zh-CN": "您选择了这些文件",
                "zh-TW": "您選擇了這些檔案"
            });
            id("filesTip").innerText = login.email || multilang({
                "en-US": "Not Logged In",
                "zh-CN": "未登录",
                "zh-TW": "未登入"
            });
            plupload.each(files, function (file) {
                var newA = document.createElement("a");
                newA.classList.add("menu");
                newA.innerText = file.name;
                id("selectedFileList").appendChild(newA);
            });
            id("lblFilePsw").innerText = multilang({
                "en-US": "Password",
                "zh-CN": "密码",
                "zh-TW": "密碼"
            });
            id("inputFilePsw").placeholder = multilang({
                "en-US": "Password for files (Optional)",
                "zh-CN": "为文件设置下载密码，可留空",
                "zh-TW": "為檔案設定下載密碼，可留空"
            });
            id("lblMaxDl").innerText = multilang({
                "en-US": "Maximum Downloads",
                "zh-CN": "可下载次数",
                "zh-TW": "可下載次數"
            });
            id("inputMaxDl").value = files.length + 1;
            id("btnUpload").innerText = multilang({
                "en-US": "Upload",
                "zh-CN": "上传",
                "zh-TW": "上載"
            });
            id("btnUpload").onclick = function () {
                window.chunk = 1;
                window.fileCount = files.length;
                window.fileDone = 0;
                var downloads = id("inputMaxDl").value;
                if (!downloads || parseInt(downloads) < 1) {
                    downloads = window.fileCount + 1;
                }
                console.log("before");
                upload(up, files, {
                    "downloads": downloads,
                    "password": id("inputFilePsw").value
                });
                console.log("end");
            };
        },
        // "BeforeUpload":function(up,file){
        // 	window.option["multipart_params"]["key"]=window.uploadCode+"/"+window.key+"/1/"+file.name;
        // 	up.setOption(window.option);
        // },
        "UploadProgress": function (up, file) {
            var percent = file.percent;
            if (percent > 99) {
                percent = 99;
            }
            id("progressBarBg0").style.background = "rgba(0,0,0,0.1)";
            document.title = "[" + percent + "%] " + title;
            if (percent == 99) {
                id("lblUploadP").innerText = multilang({
                    "en-US": "Almost there",
                    "zh-CN": "马上就好",
                    "zh-TW": "馬上就好"
                }) + " (" + (window.fileDone + 1) + "/" + window.fileCount + ")";
            } else {
                id("lblUploadP").innerText = multilang({
                    "en-US": "Uploading",
                    "zh-CN": "正在上传",
                    "zh-TW": "正在上載"
                }) + " " + file.name + " " + percent + "%";
            }
            id("progressBar0").style.width = percent + "px";
        },
        // "ChunkUploaded":function(up,file){
        // 	window.chunk++;
        // 	window.option["multipart_params"]["key"]=window.uploadCode+"/"+window.key+"/"+window.chunk+"/"+file.name;
        // 	up.setOption(window.option);
        // },
        "FileUploaded": function () {
            window.fileDone++;
            if (window.fileDone >= window.fileCount) {
                uploadSuccess(window.uploadCode);
            }
        },
        "Error": function (up, err) {
            console.log("Error", up, err);
            console.error(err.response);
        }
    }
});
uploader.init();
if (isiOS) {
    var longPress, longPressTimeout;
    send.addEventListener("touchstart", function () {
        send.classList.add("send-active");
        longPress = false;
        longPressTimeout = setTimeout(function () {
            longPress = true;
        }, 1000);
    }, {
        passive: true
    });
    send.addEventListener("touchend", function (e) {
        send.classList.remove("send-active");
        clearTimeout(longPressTimeout);
        if (longPress) {
            send.oncontextmenu(e);
        }
    }, {
        passive: true
    });
}
addEventListener("load", function () {
    if (parseInt($_GET["code"]) >= 1000 && parseInt($_GET["code"]) <= 999999) {
        receive.click();
        if (id("popRecv")) {
            id("inputCode").value = $_GET["code"];
            id("btnSub").click();
            location.hostname && history.replaceState(null, null, "/")
        }
    } else if (/MSIE|Trident/i.test(navigator.userAgent) && confirm(multilang({
        "en-US": "Please upgrade your web browser.",
        "zh-CN": "请升级您的网络浏览器。",
        "zh-TW": "請升級您的網路瀏覽器。"
    }))) {
        location.href = "https://www.google.cn/chrome/";
    }
    if (chs) {
        txtVer.innerText = "闽ICP备18016273号";
        txtVer.onclick = function () {
            open("http://www.beian.miit.gov.cn/");
        };
        txtVer.oncontextmenu = function () {
            txtVer.innerText = version;
            txtVer.onclick = null;
            return false;
        };
    } else {
        txtVer.innerText = version;
    }
});
