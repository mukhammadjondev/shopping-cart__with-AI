const Modal = ({cart, modalHandler, removeCart}) => {
  return (
    <div className="modal" style={{display: 'block', background: 'rgba(0, 0, 0, .8)'}}>
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
    </div>
  )
}

export default Modal