image = cursor-education/website:dev
container = cursor-website
make = docker run --rm -v $PWD:/build -w /build node:5 make $1

all: test

test:
	$(call make,test)

ssh:
	@docker exec -i -t ${container} bash

.PHONY: all test
