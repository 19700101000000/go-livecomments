copyHTML:
	cp ./vue-livecomments/dist/index.html ./templates/
	cp ./vue-livecomments/dist/css/* ./assets/css/
	cp ./vue-livecomments/dist/js/* ./assets/js/
removeAssets:
	rm ./assets/js/*
	rm ./assets/css/*
buildToStart:
	cd ./vue-livecomments/ && npm run build
	make copyHTML
	go run main.go
