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
const state={uploadedPhotos:safeParse("vistaUploadedPhotos",[]),cloudPhotos:[],currentUser:safeParse("vistaCurrentUser",null),selectedDataUrl:"",selectedFile:null,activeCategory:"Tất cả",currentPhotoId:null,lastUploadedId:null,categories:[],adminUsers:[],adminImages:[],notifications:[],conversations:[],activeMessages:[],activeChatId:null,socialPollingTimer:null};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const allPhotos=()=>[...state.cloudPhotos,...state.uploadedPhotos.filter(p=>!p.isCloud),...defaultPhotos];
const escapeHtml=(v="")=>String(v).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const formatDate=v=>new Intl.DateTimeFormat("vi-VN",{dateStyle:"medium",timeStyle:"short"}).format(new Date(v));
function saveAuthSession(token, user) {
  localStorage.setItem("vistaToken", token);
  localStorage.setItem(
    "vistaCurrentUser",
    JSON.stringify(user)
  );

  state.currentUser = user;
}

function clearAuthSession() {
  localStorage.removeItem("vistaToken");
  localStorage.removeItem("vistaCurrentUser");

  state.currentUser = null;
}

function getAuthToken() {
  return localStorage.getItem("vistaToken") || "";
}

async function restoreAuthSession() {
  const token = getAuthToken();

  if (!token) {
    clearAuthSession();
    updateAuthUI();
    return;
  }

  try {
    const response = await fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
        "Phiên đăng nhập không hợp lệ."
      );
    }

    saveAuthSession(token, result.user);

    const profile = {
      ...createDefaultProfile(
        result.user.email,
        result.user.name
      ),
      ...result.user
    };

    saveUserProfile(profile);
    updateAuthUI();
  } catch (error) {
    console.warn(
      "Không thể khôi phục phiên đăng nhập:",
      error.message
    );

    clearAuthSession();
    updateAuthUI();
  }
}

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
  const categoryNames=["Tất cả",...state.categories.map(category=>category.name)];
  $("#categoryMenu").innerHTML=categoryNames.map(category=>`<button type="button" class="category-chip ${category===state.activeCategory?"is-active":""}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("");
  $("#photoCategory").innerHTML=`<option value="">Chọn danh mục</option>`+state.categories.map(category=>`<option value="${escapeHtml(category.name)}">${escapeHtml(category.name)}</option>`).join("");
}
function filteredPhotos(){const q=$("#heroSearchInput").value.trim().toLowerCase();return allPhotos().filter(p=>(state.activeCategory==="Tất cả"||p.category===state.activeCategory)&&`${p.title} ${p.category} ${p.author} ${p.description||""}`.toLowerCase().includes(q));}
function card(p){return `<article class="photo-card" data-photo-id="${p.id}" tabindex="0"><img src="${p.src}" alt="${escapeHtml(p.title)}" loading="lazy"><div class="card-shade"></div><button class="quick-like" type="button" data-action="like" aria-label="Thích ảnh">♡</button><div class="photo-meta"><strong>${escapeHtml(p.title)}</strong><span>${escapeHtml(p.author)} · ${escapeHtml(p.category)}</span></div></article>`;}
function renderPhotos(){const items=filteredPhotos();$("#gallery").innerHTML=items.map(card).join("");$("#resultCount").textContent=`${items.length} ảnh`;$("#heroPhotoCount").textContent=allPhotos().length;$("#emptyState").hidden=items.length>0;$("#galleryTitle").textContent=state.activeCategory==="Tất cả"?"Tất cả ảnh":`Ảnh ${state.activeCategory.toLowerCase()}`;}

function switchAuth(mode){const login=mode==="login";$("#loginForm").hidden=!login;$("#registerForm").hidden=login;$("#loginTab").classList.toggle("is-active",login);$("#registerTab").classList.toggle("is-active",!login);$("#loginError").textContent="";$("#registerError").textContent="";}
function updateAuthUI(){
  const u=state.currentUser;
  $("#loginButton").hidden=!!u;
  $("#avatarButton").hidden=!u;
  $("#notificationButton").hidden=!u;
  $("#messageButton").hidden=!u;
  $("#profileMenu").hidden=true;
  $("#notificationPanel").hidden=true;
  if(!u){
    clearInterval(state.socialPollingTimer);
    state.notifications=[];
    state.conversations=[];
    state.activeMessages=[];
    return;
  }

  // Dữ liệu MongoDB/S3 phải ưu tiên hơn localStorage để avatar và ảnh bìa
  // vẫn đúng sau khi tải lại trang hoặc đăng nhập trên máy khác.
  const localProfile=getUserProfile(u.email,u.name);
  const p={...localProfile,...u,role:u.role||"user",id:u.id||u._id};
  state.currentUser=p;
  saveUserProfile(p);
  localStorage.setItem("vistaCurrentUser",JSON.stringify(p));
  applyAvatar($("#avatarButton"),p);
  applyAvatar($("#menuAvatar"),p);
  $("#profileName").textContent=p.displayName||p.name;
  $("#profileEmail").textContent=p.email;

  const isAdmin=p.role==="admin";
  $("#accountRole").textContent=isAdmin?"Quản trị viên":"Thành viên";
  $("#accountRole").classList.toggle("is-admin",isAdmin);
  $("#adminDashboardButton").hidden=!isAdmin;

  renderNotificationBadge();
  renderMessageBadge();
  startSocialPolling();
}

function resetUpload(){state.selectedDataUrl="";state.selectedFile=null;$("#uploadForm").reset();$("#imagePreview").hidden=true;$("#imagePreview").removeAttribute("src");$("#uploadPlaceholder").hidden=false;$("#dropZone").classList.remove("has-image");$("#uploadError").textContent="";}
function processFile(file){const err=$("#uploadError");err.textContent="";if(!file)return;if(!["image/jpeg","image/png","image/webp","image/gif"].includes(file.type))return err.textContent="Chỉ hỗ trợ JPG, PNG, WEBP hoặc GIF.";if(file.size>8*1024*1024)return err.textContent="Ảnh vượt quá 8 MB.";state.selectedFile=file;const r=new FileReader();r.onload=()=>{state.selectedDataUrl=r.result;$("#imagePreview").src=r.result;$("#imagePreview").hidden=false;$("#uploadPlaceholder").hidden=true;$("#dropZone").classList.add("has-image");if(!$("#photoTitle").value)$("#photoTitle").value=file.name.replace(/\.[^.]+$/,"")};r.readAsDataURL(file);}

function updateGeneratedLink(){const p=getPhoto(state.lastUploadedId);if(!p)return;const type=$("#linkType").value;const direct=p.src;const map={direct,html:`<a href="${direct}" target="_blank"><img src="${direct}" alt="${escapeHtml(p.title)}"></a>`,thumbnail:`<a href="${direct}" target="_blank"><img src="${direct}" alt="${escapeHtml(p.title)}" width="240"></a>`,bbcode:`[url=${direct}][img]${direct}[/img][/url]`};$("#generatedLink").value=map[type];}

function renderComments(photo){
  const comments=photo.comments||[];
  $("#commentCount").textContent=comments.length;
  $("#commentList").innerHTML=comments.length?comments.map(c=>{
    const initial=(c.author||"N").charAt(0).toUpperCase();
    return `<div class="comment-item">
      <div class="comment-avatar" style="${c.avatar?`background-image:url('${c.avatar}');background-size:cover;background-position:center;`:""}">${c.avatar?"":escapeHtml(initial)}</div>
      <div><strong>${escapeHtml(c.author||"Người dùng")}</strong><span>${formatDate(c.createdAt)}</span><p>${escapeHtml(c.text)}</p></div>
    </div>`;
  }).join(""):`<p class="no-comments">Chưa có bình luận. Hãy là người đầu tiên.</p>`;
}
async function openDetail(id){
  const p=getPhoto(id);
  if(!p)return;
  state.currentPhotoId=id;
  $("#detailImage").src=p.src;
  $("#detailTitle").textContent=p.title;
  $("#detailDescription").textContent=p.description||"Không có mô tả.";
  $("#detailAuthor").textContent=p.author||"Người dùng VistaShare";
  applyAvatar($("#detailAuthorInitial"),resolveAuthorProfile(p.author||"VistaShare",p.owner));
  $("#detailDate").textContent=`Đăng ${formatDate(p.createdAt)}`;
  $("#detailLikeCount").textContent=p.likes||0;
  $("#detailLikeButton").classList.toggle("is-liked",!!p.liked);
  renderComments(p);
  const rel=allPhotos().filter(x=>x.id!==p.id&&x.category===p.category).slice(0,6);
  $("#relatedGallery").innerHTML=rel.map(x=>`<article class="related-card" data-photo-id="${x.id}"><img src="${x.src}" alt="${escapeHtml(x.title)}"><strong>${escapeHtml(x.title)}</strong></article>`).join("")||"<p>Chưa có ảnh liên quan.</p>";
  openModal("detailModal");

  if(isRealPhoto(p)){
    try{
      const social=await apiRequest(`/api/photos/social?photoId=${encodeURIComponent(p.id)}`);
      if(state.currentPhotoId===id){
        p.likes=social.likes||0;
        p.liked=Boolean(social.liked);
        p.comments=social.comments||[];
        $("#detailLikeCount").textContent=p.likes;
        $("#detailLikeButton").classList.toggle("is-liked",p.liked);
        renderComments(p);
      }
    }catch(error){console.warn("Không tải được tương tác ảnh:",error.message);}
  }

  const authorProfile=await fetchAuthorProfile(p.author||"VistaShare",p.owner);
  if(state.currentPhotoId===id){
    applyAvatar($("#detailAuthorInitial"),authorProfile);
  }
}
function updatePhoto(photo){const i=state.uploadedPhotos.findIndex(p=>p.id===photo.id);if(i>=0){state.uploadedPhotos[i]=photo;persistPhotos();}}

$("#categoryMenu").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;state.activeCategory=b.dataset.category;renderCategories();renderPhotos();});
$("#gallery").addEventListener("click",e=>{const cardEl=e.target.closest(".photo-card");if(!cardEl)return;openDetail(cardEl.dataset.photoId);});
$("#gallery").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches(".photo-card"))openDetail(e.target.dataset.photoId);});

$("#heroSearchForm").addEventListener("submit",e=>{e.preventDefault();runHeroSearch($("#heroSearchInput").value.trim());});
$("#heroDots").addEventListener("click",e=>{const b=e.target.closest("[data-hero-slide]");if(b)setHeroBackground(Number(b.dataset.heroSlide));});

$("#loginButton").addEventListener("click",()=>{switchAuth("login");openModal("authModal")});
$("#loginTab").addEventListener("click",()=>switchAuth("login"));$("#registerTab").addEventListener("click",()=>switchAuth("register"));
$("#avatarButton").addEventListener("click",e=>{e.stopPropagation();$("#profileMenu").hidden=!$("#profileMenu").hidden});
$("#logoutButton").addEventListener(
  "click",
  () => {
    clearAuthSession();
    updateAuthUI();

    toast(
      "Đã đăng xuất. Bạn cần đăng nhập để tải ảnh."
    );
  }
);
$("#uploadButton").addEventListener("click",()=>{if(!state.currentUser){switchAuth("login");openModal("authModal");toast("Vui lòng đăng nhập trước khi tải ảnh.");return;}resetUpload();openModal("uploadModal")});

document.addEventListener("click",e=>{const sw=e.target.closest("[data-switch-auth]");if(sw)switchAuth(sw.dataset.switchAuth);const close=e.target.closest("[data-close-modal]");if(close)closeModal(close.dataset.closeModal);if(!e.target.closest("#profileMenu")&&!e.target.closest("#avatarButton"))$("#profileMenu").hidden=true;});
$("#registerForm").addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    const name =
      $("#registerName").value.trim();

    const email =
      $("#registerEmail")
        .value
        .trim()
        .toLowerCase();

    const password =
      $("#registerPassword").value;

    const confirmPassword =
      $("#registerConfirmPassword").value;

    const errorElement =
      $("#registerError");

    const submitButton =
      event.currentTarget.querySelector(
        'button[type="submit"]'
      );

    errorElement.textContent = "";

    if (!name || !email || !password) {
      errorElement.textContent =
        "Vui lòng nhập đầy đủ thông tin.";
      return;
    }

    if (password !== confirmPassword) {
      errorElement.textContent =
        "Mật khẩu nhập lại không khớp.";
      return;
    }

    if (password.length < 6) {
      errorElement.textContent =
        "Mật khẩu phải có ít nhất 6 ký tự.";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent =
      "Đang đăng ký...";

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
          "Đăng ký thất bại."
        );
      }

      saveAuthSession(
        result.token,
        result.user
      );

      const profile = {
        ...createDefaultProfile(
          result.user.email,
          result.user.name
        ),
        ...result.user
      };

      saveUserProfile(profile);

      updateAuthUI();
      closeModal("authModal");

      event.currentTarget.reset();

      toast("Đăng ký thành công.");
    } catch (error) {
      console.error(error);

      errorElement.textContent =
        error.message ||
        "Không thể đăng ký tài khoản.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent =
        "Tạo tài khoản";
    }
  }
);
$("#loginForm").addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    const email =
      $("#loginEmail")
        .value
        .trim()
        .toLowerCase();

    const password =
      $("#loginPassword").value;

    const errorElement =
      $("#loginError");

    const submitButton =
      event.currentTarget.querySelector(
        'button[type="submit"]'
      );

    errorElement.textContent = "";

    if (!email || !password) {
      errorElement.textContent =
        "Vui lòng nhập email và mật khẩu.";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent =
      "Đang đăng nhập...";

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
          "Email hoặc mật khẩu không chính xác."
        );
      }

      saveAuthSession(
        result.token,
        result.user
      );

      const profile = {
        ...createDefaultProfile(
          result.user.email,
          result.user.name
        ),
        ...result.user
      };

      saveUserProfile(profile);

      updateAuthUI();
      closeModal("authModal");

      event.currentTarget.reset();

      toast(
        `Xin chào ${
          result.user.displayName ||
          result.user.name
        }.`
      );
    } catch (error) {
      console.error(error);

      errorElement.textContent =
        error.message ||
        "Đăng nhập thất bại.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent =
        "Đăng nhập";
    }
  }
);
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
const formData = new FormData();

formData.append(
  "image",
  state.selectedFile
);

formData.append(
  "title",
  $("#photoTitle").value.trim()
);

formData.append(
  "category",
  $("#photoCategory").value
);

formData.append(
  "description",
  $("#photoDescription").value.trim()
);

formData.append(
  "author",
  state.currentUser?.displayName ||
  state.currentUser?.name ||
  "Người dùng VistaShare"
);

formData.append(
  "owner",
  state.currentUser?.email || ""
);

const response = await fetch("/api/images", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${getAuthToken()}`
  },
  body: formData
});

    const result=await response.json();

    if(!response.ok){
      throw new Error(result.message||"Không thể tải ảnh lên S3.");
    }

    const uploaded=result.image;
    const photo = {
  id:
    uploaded.key ||
    `upload-${Date.now()}`,

  key: uploaded.key,

  title:
    uploaded.title ||
    $("#photoTitle").value.trim() ||
    uploaded.name ||
    "Ảnh mới",

  category:
    uploaded.category ||
    $("#photoCategory").value ||
    "Đời sống",

  description:
    uploaded.description ||
    $("#photoDescription").value.trim() ||
    "Không có mô tả.",

  src:
    uploaded.url ||
    uploaded.imageUrl ||
    uploaded.src,

  author:
    uploaded.author ||
    state.currentUser?.displayName ||
    state.currentUser?.name ||
    "Người dùng VistaShare",

  owner:
    uploaded.owner ||
    state.currentUser?.email ||
    "",

  createdAt:
    uploaded.lastModified ||
    new Date().toISOString(),

  likes: 0,
  comments: [],
  isUserUpload: true,
  isCloud: true
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

$("#detailLikeButton").addEventListener("click",async()=>{
  const p=getPhoto(state.currentPhotoId);
  if(!p)return;

  if(!isRealPhoto(p)){
    p.liked=!p.liked;
    p.likes=Math.max(0,(p.likes||0)+(p.liked?1:-1));
    $("#detailLikeButton").classList.toggle("is-liked",p.liked);
    $("#detailLikeCount").textContent=p.likes;
    return;
  }

  if(!state.currentUser){
    closeModal("detailModal");
    switchAuth("login");
    setTimeout(()=>openModal("authModal"),180);
    toast("Đăng nhập để thích ảnh.");
    return;
  }

  try{
    const result=await apiRequest("/api/photos/like",{
      method:p.liked?"DELETE":"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({photoId:p.id})
    });
    p.liked=result.liked;
    p.likes=result.likes;
    $("#detailLikeButton").classList.toggle("is-liked",p.liked);
    $("#detailLikeCount").textContent=p.likes;
  }catch(error){toast(error.message||"Không thể cập nhật lượt thích.");}
});
$("#detailShareButton").addEventListener("click",async()=>{const p=getPhoto(state.currentPhotoId);const data={title:p.title,text:`Xem ảnh ${p.title} trên VistaShare`,url:p.src};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(p.src);toast("Đã sao chép liên kết ảnh.")}}catch{}});
$("#detailDownloadButton").addEventListener("click",async()=>{const p=getPhoto(state.currentPhotoId);try{const res=await fetch(p.src);const blob=await res.blob();const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${p.title.replace(/[^\p{L}\p{N}]+/gu,"-")}.jpg`;a.click();URL.revokeObjectURL(url)}catch{window.open(p.src,"_blank")} });
$("#commentForm").addEventListener("submit",async e=>{
  e.preventDefault();
  if(!state.currentUser){
    closeModal("detailModal");
    switchAuth("login");
    setTimeout(()=>openModal("authModal"),180);
    toast("Đăng nhập để bình luận.");
    return;
  }

  const input=$("#commentInput");
  const text=input.value.trim();
  if(!text)return;
  const p=getPhoto(state.currentPhotoId);

  if(!isRealPhoto(p)){
    p.comments=p.comments||[];
    p.comments.unshift({author:state.currentUser.name,text,createdAt:new Date().toISOString(),avatar:state.currentUser.avatar||""});
    input.value="";
    renderComments(p);
    return;
  }

  try{
    const result=await apiRequest("/api/photos/comments",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({photoId:p.id,text})
    });
    p.comments=p.comments||[];
    p.comments.unshift(result.comment);
    input.value="";
    renderComments(p);
  }catch(error){toast(error.message||"Không thể gửi bình luận.");}
});
$("#relatedGallery").addEventListener("click",e=>{const card=e.target.closest("[data-photo-id]");if(!card)return;closeModal("detailModal");setTimeout(()=>openDetail(card.dataset.photoId),180)});
document.addEventListener("keydown",e=>{if(e.key==="Escape")$$('.modal.is-open').forEach(m=>closeModal(m.id));});

renderHero();
renderCategories();
renderPhotos();


/* Social profile, notifications and Messenger-style chat */
function profileKey(email){return `vistaProfile:${email}`}
function createDefaultProfile(email,name){return {email,name,displayName:name,username:(email.split("@")[0]||"user").replace(/[^a-zA-Z0-9_]/g,"_"),bio:"Chia sẻ những khoảnh khắc truyền cảm hứng trên VistaShare.",country:"",city:"",facebook:"",instagram:"",website:"",avatar:"",cover:"",followers:0,following:0}}
function getUserProfile(email,name="Người dùng"){return {...createDefaultProfile(email,name),...safeParse(profileKey(email),{})}}
function saveUserProfile(profile){localStorage.setItem(profileKey(profile.email),JSON.stringify(profile))}
function applyAvatar(el,p){
  if(!el)return;
  const name=p?.displayName||p?.name||"V";
  const avatar=p?.avatar||"";
  el.textContent=avatar?"":name.charAt(0).toUpperCase();
  el.style.backgroundImage=avatar?`url("${avatar.replace(/"/g,"%22")}")`:"";
  el.style.backgroundSize=avatar?"cover":"";
  el.style.backgroundPosition=avatar?"center":"";
  el.style.backgroundRepeat=avatar?"no-repeat":"";
}
function applyCover(el,p){if(!el)return;el.style.backgroundImage=p.cover?`url(${p.cover})`:"linear-gradient(120deg,#8c8e75,#3c9dbc)"}
function fileToDataUrl(file,cb){if(!file)return;const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(file)}
function resolveAuthorProfile(author,owner){
  if(owner){
    const local=getUserProfile(owner,author);
    if(state.currentUser?.email===owner){
      return {...local,...state.currentUser};
    }
    return local;
  }
  return {...createDefaultProfile(`author:${author}`,author),bio:`Nhiếp ảnh gia cộng đồng VistaShare.`,username:author.toLowerCase().replace(/\s+/g,"_")};
}

async function fetchAuthorProfile(author,owner){
  const fallback=resolveAuthorProfile(author,owner);
  if(!owner)return fallback;

  try{
    const response=await fetch(`/api/users/profile?email=${encodeURIComponent(owner)}`);
    const result=await response.json();
    if(!response.ok)throw new Error(result.message||"Không tải được hồ sơ tác giả.");
    const profile={...fallback,...result.user};
    saveUserProfile(profile);
    return profile;
  }catch(error){
    console.warn("Không tải được avatar tác giả:",error.message);
    return fallback;
  }
}
function openProfile(profile){state.viewedProfile=profile;const own=!!state.currentUser&&profile.email===state.currentUser.email;applyCover($("#profileCover"),profile);applyAvatar($("#profileAvatarLarge"),profile);$("#publicProfileName").textContent=profile.displayName||profile.name;$("#publicProfileBio").textContent=profile.bio||"Chưa có tiểu sử.";const photos=allPhotos().filter(p=>p.owner===profile.email||(!p.owner&&p.author===profile.name));$("#profilePhotoTotal").textContent=photos.length;$("#profileFollowerTotal").textContent=profile.followers||0;$("#profileFollowingTotal").textContent=profile.following||0;$("#followProfileButton").hidden=own;$("#messageProfileButton").hidden=own;$("#openEditProfileButton").hidden=!own;$("#changeAvatarButton").hidden=!own;$("#changeCoverButton").hidden=!own;const links=[];if(profile.facebook)links.push(`<a href="${escapeHtml(profile.facebook)}" target="_blank">Facebook</a>`);if(profile.instagram)links.push(`<a href="${escapeHtml(profile.instagram)}" target="_blank">Instagram</a>`);if(profile.website)links.push(`<a href="${escapeHtml(profile.website)}" target="_blank">Website</a>`);if(profile.city||profile.country)links.push(`<span>📍 ${escapeHtml([profile.city,profile.country].filter(Boolean).join(", "))}</span>`);$("#profileLinks").innerHTML=links.join("");$("#profileGallery").innerHTML=photos.length?photos.map(p=>`<article data-profile-photo="${p.id}"><img src="${p.src}" alt="${escapeHtml(p.title)}"></article>`).join(""):'<p>Người dùng này chưa đăng ảnh nào.</p>';openModal("profileModal")}
function openOwnProfile(){if(!state.currentUser)return;openProfile({...getUserProfile(state.currentUser.email,state.currentUser.name),...state.currentUser})}
function openEditProfile(){if(!state.currentUser)return;const p={...getUserProfile(state.currentUser.email,state.currentUser.name),...state.currentUser};state.editingProfile=p;state.editAvatarFile=null;state.editCoverFile=null;$("#editDisplayName").value=p.displayName||p.name;$("#editUsername").value=p.username||"";$("#editBio").value=p.bio||"";$("#editCountry").value=p.country||"";$("#editCity").value=p.city||"";$("#editFacebook").value=p.facebook||"";$("#editInstagram").value=p.instagram||"";$("#editWebsite").value=p.website||"";applyAvatar($("#editAvatarPreview"),p);applyCover($("#editCoverPreview"),p);openModal("editProfileModal")}

function isRealPhoto(photo){
  return Boolean(photo?.id&&String(photo.id).startsWith("images/"));
}

async function loadNotifications(silent=false){
  if(!state.currentUser)return;
  try{
    const result=await apiRequest("/api/notifications");
    state.notifications=result.notifications||[];
    renderNotifications();
    renderNotificationBadge();
  }catch(error){
    if(!silent)toast(error.message||"Không tải được thông báo.");
  }
}

function renderNotificationBadge(){
  if(!state.currentUser)return;
  const count=state.notifications.filter(n=>!n.read).length;
  $("#notificationBadge").textContent=count;
  $("#notificationBadge").hidden=!count;
}

function renderNotifications(){
  if(!state.currentUser)return;
  const list=state.notifications;
  $("#notificationList").innerHTML=list.length?list.map(n=>`
    <article class="notification-item ${n.read?"":"is-unread"}" data-notification-id="${n.id}">
      <div class="notification-icon">${n.type==="like"?"❤️":n.type==="comment"?"💬":n.type==="message"?"✉️":"🔔"}</div>
      <div>
        <p><strong>${escapeHtml(n.actor||"VistaShare")}</strong> ${escapeHtml(n.text||"")}</p>
        <time>${formatDate(n.createdAt)}</time>
      </div>
    </article>`).join(""):'<div class="notification-empty">Chưa có thông báo mới.</div>';
}

async function toggleNotifications(){
  if(!state.currentUser)return;
  await loadNotifications(true);
  $("#notificationPanel").hidden=!$("#notificationPanel").hidden;
  $("#profileMenu").hidden=true;
}

async function loadConversations(silent=false){
  if(!state.currentUser)return;
  try{
    const result=await apiRequest("/api/conversations");
    state.conversations=result.conversations||[];
    renderConversations();
    renderMessageBadge();
  }catch(error){
    if(!silent)toast(error.message||"Không tải được cuộc trò chuyện.");
  }
}

function renderConversations(){
  const q=$("#chatSearch").value.trim().toLowerCase();
  const chats=state.conversations.filter(c=>(c.partner?.displayName||c.partner?.name||"").toLowerCase().includes(q));
  $("#conversationList").innerHTML=chats.length?chats.map(c=>{
    const partner=c.partner||{};
    const name=partner.displayName||partner.name||"Người dùng";
    return `<button class="conversation-item ${String(state.activeChatId)===String(c.id)?"is-active":""}" data-chat-id="${c.id}">
      <div class="mini-avatar" style="${partner.avatar?`background-image:url('${partner.avatar}');background-size:cover;background-position:center;`:""}">${partner.avatar?"":escapeHtml(name.charAt(0).toUpperCase())}</div>
      <div><strong>${escapeHtml(name)}</strong><span>${escapeHtml(c.lastMessage||"Chưa có tin nhắn")}</span></div>
      ${c.unread?`<b class="conversation-unread">${c.unread}</b>`:""}
    </button>`;
  }).join(""):'<div class="notification-empty">Chưa có cuộc trò chuyện.</div>';
}

async function openChat(profile=null){
  if(!state.currentUser){
    switchAuth("login");
    openModal("authModal");
    return;
  }

  try{
    if(profile){
      if(!profile.email)throw new Error("Không tìm thấy email người nhận.");
      if(profile.email===state.currentUser.email)throw new Error("Bạn không thể tự nhắn tin cho chính mình.");
      const result=await apiRequest("/api/conversations",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({recipientEmail:profile.email})
      });
      state.activeChatId=result.conversation.id;
    }

    await loadConversations(true);
    if(!state.activeChatId&&state.conversations.length)state.activeChatId=state.conversations[0].id;
    await loadActiveMessages(true);
    renderConversations();
    openModal("chatModal");
  }catch(error){
    toast(error.message||"Không thể mở cuộc trò chuyện.");
  }
}

