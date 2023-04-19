// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { routeApi } from "@/js/Route";

export default async function handler(req, res) {
    // console.log(req.body)
    await res.status(200).json(await routeApi(req.body.stationFrom, req.body.stationTo, req.body.time, req.body.day));
}
