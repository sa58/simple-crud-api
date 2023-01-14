import supertest from "supertest";
import { app } from "../../app/app";

export const request = supertest.agent(app).host('localhost:3000');
