package handle

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"gopkg.in/olahol/melody.v1"
	"time"
)

var m *melody.Melody

type ResMsg struct {
	Message string `json:"comment"`
	Date    string `json:"datetime"`
	Top     int64  `json:"top"`
}
type ReqMsg struct {
	Message string `json:"comment"`
}

/* init Websocket Settings */
func InitWS() {
	m = melody.New()
	m.HandleMessage(func(s *melody.Session, msg []byte) {
		if string(msg) == "ping" {
			s.Write([]byte("ping"))
			return
		}

		req := ReqMsg{}
		err := json.Unmarshal(msg, &req)
		if err != nil {
			fmt.Println(err)
			return
		}

		now := time.Now()
		message := ResMsg{
			Message: req.Message,
			Date:    now.Format("2006-01-02 15:04:05"),
			Top:     now.UnixNano() % 80,
		}
		json, err := json.Marshal(&message)
		if err != nil {
			fmt.Println(err)
		}
		m.BroadcastFilter(json, func(q *melody.Session) bool {
			return q.Request.URL.Path == s.Request.URL.Path
		})
	})

}

func WS(c *gin.Context) {
	m.HandleRequest(c.Writer, c.Request)
}
