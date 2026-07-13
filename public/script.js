const CATEGORIES = ["Tất cả", "Thiên nhiên", "Du lịch", "Game", "Động vật", "Kiến trúc", "Ẩm thực", "Công nghệ", "Nghệ thuật", "Đời sống", "Biển", "Hoa", "Thành phố", "Xe cộ", "Vũ trụ", "Thể thao", "Thời trang", "Trừu tượng"];
const rawPhotos = [
  ["Bờ biển yên bình","Thiên nhiên","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=1400&q=85","Linh Nguyễn","Khoảnh khắc biển xanh trong một ngày nắng nhẹ."],
  ["Đỉnh núi trong sương","Du lịch","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&w=1400&q=85","Minh Khoa","Hành trình khám phá vùng núi cao."],
  ["Kiến trúc thành phố","Kiến trúc","https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&w=1400&q=85","An Trần","Những đường nét hình học giữa đô thị."],
  ["Ánh sáng rừng sâu","Thiên nhiên","https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&w=1400&q=85","Hà My","Nắng xuyên qua tán cây vào buổi sớm."],
  ["Sa mạc vàng","Du lịch","https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&w=1400&q=85","Quốc Bảo","Khung cảnh rộng lớn và tĩnh lặng."],
  ["Đường phố giờ xanh","Đời sống","https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&w=1400&q=85","Gia Hân","Thành phố chuyển mình khi đêm xuống."],
  ["Góc làm việc tối giản","Công nghệ","https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&w=1400&q=85","Tuấn Anh","Không gian sáng tạo cho một ngày hiệu quả."],
  ["Hồ nước phản chiếu","Thiên nhiên","https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&w=1400&q=85","Mai Chi","Mặt hồ yên tĩnh giữa thung lũng."],
  ["Không gian ấm áp","Kiến trúc","https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&w=1400&q=85","Khánh Vy","Thiết kế nội thất đơn giản và hiện đại."],
  ["Chuyến đi qua núi","Du lịch","https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&w=1400&q=85","Hoàng Nam","Con đường dẫn tới những vùng đất mới."],
  ["Cà phê buổi sáng","Ẩm thực","https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&w=1400&q=85","Ngọc Anh","Một tách cà phê cho ngày mới."],
  ["Bầu trời hồng","Nghệ thuật","https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&w=1400&q=85","Đức Huy","Ánh hoàng hôn phủ lên những ngọn núi."],
  ["Bàn sáng tạo","Công nghệ","https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&w=1400&q=85","Thanh Tâm","Nơi ý tưởng được hình thành."],
  ["Cánh đồng hoa","Thiên nhiên","https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&w=1400&q=85","Bảo Trâm","Màu sắc tự nhiên giữa đồng cỏ."],
  ["Thế giới game","Game","https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&w=1400&q=85","Vũ Long","Không gian thi đấu game đầy năng lượng."],
  ["Chú mèo tò mò","Động vật","https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&w=1400&q=85","Lan Phương","Một ánh nhìn đáng yêu trong buổi chiều."],
  ["Bữa ăn sắc màu","Ẩm thực","https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&w=1400&q=85","Hải Yến","Món ăn tươi ngon và đầy màu sắc."],
  ["Bộ điều khiển game","Game","https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&w=1400&q=85","Trung Kiên","Cuối tuần thư giãn cùng trò chơi yêu thích."],
  ["Rừng nhiệt đới xanh","Thiên nhiên","https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&w=1400&q=85","Phương Linh","Không gian xanh mát giữa rừng nhiệt đới."],
  ["Thác nước giữa núi","Thiên nhiên","https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&w=1400&q=85","Minh Nhật","Dòng thác trắng nổi bật giữa thiên nhiên hùng vĩ."],
  ["Biển xanh từ trên cao","Biển","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&w=1400&q=85","Hải Nam","Góc nhìn trên cao của bờ biển trong xanh."],
  ["Làn sóng mùa hè","Biển","https://images.unsplash.com/photo-1476673160081-cf065607f449?auto=format&w=1400&q=85","Thu Trang","Những con sóng đón ánh nắng đầu ngày."],
  ["Đường phố Tokyo","Thành phố","https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&w=1400&q=85","Kenji Mori","Nhịp sống thành phố rực sáng trong đêm."],
  ["Sài Gòn về đêm","Thành phố","https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&w=1400&q=85","Tuấn Phạm","Thành phố hiện đại dưới ánh đèn đêm."],
  ["Cầu kính hiện đại","Kiến trúc","https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&w=1400&q=85","Gia Bảo","Công trình tối giản với hình khối mạnh mẽ."],
  ["Nhà trắng tối giản","Kiến trúc","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&w=1400&q=85","Khánh An","Không gian sống hiện đại và thanh lịch."],
  ["Bàn phím RGB","Game","https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&w=1400&q=85","Đăng Khoa","Góc máy chơi game với ánh sáng RGB."],
  ["Thế giới thực tế ảo","Game","https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&w=1400&q=85","Quang Vinh","Trải nghiệm game trong không gian thực tế ảo."],
  ["Chú chó bên cửa sổ","Động vật","https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&w=1400&q=85","Như Ý","Một khoảnh khắc bình yên của người bạn nhỏ."],
  ["Chim hồng hạc","Động vật","https://images.unsplash.com/photo-1497206365907-f5e630693df0?auto=format&w=1400&q=85","Thanh Vy","Sắc hồng nổi bật giữa mặt nước xanh."],
  ["Vườn hoa tulip","Hoa","https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&w=1400&q=85","Ngọc Mai","Những bông hoa rực rỡ trong nắng sớm."],
  ["Hoa anh đào","Hoa","https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&w=1400&q=85","Yuki Tanaka","Mùa hoa nở dịu dàng dưới bầu trời xanh."],
  ["Bánh ngọt nghệ thuật","Ẩm thực","https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&w=1400&q=85","Hương Giang","Món tráng miệng tinh tế và đầy màu sắc."],
  ["Pizza lò nướng","Ẩm thực","https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&w=1400&q=85","Marco Rossi","Hương vị truyền thống từ căn bếp Ý."],
  ["Laptop và ý tưởng","Công nghệ","https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&w=1400&q=85","Đức Anh","Không gian làm việc dành cho người sáng tạo."],
  ["Mạch điện tương lai","Công nghệ","https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=1400&q=85","Bảo Long","Chi tiết công nghệ trong thế giới số."],
  ["Dải ngân hà","Vũ trụ","https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&w=1400&q=85","Stella Nguyễn","Bầu trời sâu thẳm với hàng triệu vì sao."],
  ["Phi hành gia cô độc","Vũ trụ","https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&w=1400&q=85","Nam Vũ","Hành trình khám phá ngoài không gian."],
  ["Xe cổ trên đường","Xe cộ","https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=1400&q=85","Hoàng Lâm","Chiếc xe thể thao trên cung đường rộng mở."],
  ["Mô tô giữa thành phố","Xe cộ","https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&w=1400&q=85","Quốc Khánh","Phong cách tự do giữa đô thị hiện đại."],
  ["Chạy bộ bình minh","Thể thao","https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&w=1400&q=85","Mai Anh","Bắt đầu ngày mới bằng năng lượng tích cực."],
  ["Bóng rổ đường phố","Thể thao","https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&w=1400&q=85","Huy Hoàng","Khoảnh khắc thể thao đầy tốc độ."],
  ["Thời trang đường phố","Thời trang","https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&w=1400&q=85","Lê Chi","Phong cách trẻ trung giữa phố thị."],
  ["Chân dung tối giản","Thời trang","https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&w=1400&q=85","Mia Trần","Sự kết hợp giữa thời trang và ánh sáng."],
  ["Sắc màu chuyển động","Trừu tượng","https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&w=1400&q=85","Khoa Vũ","Dòng màu mềm mại tạo cảm giác chuyển động."],
  ["Đường nét ánh sáng","Trừu tượng","https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&w=1400&q=85","An Nhiên","Những vệt sáng tạo nên không gian siêu thực."]
];
const defaultPhotos = rawPhotos.map((p,i)=>({id:`default-${i}`,title:p[0],category:p[1],src:p[2],author:p[3],description:p[4],createdAt:new Date(Date.now()-i*86400000).toISOString(),likes:12+i*7,comments:[]}));

