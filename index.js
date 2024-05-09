const express = require("express");  //모듈 사용 선언

const app = express();  //app에 익스프레스 모듈을 할당
const port = process.env.PORT || 80;

app.use(express.static("public_html")); 
// public_html 아래에 있는 모든 파일들에 대해 express 모듈의 웹서버 구동


app.listen(port, function(){
    console.log("서버 시작함")
});