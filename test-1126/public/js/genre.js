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

        // getInput: function () {
        //     return {
        //         name: document.querySelector(DOMStrings.inputName).value,
        //         year: document.querySelector(DOMStrings.inputYear).value,
        //         genre: document.querySelector(DOMStrings.inputGenre).value,
        //         singer: document.querySelector(DOMStrings.inputSinger).value,
        //         language: document.querySelector(DOMStrings.inputLanguage).value
        //     }
        // },

        // addListItem: function (obj) {
        //     var html;
        //     html = '<div class="list" id="---"><div class="item-name clearfix">%name%</div><div class="item-year clearfix">%year%</div><div class="item-genre clearfix">%genre%</div><div class="item-singer clearfix">%singer%</div><div class="item-language clearfix">%language%</div><div class="item-rating clearfix">%avgRating%</div><div class="item-recommendation clearfix">%recommendation%</div></div>';

        //     html = html.replace('%name%', obj.name);
        //     html = html.replace('%year%', obj.year);
        //     html = html.replace('%genre%', obj.genre);
        //     html = html.replace('%singer%', obj.singer);
        //     html = html.replace('%language%', obj.language);

        //     // insert into HTML
        //     document.querySelector(DOMStrings.container).insertAdjacentHTML('beforeend', html);
        // },

        // clearFields: function () {
        //     fields = document.querySelectorAll(DOMStrings.inputName +
        //         ',' + DOMStrings.inputYear + ',' + DOMStrings.inputGenre +
        //         ',' + DOMStrings.inputSinger + ',' + DOMStrings.inputLanguage);

        //     fields.forEach(field => {
        //         field.value = '';
        //     });
        // }, 

        show: function () {
            fetch('/data/genre')
                .then(response => response.json())
                .then(data => {
                    data.forEach(element => {
                        var html;
                        html = '<div class="list" id="item-0"><div class="item-name clearfix">%name%</div><div class="item-year clearfix">%year%</div><div class="item-country clearfix">%country%</div></div>';

                        html = html.replace('%name%', element.Genre_Name);
                        html = html.replace('%year%', element.Origin_Year);
                        html = html.replace('%country%', element.Origin_Country);

                        document.querySelector(DOMStrings.container).insertAdjacentHTML('beforeend', html);

                    });
                })
        }

    }

})();

var controller = (function (UICtrl) {

    // var setupEventListeners = function () {
    //     var DOM = UICtrl.getDOMStrings();

    //     document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    //     document.addEventListener('keypress', function(e) {
    //         if (e.keyCode === 13 || e.which === 13) {
    //             ctrlAddItem();
    //         }
    //     });

    // }

    // var ctrlAddItem = function () {
    //     var input;

    //     // get the field input
    //     input = UICtrl.getInput();
    //     // give the item to backend (to dataController)

    //     // add the new item to the interface
    //     UICtrl.addListItem(input);
    //     // clear fields
    //     UICtrl.clearFields();

    // }

    var showDatabase = function () {

        // obtain database result from datacontroller
        // data = dataCtrl.getData();
        // console.log(data);
        // show database result in UI
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