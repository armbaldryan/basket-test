import React, { PureComponent } from 'react';
import { Divider } from 'antd';
import ProductListItem from "list-items/products";

export default class Products extends PureComponent {
    componentWillMount() {
        this.generatedProducts = this.generateProducts(this.props.basket);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.basket.length !== nextProps.basket.length) {
            this.generatedProducts = this.generateProducts(nextProps.basket);
        }
    }

    generateProducts = products => products.map(product => (
        <ProductListItem
            product={product}
            key={product.id}
            title="basketProduct"
            addBasketHandler={this.props.addBasketHandler}
        />
    ));

    /**
     * This function is for avoiding overriding
     */
    onDragOver = event => {
        event.stopPropagation();
        event.preventDefault();
    };

    onDrop = () => this.props.addBasketHandler(this.props.droppableProduct, 'storeProduct');

    render() {
        return (
            <div className="products">
                <Divider>BasketProducts</Divider>
                <div
                    style={{ height: '500px' }}
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}
                >
                    { this.generatedProducts }
                </div>
            </div>
        );
    }
}
