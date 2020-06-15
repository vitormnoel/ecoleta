const express = require("express")
const server = express()

//pegar o bd
const db = require("./database/db")

//config pasta public
server.use(express.static("public"))

//habilitar o req.body
server.use(express.urlencoded({extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//config caminhos da aplicação
server.get("/", (req, res) =>{
    return res.render("index.html")
})

server.get("/create-point", (req, res) =>{

   // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //console.log(req.body)

    //inserir dados
    const query = `
    insert into places(
        img, name, address, 
        address2, state, city, items
    ) 
    values(?,?,?,?,?,?,?);`
    
    const values = [
        req.body.img,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("cadastrado com sucesso")
        console.log(this)
    
        return res.send("create-point.html", {saved: true})
    }
    
    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) =>{

    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", {total: 0})    
    }

    //pegar dados do bd
    db.all(`select * from places where city like '${search}'`, function(err, rows){
        if(err){
            return console.log(err)
        }
    
    const total = rows.length

    //mostrar o html com os dados do html
        return res.render("search-results.html",{places: rows, total: total})
    })
})

//ligar o servidor
server.listen(3000)