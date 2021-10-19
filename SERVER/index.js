var express = require('express') // node_modules 내 express 관련 코드를 가져온다
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var router = express.Router();

//app.set('case sensitive routing', true); 대소문자 구별

// var corsOptions = {//cors 옵션
//     origin:'http://localhost:3000',
//     credentials: true
// }

app.use('/static',express.static(__dirname + '/public'))
app.use(cors())
app.use(express.json())
app.use(logger('tiny'))

const CONNECT_URL = 'mongodb://localhost:27017/asdf'
mongoose.connect(CONNECT_URL,{//Mongo DB 서버 연결
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongodb connected ...")) 
.catch(e => console.log(`failed to connect mongodb: ${e}`))

router.use(function timeLog(req,res,next){
    console.log('Time: ',Date.now());
    next();
});

router.get('/',function(req,res){
    res.send('Birds hom page');
});

router.get('/about',function(req,res){
    res.send('About birds');
});

module.exports = router;







app.get('/index',(req,res) =>{
    res.render('index')
})
app.get('/home',(req,res) =>{
    res.render('home')
})
app.get('/detail',(req,res) =>{
    res.render('detail')
})

app.get('/home',(req,res) => {
    res.redirect('/static/index.html')
})

app.get('/hello',(req,res)=>{//URL 응답 테스트
    res.send(req.query.color)
})

app.get('/hello/:id',(req,res)=>{
    res.send(req.params.id)
})

app.get("/users",(req,res) => {
    //데이터베이스에서 사용자 전체목록 조회
    res.send("all user list!")
})

app.post("/users",(req,res) => {
    console.log(req.body.newUser)
    //데이터베이스에 새로운 사용자 생성
    res.json(`new user - ${req.body.newUser.name} created !`)
})

app.put("/users/:id", (req,res) => {

    console.log(req.body.UserInfoToUpdate)
    //데이터베이스에서 id값을 사용자 검색 후 업데이트(몽고 db)
    res.send(
     `user ${req.params.id} updated with payload ${JSON.stringify(
            req.body.UserInfoToUpdate.name
        )}!`
    )
})

app.delete("/users/:id", (req,res) => {
    console.log(req.params.id)
    //데이터베이스에서 id에 해당하는 사용자 조회 후 제거
    res.send(`user${req.params.id} removed!`)
})

app.get("/go+gle", (req,res)=>{
    res.send("google site")
})

app.get("/sylee((mo)+)?", (req,res)=>{
    res.send("sylee is definitely shown! and other string is optonal !")
}
)

app.get(/^\/users\/(\d{4})$/, (req, res) => { 
    console.log(req.params) 
    res.send(`user id ${req.params[0]} found successfully !`) })

app.get("/users/:userId([a-z]{4})", (req,res)=>{
    console.log(req.params)
    res.send(`user id${req.params.userId} found successfully!`)
})

app.get("/users/:name/comments",(req,res,next)=> {
    if(req.params.name !=="syleemomo"){
        //권한없음 페이지를 클라이언트로 전송
        res.status(401).send("you are not authorized to this page !")
    }
    next()//마지막 로직을 빼고는 다 넣어줘야함
},
(req,res)=>{
    res.send("this is page to update your comments!")
    //댓글 수정 페이지를 클라이언트로 전송
})

const blockFirstUser = (req, res, next) => {
     if (req.params.name === "kim") { 
         res.status(401).send("you are not authorized to this page !") 
        } next() 
    } 
    const blockSecondUser = (req, res, next) => {
         if (req.params.name === "park") {
              res.status(401).send("you are not authorized to this page !") 
            } 
            next() 
        } 
        const allowThisUser = (req, res) => {
             res.send("you can see this home page !") } 
             app.get("/home/users/:name", [ 
                 blockFirstUser, 
                 blockSecondUser, 
                 allowThisUser 
                ])

app.get("/chance",(req,res,next)=>{
    if (Math.random()<0.5) return next()
    res.send("first one")
})
app.get("/chance",(req,res)=>{
    res.send("second one")
})

app.get(
    "/fruits/:name",
    (req,res,next)=>{
        if(req.params.name !=="apple")return next()
        res.send("[logic 1]you choose apple for your favorite fruit!")
    },
    (req,res,next)=>{
        if (req.params.name !=="banana") return next()
        res.send("[logic 2]you choose apple for your favorite fruit!")
    },
    (req,res)=>{
        res.send(`[logic 3]you choose ${req.params.name} for your favorite fruit!`)
    }
)

app.get("/shirts",(req,res)=>{
    res.send(`feature-color : ${req.query.color} / size:${req.query.size}`)
})

app.get("/helloa", (req, res) => {
     res.send(`<html> 
                <head></head> 
                <body> 
                    <h1>Hello world !</h1>
                    <input type='button' value='Submit'/> 
                </body> 
                </html>`) })

app.get("/hellos",(req,res)=>{
    res.json({user:"syleemomo", msg:"hello!"})
})

app.get("/googles",(req,res)=>{
    res.redirect("https://google.com")
})






//app.get("/users*",(req,res)=>{
    //*(와일드카드)를 붙이면 아래의 로직은 실행되지 않는다.
    //res.send("users wildcards !")
//})
app.get("/users/contact", (req,res)=>{
    res.send("contact page!")
})
app.get("/users/city",(req,res)=>{
    res.send("city page!")
})







app.use((req,res,next)=>{//사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("Sorry can't find page")
})

app.use((err,req,res,next)=>{//서버 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server !")
})
app.listen(5000, () =>{//5000포트로 서버 오픈
    console.log('server is running on port 5000...')
})