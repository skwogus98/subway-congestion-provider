// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { routeApi } from "@/js/RouteAPI";

export default async function handler(req, res) {
    await res.status(200).json(await routeApi());
}
