var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bonuswinner'
});



const sql = `INSERT INTO web_personal_message( sender_hst_id,  sender_nickname,  receiver_hst_id,  kind,  status,  context,  org_id,  created_dt,  updated_dt)
VALUES( '0', '系統', '10370369', 'service', '0', '恭喜您於動偶星球累積押注一千萬抽中金幣100000枚', '0', now(), now()
)`

// for (let j = 0; j < 10; j++) {
  // connection.connect();
  for(let i=0; i< 100; i++) {
    pool.query(sql, function (error, results) {
      if (error) throw error;
      console.log(` ${i}`);
    });
  }
  // connection.end();
// }

pool.end()
