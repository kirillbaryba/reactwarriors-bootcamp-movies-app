import React from "react";
import PropTypes from "prop-types";
import UISelect from "../UIComponents/UISelect";

export default class SortByYear extends React.PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    primary_release_year: PropTypes.string.isRequired
  };
  static defaultProps = {
    options: [
      {
        label: "Все фильмы",
        value: ""
      },
      {
        label: "2018",
        value: "2018"
      },
      {
        label: "2017",
        value: "2017"
      },
      {
        label: "2016",
        value: "2016"
      },
      {
        label: "2015",
        value: "2015"
      },
      {
        label: "2014",
        value: "2014"
      },
      {
        label: "2013",
        value: "2013"
      }
    ]
  };

  render() {
    const { primary_release_year, onChangeFilters, options } = this.props;
    
    return (
      <UISelect
        id="primary_release_year"
        name="primary_release_year"
        primary_release_year={primary_release_year}
        value={primary_release_year}
        onChange={onChangeFilters}
        labelText="Год релиза:"
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={primary_release_year}
          >
            {option.label}
          </option>
        ))}
      </UISelect>
    );
  }
}
