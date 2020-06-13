var options = document.getElementsByName('options');
console.log(options)

function slotCh() {
    var slot;

    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {

            slot = options[i].value;
            console.log(slot)
        }
    }
    console.log(slot)
    return slot;
}

function hello() {
    window.location.href = "page-2.html?slot=" + slotCh()
    console.log(window.location.href)
}

function hello_2() {
    window.location.href = "page-3.html"
    console.log(window.location.href)
}

function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


//Object Constructor
var arr=[];

function PreferenceList(preference1, preference2, preference3, preference4) {
    this.preference1 = preference1;
    this.preference2 = preference2;
    this.preference3 = preference3;
    this.preference4 = preference4;
}

function SubjectList(subjectCode, preference1, preference2, preference3, preference4) {
    var temp = new PreferenceList(preference1, preference2, preference3, preference4);
    this.subjectCode = subjectCode;
    this.preference = temp;
    console.log('Function called')
}

//Form Repeater

var counter = 2;
var limit = 8;

function addInput() {
    if (counter == limit) {
        alert("You have reached the limit of adding " + counter - 1 + " inputs");
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
        arr.pop()
        document.getElementById('credit-bar').style = "width:0;"
        var temp = document.getElementById('type-' + counter).innerHTML
        net_credit -= temp
        document.getElementById('credit-bar').style = "width:0%;"
        document.getElementById('credit-bar').style = "width:" + (100 / 27) * net_credit + "%;"

        document.getElementById("subject-" + counter).classList.remove("form-show");
        document.getElementById("subject-" + counter).classList.add("form-hide");
        document.getElementById("sub-" + counter).selectedIndex = 0;
        document.getElementById('type-' + counter).innerHTML = ''

        document.getElementById("c" + counter).style.display = "none";

        document.getElementById("add-" + (counter - 1)).style.display = "inline-block";
        document.getElementById("remove-" + (counter - 1)).style.display = "inline-block";
        document.getElementById('tot-cred').innerHTML = "Total Credits: " + net_credit

        if (net_credit >= 16 && net_credit <= 27) {
            document.getElementById('credit-bar').classList.add("bg-success")
            document.getElementById('credit-bar').classList.remove("bg-danger")
        } else {
            document.getElementById('credit-bar').classList.add("bg-danger")
            document.getElementById('credit-bar').classList.remove("bg-success")
        }
    }
}



// var slot = "evening"
// var credits = 0

function populateDropdown() {

    var xh = new XMLHttpRequest();
    xh.open("GET", "https://ffcc-website.herokuapp.com/time/subjectCode", true)
    xh.setRequestHeader('Content-Type', 'application/json')

    xh.send()
    xh.onload = function () {

        if (this.status == 200) {
            var data = JSON.parse(this.response)
            console.log(data)

            for (i = 0; i < data.length; i++) {
                if (data[i].CODE !== undefined) {
                    $('.subjects').append('<option' +
                        '>' +
                        data[i].CODE +
                        ' : ' +
                        data[i].TITLE +
                        // " type : " +data[i].TYPE +
                        "; Credits :" +
                        data[i].CREDITS +

                        "</option>")
                }
            }
            console.log('DONE!')

        } else {
            document.getElementById("errorHandler").innerHTML = "Something went wrong."
        }
    }

}

var net_credit = 0;

  function getTeacher1(counter) {
    var x = document.getElementById("s-"+(counter-1)+"-pref-1").value;
  }
  function getTeacher2(counter) {
    var x = document.getElementById("s-"+(counter-1)+"-pref-2").value;
  }
  function getTeacher3(counter) {
    var x = document.getElementById("s-"+(counter-1)+"-pref-3").value;
  }
  function getTeacher4(counter) {
    var x = document.getElementById("s-"+(counter-1)+"-pref-4").value;
  } 

