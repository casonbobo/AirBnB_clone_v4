$(document).ready(function () {
    $.get("http://0.0.0.0:5000/api/v1/status/", function (data, status) {
        if (status === "OK") {
            $("div#api_status").addClass("available");
        } else {
            $("div#api_status").removeClass("available");
        }
    });
    let listAmenities = []
    $('input').change(function() {
        const amenityName = $(this).attr("data-name");
        if (this.checked) {
            listAmenities.push(amenityName);
        } else {
            listOfCheckedAmenities = listOfCheckedAmenities.filter((item) => item !== amenityName);
        }
        $('div.amenities h4').text(listOfCheckedAmenities.join(', '));
    });
    const placesSection = document.querySelector('.places');

// Function to display places based on data
function displayPlaces(data) {
    for (const place of data) {
      $.get('http://35f944014d11.7399d2e2.hbtn-cod.io:5000/api/v1/users/' + place.user_id, function (usrData) {
        const html = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guests</div>
              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="user">
              <b>Owner:</b> ${usrData.first_name} ${usrData.last_name}
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`;
        $('.places').append(html);
      });
    }
  }
  
  $(document).ready(function () {
    $.ajax({
      url: 'http://35f944014d11.7399d2e2.hbtn-cod.io:5000/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
        displayPlaces(data);
      }
    });
    $('button').on('click', function () {
      $('.places > article').remove();
      const checkedAmenities = {};
      $.ajax({
        url: 'http://35f944014d11.7399d2e2.hbtn-cod.io:5001/api/v1/places_search/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: Object.keys(checkedAmenities) }),
        success: function (data) {
          displayPlaces(data);
        }
      });
    });
  });
});
