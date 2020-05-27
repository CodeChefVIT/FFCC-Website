var options = document.getElementsByName('options');
console.log(options)

function slotCh(){
    var slot;
    
    for(var i = 0; i < options.length; i++){
        if(options[i].checked){
            
            slot = options[i].value;
            console.log(slot)
        }
    }
    console.log(slot)
    return slot;
}

function hello(){
    window.location.href = "page-2.html?slot=" + slotCh()
    console.log(window.location.href)
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
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

    document.getElementById('credit-bar').style = "width:0;"
    var temp = document.getElementById('type-'+counter).innerHTML
    net_credit -= temp
    document.getElementById('credit-bar').style = "width:0%;"
    document.getElementById('credit-bar').style = "width:"+(100/27)*net_credit+"%;"

    document.getElementById("subject-" + counter).classList.remove("form-show");
    document.getElementById("subject-" + counter).classList.add("form-hide");
    document.getElementById("sub-" + counter).selectedIndex = 0;
    document.getElementById('type-'+counter).innerHTML = ''

    document.getElementById("c" + counter).style.display = "none";

    document.getElementById("add-" + (counter - 1)).style.display = "inline-block";
    document.getElementById("remove-" + (counter - 1)).style.display = "inline-block";
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
            
            for(i=0;i<data.length;i++){
                if(data[i].CODE !== undefined)
                {$('.subjects').append('<option' + 
                '>' +
                data[i].CODE +
                ' : '+
                data[i].TITLE +
                // " type : " +data[i].TYPE +
                "; Credits :"+
                data[i].CREDITS+
                
                "</option>")}
            }
            console.log('DONE!')

        }
         else {
            document.getElementById("errorHandler").innerHTML = "Something went wrong."
        }
    }

}

var net_credit = 0;

