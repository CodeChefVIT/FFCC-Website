function populateDropdown() {
    
    var xh = new XMLHttpRequest();
    xh.open("GET", "https://ffcc-website.herokuapp.com/time/subjectCode", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    
    xh.send()
    xh.onload = function () {
        
        if (this.status == 200) {
            var data = JSON.parse(this.response)
            for(i=0;i<data.length;i++){
                if(data[i].CODE !== undefined)
                {$('.subjects').append('<option' + 
                '>' +
                data[i].CODE +
                ' : '+
                data[i].TITLE +
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
    $('.preference-s-1').val("new value")
    
    
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
                for(i=0;i<data.length;i++){
                    if(data[i].Flag ===1 ||data[i].Flag===0)
                    {$('.preference-s-1').append('<option' + 
                    '>' +
                    data[i].SLOT +
                    ":"+data[i].FACULTY+
                    
                    "</option>")}
                }
                console.log('DONE!')
    
            }
             else {
                document.getElementById("errorHandler").innerHTML = "Something went wrong."
            }
        }
        
    
    
  }