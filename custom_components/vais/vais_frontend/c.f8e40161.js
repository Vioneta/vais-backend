import {
  a as i,
  H as s,
  e as t,
  m as o,
  ah as a,
  a0 as e,
  $ as h,
  ay as r,
  az as n,
  aA as c,
  aB as l,
  aC as d,
  d as p,
  r as u,
  n as y,
} from './main-2af83765.js'
import './c.d55610b5.js'
import { m as _ } from './c.d0af35b1.js'
import './c.8bde5a37.js'
import './c.80f50c51.js'
import './c.743a15a1.js'
import './c.d608b0a2.js'
import './c.7aca5ec5.js'
let m = i(
  [y('vais-repository-info-dialog')],
  function (i, s) {
    return {
      F: class extends s {
        constructor(...s) {
          super(...s), i(this)
        }
      },
      d: [
        { kind: 'field', decorators: [t()], key: 'repository', value: void 0 },
        {
          kind: 'field',
          decorators: [t({ attribute: !1 })],
          key: '_repository',
          value: void 0,
        },
        {
          kind: 'field',
          key: '_getRepository',
          value: () =>
            o((i, s) => (null == i ? void 0 : i.find((i) => i.id === s))),
        },
        {
          kind: 'field',
          key: '_getAuthors',
          value: () =>
            o((i) => {
              const s = []
              if (!i.authors) return s
              if (
                (i.authors.forEach((i) => s.push(i.replace('@', ''))),
                0 === s.length)
              ) {
                const t = i.full_name.split('/')[0]
                if (
                  [
                    'custom-cards',
                    'custom-components',
                    'home-assistant-community-themes',
                  ].includes(t)
                )
                  return s
                s.push(t)
              }
              return s
            }),
        },
        {
          kind: 'method',
          key: 'shouldUpdate',
          value: function (i) {
            return (
              i.forEach((i, s) => {
                'hass' === s &&
                  (this.sidebarDocked =
                    '"docked"' ===
                    window.localStorage.getItem('dockedSidebar')),
                  'vais' === s &&
                    (this._repository = this._getRepository(
                      this.vais.repositories,
                      this.repository
                    ))
              }),
              i.has('sidebarDocked') ||
                i.has('narrow') ||
                i.has('active') ||
                i.has('_repository')
            )
          },
        },
        {
          kind: 'method',
          key: 'firstUpdated',
          value: async function () {
            var i
            if (
              ((this._repository = this._getRepository(
                this.vais.repositories,
                this.repository
              )),
              null === (i = this._repository) ||
                void 0 === i ||
                !i.updated_info)
            ) {
              await a(this.hass, this._repository.id)
              const i = await e(this.hass)
              this.dispatchEvent(
                new CustomEvent('update-vais', {
                  detail: { repositories: i },
                  bubbles: !0,
                  composed: !0,
                })
              ),
                (this._repository = this._getRepository(i, this.repository))
            }
          },
        },
        {
          kind: 'method',
          key: 'render',
          value: function () {
            if (!this.active || !this._repository) return h``
            const i = this._getAuthors(this._repository)
            return h`
      <vais-dialog
        .hideActions=${this._repository.installed}
        .active=${this.active}
        .title=${this._repository.name || ''}
        .hass=${this.hass}
        maxWidth
      >
        <div class="content">
          <div class="chips">
            ${
              this._repository.installed
                ? h`
                  <ha-chip title="${this.vais.localize(
                    'dialog_info.version_installed'
                  )}" hasIcon>
                    <ha-svg-icon slot="icon" .path=${r}></ha-svg-icon>
                    ${this._repository.installed_version}
                  </ha-chip>
                `
                : ''
            }
            ${
              i
                ? i.map(
                    (i) => h`<vais-link .url="https://github.com/${i}">
                    <ha-chip title="${this.vais.localize(
                      'dialog_info.author'
                    )}" hasIcon>
                      <ha-svg-icon slot="icon" .path=${n}></ha-svg-icon>
                      @${i}
                    </ha-chip>
                  </vais-link>`
                  )
                : ''
            }
            ${
              this._repository.downloads
                ? h` <ha-chip hasIcon title="${this.vais.localize(
                    'dialog_info.downloads'
                  )}">
                  <ha-svg-icon slot="icon" .path=${c}></ha-svg-icon>
                  ${this._repository.downloads}
                </ha-chip>`
                : ''
            }
            <ha-chip title="${this.vais.localize('dialog_info.stars')}" hasIcon>
              <ha-svg-icon slot="icon" .path=${l}></ha-svg-icon>
              ${this._repository.stars}
            </ha-chip>
            <vais-link .url="https://github.com/${
              this._repository.full_name
            }/issues">
              <ha-chip title="${this.vais.localize(
                'dialog_info.open_issues'
              )}" hasIcon>
                <ha-svg-icon slot="icon" .path=${d}></ha-svg-icon>
                ${this._repository.issues}
              </ha-chip>
            </vais-link>
          </div>

          ${
            this._repository.updated_info
              ? _.html(
                  this._repository.additional_info ||
                    this.vais.localize('dialog_info.no_info'),
                  this._repository
                )
              : h`
                <div class="loading">
                  <ha-circular-progress active size="large"></ha-circular-progress>
                </div>
              `
          }
        </div>
        ${
          !this._repository.installed && this._repository.updated_info
            ? h`
              <mwc-button slot="primaryaction" @click=${
                this._installRepository
              }>
                ${this.vais.localize('dialog_info.download')}
              </mwc-button>
              <vais-link
                slot="secondaryaction"
                .url="https://github.com/${this._repository.full_name}"
              >
                <mwc-button>${this.vais.localize(
                  'dialog_info.open_repo'
                )}</mwc-button>
              </vais-link>
            `
            : ''
        }
      </vais-dialog>
    `
          },
        },
        {
          kind: 'get',
          static: !0,
          key: 'styles',
          value: function () {
            return [
              p,
              u`
        img {
          max-width: 100%;
        }
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 8rem;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 8px;
          gap: 4px;
        }

        vais-link mwc-button {
          margin-top: -18px;
        }
      `,
            ]
          },
        },
        {
          kind: 'method',
          key: '_installRepository',
          value: async function () {
            this.dispatchEvent(
              new CustomEvent('vais-dialog-secondary', {
                detail: { type: 'download', repository: this._repository.id },
                bubbles: !0,
                composed: !0,
              })
            )
          },
        },
      ],
    }
  },
  s
)
export { m as VaisRepositoryDialog }
