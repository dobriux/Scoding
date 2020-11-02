## How to deploy

###### Software requirements
* PHP >= 7.3
* MySQL >= 5.7
* Nginx/Apache
* Composer
* NodeJs(Comes with Yarn)



###### Other
First rename **.env.example** to **.env**

Configure your database credentials in **.env**

Before using the project user must launch few commands.

Install php dependencies using:
```
composer install
```

Install node dependencies using:
```
yarn install
```

Compile js files:
```
yarn run production
```

Create tables in database:
```
php artisan migrate
```

Generate key:
```
php artisan key:generate
```

Install passport api keys:
```
php artisan passport:install
```
