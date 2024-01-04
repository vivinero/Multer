const express = require("express")
require("./config/config")
const userRouter = require("./routers/userRouter")
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use("/api/v1/user", userRouter)


app.listen(PORT, ()=> {
    console.log(`server is listening on port ${PORT}`)
})
