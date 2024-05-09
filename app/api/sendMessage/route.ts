//@ts-nocheck
import { NextResponse } from "next/server";
import axios from "axios";

async function sendMessage(userUid, message) {
  try {
    const response = await axios({
      method: "post",
      url: "https://api.line.me/v2/bot/message/push",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
      },
      data: {
        to: userUid,
        messages: [
          {
            type: "text",
            text: message,
          },
        ],
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  const { userUid, message } = await request.json();
  console.log(userUid, message);
  try {
    await sendMessage(userUid, message);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// async function handleEvent(event: WebhookEvent) {
//   if (event.type !== "message" || event.message.type !== "text") {
//     return;
//   }

//   const userId = event.source.userId;
//   await sendMessage(userId);
// }
