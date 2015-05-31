/* GLOBAL VARIABLES */
var loading = false;
var hasMouse = false;
var fab = document.querySelector( "#fab" );

(function init() {
	/* HTML AND CSS CHANGES */
	// calculate age
	var dob = new Date( "1994-5-18" );
	var today = new Date();
	var age = Math.floor( ( today - dob ) / ( 365.25 * 24 * 60 * 60 * 1000 ) ); // days * hours * minutes * seconds * milliseconds
	document.querySelector( "#age" ).innerHTML = age + " years old";

	// add contact info
	var about = document.createElement("p");
	about.innerHTML = "Contact: <a href='/maillink' target='_blank'>e-mail</a>, <a href='https://keybase.io/tjallingt' target='_blank'>keybase</a>.";
	document.querySelector( "#about" ).appendChild( about );

	// if a user uses mouse show labels on hover
	$( document ).one( "mousemove", function() {
		hasMouse = true;
		forEach( document.querySelectorAll( ".title" ), function( index, item ) {
			item.classList.add( "no-touch" );
		});
	});

	// if a mobile use clicks a link mousemove is triggered, to prevent this touchstart will unbind the mousemove listener
	// (only works if the touchstart is triggered before mousemove which seems to be the case)
	$( document ).one( "touchstart", function() {
		$( this ).off( "mousemove" );
	});

	/* FLOATING ACTION BUTTON */
	// move button off screen
	if( $( window ).scrollTop() < 50 ) {
		fab.classList.add( "fab-hidden" );
		fab.style.bottom = "-" + getComputedStyle( fab ).height;
	}

	// show/hide button when scrolling
	$( window ).on( 'scroll', function() {
		if( $( this ).scrollTop() > 50 ) {
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
	forEach( document.querySelectorAll( ".pagenav" ), function( index, item ) {
		item.addEventListener( "click", navPushState );
	});
})();

// foreach helper to loop over the nodeLists (nodeList.prototype.forEach doesn't exist)
function forEach(array, callback, scope) {
	if( array === null ) {
		return;
	}
	for ( var i = 0; i < array.length; i++ ) {
		callback.call( scope, i, array[i] );
	}
}

// internal navigation
function navPushState( event ) {
	if( history.pushState ) {
		event.preventDefault();
		
		forEach( document.querySelectorAll( ".logo" ), function( index, item ) {
			item.classList.add( "spin" );
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
				ga('send', 'pageview', url);
			}
		});
	}
}

// restore window after popstate
window.onpopstate = function( event ) {
	renderPage( event.state );
	ga('send', 'pageview', location.pathname);
};

// render the page from the json data
function renderPage( json ) {
	$( "#content" ).fadeOut( 500, function() {
		$( this ).html( json.data ).fadeIn( 500 );
		forEach( document.querySelectorAll( "#content .pagenav" ), function( index, item ) {
			item.addEventListener( "click", navPushState );
		});
		if( hasMouse ) {
			forEach( document.querySelectorAll( ".title" ), function( index, item ) {
				item.classList.add( "no-touch" );
			});
		}
	});
}

/*
* doesnt work atm, test later... (better performance on mobile/in general?)
* main.css -> #content {transition: opacity 500ms ease;}
*/
/*
$( "#content" ).addClass( "fade" ).one( "transitionend", function() {
	$( this ).html( json.data ).removeClass( "fade" );
	if(hasMouse) {
		var titleList = document.querySelectorAll( ".title" );
		for(var i = 0; i < titleList.length; i++) {
			titleList[i].classList.add( "no-touch" );
		}
	}
});
*/

// stop the logo from spinning when in the correct orientation
$( ".logo" ).on( "animationiteration webkitAnimationIteration oanimationiteration MSAnimationIteration", function (e) {
	if( !loading ) {
		$( this ).removeClass( "spin" );
	}
});