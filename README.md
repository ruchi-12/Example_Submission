# Example_Submission
Submission


Copy the example env file and make the required configuration changes in the .env file
cp .env.example .env

Generate a new application key
php artisan key:generate

Run the database migrations (Set the database connection in .env before migrating)
php artisan migrate

Start the local development server
php artisan serve

Use local server address in react app
update .env file

