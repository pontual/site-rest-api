<?php
require_once("../../settings.php");
require_once("../../db_cls.php");

require __DIR__ . '/../../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->setBasePath('/api');


$app->get('/', function (Request $request, Response $response, $args) {
  $data = ['version' => '0.0.1'];
  $payload = json_encode($data);

  $response->getBody()->write($payload);
  return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/produtos/', function (Request $request, Response $response, $args) {
  $pdowrapper = new PdoWrapper();
  $dbh = $pdowrapper->getConnection();

  $sth = $dbh->prepare("select codigo, descricao, peso, medidas, preco from v2_produto");
  $sth->execute();
  
  $response->getBody()->write(json_encode($sth->fetchAll()));
  
  return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
