import request from "supertest";
import { app } from "../app/index";


// const sum = require('./sum');

test('adds 1 + 2 to equal 3', async () => {
  // expect(sum(1, 2)).toBe(3);
  
  
  const response = await request(app).get("/api/users").send()
  expect(response.statusCode).toBe(200)


//   request
});
