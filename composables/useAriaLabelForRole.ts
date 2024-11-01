import {onMounted, onUpdated, getCurrentInstance} from "vue";

/**
 * Select all component that has attribute "role"
 *
 * @param element
 */
const selectByRoleAttribute = (element: HTMLElement) => element?.querySelectorAll('[role]') ?? []

/**
 * Apply aria-label
 *
 * @param elements
 * @param label
 */
const applyAriaLabel = async (elements: HTMLElement[], label: string) => elements.forEach(element => element.setAttribute('aria-label', label))

/**
 * Apply aria-label for element that has attribute "role"
 *
 * @param label
 */
export function useAriaLabelForRole(label: Ref<string>): void {
  const instance = getCurrentInstance()

  // Apply on mounted
  onMounted(() => applyAriaLabel(selectByRoleAttribute(instance?.proxy?.$el), label.value))
  // Apply on updated
  onUpdated(() => applyAriaLabel(selectByRoleAttribute(instance?.proxy?.$el), label.value))
}