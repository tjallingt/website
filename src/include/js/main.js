/* GLOBAL VARIABLES */
var loading = false;
var hasMouse = false;
var fab = document.querySelector( "#fab" );
// function for looping over querySelectorAll stuff
var forEach = function( array, callback, scope ) {
	for ( var i = 0; i < array.length; i++ ) {
		callback.call( scope, array[i] );
	}
};

/* HTML AND CSS CHANGES */
// calculate age
var dob = new Date( "1994-5-18" );
var today = new Date();
var age = Math.floor( ( today - dob ) / ( 365.25 * 24 * 60 * 60 * 1000 ) ); // days * hours * minutes * seconds * milliseconds
document.querySelector( "#age" ).innerHTML = age + " years old";

// if a user uses mouse hide titles and show on hover
function noTouch( event ) {
	hasMouse = true;
	forEach( document.querySelectorAll( ".title" ), function( element ) {
		element.classList.add( "no-touch" );
	});
	document.removeEventListener( "mousemove", noTouch );
}

// if a mobile use clicks a link mousemove is triggered, to prevent this touchstart will unbind the mousemove listener
// (only works if the touchstart is triggered before mousemove which seems to be the case)
document.addEventListener( "mousemove", noTouch );
document.addEventListener( "touchstart", function( event ) {
	document.removeEventListener( "mousemove", noTouch );
});

/* FLOATING ACTION BUTTON */
// move button off screen
if( window.scrollY < 50 ) {
	fab.classList.add( "fab-hidden" );
	fab.style.bottom = "-" + getComputedStyle( fab ).height;
}

// show/hide button when scrolling
window.addEventListener( "scroll", function( event ) {
	if( window.scrollY > 50 ) {
		fab.classList.remove( "fab-hidden" );
		fab.style.bottom =  "";
	}
	else if( !fab.classList.contains( "fab-hidden" ) ) {
		fab.classList.add( "fab-hidden" );
		fab.style.bottom = "-" + getComputedStyle( fab ).height;
	}
});

/* HISTORY API */
// create initial state
$.ajax({
	dataType: "json",
	url: location.href,
	cache: false,
	success: function( json ) {
		history.replaceState( json, "", location.href );
	}
});

// click navigate home
forEach( document.querySelectorAll( ".pagenav" ), function( element ) {
	element.addEventListener( "click", navPushState );
});

// internal navigation
function navPushState( event ) {
	if (history.pushState) {
		event.preventDefault();
		
		forEach( document.querySelectorAll( ".logo" ), function( element ) {
			element.classList.add( "spin" );
		});
		
		loading = true;
		var url = this.href.replace( location.origin, "" );
		
		$.ajax({
			dataType: "json",
			url: url,
			cache: false,
			success: function( json ) {
				history.pushState( json, "", url );
				renderPage( json );
				loading = false;
				ga( "send", "pageview", url );
			}
		});
	}
}

// restore window after popstate
window.addEventListener( "popstate", function( event ){
	renderPage( event.state );
	ga( "send", "pageview", location.pathname );
});

// render the page from the json data
function renderPage( json ) {
	$( "#content" ).fadeOut( 500, function() {
		$( this ).html( json.data ).fadeIn( 500 );
		
		forEach( document.querySelector( "#content" ).querySelectorAll( ".pagenav" ), function( element ) {
			element.addEventListener( "click", navPushState );
		});
		if( hasMouse ) {
			document.querySelector( ".title" ).classList.add( "no-touch" );
		}
	});
}

/*
* doesnt work atm, test later... (better performance on mobile/in general?)
* main.css -> #content {transition: opacity 500ms ease;}
*/
/*
$( "#content" ).addClass( "fade" ).one( "transitionend", function() {
	var content = Mustache.render( templates[json.type], json.data );
	$( this ).html( content ).removeClass( "fade" );
	if(hasMouse) {
		$( ".title" ).addClass( "no-touch" );
	}
});
*/

// stop the logo from spinning when in the correct orientation
$( ".logo" ).on( "animationiteration webkitAnimationIteration oanimationiteration MSAnimationIteration", function (e) {
	if( !loading ) {
		$( this ).removeClass( "spin" );
	}
});