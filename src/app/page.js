"use client";
import { Analytics } from "@vercel/analytics/react";
import House from "./House/House";
import Projects from "./Projects/page";

// Next.js does not support <title> or <link> directly inside components.
// Use <Head> from 'next/head' instead.
import Head from "next/head";

export default function Home() {
  return (
    <>
      
        <title>Rafi Adnan Portfolio</title>
        <link
          rel="icon"
          href="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5807b862bf1790ac6b1f82ab75d1be73-1743593947676/af264c2c-8fbc-4003-a5b3-d0b46292c8f8.png"
          type="image/x-icon"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4320225638717558"
          crossOrigin="anonymous"
        ></script>
     
      

      <main>
        <House />
        <Projects />
        <Analytics />
      </main>
    </>
  );
}
