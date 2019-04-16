<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\BaseController;
use App\Service\RecipeService;

class RecipeController extends BaseController
{
    private $recipeservice;

    private function RecipeService()
    {
        if(is_null($this->recipeservice))
        {
            $this->getContext();
            $this->recipeservice = new RecipeService($this->context);
        }
        return $this->recipeservice;
    }

    /**
     * @Route("/api/recipes")
    */
    public function getAll()
    {
        $recipes = $this->RecipeService()->getAll();
        return $this->setContent($recipes);
    }

    /**
     * @Route("/api/recipe/{id}")
    */
    public function findById($id)
    {
        $recipe = $this->RecipeService()->findById($id);
        return $this->setContent($recipe);
    }
}