const safeParse=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const state={uploadedPhotos:safeParse("vistaUploadedPhotos",[]),cloudPhotos:[],currentUser:safeParse("vistaCurrentUser",null),selectedDataUrl:"",selectedFile:null,activeCategory:"Tất cả",currentPhotoId:null,lastUploadedId:null};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const allPhotos=()=>[...state.cloudPhotos,...state.uploadedPhotos.filter(p=>!p.isCloud),...defaultPhotos];
const escapeHtml=(v="")=>String(v).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const formatDate=v=>new Intl.DateTimeFormat("vi-VN",{dateStyle:"medium",timeStyle:"short"}).format(new Date(v));

function persistPhotos(){localStorage.setItem("vistaUploadedPhotos",JSON.stringify(state.uploadedPhotos));}
function getPhoto(id){return allPhotos().find(p=>p.id===id);}
function openModal(id){const m=document.getElementById(id);if(!m)return;$$(`.modal.is-open`).forEach(other=>{if(other!==m){other.classList.remove("is-open");other.hidden=true;}});m.hidden=false;document.body.classList.add("modal-open");requestAnimationFrame(()=>m.classList.add("is-open"));}
function closeModal(id){const m=document.getElementById(id);if(!m)return;m.classList.remove("is-open");setTimeout(()=>{m.hidden=true;if(!$(".modal.is-open"))document.body.classList.remove("modal-open")},160);}
function toast(msg){const t=$("#toast");t.textContent=msg;t.hidden=false;requestAnimationFrame(()=>t.classList.add("is-visible"));clearTimeout(toast.timer);toast.timer=setTimeout(()=>{t.classList.remove("is-visible");setTimeout(()=>t.hidden=true,180)},2400);}

