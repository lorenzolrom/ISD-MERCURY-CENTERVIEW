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


namespace exceptions;


class RESTException extends MercuryException
{
    const NO_RESPONSE = 701;
    const MESSAGES = array(
        self::NO_RESPONSE => "The API did not send back a response"
    );
}