function getSubject1(selectObject) {
    var slot = getUrlVars()['slot']
    var value = selectObject.value;  
    var credits =  parseInt(value.substr(value.length -1),10) 
    console.log(credits)
    
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-1')
    dropdown.empty()
    ////document.getElementById('type-1').innerHTML = ''
    $('.preference-s-1').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
        xh.setRequestHeader('Content-Type', 'application/json')
        
        xh.send()
        xh.onload = function () {
            
            if (this.status == 200) {
                
                var data = JSON.parse(this.response)
                if(slot==="morning"){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===1 )
                        {$('.preference-s-1').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                        
                    }
                    ////document.getElementById('type-1').innerHTML +='Theory'
                    var xh1 = new XMLHttpRequest();
                        
                    xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                    console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                    
                    xh1.setRequestHeader('Content-Type', 'application/json')
                    
                    xh1.send()
                    xh1.onload = function () {
                        var labs = JSON.parse(this.response)
                        if(labs){
                            console.log('lab length:' + labs.length)
                            credits += labs[0].CREDITS
                            console.log(' after lab credits ' + credits)
                            ////document.getElementById('type-1').innerHTML += ' + Lab'

                        }
                        
                    }
                    console.log("one "+ credits)
                    var xh2 = new XMLHttpRequest();
                    
                    xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                    console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                    
                    xh2.setRequestHeader('Content-Type', 'application/json')
                    
                    xh2.send()
                    xh2.onload = function () {
                        var projects = JSON.parse(this.response)
                        if(projects){
                        console.log('project length:' + projects.length)
                        credits += projects[0].CREDITS
                        console.log('after project credits ' + credits)
                        //document.getElementById('type-1').innerHTML+=' + Project'
                        
                        }
                    }
                    console.log("two "+ credits)
                    
                    
                    console.log('DONE!')
                   
                    if($('.preference-s-1').children('option').length === 4){
                        for(i=0;i<data.length;i++){
                            if(data[i].Flag===2 )
                            {$('.preference-s-1').append('<option' + 
                            '>' +
                            data[i].SLOT +
                            ":"+data[i].FACULTY+
                            
                            "</option>")}
                        }
                        console.log('DONE!')
                    }

                    setTimeout(function(){
                    document.getElementById('type-1').innerHTML = credits
                    net_credit += credits
                    console.log('NET CREDIT '+net_credit)
                    document.getElementById('credit-bar').style = "width:0;"
                    document.getElementById('credit-bar').style = "width:"+(100/27)*net_credit+"%;"
                },2000)

                //Raj testing
                // document.querySelector('.progress-bar').s


                //End Raj testing
        
                }
                else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===0 )
                        {$('.preference-s-1').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        
                        "</option>")}
                    }
                    ////document.getElementById('type-1').innerHTML +='Theory'
                        var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                        console.log('DONE!')
                    if($('.preference-s-1').children('option').length === 4){
                        for(i=0;i<data.length;i++){
                            if(data[i].Flag===2 )
                            {$('.preference-s-1').append('<option' + 
                            '>' +
                            data[i].SLOT +
                            ":"+data[i].FACULTY +
                            
                            
                            "</option>")}
                        }
                        
                        console.log('DONE!')
                        
                    }
                    // console.log($('.preference-s-1').children('option').length)
                    // console.log( 'credits ' + credits)
        
                    }
                    
                    else{
                        console.log('none')
                    }
                }
            }
        }  
  

  function getSubject2(selectObject) {
    var slot = getUrlVars()['slot']
    var value = selectObject.value;  
    var credits =  parseInt(value.substr(value.length -1),10) 
    console.log(credits)
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-2')
    dropdown.empty()
    $('.preference-s-2').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
        xh.setRequestHeader('Content-Type', 'application/json')
        
        xh.send()
        xh.onload = function () {
            
            if (this.status == 200) {
                var data = JSON.parse(this.response)
                if(slot==="morning"){
                for(i=0;i<data.length;i++){
                    if(data[i].Flag ===1 )
                    {$('.preference-s-2').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-2').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-2').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }

                setTimeout(function(){
                    document.getElementById('type-2').innerHTML = credits
                    net_credit += credits
                    console.log('NET CREDIT '+net_credit)
                    document.getElementById('credit-bar').style = "width:0;"
                    document.getElementById('credit-bar').style = "width:"+(100/27)*net_credit+"%;"
                },2000)





                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-2').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-2').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-2').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }
                }else{
                    console.log('none')
                }
                
    
            }
             
        }  
  }

  function getSubject3(selectObject) {
    var slot = getUrlVars()['slot']
    var value = selectObject.value;  
    var credits =  parseInt(value.substr(value.length -1),10) 
    console.log(credits)
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-3')
    dropdown.empty()
    $('.preference-s-3').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
        xh.setRequestHeader('Content-Type', 'application/json')
        
        xh.send()
        xh.onload = function () {
            
            if (this.status == 200) {
                var data = JSON.parse(this.response)
                if(slot==="morning"){
                for(i=0;i<data.length;i++){
                    if(data[i].Flag ===1 )
                    {$('.preference-s-3').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-3').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-3').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }

                setTimeout(function(){
                    document.getElementById('type-3').innerHTML = credits
                    net_credit += credits
                    console.log('NET CREDIT '+net_credit)
                    document.getElementById('credit-bar').style = "width:0;"
                    document.getElementById('credit-bar').style = "width:"+(100/27)*net_credit+"%;"
                },2000)



                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-3').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                
                xh1.setRequestHeader('Content-Type', 'application/json')
                
                xh1.send()
                xh1.onload = function () {
                    var labs = JSON.parse(this.response)
                    if(labs){
                        console.log('lab length:' + labs.length)
                        credits += labs[0].CREDITS
                        console.log(' after lab credits ' + credits)
                        ////document.getElementById('type-1').innerHTML += ' + Lab'

                    }
                    
                }
                var xh2 = new XMLHttpRequest();
                
                xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                
                xh2.setRequestHeader('Content-Type', 'application/json')
                
                xh2.send()
                xh2.onload = function () {
                    var projects = JSON.parse(this.response)
                    if(projects){
                    console.log('project length:' + projects.length)
                    credits += projects[0].CREDITS
                    console.log('after project credits ' + credits)
                    //document.getElementById('type-1').innerHTML+=' + Project'
                    
                    }
                }
                console.log('DONE!')
                if($('.preference-s-3').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-3').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }
                }else{
                    console.log('none')
                }
                
    
            }
        }  
  }

  function getSubject4(selectObject) {
    var slot = getUrlVars()['slot']
    var value = selectObject.value;  
    var credits =  parseInt(value.substr(value.length -1),10) 
    console.log(credits)
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-4')
    dropdown.empty()
    $('.preference-s-4').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
        xh.setRequestHeader('Content-Type', 'application/json')
        
        xh.send()
        xh.onload = function () {
            
            if (this.status == 200) {
                var data = JSON.parse(this.response)
                if(slot==="morning"){
                for(i=0;i<data.length;i++){
                    if(data[i].Flag ===1 )
                    {$('.preference-s-4').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-4').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-4').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }

                setTimeout(function(){
                    document.getElementById('type-4').innerHTML = credits
                    net_credit += credits
                    console.log('NET CREDIT '+net_credit)
                    document.getElementById('credit-bar').style = "width:0;"
                    document.getElementById('credit-bar').style = "width:"+(100/27)*net_credit+"%;"
                },2000)



                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-4').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-4').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-4').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }
                }else{
                    console.log('none')
                }
                
    
            }
        }  
  }

  function getSubject5(selectObject) {
    var slot = getUrlVars()['slot']
    var value = selectObject.value; 
    var credits =  parseInt(value.substr(value.length -1),10) 
    console.log(credits) 
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-5')
    dropdown.empty()
    $('.preference-s-5').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
        xh.setRequestHeader('Content-Type', 'application/json')
        
        xh.send()
        xh.onload = function () {
            
            if (this.status == 200) {
                var data = JSON.parse(this.response)
                if(slot==="morning"){
                for(i=0;i<data.length;i++){
                    if(data[i].Flag ===1 )
                    {$('.preference-s-5').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-5').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-5').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }

                setTimeout(function(){
                    document.getElementById('type-5').innerHTML = credits
                    net_credit += credits
                    console.log('NET CREDIT '+net_credit)
                    document.getElementById('credit-bar').style = "width:0;"
                    document.getElementById('credit-bar').style = "width:"+(100/27)*net_credit+"%;"
                },2000)



                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-5').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-5').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-5').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }
                }else{
                    console.log('none')
                }
                
    
            }
        }  
  }

  function getSubject6(selectObject) {
    var slot = getUrlVars()['slot']
    var value = selectObject.value;
    var credits =  parseInt(value.substr(value.length -1),10) 
    console.log(credits)  
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-6')
    dropdown.empty()
    $('.preference-s-6').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
        xh.setRequestHeader('Content-Type', 'application/json')
        
        xh.send()
        xh.onload = function () {
            
            if (this.status == 200) {
                var data = JSON.parse(this.response)
                if(slot==="morning"){
                for(i=0;i<data.length;i++){
                    if(data[i].Flag ===1 )
                    {$('.preference-s-6').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-6').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-6').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }

                setTimeout(function(){
                    document.getElementById('type-6').innerHTML = credits
                    net_credit += credits
                    console.log('NET CREDIT '+net_credit)
                    document.getElementById('credit-bar').style = "width:0;"
                    document.getElementById('credit-bar').style = "width:"+(100/27)*net_credit+"%;"
                },2000)




                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-6').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-6').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-6').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }
                }else{
                    console.log('none')
                }
                
    
            }
        }  
  }


  function getSubject7(selectObject) {
    var slot = getUrlVars()['slot']
    var value = selectObject.value;  
    var credits =  parseInt(value.substr(value.length -1),10) 
    console.log(credits)
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-7')
    dropdown.empty()
    $('.preference-s-7').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
        xh.setRequestHeader('Content-Type', 'application/json')
        
        xh.send()
        xh.onload = function () {
            
            if (this.status == 200) {
                var data = JSON.parse(this.response)
                if(slot==="morning"){
                for(i=0;i<data.length;i++){
                    if(data[i].Flag ===1 )
                    {$('.preference-s-7').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-7').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-7').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }

                setTimeout(function(){
                    document.getElementById('type-7').innerHTML = credits
                    net_credit += credits
                    console.log('NET CREDIT '+net_credit)
                    document.getElementById('credit-bar').style = "width:0;"
                    document.getElementById('credit-bar').style = "width:"+(100/27)*net_credit+"%;"
              
                },2000)



                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-7').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                ////document.getElementById('type-1').innerHTML +='Theory'
                var xh1 = new XMLHttpRequest();
                        
                        xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
                        xh1.setRequestHeader('Content-Type', 'application/json')
                        
                        xh1.send()
                        xh1.onload = function () {
                            var labs = JSON.parse(this.response)
                            if(labs){
                                console.log('lab length:' + labs.length)
                                credits += labs[0].CREDITS
                                console.log(' after lab credits ' + credits)
                                ////document.getElementById('type-1').innerHTML += ' + Lab'
    
                            }
                            
                        }
                        var xh2 = new XMLHttpRequest();
                        
                        xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
                        console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
                        xh2.setRequestHeader('Content-Type', 'application/json')
                        
                        xh2.send()
                        xh2.onload = function () {
                            var projects = JSON.parse(this.response)
                            if(projects){
                            console.log('project length:' + projects.length)
                            credits += projects[0].CREDITS
                            console.log('after project credits ' + credits)
                            //document.getElementById('type-1').innerHTML+=' + Project'
                            
                            }
                        }
                console.log('DONE!')
                if($('.preference-s-7').children('option').length === 4){
                    for(i=0;i<data.length;i++){
                        if(data[i].Flag===2 )
                        {$('.preference-s-7').append('<option' + 
                        '>' +
                        data[i].SLOT +
                        ":"+data[i].FACULTY+
                        
                        "</option>")}
                    }
                    console.log('DONE!')
                }
                }else{
                    console.log('none')
                }
                
    
            }
        }  
  }


