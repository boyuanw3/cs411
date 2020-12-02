var dataController = (function(){

})();

var UIController = (function() {
    DOMStrings = {
        info: '.info',
        preferenceDetail: '.preDetail',
        collectionDetail: '.collectDetail',
        ratedSongDetail: '.ratedDetail'
    };

    return {
        getDOMStrings: function() {
            return DOMStrings;
        },

        deleteListItem: function(id) {
            var selectedElement;
            selectedElement = document.getElementById(id);
            selectedElement.parentNode.removeChild(selectedElement);

        },

        show: function () {
            fetch('/data/user')
                .then(response => response.json())
                .then(data => {
                    // console.log(data)

                    let html = `<div class="username clearfix">

                                    <div class="title">Username</div>
                                    <div class="detailInfo">%username%</div>
        
                                </div>
        
                                <div class="email  clearfix">
                        
                                    <div class="title">Email</div>
                                    <div class="detailInfo">%email%</div>
                        
                                </div>
                        
                                <div class="preference clearfix">

                                    <div class="title">Preference</div>
                                    <div class="detailInfo preDetail">
                                        
                            
                                    </div>

                                </div>
        
                                <div class="collections clearfix">
                        
                                    <div class="title">Collections</div>
                                    <div class="detailInfo collectDetail">
                        
                                    </div>
                        
                                </div>
        
                                <div class="ratedSongs clearfix">
                        
                                    <div class="title">Rated Songs</div>
                            
                                    <div class="detailInfo ratedDetail">
                        
                                        

                                    </div>
                                </div>
                                <div class="logout">
                                    <form action="/users/logout" method="POST" class="logout_form"><button type="submit" class="logout_btn">LOGOUT</button></form>
                                </div>
                    `

                    html = html.replace('%username%', data.name)
                    html = html.replace('%email%', data.email)
                    
                    document.querySelector(DOMStrings.info).insertAdjacentHTML('beforeend', html)

                    data.preference.forEach((e, index) => {
                        let preHTML = `<div class="items" id="pre-%id%">
                                            <div class="genrename">%preference%</div>
                                        </div>`
                        
                        preHTML = preHTML.replace('%preference%', e)
                        preHTML = preHTML.replace('%id%', index)

                        document.querySelector(DOMStrings.preferenceDetail).insertAdjacentHTML('beforeend', preHTML)

                    });

                    data.collect.forEach((e, index) => {
                        let collectHTML = `<form class="items" id="col-%id%" method="POST" action="/users/collection/delete/%id%">
                        <div class="songname">%collection%</div>
                        <div class="delete-btn">
                            <button class="item__delete--btn" type="submit"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </form>`
                        
                        collectHTML = collectHTML.replaceAll('%collection%', e)
                        collectHTML = collectHTML.replaceAll('%id%', index)

                        document.querySelector(DOMStrings.collectionDetail).insertAdjacentHTML('beforeend', collectHTML)
                    })
                    
                    data.ratedSong.forEach((e, index) => {
                        let ratedSongHTML = `<form class="items" id="rated-%id%" method="POST" action="/users/rated/delete/%id%">
                        <div class="songname">%ratedSong%</div>
                        <div class="rating">%rating%</div>
                        <div class="delete-btn">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </form>`

                        
                        
                        ratedSongHTML = ratedSongHTML.replaceAll('%ratedSong%', e.songName)
                        ratedSongHTML = ratedSongHTML.replaceAll('%rating%', e.songRating.toFixed(1))
                        ratedSongHTML = ratedSongHTML.replaceAll('%id%', index)

                        document.querySelector(DOMStrings.ratedSongDetail).insertAdjacentHTML('beforeend', ratedSongHTML)

                    })
                    
                    

                })
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

    var show = function () {
        UICtrl.show()
    }




    return{
        init: function() {
            console.log('Application starts');
            // setupEventListeners();
            show();
        }
    };

    

})(dataController, UIController);

controller.init();
