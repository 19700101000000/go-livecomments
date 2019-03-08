package handle

import (
	"github.com/19700101000000/go-livecomments/live"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func NewLive(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"livekey": live.NewLiveKey(),
	})
}
