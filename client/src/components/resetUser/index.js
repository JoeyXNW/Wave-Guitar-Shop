import React, { Component } from "react";
import FormField from "../utils/form/FormField";
import { update, generateData } from "../utils/form/FormActions";
import { connect } from "react-redux";
import { resetUser } from "../../actions/user_actions";

class ResetUser extends Component {
  state = {
    formError: null,
    formSuccess: false,
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "resetUser");
    this.setState({ formError: false, formData: newFormData });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "resetUser");

    this.props.dispatch(resetUser(dataToSubmit)).then(res => {
      if (!res.payload.success) {
        this.setState({ formError: true }, () =>
          setTimeout(() => this.setState({ formError: false }), 2000)
        );
      } else {
        this.setState({ formSuccess: true }, () => {
          setTimeout(() => this.setState({ formSuccess: false }), 2000);
        });
      }
    });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={"email"}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
          {this.state.formSuccess && (
            <div className="form_success">
              An email has been sent to your email, please check to reset your
              password
            </div>
          )}
          {this.state.formError && (
            <div className="error_label">
              Email does not exisit. Please try again
            </div>
          )}
          <button type="submit">Send Email to Reset Password</button>
        </form>
      </div>
    );
  }
}

export default connect()(ResetUser);
