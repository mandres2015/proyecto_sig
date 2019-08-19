--------------------------------------------------------
-- Archivo creado  - s�bado-agosto-03-2019
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table UNIDAD_MEDIDA
--------------------------------------------------------
CREATE TABLE "SYSTEM"."UNIDAD_MEDIDA" (
  "ID" NUMBER(*, 0),
  "MEDIDA" VARCHAR2(40 BYTE),
  "ABREVIATURA" VARCHAR2(10 BYTE)
) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING STORAGE(
  INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
) TABLESPACE "SYSTEM";
REM INSERTING into SYSTEM.UNIDAD_MEDIDA
SET
  DEFINE OFF;
Insert into
  SYSTEM.UNIDAD_MEDIDA (ID, MEDIDA, ABREVIATURA)
values
  ('1', 'LIBRA', 'LB');
Insert into
  SYSTEM.UNIDAD_MEDIDA (ID, MEDIDA, ABREVIATURA)
values
  ('2', 'KILOGRAMO', 'KG');
Insert into
  SYSTEM.UNIDAD_MEDIDA (ID, MEDIDA, ABREVIATURA)
values
  ('3', 'UNIDAD', 'UN');
--------------------------------------------------------
  --  DDL for Index SYS_C007018
  --------------------------------------------------------
  CREATE UNIQUE INDEX "SYSTEM"."SYS_C007018" ON "SYSTEM"."UNIDAD_MEDIDA" ("ID") PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM";
--------------------------------------------------------
  --  Constraints for Table UNIDAD_MEDIDA
  --------------------------------------------------------
ALTER TABLE
  "SYSTEM"."UNIDAD_MEDIDA"
ADD
  PRIMARY KEY ("ID") USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM" ENABLE;
ALTER TABLE
  "SYSTEM"."UNIDAD_MEDIDA"
MODIFY
  ("ID" NOT NULL ENABLE);
