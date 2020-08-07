BEGIN;

-- basic table for managing schema migration
CREATE TABLE cm__schema_history (
  version       SERIAL PRIMARY KEY,
  description   TEXT,
  installed_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);

INSERT INTO cm__schema_history (description) VALUES ('Career Model Core Schema: DDL');

CREATE TABLE cm__careers (
  oid     SERIAL PRIMARY KEY,
  name    VARCHAR NOT NULL UNIQUE
);

CREATE TABLE cm__areas (
  oid     SERIAL PRIMARY KEY,
  name    VARCHAR NOT NULL UNIQUE
);

CREATE TABLE cm__career2competency_areas (
  oid     SERIAL PRIMARY KEY,
  career  INTEGER
      REFERENCES cm__careers (oid)
      ON DELETE CASCADE,
  area    INTEGER
      REFERENCES cm__areas (oid)
      ON DELETE CASCADE
);

CREATE TABLE cm__competencies (
  oid     SERIAL PRIMARY KEY,
  name    VARCHAR NOT NULL UNIQUE
);

CREATE TABLE cm__competency2competency_areas (
  oid         SERIAL PRIMARY KEY,
  competency  INTEGER
      REFERENCES cm__competencies (oid)
      ON DELETE CASCADE,
  area        INTEGER
      REFERENCES cm__areas (oid)
      ON DELETE CASCADE
);
