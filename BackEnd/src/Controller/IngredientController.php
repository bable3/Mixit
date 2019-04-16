<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\BaseController;
use App\Service\IngredientService;

class IngredientController extends BaseController
{
    private $ingredientService;

    private function IngredientService()
    {
        if(is_null($this->ingredientService))
        {
            $this->getContext();
            $this->ingredientService = new IngredientService($this->context);
        }
        return $this->ingredientService;
    }

    /**
     * @Route("/api/ingredients")
    */
    public function getAll()
    {
        $ingredients = $this->IngredientService()->getAll();
        return new Response($ingredients);
    }
}