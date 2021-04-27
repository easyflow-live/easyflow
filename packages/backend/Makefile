include .env
SHELL := /bin/bash # Use bash syntax

up:
	docker-compose up -d

stop:
	docker-compose stop

clean:
	docker-compose down -v --remove-orphans

console:
	./node_modules/.bin/hasura console --address 0.0.0.0 --admin-secret "secret"

seed:
	./node_modules/.bin/hasura seeds apply --admin-secret "secret" --database-name default

create-seed:
	./node_modules/.bin/hasura seeds create "$(table)_seed" --from-table $(table) --admin-secret "secret" --database-name default

squash-migrations:
	./node_modules/.bin/hasura migrate squash --name $(name) --from $(from) --admin-secret "secret" --database-name default

# vercel-init:
# 	npm run vercel -t $(VERCEL_TOKEN) -S $(VERCEL_TEAM) -c
