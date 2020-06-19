import React  from 'react'
import Header from '../../Components/Header'
import './qrGenerator.scss'
import { getProducts} from '../../services/admin'
import QRCode from 'qrcode.react'
import uniqid from 'uniqid'
import NavBarAdmin from '../../Components/NavBarAdmin'
export default class QrGenerator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [],
      selectedProduct: false,
      id: ''
    }
    this._renderProducts = this._renderProducts.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }



  async componentDidMount () {
    try {
      const token = localStorage.getItem('authUserToken')
      //const response = await getProducts(token)
      const response = await getProducts(token)
      const dataResponse = await response.json()
      this.setState({
        products: dataResponse.data.product
      })
    } catch (error) {
      console.log('Error', error)
    }
  }

  _renderProducts () {
    const { products } = this.state
    return products.map(({ productName,sku}, index) => (
      <option value={sku}>Nombre: {productName} , SKU:{sku}</option>
    ))
  }

  handleInput ({ target: { name, value } }) {
    console.log(value);
    this.setState({
      selectedProduct: value,
    })
  }

  render() {
    const myObj = { id: uniqid(), sku: this.state.selectedProduct  }
    const objAsString = JSON.stringify(myObj)
    const encriptedObj = btoa(objAsString)
    return (
      <div>
        <Header/>
        <div className='row '>
          <div className='col-lg-6 d-flex justify-content-center'>
            <div className="products  ">
            <select className="form-control form-control-sm" id="selectOptios" onChange={this.handleInput} value={this.state.value}>
            <option value="none" selected disabled hidden> 
              Select an Option 
            </option> 
              { this._renderProducts()}
            </select>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className="qr">
          {
          this.state.selectedProduct ? (
            <>
              <QRCode includeMargin='true' value={encriptedObj} size={170} />  
            </>
          ) : (
            <h1>Qr code</h1>
          )
          }
          </div>
          </div>
        </div>
        <NavBarAdmin />
      </div>
    );
  }
}


