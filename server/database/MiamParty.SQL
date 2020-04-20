create database if not exists miampartytest;
use miampartytest;
# -----------------------------------------------------------------------------
#       table : cooking_level
# -----------------------------------------------------------------------------

create table if not exists cooking_level
 (
   id_cooking_level smallint not null auto_increment ,
   description varchar(100) not null  
   , primary key (id_cooking_level) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       table : account_type
# -----------------------------------------------------------------------------

create table if not exists account_type
 (
   id_account_type smallint not null auto_increment ,
   description varchar(100) not null  
   , primary key (id_account_type) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       table : account
# -----------------------------------------------------------------------------

create table if not exists account
 (
   id_account smallint not null auto_increment ,
   id_account_type smallint not null  ,
   email varchar(128) not null unique  ,
   password varchar(256) not null  ,
   salt varchar(256) not null
   , primary key (id_account) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       table : mark
# -----------------------------------------------------------------------------

create table if not exists mark
 (
   id_mark smallint not null auto_increment ,
   id_account smallint not null  ,
   id_party smallint not null  ,
   description varchar(100) null  
   , primary key (id_mark) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       table : party
# -----------------------------------------------------------------------------

create table if not exists party
 (
   id_party smallint not null auto_increment ,
   id_account smallint not null  ,
   id_status smallint not null  ,
   party_date datetime not null  ,
   price decimal(10,2) not null  ,
   nb_address smallint not null  ,
   street varchar(50) not null  ,
   city varchar(50) not null  ,
   postal_code varchar(8) not null  ,
   country varchar(50) not null  ,
   nb_guests smallint not null  ,
   picture longblob null  ,
   description varchar(100) null  
   , primary key (id_party) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       table : professional
# -----------------------------------------------------------------------------

create table if not exists professional
 (
   id_professional smallint not null auto_increment ,
   id_account smallint not null  ,
   name char(32) not null  ,
   nb_address smallint null  ,
   street varchar(50) null  ,
   city varchar(50) null  ,
   postal_code varchar(8) null  ,
   country varchar(50) null  
   , primary key (id_professional) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       table : particular
# -----------------------------------------------------------------------------

create table if not exists particular
 (
   id_particular smallint not null auto_increment ,
   id_account smallint not null  ,
   id_cooking_level smallint not null  ,
   firstname varchar(50) not null  ,
   lastname varchar(50) not null  ,
   birthday date null  ,
   sex bool null  ,
   nb_address smallint null  ,
   street varchar(50) null  ,
   city varchar(50) null  ,
   postal_code varchar(8) null  ,
   country varchar(50) null  
   , primary key (id_particular) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       table : status
# -----------------------------------------------------------------------------

create table if not exists status
 (
   id_status smallint not null auto_increment ,
   description varchar(50) not null  
   , primary key (id_status) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       table : reservation
# -----------------------------------------------------------------------------

create table if not exists reservation
 (
   id_account smallint not null auto_increment ,
   id_party smallint not null  ,
   nb_places smallint not null  
   , primary key (id_account,id_party) 
 ) 
 comment = "";


# -----------------------------------------------------------------------------
#       creation des references de table
# -----------------------------------------------------------------------------


alter table account 
  add foreign key fk_account_account_type (id_account_type)
      references account_type (id_account_type) ;


alter table mark 
  add foreign key fk_mark_account (id_account)
      references account (id_account) ;


alter table mark 
  add foreign key fk_mark_party (id_party)
      references party (id_party) ;


alter table party 
  add foreign key fk_party_account (id_account)
      references account (id_account) ;


alter table party 
  add foreign key fk_party_status (id_status)
      references status (id_status) ;


alter table professional 
  add foreign key fk_professional_account (id_account)
      references account (id_account) ;


alter table particular 
  add foreign key fk_particular_account (id_account)
      references account (id_account) ;


alter table particular 
  add foreign key fk_particular_cooking_level (id_cooking_level)
      references cooking_level (id_cooking_level) ;


alter table reservation 
  add foreign key fk_reservation_account (id_account)
      references account (id_account) ;


alter table reservation 
  add foreign key fk_reservation_party (id_party)
      references party (id_party) ;

