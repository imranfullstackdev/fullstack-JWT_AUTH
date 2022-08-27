const jwt = require("jsonwebtoken");
function jwtauth(id) {
  const jwtsecretkey = "gjfufgjhdfjhsdgfyujdfhdg";
  const payload = {
    user: {
      id: id,
    },
  };
  return jwt.sign( payload, jwtsecretkey, { expiresIn: "1hr" });
}
module.exports = jwtauth;
