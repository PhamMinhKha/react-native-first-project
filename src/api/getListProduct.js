const getLishProduct = (idType, page) =>{
    const url =`http://192.168.56.1/webservice/app/product_by_type.php?id_type=${idType}&page=${page}`;
    return fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
}
export default getLishProduct;