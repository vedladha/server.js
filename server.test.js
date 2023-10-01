const request = require("supertest");
const app = require("./app");

// Test case for adding points

describe("Test the add method", () => {
  test("It should add points to the user", async () => {
    const req = {
        "payer" : "DANNON",
        "points" : 5000,
        "timestamp" : "2020-11-02T14:00:00Z"
    }
    const response = await request(app).post("/add").send(req);
    expect(response.statusCode).toBe(200);
  });

});



// Test case for spending points

describe("Test the spend method", () => {
  test("It should spend the avaliable points to the user", async () => {
    const req = {
        "points" : 5000,
        
    }
    const response = await request(app).post("/spend").send(req);
    expect(response.statusCode).toBe(200);

  });


  test("It should return a 400 status code when insufficent points ", async () => {
    const avaliableUserPoints = 2000;
    const req = {
        "points" : 5000,
        
    }
    const response = await request(app).post("/spend").send(req);
    expect(response.statusCode).toBe(400);

  });

});



//test case for balance 

describe('GET /balance', () => {
  it('should return the current points balance', async () => {
    const res = await request(app).get('/balance');

    expect(res.body).to.have.property('DANNON');
    expect(res.body).to.have.property('UNILEVER');
    expect(res.body).to.have.property('MILLER COORS');


  });
});






