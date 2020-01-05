// Stateless component that renders a modal

import React from 'react';

const Modal = (props) => {
  return (
  	<div className="modal fade" id="bcdaModal" role="dialog" aria-labelledby="bcdaModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">{ props.modalTitle }</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						{ props.children }
					</div>
				</div>
			</div>
		</div> 
	);
}

export default Modal;
