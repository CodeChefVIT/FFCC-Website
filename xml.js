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


// function details() {
//     checkLogin()
//     const queryString = window.location.search
//     const urlParams = new URLSearchParams(queryString)
//     const pid = urlParams.get('id')
//     const val = urlParams.get('value')
//     if (val) {
//         addSearch(val)
//     }
//     var jwt = sessionStorage.getItem('JWT_Token')
//     var xh = new XMLHttpRequest();
//     xh.open("GET", `https://onlala-api.herokuapp.com/business/website/product/homepage?product_id=${pid}`, true)
//     xh.setRequestHeader('Content-Type', 'application/json')
//     xh.setRequestHeader('Authorization', jwt)
//     xh.send()
//     xh.onload = function () {
//         if (this.status == 200) {
//             var data = JSON.parse(this.responseText)
//             document.getElementById("pname").innerHTML = data.payload.product.product_name
//             document.getElementById("pmin").innerHTML = data.payload.product.minimum_order_quantity
//             document.getElementById("company").innerHTML = data.payload.creator.company
//             document.getElementById("addr").innerHTML = data.payload.creator.user_address
//             document.getElementById("desc").innerHTML = data.payload.product.product_description
//             document.getElementById("plink").href = `contact-seller.html?id=${data.payload.product.id}`
//             document.getElementById("ptime").innerHTML = data.payload.product.time_range
//             document.getElementById("sdt").innerHTML = data.payload.product.time_range
//             document.getElementById("sdc").innerHTML = data.payload.sample_details.hs_code
//             document.getElementById("ptype").innerHTML = data.payload.bulkorder_details.bulk_order_price_type
//             document.getElementById("pcost").innerHTML = data.payload.sample_details.sample_cost
//             document.getElementById("sdp").innerHTML = data.payload.sample_details.sample_cost
//             document.getElementById("sdpol").innerHTML = data.payload.sample_details.sample_policy
//             document.getElementById("qdm").innerHTML = data.payload.product.model_no
//             document.getElementById("pim").innerHTML = data.payload.product.payment_method
//             document.getElementById("pip").innerHTML = data.payload.bulkorder_details.bulk_order_port
//             document.getElementById("piu").innerHTML = data.payload.product.quantity_per_carton
//             if (data.payload.product.pictures.length == 0) {
//                 $('#d1').append(`<div class="carousel-item active p-3"><img class="disp-img img-fluid mt-md-3 add-boxshadow-heavy" src="assets/img/logo.svg" alt="Onlala Slider"></div>`)
//             } else {
//                 $('#d1').append(`<div class="carousel-item active p-3"><img class="disp-img img-fluid mt-md-3 add-boxshadow-heavy" src="${data.payload.product.pictures[0].product_image}" alt="Onlala Slider"></div>`)
//                 $('#ind').append(`<li data-target="#carousel" data-slide-to="0" class="active"> <img class="d-block w-100" src="${data.payload.product.pictures[0].product_image}" class="img-fluid hver"></li>`)
//                 for (var i = 1; i < data.payload.product.pictures.length; i++) {
//                     $('#d1').append(`<div class="carousel-item p-3"><img class="disp-img img-fluid mt-md-3 add-boxshadow-heavy" src="${data.payload.product.pictures[i].product_image}" alt="Onlala Slider"></div>`)
//                     $('#ind').append(`<li data-target="#carousel" data-slide-to="0"> <img class="d-block w-100" src="${data.payload.product.pictures[i].product_image}" class="img-fluid hver"></li>`)
//                 }
//             }

//         } else if (this.status == 401) {
//             var data = JSON.parse(this.responseText)
//             document.getElementById("errorHandler").innerHTML = 'Please login with a valid user account'
//         } else {
//             document.getElementById("errorHandler").innerHTML = "Something went wrong."
//         }

//     }