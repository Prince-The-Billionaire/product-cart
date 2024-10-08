import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Red_Hat_Text } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import {store} from "@/state/store";

const redhat =  Red_Hat_Text({
  weight:["400","600","700"],
  subsets:["latin"]
})

export const metadata: Metadata = {
  title: "Dessert",
  description: "A shopping site for various dessert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={redhat.className}>{children}</body>
    </html>
  );
}
