var React = require('react/addons');

var Paginator = React.createClass({

  propTypes: {
    max:        React.PropTypes.number.isRequired,
    maxVisible: React.PropTypes.number,
    onChange:   React.PropTypes.func.isRequired
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.props.onChange(this.state.currentPage);
    }
  },

  getDefaultProps: function() {
    return {
      maxVisible: 5
    };
  },

  getInitialState: function() {
    return {
      currentPage: 1,
      items: []
    };
  },

  goTo: function(page) {
    this.setState({currentPage: page});
  },

  onClickNext: function() {
    var page = this.state.currentPage;

    if (page < this.props.max) {
      this.goTo(page + 1);
    }
  },

  onClickPrev: function() {
    if (this.state.currentPage > 1) {
      this.goTo(this.state.currentPage - 1);
    }
  },

  render: function() {
    var className = this.props.className || '',
      p = this.props,
      s = this.state,
      skip = 0;

    // hide the paginator if there is zero or one page.
    if (this.props.maxVisible < 2) {
      className = 'hide ' + className;
    }

    if (s.currentPage > p.maxVisible - 1 && s.currentPage < p.max) {
      skip = s.currentPage - p.maxVisible + 1;
    }
    else if (s.currentPage === p.max) {
      skip = s.currentPage - p.maxVisible;
    }

    var iterator = Array.apply(null, Array(p.maxVisible))
      .map(function(v, i) {
        return skip + i + 1;
      });

    return (
      <div className={'ui pagination menu ' + className}>
        <a className={s.currentPage === 1 ? 'disabled icon item' : 'icon item'}
          href="javscript:void(0)"
          onClick={this.onClickPrev}>
          <i className="fa fa-chevron-left" />
        </a>

        {iterator.map(function(page) {
          return (
            <a key={page}
              onClick={this.goTo.bind(this, page)}
              className={s.currentPage === page ? 'active item' : 'item'}>{page}</a>
          );
        }, this)}

        <a className={s.currentPage === p.max ? 'disabled icon item' : 'icon item'}
          href="javscript:void(0)"
          onClick={this.onClickNext}>
          <i className="fa fa-chevron-right" />
        </a>
      </div>
    );
  }
});

module.exports = Paginator;
