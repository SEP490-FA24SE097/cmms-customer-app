"use server";
import Header from "@/components/header/header";
import HomePage from "./home/home";
import { getMaterials } from "@/lib/actions/materials/action/material-action";

export default async function Home() {


  // console.log(material.data);
  return (
    <div>
      <HomePage />
    </div>
  );
}

// note servire side thì ko dc sử dụng các hook
