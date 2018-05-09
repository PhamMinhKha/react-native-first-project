const searchProduct = (key) =>{
    const url =`http://192.168.56.1/webservice/app/search.php?key=${key}`;
    return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
}
export default searchProduct;