import { Html, Head, Main, NextScript } from "next/document";
import Header from './../component/Header';
import Footer from './../component/Footer';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Header/>
                <Main />
                <Footer/>
                <NextScript />
            </body>
        </Html>
    );
}
