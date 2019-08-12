--------------------------------------------------------
-- Archivo creado  - domingo-agosto-11-2019   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table USUARIO
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."USUARIO" 
   (	"CEDULA" VARCHAR2(15 BYTE), 
	"NOMBRE" VARCHAR2(100 BYTE), 
	"APELLIDO" VARCHAR2(100 BYTE), 
	"DIRECCION" VARCHAR2(150 BYTE), 
	"TELEFONO" VARCHAR2(20 BYTE), 
	"CORREO" VARCHAR2(100 BYTE), 
	"USUARIO" VARCHAR2(25 BYTE), 
	"CLAVE" VARCHAR2(255 BYTE), 
	"TIPO" VARCHAR2(20 BYTE)
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into SYSTEM.USUARIO
SET DEFINE OFF;
Insert into SYSTEM.USUARIO (CEDULA,NOMBRE,APELLIDO,DIRECCION,TELEFONO,CORREO,USUARIO,CLAVE,TIPO) values ('0702636150','Alexis','Brito','Bolivar y Ayacucho','2854715','aa@gmail.com','alexis','99FB2F48C6AF4761F904FC85F95EB56190E5D40B1F44EC3A9C1FA319','cashier');
Insert into SYSTEM.USUARIO (CEDULA,NOMBRE,APELLIDO,DIRECCION,TELEFONO,CORREO,USUARIO,CLAVE,TIPO) values ('fsdf','sdfs','dfs','dfs','sdf','sdf@mh.nb','mandres2016','1234','cashier');
Insert into SYSTEM.USUARIO (CEDULA,NOMBRE,APELLIDO,DIRECCION,TELEFONO,CORREO,USUARIO,CLAVE,TIPO) values ('0704655182','Alex','Ramon','Urbanizaci�n Santa In�s','2925201','aaramonb_est@utmachala.edu.ec','mandres2015','5CB49536C23062507E6BB6967EBED22615DEC556220FD7A8F5FBC240','admin');
--------------------------------------------------------
--  DDL for Index USUARIO_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYSTEM"."USUARIO_PK" ON "SYSTEM"."USUARIO" ("CEDULA") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table USUARIO
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."USUARIO" ADD CONSTRAINT "USUARIO_PK" PRIMARY KEY ("CEDULA")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "SYSTEM"."USUARIO" MODIFY ("CEDULA" NOT NULL ENABLE);
