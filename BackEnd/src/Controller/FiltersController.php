<?php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\BaseController;
use App\Service\FilterService;

class FiltersController extends BaseController
{
    private $ingredientService;

    private function FilterService()
    {
        if(is_null($this->ingredientService))
        {
            $this->getContext();
            $this->ingredientService = new FilterService($this->context);
        }
        return $this->ingredientService;
    }

    /**
     * @Route("/api/filters")
    */
    public function getAll()
    {
        $ingredients = $this->FilterService()->getAll();
        return $this->setContent($ingredients);
    }
}