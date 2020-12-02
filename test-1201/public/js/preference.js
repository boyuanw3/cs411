var UIController = (function() {

    var DOMStrings = {
        submitBtn: '.pre-submit-btn'
    };

    return {

        getDOMStrings: function () {
            return DOMStrings;
        },


        show: function () {
            fetch('/data/genre')
                .then(response => response.json())
                .then(data => {
                    data.forEach(element => {

                        var html;
                        html = `<input class="single-checkbox" type="checkbox" name="genre" value="%genre%">%genre%<br>`

                        html = html.replaceAll('%genre%', element.Genre_Name);

                        document.querySelector(DOMStrings.submitBtn).insertAdjacentHTML('beforebegin', html);

                    });
                })
        }

    }

})();

var controller = (function (UICtrl) {

    var setupEventListeners = function () {
        var DOMStrings = UICtrl.getDOMStrings;

        // document.querySelector('.container').addEventListener('click', showUpdate);

    }


    var showGenre = function () {

        UICtrl.show();

    }

    return{
        init: function() {
            console.log('Application starts');
            setupEventListeners();
            showGenre();
        }
    };

    

})(UIController);

controller.init();