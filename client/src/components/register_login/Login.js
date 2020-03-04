import React, { Component } from "react";
import { connect } from "react-redux";
import FormField from "../utils/form/FormField";
import { update, generateData, isFormValid } from "../utils/form/FormActions";
import { loginUser } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    formError: null,
    formSuccess: null,
    loading: false,
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
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
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "login");
    let formIsValid = isFormValid(this.state.formData, "login");

    if (!formIsValid) {
      return this.setState({ formError: true });
    }
    console.log(dataToSubmit);
    // this.props.dispatch(loginUser(dataToSubmit));
    this.props.dispatch(loginUser(dataToSubmit)).then(response => {
      if (response.payload.loginSuccess) {
        console.log(response.payload);
        this.props.history.push("/user/dashboard");
      } else {
        this.setState({
          formError: true
        });
      }
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "login");
    this.setState({ formError: false, formData: newFormData });
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={"email"}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={"password"}
            formData={this.state.formData.password}
            change={element => this.updateForm(element)}
          />
          {this.state.formError && (
            <div className="error_label">Please check your data</div>
          )}
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

// export default Login;
export default connect()(withRouter(Login));
