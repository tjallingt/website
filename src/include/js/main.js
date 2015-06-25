class Website {
	constructor() {
		// class wide variables
		this.loading = false;
		this.hasMouse = false;

		// insert age into intro
		document.getElementById( "age" ).innerHTML = `${ this.yearsSince( "1994-5-18" ) } years old`;

		// bound event to a function to be able to call `this` inside the event but also call removeEventListener later
		this.boundNoTouch = ( event ) =>  this.noTouch( event );

		// on mousemove add no-touch class that hides the titles until hover
		document.addEventListener( "mousemove", this.boundNoTouch );

		// if a mobile use clicks a link mousemove is triggered, to prevent this touchstart will unbind the mousemove listener
		// (works because touchstart is triggered before mousemove)
		let removeNoTouch = ( event ) => {
			document.removeEventListener( "mousemove",  this.boundNoTouch );
			// remove self; arguments.callee would be nice (wouldn't need to create a bound function) but doesnt work in es5 strict mode
			document.removeEventListener( "touchstart", this.removeNoTouch );
		};
		document.addEventListener( "touchstart", removeNoTouch );

		// show/hide floating action button when scrolling
		window.addEventListener( "scroll", this.toggleFAB );

		// check if pushstate is available
		if (history.pushState) {

			// create initial state for history api
			this.getRequest( location.href, ( data ) => history.replaceState( data, "", location.href ) );

			// add eventlisteners for the history api functions
			this.forEach( document.getElementsByClassName( "pagenav" ), ( element ) => {
				element.addEventListener( "click",  ( event ) => this.navPushState( event ) );
			});

			// restore window after popstate
			window.addEventListener( "popstate", ( event ) => this.renderPage( event.state ) );

			// stop the logo from spinning when in the correct orientation
			this.forEach( document.getElementsByClassName( "logo" ), ( element ) => {
				element.addEventListener( "animationiteration", ( event ) => {
					if( !this.loading ) {
						event.currentTarget.classList.remove( "spin" );
					}
				});
			});

		}
	}

	// function to the number of years since a given date
	yearsSince( date ) {
		let then = new Date( date );
		let today = new Date();
		// subtracting two dates gives the amount of milliseconds between them
		let msSince = new Date( today - then );
		// 1970 is the beginning of unix time, subtract that to get the amount of years since the given date
		return msSince.getFullYear() - 1970;
	}

	// toggle the floating action button
	toggleFAB() {
		let fab = document.getElementById( "fab" );
		
		if( window.pageYOffset > 75 ) {
			fab.classList.remove( "fab-hidden" );
			fab.style.bottom =  "";
		}
		else if( !fab.classList.contains( "fab-hidden" ) ) {
			fab.classList.add( "fab-hidden" );
			fab.style.bottom = ( -1 * fab.offsetHeight ) + "px";
		}
	}


	// if a user uses mouse hide titles and show on hover
	noTouch( event ) {
		this.hasMouse = true;
		this.forEach( document.getElementsByClassName( "title" ), ( element ) => element.classList.add( "no-touch" ) );
		document.removeEventListener( "mousemove", this.boundNoTouch );
	}

	// function for pushstate navigation
	navPushState( event ) {
		event.preventDefault();
		
		this.forEach( document.getElementsByClassName( "logo" ), ( element ) => element.classList.add( "spin" ) );
		
		this.loading = true;

		let url = event.currentTarget.href.replace( location.origin, "" );
		
		this.getRequest( url, ( data ) => {
			history.pushState( data, "", url );
			this.renderPage( data );
			this.loading = false;
		});
	}

	// put html on page
	// move fade in/out to css (toggle a class in js)
	// remove jquery fade out/in dependency
	renderPage( html ) {
		document.getElementById( "content" ).classList.add( "transparent" );
		// wait 500ms for transition to end
		setTimeout( () => {
			// set new content
			document.getElementById( "content" ).innerHTML = html;
			
			// reaply all the pushstate events
			this.forEach( document.getElementById( "content" ).getElementsByClassName( "pagenav" ), ( element ) => {
				element.addEventListener( "click",  ( event ) => this.navPushState( event ) );
			});

			// if has mouse reaply title no-touch style
			if( this.hasMouse ) {
				this.forEach( document.getElementsByClassName( "title" ), ( element ) => element.classList.add( "no-touch" ) );
			}

			document.getElementById( "content" ).classList.remove( "transparent" );
		}, 500 );

		// update google analytics stats
		ga( "send", "pageview", location.pathname );
	}

	// helper function for looping over nodeLists
	forEach( array, callback, scope ) {
		for( let i = 0; i < array.length; i++ ) {
			callback.call( scope, array[i] );
		}
	}

	// shorthand for the jQuery ajax function
	// replace with own get request
	getRequest( url, callback ) {
		$.ajax({
			url: url,
			cache: false,
			success: callback
		});
	}
	
	// requires babel polyfill
	// use: getRequest( 'url' ).then( callback ).catch( callback );
	/*
	getRequest( url ) {
		let promise = new Promise( ( resolve, reject ) => {

			// Instantiates the XMLHttpRequest
			let client = new XMLHttpRequest();

			client.open( 'GET', url );
			client.send();

			client.onload = function () {
				if ( this.status == 200 ) {
					resolve( this.response );
				} else {
					reject( this.statusText );
				}
			};

			client.onerror = function () {
				reject( this.statusText );
			};
		});

		// Return the promise
		return promise;
	}
	*/
}

// run the whole thing
let website = new Website();