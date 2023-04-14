import { Html, Head, Main, NextScript } from "next/document";
import Header from "./../components/Header";
import Footer from "@/components/Footer";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Header />
                <Main className="max-w-5xl mx-auto my-10 px-8"/>
                <Footer />
                <NextScript />
            </body>
        </Html>
    );
}
