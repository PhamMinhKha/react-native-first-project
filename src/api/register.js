const register = (email, name, password) => (
    fetch('http://192.168.56.1/webservice/app/register.php', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email,
    name: name,
    password: password
  }),
}).then(res =>res.text())
)
// module.exports = register;
export default register;