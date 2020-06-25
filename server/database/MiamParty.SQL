-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 25 juin 2020 à 16:00
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
  `nb_address` smallint(6) DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `postal_code` varchar(8) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_account`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_account_account_type` (`id_account_type`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `account`
--

INSERT INTO `account` (`id_account`, `id_account_type`, `email`, `password`, `salt`, `nb_address`, `street`, `city`, `postal_code`, `country`) VALUES
(1, 1, 'boumi@fr.com', 'fea1d2fc7e9e7610662ebbabf54b9f583ad7ee52d26aa21ea3be6502b433cf4f', 'zzz', 5, 'Avenue Charles Bohn', 'Belfort', '90000', 'France'),
(2, 2, 'pro@com.fr', 'e4080317514cb1b4ef1cf51a61eda07b2de473e3a4d662952e9de9092d6c8b21', 'zzz', 134, 'Avenue Jean Jaures', 'Belfort', '90000', 'France'),
(3, 1, 'jean@gmail.com', 'fea1d2fc7e9e7610662ebbabf54b9f583ad7ee52d26aa21ea3be6502b433cf4f', 'zzz', 5, 'Rue Chaumont', 'Paris', '75000', 'France'),
(4, 1, 'michel@gmail.com', '5f6bd490e101e5394f5e3948b1146bde395d9fbea70c5af2f7638b09d9c2bc05', 'Qh7C4Kf2skjeICis1qSTDV5d5wJPZguiY2FNtJq9nBCciBvCsWwaNncbWiKlFVwD', NULL, NULL, NULL, NULL, NULL),
(5, 1, 'ahmed@gmail.com', '750eb0f7bb8f9e6938316f638ffcda8677dac4f79358a0a7bcf8809af12ac31b', 'FK15b0wKRhigY2tFSSyLai1cL6mYVKr3G99iKHAom2RD61lCvWzZjXv2MJOjAkpv', NULL, NULL, NULL, NULL, NULL),
(6, 2, 'dominos@gmail.com', 'b1df025188c109bbd2edcff489e286cb08880ab99ef142820d8fabc9316b92c7', 'rEGnB92mPBrshEogqNr973Ovw5WLfbfsfjobPKV84dG4NPiDclw3KpdZelmKGFEq', 12, 'fbg de Montbéliard', 'Belfort', '90000', 'France'),
(7, 2, 'ru@gmail.com', '455b8529a29371b079582c1b7ec388e71d9c8cff9b049c95107230fe3b84a5cd', '4slUR0BjkFq6KD2MXdlhkgPVvkbQ8PU1ecQ4Sknx4XjPJHqBoD8l4OSmtoM24TPA', 2, 'Ernest Duvillard', 'Belfort', '90000', 'France'),
(8, 1, 'patrick@gmail.com', '92914fc3b1ac4d52608d5bbe95d992118f488881d811dffbf8c9ffab6e602c49', '6D2JdmbHOMpkif6nkReF5NEdxMaJZyzS2RrxNNsO6GqySx5RpKikHwEe9JTwld5c', 25, 'Boulevard Henry 1er', 'Besancon', '25000', 'France'),
(9, 2, 'carre@gmail.com', '365b5b0a1bfeba4cf89fc9196639bfbf05236cdcd31f5548aebc50151d55a68a', 'zA7sl1KHl1t5kOKliouw0UyR2lkL4ZpdtAHPd6Bj00SFu51QsvNpCQgyhj1Zwoyd', NULL, NULL, NULL, NULL, NULL),
(10, 1, 'mike@gmail.com', '5f6bd490e101e5394f5e3948b1146bde395d9fbea70c5af2f7638b09d9c2bc05', 'Qh7C4Kf2skjeICis1qSTDV5d5wJPZguiY2FNtJq9nBCciBvCsWwaNncbWiKlFVwD', NULL, NULL, NULL, NULL, NULL),
(11, 2, 'palmier@gmail.com', 'f00281414186cca3c7bc02ac3079afd7e05da3aee9484e950e71936cd5d8a0eb', 'cWNm7nbjXHqEiFA5vsXTigDk4OZoOsBidfsugNtd3NPvDNVb06UmfONufMqZgqgF', NULL, NULL, NULL, NULL, NULL),
(12, 2, 'raclette@gmail.com', '9422934c1dfa2f1ca22c2f6e147dc1986fc43df589df9abe41339e806b5d7f4e', 'R4LZumx3beVHdR4tHQeoVR6dWepsmvFlhf0BmeHmEcm7hEsv5uZtqnc8Obd3hoFC', NULL, NULL, NULL, NULL, NULL),
(13, 2, 'nouveau@gmail.com', 'c6724aa3643392214eeb4dc6624d90ff28dfcf2ee0906b8922db6588acaabd7f', 'Lexm5vmTh60WzHhZrEM9ReRwP2ZDhKzWXvrjcbE5meESD6UeQWa3ndEC6nTwtqwm', NULL, NULL, NULL, NULL, NULL),
(14, 2, 'palais@gmail.com', '0cf9fb64f9b2397844aab193a940cb09c35072d1a4408595b34de6b00a44b206', 'TUvT9xBHPOMz7JNe12W9j9AEQnIr4Nb999NgxBzVOuVx1f1hzWUx76A7oTWTFbSD', NULL, NULL, NULL, NULL, NULL);

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
  `mark` smallint(6) NOT NULL,
  PRIMARY KEY (`id_mark`),
  KEY `fk_mark_account` (`id_account`),
  KEY `fk_mark_party` (`id_party`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `mark`
--

INSERT INTO `mark` (`id_mark`, `id_account`, `id_party`, `description`, `mark`) VALUES
(5, 1, 47, 'Une super note', 5),
(3, 1, 6, 'Superbe', 5),
(4, 5, 38, 'Tout ne m\'a pas emballé', 3),
(8, 1, 38, 'Super soirée', 5);

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `particular`
--

INSERT INTO `particular` (`id_particular`, `id_account`, `id_cooking_level`, `firstname`, `lastname`, `birthday`, `sex`) VALUES
(1, 1, 1, 'Nicolas', 'Garnier', NULL, 1),
(2, 3, 3, 'Jean', 'Neymar', '2020-05-22', 1),
(3, 4, 1, 'Michel', 'Loter', '2020-06-02', 0),
(4, 5, 1, 'Ahmed', 'Bekhef', NULL, 0),
(5, 8, 2, 'Monique', 'Mou', NULL, 1);

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
  `description` varchar(500) DEFAULT NULL,
  `isPartyPro` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_party`),
  KEY `fk_party_account` (`id_account`),
  KEY `fk_party_status` (`id_status`)
) ENGINE=MyISAM AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `party`
--

INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(2, 1, 3, 'Nouvelle soirée', '2020-05-05 19:00:00', '8.00', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 6, NULL, 'Une superbe description', 0),
(3, 1, 3, 'Grande soirée festive', '2020-05-21 00:00:00', '0.00', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 10, NULL, 'null', 0),
(4, 1, 3, 'Soirée de la mer', '2020-05-20 04:00:00', '8.00', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 2, NULL, 'Une petite description', 0),
(5, 1, 1, 'avec image', '2020-05-27 05:02:00', '10.00', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 2, null, 'Une chtite description', 0),
(6, 2, 1, 'Crêpes à gogo', '2020-06-27 00:00:00', '8.00', 5, 'Rue Le petit', 'Valdoie', '90500', 'France', 25, NULL, 'Les crêpes sucrées sont offertes', 1);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(7, 1, 1, 'Soirée moules frites', '2020-05-30 21:00:00', '5.00', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 7, null, '', 0);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(30, 1, 1, 'soiree push', '2020-05-21 21:00:00', '0.00', 3, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 2, '', '', 0),
(38, 2, 1, 'Crêpes tacos', '2020-06-03 22:00:00', '0.00', 5, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 2, null, '', 1);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(52, 1, 1, 'Méga Tacos', '2020-06-26 20:15:00', '0.00', 5, 'Avenue Charles Bohn', 'Danjoutin', '90000', 'France', 5, null, 'Je vous propose des tacos faits maison gratuitement !', 0);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(55, 1, 3, 'Soirée couscous', '2020-06-23 21:55:00', '7.00', 5, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 6, null, 'Super soirée couscous', 0);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(40, 7, 1, 'Soirée étudiante', '2020-06-25 19:00:00', '5.00', 2, 'Ernest Duvillard', 'Belfort', '90000', 'France', 50, null, 'Gros couscous à volonté dans votre Crous préféré !\nJus de fruit offert également :)', 1);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(41, 5, 1, 'Petits plaisirs bretons', '2020-07-13 22:00:00', '4.00', 8, 'Rue Albert', 'Paris', '75000', 'France', 5, null, 'Venez gouter mes gâteaux bretons, le tout fait maison :)', 0);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(42, 8, 1, 'Repas bio complet', '2020-06-18 20:00:00', '11.00', 25, 'Boulevard Henry 1er', 'Besancon', '25000', 'France', 5, null, 'Grande fan de bio, mon mari tient une petite exploitation. Nous vous ferons découvrir à travers d\'un repas des produits bio et locaux pour émoustiller vos papilles !', 0);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(43, 4, 1, 'Pâtisseries sucrées', '2020-06-12 20:00:00', '8.00', 5, 'rue Beauchemin', 'Gray', '70000', 'France', 7, null, 'Ancien pâtisser, je vous donnerai mes conseils pour réussir vos meilleures réalisation', 0);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(44, 6, 1, 'Poulet à l\'infini', '2020-06-29 21:40:00', '12.00', 12, 'fbg de Montbéliard', 'Belfort', '90000', 'France', 40, NULL, 'Ce soir c\'est poulet à l\'infini chez Dominos !\nLe prix d\'entrée comprend 1 grande pizza, boisson à volonté et poulet frit à l\'infini !', 1);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(45, 6, 1, 'Pizza fiesta', '2020-06-16 19:10:00', '8.00', 12, 'fbg de Montbéliard', 'Belfort', '90000', 'France', 40, null, '2 pizzas petites achetées pour le prix d\'une, une occasion à ne manquer sous aucun prétexte !\nUn spectacle de danse du ventre sera également offert', 1);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(46, 6, 1, 'Maître pizza', '2020-06-29 15:00:00', '15.00', 12, 'fbg de Montbéliard', 'Belfort', '90000', 'France', 6, null, 'Apprenez à créer votre pizza avec nos spécialistes avec des ingrédients de qualité !\nS\'es suivra ensuite une dégustation :)', 1);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(47, 9, 1, 'Grillade party', '2020-05-02 17:35:00', '7.00', 20, 'Rue Albert', 'Gray', '70000', 'France', 15, null, 'De bonnes brochettes cuites au barbecue !\nLes enfants auront le droit à leurs propres menus', 1);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(49, 1, 1, 'Atelier sandwichs', '2020-06-18 20:50:00', '0.00', 5, 'Avenue Charles Bohn', 'Belfort', '90000', 'France', 6, null, 'Petit groupe pour partager nos créations de sandwichs !\n#MiamSandwich', 0);
INSERT INTO `party` (`id_party`, `id_account`, `id_status`, `party_name`, `party_date`, `price`, `nb_address`, `street`, `city`, `postal_code`, `country`, `nb_guests`, `picture`, `description`, `isPartyPro`) VALUES
(51, 2, 1, 'Prix mini', '2020-08-20 18:30:00', '4.00', 134, 'Avenue Jean Jaures', 'Belfort', '90000', 'France', 50, null, 'Les prix des enfants sont divisés par 2 !', 1);

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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `professional`
--

INSERT INTO `professional` (`id_professional`, `id_account`, `name`) VALUES
(1, 2, 'Crep Family'),
(2, 6, 'Dominos Belfort'),
(3, 7, 'RU Belfort'),
(4, 9, 'Carré d\'os'),
(5, 11, 'Le Palmier'),
(6, 12, 'La raclette'),
(7, 13, 'Nouveau restaurant'),
(8, 14, 'Palais');

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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id_account`, `id_party`, `nb_places`) VALUES
(1, 3, 3),
(3, 3, 2),
(3, 5, 2),
(1, 6, 1),
(1, 38, 1),
(1, 47, 1),
(1, 40, 2);

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
(1, 'En ligne'),
(2, 'Terminé'),
(3, 'Annulé');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
