import httpServer from "./app";
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => console.log("server running in port " + PORT));