// // var slot = 'one'
// // console.log(slot)

// // function checkSlot(){
// //     // if(document.getElementById('#morn').checked==true){
// //     //     console.log('morning')
// //     //      slot = 'morning'
// //     // }else if(document.getElementById('#even').checked==true){
// //     //      slot = 'evening'
// //     // }else{
// //     //     console.log('none')
// //     // }
// //     // console.log(slot)
// //     // return slot;
// // }
// //     $('#morn').click(function () {
// //         if ($('#morn').is(':checked')) {
// //            console.log("yes");
// //         }
// //         if ($('#even').is(':checked')) {
// //             console.log("no");
// //         }
// //     });
// //     $('#even').click(function () {
// //         if ($('#even').is(':checked')) {
// //             console.log("no");
// //         }
// //         if ($('#morn').is(':checked')) {
// //             console.log("yes");
// //         }
// //     });

// var options = document.getElementsByName('options');
// console.log(options)

// function slotCh(){
//     var slot;
    
//     for(var i = 0; i < options.length; i++){
//         if(options[i].checked){
            
//             slot = options[i].value;
//             console.log(slot)
//         }
//     }
//     console.log(slot)
//     return slot;
// }

// function hello(){
//     window.location.href = "page-2.html?slot=" + slotCh()
//     console.log(window.location.href)
// }

