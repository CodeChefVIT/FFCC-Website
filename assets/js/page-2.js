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

function addInput(divName) {
  if (counter == limit) {
    alert("You have reached the limit of adding " + counter + " inputs");
  } else {
    console.log(document.getElementById("subject-" + counter));
    document.getElementById("subject-" + counter).classList.remove("form-hide");
    document.getElementById("subject-" + counter).classList.add("form-show");

    document.getElementById("add-" + (counter - 1)).classList.add("form-hide");
    document
      .getElementById("add-" + (counter - 1))
      .classList.remove("form-show");
    document
      .getElementById("remove-" + (counter - 1))
      .classList.add("form-hide");
    document
      .getElementById("remove-" + (counter - 1))
      .classList.remove("form-show");

    document.getElementById("add-" + counter).classList.add("form-show");
    document.getElementById("add-" + counter).classList.remove("form-hide");
    document.getElementById("remove-" + counter).classList.add("form-show");
    document.getElementById("remove-" + counter).classList.remove("form-hide");
    counter++;
  }
}

function removeInput(divName) {
  if (counter <= 2) {
    alert("You have reached the remove limit");
  } else {
    counter--;
    document.getElementById("subject-" + counter).classList.remove("form-show");
    document.getElementById("subject-" + counter).classList.add("form-hide");
    document.getElementById("sub-" + counter).selectedIndex = 0;

    document.getElementById("add-" + (counter - 1)).classList.add("form-show");
    document
      .getElementById("add-" + (counter - 1))
      .classList.remove("form-hide");
    document
      .getElementById("remove-" + (counter - 1))
      .classList.add("form-show");
    document
      .getElementById("remove-" + (counter - 1))
      .classList.remove("form-hide");
  }
}
