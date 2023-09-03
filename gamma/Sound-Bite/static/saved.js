var summaries = [];

var TAGS = [];

function mytags(tagname) {
	if (tagname != "") {
		if (TAGS.indexOf(tagname) == -1) {
			TAGS.push(tagname);
			var division = document.getElementById("_tag_");
			var btn = document.createElement("button");
			btn.innerText = tagname;
			btn.setAttribute("class", "tags");
			btn.setAttribute("id", tagname);
			btn.setAttribute("class", "tags");
			btn.setAttribute("onclick", "btn_remove('" + tagname + "')");
			division.append(btn);
		}
	}
}
function btn_remove(temp) {
	TAGS.pop(temp);
	document.getElementById(temp).remove();
}

var searchBtn = document.getElementById("searchButton");
searchBtn.addEventListener("click", getSummaries);
var searchInput = document.getElementById("searchTextbox");
searchInput.addEventListener("keydown", function (e) {
	if (e.code === "Enter") {
		//checks whether the pressed key is "Enter"
		getSummaries();
	}
});

async function getSummaries() {
	var parent = document.getElementById("summaryList");
	parent.innerHTML = "";
	var searchName = document.getElementById("searchTextbox").value;
	var searchDate = document.getElementById("searchDate").value;
	var data = {
		input: searchName,
		categories: TAGS,
		timestamp: Date.parse(searchDate),
	};
	try {
		const response = await axios.post("/search", data);
		summaries = response.data;
		summaries = summaries.sort((a, b) => b.timestamp - a.timestamp);
		console.log(response.data);
	} catch (error) {
		console.error("Error getting summaries", error);
	}
	summaries.forEach(addContent);
	addSummary(summaries[0].timestamp);
}

function addContent(mdata) {
	//var del=document
	var parent = document.getElementById("summaryList");
	var temp = document.createElement("div");
	temp.setAttribute("class", "summaryListItem");
	var temp1 = document.createElement("div");
	temp1.setAttribute("class", "summaryItemTitle name");
	temp1.setAttribute("onclick", "addSummary(" + mdata.timestamp + ")");
	temp1.innerHTML = mdata.title;
	temp.append(temp1);
	var temp2 = document.createElement("div");
	temp2.setAttribute("class", "summaryItemTitle time");
	temp2.innerHTML = new Date(mdata.timestamp).toLocaleString(undefined, {
		timeStyle: "short",
		dateStyle: "long",
	});
	temp2.setAttribute("onclick", "addSummary(" + mdata.timestamp + ")");
	var temp3 = document.createElement("div");
	temp3.setAttribute("class", "summaryDeleteButton");
	temp3.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
	temp3.setAttribute("onclick", "deleteSummary(" + mdata.timestamp + ")");

	temp.append(temp1);
	temp.append(temp2);
	temp.append(temp3);
	parent.append(temp);
}

function addSummary(ntime) {
	var content = summaries.find((element) => element.timestamp == ntime);
	var temp2 = document.getElementById("summaryTitle");
	temp2.innerText = content.title;
	var temp3 = document.getElementById("summaryText");
	temp3.innerText = content.summary;
	var temp4 = document.getElementById("summaryTags");
	temp4.innerHTML = "";
	content.categories.forEach((category) => {
		var summaryTag = document.createElement("div");
		summaryTag.setAttribute("class", "summaryTagItem");
		summaryTag.innerHTML = category;
		temp4.appendChild(summaryTag);
	});
}

async function deleteSummary(timestamp) {
	try {
		// Send the timestamp to the server using the DELETE method
		data = { timestamp: timestamp };
		const response = await axios.post("/deletesummary", data);
		console.log(response.data);
		// Reload the page after the delete operation is complete
		summaries = summaries.filter(
			(summary) => summary.timestamp !== timestamp
		);
		var parent = document.getElementById("summaryList");
		parent.innerHTML = "";
		summaries.forEach(addContent);
		addSummary(summaries[0].timestamp);
	} catch (error) {
		console.error("Error:", error);
	}
}
