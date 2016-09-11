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
            setTimeout(function () {
                videoApp.doDelay();
            }, videoApp.getPauseTime());

        },

        flagForAutoPause: true,
        flagForPause: false,

        playFirstTimeOnClick: function playFirstTimeOnClick() {
            videoApp.playVideo();
            $('img').remove();
            $('#video').show();
            videoApp.flagForAutoPause = false;
            setTimeout(function () {
                videoApp.doPause();
            }, videoApp.getDelayTime());
        },

        pauseOnClick: function pauseOnClick() {
            videoApp.pauseVideo();
            videoApp.flagForPause = true;
        },

        playSecondTimeOnClick: function playSecondTimeOnClick() {
            videoApp.playVideo();
            videoApp.flagForAutoPause = false;
            videoApp.flagForPause = false;
        },

        clickOnPlay: function clickOnPlay() {
            $('#play').click(function () {
                if ( videoApp.flagForAutoPause && !videoApp.flagForPause ) {
                    videoApp.playFirstTimeOnClick();
                }
                else if ( !videoApp.flagForAutoPause && !videoApp.flagForPause ) {
                    videoApp.pauseOnClick();
                }
                else if ( !videoApp.flagForAutoPause && videoApp.flagForPause ) {
                    videoApp.playSecondTimeOnClick();
                }
            });
        }
    };
    videoApp.getDataByAJAX();
    videoApp.clickOnPlay();

})(window, jQuery);