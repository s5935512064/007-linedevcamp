import Image from "next/image";
import Profile from "@/components/Profile";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-10 md:p-6">
      <Profile />
    </main>
  );
}