// function getUrlVars()
// {
//     var vars = [], hash;
//     var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//     for(var i = 0; i < hashes.length; i++)
//     {
//         hash = hashes[i].split('=');
//         vars.push(hash[0]);
//         vars[hash[0]] = hash[1];
//     }
//     return vars;
// }



// // var slot = "evening"
// // var credits = 0

// function populateDropdown() {
    
//     var xh = new XMLHttpRequest();
//     xh.open("GET", "https://ffcc-website.herokuapp.com/time/subjectCode", true)
//     xh.setRequestHeader('Content-Type', 'application/json')
    
//     xh.send()
//     xh.onload = function () {
        
//         if (this.status == 200) {
//             var data = JSON.parse(this.response)
//             console.log(data)
            
//             for(i=0;i<data.length;i++){
//                 if(data[i].CODE !== undefined)
//                 {$('.subjects').append('<option' + 
//                 '>' +
//                 data[i].CODE +
//                 ' : '+
//                 data[i].TITLE +
//                 // " type : " +data[i].TYPE +
//                 "; Credits :"+
//                 data[i].CREDITS+
                
//                 "</option>")}
//             }
//             console.log('DONE!')

//         }
//          else {
//             document.getElementById("errorHandler").innerHTML = "Something went wrong."
//         }
//     }

// }



// function getSubject1(selectObject) {
//     var slot = getUrlVars()['slot']
//     var value = selectObject.value;  
//     var credits =  parseInt(value.substr(value.length -1),10) 
//     console.log(credits)
    
