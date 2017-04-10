var selected = $(".nav > div.selected");
var selectedPage = $(".animate > div.selected");

$( ".nav > div" ).click(function(e) {
    var clickedElement = $(this);
    if(clickedElement.is(selected)) {
        return;
    } 
    
    selected.removeClass("selected");
    clickedElement.addClass("selected");
    
    selected = clickedElement;
    
    var currentPage = clickedElement.data("index");
    
    selectedPage.removeClass("selected");
    selectedPage = $(".b").eq(currentPage);
    selectedPage.addClass("selected");
});