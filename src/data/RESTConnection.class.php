<?php
/**
 * LLR Technologies & Associated Services
 * Information Systems Development
 *
 * WebNOC Dashboards
 *
 * User: lromero
 * Date: 4/05/2019
 * Time: 6:40 PM
 */


namespace data;


use exceptions\RESTException;

class RESTConnection
{
    const HTTP_GET = 0;
    const HTTP_POST = 1;
    const HTTP_PUT = 2;
    const HTTP_DELETE = 3;

    /**
     * @param int $requestType
     * @param string $uri
     * @param array $body
     * @return array
     * @throws RESTException
     */
    public static function getResponse(int $requestType, string $uri, array $body = array()): array
    {
        $ch = curl_init(\Config::OPTIONS['icUrl'] . $uri);

        switch($requestType)
        {
            case self::HTTP_POST:
                $type = "POST";
                break;
            case self::HTTP_PUT:
                $type = "PUT";
                break;
            case self::HTTP_DELETE:
                $type = "DELETE";
                break;
            default:
                $type = "GET";
        }

        $headers = array(
            'SECRET: ' . \Config::OPTIONS['icSecret']
        );

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $type);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));

        $response = curl_exec($ch);
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode !== 500)
        {
            if($json = json_decode($response, true))
            {
                return $json;
            }

            return array();
        }
        else
        {
            throw new RESTException(RESTException::MESSAGES[RESTException::NO_RESPONSE], RESTException::NO_RESPONSE);
        }
    }
}