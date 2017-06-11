let gid = (id) => document.getElementById(id)

//
var modalButtons = document.querySelectorAll('[data-template]');
for (var i = 0; i < modalButtons.length; i++) {
  let $modalButton = modalButtons[i];

  $modalButton.addEventListener('click', (e) => {
    e.preventDefault();

    let $el = e.target;

    let templateId = $el.getAttribute('data-template');
    let template = document.getElementById(templateId).innerHTML;

    typeof ga == 'function' && ga('send', 'event', 'Modal', 'open', templateId);
    typeof fbq == 'function' && fbq('track', 'Model', {
      'action': 'open',
      'name': templateId
    });

    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeLabel: "",
        cssClass: [templateId],
        beforeClose: function() {
          return true; // close the modal
          return false; // nothing happens
        }
    });

    modal.setContent(template);

    // add a button
    modal.addFooterBtn('Надіслати', 'tingle-btn tingle-btn--primary', function() {
      let inputs = $('.tingle-modal:visible .tingle-modal-box form input');
      let focused = false;

      typeof ga == 'function' && ga('send', 'event', 'Modal', 'validation', templateId);
      typeof fbq == 'function' && fbq('track', 'Model', {
        'action': 'validation',
        'name': templateId
      });

      for (var i = 0; i < inputs.length; i++) {
        let $input = inputs[i];
        if ($input.value == '') {
          $input.classList.add('error');

          if (!focused) {
            focused = true;
            $input.focus();
          }
        }
        else {
          $input.classList.remove('error');
        }
      }

      let data = {};

      try {
        data.name = $('.tingle-modal:visible input[name="name"]')[0].value;
      }
      catch(e) {}

      try {
        data.phone = $('.tingle-modal:visible input[name="phone"]')[0].value;
      }
      catch(e) {}

      try {
        data.email = $('.tingle-modal:visible input[name="email"]')[0].value;
      }
      catch(e) {}

      // testing
      $.ajax({
        method: "post",
        url: "/lead/new",
        data: data,
        success: (error, data, x) => { }
      })

      if ($('.tingle-modal:visible .tingle-modal-box form input.error').length > 0) {
        return false;
      }

      typeof ga == 'function' && ga('send', 'event', 'Modal', 'lead', templateId);
      typeof fbq == 'function' && fbq('track', 'Model', {
        'action': 'lead',
        'name': templateId
      });

      $.ajax({
        method: "post",
        url: "/lead/new",
        data: data,
        success: (error, data, x) => {
          // console.log(error, data, x)
          modal.close();
          alert('Дякуємо за довіру! Скоро з Вами звяжеться наш менеджер.');
        }
      })

    });

    modal.open();

    setTimeout(() => {
      let inputs = $('.tingle-modal:visible .tingle-modal-box form input');

      for (var i = 0; i < inputs.length; i++) {
        let $input = inputs[i];

        $input.addEventListener('keydown', (e) => {
          if (e.keyCode == 13) { // enter
            $('.tingle-modal:visible .tingle-btn.tingle-btn--primary').click();
          }
        })
      }
    }, 100)
  });
}


//
let scrollTo = (val, duration, done) => {
  if (duration < 0) return;
  if (window.scrollToWorking == true) return;

  let e = document.documentElement;

  if (e.scrollTop == 0) {
    let t = e.scrollTop;

    ++e.scrollTop;

    if (t+1 != e.scrollTop--)
      e = document.body;
  }

  let from = e.scrollTop;
  let to = val;

  if (typeof from == "object") {
    from = from.offsetTop;
  }

  if (typeof to == "object") {
    to = to.offsetTop;
  }

  // https://gist.github.com/gre/1650294
  let easeOutCuaic = (t) => {
    return (--t)*t*t+1;
  }

  let scrollToX = (element, x1, x2, t, v, step, operacion, done1) => {
    if (t < 0 || t > 1 || v <= 0) {
      return done1();
    }

    element.scrollTop = x1 - (x1-x2) * operacion(t);
    t += v * step;

    setTimeout(() => {
      scrollToX(element, x1, x2, t, v, step, operacion, done1)
    }, step)
  }

  window.scrollToWorking = true;

  scrollToX(e, from, to, 0, 1/duration, 20, easeOutCuaic, () => {
    window.scrollToWorking = false
    done && done();
  });
}


