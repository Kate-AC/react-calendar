t=

.PHONY: command
command:
ifdef t
	docker-compose run --rm app $(t)
endif

.PHONY: docker-build
docker-build:
	docker-compose build --no-cache

.PHONY: build
build:
	docker-compose run --rm app npm run build:static

.PHONY: run
run:
	docker-compose up

.PHONY: down
down:
	docker-compose down

.PHONY: npm
npm:
ifdef t
	docker-compose run --rm app npm $(t)
endif

.PHONY: test
test:
	docker-compose exec app npm run test

.PHONY: lint
lint:
	docker-compose exec app npm run lint

.PHONY: lint-fix
lint-fix:
	docker-compose exec app npm run lint:fix

.PHONY: install
install:
	docker-compose run --rm app npm install
