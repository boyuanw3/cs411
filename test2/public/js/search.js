var UIController = (function() {

    var DOMStrings = {
        // container: '.container',
        bottom: '.bottom',
        songBtn: '.song_btn',
        searchLink: '.searchLink'


    };

    return {

        getDOMStrings: function () {
            return DOMStrings;
        },

        show: function () {
            fetch('/data/search')
                .then(response => response.json())
                .then(data => {
                    if (Object.getOwnPropertyNames(data[0]).includes('Song_Id')) {

                        var titles = '<div class="music"><div class="music-name">Name</div><div class="music-year">Year</div><div class="music-genre">Genre</div><div class="music-singer">Singer</div><div class="music-language">Album</div><div class="music-rating">Average Rating</div><div class="music-recommendation">Recommendations</div></div>';

                        document.querySelector(DOMStrings.bottom).insertAdjacentHTML('beforeend', titles);

                        var container = '<div class="container"></div>'

                        document.querySelector(DOMStrings.bottom).insertAdjacentHTML('beforeend', container);
                        
                        data.forEach(element => {
                            var html = '<div class="list"><div class="item-name clearfix">%name%</div><div class="item-year clearfix">%year%</div><div class="item-genre clearfix">%genre%</div><div class="item-singer clearfix">%singer%</div><div class="item-language clearfix">%album%</div><div class="item-rating clearfix">%avgRating%</div><div class="item-recommendation clearfix">%recommendation%</div></div>';

                            html = html.replace('%name%', element.Song_Name);
                            html = html.replace('%year%', element.Year);
                            html = html.replace('%genre%', element.Genre_Name);
                            html = html.replace('%singer%', element.Singer_Name);
                            html = html.replace('%album%', element.Album_Name);
                            html = html.replace('%avgRating%', element.Avg_Rating);
                            html = html.replace('%recommendation%', element.Recommendations);
                            
                            document.querySelector('.container').insertAdjacentHTML('beforeend', html);
                            
                        });

                    } else if (Object.getOwnPropertyNames(data[0]).includes('Origin_Year')) {

                    } else if (Object.getOwnPropertyNames(data[0]).includes('Gender')) {

                    } else if (Object.getOwnPropertyNames(data[0]).includes('Language')) {

                    };
                })
        }

    }

})();

var controller = (function (UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.songBtn).addEventListener('click', showDatabase);

        document.querySelector(DOM.searchLink).addEventListener('click', removeItem);

    }

    var showDatabase = function () {
        UICtrl.show();

    }
    
    var removeItem = function () {

        

    }



    return{
        init: function() {
            console.log('Application starts');
            setupEventListeners();
            showDatabase();
        }
    };

    

})(UIController);

controller.init();