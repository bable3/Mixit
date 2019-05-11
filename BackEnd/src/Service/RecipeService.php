<?php
namespace App\Service;
use App\Entity\Recipe;
use App\Model\Dto\RecipeDto;
use App\Model\Dto\StepDto;
use App\Model\Dto\IngredientDto;
use App\Model\Enum\UnitEnum;
use App\Model\Enum\GlassEnum;
use App\Model\Enum\TasteEnum;
use App\Model\Enum\DifficultyEnum;

class RecipeService
{
    protected $context;

    public function __construct($doctrine) 
    {
        $this->context = $doctrine->getRepository(Recipe::class);
    }

    public function getAll()
    {
        $recipes = $this->context->findAll();
        foreach ($recipes as $recipe) {
            $recipe->taste = $this->GetTaste($recipe->taste);
            $recipe->glass = $this->GetGlass($recipe->glass);
            $recipe->difficulty = $this->GetDifficulty($recipe->difficulty);
        }
        return $recipes;
    }

    public function findById($id)
    {
        $recipe = $this->context->findById($id);
        return $this->MapRecipeToDto($recipe[0]);
    }
    
    protected function MapRecipeToDto($recipe) 
    {
        $recipeDto = new RecipeDto();
        $recipeDto->id = $recipe->id;
        $recipeDto->name = $recipe->name;
        $recipeDto->taste = $this->GetTaste($recipe->taste);
        $recipeDto->glass = $this->GetGlass($recipe->glass);
        $recipeDto->glassImage = $this->GetGlassImage($recipe->glass);
        $recipeDto->image = $recipe->image;
        $recipeDto->canShake = $recipe->canShake;
        $recipeDto->time = $recipe->time;
        $recipeDto->difficulty = $this->GetDifficulty($recipe->difficulty);
        $recipeDto->steps = $this->MapStepsToDto($recipe);
        $recipeDto->vol = $this->GetVol($recipe->steps);
        return $recipeDto;
    }

    protected function MapStepsToDto($recipe){
        $stepsDto = [];
        $steps = $recipe->steps;
        for ($i = 0; $i < count($steps); $i++) {
            $stepsDto[$i] = $this->MapStepToDto($steps[$i]);
        }
        // Il faut mettre un étape par défaut en plus à la fin
        // if($recipe->canShake == true){
        //     $stepsDto[count($steps) -1]->content = 'Versez le contenu du shaker dans un ' . $this->GetGlass($recipe->glass); 
        // }else{
        //     $stepsDto[count($steps) -1]->content = 'Dégustez'; 
        // }
        usort($stepsDto, array($this, "order"));

        $withIce = $recipe->withIce ? 'rempli de glaçons' : '';
        $withShaker = $recipe->canShake ? 'shaker' : $this->GetGlass($recipe->glass);
        $stepsDto[0]->content = $stepsDto[0]->content. 'dans un '.$withShaker.' '.$withIce;
        
        return $stepsDto;
    }

    protected function GetVol($steps) {
        $quantity = 0;
        $alcool = 0;
        for ($i = 0; $i < count($steps); $i++) {
            if (isset($steps[$i]->ingredient)) {
                if ($steps[$i]->ingredient->unit == UnitEnum::Cl) {
                    $alcool += ($steps[$i]->ingredient->vol * $steps[$i]->quantity);
                    $quantity += $steps[$i]->quantity;
                };
            }
        }
        return round($alcool / $quantity, 1);
    }

    protected function MapStepToDto($step) {
        $stepDto = new StepDto();
        $stepDto->id = $step->id;
        $stepDto->quantity = $step->quantity;
        $stepDto->order = $step->order;
        $stepDto->content = $this->GetContentStep($step);
        $stepDto->ingredient = (isset($step->ingredient)) ? $this->MapIngredientToDto($step->ingredient) : null;
        return $stepDto;
    }

    protected function MapIngredientToDto($ingredient) {
        $ingredientDto = new IngredientDto();
        $ingredientDto->id = $ingredient->id;
        $ingredientDto->name = $ingredient->name;
        $ingredientDto->image = $ingredient->image;
        $ingredientDto->unit = $this->GetUnit($ingredient);
        $ingredientDto->type = $ingredient->type;
        $ingredientDto->vol = $ingredient->vol;
        return $ingredientDto;
    }

    protected function GetContentStep($step) {
        if (!isset($step->ingredient)) {
            return $step->content;
        }
        $verb = '';
        $unit = '';
        $plural = true;
        switch($step->ingredient->unit) 
        {
            case UnitEnum::Cl :
                $verb = 'Verser';
                $unit = 'cl.';
                $plural = false;
                break;
            case UnitEnum::Feuille:
                $verb = 'Déposer';
                $unit = 'feuille';
                break;
            case UnitEnum::Rondelle:
                $verb = 'Ajouter';
                $unit = 'rondelle';
                break;
            case UnitEnum::Cuillere:
                $verb = 'Verser';
                $unit = 'cc.';
                $plural = false;
                break;
            default:
                return $step->content;
        }
        $unitReturn = ($plural) ? $unit.$this->GetPlural($step->quantity) : $unit;
        return $verb.' '.$step->quantity.' '.$unitReturn.' '.$this->GetDeterminant($step->ingredient->name).' '.$step->ingredient->name.' '.$step->content;
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
    
    protected function GetDeterminant($text) {
        if (empty($text))
            return '';
        $vowels = array("a", "e", "i", "u", "o", "y");
        if (in_array(strtoupper($text[0]), $vowels))
            return "d'";
        return 'de';
    }
    
    protected function GetPlural($quantity) {
        return ($quantity > 1) ? 's' : '';
    }

    protected function GetGlass($glass) {
        switch($glass) 
        {
            case GlassEnum::Mojito : 
                return 'verre à mojito'; 
            case GlassEnum::OldFashioned : 
                return 'verre old fashioned'; 
            case GlassEnum::LongDrink : 
                return 'verre long drink'; 
            case GlassEnum::Cocktail : 
                return 'verre à cocktail'; 
            case GlassEnum::Ballon : 
                return 'verre ballon';
            default:
                return 'verre classique';
        }
    }
    protected function GetGlassImage($glass) {
        switch($glass) 
        {
            case GlassEnum::Mojito : 
                return 'verre-mojito'; 
            case GlassEnum::OldFashioned : 
                return 'verre-old-fashioned'; 
            case GlassEnum::LongDrink : 
                return 'verre-long-drink'; 
            case GlassEnum::Cocktail : 
                return 'verre-cocktail'; 
            case GlassEnum::Ballon : 
                return 'verre-ballon';
            default:
                return 'verre-classique';
        }
    }

    protected function GetTaste($taste){
        switch($taste)
        {
            case TasteEnum::Amer :
                return 'amer';
            case TasteEnum::Fruite :
                return 'fruité';
            case TasteEnum::Rafraichissant :
                return 'rafraichissant';
            default:
                return $taste;
        }
    }
    protected function GetDifficulty($dif){
        switch($dif)
        {
            case DifficultyEnum::Facile :
                return 'facile';
            case DifficultyEnum::Moyen :
                return 'moyen';
            case DifficultyEnum::Difficile :
                return 'difficile';
            default:
                return $dif;
        }
    }
    
    protected function order($a, $b) {
        if($a->order == $b->order){ return 0 ; }
        return ($a->order < $b->order) ? -1 : 1;
    }
}