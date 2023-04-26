import { closeBrackets } from "@codemirror/autocomplete"
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands"
import { Extension } from "@codemirror/state"
import { EditorView, keymap, placeholder } from "@codemirror/view"

export interface DefaultExtensionsOptions {
  placeholderStr?: string
}

export const getDefaultExtensions = (options: DefaultExtensionsOptions = {}): Extension[] => {
  const {
    placeholderStr = '',
  } = options

  const extentions: Extension[] = [
    history(),
    closeBrackets(),
    keymap.of([
      indentWithTab,
      ...defaultKeymap,
      ...historyKeymap,
    ]),
  ]
  const defaultLightThemeOption = EditorView.baseTheme(
    {
      '&': {
        cursor: 'text',
        height: '100%',
      },
      '&.cm-focused': {
        outline: 'none',
      },
    },
  )

  extentions.push(defaultLightThemeOption)

  if (placeholderStr) {
    extentions.unshift(placeholder(placeholderStr))
  }

  return extentions
}
