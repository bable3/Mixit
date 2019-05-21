<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class BaseController extends AbstractController 
{
    protected  $context;

    protected function getContext()
    {
        if(!isset($this->context)){
            $this->context = $this->getDoctrine()->getManager();
        }
    }

    protected function setContent($content)
    {
        $response = new Response();
        $response->setContent(json_encode($content));
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        
        return $response;
    }
}