<?php
namespace App\Service;
use App\Entity\Ingredient;

class IngredientService
{
    protected $context;

    public function __construct($doctrine) 
    {
        $this->context = $doctrine->getRepository(Ingredient::class);
    }

    public function getAll()
    {
        $ingredients = $this->context->findAll();
        return json_encode($ingredients);
    }
}