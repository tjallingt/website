class Website {
	constructor() {
		// class wide variables
		this.loading = false;

		let age = this.yearsSince( 1994, 5, 18 );
		if( !isNaN( age ) ) {
			// insert age into intro
			document.getElementById( "age" ).innerHTML = `${ age } years old`;
		}

		// show/hide floating action button when scrolling
		window.addEventListener( "scroll", this.toggleFAB );

		// check if pushstate is available
		if( Modernizr.history ) {
			// create initial state for history api
			this.getRequest( location.href )
				.then( ( data ) => history.replaceState( data, "", location.href ) )
				.catch( ( error ) => console.error(  error ) );

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
	yearsSince( ...date ) {
		let then = new Date( ...date );
		let now = new Date();
		// subtracting two dates gives the amount of milliseconds between them
		let msSince = new Date( now - then );
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
			fab.style.bottom = `${ -1 * fab.offsetHeight }px`;
		}
	}


	// if a user uses mouse hide titles and show on hover
	addNoTouch() {
	}

	// function for pushstate navigation
	navPushState( event ) {
		event.preventDefault();
		
		this.forEach( document.getElementsByClassName( "logo" ), ( element ) => element.classList.add( "spin" ) );
		
		this.loading = true;

		let url = event.currentTarget.href.replace( location.origin, "" );
		
		this.getRequest( url )
			.then( ( data ) => {
				history.pushState( data, "", url );
				this.renderPage( data );
				this.loading = false;
			})
			.catch( ( error ) => console.error( error ) );
	}

	// put html on page
	// move fade in/out to css (toggle a class in js)
	// remove jquery fade out/in dependency
	renderPage( html ) {
		if( html ) { // check "" or null for safari
			document.getElementById( "content" ).classList.add( "transparent" );
			// wait 500ms for transition to end
			setTimeout( () => {
				// set new content
				document.getElementById( "content" ).innerHTML = html;
				
				// reaply all the pushstate events
				this.forEach( document.getElementById( "content" ).getElementsByClassName( "pagenav" ), ( element ) => {
					element.addEventListener( "click",  ( event ) => this.navPushState( event ) );
				});

				document.getElementById( "content" ).classList.remove( "transparent" );
			}, 500 );

			// update google analytics stats
			ga( "send", "pageview", location.pathname );
		}
	}

	// helper function for looping over nodeLists
	forEach( array, callback, scope ) {
		for( let i = 0; i < array.length; i++ ) {
			callback.call( scope, array[i] );
		}
	}

	// get request with promises, requires babel polyfill
	getRequest( url ) {
		return new Promise( ( resolve, reject ) => {
			let client = new XMLHttpRequest();
			// prevent caching of the xmlhttprequest
			let antiCache = url.includes( "?" ) ? `&_=${ Date.now() }` : `?_=${ Date.now() }`;

			client.open( "GET", url + antiCache );
			// header to diferentiate this request from a 'normal' request
			client.setRequestHeader( "X-Requested-With", "XMLHttpRequest" );
			client.send();

			client.onload = function () {
				if( this.status == 200 ) {
					resolve( this.response );
				} 
				else {
					reject( this.statusText );
				}
			};

			client.onerror = function () {
				reject( this.statusText );
			};
		});
	}
}

// run the whole thing
let website = new Website();