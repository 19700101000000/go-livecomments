package live

import (
	"crypto/sha256"
	"fmt"
)

func NewLiveKey() string {
	// TODO change key.
	key := "newLive"
	return fmt.Sprintf("%x", sha256.Sum256([]byte(key)))
}
