(function (global, $) {
    var videoApp = {
        flag: true,

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

        clickOnPlay: function clickOnPlay() {
            $('#play').click(function () {
                if (videoApp.flag) {
                    videoApp.playVideo();
                    $('img').remove();
                    $('#video').show();
                    videoApp.flag = false;
                    setTimeout(videoApp.doPause, videoApp.getDelayTime());
                }
                else {
                    videoApp.pauseVideo();
                    videoApp.flag = true;
                }
            });
        }
    };
    videoApp.getDataByAJAX();
    videoApp.clickOnPlay();

})(window, jQuery);