var UIController = (function() {

    var DOMStrings = {
        // container: '.container',
        bottom: '.bottom',
        songBtn: '.song_btn',
        searchLink: '.searchLink'


    };

    return {

        getDOMStrings: function () {
            return DOMStrings;
        },

        show: function () {
            fetch('/data/search')
                .then(response => response.json())
                .then(data => {

                    if (Object.getOwnPropertyNames(data[0]).includes('Song_Id')) {

                        const title = `<div class="music">
                        <div class="music-name">Name</div>
                        <div class="music-year">Year</div>
                        <div class="music-genre">Genre</div>
                        <div class="music-singer">Singer</div>
                        <div class="music-language">Album</div>
                        <div class="music-rating">Average Rating</div>
                        </div>`

                        document.querySelector(DOMStrings.bottom).insertAdjacentHTML('beforeend', title);

                        const container = '<div class="container"></div>'

                        document.querySelector(DOMStrings.bottom).insertAdjacentHTML('beforeend', container);
                        
                        data.forEach(element => {

                            let html = `<div class="list music-list" id="item-%id%">
                            <div class="item-name clearfix">%name%</div>
                            <div class="item-year clearfix">%year%</div>
                            <div class="item-genre clearfix">%genre%</div>
                            <div class="item-singer clearfix">%singer%</div>
                            <div class="item-language clearfix">%album%</div>
                            <div class="item-rating clearfix">%avgRating%</div>
                            </div>`

                            html = html.replaceAll('%name%', element.Song_Name);
                            html = html.replaceAll('%year%', element.Year);
                            html = html.replaceAll('%genre%', element.Genre_Name);
                            html = html.replaceAll('%singer%', element.Singer_Name);
                            html = html.replaceAll('%album%', element.Album_Name);
                            html = html.replaceAll('%avgRating%', element.Avg_Rating);
                            
                            document.querySelector('.container').insertAdjacentHTML('beforeend', html);

                            
                        });

                    } else if (Object.getOwnPropertyNames(data[0]).includes('Origin_Year')) {

                        const title = `<div class="genre">
                        <div class="genre-name">Genre</div>
                        <div class="genre-year">Origin Year</div>
                        <div class="genre-country">Origin Country</div>
            
                        </div>`

                        document.querySelector(DOMStrings.bottom).insertAdjacentHTML('beforeend', title);

                        const container = '<div class="container"></div>'

                        document.querySelector(DOMStrings.bottom).insertAdjacentHTML('beforeend', container);

                        data.forEach(element => {

                            let html = `<div class="genreList" id="item-%id%">
                            <div class="item-name clearfix">%name%</div>
                            <div class="item-year clearfix">%year%</div>
                            <div class="item-country clearfix">%country%</div>
                            </div>`

                            html = html.replaceAll('%name%', element.Genre_Name);
                            html = html.replaceAll('%year%', element.Origin_Year);
                            html = html.replaceAll('%country%', element.Origin_Country);
                            
                            document.querySelector('.container').insertAdjacentHTML('beforeend', html);

                            
                        });



                    } else if (Object.getOwnPropertyNames(data[0]).includes('Gender')) {

                        const title = `<div class="singer">
            
                        <div class="singer-name">Name</div>
                        <div class="singer-gender">Gender</div>
                        <div class="singer-year">Debut Year</div>
                        
                        </div>`

                        document.querySelector(DOMStrings.bottom).insertAdjacentHTML('beforeend', title);

                        const container = '<div class="container"></div>'

                        document.querySelector(DOMStrings.bottom).insertAdjacentHTML('beforeend', container);

                        data.forEach(element => {

                            let html = `<div class="singerList" id="item-%id%">
                            <div class="singer-name">%name%</div>
                            <div class="singer-gender">%gender%</div>
                            <div class="singer-year">%year%</div>
                            </div>`

                            html = html.replaceAll('%name%', element.Singer_Name);
                            html = html.replaceAll('%gender%', element.Gender);
                            html = html.replaceAll('%year%', element.Debut_Year);
                            
                            document.querySelector('.container').insertAdjacentHTML('beforeend', html);

                            
                        });

                    } else if (Object.getOwnPropertyNames(data[0]).includes('Language')) {

                        const title = `<div class="album">
                        <div class="album-name">Album</div>
                        <div class="album-singer">Singer</div>
                        <div class="album-language">Language</div>
            
                        </div>`

                        document.querySelector(DOMStrings.bottom).insertAdjacentHTML('beforeend', title);

                        const container = '<div class="container"></div>'

                        document.querySelector(DOMStrings.bottom).insertAdjacentHTML('beforeend', container);

                        data.forEach(element => {

                            let html = `<div class="albumList" id="item-0">
                            <div class="item-name">%name%</div>
                            <div class="item-singer">%singer%</div>
                            <div class="item-language">%language%</div>
                            </div>`

                            html = html.replaceAll('%name%', element.Album_Name);
                            html = html.replaceAll('%singer%', element.Singer_Name);
                            html = html.replaceAll('%language%', element.Language);
                            
                            document.querySelector('.container').insertAdjacentHTML('beforeend', html);

                            
                        });

                    };
                })
        }

    }

})();

var controller = (function (UICtrl) {

    // var setupEventListeners = function () {
    //     var DOM = UICtrl.getDOMStrings();

    //     document.querySelector(DOM.songBtn).addEventListener('click', showDatabase);

    //     document.querySelector(DOM.searchLink).addEventListener('click', removeItem);

    // }

    var showDatabase = function () {
        UICtrl.show();

    }
    
    // var removeItem = function () {

        

    // }



    return{
        init: function() {
            console.log('Application starts');
            // setupEventListeners();
            showDatabase();
        }
    };

    

})(UIController);

controller.init();