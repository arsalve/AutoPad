   //var url="http://localhost:8080"
   var url = "https://project-notepad.herokuapp.com"
   
   function Markdown() {
    document.querySelector("#main > div.main_body").style="margin-top: 10%";
    document.querySelector("#Markdown > a").onclick="";

    var simplemde = new SimpleMDE({ element: document.getElementById("output"),showIcons: ["code", "table"],
	spellChecker: true });
 
   }
   function load_text() {
  
       if (document.location.hash != "") {
           var data = JSON.stringify({
               "id": document.location.hash,
           });
           var xhr = new XMLHttpRequest();
           xhr.addEventListener("readystatechange", function () {
               if (this.readyState === 4) {
                   document.getElementById("output").value = JSON.parse(this.response)[0].data;

                   console.log(this.responseText);
                   debugger
               }
           });
           xhr.open("POST", url + "/find");
           xhr.setRequestHeader("Content-Type", "application/json");
           xhr.send(data);
       } else {
           document.location.hash = Date.now();
           document.getElementById("output").value = "Use " + document.location + " to access the data on any device";
       }
   }

   function Update() {
       var data = JSON.stringify({
           "id": document.location.hash,
           'data': document.getElementById("output").value
       });
       var xhr = new XMLHttpRequest();
       xhr.addEventListener("readystatechange", function () {
           if (this.readyState === 4) {
               console.log(this.responseText);
           }
       });
       xhr.open("POST", url + "/Update");
       xhr.setRequestHeader("Content-Type", "application/json");
       xhr.send(data);
   }

   function underline_click() {
       document.getElementById("output").style.textDecoration = "underline";
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