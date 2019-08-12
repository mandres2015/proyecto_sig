--------------------------------------------------------
<<<<<<< HEAD
-- Archivo creado  - s�bado-agosto-03-2019
=======
-- Archivo creado  - s�bado-agosto-03-2019   
>>>>>>> c97c2ee50bccf9fe8f1ed05bdbb7b82fcd2d2b6d
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table CLIENTE
--------------------------------------------------------
<<<<<<< HEAD
CREATE TABLE "SYSTEM"."CLIENTE" (
  "IDENTIFICACION" VARCHAR2(13 BYTE),
  "NOMBRES" VARCHAR2(100 BYTE),
  "APELLIDOS" VARCHAR2(100 BYTE),
  "TELEFONO" VARCHAR2(13 BYTE),
  "DIRECCION" VARCHAR2(255 BYTE),
  "CORREO" VARCHAR2(200 BYTE),
  "CIUDAD" VARCHAR2(200 BYTE)
) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING STORAGE(
  INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
) TABLESPACE "SYSTEM";
REM INSERTING into SYSTEM.CLIENTE
SET
  DEFINE OFF;
Insert into
  SYSTEM.CLIENTE (
    IDENTIFICACION,
    NOMBRES,
    APELLIDOS,
    TELEFONO,
    DIRECCION,
    CORREO,
    CIUDAD
  )
values
  (
    '0704655182',
    'ALEX ANDRES',
    'RAMON BRITO',
    '0991190091',
    'URBANIZACION SANTA INES',
    'ALEX@GMAIL.COM',
    'MACHALA'
  );
Insert into
  SYSTEM.CLIENTE (
    IDENTIFICACION,
    NOMBRES,
    APELLIDOS,
    TELEFONO,
    DIRECCION,
    CORREO,
    CIUDAD
  )
values
  (
    '0702636150',
    'ALAXIS ARAMITA',
    'BRITO PESANTEZ',
    '09991190091',
    'BOLIVAR Y NAPOLEON MERA',
    'ALEXIS@GMAIL.COM',
    'PASAJE'
  );
--------------------------------------------------------
  --  DDL for Index SYS_C007009
  --------------------------------------------------------
  CREATE UNIQUE INDEX "SYSTEM"."SYS_C007009" ON "SYSTEM"."CLIENTE" ("IDENTIFICACION") PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM";
--------------------------------------------------------
  --  Constraints for Table CLIENTE
  --------------------------------------------------------
ALTER TABLE
  "SYSTEM"."CLIENTE"
ADD
  PRIMARY KEY ("IDENTIFICACION") USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS STORAGE(
    INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT
  ) TABLESPACE "SYSTEM" ENABLE;
ALTER TABLE
  "SYSTEM"."CLIENTE"
MODIFY
  ("IDENTIFICACION" NOT NULL ENABLE);
=======

  CREATE TABLE "SYSTEM"."CLIENTE" 
   (	"IDENTIFICACION" VARCHAR2(13 BYTE), 
	"NOMBRES" VARCHAR2(100 BYTE), 
	"APELLIDOS" VARCHAR2(100 BYTE), 
	"TELEFONO" VARCHAR2(13 BYTE), 
	"DIRECCION" VARCHAR2(255 BYTE), 
	"CORREO" VARCHAR2(200 BYTE), 
	"CIUDAD" VARCHAR2(200 BYTE)
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into SYSTEM.CLIENTE
SET DEFINE OFF;
Insert into SYSTEM.CLIENTE (IDENTIFICACION,NOMBRES,APELLIDOS,TELEFONO,DIRECCION,CORREO,CIUDAD) values ('0704655182','ALEX ANDRES','RAMON BRITO','0991190091','URBANIZACION SANTA INES','ALEX@GMAIL.COM','MACHALA');
Insert into SYSTEM.CLIENTE (IDENTIFICACION,NOMBRES,APELLIDOS,TELEFONO,DIRECCION,CORREO,CIUDAD) values ('0702636150','ALAXIS ARAMITA','BRITO PESANTEZ','09991190091','BOLIVAR Y NAPOLEON MERA','ALEXIS@GMAIL.COM','PASAJE');
--------------------------------------------------------
--  DDL for Index SYS_C007009
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYSTEM"."SYS_C007009" ON "SYSTEM"."CLIENTE" ("IDENTIFICACION") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table CLIENTE
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."CLIENTE" ADD PRIMARY KEY ("IDENTIFICACION")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "SYSTEM"."CLIENTE" MODIFY ("IDENTIFICACION" NOT NULL ENABLE);
>>>>>>> c97c2ee50bccf9fe8f1ed05bdbb7b82fcd2d2b6d
