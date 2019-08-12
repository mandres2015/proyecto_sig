--------------------------------------------------------
<<<<<<< HEAD
-- Archivo creado  - s�bado-agosto-03-2019
=======
-- Archivo creado  - s�bado-agosto-03-2019   
>>>>>>> c97c2ee50bccf9fe8f1ed05bdbb7b82fcd2d2b6d
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table FORMA_DE_PAGO
--------------------------------------------------------
<<<<<<< HEAD
CREATE TABLE "SYSTEM"."FORMA_DE_PAGO" (
  "ID" NUMBER(*, 0),
  "NOMBRE" VARCHAR2(40 BYTE),
  "DESCRIPCION" VARCHAR2(200 BYTE),
  "ESTADO" CHAR(1 BYTE)
) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING STORAGE(
  INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
) TABLESPACE "SYSTEM";
REM INSERTING into SYSTEM.FORMA_DE_PAGO
SET
  DEFINE OFF;
Insert into
  SYSTEM.FORMA_DE_PAGO (ID, NOMBRE, DESCRIPCION, ESTADO)
values
  ('1', 'EFECTIVO', 'PAGO DE CONTADO', '1');
Insert into
  SYSTEM.FORMA_DE_PAGO (ID, NOMBRE, DESCRIPCION, ESTADO)
values
  (
    '2',
    'TARJETA DE CREDITO',
    'PAGO MEDIANTE TARJETA DE CREDITO',
    '1'
  );
--------------------------------------------------------
  --  DDL for Index SYS_C007014
  --------------------------------------------------------
  CREATE UNIQUE INDEX "SYSTEM"."SYS_C007014" ON "SYSTEM"."FORMA_DE_PAGO" ("ID") PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM";
--------------------------------------------------------
  --  Constraints for Table FORMA_DE_PAGO
  --------------------------------------------------------
ALTER TABLE
  "SYSTEM"."FORMA_DE_PAGO"
ADD
  PRIMARY KEY ("ID") USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM" ENABLE;
=======

  CREATE TABLE "SYSTEM"."FORMA_DE_PAGO" 
   (	"ID" NUMBER(*,0), 
	"NOMBRE" VARCHAR2(40 BYTE), 
	"DESCRIPCION" VARCHAR2(200 BYTE), 
	"ESTADO" CHAR(1 BYTE)
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into SYSTEM.FORMA_DE_PAGO
SET DEFINE OFF;
Insert into SYSTEM.FORMA_DE_PAGO (ID,NOMBRE,DESCRIPCION,ESTADO) values ('1','EFECTIVO','PAGO DE CONTADO','1');
Insert into SYSTEM.FORMA_DE_PAGO (ID,NOMBRE,DESCRIPCION,ESTADO) values ('2','TARJETA DE CREDITO','PAGO MEDIANTE TARJETA DE CREDITO','1');
--------------------------------------------------------
--  DDL for Index SYS_C007014
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYSTEM"."SYS_C007014" ON "SYSTEM"."FORMA_DE_PAGO" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table FORMA_DE_PAGO
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."FORMA_DE_PAGO" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
>>>>>>> c97c2ee50bccf9fe8f1ed05bdbb7b82fcd2d2b6d
