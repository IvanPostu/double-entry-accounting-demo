CREATE TABLE AccountType_Ext(
   AccountType_Ext   CHAR(2) PRIMARY KEY NOT NULL,
   XactTypeCode      CHAR(2) NOT NULL,
   Fee               REAL    NOT NULL,
   Description       TEXT    NOT NULL
);

ALTER TABLE AccountType_Ext
ADD CONSTRAINT fk_TransactionType_DE_XactTypeCode
FOREIGN KEY (XactTypeCode)
REFERENCES TransactionType_DE(XactTypeCode);
