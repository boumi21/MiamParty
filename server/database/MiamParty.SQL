-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 30 avr. 2020 à 13:14
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
  PRIMARY KEY (`id_account`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_account_account_type` (`id_account_type`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `account`
--

INSERT INTO `account` (`id_account`, `id_account_type`, `email`, `password`, `salt`) VALUES
(1, 1, 'boumi@fr.com', 'fea1d2fc7e9e7610662ebbabf54b9f583ad7ee52d26aa21ea3be6502b433cf4f', 'zzz'),
(2, 2, 'pro@com.fr', 'e4080317514cb1b4ef1cf51a61eda07b2de473e3a4d662952e9de9092d6c8b21', 'zzz');

-- --------------------------------------------------------

--
-- Structure de la table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
CREATE TABLE IF NOT EXISTS `account_type` (
  `id_account_type` smallint(6) NOT NULL AUTO_INCREMENT,
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
  `id_cooking_level` smallint(6) NOT NULL AUTO_INCREMENT,
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
  `nb_address` smallint(6) DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `postal_code` varchar(8) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_particular`),
  KEY `fk_particular_account` (`id_account`),
  KEY `fk_particular_cooking_level` (`id_cooking_level`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `particular`
--

INSERT INTO `particular` (`id_particular`, `id_account`, `id_cooking_level`, `firstname`, `lastname`, `birthday`, `sex`, `nb_address`, `street`, `city`, `postal_code`, `country`) VALUES
(1, 1, 1, 'Nicolas', 'Garnier', '1998-12-04', 1, 4, 'rue Lamartine', 'Dijon', '21000', 'France');

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
  PRIMARY KEY (`id_party`),
  KEY `fk_party_account` (`id_account`),
  KEY `fk_party_status` (`id_status`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `professional`
--

DROP TABLE IF EXISTS `professional`;
CREATE TABLE IF NOT EXISTS `professional` (
  `id_professional` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_account` smallint(6) NOT NULL,
  `name` char(32) NOT NULL,
  `nb_address` smallint(6) DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `postal_code` varchar(8) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_professional`),
  KEY `fk_professional_account` (`id_account`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `professional`
--

INSERT INTO `professional` (`id_professional`, `id_account`, `name`, `nb_address`, `street`, `city`, `postal_code`, `country`) VALUES
(1, 2, 'Crep Family', 154, 'Avenue Jean Jaures', 'Belfort', '90000', 'France');

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
  `id_status` smallint(6) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
