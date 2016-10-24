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


search.addEventListener('click',clickSearch, false);


function clickSearch(){
	var searchHTML = "";
    searchHTML += "<form id='formSubmit' action=''>";
		searchHTML += "<input id='value-search' type='text' name='formsearch'>";
  	searchHTML += "</form>";

   	search.innerHTML = "";
   	formSearch.innerHTML = searchHTML;

		document.getElementById("value-search").focus();
   	document.getElementById("value-search").addEventListener('keydown',stopSubmit, false);
		document.getElementById("value-search").addEventListener('keyup',startSearch, false);
}

function getData(arr){
		if (typeof arr.query !== 'undefined') {
						var pageid = [];
						var out = '';
						var obj = arr.query.pages;
						for(var prop in obj){
							pageid.push(obj[prop]);
							}
								pageid.forEach(function(value){
									out += "<li class='result'>";
									out += "<a  target='_blank' href='http://en.wikipedia.org/wiki/index.html?curid=" + value.pageid + "'>";
									out += "<p class='title-result'>" + value.title + "</p>";
									out += "<p class='extract-result'>" + value.extract + "</p>";
									out += "</a>";
									out += "</li>";
									});
									wikiViewer.innerHTML = out;
			} else {
						wikiViewer.innerHTML = "<li class='result'><a>Sorry, we don't have any result. Please try again.</a></li>";
			}

}

function stopSubmit(event){
	if(event.keyCode == 13)	{
		event.preventDefault();
		return false;
	}
}

function startSearch(evt){
	if(evt.keyCode == 13){
		document.getElementById("search-des").innerHTML = "";
		document.getElementById("frame").style.marginTop = "1em";
		var valueSearch = document.getElementById("value-search").value;

		var xmlhttp = new XMLHttpRequest();
		var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&";
		url += "generator=search&prop=extracts&exsentences=1&exintro&explaintext&exlimit=max&origin=*";
			xmlhttp.onreadystatechange = function(){
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
						var myData = JSON.parse(xmlhttp.responseText);
						getData(myData);
				}
			};

		xmlhttp.open("POST",url,true);
		xmlhttp.send('gsrsearch=' + encodeURIComponent(valueSearch));

	}
}
