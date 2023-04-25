import { closeBrackets } from "@codemirror/autocomplete"
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands"
import { Extension } from "@codemirror/state"
import { EditorView, keymap, lineNumbers, placeholder } from "@codemirror/view"

export interface DefaultExtensionsOptions {
  placeholderStr?: string
}

export const getDefaultExtensions = (options: DefaultExtensionsOptions = {}): Extension[] => {
  const {
    placeholderStr = '',
  } = options

  const extentions: Extension[] = [
    history(),
    lineNumbers(),
    closeBrackets(),
    keymap.of([
      indentWithTab,
      ...defaultKeymap,
      ...historyKeymap,
    ]),
  ]
  const defaultLightThemeOption = EditorView.theme(
    {
      '&': {
        cursor: 'text',
        backgroundColor: '#fff',
        height: '100%',
      },
      '&.cm-focused': {
        outline: 'none',
      },
    },
    {
      dark: false,
    },
  )

  extentions.push(defaultLightThemeOption)

  if (placeholderStr) {
    extentions.unshift(placeholder(placeholderStr))
  }

  return extentions
}
