package handle

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func NewLive(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"livekey": "New Live",
	})
}
