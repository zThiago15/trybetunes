import React, { Component } from 'react';
import styles from '../css/Loading.module.css';

export default class Loading extends Component {
  render() {
    return (
      <div className={ styles.loading }>Carregando...</div>
    );
  }
}
