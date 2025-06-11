import { test, expect } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
})

test.describe('Cadastro', () => {
    test('Deve poder cadastrar uma nova tarefa', async ({ page, request }) => {
        const task = data.success as TaskModel

        deleteTaskByHelper(request, task.name)

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.elementShouldBeVisible(
            page.locator(`css=.task-item p >> text=${task.name}`)
        )
    })

    test('Deve exibir erro ao cadastrar tarefa duplicada', async ({
        page,
        request
    }) => {
        const task = data.duplicate as TaskModel

        deleteTaskByHelper(request, task.name)

        postTask(request, task)

        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.elementShouldBeVisible(
            page.locator('css=div >> text="Task already exists!"')
        )
    })

    test('Não deve permitir tarefa com nome em branco', async () => {
        const task = data.required as TaskModel

        await tasksPage.go()
        await tasksPage.create(task)

        const validationMessage = await tasksPage.inputTaskName.evaluate(
            e => (e as HTMLInputElement).validationMessage
        )
        expect(validationMessage).toEqual('This is a required field')
    })

    test('Deve incrementar em 1 o contador de tarefas ao criar uma nova tarefa', async ({
        request
    }) => {
        const task = data.success as TaskModel
        await deleteTaskByHelper(request, task.name)

        await tasksPage.go()

        const initialAmount: number = await tasksPage.getTasksTotal()

        await tasksPage.create(task)

        await expect(tasksPage.tasksCounter).toHaveText(
            String(initialAmount + 1)
        )
    })
})

test.describe('Atualização', () => {
    test('Deve marcar uma tarefa como concluída', async ({ request }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()

        await tasksPage.toggle(task.name)

        await tasksPage.shouldBeDone(task.name)
    })

    test('Deve incrementar em 1 o contador de tarefas concluídas ao concluir uma tarefa', async ({
        request
    }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()

        const initialAmount = await tasksPage.getDoneTasksTotal()

        await tasksPage.toggle(task.name)

        expect(await tasksPage.getDoneTasksTotal()).toBe(initialAmount + 1)
    })

    test('Deve desmarcar uma tarefa como concluída', async ({ request }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()

        await tasksPage.toggle(task.name)

        await tasksPage.toggle(task.name)

        await tasksPage.shouldBeUndone(task.name)
    })

    test('Deve decrementar em 1 o contador de tarefas concluídas ao desmarcar uma tarefa', async ({
        request
    }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()

        await tasksPage.toggle(task.name)

        const initialAmount = await tasksPage.getDoneTasksTotal()

        await tasksPage.toggle(task.name)

        expect(await tasksPage.getDoneTasksTotal()).toBe(initialAmount - 1)
    })

    test('Deve exibir modal de warning ao tentar marcar como concluída uma tarefa que já foi excluída', async ({
        request
    }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)

        await tasksPage.go()

        await tasksPage.create(task)

        await deleteTaskByHelper(request, task.name)

        await tasksPage.toggle(task.name)

        await tasksPage.elementShouldBeVisible(tasksPage.taskNotFoundModal)
    })
})

test.describe('Exclusão', () => {
    test('Deve remover uma tarefa da lista', async ({ request }) => {
        const task = data.delete as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.removeTask(task.name)
        await tasksPage.shouldNotExist(task.name)
    })

    test('Deve decrementar em 1 o contador ao remover uma tarefa', async ({
        request
    }) => {
        const task = data.delete as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()

        const initialAmount: number = await tasksPage.getTasksTotal()

        await tasksPage.removeTask(task.name)

        await expect(tasksPage.tasksCounter).toHaveText(
            String(initialAmount - 1)
        )
    })
})