//     var subjectcode = value.substring(0,8)
//     console.log(subjectcode)
//     var dropdown = $('.preference-s-1')
//     dropdown.empty()
//     document.getElementById('type-1').innerHTML = ''
//     $('.preference-s-1').append('<option> Choose teacher preference</option>')
    
    
    
//         var xh = new XMLHttpRequest();
        
//         xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
//         console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
//         xh.setRequestHeader('Content-Type', 'application/json')
        
//         xh.send()
//         xh.onload = function () {
            
//             if (this.status == 200) {
                
//                 var data = JSON.parse(this.response)
//                 if(slot==="morning"){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===1 )
//                         {$('.preference-s-1').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
                        
//                     }
//                     document.getElementById('type-1').innerHTML +='Theory'
//                     var xh1 = new XMLHttpRequest();
                        
//                     xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                     console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                    
//                     xh1.setRequestHeader('Content-Type', 'application/json')
                    
//                     xh1.send()
//                     xh1.onload = function () {
//                         var labs = JSON.parse(this.response)
//                         if(labs){
//                             console.log('lab length:' + labs.length)
//                             credits += labs[0].CREDITS
//                             console.log(' after lab credits ' + credits)
//                             document.getElementById('type-1').innerHTML += ' + Lab'

//                         }
                        
//                     }
//                     var xh2 = new XMLHttpRequest();
                    
//                     xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                     console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                    
//                     xh2.setRequestHeader('Content-Type', 'application/json')
                    
//                     xh2.send()
//                     xh2.onload = function () {
//                         var projects = JSON.parse(this.response)
//                         if(projects){
//                         console.log('project length:' + projects.length)
//                         credits += projects[0].CREDITS
//                         console.log('after project credits ' + credits)
//                         document.getElementById('type-1').innerHTML+=' + Project'
                        
//                         }
//                     }
                    
                    
//                     console.log('DONE!')
                   
//                     if($('.preference-s-1').children('option').length === 4){
//                         for(i=0;i<data.length;i++){
//                             if(data[i].Flag===2 )
//                             {$('.preference-s-1').append('<option' + 
//                             '>' +
//                             data[i].SLOT +
//                             ":"+data[i].FACULTY+
                            
//                             "</option>")}
//                         }
//                         console.log('DONE!')
//                     }
//                     setTimeout(function(){
//                         document.getElementById('type-1').innerHTML = credits
//                     },2000)
        
//                 }
//                 else if(slot==="evening"){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===0 )
//                         {$('.preference-s-1').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
                        
//                         "</option>")}
//                     }
//                     document.getElementById('type-1').innerHTML +='Theory'
//                         var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                         console.log('DONE!')
//                     if($('.preference-s-1').children('option').length === 4){
//                         for(i=0;i<data.length;i++){
//                             if(data[i].Flag===2 )
//                             {$('.preference-s-1').append('<option' + 
//                             '>' +
//                             data[i].SLOT +
//                             ":"+data[i].FACULTY +
                            
                            
//                             "</option>")}
//                         }
//                         console.log('DONE!')
                        
//                     }
//                     // console.log($('.preference-s-1').children('option').length)
//                     // console.log( 'credits ' + credits)
        
//                     }
                    
//                     else{
//                         console.log('none')
//                     }
//                 }

                
//             }
           
//             console.log(credits + 'hghg')
            
            
//         }  
  

//   function getSubject2(selectObject) {
//     var slot = getUrlVars()['slot']
//     var value = selectObject.value;  
//     var credits =  parseInt(value.substr(value.length -1),10) 
//     console.log(credits)
//     var subjectcode = value.substring(0,8)
//     console.log(subjectcode)
//     var dropdown = $('.preference-s-2')
//     dropdown.empty()
//     $('.preference-s-2').append('<option> Choose teacher preference</option>')
    
    
    
//         var xh = new XMLHttpRequest();
        
//         xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
//         console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
//         xh.setRequestHeader('Content-Type', 'application/json')
        
//         xh.send()
//         xh.onload = function () {
            
//             if (this.status == 200) {
//                 var data = JSON.parse(this.response)
//                 if(slot==="morning"){
//                 for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===1 )
//                     {$('.preference-s-2').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-2').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-2').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else if(slot==="evening"){
//                     for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===0 )
//                     {$('.preference-s-2').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-2').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-2').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else{
//                     console.log('none')
//                 }
                
    
//             }
             
