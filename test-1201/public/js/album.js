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
            fetch('/data/album')
                .then(response => response.json())
                .then(data => {
                    data.forEach(element => {
                        var html;
                        html = `<div class="list" id="item-%id%">

                        <div class="itemAll">
        
                            <div class="item">
                                <div class="item-name">%name%</div>
                                <div class="item-singer">%singer%</div>
                                <div class="item-language">%language%</div>
                            </div>
        
                            <div class="item-operation">
                                <div class="update-btn"><i class="fas fa-edit"></i></div>
                            </div>
        
                        </div>
                    
        
                        <div class="item-update-all showUpdate" id="item-update-%id%">
        
                            <form class="item-update" method="POST" action="/album/update/%id%">
                                <label for="albumSinger">Singer:</label>
                                <input type="text" placeholder="%singer%" name="albumSinger" id="albumSinger">
                                <label for="albumLanguage">Language:</label>
                                <input type="text" placeholder="%language%" name="albumLanguage" id="albumLanguage">
                                <button class="update-submit-btn" type="submit" id="updateAlbum-%id%"><i class="ion-ios-checkmark-outline"></i></button>
                            </form>
        
                        </div>
                        
                    </div>`

                        html = html.replaceAll('%name%', element.Album_Name);
                        html = html.replaceAll('%singer%', element.Singer_Name);
                        html = html.replaceAll('%language%', element.Language);
                        html = html.replaceAll('%id%', element.Album_Id);

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