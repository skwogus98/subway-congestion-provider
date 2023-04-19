import { congestion } from "@/js/Congestion";

export default async function handler(req, res) {
    if (req.method === "POST") {
        let congestions = [];
        let promises = [];
        console.log(req.body.route);
        for (let key in req.body.route) {
            promises.push(
                new Promise((resolve, reject) => {
                    let updn = parseInt(req.body.route[key].train_code);
                    updn = req.body.route[key].line_num === "2" ? updn + 1 : updn;
                    updn = updn % 2;
                    resolve(congestion(req.body.route[key].station_nm, req.body.route[key].line_num, req.body.day, req.body.route[key].timestamp, updn));
                }).then((res) => {
                    if (res) {
                        congestions[key] = res;
                    }
                })
            );
        }
        await Promise.all(promises).then(() => {}).catch((err)=>{
            res.status(500).json({err:"api error"})
        })
        res.status(200).json(congestions);
        //await res.status(200).json(req.body.route);
    } else {
        await res.status(200).json(await congestion());
    }
}