const HERO_PHOTO_IDS = [0,3,7,18,22,30,36,39];
let heroIndex = Math.floor(Math.random()*HERO_PHOTO_IDS.length);
let heroTimer;
function setHeroBackground(index, restart=true){
  heroIndex=(index+HERO_PHOTO_IDS.length)%HERO_PHOTO_IDS.length;
  const p=defaultPhotos[HERO_PHOTO_IDS[heroIndex]]||defaultPhotos[0];
  const hero=$("#heroShowcase");
  hero.classList.add("is-changing");
  setTimeout(()=>{hero.style.backgroundImage=`url("${p.src}")`;$("#heroCredit").textContent=`${p.title} · ${p.author}`;hero.classList.remove("is-changing");},180);
  $$("#heroDots button").forEach((b,i)=>b.classList.toggle("is-active",i===heroIndex));
  if(restart){clearInterval(heroTimer);heroTimer=setInterval(()=>setHeroBackground(heroIndex+1,false),7000);}
}
function renderHero(){
  $("#heroDots").innerHTML=HERO_PHOTO_IDS.map((_,i)=>`<button type="button" aria-label="Ảnh nền ${i+1}" data-hero-slide="${i}"></button>`).join("");
  setHeroBackground(heroIndex);
}
function runHeroSearch(value){
  $("#heroSearchInput").value=value;
  state.activeCategory="Tất cả";
  renderCategories();
  renderPhotos();
  document.querySelector(".gallery-section").scrollIntoView({behavior:"smooth",block:"start"});
}

function renderCategories(){
  $("#categoryMenu").innerHTML=CATEGORIES.map(c=>`<button type="button" class="category-chip ${c===state.activeCategory?"is-active":""}" data-category="${c}">${c}</button>`).join("");
  $("#photoCategory").innerHTML=`<option value="">Chọn danh mục</option>`+CATEGORIES.slice(1).map(c=>`<option>${c}</option>`).join("");
}
function filteredPhotos(){const q=$("#heroSearchInput").value.trim().toLowerCase();return allPhotos().filter(p=>(state.activeCategory==="Tất cả"||p.category===state.activeCategory)&&`${p.title} ${p.category} ${p.author} ${p.description||""}`.toLowerCase().includes(q));}
function card(p){return `<article class="photo-card" data-photo-id="${p.id}" tabindex="0"><img src="${p.src}" alt="${escapeHtml(p.title)}" loading="lazy"><div class="card-shade"></div><button class="quick-like" type="button" data-action="like" aria-label="Thích ảnh">♡</button><div class="photo-meta"><strong>${escapeHtml(p.title)}</strong><span>${escapeHtml(p.author)} · ${escapeHtml(p.category)}</span></div></article>`;}
function renderPhotos(){const items=filteredPhotos();$("#gallery").innerHTML=items.map(card).join("");$("#resultCount").textContent=`${items.length} ảnh`;$("#heroPhotoCount").textContent=allPhotos().length;$("#emptyState").hidden=items.length>0;$("#galleryTitle").textContent=state.activeCategory==="Tất cả"?"Tất cả ảnh":`Ảnh ${state.activeCategory.toLowerCase()}`;}

function switchAuth(mode){const login=mode==="login";$("#loginForm").hidden=!login;$("#registerForm").hidden=login;$("#loginTab").classList.toggle("is-active",login);$("#registerTab").classList.toggle("is-active",!login);$("#loginError").textContent="";$("#registerError").textContent="";}
function updateAuthUI(){const u=state.currentUser;$("#loginButton").hidden=!!u;$("#avatarButton").hidden=!u;$("#notificationButton").hidden=!u;$("#messageButton").hidden=!u;$("#profileMenu").hidden=true;$("#notificationPanel").hidden=true;if(u){const p=getUserProfile(u.email,u.name);state.currentUser={...u,...p};localStorage.setItem("vistaCurrentUser",JSON.stringify(state.currentUser));applyAvatar($("#avatarButton"),p);applyAvatar($("#menuAvatar"),p);$("#profileName").textContent=p.displayName||p.name;$("#profileEmail").textContent=p.email;renderNotificationBadge();renderMessageBadge();}}

function resetUpload(){state.selectedDataUrl="";state.selectedFile=null;$("#uploadForm").reset();$("#imagePreview").hidden=true;$("#imagePreview").removeAttribute("src");$("#uploadPlaceholder").hidden=false;$("#dropZone").classList.remove("has-image");$("#uploadError").textContent="";}
function processFile(file){const err=$("#uploadError");err.textContent="";if(!file)return;if(!["image/jpeg","image/png","image/webp","image/gif"].includes(file.type))return err.textContent="Chỉ hỗ trợ JPG, PNG, WEBP hoặc GIF.";if(file.size>8*1024*1024)return err.textContent="Ảnh vượt quá 8 MB.";state.selectedFile=file;const r=new FileReader();r.onload=()=>{state.selectedDataUrl=r.result;$("#imagePreview").src=r.result;$("#imagePreview").hidden=false;$("#uploadPlaceholder").hidden=true;$("#dropZone").classList.add("has-image");if(!$("#photoTitle").value)$("#photoTitle").value=file.name.replace(/\.[^.]+$/,"")};r.readAsDataURL(file);}

function updateGeneratedLink(){const p=getPhoto(state.lastUploadedId);if(!p)return;const type=$("#linkType").value;const direct=p.src;const map={direct,html:`<a href="${direct}" target="_blank"><img src="${direct}" alt="${escapeHtml(p.title)}"></a>`,thumbnail:`<a href="${direct}" target="_blank"><img src="${direct}" alt="${escapeHtml(p.title)}" width="240"></a>`,bbcode:`[url=${direct}][img]${direct}[/img][/url]`};$("#generatedLink").value=map[type];}

