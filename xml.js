if(document.getElementById('#morn').checked==true){
    console.log('morning')
    var slot = 'morning'
}else if(document.getElementById('#even').checked==true){
    var slot = 'evening'
}else{
    console.log('none')
}

var slot = "evening"

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



function getSubject1(selectObject) {
    var value = selectObject.value;  
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-1')
    dropdown.empty()
    $('.preference-s-1').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        console.log("one")
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        console.log('sent!')
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
                    console.log('DONE!')
        
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
                    console.log('DONE!')
        
                    }
                    else{
                        console.log('none')
                    }
                }
            }
        }  
  

  function getSubject2(selectObject) {
    var value = selectObject.value;  
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-2')
    dropdown.empty()
    $('.preference-s-2').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        console.log("one")
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        console.log('sent!')
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
                console.log('DONE!')
                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-2').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                console.log('DONE!')
                }else{
                    console.log('none')
                }
                
    
            }
             
        }  
  }

  function getSubject3(selectObject) {
    var value = selectObject.value;  
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-3')
    dropdown.empty()
    $('.preference-s-3').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        console.log("one")
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        console.log('sent!')
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
                console.log('DONE!')
                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-3').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                console.log('DONE!')
                }else{
                    console.log('none')
                }
                
    
            }
        }  
  }

  function getSubject4(selectObject) {
    var value = selectObject.value;  
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-4')
    dropdown.empty()
    $('.preference-s-4').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        console.log("one")
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        console.log('sent!')
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
                console.log('DONE!')
                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-4').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                console.log('DONE!')
                }else{
                    console.log('none')
                }
                
    
            }
        }  
  }

  function getSubject5(selectObject) {
    var value = selectObject.value;  
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-5')
    dropdown.empty()
    $('.preference-s-5').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        console.log("one")
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        console.log('sent!')
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
                console.log('DONE!')
                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-5').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                console.log('DONE!')
                }else{
                    console.log('none')
                }
                
    
            }
        }  
  }

  function getSubject6(selectObject) {
    var value = selectObject.value;  
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-6')
    dropdown.empty()
    $('.preference-s-6').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        console.log("one")
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        console.log('sent!')
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
                console.log('DONE!')
                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-6').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                console.log('DONE!')
                }else{
                    console.log('none')
                }
                
    
            }
        }  
  }


  function getSubject7(selectObject) {
    var value = selectObject.value;  
    var subjectcode = value.substring(0,8)
    console.log(subjectcode)
    var dropdown = $('.preference-s-7')
    dropdown.empty()
    $('.preference-s-7').append('<option> Choose teacher preference</option>')
    
    
    
        var xh = new XMLHttpRequest();
        console.log("one")
        xh.open("GET", "https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"", true)
        console.log("https://ffcc-website.herokuapp.com/time/app/"+subjectcode+"")
        console.log('sent!')
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
                console.log('DONE!')
                }else if(slot==="evening"){
                    for(i=0;i<data.length;i++){
                    if(data[i].Flag ===0 )
                    {$('.preference-s-7').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                console.log('DONE!')
                }else{
                    console.log('none')
                }
                
    
            }
        }  
  }
  