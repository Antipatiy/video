(function (global, $) {
    var videoApp = {
        returnItems: '',

        getDataByAJAX: function getDataByAJAX() {
            $.getJSON('json/package.json', function (data) {
                var items = [];

                $.each(data, function (key, val) {
                    items.push(val);
                });

                return videoApp.returnItems = function () {
                    return items;
                };
            });
        },

        video: document.getElementById("video"),

        showImg: function showImg() {
            return $('<img>', {
                'src': videoApp.returnItems()[0]
            });
        },

        getDelayTime: function getDelayTime() {
            return videoApp.returnItems()[1];
        },

        getPauseTime: function getPauseTime() {
            return videoApp.returnItems()[2];
        },

        showText: function showText() {
            return $('<p>', {
                'class': 'text',
                html: videoApp.returnItems()[3]
            });
        },

        playVideo: function playVideo() {
            videoApp.video.play();
        },

        doDelay: function doDelay() {
            videoApp.playVideo();
            $('img').remove();
            $('.text').remove();
            $('#video').show();
        },

        pauseVideo: function pauseVideo() {
            videoApp.video.pause();
        },

        doPause: function doPause() {
            $('img').remove();
            $('#video').hide();
            $('.wrapper').append(videoApp.showImg());
            $('.empty').append(videoApp.showText());
            videoApp.pauseVideo();
            setTimeout(videoApp.doDelay, videoApp.getPauseTime());
        },

        flagForAutoPause: true,
        flagForPause: false,

        clickOnPlay: function clickOnPlay() {
            $('#play').click(function () {
                var timeout = setTimeout(videoApp.doPause, videoApp.getDelayTime());

                if ( videoApp.flagForAutoPause && !videoApp.flagForPause ) {
                    videoApp.playVideo();
                    $('img').remove();
                    $('#video').show();
                    videoApp.flagForAutoPause = false;
                    //var timeout = setTimeout(videoApp.doPause, videoApp.getDelayTime());
                    timeout();
                }
                else if ( !videoApp.flagForAutoPause && !videoApp.flagForPause ) {
                    videoApp.pauseVideo();
                    //videoApp.flagForAutoPause = true;
                    videoApp.flagForPause = true;
                    //clearTimeout(timeout);
                }
                else if ( !videoApp.flagForAutoPause && videoApp.flagForPause ) {
                    videoApp.playVideo();
                    videoApp.flagForAutoPause = false;
                    videoApp.flagForPause = false;
                }
            });
        }
    };
    videoApp.getDataByAJAX();
    videoApp.clickOnPlay();

})(window, jQuery);