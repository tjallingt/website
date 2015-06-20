class Website {
	constructor() {
		// class wide variables
		this.loading = false;
		this.hasMouse = false;

		// insert calculated age
		document.querySelector( "#age" ).innerHTML = `${this.calculateAge( "1994-5-18" )} years old`;

		// bound event to a function to be able to call `this` inside the event but also call removeEventListener later
		this.boundNoTouch = ( event ) =>  this.noTouch( event );

		// on mousemove add no-touch class that hides the titles until hover
		document.addEventListener( "mousemove", this.boundNoTouch );

		// if a mobile use clicks a link mousemove is triggered, to prevent this touchstart will unbind the mousemove listener
		// (only works if the touchstart is triggered before mousemove which seems to be the case)
		document.addEventListener( "touchstart", ( event ) => document.removeEventListener( "mousemove",  this.boundNoTouch ) );

		// show/hide floating action button when scrolling
		window.addEventListener( "scroll", this.toggleFAB );

		// check if pushstate is available
		if (history.pushState) {

			// create initial state for history api
			this.getRequest( location.href, ( data ) => history.replaceState( data, "", location.href ) );

			// add eventlisteners for the history api functions
			this.forEach( document.querySelectorAll( ".pagenav" ), ( element ) => {
				element.addEventListener( "click",  ( event ) => this.navPushState( event ) );
			});

			// restore window after popstate
			window.addEventListener( "popstate", ( event ) => this.renderPage( event.state ) );

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

	// function to the number of years since a given date
	calculateAge( dateOfBirth ) {
		let dob = new Date( dateOfBirth );
		let today = new Date();
		// calculates the amount of milliseconds between the two dates
		// 1970 is the beginning of unix time, subtract that to get the amount of time between the two dates
		let age = new Date( today - dob ).getFullYear() - 1970;
	}

	// toggle the floating action button
	toggleFAB() {
		let fab = document.querySelector( "#fab" );
		if( window.scrollY > 50 ) {
			fab.classList.remove( "fab-hidden" );
			fab.style.bottom =  "";
		}
		else if( !fab.classList.contains( "fab-hidden" ) ) {
			fab.classList.add( "fab-hidden" );
			let height = getComputedStyle( fab ).height;
			fab.style.bottom = `-${height}`;
		}
	}


	// if a user uses mouse hide titles and show on hover
	noTouch( event ) {
		this.hasMouse = true;
		this.forEach( document.querySelectorAll( ".title" ), ( element ) => element.classList.add( "no-touch" ) );
		document.removeEventListener( "mousemove", this.boundNoTouch );
	}

	// function for pushstate navigation
	navPushState( event ) {
		event.preventDefault();
		
		this.forEach( document.querySelectorAll( ".logo" ), ( element ) => element.classList.add( "spin" ) );
		
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
		$( "#content" ).fadeOut( 500, () => {
			// insert html and fade in
			$( "#content" ).html( html ).fadeIn( 500 );
			
			// reaply all the pushstate events
			this.forEach( document.querySelector( "#content" ).querySelectorAll( ".pagenav" ), ( element ) => {
				element.addEventListener( "click",  ( event ) => this.navPushState( event ) );
			});

			// if has mouse reaply title no-touch style
			if( this.hasMouse ) {
				this.forEach( document.querySelectorAll( ".title" ), ( element ) => element.classList.add( "no-touch" ) );
			}

			// update google analytics stats
			ga( "send", "pageview", location.pathname );
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
	getRequest( url, callback ) {
		$.ajax({
			url: url,
			cache: false,
			success: callback
		});
	}
}

// run the whole thing
let website = new Website();