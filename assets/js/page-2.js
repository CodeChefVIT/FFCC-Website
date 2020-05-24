function addDropdowns() {
  var number = document.getElementById("numOfSubjects").value;
  console.log(number);
  if (number === 1) {
    $("#subject-2").hide();
    console.log("hidden 1");
    $("#subject-3").hide();
    $("#subject-4").hide();
    $("#subject-5").hide();
    $("#subject-6").hide();
  }
}

//Form Repeater

var counter = 2;
var limit = 8;

function addInput() {
  if (counter == limit) {
    alert("You have reached the limit of adding " + counter + " inputs");
  } else {
    console.log(counter);
    document.getElementById("subject-" + counter).classList.remove("form-hide");
    document.getElementById("subject-" + counter).classList.add("form-show");

    document.getElementById("add-" + (counter - 1)).style.display = "none";
    document.getElementById("remove-" + (counter - 1)).style.display = "none";

    document.getElementById("add-" + counter).style.display = "inline-block";
    document.getElementById("remove-" + counter).style.display = "inline-block";

    // list
    document.getElementById("c" + counter).style.display = "inline";
    counter++;
  }
}

function removeInput() {
  if (counter <= 2) {
    alert("You have reached the remove limit");
  } else {
    counter--;
    document.getElementById("subject-" + counter).classList.remove("form-show");
    document.getElementById("subject-" + counter).classList.add("form-hide");
    document.getElementById("sub-" + counter).selectedIndex = 0;

    document.getElementById("c" + counter).style.display = "none";

    document.getElementById("add-" + (counter - 1)).style.display = "inline-block";
    document.getElementById("remove-" + (counter - 1)).style.display = "inline-block";
  }
}
