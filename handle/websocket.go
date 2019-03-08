package handle

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"gopkg.in/olahol/melody.v1"
	"time"
)

var m *melody.Melody

type StructMsg struct {
	Message string `json:"comment"`
	Date    string `json:"datetime"`
}

/* init Websocket Settings */
func InitWS() {
	m = melody.New()
	m.HandleMessage(func(s *melody.Session, msg []byte) {
		message := StructMsg{
			Message: string(msg),
			Date:    time.Now().Format("2006-01-02 15:04:05"),
		}
		json, err := json.Marshal(&message)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(string(json))

		m.BroadcastFilter(json, func(q *melody.Session) bool {
			return q.Request.URL.Path == s.Request.URL.Path
		})
	})

}

func WS(c *gin.Context) {
	m.HandleRequest(c.Writer, c.Request)
}
