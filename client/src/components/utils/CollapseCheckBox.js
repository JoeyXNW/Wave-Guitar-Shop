import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Collapse,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";

class CollapseCheckBox extends Component {
  state = {
    open: false,
    checked: [],
    value: "0"
  };

  componentDidMount() {
    this.setState({ open: this.props.open });
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleAngle = () => {
    let iconAngle = this.state.open ? faAngleUp : faAngleDown;
    return <FontAwesomeIcon icon={iconAngle} className="icon" />;
  };

  handleToggle = id => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked }, () => {
      this.props.handleFilters(newChecked);
    });
  };

  handleOnChange = e => {
    const { value } = e.target;
    this.setState(
      {
        value
      },
      () => this.props.handleFilters(value)
    );
  };

  // switch case between title of prices and the rest
  renderList = () => {
    if (!this.props.list) return null;
    if (this.props.title == "Prices") {
      return this.props.list.map(item => (
        <FormControlLabel
          key={item._id}
          value={item._id}
          control={<Radio />}
          label={item.name}
        />
      ));
    }
    return this.props.list.map(brand => (
      <ListItem key={brand._id} style={{ padding: "10px 0" }}>
        <ListItemText primary={brand.name} />
        <ListItemSecondaryAction>
          <Checkbox
            color="primary"
            onChange={e => this.handleToggle(brand._id)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "10px 23px 10px 0" }}
          >
            <ListItemText
              className="collapse_title"
              primary={this.props.title}
            />
            {this.handleAngle()}
          </ListItem>
          {this.props.title !== "Prices" && (
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {this.renderList()}
              </List>
            </Collapse>
          )}
          {this.props.title === "Prices" && (
            <RadioGroup
              aria-label="prices"
              name="prices"
              value={this.state.value}
              onChange={e => this.handleOnChange(e)}
            >
              {this.renderList()}
            </RadioGroup>
          )}
        </List>
      </div>
    );
  }
}

export default CollapseCheckBox;
