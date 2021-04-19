var url = '';
if (window.location.href.includes("localhost:8080")) {
    url = "http://localhost:8080";
} else {
    url = "https://project-notepad.herokuapp.com";
}
// Importing 'crypto' module 

function load_text(Inst) {
    var Hash;
    Hash = sessionStorage.getItem('Hash');
    if (Hash == null) {
        var PWD;
        sessionStorage.getItem('Password') == null ? PWD = prompt('Enter Your Password For Encryption(default=123', 123) : PWD = sessionStorage.getItem('Password');
        sessionStorage.setItem('Hash', stringToHash(PWD));
        Hash = sessionStorage.getItem('Hash');
        sessionStorage.setItem('Password', PWD);
    }
    if (document.location.hash != "") {
        var data = JSON.stringify({
            "id": document.location.hash,
        });
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {

            if (this.readyState === 4) {

                if (this.response != "object not Found") {
                    var responseData = JSON.parse(this.response)[0];
                    document.getElementById("Instruction").hidden = true;
                    document.getElementById("UpdateStatus").hidden = false;
                    document.getElementById("UpdateStatusText").innerHTML = 'Last Updated: ' + new Date(responseData.updatedAt);
                    sessionStorage.setItem("OGHash", responseData.Hash);
                    if (Inst == true) {
                        Decrypted = CryptoJS.AES.decrypt(responseData.data, sessionStorage.getItem('Password'))
                        let Decry = Decrypted.toString(CryptoJS.enc.Utf8);
                        if (Decry.includes("data")) {
                            if (Decry.includes("data:image")) {
                                // saveIMG() 

                                document.getElementById("text").value = Decry;
                                document.getElementById("text").innerHTML = Decry;
                                temp = document.getElementById("output").innerHTML;
                                document.getElementById("output").innerHTML = ' <img src=" ' + Decry + '" id="ConvIMG" class="output" ></img>' + temp;
                                document.getElementById("text").hidden = true;
                            } else {

                            }
                        } else {
                            document.getElementById("text").value = Decry;
                            document.getElementById("text").innerHTML = Decry;
                        }
                    }
                    console.log(responseData);
                } else {
                    document.getElementById("Instruction").hidden = false;
                    document.getElementById("UpdateStatus").hidden = true;
                    var PWD;
                    sessionStorage.getItem('Password') == null ? PWD = prompt('Enter Your Password For Encryption(default=123', 123) : PWD = sessionStorage.getItem('Password');
                    sessionStorage.setItem('Password', PWD);
                    sessionStorage.setItem('OGHash', 'new');
                }

            }
        });
        xhr.open("POST", url + "/find");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send(data);
    } else {
        document.location.hash = Date.now();
        document.getElementById("text").value = "Use " + document.location + " to access the data on any device";
        sessionStorage.setItem('OGHash', 'new');
    }
}

function donload() {

    document.getElementById("text").hidden = false;
    var content = document.getElementById('text').innerHTML || "";

    strings = content.split(",");
    var extension, btype;
    switch (strings[0]) { //check image's extension
        case "data:image/jpeg;base64":
            extension = (document.location.hash).replace('#', "") + ".jpeg";
            btype = 'image/jpeg';
            break;
        case "data:image/png;base64":
            extension = (document.location.hash).replace('#', "") + ".png";
            btype = 'image/png';
            break;
        default: //should write cases for more images types
            extension = (document.location.hash).replace('#', "") + ".txt";
            btype = 'text/plain';
            break;
    }
    // any kind of extension (.txt,.cpp,.cs,.bat)
    var blob = new Blob([content], {
        type: btype
    });
    var saver = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    var blobURL = saver.href = URL.createObjectURL(blob),
        body = document.body;

    saver.download = extension;

    body.appendChild(saver);
    saver.dispatchEvent(new MouseEvent("click"));
    body.removeChild(saver);
    URL.revokeObjectURL(blobURL);
    document.getElementById("text").hidden = true;

}

function Update() {
    var Hash;
    try {
        Hash = sessionStorage.getItem('Hash');
    } catch {
        var PWD;
        sessionStorage.getItem('Password') == null ? PWD = prompt('Enter Your Password For Encryption(default=123)', 123) : PWD = sessionStorage.getItem('Password');
        sessionStorage.setItem('Hash', stringToHash(PWD));
        Hash = sessionStorage.getItem('Hash');
        sessionStorage.setItem('Password', PWD);
    }

    var Encrypted = CryptoJS.AES.encrypt(document.getElementById("text").value, sessionStorage.getItem('Password'));
    var data = JSON.stringify({
        "id": document.location.hash,
        'data': Encrypted.toString(),
        'Hash': Hash,
        'Encrypted': true

    });
    if (sessionStorage.getItem('OGHash') == null) {
        load_text()
    }
    if (sessionStorage.getItem('OGHash') == Hash || sessionStorage.getItem('OGHash') == 'new') {
        var xhr = new XMLHttpRequest();
        xhr.open("PATCH", url + "/Update");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send(data);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });
    } else {
        var PWD;
        sessionStorage.getItem('Password') == null ? PWD = prompt('Enter Your Password For Encryption(default=123)', 123) : PWD = sessionStorage.getItem('Password');
        sessionStorage.setItem('Password', PWD);
        sessionStorage.setItem('Hash', stringToHash(PWD));
        Hash = sessionStorage.getItem('Hash');
    }
}
setTimeout(function () {
    if ((document.location.hash != "") && (document.getElementById("text").value != "") && (document.getElementById("text").value != "Use " + document.location + " to access the data on any device"))
        Update();

}, 6000);

function saveIMG() {
    
    if (document.getElementById("saveBTN").innerHTML == "Text Mode") {
        document.getElementById("text").hidden = false;
        text()
    } else {
        document.getElementById("saveBTN").innerHTML = "Text Mode";
        document.getElementById("imgSelector").hidden = false;
        document.getElementById("text").hidden = true;
    }

}

function text() {
    
   
    document.getElementById("saveBTN").onclick = "saveIMG()";
    document.getElementById("saveBTN").innerHTML = "Image Mode";
    document.getElementById("imgSelector").hidden = true;
    document.getElementById("output").hidden = false
}

function convIMG(Img) {
    var file = Img.files[0];
    var reader = new FileReader();

    document.getElementById("text").hidden = false;
    reader.onloadend = function () {
        document.getElementById("text").hidden = false;
        document.getElementById("text").innerHTML = reader.result;
        var temp = document.getElementById("output").innerHTML;
        try {
            document.getElementById("ConvIMG").src = reader.result;
        } catch (e) {
            document.getElementById("output").innerHTML = ' <img src=" " id="ConvIMG" class="output" ></img>' + temp;
            document.getElementById("ConvIMG").src = reader.result;
        }
        console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(file);

}
function Clear() {
    var value=prompt("Did You Really want to clear the data Yes/No",'Yes')
    if(value=='Yes'){
        document.getElementById("text").innerHTML="";
        document.getElementById("text").value="";
        document.getElementById("ConvIMG").src ="";
        document.getElementById("ConvIMG").hidden=true;
        Update();
    }
    
}
function copyURL() {
    var copyText = window.location.href;
    window.prompt("Copy to clipboard: Ctrl+C, Enter", copyText);
}

function stringToHash(string) {

    var hash = 0;

    if (string.length == 0) return hash;

    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}
window.addEventListener("beforeunload", function (event) {
    Update();
    sessionStorage.clear()
});