//GOVNO-CODE

//AJAX
var returnItems;


$.getJSON('json/package.json', function(data){
    var items = [];

    $.each(data, function(key, val){
        items.push(val);
    });

    return returnItems = function() {
        return items;
    };
});

//Video events
var myVideo = document.getElementById("video1");

var play = function() {
    myVideo.play();
};

var pause = function() {
    myVideo.pause();
};
//Data functions
var returnImg = function() {
    return $('<img>', {
        'src': returnItems()[0]
    });
};
var returnDelayTime = function() {
    return returnItems()[1];
};

var returnPauseTime = function() {
    return returnItems()[2];
};

var returnText = function() {
    return $('<p>', {
        'class': 'text',
        html: returnItems()[3]
    });
};

var doDelay = function() {
    play();
    $('img').remove();
    $('.text').remove();
    $('#video1').show();
};

var doPause = function() {
    $('img').remove();
    $('#video1').hide();
    $('.wrapper').append( returnImg() );
    $('.empty').append( returnText() );
    pause();
    setTimeout(doDelay, returnPauseTime());
};
//Click on play button
$('#play').click(function() {
    $('img').remove();
    $('#video1').show();
    setTimeout(doPause, returnDelayTime());
});
