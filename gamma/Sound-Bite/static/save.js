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

async function cancel() {
	window.location.assign("../");
}

async function saved() {
	var title = document.getElementById("save-title").value;
	if (TAGS.length == 0) {
		document.getElementById("save-title-btn").style.animation =
			" glowing 1000ms 1";
		var delayInMilliseconds = 1100; //1 second
		setTimeout(function () {
			document
				.getElementById("save-title-btn")
				.style.removeProperty("animation");
		}, delayInMilliseconds);
	} else {
		var content =
			document.getElementsByClassName("save-display")[0].innerText;
		var data = {
			title: title,
			categories: TAGS,
			summary: content,
			timestamp: Date.now(),
		};
		console.log(data);
		try {
			const response = await axios.post("/saveupload", data);
			window.location.assign("/saved");
		} catch (error) {
			console.error("Error uploading summary", error);
		}
	}
}

var bulletText = "";
var minutesText = "";

async function template(tempname) {
	document.getElementById("default").disabled = true;
	document.getElementById("bullet").disabled = true;
	document.getElementById("minute").disabled = true;
	document.getElementById("textbox").innerHTML =
		"Fitting summary to " + tempname + " Template...";
	if (tempname == "bullet" && bulletText != "") {
		document.getElementById("textbox").innerHTML = bulletText;
	} else if (tempname == "minutes" && minutesText != "") {
		document.getElementById("textbox").innerHTML = minutesText;
	} else {
		date = Date.now()
		data = {
			template: tempname,
			date: new Date(date).toLocaleString(undefined,{
				dateStyle: "long"
			})
		}
		try {
			const response = await axios.post("/template",data );
			document.getElementById("textbox").innerHTML = response.data;
			if (tempname == "bullet") bulletText = response.data;
			else if (tempname == "minutes") minutesText = response.data;
		} catch (error) {
			console.error("Error uploading summary", error);
		}
	}
	document.getElementById("default").disabled = false;
	document.getElementById("bullet").disabled = false;
	document.getElementById("minute").disabled = false;
}

function minute() {
	document.getElementById("default").style.backgroundColor = "#014f86";
	document.getElementById("bullet").style.backgroundColor = "#014f86";
	document.getElementById("minute").style.backgroundColor = "#001729";
	template("minutes");
}

function bullet() {
	document.getElementById("default").style.backgroundColor = "#014f86";
	document.getElementById("bullet").style.backgroundColor = "#001729";
	document.getElementById("minute").style.backgroundColor = "#014f86";
	template("bullet");
}

function normal() {
	document.getElementById("default").style.backgroundColor = "#001729";
	document.getElementById("bullet").style.backgroundColor = "#014f86";
	document.getElementById("minute").style.backgroundColor = "#014f86";
	template("default");
}
