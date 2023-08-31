const CartBadge = ({cart, modalHandler}) => {
  return (
    <div className="fixed-top m-4">
      <span className="position-relative" onClick={modalHandler}>
        <img src={'../../public/shopping-cart.svg'} alt="shopping cart" width='55' height='55' />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cart.length}
          <span className="visually-hidden">unread messages</span>
        </span>
      </span>
    </div>
  )
}

export default CartBadge