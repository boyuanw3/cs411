var UIController = (function() {

    var DOMStrings = {
        updateBtn: '.update-btn',
        container: '.container'
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
                        html = `<div class="list" id="item-%id%">

                        <div class="itemAll">
        
                            <div class="item">
                                <div class="item-name clearfix">%genre%</div>
                                <div class="item-year clearfix">%year%</div>
                                <div class="item-country clearfix">%country%</div>
                            </div>
        
                            <div class="item-operation">
                                <div class="update-btn"><i class="fas fa-edit"></i></div>
                            </div>
        
                        </div>
                    
        
                        <div class="item-update-all showUpdate" id="item-update-%id%">
        
                            <form class="item-update" method="POST" action="/genre/update/%id%">
                                <label for="genreYear">Year:</label>
                                <input type="number" placeholder="%year%" name="genreYear" id="genreYear">
                                <label for="genreCountry">Country:</label>
                                <input type="text" placeholder="%country%" name="genreCountry" id="genreCountry">
                                <button class="update-submit-btn" type="submit" id="updateGenre-%id%"><i class="ion-ios-checkmark-outline"></i></button>
                            </form>
        
                        </div>
                        
                    </div>`

                        html = html.replaceAll('%genre%', element.Genre_Name);
                        html = html.replaceAll('%year%', element.Origin_Year);
                        html = html.replaceAll('%country%', element.Origin_Country);
                        html = html.replaceAll('%id%', element.Genre_Id);

                        document.querySelector(DOMStrings.container).insertAdjacentHTML('beforeend', html);

                    });
                })
        },

        showUpdateBar: function (selectedId) {
            const element = document.getElementById(selectedId)
            element.classList.toggle('showUpdate')
        }

    }

})();

var controller = (function (UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.container).addEventListener('click', showUpdate);
        // document.addEventListener('keypress', function(e) {
        //     if (e.keyCode === 13 || e.which === 13) {
        //         ctrlAddItem();
        //     }
        // });

    }

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

    var showUpdate = function (event) {
        let id = event.target.parentNode.parentNode.parentNode.parentNode.id.split('-')[1]

        if (event.target.parentNode.className === 'update-btn') {
            id = 'item-update-' + id
            UICtrl.showUpdateBar(id)

        }

    }

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
            setupEventListeners();
            showDatabase();
        }
    };

    

})(UIController);

controller.init();