import React, { PureComponent } from 'react';
import {
    Row,
    Col,
} from 'antd';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import './styles.scss';

export default class ProductListItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            data: props.product || {},
            inputValue: props.product
                ? props.product.count
                : 0,
        };
    }

    changeHandler = count => this.setState({
        data: {
            ...this.state.data,
            count,
        },
    });

    clickHandler = () => this.props.addBasketHandler(this.state.data, this.props.title);

    onDragStart = () => this.props.handleDroppableProduct(this.state.data);

    render() {
        return (
            <div
                className="product-list-item"
                 draggable={this.props.title === 'storeProduct' && this.state.data.count > 0}
                 onDragStart={this.props.title === 'storeProduct'
                     ? this.onDragStart
                     : null
                 }
            >
                <Row>
                    <Col span={6}>
                        <img
                            src={this.state.data.image}
                            alt=""
                        />
                    </Col>
                    <Col
                        span={12}
                        className="product-descr"
                    >
                        <p className="product-name">
                            {this.state.data.name}
                        </p>
                        <p className="product-price">
                            {
                                this.state.data.count
                                    ? this.state.data.price * this.state.data.count
                                    : this.state.data.price
                            }
                        </p>
                    </Col>
                    <Col
                        span={6}
                        className="buttons-field"
                    >
                        <InputNumber
                            min={0}
                            defaultValue={this.state.data.count}
                            onChange={this.changeHandler}
                        />
                        <Button
                            className="add-button"
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
