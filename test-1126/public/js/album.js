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
            fetch('/data/album')
                .then(response => response.json())
                .then(data => {
                    data.forEach(element => {
                        var html;
                        html = '<div class="list"><div class="item-name">%name%</div><div class="item-singer">%singer%</div><div class="item-language">%language%</div></div>';

                        html = html.replace('%name%', element.Album_Name);
                        html = html.replace('%singer%', element.Singer_Name);
                        html = html.replace('%language%', element.Language);

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