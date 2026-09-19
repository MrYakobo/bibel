var E=Object.defineProperty,j=Object.defineProperties;var S=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var v=(e,s,t)=>s in e?E(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t,o=(e,s)=>{for(var t in s||(s={}))B.call(s,t)&&v(e,t,s[t]);if(p)for(var t of p(s))N.call(s,t)&&v(e,t,s[t]);return e},d=(e,s)=>j(e,S(s));import{n as c,s as I}from"./store.8956f3ab.js";import{m as u,a as k,l as A,b as _,h as F,d as M,V as P}from"./vendor.bb8fb9f4.js";import{D as $}from"./DispCard.6a6e06b2.js";function T(e){const s=e.scrollWidth>e.clientWidth,t=e.scrollHeight>e.clientHeight;return s||t}function D(e,s){let t=e.split(" "),n="",r=[];const i=document.querySelector(s);for(const l of t){const a=n+l+" ";if(i.textContent=a,T(i)&&n.length>0){r.push(n.trim()),n=l+" ";continue}n=a}return n.length>0&&(console.log("accepting last chunk:",n),r.push(n)),r.filter(l=>l.length>0)}var H=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{},[t("div",{staticClass:"flex my-4 justify-center items-end text-xl"},[t("div",{staticClass:"mx-1"},[t("p",[e._v("Version")]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.selected_translation,expression:"selected_translation"}],staticClass:`
                    text-center text-black
                    bg-white
                    shadow
                    p-2
                    rounded
                    border border-gray-300
                `,on:{change:function(n){var r=Array.prototype.filter.call(n.target.options,function(i){return i.selected}).map(function(i){var l="_value"in i?i._value:i.value;return l});e.selected_translation=n.target.multiple?r:r[0]}}},e._l(e.translations,function(n){return t("option",{key:n},[e._v(" "+e._s(n)+" ")])}),0)]),t("div",{staticClass:"mx-1"},[t("p",[e._v("Bok")]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.selected_book,expression:"selected_book"}],staticClass:`
                    text-black
                    bg-white
                    shadow
                    p-2
                    rounded
                    border border-gray-300
                `,on:{change:function(n){var r=Array.prototype.filter.call(n.target.options,function(i){return i.selected}).map(function(i){var l="_value"in i?i._value:i.value;return l});e.selected_book=n.target.multiple?r:r[0]}}},e._l(e.longbooks,function(n){return t("option",{key:n},[e._v(" "+e._s(n)+" ")])}),0)]),t("div",{class:["mx-1",e.disabled_if(!e.selected_book)]},[t("p",[e._v("Kapitel")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.selected_chapter,expression:"selected_chapter"}],staticClass:`
                    bg-white
                    text-black
                    shadow
                    px-3
                    py-2
                    w-20
                    rounded
                    border border-gray-300
                `,attrs:{type:"number",min:"1",max:e.num_chapters,disabled:!e.selected_book,placeholder:e.chapter_placeholder},domProps:{value:e.selected_chapter},on:{input:function(n){n.target.composing||(e.selected_chapter=n.target.value)}}})]),t("div",{class:[e.disabled_if(!e.selected_chapter),"mx-1"]},[t("p",[e._v("Vers(er)")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.selected_verses,expression:"selected_verses"}],staticClass:`
                    text-black
                    bg-white
                    px-4
                    py-2
                    w-20
                    rounded
                    border border-gray-300
                `,attrs:{disabled:!e.selected_chapter,type:"text",placeholder:e.verse_placeholder},domProps:{value:e.selected_verses},on:{keydown:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.submit.apply(null,arguments)},input:function(n){n.target.composing||(e.selected_verses=n.target.value)}}})])]),t("div",{staticClass:"text-center"},[t("p",{staticClass:`
                p-3
                w-128
                h-32
                bg-white
                mx-auto
                shadow-md
                overflow-y-scroll
            `},[e._v(" "+e._s(e.bible_text)+" ")])]),t("button",{class:[e.disabled_if(!e.selected_verses),"block mx-auto mt-4 bg-green-700 hover:bg-green-900 text-white rounded h-10 px-4 shadow-md text-xl"],attrs:{disabled:!e.selected_verses},on:{click:e.submit}},[e._v(" Importera bibelord ")]),e.debug?t("button",{on:{click:e.screenshot}},[e._v("Screenshot all")]):e._e(),e.debug?t("button",{staticClass:"block mx-auto mt-4 bg-green-700 hover:bg-green-900 text-white rounded h-10 px-4 shadow-md text-xl",on:{click:e.import_one_from_each_book}},[e._v("T\xF6m och ta en fr\xE5n varje bok ")]):e._e(),e.debug?t("button",{staticClass:"block mx-auto mt-4 bg-green-700 hover:bg-green-900 text-white rounded h-10 px-4 shadow-md text-xl",on:{click:e.verify_no_overflow}},[e._v("verifiera ingen overflow")]):e._e(),t("a",{staticClass:"hidden",attrs:{href:"",id:"a"}})])},K=[];function V(e,s){const t=e.toDataURL("image/png;base64"),n=document.getElementById("a");n.download=s,n.href=t,n.click()}async function O(e){let s=document.getElementById("dispcard"),n=`bibelord_${new Date().toISOString().split("T")[0]}_${e}`,r=await F(s,{});await V(r,n)}function R(e,s){return Array(s-e+1).fill().map((t,n)=>e+n)}function L(e){let s=e.split("-");if(s.length==1||s[1]=="")return s;try{let[t,n]=s.map(r=>parseInt(r));return R(t,n)}catch{}}const z={name:"BibleEntry",data(){return{debug:location.search.includes("debug"),selected_book:"F\xF6rsta Moseboken",selected_chapter:"1",selected_verses:"1-10"}},computed:d(o(o({},u(["words","i"])),k(["longbooks","bibledb","translations"])),{selected_translation:{get(){return this.$store.state.selected_translation},set(e){this.$store.commit("set_selected_translation",e),this.selected_book=Object.keys(this.bibledb)[0]}},chapters(){let e=this.bibledb[this.selected_book];return e==null?[]:Object.keys(e)},num_chapters(){return this.chapters.length},chapter_placeholder(){return this.chapters.length==0?"":this.chapters.length},verse_placeholder(){if(this.selected_chapter=="")return"";let e=this.bibledb[this.selected_book];if(e==null)return"";let s=e[this.selected_chapter];return s==null?"":`1-${Object.keys(s).length}`},bible_text(){if(!(this.selected_book&&this.selected_chapter&&this.selected_verses))return"";let e=this.bibledb[this.selected_book][this.selected_chapter],s=L(this.selected_verses);return Object.values(A(e,s)).join(" ")},bible_reference(){return this.selected_book&&this.selected_chapter&&this.selected_verses?`${this.selected_book} ${this.selected_chapter}:${this.selected_verses}`:""}}),methods:d(o(d(o({},_(["set_i_without_write"])),{async screenshot(){async function e(){for(let s=0;s<this.words.length;s++)this.set_i_without_write(s),await new Promise(t=>{this.$nextTick(()=>{t()})}),console.log(s),await O(s)}await e.call(this)},verify_no_overflow(){for(let e=0;e<=this.words.length;e++){this.set_i(e);let s=document.querySelector("#dispcard #curr_slide_text"),t={sw:s.scrollWidth,cw:s.clientWidth,sh:s.scrollHeight,ch:s.clientHeight};if(t.sw>t.cw||t.sh>t.ch)throw new Error(`overflow at slide ${this.i}: ${JSON.stringify(t)}!`)}alert("All fine!"),this.set_i(0)},import_one_from_each_book(){for(;this.remove_curr_word(),this.words.length!=0;);for(const e of this.longbooks)this.selected_book=e,this.selected_chapter="1",this.selected_verses="1-2",this.submit()}}),_(["add_bible_slides","remove_curr_word","inc","set_i","set_show"])),{disabled_if(e){return{"opacity-50 pointer-events-none cursor-not-allowed":e}},reset_form(){this.selected_book="",this.selected_chapter="",this.selected_verses=""},submit(){this.set_show(!0);let e=this.selected_book,s=`${this.selected_chapter}:${this.selected_verses}`,t=this.split_bible_slides(this.bible_reference,{book:e,chapter_and_verse:s},this.bible_text,this.selected_translation);this.add_bible_slides(t),this.reset_form()},split_bible_slides(e,{book:s,chapter_and_verse:t},n,r){var i=D(n,"#hidden_dispcard #curr_slide_text");return i.map((l,a)=>{var h={reference:e,text:l,translation:r,book:s,chapter_and_verse:t};return h})}}),components:{DispCard:$}},b={};var W=c(z,H,K,!1,U,null,null,null);function U(e){for(let s in b)this[s]=b[s]}var q=function(){return W.exports}(),G=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"h-32 relative w-128 handle",on:{click:function(n){return e.$emit("click")}}},[t("h1",{staticClass:"text-lg font-bold"},[e._v(" "+e._s(e.reference||e.text&&"\xA0"||"Tomt kort")+" ")]),t("p",{staticClass:"text-sm"},[e._v(e._s(e.text||"\xA0"))]),t("button",{staticClass:`
            absolute
            font-thin
            right-10
            top-2
            w-6
            h-6
            leading-6
            text-center
            rounded-full
            text-white
            bg-black/50
            hover:bg-yellow-500
            cursor-pointer
        `,on:{click:function(n){return n.stopPropagation(),e.$emit("edit")}}},[e._v(" \u270E ")]),t("button",{staticClass:`
            absolute
            font-thin
            right-3
            top-2
            w-6
            h-6
            leading-6
            text-center
            rounded-full
            text-white
            bg-black/50
            hover:bg-red-600
            cursor-pointer
        `,on:{click:function(n){return n.stopPropagation(),e.$emit("delete")}}},[e._v(" \u2715 ")])])},J=[];const X={name:"BibleCard",props:["reference","text"],computed:o({},u(["words"]))},m={};var Q=c(X,G,J,!1,Y,null,null,null);function Y(e){for(let s in m)this[s]=m[s]}var Z=function(){return Q.exports}(),ee=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("button",{class:["uppercase w-6/12 h-12 p-2 border-2 border-blue-100 shadow-lg rounded font-bold text-xl",e.showhide_class],on:{click:e.show_hide}},[e._v(" "+e._s(e.showhide_label)+" ")])},te=[];const se={methods:o({},_(["inc","dec","show_hide"])),computed:d(o({},u(["show"])),{showhide_label(){return this.show?"Showing":"Hiding"},showhide_class(){return this.show?"bg-blue-700 hover:bg-blue-800 text-white":"bg-white hover:bg-blue-100 text-gray-800"}})},f={};var ne=c(se,ee,te,!1,re,null,null,null);function re(e){for(let s in f)this[s]=f[s]}var ie=function(){return ne.exports}(),le=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"h-screen p-5"},[t("div",{class:["h-11/12 overflow-y-scroll relative shadow bg-gray-100 p-3 rounded-md",{"opacity-70":!e.show}]},[e.words.length==0?t("p",{staticClass:"text-gray-500 my-5 w-128 mx-6 text-center text-xl"},[e._v(" L\xE4gg till bibelord med plusknappen eller bibelimporten ")]):t("draggable",{attrs:{handle:".handle"},on:{change:e.change},model:{value:e.words,callback:function(n){e.words=n},expression:"words"}},[t("transition-group",{staticClass:"w-128 flex flex-col mx-6",attrs:{name:"list"}},e._l(e.words,function(n,r){return t("BibleCard",{key:n.id,ref:n.id,refInFor:!0,class:[e.card_class(r),"border-2 border-gray-300 p-3 rounded inline-block my-1 mx-1 cursor-default"],attrs:{reference:n.reference,text:n.text},on:{click:function(i){return e.set_active_slide(r)},delete:function(i){return e.remove_word_at_index(r)},edit:function(i){return e.open_edit(r)}}})}),1)],1)],1),t("div",{staticClass:"mt-2 flex justify-center items-center px-4"},[t("button",{staticClass:`
                w-6/12
                h-12
                bg-white
                border
                shadow-lg
                text-green-500 text-3xl
                font-bold
                rounded-lg
                hover:bg-green-500 hover:text-white
                border-gray-300
                transition-colors
                duration-75
            `,on:{click:function(n){return e.$emit("add_new")}}},[e._v(" + ")]),t("ShowHideButton")],1)])},oe=[];const ae={name:"BibleCards",components:{draggable:M,BibleCard:Z,ShowHideButton:ie},computed:o({words:{get(){return this.$store.state.words},set(e){this.$store.commit("set_words",e)}}},u(["i","show"])),methods:d(o({},_(["remove_word_at_index","set_i","edit_slide"])),{open_edit(e){this.edit_slide(this.words[e])},change(e){this.i==e.moved.oldIndex?this.set_i(e.moved.newIndex):this.i==e.moved.newIndex&&this.set_i(e.moved.oldIndex)},card_class(e){return this.is_active(e)?"bg-blue-800 text-white":this.is_in_multigroup(e)?"bg-yellow-50":this.words[e].reference==""?"bg-white":"bg-yellow-50 text-black"},is_active(e){return this.i==e},set_active_slide(e){this.set_i(e)},is_in_multigroup(e){return this.words[e].id.includes("_")},differs(e){return e>1&&this.words[e-1].reference!=this.words[e].reference}})},w={};var de=c(ae,le,oe,!1,ce,null,null,null);function ce(e){for(let s in w)this[s]=w[s]}var _e=function(){return de.exports}(),ue=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"w-screen h-screen fixed left-0 top-0"},[t("div",{staticClass:"absolute bg-black/70 inset-0 z-0",on:{click:e.close}}),t("div",{staticClass:`
            w-256
            px-16
            py-8
            relative
            mx-auto
            my-15
            rounded-xl
            shadow-xl
            bg-gray-200
        `},[t("p",{staticClass:"text-xl mb-2 font-bold text-gray-800"},[e._v("\xD6vers\xE4ttning")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.edit_slide.translation,expression:"edit_slide.translation"}],class:e.input_text_classes,attrs:{type:"text",placeholder:"sfb15"},domProps:{value:e.edit_slide.translation},on:{input:function(n){n.target.composing||e.$set(e.edit_slide,"translation",n.target.value)}}}),t("p",{staticClass:"text-xl mb-2 font-bold text-gray-800"},[e._v("Bok")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.edit_slide.book,expression:"edit_slide.book"}],ref:"reference_input",class:e.input_text_classes,attrs:{type:"text",placeholder:"F\xF6rsta moseboken"},domProps:{value:e.edit_slide.book},on:{input:function(n){n.target.composing||e.$set(e.edit_slide,"book",n.target.value)}}}),t("p",{staticClass:"text-xl mb-2 font-bold text-gray-800"},[e._v("Kapitel och vers")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.edit_slide.chapter_and_verse,expression:"edit_slide.chapter_and_verse"}],ref:"reference_input",class:e.input_text_classes,attrs:{type:"text",placeholder:"1:1-10"},domProps:{value:e.edit_slide.chapter_and_verse},on:{input:function(n){n.target.composing||e.$set(e.edit_slide,"chapter_and_verse",n.target.value)}}}),t("p",{staticClass:"text-xl mt-8 mb-2 font-bold text-gray-800"},[e._v("Bibeltext")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.edit_slide.text,expression:"edit_slide.text"}],staticClass:"text-2xl w-full h-64 p-4 shadow-lg rounded-md",attrs:{placeholder:"I begynnelsen skapade Gud himmel och jord..."},domProps:{value:e.edit_slide.text},on:{input:function(n){n.target.composing||e.$set(e.edit_slide,"text",n.target.value)}}}),t("button",{staticClass:`
                block
                mx-auto
                uppercase
                py-2
                w-32
                bg-green-600
                hover:bg-green-700
                mt-3
                text-white
                border-2 border-blue-100
                shadow-lg
                rounded-lg
                font-bold
                text-xl
            `,on:{click:e.close}},[e._v(" Ok ")]),t("button",{staticClass:`
                absolute
                font-thin
                right-4
                top-4
                w-6
                h-6
                leading-6
                text-center text-gray-800
                drop-shadow-lg
                cursor-pointer
                text-4xl
            `,on:{click:e.close}},[e._v(" \u2715 ")])])])},he=[];const pe={data(){return{input_text_classes:`
                    w-full
                    italic
                    text-3xl
                    font-bold
                    block
                    mb-5
                    shadow-lg
                    rounded-md
                    p-5`}},name:"EditModal",computed:o({},u(["edit_slide"])),methods:d(o({},_(["set_show_modal","write"])),{close(){this.edit_slide.reference=`${this.edit_slide.book} ${this.edit_slide.chapter_and_verse}`,this.set_show_modal(!1),this.write()}}),mounted(){this.$refs.reference_input.focus(),window.addEventListener("keydown",e=>{e.key=="Escape"&&this.set_show_modal(!1)})}},g={};var ve=c(pe,ue,he,!1,be,null,null,null);function be(e){for(let s in g)this[s]=g[s]}var me=function(){return ve.exports}(),fe=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"flex justify-center"},[e._m(0),e._l(e.keyboard_mappings,function(n){return t("div",{key:n.label,staticClass:`
            flex
            w-24
            h-15
            rounded-lg
            border
            m-3
            shadow-lg
            justify-center
            items-center
            flex-col
        `},[t("span",{staticClass:"text-2xl",domProps:{innerHTML:e._s(n.label)}}),t("p",{staticClass:"text-sm"},[e._v(e._s(n.text))])])}),e.git_version&&e.debug?t("div",{staticClass:"flex w-64 h-15 rounded-lg border m-3 shadow-lg justify-center items-center flex-col"},[e._v(" "+e._s(e.git_version)+" ")]):e._e()],2)},we=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"flex w-64 h-15 rounded-lg border m-3 shadow-lg justify-center items-center flex-col"},[t("a",{staticClass:"text-blue-600 hover:text-blue-500 hover:underline font-bold",attrs:{href:"/fullscreen"}},[e._v("Fullscreen display")]),t("a",{staticClass:"text-blue-600 hover:text-blue-500 hover:underline font-bold",attrs:{href:"/display"}},[e._v("Lower thirds display")])])}];const ge={name:"KeysViz",props:["keyboard_mappings"],data(){return{debug:location.search.includes("debug")}},computed:{git_version(){return"2026-09-19 22:43:13 +0200"}}},x={};var xe=c(ge,fe,we,!1,ye,null,null,null);function ye(e){for(let s in x)this[s]=x[s]}var ke=function(){return xe.exports}(),$e=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[e.inited?t("div",{staticClass:"flex"},[t("BibleCards",{on:{add_new:e.add_new_empty_word_and_scroll}}),t("div",{staticClass:"p-5 flex flex-col justify-start"},[t("KeysViz",{staticClass:"w-full shadow",attrs:{keyboard_mappings:e.keyboard_mappings}}),t("BibleEntry",{staticClass:"w-full shadow-md p-6 my-6"}),t("div",{staticClass:"zoom-50 bg-gray-200 rounded-lg py-10 mt-auto mb-8"},[t("div",{staticClass:"w-fhd h-[20rem]",attrs:{id:"dispcard"}},[t("DispCard"),t("DispCard",{staticClass:"invisible pointer-events-none",attrs:{id:"hidden_dispcard"}})],1)])],1),e.show_modal?t("EditModal"):e._e()],1):t("div",{staticClass:"text-3xl font-bold text-center mt-50"},[e._v(" Laddar adminpanelen... ")])])},Ce=[];function Ee(e){let s={},t=e.split(`
`);for(let n of t){if(n=="")continue;let[r,i,l,a,h,C]=n.split("	");s[r]=s[r]||{},s[r][a]=s[r][a]||{},s[r][a][h]=C}return s}const je={name:"Admin",components:{BibleEntry:q,BibleCards:_e,EditModal:me,DispCard:$,KeysViz:ke},data(){return{keyboard_mappings:{ArrowDown:{label:"&darr;",text:"Next slide",action:()=>{this.inc(),this.scroll_curr_into_view()}},ArrowUp:{label:"&uarr;",text:"Prev slide",action:()=>{this.dec(),this.scroll_curr_into_view()}},Delete:{label:"Del",text:"Delete slide",action:this.remove_curr_word},a:{label:"a",text:"Add slide",action:this.add_new_empty_word_and_scroll},h:{label:"h",text:"Show / Hide",action:this.show_hide},e:{label:"e",text:"Edit slide",action:this.edit_curr_slide}}}},methods:d(o({},_(["set_words","set_show","set_i","set_inited","set_bibledb","inc","dec","remove_curr_word","add_new_empty_word","show_hide","edit_curr_slide","set_show_modal","edit_slide","init_state"])),{add_new_empty_word_and_scroll(){this.add_new_empty_word();let e=this.counter_id;this.scroll_into_view(e);let s=this.words.find(t=>t.id==e);this.edit_slide(s)},scroll_into_view(e){this.$nextTick(()=>{this.$children.map(n=>n.$refs).find(n=>Object.keys(n).length>0)[e][0].$el.scrollIntoViewIfNeeded(!1)})},scroll_curr_into_view(){let e=this.curr_slide.id;this.scroll_into_view(e)}}),computed:o(o({},u(["show_modal","counter_id","words","inited","base"])),k(["curr_slide"])),mounted(){document.onkeydown=n=>{if(n.target.tagName=="INPUT"||n.target.tagName=="TEXTAREA"||n.target.tagName=="SELECT"||n.ctrlKey||n.altKey||n.metaKey||n.shiftKey)return;let l=this.keyboard_mappings[n.key];if(l==null)return;let a=l.action;if(a!=null&&(a(),n.preventDefault(),n.key.includes("Arrow")))return!1};let e=[],s=["sfb15","sfb98","b2000","nub"],t=this.base;for(let n of s){let r=fetch(`${t}/${n}.tsv`).then(i=>i.text()).then(i=>{let l=Ee(i);this.set_bibledb({db:l,translation:n})});e.push(r)}this.init_state(),Promise.all(e).finally(()=>{console.log("inited all promises"),this.set_inited(!0)})}},y={};var Se=c(je,$e,Ce,!1,Be,null,null,null);function Be(e){for(let s in y)this[s]=y[s]}var Ne=function(){return Se.exports}();new P({render:e=>e(Ne),store:I}).$mount("#app");
