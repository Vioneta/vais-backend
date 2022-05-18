import { a as e, H as i, e as t, $ as s, n as o } from './main-2af83765.js'
import './c.80f50c51.js'
import './c.d608b0a2.js'
import './c.7aca5ec5.js'
let c = e(
  [o('vais-progress-dialog')],
  function (e, i) {
    return {
      F: class extends i {
        constructor(...i) {
          super(...i), e(this)
        }
      },
      d: [
        { kind: 'field', decorators: [t()], key: 'title', value: void 0 },
        { kind: 'field', decorators: [t()], key: 'content', value: void 0 },
        { kind: 'field', decorators: [t()], key: 'confirmText', value: void 0 },
        { kind: 'field', decorators: [t()], key: 'confirm', value: void 0 },
        {
          kind: 'field',
          decorators: [t({ type: Boolean })],
          key: '_inProgress',
          value: () => !1,
        },
        {
          kind: 'method',
          key: 'shouldUpdate',
          value: function (e) {
            return (
              e.has('active') ||
              e.has('title') ||
              e.has('content') ||
              e.has('confirmText') ||
              e.has('confirm') ||
              e.has('_inProgress')
            )
          },
        },
        {
          kind: 'method',
          key: 'render',
          value: function () {
            return this.active
              ? s`
      <vais-dialog .active=${this.active} .hass=${this.hass} title=${
                  this.title || ''
                }>
        <div class="content">
          ${this.content || ''}
        </div>
        <mwc-button slot="secondaryaction" ?disabled=${
          this._inProgress
        } @click=${this._close}>
          ${this.vais.localize('common.cancel')}
        </mwc-button>
        <mwc-button slot="primaryaction" @click=${this._confirmed}>
          ${
            this._inProgress
              ? s`<ha-circular-progress active size="small"></ha-circular-progress>`
              : this.confirmText || this.vais.localize('common.yes')
          }</mwc-button
          >
        </mwc-button>
      </vais-dialog>
    `
              : s``
          },
        },
        {
          kind: 'method',
          key: '_confirmed',
          value: async function () {
            ;(this._inProgress = !0),
              await this.confirm(),
              (this._inProgress = !1),
              this._close()
          },
        },
        {
          kind: 'method',
          key: '_close',
          value: function () {
            ;(this.active = !1),
              this.dispatchEvent(
                new Event('vais-dialog-closed', { bubbles: !0, composed: !0 })
              )
          },
        },
      ],
    }
  },
  i
)
export { c as VaisProgressDialog }
