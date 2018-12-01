import React, { Component } from 'react';
import {
    Row,
    Col,
} from 'antd';
import { InputNumber } from 'antd';
import { Button } from 'antd';

export default class ProductListItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: props.product || {},
            inputValue: props.product ? props.product.count : 0,
        }
    }

    changeHandler = (count) => this.setState({
        data: {
            ...this.state.data,
            count
        },
    });

    clickHandler = () => {
        this.props.addBasketHandler(this.state.data, this.props.title);
    };

    onDragStart = () => {
        this.props.handleDroppableProduct(this.state.data)
    };

    render() {
        console.log('this.props :::', this.props);
        return (
            <div
                className="product-list-item" style={{
                    border: '1px solid grey',
                    margin: 10
                }}
                 draggable={this.props.title === 'storeProduct' && this.state.data.count > 0}
                 onDragStart={this.props.title === 'storeProduct'
                     ? this.onDragStart
                     : null
                 }
            >
                <Row>
                    <Col span={6}>
                        <img src={this.state.data.image} alt=""/>
                    </Col>
                    <Col span={12}>
                        <p>
                            {this.state.data.name}
                        </p>
                        <p>
                            {this.state.data.price}
                        </p>
                    </Col>
                    <Col span={6}>
                        <InputNumber
                            disabled={this.props.title === 'basketProduct'}
                            min={0}
                            defaultValue={this.state.data.count}
                            onChange={this.changeHandler}
                        />
                        <Button
                            type="primary"
                            disabled={!this.state.data.count}
                            onClick={this.clickHandler}
                        >
                            {
                                this.props.title === 'storeProduct'
                                    ? 'Add to Basket'
                                    : 'Remove from Basket'
                            }
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
