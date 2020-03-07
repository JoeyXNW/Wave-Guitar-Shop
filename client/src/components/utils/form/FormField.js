import React from "react";

const FormField = ({ id, formData, change }) => {
  const showError = () => {
    let errMessage = "";

    if (formData.validation && !formData.valid)
      errMessage = (
        <div className="error_label">{formData.validationMessage}</div>
      );
    return errMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;
    switch (formData.element) {
      case "input":
        formTemplate = (
          <div className="formBlock">
            {formData.showLabel && (
              <div className="label_inputs">{formData.config.label}</div>
            )}
            <input
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "textarea":
        formTemplate = (
          <div className="formBlock">
            {formData.showLabel && (
              <div className="label_inputs">{formData.config.label}</div>
            )}
            <textarea
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div className="formBlock">
            {formData.showLabel && (
              <div className="label_inputs">{formData.config.label}</div>
            )}
            <select
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            >
              <option value="">Select One</option>
              {formData.config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <div>{renderTemplate()}</div>;
};

export default FormField;
