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
        getDOMStrings: function () {
            return DOMStrings;
        },


        show: function () {
            fetch('/data/singer')
                .then(response => response.json())
                .then(data => {
                    data.forEach(element => {
                        var html;
                        html = '<div class="list" id="item-0"><div class="singer-name">%name%</div><div class="singer-gender">%gender%</div><div class="singer-year">%year%</div></div>';

                        html = html.replace('%name%', element.Singer_Name);
                        html = html.replace('%gender%', element.Gender);
                        html = html.replace('%year%', element.Debut_Year);

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