//@ts-nocheck
import { Client, MiddlewareConfig, WebhookEvent } from "@line/bot-sdk";

const config: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(config);

export const handleLineWebhook = async (events: WebhookEvent[]) => {
  try {
    await Promise.all(
      events.map(async (event) => {
        // Your bot logic here
        await client.replyMessage(event.replyToken, {
          type: "text",
          text: "Hello, LINE!",
        });
      })
    );
  } catch (err) {
    console.error(err);
  }
};