function renderComments(photo){const comments=photo.comments||[];$("#commentCount").textContent=comments.length;$("#commentList").innerHTML=comments.length?comments.map(c=>`<div class="comment-item"><div class="comment-avatar">${escapeHtml(c.author.charAt(0).toUpperCase())}</div><div><strong>${escapeHtml(c.author)}</strong><span>${formatDate(c.createdAt)}</span><p>${escapeHtml(c.text)}</p></div></div>`).join(""):`<p class="no-comments">Chưa có bình luận. Hãy là người đầu tiên.</p>`;}
function openDetail(id){const p=getPhoto(id);if(!p)return;state.currentPhotoId=id;$("#detailImage").src=p.src;$("#detailTitle").textContent=p.title;$("#detailDescription").textContent=p.description||"Không có mô tả.";$("#detailAuthor").textContent=p.author||"Người dùng VistaShare";$("#detailAuthorInitial").textContent=(p.author||"V").charAt(0).toUpperCase();$("#detailDate").textContent=`Đăng ${formatDate(p.createdAt)}`;$("#detailLikeCount").textContent=p.likes||0;$("#detailLikeButton").classList.toggle("is-liked",!!p.liked);renderComments(p);const rel=allPhotos().filter(x=>x.id!==p.id&&x.category===p.category).slice(0,6);$("#relatedGallery").innerHTML=rel.map(x=>`<article class="related-card" data-photo-id="${x.id}"><img src="${x.src}" alt="${escapeHtml(x.title)}"><strong>${escapeHtml(x.title)}</strong></article>`).join("")||"<p>Chưa có ảnh liên quan.</p>";openModal("detailModal");}
function updatePhoto(photo){const i=state.uploadedPhotos.findIndex(p=>p.id===photo.id);if(i>=0){state.uploadedPhotos[i]=photo;persistPhotos();}}

$("#categoryMenu").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;state.activeCategory=b.dataset.category;renderCategories();renderPhotos();});
$("#gallery").addEventListener("click",e=>{const cardEl=e.target.closest(".photo-card");if(!cardEl)return;openDetail(cardEl.dataset.photoId);});
$("#gallery").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches(".photo-card"))openDetail(e.target.dataset.photoId);});

$("#heroSearchForm").addEventListener("submit",e=>{e.preventDefault();runHeroSearch($("#heroSearchInput").value.trim());});
$("#heroDots").addEventListener("click",e=>{const b=e.target.closest("[data-hero-slide]");if(b)setHeroBackground(Number(b.dataset.heroSlide));});

$("#loginButton").addEventListener("click",()=>{switchAuth("login");openModal("authModal")});
$("#loginTab").addEventListener("click",()=>switchAuth("login"));$("#registerTab").addEventListener("click",()=>switchAuth("register"));
$("#avatarButton").addEventListener("click",e=>{e.stopPropagation();$("#profileMenu").hidden=!$("#profileMenu").hidden});
$("#logoutButton").addEventListener("click",()=>{state.currentUser=null;localStorage.removeItem("vistaCurrentUser");updateAuthUI();toast("Đã đăng xuất. Bạn cần đăng nhập để tải ảnh.")});
$("#uploadButton").addEventListener("click",()=>{if(!state.currentUser){switchAuth("login");openModal("authModal");toast("Vui lòng đăng nhập trước khi tải ảnh.");return;}resetUpload();openModal("uploadModal")});

document.addEventListener("click",e=>{const sw=e.target.closest("[data-switch-auth]");if(sw)switchAuth(sw.dataset.switchAuth);const close=e.target.closest("[data-close-modal]");if(close)closeModal(close.dataset.closeModal);if(!e.target.closest("#profileMenu")&&!e.target.closest("#avatarButton"))$("#profileMenu").hidden=true;});
$("#registerForm").addEventListener("submit",e=>{e.preventDefault();const name=$("#registerName").value.trim(),email=$("#registerEmail").value.trim().toLowerCase(),pass=$("#registerPassword").value,confirm=$("#registerConfirmPassword").value,users=safeParse("vistaUsers",[]);if(pass!==confirm)return $("#registerError").textContent="Mật khẩu nhập lại không khớp.";if(users.some(u=>u.email===email))return $("#registerError").textContent="Email này đã được đăng ký.";const profile=createDefaultProfile(email,name);users.push({name,email,password:pass,profile});localStorage.setItem("vistaUsers",JSON.stringify(users));saveUserProfile(profile);state.currentUser={name,email,...profile};localStorage.setItem("vistaCurrentUser",JSON.stringify(state.currentUser));updateAuthUI();closeModal("authModal");e.target.reset();toast("Đăng ký thành công.");});
$("#loginForm").addEventListener("submit",e=>{e.preventDefault();const email=$("#loginEmail").value.trim().toLowerCase(),pass=$("#loginPassword").value,users=safeParse("vistaUsers",[]),u=users.find(x=>x.email===email&&x.password===pass);if(!u)return $("#loginError").textContent="Email hoặc mật khẩu không chính xác.";const profile=getUserProfile(u.email,u.name);state.currentUser={name:u.name,email:u.email,...profile};localStorage.setItem("vistaCurrentUser",JSON.stringify(state.currentUser));updateAuthUI();closeModal("authModal");e.target.reset();toast(`Xin chào ${u.name}.`);});

