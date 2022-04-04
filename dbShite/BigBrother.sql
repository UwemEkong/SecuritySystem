-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BigBroSecurity` DEFAULT CHARACTER SET utf8 ;
USE `BigBroSecurity` ;

-- -----------------------------------------------------
-- Table `BigBroSecurity`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BigBroSecurity`.`user` (
  `id` INT NOT NULL auto_increment,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `Type` VARCHAR(45) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `BigBroSecurity`.`Feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BigBroSecurity`.`feedback` (
                                                           `id` INT NOT NULL auto_increment,
                                                           `name` VARCHAR(45) NULL,
                                                           `email` VARCHAR(45) NULL,
                                                           `question` VARCHAR(250) NULL,
                                                           `sent` boolean NULL,
                                                           PRIMARY KEY (`id`),
                                                           UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BigBroSecurity`.`Image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BigBroSecurity`.`image` (
                                                           `id` INT NOT NULL auto_increment,
                                                           `url` VARCHAR(250) NULL,
                                                           PRIMARY KEY (`id`),
                                                           UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `BigBroSecurity`.`Label`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BigBroSecurity`.`label` (
                                                           `id` INT NOT NULL auto_increment,
                                                           `userid` INT NULL,
                                                           `text` VARCHAR(50) NULL,
                                                           PRIMARY KEY (`id`),
                                                           UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `BigBroSecurity`.`Preferences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BigBroSecurity`.`preferences` (
                                                        `id` INT NOT NULL auto_increment,
                                                        `userid` INT NULL,
                                                        `remove` INT NULL,
                                                        `motion` boolean NULL,
                                                        `dark` boolean NULL,
                                                        `fontsize` INT NULL,
                                                        `imagesize` INT NULL,
                                                        `videosize` INT NULL,
                                                        PRIMARY KEY (`id`),
                                                        UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BigBroSecurity`.`MediaX`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BigBroSecurity`.`mediax` (
                                                              `id` INT NOT NULL auto_increment,
                                                              `filename` VARCHAR(255) NULL,
                                                              `islocal` boolean NULL,
                                                              `isvideo` boolean NULL,
                                                              `location` VARCHAR(255) NULL,
                                                              `pathorkey` VARCHAR(255) NULL,
                                                              `timestamp` VARCHAR(255) NULL,
                                                              `userid` INT NULL,
                                                              `isfavorite` boolean NULL,
															  `shared` boolean NULL,
                                                              `title` VARCHAR(255) NULL,
                                                              `category` VARCHAR(255) NULL,
                                                              `views` INT NULL,
                                                              PRIMARY KEY (`id`),
                                                              UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BigBroSecurity`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BigBroSecurity`.`comment` (
                                                           `id` INT NOT NULL auto_increment,
                                                           `mediaid` INT NULL,
                                                           `content` VARCHAR(500) NULL,
                                                           `username` VARCHAR(45) NULL,
                                                           `date` VARCHAR(250) NULL,
                                                           PRIMARY KEY (`id`),
                                                           UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
