//not sure I need this:
//$(document).ready(function(){

//Initializing Firebase
var config = {
  apiKey: "AIzaSyB3hvPXposa3HOW1DZcssXP35z00NKf4I8",
  authDomain: "train-schedule-hw.firebaseapp.com",
  databaseURL: "https://train-schedule-hw.firebaseio.com",
  projectId: "train-schedule-hw",
  storageBucket: "train-schedule-hw.appspot.com",
  messagingSenderId: "35408021894"
};
firebase.initializeApp(config);

var database = firebase.database();

	// Button for adding trains
	$("#add-train-btn").on("click", function(event){

		// Grabs user input and assign to variables
		var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTimeInput = moment($("#tt-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
		var frequencyInput = $("#frequency-input").val().trim();

		// (optional) Test for variables entered
		console.log(trainName);
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

		// Creates local "temporary" object for holding train data
		// Will push this to firebase
		var newTrain = {
			name: trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		};

		// pushing train info to the database/Firebase
    database.ref().push(newTrain);

    //I could log new info to the console to test
    //console.log(newTrain.name); and all other keys

    //It would be nice to alert if the new info has been successfuly entered, to let the user know.
    //alert("New information added");

		// clear all of the text-boxes
		$("#train-name-input").val("");
		$("#destination-input").val("");
		$("#tt-input").val("");
		$("#frequency-input").val("");


	});
  //Firebase event watcher
	database.ref().on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots to store all the info.
		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;

    //I can log all these vars to check if the info is there
    //console.log(firebaseName); and all others

    //calculating times
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;
		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Add each train's data into the table
		$("#train-table > tbody").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

    //handle errors

	});
  //do I need to send the new data to hte html?