$("#photoInput").addEventListener("change",e=>processFile(e.target.files[0]));["dragenter","dragover"].forEach(n=>$("#dropZone").addEventListener(n,e=>{e.preventDefault();$("#dropZone").classList.add("is-dragging")}));["dragleave","drop"].forEach(n=>$("#dropZone").addEventListener(n,e=>{e.preventDefault();$("#dropZone").classList.remove("is-dragging")}));$("#dropZone").addEventListener("drop",e=>processFile(e.dataTransfer.files[0]));
$("#uploadForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const errorEl=$("#uploadError");
  errorEl.textContent="";

  if(!state.selectedFile){
    errorEl.textContent="Bạn chưa chọn ảnh.";
    return;
  }

  const submitButton=e.currentTarget.querySelector('button[type="submit"]');
  submitButton.disabled=true;
  submitButton.textContent="Đang tải lên...";

  try{
    const formData=new FormData();
    formData.append("image",state.selectedFile);

    const response=await fetch("/api/images",{
      method:"POST",
      body:formData
    });

    const result=await response.json();

    if(!response.ok){
      throw new Error(result.message||"Không thể tải ảnh lên S3.");
    }

    const uploaded=result.image;
    const photo={
      id:uploaded.key||`upload-${Date.now()}`,
      key:uploaded.key,
      title:$("#photoTitle").value.trim()||uploaded.name||"Ảnh mới",
      category:$("#photoCategory").value||"Đời sống",
      description:$("#photoDescription").value.trim(),
      src:uploaded.url||uploaded.imageUrl||uploaded.src,
      author:state.currentUser?.name||"Người dùng VistaShare",
      owner:state.currentUser?.email||"",
      createdAt:uploaded.lastModified||new Date().toISOString(),
      likes:0,
      comments:[],
      isUserUpload:true,
      isCloud:true
    };

    state.uploadedPhotos=state.uploadedPhotos.filter(p=>p.id!==photo.id);
    state.uploadedPhotos.unshift(photo);
    persistPhotos();

    state.lastUploadedId=photo.id;

    await loadImagesFromS3();
    renderPhotos();

    closeModal("uploadModal");
    $("#successPreview").src=photo.src;
    $("#linkType").value="direct";
    updateGeneratedLink();

    setTimeout(()=>openModal("uploadSuccessModal"),180);
    toast("Tải ảnh lên S3 thành công.");
  }catch(error){
    console.error(error);
    errorEl.textContent=error.message||"Tải ảnh thất bại.";
  }finally{
    submitButton.disabled=false;
    submitButton.textContent="Đăng ảnh";
  }
});
$("#linkType").addEventListener("change",updateGeneratedLink);$("#copyLinkButton").addEventListener("click",async()=>{try{await navigator.clipboard.writeText($("#generatedLink").value)}catch{$("#generatedLink").select();document.execCommand("copy")}toast("Đã sao chép.")});$("#viewUploadedButton").addEventListener("click",()=>{closeModal("uploadSuccessModal");setTimeout(()=>openDetail(state.lastUploadedId),180)});

