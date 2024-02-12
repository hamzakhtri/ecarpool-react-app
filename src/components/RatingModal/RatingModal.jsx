import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './RatingModal.css'; // Import CSS file for styling
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const RatingModal = ({ show, setShow, id }) => {

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitError, setSubmitError] = useState("");

  const handleClose = () => setShow(false);

  const handleRatingChange = (value) => {
    setRating(value);
  };



  const completeRide = async () => {

    if (rating && review) {
      setLoading(true);
      const docref = doc(db, "rides", id);
      await updateDoc(docref, {
        isCompleted: true,
        rating: rating,
        userReview: review
      });
      setLoading(false);
      setShow(false);
    } else {
      setSubmitError("Rating and Review Required");
    }


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
              onChange={(e) => setReview(e.target.value)}
            />
          </Form.Group>
          <p className='text-danger'>{submitError && submitError}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={completeRide}>
            {loading ? "Completing..." : "Complete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RatingModal;
