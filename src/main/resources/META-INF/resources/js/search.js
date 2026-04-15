// ── 챔피언 데이터 ──────────────────────────────────────────────
const CHAMPIONS = [
    { name: '이렐리아', engName: 'Irelia', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Irelia.png', difficulty: '상' },
    { name: '신짜오', engName: 'XinZhao', role: '전사', lane: '정글', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/XinZhao.png', difficulty: '중' },
    { name: '야스오', engName: 'Yasuo', role: '전사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Yasuo.png', difficulty: '상' },
    { name: '유나라', engName: 'Yunara', role: '원거리딜러', lane: '원딜', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Yunara.png', difficulty: '중' },
    { name: '멜', engName: 'Mel', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Mel.png', difficulty: '하' },
    { name: '자헨', engName: 'Zaahen', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Zaahen.png', difficulty: '중' },
];

// ── 뉴스 데이터 ──────────────────────────────────────────────
const NEWS = [
    { title: '새로운 챔피언 출시', desc: '2026 루나 레벨 이벤트! 신규 챔피언과 함께하는 특별한 시즌.', category: '게임 업데이트' },
    { title: '패치 노트 16.4', desc: '챔피언 밸런스 및 아이템 업데이트 내용을 확인하세요.', category: '패치노트' },
];

// ── 메인 화면 보이기 함수 ────────────────────────────────────────
function showMainScreen() {
    console.log('🏠 메인 화면으로 복귀');
    
    // 검색 결과 섹션 숨기기
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
        searchResults.classList.add('d-none');
    }
    
    // 히어로 섹션 보이기
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.remove('d-none');
    }
    
    // 다른 모든 섹션 보이기
    document.querySelectorAll('section:not(#searchResults)').forEach(section => {
        section.classList.remove('d-none');
    });
    
    // 검색 입력란 초기화
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // 페이지 맨 위로 스크롤
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ── 검색 실행 함수 ────────────────────────────────────────────
function performSearch(query) {
    // 검색어 정규화: 공백 제거 + 소문자 변환
    const q = query.trim().toLowerCase().replace(/\s+/g, '');
    
    // ✅ 검색어가 없으면 메인 화면으로 복귀
    if (!q) {
        console.log('⚠️ 검색어 없음 → 메인 화면 복귀');
        showMainScreen();
        return;
    }
    
    // 검색어 표시
    document.getElementById('searchKeywordDisplay').textContent = `"${query}"`;
    
    // 챔피언 검색 (공백 제거 후 비교)
    const champResults = CHAMPIONS.filter(c => {
        const nameMatch = c.name.replace(/\s+/g, '').toLowerCase().includes(q);
        const engMatch = c.engName.toLowerCase().includes(q);
        const roleMatch = c.role.replace(/\s+/g, '').toLowerCase().includes(q);
        const laneMatch = c.lane.replace(/\s+/g, '').toLowerCase().includes(q);
        
        return nameMatch || engMatch || roleMatch || laneMatch;
    });
    
    // 뉴스 검색 (공백 제거 후 비교)
    const newsResults = NEWS.filter(n => {
        const titleMatch = n.title.replace(/\s+/g, '').toLowerCase().includes(q);
        const descMatch = n.desc.replace(/\s+/g, '').toLowerCase().includes(q);
        const categoryMatch = n.category.replace(/\s+/g, '').toLowerCase().includes(q);
        
        return titleMatch || descMatch || categoryMatch;
    });
    
    // 검색 결과 개수 표시
    document.getElementById('champCount').textContent = `(${champResults.length})`;
    document.getElementById('newsCount').textContent = `(${newsResults.length})`;
    
    // 챔피언 결과 렌더링
    const champList = document.getElementById('championResultList');
    if (champResults.length === 0) {
        champList.innerHTML = `
            <div class="no-result p-4 text-center">
                <h4>검색 결과 없음</h4>
                <p>"${query}"에 해당하는 챔피언이 없습니다.</p>
                <button class="btn btn-primary mt-3" onclick="showMainScreen()">
                    메인 화면으로 돌아가기
                </button>
            </div>
        `;
    } else {
        champList.innerHTML = champResults.map(c => `
            <div class="search-result-card d-flex align-items-center p-0 mb-3 overflow-hidden" 
                 style="border: 1px solid #ddd; border-radius: 8px; background: #fff;">
                <img src="${c.img}" alt="${c.name}" 
                     style="width: 80px; height: 80px; object-fit: cover;"
                     onerror="this.src='https://via.placeholder.com/80'">
                <div class="p-3">
                    <div style="font-weight:700; font-size:1rem; color:#111;">
                        ${c.name} <span style="color:#888; font-size:0.85rem;">(${c.engName})</span>
                    </div>
                    <div style="color:#555; font-size:0.9rem; margin-top:4px;">
                        역할: ${c.role} &nbsp;|&nbsp; 라인: ${c.lane} &nbsp;|&nbsp; 난이도: ${c.difficulty}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // 뉴스 결과 렌더링
    const newsList = document.getElementById('newsResultList');
    if (newsResults.length === 0) {
        newsList.innerHTML = `
            <div class="no-result p-4 text-center">
                <h4>검색 결과 없음</h4>
                <p>"${query}"에 해당하는 뉴스가 없습니다.</p>
                <button class="btn btn-primary mt-3" onclick="showMainScreen()">
                    메인 화면으로 돌아가기
                </button>
            </div>
        `;
    } else {
        newsList.innerHTML = newsResults.map(n => `
            <div class="search-result-card p-3 mb-3" 
                 style="border: 1px solid #ddd; border-radius: 8px; background: #fff;">
                <span style="font-size:0.75rem; background:#c8253a; color:#fff; padding:2px 8px; border-radius:3px;">
                    ${n.category}
                </span>
                <div style="font-weight:700; font-size:1rem; color:#111; margin-top:8px;">
                    ${n.title}
                </div>
                <div style="color:#555; font-size:0.9rem; margin-top:4px;">
                    ${n.desc}
                </div>
            </div>
        `).join('');
    }
    
    // UI 전환: 챔피언 탭 먼저 보이기
    switchCategory('champion', document.querySelector('.search-category-item'));
    
    // 다른 섹션 숨기기
    const heroSection = document.querySelector('.hero');
    if (heroSection) heroSection.classList.add('d-none');
    
    document.querySelectorAll('section:not(#searchResults)').forEach(s => {
        s.classList.add('d-none');
    });
    
    // 검색 결과 섹션 표시
    const searchResults = document.getElementById('searchResults');
    searchResults.classList.remove('d-none');
    searchResults.style.display = 'block';
    
    // 검색 결과로 스크롤
    searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── 카테고리 전환 함수 ────────────────────────────────────────
function switchCategory(type, el) {
    // 모든 카테고리 비활성화
    document.querySelectorAll('.search-category-item').forEach(i => {
        i.classList.remove('active');
    });
    
    // 클릭한 카테고리 활성화
    if (el) {
        el.classList.add('active');
    }
    
    // 결과 영역 전환
    const champResult = document.getElementById('resultChampion');
    const newsResult = document.getElementById('resultNews');
    
    if (type === 'champion') {
        champResult.style.display = 'block';
        newsResult.style.display = 'none';
    } else {
        champResult.style.display = 'none';
        newsResult.style.display = 'block';
    }
}

// ── 폼 이벤트 리스너 ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    
    // 검색 폼 제출 이벤트
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = document.getElementById('searchInput').value;
            performSearch(query);
        });
    }
    
    // 로고 클릭 시 메인 화면으로 복귀
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        navbarBrand.addEventListener('click', function(e) {
            e.preventDefault();
            showMainScreen();
        });
    }
    
    // ESC 키로 메인 화면 복귀
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const searchResults = document.getElementById('searchResults');
            if (searchResults && searchResults.style.display === 'block') {
                showMainScreen();
            }
        }
    });
});