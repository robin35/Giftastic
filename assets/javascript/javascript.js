//-------------------------------------------------------------------------------------------------------------------------------
//  GLOBAL VARIABLES
//-------------------------------------------------------------------------------------------------------------------------------

var topics = [
    "Empire",
    "Suits",
    "American Idol",
    "Oprah",
    "Doctor Who",
    "Sponge Bob",
    "Scandal",
    "Game of Thrones"
];

var searchText;
var addTopic;
var gifTopics;

var animate = false;

var g = [];



//-------------------------------------------------------------------------------------------------------------------------------
//  MAKE BUTTONS FUNCTION
//-------------------------------------------------------------------------------------------------------------------------------

makeButtons = function () {
    for (var i = 0; i < topics.length; i++) {
        var gifTopics = topics[i];
        $( ".div-btns" ).prepend( "<button class=\'js-gifBtns\' type = \'button\' name = \'"+gifTopics+"\' >"+gifTopics+"</button>" );
    
//console.log("gifTopics", gifTopics);

    }

};



//-------------------------------------------------------------------------------------------------------------------------------
//  AJAX FUNCTION
//-------------------------------------------------------------------------------------------------------------------------------
 
ajaxFunction = function () {

    
    var category = 'tv ';
    var gifSearch = category + searchText;

//console.log("gifSearch:", gifSearch);

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hPAbZyBGv3TCKT1ok6T1EvTMPQxPST1u&q="+gifSearch+"&limit=10&lang=en"
      
    // This is the Promise
    $.ajax({
        url: queryURL,
        method: "GET"
    }) 

    // This is the Response from GIPHY
    .then(function(response) {
        
        results = response.data;
        console.log("results", results);

        for (var i = 0; i < results.length; i++) {
            
            g.push ({   topic: searchText, 
                        id: results[i].id,
                        rating: results[i].rating.toUpperCase(), 
                        url: results[i].images.fixed_height.url, 
                        urlStill: results[i].images.fixed_height_still.url, 
                        title: results[i].title, 
                        source: results[i].source 
                    });

            $( ".tvContent" ).prepend( "<div class = 'js-div-allImages'><img class = \'js-img-gifImage\' name = \'"+results[i].id+"\' src="+results[i].images.fixed_height_still.url+" width=\'165\' height=\'165\'>Rating: "+results[i].rating.toUpperCase()+"</div>" );
        };

    }); 
    console.log("g array:", g);

};


//-------------------------------------------------------------------------------------------------------------------------------
//  CLEAR GIFS FUNCTION
//-------------------------------------------------------------------------------------------------------------------------------

clearGifs = function () {
    $( ".tvContent" ).html("");
}


//-------------------------------------------------------------------------------------------------------------------------------
//  REMOVE GIF BUTTONS FUNCTION
//-------------------------------------------------------------------------------------------------------------------------------

clearGifButtons = function () {
    $( ".js-gifBtns" ).remove();
}


//-------------------------------------------------------------------------------------------------------------------------------
//  CALL MAKE BUTTON FUNCTION
//-------------------------------------------------------------------------------------------------------------------------------

makeButtons();



//-------------------------------------------------------------------------------------------------------------------------------
//  USER CLICKED ONE OF THE GIF BUTTONS
//-------------------------------------------------------------------------------------------------------------------------------

$(".div-btns").on("click", ".js-gifBtns", function() {

    //console.log("this: gif buttons:", this);

    searchText = $(this).attr("name");
    //console.log("searchText:", searchText);

    clearGifs();
    ajaxFunction();

});



//-------------------------------------------------------------------------------------------------------------------------------
//  USER CLICKED THE SUBMIT BUTTON TO ADD ADDITIONAL BUTTONS
//-------------------------------------------------------------------------------------------------------------------------------

$(".js-submitBtn").click(function() {
   
    addTopic = $("input:text").val();
    
    // Compare with existing buttons to prevent duplicates
    for(var i = 0; i < topics.length; i++) {
        if (addTopic === topics[i]) {
            return false;
        }
    }
    
    clearGifButtons();
    clearGifs();
    topics.push(addTopic);  //may need to search data for special characters???
    makeButtons();

    
});



//-------------------------------------------------------------------------------------------------------------------------------
//  MAKE STATIC OR ANIMATE GIF
//-------------------------------------------------------------------------------------------------------------------------------

//$(".js-div-allImages").click(function() {
$(".tvScreen").on("click", ".js-img-gifImage", function() { 
    
    console.log("this animate:", this);

    var gifId = this.name;
    console.log("img id:", gifId);


    for (var i = 0; i < g.length; i++ ) {
        if (gifId === g[i].id) {
            
            
            if (animate) {
                // still gif
                animate = false;
                this.src = g[i].urlStill;
            }
            else {
                //animated gif
                animate = true;
                this.src = g[i].url;
            }
        }
    }

});