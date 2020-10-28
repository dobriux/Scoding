#!/bin/bash
cd ./scripts || echo "Docker folder must be called 'scripts'"
docker-compose run symfony.mysql bash -c "mysql -u symfony -p68V3wwuCQUUC67Kh -h symfony.mysql"