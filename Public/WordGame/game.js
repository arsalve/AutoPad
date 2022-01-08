function player(name, failed, score, right, lifeT, gameNo) {
	this.name = name;
	this.failed = failed;
	this.right = right;
	this.gameNo = gameNo;
	this.lifetimeCounter = lifeT;
	this.score = sc;
}
var words = [];
var wordsHint = [];
var failed = [];
var right = [];
var skiped = [];
var playArray = [];
var playhint = [];
var score = 0;
var life = 20;
var cou, sc = 10;
var lifetime = 0;
var lifetimeCounter = -life;
var time = 0;
var playerName = "abc";
var mail = "";
words = ["about", "all", "also", "and", "as", "at", "be", "because", "but", "by", "can", "come", "could", "day", "do", "even", "find", "first", "for", "from", "get", "give", "go", "have", "he", "her", "here", "him", "his", "how", "I", "if", "in", "into", "it", "its", "just", "know", "like", "look", "make", "man", "many", "me", "more", "my", "new", "no", "not", "now", "of", "on", "one", "only", "or", "other", "our", "out", "people", "say", "see", "she", "so", "some", "take", "tell", "than", "that", "the", "their", "them", "then", "there", "these", "they", "thing", "think", "this", "those", "time", "to", "two", "up", "use", "very", "want", "way", "we", "well", "what", "when", "which", "who", "will", "with", "would", "year", "you", "your"];
wordsHint = ["about", "all", "also", "and", "as", "at", "be", "because", "but", "by", "can", "come", "could", "day", "do", "even", "find", "first", "for", "from", "get", "give", "go", "have", "he", "her", "here", "him", "his", "how", "I", "if", "in", "into", "it", "its", "just", "know", "like", "look", "make", "man", "many", "me", "more", "my", "new", "no", "not", "now", "of", "on", "one", "only", "or", "other", "our", "out", "people", "say", "see", "she", "so", "some", "take", "tell", "than", "that", "the", "their", "them", "then", "there", "these", "they", "thing", "think", "this", "those", "time", "to", "two", "up", "use", "very", "want", "way", "we", "well", "what", "when", "which", "who", "will", "with", "would", "year", "you", "your"];
var loc;
var pau = false;
//Genrates array of random words
function init() {
	for (i = 0; i < words.length; i++) {
		loc = Math.round(Math.random() * (99 - 0) + 0)
		playArray.push(words[loc]);
		playhint.push(wordsHint[loc]);
	}

}
init();
//word genration end
//validating the entered vale
function submitWord() {
	var temp = document.getElementById("word").value;
	if (temp == playArray[0]) {
		score = playArray[0].length;
		life = life + score;


		right.push(playArray[0]);
		document.getElementById("word").value = "";
	} else {
		failed.push(playArray[0]);
		playArray.push(playArray[0]);
		playhint.push(playhint[0])
		document.getElementById("word").value = "";
	}
	playArray.splice(0, 1);
	playhint.splice(0, 1);
	if (playArray.length == 0) {
		random()
	}
	play();
	document.getElementById("key").innerHTML = "";
	buttons();
}
//skipping the word
function skipWord() {
	skiped.push(playArray[0]);
	playArray.splice(0, 1);
	playhint.splice(0, 1);
	play();
	loc = Math.round(Math.random() * (99 - 0) + 0)
	playArray.push(words[loc]);
	playhint.push(wordsHint[loc]);
}
//button Creation//
function buttons() {
	var keys = [];
	var i;
	var lockey = Math.round(Math.random() * (25 - 0) + 0);
	//random();
	keys = ["y", "b", "w", "d", "u", "f", "t", "h", "s", "j", "k", "q", "i", "n", "e", "p", "l", "r", "m", "g", "o", "v", "c", "x", "a", "z"];
	for (i = 1; i <= 26; i++) {
		var temp = document.getElementById("key").innerHTML;
		document.getElementById("key").innerHTML = temp + "<button id =" + keys[lockey] + " class='btn btn-default btn-circle' onclick=Button('" + keys[lockey] + "')>" + keys[lockey] + "</button>";
		if (lockey == 25) {
			lockey = 0;
		} else {
			lockey++;
		}

	}
	temp = document.getElementById("key").innerHTML;
	document.getElementById("key").innerHTML = temp + "<button id = 'backspace' class='btn-Back' onclick=backspace()>Backspace</button> &nbsp";
	document.getElementById("ingame").src='assets/'+Math.round(Math.random() * (20 - 0) + 0)+".gif";

}
//timmer//
function counter() {
	if (pau == false) {
		time++;
		console.log(life);
		document.getElementById("pa").innerHTML = "Timer : " + life;
		sc = lifetimeCounter + life;
		document.getElementById("scoreDisplay").innerHTML = "score :" + sc;
		lifetimeCounter++;
		life--;
		if (life < 0) {
			clearInterval(cou);
			alert("Game Over with lifetime " + lifetimeCounter);
			var temp = "";
			for (i = 0; i < failed.length; i++) {
				temp = temp + " " + failed[i];
			}
			alert("Failed Words Are :--> " + temp);
			
			document.getElementById("pa").innerHTML = "Game Over";
			var dec = confirm("play again");
			if (dec) {
				location.reload();
			} else {
				location.reload();
			}
			endgame();
		}
	}
}
//start

