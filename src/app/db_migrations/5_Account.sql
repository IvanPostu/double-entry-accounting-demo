CREATE TABLE Account(
  AccountId NUMERIC PRIMARY KEY AUTOINCREMENT,
  AccountType_Ext CHAR(2),
  EntityType CHAR(1) DEFAULT 'P',
  FirstName TEXT,
  LastName TEXT,
  Initial TEXT,
  BirthDate DATE,
  BirthState TEXT,

  CreatedAt DATETIME,
  UpdatedAt DATETIME
);

ALTER TABLE Account
ADD CONSTRAINT fk_Account_AccountType_Ext
FOREIGN KEY (AccountType_Ext)
REFERENCES AccountType_Ext(AccountType_Ext);
