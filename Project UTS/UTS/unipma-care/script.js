(function(){
  var KEY='unipma_care',data=[],isAdmin=false;
  function $(i){return document.getElementById(i)}
  function load(){try{data=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){data=[]}}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(data))}catch(e){}}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function item(r,edit){
    return '<div class="card"><b>#'+esc(r.kode)+'</b> <span class="badge'+(r.status==='Selesai'?' done':'')+'">'+esc(r.status)+'</span>'+
    (edit?'<select class="sel" data-k="'+esc(r.kode)+'" aria-label="Ubah status"><option>Diterima</option><option>Diproses</option><option>Selesai</option></select>':'')+
    '<br>'+esc(r.brg)+' ('+esc(r.kat)+') · '+esc(r.lok)+'<br><small>'+esc(r.tgl)+' · '+esc(r.nama)+' · Kerusakan '+esc(r.urg.toLowerCase())+'</small></div>';
  }
  function fill(el,edit){
    if(!data.length){el.innerHTML='<p class="hint">Belum ada laporan.</p>';return}
    el.innerHTML=data.slice().reverse().map(function(r){return item(r,edit)}).join('');
    if(edit)[].forEach.call(el.querySelectorAll('select.sel'),function(s){
      var r=data.filter(function(x){return x.kode===s.dataset.k})[0];s.value=r.status;
      s.onchange=function(){r.status=s.value;save();render()};
    });
  }
  function render(){fill($('list'),false);fill($('alist'),true);var n=data.filter(function(r){return r.ts&&Date.now()-r.ts<864e5}).length;$('jml').textContent=n;$('proof').style.display=n?'flex':'none';var L=data[data.length-1];if(L){$('lk').textContent='LAPORAN TERBARU #'+L.kode;$('ls').textContent=L.status;$('lj').textContent=L.brg+' – '+L.lok;$('lb').style.width=({Diterima:'33%',Diproses:'66%',Selesai:'100%'})[L.status]}}
  function route(){
    var h=(location.hash||'#beranda').slice(1);if(!$('v-'+h))h='beranda';
    [].forEach.call(document.querySelectorAll('.view'),function(v){v.classList.toggle('on',v.id==='v-'+h)});
    [].forEach.call(document.querySelectorAll('[data-v]'),function(a){a.classList.toggle('on',a.dataset.v===h)});
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange',route);
  $('frm').addEventListener('submit',function(e){
    e.preventDefault();
    var ok=['nama','kat','urg','brg','lok','des','kon'].every(function(i){return $(i).value.trim()});
    if(!ok){$('err').textContent='Lengkapi semua kolom bertanda *.';return}
    $('err').textContent='';
    var kode='UP-'+Date.now().toString(36).slice(-6).toUpperCase();
    data.push({ts:Date.now(),kode:kode,nama:$('nama').value.trim(),kat:$('kat').value,urg:$('urg').value,brg:$('brg').value.trim(),lok:$('lok').value.trim(),status:'Diterima',
      tgl:new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})});
    save();render();$('kode').textContent=kode;$('toast').classList.add('show');$('toast').focus();$('frm').reset();
  });
  $('cari').onclick=function(){
    var k=$('q').value.trim().toUpperCase().replace('#',''),r=data.filter(function(x){return x.kode===k})[0];
    $('res').innerHTML=!k?'':r?item(r,false):'<p class="hint">Kode tidak ditemukan di perangkat ini. Periksa kembali penulisannya.</p>';
  };
  $('q').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();$('cari').click()}});
  var AK='unipma_admin',admins=[];
  function loadA(){try{admins=JSON.parse(localStorage.getItem(AK)||'[]')}catch(e){admins=[]}}
  function saveA(){try{localStorage.setItem(AK,JSON.stringify(admins))}catch(e){}}
  function hash(s){try{if(window.crypto&&crypto.subtle){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')})}}catch(e){}return Promise.resolve(s)}
  function tab(t){$('fm').style.display=t==='m'?'block':'none';$('fd').style.display=t==='d'?'block':'none';$('tabm').classList.toggle('on',t==='m');$('tabd').classList.toggle('on',t==='d')}
  $('tabm').onclick=function(){tab('m')};$('tabd').onclick=function(){tab('d')};
  $('fm').addEventListener('submit',function(e){
    e.preventDefault();var u=$('lu').value.trim().toLowerCase();
    hash($('lp').value).then(function(h){
      var a=admins.filter(function(x){return x.u===u&&x.h===h})[0];
      if(a){$('merr').textContent='';$('mok').textContent='';$('login').style.display='none';$('panel').style.display='block';$('hal').textContent='Halo, '+a.nama}
      else{$('mok').textContent='';$('merr').textContent='Username atau kata sandi salah.'}
    });
  });
  $('fd').addEventListener('submit',function(e){
    e.preventDefault();var n=$('dn').value.trim(),u=$('du').value.trim().toLowerCase(),p=$('dp').value,er=$('derr');
    if(!n||!u||!p||!$('dk').value.trim()){er.textContent='Lengkapi semua kolom.';return}
    if($('dk').value.trim()!=='00001'){er.textContent='Kode petugas tidak valid.';return}
    if(p.length<6){er.textContent='Kata sandi minimal 6 karakter.';return}
    if(admins.some(function(x){return x.u===u})){er.textContent='Username sudah dipakai.';return}
    hash(p).then(function(h){
      admins.push({nama:n,u:u,h:h});saveA();er.textContent='';$('fd').reset();$('lu').value=u;$('lp').value='';
      tab('m');$('merr').textContent='';$('mok').textContent='Akun berhasil dibuat. Silakan masuk.';
    });
  });
  $('keluar').onclick=function(){$('panel').style.display='none';$('login').style.display='block';$('lp').value=''};
  window.addEventListener('storage',function(e){if(e.key===KEY){load();render()}});
  loadA();
  load();render();route();
})();
