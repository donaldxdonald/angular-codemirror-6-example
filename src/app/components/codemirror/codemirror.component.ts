import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output, forwardRef, inject } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { EditorState, Extension } from '@codemirror/state'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { getDefaultExtensions } from './util'

@Component({
  selector: 'app-codemirror',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'angular-code-mirror',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodemirrorComponent),
      multi: true,
    },
  ],
})
export class CodemirrorComponent implements AfterViewInit, ControlValueAccessor {
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private _cdr = inject(ChangeDetectorRef)

  @Input() extensions: Extension[] = []
  @Input() placeholder = ''
  @Output() focusChange = new EventEmitter<boolean>()

  value = ''
  editorView?: EditorView

  onChange = (value: string, vu: ViewUpdate) => {
    // noop
  }

  @HostBinding('class.codemirror-focused')
  get isFocused(): boolean {
    return !!this.editorView?.hasFocus
  }

  ngAfterViewInit(): void {
    this.initEditor()
  }

  private initEditor() {
    const defaultExtensions = getDefaultExtensions({
      placeholderStr: this.placeholder,
    })

    const updateListener = EditorView.updateListener.of(vu => {
      if (
        vu.docChanged &&
        typeof this.onChange === 'function'
      ) {
        const docContent = this.editorView?.state?.doc?.sliceString(0) || ''
        this.onChange(docContent, vu)
      }

      if (vu.focusChanged) {
        this.focusChange.emit(this.isFocused)
      }
    })

    const getExtensions = [...defaultExtensions, updateListener]

    const initialState = EditorState.create({
      doc: this.value,
      extensions: getExtensions.concat(this.extensions),
    })

    this.editorView = new EditorView({
      state: initialState,
      parent: this._elementRef.nativeElement,
    })
  }

  writeValue(value: string): void {
    this.value = value
  }

  registerOnChange(fn: typeof this.onChange): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    // noop
  }
}
