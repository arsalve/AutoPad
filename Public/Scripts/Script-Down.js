var url = '';
if (window.location.href.includes("localhost:8080")) {
    url = "http://localhost:8080";
} else {
    url = "https://project-notepad.herokuapp.com";
}
// Importing 'crypto' module 

function instaLoad(){
if (document.getElementById('Insta').value!="") {
    

    var data = JSON.stringify({
        "url":document.getElementById('Insta').value
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var dUrl=(this.responseText);
            if (dUrl.includes(".mp4")) {
                document.querySelector("#downloadBtn").href=dUrl;
                document.querySelector("#downloadBtn").click();
                window.open(dUrl);
            } else {
                console.log(this.responseText);
                alert("Unable to find Video")
            }
            
        }
    });

    xhr.open("POST", url+"/Instdownload");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);

}
else{
    alert("enter URL")
}
}


function YTD() {

    document.getElementById("downform").action = url + "/YTDdownload";
    document.getElementById("Download").onclick = "saveText()";
    document.getElementById("Download").innerHTML = "Back to Autopad";

    document.getElementById("YTD").hidden = false;
    document.getElementById("main").hidden = true

}

function YTDDL() {
    if (document.getElementById("YTDURL").value != "" || document.getElementById("YTDURL").value != undefined || document.getElementById("YTDURL").value != null) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url + "/YTDdownload");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        var data = {
            'url': document.getElementById("YTDURL").value
        };
        xhr.send(JSON.stringify(data));
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                document.write(this.responseText);
            }
        });
    }
}

window.addEventListener("beforeunload", function (event) {
    Update();
    sessionStorage.clear()
});