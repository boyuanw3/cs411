var dataController = (function(){

})();

var UIController = (function() {
    DOMStrings = {
        info: '.info'
    };

    return {
        getDOMStrings: function() {
            return DOMStrings;
        },

        deleteListItem: function(id) {
            var selectedElement;
            selectedElement = document.getElementById(id);
            selectedElement.parentNode.removeChild(selectedElement);

        }
    }

    
})();

var controller = (function (dataCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOMStrings = UICtrl.getDOMStrings();

        document.querySelector(DOMStrings.info).addEventListener('click', ctrlDeleteItem);
    }

    var ctrlDeleteItem = function (e) {
        var eventId;

        eventId = e.target.parentNode.parentNode.parentNode.id;
        // delete from data

        // delete from UI
        UICtrl.deleteListItem(eventId);

    }




    return{
        init: function() {
            console.log('Application starts');
            setupEventListeners();
        }
    };

    

})(dataController, UIController);

controller.init();
