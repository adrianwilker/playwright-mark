import { Page, Locator, expect } from '@playwright/test'
import { TaskModel } from '../../../fixtures/task.model'

export class TasksPage {
    readonly page: Page
    readonly inputTaskName: Locator
    readonly tasksCounter: Locator
    readonly doneTasksCounter: Locator
    readonly taskNotFoundModal: Locator

    constructor(page: Page) {
        this.page = page
        this.inputTaskName = page.locator('input[class*=InputNewTask]')
        this.tasksCounter = page.locator(
            'div[class*=CreatedTaskCounter] > span'
        )
        this.doneTasksCounter = page.locator(
            'div[class*=DoneTaskCounter] > span'
        )
        this.taskNotFoundModal = page.locator(
            'xpath=//div[text()="Task not found!"]/..'
        )
    }

    async go() {
        await this.page.goto('/')
    }

    async create(task: TaskModel) {
        await this.inputTaskName.fill(task.name)
        await this.page.click('css=button >> text=Create')
    }

    async elementShouldBeVisible(locator: Locator) {
        await expect(locator).toBeVisible()
    }

    async toggle(taskName: string) {
        const target = this.page.locator(
            `xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`
        )
        await target.click()
    }

    async shouldBeDone(taskName: string) {
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }

    async shouldBeUndone(taskName: string) {
        const target = this.page.getByText(taskName)
        await expect(target).not.toHaveCSS(
            'text-decoration-line',
            'line-through'
        )
    }

    async removeTask(taskName: string) {
        const target = this.page.locator(
            `xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`
        )
        await target.click()
    }

    async shouldNotExist(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).not.toBeVisible()
    }

    async getTasksTotal(): Promise<number> {
        const text = await this.tasksCounter.innerText()
        return Number(text.trim())
    }

    async getDoneTasksTotal(): Promise<number> {
        const text = await this.doneTasksCounter.innerText()
        return Number(text.split(' ')[0])
    }
}
