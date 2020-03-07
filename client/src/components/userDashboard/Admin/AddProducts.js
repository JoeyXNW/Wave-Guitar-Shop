import React, { Component } from "react";
import UserLayout from "../../../hoc/UserLayout";
import FormField from "../../utils/form/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields
} from "../../utils/form/FormActions";
import { connect } from "react-redux";
import {
  getBrands,
  getWoods,
  addProduct
} from "../../../actions/product_actions";
import FileUpload from "../../utils/form/FileUpload";

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
        placeholder: "Enter Product's name",
        label: "Product name"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    description: {
      element: "textarea",
      value: "",
      config: {
        name: "description",
        type: "text",
        placeholder: "Enter description",
        label: "Product description"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    price: {
      element: "input",
      value: "",
      config: {
        name: "price",
        type: "number",
        placeholder: "Enter Product price",
        label: "Product price"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    brand: {
      element: "select",
      value: "",
      config: {
        name: "brand",
        label: "Product brand",
        options: []
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    wood: {
      element: "select",
      value: "",
      config: {
        name: "wood",
        label: "Wood material",
        options: []
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    frets: {
      element: "select",
      value: "",
      config: {
        name: "frets",
        label: "Frets",
        options: [
          { key: 20, value: 20 },
          { key: 21, value: 21 },
          { key: 22, value: 22 },
          { key: 24, value: 24 }
        ]
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    shipping: {
      element: "select",
      value: "",
      config: {
        name: "shipping",
        label: "Shipping",
        options: [
          { key: true, value: "Yes" },
          { key: false, value: "No" }
        ]
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    available: {
      element: "select",
      value: "",
      config: {
        name: "available",
        label: "Available in stock",
        options: [
          { key: true, value: "Yes" },
          { key: false, value: "No" }
        ]
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    publish: {
      element: "select",
      value: "",
      config: {
        name: "publish",
        label: "Publish",
        options: [
          { key: true, value: "Publish" },
          { key: false, value: "Hidden" }
        ]
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: "",
      showLabel: true
    },
    images: {
      value: {},
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      validationMessage: "",
      showLabel: false
    }
  }
};

class AddProducts extends Component {
  state = initialState;

  componentDidMount() {
    const formData = this.state.formData;
    this.props.dispatch(getBrands()).then(_ => {
      populateOptionFields(formData, this.props.products.brands, "brand");
    });
    this.props.dispatch(getWoods()).then(_ => {
      populateOptionFields(formData, this.props.products.woods, "wood");
      this.setState({ formData });
    });
  }

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "products");
    let formIsValid = isFormValid(this.state.formData, "products");

    if (!formIsValid) {
      return this.setState({ formError: true });
    }

    this.props.dispatch(addProduct(dataToSubmit)).then(response => {
      if (response.payload.success) {
        this.setState(initialState);
        this.setState({ formSuccess: true });
        setTimeout(() => {
          this.setState({ formSuccess: false });
          //   this.props.history.push("/admin/site_info");
        }, 2000);
      } else {
        this.setState({ formError: true });
      }
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "products");
    this.setState({ formError: false, formData: newFormData });
  };

  imageHandler = images => {
    const newFormData = { ...this.state.formData };
    newFormData["images"].value = images;

    this.setState({ formData: newFormData });
  };

  render() {
    return (
      <UserLayout>
        <>
          <h1 style={{ textTransform: "capitalize" }}>Add Product</h1>
          <form onSubmit={event => this.submitForm(event)}>
            <FileUpload
              imageHandler={images => this.imageHandler(images)}
              reset={this.state.formSuccess}
            />
            <FormField
              id={"name"}
              formData={this.state.formData.name}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"description"}
              formData={this.state.formData.description}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"price"}
              formData={this.state.formData.price}
              change={element => this.updateForm(element)}
            />
            <div className="form_divider"></div>
            <FormField
              id={"brand"}
              formData={this.state.formData.brand}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"wood"}
              formData={this.state.formData.wood}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"frets"}
              formData={this.state.formData.frets}
              change={element => this.updateForm(element)}
            />
            <div className="form_divider"></div>
            <FormField
              id={"shipping"}
              formData={this.state.formData.shipping}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"available"}
              formData={this.state.formData.available}
              change={element => this.updateForm(element)}
            />
            <div className="form_divider"></div>
            <FormField
              id={"publish"}
              formData={this.state.formData.publish}
              change={element => this.updateForm(element)}
            />
            {this.state.formSuccess && (
              <div className="form_success">
                Product has been added successfully
              </div>
            )}
            {this.state.formError && (
              <div className="error_label">Please check your data</div>
            )}
            <button type="submit">Add a product</button>
          </form>
        </>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.products };
};

export default connect(mapStateToProps)(AddProducts);
