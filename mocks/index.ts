import { setupWorker } from "msw";
import { handlers } from "./handlers";

export default function initMocks() {
  const worker = setupWorker(...handlers);
  worker.start();
}
