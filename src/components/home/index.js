import React, { PureComponent } from 'react';
import Basket from 'components/basket';
import Products from 'components/products';
import {
    Row,
    Col,
} from 'antd';
import './styles.scss';

export default class Home extends PureComponent {
    /**
     * Products data is mock
     */
    state = {
       products: [
           {
               id: 1,
               count: 0,
               price: 265,
               name: 'Apple',
               image: 'https://storage.googleapis.com/gazar-am.appspot.com/5b9126868c34dd8c53c33f2c.png',
           },
           {
               id: 2,
               count: 0,
               price: 310,
               name: 'Kiwi',
               image: 'https://storage.googleapis.com/gazar-am.appspot.com/5b9126578c34dd8c53c33f08.png',
           },
           {
               id: 3,
               count: 0,
               price: 265,
               name: 'Banana',
               image: 'https://storage.googleapis.com/gazar-am.appspot.com/5b91265e8c34dd8c53c33f0e.png',
           },
           {
               id: 4,
               count: 0,
               price: 2100,
               name: 'Ananas',
               image: 'https://storage.googleapis.com/gazar-am.appspot.com/5b9126748c34dd8c53c33f1e.png',
           }
        ],
        basket: [],
        droppableProduct: null,
    };

    clickHandler = (data, title) => title === 'storeProduct'
        ? this.setState({
            products: this.state.products.filter(item => item.id !== data.id).sort((a,b) => a.id - b.id),
            basket: [ ...this.state.basket, data ],
        })
        : this.setState({
            products: [ ...this.state.products, {
                ...data,
                count: 0,
            }].sort((a,b) => a.id - b.id),
            basket: this.state.basket.filter(item => item.id !== data.id),
        });

    droppableProductHandler = droppableProduct => this.setState({
        droppableProduct,
    });

    render() {
        return (
            <div className="home-page">
                <Row>
                    <Col
                        span={12}
                        className="products-column"
                    >
                        <Products
                            products={this.state.products}
                            handleClick={this.clickHandler}
                            handleDroppableProduct={this.droppableProductHandler}
                        />
                    </Col>
                    <Col span={12}>
                        <Basket
                            basket={this.state.basket}
                            droppableProduct={this.state.droppableProduct}
                            handleClick={this.clickHandler}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
