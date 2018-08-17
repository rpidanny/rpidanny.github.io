(function() {
  var width,
    height,
    largeHeader,
    canvas,
    ctx,
    points,
    target,
    animateHeader = true;

  // Main
  initHeader();
  initAnimation();
  addListeners();
  getQuote();

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = { x: width / 2, y: height / 2 };

    largeHeader = document.getElementById("large-header");
    largeHeader.style.height = height + "px";

    canvas = document.getElementById("animated-canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    // create points
    points = [];
    for (var x = 0; x < width; x = x + width / 20) {
      for (var y = 0; y < height; y = y + height / 20) {
        var px = x + (Math.random() * width) / 20;
        var py = y + (Math.random() * height) / 20;
        var p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // for each point find the 5 closest points
    for (var i = 0; i < points.length; i++) {
      var closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j];
        if (!(p1 == p2)) {
          var placed = false;
          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (var i in points) {
      var c = new Circle(
        points[i],
        2 + Math.random() * 2,
        "rgba(255,255,255,0.3)"
      );
      points[i].circle = c;
    }
  }

  // Event handling
  function addListeners() {
    if (!("ontouchstart" in window)) {
      window.addEventListener("mousemove", mouseMove);
    }
    window.addEventListener("scroll", scrollCheck);
    window.addEventListener("resize", resize);
  }

  function mouseMove(e) {
    var posx = (posy = 0);
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    target.x = posx;
    target.y = posy;
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    largeHeader.style.height = height + "px";
    canvas.width = width;
    canvas.height = height;
  }

  // animation
  function initAnimation() {
    animate();
    for (var i in points) {
      shiftPoint(points[i]);
    }
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (var i in points) {
        // detect points in range
        if (Math.abs(getDistance(target, points[i])) < 4000) {
          points[i].active = 0.3;
          points[i].circle.active = 0.6;
        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
          points[i].active = 0.1;
          points[i].circle.active = 0.3;
        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
          points[i].active = 0.02;
          points[i].circle.active = 0.1;
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }

        drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: function() {
        shiftPoint(p);
      }
    });
  }

  // Canvas manipulation
  function drawLines(p) {
    if (!p.active) return;
    for (var i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = "rgba(156,217,249," + p.active + ")";
      ctx.stroke();
    }
  }

  function Circle(pos, rad, color) {
    var _this = this;

    // constructor
    (function() {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = function() {
      if (!_this.active) return;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba(156,217,249," + _this.active + ")";
      ctx.fill();
    };
  }

  // Util
  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  function checkform() {
    var bCorrect = true,
      $inputName = $("#input-name"),
      $inputEmail = $("#input-email"),
      $inputSubject = $("#input-subject"),
      $inputText = $("#input-text");

    // check first name
    if ($inputName.val() == "") {
      $inputName.parents(".form-group").addClass("has-error");
      bCorrect = false;
    }

    // check last name
    if ($inputEmail.val() == "") {
      $inputEmail.parents(".form-group").addClass("has-error");
      bCorrect = false;
    }

    // check email field
    if ($inputSubject.val() == "") {
      $inputSubject.parents(".form-group").addClass("has-error");
      bCorrect = false;
    }

    if ($inputText.val() == "") {
      $inputText.parents(".form-group").addClass("has-error");
      bCorrect = false;
    }

    // check for valid email addy
    var apos = $inputEmail.val().indexOf("@");
    var dotpos = $inputEmail.val().lastIndexOf(".");

    if (apos < 1 || dotpos - apos < 2) {
      $inputEmail.parents(".form-group").addClass("has-error");
      bCorrect = false;
    }

    // ** END **
    return bCorrect;
  }

  $(".goto").on("click", function(e) {
    e.preventDefault();
    var goto = $(this).attr("href");
    var pos = $(goto).offset();
    var topPos = pos.top - 69;

    $("html, body").animate({ scrollTop: topPos }, "1500");
  });
  var settings = {
    text: "To Top",
    min: 200,
    inDelay: 600,
    outDelay: 400,
    containerID: "toTop",
    containerHoverID: "toTopHover",
    scrollSpeed: 400,
    easingType: "linear"
  };

  var toTopHidden = true;
  var toTop = $("#" + settings.containerID);
  var heading = $(".header");

  toTop.click(function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "1500");
  });

  $(window).scroll(function() {
    //console.log(window.location.pathname);
    var sd = $(this).scrollTop();
    if (sd > settings.min && toTopHidden) {
      toTop.fadeIn(settings.inDelay);
      if (window.innerWidth > 479) {
        heading.slideDown("slow");
      }
      toTopHidden = false;
    } else if (sd <= settings.min && !toTopHidden) {
      toTop.fadeOut(settings.outDelay);
      heading.slideUp("slow");

      toTopHidden = true;
    }
  });

  $("#form-submit").on("click", function(e) {
    e.preventDefault();
    var $formContact = $("#form-contact"),
      $spinnerHolder = $(".spinner-holder"),
      $errorMessage = $("#errorMessage");
    $formContact.find(".has-error").removeClass("has-error");
    $errorMessage.addClass("hide");
    if (checkform()) {
      $spinnerHolder.show();
      var form = $formContact.serialize();
      $.ajax({
        url: "sendMail.php",
        dataType: "json",
        type: "POST",
        data: form,
        success: function(data) {
          $spinnerHolder.hide();
          if (data.success == true) {
            $formContact.hide();
            $("#successMessage").removeClass("hide");
          } else if (data.success == false && data.reason == 0) {
            $("#errorMessage").removeClass("hide");
          } else {
            $.each(data.reason, function(index, error) {
              $("#" + error)
                .parents(".form-group")
                .addClass("has-error");
            });
          }
        },
        error: function(data) {
          $spinnerHolder.hide();
          $("#errorMessage").removeClass("hide");
        }
      });
    }
  });

  /*$(".nav a").on("click", function(){
       $(".nav").find(".active").removeClass("active");
       $(this).parent().addClass("active");
    });*/
  function getQuote() {
    var url = "https://random-quotes-api.herokuapp.com/";
    if ("caches" in window && !navigator.onLine) {
      caches.match(url).then(function(response) {
        console.log("[Quote] : Cache Found");
        if (response != null) {
          response.json().then(function(json) {
            console.log("[Quote] : " + json.quote + " [From cache]");
            $(".quote-body").html(
              "<blockquote>" + json.quote + "</blockquote>"
            );
            $(".quote-by").html(json.author);
            $(".quotes").show();
            $(".quotes").addClass("animated fadeIn");
          });
        }
      });
    }

    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function(data) {
        console.log("[Quote] : " + data.quote + " [From Network]");
        $(".quote-body").html("<blockquote>" + data.quote + "</blockquote>");
        $(".quote-by").html(data.author);
        $(".quotes").show();
        $(".quotes").addClass("animated fadeIn");
      }
    });
  }

  setTimeout(function() {
    var animationEnd =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    $("#main-title").removeClass("animated rollIn");
    $("#main-title")
      .addClass("animated hinge")
      .one(animationEnd, function() {
        $("html, body").animate(
          {
            scrollTop: $("#about").offset().top - 50
          },
          {
            duration: 400,
            complete: function() {
              $("#main-title").removeClass("animated hinge");
              // $("#main-title").addClass('animated rubberBand infinite');
            }
          }
        );
      });
  }, 3000);

  $(document).ready(function() {
    $("#ri-grid").gridrotator({
      rows: 8,
      columns: 8,
      maxStep: 5,
      interval: 2000,
      w1024: {
        rows: 8,
        columns: 6
      },
      w768: {
        rows: 5,
        columns: 5
      },
      w480: {
        rows: 8,
        columns: 4
      },
      w320: {
        rows: 8,
        columns: 4
      },
      w240: {
        rows: 8,
        columns: 3
      }
    });
  });
})();