function start() {
	document.getElementById("pla").hidden = true;
	document.getElementById("landing").hidden = true;
	playerName = localStorage.getItem('PlayerName');
	mail = localStorage.getItem('mail')|| "Not Provided";
	playerNameht = document.getElementById("name").value;
	mailht = document.getElementById("mail").value;

	if (playerName == null || mail == null) {
		if (playerNameht != "" || mailht != "") {
			localStorage.setItem('PlayerName', playerNameht);
			localStorage.setItem("mail", mailht);
			start();
		}
		document.getElementById("info").hidden = false;
		playerName = document.getElementById("name").value;
		mail = document.getElementById("mail").value;

	} else {
		document.getElementById("info").hidden = true;
		document.getElementById("landing").hidden = true;
		document.getElementById("mot").hidden = false;
		setTimeout(() => { play() }, 4000);

	}



}


//play function
function play() {
	document.getElementById("mot").hidden = true;
	document.getElementById("info").hidden = true;
	document.getElementById("pla").hidden = false;
	document.getElementById("main").hidden = false;
	document.getElementById("info").hidden = true;
	document.getElementById("landing").hidden = true;
	document.getElementById("ingame").hidden = false;
	try {

		if (playerName == null||playerName=="") {
			playerName = prompt("Enter Player Name", "");
			localStorage.setItem('PlayerName', playerName);
		}

	} catch (e) {
		if (playerName == "abc") {
			playerName = prompt("Enter Player Name", "");
			localStorage.setItem('PlayerName', playerName);
		}
	}
	clearInterval(cou);
	cou = setInterval(counter, 1000);
	document.getElementById("key").innerHTML = "";
	buttons();
	document.getElementById("hint").innerHTML = "Word : " + playhint[0];
	document.getElementById("pla").setAttribute("onclick", "pause()");
	document.getElementById("pla").innerHTML = "pause";
	document.getElementById("playe").innerHTML = "your name :" + playerName;
	document.getElementById("word").value = "";

}

function pause() {
	pau = true;
	document.getElementById("main").hidden = true;
	document.getElementById("pause").hidden = false;
	document.getElementById("pla").setAttribute("onclick", "resume()");
	document.getElementById("pla").innerHTML = "Resume";
}

function resume() {
	pau = false;
	document.getElementById("pla").setAttribute("onclick", "pause()");
	document.getElementById("pla").innerHTML = "pause";
	document.getElementById("key").innerHTML = "";
	document.getElementById("main").hidden = false;
	document.getElementById("pause").hidden = true;
	buttons();
}
//End Game function
function endgame() {

	document.getElementById("ingame").hidden = true;
	var playe = new player(playerName, failed, sc, right, lifetimeCounter);
	storeData(playerName, playe);
	clearInterval(cou);
	document.getElementById("pla").setAttribute("onclick", "play()");
	document.getElementById("pla").innerHTML = "Play";
	$.ajax({
		url: "/datastore.php",
		type: "POST",
		data: {
			"sc": JSON.stringify(playe),
			"name": playerName
		},
		success: function (response) {
			// You will get response from your PHP page (what you echo or print)
			alert(" your Score" + sc);


		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
	
}
//storing Data in local memory
function storeData(name, player) {
	var teobj = [];
	var flag = 0;

	var temp;
	for (var i = 0; i < localStorage.length; i++) {
		if (name == localStorage.key(i)) {
			flag++;
		}
	}
	if (flag == 1) {
		var stored = new Array();
		stored = JSON.parse(localStorage.getItem(name));
		stored.push(player);
		localStorage.setItem(name, JSON.stringify(stored));
		mail = localStorage.getItem("mail");
		if (mail == null) {
			mail = prompt("Enter Your mail ID");
			localStorage.setItem("mail", mail);
		}
		
		var PriviousGame = JSON.parse(localStorage.getItem(player.name));
		var prviousstring = '<table><th><td>name</td><th><td>Right Word</td><th><td>Score</td></th>';
		for (var i = 0; i < PriviousGame.length; i++) {
			prviousstring = prviousstring + "<tr><td>" + JSON.stringify(PriviousGame[i].name) + "</td><td> " + JSON.stringify(PriviousGame[i].right.toString()) + "</td><td> " + JSON.stringify(PriviousGame[i].score) + "</td>";
			if (i == PriviousGame.length - 1) {
				prviousstring = prviousstring + "</table>";
			}
		}

		try {
			$.ajax({
				url: "/mail.php?report=" + JSON.stringify(player),
				type: "post",
				data: {
					'OldRes': prviousstring,
					'email': mail
				},
				success: function (response) {
					// You will get response from your PHP page (what you echo or print)
					alert("Congratulations you are new High Scorer");
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		} catch (e) {
			var HS = 0;

		}



	} else {
		var players = new Array();
		players.push(player);
		window.localStorage.setItem(name, JSON.stringify(players));
	}
	//High Score Management

	var HS = JSON.parse(localStorage.getItem("highscore"));
	var HSscore = HS.score;
	temp = {
		"name": name,
		"score": lifetimeCounter
	}
	if (player.score > HSscore) {





		try {
			$.ajax({
				url: "/data.php?q=take",
				type: "post",
				data: {
					'HS': JSON.stringify(temp)
				},
				success: function (response) {
					// You will get response from your PHP page (what you echo or print)
					alert("Congratulations you are new High Scorer");
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		} catch (e) {
			var HS = 0;

		}
	}

}

//window.location.reload();
function Button(key) {
	var a = document.getElementById("word").value;
	document.getElementById("word").value = a + key;
}


function backspace() {
	var a = document.getElementById("word").value;
	a = a.slice(0, -1)
	document.getElementById("word").value = a;
}
//keybord Ends//
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
//ingame image change//
