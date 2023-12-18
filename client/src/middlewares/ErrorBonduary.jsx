import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Errore:', error);
    console.error('Dettagli errore:', errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Qualcosa è andato storto.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
