var body = document.body;
var docEl = document.documentElement;
var volatility = 0;
var text;
$('#center-text').css
    ({
        'position': 'absolute',
        'top': ($('#background-video').height() / 2),
        'left': '50%'
    });

if($(window).width() < 640){
    $("#nav-bar").empty();
}

function resize() {
    $("#center-text").children().remove();
    if ($(window).width() > 980) {
        text = new Blotter.Text("Scott Hodges", {
            family: "'Montserrat', 'sans-serif'",
            size: 100,
            fill: "#e6e6e6",
            paddingLeft: 100,
            paddingRight: 100,
        });
    }
    else if ($(window).width() > 640) {
        text = new Blotter.Text("Scott Hodges", {
            family: "'Montserrat', 'sans-serif'",
            size: 60,
            fill: "#e6e6e6",
            paddingLeft: 60,
            paddingRight: 60,
        });
    }
    else {
        text = new Blotter.Text("Scott Hodges", {
            family: "'Montserrat', 'sans-serif'",
            size: 30,
            fill: "#e6e6e6",
            paddingLeft: 0,
            paddingRight: 0,
        });
    }
    var blotter = new Blotter(material, {
        texts: text
    });

    var scope = blotter.forText(text);
    
    scope.appendTo($("#center-text"));
}

$(window).scroll(function () {
    var whitePos = $("#about-container").offset().top;
    var whiteHeight = $("#about-container").height();
    var projectsPos = $("#projects").offset().top;
    var projectsHeight = $("#projects").height();
    var aboutPos = $("#about").offset().top;
    var contactHeight = $("#contact").height();
    var contactPos = $("#contact").offset().top;

    if (projectsPos > $("#background-video").height()) {
        $('#projects').addClass('black-color');
        $('#projects').removeClass('white-color');
    }
    else {
        $('#projects').addClass('white-color');
        $('#projects').removeClass('black-color');
    }
    if (aboutPos > $("#background-video").height()) {
        $('#about').addClass('black-color');
        $('#about').removeClass('white-color');
    }
    else {
        $('#about').addClass('white-color');
        $('#about').removeClass('black-color');
    }
    if (contactPos > $("#background-video").height()) {
        $('#contact').addClass('black-color');
        $('#contact').removeClass('white-color');
    }
    else {
        $('#contact').addClass('white-color');
        $('#contact').removeClass('black-color');
    }
})

$(document).on("click", ".tile", function () {
    var win = window.open($(this).attr("data-url"), '_blank');
    win.focus();
})

$("#about").on("click", function () {
    $("html, body").animate({
        scrollTop: $("#about-container").offset().top - 50
    },
        'slow');
});


$("#projects").on("click", function () {
    $("html, body").animate({
        scrollTop: $("#projects-container").offset().top - 50
    },
        'slow');
});

$("#contact").on("click", function () {
    $("html, body").animate({
        scrollTop: $("#contact-me-container").offset().top - 50
    },
        'slow');
});

var video = document.getElementById('background-video');
video.playbackRate = 2;

var material = new Blotter.LiquidDistortMaterial();
material.uniforms.uSpeed.value = 0.5;
material.uniforms.uVolatility.value = 0;

resize();

var lastMousePosition = { x: 0, y: 0 };
var MathUtils = {
    lineEq: (y2, y1, x2, x1, currentVal) => {
        // y = mx + b 
        var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
        return m * currentVal + b;
    },
    lerp: (a, b, n) => (1 - n) * a + n * b,
    distance: (x1, x2, y1, y2) => {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.hypot(a, b);
    }
};

var to = undefined;

$(window).resize(function () {
    $('#center-text').css
        ({
            'position': 'absolute',
            'top': ($('#background-video').height() / 2),
            'left': '50%'
        });
    resize();
});

$("#center-text").mousemove(function (event) {
    clearInterval(to);
    var docScrolls = { left: body.scrollLeft + docEl.scrollLeft, top: body.scrollTop + docEl.scrollTop };
    var relmousepos = { x: event.originalEvent.x - docScrolls.left, y: event.originalEvent.y - docScrolls.top };
    var mouseDistance = MathUtils.distance(lastMousePosition.x, relmousepos.x, lastMousePosition.y, relmousepos.y);
    volatility = MathUtils.lerp(volatility, Math.min(MathUtils.lineEq(0.9, 0, 100, 0, mouseDistance), 0.9), 0.05);
    material.uniforms.uVolatility.value = 1 * volatility;
    lastMousePosition = { x: relmousepos.x, y: relmousepos.y };
    material.needsUpate = true;
    to = setInterval(lowerDist, 30);
})

function lowerDist() {
    volatility = volatility - (volatility / 60);
    if (volatility < 0.0001) {
        volatility = 0;
        clearInterval(to);
    }
    material.uniforms.uVolatility.value = 1 * volatility;
    material.needsUpate = true;
}

$(".social-media").on("click", function () {
    var url = $(this).attr("data-url");
    goTo(url);
})

$(".deployed").on("click", function () {
    var url = $(this).attr("data-url");
    goTo(url);
})

function goTo(url) {
    var win = window.open(url, '_blank');
    win.focus();
}


