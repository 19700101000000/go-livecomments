copyHTML: rmAssets
	cp ./vue-livecomments/dist/index.html ./templates/
	cp ./vue-livecomments/dist/css/* ./assets/css/
	cp ./vue-livecomments/dist/js/* ./assets/js/
rmAssets:
	rm ./assets/js/*
	rm ./assets/css/*
