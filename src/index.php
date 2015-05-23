<?
// Composer autoloader (loads slimframework and mustache)
require 'vendor/autoload.php';
// Config file containing email, host, database, username and password
require 'include/php/config.php';
// Database model class
require 'include/php/dbModel.php';

$app = new \Slim\Slim();
$app->db = new dbModel( $host, $database, $username, $password );
$app->m = new Mustache_Engine(array(
    'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/templates')
));

// home page
$app->get( '/', function() use( $app ) {
	
	// put it in an array so mustache is able to render it
	$db = array( 'list' => $app->db->getList() );
	if( empty( $db['list'] ) ) $app->error();
	$html = $app->m->render( 'list', $db );
	$data = array( 'data' => $html );
		
	if( $app->request->isAjax() ) {
		$app->response->write( json_encode( $data, JSON_HEX_QUOT | JSON_HEX_TAG ) );
	}
	else {
		$app->render( 'main.php', $data );
	}

});

// project page
$app->get( '/project/:project(/)', function( $project ) use( $app ) {
	
	$db = $app->db->getItem( $project );
	if( empty( $db ) ) $app->notFound();
	$html = $app->m->render( 'item', $db );
	$data = array( 'data' => $html );
	
	if( $app->request->isAjax() ) {
		$app->response->write( json_encode( $data, JSON_HEX_QUOT | JSON_HEX_TAG ) );
	}
	else {
		$app->render( 'main.php', $data );
	}

});

// redirect to email (and hide email address from scrapers)
$app->get( '/maillink', function() use( $app, $email ) {

	$url = 'mailto:' . $email . '?' . $_SERVER[ 'QUERY_STRING' ];
	$app->redirect( $url );

});

// redirect all other routes to not found
$app->get( '/:path+', function( $path ) use( $app ) {

	$app->notFound();

});

// page not found
$app->notFound( function() use ( $app ) {

	$app->render( '404.php' );

});

$app->error( function() use( $app ) {

	$app->render( '500.php' );

});

$app->run();