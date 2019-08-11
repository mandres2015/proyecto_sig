--------------------------------------------------------
-- Archivo creado  - s�bado-agosto-03-2019
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table PRODUCTO
--------------------------------------------------------
CREATE TABLE "SYSTEM"."PRODUCTO" (
  "ID" VARCHAR2(15 BYTE),
  "NOMBRE" VARCHAR2(100 BYTE),
  "DESCRIPCION" VARCHAR2(255 BYTE),
  "PRECIO" NUMBER(*, 2),
  "CANTIDAD_STOCK" NUMBER(*, 2),
  "ESTADO" CHAR(1 BYTE),
  "SUCURSAL" VARCHAR2(100 BYTE),
  "CATEGORIA" VARCHAR2(200 BYTE),
  "U_MEDIDA" NUMBER(*, 0),
  "PROVEEDOR" VARCHAR2(255 BYTE)
) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING STORAGE(
  INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
) TABLESPACE "SYSTEM";
REM INSERTING into SYSTEM.PRODUCTO
SET
  DEFINE OFF;
Insert into
  SYSTEM.PRODUCTO (
    ID,
    NOMBRE,
    DESCRIPCION,
    PRECIO,
    CANTIDAD_STOCK,
    ESTADO,
    SUCURSAL,
    CATEGORIA,
    U_MEDIDA,
    PROVEEDOR
  )
values
  (
    '003',
    'TORNILLO',
    'PARA HACER HUECPS',
    '99,99',
    '15',
    '1',
    'MATRIZ',
    'HERRAMIENTA',
    '3',
    'BLACK AND DECKER'
  );
Insert into
  SYSTEM.PRODUCTO (
    ID,
    NOMBRE,
    DESCRIPCION,
    PRECIO,
    CANTIDAD_STOCK,
    ESTADO,
    SUCURSAL,
    CATEGORIA,
    U_MEDIDA,
    PROVEEDOR
  )
values
  (
    '001',
    'TALADRO',
    'PARA HACER HUECPS',
    '99,99',
    '4',
    '1',
    'MATRIZ',
    'HERRAMIENTA',
    '3',
    'BLACK AND DECKER'
  );
Insert into
  SYSTEM.PRODUCTO (
    ID,
    NOMBRE,
    DESCRIPCION,
    PRECIO,
    CANTIDAD_STOCK,
    ESTADO,
    SUCURSAL,
    CATEGORIA,
    U_MEDIDA,
    PROVEEDOR
  )
values
  (
    '002',
    'MESA',
    'PARA HACER HUECPS',
    '99,99',
    '12',
    '1',
    'MATRIZ',
    'HERRAMIENTA',
    '3',
    'BLACK AND DECKER'
  );
Insert into
  SYSTEM.PRODUCTO (
    ID,
    NOMBRE,
    DESCRIPCION,
    PRECIO,
    CANTIDAD_STOCK,
    ESTADO,
    SUCURSAL,
    CATEGORIA,
    U_MEDIDA,
    PROVEEDOR
  )
values
  (
    '004',
    'MARTILLO',
    'PARA HACER HUECPS',
    '99,99',
    '15',
    '1',
    'MATRIZ',
    'HERRAMIENTA',
    '3',
    'BLACK AND DECKER'
  );
--------------------------------------------------------
  --  DDL for Index SYS_C007048
  --------------------------------------------------------
  CREATE UNIQUE INDEX "SYSTEM"."SYS_C007048" ON "SYSTEM"."PRODUCTO" ("ID") PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM";
--------------------------------------------------------
  --  Constraints for Table PRODUCTO
  --------------------------------------------------------
ALTER TABLE
  "SYSTEM"."PRODUCTO"
ADD
  PRIMARY KEY ("ID") USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM" ENABLE;
ALTER TABLE
  "SYSTEM"."PRODUCTO"
MODIFY
  ("ID" NOT NULL ENABLE);