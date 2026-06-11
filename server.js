import http from "node:http";
import {getDataFromDB} from "./database/db.js";
import {sendJSONResponse} from "./utils/sendJSONResponse.js";
import {getDataByPathParam} from "./utils/getDataByPathParams.js";
import {getDataByQueryParams} from "./utils/getDataByQueryParams.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    console.log(urlObj);
    const queryObj = Object.fromEntries(urlObj.searchParams);
    const destinations = await getDataFromDB();
    if (urlObj.pathname === "/api" && req.method === "GET") {
        console.log(queryObj);
        let filteredData = getDataByQueryParams(destinations, queryObj);
        sendJSONResponse(res, 200, filteredData);
    } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
        const continent = req.url.split("/").pop();
        const filteredData = getDataByPathParam(
            destinations,
            "continent",
            continent,
        );
        sendJSONResponse(res, 200, filteredData);
    } else if (req.url.startsWith("/api/country") && req.method === "GET") {
        const country = req.url.split("/").pop();
        const filteredData = getDataByPathParam(destinations, "country", country);
        sendJSONResponse(res, 200, filteredData);
    } else {
        sendJSONResponse(res, 404, {
            error: "not found",
            message: "the requested route does not exist ",
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});