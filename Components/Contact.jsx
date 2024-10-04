import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import toast from "react-hot-toast";

const Contact = ({ setOpenContact }) => {
  const [success, setSuccess] = useState(false);
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  //WATCH THIS VIDEO TO GET KEY --> https://youtu.be/jA5AiGMy_9g?si=BLOiVBVb86YRunTf
  const [state, handleSubmit] = useForm("mzbnzpqr");
  if (state.succeeded) {
    return notifySuccess("Thanks for sending your message!");
  }
  return (
    <div className="bootstrap">
      <div className="modal fade modal-language"></div>
      <div
        className="modal fade modal-feedback show"
        tabIndex={-1}
        id="modal-feedback"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-custom modal-custom-xl modal-dialog-centered modal-feedback">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              onClick={() => setOpenContact(false)}
            />
            <div
              className="state initial"
              style={{ display: `${success ? "none" : "block"}` }}
            >
              <div className="modal-header">
                <div className="modal-title" id="modal_feedback_title">
                  Contact Us
                </div>
                <div className="modal-desc" id="modal_feedback_desc">
                  Please use this form to get in touch with us, report a bug, or
                  suggest a feature.
                </div>
              </div>
              <form onSubmit={handleSubmit} className="modal-body">
                <div className="form-group">
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Your email address"
                    />
                  </div>
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                  <textarea
                    rows={5}
                    className="form-control"
                    id="message"
                    name="message"
                    placeholder="message"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="btn btn-primary btn-block"
                    id="feedback_submit"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
            <div
              className="state success"
              style={{ display: `${success ? "block" : "node"}` }}
            >
              <i className="icon icon-modal-success" />
              <p className="h">Thank you</p>
              <p className="d">Your message has been sent</p>
              <button
                className="btn btn-primary btn-block"
                data-dismiss="modal"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
