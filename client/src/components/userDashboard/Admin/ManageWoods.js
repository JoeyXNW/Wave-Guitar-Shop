import React, { Component } from "react";
import {
  update,
  generateData,
  isFormValid
} from "../../utils/form/FormActions";
import { connect } from "react-redux";
import FormField from "../../utils/form/FormField";
import { getWoods, addWood } from "../../../actions/product_actions";

const initialState = {
  formError: false,
  formSuccess: false,
  formErrorMessage: "Please check your inputs",
  formData: {
    name: {
      element: "input",
      value: "",
      config: {
        name: "name",
        type: "text",
        placeholder: "Enter the wood"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: ""
    }
  }
};

class ManageWoods extends Component {
  state = initialState;

  componentDidMount() {
    this.props.dispatch(getWoods());
  }

  showCategoryItems = () =>
    this.props.woods &&
    this.props.woods.map(wood => (
      <div className="category_item" key={wood._id}>
        {wood.name}
      </div>
    ));

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "woods");
    this.setState({ formError: false, formData: newFormData });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "woods");
    let formIsValid = isFormValid(this.state.formData, "woods");

    if (!formIsValid) {
      return this.setState({ formError: true });
    }

    this.props.dispatch(addWood(dataToSubmit, this.props.woods)).then(res => {
      if (!res.payload.success) return this.setState({ formError: true });

      this.setState(initialState);
      this.setState({ formSuccess: true });
      setTimeout(() => this.setState({ formSuccess: false }), 2000);
    });
  };

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              {this.state.formSuccess && (
                <div className="form_success">
                  Wood has been added successfully
                </div>
              )}
              {this.state.formError && (
                <div className="error_label">Please check your data</div>
              )}
              <button type="submit">Add brand</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { woods: state.products.woods };
};

export default connect(mapStateToProps)(ManageWoods);
