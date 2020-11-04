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
  `Singer_Id` varchar(45) NOT NULL,
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
INSERT INTO `Album` VALUES (1,'Fearless','1','Taylor Swift','English'),(2,'Baby','2','Justin Bieber','English'),(3,'Franchise','3','Travis Scott','English'),(4,'News Of the World','4','Queen','English'),(5,'1989','1','Taylor Swift','English'),(6,'What Do You Mean','2','Justin Bieber','English'),(7,'Encore','2','Justin Bieber','English'),(8,'Red','1','Taylor Swift','English'),(9,'Shake It Off','1','Taylor Swift','English'),(10,'21','7','Adele','English'),(11,'Power is Power','3','Travis Scott','English'),(12,'Go Off','3','Travis Scott','English'),(13,'Faded','5','Alan Walker','English'),(14,'How You Like That','8','BlackPink','Korean'),(15,'Alive','9','BigBang','Korean'),(16,'Hello','7','Adele','English'),(17,'Skyfall','7','Adele','English'),(18,'The Fame','6','Lady Gaga','English'),(19,'The Spectre','5','Alan Walker','English'),(20,'The Album','8','BlackPink','Korean'),(21,'Bad Girl','10','Kris Wu','Korean'),(22,'Made In Heaven','4','Queen','English'),(23,'Different World','5','Alan Walker','English'),(24,'The Fame Monster','6','Lady Gaga','English'),(25,'Made Series','9','BigBang','Korean'),(26,'July','10','Kris Wu','English'),(27,'Kill This Love','8','BlackPink','Korean'),(28,'6','10','Kris Wu','Chinese'),(29,'Antares','10','Kris Wu','English');
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
INSERT INTO `Genre` VALUES (1,'Country',1920,'USA'),(2,'Pop',1950,'USA'),(3,'Hip Hop',1970,'United States'),(4,'Rock',1940,'United States'),(5,'Dance',1900,'Worldwide'),(6,'Electronic',1900,'Europe');
/*!40000 ALTER TABLE `Genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Singer`
--

DROP TABLE IF EXISTS `Singer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Singer` (
  `Singer_Id` int NOT NULL,
  `Singer_Name` varchar(255) NOT NULL,
  `Gender` varchar(30) DEFAULT NULL,
  `Debut_Year` int DEFAULT NULL,
  PRIMARY KEY (`Singer_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Singer`
--

LOCK TABLES `Singer` WRITE;
/*!40000 ALTER TABLE `Singer` DISABLE KEYS */;
INSERT INTO `Singer` VALUES (1,'Taylor Swift','Female',2006),(2,'Justin Bieber','Male',2009),(3,'Travis Scott','Male',2013),(4,'Queen','Male',1973),(5,'Alan Walker','Female',2012),(6,'Lady Gaga','Female',2005),(7,'Adele','Female',2008),(8,'BlackPink','Female',2016),(9,'BigBang','Male',2006),(10,'Kris Wu','Male',2012);
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
  `Singer_Id` int NOT NULL,
  `Album_Id` int DEFAULT NULL,
  `Genre_Id` int DEFAULT NULL,
  `Avg_Rating` double DEFAULT NULL,
  `Recommendations` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Song_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Song`
--

LOCK TABLES `Song` WRITE;
/*!40000 ALTER TABLE `Song` DISABLE KEYS */;
INSERT INTO `Song` VALUES (1,'Love Story',2008,1,1,1,NULL,NULL),(2,'Baby',2010,2,2,2,NULL,NULL),(3,'Deserve',2017,3,3,3,NULL,NULL),(4,'We Will Rock You',1977,4,4,4,NULL,NULL),(5,'Blank Space',2014,1,5,2,NULL,NULL),(6,'What Do You Mean',2015,2,6,2,NULL,NULL),(7,'Let Me Love You',2016,2,7,2,NULL,NULL),(8,'Red',2012,1,8,1,NULL,NULL),(9,'Shake It Off',2014,1,9,2,NULL,NULL),(10,'Someone Like You',2011,7,10,2,NULL,NULL),(11,'Power is Power',2019,3,11,2,NULL,NULL),(12,'Go Off',2017,3,12,3,NULL,NULL),(13,'Faded',2015,5,13,5,NULL,NULL),(14,'Rolling in the Deep',2011,7,10,2,NULL,NULL),(15,'We Are the Champions',2001,4,4,4,NULL,NULL),(16,'How You Like That',2020,8,14,3,NULL,NULL),(17,'Fantastic Baby',2012,9,15,2,NULL,NULL),(18,'Hello',2015,7,16,2,NULL,NULL),(19,'Skyfall',2012,7,17,2,NULL,NULL),(20,'Poker Face',2008,6,18,2,NULL,NULL),(21,'The Spectre',2017,5,19,5,NULL,NULL),(22,'Lovesick Girls',2020,8,20,5,NULL,NULL),(23,'Bad Girl',2015,10,21,2,NULL,NULL),(24,'Yeah',1995,4,22,4,NULL,NULL),(25,'Lost Control',2018,5,23,2,NULL,NULL),(26,'Bad Romance',2009,6,24,2,NULL,NULL),(27,'Pretty Savage',2020,8,20,5,NULL,NULL),(28,'Loser',2015,9,25,3,NULL,NULL),(29,'Sober',2015,9,25,3,NULL,NULL),(30,'July',2016,10,26,6,NULL,NULL),(31,'Kill This Love',2019,8,27,3,NULL,NULL),(32,'Juice',2017,10,28,3,NULL,NULL),(33,'Coupe',2018,10,29,3,NULL,NULL),(34,'Bang Bang Bang',2015,9,25,3,NULL,NULL),(35,'Telephone',2009,6,24,2,NULL,NULL);
/*!40000 ALTER TABLE `Song` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-03 23:48:40
