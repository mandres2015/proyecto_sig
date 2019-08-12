--------------------------------------------------------
-- Archivo creado  - s�bado-agosto-03-2019   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table CIUDAD
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."CIUDAD" 
   (	"NOMBRE" VARCHAR2(200 BYTE), 
	"PROVINCIA" VARCHAR2(200 BYTE)
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into SYSTEM.CIUDAD
SET DEFINE OFF;
Insert into SYSTEM.CIUDAD (NOMBRE,PROVINCIA) values ('MACHALA','EL ORO');
Insert into SYSTEM.CIUDAD (NOMBRE,PROVINCIA) values ('HUAQUILLAS','EL ORO');
Insert into SYSTEM.CIUDAD (NOMBRE,PROVINCIA) values ('PASAJE','EL ORO');
--------------------------------------------------------
--  DDL for Index SYS_C007003
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYSTEM"."SYS_C007003" ON "SYSTEM"."CIUDAD" ("NOMBRE") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table CIUDAD
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."CIUDAD" ADD PRIMARY KEY ("NOMBRE")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "SYSTEM"."CIUDAD" MODIFY ("PROVINCIA" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CIUDAD" MODIFY ("NOMBRE" NOT NULL ENABLE);
