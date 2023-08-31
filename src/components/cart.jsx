import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import alanBtn from '@alan-ai/alan-sdk-web';
import Modal from "./modal";
import CartBadge from "./cart-badge";

const Cart = () => {
  const [mainCart, setMainCart] = useState([])
  const [cart, setCart] = useState([])
  const [isModal, setIsModal] = useState(false)

  const addCartHandler = item => {
    setCart(prev => [...prev, item])
    toast.dark('Product added successfully')
  }

  const modalHandler = () => setIsModal(!isModal)

  const removeCart = id => {
    const newCart = cart.filter(item => item.id !== id )
    setCart(newCart)
    toast.dark('Product removed successfully')
  }

  useEffect(() => {
    alanBtn({
      key: 'd6fce9b9914a0a71dd25947d2a6a51c62e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'getMenu') {
          setMainCart(commandData.data)
        } else if (commandData.command === 'showCart') {
          addCartHandler(commandData.data)
        } else if (commandData.command === 'openCart') {
          setIsModal(commandData.data)
        } else if (commandData.command === 'closeCart') {
          setIsModal(commandData.data)
        } else if (commandData.command === 'removeCart') {
          removeCart(commandData.data)
        }
      }
    })
  }, [])

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {mainCart.map(item => (
            <div key={item.id} className="col">
              <div className="card shadow-sm p-3" style={{minHeight: '550px'}}>
                <div className="card-title">
                  <h4 className="text-muted text-center">Product #{item.id}</h4>
                </div>
                <img src={item.image} alt={item.title} className="bg-placeholder card-image-top" width="100%" height="400px" />
                <div className="card-body">
                  <p className="card-text">{item.title.slice(0, 20)}</p>
                  <p className="card-text fw-lighter">{item.description.slice(0, 100)}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <span>{item.category}</span>
                  <span className="text-muted">${item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CartBadge cart={cart} modalHandler={modalHandler} />
      {isModal && <Modal cart={cart} modalHandler={modalHandler} removeCart={removeCart} />}
    </div>
  )
}

export default Cart