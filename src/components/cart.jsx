import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import alanBtn from '@alan-ai/alan-sdk-web';

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
      key: '75531f6da91c2f293aab204ec0453cb42e956eca572e1d8b807a3e2338fdd0dc/stage',
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
      <div className="fixed-top m-4">
        <span className="position-relative" onClick={modalHandler}>
          <img src={'../../public/shopping-cart.svg'} alt="shopping cart" width='55' height='55' />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.length}
            <span className="visually-hidden">unread messages</span>
          </span>
        </span>
      </div>
      {isModal && <div className="modal" style={{display: 'block', background: 'rgba(0, 0, 0, .8)'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cart</h5>
              <button type="button" onClick={modalHandler} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {cart.map(item => (
                <div key={item.id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={item.image} alt={item.title} className="img-fluid rounded-start" />
                    </div>
                    <div className="col-md-8 position-relative">
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text text-muted">{item.description.slice(0, 100)}</p>
                        <p className="card-text">
                          <small className="text-muted">${item.price}</small>
                        </p>
                        <small className="card-text text-muted">Product #{item.id}</small>
                        <button className="btn btn-outline-danger position-absolute m-2 bottom-0 end-0" onClick={() => removeCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" onClick={modalHandler} className="btn btn-primary">Close</button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Cart