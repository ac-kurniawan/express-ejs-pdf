let express = require("express")
let ejs = require("ejs")
let path = require("path")
let pdf = require("html-pdf");
let app = express()

app.set("view engine", "ejs")
app.get("/", function (request, response) {
  response.render("index")
})

app.get("/views/style.css", function (req, res) {
  res.sendFile(__dirname + "/views/" + "style.css")
})
app.get("/generateReport", (req, res) => {
  ejs.renderFile(
    path.join(__dirname, "./views/", "index.ejs"),
    {
      user: {
        name: "Ardhi"
      }
    },
    (err, html) => {
      if (err) {
        res.send(err)
      } else {
        let options = {
          "width":1440,
          "height":2016,
          "format": "A4",
          "orientation": "portrait",
          "border": "0",
          "timeout": 30000,
        }
        pdf.create(html, options).toFile("report.pdf", function (err, data) {
          if (err) {
            res.send(err)
          } else {
            res.send(html)
          }
        })
      }
    }
  )
})
app.listen(3000)
