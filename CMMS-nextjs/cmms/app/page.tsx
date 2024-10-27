"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
export default function Home() {

  const router = useRouter();

  return (
    <div>
      <Header/>
      <Button onClick={() => router.push("/login")}> Login</Button>
    </div>
  );
}
