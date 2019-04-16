<?php
namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity()
 * @ORM\Table(name="step")
 */
class Step
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    public $id;
    /**
     * @ORM\Column(type="integer")
     */
    public $quantity;
    /**
     * @ORM\Column(type="integer")
     */
    public $order;
     /**
     * @ORM\Column(type="string")
     */
    public $content;
    /**
     * @ORM\Column(type="datetime")
     */
    protected $createdAt;
    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    protected $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="Recipe", inversedBy="steps")
     * @ORM\JoinColumn(name="recipe_id", referencedColumnName="id", nullable=false)
     * @var Recipe
     */
    protected $recipe;

    /**
     * @ORM\ManyToOne(targetEntity="Ingredient", inversedBy="steps")
     * @ORM\JoinColumn(name="ingredient_id", referencedColumnName="id", nullable=true)
     * @var Ingredient
     */
    public $ingredient;

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getUnit()
    {
        return $this->unit;
    }
    
    public function setUnit($unit)
    {
        $this->unit = $unit;
    }

    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }
}