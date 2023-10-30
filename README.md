
<p align="center">
  <a href="https://diveindeep.dev">
    <img src="https://diveindeep-blog.netlify.app/static/logo-9f77c828de547077dd634fd3bfbab764.png" width="80" height="80" alt="logo">
  </a>
</p>
<h1 align="center">deeplog</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/f947c075-5e36-4f76-b5d8-756bc91d34b3/deploy-status)](https://app.netlify.com/sites/diveindeep-blog/deploys)

꾸준히 쓰려고 만든 개인 [개발 블로그](https://diveindeep.space).


## 🔧 Skills or Tools
- Gatsby
- React
- ES2015+
- GraphQL
- styled-components
- MDX
- Git
- Netlify


## 🎯 Features
1. 정적 웹사이트
   - Gatsby로 제작

2. 반응형 디자인
   - 미디어쿼리 작성
   - 크게 모바일과 웹으로 나누었으며, 필요한 페이지는 테블릿 사이즈도 스타일링

3. 다크모드 지원
   - 상단 헤더의 스위치를 이용하여 어느 페이지에서도 접근 가능
   - React Context를 사용하여 테마 상태 관리
   - localStorage로 재방문시에도 테마 유지 기능
   - 사용자의 시스템 환경에 맞춰 테마 설정
   - gatsby-ssr.js에 스크립트 추가하여 SSR 상황에서도 깜박임이나 지연없이 자연스러운 테마 변경
   - 테마변경에는 CSS Custom Properties 사용

4. Layout 컴포넌트를 전페이지 공통 사항 관리
   - useState로 스크롤 상태 관리로 Header는 상단에 고정
   - useContext 사용하여 테마 변경 가능한 스위치를 항상 Header에 위치
   - 페이지 SEO 적용
   - 슬라이드 형태 Footer
   - 메일주소 클릭시 클립보드로 복사 기능 구현

5. 컨텐츠 파일 비공개로 관리
   - git submodule을 사용하여 별도의 private repository로 관리

6. MDX으로 포스트
   - frontmatter에 필요한 정보 담아 데이터 관리
   - jpg, png, gif 등 파일 추가 가능
   - GraphQL로 포스트 데이터 불러오기
   - 코드 하이라이트(prismjs)
   - jsx 문법 사용하여 컨포넌트로 추가

7. 카테고리, 태그 분류
   - 선택한 카테고리, 태그 별로 연관된 포스트만 노출
   - 모든 카테고리와 태그를 보여주는 페이지 존재

8. 간단한 포스트 검색
   - 제목에 포함되는 단어로 포스트 검색

9. 각 포스트별 댓글
   - 깃허브 이슈로 관리하는 utterances 추가
   - 테마에 따라 댓글 테마도 변화

10. SEO
    - 페이지별 title, description, image, url 정보 추가
    - 소셜 미리보기를 위해 open graph 추가
    - 구조화된 데이터 작성



## 📌 Thinng to Do
- [x] ~~댓글 (utterances)~~ DONE!
- [x] ~~SEO~~ DONE!

## 💫 Deploy
[![Deploy to Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://www.netlify.com/)
