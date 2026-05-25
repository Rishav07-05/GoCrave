#!/bin/bash
# Wrapper to run php artisan with SQLite extension loaded
SQLITE_EXT="$(dirname "$0")/_tmp_deb/usr/lib/php/20230831/pdo_sqlite.so"
exec php -d "extension=$SQLITE_EXT" artisan "$@"
