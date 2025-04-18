import { test, expect } from '@playwright/test';
import { Share } from './pages/share.page';

const pageURL = 'https://f.io/7ZkQV5P6';

test('As a user, I can leave a comment on a share 💬', async ({ page })=>{
    const sharePage = new Share(page, pageURL);
    await sharePage.goto();
    await expect(sharePage.commentInput).toBeVisible();
    const comment = `Test Comment - ${Date.now()}`;
    await sharePage.leaveComment(comment);
    await sharePage.displayComment(comment);
});

test('As a user, I can start and stop playback on a video 🎬', async({ page })=>{
    const sharePage = new Share(page, pageURL);
    await sharePage.goto();
    await expect(sharePage.playButton).toBeVisible();
    const timestamp = '00:00:00:00';
    await expect(sharePage.timeDisplay).toHaveText(timestamp);
    await sharePage.playButton.click();
    // Note: It appears Chromeium doesn't correctly buffer the video on click.
    await expect(sharePage.bufferingSpinner).toBeVisible({timeout: 10000, visible: false});
    await expect(sharePage.pauseButton).toBeVisible();
    await page.waitForTimeout(3000); // Wait 3 sec of playback
    await sharePage.pauseButton.click();
    await expect(sharePage.playButton).toBeVisible();
    // TODO: Update to check that the display timer shows at least 3 seconds have passed.
    await expect(sharePage.timeDisplay).not.toHaveText(timestamp, {timeout: 10000});
});

test('As a user, I can toggle the "Fields" tab and enable a filter 🧩', async({ page })=>{
    const sharePage = new Share(page, pageURL);
    await sharePage.goto();
    await expect(sharePage.fieldsTab).toBeVisible();
    await sharePage.fieldsTab.click();
    await expect(sharePage.fieldsAssignee).toBeVisible();
    await expect(sharePage.fieldsAudioBitRate).toBeVisible();
    await sharePage.filterButton.click();
    await expect(sharePage.filterDialog).toBeVisible();
    await sharePage.filterEmpty.click();
    await expect(sharePage.fieldsAssignee).toBeVisible();
    await expect(sharePage.fieldsAudioBitRate).toBeVisible({ visible: false});
});