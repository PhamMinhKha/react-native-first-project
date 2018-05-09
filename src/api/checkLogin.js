const checkLogin = (token) => (
    fetch('http://192.168.56.1/webservice/app/check_login.php', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    token: token
  }),
}).then(res =>res.json()).catch(error => console.log('loiiiiiiiiiii',error))
)
// module.exports = register;
export default checkLogin;