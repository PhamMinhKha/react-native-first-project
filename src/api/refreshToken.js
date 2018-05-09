import saveToken from './saveToken';

const refreshToken = (token) =>{
    fetch('http://192.168.56.1/webservice/app/refresh_token.php', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    token: token
  }),
}).then(res =>res.text())
.then(tokenToSave => saveToken(tokenToSave));

};
export default refreshToken;