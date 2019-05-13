<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\BaseController;
use App\Service\RecipeService;
use Symfony\Component\HttpFoundation\Request;
use App\Model\Dto\SearchDto;


class SearchController extends BaseController
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
     * @Route("/api/search")
     * @param Request $request
     * @return Recipe[]
     */
    public function searchRecipes(Request $request)
    {
        $searchDto = new SearchDto();
        $searchDto->taste = $request->query->get('taste');
        $searchDto->difficulty = $request->query->get('difficulty');
        
        // if (null !== $request->query->get('ingredients')){
            $ingredients = explode("%", $request->query->get('ingredients') );
        // }else{
        //     $ingredients = 'null';
        // }
        $searchDto->ingredients =  $ingredients;

        $recipes = $this->RecipeService()->searchRecipes($searchDto);
        return $this->setContent($recipes);
    }
}