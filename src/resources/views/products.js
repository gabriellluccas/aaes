'use strict';

const e = React.createElement;

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      showCart: false,
      showPayment: false,
      showMenu: true,
      prod: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(json => {
        this.setState({ products: json })
      })
  }

  menu() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm"> <h1>Produtos</h1> </div>
          <div className="col-sm align-right">
            <button type="button" className="btn btn-info" onClick={() => this.setState({ showCart: true, showMenu: false })}>
              <i className="fa fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        <ul className="list-group">
          {this.state.products.map((obj) => this.renderMenu(obj))}
        </ul>
      </div>
    )
  }

  renderMenu(prod) {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-2">{prod._value}</div>
          <div className="col-8">{prod._name}</div>
          <div className="col-2 align-right">
            <button type="button" className="btn btn-success" onClick={() => this.addProduct(prod)}>
              <i className="fa fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </li>
    )
  }

  addProduct(prod) {
    this.state.cart.push(prod)
    console.log(this.state.cart);

    fetch(`http://localhost:3000/cart/add?clientId=1&&productId=${prod._id}`)
  }

  cart() {
    let total = 0;
    for (let i = 0; i <= this.state.cart.length - 1; i++) {
      console.log(this.state.cart[i]);
      total = total + parseFloat(this.state.cart[i]._value);
    }
    console.log(total);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm"> <h1>Carrinho</h1> </div>
        </div>
        <ul className="list-group">
          {this.state.cart.map((obj) => this.renderCart(obj))}
        </ul>
        <hr />
        <p className="align-right">Total: {total} </p>
        <button type="button" className="btn btn-info" onClick={() => this.setState({ showPayment: true, showCart: false })}>
          Fechar pedido
        </button>
      </div>
    )
  }

  renderCart(prod) {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-10">{prod._name}</div>
          <div className="col-2">{prod._value}</div>
        </div>
      </li>
    )
  }

  payment() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm"> <h1>Produtos</h1> </div>
        </div>
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action" onClick={() => this.handlePayment('CreditCard')}>
            <div className="row">
              <div className="col-5">Crédito</div>
              <div className="col-7 align-right">10% mais caro</div>
            </div>
          </a>
          <a href="#" className="list-group-item list-group-item-action" onClick={() => this.handlePayment('DebitCard')}>
            <div className="row">
              <div className="col-5">Débito</div>
              <div className="col-7 align-right">Sem alteração</div>
            </div>
          </a>
          <a href="#" className="list-group-item list-group-item-action" onClick={() => this.handlePayment('Money')}>
            <div className="row">
              <div className="col-5">Dinheiro</div>
              <div className="col-7 align-right">10% mais barato</div>
            </div>
          </a>
        </div>
      </div>
    )
  }

  handlePayment(method) {
    this.setState({ showAlert: true, showPayment: false });
    fetch(`http://localhost:3000/cart/finish?method=${method}&clientId=1`)
    .then(response => response.json())
    .then(json => {
      this.setState({ prod: json })
    })
    
  }

  alert() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm"> 
          <h1>Pedido finalizado com sucesso!</h1> 
          <h6>Você receberá as atualizações do seu pedido por e-mail, para retornar ao menu, <a href="/">clique aqui!</a></h6> 
          <h6>Para cancelar seu pedido, <a href="#" onClick={() => fetch(`http://localhost:3000/order/cancel?orderId=${this.state.prod.orderId}`)}>clique aqui!</a></h6> 
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.showMenu ? this.menu() : null}
        {this.state.showCart ? this.cart() : null}
        {this.state.showPayment ? this.payment() : null}
        {this.state.showAlert ? this.alert() : null}
      </div>
    )
  }

}

const domContainer = document.querySelector('#react-component');
ReactDOM.render(e(Menu), domContainer);