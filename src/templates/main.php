<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<title>Tjalling Tolle</title>
		<meta name="theme-color" content="#FFF8E7">
		
		<!-- Google -->
		<meta name="application-name" content="Website of Tjalling Tolle">
		<meta name="author" content="Tjalling Tolle">
		<meta name="description" content="Website of Tjalling Tolle, a Creative Technologist, Developer and Designer.">
		<meta name="keywords" content="university, twente, tjalling, tolle, tjallingt, creative, technology">
		<!-- Open Graph -->
		<meta property="og:title" content="Website of Tjalling Tolle">
		<meta property="og:type" content="website">
		<meta property="og:url" content="http://<?= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"] ?>">
		<meta property="og:image" content="http://<?= $_SERVER["SERVER_NAME"] ?>/include/img/logo.png">
		<meta property="og:description" content="Website of Tjalling Tolle, a Creative Technologist, Developer and Designer.">
		<meta property="fb:admins" content="100003711214843">
		<!-- Twitter -->
		<meta name="twitter:card" content="summary">
		<meta name="twitter:site" content="@tjalling_t">
		<!-- twitter:title fallback to og:title -->
		<!-- twitter:url fallback to og:url -->
		<!-- twitter:description fallback to og:description -->
			
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
		
			<div id="about" class="vertical-padding margin-top row center italic">
				<h1>
					<a href="/" class="pagenav no-decoration">Tjalling Tolle</a>
				</h1>
				<p><span id="age">Born May 18th, 1994</span>. <a href="http://www.utwente.nl/onderwijs/bachelor/opleidingen/creative-technology/" target="_blank">Creative Technologist</a>, designer and <a href='https://github.com/tjallingt' target='_blank'>developer</a>.</p>
				<p>Enschede, the Netherlands.</p>
				<p>Contact: <a href='/maillink' target='_blank'>e-mail</a>, <a href='https://keybase.io/tjallingt' target='_blank'>Keybase</a>.</p>
			</div>
		</header>
		
		<hr class="row">
		
		<article id="content" class="transition-opacity vertical-padding row center 100vh">
			<?= $html ?>
		</article>
		
		<hr class="row">
		
		<footer class="vertical-padding row center">
			<h2 class="italic">
				Thats all <small>(for now...)</small>
			</h2>
			<p>Trivia: The background color of this site is called <a href="http://en.wikipedia.org/wiki/Cosmic_latte" target="_blank">Cosmic latte</a>, and it is the average color of the universe.</p>
		</footer>
		
		<a href="/" id="fab" class="fab pagenav">
			<img src="/include/img/logo.png" class="logo" alt="">
		</a>
		
		<!-- JAVASCRIPT/JQUERY -->
		<script type="text/javascript" src="/include/js/browser-polyfill.min.js"></script>
		<script type="text/javascript" src="/include/js/main.js"></script>
	</body>
</html>