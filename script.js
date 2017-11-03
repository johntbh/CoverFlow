insertMovie = function(movie,other){
    let picture_url = "https://image.tmdb.org/t/p/w185" + movie.picture;
    let movie_class= "movie";
    let stars_html = '';
    for(i=0;i<movie.stars;i++){
        stars_html+= '<i class="fa fa-star" aria-hidden="true"></i>';
    }
    let movie_html =    `<div class="`+other+`">
                            <div class="movie">
                                <img class="poster" src="`+picture_url+`">
                                <div class="title">`+movie.title+`</div>
                                <div class="summary">`+movie.summary+`</div> 
                                <dic class="stars">`+stars_html+`</div>
                            </div>
                        </div>`;                

    $('#root').append(movie_html);
    let circle_class = 'circle';
    if(other=='center')circle_class+=' current';
    $('#bullet').append('<div class="'+circle_class+'"></div>');
}

insertBlank = function(movie_class){
    let movie_html = `<div class="`+movie_class+`"><div class="fake movie"></div></div>`;                

    $('#root').append(movie_html);
}

startCover = function(movies){
    insertBlank('prev');
    insertBlank('prev');
    $.each(movies,function(index,movie){
        
        let id = 'next';
        if(index===0)id='center';
        insertMovie(movie,id);
    });
    insertBlank('next');
    insertBlank('next');
}

startBinding = function(){
    $('.right.arrow').on('click',function(){
        if($('.center').next().children('.movie').hasClass('fake'))return;
        $('.center')
            .addClass('prev')
            .removeClass('center')
        .next()
            .removeClass('next')
            .addClass('center');
        
        $('.current').removeClass('current').next().addClass('current');
        $('#root').children().animate({left:'-=17%'},900,function(){});
    });

    $('.left.arrow').on('click',function(e){
        if($('.center').prev().children('.movie').hasClass('fake'))return;
        $('.center')
            .addClass('next')
            .removeClass('center')
        .prev()
            .removeClass('prev')
            .addClass('center');
        
        $('.current').removeClass('current').prev().addClass('current');
        $('#root').children().animate({left:'+=17%'},900,function(){});
    });
}

$.get({
    url:'https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe',
    dataType: 'json',
    success: function(data,status,xhr){
        let movies = [];
        $.each(data.results,function(index,movie){
            let film = {
                title: movie.title,
                summary: movie.overview,
                stars: Math.round(movie.vote_average),
                picture: movie.poster_path
            };

            for(prop in film){
                if(film[prop] == null) return;
            }

            movies.push(film);
        })

        startCover(movies);
        startBinding();
    }
});



