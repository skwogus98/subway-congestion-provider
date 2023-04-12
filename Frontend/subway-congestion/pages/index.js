import Head from "next/head";
import { Bezier2 } from "react-bootstrap-icons";

export default function Home() {
    async function searchRoute() {
        let headers = new Headers({
            "Content-Type": "application/json",
        });
        let options = {
            headers: headers,
            url: "http://localhost:3000" + "/api/hello",
            method: "GET",
        };
        const data = await fetch(options.url, options).then((res) => {
            return res.json();
        });
        console.log(data);
    }
    searchRoute();
    return (
        <>
            <Head>
                <title>지하철 혼잡도 제공 시스템</title>
                <meta name="description" content="서울 지하철 혼잡도 예측 시스템" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="data:image/svg+xml, /bezier2.svg" />
            </Head>
            <main></main>
        </>
    );
}
