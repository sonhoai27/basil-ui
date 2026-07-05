import{r as a,j as k}from"./index-D_Q6sStW.js";/**
 * @license lucide-react v1.23.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(...e)=>e.filter((t,r,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v1.23.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.23.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,o)=>o?o.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v1.23.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=e=>{const t=b(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.23.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var c={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.23.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},$=a.createContext({}),R=()=>a.useContext($),D=a.forwardRef(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:o,className:l="",children:s,iconNode:C,...i},g)=>{const{size:n=24,strokeWidth:d=2,absoluteStrokeWidth:f=!1,color:y="currentColor",className:v=""}=R()??{},w=o??f?Number(r??d)*24/Number(t??n):r??d;return a.createElement("svg",{ref:g,...c,width:t??n??c.width,height:t??n??c.height,stroke:e??y,strokeWidth:w,className:m("lucide",v,l),...!s&&!A(i)&&{"aria-hidden":"true"},...i},[...C.map(([S,x])=>a.createElement(S,x)),...Array.isArray(s)?s:[s]])});/**
 * @license lucide-react v1.23.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=(e,t)=>{const r=a.forwardRef(({className:o,...l},s)=>a.createElement(D,{ref:s,iconNode:t,className:m(`lucide-${P(u(e))}`,`lucide-${e}`,o),...l}));return r.displayName=u(e),r},p={common:{loading:"Loading",retry:"Retry",clear:"Clear",cancel:"Cancel",save:"Save",search:"Search",selectAll:"Select all",previous:"Previous",next:"Next",remove:e=>e?`Remove ${e}`:"Remove",results:e=>`${e} results`},table:{noData:"No data",noResults:"No matching results",filteredEmptyTitle:"No matching results",filteredEmptyDescription:"Try a different search or clear some filters.",errorDescription:"Couldn't load data. Check your connection and try again.",clearFilters:"Clear filters",columns:"Columns",showColumns:"Show columns",rows:"Rows",rowsPerPage:"Rows per page",density:"Display density",densityComfortable:"Comfortable",densityCompact:"Compact",searchPlaceholder:"Search…",resize:"Drag to resize column",selectAllAria:"Select all",selectRowAria:"Select row",selected:e=>`${e} selected`,selectedAll:e=>`All ${e} selected`,selectAllN:e=>`Select all ${e}`},pagination:{aria:"Pagination",pageOf:(e,t)=>`Page ${e} / ${t}`},combobox:{placeholder:"Select...",searchPlaceholder:"Search...",empty:"No results.",clear:"Clear selection",create:e=>`Create "${e}"`},multiSelect:{placeholder:"Select...",searchPlaceholder:"Search...",empty:"No results."},datePicker:{placeholder:"Pick a date",clear:"Clear date"},dateRangePicker:{placeholder:"Pick a date range",clear:"Clear date range",presetToday:"Today",preset7d:"7 days",preset30d:"30 days",presetThisMonth:"This month"},numberField:{decrease:"Decrease",increase:"Increase"},inputOtp:{aria:"One-time code",digit:e=>`Digit ${e}`},fileUpload:{hint:"Drag and drop or click to select",remove:e=>`Remove ${e}`},savedViews:{all:"All",rename:"Rename",delete:"Delete",renameTitle:"Rename view",namePlaceholder:"e.g. Unpaid",cancel:"Cancel",save:"Save",saveCurrent:"Save current filter",aria:"Saved views"},facetedFilter:{empty:"No results.",clearFilters:"Clear filters",selected:"selected"},filterChips:{filtering:"Filtering:",clearAll:"Clear all",remove:e=>`Remove ${e} filter`,results:e=>`· ${e} results`},status:{pending_payment:"Pending payment",paid:"Paid",packing:"Packing",sent:"Sent",cancelled:"Cancelled"},errorState:{title:"Something went wrong"},banner:{dismiss:"Dismiss"},confirmDialog:{confirm:"Confirm",cancel:"Cancel"},timeline:{by:e=>`by ${e}`},badges:{outOfStock:"Out of stock"},kebab:{open:"Open menu"}},h=a.createContext(p);function E({messages:e=p,children:t}){return k.jsx(h.Provider,{value:e,children:t})}function O(){return a.useContext(h)}export{E as B,L as c,p as e,O as u};
