---
sidebar_position: 4
---

# Go (discordgo + net/http)

High performance implementation utilizing standard library HTTP parsing alongside `discordgo`.

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "github.com/bwmarrin/discordgo"
)

const (
    BotToken = "YOUR_BOT_TOKEN"
    BotliyAPIToken = "YOUR_Botliy_API_TOKEN"
    WebhookSecret = "your_webhook_secret_here"
    ChannelID = "123456789012345678"
)

type WebhookPayload struct {
    User string `json:"user"`
    Bot string `json:"bot"`
    Type string `json:"type"`
}

func main() {
    dg, _ := discordgo.New("Bot " + BotToken)
    dg.Open()

    http.HandleFunc("/Botliy/webhook", func(w http.ResponseWriter, r *http.Request) {
        if r.Header.Get("Authorization") != WebhookSecret {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }

        var p WebhookPayload
        json.NewDecoder(r.Body).Decode(&p)

        dg.ChannelMessageSendEmbed(ChannelID, &discordgo.MessageEmbed{
            Title: "🎉 New Vote Received!",
            Description: fmt.Sprintf("<@%s> just voted!", p.User),
            Color: 0x5865F2,
        })
        w.WriteHeader(http.StatusOK)
    })

    http.ListenAndServe(":8999", nil)
}
```
