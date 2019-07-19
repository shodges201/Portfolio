$(document).on("click", ".tile", function(){
    var win = window.open($(this).attr("data-url"), '_blank');
    win.focus();
})