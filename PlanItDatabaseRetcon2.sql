-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema PlanIt
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema PlanIt
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `PlanIt` DEFAULT CHARACTER SET utf8 ;
USE `PlanIt` ;

-- -----------------------------------------------------
-- Table `PlanIt`.`PlanItUsers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PlanIt`.`PlanItUsers` (
  `usersId` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(60) NOT NULL,
  `Password` VARCHAR(60) NOT NULL,
  `Role` ENUM('student', 'advisor', 'admin') NULL,
  `Department` VARCHAR(60) NULL,
  `Year_Started` YEAR(4) NULL,
  `FName` VARCHAR(45) NOT NULL,
  `Lname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`usersId`))
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `PlanIt`.`Courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PlanIt`.`Courses` (
  `UniqueCourseID` INT NOT NULL AUTO_INCREMENT,
  `CoursePrefix` VARCHAR(6) NOT NULL,
  `CourseName` VARCHAR(45) NOT NULL,
  `CourseCode` INT NOT NULL,
  `Semester`  ENUM('Fall','Spring','Winter','Summer','Both') NOT NULL,
  `CreditHours` INT NOT NULL,
   `Prereq?` ENUM('Yes','No'),
	PRIMARY KEY (`UniqueCourseID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlanIt`.`Prerequisites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PlanIt`.`Prerequisites` (
  `Course_ID` INT NOT NULL,
  `Prereq_ID` INT NOT NULL,
  `Year_Added` YEAR(4) NOT NULL,
  `Year_Removed` YEAR(4) NULL,
  PRIMARY KEY (`Course_ID`, `Prereq_ID`),
  INDEX `fk_Courses_has_Courses_Courses6_idx` (`Prereq_ID` ASC) VISIBLE,
  INDEX `fk_Courses_has_Courses_Courses5_idx` (`Course_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Courses_has_Courses_Courses5`
    FOREIGN KEY (`Course_ID`)
    REFERENCES `mydb`.`Courses` (`UniqueCourseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Courses_has_Courses_Courses6`
    FOREIGN KEY (`Prereq_ID`)
    REFERENCES `mydb`.`Courses` (`UniqueCourseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `PlanIt`.`Credentials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PlanIt`.`Credentials` (
  `CredentialID` INT NOT NULL AUTO_INCREMENT,
  `CredentialName` VARCHAR(45) NOT NULL,
  `Type` ENUM('Major', 'Minor', 'Cert') NOT NULL,
  PRIMARY KEY (`CredentialID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlanIt`.`Credentials_has_Courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PlanIt`.`Credentials_has_Courses` (
  `Credentials_CredentialID` INT NOT NULL,
  `Courses_UniqueCourseID` INT NOT NULL,
  PRIMARY KEY (`Credentials_CredentialID`, `Courses_UniqueCourseID`),
  INDEX `fk_Credentials_has_Courses_Courses1_idx` (`Courses_UniqueCourseID` ASC) VISIBLE,
  INDEX `fk_Credentials_has_Courses_Credentials_idx` (`Credentials_CredentialID` ASC) VISIBLE,
  CONSTRAINT `fk_Credentials_has_Courses_Credentials`
    FOREIGN KEY (`Credentials_CredentialID`)
    REFERENCES `PlanIt`.`Credentials` (`CredentialID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Credentials_has_Courses_Courses1`
    FOREIGN KEY (`Courses_UniqueCourseID`)
    REFERENCES `PlanIt`.`Courses` (`UniqueCourseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlanIt`.`PlanItUsers_has_Credentials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PlanIt`.`PlanItUsers_has_Credentials` (
  `PlanItUsers_usersId` INT NOT NULL,
  `Credentials_CredentialID` INT NOT NULL,
  PRIMARY KEY (`PlanItUsers_usersId`, `Credentials_CredentialID`),
  INDEX `fk_PlanItUsers_has_Credentials_Credentials1_idx` (`Credentials_CredentialID` ASC) VISIBLE,
  INDEX `fk_PlanItUsers_has_Credentials_PlanItUsers1_idx` (`PlanItUsers_usersId` ASC) VISIBLE,
  CONSTRAINT `fk_PlanItUsers_has_Credentials_PlanItUsers1`
    FOREIGN KEY (`PlanItUsers_usersId`)
    REFERENCES `PlanIt`.`PlanItUsers` (`usersId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PlanItUsers_has_Credentials_Credentials1`
    FOREIGN KEY (`Credentials_CredentialID`)
    REFERENCES `PlanIt`.`Credentials` (`CredentialName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `PlanIt`.`Prerequisites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PlanIt`.`Prerequisites` (
  `Course_ID` INT NOT NULL,
  `Prereq_ID` INT NOT NULL,
  `Year_Added` YEAR(4) NOT NULL,
  `Year_Removed` YEAR(4) NULL,
  PRIMARY KEY (`Course_ID`, `Prereq_ID`),
  INDEX `fk_Courses_has_Courses_Courses6_idx` (`Prereq_ID` ASC) VISIBLE,
  INDEX `fk_Courses_has_Courses_Courses5_idx` (`Course_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Courses_has_Courses_Courses5`
    FOREIGN KEY (`Course_ID`)
    REFERENCES `PlanIt`.`Courses` (`UniqueCourseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Courses_has_Courses_Courses6`
    FOREIGN KEY (`Prereq_ID`)
    REFERENCES `PlanIt`.`Courses` (`UniqueCourseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PlanIt`.`Prerequisites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PlanIt`.`Prerequisites` (
  `Course_ID` INT NOT NULL,
  `Prereq_ID` INT NOT NULL,
  `Year_Added` YEAR(4) NOT NULL,
  `Year_Removed` YEAR(4) NULL,
  PRIMARY KEY (`Course_ID`, `Prereq_ID`),
  INDEX `fk_Courses_has_Courses_Courses6_idx` (`Prereq_ID` ASC) VISIBLE,
  INDEX `fk_Courses_has_Courses_Courses5_idx` (`Course_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Courses_has_Courses_Courses5`
    FOREIGN KEY (`Course_ID`)
    REFERENCES `PlanIt`.`Courses` (`UniqueCourseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Courses_has_Courses_Courses6`
    FOREIGN KEY (`Prereq_ID`)
    REFERENCES `PlanIt`.`Courses` (`UniqueCourseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
