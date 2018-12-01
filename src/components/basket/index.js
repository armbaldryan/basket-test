import React, { Component } from 'react';
import { Divider } from 'antd';
import ProductListItem from "list-items/products";

export default class Products extends Component {
    componentWillMount() {
        this.generatedProducts = this.generateProducts(this.props.basket);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.basket.length !== nextProps.basket.length) {
            this.generatedProducts = this.generateProducts(nextProps.basket);
        }
    }

    generateProducts = (products) => products.map(product => (
        <ProductListItem
            product={product}
            key={product.id}
            title="basketProduct"
            addBasketHandler={this.props.addBasketHandler}
        />
    ));

    onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    onDrop = (event, data) => {
        this.props.addBasketHandler(data, 'storeProduct')
    };

    render() {
        return (
            <div className="products">
                <Divider>BasketProducts</Divider>
                <div
                    style={{ height: '500px' }}
                    onDragOver={(event) => this.onDragOver(event)}
                    onDrop={(event) => this.onDrop(event, this.props.droppableProduct)}
                >
                    { this.generatedProducts }
                </div>
            </div>
        );
    }
}
