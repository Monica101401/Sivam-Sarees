import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/cartContext";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Navbar />
      <Component {...pageProps} />
    </CartProvider>
  );
}