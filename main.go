package main

import (
	"github.com/19700101000000/go-livecomments/handle"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", handle.Index)
	r.GET("/api/newlive", handle.NewLive)

	r.Static("/js", "./assets/js")
	r.Static("/css", "./assets/css")

	r.LoadHTMLFiles("./templates/index.html")
	r.Run(":8080")
}
