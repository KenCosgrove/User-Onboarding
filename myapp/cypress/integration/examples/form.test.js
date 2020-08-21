describe('name input', ()=> {
    it('can type a name', ()=>{
        cy.visit("http://localhost:3000/")
        cy.get('input[name="name"]')
        .type('alexander')
        .should('have.value', 'alexander')
    })
})

describe('email input', ()=> {
    it('can type a valid email', ()=>{
        cy.visit("http://localhost:3000/")
        cy.get('input[name="email"]')
        .type('aj.gambino7@gmail.com')
        .should('have.value', 'aj.gambino7@gmail.com')
    })
})

describe('password input', ()=> {
    it('can type a password', ()=>{
        cy.visit("http://localhost:3000/")
        cy.get('input[name="password"]')
        .type('quickbrownfox')
        .should('have.value', 'quickbrownfox') 
    })
})

describe('TOS input', ()=>{
    it('can agree to TOS', ()=>{
        cy.visit("http://localhost:3000/")
        cy.get('input[type="checkbox"]').click()
    })
})

describe('submit input', ()=>{
    it('can submit form', ()=>{
        cy.visit("http://localhost:3000/")
        cy.get('button').click()
    })
})