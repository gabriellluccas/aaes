'use strict';

const e = React.createElement;

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/order')
      .then(response => response.json())
      .then(json => {
        this.setState({ products: json })
      })
  }

  renderProducts(prod) {
    console.log(prod)
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-2">Pedido {prod.id}</div>
          <div className="col-2">{prod.delivery_state}</div>
          <div className="col-8 align-right">
            <button type="button" className="btn btn-outline-success" onClick={() => this.changeState(prod.id, 'memento')}>
              <i className="fa fa-arrow-left"></i>
            </button>
            <button type="button" className="btn btn-outline-danger" onClick={() => this.changeState(prod.id, 'DeliveryStateCanceled')}>
              <i className="fa fa-times"></i>
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={() => this.changeState(prod.id, 'DeliveryStateAwaitingApproval')}>Awaiting approval</button>
            <button type="button" className="btn btn-outline-primary" onClick={() => this.changeState(prod.id, 'DeliveryStateInProduction')}>In production</button>
            <button type="button" className="btn btn-outline-primary" onClick={() => this.changeState(prod.id, 'DeliveryStateSent')}>Sent</button>
            <button type="button" className="btn btn-outline-primary" onClick={() => this.changeState(prod.id, 'DeliveryStateDone')}>Done</button>
          </div>
        </div>
      </li>
    )
  }

  changeState(id, state) {
    state === 'memento' ?
    fetch('http://localhost:3000/order/state/rollback?orderId='+id)
    :
    fetch('http://localhost:3000/order/state/change?orderId='+id+'&clientId=1&deliveryState='+state)
    window.location.replace("http://localhost:3000/god");
  }

  render() {
    console.log("rodou")
    return (
      <div className="god-app">
        <div className="row">
          <div className="col-sm"> <h1>God App</h1> </div>
        </div>
        <ul className="list-group">
          {this.state.products.map((obj) => this.renderProducts(obj))}
        </ul>
      </div>
    )
  }
}

const domContainer = document.querySelector('#react-component');
ReactDOM.render(e(Menu), domContainer);