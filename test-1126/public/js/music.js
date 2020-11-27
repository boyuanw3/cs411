var UIController = (function() {

    var DOMStrings = {
        inputBtn: '.add_btn',
        inputName: '.add_name',
        inputYear: '.add_year',
        inputGenre: '.add_genre',
        inputSinger: '.add_singer',
        inputLanguage: '.add_language',
        container: '.container',
        updateBtn: '.update-btn'
    };

    return {

        getDOMStrings: function () {
            return DOMStrings;
        },


        show: function () {
            fetch('/data/music')
                .then(response => response.json())
                .then(data => {
                    data.forEach(element => {
                        var html;
                    //     html = `<div class="list" id="list-%id%">

                    //     <form class="form" method="post" action="/music/delete">
                    //         <div class="list_container">
                    //             <div class="list-item">
                    //                 <div class="item-name clearfix">%name%</div>
                    //                 <div class="item-year clearfix">%year%</div>
                    //                 <div class="item-genre clearfix">%genre%</div>
                    //                 <div class="item-singer clearfix">%singer%</div>
                    //                 <div class="item-language clearfix">%album%</div>
                    //                 <div class="item-rating clearfix">%avgRating%</div>
                    //                 <div class="item-recommendation clearfix">%recommendation%</div>
                    //             </div>
                    //             <div class="list-operation">
                    //                 <button class="list_delete-btn" name="%id%-delete"><i class="far fa-trash-alt"></i></button>
                    //                 <div class="update-btn"><i class="fas fa-edit"></i></div>
                    //                 <div class="collect-btn"><i class="far fa-heart"></i></div>
                    //                 <div class="rating-btn"><i class="fas fa-star-half-alt"></i></div>
                    //             </div>
                    //         </div>
                    //     </form>
        
                    //     <div class="update showUpdate" id="update-%id%">
                    //         <div class="update-list">
                    //             <form action="/music/update/%id%" method="post" class="update-form">
                    //                 <label for="songYear">Year:</label>
                    //                 <input type="text" class="update-year" name="songYear" placeholder="%year%">
                    //                 <label for="songGenre">Genre:</label>
                    //                 <input type="text" class="update-genre" name="songGenre" placeholder="%genre%">
                    //                 <label for="songSinger">Singer:</label>
                    //                 <input type="text" class="update-singer" name="songSinger" placeholder="%singer%">
                    //                 <label for="songAlbum">Album:</label>
                    //                 <input type="text" class="update-album" name="songAlbum" placeholder="%album%">
                    //                 <button class="update-submit" type="submit" id="update-%id%"><i class="ion-ios-checkmark-outline"></i></button>
                    //             </form>
                    //         </div>
                    //     </div>
        
        
        
                    // </div>`

                    html = `<div class="list" id="list-%id%">

                    <div class="form" method="post" action="/music/delete">
                        <div class="list_container">
                            <div class="list-item">
                                <div class="item-name clearfix">%name%</div>
                                <div class="item-year clearfix">%year%</div>
                                <div class="item-genre clearfix">%genre%</div>
                                <div class="item-singer clearfix">%singer%</div>
                                <div class="item-language clearfix">%album%</div>
                                <div class="item-rating clearfix">%avgRating%</div>
                                <div class="item-recommendation clearfix">%recommendation%</div>
                            </div>
                            <div class="list-operation">
                                <form action="/music/delete" method="POST" class="delete-form">
                                    <button class="list_delete-btn" name="%id%-delete"><i class="far fa-trash-alt"></i></button>
                                </form>
                                <div class="update-btn"><i class="fas fa-edit"></i></div>
                                <form action="/music/collect/%id%" method="POST" class="collect-form">
                                    <button class="collect-btn" name="%id%-collect"><i class="far fa-heart"></i></button>
                                </form>
                                <!-- <div class="collect-btn"><i class="fas fa-heart"></i></div> -->
                                <div class="rating-btn"><i class="fas fa-star-half-alt"></i></div>
                            </div>
                        </div>
                    </div>
    
                    <div class="update showUpdate" id="update-%id%">
                        <div class="update-list">
                            <form action="/music/update/%id%" method="post" class="update-form">
                                <label for="songYear">Year:</label>
                                <input type="text" class="update-year" name="songYear" placeholder="%year%">
                                <label for="songGenre">Genre:</label>
                                <input type="text" class="update-genre" name="songGenre" placeholder="%genre%">
                                <label for="songSinger">Singer:</label>
                                <input type="text" class="update-singer" name="songSinger" placeholder="%singer%">
                                <label for="songAlbum">Album:</label>
                                <input type="text" class="update-album" name="songAlbum" placeholder="%album%">
                                <button class="update-submit" type="submit" id="update-%id%"><i class="ion-ios-checkmark-outline"></i></button>
                            </form>
                        </div>
                    </div>
    
    
    
                </div>`

                        html = html.replaceAll('%id%', element.Song_Id);
                        html = html.replaceAll('%name%', element.Song_Name);
                        html = html.replaceAll('%year%', element.Year);
                        html = html.replaceAll('%genre%', element.Genre_Name);
                        html = html.replaceAll('%singer%', element.Singer_Name);
                        html = html.replaceAll('%album%', element.Album_Name);
                        html = html.replaceAll('%avgRating%', element.Avg_Rating);
                        html = html.replaceAll('%recommendation%', element.Recommendations);

                        document.querySelector(DOMStrings.container).insertAdjacentHTML('beforeend', html);

                    });
                })
        },

        showUpdateBar: function (selectedId) {
            var element = document.getElementById(selectedId);
            element.classList.toggle('showUpdate');
            
        }


    }

})();

var controller = (function (UICtrl) {

    var setupEventListeners = function () {
        var DOMStrings = UICtrl.getDOMStrings;

        document.querySelector('.container').addEventListener('click', showUpdate);

    }

    var showUpdate = function (event) {

        var id, selectedId, className;

        className = event.target.parentNode.className;

        if (className === 'update-btn') {

            id = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
            id = id.split('-')[1];
    
            selectedId = 'update-' + id;
    
            UICtrl.showUpdateBar(selectedId);
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