async function loadActiveMessages(silent=false){
  const chat=state.conversations.find(c=>String(c.id)===String(state.activeChatId));
  $("#chatEmpty").hidden=!!chat;
  $("#activeChat").hidden=!chat;
  if(!chat){
    state.activeMessages=[];
    return;
  }

  try{
    const result=await apiRequest(`/api/conversations/${encodeURIComponent(chat.id)}/messages`);
    state.activeMessages=result.messages||[];
    renderActiveChat();
    chat.unread=0;
    renderConversations();
    renderMessageBadge();
  }catch(error){
    if(!silent)toast(error.message||"Không tải được tin nhắn.");
  }
}

function renderActiveChat(){
  const chat=state.conversations.find(c=>String(c.id)===String(state.activeChatId));
  $("#chatEmpty").hidden=!!chat;
  $("#activeChat").hidden=!chat;
  if(!chat)return;

  const partner=chat.partner||{};
  const name=partner.displayName||partner.name||"Người dùng";
  $("#chatPartnerName").textContent=name;
  const av=$("#chatPartnerAvatar");
  av.textContent=partner.avatar?"":name.charAt(0).toUpperCase();
  av.style.backgroundImage=partner.avatar?`url('${partner.avatar}')`:"";
  av.style.backgroundSize="cover";
  av.style.backgroundPosition="center";

  $("#messageList").innerHTML=state.activeMessages.map(m=>`
    <div class="message-bubble ${m.from==="me"?"mine":m.from==="system"?"system-message":""}">
      ${escapeHtml(m.text)}
      <time>${formatDate(m.createdAt)}</time>
    </div>`).join("");
  $("#messageList").scrollTop=$("#messageList").scrollHeight;
}

