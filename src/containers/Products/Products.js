import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { create, isAllLoaded, getAll } from 'redux/modules/product';
import ApiClient from 'helpers/ApiClient';

@connect(state => ({products: state.product.products}), {create})
export default class Products extends Component {
  static propTypes = {
    create: PropTypes.func.isRequired,
    products: PropTypes.array
  };

  constructor() {
    super();
    this.state = {
      active: false,
      newFile: null
    };
    this.toggleActive = this.toggleActive.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.open = this.open.bind(this);
    this.checkFile = this.checkFile.bind(this);
  }

  static fetchDataDeferred(getState, dispatch) {
    if (!isAllLoaded(getState())) {
      return dispatch(getAll());
    }
  }

  addProduct() {
    const self = this;
    const {title, desc} = this.refs;
    const client = new ApiClient();

    client.post('/picture', { data: this.state.newFile }).then((result) => {
      const product = {
        title: title.value,
        description: desc.value,
        imageUrl: result.url
      };
      self.props.create(product).then(() => {
        self.toggleActive();
      });
    });
  }

  toggleActive() {
    if (this.state.active) {
      this.setState({newFile: null, picture: null});
    }
    this.setState({active: !this.state.active});
  }

  checkFile(event) {
    const file = event.target.files[0];

    let picture = null;
    const reader = new FileReader();
    reader.onload = (evnt) => {
      picture = evnt.target.result;
      this.setState({ picture: picture });
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('picture', file);
    this.setState({ newFile: formData });
  }

  open() {
    const { file } = this.refs;
    file.value = null;
    file.click();
  }

  render() {
    const styles = require('./Products.styl');
    const {active, picture} = this.state;
    const {products} = this.props;

    const createProduct = (
      <div className={styles.createProduct + (active ? ' ' + styles.active : '')} onClick={!active && this.toggleActive}>
        {!active && <p>Click to create a product</p>}
        {active &&
          <div className={styles.formContainer}>
            <div className={styles.form}>
              <div className={styles.imgContainer} onClick={this.open}>
                <input type="file" ref="file" onChange={this.checkFile}/>
                {!picture && <span>Add an image</span>}
                {picture && <img src={picture}/>}
              </div>
              <div className={styles.infosContainer}>
                <input type="text" ref="title" placeholder="Title"/>
                <textarea ref="desc" placeholder="Description..."/>
              </div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.button + ' ' + styles.red} onClick={this.toggleActive}>Cancel</button>
              <button className={styles.button} onClick={this.addProduct}>Add</button>
            </div>
          </div>
        }
      </div>
    );

    const productsList = [];
    if (products) {
      for (const product of products) {
        productsList.push(
          <div className={styles.element} key={product.id}>
            <img src={'/api/' + product.imageUrl}/>
            <h4>{product.title}</h4>
          </div>
        );
      }
    }

    return (
      <div className={styles.container}>
        {createProduct}
        {productsList}
      </div>
    );
  }
}
