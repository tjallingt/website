<?php
// Composer autoloader (loads slimframework and mustache)
require 'vendor/autoload.php';
// Config file containing $EMAIL, $DB_HOST, $DB_NAME, $DB_USER and $DB_PASS
require 'config.php';
// Database model class
require 'include/php/dbModel.php';

$app = new \Slim\Slim();
$app->db = new dbModel( $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS );
$app->m = new Mustache_Engine(array(
    'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/templates')
));

// home page
$app->get( '/', function() use( $app ) {
	// put it in an array so mustache is able to render it
	$db = array( 'list' => $app->db->getList() );
	if( empty( $db['list'] ) ) $app->error();
	
	$html = $app->m->render( 'list', $db );
		
	if( $app->request->isAjax() ) {
		$app->response->write( $html );
	}
	else {
		$app->render( 'main.php', array( 'html' => $html ) );
	}
});

// project page
$app->get( '/project/:project(/)', function( $project ) use( $app ) {
	$db = $app->db->getItem( $project );
	if( empty( $db ) ) $app->notFound();
	
	$html = $app->m->render( 'item', $db );
	
	if( $app->request->isAjax() ) {
		$app->response->write( $html );
	}
	else {
		$app->render( 'main.php', array( 'html' => $html ) );
	}
});

// redirect to email (and hide email address from scrapers)
$app->get( '/maillink', function() use( $app, $EMAIL ) {
	$url = 'mailto:' . $EMAIL . '?' . $_SERVER[ 'QUERY_STRING' ];
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