Gift Card Shop with Django and React
==========================================
This is a simple gift shop website implemented using Django and React.

## Getting Started
### Prerequisites
- Python 3.10.12+
- Django 5.0+
- djangorestframework 3.14.0+
- Markdown 3.5.1+
- django-filter 23.5+
- psycopg2 2.9.9
- python-dotenv 1.0.0
- node 21.6.1+
- React 17.0.2+


### Run with Docker
1. Install Docker and Docker Compose
    - [Docker](https://docs.docker.com/get-docker/)
    - [Docker Compose](https://docs.docker.com/compose/install/)
2. Clone the repo
   ```sh
   git clone https://github.com/mahnooshr/Web-Team
    ```
3. Go to the project directory
    ```sh
    cd Web-Team/project
    ```
4. Create a `.env.dev` and add the following environment variables
    ```sh
    SECRET_KEY=your_secret_key
    DEBUG=True
    DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]

    DJANGO_SUPERUSER_USERNAME=your_username
    DJANGO_SUPERUSER_EMAIL=your_email
    DJANGO_SUPERUSER_PASSWORD=your_password

    SQL_ENGINE=django.db.backends.postgresql
    SQL_DATABASE=gshopdb
    SQL_USER=your_db_username
    SQL_PASSWORD=your_db_password
    SQL_HOST=db
    SQL_PORT=5432

    DATABASE=postgres
    BACKEND_HOST=localhost:8000

    ```
5. Build the docker image
    ```sh
    docker-compose build
    ```
6. Run the server
    ```sh
    docker-compose up
    ```
7. Open your browser and go to `http://localhost/`

### Run without Docker
1. Clone the repo
   ```sh
   git clone
    ```
2. Go to the backend directory
    ```sh
    cd Web-Team/project/backend
    ```
3. Create a virtual environment
    ```sh
    python3 -m venv venv
    ```
4. Activate the virtual environment
    ```sh
    source venv/bin/activate
    ```
5. Install the required packages
    ```sh
    pip install -r requirements.txt
    ```
6. Create a `.env` file and add the following environment variables
    ```sh
    SECRET_KEY=your_secret_key
    DEBUG=True
    DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]

    DJANGO_SUPERUSER_USERNAME=your_username
    DJANGO_SUPERUSER_EMAIL=your_email
    DJANGO_SUPERUSER_PASSWORD=your_password

    SQL_ENGINE=django.db.backends.postgresql
    SQL_DATABASE=gshopdb
    SQL_USER=your_db_username
    SQL_PASSWORD=your_db_password
    SQL_HOST=db
    SQL_PORT=5432

    DATABASE=postgres
    BACKEND_HOST=localhost:8000
    
    ```
7. Create the database
    ```sh
    python manage.py migrate
    ```
8. Create a superuser
    ```sh
    python manage.py createsuperuser
    ```
9. Run the server
    ```sh
    python manage.py runserver
    ```
10. Go to the frontend directory
    ```sh
    cd ../frontend
    ```
11. Install the required packages
    ```sh
    npm install
    ```
12. Run the frontend
    ```sh
    npm start
    ```
13. Open your browser and go to `http://localhost:3000/`

