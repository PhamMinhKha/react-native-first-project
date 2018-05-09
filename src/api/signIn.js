const signIn = (email, password) => (
    fetch('http://192.168.56.1/webservice/app/login.php', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email,
    password: password
  }),
}).then(res =>res.json())
)
// module.exports = register;
export default signIn;