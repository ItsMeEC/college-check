var college_db = 'http://localhost:3000/api/getColleges';

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: college_db,
    data: {
      s: searchTerm,
      r: 'json',
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}


function displayCollegeSearchData(data) {
  var resultElement = '';
  if (data.Search) {
    data.Search.forEach(function(item) {
     resultElement += '<p>' + item.College + '</p>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayCollegeSearchData);
  });
}

$(function(){watchSubmit();});