function renderMessageBadge(){
  if(!state.currentUser)return;
  const count=state.conversations.reduce((total,c)=>total+(c.unread||0),0);
  $("#messageBadge").textContent=count;
  $("#messageBadge").hidden=!count;
}

function startSocialPolling(){
  clearInterval(state.socialPollingTimer);
  if(!state.currentUser)return;
  loadNotifications(true);
  loadConversations(true);
  state.socialPollingTimer=setInterval(async()=>{
    if(!state.currentUser)return;
    await Promise.all([loadNotifications(true),loadConversations(true)]);
    if(!$("#chatModal").hidden&&state.activeChatId)await loadActiveMessages(true);
  },3000);
}

$("#notificationButton").addEventListener("click",e=>{e.stopPropagation();toggleNotifications()});$("#menuNotificationsButton").addEventListener("click",toggleNotifications);$("#messageButton").addEventListener("click",()=>openChat());$("#menuMessagesButton").addEventListener("click",()=>openChat());$("#viewMyProfileButton").addEventListener("click",openOwnProfile);$("#editProfileButton").addEventListener("click",openEditProfile);$("#openEditProfileButton").addEventListener("click",()=>{closeModal("profileModal");setTimeout(openEditProfile,150)});$("#detailViewProfile").addEventListener("click",async()=>{
  const p=getPhoto(state.currentPhotoId);
  if(!p)return;
  const profile=await fetchAuthorProfile(p.author,p.owner);
  closeModal("detailModal");
  setTimeout(()=>openProfile(profile),170);
});$("#detailAuthorRow").addEventListener("keydown",e=>{if(e.key==="Enter")$("#detailViewProfile").click()});$("#messageProfileButton").addEventListener("click",()=>{const p=state.viewedProfile;closeModal("profileModal");setTimeout(()=>openChat(p),150)});$("#profileGallery").addEventListener("click",e=>{const c=e.target.closest("[data-profile-photo]");if(c){closeModal("profileModal");setTimeout(()=>openDetail(c.dataset.profilePhoto),150)}});$("#markAllReadButton").addEventListener("click",async()=>{
  if(!state.currentUser)return;
  try{
    await apiRequest("/api/notifications/read-all",{method:"PATCH"});
    state.notifications=state.notifications.map(n=>({...n,read:true}));
    renderNotifications();
    renderNotificationBadge();
  }catch(error){toast(error.message);}
});
$("#notificationList").addEventListener("click",async e=>{
  const item=e.target.closest("[data-notification-id]");
  if(!item)return;
  const notification=state.notifications.find(n=>String(n.id)===String(item.dataset.notificationId));
  try{
    await apiRequest(`/api/notifications/${encodeURIComponent(item.dataset.notificationId)}/read`,{method:"PATCH"});
    if(notification)notification.read=true;
    renderNotificationBadge();
    renderNotifications();
    $("#notificationPanel").hidden=true;
    if(notification?.photoId)openDetail(notification.photoId);
    else if(notification?.conversationId){
      state.activeChatId=notification.conversationId;
      openChat();
    }
  }catch(error){toast(error.message);}
});
document.addEventListener("click",e=>{if(!e.target.closest("#notificationPanel")&&!e.target.closest("#notificationButton"))$("#notificationPanel").hidden=true});
async function uploadProfileImage(file,type){
  if(!file)throw new Error("Bạn chưa chọn ảnh.");
  if(!["image/jpeg","image/png","image/webp","image/gif"].includes(file.type))throw new Error("Chỉ hỗ trợ JPG, PNG, WEBP hoặc GIF.");
  if(file.size>8*1024*1024)throw new Error("Ảnh không được vượt quá 8 MB.");

  const formData=new FormData();
  formData.append("image",file);
  formData.append("type",type);
  const result=await apiRequest("/api/profile/image",{method:"POST",body:formData});
  saveAuthSession(getAuthToken(),result.user);
  state.currentUser=result.user;
  saveUserProfile({...getUserProfile(result.user.email,result.user.name),...result.user});
  updateAuthUI();
  return result.user;
}

