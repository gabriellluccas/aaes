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
    fetch('http://localhost:3000/order/state?deliveryState=DeliveryStateInProduction')
      .then(response => response.json())
      .then(json => {
        this.setState({ products: json })
      })
  }

  renderProducts(prod) {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-8">Pedido {prod.id}</div>
          <div className="col-2 align-right">
            <button type="button" className="btn btn-success" onClick={() => this.changeState(prod.id, 'DeliveryStateSent')}>
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="col-2 align-right">
            <button type="button" className="btn btn-danger" onClick={() => this.changeState(prod.id, 'DeliveryStateCanceled')}>
              <i className="fa fa-times"></i>
            </button>
          </div>
        </div>
      </li>
    )
  }

  changeState(id, state){
    fetch('http://localhost:3000/order/state/change?orderId='+id+'&clientId=1&deliveryState='+state)
    window.location.replace("http://localhost:3000/chef");
  }

  render() {
    console.log("rodou")
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm"> <h1>Chef App</h1> </div>
        </div>
        <ul className="list-group">
          {this.state.products.map((obj) => obj.delivery_state === 'DeliveryStateInProduction'? this.renderProducts(obj) : null )}
        </ul>
      </div>
    )
  }
}

const domContainer = document.querySelector('#react-component');
ReactDOM.render(e(Menu), domContainer);