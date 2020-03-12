import React, { Component } from "react";
import FormField from "../../utils/form/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../../utils/form/FormActions";
import { connect } from "react-redux";
import { getSiteInfo, updateSiteInfo } from "../../../actions/site_actions";

class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: "input",
        value: "",
        config: {
          label: "Adresss",
          name: "address_input",
          type: "text",
          placeholder: "Enter the site address"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      hours: {
        element: "input",
        value: "",
        config: {
          label: "Working hours",
          name: "hours_input",
          type: "text",
          placeholder: "Enter the site working hours"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      phone: {
        element: "input",
        value: "",
        config: {
          label: "Phone number",
          name: "phone_input",
          type: "text",
          placeholder: "Enter the phone number"
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
          label: "Shop email",
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
        validationMessage: "",
        showLabel: true
      }
    }
  };

  componentDidMount() {
    this.props.dispatch(getSiteInfo()).then(() => {
      const formData = populateFields(
        this.state.formData,
        this.props.site.siteInfo[0]
      );
      this.setState({ formData });
    });
  }

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "siteInfo");
    let formIsValid = isFormValid(this.state.formData, "siteInfo");
    if (!formIsValid) {
      return this.setState({ formError: true });
    }

    this.props.dispatch(updateSiteInfo(dataToSubmit)).then(res => {
      this.setState({ formSuccess: true });
      setTimeout(() => {
        this.setState({ formSuccess: false });
      }, 2000);
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "siteInfo");
    this.setState({ formError: false, formData: newFormData });
  };

  render() {
    return (
      <>
        <form onSubmit={event => this.submitForm(event)}>
          <h1 style={{ textTransform: "uppercase" }}>Site info</h1>
          <FormField
            id={"address"}
            formData={this.state.formData.address}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={"hours"}
            formData={this.state.formData.hours}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={"phone"}
            formData={this.state.formData.phone}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={"email"}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />

          <div>
            {this.state.formSuccess && (
              <div className="form_success">Form updated successfully</div>
            )}
            {this.state.formError && (
              <div className="error_label">Please check your data</div>
            )}
            <button type="submit">Update</button>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { site: state.site };
};

export default connect(mapStateToProps)(UpdateSiteInfo);
