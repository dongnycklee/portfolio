'use strict';

/* 스크롤시 메뉴백그라운드 활성화 */

// 네비게이션 바를 변수할당
const navbar = document.querySelector('#navbar');
//네비게이션 바의 스크롤했을시의 값을 할당
const navbarHeight = navbar.getBoundingClientRect().height;
// 스크롤이될때마다 함수 호출
document.addEventListener('scroll', () => {
  //윈도우 스크롤이 네비게이션바 높이보다 클때
  if (window.scrollY > navbarHeight) {
    //네비게이션바에 클래스를 새로추가
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

/* 메뉴클릭시 이동 */

// 네비게이션바 요소(메뉴)들을 를 할당
const navbarMenu = document.querySelector('.navbar__menu');
// 네베기에션바 메뉴들을 클릭이됬을때 이벤트 호출
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  //스몰 메뉴바 클릭시 메뉴바 remove 
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
  
});

// 네비게이션바 휴대폰사이즈 스몰메뉴 활성화
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

/* Contact me 클릭시 이동 */
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

/* 스크롤시 HOME 투명화 */
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
// 윈도우 스크롤 값과(800)  homeheight 값 (800) 을 나눠서 값을 점점 0으로만들게 
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 스크롤다운시 "arrow up" 버튼 활성화
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// "arrow up" 버튼 클릭시 홈 컨텐츠로 이동
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// My work 포트폴리오 버튼 클릭 이벤트함수 콜백 
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  // 필터에 각 버튼의 데이터값을 넣어준다
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  //만약 필터의값이 null이 되면 리턴 반환
  if (filter == null) {
    return;
  }

  // 처음 All 이 클릭되도록
  const active = document.querySelector('.category__btn.selected');
  if (active != null) {
    active.classList.remove('selected');
  }
  e.target.classList.add('selected');
  //프로젝트 컨테이너 안에 anim-out 새로운클래스 생성
  projectContainer.classList.add('anim-out');

  // 셋타임아웃으로 애니메이션 아웃으로 300ms 묶음
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

/* 스크롤 함수 */
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
