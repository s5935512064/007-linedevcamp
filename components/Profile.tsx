"use client";

import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
interface Props {}

interface Profile {
  displayName: string;
  pictureUrl: string;
  statusMessage: string;
  userId: string;
}

const Profile: FC<Props> = (): JSX.Element => {
  const [profile, setProfile] = useState<Profile>();

  const sendMessage = async () => {
    try {
      const data = {
        userUid: profile?.userId!,
        message: "ส่งจาก LIFF",
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/sendMessage`,
        data
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    async function getProfile() {
      const liff = (await import("@line/liff")).default;
      await liff.ready;
      const profileFetch = await liff
        .getProfile()
        .then((resulte: Profile | any) => {
          setProfile(resulte);
        });
    }

    getProfile();
  }, [profile]);

  return (
    <>
      <div className="w-28 h-28 rounded-full overflow-hidden shrink-0">
        <Image
          src={profile?.pictureUrl!}
          alt="profile"
          sizes="100vw"
          width={0}
          height={0}
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="w-full h-full"
        />
      </div>
      <p>{profile?.displayName!}</p>
      <p className="text-sm">{profile?.statusMessage!}</p>

      <button
        type="button"
        onClick={sendMessage}
        className="bg-black px-4 py-2 text-white rounded-md "
      >
        Send Message
      </button>
    </>
  );
};

export default Profile;
