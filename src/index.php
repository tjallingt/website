<?
// Composer autoloader (loads slimframework and mustache)
require 'vendor/autoload.php';
// Config file containing email, host, database, username and password
require 'include/php/config.php';
// Database model class
require 'include/php/dbModel.php';

$app = new \Slim\Slim();
$app->db = new dbModel( $host, $database, $username, $password );

// home page
$app->get( '/', function() use( $app ) {
	
	$array = array( 'type' => 'list', 'data' => array( 'list' => $app->db->getList() ) );
	
	if( empty( $array['data'] ) ) $app->error();
		
	if( $app->request->isAjax() ) {
		$app->response->write( json_encode($array) );
	}
	else {
		$app->render( 'template.php', $array );
	}

});

// project page
$app->get( '/project/:project(/)', function( $project ) use( $app ) {
	
	$array = array( 'type' => 'item', 'data' => $app->db->getItem( $project ) );
	
	if( empty( $array['data'] ) ) $app->notFound();
	
	if( $app->request->isAjax() ) {
		$app->response->write( json_encode($array) );
	}
	else {
		$app->render( 'template.php', $array );
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