$("#chooseAvatarButton").addEventListener("click",()=>$("#avatarInput").click());
$("#chooseCoverButton").addEventListener("click",()=>$("#coverInput").click());
$("#avatarInput").addEventListener("change",e=>{
  const file=e.target.files[0];
  if(!file)return;
  state.editAvatarFile=file;
  fileToDataUrl(file,url=>{state.editingProfile.avatar=url;applyAvatar($("#editAvatarPreview"),state.editingProfile)});
});
$("#coverInput").addEventListener("change",e=>{
  const file=e.target.files[0];
  if(!file)return;
  state.editCoverFile=file;
  fileToDataUrl(file,url=>{state.editingProfile.cover=url;applyCover($("#editCoverPreview"),state.editingProfile)});
});
$("#changeAvatarButton").addEventListener("click",()=>$("#quickAvatarInput").click());
$("#changeCoverButton").addEventListener("click",()=>$("#quickCoverInput").click());
$("#quickAvatarInput").addEventListener("change",async e=>{
  const file=e.target.files[0];
  if(!file)return;
  try{
    toast("Đang tải ảnh đại diện...");
    const user=await uploadProfileImage(file,"avatar");
    openProfile({...getUserProfile(user.email,user.name),...user});
    toast("Đã cập nhật ảnh đại diện.");
  }catch(error){console.error(error);toast(error.message||"Không thể cập nhật ảnh đại diện.");}
  finally{e.target.value="";}
});
$("#quickCoverInput").addEventListener("change",async e=>{
  const file=e.target.files[0];
  if(!file)return;
  try{
    toast("Đang tải ảnh bìa...");
    const user=await uploadProfileImage(file,"cover");
    openProfile({...getUserProfile(user.email,user.name),...user});
    toast("Đã cập nhật ảnh bìa.");
  }catch(error){console.error(error);toast(error.message||"Không thể cập nhật ảnh bìa.");}
  finally{e.target.value="";}
});
function normalizeProfileUrl(value){const v=value.trim();if(!v)return "";return /^https?:\/\//i.test(v)?v:`https://${v}`;}
$("#editProfileForm").addEventListener("submit",async e=>{
  e.preventDefault();
  if(!state.currentUser||!state.editingProfile)return toast("Không tìm thấy tài khoản đang chỉnh sửa.");
  const displayName=$("#editDisplayName").value.trim();
  const username=$("#editUsername").value.trim().replace(/\s+/g,"_");
  if(!displayName||!username)return toast("Tên hiển thị và tên người dùng không được để trống.");

  const submitButton=e.currentTarget.querySelector('button[type="submit"]');
  if(submitButton){submitButton.disabled=true;submitButton.textContent="Đang lưu...";}

  try{
    const result=await apiRequest("/api/profile",{
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        displayName,
        username,
        bio:$("#editBio").value.trim(),
        country:$("#editCountry").value.trim(),
        city:$("#editCity").value.trim(),
        facebook:normalizeProfileUrl($("#editFacebook").value),
        instagram:normalizeProfileUrl($("#editInstagram").value),
        website:normalizeProfileUrl($("#editWebsite").value)
      })
    });

    let user=result.user;
    if(state.editAvatarFile)user=await uploadProfileImage(state.editAvatarFile,"avatar");
    if(state.editCoverFile)user=await uploadProfileImage(state.editCoverFile,"cover");

    saveAuthSession(getAuthToken(),user);
    state.currentUser=user;
    const p={...getUserProfile(user.email,user.name),...user};
    saveUserProfile(p);
    state.uploadedPhotos=state.uploadedPhotos.map(photo=>photo.owner===p.email?{...photo,author:displayName}:photo);
    persistPhotos();
    updateAuthUI();
    renderPhotos();
    closeModal("editProfileModal");
    toast("Đã lưu thay đổi hồ sơ.");
    setTimeout(()=>openProfile(p),190);
  }catch(error){
    console.error(error);
    toast(error.message||"Không thể lưu hồ sơ.");
  }finally{
    state.editAvatarFile=null;
    state.editCoverFile=null;
    $("#avatarInput").value="";
    $("#coverInput").value="";
    if(submitButton){submitButton.disabled=false;submitButton.textContent="Lưu thay đổi";}
  }
});
$("#conversationList").addEventListener("click",async e=>{
  const c=e.target.closest("[data-chat-id]");
  if(!c)return;
  state.activeChatId=c.dataset.chatId;
  renderConversations();
  await loadActiveMessages();
});
$("#chatSearch").addEventListener("input",renderConversations);
$("#messageForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const text=$("#messageInput").value.trim();
  if(!text||!state.activeChatId)return;
  const submitButton=e.currentTarget.querySelector('button[type="submit"]');
  if(submitButton)submitButton.disabled=true;
  try{
    await apiRequest(`/api/conversations/${encodeURIComponent(state.activeChatId)}/messages`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({text})
    });
    $("#messageInput").value="";
    await Promise.all([loadActiveMessages(true),loadConversations(true)]);
  }catch(error){toast(error.message||"Không thể gửi tin nhắn.");}
  finally{if(submitButton)submitButton.disabled=false;}
});



