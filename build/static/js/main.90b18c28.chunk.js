(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(1),s=t(15),r=t.n(s),a=t(3),o=t(4),u=t.n(o),i="/api/persons",d=function(){return u.a.get(i)},b=function(e){return u.a.post(i,e)},j=function(e){return u.a.delete("".concat(i,"/").concat(e.id))},l=function(e,n){return u.a.put("".concat(i,"/").concat(e),n)},f=t(0),m=function(e){var n=e.searchValue,t=e.setSearchValue;return Object(f.jsxs)("div",{children:["filter shown with ",Object(f.jsx)("input",{value:n,onChange:function(e){t(e.target.value)}})]})},h=function(e){var n=e.message;return null===n?null:Object(f.jsx)("div",{className:"notification ".concat(n.success?"":"error"),children:n.text})},O=t(6),v=function(e){var n=e.persons,t=e.setPersons,c=e.newName,s=e.setNewName,r=e.newNumber,a=e.setNewNumber,o=e.setMessage;return Object(f.jsxs)("form",{onSubmit:function(e){e.preventDefault();var u={name:c,number:r},i=n.find((function(e){return e.name===u.name}));void 0!==i?window.confirm("".concat(u.name," is already added to the phonebook, replace the old number with a new one?"))&&(l(i.id,u),t(n.map((function(e){return e.id===i.id?Object(O.a)(Object(O.a)({},e),{},{number:u.number}):e}))),o({text:"Modified ".concat(u.name,"'s number"),success:!0}),setTimeout((function(){o(null)}),5e3),s(""),a("")):b(u).then((function(e){console.log(e),t(n.concat(e.data)),o({text:"Added ".concat(u.name),success:!0}),setTimeout((function(){o(null)}),5e3),s(""),a("")})).catch((function(e){var n=e.response.data;o({success:!1,text:"Person validation failed: ".concat(n.error)}),console.log(e)}))},children:[Object(f.jsxs)("div",{children:["name: ",Object(f.jsx)("input",{value:c,onChange:function(e){return s(e.target.value)}})]}),Object(f.jsxs)("div",{children:["number: ",Object(f.jsx)("input",{value:r,onChange:function(e){return a(e.target.value)}})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"add"})})]})},x=function(e){var n=e.persons,t=e.setPersons,c=e.shownPersons,s=e.setMessage;return Object(f.jsx)("div",{children:c.map((function(e){return Object(f.jsxs)("div",{children:[e.name," ",e.number,Object(f.jsx)("button",{onClick:function(){!function(e){window.confirm("Delete ".concat(e.name))&&j(e).catch((function(){return s({text:"Information of ".concat(e.name," has already been removed from the server"),success:!1})}));var c=n.filter((function(n){return n.id!==e.id}));t(c)}(e)},children:"delete"})]},e.name)}))})},p=function(){var e=Object(c.useState)(""),n=Object(a.a)(e,2),t=n[0],s=n[1],r=Object(c.useState)([]),o=Object(a.a)(r,2),u=o[0],i=o[1],b=Object(c.useState)(""),j=Object(a.a)(b,2),l=j[0],O=j[1],p=Object(c.useState)(""),w=Object(a.a)(p,2),g=w[0],N=w[1],P=Object(c.useState)(null),S=Object(a.a)(P,2),k=S[0],C=S[1];return Object(c.useEffect)((function(){d().then((function(e){return i(e.data)}))}),[]),Object(f.jsxs)("div",{children:[Object(f.jsx)("h1",{children:"Phonebook"}),Object(f.jsx)(h,{message:k}),Object(f.jsx)(m,{searchValue:t,setSearchValue:s}),Object(f.jsx)("h2",{children:"add a new"}),Object(f.jsx)(v,{persons:u,setPersons:i,newName:l,setNewName:O,newNumber:g,setNewNumber:N,setMessage:C}),Object(f.jsx)("h2",{children:"Numbers"}),Object(f.jsx)(x,{persons:u,setPersons:i,shownPersons:""===t?u:u.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})),setMessage:C})]})};t(39);r.a.render(Object(f.jsx)(p,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.90b18c28.chunk.js.map