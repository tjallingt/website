<?php
// database model based off example on phptherightway.com
class dbModel {
	protected $pdo;

	public function __construct( $host, $database, $username, $password ) {
		try {
			// Create a pdo database connection
			$this->pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
			// Set errormode to exception, default: PDO::ERRMODE_SILENT
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch(PDOException $e) {
			exit( 'Database error: ' . $e->getMessage() );
		}
	}

	public function getList() {
		$stmt = $this->pdo->prepare( 'SELECT title, img, url FROM portfolio WHERE url != ""' );
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	
	public function getItem( $url ) {
		$stmt  = $this->pdo->prepare( 'SELECT * FROM portfolio WHERE url = :url' );
		$stmt->bindParam(':url', $url, PDO::PARAM_STR);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}
}
