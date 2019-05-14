<?php
namespace App\Service;
use App\Entity\Ingredient;
use App\Model\Enum\UnitEnum;
use App\Model\Enum\TypeEnum;
use App\Model\Dto\FilterDto;


class FilterService
{

   protected $context;

   public function __construct($doctrine)
   {
       $this->context = $doctrine->getRepository(Ingredient::class);
   }

   public function getAll()
   {
       //cherche tous les ingredients
       $filters = $this->context->findAll();
        
       //set toutes les valeurs qui nécéssite un Enum
       foreach($filters as $filter){
           $filter = $this->MapfilterToDto($filter);
        //    $filter->type = $this->getType($filter);
        //    $filter->unit = $this->getUnit($filter);
       }

       return $filters;
   }
   public function getDto($filter)
   {
       $filter = $this->context->getDto($filter);
       return $this->MapfilterToDto($filter[0]);
   }

//    protected function GetUnit($filter) {
//        $unit = '';
//        switch($filter->unit)
//        {
//            case UnitEnum::Cl :
//                return 'cl.';
//                break;
//            case UnitEnum::Feuille:
//            return 'feuille(s)';
//                break;
//            case UnitEnum::Rondelle:
//            return 'rondelle(s)';
//                break;
//            case UnitEnum::Cuillere:
//            return 'cc.';
//                break;
//            default:
//                return $filter->unit;
//        }
      
//    }
//    protected function GetType($filter) {
//        $unit = '';
//        switch($filter->type)
//        {
//            case TypeEnum::Alcool :
//                return 'alcool';
//                break;
//            case TypeEnum::Jus:
//            return 'jus';
//                break;
//            case TypeEnum::Autre:
//            return 'autre';
//                break;
//            default:
//                return $filter->unit;
//        }
      
//    }
   protected function MapfilterToDto($filter) {
        $filterDto = new FilterDto();
        $filterDto->type = 'ingredient';
        $filterDto->value = $filter->id;
        $filterDto->isActive = false;
        $filterDto->name = $filter->name;

        return $filterDto;
    }
}