//
let links = document.querySelectorAll("[data-scroll-to-href]");
for (var i = 0; i < links.length; i++) {
  let $link = links[i];

  $link.addEventListener('click', (e) => {
    e.preventDefault();

    let $el = e.toElement;

    if (location.pathname !== '/') {
      location.href = $el.getAttribute('href');
      return;
    }

    let $scrollToEl = document.getElementById($el.getAttribute('data-scroll-to-href'));

    let scrollTop = $scrollToEl.offsetTop - 100;

    scrollTo(scrollTop, 1000, () => {
      // console.log(1)
    });
  });
}


//
gid('burger-menu').addEventListener('click', (e) => {
  e.preventDefault();

  let fullNavVisibleClass = 'visible-full-navigation';

  let onBodyKeyDown = (e) => {
    if (document.body.classList.contains(fullNavVisibleClass)) {
      const KEYCODE_ESC = 27;
      if (e.keyCode == KEYCODE_ESC) {
        fullNavHide();
      }
    }
  }

  let fullNavHide = () => {
    document.body.classList.remove(fullNavVisibleClass);
    document.body.removeEventListener('keydown', onBodyKeyDown);
  }

  let fullNavShow = () => {
    document.body.classList.add(fullNavVisibleClass);
    document.body.addEventListener('keydown', onBodyKeyDown);
  }

  if (document.body.classList.contains(fullNavVisibleClass)) {
    fullNavHide();
  }
  else {
    fullNavShow();
  }
});

//
// navigation
(() => {
  const className = 'scrolled';
  const $navigation = gid('navigation');

  let lastScrollValue = null;
  window.addEventListener('scroll', (e) => {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;

    if (scrolled >= 50) {
      $navigation.classList.add('scrolled');
    }
    else {
      $navigation.classList.remove('scrolled');
    }

    let introHeight = 0;
    if (document.getElementById('intro')) {
      introHeight = document.getElementById('intro').clientHeight;
    }

    if (scrolled >= introHeight - 50) {
      $navigation.classList.add('scrolled-below-header');
    }
    else {
      $navigation.classList.remove('scrolled-below-header');
    }

    if (scrolled < lastScrollValue) {
      $navigation.classList.add('scrolled-back');
    }
    else {
      $navigation.classList.remove('scrolled-back');
    }

    lastScrollValue = scrolled;
  })
})();

// map
(() => {

  var ukMap;

  function CenterControl(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '7px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '30px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '10px';
    controlText.innerHTML = 'Прокласти маршрут';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
      // map.setCenter(ukLatlng);
      var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: ukMap
      });
      var directionsService = new google.maps.DirectionsService;

      var selectedMode = "WALKING";

      navigator.geolocation.getCurrentPosition(function(coords){
        directionsService.route({
          origin: new google.maps.LatLng(coords.coords.latitude, coords.coords.longitude),
          destination: ukLatlng,
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

      });

    });
  }

  let mapEl = document.getElementById("lviv_office_map");

  if (mapEl) {
    let ukLatlng = new google.maps.LatLng(49.848817, 24.021466);

    ukMap = new google.maps.Map(mapEl, {
      center: ukLatlng,
      zoom: 16,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{
        stylers: [
          { hue: "#303842" },
          { saturation: -70 },
          { gamma: 1 }
        ]
      }]
    });

    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, ukMap);
    ukMap.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);

    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    let ukMarker = new google.maps.Marker({
      position: ukLatlng,
      map: ukMap,
      title: "CURSOR Education",
      icon: image
    });

    new google.maps.Polyline({
      path: [
        {lat: 49.84848696, lng: 24.0202345},
        {lat: 49.84845583, lng: 24.02080715},
        {lat: 49.84883632, lng: 24.02088225},
        {lat: 49.84880865, lng: 24.02122155}
      ],
      geodesic: true,
      strokeColor: '#303842',
      strokeOpacity: 1.0,
      strokeWeight: 5
    }).setMap(ukMap);

    new google.maps.Polyline({
      path: [
        {lat: 49.84980656, lng: 24.02444959},
        {lat: 49.84822234, lng: 24.0243423},
        {lat: 49.84831574, lng: 24.02152061},
        {lat: 49.84878098, lng: 24.02158767},
        {lat: 49.84880778, lng: 24.02132615},
      ],
      geodesic: true,
      strokeColor: '#CAA320',
      strokeOpacity: 1.0,
      strokeWeight: 5
    }).setMap(ukMap);
  }

})();


