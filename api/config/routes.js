module.exports = function routes () {
  this.get("/", function(req, res) {
    console.log("attempting this : " + __dirname);
    return res.sendfile("assets/html/index.html", {root: __dirname + '/../client'});
  });
};
