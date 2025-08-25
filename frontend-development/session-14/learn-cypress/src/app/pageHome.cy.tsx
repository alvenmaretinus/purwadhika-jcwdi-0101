import React from 'react';
import Home from './page';

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />);

    cy.get('h1').contains('Welcome!');

    cy.get('code').contains('src/app/page.tsx');
  });
});
