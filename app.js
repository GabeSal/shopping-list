$(document).ready(function () {
  var state = {
    items: [
      {
        name: 'apples',
        checked: false
      },
      {
        name: 'oranges',
        checked: false
      },
      {
        name: 'milk',
        checked: false
      },
      {
        name: 'bread',
        checked: false
      }
    ]
  };

  var deleteItem = function(state, item) {
    state.items.splice(item, 1);
  }

  var addItem = function(state, item) {
      var obj = {
        name: item,
        checked: false
      };
      state.items.push(obj);
  };

  var renderList = function(state, element) {
    var item = "";
    var template = 
    ( '<div class="shopping-item-controls">' +
        '<button class="shopping-item-toggle">' +
          '<span class="button-label">check</span>' +
        '</button>' +
        '<button class="shopping-item-delete">' +
          '<span class="button-label">delete</span>' +
        '</button>' +
      '</div>'
    );

    var dataAttr = 0;
    var itemsHTML = state.items.map(function(item) {

      if (item.checked) {

        item = '<li data-index="' + dataAttr + '">' + '<span class="shopping-item shopping-item__checked">' + item.name + '</span>' + template + '</li>';
      } else {

        item = '<li data-index="' + dataAttr + '">' + '<span class="shopping-item">' + item.name + '</span>' + template + '</li>';
      }
      
      dataAttr++;
      return item;
    });

    element.html(itemsHTML);
  };

  $('#js-shopping-list-form').submit(function(event) {
      event.preventDefault();
      addItem(state, $('#shopping-list-entry').val());
      init();
      $('#shopping-list-entry').val('');
  });

  var init = function () {
    renderList(state, $('.shopping-list'));

  $('.shopping-item-toggle').on('click', function(event) {
    var itemsIndex = 0;

    $(this).closest('li').toggleClass('shopping-item__checked');
    itemsIndex = $(this).closest('li').data('index');
    state.items[itemsIndex].checked = !state.items[itemsIndex].checked;
  });

  $('.shopping-item-delete').on('click', function(event) {
    event.preventDefault();
    var itemsIndex = 0;
    
    itemsIndex = $(this).closest('li').data('index');
    deleteItem(state, itemsIndex);
    init();
  });

  };

  init();

});