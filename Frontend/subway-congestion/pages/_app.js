import "@/styles/globals.css";
import Header from "./../components/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
    return (
        <div>
            <Header />
            <div className="max-w-5xl mx-auto my-10 px-8">
                <Component {...pageProps} />
            </div>
            <Footer />
        </div>
    );
}
