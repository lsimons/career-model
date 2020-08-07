BEGIN;
SELECT plan( 1 );

-- schema_history tests
SELECT cmp_ok(count(*), '>=', 1::bigint,
    'We are keeping track of schema history')
FROM cm__schema_history;


SELECT * FROM finish();
ROLLBACK;
