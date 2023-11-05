
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


-- TABLES

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "liabilities" (
    "id" SERIAL PRIMARY KEY,
    "liabilities_name" VARCHAR (80) NOT NULL,
    "liabilities_note" VARCHAR (200),
    "liabilities_value" INT NOT NULL,
    "liabilities_required" BOOLEAN DEFAULT false,
    "user_id" INT REFERENCES "user"
);

CREATE TABLE "assets" (
    "id" SERIAL PRIMARY KEY,
    "assets_name" VARCHAR (80) NOT NULL,
    "assets_note" VARCHAR (200),
    "assets_value" INT NOT NULL,
    "user_id" INT REFERENCES "user"
);

CREATE TABLE "favorites" (
    "id" SERIAL PRIMARY KEY,
    "favorites_name" VARCHAR (80) NOT NULL,
    "favorites_note" VARCHAR (200),
    "favorites_value" INT NOT NULL,
    "user_id" INT REFERENCES "user"
);


-- INSERTS

INSERT INTO "assets" ("assets_name", "assets_note", "assets_value", "user_id")
VALUES ('Paycheck one', 'Bi-Monthly', 1500, 1);

INSERT INTO "liabilities" ("liabilities_name", "liabilities_note", "liabilities_value",
"liabilities_required", "user_id") VALUES ('Mortgage', 'Principle payment minimum', 1200, true, 1);

INSERT INTO "favorites" ("favorites_name", "favorites_note", "favorites_value", "user_id")
VALUES ('Car Insurance', 'Every six months', 900, 1);