async function apiRequest(url,options={}){
  const headers={...(options.headers||{})};
  const token=getAuthToken();
  if(token)headers.Authorization=`Bearer ${token}`;
  const response=await fetch(url,{...options,headers});
  const result=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(result.message||"Yêu cầu thất bại.");
  return result;
}

async function loadCategories(){
  try{
    const result=await apiRequest("/api/categories");
    state.categories=result.categories||[];
    if(state.activeCategory!=="Tất cả"&&!state.categories.some(c=>c.name===state.activeCategory))state.activeCategory="Tất cả";
    renderCategories();
    renderPhotos();
  }catch(error){console.error(error);toast(error.message||"Không tải được danh mục.")}
}

function canDeleteCategory(category){
  if(!state.currentUser)return false;
  if(state.currentUser.role==="admin")return true;
  const creator=String(category.createdBy?._id||category.createdBy||"");
  return !category.isSystem&&creator===String(state.currentUser.id||state.currentUser._id||"");
}

function renderCategoryManager(){
  $("#categoryAdminList").innerHTML=state.categories.map(category=>{
    const source=category.isSystem?"Danh mục hệ thống":category.createdByRole==="admin"?"Do quản trị viên tạo":"Danh mục cộng đồng";
    return `<article class="category-admin-item"><div class="category-admin-item__meta"><strong>${escapeHtml(category.name)}</strong><span>${source}</span></div>${canDeleteCategory(category)?`<button type="button" data-delete-category="${category._id}">Xóa</button>`:""}</article>`;
  }).join("")||"<p>Chưa có danh mục.</p>";
}

