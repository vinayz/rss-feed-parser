
var theUrl = "http://localhost:3000/api/"
var currentPage = 1;

$(document).ready(function () {
  $("#submitBtn").click(function () {
    var feedUrl = $("#feedUrl").val();
    if (!feedUrl) {
      alert("Please Enter Feed URL.");
      return;
    }

    $.get(theUrl + "?feedUrl=" + feedUrl, function (response) {
      if (!response.status) {
        alert(response.data);
      } else {
        $("#feedList").empty();
        $('.pagination_wrapper').show();
        $('.page').remove();
        response.data.forEach(element => {
          var feedPanel = "<div class='feedPanel'>" +
            "<a href=" + element.link + " target='_blank'><h3>" + element.title + "</h3></a>" +
            "<div>" + element.content + "</div>" +
            "</div>";

          $("#feedList").append(feedPanel);
        });
        pagination();
      }
    });

  });
});

// number of pages to display
var page_division = "";

function pagination() {
  // count number of records
  var count_items = $(".feedPanel").length;

  // divide items by 10
  var separate_items = count_items / 10;

  if (separate_items % 1 != 0) {
    page_division = separate_items + 1;
  } else {
    page_division = separate_items;
  }

  // iterate then generate links for each items pagination
  for (var items_pagination = 1; items_pagination <= page_division; items_pagination++) {
    $(".pagination .insertbeforer").before("<div onclick='pageClick(this)' class='button page' data-page-number='" + items_pagination + "'>" + items_pagination + "</div>");
  };

  // hide all items
  $('.feedPanel').addClass('hideme');

  // display first 10 items
  $.each($('.feedPanel'), function (index, value) {
    if (index <= 9) {
      $(this).toggleClass('hideme')
    }
  });
}

//each page should display 10 items, hide rest
function changePage($newPageNumber) {
  $('.feedPanel').addClass('hideme');
  var startItem = ($newPageNumber - 1) * 10;
  var endItem = $newPageNumber * 10;
  for (var item = startItem; item < endItem; item++) {
    $(".feedPanel:nth-of-type(" + item + ")").removeClass('hideme');
  };
  currentPage = $newPageNumber;
}

//on click of next btn change page and do nothing if its last page
$(".next").on("click", function () {
  if (page_division >= (currentPage + 1)) {
    changePage(++currentPage);
  }

});

//on click of previous btn change page and do nothing if its 1st page
$(".previous").on("click", function () {
  if (currentPage == 1) {
    return;
  }
  changePage(--currentPage);
});

//will trigger on click of pages
function pageClick(page) {
  var newPage = page.textContent;
  changePage(newPage);
};