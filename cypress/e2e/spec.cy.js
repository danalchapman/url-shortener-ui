describe('User Flows', () => {

  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/urls', {
      "urls": [
        {
            "id": 3,
            "long_url": "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
            "short_url": "http://localhost:3001/useshorturl/3",
            "title": "Cool photo"
        }
      ]    
    })
    cy.visit('http://localhost:3000/')
  })

  it('Should render the page title and any existing short URLs', () => {
    cy.get('h1')
      .contains('URL Shortener')
    cy.get('.url')
      .should('exist')
    cy.get('h3')
      .contains('Cool photo')
    cy.get('a')
      .contains('http://localhost:3001/useshorturl/3')
    cy.get('p')
      .contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('Should render the form and its input fields', () => {
    cy.get('form').should('exist')
    cy.get('input[name="title"]')
      .should('have.attr', 'placeholder')
      .should('include', 'Title...')
    cy.get('input[name="urlToShorten"]')
      .should('have.attr', 'placeholder')
      .should('include', 'URL to Shorten...')
    cy.get('button')
      .should('exist')
      .contains('Shorten Please!')
  })

  it('Should reflect the user input in the form fields', () => {
    cy.get('input[name="title')
      .type('Pretty picture')
      .should('have.value', 'Pretty picture')
    cy.get('input[name="urlToShorten')
      .type('https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')
      .should('have.value', 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')
  })
})

describe('Form flows', () => {

  it('Should be able to submit a new shortened URL to the DOM', () => {
    cy.intercept('http://localhost:3001/api/v1/urls', {
      "urls": [
        {
            "id": 3,
            "long_url": "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
            "short_url": "http://localhost:3001/useshorturl/3",
            "title": "Cool photo"
        }
      ]    
    })
    cy.visit('http://localhost:3000/')
    cy.get('input[name="title')
      .type('Pretty picture')
      .should('have.value', 'Pretty picture')
    cy.get('input[name="urlToShorten')
      .type('https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')
      .should('have.value', 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')
      
  })
})