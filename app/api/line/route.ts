//@ts-nocheck
import { NextResponse } from "next/server";
import { Client, MiddlewareConfig, WebhookEvent } from "@line/bot-sdk";

import axios from "axios";

const config: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(config);

async function loading(userId) {
  try {
    const response = await axios({
      method: "post",
      url: "https://api.line.me/v2/bot/chat/loading/start",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
      },
      data: { chatId: userId, loadingSeconds: 30 },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const events: WebhookEvent[] = body.events;
  try {
    await Promise.all(events.map(handleEvent));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function handleEvent(event: WebhookEvent) {
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }

  const userId = event.source.userId;
  const { replyToken, message } = event;
  const { text } = message;
  await loading(userId);

  await client.replyMessage(replyToken, {
    type: "text",
    text: `You said: ${text}`,
  });
}
