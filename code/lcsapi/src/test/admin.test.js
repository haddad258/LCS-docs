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
describe("/ GET admin", () => {
  it("Should return 200 OK for valid token", (done) => {
    chai
      .request(app)
      .get("/admin")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/POST admin", () => {
  it("it should not POST a admin without id field", (done) => {
    let admin = {
      name: "admin D",
      address: "test",
      city: "rdayef",
      phone_number: 99009900,
    };
    chai
      .request(app)
      .post("/addadmin")
      .set("Authorization", `Bearer ${token}`)
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

