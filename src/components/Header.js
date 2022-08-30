import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../img/logo.png';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header>
        <div className="logo-name">
          <img src={ logo } alt="logo" />
          <h1>TRYBEWALLET</h1>
        </div>
        <div className="header-info">
          <p>
            Usuário logado:
            {' "'}
            <span data-testid="email-field">{email}</span>
            {'". '}
            <br />
            Seja bem vindo!!!
          </p>
          <p>
            Total:
            {' '}
            <span data-testid="total-field">
              {parseFloat(totalValue).toFixed(2)}
            </span>
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.totalValue,
});

export default connect(mapStateToProps)(Header);