//         }  
//   }

//   function getSubject3(selectObject) {
//     var slot = getUrlVars()['slot']
//     var value = selectObject.value;  
//     var credits =  parseInt(value.substr(value.length -1),10) 
//     console.log(credits)
//     var subjectcode = value.substring(0,8)
//     console.log(subjectcode)
//     var dropdown = $('.preference-s-3')
//     dropdown.empty()
//     $('.preference-s-3').append('<option> Choose teacher preference</option>')
    
    
    
//         var xh = new XMLHttpRequest();
        
//         xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
//         console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
//         xh.setRequestHeader('Content-Type', 'application/json')
        
//         xh.send()
//         xh.onload = function () {
            
//             if (this.status == 200) {
//                 var data = JSON.parse(this.response)
//                 if(slot==="morning"){
//                 for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===1 )
//                     {$('.preference-s-3').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-3').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-3').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else if(slot==="evening"){
//                     for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===0 )
//                     {$('.preference-s-3').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                 xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                 console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                
//                 xh1.setRequestHeader('Content-Type', 'application/json')
                
//                 xh1.send()
//                 xh1.onload = function () {
//                     var labs = JSON.parse(this.response)
//                     if(labs){
//                         console.log('lab length:' + labs.length)
//                         credits += labs[0].CREDITS
//                         console.log(' after lab credits ' + credits)
//                         document.getElementById('type-1').innerHTML += ' + Lab'

//                     }
                    
//                 }
//                 var xh2 = new XMLHttpRequest();
                
//                 xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                 console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                
//                 xh2.setRequestHeader('Content-Type', 'application/json')
                
//                 xh2.send()
//                 xh2.onload = function () {
//                     var projects = JSON.parse(this.response)
//                     if(projects){
//                     console.log('project length:' + projects.length)
//                     credits += projects[0].CREDITS
//                     console.log('after project credits ' + credits)
//                     document.getElementById('type-1').innerHTML+=' + Project'
                    
//                     }
//                 }
//                 console.log('DONE!')
//                 if($('.preference-s-3').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-3').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else{
//                     console.log('none')
//                 }
                
    
//             }
//         }  
//   }

//   function getSubject4(selectObject) {
//     var slot = getUrlVars()['slot']
//     var value = selectObject.value;  
//     var credits =  parseInt(value.substr(value.length -1),10) 
//     console.log(credits)
//     var subjectcode = value.substring(0,8)
//     console.log(subjectcode)
//     var dropdown = $('.preference-s-4')
//     dropdown.empty()
//     $('.preference-s-4').append('<option> Choose teacher preference</option>')
    
    
    
//         var xh = new XMLHttpRequest();
        
//         xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
//         console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
//         xh.setRequestHeader('Content-Type', 'application/json')
        
//         xh.send()
//         xh.onload = function () {
            
//             if (this.status == 200) {
//                 var data = JSON.parse(this.response)
//                 if(slot==="morning"){
//                 for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===1 )
//                     {$('.preference-s-4').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-4').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-4').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else if(slot==="evening"){
//                     for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===0 )
//                     {$('.preference-s-4').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-4').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-4').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else{
//                     console.log('none')
//                 }
                
    
//             }
//         }  
//   }

//   function getSubject5(selectObject) {
//     var slot = getUrlVars()['slot']
//     var value = selectObject.value; 
//     var credits =  parseInt(value.substr(value.length -1),10) 
//     console.log(credits) 
//     var subjectcode = value.substring(0,8)
//     console.log(subjectcode)
//     var dropdown = $('.preference-s-5')
//     dropdown.empty()
//     $('.preference-s-5').append('<option> Choose teacher preference</option>')
    
    
    
//         var xh = new XMLHttpRequest();
        
//         xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
//         console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
//         xh.setRequestHeader('Content-Type', 'application/json')
        
//         xh.send()
//         xh.onload = function () {
            
//             if (this.status == 200) {
//                 var data = JSON.parse(this.response)
//                 if(slot==="morning"){
//                 for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===1 )
//                     {$('.preference-s-5').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-5').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-5').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else if(slot==="evening"){
//                     for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===0 )
//                     {$('.preference-s-5').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-5').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-5').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else{
//                     console.log('none')
//                 }
                
    
//             }
//         }  
//   }

