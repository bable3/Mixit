-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  lun. 22 avr. 2019 à 23:56
-- Version du serveur :  10.1.35-MariaDB
-- Version de PHP :  7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Mixit`
--

-- --------------------------------------------------------

--
-- Structure de la table `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int(11) NOT NULL,
  `vol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ingredient`
--

INSERT INTO `ingredient` (`id`, `name`, `unit`, `created_at`, `updated_at`, `image`, `type`, `vol`) VALUES
(2, 'Pastis', 1, '2019-04-14 00:00:00', NULL, 'bouteille-5.svg', 1, 45),
(3, 'Gin', 1, '2019-04-14 00:00:00', NULL, 'bouteille-3.svg', 1, 40),
(4, 'Crème de menthe', 1, '2019-04-14 00:00:00', NULL, 'bouteille-10.svg', 3, 0),
(5, 'Tonic', 1, '2019-04-15 00:00:00', NULL, 'bouteille-2.svg', 2, 0),
(6, 'Vermouth rouge', 1, '2019-04-14 00:00:00', NULL, 'bouteille-5.svg', 2, 17),
(7, 'Campari', 1, '2019-04-14 00:00:00', NULL, 'bouteille-5.svg', 1, 27),
(8, 'Rhum ambré', 1, '2019-04-22 00:00:00', NULL, 'bouteille-1.svg', 1, 40),
(9, 'Rhum jamaïcain', 1, '2019-04-22 00:00:00', NULL, 'bouteille-1.svg', 1, 50),
(10, 'Amer italien', 1, '2019-04-22 00:00:00', NULL, 'bouteille-2.svg', 1, 12),
(11, 'Proseco', 1, '2019-04-22 00:00:00', NULL, 'bouteille-4.svg', 1, 10),
(12, 'Vodka', 1, '2019-04-22 00:00:00', NULL, 'bouteille-6.svg', 1, 40),
(13, 'Tequila', 1, '2019-04-22 00:00:00', NULL, 'bouteille-8.svg', 1, 35),
(14, 'Scotch whisky', 1, '2019-04-22 00:00:00', NULL, 'bouteille-8.svg', 1, 40),
(15, 'Triple sec', 1, '2019-04-22 00:00:00', NULL, 'bouteille-7.svg', 1, 40),
(16, 'Curaçao', 1, '2019-04-22 00:00:00', NULL, 'bouteille-9.svg', 1, 30),
(17, 'Liqueur de melon', 1, '2019-04-22 00:00:00', NULL, 'bouteille-11.svg', 1, 18),
(18, 'Liqueur d\'abricot', 1, '2019-04-22 00:00:00', NULL, 'bouteille-11.svg', 1, 18),
(19, 'Jus citron vert', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 2, 0),
(20, 'Jus de fraise', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 2, 0),
(21, 'Jus de citron', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 2, 0),
(22, 'Nectar de maracuja', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 2, 0),
(23, 'Jus de pastèque', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 2, 0),
(24, 'Jus d\'ananas', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 2, 0),
(25, 'Nectar de cranberry', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 2, 0),
(26, 'Jus d\'orange', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 2, 0),
(27, 'Jus de tomate', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 2, 0),
(28, 'Menthe', 2, '2019-04-22 00:00:00', NULL, 'ingredient-feuille.svg', 3, 0),
(29, 'Sirop de grenadine', 1, '2019-04-22 00:00:00', NULL, 'bouteille-10.svg', 3, 0),
(30, 'Lait de coco', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 3, 0),
(31, 'Crème de framboise', 1, '2019-04-22 00:00:00', NULL, 'bouteille-10.svg', 3, 0),
(32, 'Crème de pèche', 1, '2019-04-22 00:00:00', NULL, 'bouteille-10.svg', 3, 0),
(33, 'Crème de mûre', 1, '2019-04-22 00:00:00', NULL, 'bouteille-10.svg', 3, 0),
(34, 'Orange', 4, '2019-04-22 00:00:00', NULL, 'ingredient-tranche.svg', 3, 0),
(35, 'Sucre de canne', 3, '2019-04-22 00:00:00', NULL, 'ingredient-sucre.svg', 3, 0),
(36, 'Eau gazeuse', 1, '2019-04-22 00:00:00', NULL, 'bouteille-5.svg', 3, 0),
(37, 'Rhum blanc', 1, '2019-04-22 00:00:00', NULL, 'bouteille-1.svg', 1, 40);

