describe('FullInput', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-components-fillinput--fill-input-base-example&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

// describe('task', () => {
//     it('base example, visually looks correct', async () => {
//         // APIs from jest-puppeteer
//         await page.goto('http://localhost:9009/iframe.html?id=todolist-components-task--task-base-example&viewMode=story')
//         const image = await page.screenshot()
//
//         // API from jest-image-snapshot
//         expect(image).toMatchImageSnapshot()
//     })
// })