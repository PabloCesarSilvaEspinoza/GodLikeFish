$(function() {

    $.fn.raty.defaults.path = '../../assets/images/rating/';

    // Default
    $('#default-star-rating').raty();

    // Default Score
    $('#score-rating').raty({
        score: 3
    });

    // Number of stars
    $('#no-of-stars').raty({
        number: 10
    });

    // Maximum number of stars
    $('#max-number-stars').raty({
        numberMax: 5,
        number: 100
    });

    // Read Only
    $('#read-only-stars').raty({
        readOnly: true,
        score: 2
    });

    // Read Only Curso (0)
    $('#read-only-stars-c0').raty({
        readOnly: true,
        score: 0
    });

    // Read Only Curso (1)
    $('#read-only-stars-c1').raty({
        readOnly: true,
        score: 1
    });

    // Read Only Curso (2)
    $('#read-only-stars-c2').raty({
        readOnly: true,
        score: 2
    });

    // Read Only Curso (3)
    $('#read-only-stars-c3').raty({
        readOnly: true,
        score: 3
    });

    // Read Only Curso (4)
    $('#read-only-stars-c4').raty({
        readOnly: true,
        score: 4
    });

    // Read Only Curso (5)
    $('#read-only-stars-c5').raty({
        readOnly: true,
        score: 5
    });

    // Read Only Ponente (0)
    $('#read-only-stars-p0').raty({
        readOnly: true,
        score: 0
    });

    // Read Only Ponente (1)
    $('#read-only-stars-p1').raty({
        readOnly: true,
        score: 1
    });

    // Read Only Ponente (2)
    $('#read-only-stars-p2').raty({
        readOnly: true,
        score: 2
    });

    // Read Only Ponente (3)
    $('#read-only-stars-p3').raty({
        readOnly: true,
        score: 3
    });

    // Read Only Ponente (4)
    $('#read-only-stars-p4').raty({
        readOnly: true,
        score: 4
    });

    // Read Only Ponente (5)
    $('#read-only-stars-p5').raty({
        readOnly: true,
        score: 5
    });

    // No Rated Message
    $('#no-rated-msg').raty({
        half: true,
        readOnly: true
    });

    // Cancel Star
    $('#cancel-star').raty({
        cancel: true
    });

    // Space
    $('#space-star').raty({
        space: false
    });

    // Single
    $('#single-star').raty({
        single: true
    });

    // Half Star
    $('#half-star').raty({
        half: true,
    });

    // Star Half
    $('#star-half').raty({
        half: true,
        starHalf: 'star-half-mono.png'
    });

    // Round Enabled
    $('#round-enabled').raty({
        score: 3.26
    });

    // Round Disabled
    $('#round-disabled').raty({
        halfShow: false,
        score: 3.26
    });

    // Custom Icon
    $('#custom-icon-star').raty({
        starOff: 'heart.png',
        starOn: 'like.png'
    });

    // Icon Range
    $('#icon-range').raty({
        iconRange: [
            { range: 1, on: 'wi wi-day-rain-wind font-16', off: 'wi wi-day-cloudy font-16' },
            { range: 2, on: 'wi wi-day-sleet font-16', off: 'wi wi-day-sleet-storm font-16' },
            { range: 3, on: 'wi wi-day-snow font-16', off: 'wi wi-day-storm-showers font-16' },
            { range: 4, on: 'wi wi-night-alt-snow font-16', off: 'wi wi-night-alt-thunderstorm font-16' },
            { range: 5, on: 'wi wi-night-snow-thunderstorm font-16', off: 'wi wi-night-snow-wind font-16' }
        ],
        starType: 'i'
    });

});