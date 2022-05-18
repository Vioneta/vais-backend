function e(e, t, o) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = o),
    e
  )
}
function t(e) {
  return (
    (t = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e)
        }),
    t(e)
  )
}
function o(e, o) {
  for (; !Object.prototype.hasOwnProperty.call(e, o) && null !== (e = t(e)); );
  return e
}
function r() {
  return (
    (r =
      'undefined' != typeof Reflect && Reflect.get
        ? Reflect.get
        : function (e, t, r) {
            var i = o(e, t)
            if (i) {
              var n = Object.getOwnPropertyDescriptor(i, t)
              return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value
            }
          }),
    r.apply(this, arguments)
  )
}
function i(e) {
  return (
    (function (e) {
      if (Array.isArray(e)) return e
    })(e) ||
    (function (e) {
      if (
        ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
        null != e['@@iterator']
      )
        return Array.from(e)
    })(e) ||
    (function (e, t) {
      if (!e) return
      if ('string' == typeof e) return n(e, t)
      var o = Object.prototype.toString.call(e).slice(8, -1)
      'Object' === o && e.constructor && (o = e.constructor.name)
      if ('Map' === o || 'Set' === o) return Array.from(e)
      if (
        'Arguments' === o ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)
      )
        return n(e, t)
    })(e) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    })()
  )
}
function n(e, t) {
  ;(null == t || t > e.length) && (t = e.length)
  for (var o = 0, r = new Array(t); o < t; o++) r[o] = e[o]
  return r
}
function a(e) {
  var t = (function (e, t) {
    if ('object' != typeof e || null === e) return e
    var o = e[Symbol.toPrimitive]
    if (void 0 !== o) {
      var r = o.call(e, t || 'default')
      if ('object' != typeof r) return r
      throw new TypeError('@@toPrimitive must return a primitive value.')
    }
    return ('string' === t ? String : Number)(e)
  })(e, 'string')
  return 'symbol' == typeof t ? t : String(t)
}
function s(e, t, o, r) {
  var i = l()
  if (r) for (var n = 0; n < r.length; n++) i = r[n](i)
  var a = t(function (e) {
      i.initializeInstanceElements(e, s.elements)
    }, o),
    s = i.decorateClass(
      (function (e) {
        for (
          var t = [],
            o = function (e) {
              return (
                'method' === e.kind &&
                e.key === n.key &&
                e.placement === n.placement
              )
            },
            r = 0;
          r < e.length;
          r++
        ) {
          var i,
            n = e[r]
          if ('method' === n.kind && (i = t.find(o)))
            if (u(n.descriptor) || u(i.descriptor)) {
              if (p(n) || p(i))
                throw new ReferenceError(
                  'Duplicated methods (' + n.key + ") can't be decorated."
                )
              i.descriptor = n.descriptor
            } else {
              if (p(n)) {
                if (p(i))
                  throw new ReferenceError(
                    "Decorators can't be placed on different accessors with for the same property (" +
                      n.key +
                      ').'
                  )
                i.decorators = n.decorators
              }
              c(n, i)
            }
          else t.push(n)
        }
        return t
      })(a.d.map(d)),
      e
    )
  return (
    i.initializeClassElements(a.F, s.elements),
    i.runClassFinishers(a.F, s.finishers)
  )
}
function l() {
  l = function () {
    return e
  }
  var e = {
    elementsDefinitionOrder: [['method'], ['field']],
    initializeInstanceElements: function (e, t) {
      ;['method', 'field'].forEach(function (o) {
        t.forEach(function (t) {
          t.kind === o && 'own' === t.placement && this.defineClassElement(e, t)
        }, this)
      }, this)
    },
    initializeClassElements: function (e, t) {
      var o = e.prototype
      ;['method', 'field'].forEach(function (r) {
        t.forEach(function (t) {
          var i = t.placement
          if (t.kind === r && ('static' === i || 'prototype' === i)) {
            var n = 'static' === i ? e : o
            this.defineClassElement(n, t)
          }
        }, this)
      }, this)
    },
    defineClassElement: function (e, t) {
      var o = t.descriptor
      if ('field' === t.kind) {
        var r = t.initializer
        o = {
          enumerable: o.enumerable,
          writable: o.writable,
          configurable: o.configurable,
          value: void 0 === r ? void 0 : r.call(e),
        }
      }
      Object.defineProperty(e, t.key, o)
    },
    decorateClass: function (e, t) {
      var o = [],
        r = [],
        i = { static: [], prototype: [], own: [] }
      if (
        (e.forEach(function (e) {
          this.addElementPlacement(e, i)
        }, this),
        e.forEach(function (e) {
          if (!p(e)) return o.push(e)
          var t = this.decorateElement(e, i)
          o.push(t.element),
            o.push.apply(o, t.extras),
            r.push.apply(r, t.finishers)
        }, this),
        !t)
      )
        return { elements: o, finishers: r }
      var n = this.decorateConstructor(o, t)
      return r.push.apply(r, n.finishers), (n.finishers = r), n
    },
    addElementPlacement: function (e, t, o) {
      var r = t[e.placement]
      if (!o && -1 !== r.indexOf(e.key))
        throw new TypeError('Duplicated element (' + e.key + ')')
      r.push(e.key)
    },
    decorateElement: function (e, t) {
      for (
        var o = [], r = [], i = e.decorators, n = i.length - 1;
        n >= 0;
        n--
      ) {
        var a = t[e.placement]
        a.splice(a.indexOf(e.key), 1)
        var s = this.fromElementDescriptor(e),
          l = this.toElementFinisherExtras((0, i[n])(s) || s)
        ;(e = l.element),
          this.addElementPlacement(e, t),
          l.finisher && r.push(l.finisher)
        var d = l.extras
        if (d) {
          for (var c = 0; c < d.length; c++) this.addElementPlacement(d[c], t)
          o.push.apply(o, d)
        }
      }
      return { element: e, finishers: r, extras: o }
    },
    decorateConstructor: function (e, t) {
      for (var o = [], r = t.length - 1; r >= 0; r--) {
        var i = this.fromClassDescriptor(e),
          n = this.toClassDescriptor((0, t[r])(i) || i)
        if (
          (void 0 !== n.finisher && o.push(n.finisher), void 0 !== n.elements)
        ) {
          e = n.elements
          for (var a = 0; a < e.length - 1; a++)
            for (var s = a + 1; s < e.length; s++)
              if (e[a].key === e[s].key && e[a].placement === e[s].placement)
                throw new TypeError('Duplicated element (' + e[a].key + ')')
        }
      }
      return { elements: e, finishers: o }
    },
    fromElementDescriptor: function (e) {
      var t = {
        kind: e.kind,
        key: e.key,
        placement: e.placement,
        descriptor: e.descriptor,
      }
      return (
        Object.defineProperty(t, Symbol.toStringTag, {
          value: 'Descriptor',
          configurable: !0,
        }),
        'field' === e.kind && (t.initializer = e.initializer),
        t
      )
    },
    toElementDescriptors: function (e) {
      if (void 0 !== e)
        return i(e).map(function (e) {
          var t = this.toElementDescriptor(e)
          return (
            this.disallowProperty(e, 'finisher', 'An element descriptor'),
            this.disallowProperty(e, 'extras', 'An element descriptor'),
            t
          )
        }, this)
    },
    toElementDescriptor: function (e) {
      var t = String(e.kind)
      if ('method' !== t && 'field' !== t)
        throw new TypeError(
          'An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "' +
            t +
            '"'
        )
      var o = a(e.key),
        r = String(e.placement)
      if ('static' !== r && 'prototype' !== r && 'own' !== r)
        throw new TypeError(
          'An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "' +
            r +
            '"'
        )
      var i = e.descriptor
      this.disallowProperty(e, 'elements', 'An element descriptor')
      var n = {
        kind: t,
        key: o,
        placement: r,
        descriptor: Object.assign({}, i),
      }
      return (
        'field' !== t
          ? this.disallowProperty(e, 'initializer', 'A method descriptor')
          : (this.disallowProperty(
              i,
              'get',
              'The property descriptor of a field descriptor'
            ),
            this.disallowProperty(
              i,
              'set',
              'The property descriptor of a field descriptor'
            ),
            this.disallowProperty(
              i,
              'value',
              'The property descriptor of a field descriptor'
            ),
            (n.initializer = e.initializer)),
        n
      )
    },
    toElementFinisherExtras: function (e) {
      return {
        element: this.toElementDescriptor(e),
        finisher: m(e, 'finisher'),
        extras: this.toElementDescriptors(e.extras),
      }
    },
    fromClassDescriptor: function (e) {
      var t = {
        kind: 'class',
        elements: e.map(this.fromElementDescriptor, this),
      }
      return (
        Object.defineProperty(t, Symbol.toStringTag, {
          value: 'Descriptor',
          configurable: !0,
        }),
        t
      )
    },
    toClassDescriptor: function (e) {
      var t = String(e.kind)
      if ('class' !== t)
        throw new TypeError(
          'A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "' +
            t +
            '"'
        )
      this.disallowProperty(e, 'key', 'A class descriptor'),
        this.disallowProperty(e, 'placement', 'A class descriptor'),
        this.disallowProperty(e, 'descriptor', 'A class descriptor'),
        this.disallowProperty(e, 'initializer', 'A class descriptor'),
        this.disallowProperty(e, 'extras', 'A class descriptor')
      var o = m(e, 'finisher')
      return { elements: this.toElementDescriptors(e.elements), finisher: o }
    },
    runClassFinishers: function (e, t) {
      for (var o = 0; o < t.length; o++) {
        var r = (0, t[o])(e)
        if (void 0 !== r) {
          if ('function' != typeof r)
            throw new TypeError('Finishers must return a constructor.')
          e = r
        }
      }
      return e
    },
    disallowProperty: function (e, t, o) {
      if (void 0 !== e[t])
        throw new TypeError(o + " can't have a ." + t + ' property.')
    },
  }
  return e
}
function d(e) {
  var t,
    o = a(e.key)
  'method' === e.kind
    ? (t = { value: e.value, writable: !0, configurable: !0, enumerable: !1 })
    : 'get' === e.kind
    ? (t = { get: e.value, configurable: !0, enumerable: !1 })
    : 'set' === e.kind
    ? (t = { set: e.value, configurable: !0, enumerable: !1 })
    : 'field' === e.kind &&
      (t = { configurable: !0, writable: !0, enumerable: !0 })
  var r = {
    kind: 'field' === e.kind ? 'field' : 'method',
    key: o,
    placement: e.static ? 'static' : 'field' === e.kind ? 'own' : 'prototype',
    descriptor: t,
  }
  return (
    e.decorators && (r.decorators = e.decorators),
    'field' === e.kind && (r.initializer = e.value),
    r
  )
}
function c(e, t) {
  void 0 !== e.descriptor.get
    ? (t.descriptor.get = e.descriptor.get)
    : (t.descriptor.set = e.descriptor.set)
}
function p(e) {
  return e.decorators && e.decorators.length
}
function u(e) {
  return void 0 !== e && !(void 0 === e.value && void 0 === e.writable)
}
function m(e, t) {
  var o = e[t]
  if (void 0 !== o && 'function' != typeof o)
    throw new TypeError("Expected '" + t + "' to be a function")
  return o
}
const h =
    window.ShadowRoot &&
    (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  g = Symbol(),
  _ = new Map()
class f {
  constructor(e, t) {
    if (((this._$cssResult$ = !0), t !== g))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      )
    this.cssText = e
  }
  get styleSheet() {
    let e = _.get(this.cssText)
    return (
      h &&
        void 0 === e &&
        (_.set(this.cssText, (e = new CSSStyleSheet())),
        e.replaceSync(this.cssText)),
      e
    )
  }
  toString() {
    return this.cssText
  }
}
const y = (e) => new f('string' == typeof e ? e : e + '', g),
  b = (e, ...t) => {
    const o =
      1 === e.length
        ? e[0]
        : t.reduce(
            (t, o, r) =>
              t +
              ((e) => {
                if (!0 === e._$cssResult$) return e.cssText
                if ('number' == typeof e) return e
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    e +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                )
              })(o) +
              e[r + 1],
            e[0]
          )
    return new f(o, g)
  },
  v = h
    ? (e) => e
    : (e) =>
        e instanceof CSSStyleSheet
          ? ((e) => {
              let t = ''
              for (const o of e.cssRules) t += o.cssText
              return y(t)
            })(e)
          : e
var C
const A = window.trustedTypes,
  w = A ? A.emptyScript : '',
  H = window.reactiveElementPolyfillSupport,
  k = {
    toAttribute(e, t) {
      switch (t) {
        case Boolean:
          e = e ? w : null
          break
        case Object:
        case Array:
          e = null == e ? e : JSON.stringify(e)
      }
      return e
    },
    fromAttribute(e, t) {
      let o = e
      switch (t) {
        case Boolean:
          o = null !== e
          break
        case Number:
          o = null === e ? null : Number(e)
          break
        case Object:
        case Array:
          try {
            o = JSON.parse(e)
          } catch (e) {
            o = null
          }
      }
      return o
    },
  },
  S = (e, t) => t !== e && (t == t || e == e),
  L = { attribute: !0, type: String, converter: k, reflect: !1, hasChanged: S }
class x extends HTMLElement {
  constructor() {
    super(),
      (this._$Et = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Ei = null),
      this.o()
  }
  static addInitializer(e) {
    var t
    ;(null !== (t = this.l) && void 0 !== t) || (this.l = []), this.l.push(e)
  }
  static get observedAttributes() {
    this.finalize()
    const e = []
    return (
      this.elementProperties.forEach((t, o) => {
        const r = this._$Eh(o, t)
        void 0 !== r && (this._$Eu.set(r, o), e.push(r))
      }),
      e
    )
  }
  static createProperty(e, t = L) {
    if (
      (t.state && (t.attribute = !1),
      this.finalize(),
      this.elementProperties.set(e, t),
      !t.noAccessor && !this.prototype.hasOwnProperty(e))
    ) {
      const o = 'symbol' == typeof e ? Symbol() : '__' + e,
        r = this.getPropertyDescriptor(e, o, t)
      void 0 !== r && Object.defineProperty(this.prototype, e, r)
    }
  }
  static getPropertyDescriptor(e, t, o) {
    return {
      get() {
        return this[t]
      },
      set(r) {
        const i = this[e]
        ;(this[t] = r), this.requestUpdate(e, i, o)
      },
      configurable: !0,
      enumerable: !0,
    }
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || L
  }
  static finalize() {
    if (this.hasOwnProperty('finalized')) return !1
    this.finalized = !0
    const e = Object.getPrototypeOf(this)
    if (
      (e.finalize(),
      (this.elementProperties = new Map(e.elementProperties)),
      (this._$Eu = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const e = this.properties,
        t = [
          ...Object.getOwnPropertyNames(e),
          ...Object.getOwnPropertySymbols(e),
        ]
      for (const o of t) this.createProperty(o, e[o])
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0
  }
  static finalizeStyles(e) {
    const t = []
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse())
      for (const e of o) t.unshift(v(e))
    } else void 0 !== e && t.push(v(e))
    return t
  }
  static _$Eh(e, t) {
    const o = t.attribute
    return !1 === o
      ? void 0
      : 'string' == typeof o
      ? o
      : 'string' == typeof e
      ? e.toLowerCase()
      : void 0
  }
  o() {
    var e
    ;(this._$Ep = new Promise((e) => (this.enableUpdating = e))),
      (this._$AL = new Map()),
      this._$Em(),
      this.requestUpdate(),
      null === (e = this.constructor.l) ||
        void 0 === e ||
        e.forEach((e) => e(this))
  }
  addController(e) {
    var t, o
    ;(null !== (t = this._$Eg) && void 0 !== t ? t : (this._$Eg = [])).push(e),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (o = e.hostConnected) || void 0 === o || o.call(e))
  }
  removeController(e) {
    var t
    null === (t = this._$Eg) ||
      void 0 === t ||
      t.splice(this._$Eg.indexOf(e) >>> 0, 1)
  }
  _$Em() {
    this.constructor.elementProperties.forEach((e, t) => {
      this.hasOwnProperty(t) && (this._$Et.set(t, this[t]), delete this[t])
    })
  }
  createRenderRoot() {
    var e
    const t =
      null !== (e = this.shadowRoot) && void 0 !== e
        ? e
        : this.attachShadow(this.constructor.shadowRootOptions)
    return (
      ((e, t) => {
        h
          ? (e.adoptedStyleSheets = t.map((e) =>
              e instanceof CSSStyleSheet ? e : e.styleSheet
            ))
          : t.forEach((t) => {
              const o = document.createElement('style'),
                r = window.litNonce
              void 0 !== r && o.setAttribute('nonce', r),
                (o.textContent = t.cssText),
                e.appendChild(o)
            })
      })(t, this.constructor.elementStyles),
      t
    )
  }
  connectedCallback() {
    var e
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (e = this._$Eg) ||
        void 0 === e ||
        e.forEach((e) => {
          var t
          return null === (t = e.hostConnected) || void 0 === t
            ? void 0
            : t.call(e)
        })
  }
  enableUpdating(e) {}
  disconnectedCallback() {
    var e
    null === (e = this._$Eg) ||
      void 0 === e ||
      e.forEach((e) => {
        var t
        return null === (t = e.hostDisconnected) || void 0 === t
          ? void 0
          : t.call(e)
      })
  }
  attributeChangedCallback(e, t, o) {
    this._$AK(e, o)
  }
  _$ES(e, t, o = L) {
    var r, i
    const n = this.constructor._$Eh(e, o)
    if (void 0 !== n && !0 === o.reflect) {
      const a = (
        null !==
          (i =
            null === (r = o.converter) || void 0 === r
              ? void 0
              : r.toAttribute) && void 0 !== i
          ? i
          : k.toAttribute
      )(t, o.type)
      ;(this._$Ei = e),
        null == a ? this.removeAttribute(n) : this.setAttribute(n, a),
        (this._$Ei = null)
    }
  }
  _$AK(e, t) {
    var o, r, i
    const n = this.constructor,
      a = n._$Eu.get(e)
    if (void 0 !== a && this._$Ei !== a) {
      const e = n.getPropertyOptions(a),
        s = e.converter,
        l =
          null !==
            (i =
              null !==
                (r =
                  null === (o = s) || void 0 === o
                    ? void 0
                    : o.fromAttribute) && void 0 !== r
                ? r
                : 'function' == typeof s
                ? s
                : null) && void 0 !== i
            ? i
            : k.fromAttribute
      ;(this._$Ei = a), (this[a] = l(t, e.type)), (this._$Ei = null)
    }
  }
  requestUpdate(e, t, o) {
    let r = !0
    void 0 !== e &&
      (((o = o || this.constructor.getPropertyOptions(e)).hasChanged || S)(
        this[e],
        t
      )
        ? (this._$AL.has(e) || this._$AL.set(e, t),
          !0 === o.reflect &&
            this._$Ei !== e &&
            (void 0 === this._$E_ && (this._$E_ = new Map()),
            this._$E_.set(e, o)))
        : (r = !1)),
      !this.isUpdatePending && r && (this._$Ep = this._$EC())
  }
  async _$EC() {
    this.isUpdatePending = !0
    try {
      await this._$Ep
    } catch (e) {
      Promise.reject(e)
    }
    const e = this.scheduleUpdate()
    return null != e && (await e), !this.isUpdatePending
  }
  scheduleUpdate() {
    return this.performUpdate()
  }
  performUpdate() {
    var e
    if (!this.isUpdatePending) return
    this.hasUpdated,
      this._$Et &&
        (this._$Et.forEach((e, t) => (this[t] = e)), (this._$Et = void 0))
    let t = !1
    const o = this._$AL
    try {
      ;(t = this.shouldUpdate(o)),
        t
          ? (this.willUpdate(o),
            null === (e = this._$Eg) ||
              void 0 === e ||
              e.forEach((e) => {
                var t
                return null === (t = e.hostUpdate) || void 0 === t
                  ? void 0
                  : t.call(e)
              }),
            this.update(o))
          : this._$EU()
    } catch (e) {
      throw ((t = !1), this._$EU(), e)
    }
    t && this._$AE(o)
  }
  willUpdate(e) {}
  _$AE(e) {
    var t
    null === (t = this._$Eg) ||
      void 0 === t ||
      t.forEach((e) => {
        var t
        return null === (t = e.hostUpdated) || void 0 === t ? void 0 : t.call(e)
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
      this.updated(e)
  }
  _$EU() {
    ;(this._$AL = new Map()), (this.isUpdatePending = !1)
  }
  get updateComplete() {
    return this.getUpdateComplete()
  }
  getUpdateComplete() {
    return this._$Ep
  }
  shouldUpdate(e) {
    return !0
  }
  update(e) {
    void 0 !== this._$E_ &&
      (this._$E_.forEach((e, t) => this._$ES(t, this[t], e)),
      (this._$E_ = void 0)),
      this._$EU()
  }
  updated(e) {}
  firstUpdated(e) {}
}
var V
;(x.finalized = !0),
  (x.elementProperties = new Map()),
  (x.elementStyles = []),
  (x.shadowRootOptions = { mode: 'open' }),
  null == H || H({ ReactiveElement: x }),
  (null !== (C = globalThis.reactiveElementVersions) && void 0 !== C
    ? C
    : (globalThis.reactiveElementVersions = [])
  ).push('1.2.1')
const E = globalThis.trustedTypes,
  M = E ? E.createPolicy('lit-html', { createHTML: (e) => e }) : void 0,
  P = `lit$${(Math.random() + '').slice(9)}$`,
  T = '?' + P,
  z = `<${T}>`,
  N = document,
  I = (e = '') => N.createComment(e),
  O = (e) => null === e || ('object' != typeof e && 'function' != typeof e),
  R = Array.isArray,
  D = (e) => {
    var t
    return (
      R(e) ||
      'function' ==
        typeof (null === (t = e) || void 0 === t ? void 0 : t[Symbol.iterator])
    )
  },
  j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  B = /-->/g,
  $ = />/g,
  F =
    />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
  U = /'/g,
  Z = /"/g,
  q = /^(?:script|style|textarea)$/i,
  G =
    (e) =>
    (t, ...o) => ({ _$litType$: e, strings: t, values: o }),
  K = G(1),
  Y = G(2),
  W = Symbol.for('lit-noChange'),
  X = Symbol.for('lit-nothing'),
  J = new WeakMap(),
  Q = (e, t, o) => {
    var r, i
    const n =
      null !== (r = null == o ? void 0 : o.renderBefore) && void 0 !== r ? r : t
    let a = n._$litPart$
    if (void 0 === a) {
      const e =
        null !== (i = null == o ? void 0 : o.renderBefore) && void 0 !== i
          ? i
          : null
      n._$litPart$ = a = new ne(
        t.insertBefore(I(), e),
        e,
        void 0,
        null != o ? o : {}
      )
    }
    return a._$AI(e), a
  },
  ee = N.createTreeWalker(N, 129, null, !1),
  te = (e, t) => {
    const o = e.length - 1,
      r = []
    let i,
      n = 2 === t ? '<svg>' : '',
      a = j
    for (let t = 0; t < o; t++) {
      const o = e[t]
      let s,
        l,
        d = -1,
        c = 0
      for (; c < o.length && ((a.lastIndex = c), (l = a.exec(o)), null !== l); )
        (c = a.lastIndex),
          a === j
            ? '!--' === l[1]
              ? (a = B)
              : void 0 !== l[1]
              ? (a = $)
              : void 0 !== l[2]
              ? (q.test(l[2]) && (i = RegExp('</' + l[2], 'g')), (a = F))
              : void 0 !== l[3] && (a = F)
            : a === F
            ? '>' === l[0]
              ? ((a = null != i ? i : j), (d = -1))
              : void 0 === l[1]
              ? (d = -2)
              : ((d = a.lastIndex - l[2].length),
                (s = l[1]),
                (a = void 0 === l[3] ? F : '"' === l[3] ? Z : U))
            : a === Z || a === U
            ? (a = F)
            : a === B || a === $
            ? (a = j)
            : ((a = F), (i = void 0))
      const p = a === F && e[t + 1].startsWith('/>') ? ' ' : ''
      n +=
        a === j
          ? o + z
          : d >= 0
          ? (r.push(s), o.slice(0, d) + '$lit$' + o.slice(d) + P + p)
          : o + P + (-2 === d ? (r.push(void 0), t) : p)
    }
    const s = n + (e[o] || '<?>') + (2 === t ? '</svg>' : '')
    if (!Array.isArray(e) || !e.hasOwnProperty('raw'))
      throw Error('invalid template strings array')
    return [void 0 !== M ? M.createHTML(s) : s, r]
  }
class oe {
  constructor({ strings: e, _$litType$: t }, o) {
    let r
    this.parts = []
    let i = 0,
      n = 0
    const a = e.length - 1,
      s = this.parts,
      [l, d] = te(e, t)
    if (
      ((this.el = oe.createElement(l, o)),
      (ee.currentNode = this.el.content),
      2 === t)
    ) {
      const e = this.el.content,
        t = e.firstChild
      t.remove(), e.append(...t.childNodes)
    }
    for (; null !== (r = ee.nextNode()) && s.length < a; ) {
      if (1 === r.nodeType) {
        if (r.hasAttributes()) {
          const e = []
          for (const t of r.getAttributeNames())
            if (t.endsWith('$lit$') || t.startsWith(P)) {
              const o = d[n++]
              if ((e.push(t), void 0 !== o)) {
                const e = r.getAttribute(o.toLowerCase() + '$lit$').split(P),
                  t = /([.?@])?(.*)/.exec(o)
                s.push({
                  type: 1,
                  index: i,
                  name: t[2],
                  strings: e,
                  ctor:
                    '.' === t[1]
                      ? se
                      : '?' === t[1]
                      ? de
                      : '@' === t[1]
                      ? ce
                      : ae,
                })
              } else s.push({ type: 6, index: i })
            }
          for (const t of e) r.removeAttribute(t)
        }
        if (q.test(r.tagName)) {
          const e = r.textContent.split(P),
            t = e.length - 1
          if (t > 0) {
            r.textContent = E ? E.emptyScript : ''
            for (let o = 0; o < t; o++)
              r.append(e[o], I()),
                ee.nextNode(),
                s.push({ type: 2, index: ++i })
            r.append(e[t], I())
          }
        }
      } else if (8 === r.nodeType)
        if (r.data === T) s.push({ type: 2, index: i })
        else {
          let e = -1
          for (; -1 !== (e = r.data.indexOf(P, e + 1)); )
            s.push({ type: 7, index: i }), (e += P.length - 1)
        }
      i++
    }
  }
  static createElement(e, t) {
    const o = N.createElement('template')
    return (o.innerHTML = e), o
  }
}
function re(e, t, o = e, r) {
  var i, n, a, s
  if (t === W) return t
  let l =
    void 0 !== r
      ? null === (i = o._$Cl) || void 0 === i
        ? void 0
        : i[r]
      : o._$Cu
  const d = O(t) ? void 0 : t._$litDirective$
  return (
    (null == l ? void 0 : l.constructor) !== d &&
      (null === (n = null == l ? void 0 : l._$AO) ||
        void 0 === n ||
        n.call(l, !1),
      void 0 === d ? (l = void 0) : ((l = new d(e)), l._$AT(e, o, r)),
      void 0 !== r
        ? ((null !== (a = (s = o)._$Cl) && void 0 !== a ? a : (s._$Cl = []))[
            r
          ] = l)
        : (o._$Cu = l)),
    void 0 !== l && (t = re(e, l._$AS(e, t.values), l, r)),
    t
  )
}
class ie {
  constructor(e, t) {
    ;(this.v = []), (this._$AN = void 0), (this._$AD = e), (this._$AM = t)
  }
  get parentNode() {
    return this._$AM.parentNode
  }
  get _$AU() {
    return this._$AM._$AU
  }
  p(e) {
    var t
    const {
        el: { content: o },
        parts: r,
      } = this._$AD,
      i = (
        null !== (t = null == e ? void 0 : e.creationScope) && void 0 !== t
          ? t
          : N
      ).importNode(o, !0)
    ee.currentNode = i
    let n = ee.nextNode(),
      a = 0,
      s = 0,
      l = r[0]
    for (; void 0 !== l; ) {
      if (a === l.index) {
        let t
        2 === l.type
          ? (t = new ne(n, n.nextSibling, this, e))
          : 1 === l.type
          ? (t = new l.ctor(n, l.name, l.strings, this, e))
          : 6 === l.type && (t = new pe(n, this, e)),
          this.v.push(t),
          (l = r[++s])
      }
      a !== (null == l ? void 0 : l.index) && ((n = ee.nextNode()), a++)
    }
    return i
  }
  m(e) {
    let t = 0
    for (const o of this.v)
      void 0 !== o &&
        (void 0 !== o.strings
          ? (o._$AI(e, o, t), (t += o.strings.length - 2))
          : o._$AI(e[t])),
        t++
  }
}
class ne {
  constructor(e, t, o, r) {
    var i
    ;(this.type = 2),
      (this._$AH = X),
      (this._$AN = void 0),
      (this._$AA = e),
      (this._$AB = t),
      (this._$AM = o),
      (this.options = r),
      (this._$Cg =
        null === (i = null == r ? void 0 : r.isConnected) || void 0 === i || i)
  }
  get _$AU() {
    var e, t
    return null !==
      (t = null === (e = this._$AM) || void 0 === e ? void 0 : e._$AU) &&
      void 0 !== t
      ? t
      : this._$Cg
  }
  get parentNode() {
    let e = this._$AA.parentNode
    const t = this._$AM
    return void 0 !== t && 11 === e.nodeType && (e = t.parentNode), e
  }
  get startNode() {
    return this._$AA
  }
  get endNode() {
    return this._$AB
  }
  _$AI(e, t = this) {
    ;(e = re(this, e, t)),
      O(e)
        ? e === X || null == e || '' === e
          ? (this._$AH !== X && this._$AR(), (this._$AH = X))
          : e !== this._$AH && e !== W && this.$(e)
        : void 0 !== e._$litType$
        ? this.T(e)
        : void 0 !== e.nodeType
        ? this.S(e)
        : D(e)
        ? this.A(e)
        : this.$(e)
  }
  M(e, t = this._$AB) {
    return this._$AA.parentNode.insertBefore(e, t)
  }
  S(e) {
    this._$AH !== e && (this._$AR(), (this._$AH = this.M(e)))
  }
  $(e) {
    this._$AH !== X && O(this._$AH)
      ? (this._$AA.nextSibling.data = e)
      : this.S(N.createTextNode(e)),
      (this._$AH = e)
  }
  T(e) {
    var t
    const { values: o, _$litType$: r } = e,
      i =
        'number' == typeof r
          ? this._$AC(e)
          : (void 0 === r.el && (r.el = oe.createElement(r.h, this.options)), r)
    if ((null === (t = this._$AH) || void 0 === t ? void 0 : t._$AD) === i)
      this._$AH.m(o)
    else {
      const e = new ie(i, this),
        t = e.p(this.options)
      e.m(o), this.S(t), (this._$AH = e)
    }
  }
  _$AC(e) {
    let t = J.get(e.strings)
    return void 0 === t && J.set(e.strings, (t = new oe(e))), t
  }
  A(e) {
    R(this._$AH) || ((this._$AH = []), this._$AR())
    const t = this._$AH
    let o,
      r = 0
    for (const i of e)
      r === t.length
        ? t.push((o = new ne(this.M(I()), this.M(I()), this, this.options)))
        : (o = t[r]),
        o._$AI(i),
        r++
    r < t.length && (this._$AR(o && o._$AB.nextSibling, r), (t.length = r))
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o
    for (
      null === (o = this._$AP) || void 0 === o || o.call(this, !1, !0, t);
      e && e !== this._$AB;

    ) {
      const t = e.nextSibling
      e.remove(), (e = t)
    }
  }
  setConnected(e) {
    var t
    void 0 === this._$AM &&
      ((this._$Cg = e),
      null === (t = this._$AP) || void 0 === t || t.call(this, e))
  }
}
class ae {
  constructor(e, t, o, r, i) {
    ;(this.type = 1),
      (this._$AH = X),
      (this._$AN = void 0),
      (this.element = e),
      (this.name = t),
      (this._$AM = r),
      (this.options = i),
      o.length > 2 || '' !== o[0] || '' !== o[1]
        ? ((this._$AH = Array(o.length - 1).fill(new String())),
          (this.strings = o))
        : (this._$AH = X)
  }
  get tagName() {
    return this.element.tagName
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(e, t = this, o, r) {
    const i = this.strings
    let n = !1
    if (void 0 === i)
      (e = re(this, e, t, 0)),
        (n = !O(e) || (e !== this._$AH && e !== W)),
        n && (this._$AH = e)
    else {
      const r = e
      let a, s
      for (e = i[0], a = 0; a < i.length - 1; a++)
        (s = re(this, r[o + a], t, a)),
          s === W && (s = this._$AH[a]),
          n || (n = !O(s) || s !== this._$AH[a]),
          s === X ? (e = X) : e !== X && (e += (null != s ? s : '') + i[a + 1]),
          (this._$AH[a] = s)
    }
    n && !r && this.k(e)
  }
  k(e) {
    e === X
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != e ? e : '')
  }
}
class se extends ae {
  constructor() {
    super(...arguments), (this.type = 3)
  }
  k(e) {
    this.element[this.name] = e === X ? void 0 : e
  }
}
const le = E ? E.emptyScript : ''
class de extends ae {
  constructor() {
    super(...arguments), (this.type = 4)
  }
  k(e) {
    e && e !== X
      ? this.element.setAttribute(this.name, le)
      : this.element.removeAttribute(this.name)
  }
}
class ce extends ae {
  constructor(e, t, o, r, i) {
    super(e, t, o, r, i), (this.type = 5)
  }
  _$AI(e, t = this) {
    var o
    if ((e = null !== (o = re(this, e, t, 0)) && void 0 !== o ? o : X) === W)
      return
    const r = this._$AH,
      i =
        (e === X && r !== X) ||
        e.capture !== r.capture ||
        e.once !== r.once ||
        e.passive !== r.passive,
      n = e !== X && (r === X || i)
    i && this.element.removeEventListener(this.name, this, r),
      n && this.element.addEventListener(this.name, this, e),
      (this._$AH = e)
  }
  handleEvent(e) {
    var t, o
    'function' == typeof this._$AH
      ? this._$AH.call(
          null !==
            (o =
              null === (t = this.options) || void 0 === t ? void 0 : t.host) &&
            void 0 !== o
            ? o
            : this.element,
          e
        )
      : this._$AH.handleEvent(e)
  }
}
class pe {
  constructor(e, t, o) {
    ;(this.element = e),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = t),
      (this.options = o)
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(e) {
    re(this, e)
  }
}
const ue = {
    P: '$lit$',
    V: P,
    L: T,
    I: 1,
    N: te,
    R: ie,
    D: D,
    j: re,
    H: ne,
    O: ae,
    F: de,
    B: ce,
    W: se,
    Z: pe,
  },
  me = window.litHtmlPolyfillSupport
var he, ge
null == me || me(oe, ne),
  (null !== (V = globalThis.litHtmlVersions) && void 0 !== V
    ? V
    : (globalThis.litHtmlVersions = [])
  ).push('2.1.2')
class _e extends x {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Dt = void 0)
  }
  createRenderRoot() {
    var e, t
    const o = super.createRenderRoot()
    return (
      (null !== (e = (t = this.renderOptions).renderBefore) && void 0 !== e) ||
        (t.renderBefore = o.firstChild),
      o
    )
  }
  update(e) {
    const t = this.render()
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(e),
      (this._$Dt = Q(t, this.renderRoot, this.renderOptions))
  }
  connectedCallback() {
    var e
    super.connectedCallback(),
      null === (e = this._$Dt) || void 0 === e || e.setConnected(!0)
  }
  disconnectedCallback() {
    var e
    super.disconnectedCallback(),
      null === (e = this._$Dt) || void 0 === e || e.setConnected(!1)
  }
  render() {
    return W
  }
}
;(_e.finalized = !0),
  (_e._$litElement$ = !0),
  null === (he = globalThis.litElementHydrateSupport) ||
    void 0 === he ||
    he.call(globalThis, { LitElement: _e })
const fe = globalThis.litElementPolyfillSupport
null == fe || fe({ LitElement: _e }),
  (null !== (ge = globalThis.litElementVersions) && void 0 !== ge
    ? ge
    : (globalThis.litElementVersions = [])
  ).push('3.1.2')
const ye = (e) => (t) =>
    'function' == typeof t
      ? ((e, t) => (window.customElements.define(e, t), t))(e, t)
      : ((e, t) => {
          const { kind: o, elements: r } = t
          return {
            kind: o,
            elements: r,
            finisher(t) {
              window.customElements.define(e, t)
            },
          }
        })(e, t),
  be = (e, t) =>
    'method' === t.kind && t.descriptor && !('value' in t.descriptor)
      ? {
          ...t,
          finisher(o) {
            o.createProperty(t.key, e)
          },
        }
      : {
          kind: 'field',
          key: Symbol(),
          placement: 'own',
          descriptor: {},
          originalKey: t.key,
          initializer() {
            'function' == typeof t.initializer &&
              (this[t.key] = t.initializer.call(this))
          },
          finisher(o) {
            o.createProperty(t.key, e)
          },
        }
function ve(e) {
  return (t, o) =>
    void 0 !== o
      ? ((e, t, o) => {
          t.constructor.createProperty(o, e)
        })(e, t, o)
      : be(e, t)
}
function Ce(e) {
  return ve({ ...e, state: !0 })
}
const Ae =
  ({ finisher: e, descriptor: t }) =>
  (o, r) => {
    var i
    if (void 0 === r) {
      const r = null !== (i = o.originalKey) && void 0 !== i ? i : o.key,
        n =
          null != t
            ? {
                kind: 'method',
                placement: 'prototype',
                key: r,
                descriptor: t(o.key),
              }
            : { ...o, key: r }
      return (
        null != e &&
          (n.finisher = function (t) {
            e(t, r)
          }),
        n
      )
    }
    {
      const i = o.constructor
      void 0 !== t && Object.defineProperty(o, r, t(r)), null == e || e(i, r)
    }
  }
function we(e) {
  return Ae({
    finisher: (t, o) => {
      Object.assign(t.prototype[o], e)
    },
  })
}
function He(e, t) {
  return Ae({
    descriptor: (o) => {
      const r = {
        get() {
          var t, o
          return null !==
            (o =
              null === (t = this.renderRoot) || void 0 === t
                ? void 0
                : t.querySelector(e)) && void 0 !== o
            ? o
            : null
        },
        enumerable: !0,
        configurable: !0,
      }
      if (t) {
        const t = 'symbol' == typeof o ? Symbol() : '__' + o
        r.get = function () {
          var o, r
          return (
            void 0 === this[t] &&
              (this[t] =
                null !==
                  (r =
                    null === (o = this.renderRoot) || void 0 === o
                      ? void 0
                      : o.querySelector(e)) && void 0 !== r
                  ? r
                  : null),
            this[t]
          )
        }
      }
      return r
    },
  })
}
function ke(e) {
  return Ae({
    descriptor: (t) => ({
      async get() {
        var t
        return (
          await this.updateComplete,
          null === (t = this.renderRoot) || void 0 === t
            ? void 0
            : t.querySelector(e)
        )
      },
      enumerable: !0,
      configurable: !0,
    }),
  })
}
var Se
const Le =
  null !=
  (null === (Se = window.HTMLSlotElement) || void 0 === Se
    ? void 0
    : Se.prototype.assignedElements)
    ? (e, t) => e.assignedElements(t)
    : (e, t) =>
        e.assignedNodes(t).filter((e) => e.nodeType === Node.ELEMENT_NODE)
function xe(e) {
  const { slot: t, selector: o } = null != e ? e : {}
  return Ae({
    descriptor: (r) => ({
      get() {
        var r
        const i = 'slot' + (t ? `[name=${t}]` : ':not([name])'),
          n =
            null === (r = this.renderRoot) || void 0 === r
              ? void 0
              : r.querySelector(i),
          a = null != n ? Le(n, e) : []
        return o ? a.filter((e) => e.matches(o)) : a
      },
      enumerable: !0,
      configurable: !0,
    }),
  })
}
const Ve = {
    'primary-background-color': '#111111',
    'card-background-color': '#1c1c1c',
    'secondary-background-color': '#202020',
    'primary-text-color': '#e1e1e1',
    'secondary-text-color': '#9b9b9b',
    'disabled-text-color': '#6f6f6f',
    'app-header-text-color': '#e1e1e1',
    'app-header-background-color': '#101e24',
    'switch-unchecked-button-color': '#999999',
    'switch-unchecked-track-color': '#9b9b9b',
    'divider-color': 'rgba(225, 225, 225, .12)',
    'mdc-ripple-color': '#AAAAAA',
    'input-idle-line-color': 'rgba(255, 255, 255, 0.42)',
    'input-hover-line-color': 'rgba(255, 255, 255, 0.87)',
    'input-disabled-line-color': 'rgba(255, 255, 255, 0.06)',
    'input-outlined-idle-border-color': 'rgba(255, 255, 255, 0.38)',
    'input-outlined-hover-border-color': 'rgba(255, 255, 255, 0.87)',
    'input-outlined-disabled-border-color': 'rgba(255, 255, 255, 0.06)',
    'input-fill-color': 'rgba(255, 255, 255, 0.05)',
    'input-disabled-fill-color': 'rgba(255, 255, 255, 0.02)',
    'input-ink-color': 'rgba(255, 255, 255, 0.87)',
    'input-label-ink-color': 'rgba(255, 255, 255, 0.6)',
    'input-disabled-ink-color': 'rgba(255, 255, 255, 0.37)',
    'input-dropdown-icon-color': 'rgba(255, 255, 255, 0.54)',
    'codemirror-keyword': '#C792EA',
    'codemirror-operator': '#89DDFF',
    'codemirror-variable': '#f07178',
    'codemirror-variable-2': '#EEFFFF',
    'codemirror-variable-3': '#DECB6B',
    'codemirror-builtin': '#FFCB6B',
    'codemirror-atom': '#F78C6C',
    'codemirror-number': '#FF5370',
    'codemirror-def': '#82AAFF',
    'codemirror-string': '#C3E88D',
    'codemirror-string-2': '#f07178',
    'codemirror-comment': '#545454',
    'codemirror-tag': '#FF5370',
    'codemirror-meta': '#FFCB6B',
    'codemirror-attribute': '#C792EA',
    'codemirror-property': '#C792EA',
    'codemirror-qualifier': '#DECB6B',
    'codemirror-type': '#DECB6B',
    'energy-grid-return-color': '#a280db',
  },
  Ee = {
    'state-icon-error-color': 'var(--error-state-color, var(--error-color))',
    'state-unavailable-color':
      'var(--state-icon-unavailable-color, var(--disabled-text-color))',
    'sidebar-text-color': 'var(--primary-text-color)',
    'sidebar-background-color': 'var(--card-background-color)',
    'sidebar-selected-text-color': 'var(--primary-color)',
    'sidebar-selected-icon-color': 'var(--primary-color)',
    'sidebar-icon-color': 'rgba(var(--rgb-primary-text-color), 0.6)',
    'switch-checked-color': 'var(--primary-color)',
    'switch-checked-button-color':
      'var(--switch-checked-color, var(--primary-background-color))',
    'switch-checked-track-color': 'var(--switch-checked-color, #000000)',
    'switch-unchecked-button-color':
      'var(--switch-unchecked-color, var(--primary-background-color))',
    'switch-unchecked-track-color': 'var(--switch-unchecked-color, #000000)',
    'slider-color': 'var(--primary-color)',
    'slider-secondary-color': 'var(--light-primary-color)',
    'slider-track-color': 'var(--scrollbar-thumb-color)',
    'label-badge-background-color': 'var(--card-background-color)',
    'label-badge-text-color': 'rgba(var(--rgb-primary-text-color), 0.8)',
    'paper-listbox-background-color': 'var(--card-background-color)',
    'paper-item-icon-color': 'var(--state-icon-color)',
    'paper-item-icon-active-color': 'var(--state-icon-active-color)',
    'table-row-background-color': 'var(--primary-background-color)',
    'table-row-alternative-background-color':
      'var(--secondary-background-color)',
    'paper-slider-knob-color': 'var(--slider-color)',
    'paper-slider-knob-start-color': 'var(--slider-color)',
    'paper-slider-pin-color': 'var(--slider-color)',
    'paper-slider-pin-start-color': 'var(--slider-color)',
    'paper-slider-active-color': 'var(--slider-color)',
    'paper-slider-secondary-color': 'var(--slider-secondary-color)',
    'paper-slider-container-color': 'var(--slider-track-color)',
    'data-table-background-color': 'var(--card-background-color)',
    'markdown-code-background-color': 'var(--primary-background-color)',
    'mdc-theme-primary': 'var(--primary-color)',
    'mdc-theme-secondary': 'var(--accent-color)',
    'mdc-theme-background': 'var(--primary-background-color)',
    'mdc-theme-surface': 'var(--card-background-color)',
    'mdc-theme-on-primary': 'var(--text-primary-color)',
    'mdc-theme-on-secondary': 'var(--text-primary-color)',
    'mdc-theme-on-surface': 'var(--primary-text-color)',
    'mdc-theme-text-disabled-on-light': 'var(--disabled-text-color)',
    'mdc-theme-text-primary-on-background': 'var(--primary-text-color)',
    'mdc-theme-text-secondary-on-background': 'var(--secondary-text-color)',
    'mdc-theme-text-hint-on-background': 'var(--secondary-text-color)',
    'mdc-theme-text-icon-on-background': 'var(--secondary-text-color)',
    'mdc-theme-error': 'var(--error-color)',
    'app-header-text-color': 'var(--text-primary-color)',
    'app-header-background-color': 'var(--primary-color)',
    'mdc-checkbox-unchecked-color': 'rgba(var(--rgb-primary-text-color), 0.54)',
    'mdc-checkbox-disabled-color': 'var(--disabled-text-color)',
    'mdc-radio-unchecked-color': 'rgba(var(--rgb-primary-text-color), 0.54)',
    'mdc-radio-disabled-color': 'var(--disabled-text-color)',
    'mdc-tab-text-label-color-default': 'var(--primary-text-color)',
    'mdc-button-disabled-ink-color': 'var(--disabled-text-color)',
    'mdc-button-outline-color': 'var(--divider-color)',
    'mdc-dialog-scroll-divider-color': 'var(--divider-color)',
    'mdc-text-field-idle-line-color': 'var(--input-idle-line-color)',
    'mdc-text-field-hover-line-color': 'var(--input-hover-line-color)',
    'mdc-text-field-disabled-line-color': 'var(--input-disabled-line-color)',
    'mdc-text-field-outlined-idle-border-color':
      'var(--input-outlined-idle-border-color)',
    'mdc-text-field-outlined-hover-border-color':
      'var(--input-outlined-hover-border-color)',
    'mdc-text-field-outlined-disabled-border-color':
      'var(--input-outlined-disabled-border-color)',
    'mdc-text-field-fill-color': 'var(--input-fill-color)',
    'mdc-text-field-disabled-fill-color': 'var(--input-disabled-fill-color)',
    'mdc-text-field-ink-color': 'var(--input-ink-color)',
    'mdc-text-field-label-ink-color': 'var(--input-label-ink-color)',
    'mdc-text-field-disabled-ink-color': 'var(--input-disabled-ink-color)',
    'mdc-select-idle-line-color': 'var(--input-idle-line-color)',
    'mdc-select-hover-line-color': 'var(--input-hover-line-color)',
    'mdc-select-outlined-idle-border-color':
      'var(--input-outlined-idle-border-color)',
    'mdc-select-outlined-hover-border-color':
      'var(--input-outlined-hover-border-color)',
    'mdc-select-outlined-disabled-border-color':
      'var(--input-outlined-disabled-border-color)',
    'mdc-select-fill-color': 'var(--input-fill-color)',
    'mdc-select-disabled-fill-color': 'var(--input-disabled-fill-color)',
    'mdc-select-ink-color': 'var(--input-ink-color)',
    'mdc-select-label-ink-color': 'var(--input-label-ink-color)',
    'mdc-select-disabled-ink-color': 'var(--input-disabled-ink-color)',
    'mdc-select-dropdown-icon-color': 'var(--input-dropdown-icon-color)',
    'mdc-select-disabled-dropdown-icon-color':
      'var(--input-disabled-ink-color)',
    'chip-background-color': 'rgba(var(--rgb-primary-text-color), 0.15)',
    'material-body-text-color': 'var(--primary-text-color)',
    'material-background-color': 'var(--card-background-color)',
    'material-secondary-background-color': 'var(--secondary-background-color)',
    'material-secondary-text-color': 'var(--secondary-text-color)',
  },
  Me = b`
  button.link {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    text-align: left;
    text-decoration: underline;
    cursor: pointer;
  }
`,
  Pe = b`
  :host {
    font-family: var(--paper-font-body1_-_font-family);
    -webkit-font-smoothing: var(--paper-font-body1_-_-webkit-font-smoothing);
    font-size: var(--paper-font-body1_-_font-size);
    font-weight: var(--paper-font-body1_-_font-weight);
    line-height: var(--paper-font-body1_-_line-height);
  }

  app-header-layout,
  ha-app-layout {
    background-color: var(--primary-background-color);
  }

  app-header,
  app-toolbar {
    background-color: var(--app-header-background-color);
    font-weight: 400;
    color: var(--app-header-text-color, white);
  }

  app-toolbar {
    height: var(--header-height);
    border-bottom: var(--app-header-border-bottom);
    box-sizing: border-box;
  }

  app-header div[sticky] {
    height: 48px;
  }

  app-toolbar [main-title] {
    margin-left: 20px;
  }

  h1 {
    font-family: var(--paper-font-headline_-_font-family);
    -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
    white-space: var(--paper-font-headline_-_white-space);
    overflow: var(--paper-font-headline_-_overflow);
    text-overflow: var(--paper-font-headline_-_text-overflow);
    font-size: var(--paper-font-headline_-_font-size);
    font-weight: var(--paper-font-headline_-_font-weight);
    line-height: var(--paper-font-headline_-_line-height);
  }

  h2 {
    font-family: var(--paper-font-title_-_font-family);
    -webkit-font-smoothing: var(--paper-font-title_-_-webkit-font-smoothing);
    white-space: var(--paper-font-title_-_white-space);
    overflow: var(--paper-font-title_-_overflow);
    text-overflow: var(--paper-font-title_-_text-overflow);
    font-size: var(--paper-font-title_-_font-size);
    font-weight: var(--paper-font-title_-_font-weight);
    line-height: var(--paper-font-title_-_line-height);
  }

  h3 {
    font-family: var(--paper-font-subhead_-_font-family);
    -webkit-font-smoothing: var(--paper-font-subhead_-_-webkit-font-smoothing);
    white-space: var(--paper-font-subhead_-_white-space);
    overflow: var(--paper-font-subhead_-_overflow);
    text-overflow: var(--paper-font-subhead_-_text-overflow);
    font-size: var(--paper-font-subhead_-_font-size);
    font-weight: var(--paper-font-subhead_-_font-weight);
    line-height: var(--paper-font-subhead_-_line-height);
  }

  a {
    color: var(--primary-color);
  }

  .secondary {
    color: var(--secondary-text-color);
  }

  .error {
    color: var(--error-color);
  }

  .warning {
    color: var(--error-color);
  }

  mwc-button.warning {
    --mdc-theme-primary: var(--error-color);
  }

  ${Me}

  .card-actions a {
    text-decoration: none;
  }

  .card-actions .warning {
    --mdc-theme-primary: var(--error-color);
  }

  .layout.horizontal,
  .layout.vertical {
    display: flex;
  }
  .layout.inline {
    display: inline-flex;
  }
  .layout.horizontal {
    flex-direction: row;
  }
  .layout.vertical {
    flex-direction: column;
  }
  .layout.wrap {
    flex-wrap: wrap;
  }
  .layout.no-wrap {
    flex-wrap: nowrap;
  }
  .layout.center,
  .layout.center-center {
    align-items: center;
  }
  .layout.bottom {
    align-items: flex-end;
  }
  .layout.center-justified,
  .layout.center-center {
    justify-content: center;
  }
  .flex {
    flex: 1;
    flex-basis: 0.000000001px;
  }
  .flex-auto {
    flex: 1 1 auto;
  }
  .flex-none {
    flex: none;
  }
  .layout.justified {
    justify-content: space-between;
  }
`,
  Te = b`
  /* mwc-dialog (ha-dialog) styles */
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-heading-ink-color: var(--primary-text-color);
    --mdc-dialog-content-ink-color: var(--primary-text-color);
    --justify-action-buttons: space-between;
  }

  ha-dialog .form {
    padding-bottom: 24px;
    color: var(--primary-text-color);
  }

  a {
    color: var(--primary-color);
  }

  /* make dialog fullscreen on small screens */
  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog {
      --mdc-dialog-min-width: calc(
        100vw - env(safe-area-inset-right) - env(safe-area-inset-left)
      );
      --mdc-dialog-max-width: calc(
        100vw - env(safe-area-inset-right) - env(safe-area-inset-left)
      );
      --mdc-dialog-min-height: 100%;
      --mdc-dialog-max-height: 100%;
      --vertial-align-dialog: flex-end;
      --ha-dialog-border-radius: 0px;
    }
  }
  mwc-button.warning {
    --mdc-theme-primary: var(--error-color);
  }
  .error {
    color: var(--error-color);
  }
`
b`
  .ha-scrollbar::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }

  .ha-scrollbar::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: var(--scrollbar-thumb-color);
  }

  .ha-scrollbar {
    overflow-y: auto;
    scrollbar-color: var(--scrollbar-thumb-color) transparent;
    scrollbar-width: thin;
  }
`,
  b`
  body {
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    height: calc(100vh - 32px);
    width: 100vw;
  }
`
const ze = (e) => {
    if (6 === (e = e.replace('#', '')).length) return e
    let t = ''
    for (const o of e) t += o + o
    return t
  },
  Ne = (e) => {
    const t = Math.round(Math.min(Math.max(e, 0), 255)).toString(16)
    return 1 === t.length ? `0${t}` : t
  },
  Ie = (e) => (
    (e = ze(e)),
    [
      parseInt(e.substring(0, 2), 16),
      parseInt(e.substring(2, 4), 16),
      parseInt(e.substring(4, 6), 16),
    ]
  ),
  Oe = (e) => `#${Ne(e[0])}${Ne(e[1])}${Ne(e[2])}`,
  Re = 0.137931034,
  De = 0.12841855,
  je = (e) =>
    (e /= 255) <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4,
  Be = (e) => (e > 0.008856452 ? e ** (1 / 3) : e / De + Re),
  $e = (e) => 255 * (e <= 0.00304 ? 12.92 * e : 1.055 * e ** (1 / 2.4) - 0.055),
  Fe = (e) => (e > 0.206896552 ? e * e * e : De * (e - Re)),
  Ue = (e) => {
    const [t, o, r] = ((e) => {
        let [t, o, r] = e
        return (
          (t = je(t)),
          (o = je(o)),
          (r = je(r)),
          [
            Be((0.4124564 * t + 0.3575761 * o + 0.1804375 * r) / 0.95047),
            Be((0.2126729 * t + 0.7151522 * o + 0.072175 * r) / 1),
            Be((0.0193339 * t + 0.119192 * o + 0.9503041 * r) / 1.08883),
          ]
        )
      })(e),
      i = 116 * o - 16
    return [i < 0 ? 0 : i, 500 * (t - o), 200 * (o - r)]
  },
  Ze = (e) => {
    const [t, o, r] = e
    let i = (t + 16) / 116,
      n = isNaN(o) ? i : i + o / 500,
      a = isNaN(r) ? i : i - r / 200
    ;(i = 1 * Fe(i)), (n = 0.95047 * Fe(n)), (a = 1.08883 * Fe(a))
    return [
      $e(3.2404542 * n - 1.5371385 * i - 0.4985314 * a),
      $e(-0.969266 * n + 1.8760108 * i + 0.041556 * a),
      $e(0.0556434 * n - 0.2040259 * i + 1.0572252 * a),
    ]
  },
  qe = (e, t = 1) => [e[0] - 18 * t, e[1], e[2]],
  Ge = (e) => {
    const t = [0, 0, 0]
    for (let o = 0; o < e.length; o++) {
      const r = e[o] / 255
      t[o] = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4
    }
    return 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]
  },
  Ke = (e, t) => {
    const o = Ge(e),
      r = Ge(t)
    return o > r ? (o + 0.05) / (r + 0.05) : (r + 0.05) / (o + 0.05)
  }
let Ye = {}
const We = (e, t, o, r, i) => {
    var n, a
    const s = o || (i ? t.theme : void 0),
      l =
        r && void 0 !== (null == r ? void 0 : r.dark)
          ? null == r
            ? void 0
            : r.dark
          : t.darkMode
    let d = s,
      c = {}
    if ((s && l && ((d = `${d}__dark`), (c = { ...Ve })), 'default' === s)) {
      var p
      const t = null == r ? void 0 : r.primaryColor,
        o = null == r ? void 0 : r.accentColor
      if (
        (l &&
          t &&
          (c['app-header-background-color'] = ((e, t, o = 50) => {
            let r = ''
            ;(e = ze(e)), (t = ze(t))
            for (let i = 0; i <= 5; i += 2) {
              const n = parseInt(e.substr(i, 2), 16),
                a = parseInt(t.substr(i, 2), 16)
              let s = Math.floor(a + (o / 100) * (n - a)).toString(16)
              for (; s.length < 2; ) s = '0' + s
              r += s
            }
            return `#${r}`
          })(t, '#121212', 8)),
        t)
      ) {
        d = `${d}__primary_${t}`
        const e = Ie(t),
          o = Ue(e)
        c['primary-color'] = t
        const r = Ze(((e, t = 1) => qe(e, -t))(o))
        ;(c['light-primary-color'] = Oe(r)),
          (c['dark-primary-color'] = ((e) => {
            const t = Ze(e)
            return Oe(t)
          })(qe(o))),
          (c['text-primary-color'] =
            Ke(e, [33, 33, 33]) < 6 ? '#fff' : '#212121'),
          (c['text-light-primary-color'] =
            Ke(r, [33, 33, 33]) < 6 ? '#fff' : '#212121'),
          (c['state-icon-color'] = c['dark-primary-color'])
      }
      if (o) {
        ;(d = `${d}__accent_${o}`), (c['accent-color'] = o)
        const e = Ie(o)
        c['text-accent-color'] = Ke(e, [33, 33, 33]) < 6 ? '#fff' : '#212121'
      }
      if (
        (null === (p = e._themes) || void 0 === p ? void 0 : p.cacheKey) === d
      )
        return
    }
    if (s && 'default' !== s && t.themes[s]) {
      const { modes: e, ...o } = t.themes[s]
      ;(c = { ...c, ...o }),
        e && (c = l ? { ...c, ...e.dark } : { ...c, ...e.light })
    }
    if (
      !(
        (null !== (n = e._themes) && void 0 !== n && n.keys) ||
        Object.keys(c).length
      )
    )
      return
    const u = Object.keys(c).length && d ? Ye[d] || Xe(d, c) : void 0,
      m = {
        ...(null === (a = e._themes) || void 0 === a ? void 0 : a.keys),
        ...(null == u ? void 0 : u.styles),
      }
    ;(e._themes = { cacheKey: d, keys: null == u ? void 0 : u.keys }),
      e.updateStyles
        ? e.updateStyles(m)
        : window.ShadyCSS && window.ShadyCSS.styleSubtree(e, m)
  },
  Xe = (e, t) => {
    if (!t || !Object.keys(t).length) return
    const o = { ...Ee, ...t },
      r = {},
      i = {}
    for (const e of Object.keys(o)) {
      const t = `--${e}`,
        n = String(o[e])
      if (((r[t] = n), (i[t] = ''), !n.startsWith('#'))) continue
      const a = `rgb-${e}`
      if (void 0 === o[a])
        try {
          const e = Ie(n).join(','),
            t = `--${a}`
          ;(r[t] = e), (i[t] = '')
        } catch (e) {
          continue
        }
    }
    return (Ye[e] = { styles: r, keys: i }), { styles: r, keys: i }
  },
  Je =
    'ha-main-window' === window.name
      ? window
      : 'ha-main-window' === parent.name
      ? parent
      : top,
  Qe = (e, t, o, r) => {
    ;(r = r || {}), (o = null == o ? {} : o)
    const i = new Event(t, {
      bubbles: void 0 === r.bubbles || r.bubbles,
      cancelable: Boolean(r.cancelable),
      composed: void 0 === r.composed || r.composed,
    })
    return (i.detail = o), e.dispatchEvent(i), i
  },
  et = {},
  tt = (e, t) => {
    e.addEventListener('show-dialog', (o) => {
      const {
        dialogTag: r,
        dialogImport: i,
        dialogParams: n,
        addHistory: a,
      } = o.detail
      ;(async (e, t, o, r, i, n = !0) => {
        if (!(o in et)) {
          if (!i)
            return void (
              __DEV__ &&
              console.warn(
                "Asked to show dialog that's not loaded and can't be imported"
              )
            )
          et[o] = i().then(() => {
            const t = document.createElement(o)
            return e.provideHass(t), t
          })
        }
        if (n) {
          var a, s
          Je.history.replaceState(
            {
              dialog: o,
              open: !1,
              oldState:
                null !== (a = Je.history.state) &&
                void 0 !== a &&
                a.open &&
                (null === (s = Je.history.state) || void 0 === s
                  ? void 0
                  : s.dialog) !== o
                  ? Je.history.state
                  : null,
            },
            ''
          )
          try {
            Je.history.pushState({ dialog: o, dialogParams: r, open: !0 }, '')
          } catch (e) {
            Je.history.pushState(
              { dialog: o, dialogParams: null, open: !0 },
              ''
            )
          }
        }
        const l = await et[o]
        t.appendChild(l), l.showDialog(r)
      })(e, t, r, n, i, a)
    })
  },
  ot = (e, t) => {
    const o = (null == t ? void 0 : t.replace) || !1
    var r
    o
      ? Je.history.replaceState(
          null !== (r = Je.history.state) && void 0 !== r && r.root
            ? { root: !0 }
            : null,
          '',
          e
        )
      : Je.history.pushState(null, '', e),
      Qe(Je, 'location-changed', { replace: o })
  },
  rt = !(window.ShadyDOM && window.ShadyDOM.inUse)
let it, nt
function at(e) {
  it =
    (!e || !e.shimcssproperties) &&
    (rt ||
      Boolean(
        !navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) &&
          window.CSS &&
          CSS.supports &&
          CSS.supports('box-shadow', '0 0 0 var(--foo)')
      ))
}
window.ShadyCSS &&
  void 0 !== window.ShadyCSS.cssBuild &&
  (nt = window.ShadyCSS.cssBuild)
const st = Boolean(window.ShadyCSS && window.ShadyCSS.disableRuntime)
window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
  ? (it = window.ShadyCSS.nativeCss)
  : window.ShadyCSS
  ? (at(window.ShadyCSS), (window.ShadyCSS = void 0))
  : at(window.WebComponents && window.WebComponents.flags)
const lt = it
class dt {
  constructor() {
    ;(this.start = 0),
      (this.end = 0),
      (this.previous = null),
      (this.parent = null),
      (this.rules = null),
      (this.parsedCssText = ''),
      (this.cssText = ''),
      (this.atRule = !1),
      (this.type = 0),
      (this.keyframesName = ''),
      (this.selector = ''),
      (this.parsedSelector = '')
  }
}
function ct(e) {
  return pt(
    (function (e) {
      let t = new dt()
      ;(t.start = 0), (t.end = e.length)
      let o = t
      for (let r = 0, i = e.length; r < i; r++)
        if (e[r] === ht) {
          o.rules || (o.rules = [])
          let e = o,
            t = e.rules[e.rules.length - 1] || null
          ;(o = new dt()),
            (o.start = r + 1),
            (o.parent = e),
            (o.previous = t),
            e.rules.push(o)
        } else e[r] === gt && ((o.end = r + 1), (o = o.parent || t))
      return t
    })((e = e.replace(_t.comments, '').replace(_t.port, ''))),
    e
  )
}
function pt(e, t) {
  let o = t.substring(e.start, e.end - 1)
  if (((e.parsedCssText = e.cssText = o.trim()), e.parent)) {
    let r = e.previous ? e.previous.end : e.parent.start
    ;(o = t.substring(r, e.start - 1)),
      (o = (function (e) {
        return e.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
          let e = arguments[1],
            t = 6 - e.length
          for (; t--; ) e = '0' + e
          return '\\' + e
        })
      })(o)),
      (o = o.replace(_t.multipleSpaces, ' ')),
      (o = o.substring(o.lastIndexOf(';') + 1))
    let i = (e.parsedSelector = e.selector = o.trim())
    ;(e.atRule = 0 === i.indexOf(bt)),
      e.atRule
        ? 0 === i.indexOf(yt)
          ? (e.type = mt.MEDIA_RULE)
          : i.match(_t.keyframesRule) &&
            ((e.type = mt.KEYFRAMES_RULE),
            (e.keyframesName = e.selector.split(_t.multipleSpaces).pop()))
        : 0 === i.indexOf(ft)
        ? (e.type = mt.MIXIN_RULE)
        : (e.type = mt.STYLE_RULE)
  }
  let r = e.rules
  if (r) for (let e, o = 0, i = r.length; o < i && (e = r[o]); o++) pt(e, t)
  return e
}
function ut(e, t, o = '') {
  let r = ''
  if (e.cssText || e.rules) {
    let o = e.rules
    if (
      o &&
      !(function (e) {
        let t = e[0]
        return Boolean(t) && Boolean(t.selector) && 0 === t.selector.indexOf(ft)
      })(o)
    )
      for (let e, i = 0, n = o.length; i < n && (e = o[i]); i++) r = ut(e, t, r)
    else
      (r = t
        ? e.cssText
        : (function (e) {
            return (function (e) {
              return e.replace(_t.mixinApply, '').replace(_t.varApply, '')
            })(
              (e = (function (e) {
                return e.replace(_t.customProp, '').replace(_t.mixinProp, '')
              })(e))
            )
          })(e.cssText)),
        (r = r.trim()),
        r && (r = '  ' + r + '\n')
  }
  return (
    r &&
      (e.selector && (o += e.selector + ' ' + ht + '\n'),
      (o += r),
      e.selector && (o += gt + '\n\n')),
    o
  )
}
const mt = { STYLE_RULE: 1, KEYFRAMES_RULE: 7, MEDIA_RULE: 4, MIXIN_RULE: 1e3 },
  ht = '{',
  gt = '}',
  _t = {
    comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    port: /@import[^;]*;/gim,
    customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
    mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
    mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
    varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
    keyframesRule: /^@[^\s]*keyframes/,
    multipleSpaces: /\s+/g,
  },
  ft = '--',
  yt = '@media',
  bt = '@',
  vt =
    /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
  Ct = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
  At = /@media\s(.*)/,
  wt = new Set()
function Ht(e) {
  const t = e.textContent
  if (!wt.has(t)) {
    wt.add(t)
    const e = document.createElement('style')
    e.setAttribute('shady-unscoped', ''),
      (e.textContent = t),
      document.head.appendChild(e)
  }
}
function kt(e) {
  return e.hasAttribute('shady-unscoped')
}
function St(e, t) {
  return e
    ? ('string' == typeof e && (e = ct(e)), t && xt(e, t), ut(e, lt))
    : ''
}
function Lt(e) {
  return (
    !e.__cssRules && e.textContent && (e.__cssRules = ct(e.textContent)),
    e.__cssRules || null
  )
}
function xt(e, t, o, r) {
  if (!e) return
  let i = !1,
    n = e.type
  if (r && n === mt.MEDIA_RULE) {
    let t = e.selector.match(At)
    t && (window.matchMedia(t[1]).matches || (i = !0))
  }
  n === mt.STYLE_RULE
    ? t(e)
    : o && n === mt.KEYFRAMES_RULE
    ? o(e)
    : n === mt.MIXIN_RULE && (i = !0)
  let a = e.rules
  if (a && !i)
    for (let e, i = 0, n = a.length; i < n && (e = a[i]); i++) xt(e, t, o, r)
}
function Vt(e, t) {
  let o = e.indexOf('var(')
  if (-1 === o) return t(e, '', '', '')
  let r = (function (e, t) {
      let o = 0
      for (let r = t, i = e.length; r < i; r++)
        if ('(' === e[r]) o++
        else if (')' === e[r] && 0 == --o) return r
      return -1
    })(e, o + 3),
    i = e.substring(o + 4, r),
    n = e.substring(0, o),
    a = Vt(e.substring(r + 1), t),
    s = i.indexOf(',')
  return -1 === s
    ? t(n, i.trim(), '', a)
    : t(n, i.substring(0, s).trim(), i.substring(s + 1).trim(), a)
}
window.ShadyDOM && window.ShadyDOM.wrap
function Et(e) {
  if (void 0 !== nt) return nt
  if (void 0 === e.__cssBuild) {
    const t = e.getAttribute('css-build')
    if (t) e.__cssBuild = t
    else {
      const t = (function (e) {
        const t =
          'template' === e.localName ? e.content.firstChild : e.firstChild
        if (t instanceof Comment) {
          const e = t.textContent.trim().split(':')
          if ('css-build' === e[0]) return e[1]
        }
        return ''
      })(e)
      '' !== t &&
        (function (e) {
          const t =
            'template' === e.localName ? e.content.firstChild : e.firstChild
          t.parentNode.removeChild(t)
        })(e),
        (e.__cssBuild = t)
    }
  }
  return e.__cssBuild || ''
}
function Mt(e) {
  return '' !== Et(e)
}
function Pt(e, t) {
  for (let o in t)
    null === o ? e.style.removeProperty(o) : e.style.setProperty(o, t[o])
}
function Tt(e, t) {
  const o = window.getComputedStyle(e).getPropertyValue(t)
  return o ? o.trim() : ''
}
const zt = /;\s*/m,
  Nt = /^\s*(initial)|(inherit)\s*$/,
  It = /\s*!important/
class Ot {
  constructor() {
    this._map = {}
  }
  set(e, t) {
    ;(e = e.trim()), (this._map[e] = { properties: t, dependants: {} })
  }
  get(e) {
    return (e = e.trim()), this._map[e] || null
  }
}
let Rt = null
class Dt {
  constructor() {
    ;(this._currentElement = null),
      (this._measureElement = null),
      (this._map = new Ot())
  }
  detectMixin(e) {
    return (function (e) {
      const t = Ct.test(e) || vt.test(e)
      return (Ct.lastIndex = 0), (vt.lastIndex = 0), t
    })(e)
  }
  gatherStyles(e) {
    const t = (function (e) {
      const t = [],
        o = e.querySelectorAll('style')
      for (let e = 0; e < o.length; e++) {
        const r = o[e]
        kt(r)
          ? rt || (Ht(r), r.parentNode.removeChild(r))
          : (t.push(r.textContent), r.parentNode.removeChild(r))
      }
      return t.join('').trim()
    })(e.content)
    if (t) {
      const o = document.createElement('style')
      return (
        (o.textContent = t), e.content.insertBefore(o, e.content.firstChild), o
      )
    }
    return null
  }
  transformTemplate(e, t) {
    void 0 === e._gatheredStyle && (e._gatheredStyle = this.gatherStyles(e))
    const o = e._gatheredStyle
    return o ? this.transformStyle(o, t) : null
  }
  transformStyle(e, t = '') {
    let o = Lt(e)
    return this.transformRules(o, t), (e.textContent = St(o)), o
  }
  transformCustomStyle(e) {
    let t = Lt(e)
    return (
      xt(t, (e) => {
        ':root' === e.selector && (e.selector = 'html'), this.transformRule(e)
      }),
      (e.textContent = St(t)),
      t
    )
  }
  transformRules(e, t) {
    ;(this._currentElement = t),
      xt(e, (e) => {
        this.transformRule(e)
      }),
      (this._currentElement = null)
  }
  transformRule(e) {
    ;(e.cssText = this.transformCssText(e.parsedCssText, e)),
      ':root' === e.selector && (e.selector = ':host > *')
  }
  transformCssText(e, t) {
    return (
      (e = e.replace(vt, (e, o, r, i) =>
        this._produceCssProperties(e, o, r, i, t)
      )),
      this._consumeCssProperties(e, t)
    )
  }
  _getInitialValueForProperty(e) {
    return (
      this._measureElement ||
        ((this._measureElement = document.createElement('meta')),
        this._measureElement.setAttribute('apply-shim-measure', ''),
        (this._measureElement.style.all = 'initial'),
        document.head.appendChild(this._measureElement)),
      window.getComputedStyle(this._measureElement).getPropertyValue(e)
    )
  }
  _fallbacksFromPreviousRules(e) {
    let t = e
    for (; t.parent; ) t = t.parent
    const o = {}
    let r = !1
    return (
      xt(t, (t) => {
        ;(r = r || t === e),
          r ||
            (t.selector === e.selector &&
              Object.assign(o, this._cssTextToMap(t.parsedCssText)))
      }),
      o
    )
  }
  _consumeCssProperties(e, t) {
    let o = null
    for (; (o = Ct.exec(e)); ) {
      let r = o[0],
        i = o[1],
        n = o.index,
        a = n + r.indexOf('@apply'),
        s = n + r.length,
        l = e.slice(0, a),
        d = e.slice(s),
        c = t ? this._fallbacksFromPreviousRules(t) : {}
      Object.assign(c, this._cssTextToMap(l))
      let p = this._atApplyToCssProperties(i, c)
      ;(e = `${l}${p}${d}`), (Ct.lastIndex = n + p.length)
    }
    return e
  }
  _atApplyToCssProperties(e, t) {
    e = e.replace(zt, '')
    let o = [],
      r = this._map.get(e)
    if ((r || (this._map.set(e, {}), (r = this._map.get(e))), r)) {
      let i, n, a
      this._currentElement && (r.dependants[this._currentElement] = !0)
      const s = r.properties
      for (i in s)
        (a = t && t[i]),
          (n = [i, ': var(', e, '_-_', i]),
          a && n.push(',', a.replace(It, '')),
          n.push(')'),
          It.test(s[i]) && n.push(' !important'),
          o.push(n.join(''))
    }
    return o.join('; ')
  }
  _replaceInitialOrInherit(e, t) {
    let o = Nt.exec(t)
    return (
      o &&
        (t = o[1] ? this._getInitialValueForProperty(e) : 'apply-shim-inherit'),
      t
    )
  }
  _cssTextToMap(e, t = !1) {
    let o,
      r,
      i = e.split(';'),
      n = {}
    for (let e, a, s = 0; s < i.length; s++)
      (e = i[s]),
        e &&
          ((a = e.split(':')),
          a.length > 1 &&
            ((o = a[0].trim()),
            (r = a.slice(1).join(':')),
            t && (r = this._replaceInitialOrInherit(o, r)),
            (n[o] = r)))
    return n
  }
  _invalidateMixinEntry(e) {
    if (Rt) for (let t in e.dependants) t !== this._currentElement && Rt(t)
  }
  _produceCssProperties(e, t, o, r, i) {
    if (
      (o &&
        Vt(o, (e, t) => {
          t && this._map.get(t) && (r = `@apply ${t};`)
        }),
      !r)
    )
      return e
    let n = this._consumeCssProperties('' + r, i),
      a = e.slice(0, e.indexOf('--')),
      s = this._cssTextToMap(n, !0),
      l = s,
      d = this._map.get(t),
      c = d && d.properties
    c ? (l = Object.assign(Object.create(c), s)) : this._map.set(t, l)
    let p,
      u,
      m = [],
      h = !1
    for (p in l)
      (u = s[p]),
        void 0 === u && (u = 'initial'),
        c && !(p in c) && (h = !0),
        m.push(`${t}_-_${p}: ${u}`)
    return (
      h && this._invalidateMixinEntry(d),
      d && (d.properties = l),
      o && (a = `${e};${a}`),
      `${a}${m.join('; ')};`
    )
  }
}
;(Dt.prototype.detectMixin = Dt.prototype.detectMixin),
  (Dt.prototype.transformStyle = Dt.prototype.transformStyle),
  (Dt.prototype.transformCustomStyle = Dt.prototype.transformCustomStyle),
  (Dt.prototype.transformRules = Dt.prototype.transformRules),
  (Dt.prototype.transformRule = Dt.prototype.transformRule),
  (Dt.prototype.transformTemplate = Dt.prototype.transformTemplate),
  (Dt.prototype._separator = '_-_'),
  Object.defineProperty(Dt.prototype, 'invalidCallback', {
    get: () => Rt,
    set(e) {
      Rt = e
    },
  })
const jt = {},
  Bt = '_applyShimCurrentVersion',
  $t = '_applyShimNextVersion',
  Ft = '_applyShimValidatingVersion',
  Ut = Promise.resolve()
function Zt(e) {
  let t = jt[e]
  t &&
    (function (e) {
      ;(e[Bt] = e[Bt] || 0), (e[Ft] = e[Ft] || 0), (e[$t] = (e[$t] || 0) + 1)
    })(t)
}
function qt(e) {
  return e[Bt] === e[$t]
}
let Gt,
  Kt = null,
  Yt = (window.HTMLImports && window.HTMLImports.whenReady) || null
function Wt(e) {
  requestAnimationFrame(function () {
    Yt
      ? Yt(e)
      : (Kt ||
          ((Kt = new Promise((e) => {
            Gt = e
          })),
          'complete' === document.readyState
            ? Gt()
            : document.addEventListener('readystatechange', () => {
                'complete' === document.readyState && Gt()
              })),
        Kt.then(function () {
          e && e()
        }))
  })
}
const Xt = '__shadyCSSCachedStyle'
let Jt = null,
  Qt = null
class eo {
  constructor() {
    ;(this.customStyles = []),
      (this.enqueued = !1),
      Wt(() => {
        window.ShadyCSS.flushCustomStyles && window.ShadyCSS.flushCustomStyles()
      })
  }
  enqueueDocumentValidation() {
    !this.enqueued && Qt && ((this.enqueued = !0), Wt(Qt))
  }
  addCustomStyle(e) {
    e.__seenByShadyCSS ||
      ((e.__seenByShadyCSS = !0),
      this.customStyles.push(e),
      this.enqueueDocumentValidation())
  }
  getStyleForCustomStyle(e) {
    if (e[Xt]) return e[Xt]
    let t
    return (t = e.getStyle ? e.getStyle() : e), t
  }
  processStyles() {
    const e = this.customStyles
    for (let t = 0; t < e.length; t++) {
      const o = e[t]
      if (o[Xt]) continue
      const r = this.getStyleForCustomStyle(o)
      if (r) {
        const e = r.__appliedElement || r
        Jt && Jt(e), (o[Xt] = e)
      }
    }
    return e
  }
}
;(eo.prototype.addCustomStyle = eo.prototype.addCustomStyle),
  (eo.prototype.getStyleForCustomStyle = eo.prototype.getStyleForCustomStyle),
  (eo.prototype.processStyles = eo.prototype.processStyles),
  Object.defineProperties(eo.prototype, {
    transformCallback: {
      get: () => Jt,
      set(e) {
        Jt = e
      },
    },
    validateCallback: {
      get: () => Qt,
      set(e) {
        let t = !1
        Qt || (t = !0), (Qt = e), t && this.enqueueDocumentValidation()
      },
    },
  })
const to = new Dt()
class oo {
  constructor() {
    ;(this.customStyleInterface = null), (to.invalidCallback = Zt)
  }
  ensure() {
    this.customStyleInterface ||
      (window.ShadyCSS.CustomStyleInterface &&
        ((this.customStyleInterface = window.ShadyCSS.CustomStyleInterface),
        (this.customStyleInterface.transformCallback = (e) => {
          to.transformCustomStyle(e)
        }),
        (this.customStyleInterface.validateCallback = () => {
          requestAnimationFrame(() => {
            this.customStyleInterface.enqueued && this.flushCustomStyles()
          })
        })))
  }
  prepareTemplate(e, t) {
    if ((this.ensure(), Mt(e))) return
    jt[t] = e
    let o = to.transformTemplate(e, t)
    e._styleAst = o
  }
  flushCustomStyles() {
    if ((this.ensure(), !this.customStyleInterface)) return
    let e = this.customStyleInterface.processStyles()
    if (this.customStyleInterface.enqueued) {
      for (let t = 0; t < e.length; t++) {
        let o = e[t],
          r = this.customStyleInterface.getStyleForCustomStyle(o)
        r && to.transformCustomStyle(r)
      }
      this.customStyleInterface.enqueued = !1
    }
  }
  styleSubtree(e, t) {
    if ((this.ensure(), t && Pt(e, t), e.shadowRoot)) {
      this.styleElement(e)
      let t = e.shadowRoot.children || e.shadowRoot.childNodes
      for (let e = 0; e < t.length; e++) this.styleSubtree(t[e])
    } else {
      let t = e.children || e.childNodes
      for (let e = 0; e < t.length; e++) this.styleSubtree(t[e])
    }
  }
  styleElement(e) {
    this.ensure()
    let { is: t } = (function (e) {
        let t = e.localName,
          o = '',
          r = ''
        return (
          t
            ? t.indexOf('-') > -1
              ? (o = t)
              : ((r = t), (o = (e.getAttribute && e.getAttribute('is')) || ''))
            : ((o = e.is), (r = e.extends)),
          { is: o, typeExtension: r }
        )
      })(e),
      o = jt[t]
    if ((!o || !Mt(o)) && o && !qt(o)) {
      ;(function (e) {
        return !qt(e) && e[Ft] === e[$t]
      })(o) ||
        (this.prepareTemplate(o, t),
        (function (e) {
          ;(e[Ft] = e[$t]),
            e._validating ||
              ((e._validating = !0),
              Ut.then(function () {
                ;(e[Bt] = e[$t]), (e._validating = !1)
              }))
        })(o))
      let r = e.shadowRoot
      if (r) {
        let e = r.querySelector('style')
        e && ((e.__cssRules = o._styleAst), (e.textContent = St(o._styleAst)))
      }
    }
  }
  styleDocument(e) {
    this.ensure(), this.styleSubtree(document.body, e)
  }
}
if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
  const e = new oo()
  let t = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface
  ;(window.ShadyCSS = {
    prepareTemplate(t, o, r) {
      e.flushCustomStyles(), e.prepareTemplate(t, o)
    },
    prepareTemplateStyles(e, t, o) {
      window.ShadyCSS.prepareTemplate(e, t, o)
    },
    prepareTemplateDom(e, t) {},
    styleSubtree(t, o) {
      e.flushCustomStyles(), e.styleSubtree(t, o)
    },
    styleElement(t) {
      e.flushCustomStyles(), e.styleElement(t)
    },
    styleDocument(t) {
      e.flushCustomStyles(), e.styleDocument(t)
    },
    getComputedStyleValue: (e, t) => Tt(e, t),
    flushCustomStyles() {
      e.flushCustomStyles()
    },
    nativeCss: lt,
    nativeShadow: rt,
    cssBuild: nt,
    disableRuntime: st,
  }),
    t && (window.ShadyCSS.CustomStyleInterface = t)
}
;(window.ShadyCSS.ApplyShim = to),
  (window.JSCompiler_renameProperty = function (e, t) {
    return e
  })
let ro,
  io,
  no = /(url\()([^)]*)(\))/g,
  ao = /(^\/[^\/])|(^#)|(^[\w-\d]*:)/
function so(e, t) {
  if (e && ao.test(e)) return e
  if ('//' === e) return e
  if (void 0 === ro) {
    ro = !1
    try {
      const e = new URL('b', 'http://a')
      ;(e.pathname = 'c%20d'), (ro = 'http://a/c%20d' === e.href)
    } catch (e) {}
  }
  if ((t || (t = document.baseURI || window.location.href), ro))
    try {
      return new URL(e, t).href
    } catch (t) {
      return e
    }
  return (
    io ||
      ((io = document.implementation.createHTMLDocument('temp')),
      (io.base = io.createElement('base')),
      io.head.appendChild(io.base),
      (io.anchor = io.createElement('a')),
      io.body.appendChild(io.anchor)),
    (io.base.href = t),
    (io.anchor.href = e),
    io.anchor.href || e
  )
}
function lo(e, t) {
  return e.replace(no, function (e, o, r, i) {
    return o + "'" + so(r.replace(/["']/g, ''), t) + "'" + i
  })
}
function co(e) {
  return e.substring(0, e.lastIndexOf('/') + 1)
}
const po = !window.ShadyDOM || !window.ShadyDOM.inUse
Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss)
const uo =
  po &&
  'adoptedStyleSheets' in Document.prototype &&
  'replaceSync' in CSSStyleSheet.prototype &&
  (() => {
    try {
      const e = new CSSStyleSheet()
      e.replaceSync('')
      const t = document.createElement('div')
      return (
        t.attachShadow({ mode: 'open' }),
        (t.shadowRoot.adoptedStyleSheets = [e]),
        t.shadowRoot.adoptedStyleSheets[0] === e
      )
    } catch (e) {
      return !1
    }
  })()
let mo =
    (window.Polymer && window.Polymer.rootPath) ||
    co(document.baseURI || window.location.href),
  ho = (window.Polymer && window.Polymer.sanitizeDOMValue) || void 0,
  go = (window.Polymer && window.Polymer.setPassiveTouchGestures) || !1,
  _o = (window.Polymer && window.Polymer.strictTemplatePolicy) || !1,
  fo = (window.Polymer && window.Polymer.allowTemplateFromDomModule) || !1,
  yo = (window.Polymer && window.Polymer.legacyOptimizations) || !1,
  bo = (window.Polymer && window.Polymer.legacyWarnings) || !1,
  vo = (window.Polymer && window.Polymer.syncInitialRender) || !1,
  Co = (window.Polymer && window.Polymer.legacyUndefined) || !1,
  Ao = (window.Polymer && window.Polymer.orderedComputed) || !1,
  wo = (window.Polymer && window.Polymer.removeNestedTemplates) || !1,
  Ho = (window.Polymer && window.Polymer.fastDomIf) || !1,
  ko = (window.Polymer && window.Polymer.suppressTemplateNotifications) || !1,
  So = (window.Polymer && window.Polymer.legacyNoObservedAttributes) || !1,
  Lo =
    (window.Polymer && window.Polymer.useAdoptedStyleSheetsWithBuiltCSS) || !1,
  xo = 0
const Vo = function (e) {
  let t = e.__mixinApplications
  t || ((t = new WeakMap()), (e.__mixinApplications = t))
  let o = xo++
  return function (r) {
    let i = r.__mixinSet
    if (i && i[o]) return r
    let n = t,
      a = n.get(r)
    if (!a) {
      ;(a = e(r)), n.set(r, a)
      let t = Object.create(a.__mixinSet || i || null)
      ;(t[o] = !0), (a.__mixinSet = t)
    }
    return a
  }
}
let Eo = {},
  Mo = {}
function Po(e, t) {
  Eo[e] = Mo[e.toLowerCase()] = t
}
function To(e) {
  return Eo[e] || Mo[e.toLowerCase()]
}
class zo extends HTMLElement {
  static get observedAttributes() {
    return ['id']
  }
  static import(e, t) {
    if (e) {
      let o = To(e)
      return o && t ? o.querySelector(t) : o
    }
    return null
  }
  attributeChangedCallback(e, t, o, r) {
    t !== o && this.register()
  }
  get assetpath() {
    if (!this.__assetpath) {
      const e =
          window.HTMLImports && HTMLImports.importForElement
            ? HTMLImports.importForElement(this) || document
            : this.ownerDocument,
        t = so(this.getAttribute('assetpath') || '', e.baseURI)
      this.__assetpath = co(t)
    }
    return this.__assetpath
  }
  register(e) {
    if ((e = e || this.id)) {
      if (_o && void 0 !== To(e))
        throw (
          (Po(e, null),
          new Error(`strictTemplatePolicy: dom-module ${e} re-registered`))
        )
      ;(this.id = e),
        Po(e, this),
        (t = this).querySelector('style') &&
          console.warn('dom-module %s has style outside template', t.id)
    }
    var t
  }
}
;(zo.prototype.modules = Eo), customElements.define('dom-module', zo)
function No(e) {
  return zo.import(e)
}
function Io(e) {
  const t = lo((e.body ? e.body : e).textContent, e.baseURI),
    o = document.createElement('style')
  return (o.textContent = t), o
}
function Oo(e) {
  const t = e.trim().split(/\s+/),
    o = []
  for (let e = 0; e < t.length; e++) o.push(...Ro(t[e]))
  return o
}
function Ro(e) {
  const t = No(e)
  if (!t)
    return console.warn('Could not find style data in module named', e), []
  if (void 0 === t._styles) {
    const e = []
    e.push(...jo(t))
    const o = t.querySelector('template')
    o && e.push(...Do(o, t.assetpath)), (t._styles = e)
  }
  return t._styles
}
function Do(e, t) {
  if (!e._styles) {
    const o = [],
      r = e.content.querySelectorAll('style')
    for (let e = 0; e < r.length; e++) {
      let i = r[e],
        n = i.getAttribute('include')
      n &&
        o.push(
          ...Oo(n).filter(function (e, t, o) {
            return o.indexOf(e) === t
          })
        ),
        t && (i.textContent = lo(i.textContent, t)),
        o.push(i)
    }
    e._styles = o
  }
  return e._styles
}
function jo(e) {
  const t = [],
    o = e.querySelectorAll('link[rel=import][type~=css]')
  for (let e = 0; e < o.length; e++) {
    let r = o[e]
    if (r.import) {
      const e = r.import,
        o = r.hasAttribute('shady-unscoped')
      if (o && !e._unscopedStyle) {
        const t = Io(e)
        t.setAttribute('shady-unscoped', ''), (e._unscopedStyle = t)
      } else e._style || (e._style = Io(e))
      t.push(o ? e._unscopedStyle : e._style)
    }
  }
  return t
}
function Bo(e) {
  let t = No(e)
  if (t && void 0 === t._cssText) {
    let e = (function (e) {
        let t = '',
          o = jo(e)
        for (let e = 0; e < o.length; e++) t += o[e].textContent
        return t
      })(t),
      o = t.querySelector('template')
    o &&
      (e += (function (e, t) {
        let o = ''
        const r = Do(e, t)
        for (let e = 0; e < r.length; e++) {
          let t = r[e]
          t.parentNode && t.parentNode.removeChild(t), (o += t.textContent)
        }
        return o
      })(o, t.assetpath)),
      (t._cssText = e || null)
  }
  return (
    t || console.warn('Could not find style data in module named', e),
    (t && t._cssText) || ''
  )
}
const $o =
  window.ShadyDOM && window.ShadyDOM.noPatch && window.ShadyDOM.wrap
    ? window.ShadyDOM.wrap
    : window.ShadyDOM
    ? (e) => ShadyDOM.patch(e)
    : (e) => e
function Fo(e) {
  return e.indexOf('.') >= 0
}
function Uo(e) {
  let t = e.indexOf('.')
  return -1 === t ? e : e.slice(0, t)
}
function Zo(e, t) {
  return 0 === e.indexOf(t + '.')
}
function qo(e, t) {
  return 0 === t.indexOf(e + '.')
}
function Go(e, t, o) {
  return t + o.slice(e.length)
}
function Ko(e) {
  if (Array.isArray(e)) {
    let t = []
    for (let o = 0; o < e.length; o++) {
      let r = e[o].toString().split('.')
      for (let e = 0; e < r.length; e++) t.push(r[e])
    }
    return t.join('.')
  }
  return e
}
function Yo(e) {
  return Array.isArray(e) ? Ko(e).split('.') : e.toString().split('.')
}
function Wo(e, t, o) {
  let r = e,
    i = Yo(t)
  for (let e = 0; e < i.length; e++) {
    if (!r) return
    r = r[i[e]]
  }
  return o && (o.path = i.join('.')), r
}
function Xo(e, t, o) {
  let r = e,
    i = Yo(t),
    n = i[i.length - 1]
  if (i.length > 1) {
    for (let e = 0; e < i.length - 1; e++) {
      if (((r = r[i[e]]), !r)) return
    }
    r[n] = o
  } else r[t] = o
  return i.join('.')
}
const Jo = {},
  Qo = /-[a-z]/g,
  er = /([A-Z])/g
function tr(e) {
  return (
    Jo[e] ||
    (Jo[e] = e.indexOf('-') < 0 ? e : e.replace(Qo, (e) => e[1].toUpperCase()))
  )
}
function or(e) {
  return Jo[e] || (Jo[e] = e.replace(er, '-$1').toLowerCase())
}
let rr = 0,
  ir = 0,
  nr = [],
  ar = 0,
  sr = !1,
  lr = document.createTextNode('')
new window.MutationObserver(function () {
  sr = !1
  const e = nr.length
  for (let t = 0; t < e; t++) {
    let e = nr[t]
    if (e)
      try {
        e()
      } catch (e) {
        setTimeout(() => {
          throw e
        })
      }
  }
  nr.splice(0, e), (ir += e)
}).observe(lr, { characterData: !0 })
const dr = {
    after: (e) => ({
      run: (t) => window.setTimeout(t, e),
      cancel(e) {
        window.clearTimeout(e)
      },
    }),
    run: (e, t) => window.setTimeout(e, t),
    cancel(e) {
      window.clearTimeout(e)
    },
  },
  cr = {
    run: (e) => window.requestAnimationFrame(e),
    cancel(e) {
      window.cancelAnimationFrame(e)
    },
  },
  pr = {
    run: (e) => (sr || ((sr = !0), (lr.textContent = ar++)), nr.push(e), rr++),
    cancel(e) {
      const t = e - ir
      if (t >= 0) {
        if (!nr[t]) throw new Error('invalid async handle: ' + e)
        nr[t] = null
      }
    },
  },
  ur = pr,
  mr = Vo(
    (e) =>
      class extends e {
        static createProperties(e) {
          const t = this.prototype
          for (let o in e) o in t || t._createPropertyAccessor(o)
        }
        static attributeNameForProperty(e) {
          return e.toLowerCase()
        }
        static typeForProperty(e) {}
        _createPropertyAccessor(e, t) {
          this._addPropertyToAttributeMap(e),
            this.hasOwnProperty(
              JSCompiler_renameProperty('__dataHasAccessor', this)
            ) ||
              (this.__dataHasAccessor = Object.assign(
                {},
                this.__dataHasAccessor
              )),
            this.__dataHasAccessor[e] ||
              ((this.__dataHasAccessor[e] = !0),
              this._definePropertyAccessor(e, t))
        }
        _addPropertyToAttributeMap(e) {
          this.hasOwnProperty(
            JSCompiler_renameProperty('__dataAttributes', this)
          ) ||
            (this.__dataAttributes = Object.assign({}, this.__dataAttributes))
          let t = this.__dataAttributes[e]
          return (
            t ||
              ((t = this.constructor.attributeNameForProperty(e)),
              (this.__dataAttributes[t] = e)),
            t
          )
        }
        _definePropertyAccessor(e, t) {
          Object.defineProperty(this, e, {
            get() {
              return this.__data[e]
            },
            set: t
              ? function () {}
              : function (t) {
                  this._setPendingProperty(e, t, !0) &&
                    this._invalidateProperties()
                },
          })
        }
        constructor() {
          super(),
            (this.__dataEnabled = !1),
            (this.__dataReady = !1),
            (this.__dataInvalid = !1),
            (this.__data = {}),
            (this.__dataPending = null),
            (this.__dataOld = null),
            (this.__dataInstanceProps = null),
            (this.__dataCounter = 0),
            (this.__serializing = !1),
            this._initializeProperties()
        }
        ready() {
          ;(this.__dataReady = !0), this._flushProperties()
        }
        _initializeProperties() {
          for (let e in this.__dataHasAccessor)
            this.hasOwnProperty(e) &&
              ((this.__dataInstanceProps = this.__dataInstanceProps || {}),
              (this.__dataInstanceProps[e] = this[e]),
              delete this[e])
        }
        _initializeInstanceProperties(e) {
          Object.assign(this, e)
        }
        _setProperty(e, t) {
          this._setPendingProperty(e, t) && this._invalidateProperties()
        }
        _getProperty(e) {
          return this.__data[e]
        }
        _setPendingProperty(e, t, o) {
          let r = this.__data[e],
            i = this._shouldPropertyChange(e, t, r)
          return (
            i &&
              (this.__dataPending ||
                ((this.__dataPending = {}), (this.__dataOld = {})),
              this.__dataOld &&
                !(e in this.__dataOld) &&
                (this.__dataOld[e] = r),
              (this.__data[e] = t),
              (this.__dataPending[e] = t)),
            i
          )
        }
        _isPropertyPending(e) {
          return !(!this.__dataPending || !this.__dataPending.hasOwnProperty(e))
        }
        _invalidateProperties() {
          !this.__dataInvalid &&
            this.__dataReady &&
            ((this.__dataInvalid = !0),
            ur.run(() => {
              this.__dataInvalid &&
                ((this.__dataInvalid = !1), this._flushProperties())
            }))
        }
        _enableProperties() {
          this.__dataEnabled ||
            ((this.__dataEnabled = !0),
            this.__dataInstanceProps &&
              (this._initializeInstanceProperties(this.__dataInstanceProps),
              (this.__dataInstanceProps = null)),
            this.ready())
        }
        _flushProperties() {
          this.__dataCounter++
          const e = this.__data,
            t = this.__dataPending,
            o = this.__dataOld
          this._shouldPropertiesChange(e, t, o) &&
            ((this.__dataPending = null),
            (this.__dataOld = null),
            this._propertiesChanged(e, t, o)),
            this.__dataCounter--
        }
        _shouldPropertiesChange(e, t, o) {
          return Boolean(t)
        }
        _propertiesChanged(e, t, o) {}
        _shouldPropertyChange(e, t, o) {
          return o !== t && (o == o || t == t)
        }
        attributeChangedCallback(e, t, o, r) {
          t !== o && this._attributeToProperty(e, o),
            super.attributeChangedCallback &&
              super.attributeChangedCallback(e, t, o, r)
        }
        _attributeToProperty(e, t, o) {
          if (!this.__serializing) {
            const r = this.__dataAttributes,
              i = (r && r[e]) || e
            this[i] = this._deserializeValue(
              t,
              o || this.constructor.typeForProperty(i)
            )
          }
        }
        _propertyToAttribute(e, t, o) {
          ;(this.__serializing = !0),
            (o = arguments.length < 3 ? this[e] : o),
            this._valueToNodeAttribute(
              this,
              o,
              t || this.constructor.attributeNameForProperty(e)
            ),
            (this.__serializing = !1)
        }
        _valueToNodeAttribute(e, t, o) {
          const r = this._serializeValue(t)
          ;('class' !== o && 'name' !== o && 'slot' !== o) || (e = $o(e)),
            void 0 === r ? e.removeAttribute(o) : e.setAttribute(o, r)
        }
        _serializeValue(e) {
          return 'boolean' == typeof e
            ? e
              ? ''
              : void 0
            : null != e
            ? e.toString()
            : void 0
        }
        _deserializeValue(e, t) {
          switch (t) {
            case Boolean:
              return null !== e
            case Number:
              return Number(e)
            default:
              return e
          }
        }
      }
  ),
  hr = {}
let gr = HTMLElement.prototype
for (; gr; ) {
  let e = Object.getOwnPropertyNames(gr)
  for (let t = 0; t < e.length; t++) hr[e[t]] = !0
  gr = Object.getPrototypeOf(gr)
}
const _r = Vo((e) => {
    const t = mr(e)
    return class extends t {
      static createPropertiesForAttributes() {
        let e = this.observedAttributes
        for (let t = 0; t < e.length; t++)
          this.prototype._createPropertyAccessor(tr(e[t]))
      }
      static attributeNameForProperty(e) {
        return or(e)
      }
      _initializeProperties() {
        this.__dataProto &&
          (this._initializeProtoProperties(this.__dataProto),
          (this.__dataProto = null)),
          super._initializeProperties()
      }
      _initializeProtoProperties(e) {
        for (let t in e) this._setProperty(t, e[t])
      }
      _ensureAttribute(e, t) {
        const o = this
        o.hasAttribute(e) || this._valueToNodeAttribute(o, t, e)
      }
      _serializeValue(e) {
        if ('object' == typeof e) {
          if (e instanceof Date) return e.toString()
          if (e)
            try {
              return JSON.stringify(e)
            } catch (e) {
              return ''
            }
        }
        return super._serializeValue(e)
      }
      _deserializeValue(e, t) {
        let o
        switch (t) {
          case Object:
            try {
              o = JSON.parse(e)
            } catch (t) {
              o = e
            }
            break
          case Array:
            try {
              o = JSON.parse(e)
            } catch (t) {
              ;(o = null),
                console.warn(
                  `Polymer::Attributes: couldn't decode Array as JSON: ${e}`
                )
            }
            break
          case Date:
            ;(o = isNaN(e) ? String(e) : Number(e)), (o = new Date(o))
            break
          default:
            o = super._deserializeValue(e, t)
        }
        return o
      }
      _definePropertyAccessor(e, t) {
        !(function (e, t) {
          if (!hr[t]) {
            let o = e[t]
            void 0 !== o &&
              (e.__data
                ? e._setPendingProperty(t, o)
                : (e.__dataProto
                    ? e.hasOwnProperty(
                        JSCompiler_renameProperty('__dataProto', e)
                      ) || (e.__dataProto = Object.create(e.__dataProto))
                    : (e.__dataProto = {}),
                  (e.__dataProto[t] = o)))
          }
        })(this, e),
          super._definePropertyAccessor(e, t)
      }
      _hasAccessor(e) {
        return this.__dataHasAccessor && this.__dataHasAccessor[e]
      }
      _isPropertyPending(e) {
        return Boolean(this.__dataPending && e in this.__dataPending)
      }
    }
  }),
  fr = { 'dom-if': !0, 'dom-repeat': !0 }
let yr = !1,
  br = !1
function vr(e) {
  ;(function () {
    if (!yr) {
      yr = !0
      const e = document.createElement('textarea')
      ;(e.placeholder = 'a'), (br = e.placeholder === e.textContent)
    }
    return br
  })() &&
    'textarea' === e.localName &&
    e.placeholder &&
    e.placeholder === e.textContent &&
    (e.textContent = null)
}
function Cr(e) {
  let t = e.getAttribute('is')
  if (t && fr[t]) {
    let o = e
    for (
      o.removeAttribute('is'),
        e = o.ownerDocument.createElement(t),
        o.parentNode.replaceChild(e, o),
        e.appendChild(o);
      o.attributes.length;

    )
      e.setAttribute(o.attributes[0].name, o.attributes[0].value),
        o.removeAttribute(o.attributes[0].name)
  }
  return e
}
function Ar(e, t) {
  let o = t.parentInfo && Ar(e, t.parentInfo)
  if (!o) return e
  for (let e = o.firstChild, r = 0; e; e = e.nextSibling)
    if (t.parentIndex === r++) return e
}
function wr(e, t, o, r) {
  r.id && (t[r.id] = o)
}
function Hr(e, t, o) {
  if (o.events && o.events.length)
    for (let r, i = 0, n = o.events; i < n.length && (r = n[i]); i++)
      e._addMethodEventListenerToNode(t, r.name, r.value, e)
}
function kr(e, t, o, r) {
  o.templateInfo &&
    ((t._templateInfo = o.templateInfo), (t._parentTemplateInfo = r))
}
const Sr = Vo(
  (e) =>
    class extends e {
      static _parseTemplate(e, t) {
        if (!e._templateInfo) {
          let o = (e._templateInfo = {})
          ;(o.nodeInfoList = []),
            (o.nestedTemplate = Boolean(t)),
            (o.stripWhiteSpace =
              (t && t.stripWhiteSpace) || e.hasAttribute('strip-whitespace')),
            this._parseTemplateContent(e, o, { parent: null })
        }
        return e._templateInfo
      }
      static _parseTemplateContent(e, t, o) {
        return this._parseTemplateNode(e.content, t, o)
      }
      static _parseTemplateNode(e, t, o) {
        let r = !1,
          i = e
        return (
          'template' != i.localName || i.hasAttribute('preserve-content')
            ? 'slot' === i.localName && (t.hasInsertionPoint = !0)
            : (r = this._parseTemplateNestedTemplate(i, t, o) || r),
          vr(i),
          i.firstChild && this._parseTemplateChildNodes(i, t, o),
          i.hasAttributes &&
            i.hasAttributes() &&
            (r = this._parseTemplateNodeAttributes(i, t, o) || r),
          r || o.noted
        )
      }
      static _parseTemplateChildNodes(e, t, o) {
        if ('script' !== e.localName && 'style' !== e.localName)
          for (let r, i = e.firstChild, n = 0; i; i = r) {
            if (
              ('template' == i.localName && (i = Cr(i)),
              (r = i.nextSibling),
              i.nodeType === Node.TEXT_NODE)
            ) {
              let o = r
              for (; o && o.nodeType === Node.TEXT_NODE; )
                (i.textContent += o.textContent),
                  (r = o.nextSibling),
                  e.removeChild(o),
                  (o = r)
              if (t.stripWhiteSpace && !i.textContent.trim()) {
                e.removeChild(i)
                continue
              }
            }
            let a = { parentIndex: n, parentInfo: o }
            this._parseTemplateNode(i, t, a) &&
              (a.infoIndex = t.nodeInfoList.push(a) - 1),
              i.parentNode && n++
          }
      }
      static _parseTemplateNestedTemplate(e, t, o) {
        let r = e,
          i = this._parseTemplate(r, t)
        return (
          (i.content =
            r.content.ownerDocument.createDocumentFragment()).appendChild(
            r.content
          ),
          (o.templateInfo = i),
          !0
        )
      }
      static _parseTemplateNodeAttributes(e, t, o) {
        let r = !1,
          i = Array.from(e.attributes)
        for (let n, a = i.length - 1; (n = i[a]); a--)
          r = this._parseTemplateNodeAttribute(e, t, o, n.name, n.value) || r
        return r
      }
      static _parseTemplateNodeAttribute(e, t, o, r, i) {
        return 'on-' === r.slice(0, 3)
          ? (e.removeAttribute(r),
            (o.events = o.events || []),
            o.events.push({ name: r.slice(3), value: i }),
            !0)
          : 'id' === r && ((o.id = i), !0)
      }
      static _contentForTemplate(e) {
        let t = e._templateInfo
        return (t && t.content) || e.content
      }
      _stampTemplate(e, t) {
        e &&
          !e.content &&
          window.HTMLTemplateElement &&
          HTMLTemplateElement.decorate &&
          HTMLTemplateElement.decorate(e)
        let o = (t = t || this.constructor._parseTemplate(e)).nodeInfoList,
          r = t.content || e.content,
          i = document.importNode(r, !0)
        i.__noInsertionPoint = !t.hasInsertionPoint
        let n = (i.nodeList = new Array(o.length))
        i.$ = {}
        for (let e, r = 0, a = o.length; r < a && (e = o[r]); r++) {
          let o = (n[r] = Ar(i, e))
          wr(0, i.$, o, e), kr(0, o, e, t), Hr(this, o, e)
        }
        return i
      }
      _addMethodEventListenerToNode(e, t, o, r) {
        let i = (function (e, t, o) {
          return (
            (e = e._methodHost || e),
            function (t) {
              e[o]
                ? e[o](t, t.detail)
                : console.warn('listener method `' + o + '` not defined')
            }
          )
        })((r = r || e), 0, o)
        return this._addEventListenerToNode(e, t, i), i
      }
      _addEventListenerToNode(e, t, o) {
        e.addEventListener(t, o)
      }
      _removeEventListenerFromNode(e, t, o) {
        e.removeEventListener(t, o)
      }
    }
)
let Lr = 0
const xr = [],
  Vr = {
    COMPUTE: '__computeEffects',
    REFLECT: '__reflectEffects',
    NOTIFY: '__notifyEffects',
    PROPAGATE: '__propagateEffects',
    OBSERVE: '__observeEffects',
    READ_ONLY: '__readOnly',
  },
  Er = /[A-Z]/
function Mr(e, t, o) {
  let r = e[t]
  if (r) {
    if (!e.hasOwnProperty(t) && ((r = e[t] = Object.create(e[t])), o))
      for (let e in r) {
        let t = r[e],
          o = (r[e] = Array(t.length))
        for (let e = 0; e < t.length; e++) o[e] = t[e]
      }
  } else r = e[t] = {}
  return r
}
function Pr(e, t, o, r, i, n) {
  if (t) {
    let a = !1
    const s = Lr++
    for (let l in o) {
      let d = t[i ? Uo(l) : l]
      if (d)
        for (let t, c = 0, p = d.length; c < p && (t = d[c]); c++)
          (t.info && t.info.lastRun === s) ||
            (i && !zr(l, t.trigger)) ||
            (t.info && (t.info.lastRun = s),
            t.fn(e, l, o, r, t.info, i, n),
            (a = !0))
    }
    return a
  }
  return !1
}
function Tr(e, t, o, r, i, n, a, s) {
  let l = !1,
    d = t[a ? Uo(r) : r]
  if (d)
    for (let t, c = 0, p = d.length; c < p && (t = d[c]); c++)
      (t.info && t.info.lastRun === o) ||
        (a && !zr(r, t.trigger)) ||
        (t.info && (t.info.lastRun = o),
        t.fn(e, r, i, n, t.info, a, s),
        (l = !0))
  return l
}
function zr(e, t) {
  if (t) {
    let o = t.name
    return (
      o == e || !(!t.structured || !Zo(o, e)) || !(!t.wildcard || !qo(o, e))
    )
  }
  return !0
}
function Nr(e, t, o, r, i) {
  let n = 'string' == typeof i.method ? e[i.method] : i.method,
    a = i.property
  n
    ? n.call(e, e.__data[a], r[a])
    : i.dynamicFn ||
      console.warn('observer method `' + i.method + '` not defined')
}
function Ir(e, t, o) {
  let r = Uo(t)
  if (r !== t) {
    return Or(e, or(r) + '-changed', o[t], t), !0
  }
  return !1
}
function Or(e, t, o, r) {
  let i = { value: o, queueProperty: !0 }
  r && (i.path = r), $o(e).dispatchEvent(new CustomEvent(t, { detail: i }))
}
function Rr(e, t, o, r, i, n) {
  let a = (n ? Uo(t) : t) != t ? t : null,
    s = a ? Wo(e, a) : e.__data[t]
  a && void 0 === s && (s = o[t]), Or(e, i.eventName, s, a)
}
function Dr(e, t, o, r, i) {
  let n = e.__data[t]
  ho && (n = ho(n, i.attrName, 'attribute', e)),
    e._propertyToAttribute(t, i.attrName, n)
}
function jr(e, t, o, r) {
  let i = e[Vr.COMPUTE]
  if (i)
    if (Ao) {
      Lr++
      const n = (function (e) {
          let t = e.constructor.__orderedComputedDeps
          if (!t) {
            t = new Map()
            const o = e[Vr.COMPUTE]
            let r,
              {
                counts: i,
                ready: n,
                total: a,
              } = (function (e) {
                const t = e.__computeInfo,
                  o = {},
                  r = e[Vr.COMPUTE],
                  i = []
                let n = 0
                for (let e in t) {
                  const r = t[e]
                  n += o[e] =
                    r.args.filter((e) => !e.literal).length +
                    (r.dynamicFn ? 1 : 0)
                }
                for (let e in r) t[e] || i.push(e)
                return { counts: o, ready: i, total: n }
              })(e)
            for (; (r = n.shift()); ) {
              t.set(r, t.size)
              const e = o[r]
              e &&
                e.forEach((e) => {
                  const t = e.info.methodInfo
                  --a, 0 == --i[t] && n.push(t)
                })
            }
            if (0 !== a) {
              const t = e
              console.warn(
                `Computed graph for ${t.localName} incomplete; circular?`
              )
            }
            e.constructor.__orderedComputedDeps = t
          }
          return t
        })(e),
        a = []
      for (let e in t) $r(e, i, a, n, r)
      let s
      for (; (s = a.shift()); )
        Fr(e, '', t, o, s) && $r(s.methodInfo, i, a, n, r)
      Object.assign(o, e.__dataOld),
        Object.assign(t, e.__dataPending),
        (e.__dataPending = null)
    } else {
      let n = t
      for (; Pr(e, i, n, o, r); )
        Object.assign(o, e.__dataOld),
          Object.assign(t, e.__dataPending),
          (n = e.__dataPending),
          (e.__dataPending = null)
    }
}
const Br = (e, t, o) => {
    let r = 0,
      i = t.length - 1,
      n = -1
    for (; r <= i; ) {
      const a = (r + i) >> 1,
        s = o.get(t[a].methodInfo) - o.get(e.methodInfo)
      if (s < 0) r = a + 1
      else {
        if (!(s > 0)) {
          n = a
          break
        }
        i = a - 1
      }
    }
    n < 0 && (n = i + 1), t.splice(n, 0, e)
  },
  $r = (e, t, o, r, i) => {
    const n = t[i ? Uo(e) : e]
    if (n)
      for (let t = 0; t < n.length; t++) {
        const a = n[t]
        a.info.lastRun === Lr ||
          (i && !zr(e, a.trigger)) ||
          ((a.info.lastRun = Lr), Br(a.info, o, r))
      }
  }
function Fr(e, t, o, r, i) {
  let n = Wr(e, t, o, r, i)
  if (n === xr) return !1
  let a = i.methodInfo
  return e.__dataHasAccessor && e.__dataHasAccessor[a]
    ? e._setPendingProperty(a, n, !0)
    : ((e[a] = n), !1)
}
function Ur(e, t, o, r, i, n, a) {
  o.bindings = o.bindings || []
  let s = {
    kind: r,
    target: i,
    parts: n,
    literal: a,
    isCompound: 1 !== n.length,
  }
  if (
    (o.bindings.push(s),
    (function (e) {
      return (
        Boolean(e.target) &&
        'attribute' != e.kind &&
        'text' != e.kind &&
        !e.isCompound &&
        '{' === e.parts[0].mode
      )
    })(s))
  ) {
    let { event: e, negate: t } = s.parts[0]
    ;(s.listenerEvent = e || or(i) + '-changed'), (s.listenerNegate = t)
  }
  let l = t.nodeInfoList.length
  for (let o = 0; o < s.parts.length; o++) {
    let r = s.parts[o]
    ;(r.compoundIndex = o), Zr(e, t, s, r, l)
  }
}
function Zr(e, t, o, r, i) {
  if (!r.literal)
    if ('attribute' === o.kind && '-' === o.target[0])
      console.warn(
        'Cannot set attribute ' +
          o.target +
          ' because "-" is not a valid attribute starting character'
      )
    else {
      let n = r.dependencies,
        a = { index: i, binding: o, part: r, evaluator: e }
      for (let o = 0; o < n.length; o++) {
        let r = n[o]
        'string' == typeof r && ((r = ti(r)), (r.wildcard = !0)),
          e._addTemplatePropertyEffect(t, r.rootProperty, {
            fn: qr,
            info: a,
            trigger: r,
          })
      }
    }
}
function qr(e, t, o, r, i, n, a) {
  let s = a[i.index],
    l = i.binding,
    d = i.part
  if (
    n &&
    d.source &&
    t.length > d.source.length &&
    'property' == l.kind &&
    !l.isCompound &&
    s.__isPropertyEffectsClient &&
    s.__dataHasAccessor &&
    s.__dataHasAccessor[l.target]
  ) {
    let r = o[t]
    ;(t = Go(d.source, l.target, t)),
      s._setPendingPropertyOrPath(t, r, !1, !0) && e._enqueueClient(s)
  } else {
    let a = i.evaluator._evaluateBinding(e, d, t, o, r, n)
    a !== xr &&
      (function (e, t, o, r, i) {
        ;(i = (function (e, t, o, r) {
          if (o.isCompound) {
            let i = e.__dataCompoundStorage[o.target]
            ;(i[r.compoundIndex] = t), (t = i.join(''))
          }
          'attribute' !== o.kind &&
            (('textContent' !== o.target &&
              ('value' !== o.target ||
                ('input' !== e.localName && 'textarea' !== e.localName))) ||
              (t = null == t ? '' : t))
          return t
        })(t, i, o, r)),
          ho && (i = ho(i, o.target, o.kind, t))
        if ('attribute' == o.kind) e._valueToNodeAttribute(t, i, o.target)
        else {
          let r = o.target
          t.__isPropertyEffectsClient &&
          t.__dataHasAccessor &&
          t.__dataHasAccessor[r]
            ? (t[Vr.READ_ONLY] && t[Vr.READ_ONLY][r]) ||
              (t._setPendingProperty(r, i) && e._enqueueClient(t))
            : e._setUnmanagedPropertyToNode(t, r, i)
        }
      })(e, s, l, d, a)
  }
}
function Gr(e, t) {
  if (t.isCompound) {
    let o = e.__dataCompoundStorage || (e.__dataCompoundStorage = {}),
      r = t.parts,
      i = new Array(r.length)
    for (let e = 0; e < r.length; e++) i[e] = r[e].literal
    let n = t.target
    ;(o[n] = i),
      t.literal &&
        'property' == t.kind &&
        ('className' === n && (e = $o(e)), (e[n] = t.literal))
  }
}
function Kr(e, t, o) {
  if (o.listenerEvent) {
    let r = o.parts[0]
    e.addEventListener(o.listenerEvent, function (e) {
      !(function (e, t, o, r, i) {
        let n,
          a = e.detail,
          s = a && a.path
        s ? ((r = Go(o, r, s)), (n = a && a.value)) : (n = e.currentTarget[o]),
          (n = i ? !n : n),
          (t[Vr.READ_ONLY] && t[Vr.READ_ONLY][r]) ||
            !t._setPendingPropertyOrPath(r, n, !0, Boolean(s)) ||
            (a && a.queueProperty) ||
            t._invalidateProperties()
      })(e, t, o.target, r.source, r.negate)
    })
  }
}
function Yr(e, t, o, r, i, n) {
  n = t.static || (n && ('object' != typeof n || n[t.methodName]))
  let a = {
    methodName: t.methodName,
    args: t.args,
    methodInfo: i,
    dynamicFn: n,
  }
  for (let i, n = 0; n < t.args.length && (i = t.args[n]); n++)
    i.literal ||
      e._addPropertyEffect(i.rootProperty, o, { fn: r, info: a, trigger: i })
  return n && e._addPropertyEffect(t.methodName, o, { fn: r, info: a }), a
}
function Wr(e, t, o, r, i) {
  let n = e._methodHost || e,
    a = n[i.methodName]
  if (a) {
    let r = e._marshalArgs(i.args, t, o)
    return r === xr ? xr : a.apply(n, r)
  }
  i.dynamicFn || console.warn('method `' + i.methodName + '` not defined')
}
const Xr = [],
  Jr = new RegExp(
    '(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:\'(?:[^\'\\\\]|\\\\.)*\')|(?:"(?:[^"\\\\]|\\\\.)*")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:\'(?:[^\'\\\\]|\\\\.)*\')|(?:"(?:[^"\\\\]|\\\\.)*")))\\s*))*)?)\\)\\s*)?)(?:]]|}})',
    'g'
  )
function Qr(e) {
  let t = ''
  for (let o = 0; o < e.length; o++) {
    t += e[o].literal || ''
  }
  return t
}
function ei(e) {
  let t = e.match(/([^\s]+?)\(([\s\S]*)\)/)
  if (t) {
    let e = { methodName: t[1], static: !0, args: Xr }
    if (t[2].trim()) {
      return (function (e, t) {
        return (
          (t.args = e.map(function (e) {
            let o = ti(e)
            return o.literal || (t.static = !1), o
          }, this)),
          t
        )
      })(t[2].replace(/\\,/g, '&comma;').split(','), e)
    }
    return e
  }
  return null
}
function ti(e) {
  let t = e
      .trim()
      .replace(/&comma;/g, ',')
      .replace(/\\(.)/g, '$1'),
    o = { name: t, value: '', literal: !1 },
    r = t[0]
  switch (('-' === r && (r = t[1]), r >= '0' && r <= '9' && (r = '#'), r)) {
    case "'":
    case '"':
      ;(o.value = t.slice(1, -1)), (o.literal = !0)
      break
    case '#':
      ;(o.value = Number(t)), (o.literal = !0)
  }
  return (
    o.literal ||
      ((o.rootProperty = Uo(t)),
      (o.structured = Fo(t)),
      o.structured &&
        ((o.wildcard = '.*' == t.slice(-2)),
        o.wildcard && (o.name = t.slice(0, -2)))),
    o
  )
}
function oi(e, t, o) {
  let r = Wo(e, o)
  return void 0 === r && (r = t[o]), r
}
function ri(e, t, o, r) {
  const i = { indexSplices: r }
  Co && !e._overrideLegacyUndefined && (t.splices = i),
    e.notifyPath(o + '.splices', i),
    e.notifyPath(o + '.length', t.length),
    Co && !e._overrideLegacyUndefined && (i.indexSplices = [])
}
function ii(e, t, o, r, i, n) {
  ri(e, t, o, [
    { index: r, addedCount: i, removed: n, object: t, type: 'splice' },
  ])
}
const ni = Vo((e) => {
    const t = Sr(_r(e))
    return class extends t {
      constructor() {
        super(),
          (this.__isPropertyEffectsClient = !0),
          this.__dataClientsReady,
          this.__dataPendingClients,
          this.__dataToNotify,
          this.__dataLinkedPaths,
          this.__dataHasPaths,
          this.__dataCompoundStorage,
          this.__dataHost,
          this.__dataTemp,
          this.__dataClientsInitialized,
          this.__data,
          this.__dataPending,
          this.__dataOld,
          this.__computeEffects,
          this.__computeInfo,
          this.__reflectEffects,
          this.__notifyEffects,
          this.__propagateEffects,
          this.__observeEffects,
          this.__readOnly,
          this.__templateInfo,
          this._overrideLegacyUndefined
      }
      get PROPERTY_EFFECT_TYPES() {
        return Vr
      }
      _initializeProperties() {
        super._initializeProperties(),
          this._registerHost(),
          (this.__dataClientsReady = !1),
          (this.__dataPendingClients = null),
          (this.__dataToNotify = null),
          (this.__dataLinkedPaths = null),
          (this.__dataHasPaths = !1),
          (this.__dataCompoundStorage = this.__dataCompoundStorage || null),
          (this.__dataHost = this.__dataHost || null),
          (this.__dataTemp = {}),
          (this.__dataClientsInitialized = !1)
      }
      _registerHost() {
        if (ai.length) {
          let e = ai[ai.length - 1]
          e._enqueueClient(this), (this.__dataHost = e)
        }
      }
      _initializeProtoProperties(e) {
        ;(this.__data = Object.create(e)),
          (this.__dataPending = Object.create(e)),
          (this.__dataOld = {})
      }
      _initializeInstanceProperties(e) {
        let t = this[Vr.READ_ONLY]
        for (let o in e)
          (t && t[o]) ||
            ((this.__dataPending = this.__dataPending || {}),
            (this.__dataOld = this.__dataOld || {}),
            (this.__data[o] = this.__dataPending[o] = e[o]))
      }
      _addPropertyEffect(e, t, o) {
        this._createPropertyAccessor(e, t == Vr.READ_ONLY)
        let r = Mr(this, t, !0)[e]
        r || (r = this[t][e] = []), r.push(o)
      }
      _removePropertyEffect(e, t, o) {
        let r = Mr(this, t, !0)[e],
          i = r.indexOf(o)
        i >= 0 && r.splice(i, 1)
      }
      _hasPropertyEffect(e, t) {
        let o = this[t]
        return Boolean(o && o[e])
      }
      _hasReadOnlyEffect(e) {
        return this._hasPropertyEffect(e, Vr.READ_ONLY)
      }
      _hasNotifyEffect(e) {
        return this._hasPropertyEffect(e, Vr.NOTIFY)
      }
      _hasReflectEffect(e) {
        return this._hasPropertyEffect(e, Vr.REFLECT)
      }
      _hasComputedEffect(e) {
        return this._hasPropertyEffect(e, Vr.COMPUTE)
      }
      _setPendingPropertyOrPath(e, t, o, r) {
        if (r || Uo(Array.isArray(e) ? e[0] : e) !== e) {
          if (!r) {
            let o = Wo(this, e)
            if (!(e = Xo(this, e, t)) || !super._shouldPropertyChange(e, t, o))
              return !1
          }
          if (((this.__dataHasPaths = !0), this._setPendingProperty(e, t, o)))
            return (
              (function (e, t, o) {
                let r = e.__dataLinkedPaths
                if (r) {
                  let i
                  for (let n in r) {
                    let a = r[n]
                    qo(n, t)
                      ? ((i = Go(n, a, t)),
                        e._setPendingPropertyOrPath(i, o, !0, !0))
                      : qo(a, t) &&
                        ((i = Go(a, n, t)),
                        e._setPendingPropertyOrPath(i, o, !0, !0))
                  }
                }
              })(this, e, t),
              !0
            )
        } else {
          if (this.__dataHasAccessor && this.__dataHasAccessor[e])
            return this._setPendingProperty(e, t, o)
          this[e] = t
        }
        return !1
      }
      _setUnmanagedPropertyToNode(e, t, o) {
        ;(o === e[t] && 'object' != typeof o) ||
          ('className' === t && (e = $o(e)), (e[t] = o))
      }
      _setPendingProperty(e, t, o) {
        let r = this.__dataHasPaths && Fo(e),
          i = r ? this.__dataTemp : this.__data
        return (
          !!this._shouldPropertyChange(e, t, i[e]) &&
          (this.__dataPending ||
            ((this.__dataPending = {}), (this.__dataOld = {})),
          e in this.__dataOld || (this.__dataOld[e] = this.__data[e]),
          r ? (this.__dataTemp[e] = t) : (this.__data[e] = t),
          (this.__dataPending[e] = t),
          (r || (this[Vr.NOTIFY] && this[Vr.NOTIFY][e])) &&
            ((this.__dataToNotify = this.__dataToNotify || {}),
            (this.__dataToNotify[e] = o)),
          !0)
        )
      }
      _setProperty(e, t) {
        this._setPendingProperty(e, t, !0) && this._invalidateProperties()
      }
      _invalidateProperties() {
        this.__dataReady && this._flushProperties()
      }
      _enqueueClient(e) {
        ;(this.__dataPendingClients = this.__dataPendingClients || []),
          e !== this && this.__dataPendingClients.push(e)
      }
      _flushClients() {
        this.__dataClientsReady
          ? this.__enableOrFlushClients()
          : ((this.__dataClientsReady = !0),
            this._readyClients(),
            (this.__dataReady = !0))
      }
      __enableOrFlushClients() {
        let e = this.__dataPendingClients
        if (e) {
          this.__dataPendingClients = null
          for (let t = 0; t < e.length; t++) {
            let o = e[t]
            o.__dataEnabled
              ? o.__dataPending && o._flushProperties()
              : o._enableProperties()
          }
        }
      }
      _readyClients() {
        this.__enableOrFlushClients()
      }
      setProperties(e, t) {
        for (let o in e)
          (!t && this[Vr.READ_ONLY] && this[Vr.READ_ONLY][o]) ||
            this._setPendingPropertyOrPath(o, e[o], !0)
        this._invalidateProperties()
      }
      ready() {
        this._flushProperties(),
          this.__dataClientsReady || this._flushClients(),
          this.__dataPending && this._flushProperties()
      }
      _propertiesChanged(e, t, o) {
        let r,
          i = this.__dataHasPaths
        ;(this.__dataHasPaths = !1),
          jr(this, t, o, i),
          (r = this.__dataToNotify),
          (this.__dataToNotify = null),
          this._propagatePropertyChanges(t, o, i),
          this._flushClients(),
          Pr(this, this[Vr.REFLECT], t, o, i),
          Pr(this, this[Vr.OBSERVE], t, o, i),
          r &&
            (function (e, t, o, r, i) {
              let n,
                a,
                s = e[Vr.NOTIFY],
                l = Lr++
              for (let a in t)
                t[a] &&
                  ((s && Tr(e, s, l, a, o, r, i)) || (i && Ir(e, a, o))) &&
                  (n = !0)
              n &&
                (a = e.__dataHost) &&
                a._invalidateProperties &&
                a._invalidateProperties()
            })(this, r, t, o, i),
          1 == this.__dataCounter && (this.__dataTemp = {})
      }
      _propagatePropertyChanges(e, t, o) {
        this[Vr.PROPAGATE] && Pr(this, this[Vr.PROPAGATE], e, t, o),
          this.__templateInfo &&
            this._runEffectsForTemplate(this.__templateInfo, e, t, o)
      }
      _runEffectsForTemplate(e, t, o, r) {
        const i = (t, r) => {
          Pr(this, e.propertyEffects, t, o, r, e.nodeList)
          for (let i = e.firstChild; i; i = i.nextSibling)
            this._runEffectsForTemplate(i, t, o, r)
        }
        e.runEffects ? e.runEffects(i, t, r) : i(t, r)
      }
      linkPaths(e, t) {
        ;(e = Ko(e)),
          (t = Ko(t)),
          (this.__dataLinkedPaths = this.__dataLinkedPaths || {}),
          (this.__dataLinkedPaths[e] = t)
      }
      unlinkPaths(e) {
        ;(e = Ko(e)), this.__dataLinkedPaths && delete this.__dataLinkedPaths[e]
      }
      notifySplices(e, t) {
        let o = { path: '' }
        ri(this, Wo(this, e, o), o.path, t)
      }
      get(e, t) {
        return Wo(t || this, e)
      }
      set(e, t, o) {
        o
          ? Xo(o, e, t)
          : (this[Vr.READ_ONLY] && this[Vr.READ_ONLY][e]) ||
            (this._setPendingPropertyOrPath(e, t, !0) &&
              this._invalidateProperties())
      }
      push(e, ...t) {
        let o = { path: '' },
          r = Wo(this, e, o),
          i = r.length,
          n = r.push(...t)
        return t.length && ii(this, r, o.path, i, t.length, []), n
      }
      pop(e) {
        let t = { path: '' },
          o = Wo(this, e, t),
          r = Boolean(o.length),
          i = o.pop()
        return r && ii(this, o, t.path, o.length, 0, [i]), i
      }
      splice(e, t, o, ...r) {
        let i,
          n = { path: '' },
          a = Wo(this, e, n)
        return (
          t < 0 ? (t = a.length - Math.floor(-t)) : t && (t = Math.floor(t)),
          (i = 2 === arguments.length ? a.splice(t) : a.splice(t, o, ...r)),
          (r.length || i.length) && ii(this, a, n.path, t, r.length, i),
          i
        )
      }
      shift(e) {
        let t = { path: '' },
          o = Wo(this, e, t),
          r = Boolean(o.length),
          i = o.shift()
        return r && ii(this, o, t.path, 0, 0, [i]), i
      }
      unshift(e, ...t) {
        let o = { path: '' },
          r = Wo(this, e, o),
          i = r.unshift(...t)
        return t.length && ii(this, r, o.path, 0, t.length, []), i
      }
      notifyPath(e, t) {
        let o
        if (1 == arguments.length) {
          let r = { path: '' }
          ;(t = Wo(this, e, r)), (o = r.path)
        } else o = Array.isArray(e) ? Ko(e) : e
        this._setPendingPropertyOrPath(o, t, !0, !0) &&
          this._invalidateProperties()
      }
      _createReadOnlyProperty(e, t) {
        var o
        this._addPropertyEffect(e, Vr.READ_ONLY),
          t &&
            (this['_set' + ((o = e), o[0].toUpperCase() + o.substring(1))] =
              function (t) {
                this._setProperty(e, t)
              })
      }
      _createPropertyObserver(e, t, o) {
        let r = { property: e, method: t, dynamicFn: Boolean(o) }
        this._addPropertyEffect(e, Vr.OBSERVE, {
          fn: Nr,
          info: r,
          trigger: { name: e },
        }),
          o &&
            this._addPropertyEffect(t, Vr.OBSERVE, {
              fn: Nr,
              info: r,
              trigger: { name: t },
            })
      }
      _createMethodObserver(e, t) {
        let o = ei(e)
        if (!o) throw new Error("Malformed observer expression '" + e + "'")
        Yr(this, o, Vr.OBSERVE, Wr, null, t)
      }
      _createNotifyingProperty(e) {
        this._addPropertyEffect(e, Vr.NOTIFY, {
          fn: Rr,
          info: { eventName: or(e) + '-changed', property: e },
        })
      }
      _createReflectedProperty(e) {
        let t = this.constructor.attributeNameForProperty(e)
        '-' === t[0]
          ? console.warn(
              'Property ' +
                e +
                ' cannot be reflected to attribute ' +
                t +
                ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'
            )
          : this._addPropertyEffect(e, Vr.REFLECT, {
              fn: Dr,
              info: { attrName: t },
            })
      }
      _createComputedProperty(e, t, o) {
        let r = ei(t)
        if (!r) throw new Error("Malformed computed expression '" + t + "'")
        const i = Yr(this, r, Vr.COMPUTE, Fr, e, o)
        Mr(this, '__computeInfo')[e] = i
      }
      _marshalArgs(e, t, o) {
        const r = this.__data,
          i = []
        for (let n = 0, a = e.length; n < a; n++) {
          let {
            name: a,
            structured: s,
            wildcard: l,
            value: d,
            literal: c,
          } = e[n]
          if (!c)
            if (l) {
              const e = qo(a, t),
                i = oi(r, o, e ? t : a)
              d = { path: e ? t : a, value: i, base: e ? Wo(r, a) : i }
            } else d = s ? oi(r, o, a) : r[a]
          if (
            Co &&
            !this._overrideLegacyUndefined &&
            void 0 === d &&
            e.length > 1
          )
            return xr
          i[n] = d
        }
        return i
      }
      static addPropertyEffect(e, t, o) {
        this.prototype._addPropertyEffect(e, t, o)
      }
      static createPropertyObserver(e, t, o) {
        this.prototype._createPropertyObserver(e, t, o)
      }
      static createMethodObserver(e, t) {
        this.prototype._createMethodObserver(e, t)
      }
      static createNotifyingProperty(e) {
        this.prototype._createNotifyingProperty(e)
      }
      static createReadOnlyProperty(e, t) {
        this.prototype._createReadOnlyProperty(e, t)
      }
      static createReflectedProperty(e) {
        this.prototype._createReflectedProperty(e)
      }
      static createComputedProperty(e, t, o) {
        this.prototype._createComputedProperty(e, t, o)
      }
      static bindTemplate(e) {
        return this.prototype._bindTemplate(e)
      }
      _bindTemplate(e, t) {
        let o = this.constructor._parseTemplate(e),
          r = this.__preBoundTemplateInfo == o
        if (!r) for (let e in o.propertyEffects) this._createPropertyAccessor(e)
        if (t)
          if (
            ((o = Object.create(o)), (o.wasPreBound = r), this.__templateInfo)
          ) {
            const t = e._parentTemplateInfo || this.__templateInfo,
              r = t.lastChild
            ;(o.parent = t),
              (t.lastChild = o),
              (o.previousSibling = r),
              r ? (r.nextSibling = o) : (t.firstChild = o)
          } else this.__templateInfo = o
        else this.__preBoundTemplateInfo = o
        return o
      }
      static _addTemplatePropertyEffect(e, t, o) {
        ;(e.hostProps = e.hostProps || {})[t] = !0
        let r = (e.propertyEffects = e.propertyEffects || {})
        ;(r[t] = r[t] || []).push(o)
      }
      _stampTemplate(e, t) {
        ;(t = t || this._bindTemplate(e, !0)), ai.push(this)
        let o = super._stampTemplate(e, t)
        if ((ai.pop(), (t.nodeList = o.nodeList), !t.wasPreBound)) {
          let e = (t.childNodes = [])
          for (let t = o.firstChild; t; t = t.nextSibling) e.push(t)
        }
        return (
          (o.templateInfo = t),
          (function (e, t) {
            let { nodeList: o, nodeInfoList: r } = t
            if (r.length)
              for (let t = 0; t < r.length; t++) {
                let i = r[t],
                  n = o[t],
                  a = i.bindings
                if (a)
                  for (let t = 0; t < a.length; t++) {
                    let o = a[t]
                    Gr(n, o), Kr(n, e, o)
                  }
                n.__dataHost = e
              }
          })(this, t),
          this.__dataClientsReady &&
            (this._runEffectsForTemplate(t, this.__data, null, !1),
            this._flushClients()),
          o
        )
      }
      _removeBoundDom(e) {
        const t = e.templateInfo,
          { previousSibling: o, nextSibling: r, parent: i } = t
        o ? (o.nextSibling = r) : i && (i.firstChild = r),
          r ? (r.previousSibling = o) : i && (i.lastChild = o),
          (t.nextSibling = t.previousSibling = null)
        let n = t.childNodes
        for (let e = 0; e < n.length; e++) {
          let t = n[e]
          $o($o(t).parentNode).removeChild(t)
        }
      }
      static _parseTemplateNode(e, o, r) {
        let i = t._parseTemplateNode.call(this, e, o, r)
        if (e.nodeType === Node.TEXT_NODE) {
          let t = this._parseBindings(e.textContent, o)
          t &&
            ((e.textContent = Qr(t) || ' '),
            Ur(this, o, r, 'text', 'textContent', t),
            (i = !0))
        }
        return i
      }
      static _parseTemplateNodeAttribute(e, o, r, i, n) {
        let a = this._parseBindings(n, o)
        if (a) {
          let t = i,
            n = 'property'
          Er.test(i)
            ? (n = 'attribute')
            : '$' == i[i.length - 1] &&
              ((i = i.slice(0, -1)), (n = 'attribute'))
          let s = Qr(a)
          return (
            s &&
              'attribute' == n &&
              ('class' == i &&
                e.hasAttribute('class') &&
                (s += ' ' + e.getAttribute(i)),
              e.setAttribute(i, s)),
            'attribute' == n &&
              'disable-upgrade$' == t &&
              e.setAttribute(i, ''),
            'input' === e.localName && 'value' === t && e.setAttribute(t, ''),
            e.removeAttribute(t),
            'property' === n && (i = tr(i)),
            Ur(this, o, r, n, i, a, s),
            !0
          )
        }
        return t._parseTemplateNodeAttribute.call(this, e, o, r, i, n)
      }
      static _parseTemplateNestedTemplate(e, o, r) {
        let i = t._parseTemplateNestedTemplate.call(this, e, o, r)
        const n = e.parentNode,
          a = r.templateInfo,
          s = 'dom-if' === n.localName,
          l = 'dom-repeat' === n.localName
        wo &&
          (s || l) &&
          (n.removeChild(e),
          ((r = r.parentInfo).templateInfo = a),
          (r.noted = !0),
          (i = !1))
        let d = a.hostProps
        if (Ho && s)
          d &&
            ((o.hostProps = Object.assign(o.hostProps || {}, d)),
            wo || (r.parentInfo.noted = !0))
        else {
          let e = '{'
          for (let t in d) {
            Ur(this, o, r, 'property', '_host_' + t, [
              { mode: e, source: t, dependencies: [t], hostProp: !0 },
            ])
          }
        }
        return i
      }
      static _parseBindings(e, t) {
        let o,
          r = [],
          i = 0
        for (; null !== (o = Jr.exec(e)); ) {
          o.index > i && r.push({ literal: e.slice(i, o.index) })
          let n = o[1][0],
            a = Boolean(o[2]),
            s = o[3].trim(),
            l = !1,
            d = '',
            c = -1
          '{' == n &&
            (c = s.indexOf('::')) > 0 &&
            ((d = s.substring(c + 2)), (s = s.substring(0, c)), (l = !0))
          let p = ei(s),
            u = []
          if (p) {
            let { args: e, methodName: o } = p
            for (let t = 0; t < e.length; t++) {
              let o = e[t]
              o.literal || u.push(o)
            }
            let r = t.dynamicFns
            ;((r && r[o]) || p.static) && (u.push(o), (p.dynamicFn = !0))
          } else u.push(s)
          r.push({
            source: s,
            mode: n,
            negate: a,
            customEvent: l,
            signature: p,
            dependencies: u,
            event: d,
          }),
            (i = Jr.lastIndex)
        }
        if (i && i < e.length) {
          let t = e.substring(i)
          t && r.push({ literal: t })
        }
        return r.length ? r : null
      }
      static _evaluateBinding(e, t, o, r, i, n) {
        let a
        return (
          (a = t.signature
            ? Wr(e, o, r, 0, t.signature)
            : o != t.source
            ? Wo(e, t.source)
            : n && Fo(o)
            ? Wo(e, o)
            : e.__data[o]),
          t.negate && (a = !a),
          a
        )
      }
    }
  }),
  ai = []
const si = Vo((e) => {
    const t = mr(e)
    function o(e) {
      const t = Object.getPrototypeOf(e)
      return t.prototype instanceof i ? t : null
    }
    function r(e) {
      if (!e.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', e))) {
        let t = null
        if (e.hasOwnProperty(JSCompiler_renameProperty('properties', e))) {
          const o = e.properties
          o &&
            (t = (function (e) {
              const t = {}
              for (let o in e) {
                const r = e[o]
                t[o] = 'function' == typeof r ? { type: r } : r
              }
              return t
            })(o))
        }
        e.__ownProperties = t
      }
      return e.__ownProperties
    }
    class i extends t {
      static get observedAttributes() {
        if (
          !this.hasOwnProperty(
            JSCompiler_renameProperty('__observedAttributes', this)
          )
        ) {
          this.prototype
          const e = this._properties
          this.__observedAttributes = e
            ? Object.keys(e).map((e) =>
                this.prototype._addPropertyToAttributeMap(e)
              )
            : []
        }
        return this.__observedAttributes
      }
      static finalize() {
        if (
          !this.hasOwnProperty(JSCompiler_renameProperty('__finalized', this))
        ) {
          const e = o(this)
          e && e.finalize(), (this.__finalized = !0), this._finalizeClass()
        }
      }
      static _finalizeClass() {
        const e = r(this)
        e && this.createProperties(e)
      }
      static get _properties() {
        if (
          !this.hasOwnProperty(JSCompiler_renameProperty('__properties', this))
        ) {
          const e = o(this)
          this.__properties = Object.assign({}, e && e._properties, r(this))
        }
        return this.__properties
      }
      static typeForProperty(e) {
        const t = this._properties[e]
        return t && t.type
      }
      _initializeProperties() {
        this.constructor.finalize(), super._initializeProperties()
      }
      connectedCallback() {
        super.connectedCallback && super.connectedCallback(),
          this._enableProperties()
      }
      disconnectedCallback() {
        super.disconnectedCallback && super.disconnectedCallback()
      }
    }
    return i
  }),
  li = window.ShadyCSS && window.ShadyCSS.cssBuild,
  di = Vo((e) => {
    const t = si(ni(e))
    function o(e, t, o, r) {
      o.computed && (o.readOnly = !0),
        o.computed &&
          (e._hasReadOnlyEffect(t)
            ? console.warn(`Cannot redefine computed property '${t}'.`)
            : e._createComputedProperty(t, o.computed, r)),
        o.readOnly && !e._hasReadOnlyEffect(t)
          ? e._createReadOnlyProperty(t, !o.computed)
          : !1 === o.readOnly &&
            e._hasReadOnlyEffect(t) &&
            console.warn(`Cannot make readOnly property '${t}' non-readOnly.`),
        o.reflectToAttribute && !e._hasReflectEffect(t)
          ? e._createReflectedProperty(t)
          : !1 === o.reflectToAttribute &&
            e._hasReflectEffect(t) &&
            console.warn(
              `Cannot make reflected property '${t}' non-reflected.`
            ),
        o.notify && !e._hasNotifyEffect(t)
          ? e._createNotifyingProperty(t)
          : !1 === o.notify &&
            e._hasNotifyEffect(t) &&
            console.warn(`Cannot make notify property '${t}' non-notify.`),
        o.observer && e._createPropertyObserver(t, o.observer, r[o.observer]),
        e._addPropertyToAttributeMap(t)
    }
    function r(e, t, o, r) {
      if (!li) {
        const i = t.content.querySelectorAll('style'),
          n = Do(t),
          a = (function (e) {
            let t = No(e)
            return t ? jo(t) : []
          })(o),
          s = t.content.firstElementChild
        for (let o = 0; o < a.length; o++) {
          let i = a[o]
          ;(i.textContent = e._processStyleText(i.textContent, r)),
            t.content.insertBefore(i, s)
        }
        let l = 0
        for (let t = 0; t < n.length; t++) {
          let o = n[t],
            a = i[l]
          a !== o
            ? ((o = o.cloneNode(!0)), a.parentNode.insertBefore(o, a))
            : l++,
            (o.textContent = e._processStyleText(o.textContent, r))
        }
      }
      if (
        (window.ShadyCSS && window.ShadyCSS.prepareTemplate(t, o),
        Lo && li && uo)
      ) {
        const o = t.content.querySelectorAll('style')
        if (o) {
          let t = ''
          Array.from(o).forEach((e) => {
            ;(t += e.textContent), e.parentNode.removeChild(e)
          }),
            (e._styleSheet = new CSSStyleSheet()),
            e._styleSheet.replaceSync(t)
        }
      }
    }
    return class extends t {
      static get polymerElementVersion() {
        return '3.4.1'
      }
      static _finalizeClass() {
        t._finalizeClass.call(this)
        const e =
          ((o = this).hasOwnProperty(
            JSCompiler_renameProperty('__ownObservers', o)
          ) ||
            (o.__ownObservers = o.hasOwnProperty(
              JSCompiler_renameProperty('observers', o)
            )
              ? o.observers
              : null),
          o.__ownObservers)
        var o
        e && this.createObservers(e, this._properties), this._prepareTemplate()
      }
      static _prepareTemplate() {
        let e = this.template
        e &&
          ('string' == typeof e
            ? (console.error('template getter must return HTMLTemplateElement'),
              (e = null))
            : yo || (e = e.cloneNode(!0))),
          (this.prototype._template = e)
      }
      static createProperties(e) {
        for (let t in e) o(this.prototype, t, e[t], e)
      }
      static createObservers(e, t) {
        const o = this.prototype
        for (let r = 0; r < e.length; r++) o._createMethodObserver(e[r], t)
      }
      static get template() {
        if (
          !this.hasOwnProperty(JSCompiler_renameProperty('_template', this))
        ) {
          const e = this.prototype.hasOwnProperty(
            JSCompiler_renameProperty('_template', this.prototype)
          )
            ? this.prototype._template
            : void 0
          this._template =
            void 0 !== e
              ? e
              : (this.hasOwnProperty(JSCompiler_renameProperty('is', this)) &&
                  (function (e) {
                    let t = null
                    if (
                      e &&
                      (!_o || fo) &&
                      ((t = zo.import(e, 'template')), _o && !t)
                    )
                      throw new Error(
                        `strictTemplatePolicy: expecting dom-module or null template for ${e}`
                      )
                    return t
                  })(this.is)) ||
                Object.getPrototypeOf(this.prototype).constructor.template
        }
        return this._template
      }
      static set template(e) {
        this._template = e
      }
      static get importPath() {
        if (
          !this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))
        ) {
          const e = this.importMeta
          if (e) this._importPath = co(e.url)
          else {
            const e = zo.import(this.is)
            this._importPath =
              (e && e.assetpath) ||
              Object.getPrototypeOf(this.prototype).constructor.importPath
          }
        }
        return this._importPath
      }
      constructor() {
        super(),
          this._template,
          this._importPath,
          this.rootPath,
          this.importPath,
          this.root,
          this.$
      }
      _initializeProperties() {
        this.constructor.finalize(),
          this.constructor._finalizeTemplate(this.localName),
          super._initializeProperties(),
          (this.rootPath = mo),
          (this.importPath = this.constructor.importPath)
        let e = (function (e) {
          if (
            !e.hasOwnProperty(
              JSCompiler_renameProperty('__propertyDefaults', e)
            )
          ) {
            e.__propertyDefaults = null
            let t = e._properties
            for (let o in t) {
              let r = t[o]
              'value' in r &&
                ((e.__propertyDefaults = e.__propertyDefaults || {}),
                (e.__propertyDefaults[o] = r))
            }
          }
          return e.__propertyDefaults
        })(this.constructor)
        if (e)
          for (let t in e) {
            let o = e[t]
            if (this._canApplyPropertyDefault(t)) {
              let e =
                'function' == typeof o.value ? o.value.call(this) : o.value
              this._hasAccessor(t)
                ? this._setPendingProperty(t, e, !0)
                : (this[t] = e)
            }
          }
      }
      _canApplyPropertyDefault(e) {
        return !this.hasOwnProperty(e)
      }
      static _processStyleText(e, t) {
        return lo(e, t)
      }
      static _finalizeTemplate(e) {
        const t = this.prototype._template
        if (t && !t.__polymerFinalized) {
          t.__polymerFinalized = !0
          const o = this.importPath
          r(this, t, e, o ? so(o) : ''), this.prototype._bindTemplate(t)
        }
      }
      connectedCallback() {
        window.ShadyCSS && this._template && window.ShadyCSS.styleElement(this),
          super.connectedCallback()
      }
      ready() {
        this._template &&
          ((this.root = this._stampTemplate(this._template)),
          (this.$ = this.root.$)),
          super.ready()
      }
      _readyClients() {
        this._template && (this.root = this._attachDom(this.root)),
          super._readyClients()
      }
      _attachDom(e) {
        const t = $o(this)
        if (t.attachShadow)
          return e
            ? (t.shadowRoot ||
                (t.attachShadow({ mode: 'open', shadyUpgradeFragment: e }),
                t.shadowRoot.appendChild(e),
                this.constructor._styleSheet &&
                  (t.shadowRoot.adoptedStyleSheets = [
                    this.constructor._styleSheet,
                  ])),
              vo &&
                window.ShadyDOM &&
                window.ShadyDOM.flushInitial(t.shadowRoot),
              t.shadowRoot)
            : null
        throw new Error(
          'ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.'
        )
      }
      updateStyles(e) {
        window.ShadyCSS && window.ShadyCSS.styleSubtree(this, e)
      }
      resolveUrl(e, t) {
        return !t && this.importPath && (t = so(this.importPath)), so(e, t)
      }
      static _parseTemplateContent(e, o, r) {
        return (
          (o.dynamicFns = o.dynamicFns || this._properties),
          t._parseTemplateContent.call(this, e, o, r)
        )
      }
      static _addTemplatePropertyEffect(e, o, r) {
        return (
          !bo ||
            o in this._properties ||
            (r.info.part.signature && r.info.part.signature.static) ||
            r.info.part.hostProp ||
            e.nestedTemplate ||
            console.warn(
              `Property '${o}' used in template but not declared in 'properties'; attribute will not be observed.`
            ),
          t._addTemplatePropertyEffect.call(this, e, o, r)
        )
      }
    }
  })
class ci {
  constructor() {
    ;(this._asyncModule = null), (this._callback = null), (this._timer = null)
  }
  setConfig(e, t) {
    ;(this._asyncModule = e),
      (this._callback = t),
      (this._timer = this._asyncModule.run(() => {
        ;(this._timer = null), pi.delete(this), this._callback()
      }))
  }
  cancel() {
    this.isActive() && (this._cancelAsync(), pi.delete(this))
  }
  _cancelAsync() {
    this.isActive() &&
      (this._asyncModule.cancel(this._timer), (this._timer = null))
  }
  flush() {
    this.isActive() && (this.cancel(), this._callback())
  }
  isActive() {
    return null != this._timer
  }
  static debounce(e, t, o) {
    return (
      e instanceof ci ? e._cancelAsync() : (e = new ci()), e.setConfig(t, o), e
    )
  }
}
let pi = new Set()
const ui = function (e) {
    pi.add(e)
  },
  mi = function () {
    const e = Boolean(pi.size)
    return (
      pi.forEach((e) => {
        try {
          e.flush()
        } catch (e) {
          setTimeout(() => {
            throw e
          })
        }
      }),
      e
    )
  }
let hi = 'string' == typeof document.head.style.touchAction,
  gi = '__polymerGestures',
  _i = '__polymerGesturesHandled',
  fi = '__polymerGesturesTouchAction',
  yi = ['mousedown', 'mousemove', 'mouseup', 'click'],
  bi = [0, 1, 4, 2],
  vi = (function () {
    try {
      return 1 === new MouseEvent('test', { buttons: 1 }).buttons
    } catch (e) {
      return !1
    }
  })()
function Ci(e) {
  return yi.indexOf(e) > -1
}
let Ai = !1
function wi(e) {
  if (!Ci(e) && 'touchend' !== e)
    return hi && Ai && go ? { passive: !0 } : void 0
}
!(function () {
  try {
    let e = Object.defineProperty({}, 'passive', {
      get() {
        Ai = !0
      },
    })
    window.addEventListener('test', null, e),
      window.removeEventListener('test', null, e)
  } catch (e) {}
})()
let Hi = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/)
const ki = [],
  Si = {
    button: !0,
    input: !0,
    keygen: !0,
    meter: !0,
    output: !0,
    textarea: !0,
    progress: !0,
    select: !0,
  },
  Li = {
    button: !0,
    command: !0,
    fieldset: !0,
    input: !0,
    keygen: !0,
    optgroup: !0,
    option: !0,
    select: !0,
    textarea: !0,
  }
function xi(e) {
  let t = Array.prototype.slice.call(e.labels || [])
  if (!t.length) {
    t = []
    let o = e.getRootNode()
    if (e.id) {
      let r = o.querySelectorAll(`label[for = ${e.id}]`)
      for (let e = 0; e < r.length; e++) t.push(r[e])
    }
  }
  return t
}
let Vi = function (e) {
  let t = e.sourceCapabilities
  var o
  if (
    (!t || t.firesTouchEvents) &&
    ((e[_i] = { skip: !0 }), 'click' === e.type)
  ) {
    let t = !1,
      r = Ni(e)
    for (let e = 0; e < r.length; e++) {
      if (r[e].nodeType === Node.ELEMENT_NODE)
        if ('label' === r[e].localName) ki.push(r[e])
        else if (((o = r[e]), Si[o.localName])) {
          let o = xi(r[e])
          for (let e = 0; e < o.length; e++) t = t || ki.indexOf(o[e]) > -1
        }
      if (r[e] === Pi.mouse.target) return
    }
    if (t) return
    e.preventDefault(), e.stopPropagation()
  }
}
function Ei(e) {
  let t = Hi ? ['click'] : yi
  for (let o, r = 0; r < t.length; r++)
    (o = t[r]),
      e
        ? ((ki.length = 0), document.addEventListener(o, Vi, !0))
        : document.removeEventListener(o, Vi, !0)
}
function Mi(e) {
  let t = e.type
  if (!Ci(t)) return !1
  if ('mousemove' === t) {
    let t = void 0 === e.buttons ? 1 : e.buttons
    return (
      e instanceof window.MouseEvent && !vi && (t = bi[e.which] || 0),
      Boolean(1 & t)
    )
  }
  return 0 === (void 0 === e.button ? 0 : e.button)
}
let Pi = {
  mouse: { target: null, mouseIgnoreJob: null },
  touch: { x: 0, y: 0, id: -1, scrollDecided: !1 },
}
function Ti(e, t, o) {
  ;(e.movefn = t),
    (e.upfn = o),
    document.addEventListener('mousemove', t),
    document.addEventListener('mouseup', o)
}
function zi(e) {
  document.removeEventListener('mousemove', e.movefn),
    document.removeEventListener('mouseup', e.upfn),
    (e.movefn = null),
    (e.upfn = null)
}
document.addEventListener(
  'touchend',
  function (e) {
    Pi.mouse.mouseIgnoreJob || Ei(!0),
      (Pi.mouse.target = Ni(e)[0]),
      (Pi.mouse.mouseIgnoreJob = ci.debounce(
        Pi.mouse.mouseIgnoreJob,
        dr.after(2500),
        function () {
          Ei(), (Pi.mouse.target = null), (Pi.mouse.mouseIgnoreJob = null)
        }
      ))
  },
  !!Ai && { passive: !0 }
)
const Ni =
    window.ShadyDOM && window.ShadyDOM.noPatch
      ? window.ShadyDOM.composedPath
      : (e) => (e.composedPath && e.composedPath()) || [],
  Ii = {},
  Oi = []
function Ri(e) {
  const t = Ni(e)
  return t.length > 0 ? t[0] : e.target
}
function Di(e) {
  let t,
    o = e.type,
    r = e.currentTarget.__polymerGestures
  if (!r) return
  let i = r[o]
  if (i) {
    if (!e[_i] && ((e[_i] = {}), 'touch' === o.slice(0, 5))) {
      let t = e.changedTouches[0]
      if (
        ('touchstart' === o &&
          1 === e.touches.length &&
          (Pi.touch.id = t.identifier),
        Pi.touch.id !== t.identifier)
      )
        return
      hi ||
        ('touchstart' !== o && 'touchmove' !== o) ||
        (function (e) {
          let t = e.changedTouches[0],
            o = e.type
          if ('touchstart' === o)
            (Pi.touch.x = t.clientX),
              (Pi.touch.y = t.clientY),
              (Pi.touch.scrollDecided = !1)
          else if ('touchmove' === o) {
            if (Pi.touch.scrollDecided) return
            Pi.touch.scrollDecided = !0
            let o = (function (e) {
                let t = 'auto',
                  o = Ni(e)
                for (let e, r = 0; r < o.length; r++)
                  if (((e = o[r]), e[fi])) {
                    t = e[fi]
                    break
                  }
                return t
              })(e),
              r = !1,
              i = Math.abs(Pi.touch.x - t.clientX),
              n = Math.abs(Pi.touch.y - t.clientY)
            e.cancelable &&
              ('none' === o
                ? (r = !0)
                : 'pan-x' === o
                ? (r = n > i)
                : 'pan-y' === o && (r = i > n)),
              r ? e.preventDefault() : Zi('track')
          }
        })(e)
    }
    if (((t = e[_i]), !t.skip)) {
      for (let o, r = 0; r < Oi.length; r++)
        (o = Oi[r]),
          i[o.name] &&
            !t[o.name] &&
            o.flow &&
            o.flow.start.indexOf(e.type) > -1 &&
            o.reset &&
            o.reset()
      for (let r, n = 0; n < Oi.length; n++)
        (r = Oi[n]), i[r.name] && !t[r.name] && ((t[r.name] = !0), r[o](e))
    }
  }
}
function ji(e, t, o) {
  return (
    !!Ii[t] &&
    ((function (e, t, o) {
      let r = Ii[t],
        i = r.deps,
        n = r.name,
        a = e[gi]
      a || (e[gi] = a = {})
      for (let t, o, r = 0; r < i.length; r++)
        (t = i[r]),
          (Hi && Ci(t) && 'click' !== t) ||
            ((o = a[t]),
            o || (a[t] = o = { _count: 0 }),
            0 === o._count && e.addEventListener(t, Di, wi(t)),
            (o[n] = (o[n] || 0) + 1),
            (o._count = (o._count || 0) + 1))
      e.addEventListener(t, o), r.touchAction && Fi(e, r.touchAction)
    })(e, t, o),
    !0)
  )
}
function Bi(e, t, o) {
  return (
    !!Ii[t] &&
    ((function (e, t, o) {
      let r = Ii[t],
        i = r.deps,
        n = r.name,
        a = e[gi]
      if (a)
        for (let t, o, r = 0; r < i.length; r++)
          (t = i[r]),
            (o = a[t]),
            o &&
              o[n] &&
              ((o[n] = (o[n] || 1) - 1),
              (o._count = (o._count || 1) - 1),
              0 === o._count && e.removeEventListener(t, Di, wi(t)))
      e.removeEventListener(t, o)
    })(e, t, o),
    !0)
  )
}
function $i(e) {
  Oi.push(e)
  for (let t = 0; t < e.emits.length; t++) Ii[e.emits[t]] = e
}
function Fi(e, t) {
  hi &&
    e instanceof HTMLElement &&
    pr.run(() => {
      e.style.touchAction = t
    }),
    (e[fi] = t)
}
function Ui(e, t, o) {
  let r = new Event(t, { bubbles: !0, cancelable: !0, composed: !0 })
  if (((r.detail = o), $o(e).dispatchEvent(r), r.defaultPrevented)) {
    let e = o.preventer || o.sourceEvent
    e && e.preventDefault && e.preventDefault()
  }
}
function Zi(e) {
  let t = (function (e) {
    for (let t, o = 0; o < Oi.length; o++) {
      t = Oi[o]
      for (let o, r = 0; r < t.emits.length; r++)
        if (((o = t.emits[r]), o === e)) return t
    }
    return null
  })(e)
  t.info && (t.info.prevent = !0)
}
function qi(e, t, o, r) {
  t &&
    Ui(t, e, {
      x: o.clientX,
      y: o.clientY,
      sourceEvent: o,
      preventer: r,
      prevent: function (e) {
        return Zi(e)
      },
    })
}
function Gi(e, t, o) {
  if (e.prevent) return !1
  if (e.started) return !0
  let r = Math.abs(e.x - t),
    i = Math.abs(e.y - o)
  return r >= 5 || i >= 5
}
function Ki(e, t, o) {
  if (!t) return
  let r,
    i = e.moves[e.moves.length - 2],
    n = e.moves[e.moves.length - 1],
    a = n.x - e.x,
    s = n.y - e.y,
    l = 0
  i && ((r = n.x - i.x), (l = n.y - i.y)),
    Ui(t, 'track', {
      state: e.state,
      x: o.clientX,
      y: o.clientY,
      dx: a,
      dy: s,
      ddx: r,
      ddy: l,
      sourceEvent: o,
      hover: function () {
        return (function (e, t) {
          let o = document.elementFromPoint(e, t),
            r = o
          for (; r && r.shadowRoot && !window.ShadyDOM; ) {
            let i = r
            if (((r = r.shadowRoot.elementFromPoint(e, t)), i === r)) break
            r && (o = r)
          }
          return o
        })(o.clientX, o.clientY)
      },
    })
}
function Yi(e, t, o) {
  let r = Math.abs(t.clientX - e.x),
    i = Math.abs(t.clientY - e.y),
    n = Ri(o || t)
  !n ||
    (Li[n.localName] && n.hasAttribute('disabled')) ||
    ((isNaN(r) ||
      isNaN(i) ||
      (r <= 25 && i <= 25) ||
      (function (e) {
        if ('click' === e.type) {
          if (0 === e.detail) return !0
          let t = Ri(e)
          if (!t.nodeType || t.nodeType !== Node.ELEMENT_NODE) return !0
          let o = t.getBoundingClientRect(),
            r = e.pageX,
            i = e.pageY
          return !(r >= o.left && r <= o.right && i >= o.top && i <= o.bottom)
        }
        return !1
      })(t)) &&
      (e.prevent ||
        Ui(n, 'tap', {
          x: t.clientX,
          y: t.clientY,
          sourceEvent: t,
          preventer: o,
        })))
}
$i({
  name: 'downup',
  deps: ['mousedown', 'touchstart', 'touchend'],
  flow: { start: ['mousedown', 'touchstart'], end: ['mouseup', 'touchend'] },
  emits: ['down', 'up'],
  info: { movefn: null, upfn: null },
  reset: function () {
    zi(this.info)
  },
  mousedown: function (e) {
    if (!Mi(e)) return
    let t = Ri(e),
      o = this
    Ti(
      this.info,
      function (e) {
        Mi(e) || (qi('up', t, e), zi(o.info))
      },
      function (e) {
        Mi(e) && qi('up', t, e), zi(o.info)
      }
    ),
      qi('down', t, e)
  },
  touchstart: function (e) {
    qi('down', Ri(e), e.changedTouches[0], e)
  },
  touchend: function (e) {
    qi('up', Ri(e), e.changedTouches[0], e)
  },
}),
  $i({
    name: 'track',
    touchAction: 'none',
    deps: ['mousedown', 'touchstart', 'touchmove', 'touchend'],
    flow: { start: ['mousedown', 'touchstart'], end: ['mouseup', 'touchend'] },
    emits: ['track'],
    info: {
      x: 0,
      y: 0,
      state: 'start',
      started: !1,
      moves: [],
      addMove: function (e) {
        this.moves.length > 2 && this.moves.shift(), this.moves.push(e)
      },
      movefn: null,
      upfn: null,
      prevent: !1,
    },
    reset: function () {
      ;(this.info.state = 'start'),
        (this.info.started = !1),
        (this.info.moves = []),
        (this.info.x = 0),
        (this.info.y = 0),
        (this.info.prevent = !1),
        zi(this.info)
    },
    mousedown: function (e) {
      if (!Mi(e)) return
      let t = Ri(e),
        o = this,
        r = function (e) {
          let r = e.clientX,
            i = e.clientY
          Gi(o.info, r, i) &&
            ((o.info.state = o.info.started
              ? 'mouseup' === e.type
                ? 'end'
                : 'track'
              : 'start'),
            'start' === o.info.state && Zi('tap'),
            o.info.addMove({ x: r, y: i }),
            Mi(e) || ((o.info.state = 'end'), zi(o.info)),
            t && Ki(o.info, t, e),
            (o.info.started = !0))
        }
      Ti(this.info, r, function (e) {
        o.info.started && r(e), zi(o.info)
      }),
        (this.info.x = e.clientX),
        (this.info.y = e.clientY)
    },
    touchstart: function (e) {
      let t = e.changedTouches[0]
      ;(this.info.x = t.clientX), (this.info.y = t.clientY)
    },
    touchmove: function (e) {
      let t = Ri(e),
        o = e.changedTouches[0],
        r = o.clientX,
        i = o.clientY
      Gi(this.info, r, i) &&
        ('start' === this.info.state && Zi('tap'),
        this.info.addMove({ x: r, y: i }),
        Ki(this.info, t, o),
        (this.info.state = 'track'),
        (this.info.started = !0))
    },
    touchend: function (e) {
      let t = Ri(e),
        o = e.changedTouches[0]
      this.info.started &&
        ((this.info.state = 'end'),
        this.info.addMove({ x: o.clientX, y: o.clientY }),
        Ki(this.info, t, o))
    },
  }),
  $i({
    name: 'tap',
    deps: ['mousedown', 'click', 'touchstart', 'touchend'],
    flow: { start: ['mousedown', 'touchstart'], end: ['click', 'touchend'] },
    emits: ['tap'],
    info: { x: NaN, y: NaN, prevent: !1 },
    reset: function () {
      ;(this.info.x = NaN), (this.info.y = NaN), (this.info.prevent = !1)
    },
    mousedown: function (e) {
      Mi(e) && ((this.info.x = e.clientX), (this.info.y = e.clientY))
    },
    click: function (e) {
      Mi(e) && Yi(this.info, e)
    },
    touchstart: function (e) {
      const t = e.changedTouches[0]
      ;(this.info.x = t.clientX), (this.info.y = t.clientY)
    },
    touchend: function (e) {
      Yi(this.info, e.changedTouches[0], e)
    },
  })
const Wi = Vo(
    (e) =>
      class extends e {
        _addEventListenerToNode(e, t, o) {
          ji(e, t, o) || super._addEventListenerToNode(e, t, o)
        }
        _removeEventListenerFromNode(e, t, o) {
          Bi(e, t, o) || super._removeEventListenerFromNode(e, t, o)
        }
      }
  ),
  Xi = /:host\(:dir\((ltr|rtl)\)\)/g,
  Ji = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,
  Qi = /:dir\((?:ltr|rtl)\)/,
  en = Boolean(window.ShadyDOM && window.ShadyDOM.inUse),
  tn = []
let on = null,
  rn = ''
function nn() {
  rn = document.documentElement.getAttribute('dir')
}
function an(e) {
  if (!e.__autoDirOptOut) {
    e.setAttribute('dir', rn)
  }
}
function sn() {
  nn(), (rn = document.documentElement.getAttribute('dir'))
  for (let e = 0; e < tn.length; e++) an(tn[e])
}
const ln = Vo((e) => {
  en ||
    on ||
    (nn(),
    (on = new MutationObserver(sn)),
    on.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ['dir'],
    }))
  const t = _r(e)
  class o extends t {
    static _processStyleText(e, o) {
      return (
        (e = t._processStyleText.call(this, e, o)),
        !en &&
          Qi.test(e) &&
          ((e = this._replaceDirInCssText(e)), (this.__activateDir = !0)),
        e
      )
    }
    static _replaceDirInCssText(e) {
      let t = e
      return (
        (t = t.replace(Xi, ':host([dir="$1"])')),
        (t = t.replace(Ji, ':host([dir="$2"]) $1')),
        t
      )
    }
    constructor() {
      super(), (this.__autoDirOptOut = !1)
    }
    ready() {
      super.ready(), (this.__autoDirOptOut = this.hasAttribute('dir'))
    }
    connectedCallback() {
      t.prototype.connectedCallback && super.connectedCallback(),
        this.constructor.__activateDir &&
          (on && on.takeRecords().length && sn(), tn.push(this), an(this))
    }
    disconnectedCallback() {
      if (
        (t.prototype.disconnectedCallback && super.disconnectedCallback(),
        this.constructor.__activateDir)
      ) {
        const e = tn.indexOf(this)
        e > -1 && tn.splice(e, 1)
      }
    }
  }
  return (o.__activateDir = !1), o
})
function dn() {
  document.body.removeAttribute('unresolved')
}
function cn(e, t, o) {
  return { index: e, removed: t, addedCount: o }
}
'interactive' === document.readyState || 'complete' === document.readyState
  ? dn()
  : window.addEventListener('DOMContentLoaded', dn)
function pn(e, t, o, r, i, n) {
  let a,
    s = 0,
    l = 0,
    d = Math.min(o - t, n - i)
  if (
    (0 == t &&
      0 == i &&
      (s = (function (e, t, o) {
        for (let r = 0; r < o; r++) if (!mn(e[r], t[r])) return r
        return o
      })(e, r, d)),
    o == e.length &&
      n == r.length &&
      (l = (function (e, t, o) {
        let r = e.length,
          i = t.length,
          n = 0
        for (; n < o && mn(e[--r], t[--i]); ) n++
        return n
      })(e, r, d - s)),
    (i += s),
    (n -= l),
    (o -= l) - (t += s) == 0 && n - i == 0)
  )
    return []
  if (t == o) {
    for (a = cn(t, [], 0); i < n; ) a.removed.push(r[i++])
    return [a]
  }
  if (i == n) return [cn(t, [], o - t)]
  let c = (function (e) {
    let t = e.length - 1,
      o = e[0].length - 1,
      r = e[t][o],
      i = []
    for (; t > 0 || o > 0; ) {
      if (0 == t) {
        i.push(2), o--
        continue
      }
      if (0 == o) {
        i.push(3), t--
        continue
      }
      let n,
        a = e[t - 1][o - 1],
        s = e[t - 1][o],
        l = e[t][o - 1]
      ;(n = s < l ? (s < a ? s : a) : l < a ? l : a),
        n == a
          ? (a == r ? i.push(0) : (i.push(1), (r = a)), t--, o--)
          : n == s
          ? (i.push(3), t--, (r = s))
          : (i.push(2), o--, (r = l))
    }
    return i.reverse(), i
  })(
    (function (e, t, o, r, i, n) {
      let a = n - i + 1,
        s = o - t + 1,
        l = new Array(a)
      for (let e = 0; e < a; e++) (l[e] = new Array(s)), (l[e][0] = e)
      for (let e = 0; e < s; e++) l[0][e] = e
      for (let o = 1; o < a; o++)
        for (let n = 1; n < s; n++)
          if (mn(e[t + n - 1], r[i + o - 1])) l[o][n] = l[o - 1][n - 1]
          else {
            let e = l[o - 1][n] + 1,
              t = l[o][n - 1] + 1
            l[o][n] = e < t ? e : t
          }
      return l
    })(e, t, o, r, i, n)
  )
  a = void 0
  let p = [],
    u = t,
    m = i
  for (let e = 0; e < c.length; e++)
    switch (c[e]) {
      case 0:
        a && (p.push(a), (a = void 0)), u++, m++
        break
      case 1:
        a || (a = cn(u, [], 0)), a.addedCount++, u++, a.removed.push(r[m]), m++
        break
      case 2:
        a || (a = cn(u, [], 0)), a.addedCount++, u++
        break
      case 3:
        a || (a = cn(u, [], 0)), a.removed.push(r[m]), m++
    }
  return a && p.push(a), p
}
function un(e, t) {
  return pn(e, 0, e.length, t, 0, t.length)
}
function mn(e, t) {
  return e === t
}
function hn(e) {
  return 'slot' === e.localName
}
let gn = class {
  static getFlattenedNodes(e) {
    const t = $o(e)
    return hn(e)
      ? t.assignedNodes({ flatten: !0 })
      : Array.from(t.childNodes)
          .map((e) => (hn(e) ? $o(e).assignedNodes({ flatten: !0 }) : [e]))
          .reduce((e, t) => e.concat(t), [])
  }
  constructor(e, t) {
    ;(this._shadyChildrenObserver = null),
      (this._nativeChildrenObserver = null),
      (this._connected = !1),
      (this._target = e),
      (this.callback = t),
      (this._effectiveNodes = []),
      (this._observer = null),
      (this._scheduled = !1),
      (this._boundSchedule = () => {
        this._schedule()
      }),
      this.connect(),
      this._schedule()
  }
  connect() {
    hn(this._target)
      ? this._listenSlots([this._target])
      : $o(this._target).children &&
        (this._listenSlots($o(this._target).children),
        window.ShadyDOM
          ? (this._shadyChildrenObserver = window.ShadyDOM.observeChildren(
              this._target,
              (e) => {
                this._processMutations(e)
              }
            ))
          : ((this._nativeChildrenObserver = new MutationObserver((e) => {
              this._processMutations(e)
            })),
            this._nativeChildrenObserver.observe(this._target, {
              childList: !0,
            }))),
      (this._connected = !0)
  }
  disconnect() {
    hn(this._target)
      ? this._unlistenSlots([this._target])
      : $o(this._target).children &&
        (this._unlistenSlots($o(this._target).children),
        window.ShadyDOM && this._shadyChildrenObserver
          ? (window.ShadyDOM.unobserveChildren(this._shadyChildrenObserver),
            (this._shadyChildrenObserver = null))
          : this._nativeChildrenObserver &&
            (this._nativeChildrenObserver.disconnect(),
            (this._nativeChildrenObserver = null))),
      (this._connected = !1)
  }
  _schedule() {
    this._scheduled || ((this._scheduled = !0), pr.run(() => this.flush()))
  }
  _processMutations(e) {
    this._processSlotMutations(e), this.flush()
  }
  _processSlotMutations(e) {
    if (e)
      for (let t = 0; t < e.length; t++) {
        let o = e[t]
        o.addedNodes && this._listenSlots(o.addedNodes),
          o.removedNodes && this._unlistenSlots(o.removedNodes)
      }
  }
  flush() {
    if (!this._connected) return !1
    window.ShadyDOM && ShadyDOM.flush(),
      this._nativeChildrenObserver
        ? this._processSlotMutations(this._nativeChildrenObserver.takeRecords())
        : this._shadyChildrenObserver &&
          this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),
      (this._scheduled = !1)
    let e = { target: this._target, addedNodes: [], removedNodes: [] },
      t = this.constructor.getFlattenedNodes(this._target),
      o = un(t, this._effectiveNodes)
    for (let t, r = 0; r < o.length && (t = o[r]); r++)
      for (let o, r = 0; r < t.removed.length && (o = t.removed[r]); r++)
        e.removedNodes.push(o)
    for (let r, i = 0; i < o.length && (r = o[i]); i++)
      for (let o = r.index; o < r.index + r.addedCount; o++)
        e.addedNodes.push(t[o])
    this._effectiveNodes = t
    let r = !1
    return (
      (e.addedNodes.length || e.removedNodes.length) &&
        ((r = !0), this.callback.call(this._target, e)),
      r
    )
  }
  _listenSlots(e) {
    for (let t = 0; t < e.length; t++) {
      let o = e[t]
      hn(o) && o.addEventListener('slotchange', this._boundSchedule)
    }
  }
  _unlistenSlots(e) {
    for (let t = 0; t < e.length; t++) {
      let o = e[t]
      hn(o) && o.removeEventListener('slotchange', this._boundSchedule)
    }
  }
}
const _n = function () {
    let e, t
    do {
      ;(e = window.ShadyDOM && ShadyDOM.flush()),
        window.ShadyCSS &&
          window.ShadyCSS.ScopingShim &&
          window.ShadyCSS.ScopingShim.flush(),
        (t = mi())
    } while (e || t)
  },
  fn = Element.prototype,
  yn =
    fn.matches ||
    fn.matchesSelector ||
    fn.mozMatchesSelector ||
    fn.msMatchesSelector ||
    fn.oMatchesSelector ||
    fn.webkitMatchesSelector,
  bn = function (e, t) {
    return yn.call(e, t)
  }
class vn {
  constructor(e) {
    window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.patch(e),
      (this.node = e)
  }
  observeNodes(e) {
    return new gn(this.node, e)
  }
  unobserveNodes(e) {
    e.disconnect()
  }
  notifyObserver() {}
  deepContains(e) {
    if ($o(this.node).contains(e)) return !0
    let t = e,
      o = e.ownerDocument
    for (; t && t !== o && t !== this.node; ) t = $o(t).parentNode || $o(t).host
    return t === this.node
  }
  getOwnerRoot() {
    return $o(this.node).getRootNode()
  }
  getDistributedNodes() {
    return 'slot' === this.node.localName
      ? $o(this.node).assignedNodes({ flatten: !0 })
      : []
  }
  getDestinationInsertionPoints() {
    let e = [],
      t = $o(this.node).assignedSlot
    for (; t; ) e.push(t), (t = $o(t).assignedSlot)
    return e
  }
  importNode(e, t) {
    let o = this.node instanceof Document ? this.node : this.node.ownerDocument
    return $o(o).importNode(e, t)
  }
  getEffectiveChildNodes() {
    return gn.getFlattenedNodes(this.node)
  }
  queryDistributedElements(e) {
    let t = this.getEffectiveChildNodes(),
      o = []
    for (let r, i = 0, n = t.length; i < n && (r = t[i]); i++)
      r.nodeType === Node.ELEMENT_NODE && bn(r, e) && o.push(r)
    return o
  }
  get activeElement() {
    let e = this.node
    return void 0 !== e._activeElement ? e._activeElement : e.activeElement
  }
}
function Cn(e, t) {
  for (let o = 0; o < t.length; o++) {
    let r = t[o]
    Object.defineProperty(e, r, {
      get: function () {
        return this.node[r]
      },
      configurable: !0,
    })
  }
}
class An {
  constructor(e) {
    this.event = e
  }
  get rootTarget() {
    return this.path[0]
  }
  get localTarget() {
    return this.event.target
  }
  get path() {
    return this.event.composedPath()
  }
}
vn.prototype.cloneNode,
  vn.prototype.appendChild,
  vn.prototype.insertBefore,
  vn.prototype.removeChild,
  vn.prototype.replaceChild,
  vn.prototype.setAttribute,
  vn.prototype.removeAttribute,
  vn.prototype.querySelector,
  vn.prototype.querySelectorAll,
  vn.prototype.parentNode,
  vn.prototype.firstChild,
  vn.prototype.lastChild,
  vn.prototype.nextSibling,
  vn.prototype.previousSibling,
  vn.prototype.firstElementChild,
  vn.prototype.lastElementChild,
  vn.prototype.nextElementSibling,
  vn.prototype.previousElementSibling,
  vn.prototype.childNodes,
  vn.prototype.children,
  vn.prototype.classList,
  vn.prototype.textContent,
  vn.prototype.innerHTML
let wn = vn
if (
  window.ShadyDOM &&
  window.ShadyDOM.inUse &&
  window.ShadyDOM.noPatch &&
  window.ShadyDOM.Wrapper
) {
  class e extends window.ShadyDOM.Wrapper {}
  Object.getOwnPropertyNames(vn.prototype).forEach((t) => {
    'activeElement' != t && (e.prototype[t] = vn.prototype[t])
  }),
    Cn(e.prototype, ['classList']),
    (wn = e),
    Object.defineProperties(An.prototype, {
      localTarget: {
        get() {
          const e = this.event.currentTarget,
            t = e && Hn(e).getOwnerRoot(),
            o = this.path
          for (let e = 0; e < o.length; e++) {
            const r = o[e]
            if (Hn(r).getOwnerRoot() === t) return r
          }
        },
        configurable: !0,
      },
      path: {
        get() {
          return window.ShadyDOM.composedPath(this.event)
        },
        configurable: !0,
      },
    })
} else
  !(function (e, t) {
    for (let o = 0; o < t.length; o++) {
      let r = t[o]
      e[r] = function () {
        return this.node[r].apply(this.node, arguments)
      }
    }
  })(vn.prototype, [
    'cloneNode',
    'appendChild',
    'insertBefore',
    'removeChild',
    'replaceChild',
    'setAttribute',
    'removeAttribute',
    'querySelector',
    'querySelectorAll',
  ]),
    Cn(vn.prototype, [
      'parentNode',
      'firstChild',
      'lastChild',
      'nextSibling',
      'previousSibling',
      'firstElementChild',
      'lastElementChild',
      'nextElementSibling',
      'previousElementSibling',
      'childNodes',
      'children',
      'classList',
    ]),
    (function (e, t) {
      for (let o = 0; o < t.length; o++) {
        let r = t[o]
        Object.defineProperty(e, r, {
          get: function () {
            return this.node[r]
          },
          set: function (e) {
            this.node[r] = e
          },
          configurable: !0,
        })
      }
    })(vn.prototype, ['textContent', 'innerHTML', 'className'])
const Hn = function (e) {
    if ((e = e || document) instanceof wn) return e
    if (e instanceof An) return e
    let t = e.__domApi
    return (
      t || ((t = e instanceof Event ? new An(e) : new wn(e)), (e.__domApi = t)),
      t
    )
  },
  kn = window.ShadyDOM,
  Sn = window.ShadyCSS
function Ln(e, t) {
  return $o(e).getRootNode() === t
}
const xn = (e) => {
  for (; e; ) {
    const t = Object.getOwnPropertyDescriptor(e, 'observedAttributes')
    if (t) return t.get
    e = Object.getPrototypeOf(e.prototype).constructor
  }
  return () => []
}
Vo((e) => {
  const t = di(e)
  let o = xn(t)
  return class extends t {
    constructor() {
      super(), this.__isUpgradeDisabled
    }
    static get observedAttributes() {
      return o.call(this).concat('disable-upgrade')
    }
    _initializeProperties() {
      this.hasAttribute('disable-upgrade')
        ? (this.__isUpgradeDisabled = !0)
        : super._initializeProperties()
    }
    _enableProperties() {
      this.__isUpgradeDisabled || super._enableProperties()
    }
    _canApplyPropertyDefault(e) {
      return (
        super._canApplyPropertyDefault(e) &&
        !(this.__isUpgradeDisabled && this._isPropertyPending(e))
      )
    }
    attributeChangedCallback(e, t, o, r) {
      'disable-upgrade' == e
        ? this.__isUpgradeDisabled &&
          null == o &&
          (super._initializeProperties(),
          (this.__isUpgradeDisabled = !1),
          $o(this).isConnected && super.connectedCallback())
        : super.attributeChangedCallback(e, t, o, r)
    }
    connectedCallback() {
      this.__isUpgradeDisabled || super.connectedCallback()
    }
    disconnectedCallback() {
      this.__isUpgradeDisabled || super.disconnectedCallback()
    }
  }
})
let Vn = window.ShadyCSS
const En = Vo((e) => {
    const t = Wi(di(e)),
      o = li ? t : ln(t),
      r = xn(o),
      i = { x: 'pan-x', y: 'pan-y', none: 'none', all: 'auto' }
    class n extends o {
      constructor() {
        super(),
          this.isAttached,
          this.__boundListeners,
          this._debouncers,
          this.__isUpgradeDisabled,
          this.__needsAttributesAtConnected,
          this._legacyForceObservedAttributes
      }
      static get importMeta() {
        return this.prototype.importMeta
      }
      created() {}
      __attributeReaction(e, t, o) {
        ;((this.__dataAttributes && this.__dataAttributes[e]) ||
          'disable-upgrade' === e) &&
          this.attributeChangedCallback(e, t, o, null)
      }
      setAttribute(e, t) {
        if (So && !this._legacyForceObservedAttributes) {
          const o = this.getAttribute(e)
          super.setAttribute(e, t), this.__attributeReaction(e, o, String(t))
        } else super.setAttribute(e, t)
      }
      removeAttribute(e) {
        if (So && !this._legacyForceObservedAttributes) {
          const t = this.getAttribute(e)
          super.removeAttribute(e), this.__attributeReaction(e, t, null)
        } else super.removeAttribute(e)
      }
      static get observedAttributes() {
        return So && !this.prototype._legacyForceObservedAttributes
          ? (this.hasOwnProperty(
              JSCompiler_renameProperty('__observedAttributes', this)
            ) || ((this.__observedAttributes = []), this.prototype),
            this.__observedAttributes)
          : r.call(this).concat('disable-upgrade')
      }
      _enableProperties() {
        this.__isUpgradeDisabled || super._enableProperties()
      }
      _canApplyPropertyDefault(e) {
        return (
          super._canApplyPropertyDefault(e) &&
          !(this.__isUpgradeDisabled && this._isPropertyPending(e))
        )
      }
      connectedCallback() {
        this.__needsAttributesAtConnected && this._takeAttributes(),
          this.__isUpgradeDisabled ||
            (super.connectedCallback(), (this.isAttached = !0), this.attached())
      }
      attached() {}
      disconnectedCallback() {
        this.__isUpgradeDisabled ||
          (super.disconnectedCallback(),
          (this.isAttached = !1),
          this.detached())
      }
      detached() {}
      attributeChangedCallback(e, t, o, r) {
        t !== o &&
          ('disable-upgrade' == e
            ? this.__isUpgradeDisabled &&
              null == o &&
              (this._initializeProperties(),
              (this.__isUpgradeDisabled = !1),
              $o(this).isConnected && this.connectedCallback())
            : (super.attributeChangedCallback(e, t, o, r),
              this.attributeChanged(e, t, o)))
      }
      attributeChanged(e, t, o) {}
      _initializeProperties() {
        if (yo && this.hasAttribute('disable-upgrade'))
          this.__isUpgradeDisabled = !0
        else {
          let e = Object.getPrototypeOf(this)
          e.hasOwnProperty(
            JSCompiler_renameProperty('__hasRegisterFinished', e)
          ) || (this._registered(), (e.__hasRegisterFinished = !0)),
            super._initializeProperties(),
            (this.root = this),
            this.created(),
            So &&
              !this._legacyForceObservedAttributes &&
              (this.hasAttributes()
                ? this._takeAttributes()
                : this.parentNode || (this.__needsAttributesAtConnected = !0)),
            this._applyListeners()
        }
      }
      _takeAttributes() {
        const e = this.attributes
        for (let t = 0, o = e.length; t < o; t++) {
          const o = e[t]
          this.__attributeReaction(o.name, null, o.value)
        }
      }
      _registered() {}
      ready() {
        this._ensureAttributes(), super.ready()
      }
      _ensureAttributes() {}
      _applyListeners() {}
      serialize(e) {
        return this._serializeValue(e)
      }
      deserialize(e, t) {
        return this._deserializeValue(e, t)
      }
      reflectPropertyToAttribute(e, t, o) {
        this._propertyToAttribute(e, t, o)
      }
      serializeValueToAttribute(e, t, o) {
        this._valueToNodeAttribute(o || this, e, t)
      }
      extend(e, t) {
        if (!e || !t) return e || t
        let o = Object.getOwnPropertyNames(t)
        for (let r, i = 0; i < o.length && (r = o[i]); i++) {
          let o = Object.getOwnPropertyDescriptor(t, r)
          o && Object.defineProperty(e, r, o)
        }
        return e
      }
      mixin(e, t) {
        for (let o in t) e[o] = t[o]
        return e
      }
      chainObject(e, t) {
        return e && t && e !== t && (e.__proto__ = t), e
      }
      instanceTemplate(e) {
        let t = this.constructor._contentForTemplate(e)
        return document.importNode(t, !0)
      }
      fire(e, t, o) {
        ;(o = o || {}), (t = null == t ? {} : t)
        let r = new Event(e, {
          bubbles: void 0 === o.bubbles || o.bubbles,
          cancelable: Boolean(o.cancelable),
          composed: void 0 === o.composed || o.composed,
        })
        r.detail = t
        let i = o.node || this
        return $o(i).dispatchEvent(r), r
      }
      listen(e, t, o) {
        e = e || this
        let r =
            this.__boundListeners || (this.__boundListeners = new WeakMap()),
          i = r.get(e)
        i || ((i = {}), r.set(e, i))
        let n = t + o
        i[n] || (i[n] = this._addMethodEventListenerToNode(e, t, o, this))
      }
      unlisten(e, t, o) {
        e = e || this
        let r = this.__boundListeners && this.__boundListeners.get(e),
          i = t + o,
          n = r && r[i]
        n && (this._removeEventListenerFromNode(e, t, n), (r[i] = null))
      }
      setScrollDirection(e, t) {
        Fi(t || this, i[e] || 'auto')
      }
      $$(e) {
        return this.root.querySelector(e)
      }
      get domHost() {
        let e = $o(this).getRootNode()
        return e instanceof DocumentFragment ? e.host : e
      }
      distributeContent() {
        const e = Hn(this)
        window.ShadyDOM && e.shadowRoot && ShadyDOM.flush()
      }
      getEffectiveChildNodes() {
        return Hn(this).getEffectiveChildNodes()
      }
      queryDistributedElements(e) {
        return Hn(this).queryDistributedElements(e)
      }
      getEffectiveChildren() {
        return this.getEffectiveChildNodes().filter(function (e) {
          return e.nodeType === Node.ELEMENT_NODE
        })
      }
      getEffectiveTextContent() {
        let e = this.getEffectiveChildNodes(),
          t = []
        for (let o, r = 0; (o = e[r]); r++)
          o.nodeType !== Node.COMMENT_NODE && t.push(o.textContent)
        return t.join('')
      }
      queryEffectiveChildren(e) {
        let t = this.queryDistributedElements(e)
        return t && t[0]
      }
      queryAllEffectiveChildren(e) {
        return this.queryDistributedElements(e)
      }
      getContentChildNodes(e) {
        let t = this.root.querySelector(e || 'slot')
        return t ? Hn(t).getDistributedNodes() : []
      }
      getContentChildren(e) {
        let t = this.getContentChildNodes(e).filter(function (e) {
          return e.nodeType === Node.ELEMENT_NODE
        })
        return t
      }
      isLightDescendant(e) {
        const t = this
        return (
          t !== e &&
          $o(t).contains(e) &&
          $o(t).getRootNode() === $o(e).getRootNode()
        )
      }
      isLocalDescendant(e) {
        return this.root === $o(e).getRootNode()
      }
      scopeSubtree(e, t = !1) {
        return (function (e, t = !1) {
          if (!kn || !Sn) return null
          if (!kn.handlesDynamicScoping) return null
          const o = Sn.ScopingShim
          if (!o) return null
          const r = o.scopeForNode(e),
            i = $o(e).getRootNode(),
            n = (e) => {
              if (!Ln(e, i)) return
              const t = Array.from(
                kn.nativeMethods.querySelectorAll.call(e, '*')
              )
              t.push(e)
              for (let e = 0; e < t.length; e++) {
                const n = t[e]
                if (!Ln(n, i)) continue
                const a = o.currentScopeForNode(n)
                a !== r && ('' !== a && o.unscopeNode(n, a), o.scopeNode(n, r))
              }
            }
          if ((n(e), t)) {
            const t = new MutationObserver((e) => {
              for (let t = 0; t < e.length; t++) {
                const o = e[t]
                for (let e = 0; e < o.addedNodes.length; e++) {
                  const t = o.addedNodes[e]
                  t.nodeType === Node.ELEMENT_NODE && n(t)
                }
              }
            })
            return t.observe(e, { childList: !0, subtree: !0 }), t
          }
          return null
        })(e, t)
      }
      getComputedStyleValue(e) {
        return Vn.getComputedStyleValue(this, e)
      }
      debounce(e, t, o) {
        return (
          (this._debouncers = this._debouncers || {}),
          (this._debouncers[e] = ci.debounce(
            this._debouncers[e],
            o > 0 ? dr.after(o) : pr,
            t.bind(this)
          ))
        )
      }
      isDebouncerActive(e) {
        this._debouncers = this._debouncers || {}
        let t = this._debouncers[e]
        return !(!t || !t.isActive())
      }
      flushDebouncer(e) {
        this._debouncers = this._debouncers || {}
        let t = this._debouncers[e]
        t && t.flush()
      }
      cancelDebouncer(e) {
        this._debouncers = this._debouncers || {}
        let t = this._debouncers[e]
        t && t.cancel()
      }
      async(e, t) {
        return t > 0 ? dr.run(e.bind(this), t) : ~pr.run(e.bind(this))
      }
      cancelAsync(e) {
        e < 0 ? pr.cancel(~e) : dr.cancel(e)
      }
      create(e, t) {
        let o = document.createElement(e)
        if (t)
          if (o.setProperties) o.setProperties(t)
          else for (let e in t) o[e] = t[e]
        return o
      }
      elementMatches(e, t) {
        return bn(t || this, e)
      }
      toggleAttribute(e, t) {
        let o = this
        return (
          3 === arguments.length && (o = arguments[2]),
          1 == arguments.length && (t = !o.hasAttribute(e)),
          t ? ($o(o).setAttribute(e, ''), !0) : ($o(o).removeAttribute(e), !1)
        )
      }
      toggleClass(e, t, o) {
        ;(o = o || this),
          1 == arguments.length && (t = !o.classList.contains(e)),
          t ? o.classList.add(e) : o.classList.remove(e)
      }
      transform(e, t) {
        ;((t = t || this).style.webkitTransform = e), (t.style.transform = e)
      }
      translate3d(e, t, o, r) {
        ;(r = r || this),
          this.transform('translate3d(' + e + ',' + t + ',' + o + ')', r)
      }
      arrayDelete(e, t) {
        let o
        if (Array.isArray(e)) {
          if (((o = e.indexOf(t)), o >= 0)) return e.splice(o, 1)
        } else {
          if (((o = Wo(this, e).indexOf(t)), o >= 0))
            return this.splice(e, o, 1)
        }
        return null
      }
      _logger(e, t) {
        switch (
          (Array.isArray(t) &&
            1 === t.length &&
            Array.isArray(t[0]) &&
            (t = t[0]),
          e)
        ) {
          case 'log':
          case 'warn':
          case 'error':
            console[e](...t)
        }
      }
      _log(...e) {
        this._logger('log', e)
      }
      _warn(...e) {
        this._logger('warn', e)
      }
      _error(...e) {
        this._logger('error', e)
      }
      _logf(e, ...t) {
        return ['[%s::%s]', this.is, e, ...t]
      }
    }
    return (n.prototype.is = ''), n
  }),
  Mn = {
    attached: !0,
    detached: !0,
    ready: !0,
    created: !0,
    beforeRegister: !0,
    registered: !0,
    attributeChanged: !0,
    listeners: !0,
    hostAttributes: !0,
  },
  Pn = {
    attached: !0,
    detached: !0,
    ready: !0,
    created: !0,
    beforeRegister: !0,
    registered: !0,
    attributeChanged: !0,
    behaviors: !0,
    _noAccessors: !0,
  },
  Tn = Object.assign(
    { listeners: !0, hostAttributes: !0, properties: !0, observers: !0 },
    Pn
  )
function zn(e, t, o, r) {
  !(function (e, t, o) {
    const r = e._noAccessors,
      i = Object.getOwnPropertyNames(e)
    for (let n = 0; n < i.length; n++) {
      let a = i[n]
      if (!(a in o))
        if (r) t[a] = e[a]
        else {
          let o = Object.getOwnPropertyDescriptor(e, a)
          o && ((o.configurable = !0), Object.defineProperty(t, a, o))
        }
    }
  })(t, e, r)
  for (let e in Mn) t[e] && ((o[e] = o[e] || []), o[e].push(t[e]))
}
function Nn(e, t, o) {
  t = t || []
  for (let r = e.length - 1; r >= 0; r--) {
    let i = e[r]
    i
      ? Array.isArray(i)
        ? Nn(i, t)
        : t.indexOf(i) < 0 && (!o || o.indexOf(i) < 0) && t.unshift(i)
      : console.warn('behavior is null, check for missing or 404 import')
  }
  return t
}
function In(e, t) {
  for (const o in t) {
    const r = e[o],
      i = t[o]
    e[o] =
      !('value' in i) && r && 'value' in r
        ? Object.assign({ value: r.value }, i)
        : i
  }
}
const On = En(HTMLElement)
function Rn(e, t, o) {
  let r
  const i = {}
  class n extends t {
    static _finalizeClass() {
      if (
        this.hasOwnProperty(JSCompiler_renameProperty('generatedFrom', this))
      ) {
        if (r)
          for (let e, t = 0; t < r.length; t++)
            (e = r[t]),
              e.properties && this.createProperties(e.properties),
              e.observers && this.createObservers(e.observers, e.properties)
        e.properties && this.createProperties(e.properties),
          e.observers && this.createObservers(e.observers, e.properties),
          this._prepareTemplate()
      } else t._finalizeClass.call(this)
    }
    static get properties() {
      const t = {}
      if (r) for (let e = 0; e < r.length; e++) In(t, r[e].properties)
      return In(t, e.properties), t
    }
    static get observers() {
      let t = []
      if (r)
        for (let e, o = 0; o < r.length; o++)
          (e = r[o]), e.observers && (t = t.concat(e.observers))
      return e.observers && (t = t.concat(e.observers)), t
    }
    created() {
      super.created()
      const e = i.created
      if (e) for (let t = 0; t < e.length; t++) e[t].call(this)
    }
    _registered() {
      const e = n.prototype
      if (
        !e.hasOwnProperty(JSCompiler_renameProperty('__hasRegisterFinished', e))
      ) {
        ;(e.__hasRegisterFinished = !0), super._registered(), yo && a(e)
        const t = Object.getPrototypeOf(this)
        let o = i.beforeRegister
        if (o) for (let e = 0; e < o.length; e++) o[e].call(t)
        if (((o = i.registered), o))
          for (let e = 0; e < o.length; e++) o[e].call(t)
      }
    }
    _applyListeners() {
      super._applyListeners()
      const e = i.listeners
      if (e)
        for (let t = 0; t < e.length; t++) {
          const o = e[t]
          if (o)
            for (let e in o) this._addMethodEventListenerToNode(this, e, o[e])
        }
    }
    _ensureAttributes() {
      const e = i.hostAttributes
      if (e)
        for (let t = e.length - 1; t >= 0; t--) {
          const o = e[t]
          for (let e in o) this._ensureAttribute(e, o[e])
        }
      super._ensureAttributes()
    }
    ready() {
      super.ready()
      let e = i.ready
      if (e) for (let t = 0; t < e.length; t++) e[t].call(this)
    }
    attached() {
      super.attached()
      let e = i.attached
      if (e) for (let t = 0; t < e.length; t++) e[t].call(this)
    }
    detached() {
      super.detached()
      let e = i.detached
      if (e) for (let t = 0; t < e.length; t++) e[t].call(this)
    }
    attributeChanged(e, t, o) {
      super.attributeChanged()
      let r = i.attributeChanged
      if (r) for (let i = 0; i < r.length; i++) r[i].call(this, e, t, o)
    }
  }
  if (o) {
    Array.isArray(o) || (o = [o])
    let e = t.prototype.behaviors
    ;(r = Nn(o, null, e)), (n.prototype.behaviors = e ? e.concat(o) : r)
  }
  const a = (t) => {
    r &&
      (function (e, t, o) {
        for (let r = 0; r < t.length; r++) zn(e, t[r], o, Tn)
      })(t, r, i),
      zn(t, e, i, Pn)
  }
  return yo || a(n.prototype), (n.generatedFrom = e), n
}
const Dn = function (e) {
  let t
  return (
    (t = 'function' == typeof e ? e : Dn.Class(e)),
    e._legacyForceObservedAttributes &&
      (t.prototype._legacyForceObservedAttributes =
        e._legacyForceObservedAttributes),
    customElements.define(t.is, t),
    t
  )
}
function jn(e, t, o, r, i) {
  let n
  i && ((n = 'object' == typeof o && null !== o), n && (r = e.__dataTemp[t]))
  let a = r !== o && (r == r || o == o)
  return n && a && (e.__dataTemp[t] = o), a
}
Dn.Class = function (e, t) {
  e || console.warn('Polymer.Class requires `info` argument')
  let o = t ? t(On) : On
  return (o = Rn(e, o, e.behaviors)), (o.is = o.prototype.is = e.is), o
}
const Bn = Vo(
    (e) =>
      class extends e {
        _shouldPropertyChange(e, t, o) {
          return jn(this, e, t, o, !0)
        }
      }
  ),
  $n = Vo(
    (e) =>
      class extends e {
        static get properties() {
          return { mutableData: Boolean }
        }
        _shouldPropertyChange(e, t, o) {
          return jn(this, e, t, o, this.mutableData)
        }
      }
  )
Bn._mutablePropertyChange = jn
let Fn = null
function Un() {
  return Fn
}
Un.prototype = Object.create(HTMLTemplateElement.prototype, {
  constructor: { value: Un, writable: !0 },
})
const Zn = ni(Un),
  qn = Bn(Zn)
const Gn = ni(class {})
function Kn(e, t) {
  for (let o = 0; o < t.length; o++) {
    let r = t[o]
    if (Boolean(e) != Boolean(r.__hideTemplateChildren__))
      if (r.nodeType === Node.TEXT_NODE)
        e
          ? ((r.__polymerTextContent__ = r.textContent), (r.textContent = ''))
          : (r.textContent = r.__polymerTextContent__)
      else if ('slot' === r.localName)
        if (e)
          (r.__polymerReplaced__ = document.createComment('hidden-slot')),
            $o($o(r).parentNode).replaceChild(r.__polymerReplaced__, r)
        else {
          const e = r.__polymerReplaced__
          e && $o($o(e).parentNode).replaceChild(r, e)
        }
      else
        r.style &&
          (e
            ? ((r.__polymerDisplay__ = r.style.display),
              (r.style.display = 'none'))
            : (r.style.display = r.__polymerDisplay__))
    ;(r.__hideTemplateChildren__ = e),
      r._showHideChildren && r._showHideChildren(e)
  }
}
class Yn extends Gn {
  constructor(e) {
    super(),
      this._configureProperties(e),
      (this.root = this._stampTemplate(this.__dataHost))
    let t = []
    this.children = t
    for (let e = this.root.firstChild; e; e = e.nextSibling)
      t.push(e), (e.__templatizeInstance = this)
    this.__templatizeOwner &&
      this.__templatizeOwner.__hideTemplateChildren__ &&
      this._showHideChildren(!0)
    let o = this.__templatizeOptions
    ;((e && o.instanceProps) || !o.instanceProps) && this._enableProperties()
  }
  _configureProperties(e) {
    if (this.__templatizeOptions.forwardHostProp)
      for (let e in this.__hostProps)
        this._setPendingProperty(e, this.__dataHost['_host_' + e])
    for (let t in e) this._setPendingProperty(t, e[t])
  }
  forwardHostProp(e, t) {
    this._setPendingPropertyOrPath(e, t, !1, !0) &&
      this.__dataHost._enqueueClient(this)
  }
  _addEventListenerToNode(e, t, o) {
    if (this._methodHost && this.__templatizeOptions.parentModel)
      this._methodHost._addEventListenerToNode(e, t, (e) => {
        ;(e.model = this), o(e)
      })
    else {
      let r = this.__dataHost.__dataHost
      r && r._addEventListenerToNode(e, t, o)
    }
  }
  _showHideChildren(e) {
    Kn(e, this.children)
  }
  _setUnmanagedPropertyToNode(e, t, o) {
    e.__hideTemplateChildren__ &&
    e.nodeType == Node.TEXT_NODE &&
    'textContent' == t
      ? (e.__polymerTextContent__ = o)
      : super._setUnmanagedPropertyToNode(e, t, o)
  }
  get parentModel() {
    let e = this.__parentModel
    if (!e) {
      let t
      e = this
      do {
        e = e.__dataHost.__dataHost
      } while ((t = e.__templatizeOptions) && !t.parentModel)
      this.__parentModel = e
    }
    return e
  }
  dispatchEvent(e) {
    return !0
  }
}
Yn.prototype.__dataHost,
  Yn.prototype.__templatizeOptions,
  Yn.prototype._methodHost,
  Yn.prototype.__templatizeOwner,
  Yn.prototype.__hostProps
const Wn = Bn(Yn)
function Xn(e) {
  let t = e.__dataHost
  return (t && t._methodHost) || t
}
function Jn(e, t, o) {
  let r = o.mutableData ? Wn : Yn
  oa.mixin && (r = oa.mixin(r))
  let i = class extends r {}
  return (
    (i.prototype.__templatizeOptions = o),
    i.prototype._bindTemplate(e),
    (function (e, t, o, r) {
      let i = o.hostProps || {}
      for (let t in r.instanceProps) {
        delete i[t]
        let o = r.notifyInstanceProp
        o &&
          e.prototype._addPropertyEffect(
            t,
            e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
            { fn: ta(t, o) }
          )
      }
      if (r.forwardHostProp && t.__dataHost)
        for (let t in i)
          o.hasHostProps || (o.hasHostProps = !0),
            e.prototype._addPropertyEffect(
              t,
              e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
              {
                fn: function (e, t, o) {
                  e.__dataHost._setPendingPropertyOrPath(
                    '_host_' + t,
                    o[t],
                    !0,
                    !0
                  )
                },
              }
            )
    })(i, e, t, o),
    i
  )
}
function Qn(e, t, o, r) {
  let i = o.forwardHostProp
  if (i && t.hasHostProps) {
    const n = 'template' == e.localName
    let a = t.templatizeTemplateClass
    if (!a) {
      if (n) {
        let e = o.mutableData ? qn : Zn
        class r extends e {}
        a = t.templatizeTemplateClass = r
      } else {
        const o = e.constructor
        class r extends o {}
        a = t.templatizeTemplateClass = r
      }
      let s = t.hostProps
      for (let e in s)
        a.prototype._addPropertyEffect(
          '_host_' + e,
          a.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,
          { fn: ea(e, i) }
        ),
          a.prototype._createNotifyingProperty('_host_' + e)
      bo &&
        r &&
        (function (e, t, o) {
          const r = o.constructor._properties,
            { propertyEffects: i } = e,
            { instanceProps: n } = t
          for (let e in i)
            if (!(r[e] || (n && n[e]))) {
              const t = i[e]
              for (let o = 0; o < t.length; o++) {
                const { part: r } = t[o].info
                if (!r.signature || !r.signature.static) {
                  console.warn(
                    `Property '${e}' used in template but not declared in 'properties'; attribute will not be observed.`
                  )
                  break
                }
              }
            }
        })(t, o, r)
    }
    if ((e.__dataProto && Object.assign(e.__data, e.__dataProto), n))
      !(function (e, t) {
        ;(Fn = e), Object.setPrototypeOf(e, t.prototype), new t(), (Fn = null)
      })(e, a),
        (e.__dataTemp = {}),
        (e.__dataPending = null),
        (e.__dataOld = null),
        e._enableProperties()
    else {
      Object.setPrototypeOf(e, a.prototype)
      const o = t.hostProps
      for (let t in o)
        if (((t = '_host_' + t), t in e)) {
          const o = e[t]
          delete e[t], (e.__data[t] = o)
        }
    }
  }
}
function ea(e, t) {
  return function (e, o, r) {
    t.call(e.__templatizeOwner, o.substring('_host_'.length), r[o])
  }
}
function ta(e, t) {
  return function (e, o, r) {
    t.call(e.__templatizeOwner, e, o, r[o])
  }
}
function oa(e, t, o) {
  if (_o && !Xn(e))
    throw new Error('strictTemplatePolicy: template owner not trusted')
  if (((o = o || {}), e.__templatizeOwner))
    throw new Error('A <template> can only be templatized once')
  e.__templatizeOwner = t
  let r = (t ? t.constructor : Yn)._parseTemplate(e),
    i = r.templatizeInstanceClass
  i || ((i = Jn(e, r, o)), (r.templatizeInstanceClass = i))
  const n = Xn(e)
  Qn(e, r, o, n)
  let a = class extends i {}
  return (
    (a.prototype._methodHost = n),
    (a.prototype.__dataHost = e),
    (a.prototype.__templatizeOwner = t),
    (a.prototype.__hostProps = r.hostProps),
    a
  )
}
let ra = !1
function ia() {
  if (yo && !po) {
    if (!ra) {
      ra = !0
      const e = document.createElement('style')
      ;(e.textContent = 'dom-bind,dom-if,dom-repeat{display:none;}'),
        document.head.appendChild(e)
    }
    return !0
  }
  return !1
}
const na = Wi($n(ni(HTMLElement)))
customElements.define(
  'dom-bind',
  class extends na {
    static get observedAttributes() {
      return ['mutable-data']
    }
    constructor() {
      if ((super(), _o))
        throw new Error('strictTemplatePolicy: dom-bind not allowed')
      ;(this.root = null), (this.$ = null), (this.__children = null)
    }
    attributeChangedCallback(e, t, o, r) {
      this.mutableData = !0
    }
    connectedCallback() {
      ia() || (this.style.display = 'none'), this.render()
    }
    disconnectedCallback() {
      this.__removeChildren()
    }
    __insertChildren() {
      $o($o(this).parentNode).insertBefore(this.root, this)
    }
    __removeChildren() {
      if (this.__children)
        for (let e = 0; e < this.__children.length; e++)
          this.root.appendChild(this.__children[e])
    }
    render() {
      let e
      if (!this.__children) {
        if (((e = e || this.querySelector('template')), !e)) {
          let t = new MutationObserver(() => {
            if (((e = this.querySelector('template')), !e))
              throw new Error('dom-bind requires a <template> child')
            t.disconnect(), this.render()
          })
          return void t.observe(this, { childList: !0 })
        }
        ;(this.root = this._stampTemplate(e)),
          (this.$ = this.root.$),
          (this.__children = [])
        for (let e = this.root.firstChild; e; e = e.nextSibling)
          this.__children[this.__children.length] = e
        this._enableProperties()
      }
      this.__insertChildren(),
        this.dispatchEvent(
          new CustomEvent('dom-change', { bubbles: !0, composed: !0 })
        )
    }
  }
)
class aa {
  constructor(e) {
    this.value = e.toString()
  }
  toString() {
    return this.value
  }
}
function sa(e) {
  if (e instanceof HTMLTemplateElement) return e.innerHTML
  if (e instanceof aa)
    return (function (e) {
      if (e instanceof aa) return e.value
      throw new Error(
        `non-literal value passed to Polymer's htmlLiteral function: ${e}`
      )
    })(e)
  throw new Error(`non-template value passed to Polymer's html function: ${e}`)
}
const la = function (e, ...t) {
    const o = document.createElement('template')
    return (o.innerHTML = t.reduce((t, o, r) => t + sa(o) + e[r + 1], e[0])), o
  },
  da = di(HTMLElement),
  ca = $n(da)
class pa extends ca {
  static get is() {
    return 'dom-repeat'
  }
  static get template() {
    return null
  }
  static get properties() {
    return {
      items: { type: Array },
      as: { type: String, value: 'item' },
      indexAs: { type: String, value: 'index' },
      itemsIndexAs: { type: String, value: 'itemsIndex' },
      sort: { type: Function, observer: '__sortChanged' },
      filter: { type: Function, observer: '__filterChanged' },
      observe: { type: String, observer: '__observeChanged' },
      delay: Number,
      renderedItemCount: { type: Number, notify: !ko, readOnly: !0 },
      initialCount: { type: Number },
      targetFramerate: { type: Number, value: 20 },
      _targetFrameTime: {
        type: Number,
        computed: '__computeFrameTime(targetFramerate)',
      },
      notifyDomChange: { type: Boolean },
      reuseChunkedInstances: { type: Boolean },
    }
  }
  static get observers() {
    return ['__itemsChanged(items.*)']
  }
  constructor() {
    super(),
      (this.__instances = []),
      (this.__renderDebouncer = null),
      (this.__itemsIdxToInstIdx = {}),
      (this.__chunkCount = null),
      (this.__renderStartTime = null),
      (this.__itemsArrayChanged = !1),
      (this.__shouldMeasureChunk = !1),
      (this.__shouldContinueChunking = !1),
      (this.__chunkingId = 0),
      (this.__sortFn = null),
      (this.__filterFn = null),
      (this.__observePaths = null),
      (this.__ctor = null),
      (this.__isDetached = !0),
      (this.template = null),
      this._templateInfo
  }
  disconnectedCallback() {
    super.disconnectedCallback(), (this.__isDetached = !0)
    for (let e = 0; e < this.__instances.length; e++) this.__detachInstance(e)
  }
  connectedCallback() {
    if (
      (super.connectedCallback(),
      ia() || (this.style.display = 'none'),
      this.__isDetached)
    ) {
      this.__isDetached = !1
      let e = $o($o(this).parentNode)
      for (let t = 0; t < this.__instances.length; t++)
        this.__attachInstance(t, e)
    }
  }
  __ensureTemplatized() {
    if (!this.__ctor) {
      const e = this
      let t = (this.template = e._templateInfo
        ? e
        : this.querySelector('template'))
      if (!t) {
        let e = new MutationObserver(() => {
          if (!this.querySelector('template'))
            throw new Error('dom-repeat requires a <template> child')
          e.disconnect(), this.__render()
        })
        return e.observe(this, { childList: !0 }), !1
      }
      let o = {}
      ;(o[this.as] = !0),
        (o[this.indexAs] = !0),
        (o[this.itemsIndexAs] = !0),
        (this.__ctor = oa(t, this, {
          mutableData: this.mutableData,
          parentModel: !0,
          instanceProps: o,
          forwardHostProp: function (e, t) {
            let o = this.__instances
            for (let r, i = 0; i < o.length && (r = o[i]); i++)
              r.forwardHostProp(e, t)
          },
          notifyInstanceProp: function (e, t, o) {
            if ((r = this.as) === (i = t) || Zo(r, i) || qo(r, i)) {
              let r = e[this.itemsIndexAs]
              t == this.as && (this.items[r] = o)
              let i = Go(
                this.as,
                `${JSCompiler_renameProperty('items', this)}.${r}`,
                t
              )
              this.notifyPath(i, o)
            }
            var r, i
          },
        }))
    }
    return !0
  }
  __getMethodHost() {
    return this.__dataHost._methodHost || this.__dataHost
  }
  __functionFromPropertyValue(e) {
    if ('string' == typeof e) {
      let t = e,
        o = this.__getMethodHost()
      return function () {
        return o[t].apply(o, arguments)
      }
    }
    return e
  }
  __sortChanged(e) {
    ;(this.__sortFn = this.__functionFromPropertyValue(e)),
      this.items && this.__debounceRender(this.__render)
  }
  __filterChanged(e) {
    ;(this.__filterFn = this.__functionFromPropertyValue(e)),
      this.items && this.__debounceRender(this.__render)
  }
  __computeFrameTime(e) {
    return Math.ceil(1e3 / e)
  }
  __observeChanged() {
    this.__observePaths =
      this.observe && this.observe.replace('.*', '.').split(' ')
  }
  __handleObservedPaths(e) {
    if (this.__sortFn || this.__filterFn)
      if (e) {
        if (this.__observePaths) {
          let t = this.__observePaths
          for (let o = 0; o < t.length; o++)
            0 === e.indexOf(t[o]) &&
              this.__debounceRender(this.__render, this.delay)
        }
      } else this.__debounceRender(this.__render, this.delay)
  }
  __itemsChanged(e) {
    this.items &&
      !Array.isArray(this.items) &&
      console.warn('dom-repeat expected array for `items`, found', this.items),
      this.__handleItemPath(e.path, e.value) ||
        ('items' === e.path && (this.__itemsArrayChanged = !0),
        this.__debounceRender(this.__render))
  }
  __debounceRender(e, t = 0) {
    ;(this.__renderDebouncer = ci.debounce(
      this.__renderDebouncer,
      t > 0 ? dr.after(t) : pr,
      e.bind(this)
    )),
      ui(this.__renderDebouncer)
  }
  render() {
    this.__debounceRender(this.__render), _n()
  }
  __render() {
    if (!this.__ensureTemplatized()) return
    let e = this.items || []
    const t = this.__sortAndFilterItems(e),
      o = this.__calculateLimit(t.length)
    this.__updateInstances(e, o, t),
      this.initialCount &&
        (this.__shouldMeasureChunk || this.__shouldContinueChunking) &&
        (cancelAnimationFrame(this.__chunkingId),
        (this.__chunkingId = requestAnimationFrame(() =>
          this.__continueChunking()
        ))),
      this._setRenderedItemCount(this.__instances.length),
      (ko && !this.notifyDomChange) ||
        this.dispatchEvent(
          new CustomEvent('dom-change', { bubbles: !0, composed: !0 })
        )
  }
  __sortAndFilterItems(e) {
    let t = new Array(e.length)
    for (let o = 0; o < e.length; o++) t[o] = o
    return (
      this.__filterFn &&
        (t = t.filter((t, o, r) => this.__filterFn(e[t], o, r))),
      this.__sortFn && t.sort((t, o) => this.__sortFn(e[t], e[o])),
      t
    )
  }
  __calculateLimit(e) {
    let t = e
    const o = this.__instances.length
    if (this.initialCount) {
      let r
      !this.__chunkCount ||
      (this.__itemsArrayChanged && !this.reuseChunkedInstances)
        ? ((t = Math.min(e, this.initialCount)),
          (r = Math.max(t - o, 0)),
          (this.__chunkCount = r || 1))
        : ((r = Math.min(Math.max(e - o, 0), this.__chunkCount)),
          (t = Math.min(o + r, e))),
        (this.__shouldMeasureChunk = r === this.__chunkCount),
        (this.__shouldContinueChunking = t < e),
        (this.__renderStartTime = performance.now())
    }
    return (this.__itemsArrayChanged = !1), t
  }
  __continueChunking() {
    if (this.__shouldMeasureChunk) {
      const e = performance.now() - this.__renderStartTime,
        t = this._targetFrameTime / e
      this.__chunkCount = Math.round(this.__chunkCount * t) || 1
    }
    this.__shouldContinueChunking && this.__debounceRender(this.__render)
  }
  __updateInstances(e, t, o) {
    const r = (this.__itemsIdxToInstIdx = {})
    let i
    for (i = 0; i < t; i++) {
      let t = this.__instances[i],
        n = o[i],
        a = e[n]
      ;(r[n] = i),
        t
          ? (t._setPendingProperty(this.as, a),
            t._setPendingProperty(this.indexAs, i),
            t._setPendingProperty(this.itemsIndexAs, n),
            t._flushProperties())
          : this.__insertInstance(a, i, n)
    }
    for (let e = this.__instances.length - 1; e >= i; e--)
      this.__detachAndRemoveInstance(e)
  }
  __detachInstance(e) {
    let t = this.__instances[e]
    const o = $o(t.root)
    for (let e = 0; e < t.children.length; e++) {
      let r = t.children[e]
      o.appendChild(r)
    }
    return t
  }
  __attachInstance(e, t) {
    let o = this.__instances[e]
    t.insertBefore(o.root, this)
  }
  __detachAndRemoveInstance(e) {
    this.__detachInstance(e), this.__instances.splice(e, 1)
  }
  __stampInstance(e, t, o) {
    let r = {}
    return (
      (r[this.as] = e),
      (r[this.indexAs] = t),
      (r[this.itemsIndexAs] = o),
      new this.__ctor(r)
    )
  }
  __insertInstance(e, t, o) {
    const r = this.__stampInstance(e, t, o)
    let i = this.__instances[t + 1],
      n = i ? i.children[0] : this
    return (
      $o($o(this).parentNode).insertBefore(r.root, n),
      (this.__instances[t] = r),
      r
    )
  }
  _showHideChildren(e) {
    for (let t = 0; t < this.__instances.length; t++)
      this.__instances[t]._showHideChildren(e)
  }
  __handleItemPath(e, t) {
    let o = e.slice(6),
      r = o.indexOf('.'),
      i = r < 0 ? o : o.substring(0, r)
    if (i == parseInt(i, 10)) {
      let e = r < 0 ? '' : o.substring(r + 1)
      this.__handleObservedPaths(e)
      let n = this.__itemsIdxToInstIdx[i],
        a = this.__instances[n]
      if (a) {
        let o = this.as + (e ? '.' + e : '')
        a._setPendingPropertyOrPath(o, t, !1, !0), a._flushProperties()
      }
      return !0
    }
  }
  itemForElement(e) {
    let t = this.modelForElement(e)
    return t && t[this.as]
  }
  indexForElement(e) {
    let t = this.modelForElement(e)
    return t && t[this.indexAs]
  }
  modelForElement(e) {
    return (function (e, t) {
      let o
      for (; t; )
        if ((o = t.__dataHost ? t : t.__templatizeInstance)) {
          if (o.__dataHost == e) return o
          t = o.__dataHost
        } else t = $o(t).parentNode
      return null
    })(this.template, e)
  }
}
customElements.define(pa.is, pa)
class ua extends da {
  static get is() {
    return 'dom-if'
  }
  static get template() {
    return null
  }
  static get properties() {
    return {
      if: { type: Boolean, observer: '__debounceRender' },
      restamp: { type: Boolean, observer: '__debounceRender' },
      notifyDomChange: { type: Boolean },
    }
  }
  constructor() {
    super(),
      (this.__renderDebouncer = null),
      (this._lastIf = !1),
      (this.__hideTemplateChildren__ = !1),
      this.__template,
      this._templateInfo
  }
  __debounceRender() {
    ;(this.__renderDebouncer = ci.debounce(this.__renderDebouncer, pr, () =>
      this.__render()
    )),
      ui(this.__renderDebouncer)
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    const e = $o(this).parentNode
    ;(e && (e.nodeType != Node.DOCUMENT_FRAGMENT_NODE || $o(e).host)) ||
      this.__teardownInstance()
  }
  connectedCallback() {
    super.connectedCallback(),
      ia() || (this.style.display = 'none'),
      this.if && this.__debounceRender()
  }
  __ensureTemplate() {
    if (!this.__template) {
      const e = this
      let t = e._templateInfo ? e : $o(e).querySelector('template')
      if (!t) {
        let e = new MutationObserver(() => {
          if (!$o(this).querySelector('template'))
            throw new Error('dom-if requires a <template> child')
          e.disconnect(), this.__render()
        })
        return e.observe(this, { childList: !0 }), !1
      }
      this.__template = t
    }
    return !0
  }
  __ensureInstance() {
    let e = $o(this).parentNode
    if (this.__hasInstance()) {
      let t = this.__getInstanceNodes()
      if (t && t.length) {
        if ($o(this).previousSibling !== t[t.length - 1])
          for (let o, r = 0; r < t.length && (o = t[r]); r++)
            $o(e).insertBefore(o, this)
      }
    } else {
      if (!e) return !1
      if (!this.__ensureTemplate()) return !1
      this.__createAndInsertInstance(e)
    }
    return !0
  }
  render() {
    _n()
  }
  __render() {
    if (this.if) {
      if (!this.__ensureInstance()) return
    } else this.restamp && this.__teardownInstance()
    this._showHideChildren(),
      (ko && !this.notifyDomChange) ||
        this.if == this._lastIf ||
        (this.dispatchEvent(
          new CustomEvent('dom-change', { bubbles: !0, composed: !0 })
        ),
        (this._lastIf = this.if))
  }
  __hasInstance() {}
  __getInstanceNodes() {}
  __createAndInsertInstance(e) {}
  __teardownInstance() {}
  _showHideChildren() {}
}
const ma = Ho
  ? class extends ua {
      constructor() {
        super(), (this.__instance = null), (this.__syncInfo = null)
      }
      __hasInstance() {
        return Boolean(this.__instance)
      }
      __getInstanceNodes() {
        return this.__instance.templateInfo.childNodes
      }
      __createAndInsertInstance(e) {
        const t = this.__dataHost || this
        if (_o && !this.__dataHost)
          throw new Error('strictTemplatePolicy: template owner not trusted')
        const o = t._bindTemplate(this.__template, !0)
        ;(o.runEffects = (e, t, o) => {
          let r = this.__syncInfo
          if (this.if)
            r &&
              ((this.__syncInfo = null),
              this._showHideChildren(),
              (t = Object.assign(r.changedProps, t))),
              e(t, o)
          else if (this.__instance)
            if (
              (r || (r = this.__syncInfo = { runEffects: e, changedProps: {} }),
              o)
            )
              for (const e in t) {
                const t = Uo(e)
                r.changedProps[t] = this.__dataHost[t]
              }
            else Object.assign(r.changedProps, t)
        }),
          (this.__instance = t._stampTemplate(this.__template, o)),
          $o(e).insertBefore(this.__instance, this)
      }
      __syncHostProperties() {
        const e = this.__syncInfo
        e && ((this.__syncInfo = null), e.runEffects(e.changedProps, !1))
      }
      __teardownInstance() {
        const e = this.__dataHost || this
        this.__instance &&
          (e._removeBoundDom(this.__instance),
          (this.__instance = null),
          (this.__syncInfo = null))
      }
      _showHideChildren() {
        const e = this.__hideTemplateChildren__ || !this.if
        this.__instance &&
          Boolean(this.__instance.__hidden) !== e &&
          ((this.__instance.__hidden = e),
          Kn(e, this.__instance.templateInfo.childNodes)),
          e || this.__syncHostProperties()
      }
    }
  : class extends ua {
      constructor() {
        super(),
          (this.__ctor = null),
          (this.__instance = null),
          (this.__invalidProps = null)
      }
      __hasInstance() {
        return Boolean(this.__instance)
      }
      __getInstanceNodes() {
        return this.__instance.children
      }
      __createAndInsertInstance(e) {
        this.__ctor ||
          (this.__ctor = oa(this.__template, this, {
            mutableData: !0,
            forwardHostProp: function (e, t) {
              this.__instance &&
                (this.if
                  ? this.__instance.forwardHostProp(e, t)
                  : ((this.__invalidProps =
                      this.__invalidProps || Object.create(null)),
                    (this.__invalidProps[Uo(e)] = !0)))
            },
          })),
          (this.__instance = new this.__ctor()),
          $o(e).insertBefore(this.__instance.root, this)
      }
      __teardownInstance() {
        if (this.__instance) {
          let e = this.__instance.children
          if (e && e.length) {
            let t = $o(e[0]).parentNode
            if (t) {
              t = $o(t)
              for (let o, r = 0; r < e.length && (o = e[r]); r++)
                t.removeChild(o)
            }
          }
          ;(this.__invalidProps = null), (this.__instance = null)
        }
      }
      __syncHostProperties() {
        let e = this.__invalidProps
        if (e) {
          this.__invalidProps = null
          for (let t in e)
            this.__instance._setPendingProperty(t, this.__dataHost[t])
          this.__instance._flushProperties()
        }
      }
      _showHideChildren() {
        const e = this.__hideTemplateChildren__ || !this.if
        this.__instance &&
          Boolean(this.__instance.__hidden) !== e &&
          ((this.__instance.__hidden = e),
          this.__instance._showHideChildren(e)),
          e || this.__syncHostProperties()
      }
    }
customElements.define(ma.is, ma)
let ha = Vo((e) => {
    let t = di(e)
    return class extends t {
      static get properties() {
        return {
          items: { type: Array },
          multi: { type: Boolean, value: !1 },
          selected: { type: Object, notify: !0 },
          selectedItem: { type: Object, notify: !0 },
          toggle: { type: Boolean, value: !1 },
        }
      }
      static get observers() {
        return ['__updateSelection(multi, items.*)']
      }
      constructor() {
        super(),
          (this.__lastItems = null),
          (this.__lastMulti = null),
          (this.__selectedMap = null)
      }
      __updateSelection(e, t) {
        let o = t.path
        if (o == JSCompiler_renameProperty('items', this)) {
          let o = t.base || [],
            r = this.__lastItems
          if ((e !== this.__lastMulti && this.clearSelection(), r)) {
            let e = un(o, r)
            this.__applySplices(e)
          }
          ;(this.__lastItems = o), (this.__lastMulti = e)
        } else if (
          t.path == `${JSCompiler_renameProperty('items', this)}.splices`
        )
          this.__applySplices(t.value.indexSplices)
        else {
          let e = o.slice(
              `${JSCompiler_renameProperty('items', this)}.`.length
            ),
            t = parseInt(e, 10)
          e.indexOf('.') < 0 && e == t && this.__deselectChangedIdx(t)
        }
      }
      __applySplices(e) {
        let t = this.__selectedMap
        for (let o = 0; o < e.length; o++) {
          let r = e[o]
          t.forEach((e, o) => {
            e < r.index ||
              (e >= r.index + r.removed.length
                ? t.set(o, e + r.addedCount - r.removed.length)
                : t.set(o, -1))
          })
          for (let e = 0; e < r.addedCount; e++) {
            let o = r.index + e
            t.has(this.items[o]) && t.set(this.items[o], o)
          }
        }
        this.__updateLinks()
        let o = 0
        t.forEach((e, r) => {
          e < 0
            ? (this.multi
                ? this.splice(JSCompiler_renameProperty('selected', this), o, 1)
                : (this.selected = this.selectedItem = null),
              t.delete(r))
            : o++
        })
      }
      __updateLinks() {
        if (((this.__dataLinkedPaths = {}), this.multi)) {
          let e = 0
          this.__selectedMap.forEach((t) => {
            t >= 0 &&
              this.linkPaths(
                `${JSCompiler_renameProperty('items', this)}.${t}`,
                `${JSCompiler_renameProperty('selected', this)}.${e++}`
              )
          })
        } else
          this.__selectedMap.forEach((e) => {
            this.linkPaths(
              JSCompiler_renameProperty('selected', this),
              `${JSCompiler_renameProperty('items', this)}.${e}`
            ),
              this.linkPaths(
                JSCompiler_renameProperty('selectedItem', this),
                `${JSCompiler_renameProperty('items', this)}.${e}`
              )
          })
      }
      clearSelection() {
        ;(this.__dataLinkedPaths = {}),
          (this.__selectedMap = new Map()),
          (this.selected = this.multi ? [] : null),
          (this.selectedItem = null)
      }
      isSelected(e) {
        return this.__selectedMap.has(e)
      }
      isIndexSelected(e) {
        return this.isSelected(this.items[e])
      }
      __deselectChangedIdx(e) {
        let t = this.__selectedIndexForItemIndex(e)
        if (t >= 0) {
          let e = 0
          this.__selectedMap.forEach((o, r) => {
            t == e++ && this.deselect(r)
          })
        }
      }
      __selectedIndexForItemIndex(e) {
        let t =
          this.__dataLinkedPaths[
            `${JSCompiler_renameProperty('items', this)}.${e}`
          ]
        if (t)
          return parseInt(
            t.slice(`${JSCompiler_renameProperty('selected', this)}.`.length),
            10
          )
      }
      deselect(e) {
        let t = this.__selectedMap.get(e)
        if (t >= 0) {
          let o
          this.__selectedMap.delete(e),
            this.multi && (o = this.__selectedIndexForItemIndex(t)),
            this.__updateLinks(),
            this.multi
              ? this.splice(JSCompiler_renameProperty('selected', this), o, 1)
              : (this.selected = this.selectedItem = null)
        }
      }
      deselectIndex(e) {
        this.deselect(this.items[e])
      }
      select(e) {
        this.selectIndex(this.items.indexOf(e))
      }
      selectIndex(e) {
        let t = this.items[e]
        this.isSelected(t)
          ? this.toggle && this.deselectIndex(e)
          : (this.multi || this.__selectedMap.clear(),
            this.__selectedMap.set(t, e),
            this.__updateLinks(),
            this.multi
              ? this.push(JSCompiler_renameProperty('selected', this), t)
              : (this.selected = this.selectedItem = t))
      }
    }
  }),
  ga = ha(da)
class _a extends ga {
  static get is() {
    return 'array-selector'
  }
  static get template() {
    return null
  }
}
customElements.define(_a.is, _a)
const fa = new eo()
window.ShadyCSS ||
  (window.ShadyCSS = {
    prepareTemplate(e, t, o) {},
    prepareTemplateDom(e, t) {},
    prepareTemplateStyles(e, t, o) {},
    styleSubtree(e, t) {
      fa.processStyles(), Pt(e, t)
    },
    styleElement(e) {
      fa.processStyles()
    },
    styleDocument(e) {
      fa.processStyles(), Pt(document.body, e)
    },
    getComputedStyleValue: (e, t) => Tt(e, t),
    flushCustomStyles() {},
    nativeCss: lt,
    nativeShadow: rt,
    cssBuild: nt,
    disableRuntime: st,
  }),
  (window.ShadyCSS.CustomStyleInterface = fa)
const ya = window.ShadyCSS.CustomStyleInterface
class ba extends HTMLElement {
  constructor() {
    super(), (this._style = null), ya.addCustomStyle(this)
  }
  getStyle() {
    if (this._style) return this._style
    const e = this.querySelector('style')
    if (!e) return null
    this._style = e
    const t = e.getAttribute('include')
    return (
      t &&
        (e.removeAttribute('include'),
        (e.textContent =
          (function (e) {
            let t = e.trim().split(/\s+/),
              o = ''
            for (let e = 0; e < t.length; e++) o += Bo(t[e])
            return o
          })(t) + e.textContent)),
      this.ownerDocument !== window.document &&
        window.document.head.appendChild(this),
      this._style
    )
  }
}
window.customElements.define('custom-style', ba), En(HTMLElement).prototype
const va = la`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`
va.setAttribute('style', 'display: none;'),
  document.head.appendChild(va.content)
var Ca = document.createElement('style')
;(Ca.textContent = '[hidden] { display: none !important; }'),
  document.head.appendChild(Ca)
const Aa = la`
<custom-style>
  <style is="custom-style">
    html {

      /* Material Design color palette for Google products */

      --google-red-100: #f4c7c3;
      --google-red-300: #e67c73;
      --google-red-500: #db4437;
      --google-red-700: #c53929;

      --google-blue-100: #c6dafc;
      --google-blue-300: #7baaf7;
      --google-blue-500: #4285f4;
      --google-blue-700: #3367d6;

      --google-green-100: #b7e1cd;
      --google-green-300: #57bb8a;
      --google-green-500: #0f9d58;
      --google-green-700: #0b8043;

      --google-yellow-100: #fce8b2;
      --google-yellow-300: #f7cb4d;
      --google-yellow-500: #f4b400;
      --google-yellow-700: #f09300;

      --google-grey-100: #f5f5f5;
      --google-grey-300: #e0e0e0;
      --google-grey-500: #9e9e9e;
      --google-grey-700: #616161;

      /* Material Design color palette from online spec document */

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-pink-50: #fce4ec;
      --paper-pink-100: #f8bbd0;
      --paper-pink-200: #f48fb1;
      --paper-pink-300: #f06292;
      --paper-pink-400: #ec407a;
      --paper-pink-500: #e91e63;
      --paper-pink-600: #d81b60;
      --paper-pink-700: #c2185b;
      --paper-pink-800: #ad1457;
      --paper-pink-900: #880e4f;
      --paper-pink-a100: #ff80ab;
      --paper-pink-a200: #ff4081;
      --paper-pink-a400: #f50057;
      --paper-pink-a700: #c51162;

      --paper-purple-50: #f3e5f5;
      --paper-purple-100: #e1bee7;
      --paper-purple-200: #ce93d8;
      --paper-purple-300: #ba68c8;
      --paper-purple-400: #ab47bc;
      --paper-purple-500: #9c27b0;
      --paper-purple-600: #8e24aa;
      --paper-purple-700: #7b1fa2;
      --paper-purple-800: #6a1b9a;
      --paper-purple-900: #4a148c;
      --paper-purple-a100: #ea80fc;
      --paper-purple-a200: #e040fb;
      --paper-purple-a400: #d500f9;
      --paper-purple-a700: #aa00ff;

      --paper-deep-purple-50: #ede7f6;
      --paper-deep-purple-100: #d1c4e9;
      --paper-deep-purple-200: #b39ddb;
      --paper-deep-purple-300: #9575cd;
      --paper-deep-purple-400: #7e57c2;
      --paper-deep-purple-500: #673ab7;
      --paper-deep-purple-600: #5e35b1;
      --paper-deep-purple-700: #512da8;
      --paper-deep-purple-800: #4527a0;
      --paper-deep-purple-900: #311b92;
      --paper-deep-purple-a100: #b388ff;
      --paper-deep-purple-a200: #7c4dff;
      --paper-deep-purple-a400: #651fff;
      --paper-deep-purple-a700: #6200ea;

      --paper-indigo-50: #e8eaf6;
      --paper-indigo-100: #c5cae9;
      --paper-indigo-200: #9fa8da;
      --paper-indigo-300: #7986cb;
      --paper-indigo-400: #5c6bc0;
      --paper-indigo-500: #3f51b5;
      --paper-indigo-600: #3949ab;
      --paper-indigo-700: #303f9f;
      --paper-indigo-800: #283593;
      --paper-indigo-900: #1a237e;
      --paper-indigo-a100: #8c9eff;
      --paper-indigo-a200: #536dfe;
      --paper-indigo-a400: #3d5afe;
      --paper-indigo-a700: #304ffe;

      --paper-blue-50: #e3f2fd;
      --paper-blue-100: #bbdefb;
      --paper-blue-200: #90caf9;
      --paper-blue-300: #64b5f6;
      --paper-blue-400: #42a5f5;
      --paper-blue-500: #2196f3;
      --paper-blue-600: #1e88e5;
      --paper-blue-700: #1976d2;
      --paper-blue-800: #1565c0;
      --paper-blue-900: #0d47a1;
      --paper-blue-a100: #82b1ff;
      --paper-blue-a200: #448aff;
      --paper-blue-a400: #2979ff;
      --paper-blue-a700: #2962ff;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-cyan-50: #e0f7fa;
      --paper-cyan-100: #b2ebf2;
      --paper-cyan-200: #80deea;
      --paper-cyan-300: #4dd0e1;
      --paper-cyan-400: #26c6da;
      --paper-cyan-500: #00bcd4;
      --paper-cyan-600: #00acc1;
      --paper-cyan-700: #0097a7;
      --paper-cyan-800: #00838f;
      --paper-cyan-900: #006064;
      --paper-cyan-a100: #84ffff;
      --paper-cyan-a200: #18ffff;
      --paper-cyan-a400: #00e5ff;
      --paper-cyan-a700: #00b8d4;

      --paper-teal-50: #e0f2f1;
      --paper-teal-100: #b2dfdb;
      --paper-teal-200: #80cbc4;
      --paper-teal-300: #4db6ac;
      --paper-teal-400: #26a69a;
      --paper-teal-500: #009688;
      --paper-teal-600: #00897b;
      --paper-teal-700: #00796b;
      --paper-teal-800: #00695c;
      --paper-teal-900: #004d40;
      --paper-teal-a100: #a7ffeb;
      --paper-teal-a200: #64ffda;
      --paper-teal-a400: #1de9b6;
      --paper-teal-a700: #00bfa5;

      --paper-green-50: #e8f5e9;
      --paper-green-100: #c8e6c9;
      --paper-green-200: #a5d6a7;
      --paper-green-300: #81c784;
      --paper-green-400: #66bb6a;
      --paper-green-500: #4caf50;
      --paper-green-600: #43a047;
      --paper-green-700: #388e3c;
      --paper-green-800: #2e7d32;
      --paper-green-900: #1b5e20;
      --paper-green-a100: #b9f6ca;
      --paper-green-a200: #69f0ae;
      --paper-green-a400: #00e676;
      --paper-green-a700: #00c853;

      --paper-light-green-50: #f1f8e9;
      --paper-light-green-100: #dcedc8;
      --paper-light-green-200: #c5e1a5;
      --paper-light-green-300: #aed581;
      --paper-light-green-400: #9ccc65;
      --paper-light-green-500: #8bc34a;
      --paper-light-green-600: #7cb342;
      --paper-light-green-700: #689f38;
      --paper-light-green-800: #558b2f;
      --paper-light-green-900: #33691e;
      --paper-light-green-a100: #ccff90;
      --paper-light-green-a200: #b2ff59;
      --paper-light-green-a400: #76ff03;
      --paper-light-green-a700: #64dd17;

      --paper-lime-50: #f9fbe7;
      --paper-lime-100: #f0f4c3;
      --paper-lime-200: #e6ee9c;
      --paper-lime-300: #dce775;
      --paper-lime-400: #d4e157;
      --paper-lime-500: #cddc39;
      --paper-lime-600: #c0ca33;
      --paper-lime-700: #afb42b;
      --paper-lime-800: #9e9d24;
      --paper-lime-900: #827717;
      --paper-lime-a100: #f4ff81;
      --paper-lime-a200: #eeff41;
      --paper-lime-a400: #c6ff00;
      --paper-lime-a700: #aeea00;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-amber-50: #fff8e1;
      --paper-amber-100: #ffecb3;
      --paper-amber-200: #ffe082;
      --paper-amber-300: #ffd54f;
      --paper-amber-400: #ffca28;
      --paper-amber-500: #ffc107;
      --paper-amber-600: #ffb300;
      --paper-amber-700: #ffa000;
      --paper-amber-800: #ff8f00;
      --paper-amber-900: #ff6f00;
      --paper-amber-a100: #ffe57f;
      --paper-amber-a200: #ffd740;
      --paper-amber-a400: #ffc400;
      --paper-amber-a700: #ffab00;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-deep-orange-50: #fbe9e7;
      --paper-deep-orange-100: #ffccbc;
      --paper-deep-orange-200: #ffab91;
      --paper-deep-orange-300: #ff8a65;
      --paper-deep-orange-400: #ff7043;
      --paper-deep-orange-500: #ff5722;
      --paper-deep-orange-600: #f4511e;
      --paper-deep-orange-700: #e64a19;
      --paper-deep-orange-800: #d84315;
      --paper-deep-orange-900: #bf360c;
      --paper-deep-orange-a100: #ff9e80;
      --paper-deep-orange-a200: #ff6e40;
      --paper-deep-orange-a400: #ff3d00;
      --paper-deep-orange-a700: #dd2c00;

      --paper-brown-50: #efebe9;
      --paper-brown-100: #d7ccc8;
      --paper-brown-200: #bcaaa4;
      --paper-brown-300: #a1887f;
      --paper-brown-400: #8d6e63;
      --paper-brown-500: #795548;
      --paper-brown-600: #6d4c41;
      --paper-brown-700: #5d4037;
      --paper-brown-800: #4e342e;
      --paper-brown-900: #3e2723;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      /* opacity for dark text on a light background */
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; /* or hint text or icon */
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      /* opacity for light text on a dark background */
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; /* or hint text or icon */
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;

    }

  </style>
</custom-style>
`
Aa.setAttribute('style', 'display: none;'),
  document.head.appendChild(Aa.content)
const wa = la`
<custom-style>
  <style is="custom-style">
    html {
      /*
       * You can use these generic variables in your elements for easy theming.
       * For example, if all your elements use \`--primary-text-color\` as its main
       * color, then switching from a light to a dark theme is just a matter of
       * changing the value of \`--primary-text-color\` in your application.
       */
      --primary-text-color: var(--light-theme-text-color);
      --primary-background-color: var(--light-theme-background-color);
      --secondary-text-color: var(--light-theme-secondary-color);
      --disabled-text-color: var(--light-theme-disabled-color);
      --divider-color: var(--light-theme-divider-color);
      --error-color: var(--paper-deep-orange-a700);

      /*
       * Primary and accent colors. Also see color.js for more colors.
       */
      --primary-color: var(--paper-indigo-500);
      --light-primary-color: var(--paper-indigo-100);
      --dark-primary-color: var(--paper-indigo-700);

      --accent-color: var(--paper-pink-a200);
      --light-accent-color: var(--paper-pink-a100);
      --dark-accent-color: var(--paper-pink-a400);


      /*
       * Material Design Light background theme
       */
      --light-theme-background-color: #ffffff;
      --light-theme-base-color: #000000;
      --light-theme-text-color: var(--paper-grey-900);
      --light-theme-secondary-color: #737373;  /* for secondary text and icons */
      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */
      --light-theme-divider-color: #dbdbdb;

      /*
       * Material Design Dark background theme
       */
      --dark-theme-background-color: var(--paper-grey-900);
      --dark-theme-base-color: #ffffff;
      --dark-theme-text-color: #ffffff;
      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */
      --dark-theme-disabled-color: #646464;  /* disabled/hint text */
      --dark-theme-divider-color: #3c3c3c;

      /*
       * Deprecated values because of their confusing names.
       */
      --text-primary-color: var(--dark-theme-text-color);
      --default-primary-color: var(--primary-color);
    }
  </style>
</custom-style>`
wa.setAttribute('style', 'display: none;'),
  document.head.appendChild(wa.content)
const Ha = la`
<custom-style>
  <style is="custom-style">
    html {

      --shadow-transition: {
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      };

      --shadow-none: {
        box-shadow: none;
      };

      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */

      --shadow-elevation-2dp: {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      };

      --shadow-elevation-3dp: {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                    0 1px 8px 0 rgba(0, 0, 0, 0.12),
                    0 3px 3px -2px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-4dp: {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-6dp: {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-8dp: {
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12),
                    0 5px 5px -3px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-12dp: {
        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                    0 4px 22px 3px rgba(0, 0, 0, 0.12),
                    0 6px 7px -4px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-16dp: {
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                    0  6px 30px 5px rgba(0, 0, 0, 0.12),
                    0  8px 10px -5px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-24dp: {
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12),
                    0 11px 15px -7px rgba(0, 0, 0, 0.4);
      };
    }
  </style>
</custom-style>`
Ha.setAttribute('style', 'display: none;'),
  document.head.appendChild(Ha.content)
const ka = la`<custom-style>
  <style is="custom-style">
    html {

      /* Shared Styles */
      --paper-font-common-base: {
        font-family: 'Roboto', 'Noto', sans-serif;
        -webkit-font-smoothing: antialiased;
      };

      --paper-font-common-code: {
        font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
        -webkit-font-smoothing: antialiased;
      };

      --paper-font-common-expensive-kerning: {
        text-rendering: optimizeLegibility;
      };

      --paper-font-common-nowrap: {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      };

      /* Material Font Styles */

      --paper-font-display4: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 112px;
        font-weight: 300;
        letter-spacing: -.044em;
        line-height: 120px;
      };

      --paper-font-display3: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 56px;
        font-weight: 400;
        letter-spacing: -.026em;
        line-height: 60px;
      };

      --paper-font-display2: {
        @apply --paper-font-common-base;

        font-size: 45px;
        font-weight: 400;
        letter-spacing: -.018em;
        line-height: 48px;
      };

      --paper-font-display1: {
        @apply --paper-font-common-base;

        font-size: 34px;
        font-weight: 400;
        letter-spacing: -.01em;
        line-height: 40px;
      };

      --paper-font-headline: {
        @apply --paper-font-common-base;

        font-size: 24px;
        font-weight: 400;
        letter-spacing: -.012em;
        line-height: 32px;
      };

      --paper-font-title: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
      };

      --paper-font-subhead: {
        @apply --paper-font-common-base;

        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      };

      --paper-font-body2: {
        @apply --paper-font-common-base;

        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      };

      --paper-font-body1: {
        @apply --paper-font-common-base;

        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      };

      --paper-font-caption: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.011em;
        line-height: 20px;
      };

      --paper-font-menu: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 13px;
        font-weight: 500;
        line-height: 24px;
      };

      --paper-font-button: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.018em;
        line-height: 24px;
        text-transform: uppercase;
      };

      --paper-font-code2: {
        @apply --paper-font-common-code;

        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
      };

      --paper-font-code1: {
        @apply --paper-font-common-code;

        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      };

    }

  </style>
</custom-style>`
ka.setAttribute('style', 'display: none;'),
  document.head.appendChild(ka.content)
const Sa = document.createElement('template')
Sa.setAttribute('style', 'display: none;'),
  (Sa.innerHTML = `<custom-style>\n  <style>\n    /*\n      Home Assistant default styles.\n\n      In Polymer 2.0, default styles should to be set on the html selector.\n      (Setting all default styles only on body breaks shadyCSS polyfill.)\n      See: https://github.com/home-assistant/home-assistant-polymer/pull/901\n    */\n    html {\n      font-size: 14px;\n      height: 100vh;\n\n      /* text */\n      --primary-text-color: #212121;\n      --secondary-text-color: #727272;\n      --text-primary-color: #ffffff;\n      --text-light-primary-color: #212121;\n      --disabled-text-color: #bdbdbd;\n\n      /* main interface colors */\n      --primary-color: #03a9f4;\n      --dark-primary-color: #0288d1;\n      --light-primary-color: #b3e5fC;\n      --accent-color: #ff9800;\n      --divider-color: rgba(0, 0, 0, .12);\n\n      --scrollbar-thumb-color: rgb(194, 194, 194);\n\n      --error-color: #db4437;\n      --warning-color: #ffa600;\n      --success-color: #43a047;\n      --info-color: #039be5;\n\n      /* backgrounds */\n      --card-background-color: #ffffff;\n      --primary-background-color: #fafafa;\n      --secondary-background-color: #e5e5e5; /* behind the cards on state */\n\n      /* for header */\n      --header-height: 56px;\n\n      /* for label-badge */\n      --label-badge-red: #DF4C1E;\n      --label-badge-blue: #039be5;\n      --label-badge-green: #0DA035;\n      --label-badge-yellow: #f4b400;\n      --label-badge-grey: #9e9e9e;\n\n      /* states */\n      --state-icon-color: #44739e;\n      /* an active state is anything that would require attention */\n      --state-icon-active-color: #FDD835;\n      /* an error state is anything that would be considered an error */\n      /* --state-icon-error-color: #db4437; derived from error-color */\n\n      --state-on-color: #66a61e;\n      --state-off-color: #ff0029;\n      --state-home-color: #66a61e;\n      --state-not_home-color: #ff0029;\n      /* --state-unavailable-color: #a0a0a0; derived from disabled-text-color */\n      --state-unknown-color: #606060;\n      --state-idle-color: #7990a3;\n\n      /* climate state colors */\n      --state-climate-auto-color: #008000;\n      --state-climate-eco-color: #00ff7f;\n      --state-climate-cool-color: #2b9af9;\n      --state-climate-heat-color: #ff8100;\n      --state-climate-manual-color: #44739e;\n      --state-climate-off-color: #8a8a8a;\n      --state-climate-fan_only-color: #8a8a8a;\n      --state-climate-dry-color: #efbd07;\n      --state-climate-idle-color: #8a8a8a;\n\n      /* energy */\n      --energy-grid-consumption-color: #488fc2;\n      --energy-grid-return-color: #8353d1;\n      --energy-solar-color: #ff9800;\n      --energy-non-fossil-color: #0f9d58;\n      --energy-battery-out-color: #4db6ac;\n      --energy-battery-in-color: #f06292;\n      --energy-gas-color: #8E021B;\n\n      /* opacity for dark text on a light background */\n      --dark-divider-opacity: 0.12;\n      --dark-disabled-opacity: 0.38; /* or hint text or icon */\n      --dark-secondary-opacity: 0.54;\n      --dark-primary-opacity: 0.87;\n\n      /* opacity for light text on a dark background */\n      --light-divider-opacity: 0.12;\n      --light-disabled-opacity: 0.3; /* or hint text or icon */\n      --light-secondary-opacity: 0.7;\n      --light-primary-opacity: 1.0;\n\n      /* rgb */\n      --rgb-primary-color: 3, 169, 244;\n      --rgb-accent-color: 255, 152, 0;\n      --rgb-primary-text-color: 33, 33, 33;\n      --rgb-secondary-text-color: 114, 114, 114;\n      --rgb-text-primary-color: 255, 255, 255;\n      --rgb-card-background-color: 255, 255, 255;\n\n      /* input components */\n      --input-idle-line-color: rgba(0, 0, 0, 0.42);\n      --input-hover-line-color: rgba(0, 0, 0, 0.87);\n      --input-disabled-line-color: rgba(0, 0, 0, 0.06);\n      --input-outlined-idle-border-color: rgba(0, 0, 0, 0.38);\n      --input-outlined-hover-border-color: rgba(0, 0, 0, 0.87);\n      --input-outlined-disabled-border-color: rgba(0, 0, 0, 0.06);\n      --input-fill-color: rgb(245, 245, 245);\n      --input-disabled-fill-color: rgb(250, 250, 250);\n      --input-ink-color: rgba(0, 0, 0, 0.87);\n      --input-label-ink-color: rgba(0, 0, 0, 0.6);\n      --input-disabled-ink-color: rgba(0, 0, 0, 0.37);\n      --input-dropdown-icon-color: rgba(0, 0, 0, 0.54);\n\n      /* Vaadin typography */\n      --material-h6-font-size: 1.25rem;\n      --material-small-font-size: 0.875rem;\n      --material-caption-font-size: 0.75rem;\n      --material-button-font-size: 0.875rem;\n\n      ${Object.entries(
    Ee
  )
    .map(([e, t]) => `--${e}: ${t};`)
    .join('')}\n    }\n  </style>\n</custom-style>`),
  document.head.appendChild(Sa.content)
let La = s(
  null,
  function (e, o) {
    class i extends o {
      constructor(...t) {
        super(...t), e(this)
      }
    }
    return {
      F: i,
      d: [
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'vais',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'hass',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'route',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [ve({ type: Boolean })],
          key: 'active',
          value: () => !1,
        },
        {
          kind: 'field',
          decorators: [ve({ type: Boolean })],
          key: 'secondary',
          value: () => !1,
        },
        {
          kind: 'field',
          decorators: [ve({ type: Boolean })],
          key: 'loading',
          value: () => !0,
        },
        {
          kind: 'field',
          decorators: [ve({ type: Boolean })],
          key: 'narrow',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [ve({ type: Boolean })],
          key: 'sidebarDocked',
          value: void 0,
        },
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
              e.has('sidebarDocked') ||
                e.has('narrow') ||
                e.has('active') ||
                e.has('params') ||
                e.has('_error') ||
                e.has('_progress') ||
                e.has('_releaseNotes') ||
                e.has('_updating')
            )
          },
        },
        {
          kind: 'method',
          key: 'connectedCallback',
          value: function () {
            r(t(i.prototype), 'connectedCallback', this).call(this),
              (this.sidebarDocked =
                '"docked"' === window.localStorage.getItem('dockedSidebar'))
          },
        },
      ],
    }
  },
  _e
)
const xa = {
  'add-repository': () => import('./c.7497e476.js'),
  'custom-repositories': () => import('./c.f974b971.js'),
  generic: () => import('./c.dfc90d29.js'),
  download: () => import('./c.680a7320.js'),
  navigate: () => import('./c.0a6abc54.js'),
  removed: () => import('./c.a8ee2eca.js'),
  update: () => import('./c.20f2fead.js'),
  'repository-info': () => import('./c.f8e40161.js'),
  progress: () => import('./c.e17104b4.js'),
}
s(
  [ye('vais-event-dialog')],
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
          decorators: [ve({ attribute: !1 })],
          key: 'params',
          value: void 0,
        },
        {
          kind: 'method',
          key: 'render',
          value: function () {
            if (!this.active) return K``
            const e = this.params.type || 'generic'
            xa[e]()
            const t = document.createElement(`vais-${e}-dialog`)
            if (
              ((t.active = !0),
              (t.hass = this.hass),
              (t.vais = this.vais),
              (t.narrow = this.narrow),
              (t.secondary = this.secondary),
              (t.route = this.route),
              this.params)
            )
              for (const [e, o] of Object.entries(this.params)) t[e] = o
            return K`${t}`
          },
        },
      ],
    }
  },
  La
)
const Va = (e) =>
  null == e
    ? void 0
    : e.sort((e, t) => (e.name.toLowerCase() > t.name.toLowerCase() ? 1 : -1))
let Ea
!(function (e) {
  ;(e.CONFIG = 'vais_dispatch_config'),
    (e.ERROR = 'vais_dispatch_error'),
    (e.RELOAD = 'vais_dispatch_reload'),
    (e.REPOSITORY = 'vais_dispatch_repository'),
    (e.STAGE = 'vais_dispatch_stage'),
    (e.STARTUP = 'vais_dispatch_startup'),
    (e.STATUS = 'vais_dispatch_status')
})(Ea || (Ea = {}))
const Ma = async (e) =>
    await e.connection.sendMessagePromise({ type: 'vais/config' }),
  Pa = async (e) =>
    await e.connection.sendMessagePromise({ type: 'vais/repositories' }),
  Ta = async (e) =>
    await e.connection.sendMessagePromise({ type: 'vais/get_critical' }),
  za = async (e) =>
    await e.connection.sendMessagePromise({ type: 'vais/status' }),
  Na = async (e) =>
    await e.connection.sendMessagePromise({ type: 'vais/removed' }),
  Ia = async (e, t) => {
    await e.connection.sendMessagePromise({
      type: 'vais/repository',
      action: 'install',
      repository: t,
    })
  },
  Oa = async (e, t) =>
    await e.connection.sendMessagePromise({
      type: 'vais/repository',
      action: 'uninstall',
      repository: t,
    }),
  Ra = async (e, t) => {
    await e.connection.sendMessagePromise({
      type: 'vais/repository/ignore',
      repository: t,
    })
  },
  Da = async (e, t) =>
    await e.connection.sendMessagePromise({
      type: 'vais/repository',
      action: 'release_notes',
      repository: t,
    }),
  ja = async (e, t) => {
    await e.connection.sendMessagePromise({
      type: 'vais/repository',
      action: 'toggle_beta',
      repository: t,
    })
  },
  Ba = async (e, t, o) => {
    await e.connection.sendMessagePromise({
      type: 'vais/repository/data',
      action: 'install',
      repository: t,
      data: o,
    })
  },
  $a = async (e, t, o) => {
    await e.connection.sendMessagePromise({
      type: 'vais/repository/data',
      action: 'set_version',
      repository: t,
      data: o,
    })
  },
  Fa = async (e, t, o) => {
    await e.connection.sendMessagePromise({
      type: 'vais/repository/data',
      action: 'add',
      repository: t,
      data: o,
    })
  },
  Ua = async (e, t) => {
    await e.connection.sendMessagePromise({
      type: 'vais/repository',
      action: 'not_new',
      repository: t,
    })
  },
  Za = async (e, t) => {
    await e.connection.sendMessagePromise({
      type: 'vais/repository',
      action: 'update',
      repository: t,
    })
  },
  qa = async (e, t) => {
    await e.connection.sendMessagePromise({
      type: 'vais/repository',
      action: 'delete',
      repository: t,
    })
  },
  Ga = async (e, t) => {
    await e.connection.sendMessagePromise({
      type: 'vais/settings',
      action: 'clear_new',
      categories: t,
    })
  },
  Ka = async (e) => {
    try {
      return await e.connection.sendMessagePromise({
        type: 'lovelace/resources',
      })
    } catch (e) {
      return null
    }
  },
  Ya = (e) => e.connection.sendMessagePromise({ type: 'lovelace/resources' }),
  Wa = (e, t) => e.callWS({ type: 'lovelace/resources/create', ...t }),
  Xa = (e, t) => e.callWS({ type: 'lovelace/resources/update', ...t }),
  Ja = (e, t) =>
    e.callWS({ type: 'lovelace/resources/delete', resource_id: t }),
  Qa = (e, t, o) =>
    e.connection.subscribeMessage(t, { type: 'vais/subscribe', signal: o })
var es =
  Number.isNaN ||
  function (e) {
    return 'number' == typeof e && e != e
  }
function ts(e, t) {
  if (e.length !== t.length) return !1
  for (var o = 0; o < e.length; o++)
    if (((r = e[o]), (i = t[o]), !(r === i || (es(r) && es(i))))) return !1
  var r, i
  return !0
}
function os(e, t) {
  var o
  void 0 === t && (t = ts)
  var r,
    i = [],
    n = !1
  return function () {
    for (var a = [], s = 0; s < arguments.length; s++) a[s] = arguments[s]
    return (
      (n && o === this && t(a, i)) ||
        ((r = e.apply(this, a)), (n = !0), (o = this), (i = a)),
      r
    )
  }
}
var rs =
    'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z',
  is =
    'M6 8C6 5.79 7.79 4 10 4S14 5.79 14 8 12.21 12 10 12 6 10.21 6 8M10 14C5.58 14 2 15.79 2 18V20H13.09C13.04 19.67 13 19.34 13 19C13 17.36 13.66 15.87 14.74 14.78C13.41 14.29 11.78 14 10 14M23 19L20 16V18H16V20H20V22L23 19Z',
  ns =
    'M11,14C12,14 13.05,14.16 14.2,14.44C13.39,15.31 13,16.33 13,17.5C13,18.39 13.25,19.23 13.78,20H3V18C3,16.81 3.91,15.85 5.74,15.12C7.57,14.38 9.33,14 11,14M11,12C9.92,12 9,11.61 8.18,10.83C7.38,10.05 7,9.11 7,8C7,6.92 7.38,6 8.18,5.18C9,4.38 9.92,4 11,4C12.11,4 13.05,4.38 13.83,5.18C14.61,6 15,6.92 15,8C15,9.11 14.61,10.05 13.83,10.83C13.05,11.61 12.11,12 11,12M18.5,10H20L22,10V12H20V17.5A2.5,2.5 0 0,1 17.5,20A2.5,2.5 0 0,1 15,17.5A2.5,2.5 0 0,1 17.5,15C17.86,15 18.19,15.07 18.5,15.21V10Z',
  as =
    'M11,4A4,4 0 0,1 15,8A4,4 0 0,1 11,12A4,4 0 0,1 7,8A4,4 0 0,1 11,4M11,6A2,2 0 0,0 9,8A2,2 0 0,0 11,10A2,2 0 0,0 13,8A2,2 0 0,0 11,6M11,13C12.1,13 13.66,13.23 15.11,13.69C14.5,14.07 14,14.6 13.61,15.23C12.79,15.03 11.89,14.9 11,14.9C8.03,14.9 4.9,16.36 4.9,17V18.1H13.04C13.13,18.8 13.38,19.44 13.76,20H3V17C3,14.34 8.33,13 11,13M18.5,10H20L22,10V12H20V17.5A2.5,2.5 0 0,1 17.5,20A2.5,2.5 0 0,1 15,17.5A2.5,2.5 0 0,1 17.5,15C17.86,15 18.19,15.07 18.5,15.21V10Z',
  ss =
    'M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z',
  ls =
    'M11 9C8.79 9 7 10.79 7 13S8.79 17 11 17 15 15.21 15 13 13.21 9 11 9M11 15C9.9 15 9 14.11 9 13S9.9 11 11 11 13 11.9 13 13 12.11 15 11 15M7 4H14C16.21 4 18 5.79 18 8V9H16V8C16 6.9 15.11 6 14 6H7C5.9 6 5 6.9 5 8V20H16V18H18V22H3V8C3 5.79 4.79 4 7 4M19 10.5C19 10.5 21 12.67 21 14C21 15.1 20.1 16 19 16S17 15.1 17 14C17 12.67 19 10.5 19 10.5',
  ds =
    'M22.1 21.5L2.4 1.7L1.1 3L3.8 5.7C3.3 6.3 3 7.1 3 8V22H18V19.9L20.8 22.7L22.1 21.5M9.6 11.5L12.4 14.3C12.1 14.7 11.6 15 11 15C9.9 15 9 14.1 9 13C9 12.4 9.3 11.9 9.6 11.5M16 17.9V20H5V8C5 7.7 5.1 7.4 5.2 7.1L8.2 10.1C7.5 10.8 7 11.9 7 13C7 15.2 8.8 17 11 17C12.1 17 13.2 16.5 13.9 15.8L16 17.9M17 13.8C17.1 12.5 19 10.5 19 10.5S21 12.7 21 14C21 15 20.2 15.9 19.2 16L17 13.8M9.2 6L7.2 4H14C16.2 4 18 5.8 18 8V9H16V8C16 6.9 15.1 6 14 6H9.2Z',
  cs =
    'M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12,16.5C9.5,16.5 7.5,14.5 7.5,12C7.5,9.5 9.5,7.5 12,7.5C14.5,7.5 16.5,9.5 16.5,12C16.5,14.5 14.5,16.5 12,16.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
  ps = 'M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z',
  us =
    'M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
  ms =
    'M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z',
  hs =
    'M2.2,16.06L3.88,12L2.2,7.94L6.26,6.26L7.94,2.2L12,3.88L16.06,2.2L17.74,6.26L21.8,7.94L20.12,12L21.8,16.06L17.74,17.74L16.06,21.8L12,20.12L7.94,21.8L6.26,17.74L2.2,16.06M13,17V15H11V17H13M13,13V7H11V13H13Z',
  gs = 'M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16',
  _s =
    'M20,19H4.09L14.18,4.43L15.82,5.57L11.28,12.13C12.89,12.96 14,14.62 14,16.54C14,16.7 14,16.85 13.97,17H20V19M7.91,17H11.96C12,16.85 12,16.7 12,16.54C12,15.28 11.24,14.22 10.14,13.78L7.91,17Z',
  fs =
    'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,14.09 4.8,16 6.11,17.41L9.88,9.88L17.41,6.11C16,4.8 14.09,4 12,4M12,20A8,8 0 0,0 20,12C20,9.91 19.2,8 17.89,6.59L14.12,14.12L6.59,17.89C8,19.2 9.91,20 12,20M12,12L11.23,11.23L9.7,14.3L12.77,12.77L12,12M12,17.5H13V19H12V17.5M15.88,15.89L16.59,15.18L17.65,16.24L16.94,16.95L15.88,15.89M17.5,12V11H19V12H17.5M12,6.5H11V5H12V6.5M8.12,8.11L7.41,8.82L6.35,7.76L7.06,7.05L8.12,8.11M6.5,12V13H5V12H6.5Z',
  ys =
    'M21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V4C23 2.9 22.1 2 21 2M21 7H3V4H21V7Z',
  bs =
    'M13,20V4H15.03V20H13M10,20V4H12.03V20H10M5,8L9.03,12L5,16V13H2V11H5V8M20,16L16,12L20,8V11H23V13H20V16Z',
  vs =
    'M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z',
  Cs = 'M9,4H15V12H19.84L12,19.84L4.16,12H9V4Z',
  As =
    'M3,5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5M11,6V14.5L7.5,11L6.08,12.42L12,18.34L17.92,12.42L16.5,11L13,14.5V6H11Z',
  ws =
    'M11,6V14L7.5,10.5L6.08,11.92L12,17.84L17.92,11.92L16.5,10.5L13,14V6H11M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22Z',
  Hs = 'M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z',
  ks =
    'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z',
  Ss =
    'M18,16V13H15V22H13V2H15V11H18V8L22,12L18,16M2,12L6,16V13H9V22H11V2H9V11H6V8L2,12Z',
  Ls = 'M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z',
  xs =
    'M21,19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19C20.11,3 21,3.9 21,5V19M13,18V9.5L16.5,13L17.92,11.58L12,5.66L6.08,11.58L7.5,13L11,9.5V18H13Z',
  Vs =
    'M21.5 9.5L20.09 10.92L17 7.83V13.5C17 17.09 14.09 20 10.5 20H4V18H10.5C13 18 15 16 15 13.5V7.83L11.91 10.91L10.5 9.5L16 4L21.5 9.5Z',
  Es =
    'M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  Ms =
    'M16,18H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  Ps =
    'M16,17H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  Ts =
    'M16,15H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  zs =
    'M16,14H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  Ns =
    'M16,13H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  Is =
    'M16,12H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  Os =
    'M16,10H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  Rs =
    'M16,9H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  Ds =
    'M16,8H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  js =
    'M13 14H11V8H13M13 18H11V16H13M16.7 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.6 22 7.3 22H16.6C17.3 22 17.9 21.4 17.9 20.7V5.3C18 4.6 17.4 4 16.7 4Z',
  Bs =
    'M14 20H6V6H14M14.67 4H13V2H7V4H5.33C4.6 4 4 4.6 4 5.33V20.67C4 21.4 4.6 22 5.33 22H14.67C15.4 22 16 21.4 16 20.67V5.33C16 4.6 15.4 4 14.67 4M21 7H19V13H21V8M21 15H19V17H21V15Z',
  $s =
    'M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15',
  Fs =
    'M23.05,11H20.05V4L15.05,14H18.05V22M12,18H4L4.05,6H12.05M12.72,4H11.05V2H5.05V4H3.38A1.33,1.33 0 0,0 2.05,5.33V20.67C2.05,21.4 2.65,22 3.38,22H12.72C13.45,22 14.05,21.4 14.05,20.67V5.33A1.33,1.33 0 0,0 12.72,4Z',
  Us =
    'M23.05,11H20.05V4L15.05,14H18.05V22M12.05,17H4.05V6H12.05M12.72,4H11.05V2H5.05V4H3.38A1.33,1.33 0 0,0 2.05,5.33V20.67C2.05,21.4 2.65,22 3.38,22H12.72C13.45,22 14.05,21.4 14.05,20.67V5.33A1.33,1.33 0 0,0 12.72,4Z',
  Zs =
    'M12,15H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4M23,11H20V4L15,14H18V22L23,11Z',
  qs =
    'M13 4H11V2H5V4H3C2.4 4 2 4.4 2 5V21C2 21.6 2.4 22 3 22H13C13.6 22 14 21.6 14 21V5C14 4.4 13.6 4 13 4M12 14.5H4V6H12V14.5M23 11H20V4L15 14H18V22',
  Gs =
    'M23,11H20V4L15,14H18V22M12,13H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z',
  Ks =
    'M12,11H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4M23,11H20V4L15,14H18V22L23,11Z',
  Ys =
    'M12,10H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4M23,11H20V4L15,14H18V22L23,11Z',
  Ws =
    'M23,11H20V4L15,14H18V22M12,9H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z',
  Xs =
    'M23,11H20V4L15,14H18V22M12,8H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z',
  Js =
    'M23.05,11H20.05V4L15.05,14H18.05V22M12,20H4L4.05,6H12.05M12.72,4H11.05V2H5.05V4H3.38A1.33,1.33 0 0,0 2.05,5.33V20.67C2.05,21.4 2.65,22 3.38,22H12.72C13.45,22 14.05,21.4 14.05,20.67V5.33A1.33,1.33 0 0,0 12.72,4Z',
  Qs =
    'M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z',
  el =
    'M15.07,12.25L14.17,13.17C13.63,13.71 13.25,14.18 13.09,15H11.05C11.16,14.1 11.56,13.28 12.17,12.67L13.41,11.41C13.78,11.05 14,10.55 14,10C14,8.89 13.1,8 12,8A2,2 0 0,0 10,10H8A4,4 0 0,1 12,6A4,4 0 0,1 16,10C16,10.88 15.64,11.68 15.07,12.25M13,19H11V17H13M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.67C17.4,22 18,21.4 18,20.66V5.33C18,4.59 17.4,4 16.67,4Z',
  tl =
    'M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21',
  ol =
    'M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z',
  rl =
    'M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z',
  il =
    'M3 2H21C21.55 2 22 2.45 22 3V5C22 5.55 21.55 6 21 6H20V7C20 7.55 19.55 8 19 8H13V10.17C14.17 10.58 15 11.7 15 13C15 14.66 13.66 16 12 16C10.34 16 9 14.66 9 13C9 11.69 9.84 10.58 11 10.17V8H5C4.45 8 4 7.55 4 7V6H3C2.45 6 2 5.55 2 5V3C2 2.45 2.45 2 3 2M12 12C11.45 12 11 12.45 11 13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13C13 12.45 12.55 12 12 12Z',
  nl =
    'M14.88,16.29L13,18.17V14.41M13,5.83L14.88,7.71L13,9.58M17.71,7.71L12,2H11V9.58L6.41,5L5,6.41L10.59,12L5,17.58L6.41,19L11,14.41V22H12L17.71,16.29L13.41,12L17.71,7.71Z',
  al =
    'M19,10L17,12L19,14L21,12M14.88,16.29L13,18.17V14.41M13,5.83L14.88,7.71L13,9.58M17.71,7.71L12,2H11V9.58L6.41,5L5,6.41L10.59,12L5,17.58L6.41,19L11,14.41V22H12L17.71,16.29L13.41,12M7,12L5,10L3,12L5,14L7,12Z',
  sl = 'M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z',
  ll =
    'M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z',
  dl =
    'M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z',
  cl =
    'M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z',
  pl =
    'M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z',
  ul =
    'M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z',
  ml =
    'M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z',
  hl =
    'M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3Z',
  gl =
    'M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M19,7H5V8.63C8.96,9.91 12.09,13.04 13.37,17H19M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18Z',
  _l = 'M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z',
  fl =
    'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z',
  yl =
    'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z',
  bl =
    'M15,20A1,1 0 0,0 14,19H13V17H17A2,2 0 0,0 19,15V5A2,2 0 0,0 17,3H7A2,2 0 0,0 5,5V15A2,2 0 0,0 7,17H11V19H10A1,1 0 0,0 9,20H2V22H9A1,1 0 0,0 10,23H14A1,1 0 0,0 15,22H22V20H15M7,15V5H17V15H7M8,10.37L9.24,9.13L10.93,10.83L14.76,7L16,8.5L10.93,13.57L8,10.37Z',
  vl =
    'M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
  Cl =
    'M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z',
  Al = 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z',
  wl = 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z',
  Hl = 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
  kl =
    'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
  Sl =
    'M12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z',
  Ll =
    'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z',
  xl =
    'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
  Vl =
    'M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z',
  El =
    'M15,20A1,1 0 0,0 14,19H13V17H17A2,2 0 0,0 19,15V5A2,2 0 0,0 17,3H7A2,2 0 0,0 5,5V15A2,2 0 0,0 7,17H11V19H10A1,1 0 0,0 9,20H2V22H9A1,1 0 0,0 10,23H14A1,1 0 0,0 15,22H22V20H15M7,15V5H17V15H7M15.54,12.12L13.41,10L15.53,7.87L14.12,6.46L12,8.59L9.88,6.46L8.47,7.87L10.59,10L8.47,12.13L9.88,13.54L12,11.41L14.12,13.54L15.54,12.12Z',
  Ml =
    'M14,13V17H10V13H7L12,8L17,13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z',
  Pl =
    'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z',
  Tl =
    'M9 22C8.4 22 8 21.6 8 21V18H4C2.9 18 2 17.1 2 16V4C2 2.9 2.9 2 4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H13.9L10.2 21.7C10 21.9 9.8 22 9.5 22H9M13 11V5H11V11M13 15V13H11V15H13Z',
  zl =
    'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z',
  Nl =
    'M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z',
  Il =
    'M17,19H7V5H17M17,3H7A2,2 0 0,0 5,5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V5C19,3.89 18.1,3 17,3Z',
  Ol =
    'M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z',
  Rl =
    'M12.43 11C12.28 10.84 10 7 7 7S2.32 10.18 2 11V13H11.57C11.72 13.16 14 17 17 17S21.68 13.82 22 13V11H12.43M7 9C8.17 9 9.18 9.85 10 11H4.31C4.78 10.17 5.54 9 7 9M17 15C15.83 15 14.82 14.15 14 13H19.69C19.22 13.83 18.46 15 17 15Z',
  Dl =
    'M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z',
  jl = 'M23 3H1V1H23V3M2 22H11V4H2V22M22 4H13V22H22V4Z',
  Bl =
    'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
  $l =
    'M3 6H21V4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H7V18H3V6M13 12H9V13.78C8.39 14.33 8 15.11 8 16C8 16.89 8.39 17.67 9 18.22V20H13V18.22C13.61 17.67 14 16.88 14 16S13.61 14.33 13 13.78V12M11 17.5C10.17 17.5 9.5 16.83 9.5 16S10.17 14.5 11 14.5 12.5 15.17 12.5 16 11.83 17.5 11 17.5M22 8H16C15.5 8 15 8.5 15 9V19C15 19.5 15.5 20 16 20H22C22.5 20 23 19.5 23 19V9C23 8.5 22.5 8 22 8M21 18H17V10H21V18Z',
  Fl =
    'M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z',
  Ul =
    'M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z',
  Zl =
    'M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z',
  ql =
    'M8.11,19.45C5.94,18.65 4.22,16.78 3.71,14.35L2.05,6.54C1.81,5.46 2.5,4.4 3.58,4.17L13.35,2.1L13.38,2.09C14.45,1.88 15.5,2.57 15.72,3.63L16.07,5.3L20.42,6.23H20.45C21.5,6.47 22.18,7.53 21.96,8.59L20.3,16.41C19.5,20.18 15.78,22.6 12,21.79C10.42,21.46 9.08,20.61 8.11,19.45V19.45M20,8.18L10.23,6.1L8.57,13.92V13.95C8,16.63 9.73,19.27 12.42,19.84C15.11,20.41 17.77,18.69 18.34,16L20,8.18M16,16.5C15.37,17.57 14.11,18.16 12.83,17.89C11.56,17.62 10.65,16.57 10.5,15.34L16,16.5M8.47,5.17L4,6.13L5.66,13.94L5.67,13.97C5.82,14.68 6.12,15.32 6.53,15.87C6.43,15.1 6.45,14.3 6.62,13.5L7.05,11.5C6.6,11.42 6.21,11.17 6,10.81C6.06,10.2 6.56,9.66 7.25,9.5C7.33,9.5 7.4,9.5 7.5,9.5L8.28,5.69C8.32,5.5 8.38,5.33 8.47,5.17M15.03,12.23C15.35,11.7 16.03,11.42 16.72,11.57C17.41,11.71 17.91,12.24 18,12.86C17.67,13.38 17,13.66 16.3,13.5C15.61,13.37 15.11,12.84 15.03,12.23M10.15,11.19C10.47,10.66 11.14,10.38 11.83,10.53C12.5,10.67 13.03,11.21 13.11,11.82C12.78,12.34 12.11,12.63 11.42,12.5C10.73,12.33 10.23,11.8 10.15,11.19M11.97,4.43L13.93,4.85L13.77,4.05L11.97,4.43Z',
  Gl = 'M10 3H14V14H10V3M10 21V17H14V21H10Z',
  Kl =
    'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z',
  Yl =
    'M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z',
  Wl =
    'M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z',
  Xl =
    'M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z',
  Jl =
    'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13,13H11V18A2,2 0 0,1 9,20A2,2 0 0,1 7,18A2,2 0 0,1 9,16C9.4,16 9.7,16.1 10,16.3V11H13V13M13,9V3.5L18.5,9H13Z',
  Ql =
    'M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z',
  ed = 'M7,2V13H10V22L17,10H13L17,2H7Z',
  td =
    'M3,13A9,9 0 0,0 12,22C12,17 7.97,13 3,13M12,5.5A2.5,2.5 0 0,1 14.5,8A2.5,2.5 0 0,1 12,10.5A2.5,2.5 0 0,1 9.5,8A2.5,2.5 0 0,1 12,5.5M5.6,10.25A2.5,2.5 0 0,0 8.1,12.75C8.63,12.75 9.12,12.58 9.5,12.31C9.5,12.37 9.5,12.43 9.5,12.5A2.5,2.5 0 0,0 12,15A2.5,2.5 0 0,0 14.5,12.5C14.5,12.43 14.5,12.37 14.5,12.31C14.88,12.58 15.37,12.75 15.9,12.75C17.28,12.75 18.4,11.63 18.4,10.25C18.4,9.25 17.81,8.4 16.97,8C17.81,7.6 18.4,6.74 18.4,5.75C18.4,4.37 17.28,3.25 15.9,3.25C15.37,3.25 14.88,3.41 14.5,3.69C14.5,3.63 14.5,3.56 14.5,3.5A2.5,2.5 0 0,0 12,1A2.5,2.5 0 0,0 9.5,3.5C9.5,3.56 9.5,3.63 9.5,3.69C9.12,3.41 8.63,3.25 8.1,3.25A2.5,2.5 0 0,0 5.6,5.75C5.6,6.74 6.19,7.6 7.03,8C6.19,8.4 5.6,9.25 5.6,10.25M12,22A9,9 0 0,0 21,13C16,13 12,17 12,22Z',
  od =
    'M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z',
  rd =
    'M3,4C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H11V18.11L21,8.11V8C21,6.89 20.1,6 19,6H11L9,4H3M21.04,11.13C20.9,11.13 20.76,11.19 20.65,11.3L19.65,12.3L21.7,14.35L22.7,13.35C22.92,13.14 22.92,12.79 22.7,12.58L21.42,11.3C21.31,11.19 21.18,11.13 21.04,11.13M19.07,12.88L13,18.94V21H15.06L21.12,14.93L19.07,12.88Z',
  id =
    'M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20Z',
  nd =
    'M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z',
  ad =
    'M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z',
  sd =
    'M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z',
  ld = 'M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z',
  dd =
    'M16,9V14L16,20A2,2 0 0,1 14,22H10A2,2 0 0,1 8,20V14L8,9C8,7.14 9.27,5.57 11,5.13V4H9V2H15V4H13V5.13C14.73,5.57 16,7.14 16,9Z',
  cd =
    'M9 6V11H7V7H5V11H3V9H1V21H3V19H5V21H7V19H9V21H11V19H13V21H15V19H17V21H19V19H21V21H23V9H21V11H19V7H17V11H15V6H13V11H11V6H9M3 13H5V17H3V13M7 13H9V17H7V13M11 13H13V17H11V13M15 13H17V17H15V13M19 13H21V17H19V13Z',
  pd =
    'M15 6V11H13V7H11V11H9V9H7V21H9V19H11V21H12.09C12.03 20.67 12 20.34 12 20C12 18.82 12.35 17.67 13 16.69V13H15V14.81C15.62 14.45 16.3 14.21 17 14.09V13H19V14.09C19.7 14.21 20.38 14.45 21 14.81V13H22V11H21V6H19V11H17V6H15M9 13H11V17H9V13M19 17V19H15V21H19V23L22 20L19 17Z',
  ud =
    'M7 21V7H5V11H3V9H1V21H3V19H5V21H7M3 17V13H5V17H3M21 9V11H19V7H17V21H19V19H21V21H23V9H21M21 17H19V13H21V17Z',
  md =
    'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z',
  hd =
    'M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z',
  gd =
    'M2.6,10.59L8.38,4.8L10.07,6.5C9.83,7.35 10.22,8.28 11,8.73V14.27C10.4,14.61 10,15.26 10,16A2,2 0 0,0 12,18A2,2 0 0,0 14,16C14,15.26 13.6,14.61 13,14.27V9.41L15.07,11.5C15,11.65 15,11.82 15,12A2,2 0 0,0 17,14A2,2 0 0,0 19,12A2,2 0 0,0 17,10C16.82,10 16.65,10 16.5,10.07L13.93,7.5C14.19,6.57 13.71,5.55 12.78,5.16C12.35,5 11.9,4.96 11.5,5.07L9.8,3.38L10.59,2.6C11.37,1.81 12.63,1.81 13.41,2.6L21.4,10.59C22.19,11.37 22.19,12.63 21.4,13.41L13.41,21.4C12.63,22.19 11.37,22.19 10.59,21.4L2.6,13.41C1.81,12.63 1.81,11.37 2.6,10.59Z',
  _d =
    'M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z',
  fd =
    'M7,2A6,6 0 0,0 1,8A6,6 0 0,0 7,14A6,6 0 0,0 13,8A6,6 0 0,0 7,2M21.5,6A1.5,1.5 0 0,0 20,7.5A1.5,1.5 0 0,0 21.5,9A1.5,1.5 0 0,0 23,7.5A1.5,1.5 0 0,0 21.5,6M17,8A3,3 0 0,0 14,11A3,3 0 0,0 17,14A3,3 0 0,0 20,11A3,3 0 0,0 17,8M17,15A3.5,3.5 0 0,0 13.5,18.5A3.5,3.5 0 0,0 17,22A3.5,3.5 0 0,0 20.5,18.5A3.5,3.5 0 0,0 17,15Z',
  yd =
    'M15,12C13.89,12 13,12.89 13,14A2,2 0 0,0 15,16A2,2 0 0,0 17,14C17,12.89 16.1,12 15,12M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M14,9C14,7.89 13.1,7 12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9M9,12A2,2 0 0,0 7,14A2,2 0 0,0 9,16A2,2 0 0,0 11,14C11,12.89 10.1,12 9,12Z',
  bd =
    'M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z',
  vd = 'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z',
  Cd =
    'M21.8,13H20V21H13V17.67L15.79,14.88L16.5,15C17.66,15 18.6,14.06 18.6,12.9C18.6,11.74 17.66,10.8 16.5,10.8A2.1,2.1 0 0,0 14.4,12.9L14.5,13.61L13,15.13V9.65C13.66,9.29 14.1,8.6 14.1,7.8A2.1,2.1 0 0,0 12,5.7A2.1,2.1 0 0,0 9.9,7.8C9.9,8.6 10.34,9.29 11,9.65V15.13L9.5,13.61L9.6,12.9A2.1,2.1 0 0,0 7.5,10.8A2.1,2.1 0 0,0 5.4,12.9A2.1,2.1 0 0,0 7.5,15L8.21,14.88L11,17.67V21H4V13H2.25C1.83,13 1.42,13 1.42,12.79C1.43,12.57 1.85,12.15 2.28,11.72L11,3C11.33,2.67 11.67,2.33 12,2.33C12.33,2.33 12.67,2.67 13,3L17,7V6H19V9L21.78,11.78C22.18,12.18 22.59,12.59 22.6,12.8C22.6,13 22.2,13 21.8,13M7.5,12A0.9,0.9 0 0,1 8.4,12.9A0.9,0.9 0 0,1 7.5,13.8A0.9,0.9 0 0,1 6.6,12.9A0.9,0.9 0 0,1 7.5,12M16.5,12C17,12 17.4,12.4 17.4,12.9C17.4,13.4 17,13.8 16.5,13.8A0.9,0.9 0 0,1 15.6,12.9A0.9,0.9 0 0,1 16.5,12M12,6.9C12.5,6.9 12.9,7.3 12.9,7.8C12.9,8.3 12.5,8.7 12,8.7C11.5,8.7 11.1,8.3 11.1,7.8C11.1,7.3 11.5,6.9 12,6.9Z',
  Ad =
    'M12,3L2,12H5V20H19V12H22L12,3M12,8.5C14.34,8.5 16.46,9.43 18,10.94L16.8,12.12C15.58,10.91 13.88,10.17 12,10.17C10.12,10.17 8.42,10.91 7.2,12.12L6,10.94C7.54,9.43 9.66,8.5 12,8.5M12,11.83C13.4,11.83 14.67,12.39 15.6,13.3L14.4,14.47C13.79,13.87 12.94,13.5 12,13.5C11.06,13.5 10.21,13.87 9.6,14.47L8.4,13.3C9.33,12.39 10.6,11.83 12,11.83M12,15.17C12.94,15.17 13.7,15.91 13.7,16.83C13.7,17.75 12.94,18.5 12,18.5C11.06,18.5 10.3,17.75 10.3,16.83C10.3,15.91 11.06,15.17 12,15.17Z',
  wd =
    'M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22',
  Hd =
    'M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z',
  kd =
    'M18,8H6V18H18M20,20H4V6H8.5L12.04,2.5L15.5,6H20M20,4H16L12,0L8,4H4A2,2 0 0,0 2,6V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V6A2,2 0 0,0 20,4Z',
  Sd =
    'M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
  Ld =
    'M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z',
  xd =
    'M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M3,13V18L3,20H10V18H5V13H3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M14,15H20V19H14V15Z',
  Vd =
    'M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M3.88,13.46L2.46,14.88L4.59,17L2.46,19.12L3.88,20.54L6,18.41L8.12,20.54L9.54,19.12L7.41,17L9.54,14.88L8.12,13.46L6,15.59L3.88,13.46M14,15H20V19H14V15Z',
  Ed =
    'M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z',
  Md =
    'M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z',
  Pd = 'M11 15H6L13 1V9H18L11 23V15Z',
  Td =
    'M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z',
  zd =
    'M10 17C11.1 17 12 16.1 12 15C12 13.9 11.1 13 10 13C8.9 13 8 13.9 8 15S8.9 17 10 17M16 8C17.1 8 18 8.9 18 10V20C18 21.1 17.1 22 16 22H4C2.9 22 2 21.1 2 20V10C2 8.9 2.9 8 4 8H5V6C5 3.2 7.2 1 10 1S15 3.2 15 6V8H16M10 3C8.3 3 7 4.3 7 6V8H13V6C13 4.3 11.7 3 10 3M22 13H20V7H22V13M22 17H20V15H22V17Z',
  Nd =
    'M8.5,2C6,2 4,4 4,6.5V7C2.89,7 2,7.89 2,9V18C2,19.11 2.89,20 4,20H8.72C10.18,21.29 12.06,22 14,22A8,8 0 0,0 22,14A8,8 0 0,0 14,6C13.66,6 13.32,6.03 13,6.08C12.76,3.77 10.82,2 8.5,2M8.5,4A2.5,2.5 0 0,1 11,6.5V7H6V6.5A2.5,2.5 0 0,1 8.5,4M14,8A6,6 0 0,1 20,14A6,6 0 0,1 14,20A6,6 0 0,1 8,14A6,6 0 0,1 14,8M13,10V15L16.64,17.19L17.42,15.9L14.5,14.15V10H13Z',
  Id =
    'M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z',
  Od =
    'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z',
  Rd =
    'M17,4H7A5,5 0 0,0 2,9V20H20A2,2 0 0,0 22,18V9A5,5 0 0,0 17,4M10,18H4V9A3,3 0 0,1 7,6A3,3 0 0,1 10,9V18M19,15H17V13H13V11H19V15M9,11H5V9H9V11Z',
  Dd =
    'M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z',
  jd = 'M7,10L12,15L17,10H7Z',
  Bd = 'M7,15L12,10L17,15H7Z',
  $d =
    'M7.27,10L9,7H14.42L15.58,5L15.5,4.5A1.5,1.5 0 0,1 17,3A1.5,1.5 0 0,1 18.5,4.5C18.5,5.21 18,5.81 17.33,5.96L16.37,7.63L17.73,10L18.59,8.5L18.5,8A1.5,1.5 0 0,1 20,6.5A1.5,1.5 0 0,1 21.5,8C21.5,8.71 21,9.3 20.35,9.46L18.89,12L20.62,15C21.39,15.07 22,15.71 22,16.5A1.5,1.5 0 0,1 20.5,18A1.5,1.5 0 0,1 19,16.5V16.24L17.73,14L16.37,16.37L17.33,18.04C18,18.19 18.5,18.79 18.5,19.5A1.5,1.5 0 0,1 17,21A1.5,1.5 0 0,1 15.5,19.5L15.58,19L14.42,17H10.58L9.42,19L9.5,19.5A1.5,1.5 0 0,1 8,21A1.5,1.5 0 0,1 6.5,19.5C6.5,18.79 7,18.19 7.67,18.04L8.63,16.37L4.38,9C3.61,8.93 3,8.29 3,7.5A1.5,1.5 0 0,1 4.5,6A1.5,1.5 0 0,1 6,7.5C6,7.59 6,7.68 6,7.76L7.27,10M10.15,9L8.42,12L10.15,15H14.85L16.58,12L14.85,9H10.15Z',
  Fd =
    'M8 7C6.9 7 6 7.9 6 9V15C6 16.11 6.9 17 8 17H11V15H8V9H11V7H8M14 7C12.9 7 12 7.9 12 9V15C12 16.11 12.9 17 14 17H16C17.11 17 18 16.11 18 15V9C18 7.9 17.11 7 16 7H14M14 9H16V15H14V9',
  Ud =
    'M5,7A2,2 0 0,0 3,9V15A2,2 0 0,0 5,17H8V15H5V9H8V7H5M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9M16,10.5V12H19V13.5H17.5A1.5,1.5 0 0,0 16,15V18H20.5V16.5H17.5V15H19A1.5,1.5 0 0,0 20.5,13.5V12A1.5,1.5 0 0,0 19,10.5H16Z',
  Zd =
    'M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z',
  qd =
    'M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z',
  Gd =
    'M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V4H18Z',
  Kd =
    'M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z',
  Yd =
    'M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z',
  Wd =
    'M4.27 3L3 4.27L12 13.27V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V15.27L19.73 21L21 19.73L4.27 3M14 7H18V3H12V8.18L14 10.18Z',
  Xd =
    'M5.12,5H18.87L17.93,4H5.93L5.12,5M20.54,5.23C20.83,5.57 21,6 21,6.5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V6.5C3,6 3.17,5.57 3.46,5.23L4.84,3.55C5.12,3.21 5.53,3 6,3H18C18.47,3 18.88,3.21 19.15,3.55L20.54,5.23M6,18H12V15H6V18Z',
  Jd =
    'M5.12,5L5.93,4H17.93L18.87,5M12,17.5L6.5,12H10V10H14V12H17.5L12,17.5M20.54,5.23L19.15,3.55C18.88,3.21 18.47,3 18,3H6C5.53,3 5.12,3.21 4.84,3.55L3.46,5.23C3.17,5.57 3,6 3,6.5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V6.5C21,6 20.83,5.57 20.54,5.23Z',
  Qd =
    'M20.54,5.23C20.83,5.57 21,6 21,6.5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V6.5C3,6 3.17,5.57 3.46,5.23L4.84,3.55C5.12,3.21 5.53,3 6,3H18C18.47,3 18.88,3.21 19.15,3.55L20.54,5.23M5.12,5H18.87L17.93,4H5.93L5.12,5M12,9.5L6.5,15H10V17H14V15H17.5L12,9.5Z',
  ec =
    'M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z',
  tc = 'M8,5.14V19.14L19,12.14L8,5.14Z',
  oc =
    'M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3M10 16V8L15 12',
  rc =
    'M15,6H3V8H15V6M15,10H3V12H15V10M3,16H11V14H3V16M17,6V14.18C16.69,14.07 16.35,14 16,14A3,3 0 0,0 13,17A3,3 0 0,0 16,20A3,3 0 0,0 19,17V8H22V6H17Z',
  ic = 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z',
  nc =
    'M17,18.25V21.5H7V18.25C7,16.87 9.24,15.75 12,15.75C14.76,15.75 17,16.87 17,18.25M12,5.5A6.5,6.5 0 0,1 18.5,12C18.5,13.25 18.15,14.42 17.54,15.41L16,14.04C16.32,13.43 16.5,12.73 16.5,12C16.5,9.5 14.5,7.5 12,7.5C9.5,7.5 7.5,9.5 7.5,12C7.5,12.73 7.68,13.43 8,14.04L6.46,15.41C5.85,14.42 5.5,13.25 5.5,12A6.5,6.5 0 0,1 12,5.5M12,1.5A10.5,10.5 0 0,1 22.5,12C22.5,14.28 21.77,16.39 20.54,18.11L19.04,16.76C19.96,15.4 20.5,13.76 20.5,12A8.5,8.5 0 0,0 12,3.5A8.5,8.5 0 0,0 3.5,12C3.5,13.76 4.04,15.4 4.96,16.76L3.46,18.11C2.23,16.39 1.5,14.28 1.5,12A10.5,10.5 0 0,1 12,1.5M12,9.5A2.5,2.5 0 0,1 14.5,12A2.5,2.5 0 0,1 12,14.5A2.5,2.5 0 0,1 9.5,12A2.5,2.5 0 0,1 12,9.5Z',
  ac =
    'M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z',
  sc =
    'M20.84 22.73L15.31 17.2L14.5 18V21H9.5V18L6 14.5V9C6 8.7 6.1 8.41 6.25 8.14L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14.5V9C18 8 17 7 16 7V3H14V7H10.2L17.85 14.65L18 14.5M10 3H8V4.8L10 6.8V3Z',
  lc =
    'M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
  dc =
    'M2,11H9.17C9.58,9.83 10.69,9 12,9C13.31,9 14.42,9.83 14.83,11H22V13H14.83C14.42,14.17 13.31,15 12,15C10.69,15 9.58,14.17 9.17,13H2V11Z',
  cc =
    'M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z',
  pc =
    'M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z',
  uc =
    'M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z',
  mc =
    'M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z',
  hc =
    'M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z',
  gc =
    'M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z',
  _c =
    'M12,12H19C18.47,16.11 15.72,19.78 12,20.92V12H5V6.3L12,3.19M12,1L3,5V11C3,16.55 6.84,21.73 12,23C17.16,21.73 21,16.55 21,11V5L12,1Z',
  fc =
    'M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z',
  yc =
    'M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5.68C12.5,5.68 12.95,6.11 12.95,6.63V10.11L18,13.26V14.53L12.95,12.95V16.42L14.21,17.37V18.32L12,17.68L9.79,18.32V17.37L11.05,16.42V12.95L6,14.53V13.26L11.05,10.11V6.63C11.05,6.11 11.5,5.68 12,5.68Z',
  bc =
    'M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z',
  vc =
    'M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z',
  Cc =
    'M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M15.97 14.41C14.13 16.58 10.76 16.5 9 14.34C6.82 11.62 8.36 7.62 11.7 7C12.04 6.95 12.33 7.28 12.21 7.61C11.75 8.84 11.82 10.25 12.53 11.47C13.24 12.69 14.42 13.46 15.71 13.67C16.05 13.72 16.2 14.14 15.97 14.41Z',
  Ac =
    'M1,4.27L2.28,3L20.5,21.22L19.23,22.5L17,20.25C15.57,21.57 13.87,22.54 12,23C6.84,21.74 3,16.55 3,11V6.27L1,4.27M12,1L21,5V11C21,13.28 20.35,15.5 19.23,17.41L5.65,3.82L12,1Z',
  wc =
    'M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21Z',
  Hc =
    'M16.5,21C13.5,21 12.31,16.76 11.05,12.28C10.14,9.04 9,5 7.5,5C4.11,5 4,11.93 4,12H2C2,11.63 2.06,3 7.5,3C10.5,3 11.71,7.25 12.97,11.74C13.83,14.8 15,19 16.5,19C19.94,19 20.03,12.07 20.03,12H22.03C22.03,12.37 21.97,21 16.5,21Z',
  kc =
    'M12,18A6,6 0 0,0 18,12C18,8.68 15.31,6 12,6C8.68,6 6,8.68 6,12A6,6 0 0,0 12,18M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19M8,12A4,4 0 0,1 12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12Z',
  Sc =
    'M10 18C13.3 18 16 15.3 16 12C16 8.7 13.3 6 10 6C6.7 6 4 8.7 4 12C4 15.3 6.7 18 10 18M17 3C18.1 3 19 3.9 19 5V19C19 20.1 18.1 21 17 21H3C1.9 21 1 20.1 1 19V5C1 3.9 1.9 3 3 3H17M6 12C6 9.8 7.8 8 10 8S14 9.8 14 12 12.2 16 10 16 6 14.2 6 12M23 7H21V13H23V8M23 15H21V17H23V15Z',
  Lc =
    'M12 4C16.41 4 20 7.59 20 12S16.41 20 12 20 4 16.41 4 12 7.59 4 12 4M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 11C11.45 11 11 11.45 11 12S11.45 13 12 13 13 12.55 13 12 12.55 11 12 11M10.72 9.3C11.11 9.11 11.54 9 12 9S12.89 9.11 13.29 9.3L14 8.57C13.43 8.22 12.74 8 12 8S10.58 8.22 10 8.57L10.72 9.3M15 12C15 12.46 14.89 12.89 14.7 13.29L15.43 14C15.79 13.43 16 12.74 16 12S15.79 10.58 15.43 10L14.7 10.72C14.89 11.11 15 11.54 15 12M9 12C9 11.54 9.11 11.11 9.3 10.72L8.57 10C8.22 10.58 8 11.26 8 12S8.22 13.43 8.57 14L9.3 13.29C9.11 12.89 9 12.46 9 12M13.29 14.7C12.89 14.89 12.46 15 12 15S11.11 14.89 10.72 14.7L10 15.43C10.58 15.79 11.26 16 12 16S13.43 15.79 14 15.43L13.29 14.7M16.89 8.53L16.17 9.25C16.69 10.04 17 11 17 12S16.69 13.96 16.17 14.75L16.89 15.47C17.59 14.5 18 13.3 18 12S17.59 9.5 16.89 8.53M9.25 7.83C10.04 7.31 11 7 12 7S13.96 7.31 14.75 7.83L15.47 7.11C14.5 6.42 13.3 6 12 6S9.5 6.42 8.53 7.11L9.25 7.83M14.75 16.17C13.96 16.69 13 17 12 17S10.04 16.69 9.25 16.17L8.53 16.89C9.5 17.59 10.7 18 12 18S14.5 17.59 15.47 16.89L14.75 16.17M7.83 14.75C7.31 13.96 7 13 7 12S7.31 10.04 7.83 9.25L7.11 8.53C6.42 9.5 6 10.7 6 12S6.42 14.5 7.11 15.47L7.83 14.75Z',
  xc =
    'M10 4C14.4 4 18 7.6 18 12S14.4 20 10 20 2 16.4 2 12 5.6 4 10 4M10 2C4.5 2 0 6.5 0 12S4.5 22 10 22 20 17.5 20 12 15.5 2 10 2M10 11C9.4 11 9 11.4 9 12S9.4 13 10 13 11 12.6 11 12 10.6 11 10 11M8.7 9.3C9.1 9.1 9.5 9 10 9S10.9 9.1 11.3 9.3L12 8.6C11.4 8.2 10.7 8 10 8S8.6 8.2 8 8.6L8.7 9.3M13 12C13 12.5 12.9 12.9 12.7 13.3L13.4 14C13.8 13.4 14 12.7 14 12S13.8 10.6 13.4 10L12.7 10.7C12.9 11.1 13 11.5 13 12M7 12C7 11.5 7.1 11.1 7.3 10.7L6.6 10C6.2 10.6 6 11.3 6 12S6.2 13.4 6.6 14L7.3 13.3C7.1 12.9 7 12.5 7 12M11.3 14.7C10.9 14.9 10.5 15 10 15S9.1 14.9 8.7 14.7L8 15.4C8.6 15.8 9.3 16 10 16S11.4 15.8 12 15.4L11.3 14.7M14.9 8.5L14.2 9.2C14.7 10 15 11 15 12S14.7 14 14.2 14.8L14.9 15.5C15.6 14.5 16 13.3 16 12S15.6 9.5 14.9 8.5M7.2 7.8C8 7.3 9 7 10 7S12 7.3 12.8 7.8L13.5 7.1C12.5 6.4 11.3 6 10 6S7.5 6.4 6.5 7.1L7.2 7.8M12.8 16.2C12 16.7 11 17 10 17S8 16.7 7.2 16.2L6.5 16.9C7.5 17.6 8.7 18 10 18S12.5 17.6 13.5 16.9L12.8 16.2M5.8 14.8C5.3 14 5 13 5 12S5.3 10 5.8 9.2L5.1 8.5C4.4 9.5 4 10.7 4 12S4.4 14.5 5.1 15.5L5.8 14.8M24 7H22V13H24V8M24 15H22V17H24V15Z',
  Vc =
    'M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z',
  Ec =
    'M12.5 7C12.5 5.89 13.39 5 14.5 5H18C19.1 5 20 5.9 20 7V9.16C18.84 9.57 18 10.67 18 11.97V14H12.5V7M6 11.96V14H11.5V7C11.5 5.89 10.61 5 9.5 5H6C4.9 5 4 5.9 4 7V9.15C5.16 9.56 6 10.67 6 11.96M20.66 10.03C19.68 10.19 19 11.12 19 12.12V15H5V12C5 10.9 4.11 10 3 10S1 10.9 1 12V17C1 18.1 1.9 19 3 19V21H5V19H19V21H21V19C22.1 19 23 18.1 23 17V12C23 10.79 21.91 9.82 20.66 10.03Z',
  Mc = 'M3,3V21H21V3',
  Pc = 'M3,3H21V21H3V3M5,5V19H19V5H5Z',
  Tc =
    'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
  zc = 'M18,18H6V6H18V18Z',
  Nc =
    'M8.16,3L6.75,4.41L9.34,7H4C2.89,7 2,7.89 2,9V19C2,20.11 2.89,21 4,21H20C21.11,21 22,20.11 22,19V9C22,7.89 21.11,7 20,7H14.66L17.25,4.41L15.84,3L12,6.84L8.16,3M4,9H17V19H4V9M19.5,9A1,1 0 0,1 20.5,10A1,1 0 0,1 19.5,11A1,1 0 0,1 18.5,10A1,1 0 0,1 19.5,9M19.5,12A1,1 0 0,1 20.5,13A1,1 0 0,1 19.5,14A1,1 0 0,1 18.5,13A1,1 0 0,1 19.5,12Z',
  Ic =
    'M8,7A2,2 0 0,1 10,9V14A2,2 0 0,1 8,16A2,2 0 0,1 6,14V9A2,2 0 0,1 8,7M14,14C14,16.97 11.84,19.44 9,19.92V22H7V19.92C4.16,19.44 2,16.97 2,14H4A4,4 0 0,0 8,18A4,4 0 0,0 12,14H14M21.41,9.41L17.17,13.66L18.18,10H14A2,2 0 0,1 12,8V4A2,2 0 0,1 14,2H20A2,2 0 0,1 22,4V8C22,8.55 21.78,9.05 21.41,9.41Z',
  Oc =
    'M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z',
  Rc =
    'M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z',
  Dc =
    'M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z',
  jc =
    'M18.4 1.6C18 1.2 17.5 1 17 1H7C6.5 1 6 1.2 5.6 1.6C5.2 2 5 2.5 5 3V21C5 21.5 5.2 22 5.6 22.4C6 22.8 6.5 23 7 23H17C17.5 23 18 22.8 18.4 22.4C18.8 22 19 21.5 19 21V3C19 2.5 18.8 2 18.4 1.6M16 7C16 7.6 15.6 8 15 8H9C8.4 8 8 7.6 8 7V5C8 4.4 8.4 4 9 4H15C15.6 4 16 4.4 16 5V7Z',
  Bc =
    'M5.6 1.6C6 1.2 6.5 1 7 1H17C17.5 1 18 1.2 18.4 1.6C18.8 2 19 2.5 19 3V21C19 21.5 18.8 22 18.4 22.4C18 22.8 17.5 23 17 23H7C6.5 23 6 22.8 5.6 22.4C5.2 22 5 21.5 5 21V3C5 2.5 5.2 2 5.6 1.6M8 3C7.4 3 7 3.4 7 4V20C7 20.6 7.4 21 8 21H16C16.6 21 17 20.6 17 20V4C17 3.4 16.6 3 16 3H8M8 17C8 16.4 8.4 16 9 16H15C15.6 16 16 16.4 16 17V19C16 19.6 15.6 20 15 20H9C8.4 20 8 19.6 8 19V17Z',
  $c =
    'M18.17,12L15,8.83L16.41,7.41L21,12L16.41,16.58L15,15.17L18.17,12M5.83,12L9,15.17L7.59,16.59L3,12L7.59,7.42L9,8.83L5.83,12Z',
  Fc = 'M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z',
  Uc =
    'M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z',
  Zc =
    'M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z',
  qc =
    'M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z',
  Gc =
    'M20.84 22.73L16.29 18.18C15.2 19.3 13.69 20 12 20C8.69 20 6 17.31 6 14C6 12.67 6.67 11.03 7.55 9.44L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14C18 10 12 3.25 12 3.25S10.84 4.55 9.55 6.35L17.95 14.75C18 14.5 18 14.25 18 14Z',
  Kc =
    'M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z',
  Yc =
    'M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z',
  Wc =
    'M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z',
  Xc =
    'M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
  Jc =
    'M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z',
  Qc =
    'M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z',
  ep =
    'M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z',
  tp =
    'M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z',
  op =
    'M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9M8 12H16V14H8V12M8 15H16V17H8V15M8 18H16V20H8V18Z',
  rp = 'M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9Z',
  ip = function (e, t) {
    return (
      (ip =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t
          }) ||
        function (e, t) {
          for (var o in t)
            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
        }),
      ip(e, t)
    )
  }
function np(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError(
      'Class extends value ' + String(t) + ' is not a constructor or null'
    )
  function o() {
    this.constructor = e
  }
  ip(e, t),
    (e.prototype =
      null === t ? Object.create(t) : ((o.prototype = t.prototype), new o()))
}
var ap = function () {
  return (
    (ap =
      Object.assign ||
      function (e) {
        for (var t, o = 1, r = arguments.length; o < r; o++)
          for (var i in (t = arguments[o]))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        return e
      }),
    ap.apply(this, arguments)
  )
}
function sp(e, t, o, r) {
  var i,
    n = arguments.length,
    a = n < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, o)) : r
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
    a = Reflect.decorate(e, t, o, r)
  else
    for (var s = e.length - 1; s >= 0; s--)
      (i = e[s]) && (a = (n < 3 ? i(a) : n > 3 ? i(t, o, a) : i(t, o)) || a)
  return n > 3 && a && Object.defineProperty(t, o, a), a
}
var lp = Object.create
  ? function (e, t, o, r) {
      void 0 === r && (r = o)
      var i = Object.getOwnPropertyDescriptor(t, o)
      ;(i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
        (i = {
          enumerable: !0,
          get: function () {
            return t[o]
          },
        }),
        Object.defineProperty(e, r, i)
    }
  : function (e, t, o, r) {
      void 0 === r && (r = o), (e[r] = t[o])
    }
function dp(e) {
  var t = 'function' == typeof Symbol && Symbol.iterator,
    o = t && e[t],
    r = 0
  if (o) return o.call(e)
  if (e && 'number' == typeof e.length)
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
        )
      },
    }
  throw new TypeError(
    t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
  )
}
function cp(e, t) {
  var o = 'function' == typeof Symbol && e[Symbol.iterator]
  if (!o) return e
  var r,
    i,
    n = o.call(e),
    a = []
  try {
    for (; (void 0 === t || t-- > 0) && !(r = n.next()).done; ) a.push(r.value)
  } catch (e) {
    i = { error: e }
  } finally {
    try {
      r && !r.done && (o = n.return) && o.call(n)
    } finally {
      if (i) throw i.error
    }
  }
  return a
}
function pp(e, t, o) {
  if (o || 2 === arguments.length)
    for (var r, i = 0, n = t.length; i < n; i++)
      (!r && i in t) ||
        (r || (r = Array.prototype.slice.call(t, 0, i)), (r[i] = t[i]))
  return e.concat(r || Array.prototype.slice.call(t))
}
function up(e) {
  return this instanceof up ? ((this.v = e), this) : new up(e)
}
var mp = Object.create
  ? function (e, t) {
      Object.defineProperty(e, 'default', { enumerable: !0, value: t })
    }
  : function (e, t) {
      e.default = t
    }
var hp,
  gp,
  _p,
  fp = Object.freeze({
    __proto__: null,
    __extends: np,
    get __assign() {
      return ap
    },
    __rest: function (e, t) {
      var o = {}
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
          t.indexOf(r) < 0 &&
          (o[r] = e[r])
      if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
        var i = 0
        for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
          t.indexOf(r[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
            (o[r[i]] = e[r[i]])
      }
      return o
    },
    __decorate: sp,
    __param: function (e, t) {
      return function (o, r) {
        t(o, r, e)
      }
    },
    __metadata: function (e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t)
    },
    __awaiter: function (e, t, o, r) {
      return new (o || (o = Promise))(function (i, n) {
        function a(e) {
          try {
            l(r.next(e))
          } catch (e) {
            n(e)
          }
        }
        function s(e) {
          try {
            l(r.throw(e))
          } catch (e) {
            n(e)
          }
        }
        function l(e) {
          var t
          e.done
            ? i(e.value)
            : ((t = e.value),
              t instanceof o
                ? t
                : new o(function (e) {
                    e(t)
                  })).then(a, s)
        }
        l((r = r.apply(e, t || [])).next())
      })
    },
    __generator: function (e, t) {
      var o,
        r,
        i,
        n,
        a = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1]
            return i[1]
          },
          trys: [],
          ops: [],
        }
      return (
        (n = { next: s(0), throw: s(1), return: s(2) }),
        'function' == typeof Symbol &&
          (n[Symbol.iterator] = function () {
            return this
          }),
        n
      )
      function s(n) {
        return function (s) {
          return (function (n) {
            if (o) throw new TypeError('Generator is already executing.')
            for (; a; )
              try {
                if (
                  ((o = 1),
                  r &&
                    (i =
                      2 & n[0]
                        ? r.return
                        : n[0]
                        ? r.throw || ((i = r.return) && i.call(r), 0)
                        : r.next) &&
                    !(i = i.call(r, n[1])).done)
                )
                  return i
                switch (((r = 0), i && (n = [2 & n[0], i.value]), n[0])) {
                  case 0:
                  case 1:
                    i = n
                    break
                  case 4:
                    return a.label++, { value: n[1], done: !1 }
                  case 5:
                    a.label++, (r = n[1]), (n = [0])
                    continue
                  case 7:
                    ;(n = a.ops.pop()), a.trys.pop()
                    continue
                  default:
                    if (
                      !((i = a.trys),
                      (i = i.length > 0 && i[i.length - 1]) ||
                        (6 !== n[0] && 2 !== n[0]))
                    ) {
                      a = 0
                      continue
                    }
                    if (3 === n[0] && (!i || (n[1] > i[0] && n[1] < i[3]))) {
                      a.label = n[1]
                      break
                    }
                    if (6 === n[0] && a.label < i[1]) {
                      ;(a.label = i[1]), (i = n)
                      break
                    }
                    if (i && a.label < i[2]) {
                      ;(a.label = i[2]), a.ops.push(n)
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop()
                    continue
                }
                n = t.call(e, a)
              } catch (e) {
                ;(n = [6, e]), (r = 0)
              } finally {
                o = i = 0
              }
            if (5 & n[0]) throw n[1]
            return { value: n[0] ? n[1] : void 0, done: !0 }
          })([n, s])
        }
      }
    },
    __createBinding: lp,
    __exportStar: function (e, t) {
      for (var o in e)
        'default' === o ||
          Object.prototype.hasOwnProperty.call(t, o) ||
          lp(t, e, o)
    },
    __values: dp,
    __read: cp,
    __spread: function () {
      for (var e = [], t = 0; t < arguments.length; t++)
        e = e.concat(cp(arguments[t]))
      return e
    },
    __spreadArrays: function () {
      for (var e = 0, t = 0, o = arguments.length; t < o; t++)
        e += arguments[t].length
      var r = Array(e),
        i = 0
      for (t = 0; t < o; t++)
        for (var n = arguments[t], a = 0, s = n.length; a < s; a++, i++)
          r[i] = n[a]
      return r
    },
    __spreadArray: pp,
    __await: up,
    __asyncGenerator: function (e, t, o) {
      if (!Symbol.asyncIterator)
        throw new TypeError('Symbol.asyncIterator is not defined.')
      var r,
        i = o.apply(e, t || []),
        n = []
      return (
        (r = {}),
        a('next'),
        a('throw'),
        a('return'),
        (r[Symbol.asyncIterator] = function () {
          return this
        }),
        r
      )
      function a(e) {
        i[e] &&
          (r[e] = function (t) {
            return new Promise(function (o, r) {
              n.push([e, t, o, r]) > 1 || s(e, t)
            })
          })
      }
      function s(e, t) {
        try {
          !(function (e) {
            e.value instanceof up
              ? Promise.resolve(e.value.v).then(l, d)
              : c(n[0][2], e)
          })(i[e](t))
        } catch (e) {
          c(n[0][3], e)
        }
      }
      function l(e) {
        s('next', e)
      }
      function d(e) {
        s('throw', e)
      }
      function c(e, t) {
        e(t), n.shift(), n.length && s(n[0][0], n[0][1])
      }
    },
    __asyncDelegator: function (e) {
      var t, o
      return (
        (t = {}),
        r('next'),
        r('throw', function (e) {
          throw e
        }),
        r('return'),
        (t[Symbol.iterator] = function () {
          return this
        }),
        t
      )
      function r(r, i) {
        t[r] = e[r]
          ? function (t) {
              return (o = !o)
                ? { value: up(e[r](t)), done: 'return' === r }
                : i
                ? i(t)
                : t
            }
          : i
      }
    },
    __asyncValues: function (e) {
      if (!Symbol.asyncIterator)
        throw new TypeError('Symbol.asyncIterator is not defined.')
      var t,
        o = e[Symbol.asyncIterator]
      return o
        ? o.call(e)
        : ((e = dp(e)),
          (t = {}),
          r('next'),
          r('throw'),
          r('return'),
          (t[Symbol.asyncIterator] = function () {
            return this
          }),
          t)
      function r(o) {
        t[o] =
          e[o] &&
          function (t) {
            return new Promise(function (r, i) {
              ;(function (e, t, o, r) {
                Promise.resolve(r).then(function (t) {
                  e({ value: t, done: o })
                }, t)
              })(r, i, (t = e[o](t)).done, t.value)
            })
          }
      }
    },
    __makeTemplateObject: function (e, t) {
      return (
        Object.defineProperty
          ? Object.defineProperty(e, 'raw', { value: t })
          : (e.raw = t),
        e
      )
    },
    __importStar: function (e) {
      if (e && e.__esModule) return e
      var t = {}
      if (null != e)
        for (var o in e)
          'default' !== o &&
            Object.prototype.hasOwnProperty.call(e, o) &&
            lp(t, e, o)
      return mp(t, e), t
    },
    __importDefault: function (e) {
      return e && e.__esModule ? e : { default: e }
    },
    __classPrivateFieldGet: function (e, t, o, r) {
      if ('a' === o && !r)
        throw new TypeError('Private accessor was defined without a getter')
      if ('function' == typeof t ? e !== t || !r : !t.has(e))
        throw new TypeError(
          'Cannot read private member from an object whose class did not declare it'
        )
      return 'm' === o ? r : 'a' === o ? r.call(e) : r ? r.value : t.get(e)
    },
    __classPrivateFieldSet: function (e, t, o, r, i) {
      if ('m' === r) throw new TypeError('Private method is not writable')
      if ('a' === r && !i)
        throw new TypeError('Private accessor was defined without a setter')
      if ('function' == typeof t ? e !== t || !i : !t.has(e))
        throw new TypeError(
          'Cannot write private member to an object whose class did not declare it'
        )
      return 'a' === r ? i.call(e, o) : i ? (i.value = o) : t.set(e, o), o
    },
    __classPrivateFieldIn: function (e, t) {
      if (null === t || ('object' != typeof t && 'function' != typeof t))
        throw new TypeError("Cannot use 'in' operator on non-object")
      return 'function' == typeof e ? t === e : e.has(t)
    },
  })
function yp(e) {
  return e.type === gp.literal
}
function bp(e) {
  return e.type === gp.argument
}
function vp(e) {
  return e.type === gp.number
}
function Cp(e) {
  return e.type === gp.date
}
function Ap(e) {
  return e.type === gp.time
}
function wp(e) {
  return e.type === gp.select
}
function Hp(e) {
  return e.type === gp.plural
}
function kp(e) {
  return e.type === gp.pound
}
function Sp(e) {
  return e.type === gp.tag
}
function Lp(e) {
  return !(!e || 'object' != typeof e || e.type !== _p.number)
}
function xp(e) {
  return !(!e || 'object' != typeof e || e.type !== _p.dateTime)
}
!(function (e) {
  ;(e[(e.EXPECT_ARGUMENT_CLOSING_BRACE = 1)] = 'EXPECT_ARGUMENT_CLOSING_BRACE'),
    (e[(e.EMPTY_ARGUMENT = 2)] = 'EMPTY_ARGUMENT'),
    (e[(e.MALFORMED_ARGUMENT = 3)] = 'MALFORMED_ARGUMENT'),
    (e[(e.EXPECT_ARGUMENT_TYPE = 4)] = 'EXPECT_ARGUMENT_TYPE'),
    (e[(e.INVALID_ARGUMENT_TYPE = 5)] = 'INVALID_ARGUMENT_TYPE'),
    (e[(e.EXPECT_ARGUMENT_STYLE = 6)] = 'EXPECT_ARGUMENT_STYLE'),
    (e[(e.INVALID_NUMBER_SKELETON = 7)] = 'INVALID_NUMBER_SKELETON'),
    (e[(e.INVALID_DATE_TIME_SKELETON = 8)] = 'INVALID_DATE_TIME_SKELETON'),
    (e[(e.EXPECT_NUMBER_SKELETON = 9)] = 'EXPECT_NUMBER_SKELETON'),
    (e[(e.EXPECT_DATE_TIME_SKELETON = 10)] = 'EXPECT_DATE_TIME_SKELETON'),
    (e[(e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11)] =
      'UNCLOSED_QUOTE_IN_ARGUMENT_STYLE'),
    (e[(e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12)] =
      'EXPECT_SELECT_ARGUMENT_OPTIONS'),
    (e[(e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13)] =
      'EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE'),
    (e[(e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14)] =
      'INVALID_PLURAL_ARGUMENT_OFFSET_VALUE'),
    (e[(e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15)] =
      'EXPECT_SELECT_ARGUMENT_SELECTOR'),
    (e[(e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16)] =
      'EXPECT_PLURAL_ARGUMENT_SELECTOR'),
    (e[(e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17)] =
      'EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT'),
    (e[(e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18)] =
      'EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT'),
    (e[(e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19)] =
      'INVALID_PLURAL_ARGUMENT_SELECTOR'),
    (e[(e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20)] =
      'DUPLICATE_PLURAL_ARGUMENT_SELECTOR'),
    (e[(e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21)] =
      'DUPLICATE_SELECT_ARGUMENT_SELECTOR'),
    (e[(e.MISSING_OTHER_CLAUSE = 22)] = 'MISSING_OTHER_CLAUSE'),
    (e[(e.INVALID_TAG = 23)] = 'INVALID_TAG'),
    (e[(e.INVALID_TAG_NAME = 25)] = 'INVALID_TAG_NAME'),
    (e[(e.UNMATCHED_CLOSING_TAG = 26)] = 'UNMATCHED_CLOSING_TAG'),
    (e[(e.UNCLOSED_TAG = 27)] = 'UNCLOSED_TAG')
})(hp || (hp = {})),
  (function (e) {
    ;(e[(e.literal = 0)] = 'literal'),
      (e[(e.argument = 1)] = 'argument'),
      (e[(e.number = 2)] = 'number'),
      (e[(e.date = 3)] = 'date'),
      (e[(e.time = 4)] = 'time'),
      (e[(e.select = 5)] = 'select'),
      (e[(e.plural = 6)] = 'plural'),
      (e[(e.pound = 7)] = 'pound'),
      (e[(e.tag = 8)] = 'tag')
  })(gp || (gp = {})),
  (function (e) {
    ;(e[(e.number = 0)] = 'number'), (e[(e.dateTime = 1)] = 'dateTime')
  })(_p || (_p = {}))
var Vp = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
  Ep =
    /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g
function Mp(e) {
  var t = {}
  return (
    e.replace(Ep, function (e) {
      var o = e.length
      switch (e[0]) {
        case 'G':
          t.era = 4 === o ? 'long' : 5 === o ? 'narrow' : 'short'
          break
        case 'y':
          t.year = 2 === o ? '2-digit' : 'numeric'
          break
        case 'Y':
        case 'u':
        case 'U':
        case 'r':
          throw new RangeError(
            '`Y/u/U/r` (year) patterns are not supported, use `y` instead'
          )
        case 'q':
        case 'Q':
          throw new RangeError('`q/Q` (quarter) patterns are not supported')
        case 'M':
        case 'L':
          t.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][o - 1]
          break
        case 'w':
        case 'W':
          throw new RangeError('`w/W` (week) patterns are not supported')
        case 'd':
          t.day = ['numeric', '2-digit'][o - 1]
          break
        case 'D':
        case 'F':
        case 'g':
          throw new RangeError(
            '`D/F/g` (day) patterns are not supported, use `d` instead'
          )
        case 'E':
          t.weekday = 4 === o ? 'short' : 5 === o ? 'narrow' : 'short'
          break
        case 'e':
          if (o < 4)
            throw new RangeError(
              '`e..eee` (weekday) patterns are not supported'
            )
          t.weekday = ['short', 'long', 'narrow', 'short'][o - 4]
          break
        case 'c':
          if (o < 4)
            throw new RangeError(
              '`c..ccc` (weekday) patterns are not supported'
            )
          t.weekday = ['short', 'long', 'narrow', 'short'][o - 4]
          break
        case 'a':
          t.hour12 = !0
          break
        case 'b':
        case 'B':
          throw new RangeError(
            '`b/B` (period) patterns are not supported, use `a` instead'
          )
        case 'h':
          ;(t.hourCycle = 'h12'), (t.hour = ['numeric', '2-digit'][o - 1])
          break
        case 'H':
          ;(t.hourCycle = 'h23'), (t.hour = ['numeric', '2-digit'][o - 1])
          break
        case 'K':
          ;(t.hourCycle = 'h11'), (t.hour = ['numeric', '2-digit'][o - 1])
          break
        case 'k':
          ;(t.hourCycle = 'h24'), (t.hour = ['numeric', '2-digit'][o - 1])
          break
        case 'j':
        case 'J':
        case 'C':
          throw new RangeError(
            '`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead'
          )
        case 'm':
          t.minute = ['numeric', '2-digit'][o - 1]
          break
        case 's':
          t.second = ['numeric', '2-digit'][o - 1]
          break
        case 'S':
        case 'A':
          throw new RangeError(
            '`S/A` (second) patterns are not supported, use `s` instead'
          )
        case 'z':
          t.timeZoneName = o < 4 ? 'short' : 'long'
          break
        case 'Z':
        case 'O':
        case 'v':
        case 'V':
        case 'X':
        case 'x':
          throw new RangeError(
            '`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead'
          )
      }
      return ''
    }),
    t
  )
}
var Pp = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i
var Tp = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,
  zp = /^(@+)?(\+|#+)?[rs]?$/g,
  Np = /(\*)(0+)|(#+)(0+)|(0+)/g,
  Ip = /^(0+)$/
function Op(e) {
  var t = {}
  return (
    'r' === e[e.length - 1]
      ? (t.roundingPriority = 'morePrecision')
      : 's' === e[e.length - 1] && (t.roundingPriority = 'lessPrecision'),
    e.replace(zp, function (e, o, r) {
      return (
        'string' != typeof r
          ? ((t.minimumSignificantDigits = o.length),
            (t.maximumSignificantDigits = o.length))
          : '+' === r
          ? (t.minimumSignificantDigits = o.length)
          : '#' === o[0]
          ? (t.maximumSignificantDigits = o.length)
          : ((t.minimumSignificantDigits = o.length),
            (t.maximumSignificantDigits =
              o.length + ('string' == typeof r ? r.length : 0))),
        ''
      )
    }),
    t
  )
}
function Rp(e) {
  switch (e) {
    case 'sign-auto':
      return { signDisplay: 'auto' }
    case 'sign-accounting':
    case '()':
      return { currencySign: 'accounting' }
    case 'sign-always':
    case '+!':
      return { signDisplay: 'always' }
    case 'sign-accounting-always':
    case '()!':
      return { signDisplay: 'always', currencySign: 'accounting' }
    case 'sign-except-zero':
    case '+?':
      return { signDisplay: 'exceptZero' }
    case 'sign-accounting-except-zero':
    case '()?':
      return { signDisplay: 'exceptZero', currencySign: 'accounting' }
    case 'sign-never':
    case '+_':
      return { signDisplay: 'never' }
  }
}
function Dp(e) {
  var t
  if (
    ('E' === e[0] && 'E' === e[1]
      ? ((t = { notation: 'engineering' }), (e = e.slice(2)))
      : 'E' === e[0] && ((t = { notation: 'scientific' }), (e = e.slice(1))),
    t)
  ) {
    var o = e.slice(0, 2)
    if (
      ('+!' === o
        ? ((t.signDisplay = 'always'), (e = e.slice(2)))
        : '+?' === o && ((t.signDisplay = 'exceptZero'), (e = e.slice(2))),
      !Ip.test(e))
    )
      throw new Error('Malformed concise eng/scientific notation')
    t.minimumIntegerDigits = e.length
  }
  return t
}
function jp(e) {
  var t = Rp(e)
  return t || {}
}
function Bp(e) {
  for (var t = {}, o = 0, r = e; o < r.length; o++) {
    var i = r[o]
    switch (i.stem) {
      case 'percent':
      case '%':
        t.style = 'percent'
        continue
      case '%x100':
        ;(t.style = 'percent'), (t.scale = 100)
        continue
      case 'currency':
        ;(t.style = 'currency'), (t.currency = i.options[0])
        continue
      case 'group-off':
      case ',_':
        t.useGrouping = !1
        continue
      case 'precision-integer':
      case '.':
        t.maximumFractionDigits = 0
        continue
      case 'measure-unit':
      case 'unit':
        ;(t.style = 'unit'), (t.unit = i.options[0].replace(/^(.*?)-/, ''))
        continue
      case 'compact-short':
      case 'K':
        ;(t.notation = 'compact'), (t.compactDisplay = 'short')
        continue
      case 'compact-long':
      case 'KK':
        ;(t.notation = 'compact'), (t.compactDisplay = 'long')
        continue
      case 'scientific':
        t = ap(
          ap(ap({}, t), { notation: 'scientific' }),
          i.options.reduce(function (e, t) {
            return ap(ap({}, e), jp(t))
          }, {})
        )
        continue
      case 'engineering':
        t = ap(
          ap(ap({}, t), { notation: 'engineering' }),
          i.options.reduce(function (e, t) {
            return ap(ap({}, e), jp(t))
          }, {})
        )
        continue
      case 'notation-simple':
        t.notation = 'standard'
        continue
      case 'unit-width-narrow':
        ;(t.currencyDisplay = 'narrowSymbol'), (t.unitDisplay = 'narrow')
        continue
      case 'unit-width-short':
        ;(t.currencyDisplay = 'code'), (t.unitDisplay = 'short')
        continue
      case 'unit-width-full-name':
        ;(t.currencyDisplay = 'name'), (t.unitDisplay = 'long')
        continue
      case 'unit-width-iso-code':
        t.currencyDisplay = 'symbol'
        continue
      case 'scale':
        t.scale = parseFloat(i.options[0])
        continue
      case 'integer-width':
        if (i.options.length > 1)
          throw new RangeError(
            'integer-width stems only accept a single optional option'
          )
        i.options[0].replace(Np, function (e, o, r, i, n, a) {
          if (o) t.minimumIntegerDigits = r.length
          else {
            if (i && n)
              throw new Error(
                'We currently do not support maximum integer digits'
              )
            if (a)
              throw new Error(
                'We currently do not support exact integer digits'
              )
          }
          return ''
        })
        continue
    }
    if (Ip.test(i.stem)) t.minimumIntegerDigits = i.stem.length
    else if (Tp.test(i.stem)) {
      if (i.options.length > 1)
        throw new RangeError(
          'Fraction-precision stems only accept a single optional option'
        )
      i.stem.replace(Tp, function (e, o, r, i, n, a) {
        return (
          '*' === r
            ? (t.minimumFractionDigits = o.length)
            : i && '#' === i[0]
            ? (t.maximumFractionDigits = i.length)
            : n && a
            ? ((t.minimumFractionDigits = n.length),
              (t.maximumFractionDigits = n.length + a.length))
            : ((t.minimumFractionDigits = o.length),
              (t.maximumFractionDigits = o.length)),
          ''
        )
      })
      var n = i.options[0]
      'w' === n
        ? (t = ap(ap({}, t), { trailingZeroDisplay: 'stripIfInteger' }))
        : n && (t = ap(ap({}, t), Op(n)))
    } else if (zp.test(i.stem)) t = ap(ap({}, t), Op(i.stem))
    else {
      var a = Rp(i.stem)
      a && (t = ap(ap({}, t), a))
      var s = Dp(i.stem)
      s && (t = ap(ap({}, t), s))
    }
  }
  return t
}
var $p,
  Fp = {
    AX: ['H'],
    BQ: ['H'],
    CP: ['H'],
    CZ: ['H'],
    DK: ['H'],
    FI: ['H'],
    ID: ['H'],
    IS: ['H'],
    ML: ['H'],
    NE: ['H'],
    RU: ['H'],
    SE: ['H'],
    SJ: ['H'],
    SK: ['H'],
    AS: ['h', 'H'],
    BT: ['h', 'H'],
    DJ: ['h', 'H'],
    ER: ['h', 'H'],
    GH: ['h', 'H'],
    IN: ['h', 'H'],
    LS: ['h', 'H'],
    PG: ['h', 'H'],
    PW: ['h', 'H'],
    SO: ['h', 'H'],
    TO: ['h', 'H'],
    VU: ['h', 'H'],
    WS: ['h', 'H'],
    '001': ['H', 'h'],
    AL: ['h', 'H', 'hB'],
    TD: ['h', 'H', 'hB'],
    'ca-ES': ['H', 'h', 'hB'],
    CF: ['H', 'h', 'hB'],
    CM: ['H', 'h', 'hB'],
    'fr-CA': ['H', 'h', 'hB'],
    'gl-ES': ['H', 'h', 'hB'],
    'it-CH': ['H', 'h', 'hB'],
    'it-IT': ['H', 'h', 'hB'],
    LU: ['H', 'h', 'hB'],
    NP: ['H', 'h', 'hB'],
    PF: ['H', 'h', 'hB'],
    SC: ['H', 'h', 'hB'],
    SM: ['H', 'h', 'hB'],
    SN: ['H', 'h', 'hB'],
    TF: ['H', 'h', 'hB'],
    VA: ['H', 'h', 'hB'],
    CY: ['h', 'H', 'hb', 'hB'],
    GR: ['h', 'H', 'hb', 'hB'],
    CO: ['h', 'H', 'hB', 'hb'],
    DO: ['h', 'H', 'hB', 'hb'],
    KP: ['h', 'H', 'hB', 'hb'],
    KR: ['h', 'H', 'hB', 'hb'],
    NA: ['h', 'H', 'hB', 'hb'],
    PA: ['h', 'H', 'hB', 'hb'],
    PR: ['h', 'H', 'hB', 'hb'],
    VE: ['h', 'H', 'hB', 'hb'],
    AC: ['H', 'h', 'hb', 'hB'],
    AI: ['H', 'h', 'hb', 'hB'],
    BW: ['H', 'h', 'hb', 'hB'],
    BZ: ['H', 'h', 'hb', 'hB'],
    CC: ['H', 'h', 'hb', 'hB'],
    CK: ['H', 'h', 'hb', 'hB'],
    CX: ['H', 'h', 'hb', 'hB'],
    DG: ['H', 'h', 'hb', 'hB'],
    FK: ['H', 'h', 'hb', 'hB'],
    GB: ['H', 'h', 'hb', 'hB'],
    GG: ['H', 'h', 'hb', 'hB'],
    GI: ['H', 'h', 'hb', 'hB'],
    IE: ['H', 'h', 'hb', 'hB'],
    IM: ['H', 'h', 'hb', 'hB'],
    IO: ['H', 'h', 'hb', 'hB'],
    JE: ['H', 'h', 'hb', 'hB'],
    LT: ['H', 'h', 'hb', 'hB'],
    MK: ['H', 'h', 'hb', 'hB'],
    MN: ['H', 'h', 'hb', 'hB'],
    MS: ['H', 'h', 'hb', 'hB'],
    NF: ['H', 'h', 'hb', 'hB'],
    NG: ['H', 'h', 'hb', 'hB'],
    NR: ['H', 'h', 'hb', 'hB'],
    NU: ['H', 'h', 'hb', 'hB'],
    PN: ['H', 'h', 'hb', 'hB'],
    SH: ['H', 'h', 'hb', 'hB'],
    SX: ['H', 'h', 'hb', 'hB'],
    TA: ['H', 'h', 'hb', 'hB'],
    ZA: ['H', 'h', 'hb', 'hB'],
    'af-ZA': ['H', 'h', 'hB', 'hb'],
    AR: ['H', 'h', 'hB', 'hb'],
    CL: ['H', 'h', 'hB', 'hb'],
    CR: ['H', 'h', 'hB', 'hb'],
    CU: ['H', 'h', 'hB', 'hb'],
    EA: ['H', 'h', 'hB', 'hb'],
    'es-BO': ['H', 'h', 'hB', 'hb'],
    'es-BR': ['H', 'h', 'hB', 'hb'],
    'es-EC': ['H', 'h', 'hB', 'hb'],
    'es-ES': ['H', 'h', 'hB', 'hb'],
    'es-GQ': ['H', 'h', 'hB', 'hb'],
    'es-PE': ['H', 'h', 'hB', 'hb'],
    GT: ['H', 'h', 'hB', 'hb'],
    HN: ['H', 'h', 'hB', 'hb'],
    IC: ['H', 'h', 'hB', 'hb'],
    KG: ['H', 'h', 'hB', 'hb'],
    KM: ['H', 'h', 'hB', 'hb'],
    LK: ['H', 'h', 'hB', 'hb'],
    MA: ['H', 'h', 'hB', 'hb'],
    MX: ['H', 'h', 'hB', 'hb'],
    NI: ['H', 'h', 'hB', 'hb'],
    PY: ['H', 'h', 'hB', 'hb'],
    SV: ['H', 'h', 'hB', 'hb'],
    UY: ['H', 'h', 'hB', 'hb'],
    JP: ['H', 'h', 'K'],
    AD: ['H', 'hB'],
    AM: ['H', 'hB'],
    AO: ['H', 'hB'],
    AT: ['H', 'hB'],
    AW: ['H', 'hB'],
    BE: ['H', 'hB'],
    BF: ['H', 'hB'],
    BJ: ['H', 'hB'],
    BL: ['H', 'hB'],
    BR: ['H', 'hB'],
    CG: ['H', 'hB'],
    CI: ['H', 'hB'],
    CV: ['H', 'hB'],
    DE: ['H', 'hB'],
    EE: ['H', 'hB'],
    FR: ['H', 'hB'],
    GA: ['H', 'hB'],
    GF: ['H', 'hB'],
    GN: ['H', 'hB'],
    GP: ['H', 'hB'],
    GW: ['H', 'hB'],
    HR: ['H', 'hB'],
    IL: ['H', 'hB'],
    IT: ['H', 'hB'],
    KZ: ['H', 'hB'],
    MC: ['H', 'hB'],
    MD: ['H', 'hB'],
    MF: ['H', 'hB'],
    MQ: ['H', 'hB'],
    MZ: ['H', 'hB'],
    NC: ['H', 'hB'],
    NL: ['H', 'hB'],
    PM: ['H', 'hB'],
    PT: ['H', 'hB'],
    RE: ['H', 'hB'],
    RO: ['H', 'hB'],
    SI: ['H', 'hB'],
    SR: ['H', 'hB'],
    ST: ['H', 'hB'],
    TG: ['H', 'hB'],
    TR: ['H', 'hB'],
    WF: ['H', 'hB'],
    YT: ['H', 'hB'],
    BD: ['h', 'hB', 'H'],
    PK: ['h', 'hB', 'H'],
    AZ: ['H', 'hB', 'h'],
    BA: ['H', 'hB', 'h'],
    BG: ['H', 'hB', 'h'],
    CH: ['H', 'hB', 'h'],
    GE: ['H', 'hB', 'h'],
    LI: ['H', 'hB', 'h'],
    ME: ['H', 'hB', 'h'],
    RS: ['H', 'hB', 'h'],
    UA: ['H', 'hB', 'h'],
    UZ: ['H', 'hB', 'h'],
    XK: ['H', 'hB', 'h'],
    AG: ['h', 'hb', 'H', 'hB'],
    AU: ['h', 'hb', 'H', 'hB'],
    BB: ['h', 'hb', 'H', 'hB'],
    BM: ['h', 'hb', 'H', 'hB'],
    BS: ['h', 'hb', 'H', 'hB'],
    CA: ['h', 'hb', 'H', 'hB'],
    DM: ['h', 'hb', 'H', 'hB'],
    'en-001': ['h', 'hb', 'H', 'hB'],
    FJ: ['h', 'hb', 'H', 'hB'],
    FM: ['h', 'hb', 'H', 'hB'],
    GD: ['h', 'hb', 'H', 'hB'],
    GM: ['h', 'hb', 'H', 'hB'],
    GU: ['h', 'hb', 'H', 'hB'],
    GY: ['h', 'hb', 'H', 'hB'],
    JM: ['h', 'hb', 'H', 'hB'],
    KI: ['h', 'hb', 'H', 'hB'],
    KN: ['h', 'hb', 'H', 'hB'],
    KY: ['h', 'hb', 'H', 'hB'],
    LC: ['h', 'hb', 'H', 'hB'],
    LR: ['h', 'hb', 'H', 'hB'],
    MH: ['h', 'hb', 'H', 'hB'],
    MP: ['h', 'hb', 'H', 'hB'],
    MW: ['h', 'hb', 'H', 'hB'],
    NZ: ['h', 'hb', 'H', 'hB'],
    SB: ['h', 'hb', 'H', 'hB'],
    SG: ['h', 'hb', 'H', 'hB'],
    SL: ['h', 'hb', 'H', 'hB'],
    SS: ['h', 'hb', 'H', 'hB'],
    SZ: ['h', 'hb', 'H', 'hB'],
    TC: ['h', 'hb', 'H', 'hB'],
    TT: ['h', 'hb', 'H', 'hB'],
    UM: ['h', 'hb', 'H', 'hB'],
    US: ['h', 'hb', 'H', 'hB'],
    VC: ['h', 'hb', 'H', 'hB'],
    VG: ['h', 'hb', 'H', 'hB'],
    VI: ['h', 'hb', 'H', 'hB'],
    ZM: ['h', 'hb', 'H', 'hB'],
    BO: ['H', 'hB', 'h', 'hb'],
    EC: ['H', 'hB', 'h', 'hb'],
    ES: ['H', 'hB', 'h', 'hb'],
    GQ: ['H', 'hB', 'h', 'hb'],
    PE: ['H', 'hB', 'h', 'hb'],
    AE: ['h', 'hB', 'hb', 'H'],
    'ar-001': ['h', 'hB', 'hb', 'H'],
    BH: ['h', 'hB', 'hb', 'H'],
    DZ: ['h', 'hB', 'hb', 'H'],
    EG: ['h', 'hB', 'hb', 'H'],
    EH: ['h', 'hB', 'hb', 'H'],
    HK: ['h', 'hB', 'hb', 'H'],
    IQ: ['h', 'hB', 'hb', 'H'],
    JO: ['h', 'hB', 'hb', 'H'],
    KW: ['h', 'hB', 'hb', 'H'],
    LB: ['h', 'hB', 'hb', 'H'],
    LY: ['h', 'hB', 'hb', 'H'],
    MO: ['h', 'hB', 'hb', 'H'],
    MR: ['h', 'hB', 'hb', 'H'],
    OM: ['h', 'hB', 'hb', 'H'],
    PH: ['h', 'hB', 'hb', 'H'],
    PS: ['h', 'hB', 'hb', 'H'],
    QA: ['h', 'hB', 'hb', 'H'],
    SA: ['h', 'hB', 'hb', 'H'],
    SD: ['h', 'hB', 'hb', 'H'],
    SY: ['h', 'hB', 'hb', 'H'],
    TN: ['h', 'hB', 'hb', 'H'],
    YE: ['h', 'hB', 'hb', 'H'],
    AF: ['H', 'hb', 'hB', 'h'],
    LA: ['H', 'hb', 'hB', 'h'],
    CN: ['H', 'hB', 'hb', 'h'],
    LV: ['H', 'hB', 'hb', 'h'],
    TL: ['H', 'hB', 'hb', 'h'],
    'zu-ZA': ['H', 'hB', 'hb', 'h'],
    CD: ['hB', 'H'],
    IR: ['hB', 'H'],
    'hi-IN': ['hB', 'h', 'H'],
    'kn-IN': ['hB', 'h', 'H'],
    'ml-IN': ['hB', 'h', 'H'],
    'te-IN': ['hB', 'h', 'H'],
    KH: ['hB', 'h', 'H', 'hb'],
    'ta-IN': ['hB', 'h', 'hb', 'H'],
    BN: ['hb', 'hB', 'h', 'H'],
    MY: ['hb', 'hB', 'h', 'H'],
    ET: ['hB', 'hb', 'h', 'H'],
    'gu-IN': ['hB', 'hb', 'h', 'H'],
    'mr-IN': ['hB', 'hb', 'h', 'H'],
    'pa-IN': ['hB', 'hb', 'h', 'H'],
    TW: ['hB', 'hb', 'h', 'H'],
    KE: ['hB', 'hb', 'H', 'h'],
    MM: ['hB', 'hb', 'H', 'h'],
    TZ: ['hB', 'hb', 'H', 'h'],
    UG: ['hB', 'hb', 'H', 'h'],
  }
function Up(e) {
  var t = e.hourCycle
  if (
    (void 0 === t &&
      e.hourCycles &&
      e.hourCycles.length &&
      (t = e.hourCycles[0]),
    t)
  )
    switch (t) {
      case 'h24':
        return 'k'
      case 'h23':
        return 'H'
      case 'h12':
        return 'h'
      case 'h11':
        return 'K'
      default:
        throw new Error('Invalid hourCycle')
    }
  var o,
    r = e.language
  return (
    'root' !== r && (o = e.maximize().region),
    (Fp[o || ''] || Fp[r || ''] || Fp[''.concat(r, '-001')] || Fp['001'])[0]
  )
}
var Zp = new RegExp('^'.concat(Vp.source, '*')),
  qp = new RegExp(''.concat(Vp.source, '*$'))
function Gp(e, t) {
  return { start: e, end: t }
}
var Kp = !!String.prototype.startsWith,
  Yp = !!String.fromCodePoint,
  Wp = !!Object.fromEntries,
  Xp = !!String.prototype.codePointAt,
  Jp = !!String.prototype.trimStart,
  Qp = !!String.prototype.trimEnd,
  eu = !!Number.isSafeInteger
    ? Number.isSafeInteger
    : function (e) {
        return (
          'number' == typeof e &&
          isFinite(e) &&
          Math.floor(e) === e &&
          Math.abs(e) <= 9007199254740991
        )
      },
  tu = !0
try {
  tu =
    'a' ===
    (null ===
      ($p = du('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu').exec('a')) ||
    void 0 === $p
      ? void 0
      : $p[0])
} catch (U) {
  tu = !1
}
var ou,
  ru = Kp
    ? function (e, t, o) {
        return e.startsWith(t, o)
      }
    : function (e, t, o) {
        return e.slice(o, o + t.length) === t
      },
  iu = Yp
    ? String.fromCodePoint
    : function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
        for (var o, r = '', i = e.length, n = 0; i > n; ) {
          if ((o = e[n++]) > 1114111)
            throw RangeError(o + ' is not a valid code point')
          r +=
            o < 65536
              ? String.fromCharCode(o)
              : String.fromCharCode(
                  55296 + ((o -= 65536) >> 10),
                  (o % 1024) + 56320
                )
        }
        return r
      },
  nu = Wp
    ? Object.fromEntries
    : function (e) {
        for (var t = {}, o = 0, r = e; o < r.length; o++) {
          var i = r[o],
            n = i[0],
            a = i[1]
          t[n] = a
        }
        return t
      },
  au = Xp
    ? function (e, t) {
        return e.codePointAt(t)
      }
    : function (e, t) {
        var o = e.length
        if (!(t < 0 || t >= o)) {
          var r,
            i = e.charCodeAt(t)
          return i < 55296 ||
            i > 56319 ||
            t + 1 === o ||
            (r = e.charCodeAt(t + 1)) < 56320 ||
            r > 57343
            ? i
            : r - 56320 + ((i - 55296) << 10) + 65536
        }
      },
  su = Jp
    ? function (e) {
        return e.trimStart()
      }
    : function (e) {
        return e.replace(Zp, '')
      },
  lu = Qp
    ? function (e) {
        return e.trimEnd()
      }
    : function (e) {
        return e.replace(qp, '')
      }
function du(e, t) {
  return new RegExp(e, t)
}
if (tu) {
  var cu = du('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu')
  ou = function (e, t) {
    var o
    return (
      (cu.lastIndex = t), null !== (o = cu.exec(e)[1]) && void 0 !== o ? o : ''
    )
  }
} else
  ou = function (e, t) {
    for (var o = []; ; ) {
      var r = au(e, t)
      if (void 0 === r || hu(r) || gu(r)) break
      o.push(r), (t += r >= 65536 ? 2 : 1)
    }
    return iu.apply(void 0, o)
  }
var pu = (function () {
  function e(e, t) {
    void 0 === t && (t = {}),
      (this.message = e),
      (this.position = { offset: 0, line: 1, column: 1 }),
      (this.ignoreTag = !!t.ignoreTag),
      (this.locale = t.locale),
      (this.requiresOtherClause = !!t.requiresOtherClause),
      (this.shouldParseSkeletons = !!t.shouldParseSkeletons)
  }
  return (
    (e.prototype.parse = function () {
      if (0 !== this.offset()) throw Error('parser can only be used once')
      return this.parseMessage(0, '', !1)
    }),
    (e.prototype.parseMessage = function (e, t, o) {
      for (var r = []; !this.isEOF(); ) {
        var i = this.char()
        if (123 === i) {
          if ((n = this.parseArgument(e, o)).err) return n
          r.push(n.val)
        } else {
          if (125 === i && e > 0) break
          if (35 !== i || ('plural' !== t && 'selectordinal' !== t)) {
            if (60 === i && !this.ignoreTag && 47 === this.peek()) {
              if (o) break
              return this.error(
                hp.UNMATCHED_CLOSING_TAG,
                Gp(this.clonePosition(), this.clonePosition())
              )
            }
            if (60 === i && !this.ignoreTag && uu(this.peek() || 0)) {
              if ((n = this.parseTag(e, t)).err) return n
              r.push(n.val)
            } else {
              var n
              if ((n = this.parseLiteral(e, t)).err) return n
              r.push(n.val)
            }
          } else {
            var a = this.clonePosition()
            this.bump(),
              r.push({ type: gp.pound, location: Gp(a, this.clonePosition()) })
          }
        }
      }
      return { val: r, err: null }
    }),
    (e.prototype.parseTag = function (e, t) {
      var o = this.clonePosition()
      this.bump()
      var r = this.parseTagName()
      if ((this.bumpSpace(), this.bumpIf('/>')))
        return {
          val: {
            type: gp.literal,
            value: '<'.concat(r, '/>'),
            location: Gp(o, this.clonePosition()),
          },
          err: null,
        }
      if (this.bumpIf('>')) {
        var i = this.parseMessage(e + 1, t, !0)
        if (i.err) return i
        var n = i.val,
          a = this.clonePosition()
        if (this.bumpIf('</')) {
          if (this.isEOF() || !uu(this.char()))
            return this.error(hp.INVALID_TAG, Gp(a, this.clonePosition()))
          var s = this.clonePosition()
          return r !== this.parseTagName()
            ? this.error(hp.UNMATCHED_CLOSING_TAG, Gp(s, this.clonePosition()))
            : (this.bumpSpace(),
              this.bumpIf('>')
                ? {
                    val: {
                      type: gp.tag,
                      value: r,
                      children: n,
                      location: Gp(o, this.clonePosition()),
                    },
                    err: null,
                  }
                : this.error(hp.INVALID_TAG, Gp(a, this.clonePosition())))
        }
        return this.error(hp.UNCLOSED_TAG, Gp(o, this.clonePosition()))
      }
      return this.error(hp.INVALID_TAG, Gp(o, this.clonePosition()))
    }),
    (e.prototype.parseTagName = function () {
      var e = this.offset()
      for (this.bump(); !this.isEOF() && mu(this.char()); ) this.bump()
      return this.message.slice(e, this.offset())
    }),
    (e.prototype.parseLiteral = function (e, t) {
      for (var o = this.clonePosition(), r = ''; ; ) {
        var i = this.tryParseQuote(t)
        if (i) r += i
        else {
          var n = this.tryParseUnquoted(e, t)
          if (n) r += n
          else {
            var a = this.tryParseLeftAngleBracket()
            if (!a) break
            r += a
          }
        }
      }
      var s = Gp(o, this.clonePosition())
      return { val: { type: gp.literal, value: r, location: s }, err: null }
    }),
    (e.prototype.tryParseLeftAngleBracket = function () {
      return this.isEOF() ||
        60 !== this.char() ||
        (!this.ignoreTag && (uu((e = this.peek() || 0)) || 47 === e))
        ? null
        : (this.bump(), '<')
      var e
    }),
    (e.prototype.tryParseQuote = function (e) {
      if (this.isEOF() || 39 !== this.char()) return null
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'"
        case 123:
        case 60:
        case 62:
        case 125:
          break
        case 35:
          if ('plural' === e || 'selectordinal' === e) break
          return null
        default:
          return null
      }
      this.bump()
      var t = [this.char()]
      for (this.bump(); !this.isEOF(); ) {
        var o = this.char()
        if (39 === o) {
          if (39 !== this.peek()) {
            this.bump()
            break
          }
          t.push(39), this.bump()
        } else t.push(o)
        this.bump()
      }
      return iu.apply(void 0, t)
    }),
    (e.prototype.tryParseUnquoted = function (e, t) {
      if (this.isEOF()) return null
      var o = this.char()
      return 60 === o ||
        123 === o ||
        (35 === o && ('plural' === t || 'selectordinal' === t)) ||
        (125 === o && e > 0)
        ? null
        : (this.bump(), iu(o))
    }),
    (e.prototype.parseArgument = function (e, t) {
      var o = this.clonePosition()
      if ((this.bump(), this.bumpSpace(), this.isEOF()))
        return this.error(
          hp.EXPECT_ARGUMENT_CLOSING_BRACE,
          Gp(o, this.clonePosition())
        )
      if (125 === this.char())
        return (
          this.bump(),
          this.error(hp.EMPTY_ARGUMENT, Gp(o, this.clonePosition()))
        )
      var r = this.parseIdentifierIfPossible().value
      if (!r)
        return this.error(hp.MALFORMED_ARGUMENT, Gp(o, this.clonePosition()))
      if ((this.bumpSpace(), this.isEOF()))
        return this.error(
          hp.EXPECT_ARGUMENT_CLOSING_BRACE,
          Gp(o, this.clonePosition())
        )
      switch (this.char()) {
        case 125:
          return (
            this.bump(),
            {
              val: {
                type: gp.argument,
                value: r,
                location: Gp(o, this.clonePosition()),
              },
              err: null,
            }
          )
        case 44:
          return (
            this.bump(),
            this.bumpSpace(),
            this.isEOF()
              ? this.error(
                  hp.EXPECT_ARGUMENT_CLOSING_BRACE,
                  Gp(o, this.clonePosition())
                )
              : this.parseArgumentOptions(e, t, r, o)
          )
        default:
          return this.error(hp.MALFORMED_ARGUMENT, Gp(o, this.clonePosition()))
      }
    }),
    (e.prototype.parseIdentifierIfPossible = function () {
      var e = this.clonePosition(),
        t = this.offset(),
        o = ou(this.message, t),
        r = t + o.length
      return this.bumpTo(r), { value: o, location: Gp(e, this.clonePosition()) }
    }),
    (e.prototype.parseArgumentOptions = function (e, t, o, r) {
      var i,
        n = this.clonePosition(),
        a = this.parseIdentifierIfPossible().value,
        s = this.clonePosition()
      switch (a) {
        case '':
          return this.error(hp.EXPECT_ARGUMENT_TYPE, Gp(n, s))
        case 'number':
        case 'date':
        case 'time':
          this.bumpSpace()
          var l = null
          if (this.bumpIf(',')) {
            this.bumpSpace()
            var d = this.clonePosition()
            if ((f = this.parseSimpleArgStyleIfPossible()).err) return f
            if (0 === (m = lu(f.val)).length)
              return this.error(
                hp.EXPECT_ARGUMENT_STYLE,
                Gp(this.clonePosition(), this.clonePosition())
              )
            l = { style: m, styleLocation: Gp(d, this.clonePosition()) }
          }
          if ((y = this.tryParseArgumentClose(r)).err) return y
          var c = Gp(r, this.clonePosition())
          if (l && ru(null == l ? void 0 : l.style, '::', 0)) {
            var p = su(l.style.slice(2))
            if ('number' === a)
              return (f = this.parseNumberSkeletonFromString(
                p,
                l.styleLocation
              )).err
                ? f
                : {
                    val: {
                      type: gp.number,
                      value: o,
                      location: c,
                      style: f.val,
                    },
                    err: null,
                  }
            if (0 === p.length)
              return this.error(hp.EXPECT_DATE_TIME_SKELETON, c)
            var u = p
            this.locale &&
              (u = (function (e, t) {
                for (var o = '', r = 0; r < e.length; r++) {
                  var i = e.charAt(r)
                  if ('j' === i) {
                    for (var n = 0; r + 1 < e.length && e.charAt(r + 1) === i; )
                      n++, r++
                    var a = 1 + (1 & n),
                      s = n < 2 ? 1 : 3 + (n >> 1),
                      l = Up(t)
                    for (('H' != l && 'k' != l) || (s = 0); s-- > 0; ) o += 'a'
                    for (; a-- > 0; ) o = l + o
                  } else o += 'J' === i ? 'H' : i
                }
                return o
              })(p, this.locale))
            var m = {
              type: _p.dateTime,
              pattern: u,
              location: l.styleLocation,
              parsedOptions: this.shouldParseSkeletons ? Mp(u) : {},
            }
            return {
              val: {
                type: 'date' === a ? gp.date : gp.time,
                value: o,
                location: c,
                style: m,
              },
              err: null,
            }
          }
          return {
            val: {
              type:
                'number' === a ? gp.number : 'date' === a ? gp.date : gp.time,
              value: o,
              location: c,
              style:
                null !== (i = null == l ? void 0 : l.style) && void 0 !== i
                  ? i
                  : null,
            },
            err: null,
          }
        case 'plural':
        case 'selectordinal':
        case 'select':
          var h = this.clonePosition()
          if ((this.bumpSpace(), !this.bumpIf(',')))
            return this.error(
              hp.EXPECT_SELECT_ARGUMENT_OPTIONS,
              Gp(h, ap({}, h))
            )
          this.bumpSpace()
          var g = this.parseIdentifierIfPossible(),
            _ = 0
          if ('select' !== a && 'offset' === g.value) {
            if (!this.bumpIf(':'))
              return this.error(
                hp.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,
                Gp(this.clonePosition(), this.clonePosition())
              )
            var f
            if (
              (this.bumpSpace(),
              (f = this.tryParseDecimalInteger(
                hp.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,
                hp.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE
              )).err)
            )
              return f
            this.bumpSpace(),
              (g = this.parseIdentifierIfPossible()),
              (_ = f.val)
          }
          var y,
            b = this.tryParsePluralOrSelectOptions(e, a, t, g)
          if (b.err) return b
          if ((y = this.tryParseArgumentClose(r)).err) return y
          var v = Gp(r, this.clonePosition())
          return 'select' === a
            ? {
                val: {
                  type: gp.select,
                  value: o,
                  options: nu(b.val),
                  location: v,
                },
                err: null,
              }
            : {
                val: {
                  type: gp.plural,
                  value: o,
                  options: nu(b.val),
                  offset: _,
                  pluralType: 'plural' === a ? 'cardinal' : 'ordinal',
                  location: v,
                },
                err: null,
              }
        default:
          return this.error(hp.INVALID_ARGUMENT_TYPE, Gp(n, s))
      }
    }),
    (e.prototype.tryParseArgumentClose = function (e) {
      return this.isEOF() || 125 !== this.char()
        ? this.error(
            hp.EXPECT_ARGUMENT_CLOSING_BRACE,
            Gp(e, this.clonePosition())
          )
        : (this.bump(), { val: !0, err: null })
    }),
    (e.prototype.parseSimpleArgStyleIfPossible = function () {
      for (var e = 0, t = this.clonePosition(); !this.isEOF(); ) {
        switch (this.char()) {
          case 39:
            this.bump()
            var o = this.clonePosition()
            if (!this.bumpUntil("'"))
              return this.error(
                hp.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,
                Gp(o, this.clonePosition())
              )
            this.bump()
            break
          case 123:
            ;(e += 1), this.bump()
            break
          case 125:
            if (!(e > 0))
              return {
                val: this.message.slice(t.offset, this.offset()),
                err: null,
              }
            e -= 1
            break
          default:
            this.bump()
        }
      }
      return { val: this.message.slice(t.offset, this.offset()), err: null }
    }),
    (e.prototype.parseNumberSkeletonFromString = function (e, t) {
      var o = []
      try {
        o = (function (e) {
          if (0 === e.length) throw new Error('Number skeleton cannot be empty')
          for (
            var t = e.split(Pp).filter(function (e) {
                return e.length > 0
              }),
              o = [],
              r = 0,
              i = t;
            r < i.length;
            r++
          ) {
            var n = i[r].split('/')
            if (0 === n.length) throw new Error('Invalid number skeleton')
            for (var a = n[0], s = n.slice(1), l = 0, d = s; l < d.length; l++)
              if (0 === d[l].length) throw new Error('Invalid number skeleton')
            o.push({ stem: a, options: s })
          }
          return o
        })(e)
      } catch (e) {
        return this.error(hp.INVALID_NUMBER_SKELETON, t)
      }
      return {
        val: {
          type: _p.number,
          tokens: o,
          location: t,
          parsedOptions: this.shouldParseSkeletons ? Bp(o) : {},
        },
        err: null,
      }
    }),
    (e.prototype.tryParsePluralOrSelectOptions = function (e, t, o, r) {
      for (
        var i, n = !1, a = [], s = new Set(), l = r.value, d = r.location;
        ;

      ) {
        if (0 === l.length) {
          var c = this.clonePosition()
          if ('select' === t || !this.bumpIf('=')) break
          var p = this.tryParseDecimalInteger(
            hp.EXPECT_PLURAL_ARGUMENT_SELECTOR,
            hp.INVALID_PLURAL_ARGUMENT_SELECTOR
          )
          if (p.err) return p
          ;(d = Gp(c, this.clonePosition())),
            (l = this.message.slice(c.offset, this.offset()))
        }
        if (s.has(l))
          return this.error(
            'select' === t
              ? hp.DUPLICATE_SELECT_ARGUMENT_SELECTOR
              : hp.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,
            d
          )
        'other' === l && (n = !0), this.bumpSpace()
        var u = this.clonePosition()
        if (!this.bumpIf('{'))
          return this.error(
            'select' === t
              ? hp.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT
              : hp.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,
            Gp(this.clonePosition(), this.clonePosition())
          )
        var m = this.parseMessage(e + 1, t, o)
        if (m.err) return m
        var h = this.tryParseArgumentClose(u)
        if (h.err) return h
        a.push([l, { value: m.val, location: Gp(u, this.clonePosition()) }]),
          s.add(l),
          this.bumpSpace(),
          (l = (i = this.parseIdentifierIfPossible()).value),
          (d = i.location)
      }
      return 0 === a.length
        ? this.error(
            'select' === t
              ? hp.EXPECT_SELECT_ARGUMENT_SELECTOR
              : hp.EXPECT_PLURAL_ARGUMENT_SELECTOR,
            Gp(this.clonePosition(), this.clonePosition())
          )
        : this.requiresOtherClause && !n
        ? this.error(
            hp.MISSING_OTHER_CLAUSE,
            Gp(this.clonePosition(), this.clonePosition())
          )
        : { val: a, err: null }
    }),
    (e.prototype.tryParseDecimalInteger = function (e, t) {
      var o = 1,
        r = this.clonePosition()
      this.bumpIf('+') || (this.bumpIf('-') && (o = -1))
      for (var i = !1, n = 0; !this.isEOF(); ) {
        var a = this.char()
        if (!(a >= 48 && a <= 57)) break
        ;(i = !0), (n = 10 * n + (a - 48)), this.bump()
      }
      var s = Gp(r, this.clonePosition())
      return i
        ? eu((n *= o))
          ? { val: n, err: null }
          : this.error(t, s)
        : this.error(e, s)
    }),
    (e.prototype.offset = function () {
      return this.position.offset
    }),
    (e.prototype.isEOF = function () {
      return this.offset() === this.message.length
    }),
    (e.prototype.clonePosition = function () {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column,
      }
    }),
    (e.prototype.char = function () {
      var e = this.position.offset
      if (e >= this.message.length) throw Error('out of bound')
      var t = au(this.message, e)
      if (void 0 === t)
        throw Error(
          'Offset '.concat(e, ' is at invalid UTF-16 code unit boundary')
        )
      return t
    }),
    (e.prototype.error = function (e, t) {
      return { val: null, err: { kind: e, message: this.message, location: t } }
    }),
    (e.prototype.bump = function () {
      if (!this.isEOF()) {
        var e = this.char()
        10 === e
          ? ((this.position.line += 1),
            (this.position.column = 1),
            (this.position.offset += 1))
          : ((this.position.column += 1),
            (this.position.offset += e < 65536 ? 1 : 2))
      }
    }),
    (e.prototype.bumpIf = function (e) {
      if (ru(this.message, e, this.offset())) {
        for (var t = 0; t < e.length; t++) this.bump()
        return !0
      }
      return !1
    }),
    (e.prototype.bumpUntil = function (e) {
      var t = this.offset(),
        o = this.message.indexOf(e, t)
      return o >= 0
        ? (this.bumpTo(o), !0)
        : (this.bumpTo(this.message.length), !1)
    }),
    (e.prototype.bumpTo = function (e) {
      if (this.offset() > e)
        throw Error(
          'targetOffset '
            .concat(e, ' must be greater than or equal to the current offset ')
            .concat(this.offset())
        )
      for (e = Math.min(e, this.message.length); ; ) {
        var t = this.offset()
        if (t === e) break
        if (t > e)
          throw Error(
            'targetOffset '.concat(
              e,
              ' is at invalid UTF-16 code unit boundary'
            )
          )
        if ((this.bump(), this.isEOF())) break
      }
    }),
    (e.prototype.bumpSpace = function () {
      for (; !this.isEOF() && hu(this.char()); ) this.bump()
    }),
    (e.prototype.peek = function () {
      if (this.isEOF()) return null
      var e = this.char(),
        t = this.offset(),
        o = this.message.charCodeAt(t + (e >= 65536 ? 2 : 1))
      return null != o ? o : null
    }),
    e
  )
})()
function uu(e) {
  return (e >= 97 && e <= 122) || (e >= 65 && e <= 90)
}
function mu(e) {
  return (
    45 === e ||
    46 === e ||
    (e >= 48 && e <= 57) ||
    95 === e ||
    (e >= 97 && e <= 122) ||
    (e >= 65 && e <= 90) ||
    183 == e ||
    (e >= 192 && e <= 214) ||
    (e >= 216 && e <= 246) ||
    (e >= 248 && e <= 893) ||
    (e >= 895 && e <= 8191) ||
    (e >= 8204 && e <= 8205) ||
    (e >= 8255 && e <= 8256) ||
    (e >= 8304 && e <= 8591) ||
    (e >= 11264 && e <= 12271) ||
    (e >= 12289 && e <= 55295) ||
    (e >= 63744 && e <= 64975) ||
    (e >= 65008 && e <= 65533) ||
    (e >= 65536 && e <= 983039)
  )
}
function hu(e) {
  return (
    (e >= 9 && e <= 13) ||
    32 === e ||
    133 === e ||
    (e >= 8206 && e <= 8207) ||
    8232 === e ||
    8233 === e
  )
}
function gu(e) {
  return (
    (e >= 33 && e <= 35) ||
    36 === e ||
    (e >= 37 && e <= 39) ||
    40 === e ||
    41 === e ||
    42 === e ||
    43 === e ||
    44 === e ||
    45 === e ||
    (e >= 46 && e <= 47) ||
    (e >= 58 && e <= 59) ||
    (e >= 60 && e <= 62) ||
    (e >= 63 && e <= 64) ||
    91 === e ||
    92 === e ||
    93 === e ||
    94 === e ||
    96 === e ||
    123 === e ||
    124 === e ||
    125 === e ||
    126 === e ||
    161 === e ||
    (e >= 162 && e <= 165) ||
    166 === e ||
    167 === e ||
    169 === e ||
    171 === e ||
    172 === e ||
    174 === e ||
    176 === e ||
    177 === e ||
    182 === e ||
    187 === e ||
    191 === e ||
    215 === e ||
    247 === e ||
    (e >= 8208 && e <= 8213) ||
    (e >= 8214 && e <= 8215) ||
    8216 === e ||
    8217 === e ||
    8218 === e ||
    (e >= 8219 && e <= 8220) ||
    8221 === e ||
    8222 === e ||
    8223 === e ||
    (e >= 8224 && e <= 8231) ||
    (e >= 8240 && e <= 8248) ||
    8249 === e ||
    8250 === e ||
    (e >= 8251 && e <= 8254) ||
    (e >= 8257 && e <= 8259) ||
    8260 === e ||
    8261 === e ||
    8262 === e ||
    (e >= 8263 && e <= 8273) ||
    8274 === e ||
    8275 === e ||
    (e >= 8277 && e <= 8286) ||
    (e >= 8592 && e <= 8596) ||
    (e >= 8597 && e <= 8601) ||
    (e >= 8602 && e <= 8603) ||
    (e >= 8604 && e <= 8607) ||
    8608 === e ||
    (e >= 8609 && e <= 8610) ||
    8611 === e ||
    (e >= 8612 && e <= 8613) ||
    8614 === e ||
    (e >= 8615 && e <= 8621) ||
    8622 === e ||
    (e >= 8623 && e <= 8653) ||
    (e >= 8654 && e <= 8655) ||
    (e >= 8656 && e <= 8657) ||
    8658 === e ||
    8659 === e ||
    8660 === e ||
    (e >= 8661 && e <= 8691) ||
    (e >= 8692 && e <= 8959) ||
    (e >= 8960 && e <= 8967) ||
    8968 === e ||
    8969 === e ||
    8970 === e ||
    8971 === e ||
    (e >= 8972 && e <= 8991) ||
    (e >= 8992 && e <= 8993) ||
    (e >= 8994 && e <= 9e3) ||
    9001 === e ||
    9002 === e ||
    (e >= 9003 && e <= 9083) ||
    9084 === e ||
    (e >= 9085 && e <= 9114) ||
    (e >= 9115 && e <= 9139) ||
    (e >= 9140 && e <= 9179) ||
    (e >= 9180 && e <= 9185) ||
    (e >= 9186 && e <= 9254) ||
    (e >= 9255 && e <= 9279) ||
    (e >= 9280 && e <= 9290) ||
    (e >= 9291 && e <= 9311) ||
    (e >= 9472 && e <= 9654) ||
    9655 === e ||
    (e >= 9656 && e <= 9664) ||
    9665 === e ||
    (e >= 9666 && e <= 9719) ||
    (e >= 9720 && e <= 9727) ||
    (e >= 9728 && e <= 9838) ||
    9839 === e ||
    (e >= 9840 && e <= 10087) ||
    10088 === e ||
    10089 === e ||
    10090 === e ||
    10091 === e ||
    10092 === e ||
    10093 === e ||
    10094 === e ||
    10095 === e ||
    10096 === e ||
    10097 === e ||
    10098 === e ||
    10099 === e ||
    10100 === e ||
    10101 === e ||
    (e >= 10132 && e <= 10175) ||
    (e >= 10176 && e <= 10180) ||
    10181 === e ||
    10182 === e ||
    (e >= 10183 && e <= 10213) ||
    10214 === e ||
    10215 === e ||
    10216 === e ||
    10217 === e ||
    10218 === e ||
    10219 === e ||
    10220 === e ||
    10221 === e ||
    10222 === e ||
    10223 === e ||
    (e >= 10224 && e <= 10239) ||
    (e >= 10240 && e <= 10495) ||
    (e >= 10496 && e <= 10626) ||
    10627 === e ||
    10628 === e ||
    10629 === e ||
    10630 === e ||
    10631 === e ||
    10632 === e ||
    10633 === e ||
    10634 === e ||
    10635 === e ||
    10636 === e ||
    10637 === e ||
    10638 === e ||
    10639 === e ||
    10640 === e ||
    10641 === e ||
    10642 === e ||
    10643 === e ||
    10644 === e ||
    10645 === e ||
    10646 === e ||
    10647 === e ||
    10648 === e ||
    (e >= 10649 && e <= 10711) ||
    10712 === e ||
    10713 === e ||
    10714 === e ||
    10715 === e ||
    (e >= 10716 && e <= 10747) ||
    10748 === e ||
    10749 === e ||
    (e >= 10750 && e <= 11007) ||
    (e >= 11008 && e <= 11055) ||
    (e >= 11056 && e <= 11076) ||
    (e >= 11077 && e <= 11078) ||
    (e >= 11079 && e <= 11084) ||
    (e >= 11085 && e <= 11123) ||
    (e >= 11124 && e <= 11125) ||
    (e >= 11126 && e <= 11157) ||
    11158 === e ||
    (e >= 11159 && e <= 11263) ||
    (e >= 11776 && e <= 11777) ||
    11778 === e ||
    11779 === e ||
    11780 === e ||
    11781 === e ||
    (e >= 11782 && e <= 11784) ||
    11785 === e ||
    11786 === e ||
    11787 === e ||
    11788 === e ||
    11789 === e ||
    (e >= 11790 && e <= 11798) ||
    11799 === e ||
    (e >= 11800 && e <= 11801) ||
    11802 === e ||
    11803 === e ||
    11804 === e ||
    11805 === e ||
    (e >= 11806 && e <= 11807) ||
    11808 === e ||
    11809 === e ||
    11810 === e ||
    11811 === e ||
    11812 === e ||
    11813 === e ||
    11814 === e ||
    11815 === e ||
    11816 === e ||
    11817 === e ||
    (e >= 11818 && e <= 11822) ||
    11823 === e ||
    (e >= 11824 && e <= 11833) ||
    (e >= 11834 && e <= 11835) ||
    (e >= 11836 && e <= 11839) ||
    11840 === e ||
    11841 === e ||
    11842 === e ||
    (e >= 11843 && e <= 11855) ||
    (e >= 11856 && e <= 11857) ||
    11858 === e ||
    (e >= 11859 && e <= 11903) ||
    (e >= 12289 && e <= 12291) ||
    12296 === e ||
    12297 === e ||
    12298 === e ||
    12299 === e ||
    12300 === e ||
    12301 === e ||
    12302 === e ||
    12303 === e ||
    12304 === e ||
    12305 === e ||
    (e >= 12306 && e <= 12307) ||
    12308 === e ||
    12309 === e ||
    12310 === e ||
    12311 === e ||
    12312 === e ||
    12313 === e ||
    12314 === e ||
    12315 === e ||
    12316 === e ||
    12317 === e ||
    (e >= 12318 && e <= 12319) ||
    12320 === e ||
    12336 === e ||
    64830 === e ||
    64831 === e ||
    (e >= 65093 && e <= 65094)
  )
}
function _u(e) {
  e.forEach(function (e) {
    if ((delete e.location, wp(e) || Hp(e)))
      for (var t in e.options)
        delete e.options[t].location, _u(e.options[t].value)
    else
      (vp(e) && Lp(e.style)) || ((Cp(e) || Ap(e)) && xp(e.style))
        ? delete e.style.location
        : Sp(e) && _u(e.children)
  })
}
function fu(e, t) {
  void 0 === t && (t = {}),
    (t = ap({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, t))
  var o = new pu(e, t).parse()
  if (o.err) {
    var r = SyntaxError(hp[o.err.kind])
    throw (
      ((r.location = o.err.location), (r.originalMessage = o.err.message), r)
    )
  }
  return (null == t ? void 0 : t.captureLocation) || _u(o.val), o.val
}
function yu(e, t) {
  var o = t && t.cache ? t.cache : Su,
    r = t && t.serializer ? t.serializer : wu
  return (t && t.strategy ? t.strategy : Au)(e, { cache: o, serializer: r })
}
function bu(e, t, o, r) {
  var i,
    n =
      null == (i = r) || 'number' == typeof i || 'boolean' == typeof i
        ? r
        : o(r),
    a = t.get(n)
  return void 0 === a && ((a = e.call(this, r)), t.set(n, a)), a
}
function vu(e, t, o) {
  var r = Array.prototype.slice.call(arguments, 3),
    i = o(r),
    n = t.get(i)
  return void 0 === n && ((n = e.apply(this, r)), t.set(i, n)), n
}
function Cu(e, t, o, r, i) {
  return o.bind(t, e, r, i)
}
function Au(e, t) {
  return Cu(e, this, 1 === e.length ? bu : vu, t.cache.create(), t.serializer)
}
var wu = function () {
  return JSON.stringify(arguments)
}
function Hu() {
  this.cache = Object.create(null)
}
;(Hu.prototype.get = function (e) {
  return this.cache[e]
}),
  (Hu.prototype.set = function (e, t) {
    this.cache[e] = t
  })
var ku,
  Su = {
    create: function () {
      return new Hu()
    },
  },
  Lu = {
    variadic: function (e, t) {
      return Cu(e, this, vu, t.cache.create(), t.serializer)
    },
    monadic: function (e, t) {
      return Cu(e, this, bu, t.cache.create(), t.serializer)
    },
  }
!(function (e) {
  ;(e.MISSING_VALUE = 'MISSING_VALUE'),
    (e.INVALID_VALUE = 'INVALID_VALUE'),
    (e.MISSING_INTL_API = 'MISSING_INTL_API')
})(ku || (ku = {}))
var xu,
  Vu = (function (e) {
    function t(t, o, r) {
      var i = e.call(this, t) || this
      return (i.code = o), (i.originalMessage = r), i
    }
    return (
      np(t, e),
      (t.prototype.toString = function () {
        return '[formatjs Error: '.concat(this.code, '] ').concat(this.message)
      }),
      t
    )
  })(Error),
  Eu = (function (e) {
    function t(t, o, r, i) {
      return (
        e.call(
          this,
          'Invalid values for "'
            .concat(t, '": "')
            .concat(o, '". Options are "')
            .concat(Object.keys(r).join('", "'), '"'),
          ku.INVALID_VALUE,
          i
        ) || this
      )
    }
    return np(t, e), t
  })(Vu),
  Mu = (function (e) {
    function t(t, o, r) {
      return (
        e.call(
          this,
          'Value for "'.concat(t, '" must be of type ').concat(o),
          ku.INVALID_VALUE,
          r
        ) || this
      )
    }
    return np(t, e), t
  })(Vu),
  Pu = (function (e) {
    function t(t, o) {
      return (
        e.call(
          this,
          'The intl string context variable "'
            .concat(t, '" was not provided to the string "')
            .concat(o, '"'),
          ku.MISSING_VALUE,
          o
        ) || this
      )
    }
    return np(t, e), t
  })(Vu)
function Tu(e) {
  return 'function' == typeof e
}
function zu(e, t, o, r, i, n, a) {
  if (1 === e.length && yp(e[0]))
    return [{ type: xu.literal, value: e[0].value }]
  for (var s = [], l = 0, d = e; l < d.length; l++) {
    var c = d[l]
    if (yp(c)) s.push({ type: xu.literal, value: c.value })
    else if (kp(c))
      'number' == typeof n &&
        s.push({ type: xu.literal, value: o.getNumberFormat(t).format(n) })
    else {
      var p = c.value
      if (!i || !(p in i)) throw new Pu(p, a)
      var u = i[p]
      if (bp(c))
        (u && 'string' != typeof u && 'number' != typeof u) ||
          (u = 'string' == typeof u || 'number' == typeof u ? String(u) : ''),
          s.push({
            type: 'string' == typeof u ? xu.literal : xu.object,
            value: u,
          })
      else if (Cp(c)) {
        var m =
          'string' == typeof c.style
            ? r.date[c.style]
            : xp(c.style)
            ? c.style.parsedOptions
            : void 0
        s.push({ type: xu.literal, value: o.getDateTimeFormat(t, m).format(u) })
      } else if (Ap(c)) {
        m =
          'string' == typeof c.style
            ? r.time[c.style]
            : xp(c.style)
            ? c.style.parsedOptions
            : r.time.medium
        s.push({ type: xu.literal, value: o.getDateTimeFormat(t, m).format(u) })
      } else if (vp(c)) {
        ;(m =
          'string' == typeof c.style
            ? r.number[c.style]
            : Lp(c.style)
            ? c.style.parsedOptions
            : void 0) &&
          m.scale &&
          (u *= m.scale || 1),
          s.push({ type: xu.literal, value: o.getNumberFormat(t, m).format(u) })
      } else {
        if (Sp(c)) {
          var h = c.children,
            g = c.value,
            _ = i[g]
          if (!Tu(_)) throw new Mu(g, 'function', a)
          var f = _(
            zu(h, t, o, r, i, n).map(function (e) {
              return e.value
            })
          )
          Array.isArray(f) || (f = [f]),
            s.push.apply(
              s,
              f.map(function (e) {
                return {
                  type: 'string' == typeof e ? xu.literal : xu.object,
                  value: e,
                }
              })
            )
        }
        if (wp(c)) {
          if (!(y = c.options[u] || c.options.other))
            throw new Eu(c.value, u, Object.keys(c.options), a)
          s.push.apply(s, zu(y.value, t, o, r, i))
        } else if (Hp(c)) {
          var y
          if (!(y = c.options['='.concat(u)])) {
            if (!Intl.PluralRules)
              throw new Vu(
                'Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',
                ku.MISSING_INTL_API,
                a
              )
            var b = o
              .getPluralRules(t, { type: c.pluralType })
              .select(u - (c.offset || 0))
            y = c.options[b] || c.options.other
          }
          if (!y) throw new Eu(c.value, u, Object.keys(c.options), a)
          s.push.apply(s, zu(y.value, t, o, r, i, u - (c.offset || 0)))
        } else;
      }
    }
  }
  return (function (e) {
    return e.length < 2
      ? e
      : e.reduce(function (e, t) {
          var o = e[e.length - 1]
          return (
            o && o.type === xu.literal && t.type === xu.literal
              ? (o.value += t.value)
              : e.push(t),
            e
          )
        }, [])
  })(s)
}
function Nu(e, t) {
  return t
    ? Object.keys(e).reduce(function (o, r) {
        var i, n
        return (
          (o[r] =
            ((i = e[r]),
            (n = t[r])
              ? ap(
                  ap(ap({}, i || {}), n || {}),
                  Object.keys(i).reduce(function (e, t) {
                    return (e[t] = ap(ap({}, i[t]), n[t] || {})), e
                  }, {})
                )
              : i)),
          o
        )
      }, ap({}, e))
    : e
}
function Iu(e) {
  return {
    create: function () {
      return {
        get: function (t) {
          return e[t]
        },
        set: function (t, o) {
          e[t] = o
        },
      }
    },
  }
}
!(function (e) {
  ;(e[(e.literal = 0)] = 'literal'), (e[(e.object = 1)] = 'object')
})(xu || (xu = {}))
var Ou = (function () {
    function e(t, o, r, i) {
      var n,
        a = this
      if (
        (void 0 === o && (o = e.defaultLocale),
        (this.formatterCache = { number: {}, dateTime: {}, pluralRules: {} }),
        (this.format = function (e) {
          var t = a.formatToParts(e)
          if (1 === t.length) return t[0].value
          var o = t.reduce(function (e, t) {
            return (
              e.length &&
              t.type === xu.literal &&
              'string' == typeof e[e.length - 1]
                ? (e[e.length - 1] += t.value)
                : e.push(t.value),
              e
            )
          }, [])
          return o.length <= 1 ? o[0] || '' : o
        }),
        (this.formatToParts = function (e) {
          return zu(
            a.ast,
            a.locales,
            a.formatters,
            a.formats,
            e,
            void 0,
            a.message
          )
        }),
        (this.resolvedOptions = function () {
          return { locale: a.resolvedLocale.toString() }
        }),
        (this.getAst = function () {
          return a.ast
        }),
        (this.locales = o),
        (this.resolvedLocale = e.resolveLocale(o)),
        'string' == typeof t)
      ) {
        if (((this.message = t), !e.__parse))
          throw new TypeError(
            'IntlMessageFormat.__parse must be set to process `message` of type `string`'
          )
        this.ast = e.__parse(t, {
          ignoreTag: null == i ? void 0 : i.ignoreTag,
          locale: this.resolvedLocale,
        })
      } else this.ast = t
      if (!Array.isArray(this.ast))
        throw new TypeError('A message must be provided as a String or AST.')
      ;(this.formats = Nu(e.formats, r)),
        (this.formatters =
          (i && i.formatters) ||
          (void 0 === (n = this.formatterCache) &&
            (n = { number: {}, dateTime: {}, pluralRules: {} }),
          {
            getNumberFormat: yu(
              function () {
                for (var e, t = [], o = 0; o < arguments.length; o++)
                  t[o] = arguments[o]
                return new ((e = Intl.NumberFormat).bind.apply(
                  e,
                  pp([void 0], t, !1)
                ))()
              },
              { cache: Iu(n.number), strategy: Lu.variadic }
            ),
            getDateTimeFormat: yu(
              function () {
                for (var e, t = [], o = 0; o < arguments.length; o++)
                  t[o] = arguments[o]
                return new ((e = Intl.DateTimeFormat).bind.apply(
                  e,
                  pp([void 0], t, !1)
                ))()
              },
              { cache: Iu(n.dateTime), strategy: Lu.variadic }
            ),
            getPluralRules: yu(
              function () {
                for (var e, t = [], o = 0; o < arguments.length; o++)
                  t[o] = arguments[o]
                return new ((e = Intl.PluralRules).bind.apply(
                  e,
                  pp([void 0], t, !1)
                ))()
              },
              { cache: Iu(n.pluralRules), strategy: Lu.variadic }
            ),
          }))
    }
    return (
      Object.defineProperty(e, 'defaultLocale', {
        get: function () {
          return (
            e.memoizedDefaultLocale ||
              (e.memoizedDefaultLocale =
                new Intl.NumberFormat().resolvedOptions().locale),
            e.memoizedDefaultLocale
          )
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.memoizedDefaultLocale = null),
      (e.resolveLocale = function (e) {
        var t = Intl.NumberFormat.supportedLocalesOf(e)
        return t.length > 0
          ? new Intl.Locale(t[0])
          : new Intl.Locale('string' == typeof e ? e : e[0])
      }),
      (e.__parse = fu),
      (e.formats = {
        number: {
          integer: { maximumFractionDigits: 0 },
          currency: { style: 'currency' },
          percent: { style: 'percent' },
        },
        date: {
          short: { month: 'numeric', day: 'numeric', year: '2-digit' },
          medium: { month: 'short', day: 'numeric', year: 'numeric' },
          long: { month: 'long', day: 'numeric', year: 'numeric' },
          full: {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          },
        },
        time: {
          short: { hour: 'numeric', minute: 'numeric' },
          medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
          long: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
          },
          full: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
          },
        },
      }),
      e
    )
  })(),
  Ru = Ou
class Du {
  constructor(t) {
    e(this, 'prefix', void 0), (this.prefix = t ? `[VAIS.${t}]` : '[VAIS]')
  }
  info(e) {
    this.log(e)
  }
  log(e) {
    console.log(this.prefix, e)
  }
  debug(e) {
    console.debug(this.prefix, e)
  }
  warn(e) {
    console.warn(this.prefix, e)
  }
  error(e) {
    console.error(this.prefix, e)
  }
}
const ju = {
    bg_BG: {
      'common.add': 'добавете',
      'common.cancel': 'Отказ',
      'common.ignore': 'Игнорирайте',
      'common.integration': 'Интеграция',
      'common.integration_plural': 'Интеграции',
      'common.lovelace': 'Lovelace',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.reload': 'Презареждане',
      'common.remove': 'Премахване',
      'common.repositories': 'Хранилища',
      'common.repository': 'Хранилище',
      'common.show': 'Покажи',
      'common.theme': 'Тема',
      'common.update': 'Актуализация',
      'common.updates': 'Актуализации',
      'confirm.home_assistant_version_not_correct':
        'Изпълнявате версия "{haversion}" на Home Assistant, но това хранилище изисква да бъде инсталирана минимална версия "{minversion}".',
      'dialog.configured.confirm': 'Отидете на интеграции',
      'dialog.configured.message':
        'Интеграцията {name} е конфигурирана, трябва да изтриете конфигурацията за нея, преди да я премахнете от VAIS',
      'dialog.configured.title': 'Интеграцията е конфигурирана',
      'dialog.reload.confirm': 'Искате ли да направите това сега?',
      'dialog.reload.description':
        'Трябва да изчистите кеша на браузъра си, когато променяте ресурсите на Lovelace.',
      'dialog_about.frontend_version': 'Версия на интерфейса',
      'dialog_about.integration_version': 'Версия на интеграцията',
      'dialog_about.useful_links': 'Полезни връзки',
      'dialog_add_repo.limit':
        'Само първите 100 хранилища са показани, използвайте търсенето, за да филтрирате това, от което се нуждаете',
      'dialog_add_repo.no_match':
        'Не са намерени хранилища, съответстващи на вашия филтър',
      'dialog_add_repo.sort_by': 'Сортиране по',
      'dialog_add_repo.title': 'Добавяне на хранилище',
      'dialog_custom_repositories.category': 'Категория',
      'dialog_custom_repositories.no_category': 'Липсваща категория',
      'dialog_custom_repositories.no_repository': 'Липсващо хранилище',
      'dialog_custom_repositories.title': 'Потребителски хранилища',
      'dialog_custom_repositories.url_placeholder':
        'Добавете URL адрес на потребителското хранилище',
      'dialog_download.lovelace_instruction':
        'След като изтеглянето завърши, тъй като не използвате Lovelace в режим на съхранение, трябва ръчно да добавите ресурса със следните настройки:',
      'dialog_info.author': 'Автор',
      'dialog_info.downloads': 'Изтегляния',
      'dialog_info.loading': 'Зарежда се информация ...',
      'dialog_info.no_info':
        'Разработчикът не е предоставил повече информация за това хранилище',
      'dialog_info.open_issues': 'Отворени въпроси',
      'dialog_info.open_repo': 'Отворете хранилището',
      'dialog_info.stars': 'Звезди',
      'dialog_info.version_installed': 'Изтеглена Версия',
      'dialog_removed.link': 'Външна връзка за повече информация',
      'dialog_removed.name': 'Име на хранилището',
      'dialog_removed.reason': 'Причина за премахване',
      'dialog_removed.type': 'Тип на премахване',
      'dialog_update.available_version': 'Налична версия',
      'dialog_update.changelog': 'Дневник на промените',
      'dialog_update.downloaded_version': 'Изтеглена версия',
      'dialog_update.message': 'Налична е нова версия на {name}',
      'dialog_update.no_info':
        'Авторът не е предоставил никаква информация за това издание',
      'dialog_update.releasenotes': 'Бележки по изданието за {release}',
      'dialog_update.title': 'Чакаща актуализация',
      'entry.information': 'Информация',
      'entry.intro':
        'Актуализации и важни съобщения ще се показват тук, ако има такива',
      'entry.messages.disabled.content':
        'Проверете вашия лог файл за повече подробности',
      'entry.messages.disabled.removed.description':
        'VAIS е премахнат, рестартирайте Home Assistant.',
      'entry.messages.disabled.title': 'VAIS е деактивиран',
      'entry.messages.has_pending_tasks.content':
        'Някои хранилища може да не се показват, докато този процес не приключи',
      'entry.messages.has_pending_tasks.title':
        'Предстоящи задачи на заден план',
      'entry.messages.removed_repository':
        "Премахнато хранилище ''{repository}''",
      'entry.messages.resources.content':
        'Имате {number} елементи на Lovelace, които не са заредени правилно в Lovelace.',
      'entry.messages.resources.title': 'Не е зареден в Lovelace',
      'entry.messages.restart.content':
        'Имате {number} {pluralWording} който изисква рестартиране на Home Assistant, можете да го направите от раздела „Контроли на сървъра“ в конфигурационната част на потребителския интерфейс на Home Assistant.',
      'entry.messages.restart.title': 'Изчакващ рестартиране',
      'entry.messages.setup.content':
        'VAIS се настройва, през това време някои данни може да липсват или да са неправилни',
      'entry.messages.setup.title': 'VAIS се настройва',
      'entry.messages.startup.content':
        'VAIS се стартира, през това време някои данни може да липсват или да са неправилни',
      'entry.messages.startup.title': 'VAIS стартира',
      'entry.messages.waiting.content':
        'VAIS изчаква Home Assistant да завърши стартирането, преди да започне със своите стартови задачи',
      'entry.messages.waiting.title': 'VAIS изчаква',
      'entry.messages.wrong_frontend_installed.title':
        'Неочаквана версия на интерфейса',
      'entry.messages.wrong_frontend_loaded.content':
        'Изпълнява се версия {running} на VAIS, но се очакваше версия {expected} , препоръчва се да изчистите кеша на браузъра си.',
      'entry.messages.wrong_frontend_loaded.title':
        'Неочаквана версия на интерфейса',
      'entry.pending_updates': 'Чакащи актуализации',
      'menu.about': 'Относно VAIS',
      'menu.clear': 'Изчистване на всичко ново',
      'menu.custom_repositories': 'Потребителски хранилища',
      'menu.dismiss': 'Отхвърляне на всички нови хранилища',
      'menu.documentation': 'Документация',
      'menu.open_issue': 'Задай въпрос',
      'menu.reload': 'Презареждане на прозореца',
      'options.abort.not_setup': 'VAIS не е настроен.',
      'options.step.user.data.appdaemon':
        'Активирайте откриването и проследяването на AppDaemon приложения',
      'options.step.user.data.country': 'Филтър с код на държавата.',
      'options.step.user.data.debug': 'Активиране на отстраняване на грешки.',
      'options.step.user.data.experimental':
        'Активиране на експериментални функции',
      'options.step.user.data.netdaemon':
        'Активирайте откриването и проследяването на NetDaemon приложения',
      'options.step.user.data.not_in_use': 'Не се използва с YAML',
      'options.step.user.data.release_limit': 'Брой издания за показване.',
      'options.step.user.data.sidepanel_icon': 'Икона на страничния панел',
      'options.step.user.data.sidepanel_title': 'Заглавие на страничния панел',
      'repository_card.dismiss': 'отхвърляне',
      'repository_card.information': 'Информация',
      'repository_card.new_repository': 'Ново хранилище',
      'repository_card.not_loaded': 'Не е зареден',
      'repository_card.open_issue': 'Задай въпрос',
      'repository_card.open_source': 'Отворен код',
      'repository_card.pending_restart': 'Изчакващ рестартиране',
      'repository_card.pending_update': 'Чакаща актуализация',
      'repository_card.report': 'Докладвайте за премахване',
      'repository_card.update_information': 'Информация за актуализиране',
      'search.placeholder': 'Потърсете хранилище',
      'sections.about.description': 'Показване на информация за VAIS',
      'sections.about.title': 'За',
      'sections.addon.description':
        'Няма добавки в VAIS, но можете да натиснете тук, за да стигнете до супервайзъра.',
      'sections.addon.title': 'Добавки',
      'sections.automation.description':
        'Тук ще намерите python_scripts, AppDaemon приложения и NetDaemon приложения',
      'sections.automation.title': 'Автоматизация',
      'sections.frontend.description':
        'Това е мястото, където можете да намерите теми, потребителски карти и други елементи за Lovelace',
      'sections.frontend.title': 'Интерфейс',
      'sections.integrations.description':
        'Тук можете да намерите потребителски интеграции (custom_components)',
      'sections.integrations.title': 'Интеграции',
      'sections.pending_repository_upgrade':
        'Изпълнявате версия {installed} , достъпна е версия {available}',
      'store.no_repositories': 'Няма хранилища',
      'store.no_repositories_desc1':
        'Изглежда, че все още нямате инсталирани хранилища в този раздел.',
      'store.no_repositories_desc2':
        'Кликнете върху + в долния ъгъл, за да добавите своето първо хранилище!',
      'store.no_repositories_found_desc1':
        'В този раздел не са намерени инсталирани хранилища, съответстващи на "{searchInput}".',
      'store.no_repositories_found_desc2': 'Опитайте да търсите нещо друго!',
    },
    cs: {
      'common.add': 'přidat',
      'common.cancel': 'Zrušit',
      'common.close': 'Zavřít',
      'common.download': 'Stáhnout',
      'common.ignore': 'Ignorovat',
      'common.integration': 'Integrace',
      'common.integration_plural': 'Integrace',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'přejít',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Python skript',
      'common.reload': 'Znovu načíst',
      'common.remove': 'Odstranit',
      'common.repositories': 'Repozitáře',
      'common.repository': 'Repozitář',
      'common.theme': 'Motiv',
      'common.update': 'Aktualizovat',
      'common.yes': 'Ano',
      'confirm.home_assistant_version_not_correct':
        'Používáte Home Assistant ve verzi "{haversion}", ale tento repozitář vyžaduje instalaci minimálně verzi "{minversion}".',
      'dialog.configured.confirm': 'Přejít na integrace',
      'dialog.configured.title': 'Integrace je nakonfigurována',
      'dialog.reload.confirm': 'Chcete to udělat hned teď?',
      'dialog.reload.description':
        'Při změně zdrojů Lovelace musíte vymazat mezipaměť prohlížeče.',
      'dialog.remove.message': 'Opravdu chcete odstranit {name} ?',
      'dialog_about.downloaded_repositories': 'Stažená úložiště',
      'dialog_about.frontend_version': 'Verze rozhraní',
      'dialog_about.integration_version': 'Verze integrace',
      'dialog_about.useful_links': 'Užitečné odkazy',
      'dialog_add_repo.limit':
        'Zobrazeno je pouze prvních 100 repozitářů, pomocí vyhledávání můžete filtrovat, co potřebujete',
      'dialog_add_repo.no_match': 'Vašemu filtru neodpovídají žádné repozitáře',
      'dialog_add_repo.sort_by': 'Řadit dle',
      'dialog_add_repo.title': 'Přidat repozitář',
      'dialog_custom_repositories.category': 'Kategorie',
      'dialog_custom_repositories.no_category': 'Chybí kategorie',
      'dialog_custom_repositories.no_repository': 'Chybí repozitář',
      'dialog_custom_repositories.title': 'Vlastní repozitáře',
      'dialog_custom_repositories.url_placeholder':
        'Přidat URL adresu vlastního repozitáře',
      'dialog_download.select_version': 'Zvolte verzi',
      'dialog_download.show_beta': 'Zobrazit beta verze',
      'dialog_info.author': 'Autor',
      'dialog_info.downloads': 'Staženo',
      'dialog_info.loading': 'Načítání informací...',
      'dialog_info.no_info':
        'Vývojář neposkytl pro tento repozitář žádné další informace',
      'dialog_info.open_issues': 'Nahlásit problémy',
      'dialog_info.open_repo': 'Otevřít repozitář',
      'dialog_info.stars': 'Hvězdičky',
      'dialog_info.version_installed': 'Verze stažena',
      'dialog_removed.link': 'Externí odkaz pro další informace',
      'dialog_removed.name': 'Název repozitáře',
      'dialog_removed.reason': 'Důvod odstranění',
      'dialog_removed.type': 'Typ odstranění',
      'dialog_update.available_version': 'Dostupná verze',
      'dialog_update.changelog': 'Seznam změn',
      'dialog_update.downloaded_version': 'Stažená verze',
      'dialog_update.message': 'Je k dispozici nová verze {name}',
      'dialog_update.no_info':
        'Autor neposkytl žádné informace pro toto vydání',
      'dialog_update.releasenotes': 'Poznámky k vydáno pro {release}',
      'dialog_update.title': 'Aktualizace čeká na vyřízení',
      'entry.information': 'Informace',
      'entry.intro': 'Zde budou zobrazeny aktualizace a důležité zprávy',
      'entry.messages.disabled.constrains.description':
        'Vaše prostředí nepodporuje běh VAIS, pro více detailů zkontrolujte logy.',
      'entry.messages.disabled.content':
        'Zkontrolujte protokol pro další podrobnosti',
      'entry.messages.disabled.invalid_token.title': 'Neplatný token',
      'entry.messages.disabled.load_vais.description':
        'Pro více detailů zkontrolujte logy',
      'entry.messages.disabled.load_vais.title': 'VAIS nebylo možné načíst',
      'entry.messages.disabled.rate_limit.description':
        'API požadavky GitHub omezeny, toto hlášení by mělo zmizet během hodiny.',
      'entry.messages.disabled.rate_limit.title': 'Omezení požadavků',
      'entry.messages.disabled.removed.description':
        'VAIS odstraněn, restartuj Home Assistant.',
      'entry.messages.disabled.removed.title': 'Odstraněno',
      'entry.messages.disabled.restore.title': 'Obnova VAIS selhala',
      'entry.messages.disabled.title': 'VAIS je deaktivován',
      'entry.messages.has_pending_tasks.content':
        'Některé repozitáře se nemusí zobrazit, dokud toto není dokončeno.',
      'entry.messages.has_pending_tasks.title':
        'Úkoly na pozadí čekají na vyřízení',
      'entry.messages.removed_repository': "Odebráno úložiště ''{repository}''",
      'entry.messages.resources.content':
        'Máte {number} prvků Lovelace, které nejsou v Lovelace správně načteny.',
      'entry.messages.resources.title': 'Nenačteno v Lovelace',
      'entry.messages.restart.content':
        'Máte {number} integrací, které vyžadují restart Home Assistant, můžete to udělat v sekci "Ovládání serveru" v nastavení Home Assistant.',
      'entry.messages.restart.title': 'Čeká se na restart',
      'entry.messages.setup.content':
        'VAIS se nastavuje, během této doby mohou některé informace chybět nebo být nesprávné',
      'entry.messages.setup.title': 'VAIS se nastavuje',
      'entry.messages.startup.content':
        'VAIS se spouští, během této doby mohou některé informace chybět nebo být nesprávné',
      'entry.messages.startup.title': 'VAIS se spouští',
      'entry.messages.waiting.content':
        'VAIS čeká na dokončení spuštění Home Assistant, než bude moci spustit své úlohy',
      'entry.messages.waiting.title': 'VAIS čeká',
      'entry.messages.wrong_frontend_loaded.content':
        'Používáte verzi {running} rozhraní VAIS, ale je očekávána verze {expected}, měli byste vymazat mezipaměť prohlížeče.',
      'entry.messages.wrong_frontend_loaded.title':
        'Neočekávaná verze rozhraní',
      'entry.pending_updates': 'Čekající aktualizace',
      'menu.about': 'O VAIS',
      'menu.clear': 'Vymazat vše nové',
      'menu.custom_repositories': 'Vlastní repozitáře',
      'menu.dismiss': 'Odmítnout všechny nové repozitáře',
      'menu.documentation': 'Dokumentace',
      'menu.open_issue': 'Nahlásit problém',
      'menu.reload': 'Znovu načíst okno',
      'options.abort.not_setup': 'VAIS není nastaven.',
      'options.abort.release_limit_value': 'Limit vydání musí být mezi 1 a 100',
      'options.step.user.data.appdaemon':
        'Povolit zjišťování a sledování aplikací AppDaemon',
      'options.step.user.data.country': 'Filtrovat pomocí kódu země.',
      'options.step.user.data.debug': 'Povolit ladění.',
      'options.step.user.data.experimental': 'Povolit experimentální funkce',
      'options.step.user.data.netdaemon':
        'Povolit zjišťování a sledování aplikací NetDaemon',
      'options.step.user.data.not_in_use': 'Nepoužívá se s YAML',
      'options.step.user.data.release_limit':
        'Počet vydání, která se mají zobrazit.',
      'options.step.user.data.sidepanel_icon': 'Ikona postranního panelu',
      'options.step.user.data.sidepanel_title': 'Název postranního panelu',
      'repository_card.dismiss': 'zamítnout',
      'repository_card.information': 'Informace',
      'repository_card.new_repository': 'Nový repozitář',
      'repository_card.not_loaded': 'Nenačteno',
      'repository_card.open_issue': 'Nahlásit problém',
      'repository_card.open_source': 'Otevřít zdrojový kód',
      'repository_card.pending_restart': 'Čeká se na restart',
      'repository_card.pending_update': 'Čeká na aktualizaci',
      'repository_card.redownload': 'Stáhnout znovu',
      'repository_card.report': 'Zpráva o odstranění',
      'repository_card.update_information': 'Informace o aktualizaci',
      'search.placeholder': 'Hledat repozitář',
      'sections.about.description': 'Zobrazit informace o VAIS',
      'sections.about.title': 'O VAIS',
      'sections.addon.description':
        'V VAIS nejsou žádné doplňky, ale kliknutím sem se dostanete k Supervisoru',
      'sections.addon.title': 'Doplňky',
      'sections.automation.description':
        'Zde najdete skripty v Pythonu, aplikace AppDaemon a aplikace NetDaemon',
      'sections.automation.title': 'Automatizace',
      'sections.frontend.description':
        'Zde najdete motivy, vlastní karty a další prvky pro Lovelace',
      'sections.frontend.title': 'Rozhraní',
      'sections.integrations.description':
        'Zde najdete vlastní integrace (custom_components)',
      'sections.integrations.title': 'Integrace',
      'sections.pending_repository_upgrade':
        'Používáte verzi {installed}, verze {available} je k dispozici',
      'store.no_repositories': 'Žádné repozitáře',
      'store.no_repositories_desc1':
        'Vypadá to, že v této sekci ještě nemáte nainstalované žádné repozitáře.',
      'store.no_repositories_desc2':
        'Kliknutím na + ve spodním rohu přidáte svůj první!',
      'store.no_repositories_found_desc1':
        'V této části nebyly nalezeny žádné nainstalované repozitáře odpovídající "{searchInput}".',
      'store.no_repositories_found_desc2': 'Zkuste hledat něco jiného!',
    },
    da: {
      'common.add': 'tilføj',
      'common.cancel': 'Annuller',
      'common.close': 'Luk',
      'common.download': 'Download',
      'common.integration': 'Integration',
      'common.integration_plural': 'Integrationer',
      'common.lovelace': 'Lovelace',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.reload': 'Genindlæs',
      'common.remove': 'Fjern',
      'common.repositories': 'Repositories',
      'common.repository': 'Repository',
      'common.theme': 'Tema',
      'common.update': 'Opdater',
      'confirm.home_assistant_version_not_correct':
        "Du kører Home Assistant version ''{haversion}'', men dette repository kræver som minimum version ''{minversion}''.",
      'dialog.configured.confirm': 'Gå til integrationer',
      'dialog_about.frontend_version': 'Frontend-version',
      'dialog_about.integration_version': 'Integrationsversion',
      'dialog_about.useful_links': 'Nyttige links',
      'dialog_add_repo.limit':
        'Kun de første 100 repositories vises. Brug søgningen til at filtrere, hvad du har brug for',
      'dialog_add_repo.no_match':
        'Der blev ikke fundet nogen repositories, der matcher dit filter',
      'dialog_add_repo.sort_by': 'Sorter efter',
      'dialog_add_repo.title': 'Tilføj repository',
      'dialog_custom_repositories.category': 'Kategori',
      'dialog_custom_repositories.no_category': 'Manglende kategori',
      'dialog_custom_repositories.no_repository': 'Manglende repository',
      'dialog_custom_repositories.title': 'Brugerdefinerede repositories',
      'dialog_custom_repositories.url_placeholder':
        'Tilføj brugerdefineret repository-webadresse',
      'dialog_info.author': 'Udvikler',
      'dialog_info.downloads': 'Downloads',
      'dialog_info.loading': 'Indlæser oplysninger...',
      'dialog_info.no_info':
        'Udvikleren har ikke givet flere oplysninger om dette repository',
      'dialog_info.open_issues': 'Åbn issues',
      'dialog_info.open_repo': 'Åbn repository',
      'dialog_info.stars': 'Stjerner',
      'dialog_update.available_version': 'Tilgængelig version',
      'dialog_update.changelog': 'Udgivelsesnoter',
      'dialog_update.releasenotes': 'Udgivelsesnoter for {release}',
      'dialog_update.title': 'Ventende opdatering',
      'entry.information': 'Oplysninger',
      'entry.intro':
        'Opdateringer og vigtige meddelelser vises her, hvis der er nogen',
      'entry.messages.disabled.content': 'Tjek din logfil for flere detaljer',
      'entry.messages.disabled.title': 'VAIS er deaktiveret',
      'entry.messages.has_pending_tasks.content':
        'Nogle repositories vises muligvis ikke, før dette er fuldført',
      'entry.messages.has_pending_tasks.title': 'Baggrundsopgaver venter',
      'entry.messages.resources.content':
        'Du har {number} Lovelace-elementer, der ikke er indlæst korrekt i Lovelace.',
      'entry.messages.resources.title': 'Ikke indlæst i Lovelace',
      'entry.messages.restart.content':
        "Du har {number} integrationer, der kræver en genstart af Home Assistant. Du kan genstarte fra 'Serveradministration'-sektionen under Indstillinger i Home Assistant-brugerfladen.",
      'entry.messages.restart.title': 'Afventer genstart',
      'entry.messages.setup.content':
        'VAIS starter op. Der kan i dette tidsrum mangle nogle oplysninger, eller de kan være forkerte',
      'entry.messages.setup.title': 'VAIS starter op',
      'entry.messages.startup.content':
        'VAIS starter op. Der kan i dette tidsrum mangle nogle oplysninger, eller de kan være ukorekte.',
      'entry.messages.startup.title': 'VAIS starter op',
      'entry.messages.waiting.content':
        'VAIS venter på, at Home Assistant er færdig med at starte, inden start af opgaver gennemføres',
      'entry.messages.waiting.title': 'VAIS venter',
      'entry.messages.wrong_frontend_loaded.content':
        'Du kører version {running} af VAIS-frontend, men version {expected} var forventet. Du bør rydde din browser-cache.',
      'entry.messages.wrong_frontend_loaded.title': 'Uventet frontend-version',
      'entry.pending_updates': 'Ventende opdateringer',
      'menu.about': 'Om VAIS',
      'menu.clear': 'Ryd alle nye',
      'menu.custom_repositories': 'Brugerdefinerede repositories',
      'menu.dismiss': 'Afvis alle nye repositories',
      'menu.documentation': 'Dokumentation',
      'menu.open_issue': 'Opret issue',
      'menu.reload': 'Genindlæs vindue',
      'options.abort.not_setup': 'VAIS er ikke konfigureret.',
      'options.step.user.data.appdaemon':
        'Aktiver opdagelse og sporing af AppDaemon-apps',
      'options.step.user.data.country': 'Filtrer med landekode.',
      'options.step.user.data.debug': 'Aktiver debug.',
      'options.step.user.data.experimental':
        'Aktivér eksperimentelle funktioner',
      'options.step.user.data.netdaemon':
        'Aktiver opdagelse og sporing af NetDaemon-apps',
      'options.step.user.data.not_in_use': 'Ikke i brug med YAML',
      'options.step.user.data.release_limit':
        'Antal udgivelser, der skal vises.',
      'options.step.user.data.sidepanel_icon': 'Sidepanelikon',
      'options.step.user.data.sidepanel_title': 'Sidepanelets titel',
      'repository_card.dismiss': 'Afvis',
      'repository_card.information': 'Oplysninger',
      'repository_card.new_repository': 'Nyt repository',
      'repository_card.not_loaded': 'Ikke indlæst',
      'repository_card.open_issue': 'Opret issue',
      'repository_card.open_source': 'Åbn kilde',
      'repository_card.pending_restart': 'Afventer genstart',
      'repository_card.pending_update': 'Ventende opdatering',
      'repository_card.report': 'Rapporter til fjernelse',
      'repository_card.update_information': 'Opdater oplysninger',
      'search.placeholder': 'Søg efter repository',
      'sections.about.description': 'Vis information om VAIS',
      'sections.about.title': 'Om',
      'sections.addon.description':
        'Der er ingen tilføjelsesprogrammer i VAIS, men du kan klikke her finde dem i Supervisor',
      'sections.automation.description':
        'Det er her, du finder python_scripts, AppDaemon-apps og NetDaemon-apps',
      'sections.automation.title': 'Automatisering',
      'sections.frontend.description':
        'Det er her, du finder temaer, brugerdefinerede kort og andre elementer til lovelace',
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'Det er her, du finder brugerdefinerede integrationer (custom_components)',
      'sections.integrations.title': 'Integrationer',
      'sections.pending_repository_upgrade':
        'Du kører version {installed}, version {available} er tilgængelig',
      'store.no_repositories': 'Ingen repositories',
      'store.no_repositories_desc1':
        'Det ser ud til, at du ikke har nogen repositories installeret i denne sektion endnu.',
      'store.no_repositories_desc2':
        'Klik på + i nederste hjørne for at tilføje dit første!',
      'store.no_repositories_found_desc1':
        'Der blev ikke fundet installerede repositories, der matcher "{searchInput}" i denne sektion.',
      'store.no_repositories_found_desc2': 'Prøv at søge efter noget andet!',
    },
    de: {
      'common.add': 'hinzufügen',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Abbrechen',
      'common.close': 'Schließen',
      'common.download': 'Herunterladen',
      'common.ignore': 'Ignorieren',
      'common.integration': 'Integration',
      'common.integration_plural': 'Integrationen',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'navigieren',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Python-Skript',
      'common.reload': 'Neu laden',
      'common.remove': 'Entfernen',
      'common.repositories': 'Repositories',
      'common.repository': 'Repository',
      'common.theme': 'Theme',
      'common.update': 'Aktualisieren',
      'common.yes': 'Ja',
      'confirm.home_assistant_version_not_correct':
        "Du benutzt die Home Assistant-Version ''{haversion}'', für dieses Repository muss jedoch die Mindestversion ''{minversion}'' installiert sein.",
      'dialog.configured.confirm': 'Gehe zu Integrationen',
      'dialog.configured.message':
        'Die {name}-Integration ist bereits konfiguriert, du musst die Konfiguration dafür löschen, du sie aus VAIS entfernst',
      'dialog.configured.title': 'Integration ist konfiguriert',
      'dialog.reload.confirm': 'Willst du das jetzt machen?',
      'dialog.reload.description':
        'Du musst deinen Browser-Cache leeren, wenn du Lovelace-Ressourcen änderst.',
      'dialog.remove.message': 'Möchtest du {name} wirklich entfernen?',
      'dialog.remove.title': 'Entfernen',
      'dialog_about.downloaded_repositories': 'Heruntergeladene Repositories',
      'dialog_about.frontend_version': 'Frontend Version',
      'dialog_about.integration_version': 'Integrations Version',
      'dialog_about.useful_links': 'Nützliche Links',
      'dialog_add_repo.limit':
        'Es werden nur die ersten 100 Repositories angezeigt. Verwende die Suche, um zu filtern, was du benötigst',
      'dialog_add_repo.no_match':
        'Es wurden keine Repositories gefunden, die deinen Filter entsprechen',
      'dialog_add_repo.sort_by': 'Sortiere nach',
      'dialog_add_repo.sort_by_values.last_updated': 'Zuletzt aktualisiert',
      'dialog_add_repo.sort_by_values.name': 'Name',
      'dialog_add_repo.sort_by_values.stars': 'Sterne',
      'dialog_add_repo.title': 'Repository hinzufügen',
      'dialog_custom_repositories.category': 'Kategorie',
      'dialog_custom_repositories.no_category': 'Fehlende Kategorie',
      'dialog_custom_repositories.no_repository': 'Fehlendes Repository',
      'dialog_custom_repositories.title': 'Benutzerdefinierte Repositories',
      'dialog_custom_repositories.url_placeholder':
        'Füge eine benutzerdefinierte Repository-URL hinzu',
      'dialog_download.restart':
        'Denke daran, dass du Home Assistant neu starten musst, bevor Änderungen an Integrationen (custom_components) angewendet werden.',
      'dialog_download.select_version': 'Version auswählen',
      'dialog_download.show_beta': 'Beta-Versionen anzeigen',
      'dialog_download.type': 'Typ',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Autor',
      'dialog_info.download': 'Installiere dieses Repository mit VAIS',
      'dialog_info.downloads': 'Downloads',
      'dialog_info.loading': 'Informationen laden...',
      'dialog_info.no_info':
        'Der Entwickler hat keine weiteren Informationen für dieses Repository bereitgestellt',
      'dialog_info.open_issues': 'Probleme melden',
      'dialog_info.open_repo': 'Repository öffnen',
      'dialog_info.stars': 'Sterne',
      'dialog_info.version_installed': 'Version heruntergeladen',
      'dialog_removed.link': 'Externer Link zu weiteren Informationen',
      'dialog_removed.name': 'Repository-Name',
      'dialog_removed.reason': 'Grund für die Entfernung',
      'dialog_removed.type': 'Art der Entfernung',
      'dialog_update.available_version': 'Verfügbare Version',
      'dialog_update.changelog': 'Änderungsprotokoll',
      'dialog_update.downloaded_version': 'Heruntergeladene Version',
      'dialog_update.message': 'Eine neue Version von {name} ist verfügbar',
      'dialog_update.no_info':
        'Der Autor hat keine Informationen für dieses Release bereitgestellt',
      'dialog_update.releasenotes': 'Releasenotes für {release}',
      'dialog_update.title': 'Update ausstehend',
      'entry.information': 'Information',
      'entry.intro':
        'Aktualisierungen und wichtige Meldungen werden hier angezeigt, falls vorhanden',
      'entry.messages.disabled.constrains.description':
        'Deine Umgebung ist nicht für die Ausführung von VAIS kompatibel. Überprüfe die Protokolldatei für weitere Details.',
      'entry.messages.disabled.constrains.title': 'Einschränkungen',
      'entry.messages.disabled.content':
        'Überprüfe die Logdatei für weitere Informationen',
      'entry.messages.disabled.invalid_token.description':
        'Rekonfiguriere VAIS und starte Home Assistant neu.',
      'entry.messages.disabled.invalid_token.title': 'Ungültiger Token',
      'entry.messages.disabled.load_vais.description':
        'Überprüfe die Logdatei für weitere Informationen',
      'entry.messages.disabled.load_vais.title':
        'VAIS konnte nicht geladen werden',
      'entry.messages.disabled.rate_limit.description':
        'GitHub-API-Aufrufe sind ratenbegrenzt, diese Meldung wird in weniger als 1 Stunde verschwinden.',
      'entry.messages.disabled.rate_limit.title': 'Ratenbegrenzt',
      'entry.messages.disabled.removed.description':
        'VAIS wurde entfernt, Home Assistant neu starten',
      'entry.messages.disabled.removed.title': 'Entfernt',
      'entry.messages.disabled.restore.description':
        'Überprüfe die Logdatei für weitere Informationen',
      'entry.messages.disabled.restore.title':
        'Wiederherstellung von VAIS fehlgeschlagen',
      'entry.messages.disabled.title': 'VAIS ist deaktiviert',
      'entry.messages.has_pending_tasks.content':
        'Einige Repositorys werden möglicherweise erst angezeigt, wenn dies abgeschlossen ist',
      'entry.messages.has_pending_tasks.title':
        'Hintergrundaufgaben stehen noch aus',
      'entry.messages.removed_repository':
        "Repository ''{repository}'' entfernt",
      'entry.messages.resources.content':
        'Du hast {number} Lovelace-Elemente, die in Lovelace nicht richtig geladen sind.',
      'entry.messages.resources.title': 'Nicht in Lovelace geladen',
      'entry.messages.restart.content':
        "Du hast {number} Integrationen, die einen Neustart von Home Assistant erfordern. Dies kannst du im Abschnitt 'Server Controls' im Konfigurationsteil der Home Assistant-Benutzeroberfläche tun.",
      'entry.messages.restart.title': 'Ausstehender Neustart',
      'entry.messages.setup.content':
        'VAIS wird gerade eingerichtet, während dieser Zeit könnten einige Informationen fehlen oder falsch sein',
      'entry.messages.setup.title': 'VAIS wird eingerichtet',
      'entry.messages.startup.content':
        'VAIS wird gestartet, während dieser Zeit könnten einige Informationen fehlen oder falsch sein',
      'entry.messages.startup.title': 'VAIS startet',
      'entry.messages.waiting.content':
        'VAIS wartet darauf, dass Home Assistant den Start beendet, bevor mit den Startaufgaben gestartet wird',
      'entry.messages.waiting.title': 'VAIS wartet',
      'entry.messages.wrong_frontend_installed.content':
        'Du hast {running} des VAIS-Frontends installiert, aber Version {expected} wurde erwartet. Wenn diese Meldung angezeigt wird, dass Home Assistant die neue Version nicht installieren konnte, starte Home Assistant neu.',
      'entry.messages.wrong_frontend_installed.title':
        'Unerwartete Frontend-Version',
      'entry.messages.wrong_frontend_loaded.content':
        'Du führst die Version {running} des VAIS-Frontends aus, aber es wurde die Version {expected} erwartet. Du solltest deinen Browser-Cache leeren.',
      'entry.messages.wrong_frontend_loaded.title':
        'Unerwartete Frontend-Version',
      'entry.pending_updates': 'Ausstehende Updates',
      'menu.about': 'Über VAIS',
      'menu.clear': 'Alles neue als gesehen markieren',
      'menu.custom_repositories': 'Benutzerdefinierte Repositories',
      'menu.dismiss': 'Alle neuen Repositories ausblenden',
      'menu.documentation': 'Dokumentation',
      'menu.open_issue': 'Problem melden',
      'menu.reload': 'Fenster neu laden',
      'options.abort.not_setup': 'VAIS ist nicht eingerichtet.',
      'options.abort.release_limit_value':
        'Das Release-Limit muss zwischen 1 und 100 liegen',
      'options.step.user.data.appdaemon':
        'AppDaemon App-Entdeckung & Nachverfolgung aktivieren',
      'options.step.user.data.country': 'Nach Ländercode filtern.',
      'options.step.user.data.debug': 'Debug aktivieren.',
      'options.step.user.data.experimental':
        'Experimentelle Funktionen aktivieren',
      'options.step.user.data.netdaemon':
        'NetDaemon App-Entdeckung & Nachverfolgung aktivieren',
      'options.step.user.data.not_in_use': 'Nicht in Verwendung mit YAML',
      'options.step.user.data.release_limit': 'Anzahl anzuzeigender Releases.',
      'options.step.user.data.sidepanel_icon': 'Sidepanel Symbol',
      'options.step.user.data.sidepanel_title': 'Sidepanel Titel',
      'repository_card.dismiss': 'Ausblenden',
      'repository_card.information': 'Information',
      'repository_card.new_repository': 'Neues Repository',
      'repository_card.not_loaded': 'Nicht geladen',
      'repository_card.open_issue': 'Problem melden',
      'repository_card.open_source': 'Quelldateien öffnen',
      'repository_card.pending_restart': 'Ausstehender Neustart',
      'repository_card.pending_update': 'Ausstehende Aktualisierung',
      'repository_card.redownload': 'Erneut herunterladen',
      'repository_card.report': 'Melden zur Entfernung des Repositorys',
      'repository_card.update_information': 'Aktualisierungsinformationen',
      'search.downloaded': 'Suche nach heruntergeladenen Repositories',
      'search.downloaded_new':
        'Suche nach heruntergeladenen oder neuen Repositories',
      'search.placeholder': 'Suche nach Repository',
      'sections.about.description': 'Informationen zu VAIS anzeigen',
      'sections.about.title': 'Über',
      'sections.addon.description':
        'Es gibt in VAIS selbst keine Add-ons, aber du kannst hier klicken, um zum Supervisor zu gelangen',
      'sections.addon.title': 'Add-ons',
      'sections.automation.description':
        'Hier findest du python_scripts, AppDaemon-Apps und NetDaemon-Apps',
      'sections.automation.title': 'Automatisierung',
      'sections.frontend.description':
        'Hier findest du Themen, individuelle Karten und andere Elemente für Lovelace',
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'Hier findest du benutzerdefinierte Integrationen (custom_components)',
      'sections.integrations.title': 'Integrationen',
      'sections.pending_repository_upgrade':
        'Du verwendest Version {downloaded}, Version {available} ist verfügbar',
      'store.explore': 'Durchsuchen und herunterladen von Repositories',
      'store.new_repositories_note':
        'Hier werden einige neue Repositorys angezeigt',
      'store.no_repositories': 'Keine Repositories',
      'store.no_repositories_desc1':
        'Anscheinend sind in diesem Abschnitt noch keine Repositories installiert.',
      'store.no_repositories_desc2':
        'Klicken auf das + in der unteren Ecke, um dein erstes hinzuzufügen!',
      'store.no_repositories_found_desc1':
        'In diesem Abschnitt wurden keine installierten Repositorys gefunden, die mit "{searchInput}" übereinstimmen.',
      'store.no_repositories_found_desc2':
        'Versuche, nach etwas anderem zu suchen!',
    },
    el: {
      'common.appdaemon': 'AppDaemon',
      'common.integration': 'Ενσωμάτωση',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.repositories': 'Αποθετήρια',
      'common.theme': 'Θέμα',
      'options.step.user.data.appdaemon':
        'Ενεργοποίηση εύρεσης & παρακολούθησης για το AppDaemon',
      'options.step.user.data.country': 'Κριτήριο με βάση τον κωδικό χώρας.',
      'options.step.user.data.debug': 'Ενεργοποίηση εντοπισμού σφαλμάτων.',
      'options.step.user.data.experimental':
        'Ενεργοποίση πειραματικών λειτουργιών',
      'options.step.user.data.netdaemon':
        'Ενεργοποίηση εύρεσης & παρακολούθησης για το NetDaemon',
      'options.step.user.data.not_in_use': 'Δεν χρησιμοποιείται με το YAML',
      'options.step.user.data.release_limit':
        'Αριθμός εκδόσεων που να παραθέτονται.',
      'options.step.user.data.sidepanel_icon': 'Εικονίδιο πλαϊνού πάνελ',
      'options.step.user.data.sidepanel_title': 'Τίτλος πλαϊνού πάνελ',
    },
    en: {
      'common.add': 'add',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Cancel',
      'common.close': 'Close',
      'common.download': 'Download',
      'common.ignore': 'Ignore',
      'common.integration': 'Integration',
      'common.integration_plural': 'Integrations',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'navigate',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Python Script',
      'common.reload': 'Reload',
      'common.remove': 'Remove',
      'common.repositories': 'Repositories',
      'common.repository': 'Repository',
      'common.show': 'Show',
      'common.theme': 'Theme',
      'common.update': 'Update',
      'common.updates': 'Updates',
      'common.yes': 'Yes',
      'confirm.home_assistant_version_not_correct':
        "You are running Home Assistant version ''{haversion}'', but this repository requires minimum version ''{minversion}'' to be installed.",
      'dialog.configured.confirm': 'Go to integrations',
      'dialog.configured.message':
        'The {name} integration is configured or ignored, you need to delete the configuration for it before removing it from VAIS',
      'dialog.configured.title': 'Integration is configured',
      'dialog.reload.confirm': 'Do you want to do that now?',
      'dialog.reload.description':
        'You need to reload your browser for the updated resources to be used.',
      'dialog.remove.message': 'Do you really want to remove {name}?',
      'dialog.remove.title': 'Remove',
      'dialog_about.downloaded_repositories': 'Downloaded repositories',
      'dialog_about.frontend_version': 'Frontend version',
      'dialog_about.integration_version': 'Integration version',
      'dialog_about.useful_links': 'Useful links',
      'dialog_add_repo.limit':
        'Only the first 100 repositories are shown, use the search to filter what you need',
      'dialog_add_repo.no_match': 'No repositories found matching your filter',
      'dialog_add_repo.sort_by': 'Sort by',
      'dialog_add_repo.sort_by_values.last_updated': 'Last updated',
      'dialog_add_repo.sort_by_values.name': 'Name',
      'dialog_add_repo.sort_by_values.stars': 'Stars',
      'dialog_add_repo.title': 'Add repository',
      'dialog_custom_repositories.category': 'Category',
      'dialog_custom_repositories.no_category': 'Missing category',
      'dialog_custom_repositories.no_repository': 'Missing repository',
      'dialog_custom_repositories.title': 'Custom repositories',
      'dialog_custom_repositories.url_placeholder': 'Add custom repository URL',
      'dialog_download.lovelace_instruction':
        'After the download completes, since you are not using Lovelace in storage mode you need to manually add the resource with these settings:',
      'dialog_download.note_downloaded':
        'When downloaded this will be located in {location}',
      'dialog_download.restart':
        'Remember that you need to restart Home Assistant before changes to integrations (custom_components) are applied.',
      'dialog_download.select_version': 'Select version',
      'dialog_download.show_beta': 'Show beta versions',
      'dialog_download.type': 'Type',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Author',
      'dialog_info.download': 'Download this repository with VAIS',
      'dialog_info.downloads': 'Downloads',
      'dialog_info.loading': 'Loading information...',
      'dialog_info.no_info':
        'The developer has not provided any more information for this repository',
      'dialog_info.open_issues': 'Open issues',
      'dialog_info.open_repo': 'Open repository',
      'dialog_info.stars': 'Stars',
      'dialog_info.version_installed': 'Version downloaded',
      'dialog_removed.link': 'External link to more information',
      'dialog_removed.name': 'Repository name',
      'dialog_removed.reason': 'Removal reason',
      'dialog_removed.type': 'Removal type',
      'dialog_update.available_version': 'Available version',
      'dialog_update.changelog': 'Changelog',
      'dialog_update.downloaded_version': 'Downloaded version',
      'dialog_update.message': 'A new version of the {name} is available',
      'dialog_update.no_info':
        'The author has not provided any information for this release',
      'dialog_update.releasenotes': 'Release notes for {release}',
      'dialog_update.title': 'Update pending',
      'entry.information': 'Information',
      'entry.intro':
        'Updates and important messages will show here if there are any',
      'entry.messages.disabled.constrains.description':
        'Your environment is not compatible to run VAIS, check your logfile for more details.',
      'entry.messages.disabled.constrains.title': 'Constraints',
      'entry.messages.disabled.content': 'Check your log file for more details',
      'entry.messages.disabled.invalid_token.description':
        'Reconfigure VAIS and restart Home Assistant.',
      'entry.messages.disabled.invalid_token.title': 'Invalid token',
      'entry.messages.disabled.load_vais.description':
        'Check your log file for more details',
      'entry.messages.disabled.load_vais.title': 'VAIS could not load',
      'entry.messages.disabled.rate_limit.description':
        'GitHub API calls are ratelimited, this will clear in less than 1 hour.',
      'entry.messages.disabled.rate_limit.title': 'Ratelimited',
      'entry.messages.disabled.removed.description':
        'VAIS is removed, restart Home Assistant.',
      'entry.messages.disabled.removed.title': 'Removed',
      'entry.messages.disabled.restore.description':
        'Check your log file for more details',
      'entry.messages.disabled.restore.title': 'Restore of VAIS failed',
      'entry.messages.disabled.title': 'VAIS is disabled',
      'entry.messages.has_pending_tasks.content':
        'Some repositories might not show until this is completed',
      'entry.messages.has_pending_tasks.title': 'Background tasks pending',
      'entry.messages.removed_repository':
        "Removed repository ''{repository}''",
      'entry.messages.resources.content':
        'You have {number} Lovelace elements that are not loaded properly in Lovelace.',
      'entry.messages.resources.title': 'Not loaded in Lovelace',
      'entry.messages.restart.content':
        "You have {number} {pluralWording} for which a restart of Home Assistant is required. You can do that from the 'Server management' section under the configuration part of Home Assistant UI.",
      'entry.messages.restart.title': 'Pending restart',
      'entry.messages.setup.content':
        'VAIS is setting up, during this time some information might be missing or incorrect',
      'entry.messages.setup.title': 'VAIS is setting up',
      'entry.messages.startup.content':
        'VAIS is starting up, during this time some information might be missing or incorrect',
      'entry.messages.startup.title': 'VAIS is starting up',
      'entry.messages.waiting.content':
        'VAIS is waiting for Home Assistant to finish startup before starting startup tasks',
      'entry.messages.waiting.title': 'VAIS is waiting',
      'entry.messages.wrong_frontend_installed.content':
        'You have {running} of the VAIS frontend installed, but version {expected} was expected, if this you see this message Home Assistant was not able to install the new version, try restarting Home Assistant.',
      'entry.messages.wrong_frontend_installed.title':
        'Unexpected frontend version',
      'entry.messages.wrong_frontend_loaded.content':
        'You are running version {running} of the VAIS frontend, but version {expected} was expected, you should clear your browser cache.',
      'entry.messages.wrong_frontend_loaded.title':
        'Unexpected frontend version',
      'entry.pending_updates': 'Pending updates',
      'menu.about': 'About VAIS',
      'menu.clear': 'Clear all new',
      'menu.custom_repositories': 'Custom repositories',
      'menu.dismiss': 'Dismiss new repositories',
      'menu.documentation': 'Documentation',
      'menu.open_issue': 'Open issue',
      'menu.reload': 'Reload window',
      'options.abort.not_setup': 'VAIS is not setup.',
      'options.abort.release_limit_value':
        'The release limit needs to be between 1 and 100',
      'options.step.user.data.appdaemon':
        'Enable AppDaemon apps discovery & tracking',
      'options.step.user.data.country': 'Filter with country code.',
      'options.step.user.data.debug': 'Enable debug.',
      'options.step.user.data.experimental': 'Enable experimental features',
      'options.step.user.data.netdaemon':
        'Enable NetDaemon apps discovery & tracking',
      'options.step.user.data.not_in_use': 'Not in use with YAML',
      'options.step.user.data.release_limit': 'Number of releases to show.',
      'options.step.user.data.sidepanel_icon': 'Side panel icon',
      'options.step.user.data.sidepanel_title': 'Side panel title',
      'repository_card.dismiss': 'dismiss',
      'repository_card.information': 'Information',
      'repository_card.new_repository': 'New repository',
      'repository_card.not_loaded': 'Not loaded',
      'repository_card.open_issue': 'Open issue',
      'repository_card.open_source': 'Open source',
      'repository_card.pending_restart': 'Pending restart',
      'repository_card.pending_update': 'Pending update',
      'repository_card.redownload': 'Redownload',
      'repository_card.report': 'Request for removal',
      'repository_card.update_information': 'Update information',
      'search.downloaded': 'Search for downloaded repositories',
      'search.downloaded_new': 'Search for downloaded or new repositories',
      'search.placeholder': 'Search for repository',
      'sections.about.description': 'Show information about VAIS',
      'sections.about.title': 'About',
      'sections.addon.description':
        'There are no addons in VAIS, but you can click here to get to the supervisor',
      'sections.addon.title': 'Add-ons',
      'sections.automation.description':
        'This is where you find python_scripts, AppDaemon apps and NetDaemon apps',
      'sections.automation.title': 'Automation',
      'sections.frontend.description':
        'This is where you find themes, custom cards and other elements for lovelace',
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'This is where you find custom integrations (custom_components)',
      'sections.integrations.title': 'Integrations',
      'sections.pending_repository_upgrade':
        'You are running version {downloaded}, version {available} is available',
      'store.explore': 'Explore & download repositories',
      'store.new_repositories_note':
        'There are some new repositories showing here',
      'store.no_repositories': 'No repositories',
      'store.no_repositories_desc1':
        "It seems like you don't have any repositories downloaded in this section yet.",
      'store.no_repositories_desc2':
        'Click on the + in the bottom corner to add your first!',
      'store.no_repositories_found_desc1':
        'No downloaded repositories matching "{searchInput}" found in this section.',
      'store.no_repositories_found_desc2': 'Try searching for something else!',
    },
    es: {
      'common.add': 'añadir',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Cancelar',
      'common.close': 'Cerrar',
      'common.download': 'Descargar',
      'common.ignore': 'Ignorar',
      'common.integration': 'Integración',
      'common.integration_plural': 'Integraciones',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'navegar',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Script de Python',
      'common.reload': 'Recargar',
      'common.remove': 'Eliminar',
      'common.repositories': 'Repositorios',
      'common.repository': 'Repositorio',
      'common.show': 'Mostrar',
      'common.theme': 'Tema',
      'common.update': 'Actualizar',
      'common.updates': 'Actualizaciones',
      'common.yes': 'Sí',
      'confirm.home_assistant_version_not_correct':
        "Está ejecutando la versión ''{haversion}'' de Home Assistant, pero este repositorio requiere la instalación de la versión ''{minversion}'' mínima.",
      'dialog.configured.confirm': 'Ir a integraciones',
      'dialog.configured.message':
        'La integración {name} está configurada o ignorada, es necesario eliminar la configuración para ella antes de eliminarla de VAIS',
      'dialog.configured.title': 'La integración está configurada',
      'dialog.reload.confirm': '¿Quieres hacer eso ahora?',
      'dialog.reload.description':
        'Necesitas limpiar el caché de tu navegador cuando cambies los recursos de Lovelace.',
      'dialog.remove.message': '¿Realmente quieres eliminar a {name}?',
      'dialog.remove.title': 'Eliminar',
      'dialog_about.downloaded_repositories': 'Repositorios descargados',
      'dialog_about.frontend_version': 'Versión del front-end',
      'dialog_about.integration_version': 'Versión de la integración',
      'dialog_about.useful_links': 'Enlaces útiles',
      'dialog_add_repo.limit':
        'Sólo se muestran los primeros 100 repositorios, utilice la búsqueda para filtrar lo que necesita',
      'dialog_add_repo.no_match':
        'No se han encontrado repositorios que coincidan con el filtro',
      'dialog_add_repo.sort_by': 'Ordenar por',
      'dialog_add_repo.sort_by_values.last_updated': 'Última actualización',
      'dialog_add_repo.sort_by_values.name': 'Nombre',
      'dialog_add_repo.sort_by_values.stars': 'Estrellas',
      'dialog_add_repo.title': 'Añadir repositorio',
      'dialog_custom_repositories.category': 'Categoría',
      'dialog_custom_repositories.no_category': 'Categoría que falta',
      'dialog_custom_repositories.no_repository': 'Falta el repositorio',
      'dialog_custom_repositories.title': 'Repositorios personalizados',
      'dialog_custom_repositories.url_placeholder':
        'Agrega la URL del repositorio personalizado que deseas añadir',
      'dialog_download.lovelace_instruction':
        'Una vez completada la descarga, dado que no está utilizando Lovelace en modo de almacenamiento, debe agregar manualmente el recurso con estas configuraciones:',
      'dialog_download.note_downloaded':
        'Cuando se descargue, estará localizado en {location}',
      'dialog_download.restart':
        'Recuerde que debe reiniciar Home Assistant antes de aplicar los cambios en las integraciones (custom_components).',
      'dialog_download.select_version': 'Seleccionar versión',
      'dialog_download.show_beta': 'Mostrar versiones beta',
      'dialog_download.type': 'Tipo',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Autor',
      'dialog_info.download': 'Descargar este repositorio con VAIS',
      'dialog_info.downloads': 'Descargas',
      'dialog_info.loading': 'Cargando información ...',
      'dialog_info.no_info':
        'El desarrollador no ha proporcionado más información para este repositorio',
      'dialog_info.open_issues': 'Abrir incidencias',
      'dialog_info.open_repo': 'Abrir repositorio',
      'dialog_info.stars': 'Estrellas',
      'dialog_info.version_installed': 'Versión descargada',
      'dialog_removed.link': 'Enlace externo para más información',
      'dialog_removed.name': 'Nombre del repositorio',
      'dialog_removed.reason': 'Motivo de la eliminación',
      'dialog_removed.type': 'Tipo de eliminación',
      'dialog_update.available_version': 'Versión disponible',
      'dialog_update.changelog': 'Registro de cambios',
      'dialog_update.downloaded_version': 'Versión descargada',
      'dialog_update.message': 'Hay disponible una nueva versión de {name}',
      'dialog_update.no_info':
        'El desarrollador no ha proporcionado más información para este repositorio',
      'dialog_update.releasenotes': 'Notas de lanzamiento para {release}',
      'dialog_update.title': 'Actualización pendiente',
      'entry.information': 'Información',
      'entry.intro':
        'Las actualizaciones y los mensajes importantes se mostrarán aquí si hay alguno que mostrar',
      'entry.messages.disabled.constrains.description':
        'Su entorno no es compatible para ejecutar VAIS, consulte su archivo de registro para obtener más detalles.',
      'entry.messages.disabled.constrains.title': 'Restricciones',
      'entry.messages.disabled.content':
        'Compruebe el archivo de registro para obtener más detalles',
      'entry.messages.disabled.invalid_token.description':
        'Vuelva a configurar VAIS y reinicie Home Assistant.',
      'entry.messages.disabled.invalid_token.title': 'Token no válido',
      'entry.messages.disabled.load_vais.description':
        'Consulte su archivo de registro para obtener más detalles',
      'entry.messages.disabled.load_vais.title': 'VAIS no se pudo cargar',
      'entry.messages.disabled.rate_limit.description':
        'Las llamadas a la API de GitHub están limitadas, esto se restaurará en menos de 1 hora.',
      'entry.messages.disabled.rate_limit.title': 'Tarifa limitada',
      'entry.messages.disabled.removed.description':
        'VAIS está eliminado, reinicie Home Assistant.',
      'entry.messages.disabled.removed.title': 'Eliminado',
      'entry.messages.disabled.restore.description':
        'Consulte su archivo de registro para obtener más detalles',
      'entry.messages.disabled.restore.title': 'Falló la restauración de VAIS',
      'entry.messages.disabled.title': 'VAIS está deshabilitado',
      'entry.messages.has_pending_tasks.content':
        'Es posible que algunos repositorios no se muestren hasta que esto se complete',
      'entry.messages.has_pending_tasks.title':
        'Tareas en segundo plano pendientes',
      'entry.messages.removed_repository':
        "Se eliminó el repositorio ''{repository}''",
      'entry.messages.resources.content':
        'Tienes {number} elementos de Lovelace que no se cargan correctamente en Lovelace.',
      'entry.messages.resources.title': 'No está cargada en Lovelace',
      'entry.messages.restart.content':
        "Tienes {number} {pluralWording} que requiere un reinicio de Home Assistant, puedes hacerlo desde la sección 'Controles del servidor' en la parte de configuración de la IU de Home Assistant.",
      'entry.messages.restart.title': 'Pendiente de reinicio',
      'entry.messages.setup.content':
        'VAIS se está configurando, durante este tiempo alguna información puede estar perdida o ser incorrecta',
      'entry.messages.setup.title': 'VAIS se está configurando',
      'entry.messages.startup.content':
        'VAIS se está iniciando, durante este tiempo alguna información podría faltar o ser incorrecta',
      'entry.messages.startup.title': 'VAIS se está iniciando',
      'entry.messages.waiting.content':
        'VAIS está esperando a que Home Assistant finalice el inicio antes de iniciar las tareas de inicio',
      'entry.messages.waiting.title': 'VAIS está esperando',
      'entry.messages.wrong_frontend_installed.content':
        'Tienes instalada la versión {running} de la interfaz de VAIS, pero se esperaba la versión {expected}, si ves este mensaje, Home Assistant no pudo instalar la nueva versión, intenta reiniciar Home Assistant.',
      'entry.messages.wrong_frontend_installed.title':
        'Versión inesperada del frontend',
      'entry.messages.wrong_frontend_loaded.content':
        'Estás ejecutando la versión {running} de la interfaz VAIS, pero se esperaba la versión {expected} , deberías de limpiar la memoria caché del navegador.',
      'entry.messages.wrong_frontend_loaded.title':
        'Versión inesperada de la interfaz',
      'entry.pending_updates': 'Actualizaciones pendientes',
      'menu.about': 'Acerca de VAIS',
      'menu.clear': 'Borrar todo lo nuevo',
      'menu.custom_repositories': 'Repositorios personalizados',
      'menu.dismiss': 'Descartar todos los repositorios nuevos',
      'menu.documentation': 'Documentación',
      'menu.open_issue': 'Abrir incidencias',
      'menu.reload': 'Recargar la ventana',
      'options.abort.not_setup': 'VAIS no está configurado.',
      'options.abort.release_limit_value':
        'El límite de liberación debe estar entre 1 y 100',
      'options.step.user.data.appdaemon':
        'Habilitar el descubrimiento y seguimiento de las aplicaciones de AppDaemon',
      'options.step.user.data.country': 'Filtrar por el código de país.',
      'options.step.user.data.debug': 'Habilitar depuración.',
      'options.step.user.data.experimental':
        'Habilitar funciones experimentales',
      'options.step.user.data.netdaemon':
        'Habilitar el descubrimiento y seguimiento de las aplicaciones de NetDaemon',
      'options.step.user.data.not_in_use': 'No usarse con YAML',
      'options.step.user.data.release_limit': 'Número de versiones a mostrar.',
      'options.step.user.data.sidepanel_icon': 'Icono del panel lateral',
      'options.step.user.data.sidepanel_title': 'Título del panel lateral',
      'repository_card.dismiss': 'descartar',
      'repository_card.information': 'Información',
      'repository_card.new_repository': 'Nuevo repositorio',
      'repository_card.not_loaded': 'Sin cargar',
      'repository_card.open_issue': 'Abrir incidencias',
      'repository_card.open_source': 'Código abierto',
      'repository_card.pending_restart': 'Pendiente de reinicio',
      'repository_card.pending_update': 'Actualización pendiente',
      'repository_card.redownload': 'Volver a descargar',
      'repository_card.report': 'Informe para la eliminación',
      'repository_card.update_information': 'Actualizar información',
      'search.downloaded': 'Buscar repositorios descargados',
      'search.downloaded_new': 'Buscar repositorios descargados o nuevos',
      'search.placeholder': 'Buscar repositorio',
      'sections.about.description': 'Mostrar información sobre VAIS',
      'sections.about.title': 'Acerca de',
      'sections.addon.description':
        'No hay complementos (addons) en VAIS, pero puede hacer clic aquí para ir a la pestaña Supervisor',
      'sections.addon.title': 'Complementos (addons)',
      'sections.automation.description':
        'Aquí es donde se encuentran python_scripts, aplicaciones AppDaemon y aplicaciones NetDaemon',
      'sections.automation.title': 'Automatización',
      'sections.frontend.description':
        'Aquí es donde encontrarás temas, tarjetas personalizadas y otros elementos para lovelace',
      'sections.frontend.title': 'Interfaz',
      'sections.integrations.description':
        'Aquí es donde se encuentran las integraciones personalizadas (custom_components)',
      'sections.integrations.title': 'Integraciones',
      'sections.pending_repository_upgrade':
        'Está ejecutando la versión {installed}, la versión {available} está disponible',
      'store.explore': 'Explorar y descargar repositorios',
      'store.new_repositories_note':
        'Aquí se muestran algunos repositorios nuevos',
      'store.no_repositories': 'Sin repositorios',
      'store.no_repositories_desc1':
        'Parece que todavía no tiene ningún repositorio instalado en esta sección.',
      'store.no_repositories_desc2':
        'Haga clic en el + de la esquina inferior derecha para agregar su primer repositorio!',
      'store.no_repositories_found_desc1':
        'No se ha encontrado ningún repositorio instalado que coincida con "{searchInput}" en esta sección.',
      'store.no_repositories_found_desc2': '¡Intenta buscar otra cosa!',
    },
    et: {
      'common.add': 'lisa',
      'common.cancel': 'Loobu',
      'common.close': 'Sulge',
      'common.download': 'Lae alla',
      'common.ignore': 'Eira',
      'common.integration': 'Sidumine',
      'common.integration_plural': 'sidumist',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'lehitse',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Kasutajaliides',
      'common.python_script': 'Pythoni skript',
      'common.reload': 'Taaslae',
      'common.remove': 'Eemalda',
      'common.repositories': 'Teegid',
      'common.repository': 'Hoidla',
      'common.show': 'Kuva',
      'common.theme': 'Kuva teema',
      'common.update': 'Uuenda',
      'common.updates': 'Uuendused',
      'common.yes': 'Jah',
      'confirm.home_assistant_version_not_correct':
        "Kasutad Home Assistanti versiooni ''{haversion}'' kuid see hoidla nõuab vähemalt versiooni ''{minversion}'' installimist.",
      'dialog.configured.confirm': 'Mine sidumiste juurde',
      'dialog.configured.message':
        'Sidumine {name} on seadistatud, pead selle sidumise enne VAIS-ist eemaldamist kustutama',
      'dialog.configured.title': 'Sidumine on seadistatud',
      'dialog.reload.confirm': 'Kas teen seda kohe?',
      'dialog.reload.description':
        'Uuendatud ressursside kasutamiseks pead tühjendama brauseri vahemälu.',
      'dialog.remove.message': 'Kas soovid tõesti eemaldada üksuse {name}?',
      'dialog.remove.title': 'Eemalda',
      'dialog_about.downloaded_repositories': 'Allalaaditud hoidlad',
      'dialog_about.frontend_version': 'Kasutajaliidese versioon',
      'dialog_about.integration_version': 'Sidumise versioon',
      'dialog_about.useful_links': 'Kasulikud veebiviited',
      'dialog_add_repo.limit':
        'Kuvatakse ainult esimesed 100 hoidlat. Vajaliku filtreerimiseks kasutage otsingut',
      'dialog_add_repo.no_match': 'Filtrile vastavaid hoidlaid ei leitud',
      'dialog_add_repo.sort_by': 'Sortimisalus',
      'dialog_add_repo.sort_by_values.last_updated': 'Viimati uuendatud',
      'dialog_add_repo.sort_by_values.name': 'Nimi',
      'dialog_add_repo.sort_by_values.stars': 'Hinnang',
      'dialog_add_repo.title': 'Lisa hoidla',
      'dialog_custom_repositories.category': 'Kategooria',
      'dialog_custom_repositories.no_category': 'Puuduv kategooria',
      'dialog_custom_repositories.no_repository': 'Puuduv hoidla',
      'dialog_custom_repositories.title': 'Kohandatud hoidlad',
      'dialog_custom_repositories.url_placeholder':
        'Lisa kohandatud hoidla URL',
      'dialog_download.lovelace_instruction':
        "Kuna ei kasutata Lovelace'i salvestusrežiimis siis pärast allalaadimise lõpetamist pead ressursi käsitsi lisama järgmiste sätetega:",
      'dialog_download.note_downloaded':
        'Allalaadimisel asub see asukohas {location}',
      'dialog_download.restart':
        'Pea meeles, et sidumiste (custom_components) muudatuste rakendamiseks pead Home Assistanti taaskäivitama.',
      'dialog_download.select_version': 'Vali versioon',
      'dialog_download.show_beta': 'Kuva beetaversioonid',
      'dialog_download.type': 'Liik',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Autor',
      'dialog_info.download': 'Laadi see hoidla alla VAIS-iga',
      'dialog_info.downloads': 'Allalaadimised',
      'dialog_info.loading': 'Teabe laadimine ...',
      'dialog_info.no_info':
        'Arendaja ei ole selle hoidla kohta rohkem teavet avaldanud',
      'dialog_info.open_issues': 'Teadaolevad tõrketeatised',
      'dialog_info.open_repo': 'Ava hoidla',
      'dialog_info.stars': 'Hinnang',
      'dialog_info.version_installed': 'Allalaaditud versioon',
      'dialog_removed.link': 'Väline link lisateabe saamiseks',
      'dialog_removed.name': 'Hoidla nimi',
      'dialog_removed.reason': 'Eemaldamise põhjus',
      'dialog_removed.type': 'Eemaldamise tüüp',
      'dialog_update.available_version': 'Saadaolev versioon',
      'dialog_update.changelog': 'Muudatused',
      'dialog_update.downloaded_version': 'Allalaaditud versioon',
      'dialog_update.message': '{name} uus versioon on saadaval',
      'dialog_update.no_info':
        'Arendaja ei ole selle väljalaske kohta rohkem teavet avaldanud',
      'dialog_update.releasenotes': 'Versiooni {release} teave',
      'dialog_update.title': 'Uuendus on ootel',
      'entry.information': 'Teave',
      'entry.intro':
        'Siin kuvatakse saadaval värskendused ja olulised sõnumid kui neid juhtub olema',
      'entry.messages.disabled.constrains.description':
        'Home Assistanti paigaldus ei ühildu VAIS-iga. Lisateavet leiad oma logifailist.',
      'entry.messages.disabled.constrains.title': 'Piirangud',
      'entry.messages.disabled.content': 'Lisateavet leiad oma logifailist',
      'entry.messages.disabled.invalid_token.description':
        'Konfigureeri VAIS uuesti ja taaskäivita Home Assistant.',
      'entry.messages.disabled.invalid_token.title': 'Kehtetu luba',
      'entry.messages.disabled.load_vais.description':
        'Lisateavet leiad oma logifailist',
      'entry.messages.disabled.load_vais.title': 'VAIS-i ei saanud laadida',
      'entry.messages.disabled.rate_limit.description':
        'GitHubi API päringud on piiratud, teade kustub vähem kui 1 tunni pärast.',
      'entry.messages.disabled.rate_limit.title': 'Päringute piirang',
      'entry.messages.disabled.removed.description':
        'VAIS on eemaldatud, taaskäivita Home Assistant.',
      'entry.messages.disabled.removed.title': 'Eemaldatud',
      'entry.messages.disabled.restore.description':
        'Lisateavet leiad oma logifailist',
      'entry.messages.disabled.restore.title': 'VAIS-i taastamine nurjus',
      'entry.messages.disabled.title': 'VAIS on keelatud',
      'entry.messages.has_pending_tasks.content':
        'Mõnda hoidlat ei kuvata enne kui tegevus on lõpule viidud',
      'entry.messages.has_pending_tasks.title': 'Taustal on ootel toiminguid',
      'entry.messages.removed_repository': "Eemaldati hoidla ''{repository}''",
      'entry.messages.resources.content':
        "Teil on {number} Lovelace'i elementi mis pole Lovelace'is õigesti laaditud.",
      'entry.messages.resources.title': "Ei laaditud Lovelace'i",
      'entry.messages.restart.content':
        'Paigaldatud on {number} {pluralWording} mis nõuavad Home Assistanti taaskäivitamist. Saad seda teha Home Assistanti kasutajaliidese seadete alamjaotisest "Serveri juhtimine".',
      'entry.messages.restart.title': 'Taaskäivitamise ootel',
      'entry.messages.setup.content':
        'VAIS on seadistub. Selle aja jooksul võib osa teavet puududa või olla vale',
      'entry.messages.setup.title': 'VAIS seadistub',
      'entry.messages.startup.content':
        'VAIS käivitub. Selle aja jooksul võib osa teavet puududa või olla vale',
      'entry.messages.startup.title': 'VAIS käivitub',
      'entry.messages.waiting.content':
        'VAIS ootab Home Assistanti käivitumist',
      'entry.messages.waiting.title': 'VAIS on ootel',
      'entry.messages.wrong_frontend_installed.content':
        'Paigaldatud on VAIS-i kasutajaliides {running} kuid eeldati versiooni {expected}. Kui näed seda teadet siis Home Assistant ei saanud uut versiooni paigaldada, proovi taaskäivitada Home Assistant.',
      'entry.messages.wrong_frontend_installed.title':
        'Ootamatu kasutajaliidese versioon',
      'entry.messages.wrong_frontend_loaded.content':
        "Paigaldatud on VAIS'i kasutajaliides {running} kuid eeldatakse versiooni {expected}. Tühjenda oma veebilehitseja vahemälu.",
      'entry.messages.wrong_frontend_loaded.title':
        'Ootamatu kasutajaliidese versioon',
      'entry.pending_updates': 'Ootel värskendused',
      'menu.about': 'VAIS-i info',
      'menu.clear': 'Tühjenda kõik uued',
      'menu.custom_repositories': 'Kohandatud hoidlad',
      'menu.dismiss': 'Peida kõik uued hoidlad',
      'menu.documentation': 'Dokumentatsioon',
      'menu.open_issue': 'Esita tõrketeade',
      'menu.reload': 'Lae aken uuesti',
      'options.abort.not_setup': 'VAIS pole seadistatud.',
      'options.abort.release_limit_value': 'Vahemik peab olema 1 kuni 100',
      'options.step.user.data.appdaemon':
        'Luba AppDaemoni rakenduste otsimine ja jälgimine',
      'options.step.user.data.country': 'Filtreeri riigi koodi abil.',
      'options.step.user.data.debug': 'Luba silumine.',
      'options.step.user.data.experimental': 'Luba katselised funktsioonid',
      'options.step.user.data.netdaemon':
        'Luba NetDaemoni rakenduste otsimine ja jälgimine',
      'options.step.user.data.not_in_use': 'YAML režiimi ei toetata',
      'options.step.user.data.release_limit': 'Mitu väljalaset kuvada.',
      'options.step.user.data.sidepanel_icon': 'Külgpaneeli ikoon',
      'options.step.user.data.sidepanel_title': 'Külgpaneeli pealkiri',
      'repository_card.dismiss': 'Peida',
      'repository_card.information': 'Teave',
      'repository_card.new_repository': 'Uus hoidla',
      'repository_card.not_loaded': 'Pole laaditud',
      'repository_card.open_issue': 'Esita tõrketeade',
      'repository_card.open_source': 'Avatud lähtekoodiga',
      'repository_card.pending_restart': 'Taaskäivitamise ootel',
      'repository_card.pending_update': 'Värskendamise ootel',
      'repository_card.redownload': 'Lae uuesti alla',
      'repository_card.report': 'Eemaldamise taotlus',
      'repository_card.update_information': 'Värskenda teavet',
      'search.downloaded': 'Allalaaditud hoidlate otsimine',
      'search.downloaded_new': 'Allalaaditud või uute hoidlate otsimine',
      'search.placeholder': 'Otsi hoidlat',
      'sections.about.description': 'Kuva VAIS-i teave',
      'sections.about.title': 'Üldteave',
      'sections.addon.description':
        'VAIS-is pole lisandmooduleid. Supervisorisse pääsemiseks klõpsa siin',
      'sections.addon.title': 'Lisandmoodulid',
      'sections.automation.description':
        'Siit leiad python_scripts, AppDaemoni ja NetDaemoni rakendused',
      'sections.automation.title': 'Automatiseeringud',
      'sections.frontend.description':
        'Siit leiad kasutajaliidese teemad, kohandatud kaardid ja muud elemendid',
      'sections.frontend.title': 'Kasutajaliides',
      'sections.integrations.description':
        'Siit leiad kohandatud sidumised (custom_components)',
      'sections.integrations.title': 'Sidumised',
      'sections.pending_repository_upgrade':
        'Kasutad versiooni {downloaded}, saadaval on versioon {available}',
      'store.explore': 'Avasta ja laadi alla hoidlaid',
      'store.new_repositories_note': 'Saadaval on mõned uued hoidlad.',
      'store.no_repositories': 'Hoidlaid pole',
      'store.no_repositories_desc1':
        'Tundub, et pole veel ühtegi hoidlat mis oleks siia jaotisse paigaldatud.',
      'store.no_repositories_desc2':
        'Esimese hoidla lisamiseks klõpsake alumises nurgas + märki!',
      'store.no_repositories_found_desc1':
        'Sellest jaotisest ei leitud allalaaditud hoidlaid, mis vastaksotsingule "{searchInput}"',
      'store.no_repositories_found_desc2': 'Proovi otsida midagi muud!',
    },
    fi: {
      'common.add': 'Lisää',
      'common.ignore': 'Ohita',
      'common.integration_plural': 'Integraatiot',
      'common.lovelace': 'Lovelace',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.repository': 'Repo',
      'common.theme': 'Teema',
      'common.update': 'Päivitä',
      'dialog_about.frontend_version': 'Frontend-versio',
      'dialog_about.useful_links': 'Hyödyllisiä linkkejä',
      'dialog_add_repo.sort_by': 'Järjestä',
      'dialog_add_repo.title': 'Lisää repo',
      'dialog_custom_repositories.category': 'Kategoria',
      'dialog_custom_repositories.no_category': 'Puuttuva kategoria',
      'dialog_custom_repositories.no_repository': 'Puuttuva repo',
      'dialog_info.author': 'Luoja',
      'dialog_info.downloads': 'Lataukset',
      'dialog_info.loading': 'Tietoja ladataan...',
      'dialog_info.open_issues': 'Avoimet ongelmat',
      'dialog_info.open_repo': 'Avaa repo',
      'dialog_info.stars': 'Tähdet',
      'dialog_removed.link': 'Linkki lisätietoihin',
      'dialog_removed.name': 'Repon nimi',
      'dialog_removed.reason': 'Poiston syy',
      'dialog_removed.type': 'Poiston tyyppi',
      'dialog_update.available_version': 'Saatavilla oleva versio',
      'dialog_update.changelog': 'Muutosloki',
      'dialog_update.title': 'Päivitys odottaa',
      'entry.information': 'Tiedot',
      'entry.messages.disabled.content':
        'Tarkista lokitiedostosi saadaksesi lisätietoja',
      'entry.messages.disabled.title': 'VAIS on poistettu käytöstä',
      'entry.messages.has_pending_tasks.title': 'Taustatehtävät vireillä',
      'entry.messages.resources.title': 'Ei ladattu Lovelaceen',
      'entry.messages.restart.title': 'Odottaa uudelleenkäynnistystä',
      'entry.messages.startup.title': 'VAIS käynnistyy',
      'entry.messages.wrong_frontend_loaded.title':
        'Odottamaton käyttöliittymäversio',
      'entry.pending_updates': 'Päivityksiä saatavilla',
      'menu.about': 'Tietoja VAIS:stä',
      'menu.clear': 'Tyhjennä kaikki uudet',
      'menu.custom_repositories': 'Mukautetut repot',
      'menu.dismiss': 'Hylkää kaikki uudet repot',
      'menu.documentation': 'Dokumentointi',
      'menu.open_issue': 'Avoin ongelma',
      'menu.reload': 'Lataa ikkuna uudelleen',
      'options.step.user.data.netdaemon':
        'Ota NetDaemon-sovellusten etsintä ja seuranta käyttöön',
      'options.step.user.data.not_in_use': 'Ei käytössä YAML:n kanssa',
      'options.step.user.data.sidepanel_icon': 'Sivupaneelin kuvake',
      'options.step.user.data.sidepanel_title': 'Sivupaneelin otsikko',
      'repository_card.dismiss': 'Hylkää',
      'repository_card.information': 'Tiedot',
      'repository_card.new_repository': 'Uusi repo',
      'repository_card.not_loaded': 'Ei ladattu',
      'repository_card.open_issue': 'Avoin ongelma',
      'repository_card.open_source': 'Avoin lähdekoodi',
      'repository_card.pending_restart': 'Odottaa uudelleenkäynnistystä',
      'repository_card.pending_update': 'Odottaa päivittämistä',
      'repository_card.report': 'Raportoi poistettavaksi',
      'repository_card.update_information': 'Päivitä tiedot',
      'search.placeholder': 'Etsi repoa',
      'sections.about.title': 'Tietoja',
      'sections.automation.title': 'Automaatio',
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'Täältä löydät mukautetut integraatiot (custom_components)',
      'sections.integrations.title': 'integraatiot',
      'store.no_repositories': 'Ei repoja',
      'store.no_repositories_found_desc2': 'Kokeile etsiä jotain muuta!',
    },
    fr: {
      'common.add': 'ajouter',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Annuler',
      'common.close': 'Fermer',
      'common.download': 'Télécharger',
      'common.ignore': 'Ignorer',
      'common.integration': 'Intégration',
      'common.integration_plural': 'Intégrations',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'naviguer',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Script Python',
      'common.reload': 'Recharger',
      'common.remove': 'Désinstaller',
      'common.repositories': 'Dépôts',
      'common.repository': 'Dépôt',
      'common.show': 'Afficher',
      'common.theme': 'Thème',
      'common.update': 'Mettre à jour',
      'common.updates': 'Mises à jour',
      'common.yes': 'Oui',
      'confirm.home_assistant_version_not_correct':
        "Vous exécutez la version ''{haversion}'' de Home Assistant mais ce dépôt nécessite l'installation de la version ''{minversion}'' au minimum.",
      'dialog.configured.confirm': 'Aller aux intégrations',
      'dialog.configured.message':
        "L'intégration {name} est actuellement configurée ou ignorée ; vous devez d'abord supprimer sa configuration avant de pouvoir la désinstaller depuis VAIS",
      'dialog.configured.title': "L'intégration est configurée",
      'dialog.reload.confirm': 'Voulez-vous faire cela maintenant ?',
      'dialog.reload.description':
        'Vous devez vider le cache de votre navigateur lors de la modification des ressources Lovelace.',
      'dialog.remove.message': 'Voulez-vous vraiment désinstaller {name} ?',
      'dialog.remove.title': 'Désinstaller',
      'dialog_about.downloaded_repositories': 'Dépôts téléchargés',
      'dialog_about.frontend_version': "Version de l'interface",
      'dialog_about.integration_version': "Version de l'intégration",
      'dialog_about.useful_links': 'Liens utiles',
      'dialog_add_repo.limit':
        'Seuls les 100 premiers dépôts sont affichés, utilisez la recherche pour filtrer ce dont vous avez besoin',
      'dialog_add_repo.no_match':
        'Aucun dépôt trouvé correspondant à votre filtre',
      'dialog_add_repo.sort_by': 'Trier par',
      'dialog_add_repo.sort_by_values.last_updated': 'Dernière mise à jour',
      'dialog_add_repo.sort_by_values.name': 'Nom',
      'dialog_add_repo.sort_by_values.stars': 'Étoiles',
      'dialog_add_repo.title': 'Ajouter un dépôt',
      'dialog_custom_repositories.category': 'Catégorie',
      'dialog_custom_repositories.no_category': 'Catégorie manquante',
      'dialog_custom_repositories.no_repository': 'Dépôt manquant',
      'dialog_custom_repositories.title': 'Dépôts personnalisés',
      'dialog_custom_repositories.url_placeholder':
        'Ajouter une URL de dépôt personnalisée',
      'dialog_download.lovelace_instruction':
        "Étant donné que vous n'utilisez pas Lovelace en mode « storage », une fois le téléchargement terminé, vous devrez ajouter manuellement la ressource grâce aux paramètres suivants :",
      'dialog_download.note_downloaded':
        'Ce dépôt sera téléchargé dans {location}',
      'dialog_download.restart':
        "N'oubliez pas que vous devez redémarrer Home Assistant avant que les modifications apportées aux intégrations (custom_components) soient appliquées.",
      'dialog_download.select_version': 'Sélectionner la version',
      'dialog_download.show_beta': 'Afficher les versions bêta',
      'dialog_download.type': 'Type',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Auteur',
      'dialog_info.download': 'Télécharger ce dépôt avec VAIS',
      'dialog_info.downloads': 'Téléchargements',
      'dialog_info.loading': 'Chargement des informations…',
      'dialog_info.no_info':
        "Le développeur n'a pas fourni plus d'informations pour ce dépôt",
      'dialog_info.open_issues': 'Problèmes connus',
      'dialog_info.open_repo': 'Accéder au dépôt',
      'dialog_info.stars': 'Étoiles',
      'dialog_info.version_installed': 'Version téléchargée',
      'dialog_removed.link': "Lien externe vers plus d'informations",
      'dialog_removed.name': 'Nom du dépôt',
      'dialog_removed.reason': 'Raison de la suppression',
      'dialog_removed.type': 'Type de suppression',
      'dialog_update.available_version': 'Version disponible',
      'dialog_update.changelog': 'Journal des modifications',
      'dialog_update.downloaded_version': 'Version téléchargée',
      'dialog_update.message': 'Une nouvelle version de {name} est disponible',
      'dialog_update.no_info':
        "L'auteur n'a fourni aucune information pour cette version",
      'dialog_update.releasenotes': 'Notes de version pour {release}',
      'dialog_update.title': 'Mise à jour en attente',
      'entry.information': 'Informations',
      'entry.intro':
        "Les mises à jour et les messages importants s'afficheront ici s'il y en a",
      'entry.messages.disabled.constrains.description':
        "Votre environnement n'est pas compatible pour exécuter VAIS, vérifiez votre fichier journal pour plus de détails.",
      'entry.messages.disabled.constrains.title': 'Contraintes',
      'entry.messages.disabled.content':
        'Vérifiez votre fichier journal pour plus de détails',
      'entry.messages.disabled.invalid_token.description':
        'Reconfigurez VAIS et redémarrez Home Assistant.',
      'entry.messages.disabled.invalid_token.title': 'Jeton invalide',
      'entry.messages.disabled.load_vais.description':
        'Vérifiez votre fichier journal pour plus de détails',
      'entry.messages.disabled.load_vais.title': "VAIS n'a pas pu charger",
      'entry.messages.disabled.rate_limit.description':
        "Les appels à l'API GitHub sont limités en nombre, cela s'effacera en moins d'une heure.",
      'entry.messages.disabled.rate_limit.title': 'Limitation atteinte',
      'entry.messages.disabled.removed.description':
        'VAIS est supprimé, redémarrez Home Assistant.',
      'entry.messages.disabled.removed.title': 'Supprimé',
      'entry.messages.disabled.restore.description':
        'Vérifiez votre fichier journal pour plus de détails',
      'entry.messages.disabled.restore.title':
        'La restauration de VAIS a échoué',
      'entry.messages.disabled.title': 'VAIS est désactivé',
      'entry.messages.has_pending_tasks.content':
        "Certains dépôts peuvent ne pas apparaître tant que cette opération n'est pas terminée",
      'entry.messages.has_pending_tasks.title':
        'Tâches d’arrière-plan en attente',
      'entry.messages.removed_repository': "Dépôt ''{repository}'' supprimé",
      'entry.messages.resources.content':
        'Vous avez {number} éléments Lovelace qui ne sont pas chargés correctement dans Lovelace.',
      'entry.messages.resources.title': 'Non chargé dans Lovelace',
      'entry.messages.restart.content':
        "Vous avez {number} {pluralWording} qui nécessitent un redémarrage de Home Assistant. Vous pouvez le faire à partir de la section « Gestion du serveur » dans la partie configuration de l'interface utilisateur de Home Assistant.",
      'entry.messages.restart.title': 'En attente de redémarrage',
      'entry.messages.setup.content':
        'VAIS est en cours de configuration, pendant ce temps, certaines informations peuvent être manquantes ou incorrectes',
      'entry.messages.setup.title': 'VAIS se met en place',
      'entry.messages.startup.content':
        'VAIS démarre, pendant ce temps, certaines informations peuvent être manquantes ou incorrectes',
      'entry.messages.startup.title': 'VAIS est en train de démarrer',
      'entry.messages.waiting.content':
        'VAIS attend que Home Assistant termine le démarrage avant de démarrer les tâches de démarrage',
      'entry.messages.waiting.title': 'VAIS attend',
      'entry.messages.wrong_frontend_installed.content':
        "La version {running} de l'interface VAIS est installée alors que la version {expected} était attendue. Si ce message s'affiche, Home Assistant n'a pas pu installer la nouvelle version ; essayez de redémarrer Home Assistant.",
      'entry.messages.wrong_frontend_installed.title':
        "Version de l'interface inattendue",
      'entry.messages.wrong_frontend_loaded.content':
        "Vous exécutez la version {running} de l'interface VAIS alors que la version {expected} était attendue ; essayez de vider le cache de votre navigateur.",
      'entry.messages.wrong_frontend_loaded.title':
        "Version de l'interface inattendue",
      'entry.pending_updates': 'Mises à jour en attente',
      'menu.about': 'À propos de VAIS',
      'menu.clear': 'Effacer tous les nouveaux',
      'menu.custom_repositories': 'Dépôts personnalisés',
      'menu.dismiss': 'Rejeter tous les nouveaux dépôts',
      'menu.documentation': 'Documentation',
      'menu.open_issue': 'Signaler un problème',
      'menu.reload': 'Recharger la fenêtre',
      'options.abort.not_setup': "VAIS n'est pas configuré.",
      'options.abort.release_limit_value':
        'La limite de libération doit être comprise entre 1 et 100',
      'options.step.user.data.appdaemon':
        'Activer la découverte et le suivi des applications AppDaemon',
      'options.step.user.data.country': 'Filtrer par code pays.',
      'options.step.user.data.debug': 'Activer le débogage.',
      'options.step.user.data.experimental':
        'Activer les fonctionnalités expérimentales',
      'options.step.user.data.netdaemon':
        'Activer la découverte et le suivi des applications NetDaemon',
      'options.step.user.data.not_in_use': 'Non utilisé en YAML',
      'options.step.user.data.release_limit': 'Nombre de versions à afficher.',
      'options.step.user.data.sidepanel_icon': 'Icône de la barre latérale',
      'options.step.user.data.sidepanel_title': 'Titre de la barre latérale',
      'repository_card.dismiss': 'rejeter',
      'repository_card.information': 'Informations',
      'repository_card.new_repository': 'Nouveau dépôt',
      'repository_card.not_loaded': 'Non chargé',
      'repository_card.open_issue': 'Signaler un problème',
      'repository_card.open_source': 'Afficher le code source',
      'repository_card.pending_restart': 'Redémarrage en attente',
      'repository_card.pending_update': 'Mise à jour en attente',
      'repository_card.redownload': 'Retélécharger',
      'repository_card.report': 'Faire une demande de suppression',
      'repository_card.update_information': 'Mettre à jour les informations',
      'search.downloaded': 'Rechercher des dépôts téléchargés',
      'search.downloaded_new': 'Rechercher des dépôts téléchargés ou nouveaux',
      'search.placeholder': 'Rechercher un dépôt',
      'sections.about.description':
        'Afficher des informations sur le système VAIS',
      'sections.about.title': 'À propos',
      'sections.addon.description':
        "Il n'y a pas de modules complémentaires dans VAIS, mais vous pouvez cliquer ici pour aller au superviseur",
      'sections.addon.title': 'Modules complémentaires',
      'sections.automation.description':
        "C'est ici que vous trouverez les scripts Python ainsi que les applications AppDaemon et NetDaemon",
      'sections.automation.title': 'Automatisation',
      'sections.frontend.description':
        "C'est ici que vous trouverez des thèmes, des cartes personnalisées et d'autres éléments pour Lovelace",
      'sections.frontend.title': 'Interface',
      'sections.integrations.description':
        "C'est ici que vous trouverez les intégrations personnalisées (custom_components)",
      'sections.integrations.title': 'Intégrations',
      'sections.pending_repository_upgrade':
        'Vous utilisez la version {downloaded}, la version {available} est disponible',
      'store.explore': 'Explorer et télécharger des dépôts',
      'store.new_repositories_note': 'De nouveaux dépôts sont affichés ici',
      'store.no_repositories': 'Aucun dépôt',
      'store.no_repositories_desc1':
        'Il semble que vous n’avez pas encore téléchargé de dépôt dans cette section.',
      'store.no_repositories_desc2':
        'Cliquez sur le + dans le coin inférieur pour commencer à en ajouter un !',
      'store.no_repositories_found_desc1':
        "Aucun dépôt installé correspondant à « {searchInput} » n'a été trouvé dans cette section.",
      'store.no_repositories_found_desc2': 'Essayez de chercher autre chose !',
    },
    he: {
      'common.add': 'הוספה',
      'common.cancel': 'ביטול',
      'common.close': 'סגור',
      'common.download': 'הורדה',
      'common.ignore': 'להתעלם',
      'common.integration': 'שילוב',
      'common.integration_plural': 'שילובים',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'ניווט',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'סקריפט פייתון',
      'common.reload': 'טעינה מחדש',
      'common.remove': 'הסרה',
      'common.repositories': 'מאגרים',
      'common.repository': 'מאגר',
      'common.show': 'הצג',
      'common.theme': 'ערכת נושא',
      'common.update': 'עדכון',
      'common.updates': 'עדכונים',
      'common.yes': 'כן',
      'confirm.home_assistant_version_not_correct':
        "גירסת Home Assistant ''{haversion}'' רצה, אבל באסה מאגר זה דורש מינימום גירסת ''{minversion}''.",
      'dialog.configured.confirm': 'מעבר לשילובים',
      'dialog.configured.message':
        'תצורת השילוב {name} מוגדרת או שהמערכת מתעלמת ממנו, יש למחוק את התצורה עבורו לפני הסרתו מ-VAIS',
      'dialog.configured.title': 'תצורת השילוב מוגדרת',
      'dialog.reload.confirm': 'לעשות את זה עכשיו?',
      'dialog.reload.description':
        'יש לטעון מחדש את הדפדפן כדי להשתמש במשאבים המעודכנים.',
      'dialog.remove.message': 'האם בוודאות ברצונך להסיר את {name}?',
      'dialog.remove.title': 'הסרה',
      'dialog_about.downloaded_repositories': 'מאגרים שהורדו',
      'dialog_about.frontend_version': 'גרסת החזותי',
      'dialog_about.integration_version': 'גרסת שילוב',
      'dialog_about.useful_links': 'קישורים שימושיים',
      'dialog_add_repo.limit':
        'מוצגים רק 100 המאגרים הראשונים, יש להשתמש בחיפוש כדי לסנן רק את מה שצריך',
      'dialog_add_repo.no_match': 'לא נמצאו מאגרים התואמים את המסנן שלך',
      'dialog_add_repo.sort_by': 'מיון לפי',
      'dialog_add_repo.sort_by_values.last_updated': 'עודכן לאחרונה',
      'dialog_add_repo.sort_by_values.name': 'שם',
      'dialog_add_repo.sort_by_values.stars': 'כוכבים',
      'dialog_add_repo.title': 'הוספת מאגר',
      'dialog_custom_repositories.category': 'קטגוריה',
      'dialog_custom_repositories.no_category': 'קטגוריה חסרה',
      'dialog_custom_repositories.no_repository': 'מאגר חסר',
      'dialog_custom_repositories.title': 'מאגרים מותאמים אישית',
      'dialog_custom_repositories.url_placeholder':
        'הוספת כתובת מאגר מותאמת אישית',
      'dialog_download.lovelace_instruction':
        'לאחר השלמת ההורדה, מכיוון שאינך משתמש ב-Lovelace במצב אחסון עליך להוסיף את המשאב באופן ידני עם הגדרות אלה:',
      'dialog_download.note_downloaded':
        'בעת ההורדה, פעולה זו תמוקם ב-{location}',
      'dialog_download.restart':
        'תזכורת, יש להפעיל מחדש את ה-Home Assistant לפני החלת שינויים בשילובים (custom_components).',
      'dialog_download.select_version': 'בחירת גירסה',
      'dialog_download.show_beta': 'הצגת גרסאות בטא',
      'dialog_download.type': 'סוג',
      'dialog_download.url': 'כתובת אתר',
      'dialog_info.author': 'מחבר',
      'dialog_info.download': 'הורדת מאגר זה באמצעות VAIS',
      'dialog_info.downloads': 'הורדות',
      'dialog_info.loading': 'טוען מידע...',
      'dialog_info.no_info': 'המפתח לא סיפק מידע נוסף עבור מאגר זה',
      'dialog_info.open_issues': 'סוגיות פתוחים',
      'dialog_info.open_repo': 'פתיחת מאגר',
      'dialog_info.stars': 'כוכבים',
      'dialog_info.version_installed': 'גירסה שהורדה',
      'dialog_removed.link': 'קישור חיצוני למידע נוסף',
      'dialog_removed.name': 'שם המאגר',
      'dialog_removed.reason': 'סיבת ההסרה',
      'dialog_removed.type': 'סוג הסרה',
      'dialog_update.available_version': 'גירסה זמינה',
      'dialog_update.changelog': 'יומן שינויים',
      'dialog_update.downloaded_version': 'גרסה שהורדה',
      'dialog_update.message': 'גירסה חדשה של {name} זמינה',
      'dialog_update.no_info': 'המחבר לא סיפק כל מידע עבור שיחרור זו',
      'dialog_update.releasenotes': 'הערות שחרור עבור {release}',
      'dialog_update.title': 'עדכון ממתין',
      'entry.information': 'מידע',
      'entry.intro': 'עדכונים והודעות חשובות יופיעו כאן אם יש כאלה',
      'entry.messages.disabled.constrains.description':
        'הסביבה שלך אינה תואמת להפעלת VAIS, יש לבדוק את קובץ היומן שלך לקבלת פרטים נוספים.',
      'entry.messages.disabled.constrains.title': 'אילוצים',
      'entry.messages.disabled.content':
        'יש לבדוק את קובץ היומן שלך לקבלת פרטים נוספים',
      'entry.messages.disabled.invalid_token.description':
        'יש להגדיר מחדש את VAIS ולהפעיל מחדש את Home Assistant.',
      'entry.messages.disabled.invalid_token.title': 'אסימון לא חוקי',
      'entry.messages.disabled.load_vais.description':
        'יש לבדוק את קובץ היומן שלך לקבלת פרטים נוספים',
      'entry.messages.disabled.load_vais.title': 'טעינת VAIS לא הצליחה',
      'entry.messages.disabled.rate_limit.description':
        'קריאות ה-API של GitHub מוגבלות, זה אמור להסתדר תוך פחות משעה.',
      'entry.messages.disabled.rate_limit.title': 'רמה מוגבלת',
      'entry.messages.disabled.removed.description':
        'VAIS הוסר, יש להפעיל מחדש את Home Assistant.',
      'entry.messages.disabled.removed.title': 'הוסר',
      'entry.messages.disabled.restore.description':
        'יש לבדוק את קובץ היומן שלך לקבלת פרטים נוספים',
      'entry.messages.disabled.restore.title': 'שחזור VAIS נכשל',
      'entry.messages.disabled.title': 'VAIS מושבת',
      'entry.messages.has_pending_tasks.content':
        'ייתכן שמאגרים מסוימים לא יופיעו עד להשלמת פעולה זו',
      'entry.messages.has_pending_tasks.title': 'משימות רקע ממתינות',
      'entry.messages.removed_repository': "מאגר שהוסר ''{repository}''",
      'entry.messages.resources.content':
        'יש לך {number} רכיבי Lovelace שאינם נטענים כראוי ב-Lovelace.',
      'entry.messages.resources.title': 'לא טעון ב-Lovelace',
      'entry.messages.restart.content':
        "יש לך {number} {pluralWording} שעבורם נדרשת הפעלה מחדש של Home Assistant. באפשרותך לעשות זאת מהמקטע 'פקדי שרת' תחת חלק התצורה של ממשק המשתמש של Home Assistant.",
      'entry.messages.restart.title': 'ממתין להפעלה מחדש',
      'entry.messages.setup.content':
        'VAIS מוגדר, במהלך זמן זה מידע עלול להיות חסר או שגוי',
      'entry.messages.setup.title': 'VAIS מוגדר',
      'entry.messages.startup.content':
        'VAIS מתחיל לפעול, במהלך זמן זה מידע עלול להיות חסר או שגוי',
      'entry.messages.startup.title': 'VAIS מתחיל לפעול',
      'entry.messages.waiting.content':
        'VAIS ממתין ש-Home Assistant יסיים את ההפעלה לפני הפעלת משימות האתחול',
      'entry.messages.waiting.title': 'VAIS ממתין',
      'entry.messages.wrong_frontend_installed.content':
        'יש לך ממשק חזותי של VAIS בגרסה {running}, אבל המערכת ציפתה לגרסה {expected}. איזו באסה, אם זו ההודעה שמוצגת לך, Home Assistant לא הצליח להתקין את הגרסה החדשה, יש לנסות להפעיל מחדש את Home Assistant.',
      'entry.messages.wrong_frontend_installed.title': 'גרסת חזית לא צפויה',
      'entry.messages.wrong_frontend_loaded.content':
        'יש לך ממשק חזותי של VAIS בגרסה {running}, אבל המערכת ציפתה לגרסה {expected}, יש לנקות את מטמון הדפדפן.',
      'entry.messages.wrong_frontend_loaded.title': 'גרסת חזית לא צפויה',
      'entry.pending_updates': 'עדכונים ממתינים',
      'menu.about': 'אודות VAIS',
      'menu.clear': 'ניקוי כל החדשים',
      'menu.custom_repositories': 'מאגרים מותאמים אישית',
      'menu.dismiss': 'דחיית מאגרים חדשים',
      'menu.documentation': 'תיעוד',
      'menu.open_issue': 'פתיחת סוגיה',
      'menu.reload': 'טעינת חלון מחדש',
      'options.abort.not_setup': 'VAIS אינו מוגדר.',
      'options.abort.release_limit_value':
        'מגבלת השחרור צריכה להיות בין 1 ל-100',
      'options.step.user.data.appdaemon':
        'איפשור גילוי ומעקב אחר יישומי AppDaemon',
      'options.step.user.data.country': 'סינון לפי קידומת מדינה.',
      'options.step.user.data.debug': 'איפשור איתור באגים.',
      'options.step.user.data.experimental': 'אפשור תכונות ניסיוניות',
      'options.step.user.data.netdaemon':
        'איפשור גילוי ומעקב אחר יישומי NetDaemon',
      'options.step.user.data.not_in_use': 'לא בשימוש עם YAML',
      'options.step.user.data.release_limit': 'מספר השיחרורים להצגה.',
      'options.step.user.data.sidepanel_icon': 'סמליל חלונית הצד',
      'options.step.user.data.sidepanel_title': 'כותרת חלונית הצד',
      'repository_card.dismiss': 'דחייה',
      'repository_card.information': 'מידע',
      'repository_card.new_repository': 'מאגר חדש',
      'repository_card.not_loaded': 'לא נטען',
      'repository_card.open_issue': 'פתיחת נושא',
      'repository_card.open_source': 'פתיחת מקור',
      'repository_card.pending_restart': 'ממתין להפעלה מחדש',
      'repository_card.pending_update': 'ממתין לעדכון',
      'repository_card.redownload': 'הורדה מחדש',
      'repository_card.report': 'בקשה להסרה',
      'repository_card.update_information': 'עדכון מידע',
      'search.downloaded': 'חיפוש מאגרים שהורדת',
      'search.downloaded_new': 'חיפוש מאגרים שהורדו או חדשים',
      'search.placeholder': 'חיפוש מאגר',
      'sections.about.description': 'הצגת מידע אודות VAIS',
      'sections.about.title': 'אודות',
      'sections.addon.description':
        'אין הרחבות ב-VAIS, אבל היי אפשר ללחוץ כאן כדי להגיע למפקח',
      'sections.addon.title': 'הרחבות',
      'sections.automation.description':
        'זה המקום בו ניתן למצוא את python_scripts, יישומי AppDaemon ויישומי NetDaemon',
      'sections.automation.title': 'אוטומציה',
      'sections.frontend.description':
        'זה המקום בו ניתן למצוא נושאים, כרטיסים מותאמים אישית ואלמנטים אחרים עבור lovelace',
      'sections.frontend.title': 'חזותי',
      'sections.integrations.description':
        'זה המקום בו ניתן למצוא שילובים מותאמים אישית (custom_components)',
      'sections.integrations.title': 'שילובים',
      'sections.pending_repository_upgrade':
        'גרסה {downloaded} רצה, גרסה {available} זמינה',
      'store.explore': 'חקירה והורדת מאגרים',
      'store.new_repositories_note': 'יש כמה מאגרים חדשים שמוצגים כאן',
      'store.no_repositories': 'אין מאגרים',
      'store.no_repositories_desc1': 'נראה שעדיין לא הורדת מאגרים במקטע זה.',
      'store.no_repositories_desc2':
        'יש ללחוץ על + בפינה התחתונה בכדי להוסיף את הראשון שלך!',
      'store.no_repositories_found_desc1':
        'לא נמצאו מאגרים שהורדו התואמים ל-"{searchInput}" במקטע זה.',
      'store.no_repositories_found_desc2': 'יאללה ננסה לחפש משהו אחר!',
    },
    hu: {
      'common.add': 'hozzáadás',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Mégse',
      'common.close': 'Bezárás',
      'common.download': 'Letöltés',
      'common.ignore': 'Mellőzés',
      'common.integration': 'Integráció',
      'common.integration_plural': 'Integrációk',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'navigálás',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Python szkript',
      'common.reload': 'Újratöltés',
      'common.remove': 'Eltávolítás',
      'common.repositories': 'Repók',
      'common.repository': 'Repó',
      'common.show': 'Megjelenítés',
      'common.theme': 'Téma',
      'common.update': 'Frissítés',
      'common.updates': 'Frissítések',
      'common.yes': 'Igen',
      'confirm.home_assistant_version_not_correct':
        "Home Assistant ''{haversion}'' verziója fut, de ehhez a repóhoz legalább ''{minversion}'' verzióra van szükség.",
      'dialog.configured.confirm': 'Ugrás az integrációkhoz',
      'dialog.configured.message':
        '{name} integráció be van konfigurálva, ezért előbb törölnie kell annak konfigurációját, mielőtt eltávolítaná a VAIS-ból',
      'dialog.configured.title': 'Az integráció be van konfigurálva',
      'dialog.reload.confirm': 'Meg szeretné most ezt tenni?',
      'dialog.reload.description':
        'Törölnie kell a böngésző gyorsítótárát a Lovelace erőforrások módosításakor.',
      'dialog.remove.message':
        'Biztos benne, hogy el szeretné távolítani: {name}?',
      'dialog.remove.title': 'Eltávolítás',
      'dialog_about.downloaded_repositories': 'Letöltött repók',
      'dialog_about.frontend_version': 'Frontend verzió',
      'dialog_about.integration_version': 'Integráció verzió',
      'dialog_about.useful_links': 'Hasznos linkek',
      'dialog_add_repo.limit':
        'Csak az első 100 repó jelenik meg, használja a keresőt a találatok szűkítéséhez',
      'dialog_add_repo.no_match': 'Nincs a szűrésnek megfelelő repó',
      'dialog_add_repo.sort_by': 'Rendezés',
      'dialog_add_repo.sort_by_values.last_updated': 'Utoljára frissítve',
      'dialog_add_repo.sort_by_values.name': 'Név',
      'dialog_add_repo.sort_by_values.stars': 'Csillag',
      'dialog_add_repo.title': 'Repó hozzáadása',
      'dialog_custom_repositories.category': 'Kategória',
      'dialog_custom_repositories.no_category': 'Hiányzó kategória',
      'dialog_custom_repositories.no_repository': 'Hiányzó repó',
      'dialog_custom_repositories.title': 'Egyedi repók',
      'dialog_custom_repositories.url_placeholder':
        'Egyedi repó URL címének hozzáadása',
      'dialog_download.lovelace_instruction':
        'Miután a letöltés befejeződött, mivel a Lovelace-t nem tárolási módban használja, manuálisan kell hozzáadni az erőforrást ezekkel a beállításokkal:',
      'dialog_download.note_downloaded':
        'Letöltéskor ez a következő helyen lesz: {location}',
      'dialog_download.restart':
        'Ne feledje, hogy az egyedi integrációk (custom_components) módosításainak alkalmazásához újra kell indítani Home Assistantot.',
      'dialog_download.select_version': 'Verzió kiválasztása',
      'dialog_download.show_beta': 'Béta verziók megjelenítése',
      'dialog_download.type': 'Típus',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Szerző',
      'dialog_info.download': 'Repó letöltése VAIS-al',
      'dialog_info.downloads': 'Letöltések',
      'dialog_info.loading': 'Információ betöltése...',
      'dialog_info.no_info':
        'A fejlesztő nem adott meg több információt ehhez a repóhoz',
      'dialog_info.open_issues': 'Jelentett problémák',
      'dialog_info.open_repo': 'Repó megnyitása',
      'dialog_info.stars': 'Csillagok',
      'dialog_info.version_installed': 'Letöltött verzió',
      'dialog_removed.link': 'Külső link további információkhoz',
      'dialog_removed.name': 'Repó neve',
      'dialog_removed.reason': 'Eltávolítás oka',
      'dialog_removed.type': 'Eltávolítás típusa',
      'dialog_update.available_version': 'Elérhető verzió',
      'dialog_update.changelog': 'Változási napló',
      'dialog_update.downloaded_version': 'Letöltött verzió',
      'dialog_update.message': 'Új verzió elérhető: {name}',
      'dialog_update.no_info':
        'A szerző semmilyen információt nem adott meg ehhez a kiadáshoz',
      'dialog_update.releasenotes': '{release} kiadási megjegyzései',
      'dialog_update.title': 'Frissítés érhető el',
      'entry.information': 'Információ',
      'entry.intro':
        'A frissítések és a fontos üzenetek itt jelennek meg, ha vannak',
      'entry.messages.disabled.constrains.description':
        'A futtatási környezet nem kompatibilis a VAIS-al, további részletekért nézze meg a naplófájlokat.',
      'entry.messages.disabled.constrains.title': 'Korlátozások',
      'entry.messages.disabled.content': 'További részletek a naplófájlban',
      'entry.messages.disabled.invalid_token.description':
        'VAIS újrakonfigurálása, és Home Assistant újraindítása.',
      'entry.messages.disabled.invalid_token.title': 'Érvénytelen token',
      'entry.messages.disabled.load_vais.description':
        'További részletek a naplófájlban',
      'entry.messages.disabled.load_vais.title': 'VAIS betöltése nem sikerült',
      'entry.messages.disabled.rate_limit.description':
        'A GitHub API hívásai korlátozva vannak most, de ez kevesebb, mint 1 óra múlva rendben lesz.',
      'entry.messages.disabled.rate_limit.title': 'Korlátozva',
      'entry.messages.disabled.removed.description':
        'VAIS eltávolításra került, most indítsa újra Home Assistant-ot.',
      'entry.messages.disabled.removed.title': 'Eltávolítva',
      'entry.messages.disabled.restore.description':
        'További részletek a naplófájlban',
      'entry.messages.disabled.restore.title':
        'VAIS visszaállítása nem sikerült',
      'entry.messages.disabled.title': 'VAIS le van tiltva',
      'entry.messages.has_pending_tasks.content':
        'Előfordulhat, hogy egyes repók nem jelennek meg, amíg ez be nem fejeződik',
      'entry.messages.has_pending_tasks.title': 'Függőben lévő háttérfeladatok',
      'entry.messages.removed_repository': "''{repository}'' repó eltávolítva",
      'entry.messages.resources.content':
        '{number} olyan Lovelace elem van, amely nincs megfelelően betöltve Lovelace-ben.',
      'entry.messages.resources.title': 'Nincs betöltve Lovelace-ben',
      'entry.messages.restart.content':
        '{number} {pluralWording} miatt szükséges újraindítani Home Assistant-ot. Ezt a „Szerver vezérlés > Szerver menedzsment” konfigurációs részben teheti meg.',
      'entry.messages.restart.title': 'Várakozás újraindításra',
      'entry.messages.setup.content':
        'VAIS beállítása folyamatban van, ez idő alatt bizonyos információk hiányozhatnak vagy helytelenek lehetnek',
      'entry.messages.setup.title': 'VAIS beállítása folyamatban van',
      'entry.messages.startup.content':
        'VAIS éppen indul, ez idő alatt bizonyos információk hiányozhatnak vagy helytelenek lehetnek',
      'entry.messages.startup.title': 'VAIS éppen indul',
      'entry.messages.waiting.content':
        'VAIS az indítási feladatok megkezdése előtt arra vár, hogy Home Assistant befejezze saját indulását',
      'entry.messages.waiting.title': 'VAIS várakozik',
      'entry.messages.wrong_frontend_installed.content':
        'A VAIS kezelőfelületének {running} verziója fut, miközben {expected} verziónak kellene lennie. Ha ezt az üzenetet látja, Home Assistant nem tudta a friss verziót telepíteni. Kérem próbálja meg újraindítani a rendszert.',
      'entry.messages.wrong_frontend_installed.title':
        'Nem várt frontend verzió',
      'entry.messages.wrong_frontend_loaded.content':
        'A VAIS kezelőfelületének {running} verziója fut, miközben {expected} verziónak kellene lennie. Kérem, törölje a böngésző gyorsítótárát!',
      'entry.messages.wrong_frontend_loaded.title': 'Nem várt frontend verzió',
      'entry.pending_updates': 'Frissítések érhetők el',
      'menu.about': 'VAIS névjegye',
      'menu.clear': 'Új jelölések törlése',
      'menu.custom_repositories': 'Egyedi repók',
      'menu.dismiss': 'Minden új repó elvetése',
      'menu.documentation': 'Dokumentáció',
      'menu.open_issue': 'Probléma jelentése',
      'menu.reload': 'Ablak újratöltése',
      'options.abort.not_setup': 'VAIS nincs beállítva.',
      'options.abort.release_limit_value':
        'A kiadás értékének 1 és 100 között kell lennie.',
      'options.step.user.data.appdaemon':
        'AppDaemon appok felfedezésének és nyomon követésének engedélyezése',
      'options.step.user.data.country': 'Szűrés országkóddal.',
      'options.step.user.data.debug': 'Hibakeresés engedélyezése.',
      'options.step.user.data.experimental': 'Kísérleti funkciók engedélyezése',
      'options.step.user.data.netdaemon':
        'NetDaemon appok felfedezésének és nyomon követésének engedélyezése',
      'options.step.user.data.not_in_use': 'YAML-lel nem használható',
      'options.step.user.data.release_limit': 'Megjelenítendő kiadások száma.',
      'options.step.user.data.sidepanel_icon': 'Oldalsó panel ikon',
      'options.step.user.data.sidepanel_title': 'Oldalsó panel cím',
      'repository_card.dismiss': 'elvetés',
      'repository_card.information': 'Információ',
      'repository_card.new_repository': 'Új repó',
      'repository_card.not_loaded': 'Nincs betöltve',
      'repository_card.open_issue': 'Probléma jelentése',
      'repository_card.open_source': 'Forrás megnyitása',
      'repository_card.pending_restart': 'Várakozás újraindításra',
      'repository_card.pending_update': 'Frissítés érhető el',
      'repository_card.redownload': 'Újratelepítés',
      'repository_card.report': 'Jelentés eltávolításra',
      'repository_card.update_information': 'Frissítési információ',
      'search.downloaded': 'Telepített repók keresése',
      'search.downloaded_new': 'Telepített vagy új repók keresése',
      'search.placeholder': 'Repó keresése',
      'sections.about.description': 'Információk megjelenítése VAIS-ről',
      'sections.about.title': 'Névjegy',
      'sections.addon.description':
        'VAIS-ban nincsenek kiegészítők, de ide kattintva továbbmehet a supervisor-hoz',
      'sections.addon.title': 'Kiegészítők',
      'sections.automation.description':
        'Itt Python szkriptek, AppDaemon és NetDaemon appok találhatók',
      'sections.automation.title': 'Automatizmus',
      'sections.frontend.description':
        'Itt a Lovelace kezelőfelülethez egyedi témák, kártyák és egyéb bővítmények találhatók',
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'Itt egyedi integrációk (custom_components) találhatók',
      'sections.integrations.title': 'Integrációk',
      'sections.pending_repository_upgrade':
        '{downloaded}. verzió fut, de elérhető: {available}.',
      'store.explore': 'Repók keresése és hozzáadása',
      'store.new_repositories_note': 'Új repók jelentek meg',
      'store.no_repositories': 'Nincsenek repók',
      'store.no_repositories_desc1':
        'Úgy tűnik, még nincsenek telepítve repók ebben a szekcióban.',
      'store.no_repositories_desc2':
        'Kattintson az alsó sarokban található + jelre az első hozzáadásához!',
      'store.no_repositories_found_desc1':
        'Nem található "{searchInput}"-nak megfelelő telepített repó.',
      'store.no_repositories_found_desc2': 'Próbáljon valami mást keresni!',
    },
    it: {
      'common.add': 'aggiungi',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Annulla',
      'common.close': 'Chiudi',
      'common.download': 'Scarica',
      'common.ignore': 'Ignora',
      'common.integration': 'Integrazione',
      'common.integration_plural': 'Integrazioni',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'naviga',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Script Python',
      'common.reload': 'Ricarica',
      'common.remove': 'Rimuovi',
      'common.repositories': 'Repository',
      'common.repository': 'Repository',
      'common.show': 'Mostra',
      'common.theme': 'Tema',
      'common.update': 'Aggiorna',
      'common.updates': 'Aggiornamenti',
      'common.yes': 'Sì',
      'confirm.home_assistant_version_not_correct':
        "Stai eseguendo la versione ''{haversion}'' di Home Assistant, ma questo repository richiede la versione minima ''{minversion}'' per essere installato.",
      'dialog.configured.confirm': 'Vai alle integrazioni',
      'dialog.configured.message':
        "L'integrazione {name} è configurata o ignorata, è necessario eliminare la sua configurazione prima di rimuoverla da VAIS",
      'dialog.configured.title': "L'integrazione è configurata",
      'dialog.reload.confirm': 'Vuoi farlo adesso?',
      'dialog.reload.description':
        'È necessario ricaricare il browser per utilizzare le risorse aggiornate.',
      'dialog.remove.message': 'Vuoi davvero rimuovere {name}?',
      'dialog.remove.title': 'Rimuovi',
      'dialog_about.downloaded_repositories': 'Repository scaricati',
      'dialog_about.frontend_version': 'Versione frontend',
      'dialog_about.integration_version': "Versione dell'integrazione",
      'dialog_about.useful_links': 'Collegamenti utili',
      'dialog_add_repo.limit':
        'Vengono visualizzati solo i primi 100 repository, utilizza la ricerca per filtrare ciò di cui hai bisogno',
      'dialog_add_repo.no_match':
        'Nessun repository trovato corrispondente al tuo filtro',
      'dialog_add_repo.sort_by': 'Ordina per',
      'dialog_add_repo.sort_by_values.last_updated': 'Ultimo aggiornamento',
      'dialog_add_repo.sort_by_values.name': 'Nome',
      'dialog_add_repo.sort_by_values.stars': 'Stelle',
      'dialog_add_repo.title': 'Aggiungi repository',
      'dialog_custom_repositories.category': 'Categoria',
      'dialog_custom_repositories.no_category': 'Categoria mancante',
      'dialog_custom_repositories.no_repository': 'Repository mancante',
      'dialog_custom_repositories.title': 'Repository personalizzati',
      'dialog_custom_repositories.url_placeholder':
        "Aggiungi l'URL del repository personalizzato",
      'dialog_download.lovelace_instruction':
        'Al termine dello scaricamento, poiché non stai utilizzando Lovelace in modalità di archiviazione, devi aggiungere manualmente la risorsa con queste impostazioni:',
      'dialog_download.note_downloaded':
        'Una volta scaricato, si troverà in {location}',
      'dialog_download.restart':
        'Ricorda che devi riavviare Home Assistant prima che vengano applicate le modifiche alle integrazioni (custom_components).',
      'dialog_download.select_version': 'Seleziona la versione',
      'dialog_download.show_beta': 'Mostra versioni beta',
      'dialog_download.type': 'Tipo',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Autore',
      'dialog_info.download': 'Scarica questo repository con VAIS',
      'dialog_info.downloads': 'Download',
      'dialog_info.loading': 'Caricamento informazioni...',
      'dialog_info.no_info':
        'Lo sviluppatore non ha fornito ulteriori informazioni per questo repository',
      'dialog_info.open_issues': 'Problemi irrisolti',
      'dialog_info.open_repo': 'Apri il repository',
      'dialog_info.stars': 'Stelle',
      'dialog_info.version_installed': 'Versione scaricata',
      'dialog_removed.link': 'Collegamento esterno a ulteriori informazioni',
      'dialog_removed.name': 'Nome del repository',
      'dialog_removed.reason': 'Motivo della rimozione',
      'dialog_removed.type': 'Tipo di rimozione',
      'dialog_update.available_version': 'Versione disponibile',
      'dialog_update.changelog': 'Registro delle modifiche',
      'dialog_update.downloaded_version': 'Versione scaricata',
      'dialog_update.message': 'È disponibile la nuova versione di {name}',
      'dialog_update.no_info':
        "L'autore non ha fornito alcuna informazione per questa versione",
      'dialog_update.releasenotes': 'Note di rilascio per {release}',
      'dialog_update.title': 'Aggiornamento in sospeso',
      'entry.information': 'Informazioni',
      'entry.intro':
        'Gli aggiornamenti e i messaggi importanti saranno visualizzati qui, se presenti',
      'entry.messages.disabled.constrains.description':
        'Il tuo ambiente non è compatibile per eseguire VAIS, controlla il tuo file di registro per maggiori dettagli.',
      'entry.messages.disabled.constrains.title': 'Vincoli',
      'entry.messages.disabled.content':
        'Controlla il tuo file di registro per maggiori dettagli',
      'entry.messages.disabled.invalid_token.description':
        'Riconfigura VAIS e riavvia Home Assistant.',
      'entry.messages.disabled.invalid_token.title': 'Token non valido',
      'entry.messages.disabled.load_vais.description':
        'Controlla il tuo file di registro per maggiori dettagli',
      'entry.messages.disabled.load_vais.title': 'Impossibile caricare VAIS',
      'entry.messages.disabled.rate_limit.description':
        'Le chiamate API di GitHub sono limitate, questo limite verrà cancellato in meno di 1 ora.',
      'entry.messages.disabled.rate_limit.title': 'Limitazione',
      'entry.messages.disabled.removed.description':
        'VAIS è stato rimosso, riavvia Home Assistant.',
      'entry.messages.disabled.removed.title': 'Rimosso',
      'entry.messages.disabled.restore.description':
        'Controlla il tuo file di registro per maggiori dettagli',
      'entry.messages.disabled.restore.title':
        'Ripristino di VAIS non riuscito',
      'entry.messages.disabled.title': 'VAIS è disabilitato',
      'entry.messages.has_pending_tasks.content':
        'Alcuni repository potrebbero non essere visualizzati fino al completamento',
      'entry.messages.has_pending_tasks.title':
        'Attività in background in sospeso',
      'entry.messages.removed_repository':
        "Repository ''{repository}'' rimosso",
      'entry.messages.resources.content':
        'Hai {number} elementi di Lovelace che non sono stati caricati correttamente in Lovelace.',
      'entry.messages.resources.title': 'Non caricato in Lovelace',
      'entry.messages.restart.content':
        'Hai {number} {pluralWording} da installare per cui è necessario riavviare Home Assistant. Puoi farlo dalla sezione "Gestione del server" nella "Configurazione" dell\'interfaccia utente di Home Assistant.',
      'entry.messages.restart.title': 'Riavvio in sospeso',
      'entry.messages.setup.content':
        'VAIS è in fase di configurazione, durante questo periodo alcune informazioni potrebbero essere mancanti o errate',
      'entry.messages.setup.title': 'VAIS si sta configurando',
      'entry.messages.startup.content':
        'VAIS si sta avviando, durante questo periodo alcune informazioni potrebbero essere mancanti o errate',
      'entry.messages.startup.title': 'VAIS si sta avviando',
      'entry.messages.waiting.content':
        "VAIS è in attesa che Home Assistant finisca l'avvio prima di iniziare le attività di avvio",
      'entry.messages.waiting.title': 'VAIS è in attesa',
      'entry.messages.wrong_frontend_installed.content':
        'Hai installato la versione {running} del frontend VAIS, ma era attesa la versione {expected}, se vedi questo messaggio Home Assistant non è stato in grado di installare la nuova versione, prova a riavviare Home Assistant.',
      'entry.messages.wrong_frontend_installed.title':
        'Versione frontend inattesa',
      'entry.messages.wrong_frontend_loaded.content':
        'Stai eseguendo la versione {running} del frontend VAIS, ma era prevista la versione {expected}, è necessario svuotare la cache del browser.',
      'entry.messages.wrong_frontend_loaded.title':
        'Versione frontend inattesa',
      'entry.pending_updates': 'Aggiornamenti in sospeso',
      'menu.about': 'Informazioni su VAIS',
      'menu.clear': 'Nascondi novità',
      'menu.custom_repositories': 'Repository personalizzati',
      'menu.dismiss': 'Nascondi nuovi repository',
      'menu.documentation': 'Documentazione',
      'menu.open_issue': 'Problemi irrisolti',
      'menu.reload': 'Ricarica la finestra',
      'options.abort.not_setup': 'VAIS non è configurato.',
      'options.abort.release_limit_value':
        'Il limite di rilascio deve essere compreso tra 1 e 100',
      'options.step.user.data.appdaemon':
        'Abilita il rilevamento e il monitoraggio delle applicazioni AppDaemon',
      'options.step.user.data.country': 'Filtra con prefisso internazionale.',
      'options.step.user.data.debug': 'Abilita debug.',
      'options.step.user.data.experimental':
        'Abilita funzionalità sperimentali',
      'options.step.user.data.netdaemon':
        'Abilita il rilevamento e il monitoraggio delle applicazioni NetDaemon',
      'options.step.user.data.not_in_use': 'Non in uso con YAML',
      'options.step.user.data.release_limit': 'Numero di versioni da mostrare.',
      'options.step.user.data.sidepanel_icon': 'Icona nel pannello laterale',
      'options.step.user.data.sidepanel_title': 'Titolo nel pannello laterale',
      'repository_card.dismiss': 'nascondi',
      'repository_card.information': 'Informazioni',
      'repository_card.new_repository': 'Nuovo repository',
      'repository_card.not_loaded': 'Non caricato',
      'repository_card.open_issue': 'Problemi irrisolti',
      'repository_card.open_source': 'Open source',
      'repository_card.pending_restart': 'In attesa di riavvio',
      'repository_card.pending_update': 'Aggiornamento in sospeso',
      'repository_card.redownload': 'Scarica di nuovo',
      'repository_card.report': 'Richiesta di rimozione',
      'repository_card.update_information': 'Aggiorna informazioni',
      'search.downloaded': 'Cerca i repository scaricati',
      'search.downloaded_new': 'Cerca i repository scaricati o nuovi',
      'search.placeholder': 'Cerca repository',
      'sections.about.description': 'Mostra informazioni su VAIS',
      'sections.about.title': 'Informazioni su',
      'sections.addon.description':
        'Non ci sono componenti aggiuntivi in VAIS, ma puoi fare clic qui per accedere al Supervisor',
      'sections.addon.title': 'Componenti aggiuntivi',
      'sections.automation.description':
        'Qui trovi python_scripts, le applicazioni AppDaemon e NetDaemon',
      'sections.automation.title': 'Automazione',
      'sections.frontend.description':
        'Qui trovi i temi, le schede personalizzate e altri elementi per Lovelace',
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'Qui trovi le integrazioni personalizzate (custom_components)',
      'sections.integrations.title': 'Integrazioni',
      'sections.pending_repository_upgrade':
        'Stai eseguendo la versione {downloaded}, è disponibile la nuova versione {available}',
      'store.explore': 'Esplora e scarica repository',
      'store.new_repositories_note':
        'Qui sono mostrati alcuni nuovi repository',
      'store.no_repositories': 'Nessun repository',
      'store.no_repositories_desc1':
        'Sembra che tu non abbia ancora scaricato alcun repository in questa sezione.',
      'store.no_repositories_desc2':
        "Fai clic sul + nell'angolo in basso per aggiungere il tuo primo!",
      'store.no_repositories_found_desc1':
        'Nessun repository scaricato corrispondente a "{searchInput}" trovato in questa sezione.',
      'store.no_repositories_found_desc2': "Prova a cercare qualcos'altro!",
    },
    nb: {
      'common.add': 'legg til',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Avbryt',
      'common.close': 'Lukk',
      'common.download': 'Laste ned',
      'common.ignore': 'Ignorere',
      'common.integration': 'Integrasjon',
      'common.integration_plural': 'Integrasjoner',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'navigere',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Python-skript',
      'common.reload': 'Last inn på nytt',
      'common.remove': 'Fjern',
      'common.repositories': 'Pakkelagre',
      'common.repository': 'Pakkelager',
      'common.show': 'Vise',
      'common.theme': 'Tema',
      'common.update': 'Oppdater',
      'common.updates': 'Oppdateringer',
      'common.yes': 'Ja',
      'confirm.home_assistant_version_not_correct':
        "Du kjører Home Assistant ''{haversion}'', men dette pakkelageret krever minimum versjon ''{minversion}'' for å bli installert.",
      'dialog.configured.confirm': 'Gå til integrasjoner',
      'dialog.configured.message':
        '{name} -integrasjonen er konfigurert eller ignorert, du må slette konfigurasjonen for den før du fjerner den fra VAIS',
      'dialog.configured.title': 'Integrasjon er konfigurert',
      'dialog.reload.confirm': 'Vil du gjøre det nå?',
      'dialog.reload.description':
        'Du må laste inn nettleseren på nytt for at de oppdaterte ressursene skal kunne brukes.',
      'dialog.remove.message': 'Vil du virkelig fjerne {name} ?',
      'dialog.remove.title': 'Fjern',
      'dialog_about.downloaded_repositories': 'Nedlastede pakkelagre',
      'dialog_about.frontend_version': 'Frontend versjon',
      'dialog_about.integration_version': 'Integrasjonsversjon',
      'dialog_about.useful_links': 'Nyttige lenker',
      'dialog_add_repo.limit':
        'Bare de første 100 pakkelagrene vises, bruk søket til å filtrere det du trenger',
      'dialog_add_repo.no_match':
        'Ingen pakkelagre funnet som samsvarer med filteret ditt',
      'dialog_add_repo.sort_by': 'Sorter etter',
      'dialog_add_repo.sort_by_values.last_updated': 'Sist oppdatert',
      'dialog_add_repo.sort_by_values.name': 'Navn',
      'dialog_add_repo.sort_by_values.stars': 'Stjerner',
      'dialog_add_repo.title': 'Legg til pakkelager',
      'dialog_custom_repositories.category': 'Kategori',
      'dialog_custom_repositories.no_category': 'Mangler kategori',
      'dialog_custom_repositories.no_repository': 'Mangler pakkelager',
      'dialog_custom_repositories.title': 'Tilpassede pakkelagre',
      'dialog_custom_repositories.url_placeholder':
        'Legg til tilpasset pakkelager URL',
      'dialog_download.lovelace_instruction':
        'Etter at nedlastingen er fullført, siden du ikke bruker Lovelace i lagringsmodus, må du manuelt legge til ressursen med disse innstillingene:',
      'dialog_download.note_downloaded':
        'Når det er lastet ned, vil dette være plassert i {location}',
      'dialog_download.restart':
        'Husk at du må starte Home Assistant på nytt før endringer i integrasjoner (custom_components) brukes.',
      'dialog_download.select_version': 'Velg versjon',
      'dialog_download.show_beta': 'Vis betaversjoner',
      'dialog_download.type': 'Type',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Utgiver',
      'dialog_info.download': 'Last ned dette pakkelageret med VAIS',
      'dialog_info.downloads': 'Nedlastinger',
      'dialog_info.loading': 'Laster inn informasjon ...',
      'dialog_info.no_info':
        'Utvikleren har ikke gitt mer informasjon for dette pakkelageret',
      'dialog_info.open_issues': 'Åpne problemer',
      'dialog_info.open_repo': 'Åpne pakkelager nettsted',
      'dialog_info.stars': 'Stjerner',
      'dialog_info.version_installed': 'Nedlasted versjon',
      'dialog_removed.link': 'Ekstern lenke til mer informasjon',
      'dialog_removed.name': 'Navn på pakkelager',
      'dialog_removed.reason': 'Årsaken til fjerning',
      'dialog_removed.type': 'Fjerningstype',
      'dialog_update.available_version': 'Tilgjengelig versjon',
      'dialog_update.changelog': 'Endringslogg',
      'dialog_update.downloaded_version': 'Nedlastet versjon',
      'dialog_update.message': 'En ny versjon av {name} er tilgjengelig',
      'dialog_update.no_info':
        'Forfatteren har ikke gitt noen informasjon for denne utgivelsen',
      'dialog_update.releasenotes': 'Utgivelsesmerknader for {release}',
      'dialog_update.title': 'Oppdatering venter',
      'entry.information': 'Informasjon',
      'entry.intro':
        'Oppdateringer og viktige meldinger vises her hvis det er noen',
      'entry.messages.disabled.constrains.description':
        'Miljøet ditt er ikke kompatibelt for å kjøre VAIS, sjekk loggfilen din for mer informasjon.',
      'entry.messages.disabled.constrains.title': 'Begrensninger',
      'entry.messages.disabled.content':
        'Sjekk loggfilen din for mer informasjon',
      'entry.messages.disabled.invalid_token.description':
        'Konfigurer VAIS på nytt og start Home Assistant på nytt.',
      'entry.messages.disabled.invalid_token.title': 'Ugyldig token',
      'entry.messages.disabled.load_vais.description':
        'Sjekk loggfilen din for mer informasjon',
      'entry.messages.disabled.load_vais.title': 'VAIS kunne ikke lastes inn',
      'entry.messages.disabled.rate_limit.description':
        'GitHub API-anrop er begrenset, dette slettes på mindre enn 1 time.',
      'entry.messages.disabled.rate_limit.title': 'Ratelimited',
      'entry.messages.disabled.removed.description':
        'VAIS er fjernet, start Home Assistant på nytt.',
      'entry.messages.disabled.removed.title': 'Fjernet',
      'entry.messages.disabled.restore.description':
        'Sjekk loggfilen din for mer informasjon',
      'entry.messages.disabled.restore.title':
        'Gjenoppretting av VAIS mislyktes',
      'entry.messages.disabled.title': 'VAIS er deaktivert',
      'entry.messages.has_pending_tasks.content':
        'Noen elementer vises kanskje ikke før dette er fullført',
      'entry.messages.has_pending_tasks.title': 'Venter på bakgrunnsoppgaver',
      'entry.messages.removed_repository':
        "Fjernet pakkelageret ''{repository}''",
      'entry.messages.resources.content':
        'Du har {number} Lovelace-elementer som ikke er riktig lastet inn i Lovelace.',
      'entry.messages.resources.title': 'Ikke lastet i Lovelace',
      'entry.messages.restart.content':
        'Du har {number} {pluralWording} som krever en omstart av Home Assistant. Du kan gjøre det fra Server-kontroller under konfigurasjonsdelen av Home Assistant brukergrensesnittet.',
      'entry.messages.restart.title': 'Venter på omstart',
      'entry.messages.setup.content':
        'VAIS starter opp, i løpet av denne tiden kan det hende at noe informasjon mangler eller er feil',
      'entry.messages.setup.title': 'VAIS settes opp',
      'entry.messages.startup.content':
        'VAIS starter opp, i løpet av denne tiden kan det hende at noe informasjon mangler eller er feil',
      'entry.messages.startup.title': 'VAIS starter opp',
      'entry.messages.waiting.content':
        'VAIS venter på at Home Assistant skal fullføre oppstart før oppstart av oppgaver',
      'entry.messages.waiting.title': 'VAIS venter',
      'entry.messages.wrong_frontend_installed.content':
        'Du har versjon {running} av VAIS frontend installert, men versjon {expected} var forventet. Hvis du ser denne meldingen, kunne ikke Home Assistant installere den nye versjonen. Forsøk å starte Home Assistant på nytt.',
      'entry.messages.wrong_frontend_installed.title':
        'Uventet grensesnitt versjon',
      'entry.messages.wrong_frontend_loaded.content':
        'Du kjører versjon {running} av VAIS grensesnittet, men versjon {expected} var forventet. Du bør tømme nettleserens hurtiglager.',
      'entry.messages.wrong_frontend_loaded.title':
        'Uventet grensesnitt versjon',
      'entry.pending_updates': 'Oppdateringer er klare',
      'menu.about': 'Om VAIS',
      'menu.clear': 'Fjern alt nytt',
      'menu.custom_repositories': 'Tilpassede pakkelagre',
      'menu.dismiss': 'Lukk nye repositorier',
      'menu.documentation': 'Dokumentasjon',
      'menu.open_issue': 'Meld et problem',
      'menu.reload': 'Last inn vinduet på nytt',
      'options.abort.not_setup': 'VAIS er ikke satt opp.',
      'options.abort.release_limit_value':
        'Utgivelsesgrensen må være mellom 1 og 100',
      'options.step.user.data.appdaemon':
        'Aktiver oppdagelse og sporing av AppDaemon-apper',
      'options.step.user.data.country': 'Filtrer med landskode',
      'options.step.user.data.debug': 'Aktiver feilsøking',
      'options.step.user.data.experimental':
        'Aktiver eksperimentelle funksjoner',
      'options.step.user.data.netdaemon':
        'Aktiver oppdagelse og sporing av NetDaemon-apper',
      'options.step.user.data.not_in_use': 'Ikke i bruk med YAML',
      'options.step.user.data.release_limit':
        'Antall utgivelser som skal vises',
      'options.step.user.data.sidepanel_icon': 'Sidepanel ikon',
      'options.step.user.data.sidepanel_title': 'Sidepanel tittel',
      'repository_card.dismiss': 'Avvis',
      'repository_card.information': 'Informasjon',
      'repository_card.new_repository': 'Nytt pakkelager',
      'repository_card.not_loaded': 'Ikke lastet inn',
      'repository_card.open_issue': 'Meld et problem',
      'repository_card.open_source': 'Åpne kilde',
      'repository_card.pending_restart': 'Venter på omstart',
      'repository_card.pending_update': 'Oppdatering venter',
      'repository_card.redownload': 'Last ned på nytt',
      'repository_card.report': 'Forespørsel om fjerning',
      'repository_card.update_information': 'Oppdater informasjon',
      'search.downloaded': 'Søk etter nedlastede arkiver',
      'search.downloaded_new': 'Søk etter nedlastede eller nye depoter',
      'search.placeholder': 'Søk etter pakkelager',
      'sections.about.description': 'Vis informasjon om VAIS',
      'sections.about.title': 'Om',
      'sections.addon.description':
        'Det er ingen addons i VAIS, men du kan klikke her for å komme til veilederen',
      'sections.addon.title': 'Add-ons',
      'sections.automation.description':
        'Det er her du finner python_scripts, AppDaemon-apper og NetDaemon-apper',
      'sections.automation.title': 'Automasjon',
      'sections.frontend.description':
        'Det er her du finner temaer, tilpassede kort og andre elementer for lovelace',
      'sections.frontend.title': 'Grensesnitt',
      'sections.integrations.description':
        'Det er her du finner tilpassede integrasjoner (custom_components)',
      'sections.integrations.title': 'Integrasjoner',
      'sections.pending_repository_upgrade':
        'Du kjører versjon {downloaded} , versjon {available} er tilgjengelig',
      'store.explore': 'Utforsk og last ned pakkelagre',
      'store.new_repositories_note': 'Det er noen nye depoter som vises her',
      'store.no_repositories': 'Ingen pakkelagre',
      'store.no_repositories_desc1':
        'Det ser ut til at du ikke har lastet ned noen repositories i denne delen ennå.',
      'store.no_repositories_desc2':
        'Klikk på + i nederste hjørne for å legge til din første!',
      'store.no_repositories_found_desc1':
        'Ingen nedlastede arkiver som samsvarer med " {searchInput} " funnet i denne delen.',
      'store.no_repositories_found_desc2': 'Prøv å søke etter noe annet!',
    },
    nl: {
      'common.add': 'toevoegen',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Annuleren',
      'common.close': 'Sluit',
      'common.download': 'Download',
      'common.ignore': 'Negeer',
      'common.integration': 'Integratie',
      'common.integration_plural': 'Integraties',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'Navigeer',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Python Script',
      'common.reload': 'Herladen',
      'common.remove': 'Verwijder',
      'common.repositories': 'Repositories',
      'common.repository': 'Repository',
      'common.show': 'Toon',
      'common.theme': 'Thema',
      'common.update': 'Update',
      'common.updates': 'Updates',
      'common.yes': 'Ja',
      'confirm.home_assistant_version_not_correct':
        "U gebruikt Home Assistant versie ''{haversion}'', echter deze repository vereist dat minimaal versie ''{minversion}'' is geïnstalleerd.",
      'dialog.configured.confirm': 'Ga naar integraties',
      'dialog.configured.message':
        'De {name} -integratie is geconfigureerd of genegeerd, u moet de configuratie er van verwijderen voordat u deze uit VAIS verwijdert',
      'dialog.configured.title': 'Integratie is geconfigureerd',
      'dialog.reload.confirm': 'Wilt u dat nu doen?',
      'dialog.reload.description':
        'U moet de cache van uw browser leegmaken wanneer u Lovelace-bronnen wijzigt.',
      'dialog.remove.message': 'Wilt u {name} echt verwijderen?',
      'dialog.remove.title': 'Verwijder',
      'dialog_about.downloaded_repositories': 'Gedownloade repositories',
      'dialog_about.frontend_version': 'Frontend versie',
      'dialog_about.integration_version': 'Integratieversie',
      'dialog_about.useful_links': 'Nuttige links',
      'dialog_add_repo.limit':
        'Alleen de eerste 100 repositories worden getoond, gebruik de zoekopdracht om te filteren wat u nodig heeft',
      'dialog_add_repo.no_match':
        'Er zijn geen repositories gevonden die overeenkomen met uw filter',
      'dialog_add_repo.sort_by': 'Sorteren op',
      'dialog_add_repo.sort_by_values.last_updated': 'Laatst bijgewerkt',
      'dialog_add_repo.sort_by_values.name': 'Naam',
      'dialog_add_repo.sort_by_values.stars': 'Sterren',
      'dialog_add_repo.title': 'Repository toevoegen',
      'dialog_custom_repositories.category': 'Categorie',
      'dialog_custom_repositories.no_category': 'Ontbrekende categorie',
      'dialog_custom_repositories.no_repository': 'Ontbrekende repository',
      'dialog_custom_repositories.title': 'Aangepaste repositories',
      'dialog_custom_repositories.url_placeholder':
        'Voeg een aangepaste repository-URL toevoegen',
      'dialog_download.lovelace_instruction':
        'Nadat de download is voltooid, moet u, aangezien u Lovelace niet in de opslagmodus gebruikt, de bron handmatig toevoegen met deze instellingen:',
      'dialog_download.note_downloaded':
        'Wanneer gedownload zal deze zich bevinden in {location}',
      'dialog_download.restart':
        'Vergeet niet dat u Home Assistant opnieuw moet opstarten voordat wijzigingen in integraties (custom_components) worden toegepast.',
      'dialog_download.select_version': 'Selecteer versie',
      'dialog_download.show_beta': 'Bètaversies weergeven',
      'dialog_download.type': 'Type',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Auteur',
      'dialog_info.download': 'Download deze repository met VAIS',
      'dialog_info.downloads': 'Downloads',
      'dialog_info.loading': 'Informatie laden ...',
      'dialog_info.no_info':
        'De ontwikkelaar heeft geen verdere informatie verstrekt voor deze repository',
      'dialog_info.open_issues': 'Openstaande problemen',
      'dialog_info.open_repo': 'Open repository',
      'dialog_info.stars': 'Sterren',
      'dialog_info.version_installed': 'Versie gedownload',
      'dialog_removed.link': 'Externe link naar meer informatie',
      'dialog_removed.name': 'Repository naam',
      'dialog_removed.reason': 'Reden voor verwijdering',
      'dialog_removed.type': 'Type verwijdering',
      'dialog_update.available_version': 'Beschikbare versie',
      'dialog_update.changelog': 'Changelog',
      'dialog_update.downloaded_version': 'Gedownloade versie',
      'dialog_update.message': 'Er is een nieuwe versie van {name} beschikbaar',
      'dialog_update.no_info':
        'De ontwikkelaar heeft geen verdere informatie verstrekt voor deze repository',
      'dialog_update.releasenotes': 'Releasenotes voor {release}',
      'dialog_update.title': 'Update in behandeling',
      'entry.information': 'Informatie',
      'entry.intro':
        'Updates en belangrijke berichten worden hier weergegeven als die er zijn',
      'entry.messages.disabled.constrains.description':
        'Uw omgeving is niet geschikt om VAIS te draaien, controleer uw log bestand voor meer details.',
      'entry.messages.disabled.constrains.title': 'Beperkingen',
      'entry.messages.disabled.content':
        'Controleer uw logbestand voor meer details',
      'entry.messages.disabled.invalid_token.description':
        'Herconfigureer VAIS en herstart Home Assistant.',
      'entry.messages.disabled.invalid_token.title': 'Ongeldige token',
      'entry.messages.disabled.load_vais.description':
        'Controleer uw logbestand voor meer details',
      'entry.messages.disabled.load_vais.title': 'VAIS kon niet worden geladen',
      'entry.messages.disabled.rate_limit.description':
        'GitHub API calls zijn gelimiteerd, dit zal over een uur weg zijn.',
      'entry.messages.disabled.rate_limit.title': 'Ratelimiet',
      'entry.messages.disabled.removed.description':
        'VAIS is verwijderd, start Home Assistant opnieuw.',
      'entry.messages.disabled.removed.title': 'Verwijderd',
      'entry.messages.disabled.restore.description':
        'Controleer uw logbestand voor meer details',
      'entry.messages.disabled.restore.title': 'Herstel van VAIS mislukt',
      'entry.messages.disabled.title': 'VAIS is uitgeschakeld',
      'entry.messages.has_pending_tasks.content':
        'Sommige repositories worden mogelijk pas weergegeven als dit is voltooid',
      'entry.messages.has_pending_tasks.title':
        'Achtergrondtaken in behandeling',
      'entry.messages.removed_repository':
        "Verwijderde repository ''{repository}''",
      'entry.messages.resources.content':
        'U heeft {number} Lovelace-elementen die niet correct zijn geladen in Lovelace.',
      'entry.messages.resources.title': 'Niet geladen in Lovelace',
      'entry.messages.restart.content':
        "U heeft {number} {pluralWording} waarvoor Home Assistant opnieuw moet worden gestart. U kunt dat doen via het gedeelte 'Serverbeheer' onder het configuratiegedeelte van de Home Assistant UI.",
      'entry.messages.restart.title': 'In afwachting van herstart',
      'entry.messages.setup.content':
        'VAIS is aan het opstarten, gedurende deze tijd kunnen sommige gegevens ontbreken of onjuist zijn',
      'entry.messages.setup.title': 'VAIS is aan het opstarten',
      'entry.messages.startup.content':
        'VAIS is aan het opstarten, gedurende deze tijd kan er informatie ontbreken of onjuist zijn',
      'entry.messages.startup.title': 'VAIS is aan het opstarten',
      'entry.messages.waiting.content':
        'VAIS wacht tot Home Assistant klaar is met opstarten voordat het begint met opstarttaken',
      'entry.messages.waiting.title': 'VAIS is aan het wachten',
      'entry.messages.wrong_frontend_installed.content':
        'U heeft {running} van de VAIS-frontend geïnstalleerd, maar versie {expected} werd verwacht. Als u dit bericht ziet, kon Home Assistant de nieuwe versie niet installeren. Probeer Home Assistant opnieuw op te starten.',
      'entry.messages.wrong_frontend_installed.title':
        'Onverwachte frontend-versie',
      'entry.messages.wrong_frontend_loaded.content':
        'U gebruikt versie {running} van de VAIS-frontend, maar versie {expected} werd verwacht, u moet uw browsercache wissen.',
      'entry.messages.wrong_frontend_loaded.title':
        'Onverwachte frontend-versie',
      'entry.pending_updates': 'In afwachting van updates',
      'menu.about': 'Over VAIS',
      'menu.clear': 'Wis alle nieuwe',
      'menu.custom_repositories': 'Aangepaste repositories',
      'menu.dismiss': 'Verberg nieuwe repositories',
      'menu.documentation': 'Documentatie',
      'menu.open_issue': 'Meld probleem',
      'menu.reload': 'Herlaad venster',
      'options.abort.not_setup': 'VAIS is niet ingesteld.',
      'options.abort.release_limit_value':
        'De releaselimiet moet tussen de 1 en 1000 liggen',
      'options.step.user.data.appdaemon':
        'Zet AppDaemon apps ontdekken & traceren aan',
      'options.step.user.data.country': 'Filter met land code.',
      'options.step.user.data.debug': 'Schakel debug in.',
      'options.step.user.data.experimental': 'Zet experimentele functies aan',
      'options.step.user.data.netdaemon':
        'Zet NetDaemon apps ontdekken & traceren aan',
      'options.step.user.data.not_in_use': 'Niet in gebruik met YAML',
      'options.step.user.data.release_limit':
        'Aantal releases om te laten zien.',
      'options.step.user.data.sidepanel_icon': 'Zijpaneel icoon',
      'options.step.user.data.sidepanel_title': 'Zijpaneel titel',
      'repository_card.dismiss': 'verberg',
      'repository_card.information': 'Informatie',
      'repository_card.new_repository': 'Nieuwe repository',
      'repository_card.not_loaded': 'Niet geladen',
      'repository_card.open_issue': 'Meld probleem',
      'repository_card.open_source': 'Open source',
      'repository_card.pending_restart': 'In afwachting van herstart',
      'repository_card.pending_update': 'In afwachting van update',
      'repository_card.redownload': 'Opnieuw downloaden',
      'repository_card.report': 'Rapport voor verwijdering',
      'repository_card.update_information': 'Update informatie',
      'search.downloaded': 'Zoek naar gedownloade repositories',
      'search.downloaded_new': 'Zoeken naar gedownloade of nieuwe repositories',
      'search.placeholder': 'Zoek naar repository',
      'sections.about.description': 'Toon informatie over VAIS',
      'sections.about.title': 'Over',
      'sections.addon.description':
        'Er zijn geen add-ons in VAIS, maar u kunt hier klikken om naar de supervisor te gaan',
      'sections.addon.title': 'Add-ons',
      'sections.automation.description':
        'Hier vindt u python_scripts, AppDaemon-apps en NetDaemon-apps',
      'sections.automation.title': 'Automatisering',
      'sections.frontend.description':
        "Dit is waar u thema's, aangepaste kaarten en andere elementen voor lovelace vindt",
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'Hier vindt u aangepaste integraties (custom_components)',
      'sections.integrations.title': 'Integraties',
      'sections.pending_repository_upgrade':
        'U gebruikt versie {downloaded}, versie {available} is beschikbaar',
      'store.explore': 'Repositories verkennen en downloaden',
      'store.new_repositories_note':
        'Er worden hier nieuwe repositories getoond',
      'store.no_repositories': 'Geen repositories',
      'store.no_repositories_desc1':
        'Het lijkt erop dat u nog geen repositories heeft geïnstalleerd in deze sectie.',
      'store.no_repositories_desc2':
        'Klik op de + in de benedenhoek om uw eerste toe te voegen!',
      'store.no_repositories_found_desc1':
        'Er zijn geen gedownloade repositories die overeenkomen met "{searchInput}" in deze sectie.',
      'store.no_repositories_found_desc2': 'Probeer iets anders te zoeken!',
    },
    nn: {
      'common.appdaemon': 'AppDaemon',
      'common.integration': 'Integrasjon',
      'common.integration_plural': 'Integrasjonar',
      'common.lovelace': 'Lovelace',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.repositories': 'Repositories',
      'common.theme': 'Tema',
      'confirm.home_assistant_version_not_correct':
        "Du køyrer Home Assistant-versjonen ''{haversion}'', men dette kodedepoet krev minst versjon ''{minversion}'' for å bli installert.",
      'options.step.user.data.appdaemon':
        'Aktiver AppDeamon-appar-oppdaging og sporing',
      'options.step.user.data.country': 'Filterer med landskode',
      'options.step.user.data.debug': 'Aktiver debug.',
      'options.step.user.data.experimental':
        'Aktiver ekspreimentelle funksjonar',
      'options.step.user.data.netdaemon':
        'Aktiver NetDeamon-appar-oppdaging og sporing',
      'options.step.user.data.not_in_use': 'Kan ikkje brukast saman med YAML',
      'options.step.user.data.release_limit': 'Talet på utgivingar',
      'options.step.user.data.sidepanel_icon': 'Sidepanelikon',
      'options.step.user.data.sidepanel_title': 'Sidepaneltittel',
      'sections.about.description': 'Vis informasjon om VAIS',
      'sections.about.title': 'Om',
      'sections.automation.description':
        'Her finn du python_scripts, AppDaemon-appar og NetDaemon-appar',
      'sections.automation.title': 'Automasjon',
      'sections.frontend.description':
        'Her finn du tema, eigendefinerte kort og andre element for lovelace',
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'Her finn du eigendefinerte ingtegrasjonar (custom_components)',
      'sections.integrations.title': 'Integrasjonar',
      'sections.pending_repository_upgrade':
        'Du køyrer versjon {installed}, og versjon {available} er tilgjengeleg',
    },
    pl: {
      'common.add': 'dodaj',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Anuluj',
      'common.close': 'Zamknij',
      'common.download': 'Pobierz',
      'common.ignore': 'Ignoruj',
      'common.integration': 'Integracja',
      'common.integration_plural': 'Integracje',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'nawiguj',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Skrypt Pythona',
      'common.reload': 'Wczytaj ponownie',
      'common.remove': 'Usuń',
      'common.repositories': 'Repozytoria',
      'common.repository': 'Repozytorium',
      'common.show': 'Pokaż',
      'common.theme': 'Motyw',
      'common.update': 'Uaktualnij',
      'common.updates': 'Aktualizacje',
      'common.yes': 'Tak',
      'confirm.home_assistant_version_not_correct':
        "Używasz Home Assistant'a w wersji ''{haversion}'', a to repozytorium wymaga wersji minimum ''{minversion}''.",
      'dialog.configured.confirm': 'Przejdź do integracji',
      'dialog.configured.message':
        'Integracja {name} jest skonfigurowana lub ignorowana. Należy usunąć jej konfigurację przed usunięciem jej z VAIS.',
      'dialog.configured.title': 'Integracja jest skonfigurowana',
      'dialog.reload.confirm': 'Czy chcesz to zrobić teraz?',
      'dialog.reload.description':
        'Musisz wyczyścić pamięć podręczną przeglądarki po zmianie zasobów Lovelace.',
      'dialog.remove.message': 'Czy na pewno chcesz usunąć {name}?',
      'dialog.remove.title': 'Usuwanie',
      'dialog_about.downloaded_repositories': 'Pobrane repozytoria',
      'dialog_about.frontend_version': 'Wersja interfejsu użytkownika',
      'dialog_about.integration_version': 'Wersja integracji',
      'dialog_about.useful_links': 'Przydatne linki',
      'dialog_add_repo.limit':
        'Wyświetlanych jest tylko pierwszych 100 repozytoriów, użyj wyszukiwania, aby przefiltrować potrzebne informacje',
      'dialog_add_repo.no_match':
        'Nie znaleziono repozytoriów pasujących do filtra',
      'dialog_add_repo.sort_by': 'Sortuj według',
      'dialog_add_repo.sort_by_values.last_updated': 'Ostatnio zaktualizowane',
      'dialog_add_repo.sort_by_values.name': 'Nazwa',
      'dialog_add_repo.sort_by_values.stars': 'Gwiazdki',
      'dialog_add_repo.title': 'Dodawanie repozytorium',
      'dialog_custom_repositories.category': 'Kategoria',
      'dialog_custom_repositories.no_category': 'Brak kategorii',
      'dialog_custom_repositories.no_repository': 'Brak repozytorium',
      'dialog_custom_repositories.title': 'Niestandardowe repozytoria',
      'dialog_custom_repositories.url_placeholder':
        'Adres URL niestandardowego repozytorium',
      'dialog_download.lovelace_instruction':
        'Po zakończeniu pobierania, ponieważ nie używasz Lovelace w trybie przechowywania, musisz ręcznie dodać zasób z tymi ustawieniami:',
      'dialog_download.note_downloaded':
        'Po pobraniu będzie on znajdował się w {location}',
      'dialog_download.restart':
        'Pamiętaj, że musisz ponownie uruchomić Home Assistanta by zastosować zmiany w integracjach (custom_components).',
      'dialog_download.select_version': 'Wybierz wersję',
      'dialog_download.show_beta': 'Pokaż wersje beta',
      'dialog_download.type': 'Typ',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Autor',
      'dialog_info.download': 'Pobierz to repozytorium z VAIS',
      'dialog_info.downloads': 'Ilość pobrań',
      'dialog_info.loading': 'Pobieranie informacji...',
      'dialog_info.no_info':
        'Deweloper nie dostarczył więcej informacji na temat tego repozytorium',
      'dialog_info.open_issues': 'Problemy',
      'dialog_info.open_repo': 'Otwórz repozytorium',
      'dialog_info.stars': 'Gwiazdki',
      'dialog_info.version_installed': 'Pobrano wersję',
      'dialog_removed.link': 'Link zewnętrzny do dodatkowych informacji',
      'dialog_removed.name': 'Nazwa repozytorium',
      'dialog_removed.reason': 'Powód usunięcia',
      'dialog_removed.type': 'Rodzaj usunięcia',
      'dialog_update.available_version': 'Dostępna wersja',
      'dialog_update.changelog': 'Lista zmian',
      'dialog_update.downloaded_version': 'Pobrana wersja',
      'dialog_update.message': 'Dostępna jest nowa wersja {name}',
      'dialog_update.no_info':
        'Autor nie podał żadnych informacji dotyczących tego wydania',
      'dialog_update.releasenotes': 'Informacje o {release}',
      'dialog_update.title': 'Dostępna aktualizacja',
      'entry.information': 'Informacje',
      'entry.intro':
        'Aktualizacje i ważne komunikaty będą wyświetlane w tym miejscu',
      'entry.messages.disabled.constrains.description':
        'Twoje środowisko nie jest kompatybilne z VAIS, sprawdź log, aby uzyskać więcej informacji.',
      'entry.messages.disabled.constrains.title': 'Ograniczenia',
      'entry.messages.disabled.content':
        'Sprawdź log, aby uzyskać więcej informacji',
      'entry.messages.disabled.invalid_token.description':
        'Skonfiguruj ponownie VAIS i uruchom ponownie Home Assistanta.',
      'entry.messages.disabled.invalid_token.title': 'Nieprawidłowy token',
      'entry.messages.disabled.load_vais.description':
        'Sprawdź log, aby uzyskać więcej informacji',
      'entry.messages.disabled.load_vais.title': 'Nie można załadować VAIS',
      'entry.messages.disabled.rate_limit.description':
        'Zapytania do API GitHub są limitowane, to zostanie usunięte w czasie krótszym niż godzina.',
      'entry.messages.disabled.rate_limit.title': 'Limit',
      'entry.messages.disabled.removed.description':
        'VAIS został usunięty, uruchom ponownie Home Assistanta.',
      'entry.messages.disabled.removed.title': 'Usunięto',
      'entry.messages.disabled.restore.description':
        'Sprawdź log, aby uzyskać więcej informacji',
      'entry.messages.disabled.restore.title':
        'Przywrócenie VAIS nie powiodło się',
      'entry.messages.disabled.title': 'VAIS jest wyłączony',
      'entry.messages.has_pending_tasks.content':
        'Dopóki nie zostaną zakończone, niektóre repozytoria mogą nie być wyświetlane',
      'entry.messages.has_pending_tasks.title': 'Wykonywane są zadania w tle',
      'entry.messages.removed_repository':
        "Usunięto repozytorium ''{repository}''",
      'entry.messages.resources.content':
        'Elementy Lovelace, które nie zostały poprawnie załadowane: {number}',
      'entry.messages.resources.title': 'Nie załadowano w Lovelace',
      'entry.messages.restart.content':
        'Na ponowne uruchomienie Home Assistanta oczekuje: {number} {pluralWording} Możesz uruchomić ponownie Home Assistanta w sekcji Konfiguracja -> Kontrola serwera.',
      'entry.messages.restart.title': 'Oczekiwanie na restart',
      'entry.messages.setup.content':
        'VAIS jest konfigurowany, w tym czasie może brakować niektórych informacji lub są one nieprawidłowe',
      'entry.messages.setup.title': 'VAIS jest konfigurowany',
      'entry.messages.startup.content':
        'VAIS uruchamia się, w tym czasie może brakować pewnych informacji lub mogą one być nieprawidłowe.',
      'entry.messages.startup.title': 'VAIS uruchamia się',
      'entry.messages.waiting.content':
        'VAIS czeka na zakończenie uruchamiania Home Assistanta przed rozpoczęciem własnych zadań',
      'entry.messages.waiting.title': 'VAIS czeka',
      'entry.messages.wrong_frontend_installed.content':
        'Masz zainstalowany interfejs VAIS w wersji {running}, a wersja {expected} była oczekiwana. Komunikat ten oznacza, że Home Assistant nie mógł zainstalować nowej wersji interfejsu VAIS, spróbuj ponownie uruchomić Home Assistanta.',
      'entry.messages.wrong_frontend_installed.title':
        'Nieoczekiwana wersja interfejsu',
      'entry.messages.wrong_frontend_loaded.content':
        'Używasz wersji {running} interfejsu VAIS, a wersja {expected} była oczekiwana, powinieneś wyczyścić pamięć podręczną przeglądarki.',
      'entry.messages.wrong_frontend_loaded.title':
        'Nieoczekiwana wersja interfejsu',
      'entry.pending_updates': 'Oczekujące aktualizacje',
      'menu.about': 'O VAIS',
      'menu.clear': 'Wyczyść oznaczenia nowych',
      'menu.custom_repositories': 'Niestandardowe repozytoria',
      'menu.dismiss': 'Odrzuć nowe repozytoria',
      'menu.documentation': 'Dokumentacja',
      'menu.open_issue': 'Powiadom o problemie',
      'menu.reload': 'Załaduj ponownie okno',
      'options.abort.not_setup': 'VAIS nie jest skonfigurowany',
      'options.abort.release_limit_value':
        'Limit wydań musi wynosić od 1 do 100',
      'options.step.user.data.appdaemon':
        'Włącz wykrywanie i śledzenie aplikacji AppDaemon',
      'options.step.user.data.country': 'Filtruj według kodu kraju',
      'options.step.user.data.debug': 'Włącz debugowanie.',
      'options.step.user.data.experimental': 'Włącz funkcje eksperymentalne',
      'options.step.user.data.netdaemon':
        'Włącz wykrywanie i śledzenie aplikacji NetDaemon',
      'options.step.user.data.not_in_use': 'Nieużywany z YAML',
      'options.step.user.data.release_limit': 'Liczba wydań do wyświetlenia',
      'options.step.user.data.sidepanel_icon': 'Ikona w panelu bocznym',
      'options.step.user.data.sidepanel_title': 'Tytuł w panelu bocznym',
      'repository_card.dismiss': 'odrzuć',
      'repository_card.information': 'Informacje',
      'repository_card.new_repository': 'Nowe repozytorium',
      'repository_card.not_loaded': 'Nie załadowano',
      'repository_card.open_issue': 'Powiadom o problemie',
      'repository_card.open_source': 'Otwórz kod źródłowy',
      'repository_card.pending_restart': 'Oczekiwanie na restart',
      'repository_card.pending_update': 'Oczekująca aktualizacja',
      'repository_card.redownload': 'Pobierz ponownie',
      'repository_card.report': 'Zgłoś do usunięcia',
      'repository_card.update_information': 'Uaktualnij dane',
      'search.downloaded': 'Wyszukaj pobrane repozytoria',
      'search.downloaded_new': 'Wyszukaj pobrane lub nowe repozytoria',
      'search.placeholder': 'Wyszukaj repozytorium',
      'sections.about.description': 'Informacje o VAIS',
      'sections.about.title': 'O VAIS',
      'sections.addon.description':
        'W VAIS nie ma dodatków, ale możesz kliknąć tutaj, aby przejść do Supervisora',
      'sections.addon.title': 'Dodatki',
      'sections.automation.description':
        'Skrypty Pythona, aplikacje AppDaemon i NetDaemon',
      'sections.automation.title': 'Automatyzacje',
      'sections.frontend.description':
        'Motywy, niestandardowe karty i inne elementy interfejsu użytkownika',
      'sections.frontend.title': 'Interfejs użytkownika',
      'sections.integrations.description':
        'Niestandardowe integracje (custom_components)',
      'sections.integrations.title': 'Integracje',
      'sections.pending_repository_upgrade':
        'Używasz wersji {downloaded}, wersja {available} jest dostępna',
      'store.explore': 'Przeglądaj i pobieraj repozytoria',
      'store.new_repositories_note': 'Pojawiło się kilka nowych repozytoriów',
      'store.no_repositories': 'Brak repozytoriów',
      'store.no_repositories_desc1':
        'Wygląda na to, że nie masz jeszcze zainstalowanych żadnych repozytoriów w tej sekcji.',
      'store.no_repositories_desc2':
        'Kliknij + w dolnym rogu, aby dodać pierwsze!',
      'store.no_repositories_found_desc1':
        'W tej sekcji nie znaleziono zainstalowanych repozytoriów pasujących do "{searchInput}".',
      'store.no_repositories_found_desc2': 'Spróbuj wyszukać czegoś innego!',
    },
    pt_BR: {
      'common.add': 'adicionar',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Cancelar',
      'common.close': 'Fechar',
      'common.download': 'Baixar',
      'common.ignore': 'Ignorar',
      'common.integration': 'Integração',
      'common.integration_plural': 'Integrações',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'navegar',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Script Python',
      'common.reload': 'Recarregar',
      'common.remove': 'Remover',
      'common.repositories': 'Repositórios',
      'common.repository': 'Repositório',
      'common.show': 'Mostrar',
      'common.theme': 'Tema',
      'common.update': 'Atualizar',
      'common.updates': 'Atualizações',
      'common.yes': 'Sim',
      'confirm.home_assistant_version_not_correct':
        "Você está executando a versão Home Assistant ''{haversion}'', mas este repositório requer que a versão mínima ''{minversion}'' esteja instalada.",
      'dialog.configured.confirm': 'Vá para integrações',
      'dialog.configured.message':
        'A integração {name} está configurada ou ignorada, você precisa excluir a configuração dela antes de removê-la do VAIS',
      'dialog.configured.title': 'A integração está configurada',
      'dialog.reload.confirm': 'Você quer fazer isso agora?',
      'dialog.reload.description':
        'Você precisa recarregar seu navegador para que os recursos atualizados sejam usados.',
      'dialog.remove.message': 'Você realmente quer remover o {name}?',
      'dialog.remove.title': 'Remover',
      'dialog_about.downloaded_repositories': 'Repositórios baixados',
      'dialog_about.frontend_version': 'Versão do frontend',
      'dialog_about.integration_version': 'Versão da integração',
      'dialog_about.useful_links': 'Links úteis',
      'dialog_add_repo.limit':
        'Apenas os 100 primeiros repositórios são mostrados, use a pesquisa para filtrar o que você precisa',
      'dialog_add_repo.no_match':
        'Nenhum repositório encontrado correspondente ao seu filtro',
      'dialog_add_repo.sort_by': 'Ordenar por',
      'dialog_add_repo.sort_by_values.last_updated': 'Ultima atualização',
      'dialog_add_repo.sort_by_values.name': 'Nome',
      'dialog_add_repo.sort_by_values.stars': 'Estrelas',
      'dialog_add_repo.title': 'Novo repositório',
      'dialog_custom_repositories.category': 'Categoria',
      'dialog_custom_repositories.no_category': 'Categoria ausente',
      'dialog_custom_repositories.no_repository': 'Repositório ausente',
      'dialog_custom_repositories.title': 'Repositórios personalizados',
      'dialog_custom_repositories.url_placeholder':
        'Adicionar URL de repositório personalizado',
      'dialog_download.lovelace_instruction':
        'Após o download ser concluído, já que você não está usando o Lovelace no modo de armazenamento, você precisa adicionar manualmente o recurso com essas configurações:',
      'dialog_download.note_downloaded':
        'Quando baixado, ele estará localizado em {location}',
      'dialog_download.restart':
        'Lembre-se de que você precisa reiniciar o Home Assistant antes que as alterações nas integrações (custom_components) sejam aplicadas.',
      'dialog_download.select_version': 'Selecione a versão',
      'dialog_download.show_beta': 'Mostrar versões beta',
      'dialog_download.type': 'Tipo',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Autor',
      'dialog_info.download': 'Baixe esse repositório no VAIS',
      'dialog_info.downloads': 'Downloads',
      'dialog_info.loading': 'Carregando informações...',
      'dialog_info.no_info':
        'O desenvolvedor não forneceu mais informações para este repositório',
      'dialog_info.open_issues': 'Problemas em aberto',
      'dialog_info.open_repo': 'Abrir repositório',
      'dialog_info.stars': 'Estrelas',
      'dialog_info.version_installed': 'Versão baixada',
      'dialog_removed.link': 'Link externo para mais informações',
      'dialog_removed.name': 'Nome do Repositório',
      'dialog_removed.reason': 'Motivo da remoção',
      'dialog_removed.type': 'Tipo da Remoção',
      'dialog_update.available_version': 'Versão disponível',
      'dialog_update.changelog': 'Registro de mudanças',
      'dialog_update.downloaded_version': 'Versão para download',
      'dialog_update.message': 'Uma nova versão do {name} está disponível',
      'dialog_update.no_info':
        'O autor não forneceu nenhuma informação para esta versão',
      'dialog_update.releasenotes': 'Notas de lançamento para {release}',
      'dialog_update.title': 'Atualização pendente',
      'entry.information': 'Informações',
      'entry.intro':
        'Atualizações e mensagens importantes serão mostradas aqui, quando necessário',
      'entry.messages.disabled.constrains.description':
        'Seu ambiente não é compatível para executar o VAIS, verifique seu arquivo de log para obter mais detalhes.',
      'entry.messages.disabled.constrains.title': 'Restrições',
      'entry.messages.disabled.content':
        'Verifique seu arquivo de log para mais detalhes.',
      'entry.messages.disabled.invalid_token.description':
        'Reconfigure o VAIS e reinicie o Home Assistant.',
      'entry.messages.disabled.invalid_token.title': 'Token inválido',
      'entry.messages.disabled.load_vais.description':
        'Verifique seu arquivo de log para obter mais detalhes',
      'entry.messages.disabled.load_vais.title': 'VAIS não pôde carregar',
      'entry.messages.disabled.rate_limit.description':
        'As chamadas da API do GitHub são limitadas por taxa, isso será limpo em menos de 1 hora.',
      'entry.messages.disabled.rate_limit.title': 'Taxa limitada',
      'entry.messages.disabled.removed.description':
        'VAIS foi removido, reinicie o Home Assistant.',
      'entry.messages.disabled.removed.title': 'Removido',
      'entry.messages.disabled.restore.description':
        'Verifique seu arquivo de log para obter mais detalhes',
      'entry.messages.disabled.restore.title': 'A restauração do VAIS falhou',
      'entry.messages.disabled.title': 'O VAIS está desativado',
      'entry.messages.has_pending_tasks.content':
        'Alguns repositórios podem não aparecer até que isso seja concluído',
      'entry.messages.has_pending_tasks.title':
        'Tarefas em segundo plano pendentes',
      'entry.messages.removed_repository':
        "Repositório ''{repository}'' removido",
      'entry.messages.resources.content':
        'Existem {number} elementos do Lovelace que não estão carregados corretamente no Lovelace.',
      'entry.messages.resources.title': 'Não carregado no Lovelace',
      'entry.messages.restart.content':
        "Existem {number} {pluralWording} integrações que requerem o reinício do Home Assistant. Você pode fazer isso na seção 'Controles do Servidor' na parte de configuração do Home Assistant UI.",
      'entry.messages.restart.title': 'Reinicialização pendente',
      'entry.messages.setup.content':
        'O VAIS está sendo configurado, durante esse período, algumas informações podem estar ausentes ou incorretas',
      'entry.messages.setup.title': 'VAIS está se configurando',
      'entry.messages.startup.content':
        'O VAIS está sendo iniciado, durante esse período algumas informações podem estar ausentes ou incorretas',
      'entry.messages.startup.title': 'O VAIS está iniciando',
      'entry.messages.waiting.content':
        'O VAIS está esperando que o Home Assistant termine a inicialização antes de iniciar as tarefas de inicialização',
      'entry.messages.waiting.title': 'VAIS está esperando',
      'entry.messages.wrong_frontend_installed.content':
        'Você tem {running} do frontend VAIS instalado, mas a versão {expected} era esperada, se você vir esta mensagem o Home Assistant não pôde instalar a nova versão, tente reiniciar o Home Assistant.',
      'entry.messages.wrong_frontend_installed.title':
        'Versão de front-end inesperada',
      'entry.messages.wrong_frontend_loaded.content':
        'Você está executando a versão {running} do frontend VAIS, mas a versão {expected} era esperada. Por favor limpe o cache do seu navegador.',
      'entry.messages.wrong_frontend_loaded.title':
        'Versão frontend inesperada',
      'entry.pending_updates': 'Atualizações pendentes',
      'menu.about': 'Sobre o VAIS',
      'menu.clear': 'Limpar todos os novos',
      'menu.custom_repositories': 'Repositórios personalizados',
      'menu.dismiss': 'Limpar todos os novos repositórios',
      'menu.documentation': 'Documentação',
      'menu.open_issue': 'Relatar problema',
      'menu.reload': 'Recarregar janela',
      'options.abort.not_setup': 'O VAIS não está configurado.',
      'options.abort.release_limit_value':
        'O limite de liberação precisa estar entre 1 e 100',
      'options.step.user.data.appdaemon':
        'Habilitar AppDaemon apps descoberta & rastreamento',
      'options.step.user.data.country': 'Filtrar pelo código do país.',
      'options.step.user.data.debug': 'Ative a depuração.',
      'options.step.user.data.experimental': 'Ativar recursos experimentais',
      'options.step.user.data.netdaemon':
        'Habilitar NetDaemon apps descoberta & rastreamento',
      'options.step.user.data.not_in_use': 'Não está em uso com o YAML',
      'options.step.user.data.release_limit':
        'Número de lançamentos a serem exibidos.',
      'options.step.user.data.sidepanel_icon': 'Icone do painel lateral',
      'options.step.user.data.sidepanel_title': 'Titulo do painel lateral',
      'repository_card.dismiss': 'Dispensar',
      'repository_card.information': 'Informações',
      'repository_card.new_repository': 'Novo repositório',
      'repository_card.not_loaded': 'Não carregado',
      'repository_card.open_issue': 'Relatar problema',
      'repository_card.open_source': 'Código aberto',
      'repository_card.pending_restart': 'Reinicialização pendente',
      'repository_card.pending_update': 'Atualização pendente',
      'repository_card.redownload': 'Baixar novamente',
      'repository_card.report': 'Denunciar para remoção',
      'repository_card.update_information': 'Atualizar informações',
      'search.downloaded': 'Pesquisar repositórios baixados',
      'search.downloaded_new': 'Pesquisar por repositórios baixados ou novos',
      'search.placeholder': 'Procurar repositório',
      'sections.about.description': 'Exibir informações sobre o VAIS',
      'sections.about.title': 'Sobre',
      'sections.addon.description':
        'Não há add-ons no VAIS, mas você pode clicar aqui para chegar ao supervisor',
      'sections.addon.title': 'Add-ons',
      'sections.automation.description':
        'É aqui que você encontra python_scripts, aplicativos AppDaemon e aplicativos NetDaemon',
      'sections.automation.title': 'Automação',
      'sections.frontend.description':
        'É aqui que você encontra temas, cartões personalizados e outros elementos para a lovelace',
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'É aqui que você encontra integrações personalizadas (custom_components)',
      'sections.integrations.title': 'Integrações',
      'sections.pending_repository_upgrade':
        'Você está executando a versão {downloaded}, a versão {available} está disponível',
      'store.explore': 'Explorar e baixar repositórios',
      'store.new_repositories_note':
        'Há alguns novos repositórios sendo exibidos aqui',
      'store.no_repositories': 'Nenhum repositório',
      'store.no_repositories_desc1':
        'Parece que você ainda não tem nenhum repositório instalado nesta seção.',
      'store.no_repositories_desc2':
        'Clique no + no canto inferior para adicionar o seu primeiro repositório!',
      'store.no_repositories_found_desc1':
        'Nenhum repositório instalado foi encontrado que corresponda a "{searchInput}" nesta seção.',
      'store.no_repositories_found_desc2': 'Tente procurar por outra coisa!',
    },
    pt: {
      'common.add': 'adicionar',
      'common.cancel': 'Cancelar',
      'common.close': 'Fechar',
      'common.download': 'Descarregar',
      'common.ignore': 'Ignorar',
      'common.integration': 'Integração',
      'common.integration_plural': 'Integrações',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'navegue',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Script Python',
      'common.reload': 'Recarregar',
      'common.remove': 'Remover',
      'common.repositories': 'Repositórios',
      'common.repository': 'Repositório',
      'common.theme': 'Tema',
      'common.update': 'Atualizar',
      'common.yes': 'Sim',
      'confirm.home_assistant_version_not_correct':
        "Está a executar a versão ''{haversion}'' do Home Assistant, mas este repositório requer a versão mínima ''{minversion}'' para ser instalado.",
      'dialog.configured.confirm': 'Ir para integrações',
      'dialog.configured.message':
        'A integração {name} é configurada ou ignorada, é necessário apagar a configuração para a mesma antes de a remover do VAIS',
      'dialog.configured.title': 'A integração está configurada',
      'dialog.reload.confirm': 'Quer fazer isso agora?',
      'dialog.reload.description':
        'É necessário recarregar o seu navegador para que os recursos actualizados possam ser utilizados.',
      'dialog.remove.message': 'Quer mesmo remover o {name}?',
      'dialog.remove.title': 'Remover',
      'dialog_about.downloaded_repositories': 'Repositórios descarregados',
      'dialog_about.frontend_version': 'Versão Frontend',
      'dialog_about.integration_version': 'Versão de integração',
      'dialog_about.useful_links': 'Links úteis',
      'dialog_add_repo.limit':
        'Apenas os 100 primeiros repositórios serão mostrados, use a pesquisa para filtrar o que precisa',
      'dialog_add_repo.no_match':
        'Não foram encontrados repositórios que correspondam ao filtro',
      'dialog_add_repo.sort_by': 'Ordenar por',
      'dialog_add_repo.sort_by_values.last_updated': 'Última actualização',
      'dialog_add_repo.sort_by_values.name': 'Nome',
      'dialog_add_repo.sort_by_values.stars': 'Estrelas',
      'dialog_add_repo.title': 'Adicionar repositório',
      'dialog_custom_repositories.category': 'Categoria',
      'dialog_custom_repositories.no_category': 'Categoria em falta',
      'dialog_custom_repositories.no_repository': 'Repositório em falta',
      'dialog_custom_repositories.title': 'Repositórios personalizados',
      'dialog_custom_repositories.url_placeholder':
        'Adicionar URL do repositório personalizado',
      'dialog_download.restart':
        'Lembre-se de que precisa de reiniciar o Home Assistant antes de serem aplicadas alterações às integrações (custom_components).',
      'dialog_download.select_version': 'Seleccione a versão',
      'dialog_download.show_beta': 'Mostrar versões beta',
      'dialog_download.type': 'Tipo',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Autor',
      'dialog_info.download': 'Descarregar este repositório com VAIS',
      'dialog_info.downloads': 'Transferências',
      'dialog_info.loading': 'A carregar informações...',
      'dialog_info.no_info':
        'O developer não forneceu mais informações sobre este repositório',
      'dialog_info.open_issues': 'Questões em aberto',
      'dialog_info.open_repo': 'Abrir Repositório',
      'dialog_info.stars': 'Estrelas',
      'dialog_info.version_installed': 'Versão descarregada',
      'dialog_removed.link': 'Link externo para mais informações',
      'dialog_removed.name': 'Nome do repositório',
      'dialog_removed.reason': 'Motivo de remoção',
      'dialog_removed.type': 'Tipo de remoção',
      'dialog_update.available_version': 'Versão disponível',
      'dialog_update.changelog': 'Changelog',
      'dialog_update.downloaded_version': 'Versão descarregada',
      'dialog_update.message': 'Está disponível uma nova versão do {name}.',
      'dialog_update.no_info':
        'O autor não forneceu qualquer informação para este comunicado',
      'dialog_update.releasenotes': 'Notas de lançamento para {release}',
      'dialog_update.title': 'Atualização pendente',
      'entry.information': 'Informações',
      'entry.intro':
        'Atualizações e mensagens importantes serão mostradas aqui',
      'entry.messages.disabled.constrains.description':
        'Seu ambiente não é compatível para executar VAIS, verifique seu arquivo de registro para obter mais detalhes.',
      'entry.messages.disabled.constrains.title': 'Restrições',
      'entry.messages.disabled.content':
        'Verifique o seu ficheiro de log para obter mais detalhes',
      'entry.messages.disabled.invalid_token.description':
        'Reconfigurar o VAIS e reiniciar o Home Assistant.',
      'entry.messages.disabled.invalid_token.title': 'Token inválido',
      'entry.messages.disabled.load_vais.description':
        'Verifique o seu ficheiro de registo para mais detalhes',
      'entry.messages.disabled.load_vais.title': 'VAIS não podia carregar',
      'entry.messages.disabled.rate_limit.description':
        'As chamadas API do GitHub são limitadas, o que será resolvido em menos de 1 hora.',
      'entry.messages.disabled.rate_limit.title': 'Ratelimited',
      'entry.messages.disabled.removed.description':
        'VAIS é removido, reinicie Home Assistant.',
      'entry.messages.disabled.removed.title': 'Removido',
      'entry.messages.disabled.restore.description':
        'Verifique o seu ficheiro de registo para mais detalhes',
      'entry.messages.disabled.restore.title': 'A restauração do VAIS falhou',
      'entry.messages.disabled.title': 'VAIS está desativado',
      'entry.messages.has_pending_tasks.content':
        'Alguns repositórios podem não aparecer até que isso seja concluído',
      'entry.messages.has_pending_tasks.title':
        'Tarefas em segundo plano pendentes',
      'entry.messages.removed_repository':
        "Removido o repositório ''{repositório}''.",
      'entry.messages.resources.content':
        'Tem {number} elementos que não são carregados corretamente em Lovelace.',
      'entry.messages.resources.title': 'Não carregado em Lovelace',
      'entry.messages.restart.content':
        "Tem {number} integrações que exigem uma reinicialização do Home Assistant, pode fazer isso a partir da secção 'Controlo do Servidor' na parte de configuração do Home Assistant.",
      'entry.messages.restart.title': 'Reinicialização pendente',
      'entry.messages.setup.content':
        'A VAIS está a criar, durante este tempo pode faltar ou estar incorrecta alguma informação',
      'entry.messages.setup.title': 'VAIS está a estabelecer-se',
      'entry.messages.startup.content':
        'O VAIS está a iniciar. Durante este tempo, algumas informações podem estar ausentes ou incorretas',
      'entry.messages.startup.title': 'O VAIS está a iniciar',
      'entry.messages.waiting.content':
        'VAIS está à espera que o Home Assistant termine as tarefas de arranque antes de iniciar as tarefas de arranque',
      'entry.messages.waiting.title': 'VAIS está à espera',
      'entry.messages.wrong_frontend_installed.content':
        'Tem instalado o {running} do frontend VAIS, mas a versão {expected} era esperada, se vir que esta mensagem Home Assistant não foi capaz de instalar a nova versão, tente reiniciar o Home Assistant.',
      'entry.messages.wrong_frontend_installed.title':
        'Versão inesperada do frontend',
      'entry.messages.wrong_frontend_loaded.content':
        'Está a executar a versão {running} do frontend VAIS, mas a versão {expected} é a mais atualizada, deve limpar a cache do seu browser.',
      'entry.messages.wrong_frontend_loaded.title':
        'Versão do frontend inesperada',
      'entry.pending_updates': 'Atualizações pendentes',
      'menu.about': 'Sobre o VAIS',
      'menu.clear': 'Limpar todos os recentes',
      'menu.custom_repositories': 'Repositórios personalizados',
      'menu.dismiss': 'Dispensar todos os novos repositórios.',
      'menu.documentation': 'Documentação',
      'menu.open_issue': 'Questão em aberto',
      'menu.reload': 'Recarregar janela',
      'options.abort.not_setup': 'VAIS não está configurado.',
      'options.abort.release_limit_value':
        'O limite de libertação tem de estar entre 1 e 100',
      'options.step.user.data.appdaemon':
        'Ativar a localização e o seguimento de aplicações AppDaemon',
      'options.step.user.data.country': 'Filtrar com o código do país.',
      'options.step.user.data.debug': 'Ativar depuração.',
      'options.step.user.data.experimental': 'Ativar recursos experimentais',
      'options.step.user.data.netdaemon':
        'Ativar a localização e o seguimento de aplicações NetDaemon',
      'options.step.user.data.not_in_use': 'Não está a ser usado com YAML',
      'options.step.user.data.release_limit':
        'Número de lançamentos a mostrar.',
      'options.step.user.data.sidepanel_icon': 'Ícone no painel lateral',
      'options.step.user.data.sidepanel_title': 'Título no painel lateral',
      'repository_card.dismiss': 'dispensar',
      'repository_card.information': 'Informações',
      'repository_card.new_repository': 'Novo repositório',
      'repository_card.not_loaded': 'Não carregado',
      'repository_card.open_issue': 'Questão em aberto',
      'repository_card.open_source': 'Código aberto',
      'repository_card.pending_restart': 'Reinicialização pendente',
      'repository_card.pending_update': 'Atualização pendente',
      'repository_card.redownload': 'Redownload',
      'repository_card.report': 'Motivo para remover',
      'repository_card.update_information': 'Atualizar informações',
      'search.downloaded': 'Pesquisa de repositórios descarregados',
      'search.downloaded_new':
        'Pesquisa de repositórios descarregados ou novos',
      'search.placeholder': 'Procurar repositório',
      'sections.about.description': 'Mostrar informações sobre o VAIS',
      'sections.about.title': 'Sobre',
      'sections.addon.description':
        'Não existem suplementos no VAIS, mas pode clicar aqui para chegar ao supervisor',
      'sections.addon.title': 'Complementos',
      'sections.automation.description':
        'Aqui encontra os python_scripts, aplicações AppDaemon e NetDaemon',
      'sections.automation.title': 'Automação',
      'sections.frontend.description':
        'Aqui encontra os temas, cartões personalizados e outros elementos para o lovelace',
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'Aqui encontra as integrações personalizadas (custom_components)',
      'sections.integrations.title': 'Integrações',
      'sections.pending_repository_upgrade':
        'Está a executar a versão {downloaded} , mas a versão {available} já está disponível.',
      'store.explore': 'Explorar e descarregar repositórios',
      'store.new_repositories_note':
        'Há aqui alguns novos repositórios em exibição',
      'store.no_repositories': 'Sem repositórios',
      'store.no_repositories_desc1':
        'Parece que ainda não possui nenhum repositório instalado nesta secção.',
      'store.no_repositories_desc2':
        'Clique no "+", no canto inferior para adicionar o seu primeiro!',
      'store.no_repositories_found_desc1':
        'Nenhum repositório transferido que corresponda a "{searchInput}" encontrado nesta secção.',
      'store.no_repositories_found_desc2': 'Tente procurar outra coisa!',
    },
    ro: {
      'common.appdaemon': 'AppDaemon',
      'common.close': 'Închide',
      'common.integration': 'Integrare',
      'common.navigate': 'navighează',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Plugin',
      'common.remove': 'Șterge',
      'common.repositories': 'Depozite',
      'common.theme': 'Temă',
      'common.yes': 'Da',
      'dialog.remove.title': 'Șterge',
      'dialog_add_repo.sort_by_values.last_updated': 'Ultima actualizare',
      'dialog_add_repo.sort_by_values.name': 'Nume',
      'dialog_add_repo.sort_by_values.stars': 'Stele',
      'dialog_download.select_version': 'Selectați versiunea',
      'dialog_download.show_beta': 'Afișează versiunile beta',
      'dialog_download.type': 'Tip',
      'dialog_download.url': 'URL',
      'dialog_update.downloaded_version': 'Versiunea descărcată',
      'options.step.user.data.appdaemon':
        'Activați descoperirea și urmărirea aplicațiilor AppDaemon',
      'options.step.user.data.country': 'Filtrează cu codul țării.',
      'options.step.user.data.debug': 'Activează depanarea.',
      'options.step.user.data.experimental': 'Activați funcțiile experimentale',
      'options.step.user.data.netdaemon':
        'Activați descoperirea și urmărirea aplicațiilor NetDaemon',
      'options.step.user.data.not_in_use': 'Nu este utilizat cu YAML',
      'options.step.user.data.release_limit': 'Număr de versiuni afișate.',
      'options.step.user.data.sidepanel_icon': 'Pictogramă Panou lateral',
      'options.step.user.data.sidepanel_title': 'Titlu panou lateral',
    },
    ru: {
      'common.add': 'добавить',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': 'Отмена',
      'common.close': 'Закрыть',
      'common.download': 'Скачать',
      'common.ignore': 'Игнорировать',
      'common.integration': 'Интеграция',
      'common.integration_plural': 'Интеграции',
      'common.lovelace': 'Lovelace',
      'common.navigate': 'перейти',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Скрипт Python',
      'common.reload': 'Перезагрузить',
      'common.remove': 'Удалить',
      'common.repositories': 'Репозитории',
      'common.repository': 'Репозиторий',
      'common.theme': 'Тема',
      'common.update': 'Обновить',
      'common.updates': 'Обновления',
      'common.yes': 'Да',
      'confirm.home_assistant_version_not_correct':
        "Вы используете Home Assistant версии ''{haversion}'', но данный репозиторий требует минимальную установленную версию ''{minversion}''.",
      'dialog.configured.confirm': 'Перейти к интеграциям',
      'dialog.configured.message':
        'Интеграция {name} настроена или игнорируется, необходимо удалить конфигурацию для нее, прежде чем удалять ее из VAIS',
      'dialog.configured.title': 'Интеграция настроена',
      'dialog.reload.confirm': 'Вы хотите сделать это сейчас?',
      'dialog.reload.description':
        'Вам необходимо перезагрузить браузер, чтобы использовать обновленные ресурсы.',
      'dialog.remove.message': 'Вы уверены, что хотите удалить {name}?',
      'dialog.remove.title': 'Удалить',
      'dialog_about.downloaded_repositories': 'Загруженные репозитории',
      'dialog_about.frontend_version': 'Версия интерфейса',
      'dialog_about.integration_version': 'Версия интеграции',
      'dialog_about.useful_links': 'Полезные ссылки',
      'dialog_add_repo.limit':
        'Показаны только первые 100 репозиториев, используйте поиск для фильтрации того, что вам нужно',
      'dialog_add_repo.no_match':
        'Не найдено репозиторий, соответствующих фильтру',
      'dialog_add_repo.sort_by': 'Сортировать по',
      'dialog_add_repo.sort_by_values.last_updated': 'Последнее обновление',
      'dialog_add_repo.sort_by_values.name': 'Название',
      'dialog_add_repo.sort_by_values.stars': 'Звёзды',
      'dialog_add_repo.title': 'Новый репозиторий',
      'dialog_custom_repositories.category': 'Категория',
      'dialog_custom_repositories.no_category': 'Категория не указана',
      'dialog_custom_repositories.no_repository': 'Репозиторий не указан',
      'dialog_custom_repositories.title': 'Пользовательские репозитории',
      'dialog_custom_repositories.url_placeholder':
        'Добавить пользовательский URL-адрес репозитория',
      'dialog_download.note_downloaded':
        'После скачивания файлы будут расположены в {location}',
      'dialog_download.restart':
        'Помните, что вам нужно перезапустить Home Assistant, прежде чем будут применены изменения в интеграциях (custom_components).',
      'dialog_download.select_version': 'Выберите версию',
      'dialog_download.show_beta': 'Показывать бета-версии',
      'dialog_download.type': 'Тип',
      'dialog_download.url': 'URL',
      'dialog_info.author': 'Автор',
      'dialog_info.download': 'Загрузите этот репозиторий с помощью VAIS',
      'dialog_info.downloads': 'Загрузки',
      'dialog_info.loading': 'Загрузка информации...',
      'dialog_info.no_info':
        'Разработчик не предоставил никакой дополнительной информации для этого репозитория',
      'dialog_info.open_issues': 'Открытые вопросы',
      'dialog_info.open_repo': 'Открыть репозиторий',
      'dialog_info.stars': 'Звёзды',
      'dialog_info.version_installed': 'Версия загружена',
      'dialog_removed.link':
        'Внешняя ссылка для получения дополнительной информации',
      'dialog_removed.name': 'Имя репозитория',
      'dialog_removed.reason': 'Причина удаления',
      'dialog_removed.type': 'Тип удаления',
      'dialog_update.available_version': 'Доступная версия',
      'dialog_update.changelog': 'Изменения',
      'dialog_update.downloaded_version': 'Загруженная версия',
      'dialog_update.message': 'Доступна новая версия {name}',
      'dialog_update.no_info':
        'Автор не предоставил никакой информации для этого выпуска',
      'dialog_update.releasenotes': 'Примечания к выпуску для {release}',
      'dialog_update.title': 'Обновление в ожидании',
      'entry.information': 'Информация',
      'entry.intro':
        'Обновления и важные сообщения будут отображаться здесь, если таковые имеются',
      'entry.messages.disabled.constrains.description':
        'Ваша среда несовместима с работой VAIS, проверьте файл журнала для получения подробной информации.',
      'entry.messages.disabled.constrains.title': 'Ограничения',
      'entry.messages.disabled.content':
        'Проверьте логи для получения более подробной информации.',
      'entry.messages.disabled.invalid_token.description':
        'Перенастройте VAIS и перезапустите Home Assistant.',
      'entry.messages.disabled.invalid_token.title': 'Недействительный токен',
      'entry.messages.disabled.load_vais.description':
        'Проверьте файл журнала для получения подробной информации',
      'entry.messages.disabled.load_vais.title': 'Не удалось загрузить VAIS',
      'entry.messages.disabled.rate_limit.description':
        'Вызовы API GitHub ограничены по периодичности, это будет устранено менее чем за 1 час.',
      'entry.messages.disabled.rate_limit.title': 'Скорость ограничена',
      'entry.messages.disabled.removed.description':
        'VAIS удален, перезапустите Home Assistant.',
      'entry.messages.disabled.removed.title': 'Удалено',
      'entry.messages.disabled.restore.description':
        'Проверьте файл журнала для получения подробной информации',
      'entry.messages.disabled.restore.title': 'Не удалось восстановить VAIS',
      'entry.messages.disabled.title': 'VAIS отключен',
      'entry.messages.has_pending_tasks.content':
        'Некоторые репозитории могут не отображаться до тех пор, пока это не будет завершено',
      'entry.messages.has_pending_tasks.title': 'Выполняются фоновые задачи',
      'entry.messages.removed_repository':
        "Репозиторий ''{repository}'' удален",
      'entry.messages.resources.content':
        'У вас есть {number} элементов Lovelace, которые не загружаются должным образом.',
      'entry.messages.resources.title': 'Не загружено в Lovelace',
      'entry.messages.restart.content':
        "У вас есть {number} интеграций, которые требуют перезагрузки Home Assistant, Вы можете сделать это из раздела 'Сервер' в разделе конфигурации пользовательского интерфейса Home Assistant.",
      'entry.messages.restart.title': 'В ожидании перезапуска',
      'entry.messages.setup.content':
        'VAIS настраивается, в это время некоторая информация может отсутствовать или быть неверной',
      'entry.messages.setup.title': 'VAIS настраивается',
      'entry.messages.startup.content':
        'VAIS запускается, в течение этого времени некоторые сведения могут отсутствовать или быть неверными',
      'entry.messages.startup.title': 'VAIS запускается',
      'entry.messages.waiting.content':
        'VAIS ожидает завершения запуска Home Assistant, прежде чем приступить к выполнению задач запуска',
      'entry.messages.waiting.title': 'VAIS ожидает',
      'entry.messages.wrong_frontend_installed.content':
        'У вас установлена версия {running} интерфейса VAIS, однако ожидаемая версия — {expected}; если вы видите это сообщение, то Home Assistant не смог установить новую версию интерфейса; попробуйте перезапустить Home Assistant',
      'entry.messages.wrong_frontend_installed.title':
        'Неожиданная версия интерфейса',
      'entry.messages.wrong_frontend_loaded.content':
        'Вы используете версию {running} интерфейса VAIS, однако ожидаемая версия — {expected}, попробуйте очистить кеш браузера.',
      'entry.messages.wrong_frontend_loaded.title':
        'Неожиданная версия интерфейса',
      'entry.pending_updates': 'Обновления в ожидании',
      'menu.about': 'О VAIS',
      'menu.clear': 'Очистить все новые репозитории',
      'menu.custom_repositories': 'Пользовательские репозитории',
      'menu.dismiss': 'Убрать все новые',
      'menu.documentation': 'Документация',
      'menu.open_issue': 'Сообщить о проблеме',
      'menu.reload': 'Перезагрузить окно',
      'options.abort.not_setup': 'VAIS не настроен.',
      'options.abort.release_limit_value':
        'Ограничения для релиза должны быть в диапазоне от 1 до 100',
      'options.step.user.data.appdaemon':
        'Включить поиск и отслеживание приложений AppDaemon',
      'options.step.user.data.country': 'Фильтр по стране.',
      'options.step.user.data.debug': 'Включить отладку.',
      'options.step.user.data.experimental': 'Вкл. экспериментальные функции',
      'options.step.user.data.netdaemon':
        'Включить поиск и отслеживание приложений NetDaemon',
      'options.step.user.data.not_in_use': 'Не используется с YAML',
      'options.step.user.data.release_limit': 'Число доступных версий.',
      'options.step.user.data.sidepanel_icon': 'Иконка в боковом меню',
      'options.step.user.data.sidepanel_title': 'Название в боковом меню',
      'repository_card.dismiss': 'убрать',
      'repository_card.information': 'Информация',
      'repository_card.new_repository': 'Новый репозиторий',
      'repository_card.not_loaded': 'Не загружено',
      'repository_card.open_issue': 'Сообщить о проблеме',
      'repository_card.open_source': 'Открыть источник',
      'repository_card.pending_restart': 'В ожидании перезапуска',
      'repository_card.pending_update': 'Ожидается обновление',
      'repository_card.redownload': 'Скачать повторно',
      'repository_card.report': 'Сообщить о нарушении',
      'repository_card.update_information': 'Обновить информацию',
      'search.downloaded': 'Поиск среди скачанных репозиториев',
      'search.downloaded_new': 'Поиск среди скачанных или новых репозиториев',
      'search.placeholder': 'Поиск репозитория',
      'sections.about.description': 'Показать информацию о VAIS',
      'sections.about.title': 'О проекте',
      'sections.addon.description':
        'В VAIS нет дополнений, но вы можете кликнуть здесь, чтобы перейти в панель супервизора',
      'sections.addon.title': 'Дополнения',
      'sections.automation.description':
        'Здесь вы найдете python_scripts, приложения AppDaemon и NetDaemon.',
      'sections.automation.title': 'Автоматизация',
      'sections.frontend.description':
        'Здесь вы найдете темы, пользовательские карточки и другие элементы для Lovelace',
      'sections.frontend.title': 'Пользовательский интерфейс',
      'sections.integrations.description':
        'Здесь вы найдете пользовательские интеграции (custom_components)',
      'sections.integrations.title': 'Интеграции',
      'sections.pending_repository_upgrade':
        'Вы используете версию {downloaded}, доступна версия {available}',
      'store.explore': 'Исследуйте и устанавливайте репозитории',
      'store.new_repositories_note':
        'Здесь показаны некоторые новые репозитории',
      'store.no_repositories': 'Нет репозиториев',
      'store.no_repositories_desc1':
        'Похоже, у вас еще нет репозиториев, установленных в этом разделе.',
      'store.no_repositories_desc2':
        'Нажмите на + в нижнем углу, чтобы добавить первый!',
      'store.no_repositories_found_desc1':
        'В этом разделе не найдено установленных репозиторий, соответствующих "{searchinput}".',
      'store.no_repositories_found_desc2':
        'Попробуйте искать что-нибудь другое!',
    },
    sl: {
      'common.appdaemon': 'AppDaemon',
      'common.integration': 'Integracija',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.repositories': 'Repozitoriji',
      'common.theme': 'Tema',
      'confirm.home_assistant_version_not_correct':
        "Uporabljate Home Assistant verzije ''{haversion}'', vendar to skladišče zahteva nameščeno najmanj različico ''{minversion}''.",
      'options.step.user.data.appdaemon':
        'Omogoči odkrivanje in sledenje aplikacij AppDaemon',
      'options.step.user.data.country': 'Filtrirajte s kodo države.',
      'options.step.user.data.debug': 'Omogoči odpravljanje napak.',
      'options.step.user.data.experimental': 'Omogočite poskusne funkcije',
      'options.step.user.data.netdaemon':
        'Omogoči odkrivanje in sledenje aplikacij NetDaemon',
      'options.step.user.data.not_in_use': 'Ni v uporabi z YAML',
      'options.step.user.data.release_limit':
        'Število izdaj, ki jih želite prikazati.',
      'options.step.user.data.sidepanel_icon': 'Ikona stranske plošče',
      'options.step.user.data.sidepanel_title': 'Naslov stranske plošče',
    },
    sv: {
      'common.appdaemon': 'AppDaemon',
      'common.close': 'Stäng',
      'common.download': 'Ladda ner',
      'common.integration': 'Integration',
      'common.navigate': 'navigera',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Python skript',
      'common.repositories': 'Repositories',
      'common.show': 'Visa',
      'common.theme': 'Tema',
      'common.updates': 'Uppdateringar',
      'common.yes': 'Ja',
      'confirm.home_assistant_version_not_correct':
        "Du kör Home Assistant-versionen ''{haversion}'', men detta repository kräver att lägsta versionen ''{minversion}'' måste installeras.",
      'dialog.configured.title': 'Integrationen är konfigurerad',
      'dialog.remove.message': 'Vill du verkligen ta bort {name}?',
      'dialog.remove.title': 'Ta bort',
      'dialog_add_repo.sort_by_values.last_updated': 'Senast uppdaterad',
      'dialog_add_repo.sort_by_values.name': 'Namn',
      'dialog_add_repo.sort_by_values.stars': 'Stjärnor',
      'dialog_download.note_downloaded':
        'När den har laddats ner kommer den att finnas i {location}',
      'dialog_download.select_version': 'Välj version',
      'dialog_download.show_beta': 'Visa betaversioner',
      'dialog_download.type': 'Typ',
      'dialog_download.url': 'URL',
      'dialog_info.version_installed': 'Version nedladdad',
      'dialog_update.downloaded_version': 'Nedladdad version',
      'dialog_update.message': 'En ny version av {name} är tillgänglig',
      'options.step.user.data.appdaemon':
        'Upptäck och följ Appdaemon applikationer',
      'options.step.user.data.country': 'Filtrera på landskod.',
      'options.step.user.data.debug': 'Aktivera felsökning',
      'options.step.user.data.experimental': 'Använd experimentella funktioner',
      'options.step.user.data.netdaemon':
        'Upptäck och följ NetDaemon applikationer',
      'options.step.user.data.not_in_use': 'Används inte med YAML',
      'options.step.user.data.release_limit': 'Antalet releaser som visas.',
      'options.step.user.data.sidepanel_icon': 'Ikon för sidpanel',
      'options.step.user.data.sidepanel_title': 'Rubrik för sidpanel',
      'repository_card.redownload': 'Ladda ner igen',
      'sections.addon.title': 'Tillägg',
    },
    vi: {
      'common.add': 'thêm',
      'common.integration': 'Tích Hợp',
      'common.integration_plural': 'Tích Hợp',
      'common.lovelace': 'Lovelace',
      'common.netdaemon': 'NetDaemon',
      'common.plugin': 'Bổ Sung',
      'common.repositories': 'Các kho ứng dụng',
      'common.repository': 'Kho lưu trữ',
      'common.theme': 'Chủ đề',
      'common.update': 'Cập nhật',
      'confirm.home_assistant_version_not_correct':
        "Bạn đang chạy phiên bản Home Assistant ''{haversion}'' nhưng kho ứng dụng này yêu cầu phiên bản thấp nhất ''{minversion}'' để cài đặt.",
      'dialog_about.frontend_version': 'Phiên bản Frontend',
      'dialog_about.integration_version': 'Phiên bản tích hợp',
      'dialog_about.useful_links': 'Liên kết hữu ích',
      'dialog_add_repo.limit':
        'Chỉ 100 kho lưu trữ đầu tiên được hiển thị, sử dụng mục tìm kiếm để lọc những gì bạn cần',
      'dialog_add_repo.no_match':
        'Không tìm thấy kho lưu trữ phù hợp với bộ lọc của bạn',
      'dialog_add_repo.sort_by': 'Sắp xếp theo',
      'dialog_add_repo.title': 'Thêm kho lưu trữ',
      'dialog_custom_repositories.category': 'Danh mục',
      'dialog_custom_repositories.no_category': 'Thiếu danh mục',
      'dialog_custom_repositories.no_repository': 'Kho lưu trữ bị thiếu',
      'dialog_custom_repositories.title': 'Các kho lưu trữ tuỳ chỉnh',
      'dialog_custom_repositories.url_placeholder':
        'Thêm URL của kho lưu trữ tùy chỉnh',
      'dialog_info.author': 'Tác giả',
      'dialog_info.downloads': 'Tải xuống',
      'dialog_info.loading': 'Đang tải thông tin...',
      'dialog_info.no_info':
        'Nhà phát triển đã không cung cấp thêm thông tin nào cho kho lưu trữ này',
      'dialog_info.open_issues': 'Báo cáo vấn đề',
      'dialog_info.open_repo': 'Mở Kho ứng dụng',
      'dialog_info.stars': 'Số sao',
      'dialog_update.available_version': 'Phiên bản hiện có',
      'dialog_update.changelog': 'Thay đổi',
      'dialog_update.releasenotes': 'Thông tin phiên bản {Release}',
      'dialog_update.title': 'Cập nhật đang chờ',
      'entry.information': 'Thông tin',
      'entry.intro':
        'Các cập nhật và thông điệp quan trọng sẽ hiển thị ở đây nếu có',
      'entry.messages.disabled.content':
        'Kiểm tra tệp nhật ký của bạn để biết thêm chi tiết',
      'entry.messages.disabled.title': 'VAIS đã bị vô hiệu hoá',
      'entry.messages.has_pending_tasks.content':
        'Một số kho có thể không thấy cho đến khi điều này hoàn tất',
      'entry.messages.has_pending_tasks.title': 'Tác vụ nền đang chờ',
      'entry.messages.resources.content':
        'Bạn có {number} thành phần Lovelace không được tải chính xác.',
      'entry.messages.resources.title': 'Không được tải trong Lovelace',
      'entry.messages.restart.content':
        "Bạn có {number} tích hợp yêu cầu khởi động lại Home Assistant, bạn có thể làm điều này từ mục 'Điều khiển máy chủ' bên trong tab Cấu hình trên giao diện Home Assistant.",
      'entry.messages.restart.title': 'Đang chờ khởi động lại',
      'entry.messages.startup.content':
        'VAIS đang khởi động, suốt quá trình này có thể một số thông tin sẽ bị thiếu hoặc không chính xác',
      'entry.messages.startup.title': 'VAIS đang khởi động',
      'entry.messages.wrong_frontend_loaded.content':
        'Bạn đang chạy phiên bản {running} của VAIS frontend, nhưng phiên bản được yêu cầu là {expected}, bạn nên xoá bộ đệm của trình duyệt web.',
      'entry.messages.wrong_frontend_loaded.title':
        'Phiên bản frontend không đúng',
      'entry.pending_updates': 'Đang chờ cập nhật',
      'menu.about': 'Giới thiệu VAIS',
      'menu.clear': 'Ẩn thông báo mục mới',
      'menu.custom_repositories': 'Các kho ứng dụng tuỳ chỉnh',
      'menu.dismiss': 'Bỏ qua tất cả kho chứa mới',
      'menu.documentation': 'Tài liệu',
      'menu.open_issue': 'Báo cáo vấn đề',
      'menu.reload': 'Tải lại cửa sổ',
      'options.step.user.data.appdaemon':
        'Kích hoạt phát hiện & theo dõi các ứng dụng AppDaemon',
      'options.step.user.data.country': 'Lọc với mã quốc gia.',
      'options.step.user.data.debug': 'Kích hoạt Trình gỡ lỗi',
      'options.step.user.data.experimental':
        'Kích hoạt các tính năng thử nghiệm',
      'options.step.user.data.netdaemon':
        'Kích hoạt phát hiện & theo dõi các ứng dụng NetDaemon',
      'options.step.user.data.not_in_use': 'Không sử dụng với YAML',
      'options.step.user.data.release_limit': 'Số lượng phiên bản hiển thị.',
      'options.step.user.data.sidepanel_icon':
        'Biểu tượng bảng điều khiển cạnh bên',
      'options.step.user.data.sidepanel_title':
        'Tiêu đề bảng điều khiển cạnh bên',
      'repository_card.dismiss': 'bỏ qua',
      'repository_card.information': 'Thông tin',
      'repository_card.new_repository': 'Kho lưu trữ mới',
      'repository_card.not_loaded': 'Không được tải',
      'repository_card.open_issue': 'Báo cáo vấn đề',
      'repository_card.open_source': 'Mã nguồn mở',
      'repository_card.pending_restart': 'Đang chờ khởi động lại',
      'repository_card.pending_update': 'Cập nhật đang chờ',
      'repository_card.report': 'Báo cáo để loại bỏ',
      'repository_card.update_information': 'Cập nhật thông tin',
      'search.placeholder': 'Tìm kiếm kho lưu trữ',
      'sections.about.description': 'Hiển thị thông tin về VAIS',
      'sections.about.title': 'Thông tin',
      'sections.automation.description':
        'Đây là nơi bạn tìm thấy python_scripts, ứng dụng AppDaemon và ứng dụng NetDaemon',
      'sections.automation.title': 'Tự động hóa',
      'sections.frontend.description':
        'Đây là nơi bạn tìm thấy chủ đề, thẻ tùy chỉnh và các thành phần khác cho lovelace',
      'sections.frontend.title': 'Frontend',
      'sections.integrations.description':
        'Đây là nơi bạn tìm thấy tích hợp tùy chỉnh (custom_components)',
      'sections.integrations.title': 'Tích Hợp',
      'sections.pending_repository_upgrade':
        'Bạn đang chạy phiên bản {installed}, phiên bản {available} có sẵn',
      'store.no_repositories': 'Không có kho lưu trữ',
      'store.no_repositories_desc1':
        'Có vẻ như bạn chưa có bất kỳ kho lưu trữ nào được cài đặt trong phần này.',
      'store.no_repositories_desc2':
        'Nhấp vào biểu tượng + ở góc dưới cùng để thêm mục mới đầu tiên của bạn!',
      'store.no_repositories_found_desc1':
        'Không tìm thấy kho lưu trữ được cài đặt phù hợp với "{searchInput}" trong mục này.',
      'store.no_repositories_found_desc2': 'Thử tìm kiếm với từ khoá khác!',
    },
    zh_Hans: {
      'common.add': '添加',
      'common.appdaemon': 'AppDaemon',
      'common.cancel': '取消',
      'common.close': '关闭',
      'common.download': '下载',
      'common.ignore': '忽略',
      'common.integration': '集成',
      'common.integration_plural': '集成',
      'common.lovelace': 'Lovelace',
      'common.navigate': '前往',
      'common.netdaemon': 'NetDaemon 应用',
      'common.plugin': 'Lovelace',
      'common.python_script': 'Python 脚本',
      'common.reload': '重新加载',
      'common.remove': '删除',
      'common.repositories': '储存库数量',
      'common.repository': '存储库',
      'common.theme': '主题',
      'common.update': '更新',
      'common.yes': '是',
      'confirm.home_assistant_version_not_correct':
        "您正在运行 Home Assistant 版本 ''{haversion}''，此存储库要求最低版本为 ''{minversion}''。",
      'dialog.configured.confirm': '转到集成',
      'dialog.configured.message':
        '集成 {name} 已完成配置或被忽略，如需将其从 VAIS 中删除，需要先删除其配置。',
      'dialog.configured.title': '集成正在使用',
      'dialog.reload.confirm': '立即进行此操作吗？',
      'dialog.reload.description': '需要清除浏览器缓存才能使更新后的资源生效。',
      'dialog.remove.message': '您确定要删除 {name} 吗？',
      'dialog.remove.title': '删除',
      'dialog_about.downloaded_repositories': '已下载存储库',
      'dialog_about.frontend_version': '前端版本',
      'dialog_about.integration_version': '集成版本',
      'dialog_about.useful_links': '有用的链接',
      'dialog_add_repo.limit': '仅显示前 100 个存储库，请通过搜索过滤所需内容',
      'dialog_add_repo.no_match': '未找到符合条件的存储库',
      'dialog_add_repo.sort_by': '排序方式',
      'dialog_add_repo.sort_by_values.last_updated': '上次更新',
      'dialog_add_repo.sort_by_values.name': '名称',
      'dialog_add_repo.sort_by_values.stars': '星标数',
      'dialog_add_repo.title': '添加存储库',
      'dialog_custom_repositories.category': '类别',
      'dialog_custom_repositories.no_category': '没有选择类别',
      'dialog_custom_repositories.no_repository': '存储库地址不能为空',
      'dialog_custom_repositories.title': '自定义存储库',
      'dialog_custom_repositories.url_placeholder': '添加自定义存储库 URL',
      'dialog_download.restart':
        '请注意，只有在重新启动 Home Assistant 后，对集成 (custom_components) 所做的更改才会生效。',
      'dialog_download.select_version': '选择版本',
      'dialog_download.show_beta': '显示测试版',
      'dialog_download.type': '类型',
      'dialog_download.url': 'URL',
      'dialog_info.author': '作者',
      'dialog_info.download': '通过 VAIS 下载此存储库',
      'dialog_info.downloads': '下载量',
      'dialog_info.loading': '正在加载详细信息...',
      'dialog_info.no_info': '开发者未就此存储库提供更多信息',
      'dialog_info.open_issues': '提交 Issue',
      'dialog_info.open_repo': '打开存储库',
      'dialog_info.stars': '星标数',
      'dialog_info.version_installed': '当前版本',
      'dialog_removed.link': '外部链接以获取更多信息',
      'dialog_removed.name': '存储库名称',
      'dialog_removed.reason': '删除原因',
      'dialog_removed.type': '删除类型',
      'dialog_update.available_version': '可用版本',
      'dialog_update.changelog': '更新日志',
      'dialog_update.downloaded_version': '已安装版本',
      'dialog_update.message': '{name} 有新版本了',
      'dialog_update.no_info': '作者未对此版本提供任何说明',
      'dialog_update.releasenotes': '{release} 发行说明',
      'dialog_update.title': '等待更新',
      'entry.information': '详情',
      'entry.intro': '如果有更新和重要消息，将在此处显示',
      'entry.messages.disabled.constrains.description':
        '您的环境与运行 VAIS 不兼容，请检查日志文件以获取更多信息。',
      'entry.messages.disabled.constrains.title': '限制条件',
      'entry.messages.disabled.content': '请查看日志文件以了解更多信息',
      'entry.messages.disabled.invalid_token.description':
        '请重新配置 VAIS，然后重新启动 Home Assistant。',
      'entry.messages.disabled.invalid_token.title': 'token 无效',
      'entry.messages.disabled.load_vais.description':
        '请查看日志文件以了解更多信息',
      'entry.messages.disabled.load_vais.title': 'VAIS 无法加载',
      'entry.messages.disabled.rate_limit.description':
        '要加载的数据过多，超出了 GitHub API 的速率限制。请等待 1 小时，即可自动恢复。',
      'entry.messages.disabled.rate_limit.title': '流量超限',
      'entry.messages.disabled.removed.description':
        'VAIS 已删除，请重新启动 Home Assistant。',
      'entry.messages.disabled.removed.title': '已删除',
      'entry.messages.disabled.restore.description':
        '请查看日志文件以了解更多信息',
      'entry.messages.disabled.restore.title': '恢复 VAIS 失败',
      'entry.messages.disabled.title': 'VAIS 已禁用',
      'entry.messages.has_pending_tasks.content':
        '在完成之前，无法完整显示出所有的存储库。',
      'entry.messages.has_pending_tasks.title': '后台任务等待处理',
      'entry.messages.removed_repository': "已删除存储库 ''{repository}''",
      'entry.messages.resources.content':
        '有 {number} 个 Lovelace 元素未正确加载到 Lovelace 中。',
      'entry.messages.resources.title': '未载入 Lovelace',
      'entry.messages.restart.content':
        '有 {number} 个{pluralWording}需要重启 Home Assistant，可以在 Home Assistant 的“配置” - “服务控制”部分执行此操作。',
      'entry.messages.restart.title': '等待重启',
      'entry.messages.setup.content':
        'VAIS 正在启动，在此期间，部分信息可能缺失或异常',
      'entry.messages.setup.title': 'VAIS 正在安装',
      'entry.messages.startup.content':
        'VAIS 正在启动，在此期间，部分信息可能缺失或异常',
      'entry.messages.startup.title': 'VAIS 正在启动',
      'entry.messages.waiting.content':
        '待到 Home Assistant 启动完成后，VAIS 的启动任务才会开始',
      'entry.messages.waiting.title': 'VAIS 正在等待',
      'entry.messages.wrong_frontend_installed.content':
        '您正在运行 VAIS 前端版本 {running}，但是期望版本是 {expected}。如果看到此消息，说明 Home Assistant 未能安装新版本，请尝试重新启动 Home Assistant。',
      'entry.messages.wrong_frontend_installed.title': '非预期的前端版本',
      'entry.messages.wrong_frontend_loaded.content':
        '您正在运行 VAIS 前端版本 {running}，但是期望版本是 {expected}，请清除浏览器缓存。',
      'entry.messages.wrong_frontend_loaded.title': '非预期的前端版本',
      'entry.pending_updates': '等待更新',
      'menu.about': '关于 VAIS',
      'menu.clear': '清除所有 NEW 标记',
      'menu.custom_repositories': '自定义存储库',
      'menu.dismiss': '忽略新的存储库',
      'menu.documentation': '文档',
      'menu.open_issue': '提交 Issue',
      'menu.reload': '重新加载窗口',
      'options.abort.not_setup': 'VAIS 未设置完毕。',
      'options.abort.release_limit_value': '版本限制应在 1 到 100 之间',
      'options.step.user.data.appdaemon': '启用 AppDaemon 应用发现和跟踪',
      'options.step.user.data.country': '通过国家代码过滤',
      'options.step.user.data.debug': '启用调试。',
      'options.step.user.data.experimental': '启用实验功能',
      'options.step.user.data.netdaemon': '启用 NetDaemon 应用发现和跟踪',
      'options.step.user.data.not_in_use': '不使用 YAML',
      'options.step.user.data.release_limit': '要显示的版本数',
      'options.step.user.data.sidepanel_icon': '侧面板图标',
      'options.step.user.data.sidepanel_title': '侧面板标题',
      'repository_card.dismiss': '忽略',
      'repository_card.information': '详情',
      'repository_card.new_repository': '新存储库',
      'repository_card.not_loaded': '未加载',
      'repository_card.open_issue': '提交 Issue',
      'repository_card.open_source': '打开源码',
      'repository_card.pending_restart': '等待重启',
      'repository_card.pending_update': '等待更新',
      'repository_card.redownload': '重新下载',
      'repository_card.report': '举报',
      'repository_card.update_information': '更新信息',
      'search.downloaded': '搜索已下载的存储库',
      'search.downloaded_new': '搜索已下载或新的存储库',
      'search.placeholder': '搜索存储库',
      'sections.about.description': '显示关于 VAIS 的信息',
      'sections.about.title': '关于',
      'sections.addon.description':
        'VAIS 没有加载项，但点击此处可以前往 Supervisor 的相应页面',
      'sections.addon.title': '加载项',
      'sections.automation.description':
        '此处可以找到 Python 脚本、AppDaemon 应用程序和 NetDaemon 应用程序',
      'sections.automation.title': '自动化',
      'sections.frontend.description':
        '此处可以找到主题、自定义卡片和其他用于 Lovelace 的元素',
      'sections.frontend.title': '前端',
      'sections.integrations.description':
        '此处可以找到自定义集成 (custom_components)',
      'sections.integrations.title': '集成',
      'sections.pending_repository_upgrade':
        '当前版本 {installed}，可更新至 {available}',
      'store.explore': '浏览并下载存储库',
      'store.new_repositories_note': '这里显示了一些新的存储库',
      'store.no_repositories': '没有储存库',
      'store.no_repositories_desc1': '此处尚未下载任何存储库。',
      'store.no_repositories_desc2': '点击右下角的 + 来开始添加吧！',
      'store.no_repositories_found_desc1':
        '此处未找到与“{searchInput}”有关的已下载存储库。',
      'store.no_repositories_found_desc2': '搜索别的试试吧！',
    },
  },
  Bu = new Set(['en_GB']),
  $u = new Du('localize'),
  Fu = { language: [], sting: {} },
  Uu = {}
function Zu(e, t, o) {
  var r
  let i = (e || localStorage.getItem('selectedLanguage') || 'en')
    .replace(/['"]+/g, '')
    .replace('-', '_')
  var n
  ;(!Bu.has(i) && ju[i]) ||
    (Bu.has(i) ||
      (null !== (n = Fu.language) && void 0 !== n && n.includes(i)) ||
      (Fu.language.push(i),
      $u.warn(
        `Language '${i.replace(
          '_',
          '-'
        )}' is not added to VAIS, using 'en' instead. https://vais.xyz/docs/developer/translation`
      )),
    (i = 'en'))
  const a = (null === (r = ju[i]) || void 0 === r ? void 0 : r[t]) || ju.en[t]
  if (!a) return $u.error(`Translation problem with '${t}' for '${i}'`), t
  const s = t + a
  let l = Uu[s]
  if (!l) {
    try {
      l = new Ru(a, e)
    } catch (e) {
      return $u.error(`Translation problem with '${t}' for '${i}'`), t
    }
    Uu[s] = l
  }
  try {
    return l.format(o)
  } catch (e) {
    return $u.error(`Translation problem with '${t}' for '${i}'`), t
  }
}
const qu = (e) => ({
    updates: [],
    messages: [],
    subsections: {
      main: [
        {
          categories: ['integration'],
          iconPath:
            'M20.5,11H19V7C19,5.89 18.1,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4A2,2 0 0,0 2,7V10.8H3.5C5,10.8 6.2,12 6.2,13.5C6.2,15 5,16.2 3.5,16.2H2V20A2,2 0 0,0 4,22H7.8V20.5C7.8,19 9,17.8 10.5,17.8C12,17.8 13.2,19 13.2,20.5V22H17A2,2 0 0,0 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z',
          id: 'integrations',
          iconColor: 'rgb(13, 71, 161)',
          description: Zu(e, 'sections.integrations.description'),
          name: Zu(e, 'sections.integrations.title'),
          path: '/vais/integrations',
          core: !0,
        },
        {
          categories: ['plugin', 'theme'],
          iconPath: ec,
          id: 'frontend',
          iconColor: 'rgb(177, 52, 92)',
          description: Zu(e, 'sections.frontend.description'),
          name: Zu(e, 'sections.frontend.title'),
          path: '/vais/frontend',
          core: !0,
        },
        {
          categories: ['python_script', 'appdaemon', 'netdaemon'],
          iconPath: mc,
          id: 'automation',
          iconColor: 'rgb(81, 140, 67)',
          description: Zu(e, 'sections.automation.description'),
          name: Zu(e, 'sections.automation.title'),
          path: '/vais/automation',
          core: !0,
        },
      ],
    },
  }),
  Gu = os((e, t) =>
    qu(e).subsections.main.filter((e) => {
      const o = e.categories
      return (
        0 !==
        (null == o
          ? void 0
          : o.filter((e) => {
              var o
              return (
                t.dev ||
                (null == t || null === (o = t.categories) || void 0 === o
                  ? void 0
                  : o.includes(e))
              )
            }).length)
      )
    })
  ),
  Ku = (e, t) => {
    const o = t.path.replace('/', '')
    return qu(e).subsections.main.find((e) => e.id === o)
  },
  Yu = (e) =>
    `/vaisfiles/${e.repository.full_name.split('/')[1]}/${
      e.repository.file_name
    }${
      e.skipTag
        ? ''
        : `?vaistag=${((e, t) =>
            String(
              `${e.id}${(
                t ||
                e.installed_version ||
                e.selected_tag ||
                e.available_version
              ).replace(/\D+/g, '')}`
            ))(e.repository, e.version)}`
    }`,
  Wu = (e, t) => {
    var o, r
    if (!t.installed) return !0
    if ('plugin' !== t.category) return !0
    if (
      'storage' !==
      (null === (o = e.status) || void 0 === o ? void 0 : o.lovelace_mode)
    )
      return !0
    const i = Yu({ repository: t, skipTag: !0 })
    return (
      (null === (r = e.resources) || void 0 === r
        ? void 0
        : r.some((e) => e.url.includes(i))) || !1
    )
  }
let Xu = s(
  null,
  function (e, o) {
    class i extends o {
      constructor(...t) {
        super(...t), e(this)
      }
    }
    return {
      F: i,
      d: [
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'vais',
          value: void 0,
        },
        {
          kind: 'method',
          key: 'connectedCallback',
          value: function () {
            r(t(i.prototype), 'connectedCallback', this).call(this),
              void 0 === this.vais &&
                (this.vais = {
                  language: 'en',
                  messages: [],
                  updates: [],
                  resources: [],
                  repositories: [],
                  removed: [],
                  sections: [],
                  configuration: {},
                  status: {},
                  addedToLovelace: Wu,
                  localize: (e, t) => {
                    var o
                    return Zu(
                      (null === (o = this.vais) || void 0 === o
                        ? void 0
                        : o.language) || 'en',
                      e,
                      t
                    )
                  },
                  log: new Du(),
                }),
              this.addEventListener('update-vais', (e) =>
                this._updateVais(e.detail)
              )
          },
        },
        {
          kind: 'method',
          key: '_updateVais',
          value: function (e) {
            let t = !1
            Object.keys(e).forEach((o) => {
              JSON.stringify(this.vais[o]) !== JSON.stringify(e[o]) && (t = !0)
            }),
              t && (this.vais = { ...this.vais, ...e })
          },
        },
        {
          kind: 'method',
          key: 'updated',
          value: function (e) {
            r(t(i.prototype), 'updated', this).call(this, e),
              this.vais.language &&
                this.vais.configuration &&
                (this.vais.sections = Gu(
                  this.vais.language,
                  this.vais.configuration
                ))
          },
        },
      ],
    }
  },
  ((Ju = _e),
  class extends Ju {
    constructor(...t) {
      super(...t), e(this, 'hass', void 0), e(this, '__provideHass', [])
    }
    provideHass(e) {
      this.__provideHass.push(e), (e.hass = this.hass)
    }
    updated(e) {
      super.updated(e),
        e.has('hass') &&
          this.__provideHass.forEach((e) => {
            e.hass = this.hass
          })
    }
  })
)
var Ju
const Qu = (e, t) => {
    const o = matchMedia(e),
      r = (e) => t(e.matches)
    return o.addListener(r), t(o.matches), () => o.removeListener(r)
  },
  em = b`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`
let tm = class extends _e {
  render() {
    return K`<span><slot></slot></span>`
  }
}
function om(e, t) {
  if (e.closest) return e.closest(t)
  for (var o = e; o; ) {
    if (rm(o, t)) return o
    o = o.parentElement
  }
  return null
}
function rm(e, t) {
  return (e.matches || e.webkitMatchesSelector || e.msMatchesSelector).call(
    e,
    t
  )
}
;(tm.styles = [em]), (tm = sp([ye('mwc-icon')], tm))
const im = (e) => e.nodeType === Node.ELEMENT_NODE
function nm(e) {
  return {
    addClass: (t) => {
      e.classList.add(t)
    },
    removeClass: (t) => {
      e.classList.remove(t)
    },
    hasClass: (t) => e.classList.contains(t),
  }
}
let am = !1
const sm = () => {},
  lm = {
    get passive() {
      return (am = !0), !1
    },
  }
document.addEventListener('x', sm, lm), document.removeEventListener('x', sm)
const dm = am,
  cm = (e = window.document) => {
    let t = e.activeElement
    const o = []
    if (!t) return o
    for (; t && (o.push(t), t.shadowRoot); ) t = t.shadowRoot.activeElement
    return o
  },
  pm = (e) => {
    const t = cm()
    if (!t.length) return !1
    const o = t[t.length - 1],
      r = new Event('check-if-focused', { bubbles: !0, composed: !0 })
    let i = []
    const n = (e) => {
      i = e.composedPath()
    }
    return (
      document.body.addEventListener('check-if-focused', n),
      o.dispatchEvent(r),
      document.body.removeEventListener('check-if-focused', n),
      -1 !== i.indexOf(e)
    )
  }
class um extends _e {
  click() {
    if (this.mdcRoot) return this.mdcRoot.focus(), void this.mdcRoot.click()
    super.click()
  }
  createFoundation() {
    void 0 !== this.mdcFoundation && this.mdcFoundation.destroy(),
      this.mdcFoundationClass &&
        ((this.mdcFoundation = new this.mdcFoundationClass(
          this.createAdapter()
        )),
        this.mdcFoundation.init())
  }
  firstUpdated() {
    this.createFoundation()
  }
}
var mm = (function () {
    function e(e) {
      void 0 === e && (e = {}), (this.adapter = e)
    }
    return (
      Object.defineProperty(e, 'cssClasses', {
        get: function () {
          return {}
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, 'strings', {
        get: function () {
          return {}
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, 'numbers', {
        get: function () {
          return {}
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, 'defaultAdapter', {
        get: function () {
          return {}
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.init = function () {}),
      (e.prototype.destroy = function () {}),
      e
    )
  })(),
  hm = {
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  },
  gm = {
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top',
  },
  _m = {
    DEACTIVATION_TIMEOUT_MS: 225,
    FG_DEACTIVATION_MS: 150,
    INITIAL_ORIGIN_SCALE: 0.6,
    PADDING: 10,
    TAP_DELAY_MS: 300,
  }
var fm = ['touchstart', 'pointerdown', 'mousedown', 'keydown'],
  ym = ['touchend', 'pointerup', 'mouseup', 'contextmenu'],
  bm = [],
  vm = (function (e) {
    function t(o) {
      var r = e.call(this, ap(ap({}, t.defaultAdapter), o)) || this
      return (
        (r.activationAnimationHasEnded = !1),
        (r.activationTimer = 0),
        (r.fgDeactivationRemovalTimer = 0),
        (r.fgScale = '0'),
        (r.frame = { width: 0, height: 0 }),
        (r.initialSize = 0),
        (r.layoutFrame = 0),
        (r.maxRadius = 0),
        (r.unboundedCoords = { left: 0, top: 0 }),
        (r.activationState = r.defaultActivationState()),
        (r.activationTimerCallback = function () {
          ;(r.activationAnimationHasEnded = !0),
            r.runDeactivationUXLogicIfReady()
        }),
        (r.activateHandler = function (e) {
          r.activateImpl(e)
        }),
        (r.deactivateHandler = function () {
          r.deactivateImpl()
        }),
        (r.focusHandler = function () {
          r.handleFocus()
        }),
        (r.blurHandler = function () {
          r.handleBlur()
        }),
        (r.resizeHandler = function () {
          r.layout()
        }),
        r
      )
    }
    return (
      np(t, e),
      Object.defineProperty(t, 'cssClasses', {
        get: function () {
          return hm
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, 'strings', {
        get: function () {
          return gm
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, 'numbers', {
        get: function () {
          return _m
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, 'defaultAdapter', {
        get: function () {
          return {
            addClass: function () {},
            browserSupportsCssVars: function () {
              return !0
            },
            computeBoundingRect: function () {
              return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: 0,
                height: 0,
              }
            },
            containsEventTarget: function () {
              return !0
            },
            deregisterDocumentInteractionHandler: function () {},
            deregisterInteractionHandler: function () {},
            deregisterResizeHandler: function () {},
            getWindowPageOffset: function () {
              return { x: 0, y: 0 }
            },
            isSurfaceActive: function () {
              return !0
            },
            isSurfaceDisabled: function () {
              return !0
            },
            isUnbounded: function () {
              return !0
            },
            registerDocumentInteractionHandler: function () {},
            registerInteractionHandler: function () {},
            registerResizeHandler: function () {},
            removeClass: function () {},
            updateCssVariable: function () {},
          }
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.init = function () {
        var e = this,
          o = this.supportsPressRipple()
        if ((this.registerRootHandlers(o), o)) {
          var r = t.cssClasses,
            i = r.ROOT,
            n = r.UNBOUNDED
          requestAnimationFrame(function () {
            e.adapter.addClass(i),
              e.adapter.isUnbounded() &&
                (e.adapter.addClass(n), e.layoutInternal())
          })
        }
      }),
      (t.prototype.destroy = function () {
        var e = this
        if (this.supportsPressRipple()) {
          this.activationTimer &&
            (clearTimeout(this.activationTimer),
            (this.activationTimer = 0),
            this.adapter.removeClass(t.cssClasses.FG_ACTIVATION)),
            this.fgDeactivationRemovalTimer &&
              (clearTimeout(this.fgDeactivationRemovalTimer),
              (this.fgDeactivationRemovalTimer = 0),
              this.adapter.removeClass(t.cssClasses.FG_DEACTIVATION))
          var o = t.cssClasses,
            r = o.ROOT,
            i = o.UNBOUNDED
          requestAnimationFrame(function () {
            e.adapter.removeClass(r),
              e.adapter.removeClass(i),
              e.removeCssVars()
          })
        }
        this.deregisterRootHandlers(), this.deregisterDeactivationHandlers()
      }),
      (t.prototype.activate = function (e) {
        this.activateImpl(e)
      }),
      (t.prototype.deactivate = function () {
        this.deactivateImpl()
      }),
      (t.prototype.layout = function () {
        var e = this
        this.layoutFrame && cancelAnimationFrame(this.layoutFrame),
          (this.layoutFrame = requestAnimationFrame(function () {
            e.layoutInternal(), (e.layoutFrame = 0)
          }))
      }),
      (t.prototype.setUnbounded = function (e) {
        var o = t.cssClasses.UNBOUNDED
        e ? this.adapter.addClass(o) : this.adapter.removeClass(o)
      }),
      (t.prototype.handleFocus = function () {
        var e = this
        requestAnimationFrame(function () {
          return e.adapter.addClass(t.cssClasses.BG_FOCUSED)
        })
      }),
      (t.prototype.handleBlur = function () {
        var e = this
        requestAnimationFrame(function () {
          return e.adapter.removeClass(t.cssClasses.BG_FOCUSED)
        })
      }),
      (t.prototype.supportsPressRipple = function () {
        return this.adapter.browserSupportsCssVars()
      }),
      (t.prototype.defaultActivationState = function () {
        return {
          activationEvent: void 0,
          hasDeactivationUXRun: !1,
          isActivated: !1,
          isProgrammatic: !1,
          wasActivatedByPointer: !1,
          wasElementMadeActive: !1,
        }
      }),
      (t.prototype.registerRootHandlers = function (e) {
        var t, o
        if (e) {
          try {
            for (var r = dp(fm), i = r.next(); !i.done; i = r.next()) {
              var n = i.value
              this.adapter.registerInteractionHandler(n, this.activateHandler)
            }
          } catch (e) {
            t = { error: e }
          } finally {
            try {
              i && !i.done && (o = r.return) && o.call(r)
            } finally {
              if (t) throw t.error
            }
          }
          this.adapter.isUnbounded() &&
            this.adapter.registerResizeHandler(this.resizeHandler)
        }
        this.adapter.registerInteractionHandler('focus', this.focusHandler),
          this.adapter.registerInteractionHandler('blur', this.blurHandler)
      }),
      (t.prototype.registerDeactivationHandlers = function (e) {
        var t, o
        if ('keydown' === e.type)
          this.adapter.registerInteractionHandler(
            'keyup',
            this.deactivateHandler
          )
        else
          try {
            for (var r = dp(ym), i = r.next(); !i.done; i = r.next()) {
              var n = i.value
              this.adapter.registerDocumentInteractionHandler(
                n,
                this.deactivateHandler
              )
            }
          } catch (e) {
            t = { error: e }
          } finally {
            try {
              i && !i.done && (o = r.return) && o.call(r)
            } finally {
              if (t) throw t.error
            }
          }
      }),
      (t.prototype.deregisterRootHandlers = function () {
        var e, t
        try {
          for (var o = dp(fm), r = o.next(); !r.done; r = o.next()) {
            var i = r.value
            this.adapter.deregisterInteractionHandler(i, this.activateHandler)
          }
        } catch (t) {
          e = { error: t }
        } finally {
          try {
            r && !r.done && (t = o.return) && t.call(o)
          } finally {
            if (e) throw e.error
          }
        }
        this.adapter.deregisterInteractionHandler('focus', this.focusHandler),
          this.adapter.deregisterInteractionHandler('blur', this.blurHandler),
          this.adapter.isUnbounded() &&
            this.adapter.deregisterResizeHandler(this.resizeHandler)
      }),
      (t.prototype.deregisterDeactivationHandlers = function () {
        var e, t
        this.adapter.deregisterInteractionHandler(
          'keyup',
          this.deactivateHandler
        )
        try {
          for (var o = dp(ym), r = o.next(); !r.done; r = o.next()) {
            var i = r.value
            this.adapter.deregisterDocumentInteractionHandler(
              i,
              this.deactivateHandler
            )
          }
        } catch (t) {
          e = { error: t }
        } finally {
          try {
            r && !r.done && (t = o.return) && t.call(o)
          } finally {
            if (e) throw e.error
          }
        }
      }),
      (t.prototype.removeCssVars = function () {
        var e = this,
          o = t.strings
        Object.keys(o).forEach(function (t) {
          0 === t.indexOf('VAR_') && e.adapter.updateCssVariable(o[t], null)
        })
      }),
      (t.prototype.activateImpl = function (e) {
        var t = this
        if (!this.adapter.isSurfaceDisabled()) {
          var o = this.activationState
          if (!o.isActivated) {
            var r = this.previousActivationEvent
            if (!(r && void 0 !== e && r.type !== e.type))
              (o.isActivated = !0),
                (o.isProgrammatic = void 0 === e),
                (o.activationEvent = e),
                (o.wasActivatedByPointer =
                  !o.isProgrammatic &&
                  void 0 !== e &&
                  ('mousedown' === e.type ||
                    'touchstart' === e.type ||
                    'pointerdown' === e.type)),
                void 0 !== e &&
                bm.length > 0 &&
                bm.some(function (e) {
                  return t.adapter.containsEventTarget(e)
                })
                  ? this.resetActivationState()
                  : (void 0 !== e &&
                      (bm.push(e.target), this.registerDeactivationHandlers(e)),
                    (o.wasElementMadeActive = this.checkElementMadeActive(e)),
                    o.wasElementMadeActive && this.animateActivation(),
                    requestAnimationFrame(function () {
                      ;(bm = []),
                        o.wasElementMadeActive ||
                          void 0 === e ||
                          (' ' !== e.key && 32 !== e.keyCode) ||
                          ((o.wasElementMadeActive =
                            t.checkElementMadeActive(e)),
                          o.wasElementMadeActive && t.animateActivation()),
                        o.wasElementMadeActive ||
                          (t.activationState = t.defaultActivationState())
                    }))
          }
        }
      }),
      (t.prototype.checkElementMadeActive = function (e) {
        return (
          void 0 === e || 'keydown' !== e.type || this.adapter.isSurfaceActive()
        )
      }),
      (t.prototype.animateActivation = function () {
        var e = this,
          o = t.strings,
          r = o.VAR_FG_TRANSLATE_START,
          i = o.VAR_FG_TRANSLATE_END,
          n = t.cssClasses,
          a = n.FG_DEACTIVATION,
          s = n.FG_ACTIVATION,
          l = t.numbers.DEACTIVATION_TIMEOUT_MS
        this.layoutInternal()
        var d = '',
          c = ''
        if (!this.adapter.isUnbounded()) {
          var p = this.getFgTranslationCoordinates(),
            u = p.startPoint,
            m = p.endPoint
          ;(d = u.x + 'px, ' + u.y + 'px'), (c = m.x + 'px, ' + m.y + 'px')
        }
        this.adapter.updateCssVariable(r, d),
          this.adapter.updateCssVariable(i, c),
          clearTimeout(this.activationTimer),
          clearTimeout(this.fgDeactivationRemovalTimer),
          this.rmBoundedActivationClasses(),
          this.adapter.removeClass(a),
          this.adapter.computeBoundingRect(),
          this.adapter.addClass(s),
          (this.activationTimer = setTimeout(function () {
            e.activationTimerCallback()
          }, l))
      }),
      (t.prototype.getFgTranslationCoordinates = function () {
        var e,
          t = this.activationState,
          o = t.activationEvent
        return (
          (e = t.wasActivatedByPointer
            ? (function (e, t, o) {
                if (!e) return { x: 0, y: 0 }
                var r,
                  i,
                  n = t.x,
                  a = t.y,
                  s = n + o.left,
                  l = a + o.top
                if ('touchstart' === e.type) {
                  var d = e
                  ;(r = d.changedTouches[0].pageX - s),
                    (i = d.changedTouches[0].pageY - l)
                } else {
                  var c = e
                  ;(r = c.pageX - s), (i = c.pageY - l)
                }
                return { x: r, y: i }
              })(
                o,
                this.adapter.getWindowPageOffset(),
                this.adapter.computeBoundingRect()
              )
            : { x: this.frame.width / 2, y: this.frame.height / 2 }),
          {
            startPoint: (e = {
              x: e.x - this.initialSize / 2,
              y: e.y - this.initialSize / 2,
            }),
            endPoint: {
              x: this.frame.width / 2 - this.initialSize / 2,
              y: this.frame.height / 2 - this.initialSize / 2,
            },
          }
        )
      }),
      (t.prototype.runDeactivationUXLogicIfReady = function () {
        var e = this,
          o = t.cssClasses.FG_DEACTIVATION,
          r = this.activationState,
          i = r.hasDeactivationUXRun,
          n = r.isActivated
        ;(i || !n) &&
          this.activationAnimationHasEnded &&
          (this.rmBoundedActivationClasses(),
          this.adapter.addClass(o),
          (this.fgDeactivationRemovalTimer = setTimeout(function () {
            e.adapter.removeClass(o)
          }, _m.FG_DEACTIVATION_MS)))
      }),
      (t.prototype.rmBoundedActivationClasses = function () {
        var e = t.cssClasses.FG_ACTIVATION
        this.adapter.removeClass(e),
          (this.activationAnimationHasEnded = !1),
          this.adapter.computeBoundingRect()
      }),
      (t.prototype.resetActivationState = function () {
        var e = this
        ;(this.previousActivationEvent = this.activationState.activationEvent),
          (this.activationState = this.defaultActivationState()),
          setTimeout(function () {
            return (e.previousActivationEvent = void 0)
          }, t.numbers.TAP_DELAY_MS)
      }),
      (t.prototype.deactivateImpl = function () {
        var e = this,
          t = this.activationState
        if (t.isActivated) {
          var o = ap({}, t)
          t.isProgrammatic
            ? (requestAnimationFrame(function () {
                e.animateDeactivation(o)
              }),
              this.resetActivationState())
            : (this.deregisterDeactivationHandlers(),
              requestAnimationFrame(function () {
                ;(e.activationState.hasDeactivationUXRun = !0),
                  e.animateDeactivation(o),
                  e.resetActivationState()
              }))
        }
      }),
      (t.prototype.animateDeactivation = function (e) {
        var t = e.wasActivatedByPointer,
          o = e.wasElementMadeActive
        ;(t || o) && this.runDeactivationUXLogicIfReady()
      }),
      (t.prototype.layoutInternal = function () {
        var e = this
        this.frame = this.adapter.computeBoundingRect()
        var o = Math.max(this.frame.height, this.frame.width)
        this.maxRadius = this.adapter.isUnbounded()
          ? o
          : Math.sqrt(
              Math.pow(e.frame.width, 2) + Math.pow(e.frame.height, 2)
            ) + t.numbers.PADDING
        var r = Math.floor(o * t.numbers.INITIAL_ORIGIN_SCALE)
        this.adapter.isUnbounded() && r % 2 != 0
          ? (this.initialSize = r - 1)
          : (this.initialSize = r),
          (this.fgScale = '' + this.maxRadius / this.initialSize),
          this.updateLayoutCssVars()
      }),
      (t.prototype.updateLayoutCssVars = function () {
        var e = t.strings,
          o = e.VAR_FG_SIZE,
          r = e.VAR_LEFT,
          i = e.VAR_TOP,
          n = e.VAR_FG_SCALE
        this.adapter.updateCssVariable(o, this.initialSize + 'px'),
          this.adapter.updateCssVariable(n, this.fgScale),
          this.adapter.isUnbounded() &&
            ((this.unboundedCoords = {
              left: Math.round(this.frame.width / 2 - this.initialSize / 2),
              top: Math.round(this.frame.height / 2 - this.initialSize / 2),
            }),
            this.adapter.updateCssVariable(r, this.unboundedCoords.left + 'px'),
            this.adapter.updateCssVariable(i, this.unboundedCoords.top + 'px'))
      }),
      t
    )
  })(mm),
  Cm = vm
const Am = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6,
  },
  wm =
    (e) =>
    (...t) => ({ _$litDirective$: e, values: t })
class Hm {
  constructor(e) {}
  get _$AU() {
    return this._$AM._$AU
  }
  _$AT(e, t, o) {
    ;(this._$Ct = e), (this._$AM = t), (this._$Ci = o)
  }
  _$AS(e, t) {
    return this.update(e, t)
  }
  update(e, t) {
    return this.render(...t)
  }
}
const km = wm(
    class extends Hm {
      constructor(e) {
        var t
        if (
          (super(e),
          e.type !== Am.ATTRIBUTE ||
            'class' !== e.name ||
            (null === (t = e.strings) || void 0 === t ? void 0 : t.length) > 2)
        )
          throw Error(
            '`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.'
          )
      }
      render(e) {
        return (
          ' ' +
          Object.keys(e)
            .filter((t) => e[t])
            .join(' ') +
          ' '
        )
      }
      update(e, [t]) {
        var o, r
        if (void 0 === this.st) {
          ;(this.st = new Set()),
            void 0 !== e.strings &&
              (this.et = new Set(
                e.strings
                  .join(' ')
                  .split(/\s/)
                  .filter((e) => '' !== e)
              ))
          for (const e in t)
            t[e] &&
              !(null === (o = this.et) || void 0 === o ? void 0 : o.has(e)) &&
              this.st.add(e)
          return this.render(t)
        }
        const i = e.element.classList
        this.st.forEach((e) => {
          e in t || (i.remove(e), this.st.delete(e))
        })
        for (const e in t) {
          const o = !!t[e]
          o === this.st.has(e) ||
            (null === (r = this.et) || void 0 === r ? void 0 : r.has(e)) ||
            (o ? (i.add(e), this.st.add(e)) : (i.remove(e), this.st.delete(e)))
        }
        return W
      }
    }
  ),
  Sm = wm(
    class extends Hm {
      constructor(e) {
        var t
        if (
          (super(e),
          e.type !== Am.ATTRIBUTE ||
            'style' !== e.name ||
            (null === (t = e.strings) || void 0 === t ? void 0 : t.length) > 2)
        )
          throw Error(
            'The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.'
          )
      }
      render(e) {
        return Object.keys(e).reduce((t, o) => {
          const r = e[o]
          return null == r
            ? t
            : t +
                `${(o = o
                  .replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, '-$&')
                  .toLowerCase())}:${r};`
        }, '')
      }
      update(e, [t]) {
        const { style: o } = e.element
        if (void 0 === this.ct) {
          this.ct = new Set()
          for (const e in t) this.ct.add(e)
          return this.render(t)
        }
        this.ct.forEach((e) => {
          null == t[e] &&
            (this.ct.delete(e),
            e.includes('-') ? o.removeProperty(e) : (o[e] = ''))
        })
        for (const e in t) {
          const r = t[e]
          null != r &&
            (this.ct.add(e), e.includes('-') ? o.setProperty(e, r) : (o[e] = r))
        }
        return W
      }
    }
  )
class Lm extends um {
  constructor() {
    super(...arguments),
      (this.primary = !1),
      (this.accent = !1),
      (this.unbounded = !1),
      (this.disabled = !1),
      (this.activated = !1),
      (this.selected = !1),
      (this.internalUseStateLayerCustomProperties = !1),
      (this.hovering = !1),
      (this.bgFocused = !1),
      (this.fgActivation = !1),
      (this.fgDeactivation = !1),
      (this.fgScale = ''),
      (this.fgSize = ''),
      (this.translateStart = ''),
      (this.translateEnd = ''),
      (this.leftPos = ''),
      (this.topPos = ''),
      (this.mdcFoundationClass = Cm)
  }
  get isActive() {
    return rm(this.parentElement || this, ':active')
  }
  createAdapter() {
    return {
      browserSupportsCssVars: () => !0,
      isUnbounded: () => this.unbounded,
      isSurfaceActive: () => this.isActive,
      isSurfaceDisabled: () => this.disabled,
      addClass: (e) => {
        switch (e) {
          case 'mdc-ripple-upgraded--background-focused':
            this.bgFocused = !0
            break
          case 'mdc-ripple-upgraded--foreground-activation':
            this.fgActivation = !0
            break
          case 'mdc-ripple-upgraded--foreground-deactivation':
            this.fgDeactivation = !0
        }
      },
      removeClass: (e) => {
        switch (e) {
          case 'mdc-ripple-upgraded--background-focused':
            this.bgFocused = !1
            break
          case 'mdc-ripple-upgraded--foreground-activation':
            this.fgActivation = !1
            break
          case 'mdc-ripple-upgraded--foreground-deactivation':
            this.fgDeactivation = !1
        }
      },
      containsEventTarget: () => !0,
      registerInteractionHandler: () => {},
      deregisterInteractionHandler: () => {},
      registerDocumentInteractionHandler: () => {},
      deregisterDocumentInteractionHandler: () => {},
      registerResizeHandler: () => {},
      deregisterResizeHandler: () => {},
      updateCssVariable: (e, t) => {
        switch (e) {
          case '--mdc-ripple-fg-scale':
            this.fgScale = t
            break
          case '--mdc-ripple-fg-size':
            this.fgSize = t
            break
          case '--mdc-ripple-fg-translate-end':
            this.translateEnd = t
            break
          case '--mdc-ripple-fg-translate-start':
            this.translateStart = t
            break
          case '--mdc-ripple-left':
            this.leftPos = t
            break
          case '--mdc-ripple-top':
            this.topPos = t
        }
      },
      computeBoundingRect: () =>
        (this.parentElement || this).getBoundingClientRect(),
      getWindowPageOffset: () => ({
        x: window.pageXOffset,
        y: window.pageYOffset,
      }),
    }
  }
  startPress(e) {
    this.waitForFoundation(() => {
      this.mdcFoundation.activate(e)
    })
  }
  endPress() {
    this.waitForFoundation(() => {
      this.mdcFoundation.deactivate()
    })
  }
  startFocus() {
    this.waitForFoundation(() => {
      this.mdcFoundation.handleFocus()
    })
  }
  endFocus() {
    this.waitForFoundation(() => {
      this.mdcFoundation.handleBlur()
    })
  }
  startHover() {
    this.hovering = !0
  }
  endHover() {
    this.hovering = !1
  }
  waitForFoundation(e) {
    this.mdcFoundation ? e() : this.updateComplete.then(e)
  }
  update(e) {
    e.has('disabled') && this.disabled && this.endHover(), super.update(e)
  }
  render() {
    const e = this.activated && (this.primary || !this.accent),
      t = this.selected && (this.primary || !this.accent),
      o = {
        'mdc-ripple-surface--accent': this.accent,
        'mdc-ripple-surface--primary--activated': e,
        'mdc-ripple-surface--accent--activated': this.accent && this.activated,
        'mdc-ripple-surface--primary--selected': t,
        'mdc-ripple-surface--accent--selected': this.accent && this.selected,
        'mdc-ripple-surface--disabled': this.disabled,
        'mdc-ripple-surface--hover': this.hovering,
        'mdc-ripple-surface--primary': this.primary,
        'mdc-ripple-surface--selected': this.selected,
        'mdc-ripple-upgraded--background-focused': this.bgFocused,
        'mdc-ripple-upgraded--foreground-activation': this.fgActivation,
        'mdc-ripple-upgraded--foreground-deactivation': this.fgDeactivation,
        'mdc-ripple-upgraded--unbounded': this.unbounded,
        'mdc-ripple-surface--internal-use-state-layer-custom-properties':
          this.internalUseStateLayerCustomProperties,
      }
    return K`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${km(o)}"
          style="${Sm({
            '--mdc-ripple-fg-scale': this.fgScale,
            '--mdc-ripple-fg-size': this.fgSize,
            '--mdc-ripple-fg-translate-end': this.translateEnd,
            '--mdc-ripple-fg-translate-start': this.translateStart,
            '--mdc-ripple-left': this.leftPos,
            '--mdc-ripple-top': this.topPos,
          })}"></div>`
  }
}
sp([He('.mdc-ripple-surface')], Lm.prototype, 'mdcRoot', void 0),
  sp([ve({ type: Boolean })], Lm.prototype, 'primary', void 0),
  sp([ve({ type: Boolean })], Lm.prototype, 'accent', void 0),
  sp([ve({ type: Boolean })], Lm.prototype, 'unbounded', void 0),
  sp([ve({ type: Boolean })], Lm.prototype, 'disabled', void 0),
  sp([ve({ type: Boolean })], Lm.prototype, 'activated', void 0),
  sp([ve({ type: Boolean })], Lm.prototype, 'selected', void 0),
  sp(
    [ve({ type: Boolean })],
    Lm.prototype,
    'internalUseStateLayerCustomProperties',
    void 0
  ),
  sp([Ce()], Lm.prototype, 'hovering', void 0),
  sp([Ce()], Lm.prototype, 'bgFocused', void 0),
  sp([Ce()], Lm.prototype, 'fgActivation', void 0),
  sp([Ce()], Lm.prototype, 'fgDeactivation', void 0),
  sp([Ce()], Lm.prototype, 'fgScale', void 0),
  sp([Ce()], Lm.prototype, 'fgSize', void 0),
  sp([Ce()], Lm.prototype, 'translateStart', void 0),
  sp([Ce()], Lm.prototype, 'translateEnd', void 0),
  sp([Ce()], Lm.prototype, 'leftPos', void 0),
  sp([Ce()], Lm.prototype, 'topPos', void 0)
const xm = b`.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface:hover::before,.mdc-ripple-surface.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}:host .mdc-ripple-surface{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;will-change:unset}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary:hover::before,.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before,.mdc-ripple-surface--primary--activated::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--activated:hover::before,.mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--primary--selected::before,.mdc-ripple-surface--primary--selected::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--selected:hover::before,.mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent:hover::before,.mdc-ripple-surface--accent.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before,.mdc-ripple-surface--accent--activated::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--activated:hover::before,.mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--accent--selected::before,.mdc-ripple-surface--accent--selected::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--selected:hover::before,.mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--disabled{opacity:0}.mdc-ripple-surface--internal-use-state-layer-custom-properties::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties::after{background-color:#000;background-color:var(--mdc-ripple-hover-state-layer-color, #000)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:hover::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-state-layer-opacity, 0.04)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}`
let Vm = class extends Lm {}
function Em(e, t, o) {
  if (void 0 !== t)
    return (function (e, t, o) {
      const r = e.constructor
      if (!o) {
        const e = `__${t}`
        if (!(o = r.getPropertyDescriptor(t, e)))
          throw new Error(
            '@ariaProperty must be used after a @property decorator'
          )
      }
      const i = o
      let n = ''
      if (!i.set) throw new Error(`@ariaProperty requires a setter for ${t}`)
      if (e.dispatchWizEvent) return o
      const a = {
        configurable: !0,
        enumerable: !0,
        set(e) {
          if ('' === n) {
            const e = r.getPropertyOptions(t)
            n = 'string' == typeof e.attribute ? e.attribute : t
          }
          this.hasAttribute(n) && this.removeAttribute(n), i.set.call(this, e)
        },
      }
      return (
        i.get &&
          (a.get = function () {
            return i.get.call(this)
          }),
        a
      )
    })(e, t, o)
  throw new Error('@ariaProperty only supports TypeScript Decorators')
}
;(Vm.styles = [xm]), (Vm = sp([ye('mwc-ripple')], Vm))
class Mm {
  constructor(e) {
    ;(this.startPress = (t) => {
      e().then((e) => {
        e && e.startPress(t)
      })
    }),
      (this.endPress = () => {
        e().then((e) => {
          e && e.endPress()
        })
      }),
      (this.startFocus = () => {
        e().then((e) => {
          e && e.startFocus()
        })
      }),
      (this.endFocus = () => {
        e().then((e) => {
          e && e.endFocus()
        })
      }),
      (this.startHover = () => {
        e().then((e) => {
          e && e.startHover()
        })
      }),
      (this.endHover = () => {
        e().then((e) => {
          e && e.endHover()
        })
      })
  }
}
const Pm = (e) => (null != e ? e : X)
class Tm extends _e {
  constructor() {
    super(...arguments),
      (this.raised = !1),
      (this.unelevated = !1),
      (this.outlined = !1),
      (this.dense = !1),
      (this.disabled = !1),
      (this.trailingIcon = !1),
      (this.fullwidth = !1),
      (this.icon = ''),
      (this.label = ''),
      (this.expandContent = !1),
      (this.shouldRenderRipple = !1),
      (this.rippleHandlers = new Mm(
        () => ((this.shouldRenderRipple = !0), this.ripple)
      ))
  }
  renderOverlay() {
    return K``
  }
  renderRipple() {
    const e = this.raised || this.unelevated
    return this.shouldRenderRipple
      ? K`<mwc-ripple class="ripple" .primary="${!e}" .disabled="${
          this.disabled
        }"></mwc-ripple>`
      : ''
  }
  focus() {
    const e = this.buttonElement
    e && (this.rippleHandlers.startFocus(), e.focus())
  }
  blur() {
    const e = this.buttonElement
    e && (this.rippleHandlers.endFocus(), e.blur())
  }
  getRenderClasses() {
    return {
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      'mdc-button--dense': this.dense,
    }
  }
  render() {
    return K`
      <button
          id="button"
          class="mdc-button ${km(this.getRenderClasses())}"
          ?disabled="${this.disabled}"
          aria-label="${this.label || this.icon}"
          aria-haspopup="${Pm(this.ariaHasPopup)}"
          @focus="${this.handleRippleFocus}"
          @blur="${this.handleRippleBlur}"
          @mousedown="${this.handleRippleActivate}"
          @mouseenter="${this.handleRippleMouseEnter}"
          @mouseleave="${this.handleRippleMouseLeave}"
          @touchstart="${this.handleRippleActivate}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}">
        ${this.renderOverlay()}
        ${this.renderRipple()}
        <span class="leading-icon">
          <slot name="icon">
            ${this.icon && !this.trailingIcon ? this.renderIcon() : ''}
          </slot>
        </span>
        <span class="mdc-button__label">${this.label}</span>
        <span class="slot-container ${km({ flex: this.expandContent })}">
          <slot></slot>
        </span>
        <span class="trailing-icon">
          <slot name="trailingIcon">
            ${this.icon && this.trailingIcon ? this.renderIcon() : ''}
          </slot>
        </span>
      </button>`
  }
  renderIcon() {
    return K`
    <mwc-icon class="mdc-button__icon">
      ${this.icon}
    </mwc-icon>`
  }
  handleRippleActivate(e) {
    const t = () => {
      window.removeEventListener('mouseup', t), this.handleRippleDeactivate()
    }
    window.addEventListener('mouseup', t), this.rippleHandlers.startPress(e)
  }
  handleRippleDeactivate() {
    this.rippleHandlers.endPress()
  }
  handleRippleMouseEnter() {
    this.rippleHandlers.startHover()
  }
  handleRippleMouseLeave() {
    this.rippleHandlers.endHover()
  }
  handleRippleFocus() {
    this.rippleHandlers.startFocus()
  }
  handleRippleBlur() {
    this.rippleHandlers.endFocus()
  }
}
;(Tm.shadowRootOptions = { mode: 'open', delegatesFocus: !0 }),
  sp(
    [Em, ve({ type: String, attribute: 'aria-haspopup' })],
    Tm.prototype,
    'ariaHasPopup',
    void 0
  ),
  sp([ve({ type: Boolean, reflect: !0 })], Tm.prototype, 'raised', void 0),
  sp([ve({ type: Boolean, reflect: !0 })], Tm.prototype, 'unelevated', void 0),
  sp([ve({ type: Boolean, reflect: !0 })], Tm.prototype, 'outlined', void 0),
  sp([ve({ type: Boolean })], Tm.prototype, 'dense', void 0),
  sp([ve({ type: Boolean, reflect: !0 })], Tm.prototype, 'disabled', void 0),
  sp(
    [ve({ type: Boolean, attribute: 'trailingicon' })],
    Tm.prototype,
    'trailingIcon',
    void 0
  ),
  sp([ve({ type: Boolean, reflect: !0 })], Tm.prototype, 'fullwidth', void 0),
  sp([ve({ type: String })], Tm.prototype, 'icon', void 0),
  sp([ve({ type: String })], Tm.prototype, 'label', void 0),
  sp([ve({ type: Boolean })], Tm.prototype, 'expandContent', void 0),
  sp([He('#button')], Tm.prototype, 'buttonElement', void 0),
  sp([ke('mwc-ripple')], Tm.prototype, 'ripple', void 0),
  sp([Ce()], Tm.prototype, 'shouldRenderRipple', void 0),
  sp([we({ passive: !0 })], Tm.prototype, 'handleRippleActivate', null)
const zm = b`.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase)}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:transparent}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:transparent}.mdc-button{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised,.mdc-button--unelevated{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0, 0, 0, 0.12)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--raised .mdc-button__ripple,.mdc-button--unelevated .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button--outlined:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--outlined .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--outlined .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined:disabled{border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined.mdc-button--icon-trailing{padding:0 11px 0 15px}.mdc-button--outlined.mdc-button--icon-leading{padding:0 15px 0 11px}.mdc-button--outlined .mdc-button__ripple{top:calc(-1 * 1px);left:calc(-1 * 1px);border-width:1px}.mdc-button--outlined .mdc-button__touch{left:calc(-1 * 1px);width:calc(100% + 2 * 1px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:transparent;vertical-align:top}:host([fullwidth]){width:100%}:host([raised]),:host([unelevated]){--mdc-ripple-color:#fff;--mdc-ripple-focus-opacity:0.24;--mdc-ripple-hover-opacity:0.08;--mdc-ripple-press-opacity:0.24}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon,.leading-icon ::slotted(*),.leading-icon .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}[dir=rtl] .trailing-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,[dir=rtl] .leading-icon ::slotted(*),[dir=rtl] .leading-icon .mdc-button__icon,.trailing-icon ::slotted(*[dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl],.leading-icon ::slotted(*[dir=rtl]),.leading-icon .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .trailing-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon ::slotted(*[dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}.slot-container{display:inline-flex;align-items:center;justify-content:center}.slot-container.flex{flex:auto}.mdc-button{flex:auto;overflow:hidden;padding-left:8px;padding-left:var(--mdc-button-horizontal-padding, 8px);padding-right:8px;padding-right:var(--mdc-button-horizontal-padding, 8px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-focus, var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)))}.mdc-button--raised:hover{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-active, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-disabled, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised,.mdc-button--unelevated{padding-left:16px;padding-left:var(--mdc-button-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mdc-button-horizontal-padding, 16px)}.mdc-button--outlined{border-width:1px;border-width:var(--mdc-button-outline-width, 1px);padding-left:calc(16px - 1px);padding-left:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));padding-right:calc(16px - 1px);padding-right:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px))}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-outline-color, rgba(0, 0, 0, 0.12))}.mdc-button--outlined .ripple{top:calc(-1 * 1px);top:calc(-1 * var(--mdc-button-outline-width, 1px));left:calc(-1 * 1px);left:calc(-1 * var(--mdc-button-outline-width, 1px));right:initial;right:initial;border-width:1px;border-width:var(--mdc-button-outline-width, 1px);border-style:solid;border-color:transparent}[dir=rtl] .mdc-button--outlined .ripple,.mdc-button--outlined .ripple[dir=rtl]{left:initial;left:initial;right:calc(-1 * 1px);right:calc(-1 * var(--mdc-button-outline-width, 1px))}.mdc-button--dense{height:28px;margin-top:0;margin-bottom:0}.mdc-button--dense .mdc-button__touch{height:100%}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-button{color:rgba(0, 0, 0, 0.38);color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button--raised,:host([disabled]) .mdc-button--unelevated{background-color:rgba(0, 0, 0, 0.12);background-color:var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12))}:host([disabled]) .mdc-button--outlined{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-disabled-outline-color, rgba(0, 0, 0, 0.12))}`
let Nm = class extends Tm {}
;(Nm.styles = [zm]), (Nm = sp([ye('mwc-button')], Nm))
class Im extends _e {
  constructor() {
    super(...arguments),
      (this.disabled = !1),
      (this.icon = ''),
      (this.shouldRenderRipple = !1),
      (this.rippleHandlers = new Mm(
        () => ((this.shouldRenderRipple = !0), this.ripple)
      ))
  }
  renderRipple() {
    return this.shouldRenderRipple
      ? K`
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>`
      : ''
  }
  focus() {
    const e = this.buttonElement
    e && (this.rippleHandlers.startFocus(), e.focus())
  }
  blur() {
    const e = this.buttonElement
    e && (this.rippleHandlers.endFocus(), e.blur())
  }
  render() {
    return K`<button
        class="mdc-icon-button mdc-icon-button--display-flex"
        aria-label="${this.ariaLabel || this.icon}"
        aria-haspopup="${Pm(this.ariaHasPopup)}"
        ?disabled="${this.disabled}"
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
    >${this.renderRipple()}
    <i class="material-icons">${this.icon}</i>
    <span
      ><slot></slot
    ></span>
  </button>`
  }
  handleRippleMouseDown(e) {
    const t = () => {
      window.removeEventListener('mouseup', t), this.handleRippleDeactivate()
    }
    window.addEventListener('mouseup', t), this.rippleHandlers.startPress(e)
  }
  handleRippleTouchStart(e) {
    this.rippleHandlers.startPress(e)
  }
  handleRippleDeactivate() {
    this.rippleHandlers.endPress()
  }
  handleRippleMouseEnter() {
    this.rippleHandlers.startHover()
  }
  handleRippleMouseLeave() {
    this.rippleHandlers.endHover()
  }
  handleRippleFocus() {
    this.rippleHandlers.startFocus()
  }
  handleRippleBlur() {
    this.rippleHandlers.endFocus()
  }
}
sp([ve({ type: Boolean, reflect: !0 })], Im.prototype, 'disabled', void 0),
  sp([ve({ type: String })], Im.prototype, 'icon', void 0),
  sp(
    [Em, ve({ type: String, attribute: 'aria-label' })],
    Im.prototype,
    'ariaLabel',
    void 0
  ),
  sp(
    [Em, ve({ type: String, attribute: 'aria-haspopup' })],
    Im.prototype,
    'ariaHasPopup',
    void 0
  ),
  sp([He('button')], Im.prototype, 'buttonElement', void 0),
  sp([ke('mwc-ripple')], Im.prototype, 'ripple', void 0),
  sp([Ce()], Im.prototype, 'shouldRenderRipple', void 0),
  sp([we({ passive: !0 })], Im.prototype, 'handleRippleMouseDown', null),
  sp([we({ passive: !0 })], Im.prototype, 'handleRippleTouchStart', null)
const Om = b`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button.mdc-icon-button--reduced-size .mdc-icon-button__ripple{width:40px;height:40px;margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}:host{display:inline-block;outline:none}:host([disabled]){pointer-events:none}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block}:host{--mdc-ripple-color: currentcolor;-webkit-tap-highlight-color:transparent}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc( (var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2 )}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`
let Rm = class extends Im {}
;(Rm.styles = [Om]), (Rm = sp([ye('mwc-icon-button')], Rm))
let Dm = s(
  [ye('ha-svg-icon')],
  function (e, t) {
    return {
      F: class extends t {
        constructor(...t) {
          super(...t), e(this)
        }
      },
      d: [
        { kind: 'field', decorators: [ve()], key: 'path', value: void 0 },
        { kind: 'field', decorators: [ve()], key: 'viewBox', value: void 0 },
        {
          kind: 'method',
          key: 'render',
          value: function () {
            return Y`
    <svg
      viewBox=${this.viewBox || '0 0 24 24'}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      role="img"
      aria-hidden="true"
    >
      <g>
      ${this.path ? Y`<path d=${this.path}></path>` : ''}
      </g>
    </svg>`
          },
        },
        {
          kind: 'get',
          static: !0,
          key: 'styles',
          value: function () {
            return b`
      :host {
        display: var(--ha-icon-display, inline-flex);
        align-items: center;
        justify-content: center;
        position: relative;
        vertical-align: middle;
        fill: currentcolor;
        width: var(--mdc-icon-size, 24px);
        height: var(--mdc-icon-size, 24px);
      }
      svg {
        width: 100%;
        height: 100%;
        pointer-events: none;
        display: block;
      }
    `
          },
        },
      ],
    }
  },
  _e
)
s(
  [ye('ha-icon-button')],
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
          decorators: [ve({ type: Boolean, reflect: !0 })],
          key: 'disabled',
          value: () => !1,
        },
        {
          kind: 'field',
          decorators: [ve({ type: String })],
          key: 'path',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [ve({ type: String })],
          key: 'label',
          value: () => '',
        },
        {
          kind: 'field',
          decorators: [ve({ type: Boolean })],
          key: 'hideTitle',
          value: () => !1,
        },
        {
          kind: 'field',
          static: !0,
          key: 'shadowRootOptions',
          value: () => ({ mode: 'open', delegatesFocus: !0 }),
        },
        {
          kind: 'method',
          key: 'render',
          value: function () {
            return K`
      <mwc-icon-button
        .ariaLabel=${this.label}
        .title=${this.hideTitle ? '' : this.label}
        .disabled=${this.disabled}
      >
        ${
          this.path
            ? K`<ha-svg-icon .path=${this.path}></ha-svg-icon>`
            : K`<slot></slot>`
        }
      </mwc-icon-button>
    `
          },
        },
        {
          kind: 'get',
          static: !0,
          key: 'styles',
          value: function () {
            return b`
      :host {
        display: inline-block;
        outline: none;
      }
      :host([disabled]) {
        pointer-events: none;
      }
      mwc-icon-button {
        --mdc-theme-on-primary: currentColor;
        --mdc-theme-text-disabled-on-light: var(--disabled-text-color);
      }
    `
          },
        },
      ],
    }
  },
  _e
),
  s(
    [ye('ha-icon-button-arrow-prev')],
    function (e, o) {
      class i extends o {
        constructor(...t) {
          super(...t), e(this)
        }
      }
      return {
        F: i,
        d: [
          {
            kind: 'field',
            decorators: [ve({ attribute: !1 })],
            key: 'hass',
            value: void 0,
          },
          {
            kind: 'field',
            decorators: [ve({ type: Boolean })],
            key: 'disabled',
            value: () => !1,
          },
          { kind: 'field', decorators: [ve()], key: 'label', value: void 0 },
          { kind: 'field', decorators: [Ce()], key: '_icon', value: () => Hs },
          {
            kind: 'method',
            key: 'connectedCallback',
            value: function () {
              r(t(i.prototype), 'connectedCallback', this).call(this),
                setTimeout(() => {
                  this._icon =
                    'ltr' === window.getComputedStyle(this).direction ? Hs : ks
                }, 100)
            },
          },
          {
            kind: 'method',
            key: 'render',
            value: function () {
              var e
              return K`
      <ha-icon-button
        .disabled=${this.disabled}
        .label=${
          this.label ||
          (null === (e = this.hass) || void 0 === e
            ? void 0
            : e.localize('ui.common.back')) ||
          'Back'
        }
        .path=${this._icon}
      ></ha-icon-button>
    `
            },
          },
        ],
      }
    },
    _e
  )
const jm = (e) => {
    let t = []
    function o(o, r) {
      e = r ? o : Object.assign(Object.assign({}, e), o)
      let i = t
      for (let t = 0; t < i.length; t++) i[t](e)
    }
    return {
      get state() {
        return e
      },
      action(t) {
        function r(e) {
          o(e, !1)
        }
        return function () {
          let o = [e]
          for (let e = 0; e < arguments.length; e++) o.push(arguments[e])
          let i = t.apply(this, o)
          if (null != i) return i instanceof Promise ? i.then(r) : r(i)
        }
      },
      setState: o,
      subscribe: (e) => (
        t.push(e),
        () => {
          !(function (e) {
            let o = []
            for (let r = 0; r < t.length; r++)
              t[r] === e ? (e = null) : o.push(t[r])
            t = o
          })(e)
        }
      ),
    }
  },
  Bm = (e, t, o, r, i) =>
    ((e, t, o, r) => {
      if (e[t]) return e[t]
      let i,
        n = 0,
        a = jm()
      const s = () => {
          if (!o) throw new Error('Collection does not support refresh')
          return o(e).then((e) => a.setState(e, !0))
        },
        l = () =>
          s().catch((t) => {
            if (e.connected) throw t
          })
      return (
        (e[t] = {
          get state() {
            return a.state
          },
          refresh: s,
          subscribe(t) {
            n++,
              1 === n &&
                (r && (i = r(e, a)), o && (e.addEventListener('ready', l), l()))
            const d = a.subscribe(t)
            return (
              void 0 !== a.state && setTimeout(() => t(a.state), 0),
              () => {
                d(),
                  n--,
                  n ||
                    (i &&
                      i.then((e) => {
                        e()
                      }),
                    e.removeEventListener('ready', s))
              }
            )
          },
        }),
        e[t]
      )
    })(r, e, t, o).subscribe(i),
  $m = (e) => e.sendMessagePromise({ type: 'persistent_notification/get' }),
  Fm = (e, t) =>
    e.subscribeEvents(
      () => $m(e).then((e) => t.setState(e, !0)),
      'persistent_notifications_updated'
    )
s(
  [ye('ha-menu-button')],
  function (e, o) {
    class i extends o {
      constructor(...t) {
        super(...t), e(this)
      }
    }
    return {
      F: i,
      d: [
        {
          kind: 'field',
          decorators: [ve({ type: Boolean })],
          key: 'hassio',
          value: () => !1,
        },
        { kind: 'field', decorators: [ve()], key: 'narrow', value: void 0 },
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'hass',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [Ce()],
          key: '_hasNotifications',
          value: () => !1,
        },
        { kind: 'field', key: '_alwaysVisible', value: () => !1 },
        { kind: 'field', key: '_attachNotifOnConnect', value: () => !1 },
        { kind: 'field', key: '_unsubNotifications', value: void 0 },
        {
          kind: 'method',
          key: 'connectedCallback',
          value: function () {
            r(t(i.prototype), 'connectedCallback', this).call(this),
              this._attachNotifOnConnect &&
                ((this._attachNotifOnConnect = !1),
                this._subscribeNotifications())
          },
        },
        {
          kind: 'method',
          key: 'disconnectedCallback',
          value: function () {
            r(t(i.prototype), 'disconnectedCallback', this).call(this),
              this._unsubNotifications &&
                ((this._attachNotifOnConnect = !0),
                this._unsubNotifications(),
                (this._unsubNotifications = void 0))
          },
        },
        {
          kind: 'method',
          key: 'render',
          value: function () {
            const e =
              this._hasNotifications &&
              (this.narrow || 'always_hidden' === this.hass.dockedSidebar)
            return K`
      <ha-icon-button
        .label=${this.hass.localize('ui.sidebar.sidebar_toggle')}
        .path=${'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z'}
        @click=${this._toggleMenu}
      ></ha-icon-button>
      ${e ? K`<div class="dot"></div>` : ''}
    `
          },
        },
        {
          kind: 'method',
          key: 'firstUpdated',
          value: function (e) {
            r(t(i.prototype), 'firstUpdated', this).call(this, e),
              this.hassio &&
                (this._alwaysVisible =
                  (Number(window.parent.frontendVersion) || 0) < 20190710)
          },
        },
        {
          kind: 'method',
          key: 'updated',
          value: function (e) {
            if (
              (r(t(i.prototype), 'updated', this).call(this, e),
              !e.has('narrow') && !e.has('hass'))
            )
              return
            const o = e.get('hass'),
              n = e.get('narrow') || (o && 'always_hidden' === o.dockedSidebar),
              a = this.narrow || 'always_hidden' === this.hass.dockedSidebar
            n !== a &&
              ((this.style.display =
                a || this._alwaysVisible ? 'initial' : 'none'),
              a
                ? this._subscribeNotifications()
                : this._unsubNotifications &&
                  (this._unsubNotifications(),
                  (this._unsubNotifications = void 0)))
          },
        },
        {
          kind: 'method',
          key: '_subscribeNotifications',
          value: function () {
            var e
            this._unsubNotifications =
              ((e = this.hass.connection),
              Bm('_ntf', $m, Fm, e, (e) => {
                this._hasNotifications = e.length > 0
              }))
          },
        },
        {
          kind: 'method',
          key: '_toggleMenu',
          value: function () {
            Qe(this, 'hass-toggle-menu')
          },
        },
        {
          kind: 'get',
          static: !0,
          key: 'styles',
          value: function () {
            return b`
      :host {
        position: relative;
      }
      .dot {
        pointer-events: none;
        position: absolute;
        background-color: var(--accent-color);
        width: 12px;
        height: 12px;
        top: 9px;
        right: 7px;
        border-radius: 50%;
        border: 2px solid var(--app-header-background-color);
      }
    `
          },
        },
      ],
    }
  },
  _e
),
  s(
    [ye('hass-error-screen')],
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
            decorators: [ve({ attribute: !1 })],
            key: 'hass',
            value: void 0,
          },
          {
            kind: 'field',
            decorators: [ve({ type: Boolean })],
            key: 'toolbar',
            value: () => !0,
          },
          {
            kind: 'field',
            decorators: [ve({ type: Boolean })],
            key: 'rootnav',
            value: () => !1,
          },
          {
            kind: 'field',
            decorators: [ve({ type: Boolean })],
            key: 'narrow',
            value: () => !1,
          },
          { kind: 'field', decorators: [ve()], key: 'error', value: void 0 },
          {
            kind: 'method',
            key: 'render',
            value: function () {
              var e, t
              return K`
      ${
        this.toolbar
          ? K`<div class="toolbar">
            ${
              this.rootnav ||
              (null !== (e = history.state) && void 0 !== e && e.root)
                ? K`
                  <ha-menu-button
                    .hass=${this.hass}
                    .narrow=${this.narrow}
                  ></ha-menu-button>
                `
                : K`
                  <ha-icon-button-arrow-prev
                    .hass=${this.hass}
                    @click=${this._handleBack}
                  ></ha-icon-button-arrow-prev>
                `
            }
          </div>`
          : ''
      }
      <div class="content">
        <h3>${this.error}</h3>
        <slot>
          <mwc-button @click=${this._handleBack}>
            ${
              (null === (t = this.hass) || void 0 === t
                ? void 0
                : t.localize('ui.panel.error.go_back')) || 'go back'
            }
          </mwc-button>
        </slot>
      </div>
    `
            },
          },
          {
            kind: 'method',
            key: '_handleBack',
            value: function () {
              history.back()
            },
          },
          {
            kind: 'get',
            static: !0,
            key: 'styles',
            value: function () {
              return [
                b`
        :host {
          display: block;
          height: 100%;
          background-color: var(--primary-background-color);
        }
        .toolbar {
          display: flex;
          align-items: center;
          font-size: 20px;
          height: var(--header-height);
          padding: 0 16px;
          pointer-events: none;
          background-color: var(--app-header-background-color);
          font-weight: 400;
          color: var(--app-header-text-color, white);
          border-bottom: var(--app-header-border-bottom, none);
          box-sizing: border-box;
        }
        ha-icon-button-arrow-prev {
          pointer-events: auto;
        }
        .content {
          color: var(--primary-text-color);
          height: calc(100% - var(--header-height));
          display: flex;
          padding: 16px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        a {
          color: var(--primary-color);
        }
      `,
              ]
            },
          },
        ],
      }
    },
    _e
  ),
  Dn({
    _template: la`
    <style>

      :host {
        @apply --layout-horizontal;
        @apply --layout-center;
        position: relative;
        height: 64px;
        padding: 0 16px;
        pointer-events: none;
        font-size: var(--app-toolbar-font-size, 20px);
      }

      :host ::slotted(*) {
        pointer-events: auto;
      }

      :host ::slotted(paper-icon-button) {
        /* paper-icon-button/issues/33 */
        font-size: 0;
      }

      :host ::slotted([main-title]),
      :host ::slotted([condensed-title]) {
        pointer-events: none;
        @apply --layout-flex;
      }

      :host ::slotted([bottom-item]) {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
      }

      :host ::slotted([top-item]) {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
      }

      :host ::slotted([spacer]) {
        margin-left: 64px;
      }
    </style>

    <slot></slot>
`,
    is: 'app-toolbar',
  })
class Um extends _e {
  constructor() {
    super(...arguments),
      (this.indeterminate = !1),
      (this.progress = 0),
      (this.density = 0),
      (this.closed = !1)
  }
  open() {
    this.closed = !1
  }
  close() {
    this.closed = !0
  }
  render() {
    const e = {
        'mdc-circular-progress--closed': this.closed,
        'mdc-circular-progress--indeterminate': this.indeterminate,
      },
      t = 48 + 4 * this.density,
      o = { width: `${t}px`, height: `${t}px` }
    return K`
      <div
        class="mdc-circular-progress ${km(e)}"
        style="${Sm(o)}"
        role="progressbar"
        aria-label="${Pm(this.ariaLabel)}"
        aria-valuemin="0"
        aria-valuemax="1"
        aria-valuenow="${Pm(this.indeterminate ? void 0 : this.progress)}">
        ${this.renderDeterminateContainer()}
        ${this.renderIndeterminateContainer()}
      </div>`
  }
  renderDeterminateContainer() {
    const e = 48 + 4 * this.density,
      t = e / 2,
      o =
        this.density >= -3
          ? 18 + (11 * this.density) / 6
          : 12.5 + (5 * (this.density + 3)) / 4,
      r = 6.2831852 * o,
      i = (1 - this.progress) * r,
      n =
        this.density >= -3
          ? 4 + this.density * (1 / 3)
          : 3 + (this.density + 3) * (1 / 6)
    return K`
      <div class="mdc-circular-progress__determinate-container">
        <svg class="mdc-circular-progress__determinate-circle-graphic"
             viewBox="0 0 ${e} ${e}">
          <circle class="mdc-circular-progress__determinate-track"
                  cx="${t}" cy="${t}" r="${o}"
                  stroke-width="${n}"></circle>
          <circle class="mdc-circular-progress__determinate-circle"
                  cx="${t}" cy="${t}" r="${o}"
                  stroke-dasharray="${6.2831852 * o}"
                  stroke-dashoffset="${i}"
                  stroke-width="${n}"></circle>
        </svg>
      </div>`
  }
  renderIndeterminateContainer() {
    return K`
      <div class="mdc-circular-progress__indeterminate-container">
        <div class="mdc-circular-progress__spinner-layer">
          ${this.renderIndeterminateSpinnerLayer()}
        </div>
      </div>`
  }
  renderIndeterminateSpinnerLayer() {
    const e = 48 + 4 * this.density,
      t = e / 2,
      o =
        this.density >= -3
          ? 18 + (11 * this.density) / 6
          : 12.5 + (5 * (this.density + 3)) / 4,
      r = 6.2831852 * o,
      i = 0.5 * r,
      n =
        this.density >= -3
          ? 4 + this.density * (1 / 3)
          : 3 + (this.density + 3) * (1 / 6)
    return K`
        <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
          <svg class="mdc-circular-progress__indeterminate-circle-graphic"
               viewBox="0 0 ${e} ${e}">
            <circle cx="${t}" cy="${t}" r="${o}"
                    stroke-dasharray="${r}"
                    stroke-dashoffset="${i}"
                    stroke-width="${n}"></circle>
          </svg>
        </div>
        <div class="mdc-circular-progress__gap-patch">
          <svg class="mdc-circular-progress__indeterminate-circle-graphic"
               viewBox="0 0 ${e} ${e}">
            <circle cx="${t}" cy="${t}" r="${o}"
                    stroke-dasharray="${r}"
                    stroke-dashoffset="${i}"
                    stroke-width="${0.8 * n}"></circle>
          </svg>
        </div>
        <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
          <svg class="mdc-circular-progress__indeterminate-circle-graphic"
               viewBox="0 0 ${e} ${e}">
            <circle cx="${t}" cy="${t}" r="${o}"
                    stroke-dasharray="${r}"
                    stroke-dashoffset="${i}"
                    stroke-width="${n}"></circle>
          </svg>
        </div>`
  }
  update(e) {
    super.update(e),
      e.has('progress') &&
        (this.progress > 1 && (this.progress = 1),
        this.progress < 0 && (this.progress = 0))
  }
}
sp([ve({ type: Boolean, reflect: !0 })], Um.prototype, 'indeterminate', void 0),
  sp([ve({ type: Number, reflect: !0 })], Um.prototype, 'progress', void 0),
  sp([ve({ type: Number, reflect: !0 })], Um.prototype, 'density', void 0),
  sp([ve({ type: Boolean, reflect: !0 })], Um.prototype, 'closed', void 0),
  sp(
    [Em, ve({ type: String, attribute: 'aria-label' })],
    Um.prototype,
    'ariaLabel',
    void 0
  )
const Zm = b`.mdc-circular-progress__determinate-circle,.mdc-circular-progress__indeterminate-circle-graphic{stroke:#6200ee;stroke:var(--mdc-theme-primary, #6200ee)}.mdc-circular-progress__determinate-track{stroke:transparent}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-color-1-fade-in-out{from{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@keyframes mdc-circular-progress-color-2-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-3-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-4-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}.mdc-circular-progress{display:inline-flex;position:relative;direction:ltr;line-height:0;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:transparent}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-1{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-2{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-3{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-4{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--closed{opacity:0}:host{display:inline-flex}.mdc-circular-progress__determinate-track{stroke:transparent;stroke:var(--mdc-circular-progress-track-color, transparent)}`
let qm = class extends Um {}
;(qm.styles = [Zm]),
  (qm = sp([ye('mwc-circular-progress')], qm)),
  s(
    [ye('ha-circular-progress')],
    function (e, o) {
      class i extends o {
        constructor(...t) {
          super(...t), e(this)
        }
      }
      return {
        F: i,
        d: [
          {
            kind: 'field',
            decorators: [ve({ type: Boolean })],
            key: 'active',
            value: () => !1,
          },
          {
            kind: 'field',
            decorators: [ve()],
            key: 'alt',
            value: () => 'Loading',
          },
          {
            kind: 'field',
            decorators: [ve()],
            key: 'size',
            value: () => 'medium',
          },
          { kind: 'set', key: 'density', value: function (e) {} },
          {
            kind: 'get',
            key: 'density',
            value: function () {
              switch (this.size) {
                case 'tiny':
                  return -8
                case 'small':
                  return -5
                case 'medium':
                default:
                  return 0
                case 'large':
                  return 5
              }
            },
          },
          { kind: 'set', key: 'indeterminate', value: function (e) {} },
          {
            kind: 'get',
            key: 'indeterminate',
            value: function () {
              return this.active
            },
          },
          {
            kind: 'get',
            static: !0,
            key: 'styles',
            value: function () {
              return [
                r(t(i), 'styles', this),
                b`
        :host {
          overflow: hidden;
        }
      `,
              ]
            },
          },
        ],
      }
    },
    qm
  ),
  s(
    [ye('hass-loading-screen')],
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
            decorators: [ve({ attribute: !1 })],
            key: 'hass',
            value: void 0,
          },
          {
            kind: 'field',
            decorators: [ve({ type: Boolean, attribute: 'no-toolbar' })],
            key: 'noToolbar',
            value: () => !1,
          },
          {
            kind: 'field',
            decorators: [ve({ type: Boolean })],
            key: 'rootnav',
            value: () => !1,
          },
          {
            kind: 'field',
            decorators: [ve({ type: Boolean })],
            key: 'narrow',
            value: () => !1,
          },
          {
            kind: 'method',
            key: 'render',
            value: function () {
              var e
              return K`
      ${
        this.noToolbar
          ? ''
          : K`<div class="toolbar">
            ${
              this.rootnav ||
              (null !== (e = history.state) && void 0 !== e && e.root)
                ? K`
                  <ha-menu-button
                    .hass=${this.hass}
                    .narrow=${this.narrow}
                  ></ha-menu-button>
                `
                : K`
                  <ha-icon-button-arrow-prev
                    .hass=${this.hass}
                    @click=${this._handleBack}
                  ></ha-icon-button-arrow-prev>
                `
            }
          </div>`
      }
      <div class="content">
        <ha-circular-progress active></ha-circular-progress>
      </div>
    `
            },
          },
          {
            kind: 'method',
            key: '_handleBack',
            value: function () {
              history.back()
            },
          },
          {
            kind: 'get',
            static: !0,
            key: 'styles',
            value: function () {
              return [
                Pe,
                b`
        :host {
          display: block;
          height: 100%;
          background-color: var(--primary-background-color);
        }
        .toolbar {
          display: flex;
          align-items: center;
          font-size: 20px;
          height: var(--header-height);
          padding: 0 16px;
          pointer-events: none;
          background-color: var(--app-header-background-color);
          font-weight: 400;
          color: var(--app-header-text-color, white);
          border-bottom: var(--app-header-border-bottom, none);
          box-sizing: border-box;
        }
        ha-menu-button,
        ha-icon-button-arrow-prev {
          pointer-events: auto;
        }
        .content {
          height: calc(100% - var(--header-height));
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `,
              ]
            },
          },
        ],
      }
    },
    _e
  )
let Gm = s(
  null,
  function (e, o) {
    class i extends o {
      constructor(...t) {
        super(...t), e(this)
      }
    }
    return {
      F: i,
      d: [
        { kind: 'field', decorators: [ve()], key: 'route', value: void 0 },
        { kind: 'field', key: 'routerOptions', value: void 0 },
        { kind: 'field', key: '_currentPage', value: () => '' },
        { kind: 'field', key: '_currentLoadProm', value: void 0 },
        { kind: 'field', key: '_cache', value: () => ({}) },
        { kind: 'field', key: '_initialLoadDone', value: () => !1 },
        {
          kind: 'field',
          key: '_computeTail',
          value: () =>
            os((e) => {
              const t = e.path.indexOf('/', 1)
              return -1 === t
                ? { prefix: e.prefix + e.path, path: '' }
                : {
                    prefix: e.prefix + e.path.substr(0, t),
                    path: e.path.substr(t),
                  }
            }),
        },
        {
          kind: 'method',
          key: 'createRenderRoot',
          value: function () {
            return this
          },
        },
        {
          kind: 'method',
          key: 'update',
          value: function (e) {
            r(t(i.prototype), 'update', this).call(this, e)
            const o = this.routerOptions || { routes: {} }
            if (o && o.initialLoad && !this._initialLoadDone) return
            if (!e.has('route'))
              return void (
                this.lastChild &&
                !this._currentLoadProm &&
                this.updatePageEl(this.lastChild, e)
              )
            const n = this.route,
              a = o.defaultPage
            n &&
              '' === n.path &&
              void 0 !== a &&
              ot(`${n.prefix}/${a}`, { replace: !0 })
            let s = n
                ? ((e, t) => {
                    if ('' === e) return t
                    const o = e.indexOf('/', 1)
                    return -1 === o ? e.substr(1) : e.substr(1, o - 1)
                  })(n.path, a || '')
                : 'not_found',
              l = o.routes[s]
            for (; 'string' == typeof l; ) (s = l), (l = o.routes[s])
            if (o.beforeRender) {
              const e = o.beforeRender(s)
              if (void 0 !== e) {
                for (s = e, l = o.routes[s]; 'string' == typeof l; )
                  (s = l), (l = o.routes[s])
                n && ot(`${n.prefix}/${e}${location.search}`, { replace: !0 })
              }
            }
            if (this._currentPage === s)
              return void (
                this.lastChild && this.updatePageEl(this.lastChild, e)
              )
            if (!l)
              return (
                (this._currentPage = ''),
                void (this.lastChild && this.removeChild(this.lastChild))
              )
            this._currentPage = s
            const d = l.load ? l.load() : Promise.resolve()
            let c
            if (
              (d.catch((e) => {
                console.error('Error loading page', s, e),
                  this._currentPage === s &&
                    (this.lastChild && this.removeChild(this.lastChild),
                    c && clearTimeout(c),
                    this.appendChild(
                      this.createErrorScreen(`Error while loading page ${s}.`)
                    ))
              }),
              !o.showLoading)
            )
              return void this._createPanel(o, s, l)
            let p = !1
            ;(c = window.setTimeout(() => {
              p ||
                this._currentPage !== s ||
                (this.lastChild && this.removeChild(this.lastChild),
                this.appendChild(this.createLoadingScreen()))
            }, 400)),
              (this._currentLoadProm = d.then(
                () => {
                  ;(this._currentLoadProm = void 0),
                    this._currentPage === s &&
                      ((p = !0), this._createPanel(o, s, l))
                },
                () => {
                  this._currentLoadProm = void 0
                }
              ))
          },
        },
        {
          kind: 'method',
          key: 'firstUpdated',
          value: function (e) {
            r(t(i.prototype), 'firstUpdated', this).call(this, e)
            const o = this.routerOptions
            o &&
              (o.preloadAll &&
                Object.values(o.routes).forEach(
                  (e) => 'object' == typeof e && e.load && e.load()
                ),
              o.initialLoad &&
                (setTimeout(() => {
                  this._initialLoadDone ||
                    this.appendChild(this.createLoadingScreen())
                }, 400),
                o.initialLoad().then(() => {
                  ;(this._initialLoadDone = !0), this.requestUpdate('route')
                })))
          },
        },
        {
          kind: 'method',
          key: 'createLoadingScreen',
          value: function () {
            return document.createElement('hass-loading-screen')
          },
        },
        {
          kind: 'method',
          key: 'createErrorScreen',
          value: function (e) {
            const t = document.createElement('hass-error-screen')
            return (t.error = e), t
          },
        },
        {
          kind: 'method',
          key: 'rebuild',
          value: async function () {
            const e = this.route
            void 0 !== e &&
              ((this.route = void 0),
              await this.updateComplete,
              void 0 === this.route && (this.route = e))
          },
        },
        {
          kind: 'get',
          key: 'pageRendered',
          value: function () {
            return this.updateComplete.then(() => this._currentLoadProm)
          },
        },
        {
          kind: 'method',
          key: 'createElement',
          value: function (e) {
            return document.createElement(e)
          },
        },
        { kind: 'method', key: 'updatePageEl', value: function (e, t) {} },
        {
          kind: 'get',
          key: 'routeTail',
          value: function () {
            return this._computeTail(this.route)
          },
        },
        {
          kind: 'method',
          key: '_createPanel',
          value: function (e, t, o) {
            this.lastChild && this.removeChild(this.lastChild)
            const r = this._cache[t] || this.createElement(o.tag)
            this.updatePageEl(r),
              this.appendChild(r),
              (e.cacheAll || o.cache) && (this._cache[t] = r)
          },
        },
      ],
    }
  },
  x
)
s(
  [ye('vais-router')],
  function (e, o) {
    class i extends o {
      constructor(...t) {
        super(...t), e(this)
      }
    }
    return {
      F: i,
      d: [
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'vais',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'hass',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'route',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [ve({ type: Boolean })],
          key: 'narrow',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [Ce()],
          key: '_wideSidebar',
          value: () => !1,
        },
        { kind: 'field', decorators: [Ce()], key: '_wide', value: () => !1 },
        { kind: 'field', key: '_listeners', value: () => [] },
        {
          kind: 'method',
          key: 'connectedCallback',
          value: function () {
            r(t(i.prototype), 'connectedCallback', this).call(this),
              this._listeners.push(
                Qu('(min-width: 1040px)', (e) => {
                  this._wide = e
                })
              ),
              this._listeners.push(
                Qu('(min-width: 1296px)', (e) => {
                  this._wideSidebar = e
                })
              ),
              this.style.setProperty(
                '--app-header-background-color',
                'var(--sidebar-background-color)'
              ),
              this.style.setProperty(
                '--app-header-text-color',
                'var(--sidebar-text-color)'
              ),
              this.style.setProperty(
                '--app-header-border-bottom',
                '1px solid var(--divider-color)'
              )
          },
        },
        {
          kind: 'method',
          key: 'disconnectedCallback',
          value: function () {
            for (
              r(t(i.prototype), 'disconnectedCallback', this).call(this);
              this._listeners.length;

            )
              this._listeners.pop()()
          },
        },
        {
          kind: 'field',
          key: 'routerOptions',
          value: () => ({
            defaultPage: 'entry',
            routes: {
              entry: {
                tag: 'vais-entry-panel',
                load: () => import('./c.fd0ca976.js'),
              },
              integrations: {
                tag: 'vais-store-panel',
                load: () => import('./c.b45fd348.js'),
              },
              frontend: {
                tag: 'vais-store-panel',
                load: () => import('./c.b45fd348.js'),
              },
              automation: {
                tag: 'vais-store-panel',
                load: () => import('./c.b45fd348.js'),
              },
            },
          }),
        },
        {
          kind: 'method',
          key: 'updatePageEl',
          value: function (e) {
            const t = this.route.path.replace('/', ''),
              o =
                'docked' === this.hass.dockedSidebar
                  ? this._wideSidebar
                  : this._wide
            ;(e.hass = this.hass),
              (e.vais = this.vais),
              (e.route = this.route),
              (e.narrow = this.narrow),
              (e.isWide = o),
              (e.section = t)
          },
        },
      ],
    }
  },
  Gm
)
const Km = b`
  a {
    text-decoration: var(--hcv-text-decoration-link);
    color: var(--hcv-text-color-link);
  }
`,
  Ym = b`
  ha-svg-icon {
    color: var(--hcv-color-icon);
  }
`,
  Wm = b`
  mwc-button[raised] {
    border-radius: 4px;
  }
  mwc-button[raised] > ha-circular-progress {
    --mdc-theme-primary: var(--hcv-text-color-primary);
  }
`,
  Xm = b`
  *::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }

  *::-webkit-scrollbar-track {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: var(--scrollbar-thumb-color);
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--accent-color);
    border-radius: 0.3em;
  }
  .scroll {
    overflow-y: auto;
    scrollbar-color: var(--scrollbar-thumb-color) transparent;
    scrollbar-width: thin;
  }
`,
  Jm = b`
  .warning {
    color: var(--hcv-color-warning);
  }
  .pending_update {
    color: var(--hcv-color-update);
  }
  .pending_restart,
  .error,
  .uninstall {
    color: var(--hcv-color-error);
    --mdc-theme-primary: var(--hcv-color-error);
  }
  .header {
    opacity: var(--dark-primary-opacity);
    padding: 8px 0 4px 16px;
  }
`,
  Qm = [Pe, Ym, Jm, Km, Wm],
  eh = b`
  :host {
    --hcv-color-error: var(--vais-error-color, var(--error-color));
    --hcv-color-warning: var(--vais-warning-color, var(--warning-color));
    --hcv-color-update: var(--vais-update-color, var(--info-color));
    --hcv-color-new: var(--vais-new-color, var(--success-color));
    --hcv-color-icon: var(--vais--default-icon-color, var(--sidebar-icon-color));

    --hcv-color-markdown-background: var(--markdown-code-background-color, #f6f8fa);

    --hcv-text-color-primary: var(--primary-text-color);
    --hcv-text-color-on-background: var(--text-primary-color);
    --hcv-text-color-secondary: var(--secondary-text-color);
    --hcv-text-color-link: var(--link-text-color, var(--accent-color));

    --mdc-dialog-heading-ink-color: var(--hcv-text-color-primary);
    --mdc-dialog-content-ink-color: var(--hcv-text-color-primary);

    /*vais-link*/
    --hcv-text-decoration-link: var(--vais-link-text-decoration, none);
  }
`
s(
  [ye('vais-frontend')],
  function (e, o) {
    class i extends o {
      constructor(...t) {
        super(...t), e(this)
      }
    }
    return {
      F: i,
      d: [
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'hass',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'narrow',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [ve({ attribute: !1 })],
          key: 'route',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [He('#vais-dialog')],
          key: '_vaisDialog',
          value: void 0,
        },
        {
          kind: 'field',
          decorators: [He('#vais-dialog-secondary')],
          key: '_vaisDialogSecondary',
          value: void 0,
        },
        {
          kind: 'method',
          key: 'firstUpdated',
          value: function (e) {
            r(t(i.prototype), 'firstUpdated', this).call(this, e),
              this._applyTheme(),
              (this.vais.language = this.hass.language),
              this.addEventListener('vais-location-changed', (e) =>
                this._setRoute(e)
              ),
              this.addEventListener('vais-dialog', (e) => this._showDialog(e)),
              this.addEventListener('vais-dialog-secondary', (e) =>
                this._showDialogSecondary(e)
              ),
              Qa(
                this.hass,
                () => this._updateProperties('configuration'),
                Ea.CONFIG
              ),
              Qa(this.hass, () => this._updateProperties('status'), Ea.STATUS),
              Qa(this.hass, () => this._updateProperties('status'), Ea.STAGE),
              Qa(
                this.hass,
                () => this._updateProperties('repositories'),
                Ea.REPOSITORY
              ),
              this.hass.connection.subscribeEvents(
                async () => this._updateProperties('lovelace'),
                'lovelace_updated'
              ),
              this._updateProperties(),
              '' === this.route.path && ot('/vais/entry', { replace: !0 }),
              window.addEventListener('haptic', (e) => {
                Qe(window.parent, e.type, e.detail, { bubbles: !1 })
              }),
              document.body.addEventListener('click', (e) => {
                const t = ((e) => {
                  if (
                    e.defaultPrevented ||
                    0 !== e.button ||
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey
                  )
                    return
                  const t = e.composedPath().find((e) => 'A' === e.tagName)
                  if (
                    !t ||
                    t.target ||
                    t.hasAttribute('download') ||
                    'external' === t.getAttribute('rel')
                  )
                    return
                  let o = t.href
                  if (!o || -1 !== o.indexOf('mailto:')) return
                  const r = window.location,
                    i = r.origin || r.protocol + '//' + r.host
                  return 0 === o.indexOf(i) &&
                    ((o = o.substr(i.length)), '#' !== o)
                    ? (e.preventDefault(), o)
                    : void 0
                })(e)
                t && ot(t)
              }),
              Je.addEventListener('location-changed', (e) =>
                Qe(this, e.type, e.detail, { bubbles: !1 })
              ),
              document.body.addEventListener('keydown', (e) => {
                e.ctrlKey ||
                  e.shiftKey ||
                  e.metaKey ||
                  e.altKey ||
                  (['c', 'm', 'e'].includes(e.key) &&
                    Qe(Je, 'hass-quick-bar-trigger', e, { bubbles: !1 }))
              }),
              tt(this, this.shadowRoot)
          },
        },
        {
          kind: 'method',
          key: 'updated',
          value: function (e) {
            r(t(i.prototype), 'updated', this).call(this, e)
            const o = e.get('hass')
            o && o.themes !== this.hass.themes && this._applyTheme()
          },
        },
        {
          kind: 'method',
          key: '_updateProperties',
          value: async function (e = 'all') {
            const t = {},
              o = {}
            'all' === e
              ? ([
                  o.repositories,
                  o.configuration,
                  o.status,
                  o.critical,
                  o.resources,
                  o.removed,
                ] = await Promise.all([
                  Pa(this.hass),
                  Ma(this.hass),
                  za(this.hass),
                  Ta(this.hass),
                  Ka(this.hass),
                  Na(this.hass),
                ]))
              : 'configuration' === e
              ? (o.configuration = await Ma(this.hass))
              : 'status' === e
              ? (o.status = await za(this.hass))
              : 'repositories' === e
              ? (o.repositories = await Pa(this.hass))
              : 'lovelace' === e && (o.resources = await Ka(this.hass)),
              Object.keys(o).forEach((e) => {
                void 0 !== o[e] && (t[e] = o[e])
              }),
              t && this._updateVais(t)
          },
        },
        {
          kind: 'method',
          key: 'render',
          value: function () {
            return this.hass && this.vais
              ? K`
      <vais-router
        .hass=${this.hass}
        .vais=${this.vais}
        .route=${this.route}
        .narrow=${this.narrow}
      ></vais-router>
      <vais-event-dialog
        .hass=${this.hass}
        .vais=${this.vais}
        .route=${this.route}
        .narrow=${this.narrow}
        id="vais-dialog"
      ></vais-event-dialog>
      <vais-event-dialog
        .hass=${this.hass}
        .vais=${this.vais}
        .route=${this.route}
        .narrow=${this.narrow}
        id="vais-dialog-secondary"
      ></vais-event-dialog>
    `
              : K``
          },
        },
        {
          kind: 'get',
          static: !0,
          key: 'styles',
          value: function () {
            return [Qm, eh]
          },
        },
        {
          kind: 'method',
          key: '_showDialog',
          value: function (e) {
            const t = e.detail
            ;(this._vaisDialog.active = !0),
              (this._vaisDialog.params = t),
              this.addEventListener(
                'vais-dialog-closed',
                () => (this._vaisDialog.active = !1)
              )
          },
        },
        {
          kind: 'method',
          key: '_showDialogSecondary',
          value: function (e) {
            const t = e.detail
            ;(this._vaisDialogSecondary.active = !0),
              (this._vaisDialogSecondary.secondary = !0),
              (this._vaisDialogSecondary.params = t),
              this.addEventListener(
                'vais-secondary-dialog-closed',
                () => (this._vaisDialogSecondary.active = !1)
              )
          },
        },
        {
          kind: 'method',
          key: '_setRoute',
          value: function (e) {
            var t
            null !== (t = e.detail) &&
              void 0 !== t &&
              t.route &&
              ((this.route = e.detail.route),
              ot(this.route.path, { replace: !0 }),
              this.requestUpdate())
          },
        },
        {
          kind: 'method',
          key: '_applyTheme',
          value: function () {
            var e, t
            let o
            const r =
              (null === (e = this.hass.selectedTheme) || void 0 === e
                ? void 0
                : e.theme) ||
              (this.hass.themes.darkMode && this.hass.themes.default_dark_theme
                ? this.hass.themes.default_dark_theme
                : this.hass.themes.default_theme)
            ;(o = this.hass.selectedTheme),
              'default' === r &&
                void 0 ===
                  (null === (t = o) || void 0 === t ? void 0 : t.dark) &&
                (o = { ...this.hass.selectedTheme }),
              this.parentElement &&
                (We(this.parentElement, this.hass.themes, r, {
                  ...o,
                  dark: this.hass.themes.darkMode,
                }),
                (this.parentElement.style.backgroundColor =
                  'var(--primary-background-color)'))
          },
        },
      ],
    }
  },
  Xu
)
export {
  K as $,
  X as A,
  um as B,
  nm as C,
  y as D,
  la as E,
  Te as F,
  wm as G,
  La as H,
  Hm as I,
  Am as J,
  dp as K,
  ue as L,
  mm as M,
  W as N,
  r as O,
  Dn as P,
  t as Q,
  Mm as R,
  Sm as S,
  Em as T,
  rm as U,
  om as V,
  Bl as W,
  Qa as X,
  Ea as Y,
  Fa as Z,
  sp as _,
  s as a,
  oa as a$,
  Pa as a0,
  qa as a1,
  Ld as a2,
  gs as a3,
  ms as a4,
  Cl as a5,
  e as a6,
  Hn as a7,
  tr as a8,
  da as a9,
  Cs as aA,
  Tc as aB,
  Gl as aC,
  po as aD,
  ci as aE,
  cr as aF,
  ui as aG,
  Dm as aH,
  Hl as aI,
  wl as aJ,
  us as aK,
  Va as aL,
  Cd as aM,
  Sd as aN,
  Pe as aO,
  Zl as aP,
  ws as aQ,
  cc as aR,
  Ed as aS,
  ps as aT,
  Ua as aU,
  Xl as aV,
  gd as aW,
  ic as aX,
  Ga as aY,
  f as aZ,
  gn as a_,
  Fi as aa,
  Bd as ab,
  jd as ac,
  Yl as ad,
  Kl as ae,
  ot as af,
  Je as ag,
  Za as ah,
  Yu as ai,
  ja as aj,
  $a as ak,
  Ba as al,
  Ia as am,
  Du as an,
  Ya as ao,
  Xa as ap,
  Wa as aq,
  Ra as ar,
  Na as as,
  Ja as at,
  Oa as au,
  Al as av,
  Da as aw,
  ks as ax,
  Ol as ay,
  rs as az,
  Ku as b,
  vl as b$,
  Vo as b0,
  Q as b1,
  sl as b2,
  ss as b3,
  mc as b4,
  pl as b5,
  Zc as b6,
  Rc as b7,
  Pl as b8,
  Ic as b9,
  Yc as bA,
  Dd as bB,
  ed as bC,
  Ud as bD,
  Fd as bE,
  Rl as bF,
  Pd as bG,
  Hc as bH,
  dd as bI,
  Kc as bJ,
  ll as bK,
  ml as bL,
  $d as bM,
  _s as bN,
  md as bO,
  Qc as bP,
  Ll as bQ,
  fc as bR,
  Ac as bS,
  ol as bT,
  wc as bU,
  _c as bV,
  Cc as bW,
  bc as bX,
  yc as bY,
  vc as bZ,
  lc as b_,
  Nl as ba,
  Wl as bb,
  fd as bc,
  yd as bd,
  Ad as be,
  kd as bf,
  hd as bg,
  ul as bh,
  dc as bi,
  nd as bj,
  id as bk,
  Md as bl,
  Rd as bm,
  Tl as bn,
  tl as bo,
  td as bp,
  fs as bq,
  pc as br,
  ec as bs,
  gc as bt,
  cl as bu,
  Jc as bv,
  Dc as bw,
  Ml as bx,
  hc as by,
  Oc as bz,
  _d as c,
  Is as c$,
  ep as c0,
  tp as c1,
  Il as c2,
  Uc as c3,
  Xd as c4,
  Qd as c5,
  Wd as c6,
  Yd as c7,
  zc as c8,
  tc as c9,
  Es as cA,
  $s as cB,
  Qs as cC,
  As as cD,
  xs as cE,
  il as cF,
  rl as cG,
  Dl as cH,
  jl as cI,
  bs as cJ,
  Ss as cK,
  rp as cL,
  op as cM,
  kl as cN,
  Sl as cO,
  ud as cP,
  cd as cQ,
  pd as cR,
  js as cS,
  el as cT,
  Js as cU,
  Bs as cV,
  Ms as cW,
  Ps as cX,
  Ts as cY,
  zs as cZ,
  Ns as c_,
  wd as ca,
  vd as cb,
  sc as cc,
  ac as cd,
  Mc as ce,
  Pc as cf,
  qd as cg,
  Zd as ch,
  Gc as ci,
  qc as cj,
  Td as ck,
  Id as cl,
  dl as cm,
  Ql as cn,
  Lc as co,
  xc as cp,
  fl as cq,
  sd as cr,
  ld as cs,
  Fl as ct,
  Ul as cu,
  El as cv,
  bl as cw,
  Vc as cx,
  kc as cy,
  Sc as cz,
  Qm as d,
  rd as d$,
  Os as d0,
  Rs as d1,
  Ds as d2,
  Fs as d3,
  Us as d4,
  Zs as d5,
  qs as d6,
  Gs as d7,
  Ks as d8,
  Ys as d9,
  ys as dA,
  ns as dB,
  Nc as dC,
  as as dD,
  od as dE,
  ad as dF,
  ql as dG,
  Hd as dH,
  Gd as dI,
  Kd as dJ,
  rc as dK,
  nc as dL,
  Jl as dM,
  Xc as dN,
  oc as dO,
  bd as dP,
  zl as dQ,
  Ls as dR,
  vs as dS,
  Oe as dT,
  Ie as dU,
  Ec as dV,
  $l as dW,
  $c as dX,
  dm as dY,
  Me as dZ,
  Vs as d_,
  Ws as da,
  Xs as db,
  Jd as dc,
  Wc as dd,
  jc as de,
  Bc as df,
  gl as dg,
  hl as dh,
  Nd as di,
  zd as dj,
  yl as dk,
  Vl as dl,
  ds as dm,
  ls as dn,
  xd as dp,
  Vd as dq,
  al as dr,
  nl as ds,
  is as dt,
  uc as du,
  x as dv,
  _l as dw,
  hs as dx,
  Bm as dy,
  cs as dz,
  ve as e,
  Hs as e0,
  fp as e1,
  Fc as e2,
  _e as f,
  Od as g,
  xl as h,
  He as i,
  Qe as j,
  Ae as k,
  xe as l,
  os as m,
  ye as n,
  km as o,
  ke as p,
  Pm as q,
  b as r,
  Xm as s,
  Ce as t,
  im as u,
  pm as v,
  cm as w,
  np as x,
  ap as y,
  we as z,
}
