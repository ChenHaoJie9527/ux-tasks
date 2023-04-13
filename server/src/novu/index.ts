import { Novu } from "@novu/node";
import { apiKey } from "./key";
function createNovuServer() {
  return new Novu(apiKey);
}

export default createNovuServer;
