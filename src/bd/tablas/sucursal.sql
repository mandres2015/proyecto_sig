--------------------------------------------------------
-- Archivo creado  - s�bado-agosto-03-2019
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table SUCURSAL
--------------------------------------------------------
CREATE TABLE "SYSTEM"."SUCURSAL" (
  "NOMBRE" VARCHAR2(100 BYTE),
  "DIRECCION" VARCHAR2(255 BYTE),
  "TELEFONO" VARCHAR2(13 BYTE),
  "CIUDAD" VARCHAR2(200 BYTE)
) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING STORAGE(
  INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
) TABLESPACE "SYSTEM";
REM INSERTING into SYSTEM.SUCURSAL
SET
  DEFINE OFF;
Insert into
  SYSTEM.SUCURSAL (NOMBRE, DIRECCION, TELEFONO, CIUDAD)
values
  ('MATRIZ', 'MACHALA', '2912345', 'MACHALA');
--------------------------------------------------------
  --  DDL for Index SYS_C007006
  --------------------------------------------------------
  CREATE UNIQUE INDEX "SYSTEM"."SYS_C007006" ON "SYSTEM"."SUCURSAL" ("NOMBRE") PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM";
--------------------------------------------------------
  --  Constraints for Table SUCURSAL
  --------------------------------------------------------
ALTER TABLE
  "SYSTEM"."SUCURSAL"
ADD
  PRIMARY KEY ("NOMBRE") USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM" ENABLE;
ALTER TABLE
  "SYSTEM"."SUCURSAL"
MODIFY
  ("NOMBRE" NOT NULL ENABLE);
