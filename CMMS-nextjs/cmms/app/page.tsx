"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import HomePage from "./(client)/home/home";
import Footer from "@/components/footer/footer";

export default function Home() {

  const router = useRouter();

  return (
    <div>
      <Header/>
      {/* <Button onClick={() => router.push("/login")}> Login</Button> */}
      <HomePage/>
      <Footer/>
    </div>
  );
}
