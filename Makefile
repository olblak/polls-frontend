.PHONY: build run publish

IMAGE=olblak/polls-frontend
TAG = $(shell git rev-parse HEAD | cut -c1-6)


build: 
	npm run-script build
	docker build -t ${IMAGE}:${TAG} -t ${IMAGE}:latest . 

publish:
	docker push ${IMAGE}:${TAG}
	docker push ${IMAGE}:latest

