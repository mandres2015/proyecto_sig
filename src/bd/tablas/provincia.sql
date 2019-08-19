--------------------------------------------------------
-- Archivo creado  - s�bado-agosto-03-2019
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table PROVINCIA
--------------------------------------------------------
CREATE TABLE "SYSTEM"."PROVINCIA" ("PROV_NOMBRE" VARCHAR2(200 BYTE)) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING STORAGE(
  INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
) TABLESPACE "SYSTEM";
REM INSERTING into SYSTEM.PROVINCIA
SET
  DEFINE OFF;
Insert into
  SYSTEM.PROVINCIA (PROV_NOMBRE)
values
  ('EL ORO');
Insert into
  SYSTEM.PROVINCIA (PROV_NOMBRE)
values
  ('GUAYAS');
--------------------------------------------------------
  --  DDL for Index SYS_C007000
  --------------------------------------------------------
  CREATE UNIQUE INDEX "SYSTEM"."SYS_C007000" ON "SYSTEM"."PROVINCIA" ("PROV_NOMBRE") PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM";
--------------------------------------------------------
  --  Constraints for Table PROVINCIA
  --------------------------------------------------------
ALTER TABLE
  "SYSTEM"."PROVINCIA"
ADD
  PRIMARY KEY ("PROV_NOMBRE") USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM" ENABLE;
ALTER TABLE
  "SYSTEM"."PROVINCIA"
MODIFY
  ("PROV_NOMBRE" NOT NULL ENABLE);
