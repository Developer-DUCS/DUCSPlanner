/*const session = require('express-session');
var MySqlDBStore = require('express-mysql-session')(session);
const conn = require("./mysqldb");

/*const store = new MySqlDBStore({
    uri: 'mongodb://localhost:27017/ducs_sessions',
    collection: 'mySessions'
  });*/
 /* const options ={
      //connectionLimit: 10,
      password:'theGreatestAndMostSecured1',
      user:'sessionConnector',
      host:conn.host,
      database:'PlanIt',
      expiration: 10800000,
      schema:{
        tableName: 'PlanIt_Session_Table',
        columnNames: {
          session_id: 'session-id',
          expires: 'session-expiration',
          data: 'session-data'
        }
      }
  }

  const store = new MySqlDBStore(options);

  store.on('error', function(error) {
    console.log(error);
  });

  let sess = session({
    secret: 'ab#d%^q1',
    cookie: {
      maxAge: 1000 * 60 * 30 // 30 minutes
    },
    name: "PlanItSess",
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: false,
    saveUninitialized: true
  });

  //used for MySql connection: PlanItAdmin, asecuredpassword1

  module.exports = sess;*/