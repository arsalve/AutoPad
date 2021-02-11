   if (window.location.href.includes("localhost:8080")) {
       var url = "http://localhost:8080"
   } else if(window.location.href.includes('https://project-notepad.herokuapp.com')) {
       var url = "https://project-notepad.herokuapp.com"
   }
   else if(window.location.href.includes('http://autopad.dinafo.com')){
       var url='http://autopad.dinafo.com';
   }
   // Importing 'crypto' module 



   function load_text() {
       var Hash;
       Hash = sessionStorage.getItem('Hash');
       var PWD = prompt("Enter Password")
       if (Hash == null) {
          
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

                       Decrypted = CryptoJS.AES.decrypt(responseData.data, sessionStorage.getItem('Password'))
                       document.getElementById("output").value = Decrypted.toString(CryptoJS.enc.Utf8);
                       if (responseData.Encrypted == true) {
                           sessionStorage.setItem("OGHash", responseData.Hash)
                       }
                       console.log(responseData);
                   }

               } else {
                   document.getElementById("Instruction").hidden = false;
                   document.getElementById("UpdateStatus").hidden = true;
               }
           });
           xhr.open("POST", url + "/find");
           xhr.setRequestHeader("Content-Type", "application/json");
           xhr.send(data);
       } else {
           sessionStorage.clear();
           document.location.hash = Date.now();
           document.getElementById("output").value = "Use " + document.location + " to access the data on any device";
        
           sessionStorage.setItem('Hash', stringToHash(PWD));
           Hash = sessionStorage.getItem('Hash');
           sessionStorage.setItem('Password', PWD);
           sessionStorage.setItem('OGHash', 'new');
       }
   }

   function Update() {
       var Hash, OGHash;
       try {
           Hash = sessionStorage.getItem('Hash');
           OGHash = sessionStorage.getItem("OGHash");
           if(Hash==undefined||OGHash==undefined){
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
 
                if (this.readyState === 4) {
                    if (this.response != "object not Found") {
                        var responseData = JSON.parse(this.response)[0];
                        document.getElementById("Instruction").hidden = true;
                        document.getElementById("UpdateStatus").hidden = false;
                        document.getElementById("UpdateStatusText").innerHTML = 'Last Updated: ' + new Date(responseData.updatedAt);
                        Decrypted = CryptoJS.AES.decrypt(responseData.data, sessionStorage.getItem('Password'))
                        if (responseData.Encrypted == true) {
                            sessionStorage.setItem("OGHash", responseData.Hash)
                        }
                        console.log(responseData);
                    }
 
                } else {
                    document.getElementById("Instruction").hidden = false;
                    document.getElementById("UpdateStatus").hidden = true;
                }
            });
            xhr.open("POST", url + "/find");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
            var PWD = prompt("Enter Password")
            sessionStorage.setItem('Hash', stringToHash(PWD));
            Hash = sessionStorage.getItem('Hash');
            sessionStorage.setItem('Password', PWD);
           }
       }
       catch(e) {
        console.log(e + 'Due to which we are unable to process  data');
          
       }

       var Encrypted = CryptoJS.AES.encrypt(document.getElementById("output").value, sessionStorage.getItem('Password'));
       var data = JSON.stringify({
           "id": document.location.hash,
           'data': Encrypted.toString(),
           'Hash': Hash,
           'Encrypted': true

       });
       if (OGHash == Hash || OGHash == 'new') {
           var xhr = new XMLHttpRequest();
           xhr.open("PATCH", url + "/Update");
           xhr.setRequestHeader("Content-Type", "application/json");
           xhr.send(data);
           xhr.addEventListener("readystatechange", function () {
               if (this.readyState === 4) {
                   console.log(this.responseText);
               }
           });
       } else {
           alert('error');
           var PWD = prompt("Enter Password")
           sessionStorage.setItem('Password', PWD);
           sessionStorage.setItem('Hash', stringToHash(PWD));
           Hash = sessionStorage.getItem('Hash');
       }
   }


   setTimeout(function () {
       if ((document.location.hash != "") && (document.getElementById("output").value != "") && (document.getElementById("output").value != "Use " + document.location + " to access the data on any device"))
           Update();

   }, 6000);

   function copyText() {
       var copyText = document.getElementById("output").value;
       window.prompt("Copy to clipboard: Ctrl+C, Enter", copyText);
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
       sessionStorage.clear()
   });