//   function getSubject6(selectObject) {
//     var slot = getUrlVars()['slot']
//     var value = selectObject.value;
//     var credits =  parseInt(value.substr(value.length -1),10) 
//     console.log(credits)  
//     var subjectcode = value.substring(0,8)
//     console.log(subjectcode)
//     var dropdown = $('.preference-s-6')
//     dropdown.empty()
//     $('.preference-s-6').append('<option> Choose teacher preference</option>')
    
    
    
//         var xh = new XMLHttpRequest();
        
//         xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
//         console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
//         xh.setRequestHeader('Content-Type', 'application/json')
        
//         xh.send()
//         xh.onload = function () {
            
//             if (this.status == 200) {
//                 var data = JSON.parse(this.response)
//                 if(slot==="morning"){
//                 for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===1 )
//                     {$('.preference-s-6').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-6').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-6').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else if(slot==="evening"){
//                     for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===0 )
//                     {$('.preference-s-6').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-6').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-6').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else{
//                     console.log('none')
//                 }
                
    
//             }
//         }  
//   }


//   function getSubject7(selectObject) {
//     var slot = getUrlVars()['slot']
//     var value = selectObject.value;  
//     var credits =  parseInt(value.substr(value.length -1),10) 
//     console.log(credits)
//     var subjectcode = value.substring(0,8)
//     console.log(subjectcode)
//     var dropdown = $('.preference-s-7')
//     dropdown.empty()
//     $('.preference-s-7').append('<option> Choose teacher preference</option>')
    
    
    
//         var xh = new XMLHttpRequest();
        
//         xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
//         console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        
//         xh.setRequestHeader('Content-Type', 'application/json')
        
//         xh.send()
//         xh.onload = function () {
            
//             if (this.status == 200) {
//                 var data = JSON.parse(this.response)
//                 if(slot==="morning"){
//                 for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===1 )
//                     {$('.preference-s-7').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-7').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-7').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else if(slot==="evening"){
//                     for(i=0;i<data.length;i++){
//                     if(data[i].Flag ===0 )
//                     {$('.preference-s-7').append('<option' + 
//                     '>' +
//                     data[i].SLOT +
//                     ":"+data[i].FACULTY+
                    
//                     "</option>")}
//                 }
//                 document.getElementById('type-1').innerHTML +='Theory'
//                 var xh1 = new XMLHttpRequest();
                        
//                         xh1.open("GET", "https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkLab/"+subjectcode+"")
                        
//                         xh1.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh1.send()
//                         xh1.onload = function () {
//                             var labs = JSON.parse(this.response)
//                             if(labs){
//                                 console.log('lab length:' + labs.length)
//                                 credits += labs[0].CREDITS
//                                 console.log(' after lab credits ' + credits)
//                                 document.getElementById('type-1').innerHTML += ' + Lab'
    
//                             }
                            
//                         }
//                         var xh2 = new XMLHttpRequest();
                        
//                         xh2.open("GET", "https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"", true)
//                         console.log("https://ffcc-website.herokuapp.com/time/checkProject/"+subjectcode+"")
                        
//                         xh2.setRequestHeader('Content-Type', 'application/json')
                        
//                         xh2.send()
//                         xh2.onload = function () {
//                             var projects = JSON.parse(this.response)
//                             if(projects){
//                             console.log('project length:' + projects.length)
//                             credits += projects[0].CREDITS
//                             console.log('after project credits ' + credits)
//                             document.getElementById('type-1').innerHTML+=' + Project'
                            
//                             }
//                         }
//                 console.log('DONE!')
//                 if($('.preference-s-7').children('option').length === 4){
//                     for(i=0;i<data.length;i++){
//                         if(data[i].Flag===2 )
//                         {$('.preference-s-7').append('<option' + 
//                         '>' +
//                         data[i].SLOT +
//                         ":"+data[i].FACULTY+
                        
//                         "</option>")}
//                     }
//                     console.log('DONE!')
//                 }
//                 }else{
//                     console.log('none')
//                 }
                
    
//             }
//         }  
//   }
