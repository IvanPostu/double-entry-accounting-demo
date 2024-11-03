CREATE TABLE AccountStatement(
  AccountId NUMERIC NOT NULL,
  StatementDate DATETIME NOT NULL, -- first day of month
  ClosingBalance REAL,
  TotalCredit REAL,
  TotalDebit REAL,

  PRIMARY KEY (AccountId, StatementDate)
);

ALTER TABLE AccountStatement
ADD CONSTRAINT fk_AccountStatement_Account
FOREIGN KEY (AccountId)
REFERENCES Account(AccountId);
