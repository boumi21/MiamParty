CREATE DATABASE IF NOT EXISTS MiamPartyTest;
USE MiamPartyTest;
# -----------------------------------------------------------------------------
#       TABLE : COOKING_LEVEL
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS COOKING_LEVEL
 (
   ID_COOKING_LEVEL SMALLINT NOT NULL AUTO_INCREMENT ,
   DESCRIPTION VARCHAR(100) NOT NULL  
   , PRIMARY KEY (ID_COOKING_LEVEL) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : ACCOUNT_TYPE
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ACCOUNT_TYPE
 (
   ID_ACCOUNT_TYPE SMALLINT NOT NULL AUTO_INCREMENT ,
   DESCRIPTION VARCHAR(100) NOT NULL  
   , PRIMARY KEY (ID_ACCOUNT_TYPE) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : ACCOUNT
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ACCOUNT
 (
   ID_ACCOUNT SMALLINT NOT NULL AUTO_INCREMENT ,
   ID_ACCOUNT_TYPE SMALLINT NOT NULL  ,
   USERNAME VARCHAR(32) NOT NULL  ,
   PASSWORD VARCHAR(256) NOT NULL  ,
   HASH VARCHAR(256) NOT NULL  ,
   EMAIL VARCHAR(128) NOT NULL  ,
   CREATION_DATE DATETIME NOT NULL  ,
   LAST_ACCESS DATETIME NOT NULL  
   , PRIMARY KEY (ID_ACCOUNT) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : MARK
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS MARK
 (
   ID_MARK SMALLINT NOT NULL AUTO_INCREMENT ,
   ID_ACCOUNT SMALLINT NOT NULL  ,
   ID_PARTY SMALLINT NOT NULL  ,
   DESCRIPTION VARCHAR(100) NULL  
   , PRIMARY KEY (ID_MARK) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : PARTY
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS PARTY
 (
   ID_PARTY SMALLINT NOT NULL AUTO_INCREMENT ,
   ID_ACCOUNT SMALLINT NOT NULL  ,
   ID_STATUS SMALLINT NOT NULL  ,
   PARTY_DATE DATETIME NOT NULL  ,
   PRICE DECIMAL(10,2) NOT NULL  ,
   NB_ADDRESS SMALLINT NOT NULL  ,
   STREET VARCHAR(50) NOT NULL  ,
   CITY VARCHAR(50) NOT NULL  ,
   POSTAL_CODE VARCHAR(8) NOT NULL  ,
   COUNTRY VARCHAR(50) NOT NULL  ,
   NB_GUESTS SMALLINT NOT NULL  ,
   PICTURE LONGBLOB NULL  ,
   DESCRIPTION VARCHAR(100) NULL  
   , PRIMARY KEY (ID_PARTY) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : PROFESSIONAL
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS PROFESSIONAL
 (
   ID_PROFESSIONAL SMALLINT NOT NULL AUTO_INCREMENT ,
   ID_ACCOUNT SMALLINT NOT NULL  ,
   NAME CHAR(32) NOT NULL  ,
   NB_ADDRESS SMALLINT NULL  ,
   STREET VARCHAR(50) NULL  ,
   CITY VARCHAR(50) NULL  ,
   POSTAL_CODE VARCHAR(8) NULL  ,
   COUNTRY VARCHAR(50) NULL  
   , PRIMARY KEY (ID_PROFESSIONAL) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : PARTICULAR
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS PARTICULAR
 (
   ID_PARTICULAR SMALLINT NOT NULL AUTO_INCREMENT ,
   ID_ACCOUNT SMALLINT NOT NULL  ,
   ID_COOKING_LEVEL SMALLINT NOT NULL  ,
   FIRSTNAME VARCHAR(50) NOT NULL  ,
   LASTNAME VARCHAR(50) NOT NULL  ,
   BIRTHDAY DATE NULL  ,
   SEX BOOL NULL  ,
   NB_ADDRESS SMALLINT NULL  ,
   STREET VARCHAR(50) NULL  ,
   CITY VARCHAR(50) NULL  ,
   POSTAL_CODE VARCHAR(8) NULL  ,
   COUNTRY VARCHAR(50) NULL  
   , PRIMARY KEY (ID_PARTICULAR) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : STATUS
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS STATUS
 (
   ID_STATUS SMALLINT NOT NULL AUTO_INCREMENT ,
   DESCRIPTION VARCHAR(50) NOT NULL  
   , PRIMARY KEY (ID_STATUS) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : RESERVATION
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS RESERVATION
 (
   ID_ACCOUNT SMALLINT NOT NULL AUTO_INCREMENT ,
   ID_PARTY SMALLINT NOT NULL  ,
   NB_PLACES SMALLINT NOT NULL  
   , PRIMARY KEY (ID_ACCOUNT,ID_PARTY) 
 ) 
 comment = "";


# -----------------------------------------------------------------------------
#       CREATION DES REFERENCES DE TABLE
# -----------------------------------------------------------------------------


ALTER TABLE ACCOUNT 
  ADD FOREIGN KEY FK_ACCOUNT_ACCOUNT_TYPE (ID_ACCOUNT_TYPE)
      REFERENCES ACCOUNT_TYPE (ID_ACCOUNT_TYPE) ;


ALTER TABLE MARK 
  ADD FOREIGN KEY FK_MARK_ACCOUNT (ID_ACCOUNT)
      REFERENCES ACCOUNT (ID_ACCOUNT) ;


ALTER TABLE MARK 
  ADD FOREIGN KEY FK_MARK_PARTY (ID_PARTY)
      REFERENCES PARTY (ID_PARTY) ;


ALTER TABLE PARTY 
  ADD FOREIGN KEY FK_PARTY_ACCOUNT (ID_ACCOUNT)
      REFERENCES ACCOUNT (ID_ACCOUNT) ;


ALTER TABLE PARTY 
  ADD FOREIGN KEY FK_PARTY_STATUS (ID_STATUS)
      REFERENCES STATUS (ID_STATUS) ;


ALTER TABLE PROFESSIONAL 
  ADD FOREIGN KEY FK_PROFESSIONAL_ACCOUNT (ID_ACCOUNT)
      REFERENCES ACCOUNT (ID_ACCOUNT) ;


ALTER TABLE PARTICULAR 
  ADD FOREIGN KEY FK_PARTICULAR_ACCOUNT (ID_ACCOUNT)
      REFERENCES ACCOUNT (ID_ACCOUNT) ;


ALTER TABLE PARTICULAR 
  ADD FOREIGN KEY FK_PARTICULAR_COOKING_LEVEL (ID_COOKING_LEVEL)
      REFERENCES COOKING_LEVEL (ID_COOKING_LEVEL) ;


ALTER TABLE RESERVATION 
  ADD FOREIGN KEY FK_RESERVATION_ACCOUNT (ID_ACCOUNT)
      REFERENCES ACCOUNT (ID_ACCOUNT) ;


ALTER TABLE RESERVATION 
  ADD FOREIGN KEY FK_RESERVATION_PARTY (ID_PARTY)
      REFERENCES PARTY (ID_PARTY) ;