-- --------------------------------------------------------

--
-- Structure de la table `recipe`
--

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` int(11) NOT NULL,
  `difficulty` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `taste` int(11) NOT NULL,
  `glass` int(11) NOT NULL,
  `can_shake` tinyint(1) NOT NULL,
  `with_ice` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `recipe`
--

INSERT INTO `recipe` (`id`, `name`, `image`, `time`, `difficulty`, `created_at`, `updated_at`, `taste`, `glass`, `can_shake`, `with_ice`) VALUES
(3, 'Blue Moon', 'blue-moon.jpg', 60, 1, '2019-04-14 00:00:00', NULL, 1, 1, 0, 1),
(4, 'Gin & Tonic', 'gin.jpg', 60, 1, '2019-04-14 00:00:00', NULL, 2, 1, 0, 1),
(5, 'Negroni', 'negroni.jpg', 60, 1, '2019-04-14 00:00:00', NULL, 2, 3, 0, 1),
(8, 'Mojito Ambré', 'mojito-ambre.jpg', 300, 2, '2019-04-22 00:00:00', NULL, 3, 2, 1, 1),
(9, 'Mojito jamaicain', 'mojito-jamaicain.jpg', 300, 2, '2019-04-22 00:00:00', NULL, 3, 2, 1, 1),
(10, 'Mojito fraise', 'mojito-fraise.jpg', 300, 2, '2019-04-22 00:00:00', NULL, 3, 2, 1, 1),
(11, 'Spritz', 'spritz.jpg', 90, 1, '2019-04-22 00:00:00', NULL, 2, 1, 0, 0),
(12, 'Gin fizz', 'gin-fizz.jpg', 90, 1, '2019-04-22 00:00:00', NULL, 2, 1, 0, 0),
(13, 'Tom collins', 'tom-collins.jpg', 120, 2, '2019-04-22 00:00:00', NULL, 2, 4, 1, 1),
(14, 'Hurricane', 'hurricane.jpg', 120, 3, '2019-04-22 00:00:00', NULL, 3, 5, 1, 1),
(15, 'Nick\'s Rey', 'nick-s-rey.jpg', 120, 3, '2019-04-22 00:00:00', NULL, 3, 5, 1, 1),
(16, 'Nuancier', 'nuancier.jpg', 120, 3, '2019-04-22 00:00:00', NULL, 3, 4, 1, 1),
(17, 'Sex on the beach', 'sex-on-the-beach.jpg', 120, 1, '2019-04-22 00:00:00', NULL, 3, 1, 1, 1),
(18, 'Daïquiri', 'daiquiri.jpg', 120, 1, '2019-04-22 00:00:00', NULL, 3, 5, 1, 1),
(19, 'Daïquiri fraise', 'daiquiri-fraise.jpg', 120, 1, '2019-04-22 00:00:00', NULL, 3, 5, 1, 1),
(20, 'Tequila sunrise', 'tequila-sunrise.jpg', 120, 1, '2019-04-22 00:00:00', NULL, 3, 5, 0, 0),
(21, 'Whisky sidecar', 'whisky-sidecar.jpg', 120, 1, '2019-04-22 00:00:00', NULL, 2, 5, 1, 1),
(22, 'Blue hawaian', 'blue-hawaian.jpg', 180, 2, '2019-04-22 00:00:00', NULL, 3, 5, 1, 1),
(23, 'Jock collins', 'jock-collins.jpg', 180, 2, '2019-04-22 00:00:00', NULL, 1, 3, 0, 0),
(24, 'Zombie', 'zombie.jpg', 300, 3, '2019-04-22 00:00:00', NULL, 3, 4, 1, 1),
(25, 'Whisky sour', 'whisky-sour.jpg', 120, 1, '2019-04-22 00:00:00', NULL, 2, 3, 0, 0),
(26, 'Orange sir', 'orange-sir.jpg', 120, 1, '2019-04-22 00:00:00', NULL, 3, 4, 1, 1),
(27, 'Bloody mary', 'bloody-mary.jpg', 120, 1, '2019-04-22 00:00:00', NULL, 2, 4, 1, 1),
(28, 'Ti\' punch', 'ti-punch.jpg', 60, 1, '2019-04-22 00:00:00', NULL, 2, 3, 0, 0),
(29, 'Bahama mama', 'bahama-mama.jpg', 120, 1, '2019-04-22 00:00:00', NULL, 1, 5, 1, 1),
(30, 'Le sang du pirate', 'sang-du-pirate.jpg', 120, 1, '2019-04-22 00:00:00', NULL, 1, 4, 0, 0),
(31, 'Rosa mia', 'rosa-mia.jpg', 120, 2, '2019-04-22 00:00:00', NULL, 3, 4, 1, 1),
(32, 'Groenland', 'groenland.jpg', 120, 2, '2019-04-22 00:00:00', NULL, 1, 4, 1, 1),
(33, 'Orangfe blossom', 'orange-blossom.jpg', 120, 2, '2019-04-22 00:00:00', NULL, 1, 4, 1, 1),
(34, 'Pina colada', 'daiquiri.jpg', 120, 2, '2019-04-22 00:00:00', NULL, 3, 5, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `step`
--

CREATE TABLE `step` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `step`
--

INSERT INTO `step` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `order`, `content`, `created_at`, `updated_at`) VALUES
(1, 3, 2, 2, 1, '', '2019-04-14 00:00:00', NULL),
(2, 3, 3, 4, 2, '', '2019-04-14 00:00:00', NULL),
(3, 3, 4, 2, 3, '', '2019-04-14 00:00:00', NULL),
(7, 3, NULL, 0, 4, 'Dégustez avec courage ! ', '2019-04-14 00:00:00', NULL),
(8, 4, 3, 5, 1, '', '2019-04-14 00:00:00', NULL),
(9, 4, 5, 20, 2, '', '2019-02-15 00:00:00', NULL),
(10, 5, 7, 3, 1, '', '2019-04-14 00:00:00', NULL),
(11, 5, 3, 3, 2, '', '0000-00-00 00:00:00', NULL),
(12, 5, 6, 3, 3, '', '2019-04-16 00:00:00', NULL),
(13, 8, 8, 5, 1, '', '2019-04-22 00:00:00', NULL),
(14, 8, 28, 7, 2, '. Afin d\'obtenir plus de goût vous pouvez les hacher', '2019-04-22 00:00:00', NULL),
(15, 8, 19, 5, 3, '', '2019-04-22 00:00:00', NULL),
(16, 8, 35, 2, 4, '', '2019-04-22 00:00:00', NULL),
(17, 8, 36, 6, 5, '', '2019-04-22 00:00:00', NULL),
(18, 9, 9, 5, 1, '', '2019-04-22 00:00:00', NULL),
(19, 9, 28, 7, 2, '', '2019-04-22 00:00:00', NULL),
(20, 9, 19, 5, 3, '', '2019-04-22 00:00:00', NULL),
(21, 9, 35, 2, 4, '', '2019-04-22 00:00:00', NULL),
(22, 9, 36, 6, 5, '', '2019-04-22 00:00:00', NULL),
(23, 10, 37, 5, 1, '', '2019-04-22 00:00:00', NULL),
(24, 10, 28, 7, 2, '', '2019-04-22 00:00:00', NULL),
(25, 10, 19, 5, 3, '', '2019-04-22 00:00:00', NULL),
(26, 10, 35, 2, 4, '', '2019-04-22 00:00:00', NULL),
(27, 10, 36, 6, 5, '', '2019-04-22 00:00:00', NULL),
(28, 10, 20, 10, 6, '', '2019-04-22 00:00:00', NULL),
(29, 11, 11, 12, 1, '', '2019-04-22 00:00:00', NULL),
(30, 11, 10, 6, 2, '', '2019-04-22 00:00:00', NULL),
(31, 11, 36, 2, 3, '', '2019-04-22 00:00:00', NULL),
(32, 11, 34, 1, 4, '', '2019-04-22 00:00:00', NULL),
(33, 12, 3, 4, 1, '', '2019-04-22 00:00:00', NULL),
(34, 12, 36, 8, 2, '', '2019-04-22 00:00:00', NULL),
(35, 12, 21, 3, 3, '', '2019-04-22 00:00:00', NULL),
(36, 12, 35, 1, 4, '', '2019-04-22 00:00:00', NULL),
(37, 13, 21, 2, 1, '', '2019-04-22 00:00:00', NULL),
(38, 13, 35, 1, 2, '', '2019-04-22 00:00:00', NULL),
(39, 13, 3, 6, 3, '', '2019-04-22 00:00:00', NULL),
(40, 13, 36, 8, 4, '', '2019-04-22 00:00:00', NULL),
(41, 13, 21, 1, 5, '', '2019-04-22 00:00:00', NULL),
(42, 14, 37, 3, 1, '', '2019-04-22 00:00:00', NULL),
(43, 14, 8, 3, 2, '', '2019-04-22 00:00:00', NULL),
(44, 14, 24, 4, 3, '', '2019-04-22 00:00:00', NULL),
(45, 14, 22, 4, 4, '', '2019-04-22 00:00:00', NULL),
(46, 14, 29, 1, 5, '', '2019-04-22 00:00:00', NULL),
(47, 15, 37, 4, 1, '', '2019-04-22 00:00:00', NULL),
(48, 15, 19, 2, 2, '', '2019-04-22 00:00:00', NULL),
(49, 15, 23, 8, 3, '', '2019-04-22 00:00:00', NULL),
(50, 15, 35, 1, 4, '', '2019-04-22 00:00:00', NULL),
(51, 15, 5, 10, 5, '', '2019-04-22 00:00:00', NULL),
(52, 16, 37, 4, 1, '', '2019-04-22 00:00:00', NULL),
(53, 16, 31, 3, 2, '', '2019-04-22 00:00:00', NULL),
(54, 16, 32, 3, 3, '', '2019-04-22 00:00:00', NULL),
(55, 16, 21, 1, 4, '', '2019-04-22 00:00:00', NULL),
(56, 16, 16, 1, 5, '', '2019-04-22 00:00:00', NULL),
(57, 17, 12, 3, 1, '', '2019-04-22 00:00:00', NULL),
(58, 17, 17, 1, 2, '', '2019-04-22 00:00:00', NULL),
(59, 17, 33, 1, 3, '', '2019-04-22 00:00:00', NULL),
(60, 17, 24, 4, 4, '', '2019-04-22 00:00:00', NULL),
(61, 17, 25, 4, 5, '', '2019-04-22 00:00:00', NULL),
(62, 18, 37, 6, 1, '', '2019-04-22 00:00:00', NULL),
(63, 18, 19, 4, 2, '', '2019-04-22 00:00:00', NULL),
(64, 18, 35, 1, 3, '', '2019-04-22 00:00:00', NULL),
(65, 19, 37, 6, 1, '', '2019-04-22 00:00:00', NULL),
(66, 19, 20, 4, 2, '', '2019-04-22 00:00:00', NULL),
(67, 19, 35, 1, 3, '', '2019-04-22 00:00:00', NULL),
(68, 20, 13, 4, 1, '', '2019-04-22 00:00:00', NULL),
(69, 20, 26, 8, 2, '', '2019-04-22 00:00:00', NULL),
(70, 20, 29, 2, 3, '', '2019-04-22 00:00:00', NULL),
(71, 21, 14, 4, 1, '', '2019-04-22 00:00:00', NULL),
(72, 21, 15, 1, 2, '', '2019-04-22 00:00:00', NULL),
(73, 21, 35, 1, 3, '', '2019-04-22 00:00:00', NULL),
(74, 21, 21, 3, 4, '', '2019-04-22 00:00:00', NULL),
(75, 22, 37, 4, 1, '', '2019-04-22 00:00:00', NULL),
(76, 22, 16, 2, 2, '', '2019-04-22 00:00:00', NULL),
(77, 22, 24, 8, 3, '', '2019-04-22 00:00:00', NULL),
(78, 22, 30, 4, 4, '', '2019-04-22 00:00:00', NULL),
(79, 22, 35, 1, 5, '', '0000-00-00 00:00:00', NULL),
(80, 22, 37, 4, 1, '', '2019-04-22 00:00:00', NULL),
(81, 22, 16, 2, 2, '', '2019-04-22 00:00:00', NULL),
(82, 22, 24, 8, 3, '', '2019-04-22 00:00:00', NULL),
(83, 22, 30, 4, 4, '', '2019-04-22 00:00:00', NULL),
(84, 22, 35, 1, 5, '', '2019-04-22 00:00:00', NULL),
(85, 23, 14, 4, 1, '', '2019-04-22 00:00:00', NULL),
(86, 23, 19, 2, 2, '', '2019-04-22 00:00:00', NULL),
(87, 23, 35, 1, 3, '', '2019-04-22 00:00:00', NULL),
(88, 23, 36, 5, 4, '', '2019-04-22 00:00:00', NULL),
(89, 24, 37, 3, 1, '', '2019-04-22 00:00:00', NULL),
(90, 24, 8, 3, 2, '', '2019-04-22 00:00:00', NULL),
(91, 24, 19, 2, 3, '', '2019-04-22 00:00:00', NULL),
(92, 24, 24, 6, 4, '', '2019-04-22 00:00:00', NULL),
(93, 24, 29, 1, 5, '', '2019-04-22 00:00:00', NULL),
(94, 24, 35, 1, 6, '', '2019-04-22 00:00:00', NULL),
(95, 24, 18, 2, 7, '', '2019-04-22 00:00:00', NULL),
(96, 25, 14, 5, 1, '', '2019-04-22 00:00:00', NULL),
(97, 25, 35, 1, 2, '', '2019-04-22 00:00:00', NULL),
(98, 25, 21, 3, 3, '', '2019-04-22 00:00:00', NULL),
(99, 26, 14, 4, 1, '', '2019-04-22 00:00:00', NULL),
(100, 26, 26, 12, 2, '', '2019-04-22 00:00:00', NULL),
(101, 27, 12, 4, 1, '', '2019-04-22 00:00:00', NULL),
(102, 27, 27, 12, 2, '', '2019-04-22 00:00:00', NULL),
(103, 27, 21, 1, 3, '', '2019-04-22 00:00:00', NULL),
(104, 28, 37, 6, 1, '', '2019-04-22 00:00:00', NULL),
(105, 28, 35, 1, 2, '', '2019-04-22 00:00:00', NULL),
(106, 28, 19, 1, 3, '', '2019-04-22 00:00:00', NULL),
(107, 29, 8, 3, 1, '', '2019-04-22 00:00:00', NULL),
(108, 29, 37, 3, 2, '', '2019-04-22 00:00:00', NULL),
(109, 29, 26, 6, 3, '', '2019-04-22 00:00:00', NULL),
(110, 29, 24, 6, 4, '', '2019-04-22 00:00:00', NULL),
(111, 29, 29, 1, 5, '', '2019-04-22 00:00:00', NULL),
(112, 29, 21, 1, 6, '', '2019-04-22 00:00:00', NULL),
(113, 30, 37, 8, 1, '', '2019-04-22 00:00:00', NULL),
(114, 30, 5, 8, 2, '', '2019-04-22 00:00:00', NULL),
(115, 30, 29, 1, 3, '', '2019-04-22 00:00:00', NULL),
(116, 31, 37, 4, 1, '', '2019-04-22 00:00:00', NULL),
(117, 31, 20, 12, 2, '', '2019-04-22 00:00:00', NULL),
(118, 31, 22, 8, 3, '', '2019-04-22 00:00:00', NULL),
(119, 31, 35, 1, 4, '', '2019-04-22 00:00:00', NULL),
(120, 32, 12, 4, 1, '', '2019-04-22 00:00:00', NULL),
(121, 32, 15, 2, 2, '', '2019-04-22 00:00:00', NULL),
(122, 32, 24, 4, 3, '', '2019-04-22 00:00:00', NULL),
(123, 32, 21, 6, 4, '', '2019-04-22 00:00:00', NULL),
(124, 33, 3, 4, 1, '', '2019-04-22 00:00:00', NULL),
(125, 33, 26, 12, 2, '', '2019-04-22 00:00:00', NULL),
(126, 34, 37, 4, 1, '', '2019-04-22 00:00:00', NULL),
(127, 34, 24, 6, 2, '', '2019-04-22 00:00:00', NULL),
(128, 34, 30, 6, 3, '', '2019-04-22 00:00:00', NULL),
(129, 34, 35, 1, 4, '', '2019-04-22 00:00:00', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `step`
--
ALTER TABLE `step`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_43B9FE3C59D8A214` (`recipe_id`),
  ADD KEY `IDX_43B9FE3C933FE08C` (`ingredient_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `step`
--
ALTER TABLE `step`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `step`
--
ALTER TABLE `step`
  ADD CONSTRAINT `FK_43B9FE3C59D8A214` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
  ADD CONSTRAINT `FK_43B9FE3C933FE08C` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
