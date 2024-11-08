const app = require("../../index");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
const user = {
  password: "123",
  username: "admin",
};
let token;
chai.should();
var authenticatedUser = chai.request.agent(app);
before(function (done) {
  authenticatedUser
    .post("/signin")
    .send(user)
    .end(function (err, response) {
      response.should.have.status(200);
      token = response.body.accessToken;
      done();
    });
});
describe("/POST user", () => {
  it("it should not POST a user without id field", (done) => {
    let user = {
      name: "user D",
      address: "user test",
      city: "rdayef",
      phone_number: 74123456,
      phone_number: "85136690-f6a5-11eb-a146-61a76f4a0161",
    };
    chai
      .request(app)
      .post("/adduser")
      .set("Authorization", `Bearer ${token}`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/ GET user", () => {
  it("Should return 200 OK for valid token", (done) => {
    chai
      .request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
