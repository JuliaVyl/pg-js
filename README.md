# Create postgresql table

```sql
CREATE TABLE public."table"
(
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "One" text COLLATE pg_catalog."default" NOT NULL,
    "Two" text COLLATE pg_catalog."default" NOT NULL,
    "Date" timestamp without time zone NOT NULL,
    CONSTRAINT table_pkey PRIMARY KEY ("ID")
)

TABLESPACE pg_default;

ALTER TABLE public."table"
    OWNER to postgres;
```