$("#manageCategoriesButton").addEventListener("click",()=>{
  renderCategoryManager();
  $("#categoryError").textContent="";
  openModal("categoryManagerModal");
});

$("#categoryCreateForm").addEventListener("submit",async event=>{
  event.preventDefault();
  const name=$("#newCategoryName").value.trim();
  const button=event.currentTarget.querySelector('button[type="submit"]');
  $("#categoryError").textContent="";
  button.disabled=true;
  try{
    await apiRequest("/api/categories",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name})});
    event.currentTarget.reset();
    await loadCategories();
    renderCategoryManager();
    toast("Đã thêm danh mục.");
  }catch(error){$("#categoryError").textContent=error.message}
  finally{button.disabled=false}
});

$("#categoryAdminList").addEventListener("click",async event=>{
  const button=event.target.closest("[data-delete-category]");
  if(!button)return;
  if(!confirm("Bạn chắc chắn muốn xóa danh mục này?"))return;
  button.disabled=true;
  try{
    await apiRequest(`/api/categories/${button.dataset.deleteCategory}`,{method:"DELETE"});
    await loadCategories();
    renderCategoryManager();
    toast("Đã xóa danh mục.");
  }catch(error){toast(error.message)}
  finally{button.disabled=false}
});

function renderAdminUsers(){
  $("#adminUsersPanel").innerHTML=state.adminUsers.map(user=>`<article class="admin-user-row"><div class="admin-row-info"><strong>${escapeHtml(user.displayName||user.name)}</strong><span>${escapeHtml(user.email)}</span></div><span class="admin-role-pill ${user.role==="admin"?"is-admin":""}">${user.role==="admin"?"Quản trị viên":"Thành viên"}</span></article>`).join("")||"<p>Chưa có tài khoản.</p>";
}

