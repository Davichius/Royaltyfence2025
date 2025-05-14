const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const fs = require("fs")
const path = require("path")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    // Custom 404 handling
    handle(req, res, parsedUrl).catch(() => {
      const notFoundPath = path.join(__dirname, "public", "404.html")
      const notFoundContent = fs.readFileSync(notFoundPath, "utf8")
      res.statusCode = 404
      res.setHeader("Content-Type", "text/html")
      res.end(notFoundContent)
    })
  }).listen(3000, (err) => {
    if (err) throw err
    console.log("> Ready on http://localhost:3000")
  })
})
