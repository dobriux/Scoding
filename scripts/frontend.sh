#!/bin/bash
cd ./scripts || echo "Docker folder must be called 'scripts'"
docker-compose run -w "/code" symfony.node bash
