//This code must be in app.js
var getData = function(url, callback) {
    $.getJSON(url, function(data) {
        var items = [];

        $.each(data, function(key, val) {
            items.push(val);
        });

        callback(items);
    });
};

var VideoApi = function($myVideo, items) {

    this.play = function() {
        $myVideo.get(0).play();
    };

    this.pause = function() {
        $myVideo.get(0).pause();
    };

    this.returnImg = function() {
        return $('<img>', {
            'src': items[0]
        });
    };

    this.returnDelayTime = function() {
        return items[1];
    };

    this.returnPauseTime = function() {
        return items[2];
    };

    this.returnText = function() {
        return $('<p>', {
            'class': 'text',
            html: items[3]
        });
    };

    this.doDelay = function() {
        this.play();
        $('img').remove();
        $('.text').remove();
        $myVideo.show();
    };

    this.doPause = function() {
        $('img').remove();
        $myVideo.hide();
        $('.wrapper').append( this.returnImg() );
        $('.empty').append( this.returnText() );
        this.pause();
        setTimeout(this.doDelay, this.returnPauseTime());
    }
};

getData('json/package.json', function(items) {
    var $video = $('#video1');
    var videoApi = new VideoApi($video, items);

    $('#play').click(function() {
        $('img').remove();
        $video.show();
        setTimeout(function() {
            videoApi.doPause();
        }, videoApi.returnDelayTime());
    });
});
