     var url="http://localhost:8080/"
     var url="https://project-notepad.herokuapp.com"
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

             xhr.open("POST", url+"/find");
             xhr.setRequestHeader("Content-Type", "application/json");

             xhr.send(data);

         } else {
             document.getElementById("output").value = "Put #<anyrandomstring> to store and access the data";
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

         xhr.open("POST",  url+"/Update");
         xhr.setRequestHeader("Content-Type", "application/json");

         xhr.send(data);
     }

     function underline_click() {
         document.getElementById("output").style.textDecoration = "underline";
     }

     setTimeout(function () {
         if (document.location.hash != "")
             Update();

     }, 60000);