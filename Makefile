.PHONY: all
all:
	tsc --module commonjs --outDir lib src/*.ts

publish: all
	npm publish