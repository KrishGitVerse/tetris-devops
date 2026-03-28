.PHONY: help install start start-server build test test-coverage clean docker-build docker-run docker-stop k8s-deploy k8s-delete

help:
	@echo "Usage: make <target>"
	@echo "  install        - Install dependencies"
	@echo "  start          - Start React dev server (port 3000)"
	@echo "  start-server   - Start Node.js server (port 3001)"
	@echo "  build          - Build for production"
	@echo "  test           - Run tests"
	@echo "  test-coverage  - Run tests with coverage"
	@echo "  clean          - Remove build files"

install:
	@echo "Installing dependencies..."
	cd app && npm install
	@echo "Done!"

start:
	cd app && npm run start:dev

start-server:
	cd app && npm start

build:
	cd app && npm run build

test:
	cd app && npm test

test-coverage:
	cd app && npm test -- --coverage

docker-build:
	docker build -f docker/Dockerfile -t tetris-devops:latest .

docker-run:
	docker run -d -p 3001:3001 --name tetris-devops tetris-devops:latest

docker-stop:
	docker stop tetris-devops && docker rm tetris-devops

k8s-deploy:
	kubectl apply -f k8s/

k8s-delete:
	kubectl delete -f k8s/

clean:
	rm -rf app/node_modules app/build app/coverage app/logs

docker-push:
	@source ../../.devops-secrets/dockerhub.env && \
	GIT_HASH=$$(git rev-parse --short HEAD) && \
	echo "$${DOCKERHUB_TOKEN}" | docker login --username "$${DOCKERHUB_USERNAME}" --password-stdin && \
	docker tag tetris-devops:latest $${DOCKERHUB_USERNAME}/tetris-devops:latest && \
	docker tag tetris-devops:latest $${DOCKERHUB_USERNAME}/tetris-devops:1.0.0 && \
	docker tag tetris-devops:latest $${DOCKERHUB_USERNAME}/tetris-devops:1.0.0-$${GIT_HASH} && \
	docker push $${DOCKERHUB_USERNAME}/tetris-devops:latest && \
	docker push $${DOCKERHUB_USERNAME}/tetris-devops:1.0.0 && \
	docker push $${DOCKERHUB_USERNAME}/tetris-devops:1.0.0-$${GIT_HASH}