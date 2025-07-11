import {Page, expect} from '@playwright/test';
import testdata from '../testdata.json';

export class ABNLookupPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    
    async goto() {
        await this.page.goto('https://abr.business.gov.au/');
    }
    
    async searchByName(name: string) {
        await this.page.getByRole('textbox', { name: 'Search by ABN, ACN or name:' }).fill(name);
        await this.page.getByRole('button', { name: 'Search' }).click();
        
        
    }

     async getEntityName() {
        await this.page.getByRole('cell', { name: 'Entity name:' }).textContent(); 

    }
    
}
