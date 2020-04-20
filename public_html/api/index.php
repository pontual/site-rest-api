<?php
require_once("../../settings.php");
require_once("../../db_cls.php");

require __DIR__ . '/../../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->setBasePath('/api');


// HTTP Basic Auth

$app->add(new Tuupola\Middleware\HttpBasicAuthentication([
  "secure" => true,
  "relaxed" => ["127.0.0.1", "localhost", "pontualimportbrindes.com.br", "www.pontualimportbrindes.com.br"],
  "users" => [
    "cliente" => '$2y$10$uYlzFErEanRTmMmlLSqyFONd6p25Z4on7c4EZ2crx7MzdnoWlitly',
    ]
  ]));


// CORS
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
    

// Lista de produtos

$app->get('/produtos/', function (Request $request, Response $response, $args) {
  $pdowrapper = new PdoWrapper();
  $dbh = $pdowrapper->getConnection();

  $sth = $dbh->prepare("select codigo, descricao, peso, medidas, preco from v2_produto order by codigo");
  $sth->execute();
  
  $response->getBody()->write(json_encode($sth->fetchAll()));
  
  return $response
      ->withHeader('Access-Control-Allow-Origin', '*')
      ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
      ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
      ->withHeader('Content-Type', 'application/json');
});


// Produto individual

$app->get('/produtos/{codigo}/', function (Request $request, Response $response, $args) {
  $pdowrapper = new PdoWrapper();
  $dbh = $pdowrapper->getConnection();

  $sth = $dbh->prepare("select codigo, descricao, peso, medidas, preco from v2_produto where codigo=:codigo");
  $sth->execute(['codigo' => strtoupper($args['codigo'])]);

  $response->getBody()->write(json_encode($sth->fetch()));
  
  return $response
      ->withHeader('Access-Control-Allow-Origin', '*')
      ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
      ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
      ->withHeader('Content-Type', 'application/json');
});


$app->run();
