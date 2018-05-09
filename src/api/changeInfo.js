const changeInfo = (token, name, address, phone) => (
    fetch('http://192.168.56.1/webservice/app/change_info.php', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    token: token,
    name,
    address,
    phone
  }),
}).then(res =>res.json()).catch(error => console.log('loiiiiiiiiiii',error))
)
// module.exports = register;
export default changeInfo;