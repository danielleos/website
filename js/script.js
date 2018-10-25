// Hello Animation Landing Page
var curry = function curry(f) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            if (window.CP.shouldStopExecution(1)) { break; }
            args[_key] = arguments[_key];
        }
        window.CP.exitedLoop(1);


        return args.length >= f.length ? f.apply(undefined, args) : curry(f.bind.apply(f, [f].concat(args)));
    };
};

var compose = function compose(f, g) {
    return function (x) {
        return f(g(x));
    };
};

var composeN = function composeN() {
    for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        if (window.CP.shouldStopExecution(2)) { break; }
        fns[_key2] = arguments[_key2];
    }
    window.CP.exitedLoop(2);


    return function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            if (window.CP.shouldStopExecution(3)) { break; }
            args[_key3] = arguments[_key3];
        }
        window.CP.exitedLoop(3);


        return fns.reverse().reduce(function (x, f) {
            return f.apply(f, [].concat(x));
        }, args);
    };
};

// ##########################
// Typing
// ##########################
$('.typing__module').each(function (index) {
    var self = $(this),
        _wrapper = $('.typed', self)[0],
        optData = eval('(' + self.attr('data-options') + ')'),
        optDefault = {
            stringsElement: self.find('.typed-strings')[0],
            typeSpeed: 50,
            backSpeed: 50,
            fadeOut: false,
            smartBackspace: true,
            loop: true
        },
        options = $.extend(optDefault, optData);
    var typed = new Typed(_wrapper, options);
});

// ##########################
// Header & Navbar
// ##########################
$('.fullscreenmenu__module').each(function () {
    var self = $(this),
        triggerID = self.attr('trigger');

    self.on("click", function () {
        $(triggerID).toggleClass('open');
        $(this).toggleClass('open');
    });
    $(triggerID).on("click", function () {
        $(triggerID).toggleClass('open');
        self.toggleClass('open');
    });
});

var wh = $(window).height(),
    half = wh / 5,
    headerHeight = $('header').outerHeight();

$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();

    if (scrollTop >= half) {
        $('header').addClass('is-scroll');
    } else {
        $('header').removeClass('is-scroll');
    }
});

$('.onepage-nav').dropdownMenu({
    menuClass: 'onepage-menu',
    breakpoint: 1200,
    toggleClass: 'active',
    classButtonToggle: 'navbar-toggle',
    subMenu: {
        class: 'sub-menu',
        parentClass: 'menu-item-has-children',
        toggleClass: 'active'
    }
});

$('.onepage-nav').onePageNav({
    currentClass: 'current-menu-item',
    scrollOffset: headerHeight
});

// ##########################
// SVG Re-colouring
// ##########################	
jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});