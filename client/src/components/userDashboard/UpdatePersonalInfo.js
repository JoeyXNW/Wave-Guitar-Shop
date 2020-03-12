import React, { Component } from "react";
import FormField from "../utils/form/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../utils/form/FormActions";
import { connect } from "react-redux";
import { updateUser, clearUserInfo } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";

const initialState = {
  formError: null,
  formSuccess: false,
  formData: {
    name: {
      element: "input",
      value: "",
      config: {
        label: "first name",
        name: "name",
        type: "text",
        placeholder: "Enter your name"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    lastname: {
      element: "input",
      value: "",
      config: {
        label: "last name",
        name: "lastname",
        type: "text",
        placeholder: "Enter your last name"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    email: {
      element: "input",
      value: "",
      config: {
        label: "email",
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
      validationMessage: "",
      showLabel: true
    }
  }
};
class UpdatePersonalInfo extends Component {
  state = initialState;

  componentDidMount() {
    const newFormData = populateFields(this.state.formData, this.props.user);
    this.setState({ formData: newFormData });
  }

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "update_user");
    let formIsValid = isFormValid(this.state.formData, "update_user");
    if (!formIsValid) {
      return this.setState({ formError: true });
    }

    this.props.dispatch(updateUser(dataToSubmit)).then(res => {
      if (res.payload.success) {
        this.setState({ formSuccess: true }, () =>
          setTimeout(() => {
            this.props.dispatch(clearUserInfo());
            this.setState({ formSuccess: false });
          }, 1000)
        );
      }
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "update_user");
    this.setState({ formError: false, formData: newFormData });
  };

  render() {
    return (
      <>
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
          {this.state.formError && (
            <div className="error_label">Please check your data</div>
          )}
          {this.state.formSuccess && (
            <div className="form_success">Updated Successfully</div>
          )}
          <button type="submit">Update</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user.userData };
};

export default connect(mapStateToProps)(withRouter(UpdatePersonalInfo));
