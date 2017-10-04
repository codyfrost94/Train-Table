// console.log(moment()._d);


var config = {
    apiKey: "AIzaSyDGO4HHtM4fp-MyKJi-qTzOjZhKtrjIj2Y",
    authDomain: "train-time-table-b6889.firebaseapp.com",
    databaseURL: "https://train-time-table-b6889.firebaseio.com",
    projectId: "train-time-table-b6889",
    storageBucket: "train-time-table-b6889.appspot.com",
    messagingSenderId: "407387026576"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#train-destination-input").val().trim();
    var trainStartTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFreq = $("#train-frequency-input").val().trim();

    var firstTimeConverted = moment(trainStartTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted._i);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trainFreq;
    console.log("REMAINDER: " + tRemainder);

    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = currentTime.add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //Gonna have to change the code for trainFreq but first I wanna make sure everything works lolol

    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: trainStartTime,
        freq: trainFreq,
        timeLeft: tMinutesTillTrain,
        // For whatever reason this breaks the thing. I can't add the following line into the object, I get a crazy error message about firebase storage.
        // So, placeholder for now.
        // nextArrival: nextTrain,
        
    };

    database.ref().push(newTrain);

    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.start);
    // console.log(newTrain.freq);
    // // console.log(newTrain.timeLeft);

    $("#train-name-input").val("")
    $("#train-destination-input").val("")
    $("#first-train-time-input").val("")
    $("#train-frequency-input").val("")

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log("-----snapshot-----")
    console.log(childSnapshot.val());
    console.log("-----snapshot-----")

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStartTime = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().freq;
    var timeLeft = childSnapshot.val().timeLeft;

    // I know this looks silly but eh.
    
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        trainFreq + "</td><td>" + "Next Arrival Placeholder" + "</td><td>" + timeLeft + "</td></tr>");
});

console.log("---------------------------------")


var testnumber = (((22-3)*60+15)%12);
console.log(testnumber);
var f = 12
var partialTime = (((22-3)*60+15)%f)
var timeTil = f - partialTime
console.log(timeTil)

// var newRow =

// });