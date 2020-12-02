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
                        html = `<div class="list" id="item-%id%">

                        <div class="itemAll">
        
                            <div class="item">
                                <div class="singer-name clearfix">%name%</div>
                                <div class="singer-gender clearfix">%gender%</div>
                                <div class="singer-year clearfix">%debutYear%</div>
                            </div>
        
                            <div class="item-operation">
                                <div class="update-btn"><i class="fas fa-edit"></i></div>
                            </div>
        
                        </div>
                    
        
                        <div class="item-update-all showUpdate" id="item-update-%id%">
        
                            <form class="item-update" method="POST" action="/singer/update/%id%">
                                <label for="singerGender">Gender:</label>
                                <input type="text" placeholder="%gender%" name="singerGender" id="singerGender">
                                <label for="singerDebutYear">Debut Year:</label>
                                <input type="number" placeholder="%debutYear%" name="singerDebutYear" id="singerDebutYear">
                                <button class="update-submit-btn" type="submit" id="updateSinger-%id%"><i class="ion-ios-checkmark-outline"></i></button>
                            </form>
        
                        </div>
                        
                    </div>`

                        html = html.replaceAll('%name%', element.Singer_Name);
                        html = html.replaceAll('%gender%', element.Gender);
                        html = html.replaceAll('%debutYear%', element.Debut_Year);
                        html = html.replaceAll('%id%', element.Singer_Id);

                        document.querySelector(DOMStrings.container).insertAdjacentHTML('beforeend', html);

                    });
                })
        },

        showUpdateBar (selectedId) {
            const element = document.getElementById(selectedId)
            element.classList.toggle('showUpdate')
        }

    }

})();

var controller = (function (UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.container).addEventListener('click', showUpdate);

    }

    var showUpdate = function (event) {
        let id = event.target.parentNode.parentNode.parentNode.parentNode.id.split('-')[1]

        if (event.target.parentNode.className === 'update-btn') {
            id = 'item-update-' +id
            UICtrl.showUpdateBar(id)
        }

    }


    var showDatabase = function () {
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