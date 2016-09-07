$(document).ready(function () {
  getList();

  $('#todoSubmit').on('click', addItem);
  $('#todoList').on('click', '#delete', deleteHandler);
  $('#todoList').on('click', '#completed', completeHandler);
});

function addItem() {
  event.preventDefault();

  var item = {};
  item.completed = false;

  $.each($('#entryForm').serializeArray(), function(i, field) {
    item[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/items',
    data: item,
    success: function() {
      $('#todoList').empty();
      getList();
    },

    error: function(response) {
      console.log('POST /items did not work');
    },
  });

  $('#entryForm').find('input[type=text]').val('');
}

function getList() {
  $.ajax({
    type: 'GET',
    url: '/items',
    success: function(items) {
      items.forEach(function(item) {
        var $el = $('<li></li>');

        if(item.completed === true) {
          $el.data('id', item.id);
          $el.append('<button id="delete">Delete</button>');
          $el.append('<button id="test">Complete</button>');
          $el.append('<span class="completed">' + item.todo + '</span>');
          $el.append('<span class="toggleSpan"> Completed </span>');
          $('#todoList').append($el);
        }else {
          $el.data('id', item.id);
          $el.append('<button id="delete">Delete</button>');
          $el.append('<button id="completed">Complete</button>');
          $el.append('<span>' + item.todo + '</span>');
          $('#todoList').append($el);
        }
      });
    },

    error: function(response) {
      console.log('GET /items failed');
    },
  });
}

function completeHandler() {
  var item = {};
  var id = $(this).parent().data('id');

  $.ajax({
    type: 'PUT',
    url: '/items/' + id,
    data: item,
    success: function () {
      $('#todoList').empty();
      getList();
    },
    error: function () {
      console.log('PUT /items/ failed');
    },
  });
}

function deleteHandler() {
  var id = $(this).parent().data('id');

  $.ajax({
    type: 'DELETE',
    url: '/items/' + id,
    success: function () {
      $('#todoList').empty();
      getList();
    },
    error: function () {
      console.log('DELETE failed');
    },
  });
}