function getSubject1(selectObject) {

    if (arr.length > counter + 2) {      //If Subject is reselected, pop previous selection
        arr.pop()
    }

    net_credit -= document.getElementById('type-' + (counter - 1)).innerHTML
    var slot = getUrlVars()['slot']
    var value = selectObject.value;
    var credits = parseInt(value.substr(value.length - 1), 10)
    console.log(credits)

    var subjectcode = value.substring(0, 8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-' + (counter - 1))
    dropdown.empty()
    ////document.getElementById('type-1').innerHTML = ''
    $('.preference-s-' + (counter - 1)).append('<option> Choose teacher preference</option>')



    var xh = new XMLHttpRequest();

    xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/" + subjectcode + "", true)
    console.log("https://ffcc-website.herokuapp.com/time/app/" + subjectcode + "")

    xh.setRequestHeader('Content-Type', 'application/json')

    xh.send()
    xh.onload = function () {

        if (this.status == 200) {

            var data = JSON.parse(this.response)
            if (slot === "morning") {
                for (i = 0; i < data.length; i++) {
                    if (data[i].Flag === 1) {
                        $('.preference-s-' + (counter - 1)).append('<option' +
                            '>' +
                            data[i].SLOT +
                            ":" + data[i].FACULTY +

                            "</option>")
                    }

                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();

                xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/" + subjectcode + "", true)
                console.log("https://ffcc-website.herokuapp.com/time/checkLab/" + subjectcode + "")

                xh1.setRequestHeader('Content-Type', 'application/json')

                xh1.send()
                xh1.onload = function () {
                    var labs = JSON.parse(this.response)
                    if (labs) {
                        console.log('lab length:' + labs.length)
                        credits += labs[0].CREDITS
                        console.log(' after lab credits ' + credits)
                        ////document.getElementById('type-1').innerHTML += ' + Lab'

                    }

                }
                console.log("one " + credits)
                var xh2 = new XMLHttpRequest();

                xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/" + subjectcode + "", true)
                console.log("https://ffcc-website.herokuapp.com/time/checkProject/" + subjectcode + "")

                xh2.setRequestHeader('Content-Type', 'application/json')

                xh2.send()
                xh2.onload = function () {
                    var projects = JSON.parse(this.response)
                    if (projects) {
                        console.log('project length:' + projects.length)
                        credits += projects[0].CREDITS
                        console.log('after project credits ' + credits)
                        //document.getElementById('type-1').innerHTML+=' + Project'

                    }
                }
                console.log("two " + credits)


                console.log('DONE!')

                if ($('.preference-s-' + (counter - 1)).children('option').length === 4) {
                    for (i = 0; i < data.length; i++) {
                        if (data[i].Flag === 2) {
                            $('.preference-s-' + (counter - 1)).append('<option' +
                                '>' +
                                data[i].SLOT +
                                ":" + data[i].FACULTY +

                                "</option>")
                        }
                    }
                    console.log('DONE!')
                }

                setTimeout(function () {
                    document.getElementById('type-' + (counter - 1)).innerHTML = credits
                    net_credit += credits
                    console.log('NET CREDIT ' + net_credit)
                    document.getElementById('credit-bar').style = "width:0;"
                    document.getElementById('credit-bar').style = "width:" + (100 / 27) * net_credit + "%;"
                    document.getElementById('tot-cred').innerHTML = "Total Credits: " + net_credit

                    if (net_credit >= 16 && net_credit <= 27) {
                        document.getElementById('credit-bar').classList.add("bg-success")
                        document.getElementById('credit-bar').classList.remove("bg-danger")
                    } else {
                        document.getElementById('credit-bar').classList.add("bg-danger")
                        document.getElementById('credit-bar').classList.remove("bg-success")
                    }
                }, 2000)

            } else if (slot === "evening") {
                for (i = 0; i < data.length; i++) {
                    if (data[i].Flag === 0) {
                        $('.preference-s-' + (counter - 1)).append('<option' +
                            '>' +
                            data[i].SLOT +
                            ":" + data[i].FACULTY +


                            "</option>")
                    }
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();

                xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/" + subjectcode + "", true)
                console.log("https://ffcc-website.herokuapp.com/time/checkLab/" + subjectcode + "")

                xh1.setRequestHeader('Content-Type', 'application/json')

                xh1.send()
                xh1.onload = function () {
                    var labs = JSON.parse(this.response)
                    if (labs) {
                        console.log('lab length:' + labs.length)
                        credits += labs[0].CREDITS
                        console.log(' after lab credits ' + credits)
                        ////document.getElementById('type-1').innerHTML += ' + Lab'

                    }

                }
                var xh2 = new XMLHttpRequest();

                xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/" + subjectcode + "", true)
                console.log("https://ffcc-website.herokuapp.com/time/checkProject/" + subjectcode + "")

                xh2.setRequestHeader('Content-Type', 'application/json')

                xh2.send()
                xh2.onload = function () {
                    var projects = JSON.parse(this.response)
                    if (projects) {
                        console.log('project length:' + projects.length)
                        credits += projects[0].CREDITS
                        console.log('after project credits ' + credits)
                        //document.getElementById('type-1').innerHTML+=' + Project'

                    }
                }
                console.log('DONE!')
                if ($('.preference-s-' + (counter - 1)).children('option').length === 4) {
                    for (i = 0; i < data.length; i++) {
                        if (data[i].Flag === 2) {
                            $('.preference-s-' + (counter - 1)).append('<option' +
                                '>' +
                                data[i].SLOT +
                                ":" + data[i].FACULTY +


                                "</option>")
                        }
                    }

                    console.log('DONE!')

                }
                // console.log($('.preference-s-1').children('option').length)
                // console.log( 'credits ' + credits)

            } else {
                console.log('none')
            }
        }
    }
    document.getElementById('tot-cred').innerHTML = "Total Credits: " + net_credit      //Update Total Credit Bar
    if (net_credit >= 16 && net_credit <= 27) {
        document.getElementById('credit-bar').classList.add("bg-success")
        document.getElementById('credit-bar').classList.remove("bg-danger")
    } else {
        document.getElementById('credit-bar').classList.add("bg-danger")
        document.getElementById('credit-bar').classList.remove("bg-success")
    }

    preference1 = getTeacher1(counter)
    preference2 = getTeacher2(counter)
    preference3 = getTeacher3(counter)
    preference4 = getTeacher4(counter)

     var temp = new SubjectList(subjectCode, preference1, preference2, preference3, preference4);  
     arr.push(temp)
     console.log(arr)
}
