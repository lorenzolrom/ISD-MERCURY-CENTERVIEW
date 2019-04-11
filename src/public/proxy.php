<?php
/**
 * LLR Technologies & Associated Services
 * Information Systems Development
 *
 * WebNOC Dashboards
 *
 * User: lromero
 * Date: 4/06/2019
 * Time: 12:46 PM
 */

spl_autoload_register(
    function($className)
    {
        /** @noinspection PhpIncludeInspection */
        require_once('../' . str_replace("\\", "/", $className) . ".class.php");
    }
);

use \data\RESTConnection;

if(!isset($_GET['requestType']) OR !isset($_GET['path']) OR !isset($_GET['body']))
    die("Invalid Request");

$type = $_GET['requestType'];
$path = $_GET['path'];
$body = $_GET['body'];

parse_str($body, $bodyArray);

try
{
    $result = RESTConnection::getResponse((int)$type, $path, $bodyArray);
}
catch (\exceptions\RESTException $e)
{
    $result = "Invalid Request";
}

header('Content-type: application/vnd.api+json');
echo json_encode($result);