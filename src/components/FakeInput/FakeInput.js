import React, {Component, PropTypes} from 'react';

export default class FakeInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.state = {
      showInput: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.refs.input.value);
    this.toggleForm();
  }

  toggleForm() {
    this.setState({showInput: !this.state.showInput});
  }

  render() {
    const {label, value} = this.props;
    const {showInput} = this.state;
    const styles = require('./FakeInput.styl');

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <div className={styles.label}>
          {label}
        </div>
        {!showInput && <div className={styles.inputInline} onClick={this.toggleForm}>
          <span>{value}</span>
          <i className="material-icons">edit</i>
        </div>}
        {showInput && <div className={styles.input}>
          <input type="text" ref="input" defaultValue={value}/>
          <button type="submit">Update</button>
          <button className={styles.cancel} onClick={this.toggleForm}>Cancel</button>
        </div>}
      </form>
    );
  }
}
