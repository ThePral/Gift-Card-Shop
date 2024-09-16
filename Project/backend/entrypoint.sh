#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py flush --no-input
python manage.py makemigrations myapi
python manage.py migrate
python manage.py loaddata /usr/src/backend/fixtures/groups
python manage.py loaddata /usr/src/backend/fixtures/categories
python manage.py loaddata /usr/src/backend/fixtures/products
python manage.py loaddata /usr/src/backend/fixtures/items
python manage.py createsuperuser --noinput

exec "$@"