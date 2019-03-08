package main

import (
	"github.com/19700101000000/go-livecomments/handle"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	handle.InitWS()

	/* web pages */
	r.GET("/", handle.Index)
	r.GET("/live", handle.Index)
	r.GET("/comment/:id", handle.Index)
	r.Static("/js", "./assets/js")
	r.Static("/css", "./assets/css")

	/* json api */
	r.GET("/api/newlive", handle.NewLive)
	/* websocket */
	r.GET("/ws/:key", handle.WS)

	r.LoadHTMLFiles("./templates/index.html")
	r.Run(":8080")
}