function renderAdminImages(){
  $("#adminImagesPanel").innerHTML=state.adminImages.map(image=>`<article class="admin-image-row"><img src="${image.url||image.src}" alt="${escapeHtml(image.title)}"><div class="admin-row-info"><strong>${escapeHtml(image.title||image.name)}</strong><span>${escapeHtml(image.author||"VistaShare")} · ${escapeHtml(image.category||"")}</span><span>${escapeHtml(image.owner||"Không có email chủ sở hữu")}</span></div><button class="admin-delete-button" type="button" data-admin-delete-image="${escapeHtml(image.key)}">Xóa bài đăng</button></article>`).join("")||"<p>Chưa có bài đăng.</p>";
}

async function openAdminDashboard(){
  if(state.currentUser?.role!=="admin")return toast("Bạn không có quyền quản trị.");
  openModal("adminDashboardModal");
  $("#adminImagesPanel").innerHTML="<p>Đang tải dữ liệu...</p>";
  try{
    const [userResult,imageResult]=await Promise.all([apiRequest("/api/admin/users"),apiRequest("/api/admin/images")]);
    state.adminUsers=userResult.users||[];
    state.adminImages=imageResult.images||[];
    $("#adminUserCount").textContent=state.adminUsers.length;
    $("#adminImageCount").textContent=state.adminImages.length;
    $("#adminCategoryCount").textContent=state.categories.length;
    renderAdminUsers();
    renderAdminImages();
  }catch(error){$("#adminImagesPanel").innerHTML=`<p class="form-error">${escapeHtml(error.message)}</p>`}
}

