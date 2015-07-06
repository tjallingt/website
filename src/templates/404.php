<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<title>Page not found</title>
		<meta name="theme-color" content="#FFF8E7">
			
		<!-- FAVICON -->
		<link rel="shortcut icon" href="/include/img/favicon.ico" type="image/x-icon">
			
		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="/include/css/main.css">
		
		<!-- TRACKING -->
		<script type="text/javascript">
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', 'UA-33276157-2', 'auto', {'allowLinker': true});
			ga('require', 'linker');
			ga('linker:autoLink', ['tjallingt.nl', 'tjallingt.com']);
			ga('send', 'pageview');
		</script>
	</head>
	<body>
		<header>
			<a href="/" class="nav pagenav">
				<img src="/include/img/logo.png" class="logo" alt="">
			</a>
		
			<div id="about" class="vertical-padding margin-top row center">
				<h1>
					<a href="/" class="pagenav no-decoration">Tjalling Tolle</a>
				</h1>
			</div>
		</header>
		
		<hr class="row">
		
		<article class="vertical-padding row center">
			<h2>404</h2>
			<p>
				This page doesn't seem to exist...<br>
				Are you sure this is the page you are looking for?<br>
				Please <a href="/maillink?subject=404%20error%20<?= $_SERVER[ 'REQUEST_URI' ] ?>" target="_blank">contact the site administrator</a> if you are certain there is a problem.
			</p>
		</article>
	</body>
</html>