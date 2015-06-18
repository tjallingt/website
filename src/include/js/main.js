class Website {
	constructor() {
		// class wide variables
		this.loading = false;
		this.hasMouse = false;

		// insert calculated age
		document.querySelector( "#age" ).innerHTML = `${this.calculateAge( "1994-5-18" )} years old`;

		// if a mobile use clicks a link mousemove is triggered, to prevent this touchstart will unbind the mousemove listener
		// (only works if the touchstart is triggered before mousemove which seems to be the case)
		document.addEventListener( "mousemove", ( event ) => this.noTouch( event ) );
		document.addEventListener( "touchstart", ( event ) => {
			document.removeEventListener( "mousemove",  ( event ) => this.noTouch( event ) );
		});

		/* FLOATING ACTION BUTTON */
		// move button off screen
		if( window.scrollY < 50 ) {
			fab.classList.add( "fab-hidden" );
			fab.style.bottom = "-" + getComputedStyle( fab ).height;
		}

		// show/hide button when scrolling
		window.addEventListener( "scroll", ( event ) => {
			if( window.scrollY > 50 ) {
				fab.classList.remove( "fab-hidden" );
				fab.style.bottom =  "";
			}
			else if( !fab.classList.contains( "fab-hidden" ) ) {
				fab.classList.add( "fab-hidden" );
				fab.style.bottom = "-" + getComputedStyle( fab ).height;
			}
		});

		if (history.pushState) {

			// create initial state for history api
			this.getJson( location.href, ( json ) => {
				history.replaceState( json, "", location.href );
			});

			// add eventlisteners for the history api functions
			this.forEach( document.querySelectorAll( ".pagenav" ), ( element ) => {
				element.addEventListener( "click",  ( event ) => this.navPushState( event ) );
			});

			// restore window after popstate
			window.addEventListener( "popstate", ( event ) => {
				this.renderPage( event.state );
				ga( "send", "pageview", location.pathname );
			});

			// stop the logo from spinning when in the correct orientation
			this.forEach( document.querySelectorAll( ".logo" ), ( element ) => {
				element.addEventListener( "animationiteration", ( event ) => {
					if( !this.loading ) {
						event.currentTarget.classList.remove( "spin" );
					}
				});
			});

		}
	}

	// function to calculate the age for a given date of birth
	calculateAge( dateOfBirth ) {
		let dob = new Date( dateOfBirth );
		let today = new Date();
		let age = new Date( today - dob ).getFullYear() - 1970; // 1970 is the beginning of unix time
	}


	// if a user uses mouse hide titles and show on hover
	noTouch( event ) {
		this.hasMouse = true;
		this.forEach( document.querySelectorAll( ".title" ), ( element ) => {
			element.classList.add( "no-touch" );
		});
		document.removeEventListener( "mousemove", this.noTouch );
	}

	// internal navigation
	navPushState( event ) {
		event.preventDefault();
		
		this.forEach( document.querySelectorAll( ".logo" ), ( element ) => {
			element.classList.add( "spin" );
		});
		
		this.loading = true;

		let url = event.currentTarget.href.replace( location.origin, "" );
		
		this.getJson( url, ( json ) => {
			history.pushState( json, "", url );
			this.renderPage( json );
			this.loading = false;
			ga( "send", "pageview", url );
		});
	}

	// render the page from the json data
	// move fade in/out to css (toggle a class in js)
	renderPage( json ) {
		$( "#content" ).fadeOut( 500, () => {
			$( "#content" ).html( json.data ).fadeIn( 500 );
			
			this.forEach( document.querySelector( "#content" ).querySelectorAll( ".pagenav" ), ( element ) => {
				element.addEventListener( "click",  ( event ) => this.navPushState( event ) );
			});

			if( this.hasMouse ) {
				document.querySelector( ".title" ).classList.add( "no-touch" );
			}
		});
	}

	// helper function for looping over nodeLists returned by querySelectorAll
	forEach( array, callback, scope ) {
		for( let i = 0; i < array.length; i++ ) {
			callback.call( scope, array[i] );
		}
	}

	// shorthand for the jQuery ajax function
	// replace with own get request
	getJson( url, callback ) {
		$.ajax({
			dataType: "json",
			url: url,
			cache: false,
			success: callback
		});
	}
}

// run the whole thing
let website = new Website();