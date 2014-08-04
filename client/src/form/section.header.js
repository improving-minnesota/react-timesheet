/** @jsx React.DOM */

var React = require('react/addons');

var FormSectionHeader = React.createClass({
  
  render: function () {

    return (
      <div className="row tsz-form-section-header">
        <div className="col-xs-6">
          <h4>{this.props.header}</h4>
        </div>
        <div className="col-xs-6">
          {this.props.rightContent}
        </div>
      </div>
    );
  }
}); 

module.exports = FormSectionHeader;