$("#adminDashboardButton").addEventListener("click",openAdminDashboard);
$(".admin-tabs-simple").addEventListener("click",event=>{
  const button=event.target.closest("[data-admin-tab]");
  if(!button)return;
  $$(".admin-tabs-simple button").forEach(item=>item.classList.toggle("is-active",item===button));
  $("#adminImagesPanel").hidden=button.dataset.adminTab!=="images";
  $("#adminUsersPanel").hidden=button.dataset.adminTab!=="users";
});

$("#adminImagesPanel").addEventListener("click",async event=>{
  const button=event.target.closest("[data-admin-delete-image]");
  if(!button)return;
  if(!confirm("Xóa vĩnh viễn bài đăng vi phạm khỏi Amazon S3?"))return;
  button.disabled=true;
  try{
    await apiRequest("/api/images",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:button.dataset.adminDeleteImage})});
    state.adminImages=state.adminImages.filter(image=>image.key!==button.dataset.adminDeleteImage);
    $("#adminImageCount").textContent=state.adminImages.length;
    renderAdminImages();
    await loadImagesFromS3();
    toast("Đã xóa bài đăng.");
  }catch(error){toast(error.message)}
  finally{button.disabled=false}
});

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

    state.cloudPhotos = (result.images || []).map(
  (image, index) => {
    const saved =
      savedByKey.get(image.key) || {};

    return {
      id:
        image.key ||
        `cloud-${index}`,

      key: image.key,

      title:
        image.title ||
        saved.title ||
        image.name ||
        "Ảnh trên S3",

      category:
        image.category ||
        saved.category ||
        "Đời sống",

      description:
        image.description ||
        saved.description ||
        "Ảnh được lưu trữ trên Amazon S3.",

      src:
        image.url ||
        image.imageUrl ||
        image.src,

      author:
        image.author ||
        saved.author ||
        "VistaShare",

      owner:
        image.owner ||
        saved.owner ||
        "",

      createdAt:
        image.lastModified ||
        new Date().toISOString(),

      likes:
        saved.likes || 0,

      comments:
        saved.comments || [],

      isUserUpload: true,
      isCloud: true
    };
  }
);

    renderPhotos();
  }catch(error){
    console.error("Lỗi tải thư viện S3:",error);
    toast(error.message||"Không tải được ảnh từ S3.");
  }
}

loadCategories();
loadImagesFromS3();
restoreAuthSession();
