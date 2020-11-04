var UIController = (function() {

    var DOMStrings = {
        inputBtn: '.add_btn',
        inputName: '.add_name',
        inputYear: '.add_year',
        inputGenre: '.add_genre',
        inputSinger: '.add_singer',
        inputLanguage: '.add_language',
        container: '.container'
    };

    return {


        show: function () {
            fetch('/data/music')
                .then(response => response.json())
                .then(data => {
                    data.forEach(element => {
                        var html;
                        html = '<div class="list" id="---"><div class="item-name clearfix">%name%</div><div class="item-year clearfix">%year%</div><div class="item-genre clearfix">%genre%</div><div class="item-singer clearfix">%singer%</div><div class="item-language clearfix">%album%</div><div class="item-rating clearfix">%avgRating%</div><div class="item-recommendation clearfix">%recommendation%</div></div>';

                        html = html.replace('%name%', element.Song_Name);
                        html = html.replace('%year%', element.Year);
                        html = html.replace('%genre%', element.Genre_Name);
                        html = html.replace('%singer%', element.Singer_Name);
                        html = html.replace('%album%', element.Album_Name);
                        html = html.replace('%avgRating%', element.Avg_Rating);
                        html = html.replace('%recommendation%', element.Recommendations);

                        document.querySelector(DOMStrings.container).insertAdjacentHTML('beforeend', html);

                    });
                })
        }

    }

})();

var controller = (function (UICtrl) {


    var showDatabase = function () {

        UICtrl.show();

    }

    return{
        init: function() {
            console.log('Application starts');
            // setupEventListeners();
            showDatabase();
        }
    };

    

})(UIController);

controller.init();