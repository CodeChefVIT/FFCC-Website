
function addDropdowns(){
var number = document.getElementById('numOfSubjects').value
console.log(number)
if(number===1){
    $('#subject-2').hide()
    console.log('hidden 1')
    $('#subject-3').hide()
    $('#subject-4').hide()
    $('#subject-5').hide()
    $('#subject-6').hide()

}
}



// Form Repeater

var counter = 2;
var limit = 9;
function addInput(divName){
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " inputs");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML =

                    '<div id="subject-'+counter+'">' + 
                        '<label for="sub-'+counter+'" class="form-label">Choose subject '+counter+'</label>' +
                        '<select id="sub-'+counter+'" onchange="getSubject'+counter+'(this)" class = "form-control subjects" placeholder="Choose subject">'+
                            '<option>Choose Subject</option>' +
                        '</select>'+

                    '<div class="">' +
                    '<div class="col-sm-7 col-md-7 col-lg-4 offset-lg-4">' + 
                    '<label for="">Teacher Preference (upto 4)</label>'+

                    '<select id="s-'+(counter)+'-pref-1" class="form-control preference-s-'+counter+'">'+
                        '<option>Choose teacher preference</option>'+
                    '</select>'+
                    '<select id="s-'+(counter)+'-pref-2" class="form-control preference-s-'+counter+'">'+
                        '<option>Choose teacher preference</option>'+
                    '</select>'+
                    '<select id="s-'+(counter)+'-pref-3" class="form-control preference-s-'+counter+'">'+
                        '<option>Choose teacher preference</option>'+
                    '</select>'+
                    '<select id="s-'+(counter)+'-pref-4" class="form-control preference-s-'+counter+'">'+
                        '<option>Choose teacher preference</option>'+
                    '</select>'+
                    '</div>';
          document.getElementById(divName).appendChild(newdiv);
          counter++;
     }
}

function removeInput(){
    if (counter == 2)  {
         alert("You have reached the limit of removing " + counter + " inputs");
    }
    else {
        var myobj = document.getElementById('subject-'+ counter);
        myobj.parentNode.remove(myobj);
        counter--;
    }
}
