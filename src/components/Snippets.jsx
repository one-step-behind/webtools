import React from 'react';

const Snippets = () => (
  <React.Fragment>
    <h1>Bookmarklets</h1>
    <p>Bookmarklets are cool small scripts for you browser</p>

    <h3>Apply a Bootstrap v4 style</h3>
    <samp style={{ display: 'block', textAlign: 'left', border: '1px solid #bbb', padding: '1rem' }}>
      {`javascript:(function(e,a,g,h,f,c,b,d){if(!(f=e.jQuery)||g>f.fn.jquery||h(f)){c=a.createElement("script");c.type="text/javascript";c.src="https://code.jquery.com/jquery-"+g+".slim.min.js";c.onload=c.onreadystatechange=function(){if(!b&&(!(d=this.readyState)||d=="loaded"||d=="complete")){h((f=e.jQuery).noConflict(1),b=1);f(c).remove()}};a.documentElement.childNodes[0].appendChild(c)}})(window,document,"3.3.1",function($,L){if($(".bootswatcher")[0]){$(".bootswatcher").remove()}else{var $e=$('<select class="bootswatcher"><option>Cerulean</option><option>Cosmo</option><option>Cyborg</option><option>Darkly</option><option>Flatly</option><option>Journal</option><option>Litera</option><option>Lumen</option><option>Lux</option><option>Materia</option><option>Minty</option><option>Pulse</option><option>Sandstone</option><option>Simplex</option><option>Sketchy</option><option>Slate</option><option>Solar</option><option>Spacelab</option><option>Superhero</option><option>United</option><option>Yeti</option></select>');var l=1+Math.floor(Math.random()*$e.children().length);$e.css({"z-index":"99999",position:"fixed",top:"5px",right:"5px",opacity:"0.5",color:"#000"}).hover(function(){$(this).css("opacity","1")},function(){$(this).css("opacity","0.5")}).change(function(){if(!$("link.bootswatcher")[0]){$("head").append('<link rel="stylesheet" class="bootswatcher">')}$("link.bootswatcher").attr("href","https://bootswatch.com/4/"+$(this).find(":selected").text().toLowerCase()+"/bootstrap.min.css")}).find("option:nth-child("+l+")").attr("selected","selected").end().trigger("change");$("body").append($e)};});`}
    </samp>

    <h3>Apply a Diagnostic script</h3>
    <samp style={{ display: 'block', textAlign: 'left', border: '1px solid #bbb', padding: '1rem' }}>
      {`javascript:( function(d, i, l) { l = d.getElementById(i); if (l) { l.parentNode.removeChild(l); return; } l = d.createElement('link'); l.id = i; l.rel = 'stylesheet'; l.type = 'text/css'; l.href = 'https://rawgithub.com/karlgroves/diagnostic.css/master/diagnostic.css'; d.getElementsByTagName('head')[0].appendChild(l); }(document, 'diagnosticCSS'));`}
    </samp>

    <h3>Toggle on Design mode</h3>
    <samp style={{ display: 'block', textAlign: 'left', border: '1px solid #bbb', padding: '1rem' }}>
      {`javascript:(function(){document.designMode = 'on';})()`}
    </samp>
  </React.Fragment>
);

export default Snippets;
