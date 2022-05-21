import{G as t,J as e,A as i,a as s,f as o,e as n,t as a,$ as r,e2 as l,j as d,r as h,n as c,h as m,W as u,F as p}from"./main-2af83765.js";import{d as g,i as f,u as v,r as _,b as y}from"./c.788cf50b.js";import"./c.08c9f9b1.js";import{c as b}from"./c.376158e8.js";import{c as k}from"./c.7aca5ec5.js";import{M as w}from"./c.5bbe0073.js";import{a as $,s as x}from"./c.51f71dd4.js";import"./c.d608b0a2.js";import"./c.9be4b06e.js";import"./c.d84e7514.js";import"@lit-labs/virtualizer/layouts/grid";import"./c.e78c1fb6.js";import"./c.be11274c.js";import"./c.f4ebe2a8.js";import"./c.6d29ff99.js";import"./c.b9ad52a7.js";import"./c.e0e0bad7.js";import"./c.94b09f7e.js";import"./c.743a15a1.js";import"./c.0509737d.js";import"./c.d55610b5.js";import"./c.8613e225.js";import"./c.e61d287a.js";const j=new WeakMap;let A=0;const I=new Map,C=new WeakSet,z=()=>new Promise((t=>requestAnimationFrame(t))),S=(t,e)=>{const i=t-e;return 0===i?void 0:i},O=(t,e)=>{const i=t/e;return 1===i?void 0:i},D={left:(t,e)=>{const i=S(t,e);return{value:i,transform:i&&`translateX(${i}px)`}},top:(t,e)=>{const i=S(t,e);return{value:i,transform:i&&`translateY(${i}px)`}},width:(t,e)=>{const i=O(t,e);return{value:i,transform:i&&`scaleX(${i})`}},height:(t,e)=>{const i=O(t,e);return{value:i,transform:i&&`scaleY(${i})`}}},F={duration:333,easing:"ease-in-out"},U=["left","top","width","height","opacity","color","background"],E=new WeakMap;const N=t(class extends g{constructor(t){if(super(t),this.t=null,this.i=null,this.o=!0,this.shouldLog=!1,t.type===e.CHILD)throw Error("The `animate` directive must be used in attribute position.");this.createFinished()}createFinished(){var t;null===(t=this.resolveFinished)||void 0===t||t.call(this),this.finished=new Promise((t=>{this.h=t}))}async resolveFinished(){var t;null===(t=this.h)||void 0===t||t.call(this),this.h=void 0}render(t){return i}getController(){return j.get(this.l)}isDisabled(){var t;return this.options.disabled||(null===(t=this.getController())||void 0===t?void 0:t.disabled)}update(t,[e]){var i;const s=void 0===this.l;return s&&(this.l=null===(i=t.options)||void 0===i?void 0:i.host,this.l.addController(this),this.element=t.element,E.set(this.element,this)),this.optionsOrCallback=e,(s||"function"!=typeof e)&&this.u(e),this.render(e)}u(t){var e,i;t=null!=t?t:{};const s=this.getController();void 0!==s&&((t={...s.defaultOptions,...t}).keyframeOptions={...s.defaultOptions.keyframeOptions,...t.keyframeOptions}),null!==(e=(i=t).properties)&&void 0!==e||(i.properties=U),this.options=t}v(){const t={},e=this.element.getBoundingClientRect(),i=getComputedStyle(this.element);return this.options.properties.forEach((s=>{var o;const n=null!==(o=e[s])&&void 0!==o?o:D[s]?void 0:i[s],a=Number(n);t[s]=isNaN(a)?n+"":a})),t}p(){let t,e=!0;return this.options.guard&&(t=this.options.guard(),e=((t,e)=>{if(Array.isArray(t)){if(Array.isArray(e)&&e.length===t.length&&t.every(((t,i)=>t===e[i])))return!1}else if(e===t)return!1;return!0})(t,this.m)),this.o=this.l.hasUpdated&&!this.isDisabled()&&!this.isAnimating()&&e&&this.element.isConnected,this.o&&(this.m=Array.isArray(t)?Array.from(t):t),this.o}hostUpdate(){var t;"function"==typeof this.optionsOrCallback&&this.u(this.optionsOrCallback()),this.p()&&(this.g=this.v(),this.t=null!==(t=this.t)&&void 0!==t?t:this.element.parentNode,this.i=this.element.nextSibling)}async hostUpdated(){if(!this.o||!this.element.isConnected||this.options.skipInitial&&!this.isHostRendered)return;let t;this.prepare(),await z;const e=this.A(),i=this._(this.options.keyframeOptions,e),s=this.v();if(void 0!==this.g){const{from:i,to:o}=this.j(this.g,s,e);this.log("measured",[this.g,s,i,o]),t=this.calculateKeyframes(i,o)}else{const i=I.get(this.options.inId);if(i){I.delete(this.options.inId);const{from:o,to:n}=this.j(i,s,e);t=this.calculateKeyframes(o,n),t=this.options.in?[{...this.options.in[0],...t[0]},...this.options.in.slice(1),t[1]]:t,A++,t.forEach((t=>t.zIndex=A))}else this.options.in&&(t=[...this.options.in,{}])}this.animate(t,i)}resetStyles(){var t;void 0!==this.S&&(this.element.setAttribute("style",null!==(t=this.S)&&void 0!==t?t:""),this.S=void 0)}commitStyles(){var t,e;this.S=this.element.getAttribute("style"),null===(t=this.webAnimation)||void 0===t||t.commitStyles(),null===(e=this.webAnimation)||void 0===e||e.cancel()}reconnected(){}async disconnected(){var t;if(!this.o)return;if(void 0!==this.options.id&&I.set(this.options.id,this.g),void 0===this.options.out)return;if(this.prepare(),await z(),null===(t=this.t)||void 0===t?void 0:t.isConnected){const t=this.i&&this.i.parentNode===this.t?this.i:null;if(this.t.insertBefore(this.element,t),this.options.stabilizeOut){const t=this.v();this.log("stabilizing out");const e=this.g.left-t.left,i=this.g.top-t.top;!("static"===getComputedStyle(this.element).position)||0===e&&0===i||(this.element.style.position="relative"),0!==e&&(this.element.style.left=e+"px"),0!==i&&(this.element.style.top=i+"px")}}const e=this._(this.options.keyframeOptions);await this.animate(this.options.out,e),this.element.remove()}prepare(){this.createFinished()}start(){var t,e;null===(e=(t=this.options).onStart)||void 0===e||e.call(t,this)}didFinish(t){var e,i;t&&(null===(i=(e=this.options).onComplete)||void 0===i||i.call(e,this)),this.g=void 0,this.animatingProperties=void 0,this.frames=void 0,this.resolveFinished()}A(){const t=[];for(let e=this.element.parentNode;e;e=null==e?void 0:e.parentNode){const i=E.get(e);i&&!i.isDisabled()&&i&&t.push(i)}return t}get isHostRendered(){const t=C.has(this.l);return t||this.l.updateComplete.then((()=>{C.add(this.l)})),t}_(t,e=this.A()){const i={...F};return e.forEach((t=>Object.assign(i,t.options.keyframeOptions))),Object.assign(i,t),i}j(t,e,i){t={...t},e={...e};const s=i.map((t=>t.animatingProperties)).filter((t=>void 0!==t));let o=1,n=1;return void 0!==s&&(s.forEach((t=>{t.width&&(o/=t.width),t.height&&(n/=t.height)})),void 0!==t.left&&void 0!==e.left&&(t.left=o*t.left,e.left=o*e.left),void 0!==t.top&&void 0!==e.top&&(t.top=n*t.top,e.top=n*e.top)),{from:t,to:e}}calculateKeyframes(t,e,i=!1){var s;const o={},n={};let a=!1;const r={};for(const i in e){const l=t[i],d=e[i];if(i in D){const t=D[i];if(void 0===l||void 0===d)continue;const e=t(l,d);void 0!==e.transform&&(r[i]=e.value,a=!0,o.transform=`${null!==(s=o.transform)&&void 0!==s?s:""} ${e.transform}`)}else l!==d&&void 0!==l&&void 0!==d&&(a=!0,o[i]=l,n[i]=d)}return o.transformOrigin=n.transformOrigin=i?"center center":"top left",this.animatingProperties=r,a?[o,n]:void 0}async animate(t,e=this.options.keyframeOptions){this.start(),this.frames=t;let i=!1;if(!this.isAnimating()&&!this.isDisabled()&&(this.options.onFrames&&(this.frames=t=this.options.onFrames(this),this.log("modified frames",t)),void 0!==t)){this.log("animate",[t,e]),i=!0,this.webAnimation=this.element.animate(t,e);const s=this.getController();null==s||s.add(this);try{await this.webAnimation.finished}catch(t){}null==s||s.remove(this)}return this.didFinish(i),i}isAnimating(){var t,e;return"running"===(null===(t=this.webAnimation)||void 0===t?void 0:t.playState)||(null===(e=this.webAnimation)||void 0===e?void 0:e.pending)}log(t,e){this.shouldLog&&!this.isDisabled()&&console.log(t,this.options.id,e)}});s([c("ha-media-upload-button")],(function(t,e){return{F:class extends e{constructor(...e){super(...e),t(this)}},d:[{kind:"field",decorators:[n({attribute:!1})],key:"hass",value:void 0},{kind:"field",decorators:[n()],key:"currentItem",value:void 0},{kind:"field",decorators:[a()],key:"_uploading",value:()=>0},{kind:"method",key:"render",value:function(){return this.currentItem&&f(this.currentItem.media_content_id||"")?r`
      <mwc-button
        .label=${this._uploading>0?this.hass.localize("ui.components.media-browser.file_management.uploading",{count:this._uploading}):this.hass.localize("ui.components.media-browser.file_management.add_media")}
        .disabled=${this._uploading>0}
        @click=${this._startUpload}
      >
        ${this._uploading>0?r`
              <ha-circular-progress
                size="tiny"
                active
                alt=""
                slot="icon"
              ></ha-circular-progress>
            `:r` <ha-svg-icon .path=${l} slot="icon"></ha-svg-icon> `}
      </mwc-button>
    `:r``}},{kind:"method",key:"_startUpload",value:async function(){if(this._uploading>0)return;const t=document.createElement("input");t.type="file",t.accept="audio/*,video/*,image/*",t.multiple=!0,t.addEventListener("change",(async()=>{d(this,"uploading");const e=t.files;document.body.removeChild(t);const i=this.currentItem.media_content_id;for(let t=0;t<e.length;t++){this._uploading=e.length-t;try{await v(this.hass,i,e[t])}catch(t){$(this,{text:this.hass.localize("ui.components.media-browser.file_management.upload_failed",{reason:t.message||t})});break}}this._uploading=0,d(this,"media-refresh")}),{once:!0}),t.style.display="none",document.body.append(t),t.click()}},{kind:"field",static:!0,key:"styles",value:()=>h`
    mwc-button {
      /* We use icon + text to show disabled state */
      --mdc-button-disabled-ink-color: --mdc-theme-primary;
    }

    ha-svg-icon[slot="icon"],
    ha-circular-progress[slot="icon"] {
      vertical-align: middle;
    }

    :host-context([style*="direction: rtl;"]) ha-svg-icon[slot="icon"] {
      margin-left: 8px;
      margin-right: 0px;
    }
  `}]}}),o),s([c("dialog-media-manage")],(function(t,e){return{F:class extends e{constructor(...e){super(...e),t(this)}},d:[{kind:"field",decorators:[n({attribute:!1})],key:"hass",value:void 0},{kind:"field",decorators:[a()],key:"_currentItem",value:void 0},{kind:"field",decorators:[a()],key:"_params",value:void 0},{kind:"field",decorators:[a()],key:"_uploading",value:()=>!1},{kind:"field",decorators:[a()],key:"_deleting",value:()=>!1},{kind:"field",decorators:[a()],key:"_selected",value:()=>new Set},{kind:"field",key:"_filesChanged",value:()=>!1},{kind:"method",key:"showDialog",value:function(t){this._params=t,this._refreshMedia()}},{kind:"method",key:"closeDialog",value:function(){this._filesChanged&&this._params.onClose&&this._params.onClose(),this._params=void 0,this._currentItem=void 0,this._uploading=!1,this._deleting=!1,this._filesChanged=!1,d(this,"dialog-closed",{dialog:this.localName})}},{kind:"method",key:"render",value:function(){var t,e,i,s;if(!this._params)return r``;const o=(null===(t=this._currentItem)||void 0===t||null===(e=t.children)||void 0===e?void 0:e.filter((t=>!t.can_expand)))||[];let n=0;return r`
      <ha-dialog
        open
        scrimClickAction
        escapeKeyAction
        hideActions
        flexContent
        .heading=${this._params.currentItem.title}
        @closed=${this.closeDialog}
      >
        <ha-header-bar slot="heading">
          ${0===this._selected.size?r`
                <span slot="title">
                  ${this.hass.localize("ui.components.media-browser.file_management.title")}
                </span>

                <ha-media-upload-button
                  .disabled=${this._deleting}
                  .hass=${this.hass}
                  .currentItem=${this._params.currentItem}
                  @uploading=${this._startUploading}
                  @media-refresh=${this._doneUploading}
                  slot="actionItems"
                ></ha-media-upload-button>
                ${this._uploading?"":r`
                      <ha-icon-button
                        .label=${this.hass.localize("ui.dialogs.generic.close")}
                        .path=${m}
                        dialogAction="close"
                        slot="actionItems"
                        class="header_button"
                        dir=${k(this.hass)}
                      ></ha-icon-button>
                    `}
              `:r`
                <mwc-button
                  class="danger"
                  slot="title"
                  .disabled=${this._deleting}
                  .label=${this.hass.localize("ui.components.media-browser.file_management."+(this._deleting?"deleting":"delete"),{count:this._selected.size})}
                  @click=${this._handleDelete}
                >
                  <ha-svg-icon .path=${u} slot="icon"></ha-svg-icon>
                </mwc-button>

                ${this._deleting?"":r`
                      <mwc-button
                        slot="actionItems"
                        .label=${"Deselect all"}
                        @click=${this._handleDeselectAll}
                      >
                        <ha-svg-icon
                          .path=${m}
                          slot="icon"
                        ></ha-svg-icon>
                      </mwc-button>
                    `}
              `}
        </ha-header-bar>
        ${this._currentItem?o.length?r`
              <mwc-list multi @selected=${this._handleSelected}>
                ${b(o,(t=>t.media_content_id),(t=>{const e=r`
                      <ha-svg-icon
                        slot="graphic"
                        .path=${w["directory"===t.media_class&&t.children_media_class||t.media_class].icon}
                      ></ha-svg-icon>
                    `;return r`
                      <ha-check-list-item
                        ${N({id:t.media_content_id,skipInitial:!0})}
                        graphic="icon"
                        .disabled=${this._uploading||this._deleting}
                        .selected=${this._selected.has(n++)}
                        .item=${t}
                      >
                        ${e} ${t.title}
                      </ha-check-list-item>
                    `}))}
              </mwc-list>
            `:r`<div class="no-items">
              <p>
                ${this.hass.localize("ui.components.media-browser.file_management.no_items")}
              </p>
              ${null!==(i=this._currentItem)&&void 0!==i&&null!==(s=i.children)&&void 0!==s&&s.length?r`<span class="folders"
                    >${this.hass.localize("ui.components.media-browser.file_management.folders_not_supported")}</span
                  >`:""}
            </div>`:r`
              <div class="refresh">
                <ha-circular-progress active></ha-circular-progress>
              </div>
            `}
      </ha-dialog>
    `}},{kind:"method",key:"_handleSelected",value:function(t){this._selected=t.detail.index}},{kind:"method",key:"_startUploading",value:function(){this._uploading=!0,this._filesChanged=!0}},{kind:"method",key:"_doneUploading",value:function(){this._uploading=!1,this._refreshMedia()}},{kind:"method",key:"_handleDeselectAll",value:function(){this._selected.size&&(this._selected=new Set)}},{kind:"method",key:"_handleDelete",value:async function(){if(!await x(this,{text:this.hass.localize("ui.components.media-browser.file_management.confirm_delete",{count:this._selected.size}),warning:!0}))return;this._filesChanged=!0,this._deleting=!0;const t=[];let e=0;this._currentItem.children.forEach((i=>{i.can_expand||this._selected.has(e++)&&t.push(i)}));try{await Promise.all(t.map((async t=>{await _(this.hass,t.media_content_id),this._currentItem={...this._currentItem,children:this._currentItem.children.filter((e=>e!==t))}})))}finally{this._deleting=!1,this._selected=new Set}}},{kind:"method",key:"_refreshMedia",value:async function(){this._selected=new Set,this._currentItem=void 0,this._currentItem=await y(this.hass,this._params.currentItem.media_content_id)}},{kind:"get",static:!0,key:"styles",value:function(){return[p,h`
        ha-dialog {
          --dialog-z-index: 8;
          --dialog-content-padding: 0;
        }

        @media (min-width: 800px) {
          ha-dialog {
            --mdc-dialog-max-width: 800px;
            --dialog-surface-position: fixed;
            --dialog-surface-top: 40px;
            --mdc-dialog-max-height: calc(100vh - 72px);
          }
        }

        ha-header-bar {
          --mdc-theme-on-primary: var(--primary-text-color);
          --mdc-theme-primary: var(--mdc-theme-surface);
          flex-shrink: 0;
          border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        }

        ha-media-upload-button,
        mwc-button {
          --mdc-theme-primary: var(--mdc-theme-on-primary);
        }

        mwc-list {
          direction: ltr;
        }

        .danger {
          --mdc-theme-primary: var(--error-color);
        }

        ha-svg-icon[slot="icon"] {
          vertical-align: middle;
        }

        :host-context([style*="direction: rtl;"]) ha-svg-icon[slot="icon"] {
          margin-left: 8px !important;
          margin-right: 0px !important;
        }

        .refresh {
          display: flex;
          height: 200px;
          justify-content: center;
          align-items: center;
        }

        .no-items {
          text-align: center;
          padding: 16px;
        }
        .folders {
          color: var(--secondary-text-color);
          font-style: italic;
        }
      `]}}]}}),o);