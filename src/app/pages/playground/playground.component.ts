import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Extension } from '@codemirror/state'
import { CodemirrorComponent } from '../../components/codemirror/codemirror.component'

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CodemirrorComponent,
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flex flex-col h-screen w-screen',
  },
  templateUrl: './playground.component.html',
  styles: [
  ],
})
export class PlaygroundComponent {
  codeContent = ''
  placeholder = 'Input some stuff...'

  extensions: Extension[] = [

  ]
}
