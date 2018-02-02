	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyDWb1Ys_ptcGlTXOmBUUx690puz2Tv7NZg",
	authDomain: "textproject-16e66.firebaseapp.com",
	databaseURL: "https://textproject-16e66.firebaseio.com",
	projectId: "textproject-16e66",
	storageBucket: "textproject-16e66.appspot.com",
	messagingSenderId: "497422547778"
};
firebase.initializeApp(config);
	//create a variable to reference the database
	var database = firebase.database();
	var currentTime = moment();

//button for adding trians
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();
	//get user's input infos
	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = movent($("#frist-train-time-input").val().trim(), "hh:mm").format("X");
	var frequency = $("#frequency-input").val().trim();
	//create an object to hold the train's data
	var newTrain = {
		name: trainName,
		place: destination,
		startTrain: firstTrain,
		howOften: frequency
	};
	//uploads the train's data to the database
	database.ref().push(newTrain);

	alert("New Train has already added!");
	//clears all of the text-boxs just added
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#frist-train-time-input").val("");
	$("#frequency-input").val("");

});

//creat Firebase event for adding train to the database and a row in the html table after user adds a new train
database.ref().on("child_added", function(childSnapshot) {
	//store all the infos into the variables that grabed from the uer 
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().place;
	var firstTrain = childSnapshot.val().startTrain;
	var frequency = childSnapshot.val().howOften;


	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1,"years");
	
	console.log("current time: " + moment(currentTime).format("hh:mm"));
	
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var remainder = diffTime % frequency;
	
	var minutesAway = frequency - remainder;

	var nextTrain = moment().add(minutesAway, "minutes");	

$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + firstTrain + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");

}, function(erroeObject) {
	console.log("Errors handled: " + erroeObject.code);
});


