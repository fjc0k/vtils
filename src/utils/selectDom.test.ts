import {
  selectElement,
  selectElementAll,
  selectElementExists,
  selectElementLast,
} from './selectDom'

describe('selectDom', () => {
  beforeAll(() => {
    const content = document.createElement('div')
    content.innerHTML = `
      <div>
        <input class="input" />
        <input class="input2" />
        <button class="button">按钮</button>
      </div>

      <div id="main">
        <input data-main="true" class="input" />
        <input data-main="true" class="input2" />
        <button data-main="true" class="button">按钮</button>
      </div>
    `
    document.body.appendChild(content)
  })

  test('selectElement 正常', () => {
    expect(selectElement('input')).toMatchSnapshot()
    expect(selectElement('input.input')).toMatchSnapshot()
    expect(selectElement('input.input2')).toMatchSnapshot()
    expect(selectElement('.input')).toMatchSnapshot()
    expect(selectElement('.input2')).toMatchSnapshot()
    expect(selectElement('button.button')?.textContent?.trim()).toBe('按钮')
  })

  test('selectElementLast 正常', () => {
    expect(selectElementLast('input')).toMatchSnapshot()
    expect(selectElementLast('input.input')).toMatchSnapshot()
    expect(selectElementLast('input.input2')).toMatchSnapshot()
    expect(selectElementLast('.input')).toMatchSnapshot()
    expect(selectElementLast('.input2')).toMatchSnapshot()
    expect(selectElementLast('button.button')?.textContent?.trim()).toBe('按钮')
  })

  test('selectElementExists 正常', () => {
    expect(selectElementExists('input')).toBeTrue()
    expect(selectElementExists('input.input')).toBeTrue()
    expect(selectElementExists('input.input2')).toBeTrue()
    expect(selectElementExists('.input')).toBeTrue()
    expect(selectElementExists('.input2')).toBeTrue()
    expect(selectElementExists('button.button')).toBeTrue()
    expect(selectElementExists('div.x')).toBeFalse()
  })

  test('selectElementAll 正常', () => {
    expect(selectElementAll('input')).toMatchSnapshot()
    expect(selectElementAll('input.input')).toMatchSnapshot()
    expect(selectElementAll('input.input2')).toMatchSnapshot()
    expect(selectElementAll('.input')).toMatchSnapshot()
    expect(selectElementAll('.input2')).toMatchSnapshot()
    expect(selectElementAll('button.button')).toMatchSnapshot()
  })

  test('selectElement - baseElement 正常', () => {
    expect(selectElement('input', selectElement('#main'))).toMatchSnapshot()
    expect(
      selectElement('input.input', selectElement('#main')),
    ).toMatchSnapshot()
    expect(
      selectElement('input.input2', selectElement('#main')),
    ).toMatchSnapshot()
    expect(selectElement('.input', selectElement('#main'))).toMatchSnapshot()
    expect(selectElement('.input2', selectElement('#main'))).toMatchSnapshot()
    expect(
      selectElement('button.button', selectElement('#main')),
    ).toMatchSnapshot()
  })

  test('selectElement - selectors 正常', () => {
    expect(selectElement(['input', 'button'])).toMatchSnapshot()
    expect(selectElement(['.input2', '#main .input'])).toMatchSnapshot()
  })

  test('selectElementAll - selectors 正常', () => {
    expect(selectElementAll(['input', 'button'])).toMatchSnapshot()
    expect(selectElementAll(['.input2', '#main .input'])).toMatchSnapshot()
  })
})
