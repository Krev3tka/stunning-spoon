package websocket

import (
	"encoding/json"
	"log/slog"

	"github.com/Krev3tka/stunning-spoon/server/internal/models"
)

func (c *Client) handleEvent(data []byte) {
	var ev models.Event
	if err := json.Unmarshal(data, &ev); err != nil {
		slog.Error("invalid event format", "err", err)
		return
	}

	switch ev.Type {
	case "MOVE_TOKEN":
		c.processMoveToken(ev.Payload)
	case "CHAT_MSG":
		c.processChat(ev.Payload)
	default:
		slog.Warn("unknown event type", "type", ev.Type)
	}
}
