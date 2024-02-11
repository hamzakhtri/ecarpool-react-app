import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './RatingModal.css'; // Import CSS file for styling

const RatingModal = ({show, setShow}) => {
  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleClose = () => setShow(false);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Rating:', rating);
    console.log('Review:', review);
    setShow(false);
    // You can perform further actions here, like sending the rating and review to the server
  };

  return (
    <>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="rating">
            <Form.Label>Rating:</Form.Label>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`star ${value <= rating ? 'selected' : ''}`}
                  onClick={() => handleRatingChange(value)}
                >
                  ★
                </span>
              ))}
              <span className="rating-number">{rating}/5</span>
            </div>
          </Form.Group>
          <Form.Group controlId="review">
            <Form.Label>Review:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={review}
              onChange={handleReviewChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RatingModal;
