(function(){
var SK='ym-te',DD='ym-theme-',SI=DD+'style',BG_SI=DD+'bg-style',BTN=DD+'btn',PN=DD+'panel';

function qs(s){return document.querySelector(s)}
function qsa(s){return document.querySelectorAll(s)}
function ce(t){return document.createElement(t)}

function ls(k,v){try{if(v===undefined){var r=localStorage.getItem(SK+k);return r?JSON.parse(r):null}else{localStorage.setItem(SK+k,JSON.stringify(v))}}catch(e){}}

var dflt={
'--common-bg':'#0b1a11','--common-bg-secondary':'#112418','--common-settings-bg':'#142a1b',
'--common-actionbar':'#18301f','--common-divider':'#1d3825','--common-text-primary':'#e0f0e6',
'--common-text-secondary':'#8bb5a0','--common-accent':'#66bb6a','--common-accent-fg':'#ffffff',
'--incoming-bg':'#243a2e','--incoming-bg-secondary':'#1c3024','--incoming-primary':'#e0f0e6',
'--incoming-secondary':'#8bb5a0','--incoming-link':'#81c784','--outgoing-bg':'#2e7d32',
'--outgoing-bg-secondary':'#256028','--outgoing-primary':'#e0f0e6','--outgoing-secondary':'#a8d8b5',
'--outgoing-link':'#a5d6a7','--conversation-bg':'#142a1b','--common-destructive':'#e53935'
};

var labels={
'--common-bg':'Фон осн.','--common-bg-secondary':'Фон втор.','--common-settings-bg':'Панели',
'--common-actionbar':'Панель действий','--common-divider':'Разделитель','--common-text-primary':'Текст осн.',
'--common-text-secondary':'Текст втор.','--common-accent':'Акцент','--common-accent-fg':'Текст акцента',
'--incoming-bg':'Чужое сообщ.','--incoming-bg-secondary':'Цитата входящ.','--incoming-primary':'Текст входящ.',
'--incoming-secondary':'Текст вт. входящ.','--incoming-link':'Ссылка входящ.','--outgoing-bg':'Своё сообщ.',
'--outgoing-bg-secondary':'Цитата исходящ.','--outgoing-primary':'Текст исходящ.','--outgoing-secondary':'Текст вт. исходящ.',
'--outgoing-link':'Ссылка исходящ.','--conversation-bg':'Фон чата','--common-destructive':'Удалить'
};

var presets={
'custom':'Пользовательская',
'dracula':'Dracula',
'nord':'Nord',
'monokai':'Monokai',
'onedark':'One Dark',
'githubdark':'GitHub Dark',
'solarized':'Solarized Dark',
'green':'Тёмно-зелёная'
};

var presetColors={
dracula:{
'--common-bg':'#282a36','--common-bg-secondary':'#21222c','--common-settings-bg':'#2c2d3a',
'--common-actionbar':'#343546','--common-divider':'#44475a','--common-text-primary':'#f8f8f2',
'--common-text-secondary':'#6272a4','--common-accent':'#bd93f9','--common-accent-fg':'#f8f8f2',
'--incoming-bg':'#3a3b4a','--incoming-bg-secondary':'#2c2d3a','--incoming-primary':'#f8f8f2',
'--incoming-secondary':'#6272a4','--incoming-link':'#8be9fd','--outgoing-bg':'#44475a',
'--outgoing-bg-secondary':'#383a4a','--outgoing-primary':'#f8f8f2','--outgoing-secondary':'#6272a4',
'--outgoing-link':'#50fa7b','--conversation-bg':'#282a36','--common-destructive':'#ff5555'
},
nord:{
'--common-bg':'#2e3440','--common-bg-secondary':'#3b4252','--common-settings-bg':'#434c5e',
'--common-actionbar':'#4c566a','--common-divider':'#434c5e','--common-text-primary':'#eceff4',
'--common-text-secondary':'#81a1c1','--common-accent':'#88c0d0','--common-accent-fg':'#2e3440',
'--incoming-bg':'#3b4252','--incoming-bg-secondary':'#434c5e','--incoming-primary':'#eceff4',
'--incoming-secondary':'#81a1c1','--incoming-link':'#88c0d0','--outgoing-bg':'#434c5e',
'--outgoing-bg-secondary':'#4c566a','--outgoing-primary':'#eceff4','--outgoing-secondary':'#81a1c1',
'--outgoing-link':'#8fbcbb','--conversation-bg':'#2e3440','--common-destructive':'#bf616a'
},
monokai:{
'--common-bg':'#272822','--common-bg-secondary':'#1e1f1c','--common-settings-bg':'#2b2c27',
'--common-actionbar':'#33342f','--common-divider':'#3e3d32','--common-text-primary':'#f8f8f2',
'--common-text-secondary':'#75715e','--common-accent':'#a6e22e','--common-accent-fg':'#272822',
'--incoming-bg':'#33342f','--incoming-bg-secondary':'#2b2c27','--incoming-primary':'#f8f8f2',
'--incoming-secondary':'#75715e','--incoming-link':'#66d9ef','--outgoing-bg':'#3e3d32',
'--outgoing-bg-secondary':'#33342f','--outgoing-primary':'#f8f8f2','--outgoing-secondary':'#75715e',
'--outgoing-link':'#a6e22e','--conversation-bg':'#272822','--common-destructive':'#f92672'
},
onedark:{
'--common-bg':'#282c34','--common-bg-secondary':'#21252b','--common-settings-bg':'#2c313c',
'--common-actionbar':'#353b45','--common-divider':'#3e4452','--common-text-primary':'#abb2bf',
'--common-text-secondary':'#5c6370','--common-accent':'#61afef','--common-accent-fg':'#282c34',
'--incoming-bg':'#353b45','--incoming-bg-secondary':'#2c313c','--incoming-primary':'#abb2bf',
'--incoming-secondary':'#5c6370','--incoming-link':'#61afef','--outgoing-bg':'#3e4452',
'--outgoing-bg-secondary':'#353b45','--outgoing-primary':'#abb2bf','--outgoing-secondary':'#5c6370',
'--outgoing-link':'#98c379','--conversation-bg':'#282c34','--common-destructive':'#e06c75'
},
githubdark:{
'--common-bg':'#0d1117','--common-bg-secondary':'#161b22','--common-settings-bg':'#161b22',
'--common-actionbar':'#21262d','--common-divider':'#30363d','--common-text-primary':'#c9d1d9',
'--common-text-secondary':'#8b949e','--common-accent':'#58a6ff','--common-accent-fg':'#ffffff',
'--incoming-bg':'#161b22','--incoming-bg-secondary':'#21262d','--incoming-primary':'#c9d1d9',
'--incoming-secondary':'#8b949e','--incoming-link':'#58a6ff','--outgoing-bg':'#1c2128',
'--outgoing-bg-secondary':'#252b33','--outgoing-primary':'#c9d1d9','--outgoing-secondary':'#8b949e',
'--outgoing-link':'#58a6ff','--conversation-bg':'#0d1117','--common-destructive':'#f85149'
},
solarized:{
'--common-bg':'#002b36','--common-bg-secondary':'#073642','--common-settings-bg':'#073642',
'--common-actionbar':'#093b48','--common-divider':'#094552','--common-text-primary':'#93a1a1',
'--common-text-secondary':'#657b83','--common-accent':'#268bd2','--common-accent-fg':'#fdf6e3',
'--incoming-bg':'#073642','--incoming-bg-secondary':'#094552','--incoming-primary':'#93a1a1',
'--incoming-secondary':'#657b83','--incoming-link':'#2aa198','--outgoing-bg':'#094552',
'--outgoing-bg-secondary':'#073642','--outgoing-primary':'#93a1a1','--outgoing-secondary':'#657b83',
'--outgoing-link':'#268bd2','--conversation-bg':'#002b36','--common-destructive':'#dc322f'
},
green:{
'--common-bg':'#0b1a11','--common-bg-secondary':'#112418','--common-settings-bg':'#142a1b',
'--common-actionbar':'#18301f','--common-divider':'#1d3825','--common-text-primary':'#e0f0e6',
'--common-text-secondary':'#8bb5a0','--common-accent':'#66bb6a','--common-accent-fg':'#ffffff',
'--incoming-bg':'#243a2e','--incoming-bg-secondary':'#1c3024','--incoming-primary':'#e0f0e6',
'--incoming-secondary':'#8bb5a0','--incoming-link':'#81c784','--outgoing-bg':'#2e7d32',
'--outgoing-bg-secondary':'#256028','--outgoing-primary':'#e0f0e6','--outgoing-secondary':'#a8d8b5',
'--outgoing-link':'#a5d6a7','--conversation-bg':'#142a1b','--common-destructive':'#e53935'
}
};

function getVals(){
 var g=getComputedStyle(document.documentElement),o={};
 for(var k in dflt){var v=g.getPropertyValue(k).trim();o[k]=v||dflt[k]}
 return o;
}

var mtObserver=null;

function inject(vars){
 var root=document.documentElement;
 for(var k in vars){root.style.setProperty(k,vars[k],'important')}
 if(!mtObserver){
  mtObserver=new MutationObserver(function(){
   var saved=ls('colors');
   if(saved){var rt=document.documentElement;for(var k in saved){rt.style.setProperty(k,saved[k],'important')}}
  });
  mtObserver.observe(document.documentElement,{attributes:true,attributeFilter:['style']});
 }
}

function applyBG(url){
 var old=document.getElementById(BG_SI);if(old)old.remove();
 if(url){
  var s=ce('style');s.id=BG_SI;
  var escUrl=url.replace(/['"]/g,'');
  s.textContent='.yamb-conversation,.yamb-chat{background-image:url("'+escUrl+'")!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important;background-attachment:fixed!important}';
  document.head.appendChild(s);
 }
}

function applyAll(cols,bg){
 if(cols){inject(cols)}
 applyBG(bg);
 ls('colors',cols);ls('bgImg',bg);
}

function loadSaved(){
 var cols=ls('colors'),bg=ls('bgImg');
 if(cols)inject(cols);
 if(bg)applyBG(bg);
}

function findSidebar(){
 setTimeout(function(){
  var el=qs('.yamb-sidebar')||qs('[class*=sidebar]')||qs('[class*=Sidebar]');
  var chatList=qs('.yamb-chats-list')||qs('[class*=chats-list]')||qs('[class*=ChatsList]');
  var container=el||chatList;
  if(container)buildBtn(container);
  else buildBtn(null);
 },3000);
}

var btnBuilt=false;

function buildBtn(container){
 if(btnBuilt)return;btnBuilt=true;
 var btn=ce('button');
 btn.id=BTN;btn.innerHTML='&#x2699;';btn.title='Редактор темы';
 btn.style.cssText='display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);cursor:pointer;font-size:18px;background:#2e7d32;color:#fff;box-shadow:0 1px 6px rgba(0,0,0,0.3);transition:transform .2s;flex-shrink:0;position:absolute;bottom:12px;left:12px;z-index:99';
 btn.onmouseenter=function(){btn.style.transform='scale(1.12)'};
 btn.onmouseleave=function(){btn.style.transform='scale(1)'};
 btn.onclick=function(){togglePanel()};

 if(container){
  if(getComputedStyle(container).position==='static')container.style.position='relative';
  container.appendChild(btn);
 }else{
  btn.style.position='fixed';btn.style.bottom='16px';btn.style.left='16px';btn.style.zIndex='999999';
  document.body.appendChild(btn);
 }
}

function togglePanel(){
 var panel=document.getElementById(PN);
 if(!panel){buildPanel();panel=document.getElementById(PN)}
 if(panel.style.right==='0px'){panel.style.right='-480px'}else{panel.style.right='0px';populate(panel)}
}

function buildPanel(){
 var panel=ce('div');panel.id=PN;
 panel.style.cssText='position:fixed;top:0;right:-480px;width:460px;height:100%;z-index:999999;background:#142a1b;color:#e0f0e6;transition:right 0.3s ease;overflow-y:auto;box-shadow:-4px 0 24px rgba(0,0,0,0.6);font-family:"YS Text","Helvetica Neue",sans-serif;font-size:14px;box-sizing:border-box;padding:20px';
 document.body.appendChild(panel);
}

function populate(panel){
 var vals=getVals(),cols=ls('colors')||{};
 for(var k in vals){if(cols[k])vals[k]=cols[k]}

 var curPreset=ls('preset')||'custom';

 var html='';
 html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid #1d3825">';
 html+='<h2 style="margin:0;font-size:18px;font-weight:700">Редактор темы</h2>';
 html+='<button id="ym-te-close" style="background:none;border:none;color:#8bb5a0;font-size:22px;cursor:pointer;padding:4px 8px">&times;</button>';
 html+='</div>';

  html+='<div style="margin-bottom:20px">';
  html+='<label style="display:block;font-size:13px;font-weight:500;margin-bottom:8px;color:#8bb5a0;text-transform:uppercase;letter-spacing:0.5px">Готовая тема</label>';
  html+='<div style="display:flex;flex-wrap:wrap;gap:6px">';
  for(var p in presets){
   var pc=presetColors[p];
   var bg=pc?pc['--common-bg']||'#000':'#000';
   var ac=pc?pc['--common-accent']||'#666':'#666';
   var border=p===curPreset?'2px solid '+ac:'1px solid #1d3825';
   html+='<div data-preset="'+p+'" style="padding:8px 14px;border-radius:8px;border:'+border+';background:'+bg+';color:'+ac+';cursor:pointer;font-size:12px;font-weight:500;transition:transform .15s;flex-shrink:0" onmouseenter="this.style.transform=\'scale(1.05)\'" onmouseleave="this.style.transform=\'scale(1)\'">'+presets[p]+'</div>';
  }
  html+='</div></div>';

 html+='<div style="margin-bottom:20px">';
 html+='<h3 style="font-size:13px;font-weight:500;margin:0 0 12px;color:#8bb5a0;text-transform:uppercase;letter-spacing:0.5px">Цвета</h3>';
 html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';

 for(var k in dflt){
  var v=vals[k]||dflt[k];
  html+='<div style="display:flex;align-items:center;gap:6px;padding:6px 8px;background:rgba(0,0,0,0.2);border-radius:6px">';
  html+='<input type="color" data-var="'+k+'" value="'+toHex(v)+'" style="width:32px;height:32px;border:none;border-radius:4px;cursor:pointer;padding:0;background:none"/>';
  html+='<div style="flex:1;min-width:0">';
  html+='<div style="font-size:12px;line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(labels[k]||k)+'</div>';
  html+='<div style="font-size:10px;color:#8bb5a0;font-family:monospace">'+k+'</div>';
  html+='</div></div>';
 }

 html+='</div></div>';

 html+='<div style="margin-bottom:20px">';
 html+='<h3 style="font-size:13px;font-weight:500;margin:0 0 12px;color:#8bb5a0;text-transform:uppercase;letter-spacing:0.5px">Фон чата</h3>';
 html+='<div style="background:rgba(0,0,0,0.2);border-radius:8px;padding:16px">';
 html+='<div style="margin-bottom:12px"><label for="ym-bg-file" style="display:inline-block;padding:8px 16px;background:#2e7d32;color:#fff;border-radius:6px;cursor:pointer;font-size:13px;font-weight:500">Выбрать изображение</label><input type="file" id="ym-bg-file" accept="image/*" style="display:none"/></div>';
 var cur=ls('bgImg');
 html+='<div id="ym-bg-preview" style="width:100%;height:100px;border-radius:6px;background:#0b1a11;background-size:cover;background-position:center;margin-bottom:8px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#8bb5a0;overflow:hidden'+ (cur?';background-image:url('+cur.replace(/'/g,'')+')':'')+'">'+(cur?'':'Нет изображения')+'</div>';
 html+='<div style="display:flex;gap:8px">';
 html+='<div style="flex:1"><input id="ym-bg-url" type="text" placeholder="Или вставьте URL картинки..." style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:6px;border:1px solid #1d3825;background:#0b1a11;color:#e0f0e6;font-size:13px;outline:none" value="'+(cur||'')+'"/></div>';
 html+='<button id="ym-bg-apply-url" style="padding:8px 12px;background:#2e7d32;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">Применить</button>';
 html+='<button id="ym-bg-remove" style="padding:8px 12px;background:transparent;color:#e53935;border:1px solid #e53935;border-radius:6px;cursor:pointer;font-size:13px">Убрать</button>';
 html+='</div></div></div>';

 html+='<div style="display:flex;gap:8px;margin-top:20px;padding-top:16px;border-top:1px solid #1d3825">';
 html+='<button id="ym-te-reset" style="flex:1;padding:10px;border-radius:6px;border:1px solid #1d3825;background:transparent;color:#8bb5a0;cursor:pointer;font-size:13px">Сбросить</button>';
 html+='<button id="ym-te-export" style="flex:1;padding:10px;border-radius:6px;border:1px solid #2e7d32;background:transparent;color:#66bb6a;cursor:pointer;font-size:13px">Экспорт CSS</button>';
 html+='</div>';

 panel.innerHTML=html;

 document.getElementById('ym-te-close').onclick=function(){panel.style.right='-480px'};

   panel.querySelectorAll('[data-preset]').forEach(function(el){
    el.onclick=function(){
     var p=this.getAttribute('data-preset');
     if(p==='custom'){
      ls('preset','custom');
      applyAll(ls('colors'),ls('bgImg'));
      populate(panel);
      return;
     }
     var c=presetColors[p];
     if(!c)return;
     ls('preset',p);
     applyAll(c,ls('bgImg'));
     populate(panel);
    };
   });

  panel.querySelectorAll('input[type="color"]').forEach(function(inp){
   inp.addEventListener('input',function(){
    var v={};panel.querySelectorAll('input[type="color"]').forEach(function(x){v[x.getAttribute('data-var')]=x.value});
    ls('preset','custom');
    panel.querySelectorAll('[data-preset]').forEach(function(x){x.style.border='1px solid #1d3825'});
    applyAll(v,ls('bgImg'));
    panel.querySelectorAll('input[type="color"]').forEach(function(x){x.style.outline='none'});
    this.style.outline='2px solid #66bb6a';
   });
  });

 document.getElementById('ym-bg-file').onchange=function(e){
  var f=e.target.files[0];if(!f)return;
  var r=new FileReader();
  r.onload=function(ev){
   var url=ev.target.result;
   var prev=document.getElementById('ym-bg-preview');
   prev.style.cssText+=';background-image:url("'+url+'")!important';prev.textContent='';
   document.getElementById('ym-bg-url').value='';
   var cols={};panel.querySelectorAll('input[type="color"]').forEach(function(x){cols[x.getAttribute('data-var')]=x.value});
   applyAll(cols,url);
  };
  r.readAsDataURL(f);
 };

 document.getElementById('ym-bg-apply-url').onclick=function(){
  var url=document.getElementById('ym-bg-url').value.trim();
  if(!url)return;
  var cols={};panel.querySelectorAll('input[type="color"]').forEach(function(x){cols[x.getAttribute('data-var')]=x.value});
  applyAll(cols,url);
  var prev=document.getElementById('ym-bg-preview');
  prev.style.cssText+=';background-image:url("'+url+'")!important';prev.textContent='';
 };

 document.getElementById('ym-bg-remove').onclick=function(){
  var old=document.getElementById(BG_SI);if(old)old.remove();
  ls('bgImg',null);
  var prev=document.getElementById('ym-bg-preview');
  prev.style.backgroundImage='';prev.textContent='Нет изображения';
  document.getElementById('ym-bg-url').value='';
 };

 document.getElementById('ym-te-reset').onclick=function(){
  if(mtObserver){mtObserver.disconnect();mtObserver=null}
  localStorage.clear();
  location.reload();
 };

 document.getElementById('ym-te-export').onclick=function(){
  var cols={};panel.querySelectorAll('input[type="color"]').forEach(function(x){cols[x.getAttribute('data-var')]=x.value});
  var css=':root {\n';for(var k in cols)css+='  '+k+': '+cols[k]+' !important;\n';css+='}';
  var ta=ce('textarea');ta.value=css;
  ta.style.cssText='position:fixed;left:-9999px;top:0';
  document.body.appendChild(ta);ta.select();
  try{document.execCommand('copy')}catch(e){}
  ta.remove();
  var fb=document.getElementById('ym-te-export');
  var orig=fb.textContent;fb.textContent='Скопировано!';fb.style.cssText='flex:1;padding:10px;border-radius:6px;border:1px solid #2e7d32;background:#2e7d32;color:#fff;cursor:pointer;font-size:13px';
  setTimeout(function(){fb.textContent=orig;fb.style.cssText='flex:1;padding:10px;border-radius:6px;border:1px solid #2e7d32;background:transparent;color:#66bb6a;cursor:pointer;font-size:13px'},2000);
 };

 var curBG=ls('bgImg');
 if(curBG){
  var prev=document.getElementById('ym-bg-preview');
  prev.style.backgroundImage='url("'+curBG+'")';prev.textContent='';
 }
}

function toHex(c){
 if(!c||c==='')return '#000000';
 if(c[0]==='#')return c.length===4?'#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3]:c;
 var m=c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
 if(m){var r=+m[1],g=+m[2],b=+m[3];return '#'+pad(r)+pad(g)+pad(b)}
 return '#000000';
 function pad(n){return(n<16?'0':'')+n.toString(16)}
}

// Init
if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',function(){loadSaved();setTimeout(findSidebar,800)})
}else{loadSaved();setTimeout(findSidebar,800)}
})();
