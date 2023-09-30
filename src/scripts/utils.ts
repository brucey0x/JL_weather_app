export function clearInput(inputElement: HTMLInputElement) {
    inputElement.value = ""
    const event = new Event("input", { bubbles: true, cancelable: true })
    inputElement.dispatchEvent(event)
}
