/**
 * Created by Owner on 8/6/2014.
 */

$(function() {
    setupStars();
    setupForm();
    setupTable();
});

function setupTable() {
    $('#items').on('click', function(event){
       // console.log(event.target);
        var t = event.target;
        if ($(t).hasClass('glyphicon-remove')) {
            $(t).closest('tr').remove(); //traverses to and removes nearest row
        }
        if ($(t).hasClass('glyphicon-edit')){
            var table = $('#items').editable();
            var rowT = $(this).parent().parent();
            editRow(rowT);
        }
    });
}

function editRow(rowT) {
//    function editRow(row) {
//        $('td',row).each(function() {
//            $(this).html('<input type="text" value="' + $(this).html() + '" />');
//        });
//    }
    var text = rowT.innerHTML;
    //var text = row.children("td:nth-child(0)");
    console.log(text);
    console.log(row);
    console.log(row.rating.length);
}

function setupStars() {
    $('.stars .star').on('mouseover', function(){
        fillStar($(this));
    });
    $('.stars .star').on('mouseout', function(){
        emptyStar($(this));
    });
    $('.stars .star').on('click', function(){
        setRating($(this));
    });
}

function setupForm() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        processNewItem();
    });
    $('form').on('reset', function(event){
        event.preventDefault();
        resetForm();
    })
}

function processNewItem() {
    var text = $('#firstItemName').val();
    var rating = $('.stars .rated').length;
    addItem(text, rating);
}
function addItem(text, rating) {
    $('.template tr').clone().appendTo('#items tbody');  //inserts empty table row
//    console.log(text, rating);
   $('#items tbody tr:last-child td.itemText').text(text);
    var newRating =  $('#items tbody tr:last-child td.rating .star');
    for (var i = rating - 1; i >= 0; i--) {
        $(newRating[i]).addClass('rated');
    }
    resetForm(newRating);
}
function resetForm(newRating){
    //empty text and colored stars values
    $('#firstItemName').val(''); //cannot use empty on form element
    $('.stars .star').removeClass('rated');
}
function fillStar(star){
    star.addClass('filled');
    star.prevAll().addClass('filled');
}
function emptyStar(star) {
    star.removeClass('filled');
    star.prevAll().removeClass('filled');
//    console.log('emptystar', star[2])
}
function setRating(star) {
    star.siblings().removeClass('rated');
    star.removeClass('rated');
    star.addClass('rated');
    star.prevAll().addClass('rated');

}
