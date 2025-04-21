import {expect} from '@playwright/test';

export default class AddCategoryPage {
    constructor(page){
        this.page = page;
        this.nameEn = page.getByRole('textbox', {name: 'Name (English)'});
        this.nameNe = page.getByRole('textbox', {name: 'Name (Nepali)'});
        this.order = page.getByRole('textbox', {name: 'Order'});
        this.saveButton = page.getByRole('button', {name:'Save'});
    }

    async navigateToAddCategoryForm(){
        await this.categoryPage.click();
        await this.addCategoryButton.click();
    }

    async fillCategoryForm(categoryData){
        await this.nameEn.fill(categoryData.nameEn);
        await this.nameNe.fill(categoryData.nameNe);
        await this.order.fill(categoryData.order);
        await this.saveButton.click();
    }
}