(() => {
  let isElementInViewport = (el) => {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  let isElementVisible = (el) => {
    var rect = el.getBoundingClientRect();
    return rect.top <= 0;
  };

  window.addEventListener('scroll', (e) => {
    let $titles = document.querySelectorAll('.timeline-block');

    for (var i = 0; i < $titles.length; i++) {
      if (isElementVisible($titles[i])) {
        $titles[i].classList.add("in-view");
      }
      else {
        // $titles[i].classList.remove("in-view");
      }
    }
  });
})();



(() => {
  let questions = document.querySelectorAll('.list-of-questions .question .title');

  for (var i = 0; i < questions.length; i++) {
    let $title = questions[i];

    ((title) => {
      let $question = title.parentElement;

      title.addEventListener('click', (e) => {
        e.preventDefault();

        let $el = e.toElement;

        typeof ga == 'function' && ga('send', 'event', 'FAQ', 'open', title.innerText.trim());
        typeof fbq == 'function' && fbq('track', 'FAQ', {
          'action': 'open',
          'name': title.innerText.trim()
        });

        let x = document.querySelectorAll('.list-of-questions .question.active');
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove('active');
        }

        $question.classList.add('active');

      });
    })($title);

  }
})();





(() => {
  let videos = document.querySelectorAll('.youtube-video iframe');

  for (var i = 0; i < videos.length; i++) {
    let $video = videos[i];

    (($video) => {
      $video.addEventListener('mouseenter', (e) => {
        let videoId = $video.getAttribute('data-ga');

        typeof ga == 'function' && ga('send', 'event', 'Video', 'watch', videoId);
        typeof fbq == 'function' && fbq('track', 'Video', {
          'action': 'watch',
          'name': videoId
        });
      });
    })($video);

  }
})();




(() => {
  let trackElements = document.querySelectorAll('[track]');

  for (var i = 0; i < trackElements.length; i++) {
    let $trackElement = trackElements[i];

    (($trackElement) => {
      let eventName = $trackElement.getAttribute('track');
      console.log('eventName', eventName);

      $trackElement.addEventListener(eventName, (e) => {
        let trackEvent = $trackElement.getAttribute('track-event');
        let trackId = $trackElement.getAttribute('track-id');

        console.log('track', trackEvent, eventName, trackId);

        // google analytics
        typeof ga == 'function' && ga('send', 'event', trackEvent, eventName, trackId);

        // facebook pixel
        typeof fbq == 'function' && fbq('track', trackEvent, {
          'action': eventName,
          'name': trackId
        });
      });
    })($trackElement);

  }
})();




(() => {

  let students = document.querySelectorAll('.student-photo i.student');

  let lastTimeoutHandler = null;

  let next = () => {
    lastTimeoutHandler != null && clearTimeout(lastTimeoutHandler);

    try {
      document.querySelector('.previous.current').className = 'student';
    } catch (e) {}
    document.querySelector('.current').classList.add('previous');
    // setTimeout(() => {
    //   document.querySelector('.previous.current').className = 'student';
    // }, 2900);

    document.querySelector('.next').className = 'student current';

    var student = null;
    while (student == null) {
      student = students[Math.floor(Math.random()*students.length)];
      if (student.classList.contains('next') || student.classList.contains('current') || student.classList.contains('previous')) {
        student = null;
      }
    }
    student.className = 'student next';

    // let c = document.createElement('i');
    // c.className = 'student next';
    // document.querySelector('.student-photo').appendChild(c);

    lastTimeoutHandler = setTimeout(next, 3000);
  };

  //
  setTimeout(next, 1000);

  let items = document.querySelectorAll('.student-photo i.student');
  for (var i = 0; i < items.length; i++) {
    let item = items[i];
    item.addEventListener('click', next);
  }

})();






// (() => {

//   let students = document.querySelectorAll('.people-list i.student');

//   //
//   setInterval(() => {
//     try {
//       document.querySelector('.people-list .active').classList.remove('active');
//     } catch (e) {}

//     let student = students[Math.floor(Math.random()*students.length)];
//     student.classList.add('active');

//   }, 1000)

// })();
