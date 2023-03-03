const User = require("../../models/user");
const bcrypt = require("bcrypt");

SALT_ROUNDS = 6;

/* 
    req.body = {
        username: "bob",
        password: "awesomepassword"
    }

    hashedPassword = "A$f$gh$.niofdaSDCVdsffsdf.FDgdf$"

    {username: "bob", password: "A$f$gh$.niofdaSDCVdsffsdf.FDgdf$"}
*/

async function create(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    let user = await User.create({ ...req.body, password: hashedPassword });
    user = user.toObject();
    delete user.password;
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    let user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(401).json({ error: "No User Found" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).json({ error: "Invalid Password" });

    user = user.toObject();
    delete user.password;
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

module.exports = {
  create,
  login,
};
