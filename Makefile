copyTemplates:
	cp ./vue-livecomments/dist/index.html ./templates/
	cp ./vue-livecomments/dist/css/* ./assets/css/
	cp ./vue-livecomments/dist/js/* ./assets/js/
removeTemplates:
	rm ./templates/*
	rm ./assets/js/*
	rm ./assets/css/*
buildToStart:
	cd ./vue-livecomments/ && npm run build
	make copyTemplates
	go run main.go

initNpm:
	cd ./vue-livecomments/ && npm install && npm run build
