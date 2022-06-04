const jwt = require("jsonwebtoken");
module.exports = {
  ensureAuth: function (req, res, next) {
    try {
      // const token = req.headers.authorization.split(" ")[1];

      // const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      // req.userId = decodedToken.userId;
       req.userId = "cee657f9-8cf5-4eeb-8009-9148b0a8a8e4";
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthenticated request " + error });
    }
  },

  requireAdmin: function (req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      

      req.userId = decodedToken.userId;
      next();
    } catch (error) {
     
      res.status(401).json({ message: "Unauthenticated request " + error });
    }
  },
};
