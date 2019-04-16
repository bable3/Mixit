<?php
namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity()
 * @ORM\Table(name="recipe")
 */
class Recipe
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    public $id;
    /**
     * @ORM\Column(type="string")
     */
    public $name;
     /**
     * @ORM\Column(type="integer")
     */
    public $taste;
    /**
     * @ORM\Column(type="integer")
     */
    public $glass;
     /**
     * @ORM\Column(type="string")
     */
    public $image;
    /**
     * @ORM\Column(type="boolean")
     */
    public $canShake;
    /**
     * @ORM\Column(type="boolean")
     */
    public $withIce;
     /**
     * @ORM\Column(type="integer")
     */
    public $time;
     /**
     * @ORM\Column(type="integer")
     */
    public $difficulty;
    /**
     * @ORM\Column(type="datetime")
     */
    protected $createdAt;
    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    protected $updatedAt;
    /**
     * @ORM\OneToMany(targetEntity="Step", mappedBy="recipe")
     * @var Step[]
     */
    public $steps;

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
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