$("#detailLikeButton").addEventListener("click",()=>{const p=getPhoto(state.currentPhotoId);if(!p)return;p.liked=!p.liked;p.likes=Math.max(0,(p.likes||0)+(p.liked?1:-1));$("#detailLikeButton").classList.toggle("is-liked",p.liked);$("#detailLikeCount").textContent=p.likes;updatePhoto(p);if(p.liked&&state.currentUser&&p.owner&&p.owner!==state.currentUser.email)addNotification(p.owner,{type:"like",actor:state.currentUser.name,text:`đã thích ảnh ${p.title}`,photoId:p.id});});
$("#detailShareButton").addEventListener("click",async()=>{const p=getPhoto(state.currentPhotoId);const data={title:p.title,text:`Xem ảnh ${p.title} trên VistaShare`,url:p.src};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(p.src);toast("Đã sao chép liên kết ảnh.")}}catch{}});
$("#detailDownloadButton").addEventListener("click",async()=>{const p=getPhoto(state.currentPhotoId);try{const res=await fetch(p.src);const blob=await res.blob();const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${p.title.replace(/[^\p{L}\p{N}]+/gu,"-")}.jpg`;a.click();URL.revokeObjectURL(url)}catch{window.open(p.src,"_blank")} });
$("#commentForm").addEventListener("submit",e=>{e.preventDefault();if(!state.currentUser){closeModal("detailModal");switchAuth("login");setTimeout(()=>openModal("authModal"),180);toast("Đăng nhập để bình luận.");return;}const input=$("#commentInput"),text=input.value.trim();if(!text)return;const p=getPhoto(state.currentPhotoId);p.comments=p.comments||[];p.comments.unshift({author:state.currentUser.name,text,createdAt:new Date().toISOString()});input.value="";renderComments(p);updatePhoto(p);if(p.owner&&p.owner!==state.currentUser.email)addNotification(p.owner,{type:"comment",actor:state.currentUser.name,text:`đã bình luận ảnh ${p.title}`,photoId:p.id});});
$("#relatedGallery").addEventListener("click",e=>{const card=e.target.closest("[data-photo-id]");if(!card)return;closeModal("detailModal");setTimeout(()=>openDetail(card.dataset.photoId),180)});
document.addEventListener("keydown",e=>{if(e.key==="Escape")$$('.modal.is-open').forEach(m=>closeModal(m.id));});

renderHero();renderCategories();updateAuthUI();renderPhotos();


/* Social profile, notifications and Messenger-style chat */
function profileKey(email){return `vistaProfile:${email}`}
function createDefaultProfile(email,name){return {email,name,displayName:name,username:(email.split("@")[0]||"user").replace(/[^a-zA-Z0-9_]/g,"_"),bio:"Chia sẻ những khoảnh khắc truyền cảm hứng trên VistaShare.",country:"",city:"",facebook:"",instagram:"",website:"",avatar:"",cover:"",followers:0,following:0}}
function getUserProfile(email,name="Người dùng"){return {...createDefaultProfile(email,name),...safeParse(profileKey(email),{})}}
function saveUserProfile(profile){localStorage.setItem(profileKey(profile.email),JSON.stringify(profile))}
function applyAvatar(el,p){if(!el)return;const name=p.displayName||p.name||"V";el.textContent=p.avatar?"":name.charAt(0).toUpperCase();el.style.backgroundImage=p.avatar?`url(${p.avatar})`:""}
function applyCover(el,p){if(!el)return;el.style.backgroundImage=p.cover?`url(${p.cover})`:"linear-gradient(120deg,#8c8e75,#3c9dbc)"}
function fileToDataUrl(file,cb){if(!file)return;const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(file)}
function resolveAuthorProfile(author,owner){if(owner)return getUserProfile(owner,author);return {...createDefaultProfile(`author:${author}`,author),bio:`Nhiếp ảnh gia cộng đồng VistaShare.`,username:author.toLowerCase().replace(/\s+/g,"_")}}
function openProfile(profile){state.viewedProfile=profile;const own=!!state.currentUser&&profile.email===state.currentUser.email;applyCover($("#profileCover"),profile);applyAvatar($("#profileAvatarLarge"),profile);$("#publicProfileName").textContent=profile.displayName||profile.name;$("#publicProfileBio").textContent=profile.bio||"Chưa có tiểu sử.";const photos=allPhotos().filter(p=>p.owner===profile.email||(!p.owner&&p.author===profile.name));$("#profilePhotoTotal").textContent=photos.length;$("#profileFollowerTotal").textContent=profile.followers||0;$("#profileFollowingTotal").textContent=profile.following||0;$("#followProfileButton").hidden=own;$("#messageProfileButton").hidden=own;$("#openEditProfileButton").hidden=!own;$("#changeAvatarButton").hidden=!own;$("#changeCoverButton").hidden=!own;const links=[];if(profile.facebook)links.push(`<a href="${escapeHtml(profile.facebook)}" target="_blank">Facebook</a>`);if(profile.instagram)links.push(`<a href="${escapeHtml(profile.instagram)}" target="_blank">Instagram</a>`);if(profile.website)links.push(`<a href="${escapeHtml(profile.website)}" target="_blank">Website</a>`);if(profile.city||profile.country)links.push(`<span>📍 ${escapeHtml([profile.city,profile.country].filter(Boolean).join(", "))}</span>`);$("#profileLinks").innerHTML=links.join("");$("#profileGallery").innerHTML=photos.length?photos.map(p=>`<article data-profile-photo="${p.id}"><img src="${p.src}" alt="${escapeHtml(p.title)}"></article>`).join(""):'<p>Người dùng này chưa đăng ảnh nào.</p>';openModal("profileModal")}
function openOwnProfile(){if(!state.currentUser)return;openProfile(getUserProfile(state.currentUser.email,state.currentUser.name))}
function openEditProfile(){if(!state.currentUser)return;const p=getUserProfile(state.currentUser.email,state.currentUser.name);state.editingProfile=p;$("#editDisplayName").value=p.displayName||p.name;$("#editUsername").value=p.username||"";$("#editBio").value=p.bio||"";$("#editCountry").value=p.country||"";$("#editCity").value=p.city||"";$("#editFacebook").value=p.facebook||"";$("#editInstagram").value=p.instagram||"";$("#editWebsite").value=p.website||"";applyAvatar($("#editAvatarPreview"),p);applyCover($("#editCoverPreview"),p);openModal("editProfileModal")}
function notificationKey(email){return `vistaNotifications:${email}`}
function getNotifications(email){return safeParse(notificationKey(email),[])}
function addNotification(email,n){const list=getNotifications(email);list.unshift({id:`n-${Date.now()}-${Math.random()}`,createdAt:new Date().toISOString(),read:false,...n});localStorage.setItem(notificationKey(email),JSON.stringify(list.slice(0,60)));if(state.currentUser?.email===email){renderNotificationBadge();renderNotifications()}}
function renderNotificationBadge(){if(!state.currentUser)return;const count=getNotifications(state.currentUser.email).filter(n=>!n.read).length;$("#notificationBadge").textContent=count;$("#notificationBadge").hidden=!count}
function renderNotifications(){if(!state.currentUser)return;const list=getNotifications(state.currentUser.email);$("#notificationList").innerHTML=list.length?list.map(n=>`<article class="notification-item ${n.read?"":"is-unread"}" data-notification-id="${n.id}"><div class="notification-icon">${n.type==="like"?"❤️":n.type==="comment"?"💬":"🔔"}</div><div><p><strong>${escapeHtml(n.actor||"VistaShare")}</strong> ${escapeHtml(n.text||"")}</p><time>${formatDate(n.createdAt)}</time></div></article>`).join(""):'<div class="notification-empty">Chưa có thông báo mới.</div>'}
function toggleNotifications(){if(!state.currentUser)return;renderNotifications();$("#notificationPanel").hidden=!$("#notificationPanel").hidden;$("#profileMenu").hidden=true}
function chatKey(email){return `vistaChats:${email}`}
function getChats(){return state.currentUser?safeParse(chatKey(state.currentUser.email),[]):[]}
function saveChats(chats){if(state.currentUser)localStorage.setItem(chatKey(state.currentUser.email),JSON.stringify(chats))}
function ensureChat(profile){let chats=getChats();let chat=chats.find(c=>c.partner.email===profile.email);if(!chat){chat={id:`chat-${Date.now()}`,partner:{email:profile.email,name:profile.displayName||profile.name,avatar:profile.avatar||""},messages:[{id:`m-${Date.now()}`,from:"them",text:`Xin chào, rất vui được kết nối với bạn trên VistaShare.`,createdAt:new Date().toISOString()}],unread:0};chats.unshift(chat);saveChats(chats)}return chat}
function renderConversations(){const q=$("#chatSearch").value.trim().toLowerCase();const chats=getChats().filter(c=>c.partner.name.toLowerCase().includes(q));$("#conversationList").innerHTML=chats.length?chats.map(c=>`<button class="conversation-item ${state.activeChatId===c.id?"is-active":""}" data-chat-id="${c.id}"><div class="mini-avatar" style="${c.partner.avatar?`background-image:url(${c.partner.avatar})`:""}">${c.partner.avatar?"":escapeHtml(c.partner.name.charAt(0))}</div><div><strong>${escapeHtml(c.partner.name)}</strong><span>${escapeHtml(c.messages.at(-1)?.text||"Chưa có tin nhắn")}</span></div></button>`).join(""):'<div class="notification-empty">Chưa có cuộc trò chuyện.</div>'}
function openChat(profile=null){if(!state.currentUser){switchAuth("login");openModal("authModal");return}if(profile){const chat=ensureChat(profile);state.activeChatId=chat.id}renderConversations();renderActiveChat();openModal("chatModal")}
function renderActiveChat(){const chat=getChats().find(c=>c.id===state.activeChatId);$("#chatEmpty").hidden=!!chat;$("#activeChat").hidden=!chat;if(!chat)return;$("#chatPartnerName").textContent=chat.partner.name;const av=$("#chatPartnerAvatar");av.textContent=chat.partner.avatar?"":chat.partner.name.charAt(0);av.style.backgroundImage=chat.partner.avatar?`url(${chat.partner.avatar})`:"";$("#messageList").innerHTML=chat.messages.map(m=>`<div class="message-bubble ${m.from==="me"?"mine":""}">${escapeHtml(m.text)}<time>${formatDate(m.createdAt)}</time></div>`).join("");$("#messageList").scrollTop=$("#messageList").scrollHeight;chat.unread=0;const chats=getChats().map(c=>c.id===chat.id?chat:c);saveChats(chats);renderMessageBadge()}
function renderMessageBadge(){if(!state.currentUser)return;const count=getChats().reduce((s,c)=>s+(c.unread||0),0);$("#messageBadge").textContent=count;$("#messageBadge").hidden=!count}

$("#notificationButton").addEventListener("click",e=>{e.stopPropagation();toggleNotifications()});$("#menuNotificationsButton").addEventListener("click",toggleNotifications);$("#messageButton").addEventListener("click",()=>openChat());$("#menuMessagesButton").addEventListener("click",()=>openChat());$("#viewMyProfileButton").addEventListener("click",openOwnProfile);$("#editProfileButton").addEventListener("click",openEditProfile);$("#openEditProfileButton").addEventListener("click",()=>{closeModal("profileModal");setTimeout(openEditProfile,150)});$("#detailViewProfile").addEventListener("click",()=>{const p=getPhoto(state.currentPhotoId);if(!p)return;closeModal("detailModal");setTimeout(()=>openProfile(resolveAuthorProfile(p.author,p.owner)),170)});$("#detailAuthorRow").addEventListener("keydown",e=>{if(e.key==="Enter")$("#detailViewProfile").click()});$("#messageProfileButton").addEventListener("click",()=>{const p=state.viewedProfile;closeModal("profileModal");setTimeout(()=>openChat(p),150)});$("#profileGallery").addEventListener("click",e=>{const c=e.target.closest("[data-profile-photo]");if(c){closeModal("profileModal");setTimeout(()=>openDetail(c.dataset.profilePhoto),150)}});$("#markAllReadButton").addEventListener("click",()=>{if(!state.currentUser)return;const list=getNotifications(state.currentUser.email).map(n=>({...n,read:true}));localStorage.setItem(notificationKey(state.currentUser.email),JSON.stringify(list));renderNotifications();renderNotificationBadge()});$("#notificationList").addEventListener("click",e=>{const item=e.target.closest("[data-notification-id]");if(!item)return;const list=getNotifications(state.currentUser.email).map(n=>n.id===item.dataset.notificationId?{...n,read:true}:n);const n=list.find(n=>n.id===item.dataset.notificationId);localStorage.setItem(notificationKey(state.currentUser.email),JSON.stringify(list));renderNotificationBadge();if(n?.photoId){$("#notificationPanel").hidden=true;openDetail(n.photoId)}});document.addEventListener("click",e=>{if(!e.target.closest("#notificationPanel")&&!e.target.closest("#notificationButton"))$("#notificationPanel").hidden=true});
$("#chooseAvatarButton").addEventListener("click",()=>$("#avatarInput").click());$("#chooseCoverButton").addEventListener("click",()=>$("#coverInput").click());$("#avatarInput").addEventListener("change",e=>fileToDataUrl(e.target.files[0],url=>{state.editingProfile.avatar=url;applyAvatar($("#editAvatarPreview"),state.editingProfile)}));$("#coverInput").addEventListener("change",e=>fileToDataUrl(e.target.files[0],url=>{state.editingProfile.cover=url;applyCover($("#editCoverPreview"),state.editingProfile)}));$("#changeAvatarButton").addEventListener("click",()=>$("#quickAvatarInput").click());$("#changeCoverButton").addEventListener("click",()=>$("#quickCoverInput").click());$("#quickAvatarInput").addEventListener("change",e=>fileToDataUrl(e.target.files[0],url=>{const p=getUserProfile(state.currentUser.email,state.currentUser.name);p.avatar=url;saveUserProfile(p);state.currentUser={...state.currentUser,...p};updateAuthUI();openProfile(p)}));$("#quickCoverInput").addEventListener("change",e=>fileToDataUrl(e.target.files[0],url=>{const p=getUserProfile(state.currentUser.email,state.currentUser.name);p.cover=url;saveUserProfile(p);openProfile(p)}));
function normalizeProfileUrl(value){const v=value.trim();if(!v)return "";return /^https?:\/\//i.test(v)?v:`https://${v}`;}
$("#editProfileForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(!state.currentUser||!state.editingProfile)return toast("Không tìm thấy tài khoản đang chỉnh sửa.");
  const displayName=$("#editDisplayName").value.trim();
  const username=$("#editUsername").value.trim().replace(/\s+/g,"_");
  if(!displayName||!username)return toast("Tên hiển thị và tên người dùng không được để trống.");
  const p={...state.editingProfile,displayName,name:displayName,username,bio:$("#editBio").value.trim(),country:$("#editCountry").value.trim(),city:$("#editCity").value.trim(),facebook:normalizeProfileUrl($("#editFacebook").value),instagram:normalizeProfileUrl($("#editInstagram").value),website:normalizeProfileUrl($("#editWebsite").value)};
  try{
    saveUserProfile(p);
    const users=safeParse("vistaUsers",[]).map(u=>u.email===p.email?{...u,name:displayName,profile:p}:u);
    localStorage.setItem("vistaUsers",JSON.stringify(users));
    state.uploadedPhotos=state.uploadedPhotos.map(photo=>photo.owner===p.email?{...photo,author:displayName}:photo);
    persistPhotos();
    state.currentUser={...state.currentUser,...p};
    localStorage.setItem("vistaCurrentUser",JSON.stringify(state.currentUser));
    updateAuthUI();renderPhotos();closeModal("editProfileModal");toast("Đã lưu thay đổi hồ sơ.");
    setTimeout(()=>openProfile(p),190);
  }catch(error){console.error(error);toast("Không thể lưu hồ sơ. Bộ nhớ trình duyệt có thể đã đầy.");}
});
$("#conversationList").addEventListener("click",e=>{const c=e.target.closest("[data-chat-id]");if(!c)return;state.activeChatId=c.dataset.chatId;renderConversations();renderActiveChat()});$("#chatSearch").addEventListener("input",renderConversations);$("#messageForm").addEventListener("submit",e=>{e.preventDefault();const text=$("#messageInput").value.trim();if(!text)return;const chats=getChats();const chat=chats.find(c=>c.id===state.activeChatId);if(!chat)return;chat.messages.push({id:`m-${Date.now()}`,from:"me",text,createdAt:new Date().toISOString()});saveChats(chats);$("#messageInput").value="";renderConversations();renderActiveChat();setTimeout(()=>{const cs=getChats(),ch=cs.find(c=>c.id===state.activeChatId);if(!ch)return;ch.messages.push({id:`m-${Date.now()}`,from:"them",text:"Cảm ơn bạn đã nhắn tin. Mình sẽ phản hồi sớm.",createdAt:new Date().toISOString()});saveChats(cs);renderConversations();renderActiveChat()},900)});

// Seed a welcome notification for new local demo accounts
if(state.currentUser&&getNotifications(state.currentUser.email).length===0){addNotification(state.currentUser.email,{type:"system",actor:"VistaShare",text:"chào mừng bạn. Hãy hoàn thiện hồ sơ và bắt đầu chia sẻ ảnh."})}
updateAuthUI();

async function loadImagesFromS3(){
  try{
    const response=await fetch("/api/images");
    const result=await response.json();

    if(!response.ok){
      throw new Error(result.message||"Không lấy được danh sách ảnh từ S3.");
    }

    const savedByKey=new Map(
      state.uploadedPhotos
        .filter(photo=>photo.key)
        .map(photo=>[photo.key,photo])
    );

    state.cloudPhotos=(result.images||[]).map((image,index)=>{
      const saved=savedByKey.get(image.key)||{};

      return {
        id:image.key||`cloud-${index}`,
        key:image.key,
        title:saved.title||image.name||"Ảnh trên S3",
        category:saved.category||"Đời sống",
        description:saved.description||"Ảnh được lưu trữ trên Amazon S3.",
        src:image.url||image.imageUrl||image.src,
        author:saved.author||"VistaShare",
        owner:saved.owner||"",
        createdAt:image.lastModified||new Date().toISOString(),
        likes:saved.likes||0,
        comments:saved.comments||[],
        isUserUpload:true,
        isCloud:true
      };
    });

    renderPhotos();
  }catch(error){
    console.error("Lỗi tải thư viện S3:",error);
    toast(error.message||"Không tải được ảnh từ S3.");
  }
}

loadImagesFromS3();
