CREATE TABLE EntityType(
  EntityType CHAR(1) PRIMARY KEY NOT NULL,
  Name TEXT
);

ALTER TABLE Account
ADD CONSTRAINT fk_Account_EntityType
FOREIGN KEY (EntityType)
REFERENCES EntityType(EntityType);
