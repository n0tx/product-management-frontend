import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/products";

class ProductService {

    getProducts(){
        return axios.get(BASE_URL);
    }

    createProduct(product){
        return axios.post(BASE_URL, product);
    }

    getProductById(productId){
        return axios.get(BASE_URL + '/' + productId);
    }

    updateProduct(product, productId){
        return axios.put(BASE_URL + '/' + productId, product);
    }

    deleteProduct(productId){
        return axios.delete(BASE_URL + '/' + productId);
    }
}

export default new ProductService()