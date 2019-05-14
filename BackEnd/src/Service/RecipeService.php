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
use Doctrine\ORM\EntityRepository;

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
    
    public function searchRecipes($searchDto)
    {
        $query = $this->queryBuilder($searchDto);      
        $recipesResult = $this->context->findAll();
        $recipes = [];

        foreach($recipesResult as $key => $recipe){
            $ingredients = [];
            $isMatch = true;

            foreach($recipe->steps as $keyStep => $step){
                if(isset($step->ingredient->id)){
                    $ingredients[$keyStep] = strval($step->ingredient->id);
                }
            }
            foreach($query as $property => $value){
                if($recipe->$property != $value){
                    $isMatch = false;
                }
            }

            if($isMatch){
                if(isset($searchDto->ingredients) && is_array($searchDto->ingredients) && $searchDto->ingredients != 'null'){
                    $result = array_intersect($ingredients, $searchDto->ingredients);
                    $haveCommonValue = count($result) == count($searchDto->ingredients);
                    if($haveCommonValue){
                        $recipes[$key] = $recipe;
                    }
                }else{
                    $recipes[$key] = $recipe;
                }
            }
        }
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
        
        usort($stepsDto, array($this, "order"));

        $withIce = $recipe->withIce ? 'rempli de glaçons' : '';
        $withShaker = $recipe->canShake ? 'shaker' : $this->GetGlass($recipe->glass);
        $stepsDto[0]->content = $stepsDto[0]->content. 'dans un '.$withShaker.' '.$withIce;
        $stepsDto[count($steps)] = new StepDto();
        if($recipe->canShake){
            $stepsDto[count($steps)]->content = 'Versez le contenu du shaker dans un ' . $this->GetGlass($recipe->glass) . ' et dégustez !';
        }else{
            $stepsDto[count($steps)]->content = 'Dégustez'; 
        }
        $stepsDto[count($steps)]->order = count($steps) + 1;
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
                // return 'verre-ballon';
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 650"><path d="M349.6 415.2c11.1-14 25.2-24.8 40.8-31.1 25.6-10.4 88.1-42.3 115.2-113.7 23.9-62.8 14.1-139.1-29.2-226.9-1.8-3.7-6.3-5.2-10-3.4-3.7 1.8-5.2 6.3-3.4 10 18.4 37.3 30.5 72.4 36.3 105H213.4c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5h288.2c4.2 34.7.9 66.5-9.9 95-25.1 65.9-83.1 95.4-106.9 105.1-18 7.3-34.3 19.7-46.9 35.8l-13.6 17.3-13.6-17.3c-12.7-16.1-28.9-28.4-46.9-35.8C240 360.5 182 331 156.9 265.1c-22.3-58.7-12.7-131 28.6-215 1.8-3.7.3-8.2-3.4-10-3.7-1.8-8.2-.3-10 3.4-43.3 87.8-53.1 164.2-29.2 226.9 27 71.4 89.5 103.2 115.1 113.6 15.6 6.4 29.7 17.1 40.8 31.1l17.9 22.7v105.7c-29.2 55.3-124 74.9-124.9 75.1-3.8.8-6.4 4.3-6 8.1s3.6 6.8 7.5 6.8h261.9c3.9 0 7.1-3 7.5-6.8s-2.3-7.4-6.1-8c-.3 0-27.2-5-56.4-17.2-25.8-10.8-58.5-29.4-68.4-57.3V437.9l17.8-22.7zm52.6 203.3H242.6c2.6-1 5.1-2.1 7.8-3.2 33.6-14.6 58-32.7 72.9-53.8 16.2 27.7 49.8 45.9 78.9 57z" fill="#fff"/></svg>';
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

    protected function queryBuilder($searchDto){
        $query = [];
        if(isset($searchDto->difficulty) && $searchDto->difficulty != 'null'){
            $query['difficulty'] = $searchDto->difficulty;
        }
        if(isset($searchDto->taste) && $searchDto->taste != 'null'){
            $query['taste'] = $searchDto->taste;
        }
        //pour ajouter un champ de rechercher il faut ajouter la condition ici et le nom de la recherche dans le searchDto
        return $query;
    }
}