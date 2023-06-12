// 필요한 모듈 가져오기
const exprss = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// express 서버 생성
const app = exprss();

// json 형태의 요청을 처리할 수 있도록 설정
app.use(bodyParser.json());

// 테이블 생성하기
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fields) => {
    console.log('results', results);
});

// DB 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values', function(req, res) {
    // DB에서 모든 정보 가져오기
    db.pool.query('SELECT * FROM lists;',
    (err, results, fields) => {
        if(err)
            return res.status(500).send(err);
        else
            return res.json(results);
    });
});

// 클라이언트에서 입력한 값을 DB 테이블에 넣어주기
app.post('/api/value', function(req, res, next) {
    // DB에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fields) => {
            // 에러가 발생하면 클라이언트에게 에러를 전달
            if(err)
                return res.status(500).send(err);
            else
                return res.json({ success: true, value: req.body.value });
    });
});

app.listen(5000, () => { 
    console.log('서버가 5000번 포트에서 작동중입니다.');
});