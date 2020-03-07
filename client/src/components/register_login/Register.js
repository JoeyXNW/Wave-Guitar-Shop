import React, { Component } from "react";
import FormField from "../utils/form/FormField";
import { update, generateData, isFormValid } from "../utils/form/FormActions";
import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";
import { Dialog } from "@material-ui/core";

const initialstate = {
  formError: null,
  formSuccess: false,
  formData: {
    name: {
      element: "input",
      value: "",
      config: {
        name: "name",
        type: "text",
        placeholder: "Enter your name"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: ""
    },
    lastname: {
      element: "input",
      value: "",
      config: {
        name: "lastname",
        type: "text",
        placeholder: "Enter your last name"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: ""
    },
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
    },
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

class Register extends Component {
  state = initialstate;

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "register");
    let formIsValid = isFormValid(this.state.formData, "register");
    if (!formIsValid) {
      return this.setState({ formError: true });
    }

    this.props.dispatch(registerUser(dataToSubmit)).then(response => {
      if (response.payload.registerSuccess) {
        this.setState(initialstate);
        this.setState({ formSuccess: true });
        setTimeout(() => {
          this.setState({ formSuccess: false });
          this.props.history.push("/register_login");
        }, 2000);
      } else {
        this.setState({ formError: true });
      }
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "register");
    this.setState({ formError: false, formData: newFormData });
  };

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={event => this.submitForm(event)}>
                <h2>Personal Information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"name"}
                      formData={this.state.formData.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"lastname"}
                      formData={this.state.formData.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    id={"email"}
                    formData={this.state.formData.email}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <h2>Verify Password</h2>
                <div className="form_block_two">
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
                </div>
                {this.state.formError && (
                  <div className="error_label">Please check your data</div>
                )}
                <button type="submit">Create an account</button>
              </form>
            </div>
          </div>
        </div>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Registered successfully</div>
            <div>Your will be redirected to login page</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
