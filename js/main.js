function updateCount() {
  var itemsLeftToPack = $('#packingList li input:not(:checked)').length;
  var packedItems = $('#packingList li input:checked').length;
  var allItems = $('#packingList li').length;
  if (itemsLeftToPack === 0) {
    $('#itemSummary p span').text(itemsLeftToPack + ' items');
  }
  else if (itemsLeftToPack === 1) {
    $('#itemSummary p span').text(itemsLeftToPack + ' item');
  }
  else {
    $('#itemSummary p span').text(itemsLeftToPack + ' items');
  }

  //adding and removing the delete items and clear packed items buttons:
  if (packedItems === 0){
    $('#clearPacked').fadeOut();
  }
  else {
    $('#clearPacked').fadeIn();
  }

  if (allItems === 0){
    $('#deleteItems').fadeOut();
  }
  else {
    $('#deleteItems').fadeIn();
  }

}

//validate each input field. Checks for special characters:
function validateInput(inputValue) {
  var valid = inputValue.search(/^[-'\w\s]+$/);
  if (valid == 0)
      return true;
  else
      return false;
}

$('#packingForm').on('submit', function(e){
  e.preventDefault();

  var newItem = $('#newItemDescription').val();

  var newItemValidated = validateInput(newItem);

  if (newItemValidated){
      //input is valid:
      $('.addError').hide();

      $('#newItemDescription').val('');

      $('#packingList').append('<li>' +
        '<input type="checkbox"><span class="item">' + newItem + '</span>' +
        '<span class="icons"><a href="#" class="edit" title="Edit item">' +
        '<i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a><a href="#" class="remove" title="Remove item">' +
        '<i class="fa fa-times fa-lg" aria-hidden="true"></i></a></span></li>');

      updateCount();
  }
  else {
    //input is invalid:
    $('.addError').show();
  }

});

$('#packingList').on('change', 'input[type="checkbox"]', function(){
	$(this).closest('li').toggleClass('packed'); //adds a strikethrough class to packed items
  updateCount();
});

$('#packingList').on('click', '.remove', function(e){
  e.preventDefault();
	$(this).closest('li').remove(); //remove the list item
  updateCount();
});

$('#packingList').on('click', '.edit', function(e){
  e.preventDefault();

  var itemVal = $(this).parent('.icons').siblings('.item').text();

	$(this).closest('li').html('<form id="editor"><input type="text"' +
  'value="' + itemVal + '"><button type="submit" class="btn">Save</button></form><p class="editError">Invalid input</p>');

});

$('#packingList').on('submit', '#editor', function(e){
  e.preventDefault();

  var updatedItem = $(this).find('input').val();

  var updatedItemValidated = validateInput(updatedItem);

  if (updatedItemValidated){
    //input is valid:
    $('.editError').hide();

    $(this).closest('li').html('<input type="checkbox"><span class="item">' +
    updatedItem + '</span><span class="icons"><a href="#" class="edit" title="Edit item">' +
    '<i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a><a href="#" class="remove" title="Remove item">' +
    '<i class="fa fa-times fa-lg" aria-hidden="true"></span></i></a>')
    .removeClass('packed');

    updateCount();
  }
  else {
    //input is invalid:
    $('.editError').show();
  }

});

$('#deleteItems').on('click', function(){
	$('#packingList').empty();
  updateCount();
});

$('#clearPacked').on('click', function(){
    $('.packed').remove();
  updateCount();
});
