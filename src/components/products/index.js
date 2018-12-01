import React, { PureComponent } from 'react';
import ProductListItem from 'list-items/products';
import { Divider } from 'antd';
import { Input } from 'antd';
import './styles.scss';

export default class Products extends PureComponent {
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
        /**
         * First of all we check if data is changed, than check
         * if we have filterValue than filter and regenerate products list with
         * filtered value and new props, if not
         * than simple generate with new props
         */
        if (this.props.products.length !== nextProps.products.length) {
            if (this.state.filterName) {
                const products = nextProps.products.filter(product => product.name.toLowerCase().includes(this.state.filterName));
                this.generatedProducts = this.generateProducts(products);
            } else {
                this.generatedProducts = this.generateProducts(nextProps.products);
            }
        }
    }

    searchHandler = event => {
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

    generateProducts = products => products.map(product => (
        <ProductListItem
            product={product}
            key={product.id}
            title="storeProduct"
            handleClick={this.props.handleClick}
            handleDroppableProduct={this.props.handleDroppableProduct}
        />
    ));

    render() {
        return (
            <div className="products">
                <Divider>Products</Divider>
                <div className="search-input">
                    <Input
                        placeholder="Search"
                        onChange={this.searchHandler}
                    />
                </div>
                { this.generatedProducts }
            </div>
        );
    }
}
