import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { javascript } from '@codemirror/lang-javascript'
import { markdown } from '@codemirror/lang-markdown'
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { Extension } from '@codemirror/state'
import { lineNumbers } from '@codemirror/view'
import { noctisLilac, rosePineDawn } from 'thememirror'
import { CodemirrorComponent } from '../../components/codemirror/codemirror.component'

type EditorOption = {
  type: string
  text: string
  extensions: Extension[]
  placeholder?: string
}

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    CodemirrorComponent,
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flex flex-col h-screen w-screen text-slate-600',
  },
  templateUrl: './playground.component.html',
  styles: [
  ],
})
export class PlaygroundComponent {
  codeContent = ''

  editorExamples: EditorOption[] = [
    {
      type: 'md',
      text: 'Markdown',
      placeholder: 'Input some stuff...',
      extensions: [
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        markdown({
          codeLanguages: languages,
        }),
        noctisLilac,
      ],
    },
    {
      type: 'js',
      text: 'JavaScript / TypeScript',
      extensions: [
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        javascript({
          typescript: true,
        }),
        lineNumbers(),
        rosePineDawn,
      ],
    },
  ]
}
