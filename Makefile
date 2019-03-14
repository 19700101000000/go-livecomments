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

init:
	mkdir templates
	mkdir assets
	mkdir assets/css
	mkdir assets/js
	cp live/key.go.tmp live/key.go
	cd ./vue-livecomments/ && npm install

