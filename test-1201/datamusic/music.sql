-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: music
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Album`
--

DROP TABLE IF EXISTS `Album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Album` (
  `Album_Id` int NOT NULL,
  `Album_Name` varchar(45) NOT NULL,
  `Singer_Name` varchar(45) NOT NULL,
  `Language` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Album_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Album`
--

LOCK TABLES `Album` WRITE;
/*!40000 ALTER TABLE `Album` DISABLE KEYS */;
INSERT INTO `Album` VALUES (1,'Fearless','Taylor Swift','English'),(2,'Baby','Justin Bieber','English'),(3,'Franchise','Travis Scott','English'),(4,'News Of the World','Queen','English'),(5,'1989','Taylor Swift','English'),(6,'What Do You Mean','Justin Bieber','English'),(7,'Encore','Justin Bieber','English'),(8,'Red','Taylor Swift','English'),(9,'Shake It Off','Taylor Swift','English'),(10,'21','Adele','English'),(11,'Power is Power','Travis Scott','English'),(12,'Go Off','Travis Scott','English'),(13,'Faded','Alan Walker','English'),(14,'How You Like That','BlackPink','Korean'),(15,'Alive','BigBang','Korean'),(16,'Hello','Adele','English'),(17,'Skyfall','Adele','English'),(18,'The Fame','Lady Gaga','English'),(19,'The Spectre','Alan Walker','English'),(20,'The Album','BlackPink','Korean'),(21,'Bad Girl','Kris Wu','Korean'),(22,'Made In Heaven','Queen','English'),(23,'Different World','Alan Walker','English'),(24,'The Fame Monster','Lady Gaga','English'),(25,'Made Series','BigBang','Korean'),(26,'July','Kris Wu','English'),(27,'Kill This Love','BlackPink','Korean'),(28,'6','Kris Wu','Chinese'),(29,'Antares','Kris Wu','English'),(30,'aaaa','AAAA',NULL);
/*!40000 ALTER TABLE `Album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Genre`
--

DROP TABLE IF EXISTS `Genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Genre` (
  `Genre_Id` int NOT NULL,
  `Genre_Name` varchar(255) NOT NULL,
  `Origin_Year` int DEFAULT NULL,
  `Origin_Country` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Genre_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genre`
--

LOCK TABLES `Genre` WRITE;
/*!40000 ALTER TABLE `Genre` DISABLE KEYS */;
INSERT INTO `Genre` VALUES (1,'Country',1920,'United States'),(2,'Pop',1950,'United States'),(3,'Hip Hop',1970,'United States'),(4,'Rock',1940,'United States'),(5,'Dance',1900,'Worldwide'),(6,'Electronic',1900,'Europe'),(7,'BB',NULL,NULL);
/*!40000 ALTER TABLE `Genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Singer`
--

DROP TABLE IF EXISTS `Singer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Singer` (
  `Singer_Id` int NOT NULL AUTO_INCREMENT,
  `Singer_Name` varchar(255) NOT NULL,
  `Gender` varchar(30) DEFAULT NULL,
  `Debut_Year` int DEFAULT NULL,
  PRIMARY KEY (`Singer_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Singer`
--

LOCK TABLES `Singer` WRITE;
/*!40000 ALTER TABLE `Singer` DISABLE KEYS */;
INSERT INTO `Singer` VALUES (1,'Taylor Swift','Female',2006),(2,'Justin Bieber','Male',2008),(3,'Travis Scott','Male',2013),(4,'Queen','Male',1973),(5,'Alan Walker','Female',2012),(6,'Lady Gaga','Female',2005),(7,'Adele','Female',2008),(8,'BlackPink','Female',2016),(9,'BigBang','Male',2006),(10,'Kris Wu','Male',2012),(13,'AAAA',NULL,NULL),(14,'AAAA',NULL,NULL);
/*!40000 ALTER TABLE `Singer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Song`
--

DROP TABLE IF EXISTS `Song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Song` (
  `Song_Id` int NOT NULL,
  `Song_Name` varchar(255) NOT NULL,
  `Year` int DEFAULT NULL,
  `Singer_Name` varchar(45) NOT NULL,
  `Album_Name` varchar(45) DEFAULT NULL,
  `Genre_Name` varchar(45) DEFAULT NULL,
  `Avg_Rating` double DEFAULT NULL,
  `count_Rating` int DEFAULT NULL,
  PRIMARY KEY (`Song_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Song`
--

LOCK TABLES `Song` WRITE;
/*!40000 ALTER TABLE `Song` DISABLE KEYS */;
INSERT INTO `Song` VALUES (1,'Love Story',2008,'Taylor Swift','Fearless','Country',NULL,NULL),(2,'Baby',2010,'Justin Bieber','Baby','Pop',NULL,NULL),(3,'Deserve',2017,'Travis Scott','Franchise','Hip Hop',NULL,NULL),(4,'We Will Rock You',1977,'Queen','News Of the World','Rock',NULL,NULL),(5,'Blank Space',2014,'Taylor Swift','1989','Pop',NULL,NULL),(6,'What Do You Mean',2015,'Justin Bieber','What Do You Mean','Pop',NULL,NULL),(7,'Let Me Love You',2016,'Justin Bieber','Encore','Pop',NULL,NULL),(8,'Red',2012,'Taylor Swift','Red','Country',NULL,NULL),(9,'Shake It Off',2014,'Taylor Swift','Shake It Off','Pop',NULL,NULL),(10,'Someone Like You',2011,'Adele','21','Pop',NULL,NULL),(11,'Power is Power',2019,'Travis Scott','Power is Power','Pop',NULL,NULL),(12,'Go Off',2017,'Travis Scott','Go Off','Hip Hop',NULL,NULL),(13,'Faded',2015,'Alan Walker','Faded','Dance',NULL,NULL),(14,'Rolling in the Deep',2011,'Adele','21','Pop',NULL,NULL),(15,'We Are the Champions',2001,'Queen','News Of the World','Rock',NULL,NULL),(16,'How You Like That',2020,'BlackPink','How You Like That','Hip Hop',NULL,NULL),(17,'Fantastic Baby',2012,'BigBang','Alive','Pop',NULL,NULL),(18,'Hello',2015,'Adele','Hello','Pop',NULL,NULL),(19,'Skyfall',2012,'Adele','Skyfall','Pop',NULL,NULL),(20,'Poker Face',2008,'Lady Gaga','The Fame','Pop',NULL,NULL),(21,'The Spectre',2017,'Alan Walker','The Spectre','Dance',NULL,NULL),(22,'Lovesick Girls',2020,'BlackPink','The Album','Dance',NULL,NULL),(23,'Bad Girl',2015,'Kris Wu','Bad Girl','Pop',NULL,NULL),(24,'Yeah',1995,'Queen','Made In Heaven','Rock',NULL,NULL),(25,'Lost Control',2018,'Alan Walker','Different World','Pop',NULL,NULL),(26,'Bad Romance',2009,'Lady Gaga','The Fame Monster','Pop',NULL,NULL),(27,'Pretty Savage',2020,'BlackPink','The Album','Dance',NULL,NULL),(28,'Loser',2015,'BigBang','Made Series','Hip Hop',NULL,NULL),(29,'Sober',2015,'BigBang','Made Series','Hip Hop',NULL,NULL),(30,'July',2016,'Kris Wu','July','Electronic',NULL,NULL),(31,'Kill This Love',2019,'BlackPink','Kill This Love','Hip Hop',NULL,NULL),(32,'Juice',2017,'Kris Wu','6','Hip Hop',NULL,NULL),(33,'Coupe',2018,'Kris Wu','Antares','Hip Hop',NULL,NULL),(34,'Bang Bang Bang',2015,'BigBang','Made Series','Hip Hop',NULL,NULL),(35,'Telephone',2009,'Lady Gaga','The Fame Monster','Pop',NULL,NULL);
/*!40000 ALTER TABLE `Song` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `GenreTrig` AFTER INSERT ON `song` FOR EACH ROW BEGIN 
SET @genre = (SELECT Genre_Name FROM Genre WHERE Genre_name = new. Genre_Name); 
IF @genre IS NULL THEN 
SET @Id=(SELECT COUNT(*)+1 FROM Genre);
INSERT INTO Genre (Genre_Id, Genre_Name)  VALUES (@Id, new. Genre_Name); 
END IF; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `SingerTrig` AFTER INSERT ON `song` FOR EACH ROW BEGIN 
IF @singer IS NULL THEN 
INSERT INTO Singer(Singer_Name)  VALUES (new.Singer_Name); 
END IF; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `AlbumTrig` AFTER INSERT ON `song` FOR EACH ROW BEGIN 
SET @album = (SELECT Album_Name FROM Album WHERE Album_name = new. Album_Name); 
IF @album IS NULL THEN 
SET @Id=(SELECT COUNT(*)+1 FROM Album);
INSERT INTO Album (Album_Id, Singer_Name, Album_Name)  VALUES (@Id, new.Singer_Name, new. Album_Name); 
END IF; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-01 17:45:32
