//Jeremy Goldman
//VFW - Project 2
//Term 1303
//03-13-2013


//Make sure DOM in loaded and ready to go!
window.addEventListener("DOMContentLoaded", function(){


	//Shortcut for getElementById
	function $(x){
		
		var currentElement = document.getElementById(x);
		return currentElement;
	}
	
	//Create select field element, and add options
	function makeGroups(){
		
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		
		for(var i=0, j=catGroups.length; i<j; i++){
			
			var makeOptions = document.createElement('option');
			var optionText = catGroups[i];
			makeOptions.setAttribute("value", optionText);
			makeOptions.innerHTML = optionText;
			makeSelect.appendChild(makeOptions);
		}
		
		selectLi.appendChild(makeSelect);
		
		
	}
	
	//Find valued of radio button
	function getSelectedRadio(){
		
		var radioButtons = document.forms[0].priority;
		for(var i=0; i<radioButtons.length; i++){
			
			if(radioButtons[i].checked){
				priorityValue = radioButtons[i].value;
			}
		}
	}
	
	

	function toggleControl(a){
		
		switch(a){
			case "on":
				$('reminderForm').style.display = "none";
				$('clearData').style.display = "inline";
				$('showData').style.display = "none";
				$('addNewForm').style.display = "inline";
				break;
			case "off":
				$('reminderForm').style.display = "block";
				$('clearData').style.display = "inline";
				$('showData').style.display = "inline";
				$('addNewForm').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
	
			}
	}
	
	function saveData(){
		
		var id = Math.floor(Math.random()*100000001);
		
		getSelectedRadio();
		
		//Form data into an object..
		//Object properties has array with label and value.
		
		var item 				= {};
		item.group 				= ["Group:", $('groups').value];
		item.remindTitle 		= ["Reminder Title:", $('remindTitle').value];
		item.dueDate			= ["Due Date:", $('due').value];
		item.priority			= ["Priority:", priorityValue];
		item.recurrence			= ["Recurrence:",$('recurrence').value];
		item.description		= ["Description:", $('description').value];
		
		
		//Save to Local Storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Reminder is set!");
	}
	
	
	function getData(){
		toggleControl("on");
		
		if(localStorage.length === 0){
			
			alert("There is no data in local storage.");
			
		}
		
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";

		for(var i=0, j=localStorage.length; i<j; i++){
			
			var makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var reObj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for( var n in reObj){
				
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = reObj[n][0]+" "+reObj[n][1];
				makeSubLi.innerHTML = optSubText;
				
			}
			
		}
		
	}
	
	function clearStoredData(){
		
		if(localStorage === 0){
			
			alert("There is no stored data to clear!");
			
		}else{
			
			localStorage.clear();
			alert("All reminders are cleared!");
			window.location.reload();
			return false;
		}
		
	}
	
	//Array
	var catGroups =["Personal", "Work", "Other"], priorityValue;
	makeGroups();
	
	
	// Click events and links
	var showDataLink = $('showData');
	showDataLink.addEventListener("click", getData);
	var clearDataLink = $('clearData');
	clearDataLink.addEventListener("click", clearStoredData);
	var saveLocalData = $('submit');
	saveLocalData.addEventListener("Click", saveData)
	
	var save = $('submit');
	save.addEventListener("click", saveData);

	
});
