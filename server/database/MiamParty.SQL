-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 02 mai 2020 à 20:40
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `miampartytest`
--

-- --------------------------------------------------------

--
-- Structure de la table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id_account` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_account_type` smallint(6) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  `salt` varchar(256) NOT NULL,
  `nb_address` smallint(6) NOT NULL,
  `street` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `postal_code` varchar(8) NOT NULL,
  `country` varchar(50) NOT NULL,
  PRIMARY KEY (`id_account`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_account_account_type` (`id_account_type`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `account`
--

INSERT INTO `account` (`id_account`, `id_account_type`, `email`, `password`, `salt`, `nb_address`, `street`, `city`, `postal_code`, `country`) VALUES
(1, 1, 'boumi@fr.com', 'fea1d2fc7e9e7610662ebbabf54b9f583ad7ee52d26aa21ea3be6502b433cf4f', 'zzz', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France'),
(2, 2, 'pro@com.fr', 'e4080317514cb1b4ef1cf51a61eda07b2de473e3a4d662952e9de9092d6c8b21', 'zzz', 134, 'Avenue Jean Jaures', 'Belfort', '90000', 'France');

-- --------------------------------------------------------

--
-- Structure de la table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
CREATE TABLE IF NOT EXISTS `account_type` (
  `id_account_type` smallint(6) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id_account_type`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `account_type`
--

INSERT INTO `account_type` (`id_account_type`, `description`) VALUES
(1, 'Particulier'),
(2, 'Professionnel'),
(3, 'Admin');

-- --------------------------------------------------------

--
-- Structure de la table `cooking_level`
--

DROP TABLE IF EXISTS `cooking_level`;
CREATE TABLE IF NOT EXISTS `cooking_level` (
  `id_cooking_level` smallint(6) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id_cooking_level`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `cooking_level`
--

INSERT INTO `cooking_level` (`id_cooking_level`, `description`) VALUES
(1, 'Débutant'),
(2, 'Avancé');

-- --------------------------------------------------------

--
-- Structure de la table `mark`
--

DROP TABLE IF EXISTS `mark`;
CREATE TABLE IF NOT EXISTS `mark` (
  `id_mark` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_account` smallint(6) NOT NULL,
  `id_party` smallint(6) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_mark`),
  KEY `fk_mark_account` (`id_account`),
  KEY `fk_mark_party` (`id_party`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `particular`
--

DROP TABLE IF EXISTS `particular`;
CREATE TABLE IF NOT EXISTS `particular` (
  `id_particular` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_account` smallint(6) NOT NULL,
  `id_cooking_level` smallint(6) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `birthday` date DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_particular`),
  KEY `fk_particular_account` (`id_account`),
  KEY `fk_particular_cooking_level` (`id_cooking_level`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `particular`
--

INSERT INTO `particular` (`id_particular`, `id_account`, `id_cooking_level`, `firstname`, `lastname`, `birthday`, `sex`) VALUES
(1, 1, 1, 'Nicolas', 'Garnier', '1998-12-04', 1);

-- --------------------------------------------------------

--
-- Structure de la table `party`
--

DROP TABLE IF EXISTS `party`;
CREATE TABLE IF NOT EXISTS `party` (
  `id_party` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_account` smallint(6) NOT NULL,
  `id_status` smallint(6) NOT NULL,
  `party_name` varchar(50) NOT NULL,
  `party_date` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `nb_address` smallint(6) NOT NULL,
  `street` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `postal_code` varchar(8) NOT NULL,
  `country` varchar(50) NOT NULL,
  `nb_guests` smallint(6) NOT NULL,
  `picture` longblob,
  `description` varchar(100) DEFAULT NULL,
  `isPartyPro` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_party`),
  KEY `fk_party_account` (`id_account`),
  KEY `fk_party_status` (`id_status`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `party`
--

INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(2, 1, 1, 'Nouvelle soirée', '2020-05-05 19:00:00', '8.00', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 6, NULL, 'Une superbe description', 0),
(3, 1, 1, 'frfre', '2020-05-21 00:00:00', '0.00', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 2, NULL, 'null', 0),
(4, 1, 1, 'encore une', '2020-05-20 04:00:00', '8.00', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 2, NULL, 'Une petite description', 0),
(5, 1, 1, 'avec image', '2020-05-27 05:02:00', '10.00', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 2, 0x646174613a696d6167652f706e673b6261736536342c6956424f5277304b47676f414141414e535568455567414141424d414141415443415941414142795544624d414141415a556c455156513479324e674741576a5942536767617147753546412f424f4976325042495046455567786a422b49645150776643393448784c796b7573344769442b684766514f6942334a38536f6a454539454d327775534a7a6373464d4734747451677834447352616c6b5a454e784c2b41754a51614d63734778424f416d47766f706b3841567a31734c5a676730627341414141415355564f524b35435949493d, 'Une chtite description', 0);

-- --------------------------------------------------------

--
-- Structure de la table `professional`
--

DROP TABLE IF EXISTS `professional`;
CREATE TABLE IF NOT EXISTS `professional` (
  `id_professional` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_account` smallint(6) NOT NULL,
  `name` char(32) NOT NULL,
  PRIMARY KEY (`id_professional`),
  KEY `fk_professional_account` (`id_account`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `professional`
--

INSERT INTO `professional` (`id_professional`, `id_account`, `name`) VALUES
(1, 2, 'Crep Family');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `id_account` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_party` smallint(6) NOT NULL,
  `nb_places` smallint(6) NOT NULL,
  PRIMARY KEY (`id_account`,`id_party`),
  KEY `fk_reservation_party` (`id_party`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id_status` smallint(6) NOT NULL,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id_status`, `description`) VALUES
(1, 'En ligne');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
