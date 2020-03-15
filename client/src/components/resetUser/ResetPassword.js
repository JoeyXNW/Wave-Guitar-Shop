import React, { Component } from "react";
import FormField from "../utils/form/FormField";
import { update, generateData, isFormValid } from "../utils/form/FormActions";
import { Dialog } from "@material-ui/core";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/user_actions";

class ResetPassword extends Component {
  state = {
    resetToken: "",
    formError: false,
    formSuccess: false,
    formData: {
      password: {
        element: "input",
        value: "",
        config: {
          name: "password",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        description: "password must be at least 8 characters"
      },
      passwordConfirm: {
        element: "input",
        value: "",
        config: {
          name: "passwordConfirm",
          type: "password",
          placeholder: "Please Re-type your password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({ resetToken });
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "register");
    this.setState({ formError: false, formData: newFormData });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "register");
    let formIsValid = isFormValid(this.state.formData, "register");
    if (!formIsValid) {
      return this.setState({ formError: true });
    }

    this.props
      .dispatch(
        resetPassword({
          ...dataToSubmit,
          resetToken: this.state.resetToken
        })
      )
      .then(res => {
        if (!res.payload.success) {
          this.setState({ formError: true }, () =>
            setTimeout(() => this.setState({ formError: false }), 2000)
          );
        } else {
          this.setState({ formSuccess: true }, () => {
            setTimeout(() => {
              this.setState({ formSuccess: false });
              this.props.history.push("/register_login");
            }, 2000);
          });
        }
      });
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={event => this.submitForm(event)}>
          <div className="block">
            <FormField
              id={"password"}
              formData={this.state.formData.password}
              change={element => this.updateForm(element)}
            />
          </div>
          <div className="block">
            <FormField
              id={"passwordConfirm"}
              formData={this.state.formData.passwordConfirm}
              change={element => this.updateForm(element)}
            />
          </div>
          {this.state.formError && (
            <div className="error_label">Please check your data</div>
          )}
          <button type="submit">Reset your password</button>
        </form>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Password reset successfully</div>
            <div>Your will be redirected to login page</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(ResetPassword);
