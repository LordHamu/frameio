import {type Locator, type Page, expect} from '@playwright/test'

export class Share {
    readonly page: Page;
    readonly url: string;
    readonly commentInput: Locator;
    readonly commentSend: Locator;
    readonly anonForm: Locator;
    readonly anonFormName: Locator;
    readonly anonFormEmail: Locator;
    readonly anonFormSubmit: Locator;
    readonly playButton: Locator;
    readonly pauseButton: Locator;
    readonly timeDisplay: Locator;
    readonly bufferingSpinner: Locator;
    readonly fieldsTab: Locator;
    readonly filterDialog: Locator;
    readonly filterButton: Locator;
    readonly filterEmpty: Locator;
    readonly fieldsAssignee: Locator;
    readonly fieldsAudioBitRate: Locator;

    constructor(page: Page, url: string){
        this.page = page;
        this.url = url;
        this.commentInput = page.getByTestId('create-comment-comment-composer');
        this.commentSend = page.getByTestId('composer-submit-button');
        this.anonForm = page.getByTestId('share-user-identity-popover');
        this.anonFormName = page.locator('input[aria-label="Your name"]');
        this.anonFormEmail = page.locator('input[aria-label="Your email"]');
        this.anonFormSubmit = page.locator('[data-testid="share-user-identity-popover"] button[type="submit"]');
        this.playButton = page.getByTestId('play-pause-button');
        this.pauseButton = page.getByTestId('pause-button');
        this.timeDisplay = page.getByTestId('time-display-text');
        this.bufferingSpinner = page.locator('[aria-label="Video asset is buffering"]');
        this.fieldsTab = page.getByRole('tab', {name: 'Fields'});
        this.filterDialog = page.getByText('Filter by…NoneOnly EmptyOnly');
        this.filterButton = page.getByRole('button', { name: 'None Filter fields' });
        this.filterEmpty = page.getByRole('option', { name: 'Only Empty' }).locator('span');
        this.fieldsAssignee = page.getByText('Assignee');
        this.fieldsAudioBitRate = page.getByText('Audio Bit Rate');
    }

    async goto(){
        await this.page.goto(this.url);
    }

    async leaveComment(input: string){
        await this.commentInput.click();
        await this.commentInput.fill(input);
        await this.commentSend.click();
        if(await this.anonForm.isVisible()){
            await this.anonFormName.fill('Clayton\'s Test User'); // TODO: Move these into a .env
            await this.anonFormEmail.fill('lordhamu@gmail.com');
            await this.anonFormSubmit.click();
        }
    }
    async displayComment(commentText: string){
        const comment = await this.page.getByText(commentText);
        await expect(comment).toBeVisible();
    }
}