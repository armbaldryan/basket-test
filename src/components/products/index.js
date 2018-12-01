import React, { Component } from 'react';
import ProductListItem from 'list-items/products';
import { Divider } from 'antd';
import { Input } from 'antd';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            products: props.products,
        };
    }

    componentWillMount() {
        this.generatedProducts = this.generateProducts(this.state.products);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.products.length !== nextProps.products.length) {
            if (this.state.filterName) {
                const products = nextProps.products.filter(product => product.name.toLowerCase().includes(this.state.filterName));
                this.generatedProducts = this.generateProducts(products);
            } else {
                this.generatedProducts = this.generateProducts(nextProps.products);
            }
        }
    }

    searchHandler = (event) => {
        const { target } = event;
        this.setState(() => {
            const products = this.props.products.filter(product => product.name.toLowerCase().includes(target.value));
            this.generatedProducts = this.generateProducts(products);
            return {
                filterName: target.value,
                products
            };
        });
    };

    generateProducts = (products) => products.map(product => (
        <ProductListItem
            product={product}
            key={product.id}
            title="storeProduct"
            addBasketHandler={this.props.addBasketHandler}
            handleDroppableProduct={this.props.handleDroppableProduct}
        />
    ));

    render() {
        return (
            <div className="products">
                <Divider>Products</Divider>
                <Input placeholder="Search" onChange={this.searchHandler}/>
                { this.generatedProducts }
            </div>
        );
    }
}
