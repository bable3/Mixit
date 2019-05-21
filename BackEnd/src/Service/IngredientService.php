<?php
namespace App\Service;
use App\Entity\Ingredient;
use App\Model\Enum\UnitEnum;
use App\Model\Enum\TypeEnum;


class IngredientService
{

   protected $context;

   public function __construct($doctrine)
   {
       $this->context = $doctrine->getRepository(Ingredient::class);
   }

   public function getAll()
   {
       //cherche tous les ingredients
       $ingredients = $this->context->findAll();

       //Classe les ingrédients par type
       usort($ingredients, array($this, "orderByType"));
  
       //set toutes les valeurs qui nécéssite un Enum
       foreach($ingredients as $ingredient){
           $ingredient->type = $this->getType($ingredient);
           $ingredient->unit = $this->getUnit($ingredient);
           $ingredient->isActive = false;
       }

       return $ingredients;
   }

   protected function orderByType($a, $b) {
       if($a->type == $b->type){ return 0 ; }
       return ($a->type < $b->type) ? -1 : 1;
   }

   protected function GetUnit($ingredient) {
       $unit = '';
       switch($ingredient->unit)
       {
           case UnitEnum::Cl :
               return 'cl.';
               break;
           case UnitEnum::Feuille:
           return 'feuille(s)';
               break;
           case UnitEnum::Rondelle:
           return 'rondelle(s)';
               break;
           case UnitEnum::Cuillere:
           return 'cc.';
               break;
           default:
               return $ingredient->unit;
       }
      
   }
   protected function GetType($ingredient) {
       $unit = '';
       switch($ingredient->type)
       {
           case TypeEnum::Alcool :
               return 'alcool';
               break;
           case TypeEnum::Jus:
           return 'jus';
               break;
           case TypeEnum::Autre:
           return 'autre';
               break;
           default:
               return $ingredient->unit;
       }
      
   }
  
}

