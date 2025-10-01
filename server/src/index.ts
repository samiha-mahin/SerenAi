import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/index";
import {functions as IngestFunctions} from "./inngest/functions";

const app = express();
// Important: ensure you add JSON middleware to process incoming JSON POST payloads.
app.use(express.json());
// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions:IngestFunctions}));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});