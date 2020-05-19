
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

!function(t,e,a,i){"use strict";let V,n,s,S,d,A,r,h="isiaFormRepeater";const o={addButton:'<div class="repeat-add-wrapper"><a data-repeat-add-btn class="repeat-add" href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAnFBMVEUAAAA0SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV7WE2snAAAAM3RSTlMAAQMFDBUXGBodHiAhIiMmKy0vOj0+Q0RHSU9UVVhzdXh5j5HBxcfIyszOz9Xa3ujv8f0EXf+OAAAAuUlEQVQoU9XQ2Q6CMBAF0KHUFVFBcVfcAHcs/f9/cwQM05b4rPelc+ckTVOAf4jlH1Ip071v1anzkGXuXVPXkmSp60oqWajaKbYegFdMbYVvxZID8GK6Uh1InWWf8M7kLeEEu2/b9nvGY4g1Jiyws6oyrOI7PwlH2APOOX6nhccI65FwaD5tQ9g12SEMF50TqtDK8uWYsSAfsobCMJdKJqBlllWYTXUFaJ4/etJuLuOGsRBR2KvFn8sLE7ouonIEdvUAAAAASUVORK5CYII=" />Add</a></div>',removeButton:'<a data-repeat-remove-btn class="repeat-remove" href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAbFBMVEUAAAA0SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV40SV7ulPmzAAAAI3RSTlMAAQQFDg8QES4vMDI3OD9AoKKlqqvHyMrO09fa4Ojp6+319/7EkGIAAABmSURBVAgdTcEJEoIwFETB94GIu8ZdRCDO/e9oihSVdBPZxg/6ntfGzD2U3BsiF7QIDVin7G3sVTriVbrSSxVJLU30UkVSSxNepRsHlU7YR1ln0P60CI6ofSl5rpjZ7jJq8FsjM5I/lckTO6Y3PXUAAAAASUVORK5CYII=" />Remove</a>'};

function l(e,a){this.element=e,this.el=V,this.addEl=n,this.removeEl=s,this.fieldId=S,this.itemsIndexArray=d,this.maxItemIndex=A,this.repeatItem=r,this.settings=t.extend({},o,a),this._defaults=o,this._name=h,this.init()}t.extend(l.prototype,{init(){this.el="#"+this.element.id,this.addEl=t("a[data-repeat-add-btn]"),this.removeEl=t("a[data-repeat-remove-btn]"),this.fieldId=t(this.el).attr("data-field-id"),this.itemsIndexArray=JSON.parse(t(this.el).attr("data-items-index-array")),this.maxItemIndex=Math.max.apply(null,this.itemsIndexArray),this.createAddButton(this.settings.addButton),this.createRemoveButton(this.settings.removeButton),this.addItem(this.el,this.addEl,this.itemsIndexArray,this.maxItemIndex,this.settings.removeButton,this.repeatItem),this.removeItem(this.el,this.removeEl,this.itemsIndexArray,this.maxItemIndex)},createAddButton(e){t(this.el).append(e)},createRemoveButton(e){t(this.el+" .repeat-item").each(function(a){0!==a&&t(this).prepend(e)})},addItem(e,a,i,V,n,s){t(e).on("click",a,function(a){a.preventDefault(),a.target.hasAttribute("data-repeat-add-btn")?(i.push(V+1),t(e).attr("data-items-index-array","["+i.toString()+"]"),V=Math.max.apply(null,i),(s=t(e+" .repeat-item:first").clone(!0)).attr("data-field-index",V),s.find(":input").val(""),s.find("checkbox").checked=!1,s.find("radio").checked=!1,s.find(".repeat-el").each(function(){const t=this.name.replace(/[[]\d+[\]]/g,"["+V+"]");this.name=t,this.id=this.name}),s.prepend(n),s.appendTo(e+" .repeat-items")):a.stopPropagation()})},removeItem(e,a,i){t(e+" .repeat-item").on("click",a,function(a){if(a.preventDefault(),a.target.hasAttribute("data-repeat-remove-btn")){const a=parseInt(t(this).attr("data-field-index"));if(1!==a){const V=i.indexOf(a);V>-1&&(i.splice(V,1),A=Math.max.apply(null,i)),t(e).attr("data-items-index-array","["+i.toString()+"]"),t(e+" .repeat-item[data-field-index="+a+"]").remove()}}else a.stopPropagation()})}}),t.fn[h]=function(e){return this.each(function(){t.data(this,"plugin_"+h)||t.data(this,"plugin_"+h,new l(this,e))})}}(jQuery,window,document);

$(document).ready(function() {
    $('#test').isiaFormRepeater({
        addButton: '<div class="repeat-add-wrapper"><a data-repeat-add-btn class="repeat-add pure-button pure-button-primary" href="#">Add</a></div>',
        removeButton: '<a data-repeat-remove-btn class="repeat-remove pure-button pure-button-primary" href="#">Remove</a>'
    });
    $('#test2').isiaFormRepeater();
});
