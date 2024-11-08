const app = require("../index");
const config = require("./config");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt-nodejs');

app.post("/api/root/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const [user] = await app.db
      .from("users")
      .select("*")
      .where("users.username", email);
    if (!user) {
      res.status(200).send({ notice: "User Not Found" });
    } else {
      const passwordIsValid = bcrypt.compareSync(password, user.password);;
      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          notice: "Invalid Password!",
        });
      } else {
        const token = jwt.sign(
          { id: user.id, email: user.email, privilege: user.privilege, username: user.username },
          config.secret
        );
        res.status(200).send({
          success: true,
          "token": token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            privilege: user.privilege,
          }
        });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
app.post("/api/root/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await app.db
      .from("customer")
      .select("*")
      .where("customer.username", email);
    if (!user) {
      res.status(200).send({ notice: "User Not Found" });
    } else {
      const passwordIsValid = bcrypt.compareSync(password, user.password);;
      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          notice: "Invalid Password!",
        });
      } else {
        const token = jwt.sign(
          { id: user.id, email: user.email, privilege: user.privilege, username: user.username },
          config.secret
        );
        res.status(200).send({
          success: true,
          "token": token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            privilege: user.privilege,
          }
        });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
