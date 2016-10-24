/**********************************************
		Pure Javascript 2016
***********************************************/
// Wkipedia Viewer
// When click search icon
	// search icon disappear
	// form search appear
// After typing search query and hit "enter"
	// Disappear text "Click icon to search"
	// Get data from Wikipedia through API search
	// Display 10 results on page
		// Title of result
		// Snippet of result
		// When click on each result, open a new tab go to result on wikipedia

/**********************************************
***********************************************/

var search = document.getElementById('search');
var formSearch = document.getElementById("form-search");
var wikiViewer = document.getElementById('wiki-viewer');
var pageid = [];
var countEnter = 0;
var removeList = document.getElementsByClassName("result");


search.addEventListener('click',clickSearch, false);


function clickSearch(){
	var searchHTML = "";

    searchHTML += "<form id='formSubmit' action=''>";
		searchHTML += "<input id='value-search' type='text' name='formsearch'>";
  	searchHTML += "</form>";

   	search.innerHTML = "";
   	formSearch.innerHTML = searchHTML;

   document.getElementById("value-search").addEventListener('keydown',stopSubmit, false);
	document.getElementById("value-search").addEventListener('keyup',makeRequest, false);
}

function myFunction(arr){
	var out = "<ul id='mylist'>";
	var obj = arr.query.pages;
	var i;
	for(var prop in obj){
		pageid.push(obj[prop]);
	}


	for(i = 0; i < pageid.length; i++){
		out += "<li class='result'>";
		out += "<a  href='http://en.wikipedia.org/wiki/index.html?curid=";
		out += pageid[i].pageid + "'>";
		out += "<p class='title-result'>" + pageid[i].title + "</p>";
		out += "<p class='extract-result'>" + pageid[i].extract + "</p>";
		out += "</a>";
		out += "</li>";
	}

    out += "</ul>";
	wikiViewer.innerHTML = out;


	for (i = 0; i < removeList.length - 10; i++){
			removeList[i].style.display = "none";
	}

}

function stopSubmit(event){
	if(event.keyCode == 13)	{
		console.log("Enter Press Already");
		event.preventDefault();
		return false;
	}

}

function makeRequest(evt){
	if(evt.keyCode == 13){
		countEnter += 1;

		document.getElementById("search-des").innerHTML = "";
		document.getElementById("frame").style.marginTop = "1em";

		console.log("Get New List");
		var valueSearch = document.getElementById("value-search").value;

		var xmlhttp = new XMLHttpRequest();
			var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts&exsentences=1&exintro&explaintext&exlimit=max&origin=*";
			xmlhttp.onreadystatechange = function(){
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
						var myArr = JSON.parse(xmlhttp.responseText);
						myFunction(myArr);
				}
			};

		xmlhttp.open("POST",url,true);
		xmlhttp.send('gsrsearch=' + encodeURIComponent(valueSearch));

		console.log(valueSearch);
		if (countEnter >= 2) {
			console.log("Delete Old List");



		}


	}
}
