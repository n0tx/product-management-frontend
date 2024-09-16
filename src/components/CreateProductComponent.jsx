import React, { Component } from 'react'
import ProductService from '../services/ProductService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            price: '',
            description: '',
            errors: {name: '', price: ''}
        }
        
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }
    
    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ProductService.getProductById(this.state.id).then( (res) =>{
                let product = res.data;
                this.setState({name: product.name,
                    price: product.price,
                    description : product.description
                });
            });
        }        
    }
    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = {name: this.state.name, price: this.state.price, description: this.state.description};
        console.log('product => ' + JSON.stringify(product));

        // step 5
        if(this.state.id === '_add'){
            ProductService.createProduct(product).then(res =>{
                this.props.history.push('/products');
            }).catch(error => {
                this.setBadRequest(error);
            });
        }else{
            ProductService.updateProduct(product, this.state.id).then( res => {
                this.props.history.push('/products');
            }).catch(error => {
                this.setBadRequest(error);
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    cancel(){
        this.props.history.push('/products');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Product</h3>
        }else{
            return <h3 className="text-center">Update Product</h3>
        }
    }

    setBadRequest(error) {
        if (typeof error.response.data.name === 'undefined') {
            this.setState({
                name: this.state.name, 
                price: this.state.price, 
                description: this.state.description,
                errors: {name: '', price: error.response.data.price}
            });
        } else if (typeof error.response.data.price === 'undefined') {
            this.setState({
                name: this.state.name, 
                price: this.state.price, 
                description: this.state.description,
                errors: {name: error.response.data.name, price: ''}
            });
        } else {
            this.setState({
                name: this.state.name, 
                price: this.state.price, 
                description: this.state.description,
                errors: {name: error.response.data.name, price: error.response.data.price}
            });
        }
        setTimeout(() => {
            this.setState({
                name: this.state.name, 
                price: this.state.price, 
                description: this.state.description,
                errors: {name: '', price: ''}
            });
        }, 3000);
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Product: </label>
                                            <input placeholder="Product" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                                {this.state.errors.name && <p style={{ color: 'red' }}>{this.state.errors.name}</p>}
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                                {this.state.errors.price && <p style={{ color: 'red' }}>{this.state.errors.price}</p>}
                                        </div>
                                        <div className = "form-group">
                                            <label> Description: </label>
                                            <input placeholder="Description" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateProductComponent
