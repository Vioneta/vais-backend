import {
  _ as e,
  n as t,
  a as i,
  H as s,
  e as a,
  b as r,
  m as o,
  $ as l,
  o as n,
  c as d,
  s as c,
  d as h,
  r as p,
} from './main-2af83765.js'
import { f as u } from './c.6281fe25.js'
import './c.08c9f9b1.js'
import { s as f, S as m, a as g } from './c.e0e0bad7.js'
import './c.d55610b5.js'
import './c.8613e225.js'
import { b as v } from './c.be11274c.js'
import './c.80f50c51.js'
import './c.d84e7514.js'
import './c.7aca5ec5.js'
import './c.d608b0a2.js'
let y = class extends m {}
;(y.styles = [f]), (y = e([t('mwc-select')], y))
const _ = ['stars', 'last_updated', 'name']
let k = i(
  [t('vais-add-repository-dialog')],
  function (e, t) {
    return {
      F: class extends t {
        constructor(...t) {
          super(...t), e(this)
        }
      },
      d: [
        {
          kind: 'field',
          decorators: [a({ attribute: !1 })],
          key: 'filters',
          value: () => [],
        },
        {
          kind: 'field',
          decorators: [a({ type: Number })],
          key: '_load',
          value: () => 30,
        },
        {
          kind: 'field',
          decorators: [a({ type: Number })],
          key: '_top',
          value: () => 0,
        },
        {
          kind: 'field',
          decorators: [a()],
          key: '_searchInput',
          value: () => '',
        },
        { kind: 'field', decorators: [a()], key: '_sortBy', value: () => _[0] },
        { kind: 'field', decorators: [a()], key: 'section', value: void 0 },
        {
          kind: 'method',
          key: 'shouldUpdate',
          value: function (e) {
            return (
              e.forEach((e, t) => {
                'hass' === t &&
                  (this.sidebarDocked =
                    '"docked"' === window.localStorage.getItem('dockedSidebar'))
              }),
              e.has('narrow') ||
                e.has('filters') ||
                e.has('active') ||
                e.has('_searchInput') ||
                e.has('_load') ||
                e.has('_sortBy')
            )
          },
        },
        {
          kind: 'field',
          key: '_repositoriesInActiveCategory',
          value() {
            return (e, t) =>
              null == e
                ? void 0
                : e.filter((e) => {
                    var i, s
                    return (
                      !e.installed &&
                      (null === (i = this.vais.sections) ||
                      void 0 === i ||
                      null ===
                        (s = i.find((e) => e.id === this.section).categories) ||
                      void 0 === s
                        ? void 0
                        : s.includes(e.category)) &&
                      !e.installed &&
                      (null == t ? void 0 : t.includes(e.category))
                    )
                  })
          },
        },
        {
          kind: 'method',
          key: 'firstUpdated',
          value: async function () {
            var e
            if (
              (this.addEventListener('filter-change', (e) =>
                this._updateFilters(e)
              ),
              0 ===
                (null === (e = this.filters) || void 0 === e
                  ? void 0
                  : e.length))
            ) {
              var t
              const e =
                null === (t = r(this.vais.language, this.route)) || void 0 === t
                  ? void 0
                  : t.categories
              null == e ||
                e
                  .filter((e) => {
                    var t
                    return null === (t = this.vais.configuration) ||
                      void 0 === t
                      ? void 0
                      : t.categories.includes(e)
                  })
                  .forEach((e) => {
                    this.filters.push({ id: e, value: e, checked: !0 })
                  }),
                this.requestUpdate('filters')
            }
          },
        },
        {
          kind: 'method',
          key: '_updateFilters',
          value: function (e) {
            const t = this.filters.find((t) => t.id === e.detail.id)
            ;(this.filters.find((e) => e.id === t.id).checked = !t.checked),
              this.requestUpdate('filters')
          },
        },
        { kind: 'field', key: '_filterRepositories', value: () => o(u) },
        {
          kind: 'method',
          key: 'render',
          value: function () {
            var e
            if (!this.active) return l``
            this._searchInput = window.localStorage.getItem('vais-search') || ''
            let t = this._filterRepositories(
              this._repositoriesInActiveCategory(
                this.repositories,
                null === (e = this.vais.configuration) || void 0 === e
                  ? void 0
                  : e.categories
              ),
              this._searchInput
            )
            return (
              0 !== this.filters.length &&
                (t = t.filter((e) => {
                  var t
                  return null ===
                    (t = this.filters.find((t) => t.id === e.category)) ||
                    void 0 === t
                    ? void 0
                    : t.checked
                })),
              l`
      <vais-dialog
        .active=${this.active}
        .hass=${this.hass}
        .title=${this.vais.localize('dialog_add_repo.title')}
        hideActions
        scrimClickAction
        maxWidth
      >
        <div class="searchandfilter" ?narrow=${this.narrow}>
          <search-input
            .hass=${this.hass}
            .label=${this.vais.localize('search.placeholder')}
            .filter=${this._searchInput}
            @value-changed=${this._inputValueChanged}
            ?narrow=${this.narrow}
          ></search-input>
          <mwc-select
            ?narrow=${this.narrow}
            .label=${this.vais.localize('dialog_add_repo.sort_by')}
            .value=${this._sortBy}
            @selected=${(e) => (this._sortBy = e.currentTarget.value)}
            @closed=${g}
          >
            ${_.map(
              (e) => l`<mwc-list-item .value=${e}>
                  ${
                    this.vais.localize(`dialog_add_repo.sort_by_values.${e}`) ||
                    e
                  }
                </mwc-list-item>`
            )}
          </mwc-select>
        </div>
        ${
          this.filters.length > 1
            ? l`<div class="filters">
              <vais-filter .vais=${this.vais} .filters="${this.filters}"></vais-filter>
            </div>`
            : ''
        }
        <div class=${n({ content: !0, narrow: this.narrow })} @scroll=${
                this._loadMore
              }>
          <div class=${n({ list: !0, narrow: this.narrow })}>
            ${t
              .sort((e, t) =>
                'name' === this._sortBy
                  ? e.name.toLocaleLowerCase() < t.name.toLocaleLowerCase()
                    ? -1
                    : 1
                  : e[this._sortBy] > t[this._sortBy]
                  ? -1
                  : 1
              )
              .slice(0, this._load)
              .map(
                (e) => l` <ha-settings-row
                  class=${n({ narrow: this.narrow })}
                  @click=${() => this._openInformation(e)}
                >
                  ${
                    this.narrow
                      ? ''
                      : 'integration' === e.category
                      ? l`
                          <img
                            slot="prefix"
                            loading="lazy"
                            .src=${v({
                              domain: e.domain,
                              darkOptimized: this.hass.themes.darkMode,
                              type: 'icon',
                            })}
                            referrerpolicy="no-referrer"
                            @error=${this._onImageError}
                            @load=${this._onImageLoad}
                          />
                        `
                      : ''
                  }
                  <span slot="heading"> ${e.name} </span>
                  <span slot="description">${e.description}</span>
                  ${
                    'integration' !== e.category
                      ? l`<ha-chip>${this.vais.localize(
                          `common.${e.category}`
                        )}</ha-chip> `
                      : ''
                  }
                </ha-settings-row>`
              )}
            ${
              0 === t.length
                ? l`<p>${this.vais.localize('dialog_add_repo.no_match')}</p>`
                : ''
            }
          </div>
        </div>
      </vais-dialog>
    `
            )
          },
        },
        {
          kind: 'method',
          key: '_loadMore',
          value: function (e) {
            const t = e.target.scrollTop
            t >= this._top ? (this._load += 1) : (this._load -= 1),
              (this._top = t)
          },
        },
        {
          kind: 'method',
          key: '_inputValueChanged',
          value: function (e) {
            ;(this._searchInput = e.detail.value),
              window.localStorage.setItem('vais-search', this._searchInput)
          },
        },
        {
          kind: 'method',
          key: '_openInformation',
          value: function (e) {
            this.dispatchEvent(
              new CustomEvent('vais-dialog-secondary', {
                detail: { type: 'repository-info', repository: e.id },
                bubbles: !0,
                composed: !0,
              })
            )
          },
        },
        {
          kind: 'method',
          key: '_onImageLoad',
          value: function (e) {
            e.target.style.visibility = 'initial'
          },
        },
        {
          kind: 'method',
          key: '_onImageError',
          value: function (e) {
            var t
            if (null !== (t = e.target) && void 0 !== t && t.outerHTML)
              try {
                e.target.outerHTML = `<ha-svg-icon path="${d}" slot="prefix"></ha-svg-icon>`
              } catch (e) {}
          },
        },
        {
          kind: 'get',
          static: !0,
          key: 'styles',
          value: function () {
            return [
              c,
              h,
              p`
        .content {
          width: 100%;
          overflow: auto;
          max-height: 70vh;
        }

        .filter {
          margin-top: -12px;
          display: flex;
          width: 200px;
          float: right;
        }

        .list {
          margin-top: 16px;
          width: 1024px;
          max-width: 100%;
        }
        ha-svg-icon {
          --mdc-icon-size: 36px;
          margin-right: 6px;
        }
        search-input {
          display: block;
          float: left;
          width: 75%;
        }
        search-input[narrow],
        mwc-select[narrow] {
          width: 100%;
          margin: 4px 0;
        }
        img {
          align-items: center;
          display: block;
          justify-content: center;
          margin-right: 6px;
          margin-bottom: 16px;
          max-height: 36px;
          max-width: 36px;
        }

        .filters {
          width: 100%;
          display: flex;
        }

        vais-filter {
          width: 100%;
          margin-left: -32px;
        }

        ha-settings-row {
          padding: 0px 16px 0 0;
          cursor: pointer;
        }

        .searchandfilter {
          display: flex;
          justify-content: space-between;
          align-items: self-end;
        }

        .searchandfilter[narrow] {
          flex-direction: column;
        }
      `,
            ]
          },
        },
      ],
    }
  },
  s
)
export { k as VaisAddRepositoryDialog }
