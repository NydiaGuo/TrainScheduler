
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

//button for adding trians
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();
	//get user's input infos
	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = $("#frist-train-time-input").val().trim();
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

//create a variable to hold the current time
var currentTime = moment();

//creat Firebase event for adding train to the database and a row in the html table after user adds a new train
database.ref().on("child_added", function(childSnapshot) {
	//to store all the uer's data into the variables 
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().place;
	var firstTrain = childSnapshot.val().startTrain;
	var frequency = childSnapshot.val().howOften;

 	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");

	console.log("current time: " + moment(currentTime).format("hh:mm"));
	
	//difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("diffrence time: " + moment(diffTime).format("mm"));
	//Time apart
	var remainder = diffTime % frequency;
	//minute until train
	var minutesAway = frequency - remainder;
	console.log("MINUTES TILL TRAIN: " + minutesAway);

	var nextTrain = moment().add(minutesAway, "minutes");	
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + 
	"</td><td>" + frequency + "</td><td>"  + nextTrain + "</td><td>" + minutesAway + "</td></tr>");

}, function(erroeObject) {
	console.log("Errors handled: " + erroeObject.code);
});


